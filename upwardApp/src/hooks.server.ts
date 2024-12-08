import { createServerClient } from '@supabase/ssr';
import { Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Supabase Client Setup
const supabaseHandle: Handle = async ({ event, resolve }) => {
  const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, { ...options, path: '/' });
      },
      remove: (key, options) => {
        event.cookies.delete(key, { ...options, path: '/' });
      },
    },
  });

  event.locals.supabase = supabase;

  // Safe session retrieval
  event.locals.safeGetSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { session: null, user: null };

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return { session: null, user: null };

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return ['content-range', 'x-supabase-api-version'].includes(name);
    },
  });
};

// Role-Based Access Control


const protectedPaths = ['/customerMain', '/adminMain'];

const authGuard: Handle = async ({ event, resolve }) => {
    const { session, user } = await event.locals.safeGetSession();
    event.locals.session = session;
    event.locals.user = user;

    // Check if the path is protected
    const isProtected = protectedPaths.includes(event.url.pathname) || protectedPaths.some((path) => event.url.pathname.startsWith(`${path}/`));

    if (!session && isProtected) {
        console.log('Redirecting unauthenticated user to /');
        throw redirect(303, '/redirectToHome');
    }

    // Set role if user is authenticated
    let role = null;
    if (session && user?.id) {
        const userId = user.id;

        // Fetch role from the database
        const { data: customer } = await event.locals.supabase
            .from('Customer')
            .select('userID')
            .eq('userID', userId)
            .single();

        if (customer) role = 'customer';

        const { data: admin } = await event.locals.supabase
            .from('Admin')
            .select('userID')
            .eq('userID', userId)
            .single();

        if (admin) role = 'admin';
    }

    event.locals.role = role;

    // Redirect based on role
    if (event.url.pathname === '/') {
        if (role === 'customer') throw redirect(303, '/customerMain');
        if (role === 'admin') throw redirect(303, '/adminMain');
    }

    // Prevent unauthorized access
    if (role === 'customer' && !event.url.pathname.startsWith('/customerMain')) {
        console.log('Unauthorized access attempt by customer, redirecting...');
        throw redirect(303, '/customerMain');
    }
    if (role === 'admin' && !event.url.pathname.startsWith('/adminMain')) {
        console.log('Unauthorized access attempt by admin, redirecting...');
        throw redirect(303, '/adminMain');
    }

    return resolve(event, {
        headers: {
            'Cache-Control': 'no-store, max-age=0'
        }
    });
};


export const handle: Handle = sequence(supabaseHandle, authGuard);

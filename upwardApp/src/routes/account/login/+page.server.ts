import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  //just 2 email types now no more pot and user
  login: async ({ request, locals: { supabase } }) => {
      const formData = await request.formData();
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      console.log(email, password);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

     const { data: customer } = await supabase
      .from('Customer')
      .select('customer_email')
      .eq('customer_email', email)
      .single();

    if (customer) {
      return redirect(303, '/customerMain');
    }

    const { data: admin } = await supabase
      .from('Admin')
      .select('admin_email')
      .eq('admin_email', email)
      .single();

    if (admin) {
      return redirect(303, '/adminMain');
    }

  },
};

//this part is for data getting when the page loads
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, session } }) => {

  depends('supabase:db:Dorm Room');
  depends('supabase:db:Availability');

  const { data: roomData, error: roomError } = await supabase
    .from('Dorm Room')
    .select('*');

  
  const { data: availabilityData, error: availabilityError } = await supabase
    .from('Availability')
    .select('*');

  if (roomError) {
    console.error('Error fetching room data:', roomError);
    return { rooms: [], availability: availabilityData ?? [], error: roomError.message };
  }

  if (availabilityError) {
    console.error('Error fetching availability data:', availabilityError);
    return { rooms: roomData ?? [], availability: [], error: availabilityError.message };
  }

  return { rooms: roomData ?? [], availability: availabilityData ?? [] };

};


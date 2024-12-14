import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'



export const load: PageServerLoad = async ({ depends, locals: { supabase, session } }) => {

  depends('supabase:db:Customer');

  const customer_id = session?.user?.id;
   console.log(customer_id);


  if (!customer_id) {
    return { user: null, error: 'User not logged in' };
  }

  const { data: user, error } = await supabase
    .from('Customer')
    .select('*')
    .eq('customer_id', customer_id)
    .single();

  if (error) {
    console.log('Error fetching tenant data:', error);
    return { user: null, error: error.message };
  }

   return { user };

};

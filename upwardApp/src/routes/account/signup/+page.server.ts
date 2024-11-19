import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
      const formData = await request.formData();

      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('number') as string;
      const password = formData.get('password') as string;


      const { data: user, error: signupError} = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            phone,
          },
        },
      });

      if (signupError || !user) {
        console.error('Sign-up error:', signupError);
        return redirect(303, '/error'); //go to error, pls make error folder
      }

      const customerID = user.user?.id;

       console.log('Form data:', { name, email, phone, password, customerID });

      // If signup succeeds, add user details to the user table
      const { error: profileError } = await supabase
        .from('Customer') 
        .insert([
          {
            customer_name: name,
            customer_phone: phone,
            customer_email: email,
            customer_id: customerID,
          },
        ]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        return redirect(303, '/error');
      }

      console.log('Redirecting to confirm page...');
      return redirect(303, '/customerMain');
  }
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


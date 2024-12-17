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

  depends('supabase:db:Drink');
  depends('supabase:db:Drink Availability');
  depends('supabase:db:Drink Order Line');
  depends('supabase:db:Drink Order Status');
  depends('supabase:db:Drink Receipt');

  const { data: drinkData, error: drinkError } = await supabase
    .from('Drink')
    .select('*');
  
  const { data: drinkAvailabilityData, error: drinkAvailabilityError } = await supabase
    .from('Drink Availability')
    .select('*');

  const { data: drinkOrderLineData, error: drinkOrderLineError } = await supabase
    .from('Drink Order Line')
    .select('*');

  const { data: drinkOrderStatusData, error: drinkOrderStatusError } = await supabase
    .from('Drink Order Status')
    .select('*');

  const { data: drinkReceiptData, error: drinkReceiptError } = await supabase
    .from('Drink Receipt')
    .select('*');

  const { data: customerData, error: customerError } = await supabase
    .from('Customer')
    .select('*');

  if (drinkError) {
    console.error('Error fetching room data:', drinkError);
    return { drinks: [], drinkAvailability: drinkAvailabilityData ?? [], error: drinkError.message };
  }

  if (drinkAvailabilityError) {
    console.error('Error fetching availability data:', drinkAvailabilityError);
    return { drinks: drinkData ?? [], drinkAvailability: [], error: drinkAvailabilityError.message };
  }

  const { data: tableData, error: tableError } = await supabase
    .from('Table')
    .select('*');

  
  const { data: tableAvailabilityData, error: tableAvailabilityError } = await supabase
    .from('Table Availability')
    .select('*');

  const { data: tableReservationData, error: tableReservationError } = await supabase
    .from('Table Reservation')
    .select('*');  

  const { data: tableReservationStatusData, error: tableReservationStatusError } = await supabase
    .from('Table Reservation Status')
    .select('*'); 


  return {tables: tableData ?? [], tableAvailability: tableAvailabilityData ?? [], tableReservation : tableReservationData ?? [], tableReservationStatus : tableReservationStatusData ?? [], drinks: drinkData ?? [], drinkAvailability: drinkAvailabilityData ?? [], drinkOrderLine: drinkOrderLineData ?? [], drinkOrderStatus : drinkOrderStatusData ?? [], drinkReceipt: drinkReceiptData ?? [], customer: customerData ?? []};

};


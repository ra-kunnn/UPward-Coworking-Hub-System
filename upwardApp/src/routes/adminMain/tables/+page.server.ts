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

  depends('supabase:db:Table');
  depends('supabase:db:Table Availability');
  depends('supabase:db:Customer');

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

  const { data: customerData, error: customerError } = await supabase
    .from('Customer')
    .select('*');

    if (tableReservationData && tableReservationData.length > 0) {
      // Iterate over each row to calculate and update the `end_date`
      for (const row of tableReservationData) {
          // Ensure `reservation_date` and `duration` are valid
          if (row.date && row.duration) {
              const { reservation_no, date, duration } = row; // Use reservation_no as the primary identifier
              console.log(date);
              console.log(duration);
              // Calculate the new end_date
              const { data: calculationData, error: calculationError } = await supabase.rpc(
                  'add_interval_to_date', // Custom function to add interval to date
                  {
                      date,
                      duration,
                  }
              );
  
              if (calculationError) {
                  console.error(
                      `Error calculating end_date for reservation_no ${reservation_no}:`,
                      calculationError
                  );
                  continue; // Skip to the next row if there's an error
              }
              console.log(calculationData);
              const newEndDate = calculationData;
              
              // Use Supabase to update `end_date` for this row
              const { error: updateError } = await supabase
                  .from('Table Reservation')
                  .update({
                      end_date: newEndDate, // The calculated end_date
                  })
                  .eq('reservation_no', reservation_no); // Use reservation_no to target the row
  
              if (updateError) {
                  console.error(
                      `Error updating end_date for reservation_no ${reservation_no}:`,
                      updateError
                  );
              }
          }
      }
  }
  return {tables: tableData ?? [], tableAvailability: tableAvailabilityData ?? [], tableReservation : tableReservationData ?? [], tableReservationStatus : tableReservationStatusData ?? [], customer: customerData ?? []};

};


import type { PageServerLoad } from './$types';

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
   .select('*')
   .order('created_at', { ascending: false });

 const { data: customerData, error: customerError } = await supabase
   .from('Customer')
   .select('*');

   const { data: tableData, error: tableError } = await supabase
   .from('Table')
   .select('*');
 
 const { data: tableAvailabilityData, error: tableAvailabilityError } = await supabase
   .from('Table Availability')
   .select('*');

 const { data: tableReservationData, error: tableReservationError } = await supabase
   .from('Table Reservation')
   .select('*')
   .order('date', { ascending: false });
 const { data: tableReservationStatusData, error: tableReservationStatusError } = await supabase
   .from('Table Reservation Status')
   .select('*');

 

 return {user, drinks: drinkData ?? [], drinkAvailability: drinkAvailabilityData ?? [], drinkOrderLine: drinkOrderLineData ?? [], drinkOrderStatus : drinkOrderStatusData ?? [], drinkReceipt: drinkReceiptData ?? [], customer: customerData ?? [],tables: tableData ?? [], tableAvailability: tableAvailabilityData ?? [], tableReservation : tableReservationData ?? [], tableReservationStatus : tableReservationStatusData ?? []};

};

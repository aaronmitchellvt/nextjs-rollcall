import supabase from "@/lib/supabase";

export async function fetchEvents() {
  const { data } = await supabase.from("Events").select("*");
  return data;
};
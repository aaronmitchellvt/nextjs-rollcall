import supabase from "@/lib/supabase";

export async function fetchEvents() {
  const { data } = await supabase.from("Events").select("*");
  return data;
};

export async function fetchEventDetails (eventId: any) {
  let { data } = await supabase.from("Events").select("*").eq("id", eventId);
  return data;
};

export async function fetchEventPlayers(eventId: any) {
  let { data } = await supabase
    .from("Joined_Players")
    .select("*")
    .eq("event_id", eventId);
  return data;
};
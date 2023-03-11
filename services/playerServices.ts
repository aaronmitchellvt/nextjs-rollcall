import { IUserPayload } from "@/components/layout/PrimaryLayout";
import supabase from "@/lib/supabase";
import { Session } from "inspector";

export async function fetchUser () {
  const { data } = await supabase.auth.getUser();
  return data;
};

export async function checkPlayerDetails (userId: any) {
  const response = await supabase
    .from("Player")
    .select("*")
    .eq("id", userId);
  return response;
};

export async function onSubmitPlayerDetails (userId: any, userPayload: IUserPayload) {
  const { name, division } = userPayload;
  const response = await supabase.from("Player").insert([
    {
      id: userId,
      name: name,
      division: division,
    },
  ]);
  return response;
};
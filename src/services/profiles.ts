import { supabase } from "@/lib/supabase";

export const createProfile = async (
  userId: string,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: number,
  agree: boolean,
  newsletter: boolean
) => {
  const { error } = await supabase.from("profiles").insert([
    {
      id: userId,
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      newsletter,
      agree_to_terms: agree,
    },
  ]);
  if (error) throw error;
};

export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile", error);
    return null;
  }

  return data;
};

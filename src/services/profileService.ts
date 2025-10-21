import { Address } from "@/app/types";
import { supabase } from "@/lib/supabase";
import { useProfileStore } from "@/store/profileStore";

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

export const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile", error);
    return null;
  }

  const { setProfile } = useProfileStore.getState();
  setProfile(data);
};

export const updateProfileAddress = async (
  userId: string,
  newAddress: Omit<Address, "id">
) => {
  const { profile, setProfile } = useProfileStore.getState;

  const updatedAddresses = [...(profile.addresses || []), newAddress];
  // Update Supabase
  const { error } = await supabase
    .from("profiles")
    .update({ addresses: updatedAddresses })
    .eq("id", userId);

  if (error) {
    console.error("Error updating addresses:", error);
    throw error;
  }

  // Update Zustand store too
  if (profile) {
    setProfile({ ...profile, addresses: updatedAddresses });
  }
};

import { supabase } from "@/lib/supabase";

export const fetchCart = async (user_id: string) => {
  const { data, error } = await supabase
    .from("carts")
    .select("*, cart_items(*)")
    .eq("user_id", user_id)
    .single();

  if (error) throw error;

  return data;
};

export const addToCart = async (
  product_id: string,
  quantity: number = 1,
  user_id: string
) => {
  try {
    // checking if the cart exists
    const { data: existingCart, error: existError } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user_id)
      .eq("status", "pending")
      .limit(1)
      .maybeSingle();

    if (existError) {
      throw existError;
    }

    let cartId: number;
    // if it does not exist
    if (!existingCart) {
      const { data: newCart, error: newCartError } = await supabase
        .from("carts")
        .insert({ user_id: user_id, status: "pending" })
        .select()
        .single();

      if (newCartError) throw newCartError;

      cartId = newCart.id;
    } else {
      cartId = existingCart.id;
      console.log("existing cart id", cartId);
    }

    // checking to see if product is already in cart so as to update quantity
    const { data: existingItem, error: existItemError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", cartId)
      .eq("product_id", product_id)
      .maybeSingle();

    if (existItemError) throw existItemError;

    let cartItem;
    if (existingItem) {
      const { data, error } = await supabase
        .from("cart_items")
        .update({
          quantity: existingItem.quantity + quantity,
        })
        .eq("cart_id", cartId)
        .eq("product_id", product_id)
        .select()
        .single();

      if (error) throw error;

      cartItem = data;
    } else {
      const { data, error: itemError } = await supabase
        .from("cart_items")
        .insert({
          cart_id: cartId,
          product_id: product_id,
          quantity: quantity,
        })
        .select()
        .single();
      if (itemError) throw itemError;
      console.log("Added item to cart:", cartItem);
      cartItem = data;
    }

    return cartItem;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateQuantity = async (newQty: number, cartItemId: string) => {
  const { data, error } = await supabase
    .from("carts")
    .update({ quantity: newQty })
    .eq("id", cartItemId);

  if (error) throw error;

  return data;
};

export const deleteItem = async (cartItemId: string) => {
  await supabase.from("cart_items").delete().eq("id", cartItemId);
};

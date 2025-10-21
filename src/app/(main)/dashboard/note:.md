note:

on pay on delivery:
Save the order in your database with status: "pending" and payment_status: "unpaid".
When delivery is confirmed, you can update payment_status to "paid".



order schema
{
  id: "order123",
  userId: "user456",
  items: [...],
  totalAmount: 5000,
  paymentMethod: "cod" | "bank_transfer" | "online",
  paymentStatus: "unpaid" | "pending_verification" | "paid",
  orderStatus: "pending" | "confirmed" | "delivered"
}

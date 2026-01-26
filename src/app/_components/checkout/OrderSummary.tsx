import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/ui/Spinner";

export default function OrderSummary({
  cartItems,
  grandTotal,
  loading,
  paymentMethod,
  onContinue,
}) {
  return (
    <div className="border p-6 bg-white rounded-sm">
      <div>
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner />
          </div>
        ) : cartItems.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative inline-block">
                    <img
                      src={item.imageSrc || "/placeholder.svg"}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      ${item.productPrice.toFixed(2)} each
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.quantity * item.productPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <Badge variant="secondary" className="w-full justify-center py-2">
          Free returns within 30 days
        </Badge>
        <Badge variant="outline" className="w-full justify-center py-2">
          Secure checkout with SSL encryption
        </Badge>
      </div>

      <Button
        onClick={onContinue}
        className="w-full mt-6 py-4"
        size="lg"
        disabled={!paymentMethod || cartItems.length === 0}
      >
        {paymentMethod
          ? paymentMethod === "cod"
            ? "Place Order"
            : paymentMethod === "bank"
              ? "Confirm Bank Transfer"
              : "Proceed to Payment"
          : "Select Payment Method"}
      </Button>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Truck, Mail } from "lucide-react";

export default function OrderConfirmationModal({ orderDetails, grandTotal, onClose }) {
  const getPaymentMethodName = (method) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery";
      case "bank":
        return "Bank Transfer";
      case "gateway":
        return "Online Payment";
      default:
        return method;
    }
  };

  const bankReference = `ORDER-${Date.now()}`;

  return (
    <div className="space-y-4 py-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Thank you for your order!
        </h3>
        <p className="text-gray-600 mt-1">
          Your order has been received and is being processed.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Order Number:</span>
          <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
            {orderDetails?.orderNumber}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Payment Method:</span>
          <span className="text-sm text-gray-900">
            {orderDetails && getPaymentMethodName(orderDetails.paymentMethod)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Amount:</span>
          <span className="text-sm font-semibold text-gray-900">
            ${grandTotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-700">Estimated Delivery:</span>
          <span className="text-sm text-gray-900 text-right">
            {orderDetails?.estimatedDelivery}
          </span>
        </div>
      </div>

      {orderDetails?.paymentMethod === "bank" && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-900">
                Next Steps for Bank Transfer:
              </h4>
              <ul className="text-xs text-amber-800 mt-2 space-y-1">
                <li>• Transfer ${grandTotal.toFixed(2)} to the provided bank account</li>
                <li>• Use reference: {bankReference}</li>
                <li>• Email receipt to orders@techstore.com</li>
                <li>• Order ships within 24hrs of payment verification</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {orderDetails?.paymentMethod === "cod" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Cash on Delivery</h4>
              <p className="text-xs text-blue-800 mt-1">
                Have ${grandTotal.toFixed(2)} ready when your order arrives. You can pay
                with cash or card.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Mail className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-green-900">Order Confirmation</h4>
            <p className="text-xs text-green-800 mt-1">
              A confirmation email with tracking details has been sent to your email
              address.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
          Continue Shopping
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            onClose();
            alert("Redirecting to order tracking...");
          }}
        >
          Track Order
        </Button>
      </div>
    </div>
  );
}
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Truck, Building2, Copy, Check } from "lucide-react";

export default function PaymentSection({ paymentMethod, onPaymentChange, grandTotal }) {
  const [copiedField, setCopiedField] = useState("");

  // Generate bank reference once
  const bankReference = useMemo(() => `ORDER-${Date.now()}`, []);

  const bankDetails = {
    bankName: "First National Bank",
    accountName: "TechStore Inc.",
    accountNumber: "1234567890",
    routingNumber: "021000021",
    swiftCode: "FNBKUS33",
    reference: bankReference,
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <div className="border p-6 bg-white rounded-sm">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </div>
      </div>

      <div className="space-y-3">
        {/* Pay on Delivery */}
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
            paymentMethod === "cod"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="mr-3"
          />
          <Truck className="h-5 w-5 mr-3 text-gray-600" />
          <div>
            <p className="font-medium">Pay on Delivery</p>
            <p className="text-sm text-gray-500">
              Pay cash or card when your order arrives.
            </p>
          </div>
        </label>

        {/* Direct Bank Transfer */}
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
            paymentMethod === "bank"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="mr-3"
          />
          <Building2 className="h-5 w-5 mr-3 text-gray-600" />
          <div>
            <p className="font-medium">Direct Bank Transfer</p>
            <p className="text-sm text-gray-500">
              Transfer to our bank account and send proof of payment.
            </p>
          </div>
        </label>

        {paymentMethod === "bank" && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-semibold text-amber-900 mb-3">Bank Transfer Details</h4>
            <div className="space-y-3 text-sm">
              {Object.entries({
                "Bank Name": bankDetails.bankName,
                "Account Name": bankDetails.accountName,
                "Account Number": bankDetails.accountNumber,
                "Routing Number": bankDetails.routingNumber,
                Reference: bankDetails.reference,
              }).map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-amber-700">{label}:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{value}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(value, label)}
                      className="h-6 w-6 p-0"
                    >
                      {copiedField === label ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-amber-100 rounded-md">
              <h5 className="font-medium text-amber-900 mb-2">Instructions:</h5>
              <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
                <li>
                  Transfer the exact amount of <strong>${grandTotal.toFixed(2)}</strong> to
                  the above account
                </li>
                <li>
                  Use the reference number <strong>{bankDetails.reference}</strong> in your
                  transfer
                </li>
                <li>
                  Email your payment receipt to <strong>orders@techstore.com</strong>
                </li>
                <li>
                  Your order will be processed within 24 hours of payment verification
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Online Payment Gateway */}
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
            paymentMethod === "gateway"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="gateway"
            checked={paymentMethod === "gateway"}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="mr-3"
          />
          <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
          <div>
            <p className="font-medium">Online Payment Gateway</p>
            <p className="text-sm text-gray-500">
              Pay securely online with your card or mobile wallet.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
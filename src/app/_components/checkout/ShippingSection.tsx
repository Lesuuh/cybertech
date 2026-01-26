import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ShippingSection({
  addresses,
  selectedAddress,
  onAddressChange,
  onAddAddress,
}) {
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    city: "",
    state: "",
    street: "",
  });

  //   console.log(addresses);

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAddress = () => {
    if (
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.label ||
      !newAddress.street
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onAddAddress(newAddress);

    // In a real app, save to localStorage or state management
    toast("Address saved successfully!");
    setShowNewAddress(false);
    setNewAddress({ label: "", city: "", state: "", street: "" });
  };

  return (
    <div className="shadow-0 border-1 p-6 bg-white rounded-sm">
      <div className="pb-4">
        <div className="flex items-center gap-3 text-xl font-semibold text-gray-900">
          Shipping Information
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Choose a delivery address for your order
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Delivery Address
          </h3>

          <div className="space-y-3">
            {addresses.map((address) => (
              <div key={address.id} className="flex items-start space-x-3">
                <input
                  type="radio"
                  id={`address-${address.id}`}
                  name="deliveryAddress"
                  value={address.id}
                  checked={selectedAddress === address.id}
                  onChange={(e) => onAddressChange(e.target.value)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`address-${address.id}`}
                  className="flex-1 cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-gray-100 rounded">
                      <MapPin className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">
                        {address.label}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>{address.street}</div>
                        <div>
                          {address.city}, {address.state}
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            ))}

            <div className="flex items-start space-x-3">
              <button
                type="button"
                onClick={() => setShowNewAddress((prev) => !prev)}
                className="flex-1 p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <div className="p-1 bg-gray-100 rounded">
                  <Plus className="h-4 w-4 text-black" />
                </div>
                <span className="font-medium text-black">
                  {!addresses || addresses.length === 0
                    ? "Add an Address"
                    : "Add New Address"}
                </span>
              </button>
            </div>
          </div>

          {/* <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200"> */}
          <Dialog open={showNewAddress} onOpenChange={setShowNewAddress}>
            <DialogContent>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add New Address
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label
                    htmlFor="label"
                    className="text-sm w-full font-medium text-gray-700"
                  >
                    Address Label <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="label"
                    type="text"
                    value={newAddress.label}
                    onChange={(e) =>
                      handleNewAddressChange("label", e.target.value)
                    }
                    placeholder="e.g., Home, Office, Parent's house"
                    className="mt-1 py-6 w-full"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label
                    htmlFor="street"
                    className="text-sm font-medium text-gray-700"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="street"
                    type="text"
                    value={newAddress.street}
                    onChange={(e) =>
                      handleNewAddressChange("street", e.target.value)
                    }
                    placeholder="Enter your street address"
                    className="mt-1 py-6"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={newAddress.city}
                    onChange={(e) =>
                      handleNewAddressChange("city", e.target.value)
                    }
                    placeholder="Enter your city"
                    className="mt-1 py-6"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="state"
                    className="text-sm font-medium text-gray-700"
                  >
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    value={newAddress.state}
                    onChange={(e) =>
                      handleNewAddressChange("state", e.target.value)
                    }
                    placeholder="Enter your state"
                    className="mt-1 py-6"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="py-6 px-8"
                  onClick={() => setShowNewAddress(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="py-6 px-8"
                  onClick={handleSaveAddress}
                >
                  Save Address
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* )}
        </div> */}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, MapPin, X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = () => {
    if (
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.label ||
      !newAddress.street
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    onAddAddress(newAddress);
    toast.success("Address saved successfully!");
    setShowNewAddress(false);
    setNewAddress({ label: "", city: "", state: "", street: "" });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-gray-400" />
          <h2 className="text-xl font-medium tracking-tight text-gray-900">
            Shipping Information
          </h2>
        </div>
        <p className="text-[10px] tracking-[0.15em] text-gray-400 uppercase mt-1">
          Select delivery destination
        </p>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <label
            key={address.id}
            className={`flex items-start p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${
              selectedAddress === address.id
                ? "border-gray-900 bg-gray-50/50"
                : "border-gray-100 hover:border-gray-300"
            }`}
          >
            {/* Custom Radio Icon */}
            <div className="pt-1 mr-4">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedAddress === address.id
                    ? "border-gray-900"
                    : "border-gray-300"
                }`}
              >
                {selectedAddress === address.id && (
                  <div className="w-2 h-2 bg-gray-900 rounded-full" />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-gray-900">
                {address.label}
              </span>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider leading-relaxed">
                {address.street}
                <br />
                {address.city}, {address.state}
              </div>
            </div>

            <input
              type="radio"
              name="deliveryAddress"
              value={address.id}
              checked={selectedAddress === address.id}
              onChange={(e) => onAddressChange(e.target.value)}
              className="hidden"
            />
          </label>
        ))}

        {/* Add Address Trigger */}
        <button
          type="button"
          onClick={() => setShowNewAddress(true)}
          className="w-full p-5 border border-dashed border-gray-200 rounded-2xl hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 group"
        >
          <Plus className="h-4 w-4 text-gray-400 group-hover:text-gray-900" />
          <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 uppercase tracking-widest">
            {addresses.length === 0
              ? "Add First Address"
              : "Add New Destination"}
          </span>
        </button>
      </div>

      {/* New Address Dialog */}
      <Dialog open={showNewAddress} onOpenChange={setShowNewAddress}>
        <DialogContent className="sm:max-w-[500px] rounded-[32px] p-8 border-none">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-medium tracking-tight">
              Add New Address
            </DialogTitle>
            <p className="text-[10px] tracking-widest text-gray-400 uppercase">
              Input destination details
            </p>
          </DialogHeader>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                Label
              </Label>
              <Input
                value={newAddress.label}
                onChange={(e) =>
                  handleNewAddressChange("label", e.target.value)
                }
                placeholder="e.g., PRIMARY_RESIDENCE"
                className="rounded-xl border-gray-100 bg-gray-50/50 h-12 text-sm focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                Street
              </Label>
              <Input
                value={newAddress.street}
                onChange={(e) =>
                  handleNewAddressChange("street", e.target.value)
                }
                placeholder="123 Cyber Way"
                className="rounded-xl border-gray-100 bg-gray-50/50 h-12 text-sm focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                  City
                </Label>
                <Input
                  value={newAddress.city}
                  onChange={(e) =>
                    handleNewAddressChange("city", e.target.value)
                  }
                  className="rounded-xl border-gray-100 bg-gray-50/50 h-12 text-sm focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                  State
                </Label>
                <Input
                  value={newAddress.state}
                  onChange={(e) =>
                    handleNewAddressChange("state", e.target.value)
                  }
                  className="rounded-xl border-gray-100 bg-gray-50/50 h-12 text-sm focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 rounded-xl h-12 uppercase text-[10px] tracking-widest"
                onClick={() => setShowNewAddress(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 rounded-xl h-12 bg-gray-900 hover:bg-black uppercase text-[10px] tracking-widest"
                onClick={handleSaveAddress}
              >
                Save Destination
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

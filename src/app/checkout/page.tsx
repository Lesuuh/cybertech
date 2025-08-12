"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, MapPin, Pen, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type CheckoutStep = "address" | "shipping" | "payment";

const Checkout = () => {
  const [step, setStep] = useState<CheckoutStep>("shipping");

  const steps: {
    id: CheckoutStep;
    label: string;
    number: number;
    icon: React.ElementType;
  }[] = [
    { id: "address", label: "Address", number: 1, icon: MapPin },
    { id: "shipping", label: "Shipping", number: 2, icon: Truck },
    { id: "payment", label: "Payment", number: 3, icon: CreditCard },
  ];

  useEffect(() => {
    const savedStep = localStorage.getItem(
      "checkoutStep"
    ) as CheckoutStep | null;
    if (savedStep) {
      setStep(savedStep);
    }
  }, []);

  // Save step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("checkoutStep", step);
  }, [step]);

  const handleStep = () => {
    if (step === "address") setStep("shipping");
    if (step === "shipping") setStep("payment");
  };
  return (
    <main className="max-w-[1500px] mx-auto px-4 md:px-16 my-20">
      <div className="flex items-center justify-between px-10">
        {steps.map((s) => {
          // mobile visibility rules
          const isHiddenOnMobile =
            (step === "address" && s.id === "payment") ||
            ((step === "shipping" || step === "payment") && s.id === "address");

          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className={`${
                isHiddenOnMobile ? "hidden" : "flex"
              } sm:flex items-center`}
            >
              <div
                className={`${
                  step === s.id ? "bg-black" : "bg-gray-500"
                } rounded-full mr-2 w-8 h-8 flex justify-center items-center `}
              >
                <Icon
                  size={20}
                  className={` ${
                    step === s.id ? "text-white" : "text-gray-200"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Step {s.number}</span>
                <p
                  className={`text-xl ${
                    step === s.id
                      ? "font-semibold text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* select address */}
      {step === "address" && (
        <div className="my-10">
          <ShippingAddress />
        </div>
      )}

      {/* select shipping method */}
      {step === "shipping" && (
        <div className="my-10">
          <ShippingMethod />
        </div>
      )}

      <div className="flex gap-5 w-full justify-end ">
        <Button
          onClick={() => {
            if (step === "shipping") setStep("address");
            else if (step === "payment") setStep("shipping");
          }}
          className="py-6 px-8 rounded-sm"
          variant="outline"
        >
          Back
        </Button>
        <Button onClick={handleStep} className="py-6 px-8 rounded-sm">
          Next
        </Button>
      </div>
    </main>
  );
};

export default Checkout;

function ShippingAddress() {
  const addresses = [
    {
      id: 1,
      name: "John Doe",
      phone: "+234 801 234 5678",
      city: "Lagos",
      label: "Home",
      address: "123 Banana Street, Ikeja",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+234 809 876 5432",
      city: "Abuja",
      label: "Work",
      address: "456 Mango Avenue, Garki",
    },
  ];

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Select Address</h2>

      {/* Existing addresses */}
      <div className="flex items-start gap-4 flex-wrap">
        {addresses.map((addr) => (
          <label
            key={addr.id}
            htmlFor={addr.id}
            className="flex items-start justify-between bg-gray-200 p-4 rounded-sm w-full sm:w-[48%] cursor-pointer"
          >
            <div className="flex items-start">
              <input
                type="radio"
                id={addr.id}
                name="address"
                className="mr-2"
              />
              <div>
                <p className="bg-black text-white p-1 rounded-sm text-xs font-semibold my-1 w-fit">
                  {addr.label}
                </p>
                <p>{addr.address}</p>
                <p>{addr.phone}</p>
              </div>
            </div>
            <div
              className="flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Pen className="cursor-pointer" />
              <X className="cursor-pointer" />
            </div>
          </label>
        ))}
      </div>

      <p className="text-center mt-10">Or</p>

      {/* Add new address */}
      <div className="mt-6 bg-white p-4  space-y-4">
        <h3 className="text-md font-semibold">Add New Address</h3>
        <form className="space-y-4">
          <Input
            placeholder="Full Address"
            className="py-6 px-0 w-full border-0 shadow-none rounded-none border-b-1 border-black"
          />

          <Input
            placeholder="City"
            className="py-6 px-0 w-full border-0 shadow-none rounded-none border-b-1 border-black"
          />
          <Input
            placeholder="Work or Home"
            className="py-6 px-0 w-full border-0 shadow-none rounded-none border-b-1 border-black"
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            className="py-6 px-0 w-full border-0 shadow-none rounded-none border-b-1 border-black"
          />
          <Button type="button" className="py-6 px-6">
            Save Address
          </Button>
        </form>
      </div>
    </section>
  );
}

const ShippingMethod = () => {
  const [selected, setSelected] = useState("free");
  const [scheduledDate, setScheduledDate] = useState("");

  const fixedFreeDate = "Aug 15, 2025";
  const fixedPaidDate = "Aug 13, 2025";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Shipping Method</h2>

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="space-y-3"
      >
        {/* Free Shipping */}
        <div className="flex items-start space-x-3 rounded-lg border p-3">
          <RadioGroupItem value="free" id="free" />
          <Label
            htmlFor="free"
            className="flex justify-between items-center w-full"
          >
            <span className="font-medium">Free Shipping</span>
            <span className="text-sm text-muted-foreground">
              Delivered on <strong>{fixedFreeDate}</strong> at no cost.
            </span>
          </Label>
        </div>

        {/* Paid Shipping */}
        <div className="flex items-start space-x-3 rounded-lg border p-3">
          <RadioGroupItem value="paid" id="paid" />
          <Label
            htmlFor="paid"
            className="flex justify-between items-center w-full"
          >
            <span className="font-medium">Paid Shipping – $8</span>
            <span className="text-sm text-muted-foreground">
              Delivered on <strong>{fixedPaidDate}</strong>.
            </span>
          </Label>
        </div>

        {/* Scheduled Shipping */}
        <div className="flex items-start space-x-3 rounded-lg border p-3">
          <RadioGroupItem value="scheduled" id="scheduled" />
          <Label
            htmlFor="scheduled"
            className="flex justify-between items-center w-full"
          >
            <span className="font-medium">Scheduled Delivery</span>
            <span className="text-sm text-muted-foreground">
              Choose your preferred delivery date.
            </span>

            {selected === "scheduled" && (
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="mt-2 w-fit"
              />
            )}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export const paymentDetails = () => {
  <div>
    <h2>Payment Details</h2>
  </div>;
};

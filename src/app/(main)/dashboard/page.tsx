"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User, MapPin, LogOut, Package } from "lucide-react";
import { useProfileStore } from "@/store/profileStore";

export default function ProfilePage() {
  const { profile } = useProfileStore.getState();
  const addresses = profile?.addresses || [];
  // const orders = profile?.orders || [];

  const [activeTab, setActiveTab] = useState("profile");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordMessage("All fields are required");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage("Password must be at least 8 characters");
      return;
    }
    setPasswordMessage("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setPasswordMessage(""), 3000);
  };

  const handleLogout = () => console.log("User logged out");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "security", label: "Security", icon: Lock },
    { id: "orders", label: "Orders", icon: Package },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-black">
                {profile?.first_name} {profile?.last_name}
              </h1>
              <p className="text-gray-700 text-sm sm:text-base">
                {profile?.email}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 mt-2 sm:mt-0 px-4 py-2 text-red-500 bg-red-100 rounded-sm font-medium hover:bg-red-200 transition">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white shadow-sm overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex gap-4 border-b border-gray-200">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 py-3 px-2 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === id
                  ? "border-black text-black font-semibold"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                defaultValue={`${profile?.first_name} ${profile?.last_name}`}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email"
                defaultValue={profile?.email}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                defaultValue={profile?.phone || ""}
                className="w-full border px-4 py-2 rounded-lg sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold">Saved Addresses</h2>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                Add New
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold">{addr.label}</h3>
                    <p className="text-gray-700">{addr.street}</p>
                    <p className="text-gray-700">
                      {addr.city}, {addr.state}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="text-sm text-indigo-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-sm text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (field) => (
                  <div key={field} className="relative">
                    <input
                      type={
                        showPasswords[field as keyof typeof showPasswords]
                          ? "text"
                          : "password"
                      }
                      name={field}
                      value={passwordForm[field as keyof typeof passwordForm]}
                      onChange={handlePasswordChange}
                      placeholder={
                        field === "currentPassword"
                          ? "Current password"
                          : field === "newPassword"
                          ? "New password"
                          : "Confirm password"
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          [field]: !prev[field as keyof typeof prev],
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition"
                    >
                      {showPasswords[field as keyof typeof showPasswords] ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                )
              )}
              {passwordMessage && (
                <div
                  className={`p-3 rounded text-sm font-medium ${
                    passwordMessage.includes("successfully")
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {passwordMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Update Password
              </button>
            </form>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Your Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-700">You have no orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:gap-6">
                      <span className="font-semibold">Order #{order.id}</span>
                      <span className="text-gray-600">{order.date}</span>
                      <span
                        className={`font-medium ${
                          order.status === "Completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                      <span className="font-semibold">${order.amount}</span>
                      <button className="text-indigo-600 text-sm hover:underline">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logOut);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successful!");
    router.replace("/login");
  };

  if (!user) return <p>Loading profile...</p>;

  // Sample profile data (replace with actual Supabase profile fields if needed)
  const profile = {
    name: user?.user_metadata?.full_name || "John Doe",
    email: user?.email,
    phone: "+234 801 234 5678",
    address: "23 Lekki Phase 1, Lagos, Nigeria",
    avatar:
      "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
    joined: "January 2025",
    orders: [
      {
        id: "ORD123",
        item: "iPhone 15 Pro",
        status: "Delivered",
        date: "Aug 15, 2025",
      },
      {
        id: "ORD124",
        item: "Samsung Galaxy Buds 3",
        status: "Shipped",
        date: "Sept 1, 2025",
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
          <p className="text-gray-500">{profile.phone}</p>
          <p className="text-gray-500">{profile.address}</p>
          <span className="text-sm text-gray-400">Joined {profile.joined}</span>
        </div>
      </div>

      {/* Account Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button className="bg-blue-500 text-white py-3 rounded-xl shadow hover:bg-blue-600">
          Edit Profile
        </button>
        <button className="bg-gray-200 py-3 rounded-xl shadow hover:bg-gray-300">
          Change Password
        </button>
        <button className="bg-gray-200 py-3 rounded-xl shadow hover:bg-gray-300">
          Wishlist
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-3 rounded-xl shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Order History */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">Order History</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">Item</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {profile.orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.item}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Shipped"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

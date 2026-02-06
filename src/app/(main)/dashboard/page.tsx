// "use client";

// import { useState } from "react";
// import {
//   Eye, EyeOff, Lock, User, MapPin, LogOut, Package,
//   ChevronRight, Settings, Bell, CreditCard
// } from "lucide-react";
// import { useProfileStore } from "@/store/profileStore";

// export default function ProfilePage() {
//   const { profile } = useProfileStore.getState();
//   const addresses = profile?.addresses || [];
//   const orders = []; // Placeholder for your data

//   const [activeTab, setActiveTab] = useState("profile");
//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [showPasswords, setShowPasswords] = useState({
//     current: false, new: false, confirm: false,
//   });
//   const [passwordMessage, setPasswordMessage] = useState("");

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswordForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Your existing logic...
//     setPasswordMessage("Password updated successfully.");
//     setTimeout(() => setPasswordMessage(""), 3000);
//   };

//   const tabs = [
//     { id: "profile", label: "Personal Info", icon: User },
//     { id: "orders", label: "Order History", icon: Package },
//     { id: "addresses", label: "Saved Addresses", icon: MapPin },
//     { id: "security", label: "Security & Login", icon: Lock },
//   ];

//   return (
//     <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
//       {/* Hero / Header Section */}
//       <div className="bg-white border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//             <div className="flex items-center gap-6">
//               <div className="relative">
//                 <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
//                   <span className="text-3xl font-bold text-white uppercase">
//                     {profile?.first_name?.[0]}{profile?.last_name?.[0]}
//                   </span>
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-4 border-[#F8FAFC] rounded-full flex items-center justify-center">
//                   <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
//                 </div>
//               </div>
//               <div className="text-center md:text-left">
//                 <h1 className="text-3xl font-extrabold tracking-tight">
//                   {profile?.first_name} {profile?.last_name}
//                 </h1>
//                 <p className="text-slate-500 font-medium">{profile?.email}</p>
//               </div>
//             </div>
//             <button className="group flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-100 hover:bg-red-50 rounded-xl transition-all duration-200">
//               <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//               <span className="font-semibold text-sm">Sign Out</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//           {/* Sidebar Navigation */}
//           <aside className="lg:col-span-3 space-y-2">
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Account Settings</p>
//             {tabs.map(({ id, label, icon: Icon }) => (
//               <button
//                 key={id}
//                 onClick={() => setActiveTab(id)}
//                 className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
//                   activeTab === id
//                     ? "bg-white text-indigo-600 shadow-sm border border-slate-200"
//                     : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
//                 }`}
//               >
//                 <Icon className={`w-5 h-5 ${activeTab === id ? "text-indigo-600" : "text-slate-400"}`} />
//                 {label}
//               </button>
//             ))}
//           </aside>

//           {/* Main Content Area */}
//           <div className="lg:col-span-9">
//             <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

//               {/* Profile Content */}
//               {activeTab === "profile" && (
//                 <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
//                   <div className="border-b border-slate-100 pb-4">
//                     <h2 className="text-xl font-bold text-slate-900">Personal Details</h2>
//                     <p className="text-slate-500 text-sm">Update your information and how we reach you.</p>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-1.5">
//                       <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
//                       <input
//                         type="text"
//                         defaultValue={`${profile?.first_name} ${profile?.last_name}`}
//                         className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
//                       />
//                     </div>
//                     <div className="space-y-1.5">
//                       <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
//                       <input
//                         type="email"
//                         defaultValue={profile?.email}
//                         className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
//                       />
//                     </div>
//                     <div className="space-y-1.5 md:col-span-2">
//                       <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone Number</label>
//                       <input
//                         type="tel"
//                         defaultValue={profile?.phone || ""}
//                         placeholder="+1 (555) 000-0000"
//                         className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-end pt-4">
//                     <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95">
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Orders Content */}
//               {activeTab === "orders" && (
//                 <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
//                   <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
//                   {orders.length === 0 ? (
//                     <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
//                       <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                       <p className="text-slate-500 font-medium">No orders found.</p>
//                       <button className="mt-4 text-indigo-600 font-bold text-sm">Start Shopping →</button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {/* Order mapping... */}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Security Tab */}
//               {activeTab === "security" && (
//                 <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
//                   <div className="border-b border-slate-100 pb-4">
//                     <h2 className="text-xl font-bold text-slate-900">Security</h2>
//                     <p className="text-slate-500 text-sm">Manage your password and account protection.</p>
//                   </div>

//                   <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-5">
//                     {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
//                       <div key={field} className="space-y-1.5 relative">
//                         <label className="text-xs font-bold text-slate-500 uppercase ml-1">
//                           {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                         </label>
//                         <input
//                           type={showPasswords[field as keyof typeof showPasswords] ? "text" : "password"}
//                           name={field}
//                           value={passwordForm[field as keyof typeof passwordForm]}
//                           onChange={handlePasswordChange}
//                           className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))}
//                           className="absolute right-4 top-9 text-slate-400 hover:text-slate-600"
//                         >
//                           {showPasswords[field as keyof typeof showPasswords] ? <EyeOff size={18} /> : <Eye size={18} />}
//                         </button>
//                       </div>
//                     ))}
//                     <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all">
//                       Update Password
//                     </button>
//                   </form>
//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import React from "react";

const ProfilePage = () => {
  return <div>ProfilePage</div>;
};

export default ProfilePage;

"use client";

import { Menu, Search, ShoppingCart, User, X, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

const navbarItems = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/products" }, // Added for a more "E-comm" feel
  { label: "About", href: "/about" },
  { label: "Support", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartItems = useCartStore((state) => state.items);

  // Handle glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl py-3 shadow-sm border-b border-slate-200"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">
            Cyber<span className="text-indigo-600">Tech</span>
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center p-1 ">
          <ul className="flex items-center">
            {navbarItems.map((item) => {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 text-slate-500 hover:text-slate-900
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Enhanced Search - Desktop */}
          <div className="hidden md:flex items-center relative group">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              placeholder="Search hardware..."
              className="bg-slate-100 border-transparent border focus:border-indigo-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 pl-10 pr-4 py-2 rounded-xl text-sm outline-none w-48 lg:w-64 transition-all"
            />
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-white"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[-1]"
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="md:hidden mx-4 mt-2 p-4 bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col gap-2"
            >
              <div className="relative mb-2">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  placeholder="Search products..."
                  className="w-full bg-slate-100 pl-10 pr-4 py-3 rounded-2xl outline-none"
                />
              </div>
              {navbarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

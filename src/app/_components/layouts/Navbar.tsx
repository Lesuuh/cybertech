"use client";

import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

const navbarItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const navbarIcons = [
  { name: "Cart", href: "/cart", icon: ShoppingCart },
  { name: "Account", href: "/dashboard", icon: User },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);

  return (
    <div>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-black/10 shadow-sm">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between px-4 py-4 md:px-16 lg:px-28">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-bold">
            CyberTech
          </Link>

          {/* Search - desktop */}
          {open === false && (
            <form className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg flex-1 max-w-xs transition-shadow focus-within:shadow-md">
              <Search className="text-gray-400" />
              <Input
                placeholder="Search products..."
                className="border-none outline-none bg-transparent py-2 px-1 focus:ring-0"
              />
            </form>
          )}

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <ul className="flex gap-7">
              {navbarItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`transition-colors duration-200 ${
                      pathname.startsWith(item.href)
                        ? "text-gray-900 font-semibold border-b-2 border-black pb-1"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex gap-5 ml-5">
              {navbarIcons.map(({ name, href, icon: Icon }) => (
                <li key={name} className="relative group">
                  <Link
                    href={href}
                    className="text-gray-600 hover:text-black transition relative"
                    aria-label={name}
                  >
                    {name === "Cart" && cartItems.length > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-2 -right-2 flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
                      >
                        {cartItems.length}
                      </motion.span>
                    )}
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}

          <div>
            <button className="mr-3 md:hidden cursor-pointer relative">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-2 -right-2 flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
              >
                {cartItems.length}
              </motion.span>
              <ShoppingCart />
            </button>
            <button
              type="button"
              className="md:hidden cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden px-5 pb-5 flex flex-col gap-4 bg-white shadow-lg overflow-hidden  absolute left-0 right-0"
            >
              {/* Mobile Search */}
              <form className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg transition-shadow focus-within:shadow-md">
                <Search className="text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="border-none outline-none bg-transparent py-2 px-1 focus:ring-0"
                />
              </form>

              {navbarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-gray-700 hover:text-black hover:underline transition"
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Navbar;

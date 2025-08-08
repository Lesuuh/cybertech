"use client";

import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const navbarIcons = [
  { name: "Cart", href: "/cart", icon: ShoppingCart },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Account", href: "/account", icon: User },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="px-4 sticky top-0 bg-white z-10 md:px-16 lg:px-28 border-b border-white/30">
      <div className="flex items-center gap-5  justify-between px-4 py-4 max-w-[1500px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold"
          aria-label="Cyber Home"
        >
          Cyber
        </Link>

        {/* Search Bar */}
        <form
          action="/search"
          method="GET"
          className="bg-gray-200 rounded-sm sm:flex items-center px-3 w-full max-w-xs hidden "
        >
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <Search className="text-gray-400" aria-hidden="true" />
          <Input
            id="site-search"
            name="q"
            placeholder="Search..."
            className="border-none outline-none ring-0 shadow-none py-5 bg-transparent focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none"
          />
        </form>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-7" aria-label="Main navigation">
          <ul className="md:flex gap-7 hidden  items-center ">
            {navbarItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`hover:underline focus:outline-none focus:underline ${
                    pathname === item.href
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex gap-7">
            {navbarIcons.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="hover:text-black text-gray-600 transition"
                  aria-label={name}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={handleMenu}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden px-5 pb-5"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-4">
            {navbarItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block hover:underline focus:outline-none focus:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

import {
  Smartphone,
  Monitor,
  Camera,
  Tv,
  Watch,
  Gamepad,
  Headphones,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Smartphones", icon: Smartphone, href: "/categories/smartphones" },
  { name: "Laptops", icon: Monitor, href: "/categories/laptops" },
  { name: "Cameras", icon: Camera, href: "/categories/cameras" },
  { name: "Televisions", icon: Tv, href: "/categories/televisions" },
  { name: "Watches", icon: Watch, href: "/categories/watches" },
  { name: "Gaming", icon: Gamepad, href: "/categories/gaming" },
  { name: "Headphones", icon: Headphones, href: "/categories/headphones" },
];

const BrowseCategory = () => {
  return (
    <section className="max-w-[1500px] mx-auto w-full flex-col items-center my-20">
      <h2 className="text-left text-2xl">Browse Category</h2>
      <div className="flex flex-wrap justify-between items-center gap-6 mt-10">
        {categories.map(({ name, icon: Icon, href }, idx) => (
          <Link
            href={href}
            key={idx}
            className="flex flex-col items-center w-40 bg-[#ededed] rounded-sm p-10 hover:bg-gray-300 transition-colors duration-200"
          >
            <Icon className="w-10 h-10 text-gray-700" />
            <span className="mt-2 text-sm font-medium">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrowseCategory;

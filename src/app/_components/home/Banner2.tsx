"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const bannerItems = [
  {
    id: 1,
    imageSrc: "/images/Group 1.png",
    title: "Popular Products",
    desc: "Explore our most loved electronics crafted for performance and design.",
    bg: "bg-white",
    text: "text-gray-900",
  },
  {
    id: 2,
    imageSrc: "/images/ipad.png",
    title: "Android Tablet",
    desc: "Seamless multitasking meets portability in the latest Android tablets.",
    bg: "bg-gray-50",
    text: "text-gray-900",
  },
  {
    id: 3,
    imageSrc: "/images/samsung-galaxy.png",
    title: "Samsung Galaxy",
    desc: "Next-gen Galaxy device with a bold display and refined finish.",
    bg: "bg-gray-100",
    text: "text-gray-900",
  },
  {
    id: 4,
    imageSrc: "/images/Macbook 1.png",
    title: "MacBook Pro",
    desc: "Unleash creativity with the powerful M2 chip and Liquid Retina XDR display.",
    bg: "bg-neutral-900",
    text: "text-white",
  },
];

const Banner2 = () => {
  return (
    <section className="grid w-full max-w-[2000px] mx-auto my-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {bannerItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col items-center justify-between p-8 md:p-10 text-center ${item.bg} ${item.text} transition-all duration-300 hover:shadow-md`}
        >
          <div className="relative w-full h-48 md:h-56 flex items-center justify-center">
            <Image
              src={item.imageSrc}
              alt={item.title}
              width={400}
              height={400}
              className="object-contain w-full h-full transition-transform duration-500 hover:scale-[1.05]"
            />
          </div>

          <div className="mt-6 space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">{item.title}</h2>
            <p className="text-sm md:text-base text-gray-500 max-w-xs mx-auto">
              {item.desc}
            </p>
            {item.id === 4 && (
              <Link href={"/products/21"}>
                <Button className="bg-white text-black hover:text-white hover:border cursor-pointer duration-300  rounded-full lg:px-8 lg:py-6 text-sm group transition-transform active:scale-95">
                  Shop Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Banner2;

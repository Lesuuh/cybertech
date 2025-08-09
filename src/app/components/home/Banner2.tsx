import { Button } from "@/components/ui/button";
import Image from "next/image";

const bannerItems = [
  {
    id: 1,
    imageSrc: "/images/Group 1.png",
    title: "Popular Products",
    desc: "Discover our range of top-selling electronics with incredible performance and features.",
  },
  {
    id: 2,
    imageSrc: "/images/ipad.png",
    title: "Android Tablet",
    desc: "Enjoy a versatile Android tablet with vibrant display and smooth multitasking capabilities.",
  },
  {
    id: 3,
    imageSrc: "/images/samsung-galaxy.png",
    title: "Samsung Galaxy",
    desc: "Experience the latest Samsung Galaxy device featuring cutting-edge technology and design.",
  },
  {
    id: 4,
    imageSrc: "/images/Macbook 1.png",
    title: "MacBook Pro",
    desc: "Powerful MacBook Pro with M2 chip delivering blazing performance and stunning Retina display.",
  },
];

const lastIndex = bannerItems.length;

function getColor(id:number) {
  let bgColor = "#fff";
  if (id === 1) {
    bgColor = "#fff";
  } else if (id === 2) {
    bgColor = "#f9f9f9";
  } else if (id === 3) {
    bgColor = "#eaeaea";
  } else {
    bgColor = "#2c2c2c";
  }
  return bgColor;
}

const Banner2 = () => {
  return (
    <section className="grid w-full max-w-[2000px] my-20 mx-auto grid-cols-2 md:grid-cols-4">
      {bannerItems.map((item, idx) => (
        <div
          key={idx}
          className="p-10 flex flex-col items-center justify-between"
          style={{ background: getColor(item.id) }}
        >
          <div>
            <Image
              src={item.imageSrc}
              width={500}
              height={500}
              alt={item.title}
            />
          </div>
          <div className=" space-y-4">
            <h2
              className={`font-thin text-4xl ${
                item.id === lastIndex ? "text-white" : "text-black"
              }`}
            >
              {item.title}
            </h2>
            <p className="text-[#909090]">{item.desc}</p>
            {item.id === lastIndex ? (
              <Button className=" border rounded-sm py-6 px-13 cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out">
                Shop Now
              </Button>
            ) : (
              <Button
                variant="outline"
                className=" border border-black rounded-sm py-6 px-13 cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out"
              >
                Shop Now
              </Button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Banner2;

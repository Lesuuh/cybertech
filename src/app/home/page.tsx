import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="bg-[#211C24] min-h-[80dvh] text-white px-4 md:px-16 lg:px-28 mx-auto flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-[1400px] mt-40 lg:mt-0 justify-between items-center gap-7 mx-auto">
        {/* Text Section */}
        <div className="text-center space-y-5 w-full">
          <h2 className="font-extrabold text-gray-500 text-3xl">Pro. Beyond</h2>
          <h1 className="text-7xl font-thin">
            IPhone 14 <strong>Pro</strong>
          </h1>
          <p className="text-2xl text-gray-300">
            Created to change everything for the better. For everyone
          </p>
          <Button className="bg-transparent border rounded-sm py-6 px-10 cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out">
            Shop Now
          </Button>
        </div>

        {/* Image Section */}
        <div className="w-full flex items-center justify-center">
          <Image
            src="/images/Iphone Image.png"
            alt="hero-image"
            width={600}
            height={600}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

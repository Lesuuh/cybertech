import { Button } from "@/components/ui/button";
import Image from "next/image";

const BannerCTA = () => {
  const bannerItems = [
    {
      src: "/images/airpod.png",
      alt: "Apple AirPod Max",
      caption: "Computational Audio, Listen, It's Powerful",
      background: "#ededed",
      textColor: "#111111",
      title: "Apple AirPod Max",
    },
    {
      src: "/images/image 36(1).png",
      alt: "Icon 1",
      caption: "Experience the next level of sound clarity.",
      background: "#353535",
      textColor: "#f3f3f3",
      title: "Sound Clarity",
    },
    {
      src: "/images/PlayStation(1).png",
      alt: "PlayStation Icon",
      caption: "Gaming meets immersive audio technology.",
      background: "#ffffff",
      textColor: "#111111",
      title: "Playstation 5",
    },
    {
      src: "/images/MacBook Pro 14(2).png",
      alt: "MacBook Pro",
      caption: "Power and performance, redefined.",
      background: "#ededed",
      textColor: "#111111",
      title: "MacBook Pro",
    },
  ];

  return (
    <section className="bg-white max-w-[2000px]  w-full mx-auto ">
      <div className="grid lg:hidden grid-cols-2 ">
        {bannerItems.map((item, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: item.background, color: item.textColor }}
            className="p-6 flex flex-col items-center w-full"
          >
            <div className="relative w-full max-w-3xl aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                style={{ objectFit: "contain" }}
                // sizes="(max-width: 768px) 100vw, 800px"
                className="w-[200px]"
              />
            </div>
            <h2 className="text-3xl text-black mt-4 font-thin">
              {" "}
              {item.title.split(" ").slice(0, -1).join(" ")}{" "}
              <strong>{item.title.split(" ").slice(-1)}</strong>
            </h2>
            <p className="text-[1rem] leading-7 text-gray-500 mt-3 ">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="lg:flex hidden w-full items-stretch justify-between ">
        <div className="flex-1 flex flex-col h-full">
          {/* Playstation 5 */}
          <div className="flex flex-row justify-between items-center bg-[#ffffff] ">
            <div>
              <Image
                src={"/images/PlayStation.png"}
                width={300}
                height={100}
                alt="playstation"
                className="w-full"
              />
            </div>
            <div className="text-left">
              <h2 className="text-6xl text-black mt-4 font-thin">
                Playstation <strong>5</strong>
              </h2>
              <p className="text-[1rem] leading-7 text-gray-500 mt-3 ">
                Next-gen gaming console with lightning-fast load times and
                immersive graphics.
              </p>
            </div>
          </div>

          {/* Apple Vision Pro - Light background */}
          <div className="flex items-stretch justify-cent">
            <div className="flex-1 flex flex-row justify-between items-center  bg-[#ededed] py-5">
              <div>
                <Image
                  src={"/images/half-air.png"}
                  width={200}
                  height={100}
                  alt="apple vision pro"
                  className="w-full"
                />
              </div>
              <div className="text-left flex-1 px-4">
                <h2 className="text-4xl text-black mt-4 font-thin">
                  Apple Airpod <strong>Pro</strong>
                </h2>
                <p className="text-sm leading-7 text-gray-500 mt-3 ">
                  Cutting-edge spatial computing delivering unparalleled
                  augmented reality experiences.
                </p>
              </div>
            </div>

            {/* Apple Vision Pro - Dark background */}
            <div className="flex-1 flex flex-row justify-between items-center bg-[#353535] py-5">
              <div>
                <Image
                  src={"/images/image 36.png"}
                  width={200}
                  height={200}
                  alt="apple vision pro"
                  className="w-full"
                />
              </div>
              <div className="text-left flex-1 px-4">
                <h2 className="text-4xl text-white mt-4 font-thin">
                  Apple <strong>Vision Pro</strong>
                </h2>
                <p className="text-sm leading-7 text-gray-300 mt-3 ">
                  Experience immersive visuals with breakthrough technology and
                  sleek design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MacBook Air */}
        <div className="flex-1">
          <div className="flex flex-row-reverse justify-between items-center h-full bg-[#f5f5f5] py-5">
            <div className="">
              <Image
                src={"/images/MacBook Pro 14.png"}
                width={300}
                height={100}
                alt="macbook pro"
                className="w-full"
              />
            </div>
            <div className="text-left flex-1 pl-10 ">
              <h2 className="text-6xl text-black mt-4 font-thin">
                MacBook <strong>Air</strong>
              </h2>
              <p className="text-[1rem] leading-7 text-gray-500 mt-3 pr-5 font-">
                The new 15‑inch MacBook Air makes room for more of what you love
                with a spacious Liquid Retina display.
              </p>
              <Button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 transition-colors duration-300 w-max mt-6">
                Shop Now
              </Button>
              {/* <Button className="bg-transparent text-black px-6 py-2.5 rounded-full text-sm font-medium border border-black/40 hover:border-black hover:bg-black/5 transition-all duration-300 w-max mt-6">
                Shop Now
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCTA;

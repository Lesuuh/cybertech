import Image from "next/image";

const Banner3 = () => {
  return (
    <section className="relative w-full max-w-[2000px] my-20 h-[300px] md:h-[400px]">
      <Image
        src="/images/Banner 2.png"
        alt="banner 3"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </section>
  );
};

export default Banner3;

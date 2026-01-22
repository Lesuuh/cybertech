import Banner3 from "@/app/_components/home/Banner3";
import Banner2 from "../../_components/home/Banner2";
import BannerCTA from "../../_components/home/BannerCTA";
import BrowseCategory from "../../_components/home/BrowseCategory";
import Discount from "../../_components/home/Discount";
import Hero from "../../_components/home/Hero";
import Products from "../../_components/home/Products";

const HomePage = () => {
  return (
    <main className="mx-auto ">
      {/* Hero Section */}
      <Hero />
      {/* Banner section */}
      <BannerCTA />
      {/* Browse category */}
      <BrowseCategory />
      {/* Products */}
      <Products />
      {/* Banner 2 */}
      <Banner2 />

      {/* Discounts */}
      <Discount />
      {/* Banner 3 */}
      <Banner3 />
    </main>
  );
};

export default HomePage;

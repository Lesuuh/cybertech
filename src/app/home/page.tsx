import Banner2 from "../components/home/Banner2";
import BannerCTA from "../components/home/BannerCTA";
import BrowseCategory from "../components/home/BrowseCategory";
import Discount from "../components/home/Discount";
import Hero from "../components/home/Hero";
import Products from "../components/home/Products";
import Footer from "../components/layouts/Footer";

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
      {/* <Banner3 /> */}
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default HomePage;

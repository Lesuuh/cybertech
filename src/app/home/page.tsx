import BannerCTA from "../components/home/BannerCTA";
import BrowseCategory from "../components/home/BrowseCategory";
import Hero from "../components/home/Hero";
import Products from "../components/home/Products";

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
    </main>
  );
};

export default HomePage;

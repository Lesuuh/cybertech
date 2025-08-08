import BannerCTA from "../components/home/BannerCTA";
import Hero from "../components/home/Hero";

const HomePage = () => {
  return (
    <main className="mx-auto">
      {/* Hero Section */}
      <Hero />
      {/* Banner section */}
      <BannerCTA />
    </main>
  );
};

export default HomePage;

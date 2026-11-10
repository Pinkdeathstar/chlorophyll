import HeroSection from "../components/home/HeroSection";
import LatestCollections from "../components/home/LatestCollections";
import ShopWithUs from "../components/home/ShopWithUs";
import FrontendLayout from "../components/layouts/FrontendLayout";

export default function Home() {
  return (
    <FrontendLayout>
      <HeroSection />
      <LatestCollections />

      <ShopWithUs />
    </FrontendLayout>
  );
}

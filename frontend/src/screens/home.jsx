import { Navigation } from "../components/navigation";
import { HeroSection } from "../components/landing-page/hero-section";
import { ConnectionPlatform } from "../components/landing-page/connection-platform";

export default function Home() {
    return (
    <div className="font-[family-name:var(--font-geist-sans)] text-base text-black bg-white">
        <Navigation />
         <HeroSection />
        <ConnectionPlatform />
    </div>
    );
}
import Navbar from "@/components/ui/Navbar";
import ProgressLine from "@/components/animations/ProgressLine";
import DotTrigger from "@/components/animations/DotTrigger";
import PageIntro from "@/components/animations/PageIntro";

// Animation Backgrounds
import PrismCanvas from "@/components/animations/PrismCanvas";
import AmbientFluid from "@/components/animations/AmbientFluid";

// Sections
import S01Threshold from "@/components/sections/S01Threshold";
import S02Problem from "@/components/sections/S02Problem";
import S03Insight from "@/components/sections/S03Insight";
import S04Introduction from "@/components/sections/S04Introduction";
import S05_07Capabilities from "@/components/sections/S05_07Capabilities";
import S08Emotion from "@/components/sections/S08Emotion";
import S09Vision from "@/components/sections/S09Vision";
import S10Conversion from "@/components/sections/S10Conversion";
import S11Footer from "@/components/sections/S11Footer";

export default function Home() {
  return (
    <PageIntro>
      <main className="relative flex min-h-screen flex-col items-center justify-between overflow-x-hidden selection:bg-accent selection:text-accent-foreground">

        {/* Global UI & Overlays */}
        <Navbar />
        <ProgressLine />
        <DotTrigger />

        {/* Sections */}
        <S01Threshold />

        <S02Problem />

        <S03Insight />

        {/* Container for Intro + Prism */}
        <div className="relative w-full">
          <PrismCanvas />
          <S04Introduction />
        </div>

        <S05_07Capabilities />

        <div className="relative w-full">
          <AmbientFluid />
          <S08Emotion />
        </div>

        <S09Vision />

        <S10Conversion />

        <S11Footer />
      </main>
    </PageIntro>
  );
}

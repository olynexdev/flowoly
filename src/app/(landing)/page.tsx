import TemplateMarquee from "@/components/common/TemplateMarquee";
import Faq from "@/components/pages/Home/Faq";
import Hero from "@/components/pages/Home/Hero";
import WebflowDevelopment from "@/components/pages/Home/WebflowDevelopment";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <div className="relative pb-20">
        <TemplateMarquee />
        <div
          className="h-[calc(100%+80px)] w-full absolute -top-[80px] left-0 pointer-events-none"
          style={{
            // solid at bottom -> keep solid through middle (50%) -> fade to transparent at top
            background:
              "linear-gradient(to top, #010407 0%, #010407 70%, rgba(1,4,7,0) 100%)",
          }}
        ></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/90 z-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/90 z-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 -top-[50px] w-full h-[80px] bg-gradient-to-t from-black/90 z-10" />
      </div>
      <WebflowDevelopment />
      <Faq />
    </div>
  );
};

export default LandingPage;

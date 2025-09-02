import { templateMarqueeImage } from "@/data/TemplateMarqueeImage";
import React from "react";
import Marquee from "@/components/ui/marquee";

const TemplateMarquee = () => {
  return (
    <div className="relative flex w-full flex-col gap-6 items-center justify-center overflow-hidden -mt-[200px] z-30">
      <Marquee pauseOnHover={false} className="[--duration:50s] [--gap:24px]">
        {templateMarqueeImage.map((item, i) => (
          <div key={i} className="">
            <img src={item.image} alt="" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TemplateMarquee;

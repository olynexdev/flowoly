import { templateMarqueeImage } from "@/data/TemplateMarqueeImage";
import React from "react";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";

const TemplateMarquee = () => {
  return (
    <div className="relative flex w-full flex-col gap-6 items-center justify-center overflow-hidden -mt-[200px] z-30">
      <Marquee pauseOnHover={false} className="[--duration:120s] [--gap:24px]">
        {templateMarqueeImage.map((item, i) => (
          <div
            key={i}
            className="w-[400px] h-full max-h-[400px] object-cover rounded-2xl"
          >
            <Image
              src={item.image}
              alt=""
              className="rounded-2xl h-full w-full"
              width={600}
              height={600}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TemplateMarquee;

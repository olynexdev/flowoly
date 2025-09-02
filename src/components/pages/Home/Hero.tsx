import Image from "next/image";
import React from "react";
import Container from "@/components/global/Container";
import Paragraph from "@/components/ui/Paragraph";
import PrimaryBtn from "@/components/ui/PrimaryBtn";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-[#010101] lg:h-screen max-h-[943px] flex flex-col justify-center overflow-hidden lg:overflow-visible py-20 lg:py-0 relative">
        <Container className="relative">
          <div className="flex flex-col lg:flex-row items-center  gap-[130px] relative hero-content">
            <div className="z-20 text-center">
              <h1 className="text-white mb-5 lg:mb-6 text-3xl md:text-4xl lg:text-5xl 2xl:text-[90px] font-bold lg:leading-[90px] text-center max-w-[1287px]">
                Create Sites Using <br /> Olynex -{" "}
                <span className="template-name text-[#287BF6]">Webflow</span>{" "}
                Theme.
              </h1>
              <Paragraph className="text-paragraphTextColor max-w-[856px] text-center mx-auto">
                We deliver results by crafting visually stunning UI (User
                Interface) and intuitive UX (User Experience), ensuring seamless
                navigation and exceptional user experiences in every single
                digital product we create.
              </Paragraph>
              <PrimaryBtn
                className="mt-10 text-xl py-4"
                rounded="rounded-[8px] "
                text="Book a call"
              />
              <Paragraph className="mt-5 text-paragraphTextColor max-w-[856px] text-center mx-auto">
                Lifetime license, free updates, and fully support.
              </Paragraph>
            </div>

            <div className="absolute right-0">
              <div className="relative">
                <div className="relative lg:w-[520px] h-[456px] rounded-[30px] p-[2px] ">
                  {/* Bottom overlay */}
                </div>

                <div className="absolute -left-24 bottom-14">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="159"
                    height="159"
                    viewBox="0 0 159 159"
                    fill="none"
                  >
                    <g filter="url(#filter0_f_3217_9028)">
                      <circle
                        cx="79.5025"
                        cy="79.4102"
                        r="19.1925"
                        fill="#00F844"
                        fillOpacity="0.6"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_3217_9028"
                        x="0.310059"
                        y="0.217773"
                        width="158.385"
                        height="158.385"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="30"
                          result="effect1_foregroundBlur_3217_9028"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="bg-btn-color w-[200px] h-[200px] rounded-full absolute right-0 top-0 blur-[100px] backdrop-blur-lg z-0"></div>
              </div>
            </div>
          </div>
          <div className="uiux-service-bg-gradient absolute -top-[313px] -left-[444px]"></div>
        </Container>
      </div>
      <div className="absolute top-[300px] -left-[170px] z-10 w-[651px] h-[507px] ">
        <Image
          src="/images/template/webflow-hero-left.png"
          height={651}
          width={507}
          alt="Hero Background"
          className="object-cover h-full w-full rotate-[32deg]"
        />
      </div>
      <div className="absolute top-[320px] -right-[280px] z-10 w-[843px] h-[526px] ">
        <Image
          width={843}
          height={526}
          src="/images/template/webflow-hero-right.png"
          alt="Hero Background"
          className="object-cover w-full h-full rotate-[-29deg]"
        />
      </div>
    </div>
  );
};

export default Hero;

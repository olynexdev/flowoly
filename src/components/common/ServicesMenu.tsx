import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const ServicesMenu = ({
  servicesRef,
  navWidth,
  handleDropdownHover,
  setHoveredService,
  hoveredService,
  services,
}: {
  servicesRef: React.RefObject<HTMLDivElement | null>;
  navWidth: React.MutableRefObject<number>;
  handleDropdownHover: (isHovered: boolean) => void;
  setHoveredService: (service: any | null) => void;
  hoveredService: any | null;
  services: {
    title: string;
    shortDescription: string;
    previewImage: string;
    fullDescription: string;
  }[];
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed transform -translate-x-1/2 left-1/2 lg:top-28 rounded-[30px] bg-transparent lg:bg-[#33333380] p-3 lg:flex items-center z-[999] lg:backdrop-blur-[20px] transition-all duration-500 ease-out border-none lg:border w-[788px] hidden py-[36px] px-[26px]"
      style={{
        left: `calc(50% - ${navWidth.current / 2}px)`,
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
      ref={servicesRef}
      onMouseEnter={() => handleDropdownHover(true)}
      onMouseLeave={() => {
        handleDropdownHover(false);
        setHovered(null);
      }}
    >
      {/* Services List */}
      <div className="w-1/2 pr-4 space-y-[28px]">
        {services.map((service, idx) => (
          <div
            onMouseLeave={() => setHoveredService(null)}
            onMouseEnter={() => {
              setHovered(idx);
              setHoveredService(service);
            }}
            key={idx}
            className="relative"
          >
            {hovered === idx && (
              <motion.div
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                layoutId="service-hover"
                className="absolute -inset-x-3 -inset-y-4 rounded-[20px] bg-black z-0 backdrop-blur-[20px]"
              />
            )}
            <Link
              href={`/services/${service.title.split(' ').join('-').toLocaleLowerCase()}`}
              className="group relative rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary" />
                <h3 className="text-white font-medium text-xl">
                  {service.title}
                </h3>
              </div>
              <p className="text-paragraphTextColor text-sm mt-2 ml-5">
                {service.shortDescription}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2"
          height="231"
          viewBox="0 0 2 231"
          fill="none"
        >
          <path
            d="M1 231L1.00001 6.61612e-06"
            stroke="url(#paint0_linear_3293_334)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3293_334"
              x1="1.49999"
              y1="231"
              x2="1.5"
              y2="2.18551e-08"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E3E3E3" />
              <stop offset="1" stopColor="#FFE4E4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2"
          height="231"
          viewBox="0 0 2 231"
          fill="none"
        >
          <path d="M1 0L1.00001 231" stroke="url(#paint0_linear_3293_335)" />
          <defs>
            <linearGradient
              id="paint0_linear_3293_335"
              x1="1.49999"
              y1="-2.18551e-08"
              x2="1.5"
              y2="231"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E3E3E3" />
              <stop offset="1" stopColor="#FFE4E4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Preview Panel */}
      <div className="w-1/2  border-[rgba(255,255,255,0.1)] pl-6 h-full pr-5">
        <AnimatePresence>
          {hoveredService ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <div className="relative rounded-xl overflow-hidden aspect-video ">
                <Image
                  src={hoveredService.previewImage}
                  alt={hoveredService.title}
                  width={400}
                  height={400}
                  placeholder="blur"
                  loading="lazy"
                  blurDataURL="/placeholder-image.png"
                  className="object-cover"
                />
              </div>
              <h4 className="text-2xl font-semibold text-white mt-6">
                {hoveredService.title}
              </h4>
              <p className="text-paragraphTextColor mt-3">
                {hoveredService.fullDescription}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-gray-500"
            >
              Hover to preview service
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServicesMenu;

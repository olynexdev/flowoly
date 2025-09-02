"use client";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { sidebarVariants } from "../animations/variants";
import ButtonBlack from "../ui/ButtonBlack";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [showNavItems, setShowNavItems] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isToggle, setIsToggle] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const mobileServicesRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navWidth = useRef(788);
  const [hovered, setHovered] = useState<number | null>(null);

  const navLinks = [
    { path: "/about-us", label: "About Us" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/services", label: "Services" },
    { path: "/blog", label: "Blog" },
  ];

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowNavItems(scrollY > lastScrollY ? false : true);
    setLastScrollY(scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  useEffect(() => {
    controls.start({ opacity: showNavItems ? 1 : 0, x: showNavItems ? 0 : 10 });
  }, [showNavItems, controls]);

  useEffect(() => {
    if (navRef.current) {
      navWidth.current = navRef.current.offsetWidth;
    }
  }, [showNavItems]);

  return (
    <>
      <nav
        onMouseLeave={() => setHovered(null)}
        ref={servicesRef}
        className={cn(
          `fixed transform -translate-x-1/2 left-1/2 lg:top-7 rounded-[16px] bg-transparent lg:bg-[#33333380] py-3 px-6 flex items-center z-[999] lg:backdrop-blur-[20px] transition-all duration-500 ease-out  lg:border border-[#ffffff26]`,
          showNavItems ? "w-full lg:w-[788px]" : "w-full lg:w-[622px]"
        )}
      >
        <div className="lg:flex hidden items-center gap-[146px]">
          <Link href={"/"} className="cursor-pointer ">
            <Image
              src={"/logo/logo-white.png"}
              alt="Olynex"
              width={700}
              className="max-w-[84px] max-h-[50px]"
              height={700}
            />
          </Link>
          <motion.div
            className="flex items-center gap-[30px]"
            animate={controls}
          >
            {showNavItems &&
              navLinks.map((nav, idx) => (
                <Link href={nav.path} key={nav.label} className="relative">
                  {hovered === idx && (
                    <motion.div
                      layoutId="hovered"
                      className="absolute -inset-x-3 -inset-y-1 rounded-full bg-black z-0"
                    />
                  )}
                  <div className="whitespace-nowrap font-montserrat text-white  transition-colors z-10 relative">
                    {nav.label}
                  </div>
                </Link>
              ))}
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="lg:hidden flex flex-col items-center gap-12 absolute left-0 top-0 bg-slate-800 p-5 h-screen w-[70%]"
          initial={false}
          animate={isToggle ? "open" : "closed"}
          variants={sidebarVariants}
          ref={mobileServicesRef}
        >
          <div className="flex flex-col justify-between h-full w-full">
            <Link href={"/"} className="cursor-pointer">
              <Image
                src={"/logo/logo-white.png"}
                alt="Olynex"
                width={100}
                height={100}
                className="object-cover"
                priority
              />
            </Link>
          </div>
        </motion.div>

        {/* Desktop Buttons */}
        <div className="lg:flex gap-4 ml-[50px] hidden">
          <Link href={"/contact-us"}>
            {showNavItems ? (
              <PrimaryBtn rounded="rounded-[8px]" text="Contact Us" />
            ) : (
              <ButtonBlack text="Contact Us" />
            )}
          </Link>
          <motion.div
            className={`${!showNavItems ? "block" : "hidden"}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: !showNavItems ? 0 : 100,
              opacity: !showNavItems ? 1 : 0,
            }}
          >
            <Link href="https://calendly.com/olynex/30min" target="_blank">
              <PrimaryBtn rounded="rounded-[8px]" text="Book a call" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsToggle(!isToggle)}
          className="absolute right-3 block lg:hidden top-3 z-50"
        >
          <div className="w-8 h-8 relative cursor-pointer">
            <span
              className={`block absolute bg-white w-8 h-[2px] transition-all duration-300 ${
                isToggle ? "rotate-45 top-1/2" : "top-[10%]"
              }`}
            ></span>
            <span
              className={`block absolute bg-white w-8 h-[2px] transition-all duration-300 ${
                isToggle ? "-rotate-45 top-1/2" : "top-1/2"
              }`}
            ></span>
            <span
              className={`block absolute bg-white w-8 h-[2px] transition-all duration-300 ${
                isToggle ? "opacity-0" : "top-[90%]"
              }`}
            ></span>
          </div>
        </button>
      </nav>
    </>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";
import Container from "../global/Container";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import PrimaryBtn from "../ui/PrimaryBtn";

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#0D1F20] relative font-poppins overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjMTUyRTJGIiBmaWxsLW9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgydi00aDRWNmg0eiBNNiAzNHYtNEg0djRoLTR2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      {/* Main footer content */}
      <Container className="relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href={"/"} className="cursor-pointer ">
                <Image
                  src={"/logo/logo-white.png"}
                  alt="flow"
                  width={700}
                  className="max-w-[84px] max-h-[50px]"
                  height={700}
                />
              </Link>
              <p className="text-gray-300 mt-5 max-w-xs">
                Creating digital experiences that transform businesses and
                exceed expectations.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-4 mt-8">
              {[
                {
                  icon: <Mail size={15} color="white" />,
                  label: "hello@flowoly.com",
                  href: "mailto:hello@flowoly.com",
                },
                {
                  icon: <Phone size={15} color="white" />,
                  label: "+44 7877 418744",
                  href: "tel:+447877418744",
                },
                {
                  icon: <MapPin size={15} color="white" />,
                  label:
                    "1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, United States",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 text-btn-color">{item.icon}</div>
                  <Link
                    href={item?.href || "#"}
                    className="text-gray-300 hover:text-btn-color transition-colors"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Service Section */}
          <div>
            <h6 className="text-lg font-semibold text-white font-montserrat mb-6">
              Services
            </h6>
            <div className="space-y-3">
              <FooterLink path="/services/ui-ux-design" label="UI/UX Design" />
              <FooterLink path="/services/brand-design" label="Brand Design" />
              <FooterLink
                path="/services/web-development"
                label="Web Development"
              />
              <FooterLink
                path="/services/mobile-app-design"
                label="Mobile App Design"
              />
              <FooterLink
                path="/services/software-development"
                label="Software Development"
              />
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h6 className="text-lg font-semibold text-white font-montserrat mb-6">
              Quick Links
            </h6>
            <div className="space-y-3">
              <FooterLink path="/about-us" label="About Us" />
              <FooterLink path="/portfolio" label="Portfolio" />
              <FooterLink path="/career" label="Career" />
              <FooterLink path="/blog" label="Blogs" />
              <FooterLink path="/contact-us" label="Contact Us" />
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h6 className="text-lg font-semibold text-white font-montserrat mb-6">
              Stay Updated
            </h6>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>

            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-[#1E3B3C] border border-[#2D5153] rounded-lg py-3 px-4 text-white placeholder:text-[#8A9A9B] focus:outline-none focus:ring-2 focus:ring-btn-color/30 focus:border-btn-color transition-all"
                  required
                />
              </div>
              <PrimaryBtn
                text="Subscribe"
                className="w-full"
                rounded="rounded-[8px]"
              />
            </form>

            <div className="mt-8">
              <h6 className="text-lg font-semibold text-white font-montserrat mb-4">
                Follow Us
              </h6>
              <div className="flex items-center gap-3">
                <SocialLink
                  href="https://www.behance.net/flow"
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8.56 8.24c1.12 0 1.8-.61 1.8-1.52 0-.91-.68-1.52-1.8-1.52H4.8v3.04h3.76zm0 1.28H4.8v3.52h3.84c1.2 0 1.92-.64 1.92-1.76s-.72-1.76-1.92-1.76zm7.68-3.52h-5.12v1.28h5.12v-1.28zm-1.6 5.44h-3.52v1.28h3.52v-1.28zM15.6 2H4.4C2.52 2 1 3.52 1 5.4v9.2c0 1.88 1.52 3.4 3.4 3.4h11.2c1.88 0 3.4-1.52 3.4-3.4V5.4C19 3.52 17.48 2 15.6 2zm-7 12.88c-2.48 0-3.84-1.28-3.84-3.52 0-.96.32-1.76.88-2.32.56-.56 1.36-.88 2.32-.88h4.24v-.4c0-.96-.64-1.6-1.6-1.6-.96 0-1.6.64-1.6 1.6H7.6c0-1.76 1.36-3.12 3.12-3.12 1.76 0 3.12 1.36 3.12 3.12v5.6c0 1.04-.8 1.6-1.84 1.6z" />
                    </svg>
                  }
                />

                <SocialLink
                  href="https://dribbble.com/flowagency"
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm6.42 6.58c.5.88.78 1.9.78 2.96 0 1.12-.3 2.18-.84 3.1-1.12-.16-2.32-.26-3.58-.26-1.22 0-2.38.08-3.46.24-.02-.08-.04-.16-.04-.24 0-.66.26-1.26.68-1.7.44-.46 1.04-.72 1.7-.72.7 0 1.34.28 1.8.74.32.32.56.72.7 1.16.28-.2.54-.42.78-.66.6-.6 1.06-1.3 1.38-2.08zM10 2.8c1.68 0 3.24.5 4.54 1.36-.2.42-.46.8-.78 1.14-.32.32-.7.6-1.12.8-.24-.56-.64-1.06-1.16-1.44-.54-.4-1.18-.62-1.86-.62-.84 0-1.6.3-2.2.84-.6.54-.94 1.28-.94 2.08 0 .24.04.46.1.68C5.56 7.06 4.28 6.4 3.3 5.4 3.9 3.9 5.74 2.8 10 2.8zM3.42 8.94c.92 0 1.76.32 2.44.86.06.82.3 1.62.68 2.38.4.78.92 1.5 1.54 2.12-.94.4-2.02.62-3.2.62-1.02 0-1.98-.2-2.84-.54.3-2.12 1.42-3.94 3.18-5.04-.02.02-.02.02 0 0zm6.58 7.26c.62 0 1.2-.2 1.68-.54-.24-.62-.56-1.2-.94-1.74-.74-1.04-1.66-1.92-2.72-2.6-.2.46-.32.96-.32 1.5 0 1.32.84 2.44 2.02 2.86.12.04.22.06.28.06v-.54z" />
                    </svg>
                  }
                />

                <SocialLink
                  href="https://www.linkedin.com/company/flowagency/"
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M18.52 0H1.48C.66 0 0 .66 0 1.48v17.04c0 .82.66 1.48 1.48 1.48h17.04c.82 0 1.48-.66 1.48-1.48V1.48C20 .66 19.34 0 18.52 0zM6.54 16.52H3.9V7.5h2.64v9.02zM5.22 6.38c-.84 0-1.54-.7-1.54-1.54 0-.84.7-1.54 1.54-1.54.84 0 1.54.7 1.54 1.54 0 .84-.7 1.54-1.54 1.54zm11.3 10.14h-2.64v-4.7c0-1.1-.02-2.52-1.54-2.52s-1.78 1.2-1.78 2.44v4.78H8.36V7.5h2.54v1.3h.04c.36-.68 1.24-1.4 2.56-1.4 2.74 0 3.24 1.8 3.24 4.14v4.98z" />
                    </svg>
                  }
                />

                <SocialLink
                  href="https://www.facebook.com/flowoly"
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M18.9 0H1.1C.5 0 0 .5 0 1.1v17.8c0 .6.5 1.1 1.1 1.1h9.6v-7.7H8.1V9.2h2.6V7.1c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.4.1v2.8h-1.6c-1.3 0-1.5.6-1.5 1.5v2h3.1l-.4 3.3h-2.7V20h5.1c.6 0 1.1-.5 1.1-1.1V1.1C20 .5 19.5 0 18.9 0z" />
                    </svg>
                  }
                />

                <SocialLink
                  href="https://www.instagram.com/flowagency/"
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M14.8 0H5.2C2.3 0 0 2.3 0 5.2v9.6c0 2.9 2.3 5.2 5.2 5.2h9.6c2.9 0 5.2-2.3 5.2-5.2V5.2C20 2.3 17.7 0 14.8 0zm3.6 14.8c0 2-1.6 3.6-3.6 3.6H5.2c-2 0-3.6-1.6-3.6-3.6V5.2c0-2 1.6-3.6 3.6-3.6h9.6c2 0 3.6 1.6 3.6 3.6v9.6z" />
                      <path d="M10 4.8c-2.9 0-5.2 2.3-5.2 5.2s2.3 5.2 5.2 5.2 5.2-2.3 5.2-5.2S12.9 4.8 10 4.8zm0 8.5c-1.8 0-3.3-1.5-3.3-3.3S8.2 6.7 10 6.7s3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3zM15.4 4.6c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#2D5153] my-12" />

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-gray-300">
          <p className="text-sm order-2 md:order-1">
            © {new Date().getFullYear()} All rights reserved flowoly.
          </p>

          <div className="flex flex-wrap items-center gap-6 order-3 md:order-2">
            <FooterLink path="/terms" label="Terms" target="_blank" />
            <FooterLink
              path="/privacy-policy"
              label="Privacy"
              target="_blank"
            />
            <FooterLink
              path="/cookies-policy"
              label="Cookies"
              target="_blank"
            />
          </div>

          <div className="flex items-center gap-2 order-1 md:order-3 mb-4 md:mb-0">
            <span className="text-sm">Crafted with</span>
            <svg
              className="w-4 h-4 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">by Olynex</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

// Footer Link Component
const FooterLink = ({
  label,
  path = "/",
  target = "_self",
}: {
  label: string;
  path?: string;
  target?: string;
}) => {
  return (
    <Link
      target={target}
      href={path}
      className="text-gray-300 hover:text-btn-color transition-colors block"
    >
      {label}
    </Link>
  );
};

// Social Link Component
const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="w-10 h-10 rounded-full bg-[#1E3B3C] flex justify-center items-center text-paragraphTextColor hover:text-btn-color hover:bg-btn-color/10 transition-colors"
    >
      {icon}
    </Link>
  );
};

export default Footer;

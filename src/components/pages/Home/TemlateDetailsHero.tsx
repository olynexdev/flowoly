import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ITemplate } from "@/server/models/Template";
import { format } from "date-fns";
import { Check } from "lucide-react";

// TemplateDetailsHero Component with Image Slider
const TemplateDetailsHero = ({ data }: { data: ITemplate }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"preview" | "details">("preview");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data?.template_images?.length - 1 ? 0 : prevIndex + 1
    );
  }, [data?.template_images]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data?.template_images?.length - 1 : prevIndex - 1
    );
  }, [data?.template_images]);

  // handle purchase
  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/payment/create-checkout-session", {
        slug: data?.customURL,
        title: data?.title,
        price: data?.price,
        image: data?.template_images,
      });
      const result = res?.data;
      router.push(result?.url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    if (activeTab === "preview") {
      const timer = setTimeout(nextSlide, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, activeTab, nextSlide]);

  return (
    <section className="text-white py-8">
      <div>
        <h2 className="text-4xl font-bold mb-6">{data?.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-stretch">
          <div className="lg:col-span-8">
            <div className="flex mb-6 border-b border-white/10">
              <button
                className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-all ${
                  activeTab === "preview"
                    ? "bg-primary/20 text-primary border-b-2 border-primary"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("preview")}
              >
                Template Preview
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-all ${
                  activeTab === "details"
                    ? "bg-primary/20 text-primary border-b-2 border-primary"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details & Features
              </button>
            </div>

            <div className="bg-glass-dark backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              {activeTab === "preview" ? (
                <div className="relative h-[560px] md:h-[640px] w-full overflow-hidden">
                  <div className="relative h-full w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={data?.template_images[currentIndex]}
                          alt={`Template preview ${currentIndex + 1}`}
                          fill
                          className="object-cover"
                          priority={currentIndex === 0}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center backdrop-blur-sm transition-all"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center backdrop-blur-sm transition-all"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Slide Counter */}
                    <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {currentIndex + 1} / {data?.template_images?.length}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Template Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data?.template_meta_data?.features?.map(
                      (feature: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-primary/20 p-2 rounded-lg mr-3">
                            <svg
                              className="w-5 h-5 text-primary"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 h-full flex">
            <div className="bg-glass-dark backdrop-blur-lg bg-[#242424b6] rounded-2xl p-6 border border-white/10 shadow-xl flex flex-col w-full">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <p className="text-gray-400 mt-1">Premium Webflow Template</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ${data?.price}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  What&lsquo;s Included
                </h3>
                <ul className="space-y-2">
                  {[
                    "Webflow Template File",
                    "Figma Design File",
                    "Detailed Documentation",
                    "Free Support",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-300 gap-2"
                    >
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-sm text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Last updated:</span>
                  <span className="text-white">
                    {data?.updatedAt
                      ? format(new Date(data.updatedAt), "dd MMM yyyy")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <span>Description:</span>
                  <span className="text-white">
                    {data?.short_description || "No description available."}
                  </span>
                </div>
              </div>

              {/* 🚀 Push actions to bottom */}
              <div className="mt-auto pt-6 space-y-3">
                <Link
                  href={data?.live_demo_url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                  View Live Demo
                </Link>

                {data?.purchase_source === "our-site" ? (
                  <button
                    onClick={handlePurchase}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors border border-white/10 "
                  >
                    {loading ? "Loading..." : "Purchase Template"}
                  </button>
                ) : (
                  <Link
                    target="_blank"
                    prefetch={false}
                    href={data?.purchase_url || "#"}
                  >
                    <button className="w-full px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors border border-white/10 ">
                      Purchase Template
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateDetailsHero;

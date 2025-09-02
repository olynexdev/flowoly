"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What makes Flowoly Webflow templates unique?",
    answer:
      "Our templates are crafted with clean design, responsive layouts, and modern UI/UX principles. Each template is optimized for performance and built to be easily customizable in Webflow.",
  },
  {
    question: "Can I use Flowoly templates for client projects?",
    answer:
      "Yes! All Flowoly templates come with licenses that allow you to use them for personal or commercial client projects, so you can launch websites faster with confidence.",
  },
  {
    question: "Do Flowoly templates work on all devices?",
    answer:
      "Absolutely. Every template is fully responsive, ensuring a seamless experience on desktops, tablets, and smartphones right out of the box.",
  },
  {
    question: "Can I customize colors, fonts, and layouts?",
    answer:
      "Definitely! All Flowoly templates are designed for easy customization in Webflow Designer. You can change colors, fonts, and layouts without touching a single line of code.",
  },
  {
    question: "Do you provide updates or support?",
    answer:
      "Yes. We regularly update templates to keep them modern and bug-free. Plus, our support team is here to help if you need assistance.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our Webflow templates and
            services.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden transition-all hover:border-gray-600/50"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex justify-between items-center w-full p-6 text-left cursor-pointer"
              >
                <span className="font-medium text-lg pr-4">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    className="w-5 h-5 text-primary"
                    strokeWidth={2.5}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;

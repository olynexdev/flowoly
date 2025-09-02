"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, Star, Zap } from "lucide-react";

const NotFound = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft((prev) => Math.max(0, prev - 0.0001));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
          >
            <Zap className="w-16 h-16 text-white" fill="white" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Coming Soon
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            We're working hard to bring you an amazing experience. Our new page
            is under construction and will be launched soon.
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <div className="flex flex-col items-center bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50 min-w-[80px]">
              <span className="text-3xl font-bold">{Math.floor(daysLeft)}</span>
              <span className="text-sm text-gray-400">Days</span>
            </div>
            <div className="flex flex-col items-center bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50 min-w-[80px]">
              <span className="text-3xl font-bold">
                {Math.floor((daysLeft % 1) * 24)}
              </span>
              <span className="text-sm text-gray-400">Hours</span>
            </div>
            <div className="flex flex-col items-center bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50 min-w-[80px]">
              <span className="text-3xl font-bold">
                {Math.floor((((daysLeft % 1) * 24) % 1) * 60)}
              </span>
              <span className="text-sm text-gray-400">Minutes</span>
            </div>
          </div>

          {/* Notify Form */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Mail className="w-6 h-6 text-blue-400" />
              Get notified when we launch
            </h2>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 px-6 bg-green-900/30 rounded-lg border border-green-700/50"
              >
                <p className="text-green-400 flex items-center justify-center gap-2">
                  <Star className="w-5 h-5" fill="currentColor" />
                  Thank you! We'll notify you when we launch.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 mt-6"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Clock className="w-5 h-5" />
                  Notify Me
                </button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {[
              { name: "Twitter", color: "hover:text-blue-400" },
              { name: "Instagram", color: "hover:text-pink-400" },
              { name: "LinkedIn", color: "hover:text-blue-300" },
              { name: "GitHub", color: "hover:text-gray-300" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

"use client";

import { motion } from "motion/react";
import { FaPalette, FaRocket, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaPalette className="w-full h-full" />,
    title: "Customizable Templates",
    description:
      "Pick from a variety of stunning templates and adjust the color palette to match your personal style.",
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-50 to-purple-50",
    borderGradient: "from-indigo-200 to-purple-200",
  },
  {
    icon: <FaRocket className="w-full h-full" />,
    title: "One-Click Deployment",
    description:
      "Deploy your portfolio instantly without any technical setup—your site is live in minutes.",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    borderGradient: "from-purple-200 to-pink-200",
  },
  {
    icon: <FaChartLine className="w-full h-full" />,
    title: "Dashboard Management",
    description:
      "Manage your site's data and content easily from our powerful, user-friendly dashboard.",
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-50",
    borderGradient: "from-pink-200 to-rose-200",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Powerful Features
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              for Your Portfolio
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Build and launch a professional portfolio in minutes with our
            customizable templates, instant deployment, and intuitive dashboard.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative bg-gradient-to-br ${feature.bgGradient} p-6 sm:p-8 rounded-3xl border border-transparent bg-clip-padding h-full flex flex-col`}>
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                <div className="absolute inset-[1px] bg-white rounded-3xl -z-10"></div>
                
                {/* Icon container */}
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-4 sm:mb-6 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                   <div className="w-6 h-6 sm:w-8 sm:h-8">{feature.icon}</div>
                 </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-20`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

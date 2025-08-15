"use client";

import { motion } from "motion/react";
import { FaPalette, FaRocket, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaPalette className="w-10 h-10 text-indigo-500" />,
    title: "Customizable Templates",
    description:
      "Pick from a variety of stunning templates and adjust the color palette to match your personal style.",
  },
  {
    icon: <FaRocket className="w-10 h-10 text-pink-500" />,
    title: "One-Click Deployment",
    description:
      "Deploy your portfolio instantly without any technical setup—your site is live in minutes.",
  },
  {
    icon: <FaChartLine className="w-10 h-10 text-green-500" />,
    title: "Dashboard Management",
    description:
      "Manage your site’s data and content easily from our powerful, user-friendly dashboard.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-900"
        >
          Powerful Features for Your Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16"
        >
          Build and launch a professional portfolio in minutes with our
          customizable templates, instant deployment, and intuitive dashboard.
        </motion.p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

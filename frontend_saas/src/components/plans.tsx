"use client";

import { motion } from "motion/react";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    price: "$9",
    subtitle: "Perfect for quick launches",
    features: ["Deployed Site", "Free domain"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$24",
    subtitle: "For serious portfolio owners",
    features: [
      "Deployed Site",
      "Free domain",
      "Full Color Palette Customization",
      "Dashboard Data Access",
      "Advanced Analytics",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$39",
    subtitle: "For brands that want their own identity",
    features: [
      "Deployed Site",
      "Custom Domain",
      "Full Color Palette Customization",
      "Dashboard Data Access",
      "Advanced Analytics",
    ],
    highlighted: false,
  },
  //   {
  //     name: "Enterprise",
  //     price: "Custom",
  //     subtitle: "Tailored for large teams",
  //     features: [
  //       "Custom Solutions",
  //       "Dedicated Account Manager",
  //       "Service-Level Agreement (SLA)",
  //       "Custom Integrations",
  //     ],
  //     highlighted: false,
  //   },
];

const Plans = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4 tracking-tight text-gray-900"
        >
          Choose Your Plan
        </motion.h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Zonefolio gives you everything you need to launch your professional
          portfolio. Pick a plan that fits your needs and start today.
        </p>

        <div className="flex flex-col items-center justify-evenly gap-8 md:flex-row">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className={`relative p-8 rounded-2xl border min-h-[25rem] min-w-[18rem] ${
                plan.highlighted
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xl"
                  : "bg-white text-gray-900 border-gray-200 shadow-md"
              } flex flex-col`}
            >
              {plan.highlighted && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p
                className={`mb-6 ${
                  plan.highlighted ? "text-indigo-100" : "text-gray-500"
                }`}
              >
                {plan.subtitle}
              </p>

              <div className="text-4xl font-extrabold mb-8">
                {plan.price}
                {plan.price !== "Custom" && (
                  <span className="text-lg font-medium ml-1">/month</span>
                )}
              </div>

              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <FaCheck
                      className={`${
                        plan.highlighted ? "text-white" : "text-indigo-600"
                      } w-5 h-5 flex-shrink-0`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`mt-8 w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;

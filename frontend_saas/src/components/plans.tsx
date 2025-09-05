"use client";

import { motion } from "motion/react";
import { FaCheck, FaStar, FaCrown, FaRocket } from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    price: "$9",
    subtitle: "Perfect for quick launches",
    features: ["Deployed Site", "Free domain"],
    highlighted: false,
    icon: FaRocket,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
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
    icon: FaStar,
    gradient: "from-purple-600 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
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
    icon: FaCrown,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
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
    <section id="pricing" className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent px-4 sm:px-0">
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Zonefolio gives you everything you need to launch your professional
            portfolio. Pick a plan that fits your needs and start today.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:items-stretch px-4 sm:px-0">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className={`relative group p-6 sm:p-8 rounded-3xl min-h-[28rem] w-full max-w-sm lg:min-w-[20rem] flex flex-col backdrop-blur-sm border ${
                  plan.highlighted
                    ? `bg-white text-gray-900 border-purple-200 shadow-2xl shadow-purple-500/25`
                    : `bg-gradient-to-br ${plan.bgGradient} text-gray-900 border-white/60 shadow-xl hover:shadow-2xl`
                } transition-all duration-500`}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
                
                {plan.highlighted && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-sm font-bold px-6 py-2 rounded-full shadow-lg"
                  >
                    ⭐ Most Popular
                  </motion.span>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{plan.name}</h3>
                <p className={`mb-6 sm:mb-8 text-base sm:text-lg ${
                  plan.highlighted ? "text-gray-600" : "text-gray-600"
                }`}>
                  {plan.subtitle}
                </p>

                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8">
                  <span className={`bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className={`text-lg sm:text-xl font-medium ml-2 ${
                      plan.highlighted ? "text-gray-500" : "text-gray-500"
                    }`}>/month</span>
                  )}
                </div>

                <ul className="space-y-3 sm:space-y-4 flex-1 mb-6 sm:mb-8">
                  {plan.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base"
                    >
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                        <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 ${
                    plan.highlighted
                      ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-purple-500/25`
                      : `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-purple-500/25`
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Plans;

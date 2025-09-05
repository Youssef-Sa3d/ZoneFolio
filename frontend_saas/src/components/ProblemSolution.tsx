"use client";

import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaRobot,
  FaUserTie,
  FaCheckCircle,
  FaExclamationTriangle,
  FaStar,
  FaRocket,
} from "react-icons/fa";

const ProblemSection = () => {

    const problems = [
      {
        icon: FaLaptopCode,
        title: "Limited Control on No-Code Platforms",
        description:
          "Visual drag-and-drop tools make building easy, but they often lock your data and restrict the ability to edit, remove, or manage portfolio content freely.",
        gradient: "from-red-500 to-pink-500",
        bgGradient: "from-red-50 to-pink-50",
      },
      {
        icon: FaRobot,
        title: "AI-Generated Designs Still Have Gaps",
        description:
          "AI design tools can produce layouts quickly, but issues like imperfect styling, no direct content access, and deployment difficulties still exist.",
        gradient: "from-orange-500 to-red-500",
        bgGradient: "from-orange-50 to-red-50",
      },
      {
        icon: FaUserTie,
        title: "Freelancers Can Be Costly & Time-Consuming",
        description:
          "Custom builds with integrated dashboards require higher budgets and longer delivery times, especially when connecting to a backend.",
        gradient: "from-yellow-500 to-orange-500",
        bgGradient: "from-yellow-50 to-orange-50",
      },
    ];


  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
            <div className="hidden sm:flex w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl items-center justify-center mr-0 sm:mr-4 mb-4 sm:mb-0">
              <FaExclamationTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-orange-800 bg-clip-text text-transparent text-center">
              The Problems with Current Portfolio Solutions
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Most portfolio solutions fall short in key areas that matter to professionals
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {problems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className={`group relative p-6 sm:p-8 bg-gradient-to-br ${item.bgGradient} rounded-3xl shadow-xl hover:shadow-2xl border border-white/60 backdrop-blur-sm transition-all duration-500`}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
                
                {/* Icon */}
                <div className={`flex w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const solutions = [
    {
      icon: FaCheckCircle,
      title: "Complete Control Over Your Data",
      description:
        "Unlike no-code platforms that lock your content, you get full ownership with dashboard access to edit, add, or remove portfolio content whenever you want.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      icon: FaRocket,
      title: "Professional Design Without AI Limitations",
      description:
        "Hand-crafted templates with perfect styling and seamless deployment - no more AI-generated design gaps or technical issues.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: FaStar,
      title: "Affordable Alternative to Custom Development",
      description:
        "Get the same quality as expensive freelancer builds with integrated backend and dashboard - at a fraction of the cost and time.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-green-50 to-blue-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
            <div className="hidden sm:flex w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl items-center justify-center mr-0 sm:mr-4 mb-4 sm:mb-0">
              <FaCheckCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 bg-clip-text text-transparent text-center">
              How We Solve These Problems
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Our streamlined approach gives you complete control and professional results
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {solutions.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                className={`group relative p-6 sm:p-8 bg-gradient-to-br ${item.bgGradient} rounded-3xl shadow-xl hover:shadow-2xl border border-white/60 backdrop-blur-sm transition-all duration-500`}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
                
                {/* Icon */}
                <div className={`flex w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { ProblemSection, SolutionSection };

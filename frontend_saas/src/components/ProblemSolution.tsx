"use client";

import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaRobot,
  FaUserTie,
  FaCheckCircle,
} from "react-icons/fa";

const ProblemSection = () => {

    const problems = [
      {
        icon: <FaLaptopCode size={28} className="text-indigo-600" />,
        title: "Limited Control on No-Code Platforms",
        description:
          "Visual drag-and-drop tools make building easy, but they often lock your data and restrict the ability to edit, remove, or manage portfolio content freely.",
      },
      {
        icon: <FaRobot size={28} className="text-indigo-600" />,
        title: "AI-Generated Designs Still Have Gaps",
        description:
          "AI design tools can produce layouts quickly, but issues like imperfect styling, no direct content access, and deployment difficulties still exist.",
      },
      {
        icon: <FaUserTie size={28} className="text-indigo-600" />,
        title: "Freelancers Can Be Costly & Time-Consuming",
        description:
          "Custom builds with integrated dashboards require higher budgets and longer delivery times, especially when connecting to a backend.",
      },
    ];


  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
        >
          The Problems with Current Portfolio Solutions
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const solutions = [
    {
      icon: <FaCheckCircle size={28} className="text-green-600" />,
      title: "Pick Your Template",
      description:
        "Select your favorite professional design that matches your style and goals.",
    },
    {
      icon: <FaCheckCircle size={28} className="text-green-600" />,
      title: "Customize Your Colors",
      description:
        "Tailor the color palette to perfectly represent your personal or brand identity.",
    },
    {
      icon: <FaCheckCircle size={28} className="text-green-600" />,
      title: "Full Data Access",
      description:
        "Receive a live portfolio URL with a dashboard login so you can add, edit, or remove content anytime.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
        >
          How We Solve These Problems
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 bg-gray-50 rounded-xl shadow-lg flex flex-col items-center text-center"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProblemSection, SolutionSection };

import React, { useState } from "react";
import Image from "next/image";
import { motion , AnimatePresence } from "motion/react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from 'next/navigation';
import PortfolioModal from "./PortfolioModal";
import { FaEye, FaRocket, FaStar } from "react-icons/fa";


type TemplateCardProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  demoUrl: string;
  index: number;
};

export default function TemplateCard({
  id,
  name,
  description,
  category,
  imageUrl,
  demoUrl,
  index,
}: TemplateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleUseTemplate = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        whileHover={{ 
          scale: 1.03,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl border border-white/60 backdrop-blur-sm transition-all duration-500 overflow-hidden"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
            <FaStar className="w-3 h-3" />
            {category}
          </span>
        </div>
        
        {/* Image container */}
        <div className="relative overflow-hidden rounded-t-3xl">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {name}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <FaEye className="w-4 h-4" />
              Live Demo
            </motion.a>
            <motion.button
              onClick={handleUseTemplate}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <FaRocket className="w-4 h-4" />
              Use Template
            </motion.button>
          </div>
        </div>
        
        {/* Decorative corner element */}
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <PortfolioModal
            templateId={id}
            templateName={name}
            templateImage={imageUrl}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

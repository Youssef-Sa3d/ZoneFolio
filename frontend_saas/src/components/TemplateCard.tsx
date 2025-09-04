import React, { useState } from "react";
import Image from "next/image";
import { motion , AnimatePresence } from "motion/react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from 'next/navigation';
import PortfolioModal from "./PortfolioModal";


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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 }}
        className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition"
      >
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
        <p className="text-xs text-blue-600 mt-2">{category}</p>
        
        <div className="flex gap-2 mt-3">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Live Demo
          </a>
          <button
            onClick={handleUseTemplate}
            className="text-sm text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
          >
            Use Template
          </button>
        </div>
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

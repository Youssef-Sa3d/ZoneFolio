import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

type TemplateCardProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  previewUrl: string;
  demoUrl: string;
  index: number;
};

export default function TemplateCard({
  name,
  description,
  category,
  previewUrl,
  demoUrl,
  index,
}: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition"
    >
      <Image
        src={previewUrl}
        alt={name}
        width={400} 
        height={200}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h2 className="font-semibold text-lg">{name}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="text-xs text-blue-600 mt-2">{category}</p>
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Live Demo
      </a>
    </motion.div>
  );
}

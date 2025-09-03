import React from 'react'
import Image from 'next/image'
import { motion } from "motion/react";


export default function TemplateCard({ template }: { template: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: template.index * 0.15 }}
      className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition"
    >
      <Image
        src={template.previewImageUrl}
        alt={template.name}
        className="w-full h-40 object-cover rounded-md mb-3"
        width={400}
        height={160}
      />
      <h2 className="font-semibold text-lg">{template.name}</h2>
      <p className="text-gray-600 text-sm">{template.description}</p>
    </motion.div>
  );
}

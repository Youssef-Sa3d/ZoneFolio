"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TemplateCard from "@/components/TemplateCard";
import { motion } from "motion/react";

type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  previewUrl: string;
  demoUrl: string;
};

async function fetchTemplates(): Promise<Template[]> {
  const { data } = await axios.get(
    "https://zonefolio-backend.up.railway.app/templates/"
  );
  return data;
}

export default function Page() {
  const {
    data: templates,
    isLoading,
    isError,
    error,
  } = useQuery<Template[]>({
    queryKey: ["templates"],
    queryFn: fetchTemplates,
  });

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <motion.div
          className="flex items-center gap-2 text-gray-600 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-blue-500"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-blue-500"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-blue-500"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
          <span>Loading templates...</span>
        </motion.div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <p className="text-red-500 font-medium">
          Error fetching templates: {(error as Error).message}
        </p>
      </section>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <motion.p
          className="text-gray-500 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          No templates available at the moment. Please check back later.
        </motion.p>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {templates.map((template, index) => (
          <TemplateCard key={template.id} {...template} index={index} />
        ))}
      </div>
    </section>
  );
}

"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TemplateCard from "@/components/TemplateCard";


async function fetchTemplates() {
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
  } = useQuery({
    queryKey: ["templates"],
    queryFn: fetchTemplates,
  });

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading templates...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {(error as Error).message}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {templates?.map((template: any) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}

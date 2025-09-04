import React from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import { FiPlus, FiX } from "react-icons/fi";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type PortfolioModalProps = {
  templateId: string;
  templateName: string;
  templateImage: string;
  onClose: () => void;
};

export default function PortfolioModal({
  templateId,
  templateName,
  templateImage,
  onClose,
}: PortfolioModalProps) {
    const { id } = useUserStore();
    console.log("userId in PortfolioModal:", id);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      userId: id,
      templateId: templateId,
      hero: {
        title: "",
        subtitle: "",
        socialLinks: [{ platform: "", url: "" }],
      },
      about: {
        bio: "",
        skills: [""],
        experience: [
          {
            position: "",
            company: "",
            duration: "",
            description: "",
          },
        ],
        education: [
          {
            degree: "",
            university: "",
            from: "",
            to: "",
            GPA: "",
          },
        ],
      },
      projects: [
        {
          name: "",
          description: "",
          technologies: [""],
          liveUrl: "",
          githubUrl: "",
        },
      ],
      contact: {
        email: "",
        phone: "",
        location: "",
        whatsapp: "",
        socialLinks: [{ platform: "LinkedIn", url: "" }],
      },
    },
  });

  const { fields: socialLinks, append: appendSocialLink } = useFieldArray({
    control,
    name: "contact.socialLinks",
  });

  // For 'skills', use standard field registration and manual array management
  const [skillsCount, setSkillsCount] = React.useState(1);

  const { fields: experience, append: appendExperience } = useFieldArray({
    control,
    name: "about.experience",
  });

  const { fields: education, append: appendEducation } = useFieldArray({
    control,
    name: "about.education",
  });

  const { fields: projects, append: appendProject } = useFieldArray({
    control,
    name: "projects",
  });

  type FormData = {
    userId: string | null;
    templateId: string;
    hero: {
      title: string;
      subtitle: string;
      socialLinks: { platform: string; url: string }[];
    };
    about: {
      bio: string;
      skills: string[];
      experience: {
        position: string;
        company: string;
        duration: string;
        description: string;
      }[];
      education: {
        degree: string;
        university: string;
        from: string;
        to: string;
        GPA: string;
      }[];
    };
    projects: {
      name: string;
      description: string;
      technologies: string[];
      liveUrl: string;
      githubUrl: string;
    }[];
    contact: {
      email: string;
      phone: string;
      location: string;
      whatsapp: string;
      socialLinks: {
        platform: string;
        url: string;
      }[];
    };
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post(
        "https://zonefolio-backend.up.railway.app/portfolio/",
        data,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      onClose();
    },
    onError: (error: unknown) => {
      alert(
        (error as { response?: { data?: { error?: string } } }).response?.data
          ?.error || "Failed to create portfolio. Please try again."
      );
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customize {templateName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Image
            src={templateImage}
            alt={templateName}
            width={400}
            height={300}
            className="rounded-lg"
          />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Hero Section */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
              <input
                {...register("hero.title")}
                placeholder="Title"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                {...register("hero.subtitle")}
                placeholder="Subtitle"
                className="w-full p-2 border rounded mb-2"
              />
              {/* Social Links */}
              {socialLinks.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`hero.socialLinks.${index}.platform`)}
                    placeholder="Platform"
                    className="w-1/2 p-2 border rounded"
                  />
                  <input
                    {...register(`hero.socialLinks.${index}.url`)}
                    placeholder="URL"
                    className="w-1/2 p-2 border rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendSocialLink({ platform: "", url: "" })}
                className="text-sm text-indigo-600 flex items-center gap-1"
              >
                <FiPlus /> Add Social Link
              </button>
            </section>

            {/* About Section */}
            <section>
              <h3 className="text-lg font-semibold mb-4">About Section</h3>
              <textarea
                {...register("about.bio")}
                placeholder="Bio"
                className="w-full p-2 border rounded mb-2"
                rows={4}
              />

              {/* Skills */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Skills</h4>
                <div>
                  {Array.from({ length: skillsCount }).map((_, index) => (
                    <input
                      key={index}
                      {...register(`about.skills.${index}`)}
                      placeholder="Skill"
                      className="w-full p-2 border rounded mb-2"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setSkillsCount(skillsCount + 1)}
                    className="text-sm text-indigo-600 flex items-center gap-1"
                  >
                    <FiPlus /> Add Skill
                  </button>
                </div>
              </div>
              {/* Experience */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Experience</h4>
                {experience.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 mb-4">
                    <input
                      {...register(`about.experience.${index}.position`)}
                      placeholder="Position"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      {...register(`about.experience.${index}.company`)}
                      placeholder="Company"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      {...register(`about.experience.${index}.duration`)}
                      placeholder="Duration (e.g., 2020-2022)"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                      {...register(`about.experience.${index}.description`)}
                      placeholder="Description"
                      className="w-full p-2 border rounded mb-2"
                      rows={3}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    appendExperience({
                      position: "",
                      company: "",
                      duration: "",
                      description: "",
                    })
                  }
                  className="text-sm text-indigo-600 flex items-center gap-1"
                >
                  <FiPlus /> Add Experience
                </button>
              </div>

              {/* Education */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Education</h4>
                {education.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 mb-4">
                    <input
                      {...register(`about.education.${index}.degree`)}
                      placeholder="Degree"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      {...register(`about.education.${index}.university`)}
                      placeholder="University"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        {...register(`about.education.${index}.from`)}
                        placeholder="From Year"
                        className="p-2 border rounded"
                      />
                      <input
                        {...register(`about.education.${index}.to`)}
                        placeholder="To Year"
                        className="p-2 border rounded"
                      />
                    </div>
                    <input
                      {...register(`about.education.${index}.GPA`)}
                      placeholder="GPA"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    appendEducation({
                      degree: "",
                      university: "",
                      from: "",
                      to: "",
                      GPA: "",
                    })
                  }
                  className="text-sm text-indigo-600 flex items-center gap-1"
                >
                  <FiPlus /> Add Education
                </button>
              </div>
            </section>

            {/* Projects Section */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Projects</h3>
              {projects.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 mb-4">
                  <input
                    {...register(`projects.${index}.name`)}
                    placeholder="Project Name"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    {...register(`projects.${index}.description`)}
                    placeholder="Project Description"
                    className="w-full p-2 border rounded mb-2"
                    rows={3}
                  />
                  <input
                    {...register(`projects.${index}.technologies.0`)}
                    placeholder="Technologies (comma-separated)"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      {...register(`projects.${index}.liveUrl`)}
                      placeholder="Live URL"
                      className="p-2 border rounded"
                    />
                    <input
                      {...register(`projects.${index}.githubUrl`)}
                      placeholder="GitHub URL"
                      className="p-2 border rounded"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendProject({
                    name: "",
                    description: "",
                    technologies: [""],
                    liveUrl: "",
                    githubUrl: "",
                  })
                }
                className="text-sm text-indigo-600 flex items-center gap-1"
              >
                <FiPlus /> Add Project
              </button>
            </section>

            {/* Contact Section */}
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <input
                {...register("contact.email")}
                placeholder="Email"
                type="email"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                {...register("contact.phone")}
                placeholder="Phone"
                type="tel"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                {...register("contact.location")}
                placeholder="Location"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                {...register("contact.whatsapp")}
                placeholder="WhatsApp"
                className="w-full p-2 border rounded mb-2"
              />

              {/* Social Links */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Social Links</h4>
                {socialLinks.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <input
                      {...register(`contact.socialLinks.${index}.platform`)}
                      placeholder="Platform (e.g., LinkedIn, Twitter)"
                      className="w-1/2 p-2 border rounded"
                    />
                    <input
                      {...register(`contact.socialLinks.${index}.url`)}
                      placeholder="Profile URL"
                      className="w-1/2 p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendSocialLink({ platform: "", url: "" })}
                  className="text-sm text-indigo-600 flex items-center gap-1 mt-2"
                >
                  <FiPlus /> Add Social Link
                </button>
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Create Portfolio
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

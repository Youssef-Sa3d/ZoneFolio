import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import { FiPlus, FiX, FiTrash2, FiUpload, FiImage } from "react-icons/fi";
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
  const { id, username } = useUserStore();
  console.log("userId in PortfolioModal:", id);
  
  // Image upload states
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [aboutImage, setAboutImage] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<{ [key: number]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [uploadingStates, setUploadingStates] = useState<Record<string, boolean>>({});
  
  const { register, control, handleSubmit, formState: { errors: formErrors }, setValue, watch } = useForm({
    defaultValues: {
      userId: id,
      username: username,
      templateId: templateId,
      hero: {
        title: "",
        subtitle: "",
        image: "",
        socialLinks: [{ platform: "", url: "" }],
      },
      about: {
        bio: "",
        image: "",
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
          image: "",
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

  const { fields: heroSocialLinks, append: appendHeroSocialLink, remove: removeHeroSocialLink } = useFieldArray({
    control,
    name: "hero.socialLinks",
  });

  const { fields: contactSocialLinks, append: appendContactSocialLink, remove: removeContactSocialLink } = useFieldArray({
    control,
    name: "contact.socialLinks",
  });

  const [skills, setSkills] = useState<string[]>([""]);

  const { fields: experience, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: "about.experience",
  });

  const { fields: education, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "about.education",
  });

  const { fields: projects, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: "projects",
  });

  // File upload handler
  const handleFileUpload = async (file: File, type: 'hero' | 'about' | 'project', projectIndex?: number) => {
    const uploadKey = projectIndex !== undefined ? `${type}-${projectIndex}` : type;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, [uploadKey]: 'Please select a valid image file (JPG, PNG, GIF, etc.)' }));
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [uploadKey]: 'File size must be less than 5MB' }));
      return;
    }

    // Set uploading state
    setUploadingStates(prev => ({ ...prev, [uploadKey]: true }));
    
    // Clear any previous errors
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[uploadKey];
      return newErrors;
    });

    try {
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        if (type === 'hero') {
          setHeroImage(result);
          setValue('hero.image', result);
        } else if (type === 'about') {
          setAboutImage(result);
          setValue('about.image', result);
        } else if (type === 'project' && projectIndex !== undefined) {
          setProjectImages(prev => ({ ...prev, [projectIndex]: result }));
          setValue(`projects.${projectIndex}.image`, result);
        }
        
        // Clear uploading state
        setUploadingStates(prev => {
          const newStates = { ...prev };
          delete newStates[uploadKey];
          return newStates;
        });
      };
      
      reader.onerror = () => {
        setErrors(prev => ({ ...prev, [uploadKey]: 'Failed to read the image file. Please try again.' }));
        setUploadingStates(prev => {
          const newStates = { ...prev };
          delete newStates[uploadKey];
          return newStates;
        });
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      setErrors(prev => ({ ...prev, [uploadKey]: 'An unexpected error occurred while uploading the image.' }));
      setUploadingStates(prev => {
        const newStates = { ...prev };
        delete newStates[uploadKey];
        return newStates;
      });
    }
  };

  type FormData = {
    userId: string | null;
    username: string | null;
    templateId: string;
    hero: {
      title: string;
      subtitle: string;
      image: string;
      socialLinks: { platform: string; url: string }[];
    };
    about: {
      bio: string;
      image: string;
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
      image: string;
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

  // Transform empty strings to null
  const transformEmptyToNull = (obj: unknown): unknown => {
    if (obj === null || obj === undefined) return null;
    if (typeof obj === 'string') return obj.trim() === '' ? null : obj;
    if (Array.isArray(obj)) {
      return obj.map(transformEmptyToNull).filter(item => item !== null && item !== '');
    }
    if (typeof obj === 'object') {
      const transformed: Record<string, unknown> = {};
      for (const key in obj as Record<string, unknown>) {
        transformed[key] = transformEmptyToNull((obj as Record<string, unknown>)[key]);
      }
      return transformed;
    }
    return obj;
  };

  const onSubmit = (data: FormData) => {
    // Transform empty strings to null
    const transformedData = transformEmptyToNull(data) as FormData;
    console.log('Transformed data:', transformedData);
    mutation.mutate(transformedData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Edit Portfolio</h2>
            <p className="text-sm text-gray-600 mt-1">Update your professional information</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Image
                src={templateImage}
                alt={templateName}
                width={400}
                height={300}
                className="rounded-lg"
              />
              <div className="space-y-6">
            {/* Hero Section */}
             <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
               <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                 <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded"></div>
                 Hero Section
               </h3>
              <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-700">Title *</label>
                 <input
                   {...register("hero.title", { required: "Title is required" })}
                   placeholder="Enter your professional title"
                   className={`w-full p-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.hero?.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                 />
               </div>
              {formErrors.hero?.title && (
                 <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                   <FiX size={14} />
                   {formErrors.hero.title.message}
                 </p>
               )}
               
               <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-700">Subtitle *</label>
                 <input
                   {...register("hero.subtitle", { required: "Subtitle is required" })}
                   placeholder="Enter your professional subtitle"
                   className={`w-full p-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.hero?.subtitle ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                 />
               </div>
               {formErrors.hero?.subtitle && (
                 <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                   <FiX size={14} />
                   {formErrors.hero.subtitle.message}
                 </p>
               )}
              
              {/* Hero Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  {uploadingStates.hero ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                      <p className="text-blue-600 text-sm">Uploading image...</p>
                    </div>
                  ) : heroImage ? (
                    <div className="relative">
                      <img src={heroImage} alt="Hero preview" className="max-h-32 mx-auto rounded-lg shadow-sm" />
                      <button
                        type="button"
                        onClick={() => {
                          setHeroImage(null);
                          setValue('hero.image', '');
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <FiImage className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-600 mb-3 font-medium">Upload hero image</p>
                      <p className="text-gray-500 text-xs mb-3">JPG, PNG, GIF up to 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'hero');
                        }}
                        className="hidden"
                        id="hero-image"
                      />
                      <label
                        htmlFor="hero-image"
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <FiUpload size={16} />
                        Choose Image
                      </label>
                    </div>
                  )}
                </div>
                {errors.hero && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1 bg-red-50 p-2 rounded border border-red-200">
                    <FiX size={14} />
                    {errors.hero}
                  </p>
                )}
              </div>
              {/* Social Links */}
              {heroSocialLinks.map((field, index) => (
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
                  <button
                    type="button"
                    onClick={() => removeHeroSocialLink(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendHeroSocialLink({ platform: "", url: "" })}
                className="text-sm text-indigo-600 flex items-center gap-1"
              >
                <FiPlus /> Add Social Link
              </button>
            </section>

            {/* About Section */}
             <section className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 mt-6">
               <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                 <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded"></div>
                 About Section
               </h3>
              <textarea
                {...register("about.bio")}
                placeholder="Bio"
                className="w-full p-2 border rounded mb-2"
                rows={4}
              />
              
              {/* About Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">About Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                  {uploadingStates.about ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-2"></div>
                      <p className="text-green-600 text-sm">Uploading image...</p>
                    </div>
                  ) : aboutImage ? (
                    <div className="relative">
                      <img src={aboutImage} alt="About preview" className="max-h-32 mx-auto rounded-lg shadow-sm" />
                      <button
                        type="button"
                        onClick={() => {
                          setAboutImage(null);
                          setValue('about.image', '');
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <FiImage className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-600 mb-3 font-medium">Upload about image</p>
                      <p className="text-gray-500 text-xs mb-3">JPG, PNG, GIF up to 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'about');
                        }}
                        className="hidden"
                        id="about-image"
                      />
                      <label
                        htmlFor="about-image"
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:from-green-600 hover:to-emerald-700 transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <FiUpload size={16} />
                        Choose Image
                      </label>
                    </div>
                  )}
                </div>
                {errors.about && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1 bg-red-50 p-2 rounded border border-red-200">
                    <FiX size={14} />
                    {errors.about}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Skills</h4>
                <div>
                   {skills.map((skill, index) => (
                     <div key={index} className="flex gap-2 mb-2">
                       <input
                         {...register(`about.skills.${index}`)}
                         placeholder="Skill"
                         className="w-full p-2 border rounded"
                       />
                       {skills.length > 1 && (
                         <button
                           type="button"
                           onClick={() => {
                             const newSkills = skills.filter((_, i) => i !== index);
                             setSkills(newSkills);
                           }}
                           className="text-red-500 hover:text-red-700 p-2"
                         >
                           <FiTrash2 />
                         </button>
                       )}
                     </div>
                   ))}
                   <button
                     type="button"
                     onClick={() => setSkills([...skills, ""])}
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
                  <div key={field.id} className="border rounded-lg p-4 mb-4 relative">
                    {experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    )}
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
                  <div key={field.id} className="border rounded-lg p-4 mb-4 relative">
                    {education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    )}
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
             <section className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100 mt-6">
               <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                 <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-violet-600 rounded"></div>
                 Projects
               </h3>
              {projects.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 mb-4 relative">
                  {projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
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
                  
                  {/* Project Image Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                      {uploadingStates[`project-${index}`] ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-2"></div>
                          <p className="text-purple-600 text-sm">Uploading image...</p>
                        </div>
                      ) : projectImages[index] ? (
                        <div className="relative">
                          <img src={projectImages[index]} alt="Project preview" className="max-h-32 mx-auto rounded-lg shadow-sm" />
                          <button
                            type="button"
                            onClick={() => {
                              setProjectImages(prev => {
                                const newImages = { ...prev };
                                delete newImages[index];
                                return newImages;
                              });
                              setValue(`projects.${index}.image`, '');
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <FiImage className="mx-auto text-gray-400 mb-2" size={32} />
                          <p className="text-gray-600 mb-3 font-medium">Upload project image</p>
                          <p className="text-gray-500 text-xs mb-3">JPG, PNG, GIF up to 5MB</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'project', index);
                            }}
                            className="hidden"
                            id={`project-image-${index}`}
                          />
                          <label
                            htmlFor={`project-image-${index}`}
                            className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:from-purple-600 hover:to-violet-700 transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
                          >
                            <FiUpload size={16} />
                            Choose Image
                          </label>
                        </div>
                      )}
                    </div>
                    {errors[`project-${index}`] && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1 bg-red-50 p-2 rounded border border-red-200">
                        <FiX size={14} />
                        {errors[`project-${index}`]}
                      </p>
                    )}
                  </div>
                  
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
                    image: "",
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
            <section className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100 mt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                 <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-amber-600 rounded"></div>
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
                {contactSocialLinks.map((field, index) => (
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
                    <button
                      type="button"
                      onClick={() => removeContactSocialLink(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendContactSocialLink({ platform: "", url: "" })}
                  className="text-sm text-indigo-600 flex items-center gap-1 mt-2"
                >
                  <FiPlus /> Add Social Link
                </button>
              </div>
            </section>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {mutation.isPending ? 'Creating Portfolio...' : 'Create Portfolio'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

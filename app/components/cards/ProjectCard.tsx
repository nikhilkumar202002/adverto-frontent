"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col gap-4"
    >
      <Link href={`/work/${project.id}`} className="block w-full overflow-hidden bg-white/5">
        <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4] lg:aspect-[4/3]">
          {/* Fallback gray box in case you haven't added the actual images to the public folder yet */}
          <div className="absolute inset-0 bg-[#0A0A0A] transition-transform duration-700 group-hover:scale-105" />
          
          {/* Replace this with an actual <Image /> tag once your assets are in public/images/projects/ */}
          {/* <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          /> 
          */}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Floating Arrow Badge */}
          <div className="absolute right-6 top-6 flex h-12 w-12 translate-x-4 -translate-y-4 items-center justify-center rounded-full bg-[#0000FF] text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium tracking-wide text-white md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-[#9A9A9A] md:text-base">
            {project.category}
          </p>
        </div>
        <div className="text-sm font-medium text-[#0000FF] md:text-base">
          {project.year}
        </div>
      </div>
    </motion.div>
  );
}
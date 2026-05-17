"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    category: "Language & Framework",
    color: "from-indigo-500 to-purple-500",
    borderColor: "border-indigo-500/30",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-300",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
    ],
  },
  {
    category: "State & Data Fetching",
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-300",
    skills: [
      "React Query",
      "Zustand",
      "Redux",
      "React Hook Form",
    ],
  },
  {
    category: "Styling",
    color: "from-pink-500 to-rose-500",
    borderColor: "border-pink-500/30",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-300",
    skills: [
      "TailwindCSS",
      "Emotion",
      "Styled Components",
    ],
  },
  {
    category: "DevOps & Tools",
    color: "from-purple-500 to-violet-500",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-300",
    skills: [
      "Git / Git Flow",
      "Docker",
      "Jenkins",
      "Firebase",
      "Storybook",
    ],
  },
];

export default function Skills() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
            Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
            기술 스택
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <h3
                className={`text-sm font-bold mb-4 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent uppercase tracking-wide`}
              >
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + i * 0.05, duration: 0.3 }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${cat.borderColor} ${cat.bgColor} ${cat.textColor}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

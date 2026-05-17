"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import ProjectModal from "@/components/ProjectModal";
import { projectDetails } from "@/lib/projectData";
import type { ProjectDetail } from "@/lib/projectData";

const projects = [
  {
    slug: "woodaebbang",
    title: "아파트는 우대빵 서비스 앱",
    period: "2024.06 – 2025.04",
    description:
      "부동산 데이터 시각화 중심의 React Native 앱. WebView 기반 Recharts 차트, Firebase Analytics 트래킹, Naver Map 마커 시각화, CodePush 핫픽스 배포 구조를 구축했습니다.",
    highlights: [
      "사용자 평균 체류시간 50% 이상 증가 (30~60초 → 2분+)",
      "신규 기능 런칭 후 사용자 수 20~30% 증가",
      "React Query 낙관적 업데이트·캐싱으로 API 호출 70% 절감",
      "FlatList 구조 개선으로 렌더링 비용 40% 감소",
    ],
    tags: [
      "React Native",
      "TypeScript",
      "React Query",
      "Firebase Analytics",
      "WebView",
      "Recharts",
      "CodePush",
    ],
    gradient: "from-orange-500 to-rose-500",
    shadowColor: "shadow-orange-500/10",
    borderHover: "hover:border-orange-500/40",
  },
  {
    slug: "backoffice",
    title: "부동산 관리 백오피스 마이그레이션",
    period: "2023.06 – 2024.08",
    description:
      "레거시 백오피스를 Next.js로 전면 마이그레이션. Docker·Jenkins CI/CD 파이프라인 구축, Zustand·React Query 기반 상태 관리 재설계, Storybook 컴포넌트 문서화를 주도했습니다.",
    highlights: [
      "Docker + Jenkins CI/CD로 배포 중 접속 불가 이슈 해소",
      "React Hook Form + Debounce로 폼 렌더링 성능 최적화",
      "공통 컴포넌트·Hook·API 레이어 표준화로 유지보수성 향상",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "React Query",
      "Docker",
      "Jenkins",
      "Storybook",
    ],
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-blue-500/10",
    borderHover: "hover:border-blue-500/40",
  },
  {
    slug: "web-renewal",
    title: "반응형 웹페이지 리뉴얼",
    period: "2023.02 – 2023.08",
    description:
      "데스크톱 전용 레거시 웹을 Next.js 기반 반응형으로 리뉴얼. SSR 도입과 이미지·렌더링 최적화로 초기 로딩 성능과 SEO를 동시에 개선했습니다.",
    highlights: [
      "LCP 46% 개선 (7.25s → 3.9s)",
      "Lighthouse SEO 82 → 91 (9점 상승)",
      "이미지 로딩 속도 60% 이상 개선",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "SSR",
      "TailwindCSS",
      "SEO",
      "Image Optimization",
    ],
    gradient: "from-emerald-500 to-teal-500",
    shadowColor: "shadow-emerald-500/10",
    borderHover: "hover:border-emerald-500/40",
  },
];

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className={`group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden ${project.borderHover} transition-all duration-300 hover:shadow-xl ${project.shadowColor} cursor-pointer flex flex-col`}
      onClick={onClick}
    >
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="flex-shrink-0 mt-1 text-slate-600 group-hover:text-indigo-400 transition-colors"
          />
        </div>
        <p className="text-xs text-slate-500 mb-3">{project.period}</p>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <ul className="mb-5 space-y-1.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-xs text-slate-300"
            >
              <TrendingUp
                size={12}
                className="mt-0.5 flex-shrink-0 text-indigo-400"
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-md bg-white/10 text-slate-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-auto pt-4 text-xs text-slate-600 group-hover:text-indigo-400 transition-colors text-right">
          자세히 보기 →
        </p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(
    null,
  );

  const openModal = (slug: string) => {
    const detail = projectDetails.find((p) => p.slug === slug) ?? null;
    setSelectedProject(detail);
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase">
            Project
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
            프로젝트
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onClick={() => openModal(project.slug)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

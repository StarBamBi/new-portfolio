"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "에스테이트클라우드주식회사",
    companyEn: "EstateCloud Inc.",
    role: "프론트엔드 개발자",
    type: "정규직",
    period: "2022.10 – 2025.04",
    duration: "2년 7개월",
    color: "from-indigo-500 to-purple-500",
    dot: "bg-indigo-500",
    works: [
      "React Native 기반 부동산 앱 개발 (WebView, 차트 시각화, Firebase Analytics)",
      "Next.js 백오피스 마이그레이션 및 Docker·Jenkins CI/CD 파이프라인 구축",
      "React Query 도입으로 API 호출 약 70% 절감 및 UI 반응성 개선",
      "반응형 웹 리뉴얼 — LCP 46% 개선 (7.25s → 3.9s), SEO 82 → 91",
      "코드 리뷰 문화·Git Flow 브랜치 전략 도입으로 팀 협업 품질 향상",
    ],
  },
  {
    company: "주식회사 리드넘버",
    companyEn: "ReadNumber Inc.",
    role: "백엔드 개발자",
    type: "정규직",
    period: "2022.03 – 2022.07",
    duration: "5개월",
    color: "from-slate-400 to-slate-600",
    dot: "bg-slate-400",
    works: [
      "Jsoup·Selenium 기반 스크래핑 로직 및 Cron 자동화 구조 구축",
      "Spring Boot API + MySQL 연동으로 데이터 수집·관리 파이프라인 구성",
    ],
  },
];

export default function Experience() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="experience" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase">
            Career
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
            경력
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.company} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="md:pl-16 relative"
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-4 top-6 w-4 h-4 rounded-full ${exp.dot} ring-4 ring-[#0a0a0f] hidden md:block`}
      />

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0`}
            >
              <Briefcase size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">
                {exp.company}
              </h3>
              <p className="text-slate-500 text-xs">{exp.companyEn}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-slate-300 text-sm font-medium">{exp.period}</p>
            <p className="text-slate-500 text-xs">{exp.duration}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span
            className={`text-sm font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
          >
            {exp.role}
          </span>
          <span className="text-xs text-slate-600 border border-white/10 px-2 py-0.5 rounded-full">
            {exp.type}
          </span>
        </div>

        <ul className="space-y-2">
          {exp.works.map((work) => (
            <li
              key={work}
              className="flex items-start gap-2 text-sm text-slate-400"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
              {work}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

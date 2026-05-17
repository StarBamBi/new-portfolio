"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import type { ProjectDetail } from "@/lib/projectData";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectDetail | null;
  onClose: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else onClose();
      }
      if (e.key === "ArrowRight" && lightboxIndex !== null && project.images)
        setLightboxIndex((i) => (i! + 1) % project.images!.length);
      if (e.key === "ArrowLeft" && lightboxIndex !== null && project.images)
        setLightboxIndex((i) => (i! - 1 + project.images!.length) % project.images!.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, lightboxIndex]);

  return (
    <>
      <AnimatePresence>
        {project && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div
                className="relative w-full max-w-3xl max-h-[90vh] bg-[#0f0f17] border border-white/10 rounded-2xl overflow-hidden flex flex-col pointer-events-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex-shrink-0 flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/10">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      {project.company} · {project.period}
                    </p>
                    <h2 className="text-xl font-bold text-white leading-snug">
                      {project.title}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

                  {/* 소개 Callout */}
                  <section>
                    <SectionLabel>소개</SectionLabel>
                    <div className="mt-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {project.introCallout}
                    </div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.achievements.map((a) => (
                        <div
                          key={a}
                          className="flex items-start gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300"
                        >
                          <span className="text-indigo-400 mt-0.5">↑</span>
                          {a}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 이미지 갤러리 */}
                  {project.images && project.images.length > 0 && (
                    <section>
                      <SectionLabel>스크린샷</SectionLabel>
                      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                        {project.images.map((src, i) => (
                          <button
                            key={i}
                            onClick={() => setLightboxIndex(i)}
                            className="relative flex-shrink-0 w-36 h-72 rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                          >
                            <Image
                              src={src}
                              alt={`screenshot-${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* 기술 스택 */}
                  <section>
                    <SectionLabel>기술</SectionLabel>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 text-slate-300 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* 상세 섹션들 */}
                  <section>
                    <SectionLabel>상세</SectionLabel>
                    <div className="mt-3 space-y-6">
                      {project.details.map((detail) => (
                        <div
                          key={detail.title}
                          className="border border-white/10 rounded-xl overflow-hidden"
                        >
                          <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <ChevronRight size={14} className="text-indigo-400" />
                              {detail.title}
                            </h4>
                          </div>
                          <div className="px-4 py-4 space-y-4">
                            <DetailBlock label="문제 상황" color="text-rose-400" items={detail.problem} />
                            <DetailBlock label="개선 방식" color="text-cyan-400" items={detail.solution} />
                            {detail.designIntent && (
                              <DetailBlock label="설계 의도" color="text-purple-400" items={detail.designIntent} />
                            )}
                            <DetailBlock label="결과" color="text-emerald-400" items={detail.result} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Wrap Up */}
                  <section>
                    <SectionLabel>Wrap Up</SectionLabel>
                    <div className="mt-3 space-y-4">
                      {project.wrapUp.map((item) => (
                        <div key={item.title} className="space-y-1.5">
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line pl-3 border-l border-indigo-500/40">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && project?.images && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
            onClick={() => setLightboxIndex(null)}
          >
            {/* 닫기 */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={18} />
            </button>

            {/* 이전 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i! - 1 + project.images!.length) % project.images!.length);
              }}
              className="absolute left-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* 이미지 */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.images[lightboxIndex]}
                alt={`screenshot-${lightboxIndex + 1}`}
                width={600}
                height={1200}
                className="object-contain max-h-[90vh] rounded-xl"
              />
            </motion.div>

            {/* 다음 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i! + 1) % project.images!.length);
              }}
              className="absolute right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* 인디케이터 */}
            <div className="absolute bottom-4 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightboxIndex ? "bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function DetailBlock({ label, color, items }: { label: string; color: string; items: string[] }) {
  return (
    <div>
      <p className={`text-xs font-semibold mb-2 ${color}`}>{label}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

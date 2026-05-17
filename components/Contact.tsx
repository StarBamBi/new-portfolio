"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "이메일",
    value: "whiteme0561@naver.com",
    href: "mailto:whiteme0561@naver.com",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Phone,
    label: "전화",
    value: "+82 010-7138-4717",
    href: "tel:+821071384717",
    color: "from-slate-500 to-slate-700",
  },
];

export default function Contact() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4">
            연락처
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            새로운 기회나 협업에 관심이 있으시다면 언제든지 연락해 주세요.
            <br />
            빠른 시일 내에 답변 드리겠습니다.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-300 text-left"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}
              >
                <link.icon size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 font-medium mb-0.5">
                  {link.label}
                </div>
                <div className="text-slate-200 font-medium">{link.value}</div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 text-center">
      <p className="text-slate-500 text-sm">
        © {new Date().getFullYear()} 김태준. All rights reserved.
      </p>
      <p className="text-slate-600 text-xs mt-1">
        Built with Next.js & Tailwind CSS
      </p>
    </footer>
  );
}

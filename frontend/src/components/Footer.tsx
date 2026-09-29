export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-20 transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-slate-500 dark:text-slate-400 flex justify-between">
        <span>&copy; {new Date().getFullYear()} Portfolio. Built with a custom CMS.</span>
      </div>
    </footer>
  );
}

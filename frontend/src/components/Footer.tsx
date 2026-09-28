export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-slate-500 flex justify-between">
        <span>&copy; {new Date().getFullYear()} Portfolio. Built with a custom CMS.</span>
      </div>
    </footer>
  );
}

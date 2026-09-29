import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-slate-900">
          Portfolio
        </Link>
        <ul className="hidden sm:flex gap-6 text-sm text-slate-600">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative py-1 transition-colors hover:text-indigo-600 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

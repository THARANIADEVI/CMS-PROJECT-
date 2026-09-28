import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { RESOURCES } from "../lib/resources";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-2 rounded ${isActive ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"}`;

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-4 py-5 border-b border-slate-200">
          <h1 className="font-bold text-lg text-slate-800">Portfolio CMS</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          {Object.values(RESOURCES).map((r) => (
            <NavLink key={r.key} to={`/${r.key}`} className={navLinkClass}>
              {r.label}
            </NavLink>
          ))}
          <NavLink to="/messages" className={navLinkClass}>
            Messages
          </NavLink>
        </nav>
        <div className="p-3 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

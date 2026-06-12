import { Link, useLocation } from "@tanstack/react-router";

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `text-sm font-semibold tracking-wide transition-opacity duration-150 ${
      isActive(path) ? "opacity-100 underline underline-offset-4" : "opacity-70 hover:opacity-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-lime">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="transition-opacity hover:opacity-75">
          <span className="text-sm font-bold uppercase tracking-widest text-foreground">
            PoliMi Pathways
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/explore" className={linkClass("/explore")}>Explore Paths</Link>
          <Link to="/bachelors" className={linkClass("/bachelors")}>Bachelors</Link>
          <Link to="/masters" className={linkClass("/masters")}>Masters</Link>
          <Link to="/test" className={linkClass("/test")}>Career Test</Link>
          <Link to="/profile" className={linkClass("/profile")}>Profile</Link>
        </div>
      </div>
    </nav>
  );
}

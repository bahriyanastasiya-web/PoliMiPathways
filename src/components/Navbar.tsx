import { Link, useLocation } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <GraduationCap className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Pathway
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/explore" className={linkClass("/explore")}>
            Explore Paths
          </Link>
          <Link to="/test" className={linkClass("/test")}>
            Test
          </Link>
          <Link to="/profile" className={linkClass("/profile")}>
            Profile
          </Link>
        </div>

        <div className="md:hidden">
          {/* Mobile menu could be added here; keeping minimal for now */}
        </div>
      </div>
    </nav>
  );
}

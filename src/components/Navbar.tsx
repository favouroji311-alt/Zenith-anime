import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Play, Heart } from "lucide-react";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass-dark py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center rotate-12">
            <Play className="text-white fill-white -rotate-12" size={20} />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter uppercase italic">
            Zenith<span className="text-primary">Anime</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/trending" className="text-sm font-medium hover:text-primary transition-colors">Trending</Link>
          <Link to="/seasonal" className="text-sm font-medium hover:text-primary transition-colors">Seasonal</Link>
          <Link to="/watchlist" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <Heart size={14} className="fill-primary text-primary" /> Watchlist
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 lg:w-64 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
          </form>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-dark p-6 md:hidden flex flex-col gap-4"
          >
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
            </form>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Home</Link>
            <Link to="/trending" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Trending</Link>
            <Link to="/seasonal" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Seasonal</Link>
            <Link to="/watchlist" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Watchlist</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { AnimeDetails } from "./components/AnimeDetails";
import { SearchPage } from "./components/SearchPage";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-white selection:bg-primary selection:text-white">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<AnimeDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/trending" element={<Home />} /> {/* For now, just reuse Home */}
              <Route path="/seasonal" element={<Home />} /> {/* For now, just reuse Home */}
              <Route path="/watchlist" element={<Home />} /> {/* For now, just reuse Home */}
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer className="px-6 md:px-12 lg:px-24 py-20 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="font-black italic">Z</span>
                </div>
                <span className="text-xl font-display font-black tracking-tighter uppercase italic">
                  Zenith<span className="text-primary">Anime</span>
                </span>
              </div>
              <p className="text-sm text-white/40 font-medium leading-relaxed">
                The ultimate destination for anime discovery. Explore thousands of titles, track your progress, and join a global community of fans.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Navigation</h4>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-sm font-medium text-white/40 hover:text-primary transition-colors">Browse Anime</a>
                <a href="#" className="text-sm font-medium text-white/40 hover:text-primary transition-colors">Seasonal Chart</a>
                <a href="#" className="text-sm font-medium text-white/40 hover:text-primary transition-colors">Top Rated</a>
                <a href="#" className="text-sm font-medium text-white/40 hover:text-primary transition-colors">News</a>
              </nav>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Community</h4>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-sm font-medium text-white/40 hover:text-primary transition-colors">Discord</a>
                <a href="#" className="text-sm font-medium text-white/40 hover:text-primary transition-colors">Twitter</a>
                <a href="#" className="text-sm font-medium text-white/40 hover:text-primary transition-colors">Reddit</a>
                <a href="#" className="text-sm font-medium text-white/40 hover:text-primary transition-colors">Support</a>
              </nav>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Newsletter</h4>
              <p className="text-sm text-white/40 font-medium">Get weekly updates on new releases.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 flex-1"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/80 transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/20 font-medium">
              © 2026 Zenith Anime. All rights reserved. Data provided by Jikan API.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

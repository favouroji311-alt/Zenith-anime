import { Play, Plus, Info, Star } from "lucide-react";
import { motion } from "motion/react";
import { Anime } from "../types";
import { cn } from "../lib/utils";

interface HeroProps {
  anime: Anime;
}

export function Hero({ anime }: HeroProps) {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden flex items-end pb-20 px-6 md:px-12 lg:px-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-110 blur-[2px] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Star size={14} className="fill-white" />
              {anime.score} Rating
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
              {anime.type} • {anime.episodes} Episodes
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
              {anime.status}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.85] uppercase italic text-white drop-shadow-2xl">
            {anime.title_english || anime.title}
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl line-clamp-3 font-medium leading-relaxed">
            {anime.synopsis}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button className="bg-primary text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-bold hover:bg-primary/80 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
              <Play size={24} className="fill-current" />
              Watch Now
            </button>
            <button className="glass text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-bold hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
              <Plus size={24} />
              Add to List
            </button>
            <button className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
              <Info size={24} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Side Info */}
      <div className="absolute right-12 bottom-24 hidden lg:flex flex-col gap-8 items-end">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1">Studio</span>
          <span className="text-xl font-display font-bold uppercase italic">{anime.studios[0]?.name || "Unknown"}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1">Genre</span>
          <div className="flex gap-2">
            {anime.genres.slice(0, 2).map((g) => (
              <span key={g.name} className="text-sm font-medium px-3 py-1 glass rounded-full">{g.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

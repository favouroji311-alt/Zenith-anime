import React from "react";
import { Link } from "react-router-dom";
import { Star, Play, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Anime } from "../types";
import { cn } from "../lib/utils";

interface AnimeCardProps {
  anime: Anime;
  className?: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, className }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("group relative aspect-[2/3] rounded-2xl overflow-hidden bg-card", className)}
    >
      <Link to={`/anime/${anime.mal_id}`} className="block w-full h-full">
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 bg-primary/90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              <Star size={10} className="fill-white" />
              {anime.score || "N/A"}
            </div>
            <div className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              {anime.type}
            </div>
          </div>
          <h3 className="text-sm font-bold line-clamp-2 leading-tight mb-3">
            {anime.title_english || anime.title}
          </h3>
          
          <div className="flex items-center gap-2">
            <button className="flex-1 bg-white text-black py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-primary hover:text-white transition-colors">
              <Play size={14} className="fill-current" />
              Details
            </button>
            <button className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Static Info (Visible when not hovered) */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 group-hover:opacity-0 transition-opacity">
          <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Star size={10} className="text-primary fill-primary" />
            {anime.score || "N/A"}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

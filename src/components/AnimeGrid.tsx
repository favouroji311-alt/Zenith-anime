import React from "react";
import { Anime } from "../types";
import { AnimeCard } from "./AnimeCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface AnimeGridProps {
  title: string;
  animeList: Anime[];
  viewAllLink?: string;
  className?: string;
}

export function AnimeGrid({ title, animeList, viewAllLink, className }: AnimeGridProps) {
  return (
    <section className={cn("px-6 md:px-12 lg:px-24 py-12", className)}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-black uppercase italic tracking-tighter">
          {title}
        </h2>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors group"
          >
            View All
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </section>
  );
}

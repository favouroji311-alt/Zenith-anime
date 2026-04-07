import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jikanService } from "../services/jikan";
import { Anime } from "../types";
import { Play, Star, Clock, Calendar, Info, Heart, Share2, Plus, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export function AnimeDetails() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await jikanService.getAnimeDetails(Number(id));
        setAnime(response.data);
      } catch (err) {
        setError("Failed to load anime details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-4">
        <h2 className="text-2xl font-bold">{error || "Anime not found"}</h2>
        <Link to="/" className="text-primary hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      {/* Background Backdrop */}
      <div className="fixed inset-0 z-0">
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/80 to-bg" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 lg:gap-20">
          {/* Left Column: Poster & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
              <img
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="glass rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1">Score</span>
                  <div className="flex items-center gap-2">
                    <Star size={20} className="text-primary fill-primary" />
                    <span className="text-2xl font-display font-black">{anime.score || "N/A"}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1">Rank</span>
                  <span className="text-2xl font-display font-black">#{anime.rank || "N/A"}</span>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Type</span>
                  <span className="text-sm font-bold">{anime.type}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Episodes</span>
                  <span className="text-sm font-bold">{anime.episodes || "Unknown"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Status</span>
                  <span className="text-sm font-bold">{anime.status}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Season</span>
                  <span className="text-sm font-bold uppercase">{anime.season} {anime.year}</span>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Studios</span>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.map((s) => (
                    <span key={s.name} className="text-xs font-bold px-3 py-1 bg-white/5 rounded-full border border-white/5">{s.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Main Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {anime.genres.map((g) => (
                  <span key={g.name} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/20">
                    {g.name}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[0.9] uppercase italic">
                {anime.title_english || anime.title}
              </h1>
              <p className="text-xl text-white/40 font-medium italic">{anime.title_japanese}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-bold hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95">
                <Play size={24} className="fill-current" />
                Watch Trailer
              </button>
              <button className="glass text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-bold hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
                <Plus size={24} />
                Add to List
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                  <Heart size={20} />
                </button>
                <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-display font-bold uppercase italic tracking-tighter flex items-center gap-3">
                <Info size={24} className="text-primary" />
                Synopsis
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-medium">
                {anime.synopsis}
              </p>
            </div>

            {anime.background && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-display font-bold uppercase italic tracking-tighter">Background</h2>
                <p className="text-lg text-white/50 leading-relaxed italic">
                  {anime.background}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="glass rounded-3xl p-8 flex flex-col gap-4">
                <h3 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  Broadcast
                </h3>
                <p className="text-white/70 font-medium">{anime.broadcast.string || "Unknown"}</p>
              </div>
              <div className="glass rounded-3xl p-8 flex flex-col gap-4">
                <h3 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  Aired
                </h3>
                <p className="text-white/70 font-medium">{anime.aired.string}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

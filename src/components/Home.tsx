import { useEffect, useState } from "react";
import { jikanService } from "../services/jikan";
import { Anime } from "../types";
import { Hero } from "./Hero";
import { AnimeGrid } from "./AnimeGrid";
import { motion } from "motion/react";

export function Home() {
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [seasonalAnime, setSeasonalAnime] = useState<Anime[]>([]);
  const [featuredAnime, setFeaturedAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [topRes, seasonalRes] = await Promise.all([
          jikanService.getTopAnime(1),
          jikanService.getSeasonalAnime(1),
        ]);
        
        setTopAnime(topRes.data.slice(0, 12));
        setSeasonalAnime(seasonalRes.data.slice(0, 12));
        
        // Pick a random top anime for the hero
        const randomIdx = Math.floor(Math.random() * Math.min(topRes.data.length, 5));
        setFeaturedAnime(topRes.data[randomIdx]);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg pb-24"
    >
      {featuredAnime && <Hero anime={featuredAnime} />}
      
      <div className="flex flex-col gap-12 mt-12">
        <AnimeGrid 
          title="Trending Now" 
          animeList={topAnime} 
          viewAllLink="/trending" 
        />
        
        <div className="px-6 md:px-12 lg:px-24">
          <div className="glass rounded-[40px] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center gap-8">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh opacity-50" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <span className="text-sm font-bold uppercase tracking-[0.4em] text-primary">Exclusive Access</span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-none">
                Join the Zenith<br />Community
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto font-medium">
                Track your favorite anime, get personalized recommendations, and stay updated with the latest releases.
              </p>
            </div>
            
            <button className="relative z-10 bg-white text-black px-10 py-4 rounded-2xl text-lg font-bold hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
              Create Free Account
            </button>
          </div>
        </div>

        <AnimeGrid 
          title="Seasonal Picks" 
          animeList={seasonalAnime} 
          viewAllLink="/seasonal" 
        />
      </div>
    </motion.div>
  );
}

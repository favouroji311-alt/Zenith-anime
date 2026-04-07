import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { jikanService } from "../services/jikan";
import { Anime } from "../types";
import { AnimeCard } from "./AnimeCard";
import { Search as SearchIcon, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const response = await jikanService.searchAnime(query);
        setResults(response.data);
      } catch (err) {
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-4 text-primary">
            <SearchIcon size={32} />
            <span className="text-sm font-bold uppercase tracking-[0.4em]">Search Results</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-none">
            Showing results for <span className="text-primary">"{query}"</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-24 text-white/50 text-xl font-medium">{error}</div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {results.map((anime, index) => (
              <motion.div
                key={anime.mal_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AnimeCard anime={anime} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-white/50 text-xl font-medium">No results found for "{query}"</div>
        )}
      </div>
    </div>
  );
}

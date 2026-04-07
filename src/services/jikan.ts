import { Anime, JikanResponse } from "../types";

const BASE_URL = "https://api.jikan.moe/v4";

export const jikanService = {
  async getTopAnime(page = 1): Promise<JikanResponse<Anime[]>> {
    const response = await fetch(`${BASE_URL}/top/anime?page=${page}`);
    if (!response.ok) throw new Error("Failed to fetch top anime");
    return response.json();
  },

  async getSeasonalAnime(page = 1): Promise<JikanResponse<Anime[]>> {
    const response = await fetch(`${BASE_URL}/seasons/now?page=${page}`);
    if (!response.ok) throw new Error("Failed to fetch seasonal anime");
    return response.json();
  },

  async searchAnime(query: string, page = 1): Promise<JikanResponse<Anime[]>> {
    const response = await fetch(`${BASE_URL}/anime?q=${query}&page=${page}`);
    if (!response.ok) throw new Error("Failed to search anime");
    return response.json();
  },

  async getAnimeDetails(id: number): Promise<JikanResponse<Anime>> {
    const response = await fetch(`${BASE_URL}/anime/${id}/full`);
    if (!response.ok) throw new Error("Failed to fetch anime details");
    return response.json();
  },

  async getRecommendations(id: number): Promise<JikanResponse<any[]>> {
    const response = await fetch(`${BASE_URL}/anime/${id}/recommendations`);
    if (!response.ok) throw new Error("Failed to fetch recommendations");
    return response.json();
  },
};

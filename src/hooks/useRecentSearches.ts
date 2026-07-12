import { useEffect, useState } from "react";

const STORAGE_KEY = "recent-searches";

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const addSearch = (query: string) => {
    const value = query.trim();

    if (!value) return;

    const updated = [
      value,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== value.toLowerCase(),
      ),
    ].slice(0, 8);

    setRecentSearches(updated);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearSearches = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentSearches([]);
  };

  return {
    recentSearches,
    addSearch,
    clearSearches,
  };
};

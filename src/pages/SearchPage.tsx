import { useState } from "react";
import { Search } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { useSearch } from "../hooks/useSearch";
import SearchResultCard from "../components/search/SearchResultCard";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { recentSearches, addSearch, clearSearches } = useRecentSearches();
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, isLoading } = useSearch(debouncedQuery);
  const suggestions =
    debouncedQuery.trim().length > 0 ? (data?.data.slice(0, 5) ?? []) : [];

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="sticky top-20 z-20 mb-8 rounded-3xl bg-white p-1 clay">
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3">
            <Search className="text-zinc-500" />

            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  addSearch(query.trim());
                }
              }}
              placeholder="Search places, cities, categories..."
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg mb-6">
            {suggestions.map((place) => (
              <button
                key={place.id}
                onClick={() => {
                  addSearch(place.name);

                  setShowSuggestions(false);

                  navigate(`/places/${place.slug}`);
                }}
                className="flex w-full items-center gap-3 border-b border-zinc-50 p-4 text-left transition hover:bg-zinc-50 last:border-none"
              >
                <Search size={18} className="text-zinc-400" />

                <div>
                  <p className="font-medium">{place.name}</p>

                  <p className="text-sm text-zinc-500">
                    {place.city}, {place.state}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {!debouncedQuery && (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Searches</h2>

              {recentSearches.length > 0 && (
                <button
                  onClick={clearSearches}
                  className="text-sm text-red-500 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <div className="text-center text-zinc-500 py-10">
                <Search size={60} className="mx-auto mb-4 text-zinc-300" />

                <p>No recent searches.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="rounded-full bg-zinc-100 px-4 py-2 transition hover:bg-zinc-200 flex items-center gap-2"
                  >
                    <Search size={20} className=" text-zinc-500" /> {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {debouncedQuery && isLoading && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-3xl bg-zinc-200"
              />
            ))}
          </div>
        )}

        {debouncedQuery && !isLoading && data?.data?.length === 0 && (
          <div className="mt-20 text-center text-zinc-500">
            <h2 className="text-2xl font-semibold">No places found</h2>

            <p className="mt-2">Try another keyword.</p>
          </div>
        )}

        {data?.data?.map((place) => (
          <div key={place.id} onClick={() => addSearch(query)}>
            <SearchResultCard key={place.id} place={place} />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default SearchPage;

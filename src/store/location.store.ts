import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LocationState {
  city: string | null;
  state: string | null;
  country: string | null;

  latitude: number | null;
  longitude: number | null;

  loading: boolean;
  error: string | null;

  setLocation: (location: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  }) => void;

  setLoading: (loading: boolean) => void;

  setError: (error: string | null) => void;

  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      city: null,
      state: null,
      country: null,

      latitude: null,
      longitude: null,

      loading: false,
      error: null,

      setLocation: (location) =>
        set({
          ...location,
          loading: false,
          error: null,
        }),

      setLoading: (loading) =>
        set({
          loading,
        }),

      setError: (error) =>
        set({
          error,
          loading: false,
        }),

      clearLocation: () =>
        set({
          city: null,
          state: null,
          country: null,
          latitude: null,
          longitude: null,
          loading: false,
          error: null,
        }),
    }),
    {
      name: "location-storage",
    }
  )
)
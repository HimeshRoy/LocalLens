import { useEffect } from "react";
import { locationApi } from "../api/location.api";
import { useLocationStore } from "../store/location.store";

export const useLocation = () => {
  const {
    city,
    state,
    country,
    latitude,
    longitude,
    loading,
    error,
    setLocation,
    setLoading,
    setError,
  } = useLocationStore();

  const refreshLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return null;
    }

    setLoading(true);

    return new Promise<{
      city: string;
      state: string;
      country: string;
      latitude: number;
      longitude: number;
    } | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude, accuracy } = position.coords;

            if (accuracy > 50) {
              setError("Improving your location accuracy...");
            }

            const location = await locationApi.reverseGeocode(
              latitude,
              longitude,
            );

            const locationData = {
              city: location.city,
              state: location.state,
              country: location.country,
              latitude,
              longitude,
            };

            setLocation(locationData);
            setLoading(false);

            resolve(locationData);
          } catch {
            setError("Failed to fetch your location details.");
            resolve(null);
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("Location permission denied.");
              break;

            case error.POSITION_UNAVAILABLE:
              setError("Location unavailable.");
              break;

            case error.TIMEOUT:
              setError("Location request timed out.");
              break;

            default:
              setError("Failed to fetch location.");
          }

          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        },
      );
    });
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.permissions
      ?.query({ name: "geolocation" as PermissionName })
      .then((permission) => {
        if (permission.state === "granted" || permission.state === "prompt") {
          refreshLocation();
        }
      })
      .catch(() => {
        refreshLocation();
      });
  }, []);

  return {
    city,
    state,
    country,
    latitude,
    longitude,
    loading,
    error,
    refreshLocation,
  };
};

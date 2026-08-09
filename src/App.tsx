import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useLocation } from "./hooks/useLocation";
import { Analytics } from "@vercel/analytics/next";

function App() {
  const { refreshLocation, latitude } = useLocation();

  useEffect(() => {
    if (!latitude) {
      refreshLocation();
    }
  }, [latitude]);

  return (
    <>
      <AppRouter />
      <Analytics />
    </>
  );
}

export default App;

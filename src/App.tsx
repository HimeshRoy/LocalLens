import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useLocation } from "./hooks/useLocation";

function App() {
  const { refreshLocation, latitude } = useLocation();

  useEffect(() => {
    if (!latitude) {
      refreshLocation();
    }
  }, [latitude]);

  return <AppRouter />;
}

export default App;

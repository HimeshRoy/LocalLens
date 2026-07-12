import type { ReactNode } from "react";
import Navbar from "../components/common/Navbar";
import BottomNavigation from "../components/common/BottomNavigation";
import { useLocation } from "../hooks/useLocation";
import { ToastContainer } from "react-toastify";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { city, loading, refreshLocation } = useLocation();

  return (
    <>
      <ToastContainer className={"text-center p-4 z-100 fixed top-1 "} />
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Navbar
          city={city ?? undefined}
          loading={loading}
          refreshLocation={refreshLocation}
        />

        <main className="mx-auto w-full max-w-3xl pb-24 pt-4">
          {children}
        </main>

        <BottomNavigation />
      </div>
    </>
  );
};

export default MainLayout;

import type { ReactNode } from "react";
import Navbar from "../components/common/Navbar";
import BottomNavigation from "../components/common/BottomNavigation";
import Sidebar from "../components/common/Sidebar";
import { useLocation } from "../hooks/useLocation";
import { ToastContainer } from "react-toastify";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { city, loading, refreshLocation } = useLocation();

  return (
    <>
      <ToastContainer className="fixed top-1 z-[100] p-4 text-center" />
      
      <div className="flex min-h-screen bg-[var(--color-bg)]">
        <Sidebar />
        <div className="flex w-full flex-col md:ml-64">
          <Navbar
            city={city ?? undefined}
            loading={loading}
            refreshLocation={refreshLocation}
          />
          <main className="mx-auto w-full max-w-3xl pb-24 pt-4 md:pb-8 md:pt-8">
            {children}
          </main>

          <BottomNavigation />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
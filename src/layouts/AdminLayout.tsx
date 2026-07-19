import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <ToastContainer className={"text-center p-4 z-100 fixed top-1 "} />
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
          <AdminTopbar />
        </div>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

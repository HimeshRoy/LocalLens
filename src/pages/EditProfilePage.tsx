import MainLayout from "../layouts/MainLayout";
import EditProfileForm from "../components/profile/EditProfileForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl">

        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3">

          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-lg font-semibold">
            Edit Profile
          </h1>

          <div className="w-10" />

        </div>

        <EditProfileForm />

      </div>
    </MainLayout>
  );
};

export default EditProfilePage;
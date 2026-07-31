import MainLayout from "../layouts/MainLayout";
import EditProfileForm from "../components/profile/EditProfileForm"; 
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl pb-15 pt-6">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition hover:bg-zinc-200 text-black"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-bold text-black">Edit Profile</h1>
            <p className="text-sm text-zinc-500">
              Update your personal information.
            </p>
          </div>
        </div>

        <EditProfileForm />
      </div>
    </MainLayout>
  );
};

export default EditProfilePage;
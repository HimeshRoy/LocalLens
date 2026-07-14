import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import PlaceDetailsPage from "../pages/PlaceDetailsPage";
import AIPage from "../pages/AIPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import AddPlacePage from "../pages/AddPlacePage";
import CollectionDetailsPage from "../pages/CollectionDetailsPage";
import EditPlacePage from "../pages/EditPlacePage";
import PublicProfilePage from "../pages/PublicProfilePage";
import SettingsPage from "../pages/SettingsPage";
import EditProfilePage from "../pages/EditProfilePage";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import CategoriesPage from "../pages/admin/CategoriesPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/places/:slug" element={<PlaceDetailsPage />} />
        <Route path="/ai" element={<AIPage />} />
        <Route path="/users/:username" element={<PublicProfilePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/places/new" element={<AddPlacePage />} />
          <Route path="/collections/:id" element={<CollectionDetailsPage />} />
          <Route path="/places/:id/edit" element={<EditPlacePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import { useParams } from "react-router-dom";

import { useAdminPlace } from "../../hooks/useAdminPlace";
import PlaceHeader from "../../components/admin/place-details/PlaceHeader";
import PlaceStats from "../../components/admin/place-details/PlaceStats";
import PlaceGallery from "../../components/admin/place-details/PlaceGallery";
import PlaceReviews from "../../components/admin/place-details/PlaceReviews";
import PlaceActions from "../../components/admin/place-details/PlaceActions";
import PlaceOverview from "../../components/admin/place-details/PlaceOverview";

const AdminPlaceDetailsPage = () => {
  const { id } = useParams();

  const { data: place, isLoading } = useAdminPlace(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!place) {
    return <div>Place not found.</div>;
  }

  return (
    <div className="space-y-6">
      
      <PlaceHeader place={place} />

      <PlaceStats place={place} />

      <PlaceOverview place={place} />

      <PlaceGallery place={place} />

      <PlaceReviews place={place} />

      <PlaceActions place={place} />
    </div>
  );
};

export default AdminPlaceDetailsPage;
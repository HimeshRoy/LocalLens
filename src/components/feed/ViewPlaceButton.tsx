import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ViewPlaceButtonProps {
  slug: string;
}

const ViewPlaceButton = ({ slug }: ViewPlaceButtonProps) => {
  return (
    <div className="px-5 pb-5 pt-2">
      <Link
        to={`/places/${slug}`}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
      >
        <span>View Place</span>

        <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default ViewPlaceButton;
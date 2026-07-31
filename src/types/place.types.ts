export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const PRICE_RANGES = [
  "BUDGET",
  "MODERATE",
  "PREMIUM",
  "LUXURY",
] as const;

export type PriceRange = (typeof PRICE_RANGES)[number];

export const PRICE_RANGE_LABELS: Record<PriceRange, string> = {
  BUDGET: "Budget",
  MODERATE: "Moderate",
  PREMIUM: "Premium",
  LUXURY: "Luxury",
};

export interface Place {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  images: {
    id: string;
    imageUrl: string;
  }[];

  latitude: number;
  longitude: number;

  coverImage: string | null;

  phone: string | null;
  website: string | null;
  openingHours: string | null;

  priceRange: PriceRange;

  averageRating: number | null;
  totalReviews: number;

  isVerified: boolean;

  category: Category;

  tags: string[];
  createdAt: string;

  createdBy: CreatedBy;
}

export interface CreatedBy {
  id: string;
  fullName: string;
  username: string;
}

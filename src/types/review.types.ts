export interface UserReview {
  id: string;

  rating: number;

  comment: string | null;

  createdAt: string;

  place: {
    id: string;

    name: string;

    city: string;

    state: string;

    coverImage: string;
  };
}
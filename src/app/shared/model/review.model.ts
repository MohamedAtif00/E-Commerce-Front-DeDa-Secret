export interface Review {
  id: string;
  comment: string;
  rating: number;
}

export interface CreateReview {
  ProductId: string;
  comment: string;
  rating: number;
}

export type MovieType = {
  popularity: number | null;
  vote_count: number | null;
  video: boolean;
  poster_path: string | null;
  id: string;
  adult: boolean;
  backdrop_path: string | null;
  original_language: string | null;
  original_title: string | null;
  genre_ids: number[] | null;
  title: string;
  vote_average: number | null;
  overview: string | null;
  release_date: string | null;
};

import { MediaType, TrendingResult } from '~/interfaces/apiresults';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getTrending = async (): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=1`
  );
  const json = await response.json();
  return json;
};

export const getSearchResults = async (query: string): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?language=en-US&api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const json = await response.json();
  console.log('fetching search results', json);
  return json;
};

export const getMovieDetails = async (id: number, type: MediaType): Promise<any> => {
  console.log(`https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${API_KEY}`);

  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${API_KEY}`
  );
  const json = await response.json();
  return json;
};

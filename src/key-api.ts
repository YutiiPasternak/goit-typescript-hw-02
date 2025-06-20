import axios from "axios";

const ACCESS_KEY = "m9HqyYxW26xA9ZLP3KfDmK6Np1Fj1sE_AfGg11xv484";
axios.defaults.baseURL = "https://api.unsplash.com";

export interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
    [key: string]: string;
  };
}

interface ApiResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`/search/photos`, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });
  return response.data;
};

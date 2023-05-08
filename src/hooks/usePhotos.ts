import { useState, useEffect } from "react";
import { getConfig } from "utils/config";

interface Photo {
  id: string;
  alt_description: string;
  description: string;
  urls: {
    thumb: string;
    full: string;
  };
  user: {
    name: string;
  };
}

interface FetchResult {
  data: Photo[];
  isLoading: boolean;
  error: Error | unknown;
}

const usePhotos = (query: string, page = 1, perpage = 10): FetchResult => {
  const [data, setData] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | unknown>(null);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?page=${page}&per_page=${perpage}&query=${query}&client_id=${getConfig(
              "REACT_APP_ACCESS_KEY"
            )}`
          );
          const data = await response.json();
          setData(data.results);
        } catch (error) {
          setError(error);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [query, page, perpage]);

  return { data, isLoading, error };
};

export default usePhotos;

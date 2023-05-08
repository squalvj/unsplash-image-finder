import { useEffect, useState } from "react";
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
  error?: boolean;
  isLoading: boolean;
  page: number;
  refetch: () => void;
  next: () => void;
}

interface UseFetchOptions {
  perPage: number;
}

export default function usePhotos(
  query: string,
  options: UseFetchOptions
): FetchResult {
  const [data, setData] = useState<Photo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${
    options.perPage
  }&query=${query}&client_id=${getConfig("REACT_APP_ACCESS_KEY")}`;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const newData = await response.json();
        setData((prevData) => [...prevData, ...newData.results]);
      } catch (_) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, options.perPage, page]);

  const refetch = () => {
    setData([]);
    setPage(1);
  };

  const next = () => {
    setPage((prev) => prev + 1);
  };

  return { data, error, isLoading, page, refetch, next };
}

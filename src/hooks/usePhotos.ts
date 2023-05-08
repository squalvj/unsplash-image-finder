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
  loading: boolean;
  nextPage: () => void;
  refetch: () => void;
  submit: (query: string) => void;
  hasNext: boolean;
}

interface UseFetchOptions {
  perPage: number;
}

export default function usePhotos(options: UseFetchOptions): FetchResult {
  const [data, setData] = useState<Photo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [hasNext, setHasNext] = useState(true);

  const fetchData = async (thePage = page) => {
    setLoading(true);
    setError(false);
    setHasNext(true)
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${thePage}&per_page=${
          options.perPage
        }&query=${query}&client_id=${getConfig("REACT_APP_ACCESS_KEY")}`
      );

      const newData = await response.json();
      if (newData.results.length === 0) setHasNext(false);

      setData((prevData) => [...prevData, ...newData.results]);
    } catch (_) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query, options.perPage, page]);

  const refetch = () => {
    fetchData(page);
  };

  const nextPage = () => {
    if (error || !hasNext) return;
    setPage((prev) => prev + 1);
  };

  const submit = (newQuery: string) => {
    setPage(1);
    setQuery(newQuery);
  };

  return { data, error, loading, nextPage, refetch, submit, hasNext };
}

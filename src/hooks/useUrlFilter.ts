import { TaskStatus } from '@/api/interfaces/task';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

interface UseUrlFilterProps {
  setFilter: (filter: TaskStatus) => void;
}

export function useUrlFilter({ setFilter }: UseUrlFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const updateFilterInUrl = (value: string) => {
    setSearchParams((params) => {
      params.set("filter", value);
      return params;
    }, { replace: true });

    setFilter(value as TaskStatus);
  };

  useEffect(() => {
    const urlFilter = searchParams.get("filter") as TaskStatus;
    if (urlFilter) {
      setFilter(urlFilter);
    } else if (location.search === "") {
      setFilter(TaskStatus.ALL);
    }
  }, [location.search, searchParams, setFilter]);

  return {
    urlFilter: (searchParams.get("filter") as TaskStatus) || "all",
    updateFilterInUrl
  };
}
import { useEffect, useState } from 'react';

import { BASE_URL, IS_PROD, PROXY_SERVER_URL } from '../constants';

type FetchResponse<T> = {
  data: T[];
  loading: boolean;
  error: any;
};

const useFetch = <T>(
  url: string,
  deps: React.DependencyList = []
): FetchResponse<T> => {
  /**
   * State
   */
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | any>(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${IS_PROD ? `${PROXY_SERVER_URL}?` : ''}${BASE_URL}${url}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, deps);

  return {
    data,
    loading,
    error,
  };
};

export { useFetch };

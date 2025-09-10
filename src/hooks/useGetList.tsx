import { useState, useEffect, useCallback } from 'react';
import { useDataProvider, useNotify } from 'react-admin';

export interface ListParams {
  pagination?: { page: number; perPage: number };
  sort?: { field: string; order: 'ASC' | 'DESC' };
  filter?: Record<string, any>;
}

export interface ListResult<T = any> {
  data: T[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useGetList = <T = any>(
  resource: string,
  params: ListParams = {}
): ListResult<T> => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const defaultParams = {
    pagination: { page: 1, perPage: 10 },
    sort: { field: 'id', order: 'ASC' as const },
    filter: {},
    ...params,
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await dataProvider.getList(resource, defaultParams);
      
      setData(result.data);
      setTotal(result.total);
    } catch (err) {
      const error = err as Error;
      setError(error);
      notify(`Error al cargar ${resource}: ${error.message}`, {
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [dataProvider, resource, defaultParams.pagination.page, defaultParams.pagination.perPage, defaultParams.sort.field, defaultParams.sort.order, JSON.stringify(defaultParams.filter), notify]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    total,
    isLoading,
    error,
    refetch,
  };
};
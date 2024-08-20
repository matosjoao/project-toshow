import { useState, useEffect, useCallback } from 'react';

interface FetchReturnType<T, P> {
    isFetching: boolean;
    canLoadMore: boolean;
    error?: string | null;
    data: T | undefined;
    pagination: Pagination;
    fetchNextPage: (reset: boolean, params?: P) => void;
}

export interface FetchQueryType {
    q?: string | null;
    page: number;
}

export interface FetchResultType<T> {
    page?: number;
    pages?: number;
    data: T;
}

interface Pagination {
    page: number;
    pages: number;
}

function useFetch<T, P = FetchQueryType>(fetchFn: (params?: P) => Promise<FetchResultType<T>>, initialValue?: T, fetchOnMount: boolean = true, initialParams?: P, combineData?: (prevData: T, newData: T) => T): FetchReturnType<T, P> {
    const [data, setData] = useState<T | undefined>(initialValue);
    const [pagination, setPagination] = useState<Pagination>({page: 1, pages: 1});
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (reset?: boolean, params?: P) => {
        setIsFetching(true);
        
        try {
            const fetchedData = await fetchFn(params);

            if (reset || !combineData) {
                setData(fetchedData.data);
            } else {
                setData(prevData => prevData && combineData(prevData, fetchedData.data));
            }

            if(fetchedData.pages != null && fetchedData.page != null) {
                setPagination( {page: fetchedData.page, pages: fetchedData.pages});
            }

            if(combineData && fetchedData.pages != null && fetchedData.page != null && fetchedData.page < fetchedData.pages) {
                setCanLoadMore(true);
            } else {
                setCanLoadMore(false);
            }
            
            setIsFetching(false);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Failed to fetch data.');
            } else {
                setError('Failed to fetch data.');
            }
            setIsFetching(false);
            setCanLoadMore(false);
        }
        
    }, [combineData, fetchFn]);

    useEffect(() => {
        if(!fetchOnMount) return;
        fetchData(true, initialParams);
    }, [fetchData, fetchOnMount, initialParams]);
    
    const fetchNextPage = useCallback((reset: boolean = false, params?: P) => {
        fetchData(reset, params);
    }, [fetchData]);

    return {
        isFetching: isFetching,
        canLoadMore: canLoadMore,
        error: error,
        data: data,
        pagination: pagination,
        fetchNextPage
    };
}
  
export default useFetch;
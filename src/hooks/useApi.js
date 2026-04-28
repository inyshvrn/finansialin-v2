import { useState, useEffect, useCallback, useRef } from 'react';
import { apiGet } from '@/lib/apiClient';

export function useApi(path, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cache the last successful path to avoid refetching unnecessarily
  const lastFetchedPath = useRef(null);
  // Store options stringified to detect changes
  const optionsStr = JSON.stringify(options);

  const fetchApi = useCallback(async (ignoreCache = false) => {
    // If we're already fetching this exact path and we don't want to force refresh, skip
    if (!ignoreCache && lastFetchedPath.current === path && data) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const controller = new AbortController();
    
    try {
      const parsedOptions = optionsStr ? JSON.parse(optionsStr) : {};
      const result = await apiGet(path, {
        ...parsedOptions,
        signal: controller.signal,
        noCache: ignoreCache ? true : parsedOptions.noCache
      });
      
      setData(result);
      lastFetchedPath.current = path;
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
    
    return () => controller.abort();
  }, [path, optionsStr, data]);

  useEffect(() => {
    if (!path) {
      setIsLoading(false);
      return;
    }
    
    const cleanupPromise = fetchApi();
    return () => {
      cleanupPromise.then(cleanup => {
        if (typeof cleanup === 'function') cleanup();
      });
    };
  }, [fetchApi, path]);

  const refetch = useCallback(() => {
    return fetchApi(true);
  }, [fetchApi]);

  return { data, isLoading, error, refetch };
}

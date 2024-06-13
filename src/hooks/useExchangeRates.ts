import { useContext, useEffect } from 'react';

import { ExchangeRateContext } from '../context';
import { ExchangeRate } from '../types';
import { useFetch } from './';

const useExchangeRatesContext = (
  url: string,
  deps: React.DependencyList = []
) => {
  const context = useContext(ExchangeRateContext);

  if (!context) {
    throw new Error(
      'The ExchangeRateContext is missing. The useExchangeRates must be used within an ExchangeRateContext'
    );
  }

  const { data, loading, error } = useFetch<ExchangeRate>(url, deps);

  useEffect(() => {
    context.setLoadingExchangeRates(loading);

    if (!loading) {
      context.setExchangeRates(data);
      context.setExchangeRatesError(error);
    }

    return () => {
      /**
       * Cleanup
       */
      context.setLoadingExchangeRates(false);
      context.setExchangeRates([]);
      context.setExchangeRatesError(null);
    };
  }, [data, loading, error]);

  return context;
};

export { useExchangeRatesContext };

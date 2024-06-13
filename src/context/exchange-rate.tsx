import { createContext, useState } from 'react';

import { ExchangeRate } from '../types';

type ExchangeRateContextProps = {
  exchangeRates: ExchangeRate[];
  exchangeRatesError: null | any;
  loadingExchangeRates: boolean;
  setExchangeRates: React.Dispatch<React.SetStateAction<ExchangeRate[]>>;
  setExchangeRatesError: React.Dispatch<React.SetStateAction<null | any>>;
  setLoadingExchangeRates: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExchangeRateContext = createContext<ExchangeRateContextProps | null>(
  null
);

type ExchangeRateProviderProps = {
  children: React.ReactNode;
};

const ExchangeRateProvider: React.FC<ExchangeRateProviderProps> = ({
  children,
}) => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [exchangeRatesError, setExchangeRatesError] = useState<null | any>(
    null
  );
  const [loadingExchangeRates, setLoadingExchangeRates] = useState(false);

  return (
    <ExchangeRateContext.Provider
      value={{
        exchangeRates,
        exchangeRatesError,
        loadingExchangeRates,
        setExchangeRates,
        setExchangeRatesError,
        setLoadingExchangeRates,
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
};

export { ExchangeRateContext, ExchangeRateProvider };

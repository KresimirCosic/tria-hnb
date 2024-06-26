import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ExchangeRateHistoryPage from './components/pages/ExchangeRateHistoryPage/ExchangeRateHistoryPage';
import ExchangeRatePage from './components/pages/ExchangeRatePage/ExchangeRatePage';
import HomePage from './components/pages/HomePage/HomePage';
import { IS_PROD } from './constants';

function App() {
  return (
    <div id="app">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router basename={IS_PROD ? 'tria-hnb' : undefined}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/exchange-rate" element={<ExchangeRatePage />}></Route>
            <Route
              path="/exchange-rate-history/:currency/:date"
              element={<ExchangeRateHistoryPage />}
            ></Route>
            <Route
              path="/exchange-rate-history/:currency"
              element={<ExchangeRateHistoryPage />}
            ></Route>
          </Routes>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;

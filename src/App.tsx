import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ExchangeRateHistoryPage from './components/pages/ExchangeRateHistoryPage/ExchangeRateHistoryPage';
import ExchangeRatePage from './components/pages/ExchangeRatePage/ExchangeRatePage';
import HomePage from './components/pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/exchange-rate" element={<ExchangeRatePage />}></Route>
        <Route
          path="/exchange-rate-history"
          element={<ExchangeRateHistoryPage />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

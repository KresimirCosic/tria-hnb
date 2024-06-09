import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';

const ExchangeRateHistoryPage: React.FC = () => {
  const { currency, date } = useParams();

  return (
    <DashboardLayout>
      <div className="page page-exchange-rate-history">
        <Container>
          <Typography variant="h4">
            Exchange rate for {currency} {date && `@ ${date}`}
          </Typography>
        </Container>
      </div>
    </DashboardLayout>
  );
};

export default ExchangeRateHistoryPage;

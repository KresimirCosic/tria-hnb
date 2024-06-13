import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isToday } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomTable from '../../../components/common/CustomTable/CustomTable';
import { useExchangeRatesContext } from '../../../hooks';
import { ExchangeRate } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';

const ExchangeRatePage: React.FC = () => {
  /**
   * State
   */
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { exchangeRates, loadingExchangeRates } = useExchangeRatesContext(
    `/tecajn-eur/v3?datum-primjene=${formatDate(selectedDate)}`,
    [selectedDate]
  );
  const navigate = useNavigate();

  /**
   * Methods
   */
  const handleDateChange = (value: Date | null) => {
    if (!value) return;

    if (!isNaN(value!.getTime())) {
      setSelectedDate(value!);
    }
  };

  const handleDateButtonChange = (direction: 'asc' | 'desc') => {
    const date = new Date(selectedDate);
    date.setDate(direction === 'asc' ? date.getDate() + 1 : date.getDate() - 1);
    setSelectedDate(date);
  };

  const handleRowClick = (row: ExchangeRate) => {
    navigate(
      `/exchange-rate-history/${row.valuta}/${formatDate(selectedDate)}`
    );
  };

  return (
    <DefaultLayout>
      <div className="page page-exchange-rate">
        <Container>
          <div className="header-container">
            <div className="title-container">
              <Typography variant="h2">
                Exchange rate number:
                {!!exchangeRates.length && exchangeRates[0].broj_tecajnice}
              </Typography>
              <Typography variant="h4">
                Date:
                {!!exchangeRates.length && exchangeRates[0].datum_primjene}
              </Typography>
            </div>

            <div className="controls-container">
              <DatePicker
                value={selectedDate}
                label="Please select date"
                onChange={handleDateChange}
                disableFuture
                sx={{ marginBlockEnd: '1rem' }}
              />

              <ButtonGroup
                variant="contained"
                size="large"
                disabled={loadingExchangeRates}
              >
                <Button onClick={() => handleDateButtonChange('desc')}>
                  Previous day
                </Button>
                <Button
                  onClick={() => handleDateButtonChange('asc')}
                  disabled={isToday(selectedDate)}
                >
                  Next day
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <CustomTable
            data={exchangeRates}
            onRowClick={handleRowClick}
            columnOffset={2}
          />
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default ExchangeRatePage;

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { subDays } from 'date-fns/subDays';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { formatDate } from '../../../utils/formatDate';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import { ExchangeRate } from '../../../types';

const ExchangeRateHistoryPage: React.FC = () => {
  /**
   * State
   */
  const { currency, date } = useParams<{ currency: string; date?: string }>();
  const [selectedDate, setSelectedDate] = useState(
    date ? new Date(date) : new Date()
  );
  const [data, setData] = useState<ExchangeRate[]>([]);
  const [selectedPastDays, setSelectedPastDays] = useState(2);
  const [isFetching, setIsFetching] = useState(false);

  /**
   * Side effects
   */
  useEffect(() => {
    const endDate = selectedDate;
    const startDate = subDays(endDate, selectedPastDays);

    setIsFetching(true);

    fetch(
      `/api/tecajn-eur/v3?datum-primjene-od=${formatDate(startDate)}&datum-primjene-do=${formatDate(endDate)}`
    )
      .then((res) => res.json())
      .then((data: ExchangeRate[]) => {
        setData(data);
        setIsFetching(false);
        console.log(data);
      });
  }, [selectedDate, selectedPastDays]);

  /**
   * Methods
   */
  const handleDateChange = (value: Date | null) => {
    setSelectedDate(value!);
  };

  const handleSelectedPastDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    /**
     * Some basic guards against changing the value to a NaN, null or undefined
     */
    if (!value || isNaN(Number(value))) {
      setSelectedPastDays(selectedPastDays);
      return;
    }

    if (Number(value) < 2) {
      setSelectedPastDays(2);
      return;
    }

    if (Number(value) >= 60) {
      setSelectedPastDays(60);
      return;
    }

    setSelectedPastDays(Number(value));
  };

  return (
    <DashboardLayout>
      <div className="page page-exchange-rate-history">
        <Container>
          <Typography variant="h4">
            Exchange rate for {currency} {date && `(${date})`}
          </Typography>

          <br />
          <br />

          {/* Controls */}
          <DatePicker
            value={selectedDate}
            label="Please select date"
            disableFuture
            disabled={!!date}
            onChange={handleDateChange}
          />
          <TextField
            type="number"
            value={selectedPastDays}
            onChange={handleSelectedPastDaysChange}
            inputProps={{ min: 2, max: 60 }}
            label="Broj dana"
          />
        </Container>
      </div>
    </DashboardLayout>
  );
};

export default ExchangeRateHistoryPage;

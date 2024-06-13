import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CustomTable from '../../../components/common/CustomTable/CustomTable';
import { useFetch } from '../../../hooks';
import { ExchangeRate } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';

const ExchangeRateHistoryPage: React.FC = () => {
  /**
   * Constants
   */
  const minPastDays = 2;
  const maxPastDays = 60;

  /**
   * State
   */
  const { currency, date } = useParams<{ currency: string; date?: string }>();
  const [selectedDate, setSelectedDate] = useState(
    date ? new Date(date) : new Date()
  );
  const [selectedPastDays, setSelectedPastDays] = useState(minPastDays);
  const endDate = selectedDate;
  const startDate = subDays(endDate, selectedPastDays);
  const { data, loading } = useFetch<ExchangeRate>(
    `/tecajn-eur/v3?datum-primjene-od=${formatDate(startDate)}&datum-primjene-do=${formatDate(endDate)}`,
    [selectedDate, selectedPastDays]
  );
  const [filteredData, setFilteredData] = useState<ExchangeRate[]>([]);

  /**
   * Side effects
   */
  useEffect(() => {
    if (data.length) {
      const filtered = [
        ...new Map(
          data
            .filter((entry) => entry.valuta === currency)
            .map((entry) => [entry['broj_tecajnice'], entry])
        ).values(),
      ].sort((a, b) => {
        const first = new Date(a.datum_primjene);
        const second = new Date(b.datum_primjene);

        if (first > second) return -1;
        if (second > first) return 1;

        return 0;
      });

      setFilteredData(filtered);
    }
  }, [data]);

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

    if (Number(value) < minPastDays) {
      setSelectedPastDays(minPastDays);
      return;
    }

    if (Number(value) >= maxPastDays) {
      setSelectedPastDays(maxPastDays);
      return;
    }

    setSelectedPastDays(Number(value));
  };

  /**
   * Fallback in case the data array is empty
   */
  if (!filteredData.length)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <DefaultLayout>
      <div className="page page-exchange-rate-history">
        <Container>
          <div className="header-container">
            <div className="title-container">
              <Typography variant="h4">
                Exchange rate for {currency} {date && `(${date})`}
              </Typography>
            </div>

            <div className="controls-container">
              <TextField
                type="number"
                value={selectedPastDays}
                onChange={handleSelectedPastDaysChange}
                inputProps={{ min: minPastDays, max: maxPastDays }}
                label="Number of days"
                disabled={loading}
              />
              <DatePicker
                value={selectedDate}
                label="Please select date"
                disableFuture
                disabled={!!date || loading}
                onChange={handleDateChange}
                sx={{ flexGrow: 1 }}
              />
            </div>
          </div>

          <CustomTable
            data={filteredData}
            columnOffset={0}
            sortable={false}
            filterable={false}
            colored
          />
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default ExchangeRateHistoryPage;

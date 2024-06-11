import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CustomTable from '../../../components/common/CustomTable/CustomTable';
import { ExchangeRate } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';

const ExchangeRateHistoryPage: React.FC = () => {
  /**
   * Constants
   */
  const url = import.meta.env.VITE_API_URL;
  const isProd = import.meta.env.PROD;
  const minPastDays = 2;
  const maxPastDays = 60;

  /**
   * State
   */
  const { currency, date } = useParams<{ currency: string; date?: string }>();
  const [selectedDate, setSelectedDate] = useState(
    date ? new Date(date) : new Date()
  );
  const [data, setData] = useState<ExchangeRate[]>([]);
  const [selectedPastDays, setSelectedPastDays] = useState(minPastDays);
  const [isFetching, setIsFetching] = useState(false);

  /**
   * Side effects
   */
  useEffect(() => {
    const endDate = selectedDate;
    const startDate = subDays(endDate, selectedPastDays);

    setIsFetching(true);

    fetch(
      `${isProd ? 'https://corsproxy.io?' : ''}${url}/tecajn-eur/v3?datum-primjene-od=${formatDate(startDate)}&datum-primjene-do=${formatDate(endDate)}`
    )
      .then((res) => res.json())
      .then((data: ExchangeRate[]) => {
        const filteredData = [
          ...new Map(
            data
              .filter((entry) => entry.valuta === currency)
              .map((entry) => [entry['broj_tecajnice'], entry])
          ).values(),
        ].sort((a, b) => {
          const first = new Date(a.datum_primjene);
          const second = new Date(b.datum_primjene);

          if (first > second) return -1;
          if (second < first) return 1;

          return 0;
        });

        setData(filteredData);
        setIsFetching(false);
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
  if (!data.length) return <div>Loading...</div>;

  return (
    <DefaultLayout>
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
            disabled={!!date || isFetching}
            onChange={handleDateChange}
          />
          <TextField
            type="number"
            value={selectedPastDays}
            onChange={handleSelectedPastDaysChange}
            inputProps={{ min: minPastDays, max: maxPastDays }}
            label="Number of days"
            disabled={isFetching}
          />

          <CustomTable
            data={data}
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

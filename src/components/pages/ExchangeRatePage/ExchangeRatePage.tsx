import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isToday } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomTable from '../../../components/common/CustomTable/CustomTable';
import { useFetch } from '../../../hooks';
import { ExchangeRate } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';

const ExchangeRatePage: React.FC = () => {
  /**
   * State
   */
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const { data, loading } = useFetch<ExchangeRate>(
    `/tecajn-eur/v3?datum-primjene=${formatDate(selectedDate)}`,
    [selectedDate]
  );

  /**
   * Methods
   */
  const handleDateChange = (value: Date | null) => {
    if (!value) return;

    if (!isNaN(value!.getTime())) {
      setSelectedDate(value!);
    }
  };

  const handlePrevDate = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setSelectedDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate);
  };

  const handleRowClick = (row: ExchangeRate) => {
    navigate(
      `/exchange-rate-history/${row.valuta}/${formatDate(selectedDate)}`
    );
  };

  /**
   * Fallback in case the data array is empty
   */
  if (!data.length) return <div>Loading...</div>;

  return (
    <DefaultLayout>
      <div className="page page-exchange-rate">
        <Container>
          {/* Controls */}
          <DatePicker
            value={selectedDate}
            label="Please select date"
            onChange={handleDateChange}
            disableFuture
          />

          <br />
          <br />

          <ButtonGroup variant="contained" size="large" disabled={loading}>
            <Button onClick={handlePrevDate}>Previous day</Button>
            <Button onClick={handleNextDate} disabled={isToday(selectedDate)}>
              Next day
            </Button>
          </ButtonGroup>

          <br />
          <br />

          <Typography variant="h4">
            Exchange rate number: {data[0].broj_tecajnice}
          </Typography>
          <Typography variant="h4">Date: {data[0].datum_primjene}</Typography>

          <br />
          <br />

          {/* Table */}
          <CustomTable
            data={data}
            onRowClick={handleRowClick}
            columnOffset={2}
          />
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default ExchangeRatePage;

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isToday } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomTable from '../../../components/common/CustomTable/CustomTable';
import { ExchangeRate } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';

const ExchangeRatePage: React.FC = () => {
  /**
   * State
   */
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<ExchangeRate[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  /**
   * Side effects
   */
  useEffect(() => {
    setIsFetching(true);

    fetch(`/api/tecajn-eur/v3?datum-primjene=${formatDate(date)}`)
      .then((res) => res.json())
      .then((data: ExchangeRate[]) => {
        setData(data);
        setIsFetching(false);
      });
  }, [date]);

  /**
   * Methods
   */
  const handleDateChange = (value: Date | null) => {
    setDate(value!);
  };

  const handlePrevDate = () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    setDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    setDate(nextDate);
  };

  const handleRowClick = (row: ExchangeRate) => {
    navigate(`/exchange-rate-history/${row.valuta}/${formatDate(date)}`);
  };

  /**
   * Fallback in case the data array is empty
   */
  if (!data.length) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="page page-exchange-rate">
        <Container>
          <Typography variant="h4">
            Exchange rate ({formatDate(date)})
          </Typography>

          <br />
          <br />

          {/* Controls */}
          <DatePicker
            value={date}
            label="Please select date"
            onChange={handleDateChange}
            disableFuture
          />

          <br />
          <br />

          <ButtonGroup variant="contained" size="large" disabled={isFetching}>
            <Button onClick={handlePrevDate}>Previous day</Button>
            <Button onClick={handleNextDate} disabled={isToday(date)}>
              Next day
            </Button>
          </ButtonGroup>

          <br />
          <br />

          {/* Table */}
          <CustomTable data={data} onRowClick={handleRowClick} />
        </Container>
      </div>
    </DashboardLayout>
  );
};

export default ExchangeRatePage;

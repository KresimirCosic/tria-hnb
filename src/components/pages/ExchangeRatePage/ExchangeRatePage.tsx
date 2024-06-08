import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ExchangeRate } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import CustomTable from '../../../components/common/CustomTable/CustomTable';

const ExchangeRatePage: React.FC = () => {
  /**
   * State
   */
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<ExchangeRate[]>([]);
  const navigate = useNavigate();

  /**
   * Side effects
   */
  useEffect(() => {
    fetch(`/api/tecajn-eur/v3?datum-primjene=${formatDate(date)}`)
      .then((res) => res.json())
      .then((data: ExchangeRate[]) => setData(data));
  }, [date]);

  /**
   * Methods
   */
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
    console.log(row);
  };

  /**
   * Fallback in case the data array is empty
   */
  if (!data.length) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="page page-exchange-rate">
        <Container>
          <Typography variant="h1">Exchange rate</Typography>

          {/* Controls */}
          <DatePicker value={date} label="Please select date" />

          <br />
          <br />

          <ButtonGroup variant="contained" size="large">
            <Button onClick={handlePrevDate}>Previous day</Button>
            <Button onClick={handleNextDate}>Next day</Button>
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

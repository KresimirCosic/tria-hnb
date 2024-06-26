import DollarIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';

type FabLink = {
  to: string;
  icon: React.ReactNode;
};

const HomePage: React.FC = () => {
  const fabLinks: FabLink[] = [
    {
      to: '/exchange-rate',
      icon: <CurrencyExchangeIcon />,
    },
    {
      to: '/exchange-rate-history/USD',
      icon: <DollarIcon />,
    },
  ];

  return (
    <DefaultLayout>
      <div className="page page-home">
        {fabLinks.map((fabLink) => (
          <Link to={fabLink.to} key={v4()}>
            <Fab color="primary" sx={{ padding: '4rem' }}>
              {fabLink.icon}
            </Fab>
          </Link>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default HomePage;

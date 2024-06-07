import Fab from '@mui/material/Fab';
import EuroIcon from '@mui/icons-material/Euro';
import DollarIcon from '@mui/icons-material/AttachMoney';

import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="page page-home">
        <Fab color="primary" aria-label="add">
          <DollarIcon />
        </Fab>
        <Fab color="primary" aria-label="add">
          <EuroIcon />
        </Fab>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;

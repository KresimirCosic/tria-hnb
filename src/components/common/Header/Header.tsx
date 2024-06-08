import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export type HeaderProps = {
  classes?: string;
};

const Header: React.FC<HeaderProps> = ({ classes }) => {
  return (
    <div className={`header ${classes}`}>
      <Link to={'/'}>
        <Button>Home</Button>
      </Link>
      <Link to={'/exchange-rate'}>
        <Button>Exchange Rate</Button>
      </Link>
      <Link to={'/exchange-rate-history'}>
        <Button>Exchange Rate History</Button>
      </Link>
    </div>
  );
};

export default Header;

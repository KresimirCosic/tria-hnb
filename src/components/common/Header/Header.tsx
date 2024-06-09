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
    </div>
  );
};

export default Header;

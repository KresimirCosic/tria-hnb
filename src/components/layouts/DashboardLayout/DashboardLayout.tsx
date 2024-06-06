import Header from '../../common/Header/Header';

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="layout layout-dashboard">
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;

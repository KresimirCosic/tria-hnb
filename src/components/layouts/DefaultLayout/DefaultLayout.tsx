export type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return <div className="layout layout-default">{children}</div>;
};

export default DefaultLayout;

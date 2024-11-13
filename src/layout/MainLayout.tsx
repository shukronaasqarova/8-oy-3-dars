import { FC, ReactNode } from "react";
import layoutbg from '../assets/layout-bg.png';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full"
      style={{
        backgroundImage: `url(${layoutbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100px', 
        zIndex: 1000, 
      }}
    >
      {children}
    </div>
  );
};

export default MainLayout;

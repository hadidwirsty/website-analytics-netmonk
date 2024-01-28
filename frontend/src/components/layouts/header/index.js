import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTitleByPath } from '../sidebar/navigation';
import { HeaderProfileComponent } from './profile';

import Logo from '../../../assets/svgs/logo_icon-netmonk-analytics.svg';

export const LayoutHeader = () => {
  const location = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(getTitleByPath(location.pathname));
  }, [location]);

  return (
    <header className='header flex justify-between items-center shadow-xs z-40'>
      <div className='pl-16 md:pl-10'>
        <div className='flex'>
          <img
            className='inline-flex md:hidden mr-3 h-6'
            src={Logo}
            alt='Logo Icon Netmonk Analytics'
          />
          <h1 className='hidden md:inline-flex text-2xl font-bold text-gunmetal-90'>
            {title}
          </h1>
        </div>
      </div>
      <div className='pr-10'>
        <HeaderProfileComponent />
      </div>
    </header>
  );
};

export default LayoutHeader;

import React from 'react';
import { LayoutHeader } from '../header';
import { LayoutSidebar } from '../sidebar';
import { LayoutFooter } from '../footer';

export const LayoutBase = ({ children }) => {
  return (
    <div className='dashboard-container'>
      <LayoutHeader />
      <LayoutSidebar />
      <main className='main px-10 pt-10 pb-6'>{children}</main>
      <LayoutFooter />
    </div>
  );
};

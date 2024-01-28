import React from 'react';
import Image503 from '../../../assets/svgs/503.svg';

export const ReportJitter = () => {
  const title = 'Report Jitter';

  return (
    <div className='h-full rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm'>
      <div className='flex flex-col justify-center items-center text-center px-5 py-10'>
        <img
          src={Image503}
          alt='Under Maintenance'
          className='max-w-full h-auto mb-8'
        />
        <div className='text-gunmetal text-heading_3 font-bold mb-1'>
          Sorry, the system is under maintenance.
        </div>
        <div className='text-gunmetal-60 text-body_1 mb-4'>
          We are currently developing the Netmonk Analytics application.
          <br />
          You can come back in a moment.
        </div>
      </div>
    </div>
  );
};

export default ReportJitter;

import React from 'react';
import { Link } from 'react-router-dom';
import Image403 from '../../assets/svgs/403.svg';

export const PageForbidden = () => {
  return (
    <div className='w-full h-screen bg-white p-8 flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center text-center px-5'>
        <img
          src={Image403}
          alt='forbidden'
          className='max-w-full h-auto mb-8'
        />
        <div className='text-gunmetal text-heading_3 font-bold mb-1'>
          Sorry, the page accessed has limited access.
        </div>
        <div className='text-gunmetal-60 text-body_1 mb-4'>
          You do not have permission to access this webpage. Please click the
          button below to return to the previous page.
        </div>
        <Link
          to='/'
          className='bg-main-yale_blue px-8 py-3 inline-flex items-center rounded-lg text-secondary-white hover:bg-main-yale_blue-60'
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageForbidden;

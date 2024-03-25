import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@netmonk/design.ui.button';
import Image404 from '../../assets/svgs/404.svg';

export function PageNotFound() {
  const navigate = useNavigate();
  const handleButtonGoBack = () => navigate(-1);

  return (
    <div className="w-full h-screen bg-white p-8 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center px-5">
        <img src={Image404} alt="Page Not Found" className="max-w-full h-auto mb-8" />
        <div className="text-gunmetal text-heading_3 font-bold mb-1">Page Not Found</div>
        <div className="text-gunmetal-60 text-body_1 mb-4">
          Sorry, something went wrong, please try again later!
        </div>
        <Button
          label="Go Back"
          id="submit"
          color="yale_blue"
          type="button"
          onClick={handleButtonGoBack}
        />
      </div>
    </div>
  );
}

export default PageNotFound;

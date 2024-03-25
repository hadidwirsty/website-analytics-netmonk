import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@netmonk/design.ui.button';
import Image403 from '../../assets/svgs/403.svg';

export function PageForbidden() {
  const navigate = useNavigate();
  const handleButtonGoBack = () => navigate(-1);

  return (
    <div className="w-full h-screen bg-white p-8 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center px-5">
        <img src={Image403} alt="forbidden" className="max-w-full h-auto mb-8" />
        <div className="text-gunmetal text-heading_3 font-bold mb-1">
          Sorry, the page accessed has limited access.
        </div>
        <div className="text-gunmetal-60 text-body_1 mb-4">
          You do not have permission to access this webpage. Please click the button below to return
          to the previous page.
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

export default PageForbidden;

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@netmonk/design.ui.button';
import { logOut } from '../../apps/features/auth/authSlice';
import Image401 from '../../assets/svgs/401.svg';

export function PageUnauthorized() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('teamName');
    localStorage.removeItem('accessToken');
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <div className="w-full h-screen bg-white p-8 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center px-5">
        <img src={Image401} alt="Page Not Found" className="max-w-full h-auto mb-8" />
        <div className="text-gunmetal text-heading_3 font-bold mb-1">Unauthorized Access!</div>
        <div className="text-gunmetal-60 text-body_1 mb-4">
          Unauthorized persons are not permitted. Please click the button below to return to the
          login page and try to log in again!
        </div>
        <Button
          label="Back to Login"
          id="submit"
          color="yale_blue"
          type="button"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default PageUnauthorized;

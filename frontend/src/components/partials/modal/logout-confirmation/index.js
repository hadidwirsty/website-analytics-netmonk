import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@netmonk/design.ui.button';
import { Dialog, Transition } from '@headlessui/react';
import { logOut } from '../../../../apps/features/auth/authSlice';

export function ModalLogoutConfirmationComponent({ isOpen, toggleModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logOut());
    setIsLoading(false);
    navigate('/login');
  };

  return (
    <Transition appear show={isOpen} as={Fragment} onClose={toggleModal}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        style={{
          zIndex: 1300
        }}>
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-gunmetal opacity-50" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-md p-6 my-12 text-left align-middle transition-all transform bg-white drop-shadow-xl rounded-xl">
              <div className="rounded-xl border border-gunmetal-10 p-5">
                <div className="modal-confirmation-body text-center">
                  <div style={{ marginLeft: '100px', marginBottom: '16px' }}>
                    <svg
                      width="115"
                      height="115"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="50" fill="#EA525A" />
                      <circle cx="50" cy="50" r="30" fill="white" />
                      <path
                        d="M50 70C38.954 70 30 61.046 30 50C30 38.954 38.954 30 50 30C53.1053 29.9977 56.1684 30.7196 58.9459 32.1083C61.7233 33.497 64.1387 35.5144 66 38H60.58C58.2705 35.9635 55.4223 34.6367 52.3774 34.1788C49.3325 33.7209 46.2201 34.1513 43.4138 35.4184C40.6074 36.6855 38.2263 38.7355 36.5561 41.3224C34.886 43.9092 33.9977 46.9231 33.998 50.0022C33.9983 53.0814 34.887 56.0951 36.5576 58.6816C38.2282 61.2682 40.6096 63.3178 43.4162 64.5844C46.2228 65.8511 49.3352 66.281 52.3801 65.8226C55.4249 65.3641 58.2728 64.0369 60.582 62H66.002C64.1405 64.4859 61.7248 66.5034 58.947 67.8922C56.1691 69.2809 53.1057 70.0026 50 70ZM64 58V52H48V48H64V42L74 50L64 58Z"
                        fill="#EA525A"
                      />
                    </svg>
                  </div>
                  <div className="title font-bold text-gunmetal-90 text-heading_4 mb-4">
                    Want to Logout?
                  </div>
                  <p className="description text-gunmetal-90 mb-4">
                    Are you sure you want to logout from
                    <br />
                    Netmonk Analytics?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    data-testid="logoutConfirmNo"
                    label="Cancel"
                    id="cancel"
                    color="default"
                    type="button"
                    onClick={toggleModal}
                  />
                  <Button
                    data-testid="logoutConfirmYes"
                    label={isLoading ? 'Logging out...' : 'Logout'}
                    id="submit"
                    color="yale_blue"
                    type="button"
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

ModalLogoutConfirmationComponent.defaultProps = {
  isOpen: false,
  toggleModal: () => {}
};

ModalLogoutConfirmationComponent.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func
};

export default ModalLogoutConfirmationComponent;

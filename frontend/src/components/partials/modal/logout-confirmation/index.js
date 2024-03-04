import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@netmonk/design.ui.button';
import { Dialog, Transition } from '@headlessui/react';

export function ModalLogoutConfirmationComponent({ isOpen, toggleModal }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);

    localStorage.removeItem('auth_token');

    setTimeout(() => {
      setIsLoading(false);

      navigate('/');
    }, 1500);
  };

  return (
    <Transition appear show={isOpen} as={Fragment} onClose={toggleModal}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto">
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
                  <div style={{ marginLeft: '128px', marginBottom: '16px' }}>
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z"
                        fill="#EA525A"
                      />
                      <path
                        d="M50 76C37.8497 76 28 66.1503 28 54C28 41.8497 37.8497 32 50 32"
                        stroke="#EA525A"
                        strokeWidth="5"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28.9329 95.3583C23.4182 89.9183 20 82.3583 20 74V46C20 29.4315 33.4315 16 50 16C66.5685 16 80 29.4315 80 46V74C80 82.3583 76.5818 89.9183 71.0671 95.3583C64.6648 98.337 57.5266 100 50 100C42.4734 100 35.3352 98.337 28.9329 95.3583Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M51.042 32.3872C47.2895 31.6095 43.4008 32.0093 39.8708 33.5327C36.3417 35.0557 33.3373 37.6295 31.2288 40.9171C29.1209 44.2039 28 48.0606 28 52C28 55.9394 29.1209 59.7961 31.2288 63.0829C33.3373 66.3705 36.3417 68.9443 39.8708 70.4673C43.4008 71.9907 47.2895 72.3905 51.042 71.6129C54.7939 70.8353 58.2299 68.9181 60.9197 66.1157C61.8706 65.125 61.8474 63.5423 60.8678 62.5805C59.8883 61.6188 58.3233 61.6423 57.3724 62.633C55.364 64.7255 52.8142 66.1417 50.0496 66.7146C47.2855 67.2874 44.4196 66.9942 41.8111 65.8685C39.2017 64.7424 36.9595 62.8302 35.3766 60.362C33.7932 57.8931 32.9438 54.983 32.9438 52C32.9438 49.017 33.7932 46.1069 35.3766 43.638C36.9595 41.1698 39.2017 39.2576 41.8111 38.1315C44.4196 37.0058 47.2855 36.7126 50.0495 37.2854C52.8142 37.8583 55.364 39.2745 57.3724 41.367C58.3233 42.3577 59.8883 42.3812 60.8678 41.4195C61.8474 40.4578 61.8706 38.875 60.9197 37.8843C58.2299 35.0819 54.7939 33.1647 51.042 32.3872ZM62.4932 43.5915C63.5353 42.6997 65.0951 42.8311 65.9769 43.8851L71.4151 50.3851C72.195 51.3173 72.195 52.6827 71.4151 53.6149L65.9769 60.1149C65.0951 61.1689 63.5353 61.3003 62.4932 60.4085C61.451 59.5166 61.321 57.9392 62.2029 56.8851L64.1984 54.5H52.2247C50.8595 54.5 49.7528 53.3807 49.7528 52C49.7528 50.6193 50.8595 49.5 52.2247 49.5H64.1984L62.2029 47.1149C61.321 46.0608 61.451 44.4834 62.4932 43.5915Z"
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
                    type="submit"
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

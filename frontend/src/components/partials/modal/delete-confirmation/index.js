import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@netmonk/design.ui.button';
import { Dialog, Transition } from '@headlessui/react';

export function ModalDeleteConfirmationComponent({
  isOpen,
  toggleModal,
  onConfirmDelete,
  isLoading
}) {
  const handleConfirmClick = () => {
    if (onConfirmDelete) {
      onConfirmDelete();
    }
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
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="50" fill="#EA525A" />
                      <circle cx="50" cy="50" r="30" fill="white" />
                      <path
                        d="M65.2859 44.9765C65.2859 45.1125 64.2201 58.594 63.6113 64.2678C63.2299 67.7498 60.9853 69.8616 57.6183 69.9216C55.0313 69.9796 52.4989 69.9996 50.0071 69.9996C47.3619 69.9996 44.7748 69.9796 42.2637 69.9216C39.0095 69.8436 36.7629 67.6898 36.4011 64.2678C35.7748 58.574 34.7283 45.1125 34.7089 44.9765C34.6894 44.5665 34.8217 44.1766 35.0901 43.8606C35.3547 43.5686 35.7359 43.3926 36.1366 43.3926H63.8777C64.2765 43.3926 64.6383 43.5686 64.9241 43.8606C65.1907 44.1766 65.3249 44.5665 65.2859 44.9765Z"
                        fill="#EA525A"
                      />
                      <path
                        d="M68 37.9537C68 37.1318 67.3522 36.4878 66.5742 36.4878H60.7428C59.5562 36.4878 58.5254 35.6438 58.2608 34.4538L57.934 32.9959C57.477 31.234 55.8996 30 54.1294 30H45.8725C44.083 30 42.5211 31.234 42.0465 33.0919L41.7411 34.4558C41.4746 35.6438 40.4437 36.4878 39.2591 36.4878H33.4277C32.6477 36.4878 32 37.1318 32 37.9537V38.7137C32 39.5157 32.6477 40.1796 33.4277 40.1796H66.5742C67.3522 40.1796 68 39.5157 68 38.7137V37.9537Z"
                        fill="#EA525A"
                        fillOpacity="0.4"
                      />
                    </svg>
                  </div>
                  <div className="title font-bold text-gunmetal-90 text-heading_4 mb-1">
                    Want to Delete?
                  </div>
                  <p className="description text-gunmetal-90 mb-4">
                    Are you sure you want to delete data from server?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    data-testid="deleteConfirmNo"
                    label="Cancel"
                    id="cancel"
                    color="default"
                    type="button"
                    onClick={toggleModal}
                  />
                  <Button
                    data-testid="deleteConfirmYes"
                    label={isLoading ? 'Deleting...' : 'Delete'}
                    id="submit"
                    color="yale_blue"
                    type="button"
                    onClick={handleConfirmClick}
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

ModalDeleteConfirmationComponent.defaultProps = {
  isOpen: false,
  toggleModal: () => {},
  onConfirmDelete: undefined,
  isLoading: false
};

ModalDeleteConfirmationComponent.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  onConfirmDelete: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ModalDeleteConfirmationComponent;

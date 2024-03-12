import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BasicIcon } from '@netmonk/design.icons.basic';
import { selectCurrentUserDetails } from '../../../apps/features/auth/authSlice';
import ModalLogoutConfirmationComponent from '../../partials/modal/logout-confirmation';
import Logo from '../../../assets/svgs/logo-default.svg';

export function HeaderProfileComponent() {
  const ref = useRef();

  const { teamName: reduxTeamName } = useSelector((state) => state.auth.userDetails);
  const teamName = reduxTeamName || localStorage.getItem('teamName');

  const [isProfileDropdownOpen, setIsProfileDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeDropdown = () => {
    setIsProfileDropdown(false);
  };

  const toggleDropdown = () => {
    setIsProfileDropdown(!isProfileDropdownOpen);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) closeDropdown();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="dropdown relative" ref={ref}>
      <div
        className="flex items-center cursor-pointer border border-gunmetal-50 py-2 px-4 rounded-lg"
        onClick={toggleDropdown}
        data-testid="button-dropdown"
        aria-hidden>
        <div className="flex items-center pr-3 mr-3 border-r border-gunmetal-50 h-10">
          <img src={Logo} width={80} alt="Netmonk" />
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 mr-2 rounded-full text-center inline-flex items-center justify-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 0C6.71371 0 0 6.71371 0 15C0 23.2863 6.71371 30 15 30C23.2863 30 30 23.2863 30 15C30 6.71371 23.2863 0 15 0ZM15 5.80645C17.9395 5.80645 20.3226 8.18952 20.3226 11.129C20.3226 14.0685 17.9395 16.4516 15 16.4516C12.0605 16.4516 9.67742 14.0685 9.67742 11.129C9.67742 8.18952 12.0605 5.80645 15 5.80645ZM15 26.6129C11.4496 26.6129 8.26814 25.004 6.13911 22.4879C7.27621 20.3468 9.50202 18.871 12.0968 18.871C12.2419 18.871 12.3871 18.8952 12.5262 18.9375C13.3125 19.1915 14.1351 19.3548 15 19.3548C15.8649 19.3548 16.6935 19.1915 17.4738 18.9375C17.6129 18.8952 17.7581 18.871 17.9032 18.871C20.498 18.871 22.7238 20.3468 23.8609 22.4879C21.7319 25.004 18.5504 26.6129 15 26.6129Z"
                fill="#134780"
              />
            </svg>
          </div>
          <span className="inline-flex">{teamName}</span>
        </div>
      </div>
      <div
        className={`${
          !isProfileDropdownOpen ? 'hidden' : ''
        } dropdown-item absolute top-auto right-0 text-right bg-secondary-white shadow-md rounded-md border-base-grey border text-base font-medium overflow-hidden mt-2`}
        style={{
          minWidth: '160px'
        }}>
        <button
          type="button"
          className="logout-link py-3 px-4 w-full text-gunmetal hover:bg-main-yale_blue hover:text-secondary-white flex items-center"
          data-testid="logout-link"
          onClick={() => {
            setIsModalOpen(true);
          }}>
          <BasicIcon className="mr-2" name="arrow-out" size="xxs" color="gunmetal" />
          Logout
        </button>
      </div>
      {isModalOpen && (
        <ModalLogoutConfirmationComponent isOpen={isModalOpen} toggleModal={onClose} />
      )}
    </div>
  );
}

export default HeaderProfileComponent;

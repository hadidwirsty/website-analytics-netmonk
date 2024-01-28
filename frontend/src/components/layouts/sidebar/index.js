import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BasicIcon } from '@netmonk/design.icons.basic';
import { sidebarNavigation } from './navigation';
import { hasAccess } from '../../../helpers/acl';
import Logo from '../../../assets/svgs/logo-netmonk-analytics-white.svg';

export const LayoutSidebar = () => {
  const location = useLocation();

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const renderNavContent = (item) => (
    <>
      <span className='nav-icon'>{item.icon}</span>
      <span className='nav-text'>{item.title}</span>
    </>
  );

  const renderNavTitle = (item) => (
    <span className='nav-title'>{renderNavContent(item)}</span>
  );

  const renderNavLink = (item) => (
    <Link
      to={item.path}
      className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
    >
      {renderNavContent(item)}
    </Link>
  );

  const renderItem = (item) => {
    switch (item.type) {
      case 'group':
        return renderNavTitle(item);
      default:
        return renderNavLink(item);
    }
  };

  const renderNavigations = (el) => {
    const hasChild = el.child !== undefined && Array.isArray(el.child);
    const has_access = hasAccess(el.has_access.item, el.has_access.permission);

    if (!has_access) {
      return null;
    }
    return (
      <li className='nav-item' key={Math.random().toString(36).substring(7)}>
        {renderItem(el)}
        {hasChild ? (
          <ul className=''>
            {el.child.map((item) => renderNavigations(item))}
          </ul>
        ) : null}
      </li>
    );
  };

  const openSidebarMenu = () => {
    setIsMobileMenuActive(true);
  };

  const closeSidebarMenu = () => {
    setIsMobileMenuActive(false);
  };

  return (
    <>
      <div
        className={`${
          !isMobileMenuActive ? 'hidden' : ''
        } sidebar-backdrop fixed w-full h-full bg-gunmetal bg-opacity-50`}
        style={{
          zIndex: 10,
        }}
        key='modal-backdrop'
        aria-hidden='true'
        onClick={closeSidebarMenu}
      />
      <aside
        className={`sidebar ${
          isMobileMenuActive ? 'mobile-sidebar-opened' : ''
        }`}
      >
        <button
          type='button'
          className={`md:hidden ${
            isMobileMenuActive && 'hidden'
          } sidebar-mobile-button`}
          onClick={openSidebarMenu}
        >
          <BasicIcon name='hamburger' />
        </button>
        <div className='z-50'>
          <div className='sidebar-brand border-b border-yale_blue-70 px-4 py-6'>
            <div className='flex justify-center items-center'>
              <img
                className='sidebar-brand-icon'
                src={Logo}
                alt='Logo Netmonk Analytics'
              />
            </div>
          </div>
          <ul className='sidebar-nav'>
            {sidebarNavigation.map((el) => renderNavigations(el))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default LayoutSidebar;

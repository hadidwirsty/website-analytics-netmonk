import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LayoutBase } from './components/layouts/base';

import { PageLogin } from './pages/login';
import { PageForbidden } from './components/errors/403';
import { PageNotFound } from './components/errors/404';
import { ServiceUnavailableBoundary } from './components/errors/503';
import { OrderNCX } from './pages/order/ncx';
import { OrderScone } from './pages/order/scone';
import { Overview } from './pages/overview';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? (
    <LayoutBase>
      <Element {...rest} />
    </LayoutBase>
  ) : (
    <Navigate to='/login' replace state={{ from: rest.location }} />
  );
};

export const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<PageLogin />} />
        <Route path='/403' element={<PageForbidden />} />
        <Route path='/404' element={<PageNotFound />} />
        <Route path='/503' element={<ServiceUnavailableBoundary />} />
        <Route
          path='/order/ncx'
          element={<PrivateRoute element={OrderNCX} />}
        />
        <Route
          path='/order/scone'
          element={<PrivateRoute element={OrderScone} />}
        />
        <Route path='/overview' element={<PrivateRoute element={Overview} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

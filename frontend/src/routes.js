import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Layout } from './components/partials/outlet';
import { RequireAuth } from './components/partials/requireAuth';
import { LayoutBase } from './components/layouts/base';

import { PageLogin } from './pages/login';
import { PageForbidden } from './pages/errors/403';
import { PageNotFound } from './pages/errors/404';
import { ServiceUnavailableBoundary } from './pages/errors/503';
import { OrderNCX } from './pages/order/ncx';
import { OrderScone } from './pages/order/scone';
import { Overview } from './pages/overview';

export function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/login" replace />} />

        {/* public routes */}
        <Route path="/login" element={<PageLogin />} />
        <Route path="/403" element={<PageForbidden />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/503" element={<ServiceUnavailableBoundary />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<LayoutBase />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/order/ncx" element={<OrderNCX />} />
            <Route path="/order/scone" element={<OrderScone />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoute;

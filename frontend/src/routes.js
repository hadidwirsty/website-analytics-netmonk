import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Layout } from './components/partials/outlet';
import { RequireAuth } from './components/partials/requireAuth';
import { LayoutBase } from './components/layouts/base';

import { PageLogin } from './pages/login';
import { PageUnauthorized } from './pages/errors/401';
import { PageForbidden } from './pages/errors/403';
import { PageNotFound } from './pages/errors/404';
import { EmployeesList } from './pages/employees';
import { ActiveUsers } from './pages/metabase/active-users';
import { CustomerManagement } from './pages/metabase/customer-management';
import { DevicePelanggan } from './pages/metabase/device-pelanggan';
import { Overview } from './pages/metabase/overview';
import { TrackingOrderNcx } from './pages/metabase/tracking-order-ncx';
import { OrderNCX } from './pages/orders/ncx';
import { OrderScone } from './pages/orders/scone';
import { UsersList } from './pages/users';

export function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/login" replace />} />

        {/* public routes */}
        <Route path="/login" element={<PageLogin />} />
        <Route path="/401" element={<PageUnauthorized />} />
        <Route path="/403" element={<PageForbidden />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route
            path="/employees"
            element={
              <LayoutBase>
                <EmployeesList />
              </LayoutBase>
            }
          />
          <Route
            path="/active-users"
            element={
              <LayoutBase>
                <ActiveUsers />
              </LayoutBase>
            }
          />
          <Route
            path="/customer-management"
            element={
              <LayoutBase>
                <CustomerManagement />
              </LayoutBase>
            }
          />
          <Route
            path="/device-pelanggan"
            element={
              <LayoutBase>
                <DevicePelanggan />
              </LayoutBase>
            }
          />
          <Route
            path="/overview"
            element={
              <LayoutBase>
                <Overview />
              </LayoutBase>
            }
          />
          <Route
            path="/tracking-order-ncx"
            element={
              <LayoutBase>
                <TrackingOrderNcx />
              </LayoutBase>
            }
          />
          <Route
            path="/order/ncx"
            element={
              <LayoutBase>
                <OrderNCX />
              </LayoutBase>
            }
          />
          <Route
            path="/order/scone"
            element={
              <LayoutBase>
                <OrderScone />
              </LayoutBase>
            }
          />
          <Route
            path="/users"
            element={
              <LayoutBase>
                <UsersList />
              </LayoutBase>
            }
          />
        </Route>

        {/* catch all route for 404 Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LayoutBase } from './components/layouts/base';

import { PageLogin } from './pages/login';
import { PageForbidden } from './components/errors/403';
import { PageNotFound } from './components/errors/404';
import { ServiceUnavailableBoundary } from './components/errors/503';

import { BusinessPerformance } from './pages/product-owner/hi/business-performance';
import { CustomerJourney } from './pages/customer-journey';
import { DetailActiveUser } from './pages/order/detail-active-user';
import { DetailActiveUserTreg } from './pages/order/detail-active-user/treg';
import { DetailActiveUserWitel } from './pages/order/detail-active-user/witel';
import { MonitoringApplication } from './pages/monitoring/application';
import { MonitoringCustomer } from './pages/monitoring/customers';
import { MonitoringDevicePelanggan } from './pages/monitoring/device-pelanggan';
import { MonitoringDigitalCustomer } from './pages/monitoring/digital-customers';
import { MonitoringFulfillment } from './pages/monitoring/fulfillment';
import { MonitoringOrderScone } from './pages/monitoring/order-scone';
import { MonitoringWebsite } from './pages/monitoring/website';
import { OrderNCX } from './pages/order/ncx';
import { OrderNCXDBS } from './pages/order/ncx/dbs';
import { OrderNCXInternal } from './pages/order/ncx/internal';
import { OrderNCXTreg } from './pages/order/ncx/treg';
import { OrderNCXWitel } from './pages/order/ncx/witel';
import { OrderOnProgress } from './pages/order/on-progress';
import { OrderScone } from './pages/order/scone';
import { OrderSconeTreg } from './pages/order/scone/treg';
import { OrderSconeWitel } from './pages/order/scone/witel';
import { OrderSconeV2 } from './pages/order/scone_v2';
import { OrderWFM } from './pages/order/wfm';
import { Overview } from './pages/overview';
import { ReportLatency } from './pages/report/latency';
import { ReportPacketLoss } from './pages/report/packet-loss';
import { ReportJitter } from './pages/report/jitter';
import { UserNetmonkHI } from './pages/order/user-netmonk-hi';
import { UserOverview } from './pages/product-owner/prime/user-overview';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const authToken = localStorage.getItem('auth_token');

  return authToken ? (
    <LayoutBase>
      <Element {...rest} />
    </LayoutBase>
  ) : (
    <Navigate to='/login' replace state={{ from: rest.location }} />
  );
};

export const AppRoute = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<PageLogin />} />
        <Route path='/403' element={<PageForbidden />} />
        <Route path='/404' element={<PageNotFound />} />
        <Route path='/503' element={<ServiceUnavailableBoundary />} />
        <Route
          path='/business-performance'
          element={<PrivateRoute element={BusinessPerformance} />}
        />
        <Route
          path='/customer-journey'
          element={<PrivateRoute element={CustomerJourney} />}
        />
        <Route
          path='/detail-active-user/'
          element={<PrivateRoute element={DetailActiveUser} />}
        />
        <Route
          path='/detail-active-user/treg'
          element={<PrivateRoute element={DetailActiveUserTreg} />}
        />
        <Route
          path='/detail-active-user/witel'
          element={<PrivateRoute element={DetailActiveUserWitel} />}
        />
        <Route
          path='/monitoring/application'
          element={<PrivateRoute element={MonitoringApplication} />}
        />
        <Route
          path='/monitoring/customer'
          element={<PrivateRoute element={MonitoringCustomer} />}
        />
        <Route
          path='/monitoring/device-pelanggan'
          element={<PrivateRoute element={MonitoringDevicePelanggan} />}
        />
        <Route
          path='/monitoring/digital-customer'
          element={<PrivateRoute element={MonitoringDigitalCustomer} />}
        />
        <Route
          path='/monitoring/fulfillment'
          element={<PrivateRoute element={MonitoringFulfillment} />}
        />
        <Route
          path='/monitoring/order-scone'
          element={<PrivateRoute element={MonitoringOrderScone} />}
        />
        <Route
          path='/monitoring/website'
          element={<PrivateRoute element={MonitoringWebsite} />}
        />
        <Route
          path='/order/ncx'
          element={<PrivateRoute element={OrderNCX} />}
        />
        <Route
          path='/order/ncx/dbs'
          element={<PrivateRoute element={OrderNCXDBS} />}
        />
        <Route
          path='/order/ncx/internal'
          element={<PrivateRoute element={OrderNCXInternal} />}
        />
        <Route
          path='/order/ncx/treg'
          element={<PrivateRoute element={OrderNCXTreg} />}
        />
        <Route
          path='/order/ncx/witel'
          element={<PrivateRoute element={OrderNCXWitel} />}
        />
        <Route
          path='/order/on-progress'
          element={<PrivateRoute element={OrderOnProgress} />}
        />
        <Route
          path='/order/scone'
          element={<PrivateRoute element={OrderScone} />}
        />
        <Route
          path='/order/scone/treg'
          element={<PrivateRoute element={OrderSconeTreg} />}
        />
        <Route
          path='/order/scone/witel'
          element={<PrivateRoute element={OrderSconeWitel} />}
        />
        <Route
          path='/order/scone-v2'
          element={<PrivateRoute element={OrderSconeV2} />}
        />
        <Route
          path='/order/wfm'
          element={<PrivateRoute element={OrderWFM} />}
        />
        <Route path='/overview' element={<PrivateRoute element={Overview} />} />
        <Route
          path='/report/latency'
          element={<PrivateRoute element={ReportLatency} />}
        />
        <Route
          path='/report/packet-loss'
          element={<PrivateRoute element={ReportPacketLoss} />}
        />
        <Route
          path='/report/jitter'
          element={<PrivateRoute element={ReportJitter} />}
        />
        <Route
          path='/user-netmonk-hi'
          element={<PrivateRoute element={UserNetmonkHI} />}
        />
        <Route
          path='/user-overview'
          element={<PrivateRoute element={UserOverview} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

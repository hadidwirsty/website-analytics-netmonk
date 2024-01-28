import React from 'react';
import { Embed } from '../../../components/partials/embed';

export const MonitoringDigitalCustomer = () => {
  const username = localStorage.getItem('username');
  const title = 'Monitoring Digital Customer';
  let url;

  if (username === 'business') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_BUSINESS_MONITORING_DIGITAL_CUSTOMER}#bordered=false&titled=false`;
  } else if (username === 'marketing') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MARKETING_MONITORING_DIGITAL_CUSTOMER}#bordered=false&titled=false`;
  } else {
    url = '';
  }

  return (
    <div className='h-full rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm'>
      <Embed url={url} title={title} />
    </div>
  );
};

export default MonitoringDigitalCustomer;

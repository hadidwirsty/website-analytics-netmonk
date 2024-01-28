import React from 'react';
import { Embed } from '../../../components/partials/embed';

export const MonitoringCustomer = () => {
  const username = localStorage.getItem('username');
  const title = 'Monitoring Customer';
  let url;

  if (username === 'marketing') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}#bordered=false&titled=false`;
  } else if (username === 'netmonk') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}#bordered=false&titled=false`;
  } else if (username === 'treg1') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}?treg=TREG%20-%201#bordered=false&titled=false`;
  } else if (username === 'treg2') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}?treg=TREG%20-%202#bordered=false&titled=false`;
  } else if (username === 'treg3') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}?treg=TREG%20-%203#bordered=false&titled=false`;
  } else if (username === 'treg4') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}?treg=TREG%20-%204#bordered=false&titled=false`;
  } else if (username === 'treg5') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}?treg=TREG%20-%205#bordered=false&titled=false`;
  } else if (username === 'treg6') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}?treg=TREG%20-%206#bordered=false&titled=false`;
  } else if (username === 'treg7') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_CUSTOMER}?treg=TREG%20-%207#bordered=false&titled=false`;
  } else {
    url = '';
  }

  return (
    <div className='h-full rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm'>
      <Embed url={url} title={title} />
    </div>
  );
};

export default MonitoringCustomer;

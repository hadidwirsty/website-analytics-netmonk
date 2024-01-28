import React from 'react';
import { Embed } from '../../../components/partials/embed';

export const MonitoringDevicePelanggan = () => {
  const title = 'Monitoring Device Pelanggan';
  const url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MONITORING_DEVICE_PELANGGAN}?customer_name=default#bordered=false&titled=false`;

  return (
    <div className='h-full rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm'>
      <Embed url={url} title={title} />
    </div>
  );
};

export default MonitoringDevicePelanggan;

/* eslint-disable no-self-compare */
import React from 'react';
import { LayoutWelcome } from '../../components/partials/welcome';
import { Embed } from '../../components/partials/embed';

export const Overview = () => {
  const username = localStorage.getItem('username');
  const title = 'Overview';
  let url;

  if (username === 'business') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_BUSINESS_OVERVIEW}#bordered=false&titled=false`;
  } else if (username === 'marketing') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_MARKETING_OVERVIEW}#bordered=false&titled=false`;
  } else if (username === 'po-netmonk') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_PO_NETMONK_OVERVIEW}#bordered=false&titled=false`;
  } else if (username === 'SDA Telkom') {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_SDA_TELKOM_OVERVIEW}?tab=1-summary#bordered=false&titled=false`;
  } else if (
    username === 'netmonk' ||
    /^tim-(fulfillment|doa-dbt)$/.test(username) ||
    username === 'SDA-pusat'
  ) {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_OVERVIEW}?#hide_parameters=username_treg%2Cusername_witel&bordered=false&titled=false`;
  } else if (/^treg-\d+$/.test(username)) {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_OVERVIEW}?username_treg=${username}#hide_parameters=username_treg%2Cusername_witel%2Ctreg&bordered=false&titled=false`;
  } else if (username) {
    url = `${process.env.REACT_APP_API_BASE_URL_METABASE}/${process.env.REACT_APP_API_SEGMENT_URL_OVERVIEW}?username_witel=${username}#hide_parameters=username_treg%2Cusername_witel%2Ctreg%2Cwitel&bordered=false&titled=false`;
  } else {
    url = '';
  }

  return (
    <>
      <LayoutWelcome username={username} />
      <div className='h-screen lg:h-90% md:h-5/6 rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm'>
        <Embed url={url} title={title} />
      </div>
    </>
  );
};

export default Overview;

import React from 'react';
import { useGetTrackingOrderNcxUrlQuery } from '../../../apps/features/metabase/metabaseApiSlice';
import { Embed } from '../../../components/partials/embed';

export function TrackingOrderNcx() {
  const { data: trackingOrderNcxUrl, isFetching } = useGetTrackingOrderNcxUrlQuery();
  console.log(trackingOrderNcxUrl);

  let content;
  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (trackingOrderNcxUrl) {
    content = <Embed title="Tracking Order NCX" url={trackingOrderNcxUrl.url} />;
  }

  return (
    <div className="h-full rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm">
      {content}
    </div>
  );
}

export default TrackingOrderNcx;

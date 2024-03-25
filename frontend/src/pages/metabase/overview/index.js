import React from 'react';
import { useGetOverviewUrlQuery } from '../../../apps/features/metabase/metabaseApiSlice';
import { Embed } from '../../../components/partials/embed';
import { LayoutWelcome } from '../../../components/partials/welcome';

export function Overview() {
  const { data: overviewUrl, isFetching } = useGetOverviewUrlQuery();
  console.log(overviewUrl);

  let content;
  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (overviewUrl) {
    content = <Embed title="Overview" url={overviewUrl.url} />;
  }

  return (
    <>
      <LayoutWelcome />
      <div className="h-screen lg:h-90% md:h-5/6 rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm">
        {content}
      </div>
    </>
  );
}

export default Overview;

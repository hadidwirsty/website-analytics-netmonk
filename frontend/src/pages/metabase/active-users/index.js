import React from 'react';
import { useGetActiveUsersUrlQuery } from '../../../apps/features/metabase/metabaseApiSlice';
import { Embed } from '../../../components/partials/embed';

export function ActiveUsers() {
  const { data: activeUsersUrl, isFetching } = useGetActiveUsersUrlQuery();

  let content;
  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (activeUsersUrl) {
    content = <Embed title="Active Users" url={activeUsersUrl.url} />;
  }

  return (
    <div className="h-full rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm">
      {content}
    </div>
  );
}

export default ActiveUsers;

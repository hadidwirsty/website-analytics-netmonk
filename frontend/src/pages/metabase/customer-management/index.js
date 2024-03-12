import React from 'react';
import { useGetCustomerManagementUrlQuery } from '../../../apps/features/metabase/metabaseApiSlice';
import { Embed } from '../../../components/partials/embed';

export function CustomerManagement() {
  const { data: customerManagementUrl, isFetching } = useGetCustomerManagementUrlQuery();

  let content;
  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (customerManagementUrl) {
    content = <Embed title="Customer Management" url={customerManagementUrl.url} />;
  }

  return (
    <div className="h-full rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm">
      {content}
    </div>
  );
}

export default CustomerManagement;

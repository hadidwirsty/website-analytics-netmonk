import React, { useState } from 'react';
import { DataTable } from '@netmonk/design.ui.data-table';
import { TableSearch } from '@netmonk/design.ui.table-search';
import { useGetUsersQuery } from '../../apps/features/users/usersApiSlice';

export function UsersList() {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  const [searchValue, setSearchValue] = useState('');

  const filteredData =
    users?.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    ) || [];

  const subHeaderComponent = () => (
    <TableSearch
      initialKeyword={searchValue}
      placeholder="Search"
      onReset={() => setSearchValue('')}
      onSearch={(keyword) => setSearchValue(keyword)}
    />
  );

  const columns = [
    {
      name: 'Username',
      selector: 'username',
      sortable: true
    },
    {
      name: 'Role',
      selector: 'role',
      sortable: true
    },
    {
      name: 'Team Name',
      selector: 'teamName',
      sortable: true
    }
  ];

  if (isError) {
    return <div>Failed to load users.</div>;
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredData}
        subHeader
        subHeaderComponent={subHeaderComponent}
        persistTableHead
        progressPending={isLoading}
      />
    </div>
  );
}

export default UsersList;

import React, { useState } from 'react';
import { DataTable } from '@netmonk/design.ui.data-table';
import { TableSearch } from '@netmonk/design.ui.table-search';
import { useGetEmployeesQuery } from '../../apps/features/employees/employeesApiSlice';

export function EmployeesList() {
  const { data: users, isLoading, isError } = useGetEmployeesQuery();

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
      name: 'Firstname',
      selector: 'firstname',
      sortable: true
    },
    {
      name: 'Lastname',
      selector: 'lastname',
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

export default EmployeesList;

import React, { useState } from 'react';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { TableSearch } from '@netmonk/design.ui.table-search';
import { useGetEmployeesQuery } from '../../apps/features/employees/employeesApiSlice';

export function EmployeesList() {
  const { data: users, isLoading } = useGetEmployeesQuery();

  const [searchValue, setSearchValue] = useState('');

  const filteredData =
    users?.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    ) || [];

  const exportToCSV = () => {
    let csvData = 'Firstname,Lastname\n';

    filteredData.forEach((row) => {
      csvData += `${row.firstname || '-'},${row.lastname || '-'}\n`;
    });

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = window.URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = csvUrl;
    a.download = `employees.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetFilters = () => {
    setSearchValue('');
  };

  const subHeaderComponent = () => (
    <div className="table-actions-before-wrapper flex flex-row justify-between mb-3">
      <div className="flex flex-row gap-2">
        <div className="button-wrapper">
          <Button
            type="button"
            color="default"
            variant="icon-only"
            icon="refresh"
            onClick={resetFilters}
            className={`opacity-60 hover:opacity-100 ${!searchValue ? 'cursor-not-allowed' : ''}`}
            disabled={!searchValue}
          />
        </div>
        <div className="search-and-filter-wrapper">
          <TableSearch
            initialKeyword={searchValue}
            placeholder="Search"
            onReset={() => setSearchValue('')}
            onSearch={(keyword) => setSearchValue(keyword)}
          />
        </div>
      </div>

      <div className="button-csv">
        <div className="button-wrapper">
          <Button
            type="button"
            label="Export to CSV"
            size="sm"
            color="yale_blue"
            icon="download"
            onClick={exportToCSV}
          />
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      name: 'Firstname',
      selector: (row) => row.firstname,
      cell: (row) => <p>{row.firstname ? row.firstname : '-'}</p>,
      sortable: true
    },
    {
      name: 'Lastname',
      selector: (row) => row.lastname,
      cell: (row) => <p>{row.lastname ? row.lastname : '-'}</p>,
      sortable: true
    }
  ];

  return (
    <div className="rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm table-box">
      <div className="datatable-table-wrapper">
        {subHeaderComponent()}
        <div className="relative">
          <DataTable
            data={filteredData}
            columns={columns}
            allowOverflow
            fixedHeader
            highlightOnHover
            pagination
            persistTableHead
            pointerOnHover
            progressPending={isLoading}
            responsive
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeesList;

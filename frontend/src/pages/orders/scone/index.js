import React, { useState } from 'react';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { Dropdown } from '@netmonk/design.ui.dropdown';
import { TableSearch } from '@netmonk/design.ui.table-search';
import {
  statusAktivasiOptions,
  statusResumeOptions,
  statusWFMOptions,
  tregOptions
} from '../../../utils/filterOptions';
import { useGetOrdersSconeQuery } from '../../../apps/features/orders/orderSconeApiSlice';

export function OrderScone() {
  const { data: orders, isLoading } = useGetOrdersSconeQuery();
  const [searchValue, setSearchValue] = useState('');
  const [selectedStatusAktivasiFilter, setSelectedStatusAktivasiFilter] = useState();
  const [selectedStatusWFMFilter, setSelectedStatusWFMFilter] = useState();
  const [selectedStatusResumeFilter, setSelectedStatusResumeFilter] = useState();
  const [selectedTregFilter, setSelectedTregFilter] = useState();

  const dataSort = Array.isArray(orders)
    ? [...orders].sort((a, b) => {
        if (a.treg < b.treg) {
          return -1;
        }
        if (a.treg > b.treg) {
          return 1;
        }

        if (a.witel < b.witel) {
          return -1;
        }
        if (a.witel > b.witel) {
          return 1;
        }

        return new Date(b.tanggalOrder) - new Date(a.tanggalOrder);
      })
    : [];

  const filteredData = dataSort.filter(
    (row) =>
      Object.values(row).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
      ) &&
      (selectedStatusAktivasiFilter ? row.statusAktivasi === selectedStatusAktivasiFilter : true) &&
      (selectedStatusResumeFilter ? row.statusResume === selectedStatusResumeFilter : true) &&
      (selectedStatusWFMFilter ? row.statusWFM === selectedStatusWFMFilter : true) &&
      (selectedTregFilter ? row.treg === selectedTregFilter : true)
  );

  const exportToCSV = () => {
    let csvData =
      'Nomor SC,Nama Pelanggan,Nomor Internet,Treg,Witel,Status Aktivasi,Status WFM,Tanggal Order,Status Resume\n';

    filteredData.forEach((row) => {
      csvData += `${row.nomorSc || '-'},${row.namaPelanggan || '-'},${
        row.nomorInternet || '-'
      },${row.treg || '-'},${row.witel || '-'},${row.statusAktivasi || '-'},${
        row.statusWFM || '-'
      },${row.tanggalOrder || '-'},${row.statusResume || '-'}\n`;
    });

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = window.URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = csvUrl;
    a.download = `order-scone.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetFilters = () => {
    setSearchValue('');
    setSelectedStatusAktivasiFilter();
    setSelectedStatusResumeFilter();
    setSelectedStatusWFMFilter();
    setSelectedTregFilter();
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
            className={`opacity-60 hover:opacity-100 ${
              !searchValue &&
              !selectedStatusAktivasiFilter &&
              !selectedStatusResumeFilter &&
              !selectedStatusWFMFilter &&
              !selectedTregFilter
                ? 'cursor-not-allowed'
                : ''
            }`}
            disabled={
              !searchValue &&
              !selectedStatusAktivasiFilter &&
              !selectedStatusResumeFilter &&
              !selectedStatusWFMFilter &&
              !selectedTregFilter
            }
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
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            size="sm"
            label="Treg"
            items={tregOptions}
            value={selectedTregFilter}
            onChange={(selectedOption) => {
              setSelectedTregFilter(selectedOption.value);
            }}
          />
        </div>
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            size="sm"
            label="Status Aktivasi"
            items={statusAktivasiOptions}
            value={selectedStatusAktivasiFilter}
            onChange={(selectedOption) => {
              setSelectedStatusAktivasiFilter(selectedOption.value);
            }}
          />
        </div>
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            size="sm"
            label="Status Resume"
            items={statusResumeOptions}
            value={selectedStatusResumeFilter}
            onChange={(selectedOption) => {
              setSelectedStatusResumeFilter(selectedOption.value);
            }}
          />
        </div>
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            size="sm"
            label="Status WFM"
            items={statusWFMOptions}
            value={selectedStatusWFMFilter}
            onChange={(selectedOption) => {
              setSelectedStatusWFMFilter(selectedOption.value);
            }}
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
      name: 'Nomor SC',
      selector: (row) => row.nomorSc,
      cell: (row) => <p>{row.nomorSc ? row.nomorSc : '-'}</p>,
      sortable: true
    },
    {
      name: 'Nama Pelanggan',
      selector: (row) => row.namaPelanggan,
      cell: (row) => <p>{row.namaPelanggan ? row.namaPelanggan : '-'}</p>,
      sortable: true
    },
    {
      name: 'Nomor Internet',
      selector: (row) => row.nomorInternet,
      cell: (row) => <p>{row.nomorInternet ? row.nomorInternet : '-'}</p>,
      sortable: true
    },
    {
      name: 'Treg',
      selector: (row) => row.treg,
      cell: (row) => <p>{row.treg ? row.treg : '-'}</p>,
      sortable: true
    },
    {
      name: 'Witel',
      selector: (row) => row.witel,
      cell: (row) => <p>{row.witel ? row.witel : '-'}</p>,
      sortable: true
    },
    {
      name: 'Status Aktivasi',
      selector: (row) => row.statusAktivasi,
      cell: (row) => <p>{row.statusAktivasi ? row.statusAktivasi : '-'}</p>,
      sortable: true
    },
    {
      name: 'Status WFM',
      selector: (row) => row.statusWFM,
      cell: (row) => <p>{row.statusWFM ? row.statusWFM : '-'}</p>,
      sortable: true
    },
    {
      name: 'Tanggal Order',
      selector: (row) => row.tanggalOrder,
      cell: (row) => <p>{row.tanggalOrder ? row.tanggalOrder : '-'}</p>,
      sortable: true,
      grow: 1.25
    },
    {
      name: 'Status Resume',
      selector: (row) => row.statusResume,
      cell: (row) => <p>{row.statusResume ? row.statusResume : '-'}</p>,
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

export default OrderScone;

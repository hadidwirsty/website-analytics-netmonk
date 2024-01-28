import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { Dropdown } from '@netmonk/design.ui.dropdown';
import { TableSearch } from '@netmonk/design.ui.table-search';

export const OrderSconeWitel = () => {
  const username = localStorage.getItem('username');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStatusFulfillmentFilter, setSelectedStatusFulfillmentFilter] =
    useState();
  const [statusFulfillmentOptions, setStatusFulfillmentOptions] = useState([]);

  const getData = async () => {
    setIsLoading(true);

    const dataURL = `${process.env.REACT_APP_API_BASE_URL}/scone/bywitel?username_witel=${username}`;

    try {
      const response = await axios.get(dataURL);
      setData(response.data.result);

      const arrayStatusFulfillmentOptions = Array.from(
        new Set(response.data.result.map((item) => item.status_fulfillment))
      ).sort();
      setStatusFulfillmentOptions(arrayStatusFulfillmentOptions);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);

      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchValue('');
    setSelectedStatusFulfillmentFilter();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataSort = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (a.status_fulfillment_code < b.status_fulfillment_code) {
          return -1;
        }
        if (a.status_fulfillment_code > b.status_fulfillment_code) {
          return 1;
        }

        return new Date(b.tanggal_aktivasi) - new Date(a.tanggal_aktivasi);
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
      (selectedStatusFulfillmentFilter
        ? row.status_fulfillment === selectedStatusFulfillmentFilter
        : true)
  );

  const exportToCSV = () => {
    let csvData =
      'Nomor SC,Nama Pelanggan,Nomor Internet,Email Pelanggan,Status Fulfillment,Tanggal Order,Estimasi Selesai (WIB)\n';

    filteredData.forEach((row) => {
      csvData += `${row.sc_netmonk || '-'},${row.nama_pelanggan || '-'},${
        row.nomor_internet || '-'
      },${row.email_pelanggan || '-'},${row.status_fulfillment || '-'},${
        row.tanggal_aktivasi || '-'
      },${row.estimasi_selesai || '-'}\n`;
    });

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = window.URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = csvUrl;
    a.download = `order-scone-${username}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const subHeaderComponent = () => (
    <div className='table-actions-before-wrapper flex flex-row justify-between mb-3'>
      <div className='flex flex-row gap-2'>
        <div className='button-wrapper'>
          <Button
            type='button'
            color='default'
            variant='icon-only'
            icon='refresh'
            onClick={resetFilters}
            className={`opacity-60 hover:opacity-100 ${
              !searchValue && !selectedStatusFulfillmentFilter
                ? 'cursor-not-allowed'
                : ''
            }`}
            disabled={!searchValue && !selectedStatusFulfillmentFilter}
          />
        </div>
        <div className='search-and-filter-wrapper'>
          <TableSearch
            initialKeyword={searchValue}
            placeholder='Search'
            onReset={() => setSearchValue('')}
            onSearch={(keyword) => setSearchValue(keyword)}
          />
        </div>
        <div className='dropdown-filter-wrapper z-10'>
          <Dropdown
            size='sm'
            label='Status Fulfillment'
            items={statusFulfillmentOptions.map((status_fulfillment) => ({
              label: status_fulfillment,
              value: status_fulfillment,
            }))}
            onChange={(selectedOption) => {
              setSelectedStatusFulfillmentFilter(selectedOption.value);
            }}
          />
        </div>
      </div>

      <div className='button-csv'>
        <div className='button-wrapper'>
          <Button
            type='button'
            label='Export to CSV'
            size='sm'
            color='yale_blue'
            icon='download'
            onClick={exportToCSV}
          />
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      name: 'Nomor SC',
      selector: (row) => row.sc_netmonk,
      cell: (row) => <p>{row.sc_netmonk ? row.sc_netmonk : '-'}</p>,
      grow: 1.25,
      sortable: true,
    },
    {
      name: 'Nama Pelanggan',
      selector: (row) => row.nama_pelanggan,
      cell: (row) => <p>{row.nama_pelanggan ? row.nama_pelanggan : '-'}</p>,
      grow: 2.5,
      sortable: true,
    },
    {
      name: 'Nomor Internet',
      selector: (row) => row.nomor_internet,
      cell: (row) => <p>{row.nomor_internet ? row.nomor_internet : '-'}</p>,
      grow: 1.25,
      sortable: true,
    },
    {
      name: 'Email Pelanggan',
      selector: (row) => row.email_pelanggan,
      cell: (row) => <p>{row.email_pelanggan ? row.email_pelanggan : '-'}</p>,
      grow: 1.75,
      sortable: true,
    },
    {
      name: 'Status Fulfillment',
      selector: (row) => row.status_fulfillment,
      cell: (row) => (
        <div
          className='py-2 px-3'
          style={{
            borderRadius: 9999,
            backgroundColor:
              row.status_fulfillment === 'Completed by Netmonk (next PJM)'
                ? '#ECF9E5'
                : row.status_fulfillment ===
                  'Konfirmasi ke Pelanggan (cek Email)'
                ? '#FFF8E5'
                : 'transparent',
            color:
              row.status_fulfillment === 'Completed by Netmonk (next PJM)'
                ? 'rgb(46, 184, 126)'
                : row.status_fulfillment ===
                  'Konfirmasi ke Pelanggan (cek Email)'
                ? '#FFB700'
                : 'black',
          }}
        >
          {row.status_fulfillment}
        </div>
      ),
      grow: 2.5,
      sortable: true,
    },
    {
      name: 'Tanggal Order',
      selector: (row) => row.tanggal_aktivasi,
      cell: (row) => <p>{row.tanggal_aktivasi ? row.tanggal_aktivasi : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Estimasi Selesai (WIB)',
      selector: (row) => row.estimasi_selesai,
      cell: (row) => <p>{row.estimasi_selesai ? row.estimasi_selesai : '-'}</p>,
      sortable: true,
    },
  ];

  return (
    <div>
      <div className='rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm table-box'>
        <div className='datatable-table-wrapper'>
          {subHeaderComponent()}
          <div className='relative'>
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
    </div>
  );
};

export default OrderSconeWitel;

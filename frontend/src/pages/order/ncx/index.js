import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { Dropdown } from '@netmonk/design.ui.dropdown';
import { TableSearch } from '@netmonk/design.ui.table-search';

export const OrderNCX = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState();
  const [selectedStatusFulfillmentFilter, setSelectedStatusFulfillmentFilter] =
    useState();
  const [selectedTregFilter, setSelectedTregFilter] = useState();
  const [selectedWitelFilter, setSelectedWitelFilter] = useState();
  const [statusFulfillmentOptions, setStatusFulfillmentOptions] = useState([]);
  const [witelOptions, setWitelOptions] = useState([]);
  const productOptions = [
    {
      label: 'Netmonk HI',
      value: 'Netmonk HI',
    },
    {
      label: 'Netmonk Prime',
      value: 'Netmonk Prime',
    },
  ];
  const tregOptions = [
    {
      label: 'TREG - 1',
      value: 'TREG - 1',
    },
    {
      label: 'TREG - 2',
      value: 'TREG - 2',
    },
    {
      label: 'TREG - 3',
      value: 'TREG - 3',
    },
    {
      label: 'TREG - 4',
      value: 'TREG - 4',
    },
    {
      label: 'TREG - 5',
      value: 'TREG - 5',
    },
    {
      label: 'TREG - 6',
      value: 'TREG - 6',
    },
    {
      label: 'TREG - 7',
      value: 'TREG - 7',
    },
  ];

  const getData = async () => {
    setIsLoading(true);

    const dataURL = `${process.env.REACT_APP_API_BASE_URL}/ncx/?skip=0&limit=10000`;

    try {
      const response = await axios.get(dataURL);
      setData(response.data.result);

      const arrayStatusFulfillmentOptions = Array.from(
        new Set(response.data.result.map((item) => item.status_fulfillment))
      ).sort();
      setStatusFulfillmentOptions(arrayStatusFulfillmentOptions);

      const arrayWitelOptions = Array.from(
        new Set(response.data.result.map((item) => item.witel))
      ).sort();
      setWitelOptions(arrayWitelOptions);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);

      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchValue('');
    setSelectedProductFilter();
    setSelectedTregFilter();
    setSelectedStatusFulfillmentFilter();
    setSelectedWitelFilter();
  };

  useEffect(() => {
    getData();
  }, []);

  const dataSort = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (a.status_fulfillment_code < b.status_fulfillment_code) {
          return -1;
        }
        if (a.status_fulfillment_code > b.status_fulfillment_code) {
          return 1;
        }

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

        return new Date(b.order_created_date) - new Date(a.order_created_date);
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
      (selectedProductFilter ? row.produk === selectedProductFilter : true) &&
      (selectedTregFilter ? row.treg === selectedTregFilter : true) &&
      (selectedStatusFulfillmentFilter
        ? row.status_fulfillment === selectedStatusFulfillmentFilter
        : true) &&
      (selectedWitelFilter ? row.witel === selectedWitelFilter : true)
  );

  const exportToCSV = () => {
    let csvData =
      'Order ID,Nama Pelanggan,Treg,Witel,Status Fulfillment,Order Created Date,Produk,PIC/AM,Jumlah SID,Order Closing Date\n';

    filteredData.forEach((row) => {
      csvData += `${row.order_id || '-'},${row.nama_customer || '-'},${
        row.treg || '-'
      },${row.witel || '-'},${row.status_fulfillment || '-'},${
        row.order_created_date || '-'
      },${row.produk || '-'},${row.pic_am || '-'},${row.sid || '-'},${
        row.order_closing_date || '-'
      }\n`;
    });

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = window.URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = csvUrl;
    a.download = `order-ncx.csv`;
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
              !searchValue &&
              !selectedProductFilter &&
              !selectedTregFilter &&
              !selectedStatusFulfillmentFilter &&
              !selectedWitelFilter
                ? 'cursor-not-allowed'
                : ''
            }`}
            disabled={
              !searchValue &&
              !selectedProductFilter &&
              !selectedTregFilter &&
              !selectedStatusFulfillmentFilter &&
              !selectedWitelFilter
            }
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
            label='Treg'
            items={tregOptions}
            onChange={(selectedOption) => {
              setSelectedTregFilter(selectedOption.value);
            }}
          />
        </div>
        <div className='dropdown-filter-wrapper z-10'>
          <Dropdown
            size='sm'
            label='Witel'
            items={witelOptions.map((witel) => ({
              label: witel,
              value: witel,
            }))}
            onChange={(selectedOption) => {
              setSelectedWitelFilter(selectedOption.value);
            }}
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
        <div className='dropdown-filter-wrapper z-10'>
          <Dropdown
            size='sm'
            label='Produk'
            items={productOptions}
            onChange={(selectedOption) => {
              setSelectedProductFilter(selectedOption.value);
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
      name: 'Order ID',
      selector: (row) => row.order_id,
      cell: (row) => <p>{row.order_id ? row.order_id : '-'}</p>,
      grow: 1.5,
      sortable: true,
    },
    {
      name: 'Nama Pelanggan',
      selector: (row) => row.nama_customer,
      cell: (row) => <p>{row.nama_customer ? row.nama_customer : '-'}</p>,
      grow: 2.5,
      sortable: true,
    },
    {
      name: 'Treg',
      selector: (row) => row.treg,
      cell: (row) => <p>{row.treg ? row.treg : '-'}</p>,
      sortable: true,
      sortField: 'treg',
    },
    {
      name: 'Witel',
      selector: (row) => row.witel,
      cell: (row) => <p>{row.witel ? row.witel : '-'}</p>,
      grow: 1.5,
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
      name: 'Order Created Date',
      selector: (row) => row.order_created_date,
      cell: (row) => (
        <p>{row.order_created_date ? row.order_created_date : '-'}</p>
      ),
      sortable: true,
    },
    {
      name: 'Produk',
      selector: (row) => row.produk,
      cell: (row) => <p>{row.produk ? row.produk : '-'}</p>,
      grow: 1.25,
      sortable: true,
    },
    {
      name: 'PIC/AM',
      selector: (row) => row.pic_am,
      cell: (row) => <p>{row.pic_am ? row.pic_am : '-'}</p>,
      grow: 1.5,
      sortable: true,
    },
    {
      name: 'Jumlah SID',
      selector: (row) => row.sid,
      cell: (row) => <p>{row.sid ? row.sid : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Order Closing Date',
      selector: (row) => row.order_closing_date,
      cell: (row) => (
        <p>{row.order_closing_date ? row.order_closing_date : '-'}</p>
      ),
      sortable: true,
    },
  ];

  return (
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
  );
};

export default OrderNCX;

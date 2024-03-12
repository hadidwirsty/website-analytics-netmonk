import React, { useState } from 'react';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { Dropdown } from '@netmonk/design.ui.dropdown';
import { TableSearch } from '@netmonk/design.ui.table-search';
import {
  productOptions,
  statusFulfillmentOptions,
  tregOptions,
  witelOptions
} from '../../../utils/filterOptions';
import { useGetOrdersNcxQuery } from '../../../apps/features/orders/orderNcxApiSlice';

export function OrderNCX() {
  const { data: orders, isLoading } = useGetOrdersNcxQuery();
  const [searchValue, setSearchValue] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState();
  const [selectedStatusFulfillmentFilter, setSelectedStatusFulfillmentFilter] = useState();
  const [selectedTregFilter, setSelectedTregFilter] = useState();
  const [selectedWitelFilter, setSelectedWitelFilter] = useState();

  const resetFilters = () => {
    setSearchValue('');
    setSelectedProductFilter();
    setSelectedTregFilter();
    setSelectedStatusFulfillmentFilter();
    setSelectedWitelFilter();
  };

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

        return new Date(b.orderCreatedDate) - new Date(a.orderCreatedDate);
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
        ? row.statusFulfillment === selectedStatusFulfillmentFilter
        : true) &&
      (selectedWitelFilter ? row.witel === selectedWitelFilter : true)
  );

  const exportToCSV = () => {
    let csvData =
      'Order ID,Nama Pelanggan,Treg,Witel,Status Fulfillment,Order Created Date,Produk,PIC/AM,Jumlah SID,Order Closing Date\n';

    filteredData.forEach((row) => {
      csvData += `${row.orderId || '-'},${row.namaPelanggan || '-'},${
        row.treg || '-'
      },${row.witel || '-'},${row.statusFulfillment || '-'},${
        row.orderCreatedDate || '-'
      },${row.produk || '-'},${row.pic || '-'},${row.sid || '-'},${row.orderClosingDate || '-'}\n`;
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
            onChange={(selectedOption) => {
              setSelectedTregFilter(selectedOption.value);
            }}
          />
        </div>
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            size="sm"
            label="Witel"
            items={witelOptions}
            onChange={(selectedOption) => {
              setSelectedWitelFilter(selectedOption.value);
            }}
          />
        </div>
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            size="sm"
            label="Status Fulfillment"
            items={statusFulfillmentOptions}
            onChange={(selectedOption) => {
              setSelectedStatusFulfillmentFilter(selectedOption.value);
            }}
          />
        </div>
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            size="sm"
            label="Produk"
            items={productOptions}
            onChange={(selectedOption) => {
              setSelectedProductFilter(selectedOption.value);
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
      name: 'Order ID',
      selector: (row) => row.orderId,
      cell: (row) => <p>{row.orderId ? row.orderId : '-'}</p>,
      sortable: true,
      grow: 1.5
    },
    {
      name: 'Nama Pelanggan',
      selector: (row) => row.namaPelanggan,
      cell: (row) => <p>{row.namaPelanggan ? row.namaPelanggan : '-'}</p>,
      sortable: true,
      grow: 2
    },
    {
      name: 'Treg',
      selector: (row) => row.treg,
      cell: (row) => <p>{row.treg ? row.treg : '-'}</p>,
      sortable: true,
      sortField: 'treg'
    },
    {
      name: 'Witel',
      selector: (row) => row.witel,
      cell: (row) => <p>{row.witel ? row.witel : '-'}</p>,
      sortable: true,
      grow: 1.5
    },
    {
      name: 'Status Fulfillment',
      selector: (row) => row.statusFulfillment,
      cell: (row) => (
        <div
          className="py-2 px-3"
          style={{
            borderRadius: 9999,
            backgroundColor:
              row.statusFulfillment === 'Completed by Netmonk (next PJM)'
                ? '#ECF9E5'
                : row.statusFulfillment === 'Butuh Dokumen SPK/Kontrak'
                  ? '#FFF8E5'
                  : 'transparent',
            color:
              row.statusFulfillment === 'Completed by Netmonk (next PJM)'
                ? 'rgb(46, 184, 126)'
                : row.statusFulfillment === 'Butuh Dokumen SPK/Kontrak'
                  ? '#FFB700'
                  : 'black'
          }}>
          {row.statusFulfillment}
        </div>
      ),
      sortable: true,
      grow: 2.5
    },
    {
      name: 'Order Created Date',
      selector: (row) => row.orderCreatedDate,
      cell: (row) => <p>{row.orderCreatedDate ? row.orderCreatedDate : '-'}</p>,
      sortable: true
    },
    {
      name: 'Produk',
      selector: (row) => row.produk,
      cell: (row) => <p>{row.produk ? row.produk : '-'}</p>,
      sortable: true,
      grow: 1.25
    },
    {
      name: 'PIC/AM',
      selector: (row) => row.pic,
      cell: (row) => <p>{row.pic ? row.pic : '-'}</p>,
      sortable: true,
      grow: 1.5
    },
    {
      name: 'Jumlah SID',
      selector: (row) => row.sid,
      cell: (row) => <p>{row.sid ? row.sid : '-'}</p>,
      sortable: true
    },
    {
      name: 'Order Closing Date',
      selector: (row) => row.orderClosingDate,
      cell: (row) => <p>{row.orderClosingDate ? row.orderClosingDate : '-'}</p>,
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

export default OrderNCX;

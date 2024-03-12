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
      (selectedStatusFulfillmentFilter
        ? row.statusFulfillment === selectedStatusFulfillmentFilter
        : true) &&
      (selectedTregFilter ? row.treg === selectedTregFilter : true) &&
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

  const resetFilters = () => {
    setSearchValue('');
    setSelectedProductFilter(undefined);
    setSelectedStatusFulfillmentFilter(undefined);
    setSelectedTregFilter(undefined);
    setSelectedWitelFilter(undefined);
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
              !selectedStatusFulfillmentFilter &&
              !selectedTregFilter &&
              !selectedWitelFilter
                ? 'cursor-not-allowed'
                : ''
            }`}
            disabled={
              !searchValue &&
              !selectedProductFilter &&
              !selectedStatusFulfillmentFilter &&
              !selectedTregFilter &&
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
            value={selectedTregFilter}
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
            value={selectedWitelFilter}
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
            value={selectedStatusFulfillmentFilter}
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
            value={selectedProductFilter}
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
      grow: 1.5
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
      sortable: true,
      grow: 1.5
    },
    {
      name: 'Status Fulfillment',
      selector: (row) => row.statusFulfillment,
      cell: (row) => {
        const getStatusStyle = (status) => {
          switch (status) {
            case 'Completed by Netmonk (next PJM)':
              return { backgroundColor: '#ECF9E5', color: 'rgb(46, 184, 126)' };
            case 'Butuh Dokumen SPK/Kontrak':
              return { backgroundColor: '#FFF8E5', color: '#FFB700' };
            case 'Canceled Order':
              return { backgroundColor: '#FFE5E5', color: '#D14343' };
            default:
              return { backgroundColor: 'transparent', color: 'black' };
          }
        };

        const statusStyle = getStatusStyle(row.statusFulfillment);

        return (
          <div
            className="py-2 px-4"
            style={{
              borderRadius: 9999,
              backgroundColor: statusStyle.backgroundColor,
              color: statusStyle.color
            }}>
            {row.statusFulfillment}
          </div>
        );
      },
      sortable: true,
      grow: 2.5
    },
    {
      name: 'Created Date',
      selector: (row) => row.orderCreatedDate,
      cell: (row) => <p>{row.orderCreatedDate ? row.orderCreatedDate : '-'}</p>,
      sortable: true,
      grow: 1.25
    },
    {
      name: 'Produk',
      selector: (row) => row.produk,
      cell: (row) => <p>{row.produk ? row.produk : '-'}</p>,
      sortable: true
    },
    {
      name: 'PIC/AM',
      selector: (row) => row.pic,
      cell: (row) => <p>{row.pic ? row.pic : '-'}</p>,
      sortable: true
    },
    {
      name: 'SID',
      selector: (row) => row.sid,
      cell: (row) => <p>{row.sid ? row.sid : '-'}</p>,
      sortable: true
    },
    {
      name: 'Closing Date',
      selector: (row) => row.orderClosingDate,
      cell: (row) => <p>{row.orderClosingDate ? row.orderClosingDate : '-'}</p>,
      sortable: true,
      grow: 1.25
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

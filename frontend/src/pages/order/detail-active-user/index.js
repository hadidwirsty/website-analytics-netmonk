import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BasicIcon } from '@netmonk/design.icons.basic';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { Dropdown } from '@netmonk/design.ui.dropdown';
import { TableSearch } from '@netmonk/design.ui.table-search';

export const DetailActiveUser = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState({
    sc_netmonk: '',
    nama_pelanggan: '',
    nomor_internet: '',
    email_pelanggan: '',
    witel: '',
    treg: '',
    status_active_user: '',
    konfirmasi_pelanggan: '',
    alasan: '',
  });
  const [searchValue, setSearchValue] = useState('');
  const [
    selectedKonfirmasiPelangganFilter,
    setSelectedKonfirmasiPelangganFilter,
  ] = useState();
  const [
    selectedStatusAktifPelangganFilter,
    setSelectedStatusAktifPelangganFilter,
  ] = useState();
  const [selectedTregFilter, setSelectedTregFilter] = useState();
  const [selectedWitelFilter, setSelectedWitelFilter] = useState();
  const [witelOptions, setWitelOptions] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const konfirmasiPelangganOptions = [
    {
      label: 'Belum Konfirmasi',
      value: 'Belum Konfirmasi',
    },
    {
      label: 'Lanjut',
      value: 'Lanjut',
    },
    {
      label: 'Berhenti Berlangganan',
      value: 'Berhenti Berlangganan',
    },
  ];
  const statusAktifPelangganOptions = [
    {
      label: 'CT0',
      value: 'CT0',
    },
    {
      label: 'Active',
      value: 'Active',
    },
    {
      label: 'Passive',
      value: 'Passive',
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

    const dataURL = `${process.env.REACT_APP_API_BASE_URL}/scone/au?skip=0&limit=99999`;

    try {
      const response = await axios.get(dataURL);
      setData(response.data.result);

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

  const getDataDetail = async (sc_netmonk) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/scone/id/${sc_netmonk}`
      );
      const dataDetail = response.data.result;

      setItems({
        sc_netmonk: dataDetail.sc_netmonk,
        nama_pelanggan: dataDetail.nama_pelanggan,
        nomor_internet: dataDetail.nomor_internet,
        email_pelanggan: dataDetail.email_pelanggan,
        witel: dataDetail.witel,
        treg: dataDetail.treg,
        status_active_user: dataDetail.status_active_user,
        konfirmasi_pelanggan: dataDetail.konfirmasi_pelanggan,
        alasan: dataDetail.alasan,
      });
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  };

  const handleDetailButtonClick = (row) => {
    getDataDetail(row.sc_netmonk);
    setShowDetail(true);
  };

  const resetFilters = () => {
    setSearchValue('');
    setSelectedKonfirmasiPelangganFilter();
    setSelectedTregFilter();
    setSelectedStatusAktifPelangganFilter();
    setSelectedWitelFilter();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data !== undefined && data.sc_netmonk !== undefined) {
      setItems(data);
    }
  }, [data]);

  const dataSort = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (a.status_active_user < b.status_active_user) {
          return -1;
        }
        if (a.status_active_user > b.status_active_user) {
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

        return 0;
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
      (selectedKonfirmasiPelangganFilter
        ? row.konfirmasi_pelanggan === selectedKonfirmasiPelangganFilter
        : true) &&
      (selectedTregFilter ? row.treg === selectedTregFilter : true) &&
      (selectedStatusAktifPelangganFilter
        ? row.status_active_user === selectedStatusAktifPelangganFilter
        : true) &&
      (selectedWitelFilter ? row.witel === selectedWitelFilter : true)
  );

  const exportToCSV = () => {
    let csvData =
      'Nomor SC,Nama Pelanggan,Nomor Internet,Email Pelanggan,Treg,Witel,Status Aktif Pengguna,Konfirmasi Pelanggan,Alasan\n';

    filteredData.forEach((row) => {
      csvData += `${row.sc_netmonk || '-'},${row.nama_pelanggan || '-'},${
        row.nomor_internet || '-'
      },${row.email_pelanggan || '-'},${row.treg || '-'},${row.witel || '-'},${
        row.status_active_user || '-'
      },${row.konfirmasi_pelanggan || '-'},${row.alasan || '-'}\n`;
    });

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = window.URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = csvUrl;
    a.download = `detail-active-user.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyToClipboard = (value) => {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const alertDiv = document.createElement('div');
    alertDiv.textContent = 'Copied to clipboard!';
    alertDiv.classList.add('alert');
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 1500);
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
              !selectedKonfirmasiPelangganFilter &&
              !selectedTregFilter &&
              !selectedStatusAktifPelangganFilter &&
              !selectedWitelFilter
                ? 'cursor-not-allowed'
                : ''
            }`}
            disabled={
              !searchValue &&
              !selectedKonfirmasiPelangganFilter &&
              !selectedTregFilter &&
              !selectedStatusAktifPelangganFilter &&
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
            label='Status Aktif Pelanggan'
            items={statusAktifPelangganOptions}
            onChange={(selectedOption) => {
              setSelectedStatusAktifPelangganFilter(selectedOption.value);
            }}
          />
        </div>
        <div className='dropdown-filter-wrapper z-10'>
          <Dropdown
            size='sm'
            label='Konfirmasi Pelanggan'
            items={konfirmasiPelangganOptions}
            onChange={(selectedOption) => {
              setSelectedKonfirmasiPelangganFilter(selectedOption.value);
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

  const showModalDetail = () => {
    const resetForm = () => {
      setItems({
        sc_netmonk: '',
        nama_pelanggan: '',
        nomor_internet: '',
        email_pelanggan: '',
        witel: '',
        treg: '',
        status_active_user: '',
        konfirmasi_pelanggan: '',
        alasan: '',
      });
    };

    const html = (
      <div
        className='fixed top-0 left-0 inset-0 w-full h-full flex items-center justify-center'
        style={{
          zIndex: 1300,
        }}
      >
        <div
          className='backdrop absolute w-full h-full bg-black_blue bg-opacity-50'
          style={{
            zIndex: -1,
          }}
        />
        <div className='modal-inner mx-auto rounded-lg shadow-lg bg-secondary-white'>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={() => {
                setShowDetail(false);
                resetForm();
              }}
              className='focus:outline-none mr-4 mt-3 mb-1'
            >
              <BasicIcon name='close' color='gunmetal' size={14} />
            </button>
          </div>
          <div className='modal-default'>
            <div className='mb-4'>
              <h2 className='modal-header-title'>View Detail Activate User</h2>
            </div>
            <div
              className='modal-content modal-content-bordered bg-secondary-white p-5 flex flex-row w-full justify-between h-auto'
              style={{ maxHeight: '60vh' }}
            >
              <div className='flex flex-col h-full w-full border border-gunmetal-30 rounded'>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30 border-b'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Nomor SC
                  </label>
                  <div className='px-3 py-4'>
                    <span className='text-gunmetal-90'>
                      {items.sc_netmonk || '-'}
                    </span>
                    <button onClick={() => copyToClipboard(items.sc_netmonk)}>
                      <BasicIcon
                        size={16}
                        color='yale_blue'
                        name='link-outline'
                        className='ml-1 hover:text-main-yale_blue-60'
                      />
                    </button>
                  </div>
                </div>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30 border-b'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Nama Pelanggan
                  </label>
                  <span className='text-gunmetal-90 px-3 py-4'>
                    {items.nama_pelanggan || '-'}
                  </span>
                </div>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30 border-b'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Nomor Internet
                  </label>
                  <span className='text-gunmetal-90 px-3 py-4'>
                    {items.nomor_internet || '-'}
                  </span>
                </div>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30 border-b'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Email Pelanggan
                  </label>
                  <span className='text-gunmetal-90 px-3 py-4'>
                    {items.email_pelanggan || '-'}
                  </span>
                </div>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30 border-b'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Treg
                  </label>
                  <span className='text-gunmetal-90 px-3 py-4'>
                    {items.treg || '-'}
                  </span>
                </div>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30 border-b'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Witel
                  </label>
                  <span className='text-gunmetal-90 px-3 py-4'>
                    {items.witel || '-'}
                  </span>
                </div>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30 border-b'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Status Aktif Pelanggan
                  </label>
                  <span className='text-gunmetal-90 px-3 py-4'>
                    {items.status_active_user || '-'}
                  </span>
                </div>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30 border-b'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Konfirmasi Pelanggan
                  </label>
                  <span className='text-gunmetal-90 px-3 py-4'>
                    {items.konfirmasi_pelanggan || '-'}
                  </span>
                </div>
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Alasan
                  </label>
                  <span className='text-gunmetal-90 px-3 py-4'>
                    {items.alasan || '-'}
                  </span>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <div className='flex justify-between gap-4 pt-5'>
                <Button
                  block
                  type='button'
                  color='yale_blue'
                  label='Close'
                  onClick={() => {
                    setShowDetail(false);
                    resetForm();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return showDetail ? html : null;
  };

  const columns = [
    {
      name: 'Nomor SC',
      selector: (row) => row.sc_netmonk,
      cell: (row) => <p>{row.sc_netmonk ? row.sc_netmonk : '-'}</p>,
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
      sortable: true,
    },
    {
      name: 'Email Pelanggan',
      selector: (row) => row.email_pelanggan,
      cell: (row) => <p>{row.email_pelanggan ? row.email_pelanggan : '-'}</p>,
      grow: 1.5,
      sortable: true,
    },
    {
      name: 'Treg',
      selector: (row) => row.treg,
      cell: (row) => <p>{row.treg ? row.treg : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Witel',
      selector: (row) => row.witel,
      cell: (row) => <p>{row.witel ? row.witel : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Status Aktif Pengguna',
      selector: (row) => row.status_active_user,
      cell: (row) => (
        <p>{row.status_active_user ? row.status_active_user : '-'}</p>
      ),
      sortable: true,
    },
    {
      name: 'Konfirmasi Pelanggan',
      selector: (row) => row.konfirmasi_pelanggan,
      cell: (row) => (
        <p>{row.konfirmasi_pelanggan ? row.konfirmasi_pelanggan : '-'}</p>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      selector: (row) => row.action,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button
            variant='icon-only'
            icon='eye'
            color='yale_blue'
            size='xs'
            onClick={() => handleDetailButtonClick(row)}
          />
        </div>
      ),
      center: true,
      width: '115px',
    },
  ];

  return (
    <div>
      {showModalDetail()}
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

export default DetailActiveUser;

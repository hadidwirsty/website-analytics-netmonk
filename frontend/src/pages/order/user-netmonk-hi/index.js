import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BasicIcon } from '@netmonk/design.icons.basic';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { Dropdown } from '@netmonk/design.ui.dropdown';
import { TableSearch } from '@netmonk/design.ui.table-search';

export const UserNetmonkHI = () => {
  const ref = useRef();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState({
    nomor_sc: '',
    nama_pelanggan: '',
    nohp_pelanggan: '',
    email_pelanggan: '',
    regional: '',
    witel: '',
    status_aktivasi: '',
    status_resume: '',
    status_wfm: '',
    tanggal_aktivasi: '',
    tanggal_baa: '',
    username: '',
    password: '',
    secret_key: '',
    catatan: '',
  });
  const [searchValue, setSearchValue] = useState('');
  const [selectedRegionalFilter, setSelectedRegionalFilter] = useState();
  const [selectedStatusAktivasiFilter, setSelectedStatusAktivasiFilter] =
    useState();
  const [selectedStatusResumeFilter, setSelectedStatusResumeFilter] =
    useState();
  const [selectedStatusWFMFilter, setSelectedStatusWFMFilter] = useState();
  const [selectedWitelFilter, setSelectedWitelFilter] = useState();
  const [witelOptions, setWitelOptions] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const regionalOptions = [
    {
      label: 'REG-1',
      value: 'REG-1',
    },
    {
      label: 'REG-2',
      value: 'REG-2',
    },
    {
      label: 'REG-3',
      value: 'REG-3',
    },
    {
      label: 'REG-4',
      value: 'REG-4',
    },
    {
      label: 'REG-5',
      value: 'REG-5',
    },
    {
      label: 'REG-6',
      value: 'REG-6',
    },
    {
      label: 'REG-7',
      value: 'REG-7',
    },
  ];
  const [statusAktivasiValue, setStatusAktivasiValue] = useState();
  const statusAktivasiOptions = [
    {
      label: 'Activated',
      value: 'Activated',
    },
    {
      label: 'Not Activated',
      value: 'Not Activated',
    },
    {
      label: 'Deactivated',
      value: 'Deactivated',
    },
  ];
  const statusResume = [
    {
      label: 'OSS - PROVISIONING START',
      value: 'OSS - PROVISIONING START',
    },
    {
      label: 'MYCX - SEND OPEN PAPERLESS',
      value: 'MYCX - SEND OPEN PAPERLESS',
    },
    {
      label: 'OSS - TESTING SERVICE',
      value: 'OSS - TESTING SERVICE',
    },
    {
      label: 'OSS - PROVISIONING DESAIN',
      value: 'OSS - PROVISIONING DESAIN',
    },
    {
      label: '7 | OSS - PROVISIONING ISSUED',
      value: '7 | OSS - PROVISIONING ISSUED',
    },
    {
      label: '10 | OSS - PROVISIONING COMPLETE',
      value: '10 | OSS - PROVISIONING COMPLETE',
    },
    {
      label: 'OSS - FALLOUT',
      value: 'OSS - FALLOUT',
    },
    {
      label: 'MYCX - FAIL',
      value: 'MYCX - FAIL',
    },
  ];
  const [statusWFMValue, setStatusWFMValue] = useState();
  const statusWFM = [
    {
      label: 'To Do',
      value: 'To Do',
    },
    {
      label: 'On Progress',
      value: 'On Progress',
    },
    {
      label: 'Closed',
      value: 'Closed',
    },
    {
      label: 'Cancel',
      value: 'Cancel',
    },
  ];

  const getData = async () => {
    setIsLoading(true);

    const dataURL = `${process.env.REACT_APP_API_BASE_URL}/newscone/user`;

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

  const getDataDetail = async (nomor_sc) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/newscone/id/${nomor_sc}`
      );
      const dataDetail = response.data.result;

      setItems({
        nomor_sc: dataDetail.nomor_sc,
        nama_pelanggan: dataDetail.nama_pelanggan,
        nohp_pelanggan: dataDetail.nohp_pelanggan,
        email_pelanggan: dataDetail.email_pelanggan,
        regional: dataDetail.regional,
        witel: dataDetail.witel,
        status_aktivasi: dataDetail.status_aktivasi,
        status_resume: dataDetail.status_resume,
        status_wfm: dataDetail.status_wfm,
        tanggal_aktivasi: dataDetail.tanggal_aktivasi,
        tanggal_baa: dataDetail.tanggal_baa,
        username: dataDetail.username,
        password: dataDetail.password,
        secret_key: dataDetail.secret_key,
        catatan: dataDetail.catatan,
      });
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/newscone/update_scone`,
        { parameter: items },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('Data berhasil di-update:', response.data);

        setShowEdit(false);

        setTimeout(() => {
          getData();
        }, 1500);
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const body = {
      ...items,
      [name]: value,
    };
    setItems(body);
  };

  const handleChangeStatusAktivasi = (e) => {
    setStatusAktivasiValue(e.label);

    const body = { ...items, status_aktivasi: e.value };
    setItems(body);
  };

  const handleChangeStatusWFM = (e) => {
    setStatusWFMValue(e.label);

    const body = { ...items, status_wfm: e.value };
    setItems(body);
  };

  const handleDetailButtonClick = (row) => {
    getDataDetail(row.nomor_sc);
    setShowDetail(true);
  };

  const handleEditButtonClick = (row) => {
    getDataDetail(row.nomor_sc);
    setShowEdit(true);
  };

  const resetFilters = () => {
    setSearchValue('');
    setSelectedRegionalFilter();
    setSelectedStatusAktivasiFilter();
    setSelectedStatusResumeFilter();
    setSelectedStatusWFMFilter();
    setSelectedWitelFilter();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (items.status_aktivasi) {
      setStatusAktivasiValue(
        items.status_aktivasi === 'Activated'
          ? 'Activated'
          : items.status_aktivasi === 'Not Activated'
          ? 'Not Activated'
          : 'Deactivated'
      );
    }

    if (items.status_wfm) {
      setStatusWFMValue(
        items.status_wfm === 'To Do'
          ? 'To Do'
          : items.status_wfm === 'On Progress'
          ? 'On Progress'
          : items.status_wfm === 'Closed'
          ? 'Closed'
          : 'Cancel'
      );
    }
  }, [items]);

  useEffect(() => {
    if (data !== undefined && data.nomor_sc !== undefined) {
      setItems(data);
    }
  }, [data]);

  const dataSort = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (a.tanggal_aktivasi > b.tanggal_aktivasi) {
          return -1;
        }
        if (a.tanggal_aktivasi < b.tanggal_aktivasi) {
          return 1;
        }

        if (a.regional < b.regional) {
          return -1;
        }
        if (a.regional > b.regional) {
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
      (selectedRegionalFilter
        ? row.regional === selectedRegionalFilter
        : true) &&
      (selectedStatusAktivasiFilter
        ? row.status_aktivasi === selectedStatusAktivasiFilter
        : true) &&
      (selectedStatusResumeFilter
        ? row.status_resume === selectedStatusResumeFilter
        : true) &&
      (selectedStatusWFMFilter
        ? row.status_wfm === selectedStatusWFMFilter
        : true) &&
      (selectedWitelFilter ? row.witel === selectedWitelFilter : true)
  );

  const exportToCSV = () => {
    let csvData =
      'Nomor SC,Nama Pelanggan,Nomor Hp Pelanggan,Email Pelanggan,Regional,Witel,Status Aktivasi,Status WFM,Tanggal Aktivasi,Tanggal BAA,Status Resume,Username,Password,Secret Key,Catatan\n';

    filteredData.forEach((row) => {
      csvData += `${row.nomor_sc || '-'},${row.nama_pelanggan || '-'},${
        row.nohp_pelanggan || '-'
      },${row.email_pelanggan || '-'},${row.regional || '-'},${
        row.witel || '-'
      },${row.status_aktivasi || '-'},${row.status_wfm || '-'},${
        row.tanggal_aktivasi || '-'
      },${row.tanggal_baa || '-'},${row.status_resume || '-'},${
        row.username || '-'
      },${row.password || '-'},${row.secret_key || '-'},${
        row.catatan || '-'
      }\n`;
    });

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = window.URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = csvUrl;
    a.download = `user-netmonk-hi.csv`;
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
              !selectedRegionalFilter &&
              !selectedStatusAktivasiFilter &&
              !selectedStatusResumeFilter &&
              !selectedStatusWFMFilter &&
              !selectedWitelFilter
                ? 'cursor-not-allowed'
                : ''
            }`}
            disabled={
              !searchValue &&
              !selectedRegionalFilter &&
              !selectedStatusAktivasiFilter &&
              !selectedStatusResumeFilter &&
              !selectedStatusWFMFilter &&
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
            label='Regional'
            items={regionalOptions}
            onChange={(selectedOption) => {
              setSelectedRegionalFilter(selectedOption.value);
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
            label='Status Aktivasi'
            items={statusAktivasiOptions}
            onChange={(selectedOption) => {
              setSelectedStatusAktivasiFilter(selectedOption.value);
            }}
          />
        </div>
        <div className='dropdown-filter-wrapper z-10'>
          <Dropdown
            size='sm'
            label='Status WFM'
            items={statusWFM}
            onChange={(selectedOption) => {
              setSelectedStatusWFMFilter(selectedOption.value);
            }}
          />
        </div>
        <div className='dropdown-filter-wrapper z-10'>
          <Dropdown
            size='sm'
            label='Status Resume'
            items={statusResume}
            onChange={(selectedOption) => {
              setSelectedStatusResumeFilter(selectedOption.value);
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
        nomor_sc: '',
        nama_pelanggan: '',
        regional: '',
        witel: '',
        tanggal_aktivasi: '',
        username: '',
        password: '',
        secret_key: '',
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
        <div className='modal-inner modal-inner mx-auto rounded-lg shadow-lg bg-secondary-white'>
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
              <h2 className='modal-header-title'>View User Netmonk HI</h2>
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
                      {items.nomor_sc || '-'}
                    </span>
                    <button onClick={() => copyToClipboard(items?.nomor_sc)}>
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
                    Username
                  </label>
                  <div className='px-3 py-4'>
                    <span className='text-gunmetal-90'>
                      {items.username || '-'}
                    </span>
                    <button onClick={() => copyToClipboard(items?.username)}>
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
                    Password
                  </label>
                  <div className='px-3 py-4'>
                    <span className='text-gunmetal-90'>
                      {items.password || '-'}
                    </span>
                    <button onClick={() => copyToClipboard(items?.password)}>
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
                    Secret Key
                  </label>
                  <div className='px-3 py-4'>
                    <span className='text-gunmetal-90'>
                      {items.secret_key || '-'}
                    </span>
                    <button onClick={() => copyToClipboard(items?.secret_key)}>
                      <BasicIcon
                        size={16}
                        color='yale_blue'
                        name='link-outline'
                        className='ml-1 hover:text-main-yale_blue-60'
                      />
                    </button>
                  </div>
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

  const showModalEdit = () => {
    const resetForm = () => {
      setItems({
        nomor_sc: '',
        nama_pelanggan: '',
        status_aktivasi: '',
        status_wfm: '',
        tanggal_baa: '',
        catatan: '',
      });

      setStatusAktivasiValue();
      setStatusWFMValue();
    };

    const html = (
      <div
        className='fixed top-0 left-0 w-full h-full flex items-center justify-center'
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
                setShowEdit(false);
                resetForm();
              }}
              className='focus:outline-none mr-4 mt-3 mb-1'
            >
              <BasicIcon name='close' color='gunmetal' size={14} />
            </button>
          </div>

          <form className='modal-default' onSubmit={onSubmit}>
            <div className='mb-4'>
              <h2 className='modal-header-title'>Update User Netmonk HI</h2>
            </div>

            <div className='modal-content-bordered p-4'>
              <div className='grid grid-cols-1'>
                <label htmlFor='nomor_sc' className='form-label block mb-2'>
                  Nomor SC
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    required
                    id='nomor_sc'
                    name='nomor_sc'
                    defaultValue={items.nomor_sc || ''}
                    disabled={items.nomor_sc ? true : false}
                    className='form-input block w-full border-gunmetal-40'
                    placeholder='Enter nomor SC'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='nama_pelanggan'
                  className='form-label block mb-2'
                >
                  Nama Pelanggan
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    required
                    id='nama_pelanggan'
                    name='nama_pelanggan'
                    defaultValue={items.nama_pelanggan || ''}
                    disabled={items.nama_pelanggan ? true : false}
                    className='form-input block w-full border-gunmetal-40'
                    placeholder='Enter nama pelanggan...'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label htmlFor='status_wfm' className='form-label block mb-2'>
                  Status WFM
                </label>
                <div className='form-group'>
                  <input
                    id='status_wfm'
                    name='status_wfm'
                    type='hidden'
                    defaultValue={items.status_wfm}
                  />
                  <Dropdown
                    block
                    size='sm'
                    items={statusWFM}
                    onChange={handleChangeStatusWFM}
                    label={
                      items.status_wfm ? statusWFMValue : 'Select status WFM'
                    }
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label htmlFor='tanggal_baa' className='form-label block mb-2'>
                  Tanggal BAA
                </label>
                <div className='form-group'>
                  <input
                    type='text'
                    ref={ref}
                    onFocus={() => (ref.current.type = 'datetime-local')}
                    onBlur={() => (ref.current.type = 'text')}
                    id='tanggal_baa'
                    name='tanggal_baa'
                    className='form-input block w-full border-gunmetal-40'
                    value={items.tanggal_baa || ''}
                    onChange={onChange}
                    placeholder='Select tanggal BAA'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='status_aktivasi'
                  className='form-label block mb-2'
                >
                  Status Aktivasi
                </label>
                <div className='form-group'>
                  <input
                    id='status_aktivasi'
                    name='status_aktivasi'
                    type='hidden'
                    defaultValue={items.status_aktivasi}
                  />
                  <Dropdown
                    block
                    size='sm'
                    items={statusAktivasiOptions}
                    onChange={handleChangeStatusAktivasi}
                    label={
                      items.status_aktivasi
                        ? statusAktivasiValue
                        : 'Select status aktivasi'
                    }
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <div className='form-group'>
                  <label htmlFor='catatan' className='form-label block mb-2'>
                    Catatan
                  </label>
                  <textarea
                    rows={4}
                    id='catatan'
                    name='catatan'
                    onChange={onChange}
                    defaultValue={items.catatan || ''}
                    placeholder='Enter catatan...'
                    className='form-textarea block w-full border-gunmetal-40 undefined'
                  />
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <div className='flex justify-between gap-4 pt-5'>
                <Button
                  block
                  type='button'
                  color='default'
                  label='Cancel'
                  onClick={() => {
                    setShowEdit(false);
                    resetForm();
                  }}
                />
                <Button block type='submit' label='Save' color='yale_blue' />
              </div>
            </div>
          </form>
        </div>
      </div>
    );

    return showEdit ? html : null;
  };

  const columns = [
    {
      name: 'Nomor SC',
      selector: (row) => row.nomor_sc,
      cell: (row) => <p>{row.nomor_sc ? row.nomor_sc : '-'}</p>,
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
      name: 'Regional',
      selector: (row) => row.regional,
      cell: (row) => <p>{row.regional ? row.regional : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Witel',
      selector: (row) => row.witel,
      cell: (row) => <p>{row.witel ? row.witel : '-'}</p>,
      grow: 1.5,
      sortable: true,
    },
    {
      name: 'Status Aktivasi',
      selector: (row) => row.status_aktivasi,
      cell: (row) => <p>{row.status_aktivasi ? row.status_aktivasi : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Status WFM',
      selector: (row) => row.status_wfm,
      cell: (row) => <p>{row.status_wfm ? row.status_wfm : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Tgl Aktivasi',
      selector: (row) => row.tanggal_aktivasi,
      cell: (row) => <p>{row.tanggal_aktivasi ? row.tanggal_aktivasi : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Tgl BAA',
      selector: (row) => row.tanggal_baa,
      cell: (row) => <p>{row.tanggal_baa ? row.tanggal_baa : '-'}</p>,
      sortable: true,
    },
    {
      name: 'Status Resume',
      selector: (row) => row.status_resume,
      cell: (row) => <p>{row.status_resume ? row.status_resume : '-'}</p>,
      grow: 1.5,
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
          <Button
            variant='icon-only'
            icon='edit'
            color='yale_blue'
            size='xs'
            onClick={() => handleEditButtonClick(row)}
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
      {showModalEdit()}
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

export default UserNetmonkHI;

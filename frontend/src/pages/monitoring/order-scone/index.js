import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BasicIcon } from '@netmonk/design.icons.basic';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { Dropdown } from '@netmonk/design.ui.dropdown';
import { TableSearch } from '@netmonk/design.ui.table-search';

export const MonitoringOrderScone = () => {
  const ref = useRef();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState({
    nomor_sc: '',
    nama_pelanggan: '',
    nohp_pelanggan: '',
    email_pelanggan: '',
    nomor_internet: '',
    regional: '',
    witel: '',
    status_aktivasi: '',
    status_wfm: '',
    tanggal_order: '',
    status_resume: '',
    username: '',
    password: '',
    secret_key: '',
    catatan: '',
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [regionalValue, setRegionalValue] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [statusResumeValue, setStatusResumeValue] = useState();
  const [selectedRegionalFilter, setSelectedRegionalFilter] = useState();
  const [selectedStatusAktivasiFilter, setSelectedStatusAktivasiFilter] =
    useState();
  const [selectedStatusResumeFilter, setSelectedStatusResumeFilter] =
    useState();
  const [selectedStatusWFMFilter, setSelectedStatusWFMFilter] = useState();
  const [selectedWitelFilter, setSelectedWitelFilter] = useState();
  const [regionalType, setRegionalType] = useState();
  const [witelOptions, setWitelOptions] = useState([]);

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

    const dataURL = `${process.env.REACT_APP_API_BASE_URL}/newscone/onprogress/dev?page=${page}&per_page=${limit}&search_query=${searchValue}&regional=${selectedRegionalFilter}&witel=${selectedWitelFilter}&status_aktivasi=${selectedStatusAktivasiFilter}&status_wfm=${selectedStatusWFMFilter}&status_resume=${selectedStatusResumeFilter}&order=order&by=by`;

    try {
      const response = await axios.get(dataURL);
      setData(response.data.result.data);
      setTotalData(response.data.result.total_data);

      const arrayWitelOptions = Array.from(
        new Set(response.data.result.data.map((item) => item.witel))
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
        nomor_internet: dataDetail.nomor_internet,
        regional: dataDetail.regional,
        witel: dataDetail.witel,
        status_aktivasi: dataDetail.status_aktivasi,
        status_wfm: dataDetail.status_wfm,
        tanggal_order: dataDetail.tanggal_order,
        status_resume: dataDetail.status_resume,
        username: dataDetail.username,
        password: dataDetail.password,
        secret_key: dataDetail.secret_key,
        catatan: dataDetail.catatan,
      });
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  };

  const onSubmitAdd = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/newscone/`,
        { parameter: items },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('Data berhasil disimpan:', response.data);

        setShowAdd(false);

        setTimeout(() => {
          window.location.reload();

          getData();
        }, 1500);
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  const onSubmitEdit = (e) => {
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

  const handleChangeSelectAdd = (e) => {
    setRegionalValue(e.label);
    setRegionalType(e.value);

    const body = { ...items, regional: e.value };
    setItems(body);
  };

  const handleChangeSelectEdit = (e) => {
    setStatusResumeValue(e.label);

    const body = { ...items, status_resume: e.value };
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
  }, [page, limit]);

  useEffect(() => {
    if (items.status_resume) {
      setStatusResumeValue(
        items.status_resume === 'OSS - PROVISIONING START'
          ? 'OSS - PROVISIONING START'
          : items.status_resume === 'MYCX - SEND OPEN PAPERLESS'
          ? 'MYCX - SEND OPEN PAPERLESS'
          : items.status_resume === 'OSS - TESTING SERVICE'
          ? 'OSS - TESTING SERVICE'
          : items.status_resume === 'OSS - PROVISIONING DESAIN'
          ? 'OSS - PROVISIONING DESAIN'
          : items.status_resume === '7 | OSS - PROVISIONING ISSUED'
          ? '7 | OSS - PROVISIONING ISSUED'
          : items.status_resume === '10 | OSS - PROVISIONING COMPLETE'
          ? '10 | OSS - PROVISIONING COMPLETE'
          : items.status_resume === 'OSS - FALLOUT'
          ? 'OSS - FALLOUT'
          : 'MYCX - FAIL'
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
        if (a.tanggal_order > b.tanggal_order) {
          return -1;
        }
        if (a.tanggal_order < b.tanggal_order) {
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
      'Nomor SC,Nama Pelanggan,No HP Pelanggan,Email Pelanggan,Nomor Internet,Regional,Witel,Status Aktivasi,Status WFM,Tanggal Order,Status Resume,Catatan\n';

    filteredData.forEach((row) => {
      csvData += `${row.nomor_sc || '-'},${row.nama_pelanggan || '-'},${
        row.nohp_pelanggan || '-'
      },${row.email_pelanggan || '-'},${row.nomor_internet || '-'},${
        row.regional || '-'
      },${row.witel || '-'},${row.status_aktivasi || '-'},${
        row.status_wfm || '-'
      },${row.tanggal_order || '-'},${row.status_resume || '-'},${
        row.catatan || '-'
      }\n`;
    });

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = window.URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = csvUrl;
    a.download = `monitoring-scone-v2.csv`;
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

      <div className='flex flex-row gap-2'>
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
        <div className='button-wrapper'>
          <Button
            type='button'
            variant='icon-only'
            size='sm'
            color='yale_blue'
            icon='add'
            onClick={() => setShowAdd(true)}
          />
        </div>
      </div>
    </div>
  );

  const showModalAdd = () => {
    const resetForm = () => {
      setItems({
        nomor_sc: '',
        nama_pelanggan: '',
        nohp_pelanggan: '',
        email_pelanggan: '',
        nomor_internet: '',
        regional: '',
        witel: '',
        tanggal_order: '',
      });

      setRegionalValue();
      setRegionalType();
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
                setShowAdd(false);
                resetForm();
              }}
              className='focus:outline-none mr-4 mt-3 mb-1'
            >
              <BasicIcon name='close' color='gunmetal' size={14} />
            </button>
          </div>

          <form className='modal-default' onSubmit={onSubmitAdd}>
            <div className='mb-4'>
              <h2 className='modal-header-title'>Add New Order SCONE</h2>
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
                    onChange={onChange}
                    defaultValue={items.nomor_sc}
                    placeholder='Enter nomor sc'
                    className='form-input block w-full border-gunmetal-40'
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
                    onChange={onChange}
                    defaultValue={items.nama_pelanggan || ''}
                    placeholder='Enter nama pelanggan...'
                    className='form-input block w-full border-gunmetal-40'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='nohp_pelanggan'
                  className='form-label block mb-2'
                >
                  Nomor HP Pelanggan
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    required
                    id='nohp_pelanggan'
                    name='nohp_pelanggan'
                    onChange={onChange}
                    defaultValue={items.nohp_pelanggan || ''}
                    placeholder='Enter nomor hp pelanggan'
                    className='form-input block w-full border-gunmetal-40'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='email_pelanggan'
                  className='form-label block mb-2'
                >
                  Email Pelanggan
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    required
                    id='email_pelanggan'
                    name='email_pelanggan'
                    onChange={onChange}
                    defaultValue={items.email_pelanggan || ''}
                    placeholder='Enter email pelanggan...'
                    className='form-input block w-full border-gunmetal-40'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='nomor_internet'
                  className='form-label block mb-2'
                >
                  Nomor Internet
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    required
                    id='nomor_internet'
                    name='nomor_internet'
                    onChange={onChange}
                    defaultValue={items.nomor_internet || ''}
                    placeholder='Enter nomor internet'
                    className='form-input block w-full border-gunmetal-40'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label htmlFor='regional' className='form-label block mb-2'>
                  Regional
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    id='regional'
                    name='regional'
                    type='hidden'
                    defaultValue={regionalType}
                  />
                  <Dropdown
                    block
                    size='sm'
                    items={regionalOptions}
                    onChange={handleChangeSelectAdd}
                    label={regionalType ? regionalValue : 'Select regional'}
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label htmlFor='witel' className='form-label block mb-2'>
                  Witel
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    required
                    id='witel'
                    name='witel'
                    onChange={onChange}
                    defaultValue={items.witel || ''}
                    placeholder='Enter witel...'
                    className='form-input block w-full border-gunmetal-40'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='tanggal_order'
                  className='form-label block mb-2'
                >
                  Tanggal Order
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    ref={ref}
                    type='text'
                    onFocus={() => (ref.current.type = 'datetime-local')}
                    onBlur={() => (ref.current.type = 'text')}
                    id='tanggal_order'
                    name='tanggal_order'
                    onChange={onChange}
                    defaultValue={items.tanggal_order || ''}
                    placeholder='Select tanggal order'
                    className='form-input block w-full border-gunmetal-40'
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
                    setShowAdd(false);
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

    return showAdd ? html : null;
  };

  const showModalDetail = () => {
    const resetForm = () => {
      setItems({
        nomor_sc: '',
        nama_pelanggan: '',
        nohp_pelanggan: '',
        email_pelanggan: '',
        username: '',
        password: '',
        catatan: '',
      });
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
              <h2 className='modal-header-title'>View Order SCONE</h2>
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
                    Nama Pelanggan
                  </label>
                  <div className='px-3 py-4'>
                    <span className='text-gunmetal-90'>
                      {items.nama_pelanggan || '-'}
                    </span>
                    <button
                      onClick={() => copyToClipboard(items?.nama_pelanggan)}
                    >
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
                    Nomor HP Pelanggan
                  </label>
                  <div className='px-3 py-4'>
                    <span className='text-gunmetal-90'>
                      {items.nohp_pelanggan || '-'}
                    </span>
                    <button
                      onClick={() => copyToClipboard(items?.nohp_pelanggan)}
                    >
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
                    Email Pelanggan
                  </label>
                  <div className='px-3 py-4'>
                    <span className='text-gunmetal-90'>
                      {items.email_pelanggan || '-'}
                    </span>
                    <button
                      onClick={() => copyToClipboard(items?.email_pelanggan)}
                    >
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
                <div className='grid grid-cols-2 items-stretch border-gunmetal-30'>
                  <label className='form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false'>
                    Catatan
                  </label>
                  <div className='px-3 py-4'>
                    <span className='text-gunmetal-90'>
                      {items.catatan || '-'}
                    </span>
                    <button onClick={() => copyToClipboard(items?.catatan)}>
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
        status_resume: '',
        nohp_pelanggan: '',
        email_pelanggan: '',
        nomor_internet: '',
        catatan: '',
      });

      setStatusResumeValue();
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

          <form className='modal-default' onSubmit={onSubmitEdit}>
            <div className='mb-4'>
              <h2 className='modal-header-title'>Update Order SCONE</h2>
            </div>

            <div className='modal-content-bordered p-4'>
              <div className='grid grid-cols-1'>
                <label htmlFor='nomor_sc' className='form-label block mb-2'>
                  Nomor SC
                  <span className='text-french_blue-100'>*</span>
                </label>
                <div className='form-group'>
                  <input
                    disabled={items.nomor_sc ? true : false}
                    id='nomor_sc'
                    name='nomor_sc'
                    onChange={onChange}
                    defaultValue={items.nomor_sc}
                    placeholder='Enter nomor sc'
                    className='form-input block w-full border-gunmetal-40'
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
                    id='nama_pelanggan'
                    name='nama_pelanggan'
                    onChange={onChange}
                    defaultValue={items.nama_pelanggan}
                    placeholder='Enter nama pelanggan...'
                    className='form-input block w-full border-gunmetal-40'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='status_resume'
                  className='form-label block mb-2'
                >
                  Status Resume
                </label>
                <div className='form-group'>
                  <input
                    id='status_resume'
                    name='status_resume'
                    type='hidden'
                    defaultValue={items.status_resume}
                  />
                  <Dropdown
                    block
                    size='sm'
                    items={statusResume}
                    onChange={handleChangeSelectEdit}
                    label={
                      items.status_resume
                        ? statusResumeValue
                        : 'Select status resume'
                    }
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='nohp_pelanggan'
                  className='form-label block mb-2'
                >
                  Nomor HP Pelanggan
                </label>
                <div className='form-group'>
                  <input
                    id='nohp_pelanggan'
                    name='nohp_pelanggan'
                    onChange={onChange}
                    defaultValue={items.nohp_pelanggan || ''}
                    placeholder='Enter nomor HP pelanggan'
                    className='form-input block w-full border-gunmetal-40'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='email_pelanggan'
                  className='form-label block mb-2'
                >
                  Email Pelanggan
                </label>
                <div className='form-group'>
                  <input
                    id='email_pelanggan'
                    name='email_pelanggan'
                    onChange={onChange}
                    defaultValue={items.email_pelanggan || ''}
                    placeholder='Enter email pelanggan..'
                    className='form-input block w-full border-gunmetal-40'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <label
                  htmlFor='nomor_internet'
                  className='form-label block mb-2'
                >
                  Nomor Internet
                </label>
                <div className='form-group'>
                  <input
                    id='nomor_internet'
                    name='nomor_internet'
                    onChange={onChange}
                    defaultValue={items.nomor_internet || ''}
                    placeholder='Enter nomor internet'
                    className='form-input block w-full border-gunmetal-40'
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
      name: 'Nomor Internet',
      selector: (row) => row.nomor_internet,
      cell: (row) => <p>{row.nomor_internet ? row.nomor_internet : '-'}</p>,
      grow: 1.25,
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
      grow: 1.25,
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
      name: 'Tanggal Order',
      selector: (row) => row.tanggal_order,
      cell: (row) => <p>{row.tanggal_order ? row.tanggal_order : '-'}</p>,
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
      {showModalAdd()}
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
              paginationServer
              currentPage={page}
              paginationPerPage={limit}
              paginationTotalRows={totalData}
              onChangePage={setPage}
              onChangeRowsPerPage={setLimit}
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

export default MonitoringOrderScone;

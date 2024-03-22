import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BasicIcon } from '@netmonk/design.icons.basic';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { Dropdown } from '@netmonk/design.ui.dropdown';
import { TableSearch } from '@netmonk/design.ui.table-search';
import { Modal } from '../../../components/partials/modal/index';
import {
  useGetOrdersSconeQuery,
  useGetOrderSconeByIdQuery,
  useAddOrderSconeMutation,
  useUpdateOrderSconeMutation
} from '../../../apps/features/orders/orderSconeApiSlice';
import {
  statusAktivasiOptions,
  statusResumeOptions,
  statusWFMOptions,
  tregOptions,
  witelOptions,
  witelOptionsMap
} from '../../../utils/filterOptions';

export function OrderScone() {
  const [resetKey, setResetKey] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [selectedNomorSc, setSelectedNomorSc] = useState(null);
  const [selectedStatusAktivasiFilter, setSelectedStatusAktivasiFilter] = useState();
  const [selectedStatusWFMFilter, setSelectedStatusWFMFilter] = useState();
  const [selectedStatusResumeFilter, setSelectedStatusResumeFilter] = useState();
  const [selectedTregFilter, setSelectedTregFilter] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const { data: orders, isLoading } = useGetOrdersSconeQuery();
  const { refetch } = useGetOrdersSconeQuery();
  const { data: orderDetail } = useGetOrderSconeByIdQuery(selectedNomorSc, {
    skip: !selectedNomorSc
  });

  const [addOrderScone] = useAddOrderSconeMutation();
  const [updateOrderScone] = useUpdateOrderSconeMutation();

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

  const resetFilters = () => {
    setResetKey((prevKey) => prevKey + 1);
    setSearchValue('');
    setSelectedStatusAktivasiFilter();
    setSelectedStatusResumeFilter();
    setSelectedStatusWFMFilter();
    setSelectedTregFilter();
  };

  const subHeaderComponent = () => (
    <div className="tbctions-before-wrapper flex flex-row justify-between mb-3">
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
            key={resetKey}
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
            key={resetKey}
            size="sm"
            label="Status Aktivasi"
            items={statusAktivasiOptions}
            onChange={(selectedOption) => {
              setSelectedStatusAktivasiFilter(selectedOption.value);
            }}
          />
        </div>
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            key={resetKey}
            size="sm"
            label="Status Resume"
            items={statusResumeOptions}
            onChange={(selectedOption) => {
              setSelectedStatusResumeFilter(selectedOption.value);
            }}
          />
        </div>
        <div className="dropdown-filter-wrapper z-10">
          <Dropdown
            key={resetKey}
            size="sm"
            label="Status WFM"
            items={statusWFMOptions}
            onChange={(selectedOption) => {
              setSelectedStatusWFMFilter(selectedOption.value);
            }}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2">
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
        <div className="button-wrapper">
          <Button
            type="button"
            variant="icon-only"
            size="sm"
            color="yale_blue"
            icon="add"
            onClick={() => setShowAdd(true)}
          />
        </div>
      </div>
    </div>
  );

  const handleDetailButtonClick = (nomorSc) => {
    setSelectedNomorSc(nomorSc);
    setShowDetail(true);
  };

  const handleUpdateButtonClick = (nomorSc) => {
    setSelectedNomorSc(nomorSc);
    setShowUpdate(true);
  };

  const showModalAdd = () => {
    const [inputType, setInputType] = useState('text');
    const [tregValue, setTregValue] = useState();
    const [witelValue, setWitelValue] = useState();
    const [tanggalOrderValue, setTanggalOrderValue] = useState();

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
      setValue,
      watch
    } = useForm({
      defaultValues: {
        nomorSc: '',
        namaPelanggan: '',
        nomorHpPelanggan: '',
        emailPelanggan: '',
        nomorInternet: '',
        treg: '',
        witel: '',
        tanggalOrder: ''
      }
    });

    const selectedTreg = watch('treg');

    useEffect(() => {
      if (selectedTreg && witelOptionsMap[selectedTreg]) {
        const firstWitelOption = witelOptionsMap[selectedTreg][0].value;
        setValue('witel', firstWitelOption);
        setWitelValue(firstWitelOption);
      }
    }, [selectedTreg, setValue]);

    const handleClose = () => {
      reset();
      setInputType('text');
      setTregValue(undefined);
      setWitelValue(undefined);
      setTanggalOrderValue(undefined);
      setShowAdd(false);
    };

    const getWitelOptions = () => {
      if (selectedTreg && witelOptionsMap[selectedTreg]) {
        return witelOptionsMap[selectedTreg];
      }
      return witelOptions;
    };

    const onSubmitAdd = async (data) => {
      try {
        await addOrderScone(data).unwrap();
        console.log('Order Scone added successfully');
        handleClose();
      } catch (error) {
        console.error('Failed to add order Scone', error);
      }
    };

    return (
      <Modal
        type="add"
        title="Add New Order Scone"
        show={showAdd}
        onClose={handleClose}
        onAction={handleSubmit(onSubmitAdd)}>
        <div
          className="modal-content modal-content-bordered p-5 flex flex-col w-full"
          style={{ maxHeight: '75vh' }}>
          <div className="grid grid-cols-1">
            <label htmlFor="nomorSc" className="form-label block mb-2">
              Nomor SC
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <Controller
                name="nomorSc"
                control={control}
                rules={{ required: 'Nomor SC is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.nomorSc ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter nomor SC"
                  />
                )}
              />
              {errors.nomorSc && (
                <p className="mt-1 text-sm text-red-500">{errors.nomorSc.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="namaPelanggan" className="form-label block mb-2">
              Nama Pelanggan
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <Controller
                name="namaPelanggan"
                control={control}
                rules={{ required: 'Nama Pelanggan is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.namaPelanggan ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter nama pelanggan"
                  />
                )}
              />
              {errors.namaPelanggan && (
                <p className="mt-1 text-sm text-red-500">{errors.namaPelanggan.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="nomorHpPelanggan" className="form-label block mb-2">
              Nomor HP Pelanggan
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <Controller
                name="nomorHpPelanggan"
                control={control}
                rules={{ required: 'Nomor HP Pelanggan is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.nomorHpPelanggan ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter nomor HP pelanggan"
                  />
                )}
              />
              {errors.nomorHpPelanggan && (
                <p className="mt-1 text-sm text-red-500">{errors.nomorHpPelanggan.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="emailPelanggan" className="form-label block mb-2">
              Email Pelanggan
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <Controller
                name="emailPelanggan"
                control={control}
                rules={{ required: 'Email Pelanggan is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.emailPelanggan ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter email pelanggan"
                  />
                )}
              />
              {errors.emailPelanggan && (
                <p className="mt-1 text-sm text-red-500">{errors.emailPelanggan.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="nomorInternet" className="form-label block mb-2">
              Nomor Internet
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <Controller
                name="nomorInternet"
                control={control}
                rules={{ required: 'Nomor Internet is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.nomorInternet ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter nomor internet pelanggan"
                  />
                )}
              />
              {errors.nomorInternet && (
                <p className="mt-1 text-sm text-red-500">{errors.nomorInternet.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="treg" className="form-label block mb-2">
              Treg
              <span className="text-french_blue-100">*</span>
            </label>
            <Controller
              name="treg"
              control={control}
              rules={{ required: 'Treg is required' }}
              render={({ field }) => (
                <Dropdown
                  block
                  size="sm"
                  label={
                    tregValue
                      ? tregOptions.find((option) => option.value === tregValue)?.label
                      : 'Select Treg'
                  }
                  items={tregOptions}
                  onChange={(selectedOption) => {
                    setValue('treg', selectedOption.value);
                    setTregValue(selectedOption.value);
                  }}
                />
              )}
            />
            {errors.treg && <p className="mt-1 text-sm text-red-500">{errors.treg.message}</p>}
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="witel" className="form-label block mb-2">
              Witel
              <span className="text-french_blue-100">*</span>
            </label>
            <Controller
              name="witel"
              control={control}
              rules={{ required: 'Witel is required' }}
              render={({ field }) => (
                <Dropdown
                  block
                  size="sm"
                  label={
                    witelValue
                      ? getWitelOptions().find((option) => option.value === witelValue)?.label
                      : 'Select Witel'
                  }
                  items={getWitelOptions()}
                  onChange={(selectedOption) => {
                    setValue('witel', selectedOption.value);
                    setWitelValue(selectedOption.value);
                  }}
                />
              )}
            />
            {errors.witel && <p className="mt-1 text-sm text-red-500">{errors.witel.message}</p>}
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="tanggalOrder" className="form-label block mb-2">
              Tanggal Order
              <span className="text-french_blue-100">*</span>
            </label>
            <Controller
              name="tanggalOrder"
              control={control}
              rules={{ required: 'Tanggal order is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type={inputType}
                  onFocus={() => setInputType('datetime-local')}
                  onBlur={() => setInputType('text')}
                  className={`form-input ${errors.tanggalOrder ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                  placeholder="Select tanggal order"
                />
              )}
            />
            {errors.tanggalOrder && (
              <p className="mt-1 text-sm text-red-500">{errors.tanggalOrder.message}</p>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  const showModalDetail = () => {
    const handleClose = () => {
      setShowDetail(false);
    };

    return (
      <Modal type="detail" title="View Employee Details" show={showDetail} onClose={handleClose}>
        <div
          className="modal-content modal-content-bordered p-5 flex flex-row w-full justify-between"
          style={{ maxHeight: '75vh' }}>
          <div className="flex flex-col h-full w-full border border-gunmetal-30 rounded">
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Nomor SC
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{orderDetail?.nomorSc || '-'}</span>
                <button type="button" onClick={() => copyToClipboard(orderDetail?.nomorSc)}>
                  <BasicIcon
                    size={16}
                    color="yale_blue"
                    name="link-outline"
                    className="ml-1 hover:text-main-yale_blue-60"
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Nama Pelanggan
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{orderDetail?.namaPelanggan || '-'}</span>
                <button type="button" onClick={() => copyToClipboard(orderDetail?.namaPelanggan)}>
                  <BasicIcon
                    size={16}
                    color="yale_blue"
                    name="link-outline"
                    className="ml-1 hover:text-main-yale_blue-60"
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Nomor HP Pelanggan
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{orderDetail?.nomorHpPelanggan || '-'}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderDetail?.nomorHpPelanggan)}>
                  <BasicIcon
                    size={16}
                    color="yale_blue"
                    name="link-outline"
                    className="ml-1 hover:text-main-yale_blue-60"
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Email Pelanggan
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{orderDetail?.emailPelanggan || '-'}</span>
                <button type="button" onClick={() => copyToClipboard(orderDetail?.emailPelanggan)}>
                  <BasicIcon
                    size={16}
                    color="yale_blue"
                    name="link-outline"
                    className="ml-1 hover:text-main-yale_blue-60"
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Username
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{orderDetail?.username || '-'}</span>
                <button type="button" onClick={() => copyToClipboard(orderDetail?.username)}>
                  <BasicIcon
                    size={16}
                    color="yale_blue"
                    name="link-outline"
                    className="ml-1 hover:text-main-yale_blue-60"
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Password
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{orderDetail?.password || '-'}</span>
                <button type="button" onClick={() => copyToClipboard(orderDetail?.password)}>
                  <BasicIcon
                    size={16}
                    color="yale_blue"
                    name="link-outline"
                    className="ml-1 hover:text-main-yale_blue-60"
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Secret Key
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{orderDetail?.secretKey || '-'}</span>
                <button type="button" onClick={() => copyToClipboard(orderDetail?.secretKey)}>
                  <BasicIcon
                    size={16}
                    color="yale_blue"
                    name="link-outline"
                    className="ml-1 hover:text-main-yale_blue-60"
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Catatan
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{orderDetail?.catatan || '-'}</span>
                <button type="button" onClick={() => copyToClipboard(orderDetail?.catatan)}>
                  <BasicIcon
                    size={16}
                    color="yale_blue"
                    name="link-outline"
                    className="ml-1 hover:text-main-yale_blue-60"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const showModalUpdate = () => {
    const {
      control,
      handleSubmit,
      reset,
      setValue,
      formState: { errors }
    } = useForm({
      defaultValues: {
        namaPelanggan: '',
        statusResume: '',
        nomorHpPelanggan: '',
        emailPelanggan: '',
        nomorInternet: '',
        statusAktivasi: '',
        statusWFM: '',
        username: '',
        password: '',
        secretKey: '',
        catatan: ''
      }
    });

    useEffect(() => {
      if (orderDetail && showUpdate) {
        Object.keys(orderDetail).forEach((key) => {
          setValue(key, orderDetail[key] ?? '');
        });
      }
    }, [orderDetail, showUpdate, setValue]);

    const handleClose = () => {
      reset();
      setShowUpdate(false);
    };

    const onSubmitUpdate = async (data) => {
      try {
        await updateOrderScone({ id: selectedNomorSc, ...data }).unwrap();
        console.log('Order Scone updated successfully');
        handleClose();
        refetch();
      } catch (error) {
        console.error('Failed to update order Scone', error);
      }
    };

    return (
      <Modal
        type="update"
        title="Update Order Scone"
        show={showUpdate}
        onClose={handleClose}
        onAction={handleSubmit(onSubmitUpdate)}>
        <div
          className="modal-content modal-content-bordered p-5 flex flex-col w-full"
          style={{ maxHeight: '75vh' }}>
          <div className="grid grid-cols-1">
            <label htmlFor="nomorSc" className="form-label block mb-2">
              Nomor SC
            </label>
            <div className="form-group">
              <input
                disabled
                defaultValue={orderDetail?.nomorSc}
                className="form-input block w-full border-gunmetal-40"
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="namaPelanggan" className="form-label block mb-2">
              Nama Pelanggan
            </label>
            <div className="form-group">
              <Controller
                name="namaPelanggan"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.namaPelanggan ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter nama pelanggan"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="statusResume" className="form-label block mb-2">
              Status Resume
            </label>
            <div className="form-group">
              <Controller
                name="statusResume"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    block
                    size="sm"
                    label={
                      field.value
                        ? statusResumeOptions.find((option) => option.value === field.value)?.label
                        : 'Select Status Resume'
                    }
                    items={statusResumeOptions}
                    onChange={(selectedOption) => {
                      setValue('statusResume', selectedOption.value);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="nomorHpPelanggan" className="form-label block mb-2">
              Nomor HP Pelanggan
            </label>
            <div className="form-group">
              <Controller
                name="nomorHpPelanggan"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.nomorHpPelanggan ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter nomor HP pelanggan"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="emailPelanggan" className="form-label block mb-2">
              Email Pelanggan
            </label>
            <div className="form-group">
              <Controller
                name="emailPelanggan"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.emailPelanggan ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter email pelanggan"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="nomorInternet" className="form-label block mb-2">
              Nomor Internet
            </label>
            <div className="form-group">
              <Controller
                name="nomorInternet"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.nomorInternet ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter nomor internet"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="statusAktivasi" className="form-label block mb-2">
              Status Aktivasi
            </label>
            <div className="form-group">
              <Controller
                name="statusAktivasi"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    block
                    size="sm"
                    label={
                      field.value
                        ? statusAktivasiOptions.find((option) => option.value === field.value)
                            ?.label
                        : 'Select Status Aktivasi'
                    }
                    items={statusAktivasiOptions}
                    onChange={(selectedOption) => {
                      setValue('statusAktivasi', selectedOption.value);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="statusWFM" className="form-label block mb-2">
              Status WFM
            </label>
            <div className="form-group">
              <Controller
                name="statusWFM"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    block
                    size="sm"
                    label={
                      field.value
                        ? statusWFMOptions.find((option) => option.value === field.value)?.label
                        : 'Select Status WFM'
                    }
                    items={statusWFMOptions}
                    onChange={(selectedOption) => {
                      setValue('statusWFM', selectedOption.value);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="username" className="form-label block mb-2">
              Username
            </label>
            <div className="form-group">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.username ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter username"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="password" className="form-label block mb-2">
              Password
            </label>
            <div className="form-group">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.password ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter password"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="secretKey" className="form-label block mb-2">
              Secret Key
            </label>
            <div className="form-group">
              <Controller
                name="secretKey"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.secretKey ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter secret key"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="catatan" className="form-label block mb-2">
              Catatan
            </label>
            <div className="form-group">
              <Controller
                name="catatan"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-input ${errors.catatan ? 'border-red-500' : 'border-gunmetal-40'} block w-full`}
                    placeholder="Enter catatan"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  };

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
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button
            variant="icon-only"
            icon="eye"
            color="yale_blue"
            size="xs"
            onClick={() => handleDetailButtonClick(row.nomorSc)}
          />
          <Button
            variant="icon-only"
            icon="edit"
            color="yale_blue"
            size="xs"
            onClick={() => handleUpdateButtonClick(row.nomorSc)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      center: true,
      width: '115px'
    }
  ];

  return (
    <div>
      {showModalAdd()}
      {showModalDetail()}
      {showModalUpdate()}
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
    </div>
  );
}

export default OrderScone;

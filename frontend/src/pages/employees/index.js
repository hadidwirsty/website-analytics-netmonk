import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { TableSearch } from '@netmonk/design.ui.table-search';
import { Modal } from '../../components/partials/modal/index';
import { ModalDeleteConfirmationComponent } from '../../components/partials/modal/delete-confirmation';
import {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} from '../../apps/features/employees/employeesApiSlice';

export function EmployeesList() {
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const { data: employees, isLoading } = useGetEmployeesQuery();
  const { refetch } = useGetEmployeesQuery();
  const { data: employeeDetail } = useGetEmployeeByIdQuery(selectedId, {
    skip: !selectedId
  });

  const [addEmployee] = useAddEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const filteredData =
    employees?.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    ) || [];

  const subHeaderComponent = () => (
    <div className="table-actions-before-wrapper flex flex-row justify-between mb-3">
      <div className="flex flex-row gap-2">
        <div className="button-wrapper">
          <Button
            type="button"
            color="default"
            variant="icon-only"
            icon="refresh"
            onClick={() => setSearchValue('')}
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

      <div className="flex flex-row">
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

  const handleDeleteButtonClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        const deleted = await deleteEmployee(employeeToDelete).unwrap();
        console.log('Employee deleted successfully', deleted);
        setEmployeeToDelete(null);
        refetch();
      } catch (error) {
        console.error('Failed to delete employee', error);
      } finally {
        setShowDelete(false);
      }
    }
  };

  const handleDetailButtonClick = (_id) => {
    setSelectedId(_id);
    setShowDetail(true);
  };

  const handleUpdateButtonClick = (_id) => {
    setSelectedId(_id);
    setShowUpdate(true);
  };

  const showModalAdd = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm();

    const handleClose = () => {
      reset();
      setShowAdd(false);
    };

    const onSubmitAdd = async (data) => {
      try {
        await addEmployee(data).unwrap();
        console.log('Employee added successfully');
        handleClose();
      } catch (error) {
        console.error('Failed to add employee', error);
      }
    };

    return (
      <Modal
        type="add"
        title="Add New Employee"
        show={showAdd}
        onClose={handleClose}
        onAction={handleSubmit(onSubmitAdd)}>
        <div
          className="modal-content modal-content-bordered p-5 flex flex-col w-full"
          style={{ maxHeight: '60vh' }}>
          <div className="grid grid-cols-1">
            <label htmlFor="firstname" className="form-label block mb-2">
              Firstname
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <input
                {...register('firstname', { required: 'Firstname is required' })}
                className="form-input block w-full border-gunmetal-40"
                placeholder="Enter firstname"
              />
              {errors.firstname && (
                <p className="mt-1 text-sm text-fire_opal-100">{errors.firstname.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="lastname" className="form-label block mb-2">
              Lastname
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <input
                {...register('lastname', { required: 'Lastname is required' })}
                className="form-input block w-full border-gunmetal-40"
                placeholder="Enter lastname"
              />
              {errors.lastname && (
                <p className="mt-1 text-sm text-fire_opal-100">{errors.lastname.message}</p>
              )}
            </div>
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
          style={{ maxHeight: '60vh' }}>
          <div className="flex flex-col h-full w-full border border-gunmetal-30 rounded">
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                ID
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{employeeDetail?._id || '-'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Firstname
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{employeeDetail?.firstname || '-'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Lastname
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{employeeDetail?.lastname || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const showModalUpdate = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue
    } = useForm({
      defaultValues: {
        firstname: '',
        lastname: ''
      }
    });

    const handleClose = () => {
      reset();
      setShowUpdate(false);
    };

    useEffect(() => {
      if (employeeDetail) {
        setValue('firstname', employeeDetail.firstname);
        setValue('lastname', employeeDetail.lastname);
      }
    }, [employeeDetail, setValue, showUpdate]);

    const onSubmitUpdate = async (data) => {
      try {
        await updateEmployee({ id: selectedId, ...data }).unwrap();
        console.log('Employee updated successfully');
        handleClose();
        refetch();
      } catch (error) {
        console.error('Failed to update employee', error);
      }
    };

    return (
      <Modal
        type="update"
        title="Update Employee"
        show={showUpdate}
        onClose={handleClose}
        onAction={handleSubmit(onSubmitUpdate)}>
        <div
          className="modal-content modal-content-bordered p-5 flex flex-col w-full"
          style={{ maxHeight: '60vh' }}>
          <div className="grid grid-cols-1">
            <label htmlFor="_id" className="form-label block mb-2">
              ID
            </label>
            <div className="form-group">
              <input
                disabled
                defaultValue={employeeDetail?._id}
                className="form-input block w-full border-gunmetal-40"
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="firstname" className="form-label block mb-2">
              Firstname
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <input
                {...register('firstname', { required: 'Firstname is required' })}
                className="form-input block w-full border-gunmetal-40"
                placeholder="Enter firstname"
              />
              {errors.firstname && (
                <p className="mt-1 text-sm text-fire_opal-100">{errors.firstname.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="lastname" className="form-label block mb-2">
              Lastname
              <span className="text-french_blue-100">*</span>
            </label>
            <div className="form-group">
              <input
                {...register('lastname', { required: 'Lastname is required' })}
                className="form-input block w-full border-gunmetal-40"
                placeholder="Enter lastname"
              />
              {errors.lastname && (
                <p className="mt-1 text-sm text-fire_opal-100">{errors.lastname.message}</p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row._id,
      cell: (row) => <p>{row._id ? row._id : '-'}</p>,
      sortable: true
    },
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
            onClick={() => handleDetailButtonClick(row._id)}
          />
          <Button
            variant="icon-only"
            icon="edit"
            color="yale_blue"
            size="xs"
            onClick={() => handleUpdateButtonClick(row._id)}
          />
          <Button
            variant="icon-only"
            icon="delete"
            color="yale_blue"
            size="xs"
            onClick={() => handleDeleteButtonClick(row._id)}
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
      <ModalDeleteConfirmationComponent
        isOpen={showDelete}
        toggleModal={() => setShowDelete(false)}
        onConfirmDelete={confirmDelete}
        isLoading={isLoading}
      />
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

export default EmployeesList;

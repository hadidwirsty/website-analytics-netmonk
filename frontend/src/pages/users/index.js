import React, { useState } from 'react';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { TableSearch } from '@netmonk/design.ui.table-search';
import { Modal } from '../../components/partials/modal/index';
import { useGetUsersQuery, useGetUserByIdQuery } from '../../apps/features/users/usersApiSlice';

export function UsersList() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const { data: users, isLoading } = useGetUsersQuery();
  const { data: userDetail } = useGetUserByIdQuery(selectedId, {
    skip: !selectedId
  });

  const filteredData =
    users?.filter((row) =>
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
    </div>
  );

  const handleDetailButtonClick = (_id) => {
    setSelectedId(_id);
    setShowDetail(true);
  };

  const showModalDetail = () => {
    const handleClose = () => {
      setShowDetail(false);
    };

    return (
      <Modal type="detail" title="View User Details" show={showDetail} onClose={handleClose}>
        <div
          className="modal-content modal-content-bordered p-5 flex flex-row w-full justify-between"
          style={{ maxHeight: '75vh' }}>
          <div className="flex flex-col h-full w-full border border-gunmetal-30 rounded">
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                ID
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{userDetail?._id || '-'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Username
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{userDetail?.username || '-'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30 border-b">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Role
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{userDetail?.role || '-'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch border-gunmetal-30">
              <label className="form-label block bg-gunmetal-10 px-3 py-4 m-0 rounded-tl false">
                Team Name
              </label>
              <div className="px-3 py-4">
                <span className="text-gunmetal-90">{userDetail?.teamName || '-'}</span>
              </div>
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
      name: 'Username',
      selector: (row) => row.username,
      cell: (row) => <p>{row.username ? row.username : '-'}</p>,
      sortable: true
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      cell: (row) => <p>{row.role ? row.role : '-'}</p>,
      sortable: true
    },
    {
      name: 'Team Name',
      selector: (row) => row.teamName,
      cell: (row) => <p>{row.teamName ? row.teamName : '-'}</p>,
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
      {showModalDetail()}
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

export default UsersList;

import React, { useState } from 'react';
import { BasicIcon } from '@netmonk/design.icons.basic';
import { Button } from '@netmonk/design.ui.button';
import { DataTable } from '@netmonk/design.ui.data-table';
import { TableSearch } from '@netmonk/design.ui.table-search';
import { useGetUsersQuery } from '../../apps/features/user/usersApiSlice';
import Modal from '../../components/Modal';

export function UsersList() {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  const [searchValue, setSearchValue] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const handleDetailButtonClick = (data) => {
    setDetailData(data);
    setShowDetail(true);
  };

  const filteredData =
    users?.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    ) || [];

  const subHeaderComponent = () => (
    <TableSearch
      initialKeyword={searchValue}
      placeholder="Search"
      onReset={() => setSearchValue('')}
      onSearch={(keyword) => setSearchValue(keyword)}
    />
  );

  const columns = [
    {
      name: 'Username',
      selector: 'username',
      sortable: true
    },
    {
      name: 'Role',
      selector: 'role',
      sortable: true
    },
    {
      name: 'Team Name',
      selector: 'teamName',
      sortable: true
    },
    {
      name: 'Actions',
      button: true,
      cell: (row) => (
        <Button
          variant="icon-only"
          icon="eye"
          color="yale_blue"
          size="xs"
          onClick={() => handleDetailButtonClick(row)}
        />
      )
    }
  ];

  const showModalDetail = () => (
    <Modal show={showDetail} onClose={() => setShowDetail(false)}>
      <div>
        <h2>Detail Pengguna</h2>
        <div>Username: {detailData?.username}</div>
        <div>Role: {detailData?.role}</div>
        <div>Team Name: {detailData?.teamName}</div>
      </div>
    </Modal>
  );

  if (isError) {
    return <div>Failed to load users.</div>;
  }

  return (
    <div>
      {showModalDetail()}
      <DataTable
        columns={columns}
        data={filteredData}
        subHeader
        subHeaderComponent={subHeaderComponent}
        persistTableHead
        progressPending={isLoading}
      />
    </div>
  );
}

export default UsersList;

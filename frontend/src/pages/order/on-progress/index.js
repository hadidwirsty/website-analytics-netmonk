// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import { useNavigate } from 'react-router-dom';

// export const OrderOnProgress = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchOrderID, setSearchOrderID] = useState('');
//   const [selectedCustomer, setSelectedCustomer] = useState('');
//   const [customerOptions, setCustomerOptions] = useState([]);
//   const [selectedPICAM, setSelectedPICAM] = useState('');
//   const [picamOptions, setPICAMOptions] = useState([]);
//   const [selectedWitel, setSelectedWitel] = useState('');
//   const [witelOptions, setWitelOptions] = useState([]);

//   const navigate = useNavigate();
//   const username = localStorage.getItem('username');
//   let url;

//   if (username === 'treg1') {
//     url =
//       'https://app.netmonk.id/tech/api-web-analytics/orders/progress?order_closing_date=null&treg=REG-1';
//   } else if (username === 'treg2') {
//     url =
//       'https://app.netmonk.id/tech/api-web-analytics/orders/progress?order_closing_date=null&treg=REG-2';
//   } else if (username === 'treg3') {
//     url =
//       'https://app.netmonk.id/tech/api-web-analytics/orders/progress?order_closing_date=null&treg=REG-3';
//   } else if (username === 'treg4') {
//     url =
//       'https://app.netmonk.id/tech/api-web-analytics/orders/progress?order_closing_date=null&treg=REG-4';
//   } else if (username === 'treg5') {
//     url =
//       'https://app.netmonk.id/tech/api-web-analytics/orders/progress?order_closing_date=null&treg=REG-5';
//   } else if (username === 'treg6') {
//     url =
//       'https://app.netmonk.id/tech/api-web-analytics/orders/progress?order_closing_date=null&treg=REG-6';
//   } else if (username === 'treg7') {
//     url =
//       'https://app.netmonk.id/tech/api-web-analytics/orders/progress?order_closing_date=null&treg=REG-7';
//   } else {
//     url = '';
//   }

//   const customStyles = {
//     table: {
//       style: {},
//     },
//     rows: {
//       style: {},
//     },
//     headCells: {
//       style: {
//         fontWeight: 'bold',
//         color: '#64748B',
//       },
//     },
//     cells: {
//       style: {},
//     },
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       try {
//         const response = await axios.get(url);
//         setOrders(response.data.result);
//         setLoading(false);

//         const customerNames = Array.from(
//           new Set(response.data.result.map((item) => item.nama_customer))
//         );
//         setCustomerOptions(customerNames);

//         const picam = Array.from(
//           new Set(response.data.result.map((item) => item.pic_am))
//         );
//         setPICAMOptions(picam);

//         const witel = Array.from(
//           new Set(response.data.result.map((item) => item.witel))
//         );
//         setWitelOptions(witel);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const applyFilters = () => {
//     let filteredData = [...orders];

//     if (searchOrderID) {
//       filteredData = filteredData.filter((item) =>
//         item.order_id.toLowerCase().includes(searchOrderID.toLowerCase())
//       );
//     }

//     if (selectedCustomer) {
//       filteredData = filteredData.filter(
//         (item) => item.nama_customer === selectedCustomer
//       );
//     }

//     if (selectedPICAM) {
//       filteredData = filteredData.filter(
//         (item) => item.pic_am === selectedPICAM
//       );
//     }

//     if (selectedWitel) {
//       filteredData = filteredData.filter(
//         (item) => item.witel === selectedWitel
//       );
//     }

//     setFilteredData(filteredData);
//   };

//   useEffect(() => {
//     applyFilters();
//   }, [orders, searchOrderID, selectedCustomer, selectedPICAM, selectedWitel]);

//   const resetFilters = () => {
//     setSearchOrderID('');
//     setSelectedCustomer('');
//     setSelectedPICAM('');
//     setSelectedWitel('');
//   };

//   const subHeaderComponent = (
//     <div className='flex w-full justify-start mb-4 gap-5'>
//       <div>
//         <button
//           onClick={resetFilters}
//           className='block rounded border border-secondary-basic_grey_2 py-3 px-4 text-sm w-full text-gunmetal-40'
//         >
//           <FontAwesomeIcon icon={faRefresh} />
//         </button>
//       </div>
//       <div>
//         <input
//           type='text'
//           list='customerOptions'
//           value={selectedCustomer}
//           onChange={(e) => setSelectedCustomer(e.target.value)}
//           className='block rounded border border-secondary-basic_grey_2 py-3 px-5 text-sm w-full text-gunmetal-40 placeholder:text-gunmetal-40'
//           placeholder='Customer Name'
//         />
//         <datalist id='customerOptions'>
//           {customerOptions.sort().map((option) => (
//             <option key={option} value={option} />
//           ))}
//         </datalist>
//       </div>
//       <div>
//         <input
//           type='text'
//           list='picamOptions'
//           value={selectedPICAM}
//           onChange={(e) => setSelectedPICAM(e.target.value)}
//           className='block rounded border border-secondary-basic_grey_2 py-3 px-5 w-full text-sm text-gunmetal-40 placeholder:text-gunmetal-40'
//           placeholder='PIC/AM'
//         />
//         <datalist id='picamOptions'>
//           {picamOptions.sort().map((option) => (
//             <option key={option} value={option} />
//           ))}
//         </datalist>
//       </div>
//       <div>
//         <input
//           type='text'
//           list='witelOptions'
//           value={selectedWitel}
//           onChange={(e) => setSelectedWitel(e.target.value)}
//           className='block rounded border border-secondary-basic_grey_2 py-3 px-5 text-sm w-full text-gunmetal-40 placeholder:text-gunmetal-40'
//           placeholder='WITEL'
//         />
//         <datalist id='witelOptions'>
//           {witelOptions.sort().map((option) => (
//             <option key={option} value={option} />
//           ))}
//         </datalist>
//       </div>
//       <div>
//         <input
//           type='text'
//           placeholder='Search Order ID'
//           value={searchOrderID}
//           onChange={(e) => setSearchOrderID(e.target.value)}
//           className='block rounded border border-secondary-basic_grey_2 py-3 px-5 w-full text-sm text-gunmetal-40 placeholder:text-gunmetal-40'
//         />
//       </div>
//     </div>
//   );

//   const editRow = async (row) => {
//     try {
//       const response = await axios.get(
//         `https://app.netmonk.id/tech/api-web-analytics/orders/${row.id}`
//       );
//       const rowData = response.data.result;

//       navigate(`/order-on-progress/edit/${row.id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const columns = [
//     {
//       name: 'Actions',
//       selector: (row) => (
//         <div className='text-lg'>
//           <button
//             className='text-main-yale_blue hover:text-main-french_blue'
//             onClick={() => editRow(row)}
//           >
//             <FontAwesomeIcon icon={faEdit} />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       center: true,
//     },
//     {
//       name: 'Customer Name',
//       selector: (row) => row.nama_customer,
//       sortable: true,
//       wrap: true,
//       allowOverflow: true,
//       width: '350px',
//     },
//     {
//       name: 'Order ID',
//       selector: (row) => row.order_id,
//       sortable: true,
//       width: '150px',
//     },
//     {
//       name: 'Product',
//       selector: (row) => row.produk,
//       sortable: true,
//       width: '150px',
//     },
//     {
//       name: 'CRM Order Type',
//       selector: (row) => row.crm_order_type,
//       sortable: true,
//       width: '150px',
//     },
//     {
//       name: 'Agreement Name',
//       selector: (row) => row.agreement_name,
//       sortable: true,
//       width: '350px',
//     },
//     {
//       name: 'PIC/AM',
//       selector: (row) => row.pic_am,
//       sortable: true,
//       width: '350px',
//     },
//     {
//       name: 'Divisi',
//       selector: (row) => row.divisi,
//       sortable: true,
//       width: '100px',
//     },
//     {
//       name: 'WITEL',
//       selector: (row) => row.witel,
//       sortable: true,
//       width: '125px',
//     },
//     {
//       name: 'Order Created Date',
//       selector: (row) => row.order_created_date,
//       sortable: true,
//       center: true,
//       width: '175px',
//     },
//     {
//       name: 'No Order Astinet/VPN-IP',
//       selector: (row) => row.no_order_astinet,
//       sortable: true,
//       width: '350px',
//     },
//     {
//       name: 'Upload KFS/NDE/KONTRAK/BA SPLIT (Link dari DBT)',
//       selector: (row) => row.upload_dokumen,
//       sortable: true,
//       width: '600px',
//     },
//     {
//       name: 'Document',
//       selector: (row) => (
//         <input
//           className='text-main-yale_blue'
//           type='checkbox'
//           checked={row.document === true}
//           readOnly
//         />
//       ),
//       sortable: true,
//       center: true,
//       width: '125px',
//     },
//     {
//       name: 'Input IP',
//       selector: (row) => (
//         <input
//           className='text-main-yale_blue'
//           type='checkbox'
//           checked={row.input_ip === true}
//           readOnly
//         />
//       ),
//       sortable: true,
//       center: true,
//       width: '125px',
//     },
//     {
//       name: 'Status BAST',
//       selector: (row) => row.status_bast,
//       sortable: true,
//       width: '150px',
//     },
//   ];

//   const data = filteredData.length > 0 ? filteredData : orders;

//   data.sort((a, b) => {
//     return new Date(b.order_created_date) - new Date(a.order_created_date);
//   });

//   return (
//     <div className='bg-secondary-white h-full mx-auto max-w-screen-sm 2xl:max-w-screen-2xl xl:max-w-screen-2xl lg:max-w-screen:lg md:max-w-screen-lg rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm'>
//       <div className='overflow-x-auto'>
//         {loading ? (
//           <div className='text-center font-bold text-2xl text-main-yale_blue'>
//             Loading...
//           </div>
//         ) : (
//           <DataTable
//             columns={columns}
//             customStyles={customStyles}
//             data={data}
//             fixedHeader
//             highlightOnHover
//             persistTableHead
//             pagination
//             paginationRowsPerPageOptions={[10, 20, 50, 100]}
//             pointerOnHover
//             responsive
//             striped
//             subHeader
//             subHeaderAlign='left'
//             subHeaderComponent={subHeaderComponent}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderOnProgress;

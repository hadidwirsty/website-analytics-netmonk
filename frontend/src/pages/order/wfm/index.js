// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import { Link, useNavigate } from 'react-router-dom';

// export const OrderWFM = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [selectedCustomer, setSelectedCustomer] = useState('');
//   const [customerOptions, setCustomerOptions] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [productOptions, setProductOptions] = useState([]);
//   const [selectedTreg, setSelectedTreg] = useState('');
//   const [tregOptions, setTregOptions] = useState([]);

//   const navigate = useNavigate();

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
//         const response = await axios.get(
//           'https://app.netmonk.id/tech/api-web-analytics/orders/'
//         );
//         setOrders(response.data.result);
//         setLoading(false);

//         const customerNames = Array.from(
//           new Set(response.data.result.map((item) => item.nama_customer))
//         );
//         setCustomerOptions(customerNames);

//         const products = Array.from(
//           new Set(response.data.result.map((item) => item.produk))
//         );
//         setProductOptions(products);

//         const treg = Array.from(
//           new Set(response.data.result.map((item) => item.treg))
//         );
//         setTregOptions(treg);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const applyFilters = () => {
//     let filteredData = [...orders];

//     if (searchText) {
//       filteredData = filteredData.filter((item) => {
//         const orderId = item.order_id || '';
//         const accountName = item.account_name || '';
//         return (
//           orderId.toLowerCase().includes(searchText.toLowerCase()) ||
//           accountName.toLowerCase().includes(searchText.toLowerCase())
//         );
//       });
//     }

//     if (selectedCustomer) {
//       filteredData = filteredData.filter(
//         (item) => item.nama_customer === selectedCustomer
//       );
//     }

//     if (selectedProduct) {
//       filteredData = filteredData.filter(
//         (item) => item.produk === selectedProduct
//       );
//     }

//     if (selectedTreg) {
//       filteredData = filteredData.filter((item) => item.treg === selectedTreg);
//     }

//     setFilteredData(filteredData);
//   };

//   useEffect(() => {
//     applyFilters();
//   }, [orders, searchText, selectedCustomer, selectedProduct, selectedTreg]);

//   const resetFilters = () => {
//     setSelectedCustomer('');
//     setSelectedProduct('');
//     setSelectedTreg('');
//     setSearchText('');
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
//           list='productOptions'
//           value={selectedProduct}
//           onChange={(e) => setSelectedProduct(e.target.value)}
//           className='block rounded border border-secondary-basic_grey_2 py-3 px-5 w-full text-sm text-gunmetal-40 placeholder:text-gunmetal-40'
//           placeholder='Product'
//         />
//         <datalist id='productOptions'>
//           {productOptions.sort().map((option) => (
//             <option key={option} value={option} />
//           ))}
//         </datalist>
//       </div>
//       <div>
//         <input
//           type='text'
//           list='tregOptions'
//           value={selectedTreg}
//           onChange={(e) => setSelectedTreg(e.target.value)}
//           className='block rounded border border-secondary-basic_grey_2 py-3 px-5 text-sm w-full text-gunmetal-40 placeholder:text-gunmetal-40'
//           placeholder='TREG'
//         />
//         <datalist id='tregOptions'>
//           {tregOptions.sort().map((option) => (
//             <option key={option} value={option} />
//           ))}
//         </datalist>
//       </div>
//       <div>
//         <input
//           type='text'
//           placeholder='Search OrderID/Account Name'
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className='block rounded border border-secondary-basic_grey_2 py-3 px-5 w-full text-sm text-gunmetal-40 placeholder:text-gunmetal-40'
//         />
//       </div>
//       <div>
//         <Link to={'/order-wfm/create'}>
//           <button className='block justify-center rounded border-none py-3 px-5 w-full text-base text-center text-secondary-white bg-main-yale_blue hover:bg-main-french_blue'>
//             <FontAwesomeIcon className='mr-2' icon={faPlusSquare} />
//             Add New Order
//           </button>
//         </Link>
//       </div>
//     </div>
//   );

//   const editRow = async (row) => {
//     try {
//       const response = await axios.get(
//         `https://app.netmonk.id/tech/api-web-analytics/orders/${row.id}`
//       );
//       const rowData = response.data.result;

//       navigate(`/order-wfm/edit/${row.id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteRow = async (row) => {
//     try {
//       const confirmDelete = window.confirm(
//         'Are you sure you want to delete this row?'
//       );

//       if (confirmDelete) {
//         const response = await axios.get(
//           `https://app.netmonk.id/tech/api-web-analytics/orders/${row.id}`
//         );
//         console.log('Row to delete:', response.data);

//         await axios.delete(
//           `https://app.netmonk.id/tech/api-web-analytics/orders/${row.id}`
//         );

//         console.log('Row deleted successfully');

//         window.location.reload();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const columns = [
//     {
//       name: 'Actions',
//       selector: (row) => (
//         <div className='flex gap-3 text-lg'>
//           <button
//             className='text-main-yale_blue hover:text-main-french_blue'
//             onClick={() => editRow(row)}
//           >
//             <FontAwesomeIcon icon={faEdit} />
//           </button>
//           <button
//             className='text-main-yale_blue hover:text-main-french_blue'
//             onClick={() => deleteRow(row)}
//           >
//             <FontAwesomeIcon icon={faTrash} />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       center: true,
//     },
//     {
//       name: 'Unique ID',
//       selector: (row) => row.id,
//       sortable: true,
//       width: '135px',
//     },
//     {
//       name: 'Subs ID',
//       selector: (row) => row.subs_id,
//       sortable: true,
//       width: '135px',
//     },
//     {
//       name: 'Customer Name',
//       selector: (row) => row.nama_customer,
//       sortable: true,
//       width: '300px',
//     },
//     {
//       name: 'Account Name',
//       selector: (row) => row.account_name,
//       sortable: true,
//       width: '300px',
//     },
//     {
//       name: 'Product',
//       selector: (row) => row.produk,
//       sortable: true,
//       center: true,
//       width: '150px',
//     },
//     {
//       name: 'Order ID',
//       selector: (row) => row.order_id,
//       sortable: true,
//       width: '135px',
//     },
//     {
//       name: 'CRM Order Type',
//       selector: (row) => row.crm_order_type,
//       sortable: true,
//       center: true,
//       width: '145px',
//     },
//     {
//       name: 'Agreement Name',
//       selector: (row) => row.agreement_name,
//       sortable: true,
//       width: '350px',
//     },
//     {
//       name: 'Location',
//       selector: (row) => row.location,
//       sortable: true,
//       width: '600px',
//     },
//     {
//       name: 'PIC/AM',
//       selector: (row) => row.pic_am,
//       sortable: true,
//       width: '300px',
//     },
//     {
//       name: 'SID',
//       selector: (row) => row.sid,
//       sortable: true,
//       center: true,
//       width: '100px',
//     },
//     {
//       name: 'TREG',
//       selector: (row) => row.treg,
//       sortable: true,
//       width: '100px',
//     },
//     {
//       name: 'WITEL',
//       selector: (row) => row.witel,
//       sortable: true,
//       width: '150px',
//     },
//     {
//       name: 'Divisi',
//       selector: (row) => row.divisi,
//       sortable: true,
//       width: '150px',
//     },
//     {
//       name: 'Segment',
//       selector: (row) => row.segment,
//       sortable: true,
//       width: '175px',
//     },
//     {
//       name: 'Durasi Berlangganana (Bulan)',
//       selector: (row) => row.durasi_berlangganan,
//       sortable: true,
//       center: true,
//       width: '225px',
//     },
//     {
//       name: 'OTC',
//       selector: (row) => row.nilai_revenue,
//       sortable: true,
//       width: '100px',
//     },
//     {
//       name: 'Monthly',
//       selector: (row) => row.revenue_per_bulan,
//       sortable: true,
//       width: '100px',
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
//       name: 'Activate Account',
//       selector: (row) => (row.activate_account ? 'Yes' : 'No'),
//       sortable: true,
//       center: true,
//       width: '150px',
//     },
//     {
//       name: 'Activation Date',
//       selector: (row) => row.activation_date,
//       sortable: true,
//       center: true,
//       width: '175px',
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
//       name: 'Link Dashboard',
//       selector: (row) => row.link_dashboard,
//       sortable: true,
//       width: '350px',
//     },
//     {
//       name: 'Username',
//       selector: (row) => row.username,
//       sortable: true,
//       width: '250px',
//     },
//     {
//       name: 'Password',
//       selector: (row) => row.password,
//       sortable: true,
//       width: '250px',
//     },
//     {
//       name: 'Authenticator (Netmonk HI)',
//       selector: (row) => row.auth_netmonk_hi,
//       sortable: true,
//       width: '225px',
//     },
//     {
//       name: 'Draft BAST',
//       selector: (row) => row.draft_bast,
//       sortable: true,
//       width: '650px',
//     },
//     {
//       name: 'BAST Upload Date',
//       selector: (row) => row.bast_upload_date,
//       sortable: true,
//       center: true,
//       width: '175px',
//     },
//     {
//       name: 'Status BAST',
//       selector: (row) => row.status_bast,
//       sortable: true,
//       width: '150px',
//     },
//     {
//       name: 'Status Internal Netmonk (Teknis)',
//       selector: (row) => row.status_internal_netmonk_teknis,
//       sortable: true,
//       width: '250px',
//     },
//     {
//       name: 'Status Internal Netmonk (Admin)',
//       selector: (row) => row.status_internal_netmonk_admin,
//       sortable: true,
//       width: '250px',
//     },
//     {
//       name: 'Order Closing Date',
//       selector: (row) => row.order_closing_date,
//       sortable: true,
//       center: true,
//       width: '175px',
//     },
//   ];

//   const data = filteredData.length > 0 ? filteredData : orders;

//   data.sort((a, b) => {
//     return new Date(b.order_created_date) - new Date(a.order_created_date);
//   });

//   return (
//     <>
//       <div className='bg-secondary-white h-full mx-auto max-w-screen-sm 2xl:max-w-screen-2xl xl:max-w-screen-2xl lg:max-w-screen:lg md:max-w-screen-lg rounded-lg shadow-none sm:shadow-lg px-0 py-8 sm:px-5 sm:py-8 text-sm'>
//         <div className='overflow-x-auto'>
//           {loading ? (
//             <div className='text-center font-bold text-2xl text-main-yale_blue'>
//               Loading...
//             </div>
//           ) : (
//             <DataTable
//               columns={columns}
//               customStyles={customStyles}
//               data={data}
//               fixedHeader
//               highlightOnHover
//               persistTableHead
//               pagination
//               paginationRowsPerPageOptions={[10, 20, 50, 100]}
//               pointerOnHover
//               responsive
//               striped
//               subHeader
//               subHeaderAlign='left'
//               subHeaderComponent={subHeaderComponent}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderWFM;

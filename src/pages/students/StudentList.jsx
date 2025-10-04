import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../express/redux/UsersSlice';
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import BreadcrumbNav from '../../components/bredCrumbs/BredCrumb';
import { useNavigate } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';

export default function StudentList() {
        const [customers, setCustomers] = useState([]);
          const dispatch = useDispatch();
            const navigate = useNavigate();
             const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
            const { list, loading, error } = useSelector((state) => state.users);

            const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const setBreadcrumb = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "List",
    },
  ];

  const setSideNavButton = [
    {
      label: "Add",
      icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
      onClick: () => {
        navigate("/settings/studentForm")
      },
    },
  ];

    //     useEffect(() => {
    //     CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    // }, []);

      useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);
    return (
        <>
            <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />
            <div className='card m-2'>
<DataTable
    value={list}
    selection={selectedProducts}                    
    onSelectionChange={(e) => setSelectedProducts(e.value)} 
    dataKey="_id"                                     
    paginator
    rows={5}
    rowsPerPageOptions={[5, 10, 25, 50]}
    tableStyle={{ minWidth: '50rem' }}
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
    paginatorLeft={paginatorLeft}
    paginatorRight={paginatorRight}
    rowHover                
    showGridlines                       
  >
                 <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="firstName" header="First Name" style={{ width: '25%' }}></Column>
                <Column field="lastName" header="Last Name" style={{ width: '25%' }}></Column>
                <Column field="role" header="Role" style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
            </DataTable>
            </div>
        </>
    )
}
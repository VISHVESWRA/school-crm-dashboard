import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../express/redux/UsersSlice";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import { useNavigate } from "react-router-dom";
import { InputSwitch } from "primereact/inputswitch";
import { fetchStudents } from "../../express/redux/StudentsSlice";
import { Spinner } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function StudentList() {
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const { list, loading, error } = useSelector((state) => state.students);
  const [rowClick, setRowClick] = useState(false);

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
        navigate("/settings/studentForm");
      },
    },
  ];

  //     useEffect(() => {
  //     CustomerService.getCustomersMedium().then((data) => setCustomers(data));
  // }, []);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

     const actionTemplate = (nodeData) => {

          const handleEdit = () => {
    navigate(`/settings/studentForm/${nodeData._id}`);
  };
      
        return (
            <div className="flex gap-2">
                {/* <Button type="button" icon="pi pi-search" rounded></Button>
                <Button type="button" icon="pi pi-pencil" severity="success" rounded></Button> */}
                <FiEdit
                                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                                        size={18}
                                        onClick={() => handleEdit()}
                                      />
                                      <FiTrash2
                                        className="text-red-500 cursor-pointer hover:text-red-700"
                                        size={18}
                                        // onClick={() => handleDelete(user._id)}
                                      />
            </div>
        );
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />
      <div className="card m-2">
        {/* Applied Custom Css for Border*/}
        <DataTable
          value={list.students}
          selectionMode="checkbox"
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="_id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          rowHover
          showGridlines
          className="my-table"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="personalDetails.firstName"
            header="First Name"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="personalDetails.lastName"
            header="Last Name"
            style={{ width: "25%" }}
          ></Column>
          <Column field="courseDetails.mentor" header="Mentor" style={{ width: "25%" }}></Column>
          <Column
            field="courseDetails.duration"
            header="Duration"
            style={{ width: "25%" }}
          ></Column>
          <Column body={actionTemplate} headerClassName="w-10rem" />
        </DataTable>
      </div>
    </>
  );
}

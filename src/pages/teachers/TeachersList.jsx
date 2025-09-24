import { useEffect, useState } from "react";
import {
  createTeacher,
  fetchTeachers,
} from "../../express/redux/TeachersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "serial",
    headerName: "S.No",
    flex: 0.5,
    headerAlign: "center",
    align: "center",
  },
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TeachersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.teachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { setBreadcrumbs } = useOutletContext();

  const filteredList = list.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      teacher.phoneNumber.includes(searchTerm);

    const matchRole = roleFilter ? teacher.role === roleFilter : true;
    const matchDate = dateFilter ? teacher.dateOfJoin === dateFilter : true;

    return matchSearch && matchRole && matchDate;
  });

  const rows = filteredList.map((teacher, index) => ({
    id: teacher._id, // `DataGrid` requires a unique `id`
    serial: index + 1,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    phoneNumber: teacher.phoneNumber,
    role: teacher.role,
  }));

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Home",
        href: "/",
      },
      {
        label: "List",
      },
    ]);
  }, []);

  const handleAddTeacher = () => {
    navigate("/settings/teachersForm");
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

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div>
      <Card className="mb-0.5">
        {/* <Card.Header>Header</Card.Header> */}
        <Card.Body>
          <div className="flex flex-row gap-3 items-center">
            <Form.Select
              className="w-full max-w-xs"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </Form.Select>

            <Form.Control
              type="text"
              placeholder="Search"
              className="w-full max-w-xs"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <Form.Control
              type="date"
              className="w-full max-w-xs bg-black text-white"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />

            <button
              type="button"
              onClick={handleAddTeacher}
              className="flex items-center px-2 py-2 gap-0.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <IoMdAddCircleOutline size={18} />
              Add
            </button>
          </div>

          {/* <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="text-center">S.No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((teacher, index) => (
                  <tr key={teacher._id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{teacher.firstName}</td>
                    <td>{teacher.lastName}</td>
                    <td>{teacher.phoneNumber}</td>
                    <td>{teacher.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </Table> */}
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </Card.Body>
      </Card>
    </div>
  );
}

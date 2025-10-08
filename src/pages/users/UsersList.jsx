import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { IoMdAddCircleOutline } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Card from "react-bootstrap/Card";
import { deleteUser, fetchUsers } from "../../express/redux/UsersSlice";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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
        navigate("/settings/usersForm");
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    navigate(`/settings/usersForm/${user._id}`);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    dispatch(deleteUser(id));
  };

  const filteredList = list.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm);
    const matchRole = roleFilter ? user.role === roleFilter : true;
    const matchDate = dateFilter ? user.dateOfJoin === dateFilter : true;
    return matchSearch && matchRole && matchDate;
  });

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredList.slice(indexOfFirstRow, indexOfLastRow);

  const goToPage = (page) => setCurrentPage(page);

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
    <div>
      <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />

      <Card className="m-4">
        <Card.Body>
          <div className="flex flex-row gap-3 items-center mb-4">
            <Form.Select
              className="w-full max-w-xs"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </Form.Select>

            <Form.Control
              type="text"
              placeholder="Search"
              className="w-full max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Form.Control
              type="date"
              className="w-full max-w-xs"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div className="flex justify-end items-center mb-2 gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`px-3 py-1 border rounded ${
                  num === currentPage ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => goToPage(num)}
              >
                {num}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          <div className="overflow-x-auto border rounded">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-300 font-poppins text-sm">
                  <th className="border px-4 py-2 text-center">S.No</th>
                  <th className="border px-4 py-2">First Name</th>
                  <th className="border px-4 py-2">Last Name</th>
                  <th className="border px-4 py-2">Phone Number</th>
                  <th className="border px-4 py-2">Role</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-gray-50 bg-white text-sm">
                    <td className="border px-4 py-2 text-center">
                      {indexOfFirstRow + idx + 1}
                    </td>
                    <td className="border px-4 py-2">{user.firstName}</td>
                    <td className="border px-4 py-2">{user.lastName}</td>
                    <td className="border px-4 py-2">{user.phoneNumber}</td>
                    <td className="border px-4 py-2 min-w-60">
                      {user.role && (
                        <span className="bg-violet-200 px-3 py-1 rounded-4xl">
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="border px-4 py-2 flex text-center justify-center gap-2">
                      <FiEdit
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        size={18}
                        onClick={() => handleEdit(user)}
                      />
                      <FiTrash2
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        size={18}
                        onClick={() => handleDelete(user._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

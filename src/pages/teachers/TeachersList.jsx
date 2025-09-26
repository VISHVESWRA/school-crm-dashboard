import { useEffect, useState } from "react";
import {
  deleteTeacher,
  fetchTeachers,
} from "../../express/redux/TeachersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form } from "react-bootstrap";
import { IoMdAddCircleOutline } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Card from "react-bootstrap/Card";

export default function TeachersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.teachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { setBreadcrumbs } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    setBreadcrumbs([{ label: "Home", href: "/" }, { label: "List" }]);
  }, []);

  const handleAddTeacher = () => navigate("/settings/teachersForm");

  const handleEdit = (teacher) => {
    navigate(`/settings/teachersForm/${teacher._id}`);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (!confirmed) return;

    dispatch(deleteTeacher(id));
  };

  const filteredList = list.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      teacher.phoneNumber.includes(searchTerm);
    const matchRole = roleFilter ? teacher.role === roleFilter : true;
    const matchDate = dateFilter ? teacher.dateOfJoin === dateFilter : true;
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
      <Card>
        <Card.Body>
          <div className="flex flex-row gap-3 items-center mb-4">
            <Form.Select
              className="w-full max-w-xs"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Form.Control
              type="date"
              className="w-full max-w-xs"
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
                {currentRows.map((teacher, idx) => (
                  <tr key={teacher._id} className="hover:bg-gray-50 bg-white">
                    <td className="border px-4 py-2 text-center">
                      {indexOfFirstRow + idx + 1}
                    </td>
                    <td className="border px-4 py-2">{teacher.firstName}</td>
                    <td className="border px-4 py-2">{teacher.lastName}</td>
                    <td className="border px-4 py-2">{teacher.phoneNumber}</td>
                    <td className="border px-4 py-2">{teacher.role}</td>
                    <td className="border px-4 py-2 flex text-center justify-center gap-2">
                      <FiEdit
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        size={18}
                        onClick={() => handleEdit(teacher)}
                      />
                      <FiTrash2
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        size={18}
                        onClick={() => handleDelete(teacher._id)}
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

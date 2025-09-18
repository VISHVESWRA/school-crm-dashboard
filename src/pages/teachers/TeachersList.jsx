import { useEffect, useState } from "react";
import {
  createTeacher,
  fetchTeachers,
} from "../../express/redux/TeachersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function TeachersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.teachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // const lists = [
  //   {
  //     _id: "1",
  //     firstName: "Arun",
  //     lastName: "S",
  //     phoneNumber: "9658623586",
  //     role: "Teacher",
  //     dateOfJoin: "2025-09-18",
  //     city: "",
  //     state: "",
  //     zip: "",
  //   },
  //   {
  //     _id: "2",
  //     firstName: "John",
  //     lastName: "Doe",
  //     phoneNumber: "9876543210",
  //     role: "Admin",
  //     dateOfJoin: "2025-05-10",
  //   },
  //   {
  //     _id: "3",
  //     firstName: "John",
  //     lastName: "Doe",
  //     phoneNumber: "9876543210",
  //     role: "Admin",
  //     dateOfJoin: "2025-05-10",
  //   },
  // ];

  const filteredList = list.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      teacher.phoneNumber.includes(searchTerm);

    const matchRole = roleFilter ? teacher.role === roleFilter : true;
    const matchDate = dateFilter ? teacher.dateOfJoin === dateFilter : true;

    return matchSearch && matchRole && matchDate;
  });

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleAddTeacher = () => {
    navigate("/settings/teachersForm");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div>
      <div className="flex flex-row gap-3 mb-3 items-center">
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

      <Table striped bordered hover responsive>
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
      </Table>
    </div>
  );
}

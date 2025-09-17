import { useEffect } from "react";
import {
  createTeacher,
  fetchTeachers,
} from "../../express/redux/TeachersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';

export default function TeachersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleAddTeacher = () => {
    // dispatch(createTeacher({ firstName: "John", lastName: "Doe" }));

    navigate('/settings/teachersForm')
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <button onClick={handleAddTeacher}>Add Teacher</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>
              1
            </td>
            <td>
              {list.map((teacher) => (
                <li key={teacher._id}>
                  {teacher.firstName} {teacher.lastName}
                </li>
              ))}
            </td>
          </tr> */}
          {list.map((teacher) => (
            <tr key={teacher._id}>
              <td>$index</td>
              <td>
                {teacher.firstName}
              </td>
              <td>
                {teacher.lastName}
              </td>
              <td>
                {teacher.phoneNumber}
              </td>

            </tr>
          ))}

        </tbody>
      </Table>
    </div>
  );
}

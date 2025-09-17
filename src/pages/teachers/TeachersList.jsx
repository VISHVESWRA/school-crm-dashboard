import { useEffect } from "react";
import {
  createTeacher,
  fetchTeachers,
} from "../../express/redux/TeachersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function TeachersList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleAddTeacher = () => {
    dispatch(createTeacher({ firstName: "John", lastName: "Doe" }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <button onClick={handleAddTeacher}>Add Teacher</button>
      <ul>
        {list.map((teacher) => (
          <li key={teacher.id}>
            {teacher.firstName} {teacher.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

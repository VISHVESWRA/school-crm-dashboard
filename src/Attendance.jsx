import React, {useState, useEffect} from "react";
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
} from "lucide-react";

const AttendanceSystem = () => {
  const [classes, setClasses] = useState([
    {_id: "1", name: "Mathematics 101", code: "MATH101"},
    {_id: "2", name: "Physics 201", code: "PHYS201"},
  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState({});
  const [view, setView] = useState("mark"); // mark, report, statistics
  const [statistics, setStatistics] = useState([]);
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    if (selectedClass) {
      // Simulate fetching students
      const mockStudents = [
        {
          _id: "s1",
          name: "John Doe",
          studentId: "STU001",
          email: "john@example.com",
        },
        {
          _id: "s2",
          name: "Jane Smith",
          studentId: "STU002",
          email: "jane@example.com",
        },
        {
          _id: "s3",
          name: "Bob Johnson",
          studentId: "STU003",
          email: "bob@example.com",
        },
        {
          _id: "s4",
          name: "Alice Williams",
          studentId: "STU004",
          email: "alice@example.com",
        },
        {
          _id: "s5",
          name: "Charlie Brown",
          studentId: "STU005",
          email: "charlie@example.com",
        },
        {
          _id: "s6",
          name: "Diana Prince",
          studentId: "STU006",
          email: "diana@example.com",
        },
        {
          _id: "s7",
          name: "Edward Norton",
          studentId: "STU007",
          email: "edward@example.com",
        },
        {
          _id: "s8",
          name: "Fiona Green",
          studentId: "STU008",
          email: "fiona@example.com",
        },
      ];
      setStudents(mockStudents);

      // Initialize attendance
      const initialAttendance = {};
      mockStudents.forEach((student) => {
        initialAttendance[student._id] = {
          status: "present",
          notes: "",
          timeIn: "",
        };
      });
      setAttendance(initialAttendance);
    }
  }, [selectedClass]);

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {...prev[studentId], status},
    }));
  };

  const handleNotesChange = (studentId, notes) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {...prev[studentId], notes},
    }));
  };

  const handleTimeChange = (studentId, time) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {...prev[studentId], timeIn: time},
    }));
  };

  const handleSubmit = async () => {
    const records = Object.entries(attendance).map(([userId, data]) => ({
      user: userId,
      status: data.status,
      notes: data.notes,
      timeIn: data.timeIn ? new Date(`${date}T${data.timeIn}`) : new Date(),
    }));

    console.log(records);

    // In real app: await axios.post('/api/attendance/mark', { classId: selectedClass._id, date, records })
    alert("Attendance marked successfully!");
  };

  const markAllPresent = () => {
    const updated = {};
    students.forEach((student) => {
      updated[student._id] = {...attendance[student._id], status: "present"};
    });
    setAttendance(updated);
  };

  const loadStatistics = () => {
    // Mock statistics
    const mockStats = students.map((student) => ({
      name: student.name,
      studentId: student.studentId,
      present: Math.floor(Math.random() * 20) + 10,
      absent: Math.floor(Math.random() * 5),
      late: Math.floor(Math.random() * 3),
      excused: Math.floor(Math.random() * 2),
      total: 30,
      attendanceRate: (Math.random() * 20 + 80).toFixed(2),
    }));
    setStatistics(mockStats);
  };

  const loadHistory = () => {
    // Mock attendance history
    const history = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const dayAttendance = {
        date: date.toISOString().split("T")[0],
        records: {},
      };

      students.forEach((student) => {
        const statuses = ["present", "absent", "late", "excused"];
        const weights = [0.8, 0.1, 0.07, 0.03];
        const random = Math.random();
        let cumulative = 0;
        let status = "present";

        for (let j = 0; j < statuses.length; j++) {
          cumulative += weights[j];
          if (random <= cumulative) {
            status = statuses[j];
            break;
          }
        }

        dayAttendance.records[student._id] = status;
      });

      history.push(dayAttendance);
    }

    setAttendanceHistory(history);
  };

  const getStatusBadge = (status) => {
    const styles = {
      present: "bg-green-500 text-white",
      absent: "bg-red-500 text-white",
      late: "bg-yellow-500 text-white",
      excused: "bg-blue-500 text-white",
    };
    return styles[status] || styles.present;
  };

  const getStatusShort = (status) => {
    const shorts = {
      present: "P",
      absent: "A",
      late: "L",
      excused: "E",
    };
    return shorts[status];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Attendance System
          </h1>
          <p className="text-gray-600">Mark and manage student attendance</p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setView("mark")}
              className={`px-4 py-2 rounded-md font-medium transition ${
                view === "mark"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Mark Attendance
            </button>
            <button
              onClick={() => {
                setView("history");
                loadHistory();
              }}
              className={`px-4 py-2 rounded-md font-medium transition ${
                view === "history"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Attendance History
            </button>
            <button
              onClick={() => {
                setView("statistics");
                loadStatistics();
              }}
              className={`px-4 py-2 rounded-md font-medium transition ${
                view === "statistics"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Statistics & Reports
            </button>
          </div>
        </div>

        {/* Class and Date Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Select Class
              </label>
              <select
                value={selectedClass?._id || ""}
                onChange={(e) =>
                  setSelectedClass(
                    classes.find((c) => c._id === e.target.value)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a class...</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} ({cls.code})
                  </option>
                ))}
              </select>
            </div>

            {view === "mark" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {view === "mark" && selectedClass && (
              <div className="flex items-end">
                <button
                  onClick={markAllPresent}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
                >
                  Mark All Present
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mark Attendance View - TABLE FORMAT */}
        {view === "mark" && selectedClass && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedClass.name} -{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 w-12">
                      #
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Student ID
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Time In
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {student.studentId}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-semibold text-gray-800">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-1 justify-center">
                          {["present", "absent", "late", "excused"].map(
                            (status) => (
                              <button
                                key={status}
                                onClick={() =>
                                  handleStatusChange(student._id, status)
                                }
                                title={
                                  status.charAt(0).toUpperCase() +
                                  status.slice(1)
                                }
                                className={`w-10 h-10 rounded-md font-bold text-sm transition ${
                                  attendance[student._id]?.status === status
                                    ? getStatusBadge(status)
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                {getStatusShort(status)}
                              </button>
                            )
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <input
                          type="time"
                          value={attendance[student._id]?.timeIn || ""}
                          onChange={(e) =>
                            handleTimeChange(student._id, e.target.value)
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <input
                          type="text"
                          placeholder="Add notes..."
                          value={attendance[student._id]?.notes || ""}
                          onChange={(e) =>
                            handleNotesChange(student._id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Total Students:{" "}
                <span className="font-bold">{students.length}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedClass(null)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                >
                  Submit Attendance
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Attendance History View - TABLE FORMAT */}
        {view === "history" && selectedClass && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Attendance History - {selectedClass.name}
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                <Download className="w-4 h-4" />
                Export to Excel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10">
                      Student
                    </th>
                    {attendanceHistory.map((day, idx) => (
                      <th
                        key={idx}
                        className="text-center py-4 px-4 font-semibold text-gray-700 min-w-24"
                      >
                        <div>
                          {new Date(day.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-xs font-normal text-gray-500">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-6 sticky left-0 bg-white hover:bg-gray-50 z-10">
                        <div>
                          <div className="font-semibold text-gray-800">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.studentId}
                          </div>
                        </div>
                      </td>
                      {attendanceHistory.map((day, idx) => {
                        const status = day.records[student._id];
                        return (
                          <td key={idx} className="py-4 px-4 text-center">
                            <span
                              className={`inline-block w-8 h-8 rounded-full ${getStatusBadge(
                                status
                              )} font-bold text-sm leading-8`}
                            >
                              {getStatusShort(status)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white font-bold text-xs flex items-center justify-center">
                    P
                  </span>
                  <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white font-bold text-xs flex items-center justify-center">
                    A
                  </span>
                  <span>Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-yellow-500 text-white font-bold text-xs flex items-center justify-center">
                    L
                  </span>
                  <span>Late</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                    E
                  </span>
                  <span>Excused</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics View - TABLE FORMAT */}
        {view === "statistics" && selectedClass && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Attendance Statistics - {selectedClass.name}
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      #
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Student ID
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">
                      Present
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">
                      Absent
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">
                      Late
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">
                      Excused
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">
                      Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.map((stat, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {idx + 1}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {stat.studentId}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-800">
                        {stat.name}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold min-w-12">
                          {stat.present}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold min-w-12">
                          {stat.absent}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold min-w-12">
                          {stat.late}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold min-w-12">
                          {stat.excused}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-gray-800">
                        {stat.total}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${
                              parseFloat(stat.attendanceRate) >= 90
                                ? "bg-green-500 text-white"
                                : parseFloat(stat.attendanceRate) >= 75
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {stat.attendanceRate}%
                          </span>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                parseFloat(stat.attendanceRate) >= 90
                                  ? "bg-green-500"
                                  : parseFloat(stat.attendanceRate) >= 75
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{width: `${stat.attendanceRate}%`}}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!selectedClass && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Select a class to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceSystem;

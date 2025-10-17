import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Form, Row } from "react-bootstrap";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import {
  createCourse,
  fetchCourseById,
  updateCourse,
} from "../../express/redux/CourseSlice";

export default function CourseForm() {
  const { selectedCourse, loading, error } = useSelector(
    (state) => state.courses
  );
  const usersList = useSelector((state) => state.users);
  const users = usersList.list.filter((user) => user.role === "Staff");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCourse && id) {
      reset({
        courseName: selectedCourse.courseName || "",
        courseFees: selectedCourse.courseFees || "",
        mode: selectedCourse.mode || "Online",
        duration: selectedCourse.duration || "",
        mentor: selectedCourse.mentor || "",
      });
    }
  }, [selectedCourse, reset]);

  const modes = [
    { id: 1, label: "Online" },
    { id: 2, label: "Offline" },
    { id: 3, label: "Hybrid" },
  ];
  const durations = [
    { id: 1, label: "2" },
    { id: 2, label: "3" },
    { id: 3, label: "6" },
  ];

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateCourse({ id, data }));
      reset();
      navigate("/settings/courseList");
    } else {
      dispatch(createCourse(data));
      reset();
      navigate("/settings/courseList");
    }
  };

  const setBreadcrumb = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "List",
      href: "././courseList",
    },
    {
      label: "Course Form",
    },
  ];

  const setSideNavButton = [
    {
      label: id ? "Update" : "Submit",
      onClick: handleSubmit(onSubmit),
    },
    {
      label: "Cancel",
      onClick: () => {
        navigate("/settings/courseList");
      },
    },
  ];

  return (
    <>
      <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />

      <div className="flex justify-center items-center">
        <Form
          noValidate
          className="p-4 sm:p-6 lg:p-8 w-4xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card className="shadow">
            <Card.Header className="font-poppins text-lg font-medium">
              Course Details
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {/* Course Name */}
                <TextField
                  label="Course Name"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.courseName}
                  className="col-span-1 sm:col-span-2"
                  helperText={errors.courseName?.message}
                  {...register("courseName", { required: "Required" })}
                />

                {/* Course Fees */}
                <TextField
                  label="Course Fees"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.courseFees}
                  className="col-span-1 sm:col-span-2"
                  helperText={errors.courseFees?.message}
                  {...register("courseFees", {
                    required: "Required",
                    pattern: { value: /^[0-9]+$/, message: "Must be a number" },
                  })}
                />

                {/* Mode (Offline / Online) */}
                <div className="col-span-1 sm:col-span-2">
                  <Controller
                    name="mode"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Mode is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl
                        sx={{ minWidth: 100 }}
                        size="small"
                        error={!!error}
                        fullWidth
                      >
                        <InputLabel id="mode-label">Mode</InputLabel>
                        <Select
                          {...field}
                          value={field.value || ""}
                          labelId="mode-label"
                          id="mode-select"
                          label="Mode"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {modes.map((option) => (
                            <MenuItem key={option.id} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {error && (
                          <FormHelperText>{error.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </div>

                {/* Duration */}
                <div className="col-span-1 sm:col-span-2">
                  <Controller
                    name="duration"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Duration is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl
                        sx={{ minWidth: 100 }}
                        size="small"
                        error={!!error}
                        fullWidth
                      >
                        <InputLabel id="duration-label">Duration</InputLabel>
                        <Select
                          {...field}
                          value={field.value || ""}
                          labelId="duration-label"
                          id="duration-select"
                          label="Duration"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {durations.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {error && (
                          <FormHelperText>{error.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </div>

                {/* Mentor */}
                <div className="col-span-1 sm:col-span-2">
                  <Controller
                    name="mentor"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Mentor is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl
                        sx={{ minWidth: 100 }}
                        size="small"
                        error={!!error}
                        fullWidth
                      >
                        <InputLabel id="mentor-label">Mentor</InputLabel>
                        <Select
                          {...field}
                          value={field.value || ""}
                          labelId="mentor-label"
                          id="mentor-select"
                          label="Mentor"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {users.map((option) => (
                            <MenuItem key={option._id} value={option.firstName}>
                              {option.firstName} {option.lastName}
                            </MenuItem>
                          ))}
                        </Select>
                        {error && (
                          <FormHelperText>{error.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </div>
    </>
  );
}
``;

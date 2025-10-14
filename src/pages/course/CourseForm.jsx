import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button, Col, Form, Row } from "react-bootstrap";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import { fetchStudentById } from "../../express/redux/StudentsSlice";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function CourseForm() {
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
      dispatch(fetchStudentById(id));
    }
  }, [dispatch, id]);

  const modes = ["Online", "Offline", "Hybrid"];
  const durations = ["2", "3", "6"];
  const mentors = ["Vish", "Sam", "Ram"];

  const onSubmit = (data) => {
    console.log(data);

    // if (id) {
    //   console.log(data, id);
    //   dispatch(updateUser({ id, data }));
    //   reset();
    //   navigate("/settings/usersList");
    // } else {
    //   createUserApi(data);
    //   reset();
    //   navigate("/settings/usersList");
    // }
  };

  const setBreadcrumb = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "List",
      href: "././studentList",
    },
    {
      label: "Student Form",
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
        navigate("/settings/studentList");
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
                          <MenuItem value="Online">Online</MenuItem>
                          <MenuItem value="Offline">Offline</MenuItem>
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
                          {mentors.map((option) => (
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
              </div>
            </Card.Body>
          </Card>
        </Form>
      </div>
    </>
  );
}
``;

import Card from "react-bootstrap/Card";
import {Col, Form, Row, Spinner} from "react-bootstrap";
import {useForm, Controller} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useEffect} from "react";
import dayjs from "dayjs";

import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  addStudents,
  fetchStudentById,
  updateStudents,
} from "../../express/redux/StudentsSlice";
import {toast} from "react-hot-toast";
import {fetchCourses} from "../../express/redux/CourseSlice";
import {fetchUsers} from "../../express/redux/UsersSlice";

export default function StudentForm() {
  const {selectedStudent, loading, error} = useSelector(
    (state) => state.students
  );
  const {list} = useSelector((state) => state.courses);
  const usersList = useSelector((state) => state.users);
  const users = usersList.list.filter((user) => user.role === "Staff");
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    control,
    watch,
  } = useForm({
    defaultValues: {
      personalDetails: {
        firstName: "",
        lastName: "",
        regNumber: "",
        phoneNumber: "",
        dob: "",
        gender: "",
        city: "",
        state: "",
      },
      courseDetails: {
        course: "",
        mentor: "",
        duration: "",
      },
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  // const selectedCourseId = watch("courseDetails.course");
  // const selectedCourse = list?.courses?.find(
  //   (course) => course._id === selectedCourseId
  // );

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!selectedStudent || !id) {
      return;
    }
    reset({
      personalDetails: {
        firstName: selectedStudent?.personalDetails?.firstName || "",
        lastName: selectedStudent?.personalDetails?.lastName || "",
        regNumber: selectedStudent?.personalDetails?.regNumber || "",
        phoneNumber: selectedStudent?.personalDetails?.phoneNumber || "",
        dob: selectedStudent?.personalDetails?.dob
          ? new Date(selectedStudent?.personalDetails.dob)
              .toISOString()
              .split("T")[0]
          : "",
        gender: selectedStudent?.personalDetails?.gender || "",
        city: selectedStudent?.personalDetails?.city || "",
        state: selectedStudent?.personalDetails?.state || "",
      },
      courseDetails: {
        course: selectedStudent?.courseDetails?.course || "",
        mentor: selectedStudent?.courseDetails?.mentor || {id: "", name: ""},
        duration: selectedStudent?.courseDetails?.duration || "",
        batch: selectedStudent?.courseDetails?.batch || "",
      },
    });
  }, [selectedStudent, reset]);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  const onSubmit = async (data) => {
    console.log(data);

    if (error) {
      toast.error(error);
      return;
    }
    if (id) {
      dispatch(updateStudents({id, data}));
      reset();
      navigate("/settings/studentList");
    } else {
      dispatch(addStudents(data));
      reset();
      navigate("/settings/studentList");
    }
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
        // setBreadcrumbs([]);
      },
    },
  ];

  const genderOptions = [
    {id: "male", label: "Male"},
    {id: "female", label: "Female"},
    {id: "other", label: "Other"},
    {id: "notPrefer", label: "Prefer not to respond"},
  ];

  const durations = [
    {id: 1, label: "1"},
    {id: 2, label: "2"},
    {id: 3, label: "3"},
    {id: 4, label: "4"},
    {id: 5, label: "5"},
    {id: 6, label: "6"},
  ];

  const batch = [
    {id: 1, label: "Morning"},
    {id: 2, label: "Evening"},
    {id: 3, label: "Agternoon"},
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
          <Card className="shadow mb-4">
            <Card.Header className="font-poppins text-lg font-medium">
              Personal Details
            </Card.Header>
            <Card.Body className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <TextField
                  label="First Name"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.personalDetails?.firstName}
                  className="col-span-1 sm:col-span-2"
                  helperText={errors.personalDetails?.firstName?.message}
                  {...register("personalDetails.firstName", {
                    required: "Required",
                  })}
                />

                <TextField
                  label="Last Name"
                  // type="password"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.personalDetails?.lastName}
                  className="col-span-1 sm:col-span-2"
                  helperText={errors.personalDetails?.lastName?.message}
                  {...register("personalDetails.lastName", {
                    required: "Required",
                  })}
                />
                <TextField
                  label="Registration Number"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.personalDetails?.regNumber}
                  className="col-span-1 sm:col-span-2"
                  helperText={errors.personalDetails?.regNumber?.message}
                  {...register("personalDetails.regNumber", {
                    required: "Required",
                  })}
                />
                <TextField
                  label="PhoneNumber"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.personalDetails?.phoneNumber}
                  className="col-span-1 sm:col-span-2"
                  helperText={errors.personalDetails?.phoneNumber?.message}
                  {...register("personalDetails.phoneNumber", {
                    required: "Required",
                    minLength: {value: 10, message: "Must be 10 digits"},
                    maxLength: {value: 10, message: "Must be 10 digits"},
                  })}
                />

                <div className="col-span-1 sm:col-span-2">
                  {/* DatePicker using setValue */}
                  <Controller
                    name="personalDetails.dob"
                    control={control}
                    rules={{
                      required: "Required",
                      validate: (value) => {
                        if (!value) return "Required";
                        const date = dayjs(value);
                        if (!date.isValid()) return "Please enter a valid date";
                        if (date.isAfter(dayjs()))
                          return "Date cannot be in the future";
                        return true;
                      },
                    }}
                    render={({field, fieldState: {error}}) => (
                      <DatePicker
                        label="DOB*"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          // Store as string in YYYY-MM-DD format
                          field.onChange(date ? date.format("YYYY-MM-DD") : "");
                        }}
                        maxDate={dayjs()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            // margin: "normal",
                            size: "small",
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />

                  {/* Hidden input for validation */}
                  {/* <input
                    type="hidden"
                    {...register("personalDetails.dob", {
                      required: "Required",
                    })}
                  /> */}
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <Controller
                    name="personalDetails.gender"
                    control={control}
                    defaultValue=""
                    rules={{required: "Gender is required"}}
                    render={({field, fieldState: {error}}) => (
                      <FormControl
                        sx={{minWidth: 100}}
                        size="small"
                        error={!!error}
                        fullWidth
                      >
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                          {...field}
                          value={field.value || ""}
                          labelId="gender-label"
                          id="gender-select"
                          label="Gender"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {genderOptions.map((option) => (
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

                <TextField
                  label="City"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.personalDetails?.city}
                  className="col-span-1 sm:col-span-2"
                  helperText={errors.personalDetails?.city?.message}
                  {...register("personalDetails.city", {
                    required: "Required",
                  })}
                />
                <TextField
                  label="State"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.personalDetails?.state}
                  className="col-span-1 sm:col-span-2"
                  helperText={errors.personalDetails?.state?.message}
                  {...register("personalDetails.state", {
                    required: "Required",
                  })}
                />
              </div>

              {/* 
                        <Row className="mb-3">
                            
                            <Form.Group as={Col} md="4" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    defaultValue=""
                                    isInvalid={!!errors.role}
                                    {...register("role", { required: "Required" })}
                                >
                                    <option value="">Select</option>
                                    {roles.map((role, index) => (
                                        <option key={index} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.role?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>*/}
            </Card.Body>
          </Card>

          <Card className="shadow">
            <Card.Header className="font-poppins text-lg font-medium">
              Course Details
            </Card.Header>
            <Card.Body className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="col-span-1 sm:col-span-2">
                  {/* <Controller
                    name="courseDetails.mentor"
                    control={control}
                    defaultValue={{id: "", name: ""}}
                    rules={{required: "Required"}}
                    render={({field, fieldState: {error}}) => (
                      <FormControl
                        fullWidth
                        size="small"
                        error={!!error}
                        sx={{minWidth: 100}}
                      >
                        <InputLabel id="mentor-label">Mentor</InputLabel>
                        <Select
                          labelId="mentor-label"
                          value={field.value.id || ""}
                          label="Mentor"
                          onChange={(e) => {
                            const selected = users.find(
                              (u) => u._id === e.target.value
                            );
                            field.onChange({
                              id: selected._id || "",
                              name:
                                `${selected.firstName} ${selected.lastName}` ||
                                "",
                            });
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {users.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.firstName} {option.lastName}
                            </MenuItem>
                          ))}
                        </Select>
                        {error && (
                          <FormHelperText>{error.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  /> */}
                  <Controller
                    name="courseDetails.mentor"
                    control={control}
                    defaultValue={{id: "", name: ""}}
                    rules={{required: "Mentor is required"}}
                    render={({field, fieldState: {error}}) => (
                      <FormControl
                        fullWidth
                        size="small"
                        error={!!error}
                        sx={{minWidth: 100}}
                      >
                        <InputLabel id="mentor-label">Mentor</InputLabel>
                        <Select
                          labelId="mentor-label"
                          value={field?.value?.id || ""}
                          label="Mentor"
                          onChange={(e) => {
                            const selected = users.find(
                              (u) => u._id === e.target.value
                            );
                            field.onChange({
                              id: selected?._id || "",
                              name: `${selected?.firstName || ""} ${
                                selected?.lastName || ""
                              }`,
                            });
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {users.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
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
                <div className="col-span-1 sm:col-span-2">
                  <Controller
                    name="courseDetails.course"
                    control={control}
                    defaultValue=""
                    rules={{required: "Required"}}
                    render={({field, fieldState: {error}}) => (
                      <FormControl
                        sx={{minWidth: 100}}
                        size="small"
                        error={!!error}
                        fullWidth
                      >
                        <InputLabel id="course-label">Course</InputLabel>
                        <Select
                          {...field}
                          value={field.value || ""}
                          labelId="course-label"
                          id="course-select"
                          label="Course"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {list?.courses?.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.courseName}
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
                <div className="col-span-1 sm:col-span-2">
                  <Controller
                    name="courseDetails.duration"
                    control={control}
                    defaultValue=""
                    rules={{required: "Required"}}
                    render={({field, fieldState: {error}}) => (
                      <FormControl
                        sx={{minWidth: 100}}
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
                <div className="col-span-1 sm:col-span-2">
                  <Controller
                    name="courseDetails.batch"
                    control={control}
                    defaultValue=""
                    rules={{required: "Required"}}
                    render={({field, fieldState: {error}}) => (
                      <FormControl
                        sx={{minWidth: 100}}
                        size="small"
                        error={!!error}
                        fullWidth
                      >
                        <InputLabel id="batch-label">Batch</InputLabel>
                        <Select
                          {...field}
                          value={field.value || ""}
                          labelId="batch-label"
                          id="batch-select"
                          label="Batch"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {batch.map((option) => (
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
              </div>
            </Card.Body>
          </Card>
        </Form>
      </div>
    </>
  );
}

import { useForm, Controller } from "react-hook-form";
import { Col, Form, Row } from "react-bootstrap";
// import { createUserApi } from "../../express/api/UsersApi";
import { data, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import React, { useEffect, useState } from "react";
import {
  createUser,
  fetchUserById,
  fetchUsers,
  updateUser,
} from "../../express/redux/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { createUserApi } from "../../express/api/UsersApi";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import {
//   FormControl,
//   FormLabel,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   FormHelperText,
//   InputAdornment,
//   IconButton,
//   InputLabel,
//   OutlinedInput,
// } from "@mui/material";
import InputFileUpload from "../../components/FileUpload";
// import Image from 'react-bootstrap/Image';
import { Image } from "primereact/image";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function UsersForm() {
  const { selectedUser, loading, error } = useSelector((state) => state.users);

  const roles = [
    "Admin",
    "Principal",
    "Management Staff",
    // "User",
    "Staff",
    "Accountant",
    "Store Manager",
  ];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      dateOfJoin: new Date().toISOString().split("T")[0],
      skills: [],
      permission: {
        enquiry: false,
        enrollment: false,
        attendance: false,
        staff: false,
        placement: false,
        report: false,
      },
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser && id) {
      reset({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        dateOfJoin: selectedUser.dateOfJoin
          ? new Date(selectedUser.dateOfJoin).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        role: selectedUser.role,
        city: selectedUser.city,
        state: selectedUser.state,
        zip: selectedUser.zip,
      });
    }
  }, [selectedUser, reset, id]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateUser({ id, data }));
      reset();
      navigate("/settings/usersList");
    } else {
      dispatch(createUser(data));
      reset();
      navigate("/settings/usersList");
    }
  };

  const setBreadcrumb = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "List",
      href: "././usersList",
    },
    {
      label: "User Form",
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
        navigate("/settings/usersList");
        // setBreadcrumbs([]);
      },
    },
  ];

  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

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
                  fullWidth
                  required
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  className="col-span-1 sm:col-span-2"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />

                <TextField
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  className="col-span-1 sm:col-span-2"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  className="col-span-1 sm:col-span-2"
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />

                <div className="col-start-1 col-span-2 sm:col-span-2">
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={!!errors.password}
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      className="flex items-center justify-center text-center"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      {...register("password", { required: "Required" })}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && (
                      <FormHelperText>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>
                </div>
                {/* Phone Number */}
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                />

                {/* Date of Birth */}
                {/* <Controller
                  name="dateOfJoin"
                  control={control}
                  rules={{
                    required: "Required",
                    // validate: (value) =>
                    //   (value && new Date(value) <= new Date()) ||
                    //   "DOJ cannot be in the future",
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="dateOfJoin"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          error: !!errors.dateOfJoin,
                          helperText: errors.dateOfJoin?.message,
                        },
                      }}
                    />
                  )}
                /> */}

                {/* Gender */}
                <div className="col-start-1 col-span-1">
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Gender is required" }}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        size="small"
                        error={!!errors.gender}
                      >
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                          labelId="gender-label"
                          label="Gender"
                          {...field}
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                        <FormHelperText>
                          {errors.gender?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </div>

                {/* Mentor */}
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <FormControl fullWidth size="small" error={!!errors.mentor}>
                      <InputLabel id="mentor-label">Role</InputLabel>
                      <Select
                        labelId="mentor-label"
                        label="Role"
                        {...register("role")}
                      >
                        {roles.map((role, index) => (
                          <MenuItem key={index} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.role?.message}</FormHelperText>
                    </FormControl>
                  )}
                />

                <TextField
                  label="City"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  {...register("city")}
                  className="col-start-1 col-span-1"
                />

                <TextField
                  label="State"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  {...register("state")}
                />

                <TextField
                  label="Pincode"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                  {...register("pincode")}
                />
                {/* Course */}
                {/* <Controller
                  name="course"
                  control={control}
                  rules={{ required: "Course is required" }}
                  render={({ field }) => (
                    <FormControl fullWidth size="small" error={!!errors.course}>
                      <InputLabel id="course-label">Course</InputLabel>
                      <Select labelId="course-label" label="Course" {...field}>
                        {list.courses.map((course) => (
                          <MenuItem key={course._id} value={course._id}>
                            {course.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.course?.message}</FormHelperText>
                    </FormControl>
                  )}
                /> */}

                {/* Duration */}
                {/* <Controller
                  name="duration"
                  control={control}
                  rules={{ required: "Duration is required" }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      size="small"
                      error={!!errors.duration}
                    >
                      <InputLabel id="duration-label">Duration</InputLabel>
                      <Select
                        labelId="duration-label"
                        label="Duration"
                        {...field}
                      >
                        {durations.map((d) => (
                          <MenuItem key={d} value={d}>
                            {d}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.duration?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                /> */}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <FormControlLabel
                  control={<Checkbox value="enquiry" {...register("skills")} />}
                  label="Enquiry"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="enrollment" {...register("skills")} />
                  }
                  label="Enrollment"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="attendance" {...register("skills")} />
                  }
                  label="Attendance"
                />
                <FormControlLabel
                  control={<Checkbox value="staff" {...register("skills")} />}
                  label="Staff"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="placement" {...register("skills")} />
                  }
                  label="Placement"
                />
                <FormControlLabel
                  control={<Checkbox value="report" {...register("skills")} />}
                  label="Report"
                />
              </div>
            </Card.Body>
          </Card>
        </Form>
      </div>
    </>
  );
}

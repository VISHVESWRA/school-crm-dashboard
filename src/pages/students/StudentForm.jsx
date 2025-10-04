import Card from "react-bootstrap/Card";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      personalDetails: {
        firstName: "",
        lastName: "",
        phone: "",
        dob: "",
      },
      courseDetails: {
        course: "",
        mentor: "",
        duration: "",
      },
    },
  });
  // const { setBreadcrumbs, setSideNavButtons } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);
  const [date, setDate] = useState(null);

  const onSubmit = (data) => {
    console.log(data);

    // if (id) {
    //   console.log(data, id);
    //   dispatch(updateUser({ id, data }));
    //   reset();
    //   setBreadcrumbs([]);
    //   navigate("/settings/usersList");
    // } else {
    //   createUserApi(data);
    //   setBreadcrumbs([]);
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
      label: "Submit",
      onClick: handleSubmit(onSubmit)
    },
    {
      label: "Cancel",
      onClick: () => {
        navigate("/settings/studentList");
        // setBreadcrumbs([]);
      },
    },
  ];

  const genders = ["Male", "Female", "Non-binary", "Prefer not to respond"];
  const courses = ["Mern", "Mean"];
  const mentors = ["Ram", "Sam", "Vish"];
  const durations = ["2", "3", "6"];

  return (
    <>
      <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />
      <Form
        noValidate
        className="p-4 sm:p-6 lg:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card className="shadow mb-4">
          <Card.Header className="font-poppins text-lg font-medium">
            Personal Details
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-4 gap-4">
              <TextField
                label="First Name"
                variant="outlined"
                size="small"
                required
                error={!!errors.personalDetails?.firstName}
                className="col-span-2"
                helperText={errors.personalDetails?.firstName?.message}
                {...register("personalDetails.firstName", { required: "Required" })}
              />

              <TextField
                label="Last Name"
                // type="password"
                variant="outlined"
                size="small"
                required
                error={!!errors.personalDetails?.lastName}
                className="col-span-2"
                helperText={errors.personalDetails?.lastName?.message}
                {...register("personalDetails.lastName", { required: "Required" })}
              />
              <TextField
                label="PhoneNumber"
                variant="outlined"
                size="small"
                required
                error={!!errors.personalDetails?.phoneNumber}
                className="col-span-2"
                helperText={errors.personalDetails?.phoneNumber?.message}
                {...register("personalDetails.phoneNumber", {
                  required: "Required",
                  minLength: { value: 10, message: "Must be 10 digits" },
                  maxLength: { value: 10, message: "Must be 10 digits" },
                })}
              />
              <TextField
                label="DOB"
                variant="outlined"
                size="small"
                required
                error={!!errors.personalDetails?.dateOfBirth}
                className="col-span-2"
                helperText={errors.personalDetails?.dateOfBirth?.message}
                {...register("personalDetails.dateOfBirth", {
                  required: "Required",
                })}
              />

              <div className="flex-auto">
                <label htmlFor="buttondisplay" className="font-bold block mb-2">
                  Icon Display
                </label>

                <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
              </div>


              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                    setValue("personalDetails.dob", newValue, { shouldValidate: true });
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>

              {/* hidden input that React Hook Form registers */}
              <input type="hidden" {...register("personalDetails.dob")} />
            </div>

            <Row className="mb-3">
              {/* <Form.Group as={Col} md="6" controlId="personalDetails.firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errors.personalDetails?.firstName}
                  {...register("personalDetails.firstName", {
                    required: "Required",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.personalDetails?.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group> */}

              {/* <Form.Group as={Col} md="6" controlId="personalDetails.lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  isInvalid={!!errors.personalDetails?.lastName}
                  {...register("personalDetails.lastName", {
                    required: "Required",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.personalDetails?.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
            </Row>
            <Row className="mb-3">
              {/* <Form.Group
                as={Col}
                md="4"
                controlId="personalDetails.phoneNumber"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Phone Number"
                  isInvalid={!!errors.personalDetails?.phoneNumber}
                  {...register("personalDetails.phoneNumber", {
                    required: "Required",
                    minLength: { value: 10, message: "Must be 10 digits" },
                    maxLength: { value: 10, message: "Must be 10 digits" },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.personalDetails?.phoneNumber?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              <Form.Group
                as={Col}
                md="4"
                controlId="personalDetails.dateOfBirth"
              >
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  isInvalid={!!errors.personalDetails?.dateOfBirth}
                  {...register("personalDetails.dateOfBirth", {
                    required: "Required",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.personalDetails?.dateOfBirth?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="personalDetails.gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  defaultValue=""
                  isInvalid={!!errors.personalDetails?.gender}
                  {...register("personalDetails.gender", {
                    required: "Required",
                  })}
                >
                  <option value="">Select</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.role?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="personalDetails.city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errors.personalDetails?.city}
                  {...register("personalDetails.city")}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="personalDetails.state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errors.personalDetails?.state}
                  {...register("personalDetails.state")}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="personalDetails.zip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errors.personalDetails?.zip}
                  {...register("personalDetails.zip", {
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Zip must be 6 digits",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.personalDetails?.zip?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

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
          <Card.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="courseDetails.course">
                <Form.Label>Course</Form.Label>
                <Form.Select
                  defaultValue=""
                  isInvalid={!!errors.courseDetails?.course}
                  {...register("courseDetails.course", {
                    required: "Required",
                  })}
                >
                  <option value="">Select</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.courseDetails?.course?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="mentor">
                <Form.Label>Mentor</Form.Label>
                <Form.Select
                  defaultValue=""
                  isInvalid={!!errors.courseDetails?.mentor}
                  {...register("courseDetails.mentor", {
                    required: "Required",
                  })}
                >
                  <option value="">Select</option>
                  {mentors.map((mentor, index) => (
                    <option key={index} value={mentor}>
                      {mentor}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.courseDetails?.mentor?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="courseDetails.duration">
                <Form.Label>Duration</Form.Label>
                <Form.Select
                  defaultValue=""
                  isInvalid={!!errors.courseDetails?.duration}
                  {...register("courseDetails.duration", {
                    required: "Required",
                  })}
                >
                  <option value="">Select</option>
                  {durations.map((duration, index) => (
                    <option key={index} value={duration}>
                      {duration}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.courseDetails?.duration?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* <div className="mt-5">
                <Button type="submit">Submit</Button>
                <Button
                  className="mx-2"
                  type="button"
                  onClick={() => {
                    navigate("/settings/studentList");
                    setBreadcrumbs([]);
                  }}
                >
                  Cancel
                </Button>
              </div> */}
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

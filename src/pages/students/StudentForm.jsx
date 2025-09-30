import Card from "react-bootstrap/Card";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { duration } from "@mui/material/styles";
import BreadCrumbaBtn from "../../components/BreadCrumbaBtn";
import Breadcrumb from "../../components/BreadCrumbaBtn";

export default function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
  const { setBreadcrumbs, setSideNavButtons } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setBreadcrumbs([
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
    ]);

    setSideNavButtons([
      {
        label: "Save",
        onClick: () => {
          console.log("Saving student...");
          // trigger submit logic here
        },
      },
      {
        label: "Cancel",
        onClick: () => {
          console.log("Cancel clicked");
          // maybe navigate back

          onSubmit();
        },
      },
    ]);
  }, []);

  const genders = ["Male", "Female", "Non-binary", "Prefer not to respond"];
  const courses = ["Mern", "Mean"];
  const mentors = ["Ram", "Sam", "Vish"];
  const durations = ["2", "3", "6"];

  const onSubmit = (data) => {
    console.log(data);

    // if (id) {
    //   console.log(data, id);
    //   dispatch(updateTeacher({ id, data }));
    //   reset();
    //   setBreadcrumbs([]);
    //   navigate("/settings/teachersList");
    // } else {
    //   createTeacherApi(data);
    //   setBreadcrumbs([]);
    //   reset();
    //   navigate("/settings/teachersList");
    // }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Students", path: "/students" },
          { label: "Add Student" },
        ]}
      />
      <Form
        noValidate
        className="p-4 sm:p-6 lg:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card className="shadow">
          <Card.Header className="font-poppins text-lg font-medium">
            Personal Details
          </Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="personalDetails.firstName">
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
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="personalDetails.lastName">
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
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
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
              </Form.Group>
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

              <div className="mt-5">
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
              </div>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

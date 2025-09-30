import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { createTeacherApi } from "../../express/api/TeachersApi";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import { useEffect } from "react";
import {
  fetchTeacherById,
  fetchTeachers,
  updateTeacher,
} from "../../express/redux/TeachersSlice";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/BreadCrumbaBtn";

export default function TeachersForm() {
  const { selectedTeacher, loading, error } = useSelector(
    (state) => state.teachers
  );

  const roles = [
    "Admin",
    "Principal",
    "Management Staff",
    "Teacher",
    "Accountant",
    "Store Manager",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      dateOfJoin: new Date().toISOString().split("T")[0],
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setBreadcrumbs } = useOutletContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Home",
        href: "/",
        // onClick: (e) => {
        //   e.preventDefault();
        //   console.log("Clicked Home");
        // },
      },
      {
        label: "List",
        href: "././teachersList",
      },
      {
        label: "Form",
      },
    ]);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchTeacherById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedTeacher) {
      reset({
        firstName: selectedTeacher.firstName,
        lastName: selectedTeacher.lastName,
        phoneNumber: selectedTeacher.phoneNumber,
        dateOfJoin: selectedTeacher.dateOfJoin
          ? new Date(selectedTeacher.dateOfJoin).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        role: selectedTeacher.role,
        city: selectedTeacher.city,
        state: selectedTeacher.state,
        zip: selectedTeacher.zip,
      });
    }
  }, [selectedTeacher, reset]);

  const onSubmit = (data) => {
    if (id) {
      console.log(data, id);
      dispatch(updateTeacher({ id, data }));
      reset();
      setBreadcrumbs([]);
      navigate("/settings/teachersList");
    } else {
      createTeacherApi(data);
      setBreadcrumbs([]);
      reset();
      navigate("/settings/teachersList");
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Students", path: "/students" },
          { label: "Add Student" },
        ]}
      />

      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="shadow">
          <Card.Header className="font-poppins text-lg font-medium">
            General Details
          </Card.Header>
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="firstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.firstName}
                    {...register("firstName", { required: "Required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="lastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.lastName}
                    {...register("lastName", { required: "Required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    isInvalid={!!errors.phoneNumber}
                    {...register("phoneNumber", {
                      required: "Required",
                      minLength: { value: 10, message: "Must be 10 digits" },
                      maxLength: { value: 10, message: "Must be 10 digits" },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="dateOfJoin">
                  <Form.Label>Date of Joining</Form.Label>
                  <Form.Control
                    type="date"
                    isInvalid={!!errors.dateOfJoin}
                    {...register("dateOfJoin", { required: "Required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateOfJoin?.message}
                  </Form.Control.Feedback>
                </Form.Group>

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
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.city}
                    {...register("city")}
                  />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.state}
                    {...register("state")}
                  />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="zip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.zip}
                    {...register("zip", {
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Zip must be 6 digits",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.zip?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>

              <Button type="submit">Submit</Button>
              <Button
                className="mx-2"
                type="button"
                onClick={() => {
                  navigate("/settings/teachersList");
                  setBreadcrumbs([]);
                }}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

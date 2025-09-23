import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { createTeacherApi } from "../../express/api/TeachersApi";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

export default function TeachersForm() {
  const roles = [
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
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createTeacherApi(data);
    reset();
    navigate("/settings/teachersList");
  };

  return (
    <>
      <Card className="mb-3">
        {/* <Card.Header>Header</Card.Header> */}
        <Card.Body>This is some text within a card body.</Card.Body>
      </Card>
      <Card className="shadow">
        <Card.Header className="font-poppins text-lg font-medium">General Details</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
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
                  placeholder="Last name"
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
                  placeholder="Phone Number"
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
                  placeholder="City"
                  isInvalid={!!errors.city}
                  {...register("city")}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  isInvalid={!!errors.state}
                  {...register("state")}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="zip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
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
              onClick={() => navigate("/settings/teachersList")}
            >
              Back
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* <div className="bg-white m-10 p-4 shadow-2xl rounded"> */}
      {/* <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
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
                placeholder="Last name"
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
                placeholder="Phone Number"
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
                placeholder="City"
                isInvalid={!!errors.city}
                {...register("city")}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                isInvalid={!!errors.state}
                {...register("state")}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="zip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
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
            onClick={() => navigate("/settings/teachersList")}
          >
            Back
          </Button>
        </Form> */}
      {/* </div> */}
    </>
  );
}

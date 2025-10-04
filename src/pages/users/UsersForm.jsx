import { useForm } from "react-hook-form";
import { Col, Form, Row } from "react-bootstrap";
// import { createUserApi } from "../../express/api/UsersApi";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import BreadcrumbNav from "../../components/bredCrumbs/BredCrumb";
import { useEffect, useState } from "react";
import {
  fetchUserById,
  fetchUsers,
  updateUser,
} from "../../express/redux/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { createUserApi } from "../../express/api/UsersApi";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

export default function UsersForm() {
  const { selectedUser, loading, error } = useSelector(
    (state) => state.users
  );

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
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      dateOfJoin: new Date().toISOString().split("T")[0],
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
   const permissionValues = watch("permission");

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      reset({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
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
  }, [selectedUser, reset]);

  const onSubmit = (data) => {
    console.log(data);
    
    if (id) {
      console.log(data, id);
      dispatch(updateUser({ id, data }));
      reset();
      navigate("/settings/usersList");
    } else {
      createUserApi(data);
      reset();
      navigate("/settings/usersList");
    }
  };

     const atLeastOneChecked = (value) => {
      console.log(value);
      
    return Object.values(permissionValues).some(Boolean) || "At least one permission is required";
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
      onClick: handleSubmit(onSubmit)
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

    if (e.checked)
      _ingredients.push(e.value);
    else
      _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  }

  return (
    <>
      <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />

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

              {/* <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group> */}

        <FormControl component="fieldset" 
        error={!!errors.permission }>
        <FormLabel component="legend">Department Permission</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox {...register("permission.enquiry", { validate: atLeastOneChecked })} />}
            label="Enquiry"
            labelPlacement="end"
            className="col-span-1"
          />
          <FormControlLabel
            control={<Checkbox {...register("permission.enrollment", { validate: atLeastOneChecked })} />}
            label="Enrollment"
            labelPlacement="end"
            className="col-span-1"
          />
          <FormControlLabel
            control={<Checkbox {...register("permission.attendance")} />}
            label="Attendance"
            labelPlacement="end"
            className="col-span-1"
          />
          <FormControlLabel
            control={<Checkbox {...register("permission.staff", { validate: atLeastOneChecked })} />}
            label="Staff"
            labelPlacement="end"
            className="col-span-1"
          />
          <FormControlLabel
            control={<Checkbox {...register("permission.placement", { validate: atLeastOneChecked })} />}
            label="Placement"
            labelPlacement="end"
            className="col-span-1"
          />
          <FormControlLabel
            control={<Checkbox {...register("permission.report", {validate: atLeastOneChecked })} />}
            label="Report"
            labelPlacement="end"
            className="col-span-1"
          />
           {errors.permission && (
          <FormHelperText>{errors.permission.message}sd</FormHelperText>
        )}
        </FormGroup>
      </FormControl>

              {/* <Button type="submit">Submit</Button>
              <Button
                className="mx-2"
                type="button"
                onClick={() => {
                  navigate("/settings/usersList");
                  setBreadcrumbs([]);
                }}
              >
                Cancel
              </Button> */}


            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

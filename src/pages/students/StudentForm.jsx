import Card from "react-bootstrap/Card";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function StudentForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { setBreadcrumbs } = useOutletContext();
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
                label: "Form",
            },
        ]);
    }, []);

    const genders = [
        "Male",
        "Female",
        "Non-binary",
        "Prefer not to respond",
    ];

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
            <Card className="shadow">
                <Card.Header className="font-poppins text-lg font-medium">
                    Personal Details
                </Card.Header>
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
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
                            <Form.Group as={Col} md="4" controlId="dateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    isInvalid={!!errors.dateOfBirth}
                                    {...register("dateOfBirth", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dateOfBirth?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                    defaultValue=""
                                    isInvalid={!!errors.gender}
                                    {...register("gender", { required: "Required" })}
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
                                Back
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
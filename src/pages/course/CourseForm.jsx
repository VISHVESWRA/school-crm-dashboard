import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function CourseForm() {
    const { setBreadcrumbs } = useOutletContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const genders = [
        "Male",
        "Female",
        "Non-binary",
        "Non-binary",
        "Prefer not to respond",
    ];

    useEffect(() => {
        setBreadcrumbs([
            {
                label: "Home",
                href: "/",
            },
            {
                label: "List",
                href: "././courseList",
            },
            {
                label: "Form",
            },
        ]);
    }, []);

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
                    General Details
                </Card.Header>
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="courseName">
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={!!errors.courseName}
                                    {...register("courseName", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.courseName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* <Form.Group as={Col} md="6" controlId="lastName">
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
                            </Form.Group> */}
                        </Row>
                        {/* 
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
                        </Row> */}
                        <Button type="submit">Submit</Button>
                        <Button
                            className="mx-2"
                            type="button"
                            onClick={() => {
                                navigate("/settings/courseList");
                                setBreadcrumbs([]);
                            }}
                        >
                            Back
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';

export default function TeachersForm() {

    const [validated, setValidated] = useState(false);

    const roles = [
        "Principal",
        "Management Staff",
        "Teacher",
        "Accountant",
        "Store Manager"
    ];

    const onSubmit = (data) => {
        console.log(data);
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        // setValidated(true);
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            dateOfJoin: new Date().toISOString().split("T")[0], // <-- today's date
        },
    });

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            {...register('firstName', {
                                required: 'Required'
                            })}
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            {...register('lastName', {
                                required: 'Required'
                            })}
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className='mb-3'>
                    <Form.Group as={Col} md="4" controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Phone Number"
                            {...register("phoneNumber", {
                                required: "Required",
                                minLength: {
                                    value: 10,
                                    message: "Phone number must be at least 10 digits"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Phone number must be 10 digits only"
                                }
                            })}
                            isInvalid={!!errors.phoneNumber}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.phoneNumber?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="dateOfJoin">
                        <Form.Label>Date of Joining</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("dateOfJoin", {
                                required: "Required"
                            })}
                            isInvalid={!!errors.dateOfJoin}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateOfJoin?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="role">
                        <Form.Label>Role</Form.Label>

                        <Form.Select
                            {...register("role", { required: "Role is required" })}
                            isInvalid={!!errors.role}
                            defaultValue=""
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
                            {...register("city")}
                            isInvalid={!!errors.city}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                            {errors.city?.message}
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="State"
                            {...register("state")}
                            isInvalid={!!errors.state}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                            {errors.state?.message}
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="zip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Zip"
                            {...register("zip", {

                                pattern: {
                                    value: /^[0-9]{6}$/,
                                    message: "Zip must be 6 digits",
                                },
                            })}
                            isInvalid={!!errors.zip}
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
                <Button type="submit">Submit form</Button>
            </Form>
        </>
    )
}
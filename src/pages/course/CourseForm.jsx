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

  const modes = ["Online", "Offline", "Hybrid"];
  const durations = ["2", "3", "6"];
  const mentors = ["Vish", "Sam", "Ram"];

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
        label: "Course Form",
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

              <Form.Group as={Col} md="6" controlId="courseFees">
                <Form.Label>Course Fees</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errors.courseFees}
                  {...register("courseFees", { required: "Required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.courseFees?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="mode">
                <Form.Label>Mode</Form.Label>
                <Form.Select
                  defaultValue=""
                  isInvalid={!!errors.mode}
                  {...register("mode", { required: "Required" })}
                >
                  <option value="">Select</option>
                  {modes.map((mode, index) => (
                    <option key={index} value={mode}>
                      {mode}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.mode?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="duration">
                <Form.Label>Duration</Form.Label>
                <Form.Select
                  defaultValue=""
                  isInvalid={!!errors.duration}
                  {...register("duration", { required: "Required" })}
                >
                  <option value="">Select</option>
                  {durations.map((duration, index) => (
                    <option key={index} value={duration}>
                      {duration}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.duration?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="mentor">
                <Form.Label>Mentor</Form.Label>
                <Form.Select
                  defaultValue=""
                  isInvalid={!!errors.mentor}
                  {...register("mentor", { required: "Required" })}
                >
                  <option value="">Select</option>
                  {mentors.map((mentor, index) => (
                    <option key={index} value={mentor}>
                      {mentor}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.mentor?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {/* 
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
  );
}
``;

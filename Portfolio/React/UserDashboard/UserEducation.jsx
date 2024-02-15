import { Form, Field, ErrorMessage, FieldArray, Formik } from "formik";
import React from "react";
import { Col, Row, Button, FloatingLabel } from "react-bootstrap";
import dashboardSchema from "../../../schema/dashboardSchema";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { updateEducation } from "services/profileDetailsService";

const UserEducation = (props) => {
  const { degreeTypes, educationDetails } = props;

  const _logger = debug.extend("UserEd");

  const handleSubmit = (values) => {
    _logger("UPDATE VALUES", values);
    let payload = values.educationDetails;
    updateEducation(payload);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ educationDetails }}
      onSubmit={handleSubmit}
      validationSchema={dashboardSchema.educationSchema}
    >
      {({ values }) => (
        <Form>
          <Row>
            <Col md={10} sm={12}>
              <h4 className="mb-0">Education Details</h4>
            </Col>
            <Col md={2} sm={12}>
              <Button variant="primary" type="submit" className="my-2">
                Edit
              </Button>
            </Col>
          </Row>
          <FieldArray name="educationDetails">
            {/* {({ push, remove }) => ( */}
            <div>
              {/* <Button
                  type="button"
                  className="btn btn-primary my-3"
                  onClick={() =>
                    push({
                      degreeTypeId: "",
                      major: "",
                      instituteName: "",
                      startDate: "",
                      endDate: "",
                      gpa: "",
                      percentage: "",
                    })
                  }
                >
                  Add
                </Button> */}
              {values.educationDetails &&
                values.educationDetails.map((item, index) => (
                  <Row key={`education_${index}`}>
                    <Col md={6} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Degree Type"
                      >
                        <Field
                          component="select"
                          name={`educationDetails[${index}].degreeTypeId`}
                          className="form-control"
                        >
                          {degreeTypes}
                        </Field>
                      </FloatingLabel>
                      <ErrorMessage
                        name={`educationDetails[${index}].degreeTypeId`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={6} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Major"
                      >
                        <Field
                          type="text"
                          name={`educationDetails[${index}].major`}
                          className="form-control"
                          placeholder="Major"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`educationDetails[${index}].major`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={12} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Institute Name"
                      >
                        <Field
                          type="text"
                          name={`educationDetails[${index}].instituteName`}
                          className="form-control"
                          placeholder="Institute Name"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`educationDetails[${index}].instituteName`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={3} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Start Date"
                      >
                        <Field
                          type="text"
                          name={`educationDetails[${index}].startDate`}
                          className="form-control"
                          placeholder="yyyy/MM/dd"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`educationDetails[${index}].startDate`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={3} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="End Date"
                      >
                        <Field
                          type="text"
                          name={`educationDetails[${index}].endDate`}
                          className="form-control"
                          placeholder="yyyy/MM/dd"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`educationDetails[${index}].endDate`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={3} sm={12} className="mb-3">
                      <FloatingLabel controlId="floatingInputGrid" label="GPA">
                        <Field
                          type="text"
                          name={`educationDetails[${index}].gpa`}
                          className="form-control"
                          placeholder="GPA"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`educationDetails[${index}].gpa`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={3} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Percentage"
                      >
                        <Field
                          type="text"
                          name={`educationDetails[${index}].percentage`}
                          className="form-control"
                          placeholder="Percentage"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`educationDetails[${index}].percentage`}
                        component="div"
                        className="has-error"
                      />
                    </Col>
                    <Col>
                      {/* <button
                          className="btn btn-danger mb-3"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button> */}
                      <hr />
                    </Col>
                  </Row>
                ))}
            </div>
            {/* )} */}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

UserEducation.propTypes = {
  degreeTypes: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        value: PropTypes.number.isRequired,
        children: PropTypes.string.isRequired,
      }),
    })
  ),
  educationDetails: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
      degreeTypeId: PropTypes.number,
      gpa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      instituteName: PropTypes.string.isRequired,
      major: PropTypes.string.isRequired,
      percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      startDate: PropTypes.string.isRequired,
    })
  ),
};

export default UserEducation;

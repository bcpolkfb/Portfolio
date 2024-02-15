import { Form, Field, ErrorMessage, FieldArray, Formik } from "formik";
import React from "react";
import { Col, Row, Button, FloatingLabel } from "react-bootstrap";
import dashboardSchema from "../../../schema/dashboardSchema";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { updateExperience } from "services/profileDetailsService";

const UserExperience = (props) => {
  const { states, professionalDetails } = props;

  const _logger = debug.extend("UserExp");

  const handleSubmit = (values) => {
    _logger("UPDATE VALUES", values);
    let payload = values.professionalDetails;
    updateExperience(payload);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ professionalDetails }}
      onSubmit={handleSubmit}
      validationSchema={dashboardSchema.professionalDetailsSchema}
    >
      {({ values }) => (
        <Form>
          <Row>
            <Col md={10} sm={12}>
              <h4 className="mb-0">Professional Details</h4>
            </Col>
            <Col md={2} sm={12}>
              <Button variant="primary" type="submit" className="my-2">
                Edit
              </Button>
            </Col>
          </Row>
          <FieldArray name="professionalDetails">
            {/* {({ push, remove }) => ( */}
            <div>
              {/* <Button
                  type="button"
                  className="btn btn-primary my-3"
                  onClick={() =>
                    push({
                      isCurrent: false,
                      startDate: "",
                      endDate: "",
                      jobTitle: "",
                      companyName: "",
                      city: "",
                      state: "",
                      country: "",
                      description: "",
                    })
                  }
                >
                  Add
                </Button> */}
              {values.professionalDetails &&
                values.professionalDetails.map((item, index) => (
                  <Row key={`experience_${index}`}>
                    <Col md={3} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Start Date"
                      >
                        <Field
                          type="text"
                          name={`professionalDetails[${index}].startDate`}
                          className="form-control"
                          placeholder="yyyy/MM/dd"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`professionalDetails[${index}].startDate`}
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
                          name={`professionalDetails[${index}].endDate`}
                          className="form-control"
                          placeholder="yyyy/MM/dd"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`professionalDetails[${index}].endDate`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={6} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Job Title"
                      >
                        <Field
                          type="text"
                          name={`professionalDetails[${index}].jobTitle`}
                          className="form-control"
                          placeholder="Job Title"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`professionalDetails[${index}].jobTitle`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={12} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Company Name"
                      >
                        <Field
                          type="text"
                          name={`professionalDetails[${index}].companyName`}
                          className="form-control"
                          placeholder="Company Name"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`professionalDetails[${index}].companyName`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={4} sm={12} className="mb-3">
                      <FloatingLabel controlId="floatingInputGrid" label="City">
                        <Field
                          type="text"
                          name={`professionalDetails[${index}].city`}
                          className="form-control"
                          placeholder="City"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`professionalDetails[${index}].city`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={4} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="State"
                      >
                        <Field
                          component="select"
                          name={`professionalDetails[${index}].stateId`}
                          className="form-control"
                        >
                          {states}
                        </Field>
                      </FloatingLabel>
                      <ErrorMessage
                        name={`professionalDetails[${index}].stateId`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={4} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Country"
                      >
                        <Field
                          type="text"
                          name={`professionalDetails[${index}].country`}
                          className="form-control"
                          placeholder="Country"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`professionalDetails[${index}].country`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={12} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Job Description"
                      >
                        <Field
                          type="textarea"
                          name={`professionalDetails[${index}].description`}
                          className="form-control"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`professionalDetails[${index}].description`}
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

UserExperience.propTypes = {
  states: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        value: PropTypes.number.isRequired,
        children: PropTypes.string.isRequired,
      }),
    })
  ),
  professionalDetails: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
      startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      jobTitle: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      stateId: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default UserExperience;

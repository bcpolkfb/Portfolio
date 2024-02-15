import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Field, ErrorMessage, withFormik, FieldArray } from "formik";
import { Card } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import profileSchema from "./profileSchema";

const EducationDetails = (props) => {
  const {
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
    nextLabel,
    onBack,
    onNext,
    backLabel,
    mappedDegreeTypes,
  } = props;

  return (
    <Fragment>
      <div className="container">
        <Card className="mb-3 shadow">
          <div className="border-bottom px-4 card-header">
            <h4 className="mb-0">Education Details</h4>
          </div>
          <Card.Body>
            <Form id="regForm" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <FieldArray name="educationDetails">
                  {({ push, remove }) => (
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary my-3"
                        onClick={() =>
                          push({
                            Major: "",
                            InstituteName: "",
                            StartDate: "",
                            EndDate: "",
                            GPA: "",
                            DegreeTypeId: "",
                            Percentage: "",
                          })
                        }>
                        Add
                      </button>
                      {values.educationDetails &&
                        values.educationDetails.map((education, index) => (
                          <div className="row" key={index}>
                            <div className="col-6">
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="DegreeTypeId">
                                  <Field
                                    component="select"
                                    className={`form-control ${
                                      errors.educationDetails &&
                                      errors.educationDetails[index] &&
                                      errors.educationDetails[index].DegreeTypeId &&
                                      touched.educationDetails &&
                                      touched.educationDetails[index] &&
                                      touched.educationDetails[index].DegreeTypeId &&
                                      "is-invalid"
                                    }`}
                                    id={`educationDetails[${index}].DegreeTypeId`}
                                    name={`educationDetails[${index}].DegreeTypeId`}
                                    value={education.DegreeTypeId}
                                    onChange={handleChange}>
                                    <option value="">Select DegreeTypeId</option>
                                    {mappedDegreeTypes}
                                  </Field>
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`educationDetails[${index}].DegreeTypeId`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Major">
                                  <label htmlFor="Major" />
                                  <Field
                                    className={`form-control ${
                                      errors.educationDetails &&
                                      errors.educationDetails[index] &&
                                      errors.educationDetails[index].Major &&
                                      touched.educationDetails &&
                                      touched.educationDetails[index] &&
                                      touched.educationDetails[index].Major &&
                                      "is-invalid"
                                    }`}
                                    value={education.Major}
                                    name={`educationDetails[${index}].Major`}
                                    id={`educationDetails[${index}].Major`}
                                    onChange={handleChange}
                                    placeholder={""}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`educationDetails[${index}].Major`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Institute Name">
                                  <Field
                                    className={`form-control ${
                                      errors.educationDetails &&
                                      errors.educationDetails[index] &&
                                      errors.educationDetails[index].InstituteName &&
                                      touched.educationDetails &&
                                      touched.educationDetails[index] &&
                                      touched.educationDetails[index].InstituteName &&
                                      "is-invalid"
                                    }`}
                                    value={education.InstituteName}
                                    name={`educationDetails[${index}].InstituteName`}
                                    id={`educationDetails[${index}].InstituteName`}
                                    onChange={handleChange}
                                    placeholder={""}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`educationDetails[${index}].InstituteName`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Start Date">
                                  <Field
                                    className={`form-control ${
                                      errors.educationDetails &&
                                      errors.educationDetails[index] &&
                                      errors.educationDetails[index].StartDate &&
                                      touched.educationDetails &&
                                      touched.educationDetails[index] &&
                                      touched.educationDetails[index].StartDate &&
                                      "is-invalid"
                                    }`}
                                    id={`educationDetails[${index}].StartDate`}
                                    name={`educationDetails[${index}].StartDate`}
                                    placeholder="Example: 2023-12-31"
                                    value={education.StartDate}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`educationDetails[${index}].StartDate`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="End Date">
                                  <Field
                                    className={`form-control ${
                                      errors.educationDetails &&
                                      errors.educationDetails[index] &&
                                      errors.educationDetails[index].EndDate &&
                                      touched.educationDetails &&
                                      touched.educationDetails[index] &&
                                      touched.educationDetails[index].EndDate &&
                                      "is-invalid"
                                    }`}
                                    id={`educationDetails[${index}].EndDate`}
                                    name={`educationDetails[${index}].EndDate`}
                                    placeholder="Example: 2023-12-31"
                                    value={education.EndDate}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`educationDetails[${index}].EndDate`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="GPA">
                                  <Field
                                    className={`form-control ${
                                      errors.educationDetails &&
                                      errors.educationDetails[index] &&
                                      errors.educationDetails[index].GPA &&
                                      touched.educationDetails &&
                                      touched.educationDetails[index] &&
                                      touched.educationDetails[index].GPA &&
                                      "is-invalid"
                                    }`}
                                    id={`educationDetails[${index}].GPA`}
                                    name={`educationDetails[${index}].GPA`}
                                    placeholder="Example: 2023-12-31"
                                    value={education.GPA}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`educationDetails[${index}].GPA`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Percentage">
                                  <Field
                                    className={`form-control ${
                                      errors.educationDetails &&
                                      errors.educationDetails[index] &&
                                      errors.educationDetails[index].Percentage &&
                                      touched.educationDetails &&
                                      touched.educationDetails[index] &&
                                      touched.educationDetails[index].Percentage &&
                                      "is-invalid"
                                    }`}
                                    id={`educationDetails[${index}].Percentage`}
                                    name={`educationDetails[${index}].Percentage`}
                                    placeholder="Example: 2023-12-31"
                                    value={education.Percentage}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`educationDetails[${index}].Percentage`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="col-2">
                                <button
                                  type="button"
                                  className="btn btn-danger mb-3"
                                  onClick={() => remove(index)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </FieldArray>
                <div>
                  <div>
                    <button
                      type="submit"
                      id="nextBtn"
                      onClick={onNext}
                      className="btn btn-success btn-secondary float-end mt-3">
                      {nextLabel}
                    </button>
                    <button
                      type="submit"
                      id="prevBtn"
                      onClick={onBack}
                      className="btn btn-success btn-secondary float-end me-2 mt-3">
                      {backLabel}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

EducationDetails.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  setFieldValue: PropTypes.func,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  touched: PropTypes.func,
  values: PropTypes.func,
  errors: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  mappedDegreeTypes: PropTypes.arrayOf(PropTypes.shape({})),
  EducationDetails: PropTypes.arrayOf(
    PropTypes.shape({
      DegreeTypeId: PropTypes.number.isRequired,
      Major: PropTypes.string.isRequired,
      InstituteName: PropTypes.string.isRequired,
      StartDate: PropTypes.string.isRequired,
      EndDate: PropTypes.string.isRequired,
      GPA: PropTypes.string.isRequired,
      Percentage: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    educationDetails: props.educationDetails || [],
  }),

  validationSchema: profileSchema.educationSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      EducationDetails: values.educationDetails,
    });
  },
})(EducationDetails);

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Field, ErrorMessage, withFormik, FieldArray } from "formik";
import { Card } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import profileSchema from "./profileSchema";

const ProfessionalDetails = (props) => {
  const {
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
    nextLabel,
    onBack,
    backLabel,
    states,
  } = props;

  return (
    <Fragment>
      <div className="container">
        <Card className="mb-3 shadow">
          <div className="border-bottom px-4 card-header">
            <h4 className="mb-0">Professional Details</h4>
          </div>
          <Card.Body>
            <Form id="regForm" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <FieldArray name="professionalDetails">
                  {({ push, remove }) => (
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary my-3"
                        onClick={() =>
                          push({
                            IsCurrent: "",
                            StartDate: "",
                            EndDate: "",
                            JobTitle: "",
                            CompanyName: "",
                            City: "",
                            StateId: "",
                            Country: "",
                            Description: "",
                          })
                        }>
                        Add
                      </button>
                      {values.professionalDetails &&
                        values.professionalDetails.map((experience, index) => (
                          <div className="row" key={index}>
                            <div className="col-6">
                              <div className="form-group mb-3">
                                <label htmlFor="IsCurrent" className="text-gray-500 font-bold">
                                  <Field
                                    name="IsCurrent"
                                    className="mr-2 leading-tight"
                                    type="checkbox"
                                  />
                                  <span className="text-sm">Current Job</span>
                                </label>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].IsCurrent`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Start Date">
                                  <label htmlFor="StartDate" />
                                  <Field
                                    className={`form-control ${
                                      errors.professionalDetails &&
                                      errors.professionalDetails[index] &&
                                      errors.professionalDetails[index].StartDate &&
                                      touched.professionalDetails &&
                                      touched.professionalDetails[index] &&
                                      touched.professionalDetails[index].StartDate &&
                                      "is-invalid"
                                    }`}
                                    value={experience.StartDate}
                                    name={`professionalDetails[${index}].StartDate`}
                                    id={`professionalDetails[${index}].StartDate`}
                                    onChange={handleChange}
                                    placeholder={""}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].StartDate`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="End Date">
                                  <Field
                                    className={`form-control ${
                                      errors.professionalDetails &&
                                      errors.professionalDetails[index] &&
                                      errors.professionalDetails[index].EndDate &&
                                      touched.professionalDetails &&
                                      touched.professionalDetails[index] &&
                                      touched.professionalDetails[index].EndDate &&
                                      "is-invalid"
                                    }`}
                                    value={experience.EndDate}
                                    name={`professionalDetails[${index}].EndDate`}
                                    id={`professionalDetails[${index}].EndDate`}
                                    onChange={handleChange}
                                    placeholder={""}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].EndDate`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Job Title">
                                  <Field
                                    className={`form-control ${
                                      errors.professionalDetails &&
                                      errors.professionalDetails[index] &&
                                      errors.professionalDetails[index].JobTitle &&
                                      touched.professionalDetails &&
                                      touched.professionalDetails[index] &&
                                      touched.professionalDetails[index].JobTitle &&
                                      "is-invalid"
                                    }`}
                                    id={`professionalDetails[${index}].JobTitle`}
                                    name={`professionalDetails[${index}].JobTitle`}
                                    placeholder="Example: 2023-12-31"
                                    value={experience.JobTitle}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].JobTitle`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Company Name">
                                  <Field
                                    className={`form-control ${
                                      errors.professionalDetails &&
                                      errors.professionalDetails[index] &&
                                      errors.professionalDetails[index].CompanyName &&
                                      touched.professionalDetails &&
                                      touched.professionalDetails[index] &&
                                      touched.professionalDetails[index].CompanyName &&
                                      "is-invalid"
                                    }`}
                                    id={`professionalDetails[${index}].CompanyName`}
                                    name={`professionalDetails[${index}].CompanyName`}
                                    placeholder="Example: 2023-12-31"
                                    value={experience.CompanyName}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].CompanyName`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="City">
                                  <Field
                                    className={`form-control ${
                                      errors.professionalDetails &&
                                      errors.professionalDetails[index] &&
                                      errors.professionalDetails[index].City &&
                                      touched.professionalDetails &&
                                      touched.professionalDetails[index] &&
                                      touched.professionalDetails[index].City &&
                                      "is-invalid"
                                    }`}
                                    id={`professionalDetails[${index}].City`}
                                    name={`professionalDetails[${index}].City`}
                                    placeholder="Example: 2023-12-31"
                                    value={experience.City}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].City`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="State">
                                  <Field
                                    component="select"
                                    className={`form-control ${
                                      errors.professionalDetails &&
                                      errors.professionalDetails[index] &&
                                      errors.professionalDetails[index].StateId &&
                                      touched.professionalDetails &&
                                      touched.professionalDetails[index] &&
                                      touched.professionalDetails[index].StateId &&
                                      "is-invalid"
                                    }`}
                                    id={`professionalDetails[${index}].StateId`}
                                    name={`professionalDetails[${index}].StateId`}
                                    value={experience.StateId}
                                    onChange={handleChange}>
                                    <option value="">Select State</option>
                                    {states}
                                  </Field>
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].State`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Country">
                                  <Field
                                    className={`form-control ${
                                      errors.professionalDetails &&
                                      errors.professionalDetails[index] &&
                                      errors.professionalDetails[index].Country &&
                                      touched.professionalDetails &&
                                      touched.professionalDetails[index] &&
                                      touched.professionalDetails[index].Country &&
                                      "is-invalid"
                                    }`}
                                    id={`professionalDetails[${index}].Country`}
                                    name={`professionalDetails[${index}].Country`}
                                    placeholder="Example: 2023-12-31"
                                    value={experience.Country}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].Country`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Description">
                                  <Field
                                    className={`form-control ${
                                      errors.professionalDetails &&
                                      errors.professionalDetails[index] &&
                                      errors.professionalDetails[index].Description &&
                                      touched.professionalDetails &&
                                      touched.professionalDetails[index] &&
                                      touched.professionalDetails[index].Description &&
                                      "is-invalid"
                                    }`}
                                    id={`professionalDetails[${index}].Description`}
                                    name={`professionalDetails[${index}].Description`}
                                    placeholder="Example: 2023-12-31"
                                    value={experience.Description}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`professionalDetails[${index}].Description`}
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

ProfessionalDetails.propTypes = {
  setFieldValue: PropTypes.func,
  nextLabel: PropTypes.string,
  touched: PropTypes.func,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  values: PropTypes.func,
  errors: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  states: PropTypes.number,
  acceptedGenders: PropTypes.number,
  professionalDetails: PropTypes.arrayOf(
    PropTypes.shape({
      IsCurrent: PropTypes.bool.isRequired,
      StartDate: PropTypes.string.isRequired,
      EndDate: PropTypes.string.isRequired,
      JobTitle: PropTypes.string.isRequired,
      CompanyName: PropTypes.string.isRequired,
      City: PropTypes.string.isRequired,
      State: PropTypes.number.isRequired,
      Country: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    professionalDetails: props.professionalDetails || [],
  }),

  validationSchema: profileSchema.proDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      ExperienceDetails: values.professionalDetails,
    });
  },
})(ProfessionalDetails);

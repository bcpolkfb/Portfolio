import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Form, Field, ErrorMessage, withFormik, FieldArray } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import profileSchema from "./profileSchema";
// import debug from "sabio-debug";

// const _logger = debug.extend("CertsInfo")

const Certifications = (props) => {
  const {
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
    nextLabel,
    onBack,
    backLabel,
  } = props;

  // _logger(values);

  return (
    <Fragment>
      <div className="container">
        <Card className="mb-3 shadow">
          <div className="border-bottom px-4 card-header">
            <h4 className="mb-0">Certifications Info</h4>
          </div>
          <Card.Body>
            <Form id="regForm" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <FieldArray name="certifications">
                  {({ push, remove }) => (
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary my-3"
                        onClick={() =>
                          push({
                            Name: "",
                            Description: "",
                            ExpireDate: "",
                            IssueDate: "",
                            FileId: 4,
                          })
                        }>
                        Add
                      </button>
                      {values.certifications &&
                        values.certifications.map((certification, index) => (
                          <div className="row" key={index}>
                            <div className="col-6">
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Certification Name">
                                  <label htmlFor="Name" />
                                  <Field
                                    className={`form-control ${
                                      errors.certifications &&
                                      errors.certifications[index] &&
                                      errors.certifications[index].Name &&
                                      touched.certifications &&
                                      touched.certifications[index] &&
                                      touched.certifications[index].Name &&
                                      "is-invalid"
                                    }`}
                                    value={certification.Name}
                                    name={`certifications[${index}].Name`}
                                    id={`certifications[${index}].Name`}
                                    onChange={handleChange}
                                    placeholder={""}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`certifications[${index}].Name`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Description">
                                  <Field
                                    className={`form-control ${
                                      errors.certifications &&
                                      errors.certifications[index] &&
                                      errors.certifications[index].Description &&
                                      touched.certifications &&
                                      touched.certifications[index] &&
                                      touched.certifications[index].Description &&
                                      "is-invalid"
                                    }`}
                                    value={certification.Description}
                                    name={`certifications[${index}].Description`}
                                    id={`certifications[${index}].Description`}
                                    onChange={handleChange}
                                    placeholder={""}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`certifications[${index}].Description`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Expiration Date">
                                  <Field
                                    className={`form-control ${
                                      errors.certifications &&
                                      errors.certifications[index] &&
                                      errors.certifications[index].ExpireDate &&
                                      touched.certifications &&
                                      touched.certifications[index] &&
                                      touched.certifications[index].ExpireDate &&
                                      "is-invalid"
                                    }`}
                                    id={`certifications[${index}].ExpireDate`}
                                    name={`certifications[${index}].ExpireDate`}
                                    placeholder="Example: 2023-12-31"
                                    value={certification.ExpireDate}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`certifications[${index}].ExpireDate`}
                                  component="div"
                                  className="has-error"></ErrorMessage>
                              </div>
                              <div className="form-group mb-3">
                                <FloatingLabel
                                  controlId="floatingInputGrid"
                                  label="Issue Date">
                                  <Field
                                    className={`form-control ${
                                      errors.certifications &&
                                      errors.certifications[index] &&
                                      errors.certifications[index].IssueDate &&
                                      touched.certifications &&
                                      touched.certifications[index] &&
                                      touched.certifications[index].IssueDate &&
                                      "is-invalid"
                                    }`}
                                    id={`certifications[${index}].IssueDate`}
                                    name={`certifications[${index}].IssueDate`}
                                    placeholder="Example: 2023-12-31"
                                    value={certification.IssueDate}
                                    onChange={handleChange}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`certifications[${index}].IssueDate`}
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
                      className="btn btn-success btn-secondary float-end">
                      {nextLabel}
                    </button>
                    <button
                      type="submit"
                      id="prevBtn"
                      onClick={onBack}
                      className="btn btn-success btn-secondary me-2 float-end">
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

Certifications.propTypes = {
  onBack: PropTypes.func,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  touched: PropTypes.func,
  values: PropTypes.func,
  errors: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ExpireDate: PropTypes.string.isRequired,
      IssueDate: PropTypes.string.isRequired,
      FileId: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    certifications: props.certifications || [],
  }),
  validationSchema: profileSchema.certificationsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      Certifications: values.certifications,
    });
  },
})(Certifications);

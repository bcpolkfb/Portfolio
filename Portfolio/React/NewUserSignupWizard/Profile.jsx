import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Form, Field, ErrorMessage, withFormik } from "formik";
import profileSchema from "./profileSchema";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const Profile = (props) => {
  const {
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
    nextLabel,
    titleType,
    genders,
  } = props;

  return (
    <Fragment>
      <div className="container">
        <Card className="mb-3 shadow">
          <div className="border-bottom px-4 card-header">
            <h4 className="mb-0">Profile Info</h4>
          </div>
          <Card.Body>
            <Form id="regForm" onSubmit={handleSubmit}>
              <div className="form-group m-3">
                <FloatingLabel controlId="floatingInputGrid" label="Title">
                  <Field
                    component="select"
                    name="TitleTypeId"
                    id="TitleTypeId"
                    className={`form-control ${
                      errors.TitleTypeId && touched.TitleTypeId && "is-invalid"
                    }`}
                    value={values.TitleTypeId}
                    onChange={handleChange}
                    placeholder="Please select title....">
                    <option value="">Please select title....</option>
                    {titleType}
                  </Field>
                </FloatingLabel>
                <ErrorMessage
                  name="TitleTypeId"
                  component="div"
                  className="has-error"></ErrorMessage>
              </div>
              <div className="form-group m-3">
                <FloatingLabel controlId="floatingInputGrid" label="Phone number">
                  <Field
                    className={`form-control ${
                      errors.Phone && touched.Phone && "is-invalid"
                    }`}
                    name="Phone"
                    placeholder="(xxx)-xxx-xxxx"
                    onChange={handleChange}
                    value={values.Phone}
                    id="Phone"
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="Phone"
                  component="div"
                  className="has-error"></ErrorMessage>
              </div>
              <div className="form-group m-3">
                <FloatingLabel controlId="floatingInputGrid" label="Fax">
                  <Field
                    className={`form-control ${
                      errors.Fax && touched.Fax && "is-invalid"
                    }`}
                    onChange={handleChange}
                    name="Fax"
                    placeholder="Fax"
                    id="Fax"
                    value={values.Fax}
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="Fax"
                  component="div"
                  className="has-error"></ErrorMessage>
              </div>
              <div className="form-group m-3">
                <FloatingLabel controlId="floatingInputGrid" label="Gender">
                  <Field
                    component="select"
                    name="GenderTypeId"
                    className={`form-control ${
                      errors.GenderTypeId && touched.GenderTypeId && "is-invalid"
                    }`}
                    onChange={handleChange}
                    id="GenderTypeId"
                    value={values.GenderTypeId}>
                    <option value="">Please select a gender....</option>
                    {genders}
                  </Field>
                </FloatingLabel>
                <ErrorMessage
                  name="GenderTypeId"
                  component="div"
                  className="has-error"></ErrorMessage>
              </div>
              <div className="form-group m-3">
                <FloatingLabel controlId="floatingInputGrid" label="CurrentSalary">
                  <Field
                    className={`form-control ${
                      errors.CurrentSalary && touched.CurrentSalary && "is-invalid"
                    }`}
                    onChange={handleChange}
                    name="CurrentSalary"
                    placeholder="CurrentSalary"
                    id="CurrentSalary"
                    value={values.CurrentSalary}
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="CurrentSalary"
                  component="div"
                  className="has-error"></ErrorMessage>
              </div>
              <div className="form-group m-3">
                <FloatingLabel controlId="floatingInputGrid" label="Currency">
                  <Field
                    className={`form-control ${
                      errors.Currency && touched.Currency && "is-invalid"
                    }`}
                    onChange={handleChange}
                    name="Currency"
                    placeholder="Currency"
                    id="Currency"
                    value={values.Currency}
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="Currency"
                  component="div"
                  className="has-error"></ErrorMessage>
              </div>
              <div className="form-group m-3">
                <FloatingLabel controlId="floatingInputGrid" label="TargetSalary">
                  <Field
                    className={`form-control ${
                      errors.TargetSalary && touched.TargetSalary && "is-invalid"
                    }`}
                    onChange={handleChange}
                    name="TargetSalary"
                    placeholder="TargetSalary"
                    id="TargetSalary"
                    value={values.TargetSalary}
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="TargetSalary"
                  component="div"
                  className="has-error"></ErrorMessage>
              </div>
              <div>
                <div className="col-md-12 text-right">
                  <button
                    type="submit"
                    id="nextBtn"
                    className="btn btn-success btn-secondary float-end">
                    {nextLabel}
                  </button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};
Profile.propTypes = {
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
  genders: PropTypes.number,
  titleType: PropTypes.number,
  touched: PropTypes.func,
  values: PropTypes.func,
  errors: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  provider: PropTypes.arrayOf(
    PropTypes.shape([
      {
        TitleTypeId: PropTypes.number.isRequired,
        Phone: PropTypes.string.isRequired,
        Fax: PropTypes.string.isRequired,
        GenderTypeId: PropTypes.number.isRequired,
        IsSearchable: PropTypes.bool.isRequired,
        HasActiveEmailNotification: PropTypes.bool.isRequired,
        CurrentSalary: PropTypes.string,
        Currency: PropTypes.string,
        TargetSalary: PropTypes.string,
      },
    ]).isRequired
  ),
};
export default withFormik({
  mapPropsToValues: (props) => ({
    TitleTypeId: props.profile.TitleTypeId,
    Phone: props.profile.Phone,
    Fax: props.profile.Fax,
    GenderTypeId: props.profile.GenderTypeId,
    IsSearchable: true,
    HasActiveEmailNotification: true,
    CurrentSalary: props.profile.CurrentSalary,
    Currency: props.profile.Currency,
    TargetSalary: props.profile.TargetSalary,
  }),
  validationSchema: profileSchema.profilePageSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      Profile: {
        ...values,
      },
    });
  },
})(Profile);

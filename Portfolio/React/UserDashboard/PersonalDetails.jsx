import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { Col, Row, FloatingLabel, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import dashboardSchema from "../../../schema/dashboardSchema";
import { updateProfile } from "services/profileDetailsService";
const _logger = debug.extend("PersonalDetails");

const PersonalDetails = (props) => {
  const { titleTypes, genders, personalDetailsInfo } = props;

  const handleSubmit = (values) => {
    _logger("UPDATE VALUES", values);
    updateProfile(values);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={personalDetailsInfo}
      onSubmit={handleSubmit}
      validationSchema={dashboardSchema.personalDetailsSchema}
    >
      {() => (
        <div>
          <Form>
            <Row>
              <Col md={10} sm={12}>
                <h4 className="mb-0">Personal Details</h4>
              </Col>
              <Col md={2} sm={12}>
                <Button variant="primary" type="submit" className="my-2">
                  Edit
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={12} className="mb-3">
                <FloatingLabel controlId="floatingInputGrid" label="Title">
                  <Field
                    component="select"
                    name="titleTypeId"
                    className="form-control"
                  >
                    {titleTypes}
                  </Field>
                </FloatingLabel>
                <div>
                  <ErrorMessage
                    name="titleTypeId"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>

              <Col md={3} sm={12} className="mb-3">
                <FloatingLabel controlId="floatingInputGrid" label="Gender">
                  <Field
                    component="select"
                    name="genderTypeId"
                    className="form-control"
                  >
                    {genders}
                  </Field>
                </FloatingLabel>
                <ErrorMessage
                  name="genderTypeId"
                  component="div"
                  className="has-error"
                />
              </Col>

              <Col md={3} sm={12} className="mb-3">
                <FloatingLabel controlId="floatingInputGrid" label="Phone">
                  <Field
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="(###) ###-####"
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="has-error"
                />
              </Col>

              <Col md={3} sm={12} className="mb-3">
                <FloatingLabel controlId="floatingInputGrid" label="Fax">
                  <Field
                    type="text"
                    name="fax"
                    className="form-control"
                    placeholder="(###) ###-####"
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="fax"
                  component="div"
                  className="has-error"
                />
              </Col>

              <Col md={4} sm={12} className="mb-3">
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Current Salary"
                >
                  <Field
                    type="text"
                    name="currentSalary"
                    className="form-control"
                    placeholder="Current"
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="currentSalary"
                  component="div"
                  className="has-error"
                />
              </Col>

              <Col md={4} sm={12} className="mb-3">
                <FloatingLabel controlId="floatingInputGrid" label="Currency">
                  <Field
                    type="text"
                    name="currency"
                    className="form-control"
                    placeholder="Currency"
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="currency"
                  component="div"
                  className="has-error"
                />
              </Col>

              <Col md={4} sm={12} className="mb-3">
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Target Salary"
                >
                  <Field
                    type="text"
                    name="targetSalary"
                    className="form-control"
                    placeholder="Target"
                  />
                </FloatingLabel>
                <ErrorMessage
                  name="targetSalary"
                  component="div"
                  className="has-error"
                />
              </Col>
              <Col>
                <hr />
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </Formik>
  );
};

PersonalDetails.propTypes = {
  titleTypes: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        value: PropTypes.number.isRequired,
        children: PropTypes.string.isRequired,
      }),
    })
  ),
  genders: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        value: PropTypes.number.isRequired,
        children: PropTypes.string.isRequired,
      }),
    })
  ),
  personalDetailsInfo: PropTypes.shape({
    currency: PropTypes.string,
    currentSalary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fax: PropTypes.string.isRequired,
    genderTypeId: PropTypes.number.isRequired,
    hasActiveEmailNotification: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    isSearchable: PropTypes.bool.isRequired,
    phone: PropTypes.string.isRequired,
    targetSalary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titleTypeId: PropTypes.number.isRequired,
  }),
};

export default PersonalDetails;

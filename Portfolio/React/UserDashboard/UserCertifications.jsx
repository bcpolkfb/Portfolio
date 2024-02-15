import { Form, Field, ErrorMessage, FieldArray, Formik } from "formik";
import React from "react";
import { Col, Row, Button, FloatingLabel } from "react-bootstrap";
import dashboardSchema from "../../../schema/dashboardSchema";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { updateCertifications } from "services/profileDetailsService";

const UserCertifications = (props) => {
  const { certifications } = props;

  const _logger = debug.extend("UserCert");

  const handleSubmit = (values) => {
    _logger("UPDATE VALUES", values);
    let payload = values.certifications;
    updateCertifications(payload);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ certifications }}
      onSubmit={handleSubmit}
      validationSchema={dashboardSchema.certSchema}
    >
      {({ values }) => (
        <Form>
          <Row>
            <Col md={10} sm={12}>
              <h4 className="mb-0">Certifications</h4>
            </Col>
            <Col md={2} sm={12}>
              <Button variant="primary" type="submit" className="my-2">
                Edit
              </Button>
            </Col>
          </Row>
          <FieldArray name="certifications">
            {/* {({ push, remove }) => ( */}
            <div>
              {/* <Button
                  type="button"
                  className="btn btn-primary my-3"
                  onClick={() =>
                    push({
                      name: "",
                      description: "",
                      expireDate: "",
                      issueDate: "",
                      fileId: 4,
                    })
                  }
                >
                  Add
                </Button> */}
              {values.certifications &&
                values.certifications.map((item, index) => (
                  <Row key={`cert_${index}`}>
                    <Col md={6} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Certification Name"
                      >
                        <Field
                          type="text"
                          name={`certifications[${index}].name`}
                          className="form-control"
                          placeholder="Name"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`certifications[${index}].name`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={6} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Certification Description"
                      >
                        <Field
                          type="text"
                          name={`certifications[${index}].description`}
                          className="form-control"
                          placeholder="Description"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`certifications[${index}].description`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={6} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Expire Date"
                      >
                        <Field
                          type="text"
                          name={`certifications[${index}].expireDate`}
                          className="form-control"
                          placeholder="yyyy/MM/dd"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`certifications[${index}].expireDate`}
                        component="div"
                        className="has-error"
                      />
                    </Col>

                    <Col md={6} sm={12} className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Issue Date"
                      >
                        <Field
                          type="text"
                          name={`certifications[${index}].issueDate`}
                          className="form-control"
                          placeholder="yyyy/MM/dd"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        name={`certifications[${index}].issueDate`}
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

UserCertifications.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      expireDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      issueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fileId: PropTypes.number,
    })
  ),
};

export default UserCertifications;

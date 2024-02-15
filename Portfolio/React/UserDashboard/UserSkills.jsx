import { Formik, Form, ErrorMessage } from "formik";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import dashboardSchema from "../../../schema/dashboardSchema";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { updateSkills } from "services/profileDetailsService";

const UserSkills = (props) => {
  const { skills, skillsInfo } = props;

  const _logger = debug.extend("UserSkills");

  const handleSubmit = (values) => {
    _logger("UPDATE VALUES", values);
    let valuesForUpdate = values.skills.map(mapValuesForUpdate);
    updateSkills(valuesForUpdate);
  };

  const mapValuesForUpdate = (value) => {
    let newValue = value.value;
    return newValue;
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ skills: skillsInfo }}
      onSubmit={handleSubmit}
      validationSchema={dashboardSchema.skillsSchema}
    >
      {({ setFieldValue, values }) => (
        <div>
          <Row>
            <Col md={10} sm={12}>
              <h4 className="mb-0">Skills</h4>
            </Col>
            <Col md={2} sm={12}>
              <Button variant="primary" type="submit" className="my-2">
                Edit
              </Button>
            </Col>
          </Row>
          <Form>
            <Row>
              <Col md={12} sm={12} className="mb-3">
                <Select
                  name="skills"
                  className="form-control"
                  isMulti
                  value={values.skills}
                  options={skills}
                  onChange={(options) => setFieldValue("skills", options)}
                />
                <ErrorMessage
                  name="skills"
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

UserSkills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        value: PropTypes.number.isRequired,
        children: PropTypes.string.isRequired,
      }),
    })
  ),
  skillsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

export default UserSkills;

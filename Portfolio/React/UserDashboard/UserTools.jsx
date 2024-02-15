import { Formik, Form, ErrorMessage } from "formik";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import dashboardSchema from "../../../schema/dashboardSchema";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { updateTools } from "services/profileDetailsService";

const UserTools = (props) => {
  const { tools, initialValuesTools } = props;

  const _logger = debug.extend("UserTools");

  const handleSubmit = (values) => {
    _logger("UPDATE VALUES", values);
    let valuesForUpdate = values.tools.map(mapValuesForUpdate);
    updateTools(valuesForUpdate);
  };

  const mapValuesForUpdate = (value) => {
    let newValue = value.value;
    return newValue;
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ tools: initialValuesTools }}
      onSubmit={handleSubmit}
      validationSchema={dashboardSchema.toolsSchema}
    >
      {({ setFieldValue, values }) => (
        <div>
          <Row>
            <Col md={10} sm={12}>
              <h4 className="mb-0">Tools</h4>
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
                  name="tools"
                  className="form-control"
                  isMulti
                  value={values.tools}
                  options={tools}
                  onChange={(options) => setFieldValue("tools", options)}
                />
                <ErrorMessage
                  name="tools"
                  component="div"
                  className="has-error"
                />
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </Formik>
  );
};

UserTools.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        value: PropTypes.number.isRequired,
        children: PropTypes.string.isRequired,
      }),
    })
  ),
  initialValuesTools: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

export default UserTools;

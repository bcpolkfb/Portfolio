import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, ErrorMessage, withFormik } from "formik";
import profileSchema from "./profileSchema";
import Select from "react-select";
import { Card } from "react-bootstrap";

const ToolsUtilized = (props) => {
  const {
    touched,
    errors,
    handleSubmit,
    nextLabel,
    onBack,
    backLabel,
    setFieldValue,
    toolsDropDown,
  } = props;

  const handleSelectChange = (selectedTool) => {
    let selectedToolIds = selectedTool?.map((item) => item.value);
    setFieldValue("Tools", selectedToolIds);
  };

  return (
    <Fragment>
      <div className="container">
        <Card className="mb-3 shadow">
          <div className="border-bottom px-4 card-header">
            <h4 className="mb-0">Tools</h4>
          </div>
          <Card.Body>
            <Form id="regForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <Select
                  onChange={handleSelectChange}
                  name="Tools"
                  id="Tools"
                  className={`form-control ${
                    errors.Tools &&
                    touched.Tools &&
                    "is-invalid"
                  }`}
                  isMulti
                  options={toolsDropDown}></Select>
                <ErrorMessage
                  name="Tools"
                  component="div"
                  className="has-error"></ErrorMessage>
              </div>
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
                    className="btn btn-success btn-secondary me-2 mt-3 float-end">
                    {backLabel}
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

ToolsUtilized.propTypes = {
  setFieldValue: PropTypes.func,
  nextLabel: PropTypes.string,
  touched: PropTypes.func,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  errors: PropTypes.func,
  handleSubmit: PropTypes.func,
  toolsDropDown: PropTypes.number,
  Tools: PropTypes.shape({}).isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    Tools: props.Tools,
  }),

  validationSchema: profileSchema.toolsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(ToolsUtilized);

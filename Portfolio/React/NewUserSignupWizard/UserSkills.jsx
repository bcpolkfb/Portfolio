import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Form, ErrorMessage, withFormik } from "formik";
import profileSchema from "./profileSchema";
import Select from "react-select";

const UserSkills = (props) => {
  const {
    touched,
    errors,
    handleSubmit,
    nextLabel,
    onBack,
    backLabel,
    setFieldValue,
    skillDropDown,
  } = props;

  const handleSelectChange = (selectedSkill) => {
    let selectedSkillIds = selectedSkill?.map((item) => item.value);
    setFieldValue("Skills", selectedSkillIds);
  };

  return (
    <Fragment>
      <div className="container">
        <Card className="mb-3 shadow">
          <div className="border-bottom px-4 card-header">
            <h4 className="mb-0">Skills</h4>
          </div>
          <Card.Body>
            <Form id="regForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <Select
                  onChange={handleSelectChange}
                  name="skills"
                  id="skills"
                  className={`form-control ${
                    errors.skills &&
                    touched.skills &&
                    "is-invalid"
                  }`}
                  isMulti
                  options={skillDropDown}></Select>
                <ErrorMessage
                  name="skills"
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
                    className="btn btn-success btn-secondary float-end me-2 mt-3">
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

UserSkills.propTypes = {
  setFieldValue: PropTypes.func,
  nextLabel: PropTypes.string,
  touched: PropTypes.func,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  errors: PropTypes.func,
  handleSubmit: PropTypes.func,
  skillDropDown: PropTypes.number,
  Skills: PropTypes.shape({}).isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    Skills: props.Skills,
  }),

  validationSchema: profileSchema.skillsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(UserSkills);

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserProfile from "./UserProfile";
import PersonalDetails from "./PersonalDetails";
import * as helper from "helper/utils";
import lookUpService from "services/lookUpService";
import debug from "sabio-debug";
import UserEducation from "./UserEducation";
import UserExperience from "./UserExperience";
import { Col, Card, Row } from "react-bootstrap";
import UserCertifications from "./UserCertifications";
import UserTools from "./UserTools";
//import UserAvatar from "./UserAvatar";
import UserSkills from "./UserSkills";
import { getUserProfile } from "services/profileDetailsService";

const UserDashboard = (props) => {
  const _logger = debug.extend("UseDash");

  const [userData, setUserData] = useState({
    profile: {
      id: 0,
      titleTypeId: 0,
      genderTypeId: 0,
      phone: "",
      fax: "",
      isSearchable: true,
      hasActiveEmailNotification: true,
      currentSalary: "",
      currency: "",
      targetSalary: "",
    },
    educationDetails: [
      {
        id: 0,
        degreeTypeId: 0,
        major: "",
        instituteName: "",
        startDate: "",
        endDate: "",
        gpa: "",
        percentage: "",
      },
    ],
    certifications: [
      {
        id: 0,
        name: "",
        description: "",
        expireDate: "",
        issueDate: "",
        fileId: 4,
      },
    ],
    skills: [
      {
        id: 0,
        name: "",
      },
    ],
    tools: [
      {
        id: 0,
        name: "",
      },
    ],
    experienceDetails: [
      {
        id: 0,
        isCurrent: false,
        startDate: "",
        endDate: "",
        jobTitle: "",
        companyName: "",
        city: "",
        stateId: 0,
        country: "",
        description: "",
      },
    ],
    isReadyToRender: false,
  });

  const [lookUpData, setLookUpType] = useState({
    mappedStates: [],
    mappedGenderTypes: [],
    skillDropDown: [],
    toolsDropDown: [],
    mappedTitles: [],
    mappedDegreeTypes: [],
  });

  useEffect(() => {
    lookUpService
      .lookUp([
        "States",
        "GenderTypes",
        "Skills",
        "ToolsUtilized",
        "DegreeTypes",
        "TitleTypes",
      ])
      .then(onLookSuccess)
      .catch(onLookErr);

    getUserProfile().then(onGetSuccess).catch(onGetErr);
  }, []);

  const onLookSuccess = (response) => {
    const {
      states,
      genderTypes,
      skills,
      toolsUtilized,
      degreeTypes,
      titleTypes,
    } = response.item;

    const skillDropDown = skills.map(mapForRS);
    const toolsDropDown = toolsUtilized.map(mapForRS);

    setLookUpType((prevState) => {
      let newState = {
        ...prevState,
        skillDropDown,
        toolsDropDown,
      };

      newState.mappedStates = states.map(helper.mapLookUpItem);
      newState.mappedGenderTypes = genderTypes.map(helper.mapLookUpItem);
      newState.mappedDegreeTypes = degreeTypes.map(helper.mapLookUpItem);
      newState.mappedTitles = titleTypes.map(helper.mapLookUpItem);
      return newState;
    });
  };

  const onLookErr = (err) => {
    _logger("onLookError", err);
  };

  const onGetSuccess = (response) => {
    var profileData = response.item;
    _logger("onGetSuccess", profileData);

    setUserData((prevState) => {
      let newUserData = { ...prevState };
      newUserData.profile = profileData.profileDetails;
      newUserData.educationDetails = profileData.educationDetails;
      newUserData.experienceDetails = profileData.experienceDetails;
      newUserData.certifications = profileData.certifications;

      newUserData.skills = profileData.skills.map(mapForRS);
      newUserData.tools = profileData.tools.map(mapForRS);
      newUserData.isReadyToRender = true;

      return newUserData;
    });
  };

  const onGetErr = (err) => {
    _logger("onGetErr", err);
  };

  const mapForRS = (item) => {
    return {
      label: item.name,
      value: item.id,
    };
  };

  const user = props.currentUser;

  return (
    <React.Fragment>
      <div className="row">
        <UserProfile user={user} />
        <Col xl={9} lg={12}>
          <Card className="mb-4 pb-1">
            <Row>
              <Col xl={9}>
                <Card.Body className="pb-0">
                  <div className="mb-3 mb-lg-0">
                    <h3 className="mb-0">Profile Details</h3>
                  </div>
                </Card.Body>
                {userData.isReadyToRender && (
                  <Card.Body className="pt-0">
                    <hr />
                    <PersonalDetails
                      titleTypes={lookUpData.mappedTitles}
                      genders={lookUpData.mappedGenderTypes}
                      personalDetailsInfo={userData.profile}
                    />
                    <UserEducation
                      degreeTypes={lookUpData.mappedDegreeTypes}
                      educationDetails={userData.educationDetails}
                    />
                    <UserExperience
                      states={lookUpData.mappedStates}
                      professionalDetails={userData.experienceDetails}
                    />
                    <UserCertifications
                      certifications={userData.certifications}
                    />
                    <UserSkills
                      skills={lookUpData.skillDropDown}
                      skillsInfo={userData.skills}
                    />
                    <UserTools
                      tools={lookUpData.toolsDropDown}
                      initialValuesTools={userData.tools}
                    />
                  </Card.Body>
                )}
              </Col>
              <Col xl={3}>
                <Card.Body className="align-items-center card-header-height d-flex justify-content-between">
                  {/* <UserAvatar /> */}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

UserDashboard.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    lastName: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    tenantId: PropTypes.string,
  }),
};

export default UserDashboard;

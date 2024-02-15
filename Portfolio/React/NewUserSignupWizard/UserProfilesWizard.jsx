import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Loki from "react-loki";
import Profile from "./Profile";
import Certifications from "./Certifications";
import ProfessionalDetails from "./ProfessionalDetails";
import UserSkills from "./UserSkills";
import ToolsUtilized from "./ToolsUtilized";
import EducationDetails from "./EducationDetails";
import * as helper from "../../helper/utils";
import lookUpService from "services/lookUpService";
import "./ProviderWizard.css";

import debug from "sabio-debug";
import {
  FaUser,
  FaHospitalSymbol,
  FaBookMedical,
  FaBriefcaseMedical,
  // FaNotesMedical,  //these icons can be for future use
  // FaClinicMedical,
  // FaFileMedical,
  // FaHandshake,
  // FaHeartbeat,
  FaHospitalAlt,
  FaHospitalUser,
} from "react-icons/fa";
import { postProfileDetails } from "services/profileDetailsService";

const _logger = debug.extend("Providers");

function UserProfilesWizard() {
  const [profileInfo, setProfileInfo] = useState({
    Profile: {
      TitleTypeId: 0,
      GenderTypeId: 0,
      Phone: "",
      Fax: "",
      IsSearchable: true,
      HasActiveEmailNotification: true,
      CurrentSalary: null,
      Currency: null,
      TargetSalary: null
    },
    EducationDetails: [
      {
        DegreeTypeId: 0,
        Major: "",
        InstituteName: "",
        StartDate: "",
        EndDate: "",
        GPA: "",
        Percentage: "",
      },
    ],
    Certifications: [
      {
        Name: "",
        Description: "",
        ExpireDate: "",
        IssueDate: "",
        FileId: 4,
      },
    ],
    Skills: [],
    Tools: [],
    ExperienceDetails: [
      {
        IsCurrent: false,
        StartDate: "",
        EndDate: "",
        JobTitle: "",
        CompanyName: "",
        City: "",
        StateId: 0,
        Country: "",
        Description: "",
      },
    ]
  });
  const nav = useNavigate();
  const [lookUpData, setLookUpType] = useState({
    states: [],
    mappedStates: [],
    genderTypes: [],
    mappedGenderTypes: [],
    titleTypes: [],
    mappedTitleTypes: [],
    skills: [],
    mappedLanguages: [],
    skillDropDown: [],
    toolsUtilized: [],
    toolsDropDown: [],
    degreeTypes: [],
    mappedDegreeTypes: [],
  });

  useEffect(() => {
    lookUpService
      .lookUp([
        "States",
        "GenderTypes",
        "TitleTypes",
        "Skills",
        "ToolsUtilized",
        "DegreeTypes",
      ])
      .then(onLookSuccess)
      .catch(onLookError);
  }, []);

  const onLookSuccess = (response) => {
    const { states, genderTypes, titleTypes, skills, toolsUtilized, degreeTypes } =
      response.item;

    const skillDropDown = skills.map(mapForRS);
    const toolsDropDown = toolsUtilized.map(mapForRS);

    setLookUpType((prevState) => {
      let newState = {
        ...prevState,
        states,
        genderTypes,
        titleTypes,
        skillDropDown,
        toolsDropDown,
        degreeTypes,
      };

      newState.mappedStates = newState.states.map(helper.mapLookUpItem);
      newState.mappedGenderTypes = newState.genderTypes.map(helper.mapLookUpItem);
      newState.mappedTitleTypes = newState.titleTypes.map(helper.mapLookUpItem);
      newState.mappedLanguages = newState.skills.map(helper.mapLookUpItem);
      newState.mappedDegreeTypes = newState.degreeTypes.map(helper.mapLookUpItem);
      return newState;
    });
  };

  const mapForRS = (item) => {
    return {
      label: item.name,
      value: item.id,
    };
  };

  const onLookError = (response) => {
    _logger("onLookError", response);
  };

  const mySteps = [
    {
      label: "Step 1",
      icon: <FaUser className="mt-3" />,
      component: (
        <Profile
          profile={profileInfo.Profile}
          genders={lookUpData.mappedGenderTypes}
          titleType={lookUpData.mappedTitleTypes}
        />
      ),
    },
    {
      label: "Step 2",
      icon: <FaHospitalSymbol className="mt-3" />,
      component: (
        <Certifications certifications={profileInfo.Certifications} />
      ),
    },
    {
      label: "Step 3",
      icon: <FaBookMedical className="mt-3" />,
      component: (
        <ProfessionalDetails
          professionalDetails={profileInfo.ExperienceDetails}
          states={lookUpData.mappedStates}
        />
      ),
    },
    {
      label: "Step 4",
      icon: <FaBriefcaseMedical className="mt-3" />,
      component: (
        <UserSkills
          skills={profileInfo.Skills}
          skillDropDown={lookUpData.skillDropDown}
        />
      ),
    },
    {
      label: "Step 5",
      icon: <FaHospitalAlt className="mt-3" />,
      component: (
        <ToolsUtilized
          Tools={profileInfo.Tools}
          toolsDropDown={lookUpData.toolsDropDown}
        />
      ),
    },
    {
      label: "Step 6",
      icon: <FaHospitalUser className="mt-3" />,
      component: (
        <EducationDetails
          degreeTypes={profileInfo.degreeTypes}
          mappedDegreeTypes={lookUpData.mappedDegreeTypes}
        />
      ),
    },
  ];

  const mergeValues = (values) => {
    setProfileInfo((prevState) => {
      let newState = { ...prevState, ...values };
      return newState;
    });
  };

  const finishWizard = (values) => {
    let payload = {}
    setProfileInfo((prevState) => {
      let newState = { ...prevState, ...values };
      payload = Object.fromEntries(
        Object.entries(newState).slice(0, 6));
      _logger(payload);
      return newState;
    });
    if (payload.EducationDetails.DegreeTypeId !== 0) {
      postProfileDetails(payload)
      .then(onPostSuccess)
      .catch(onPostError);
    };
  };

  function onPostSuccess(response) {
    _logger(response, "this is the response");
    nav("/dashboard/user");
  }
  function onPostError(error) {
    _logger(error, "this is the response");
  }

  return (
    <Fragment>
      <div className="newProviderWizard container d-flex align-items-center">
        <Loki
          steps={mySteps}
          onNext={mergeValues}
          onBack={mergeValues}
          onFinish={finishWizard.bind(this)}
          noActions
        />
      </div>
    </Fragment>
  );
}

export default UserProfilesWizard;

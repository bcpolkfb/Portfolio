import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const profileDetails = {
  profileDetailsUrl: `${API_HOST_PREFIX}/api/profiledetails`,
};

let postProfileDetails = (payload) => {
  const config = {
    method: "POST",
    url: `${profileDetails.profileDetailsUrl}`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let checkHasProfile = () => {
  const config = {
    method: "GET",
    url: `${profileDetails.profileDetailsUrl}/check`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getUserProfile = () => {
  const config = {
    method: "GET",
    url: `${profileDetails.profileDetailsUrl}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateCertifications = (payload) => {
  const config = {
    method: "PUT",
    url: `${profileDetails.profileDetailsUrl}/certification`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateEducation = (payload) => {
  const config = {
    method: "PUT",
    url: `${profileDetails.profileDetailsUrl}/education`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateExperience = (payload) => {
  const config = {
    method: "PUT",
    url: `${profileDetails.profileDetailsUrl}/experience`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateProfile = (payload) => {
  const config = {
    method: "PUT",
    url: `${profileDetails.profileDetailsUrl}/profile`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateSkills = (payload) => {
  const config = {
    method: "PUT",
    url: `${profileDetails.profileDetailsUrl}/skill`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateTools = (payload) => {
  const config = {
    method: "PUT",
    url: `${profileDetails.profileDetailsUrl}/tool`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  postProfileDetails,
  checkHasProfile,
  getUserProfile,
  updateCertifications,
  updateEducation,
  updateExperience,
  updateProfile,
  updateSkills,
  updateTools,
};

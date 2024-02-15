import * as Yup from "yup";

const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;
const yearFormat =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

const personalDetailsSchema = Yup.object().shape({
  titleTypeId: Yup.string()
    .min(1, "Please select a Title")
    .required("Title is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "format: (XXX) XXX-XXXX")
    .required("Phone number required: (XXX) XXX-XXXX"),
  fax: Yup.string()
    .matches(phoneRegExp, "format: (XXX) XXX-XXXX")
    .required("Fax number required: (XXX) XXX-XXXX"),
  genderTypeId: Yup.string()
    .min(1, "Please select a gender")
    .required("Gender is required"),
  currentSalary: Yup.string().nullable(),
  currency: Yup.string().nullable(),
  targetSalary: Yup.string().nullable(),
});

const educationSchema = Yup.object().shape({
  educationDetails: Yup.array().of(
    Yup.object().shape({
      degreeTypeId: Yup.number().min(1).required("Please select a degree type"),
      major: Yup.string().required("Is Required"),
      instituteName: Yup.string().required("Is Required"),
      startDate: Yup.string()
        .matches(yearFormat, "Invalid date format: MM/DD/YYYY")
        .required("Is Required: MM/DD/YYYY"),
      endDate: Yup.string()
        .matches(yearFormat, "Invalid date format: MM/DD/YYYY")
        .required("Is Required: MM/DD/YYYY"),
      gpa: Yup.string().required("Is Required"),
      percentage: Yup.string().required("Is Required"),
    })
  ),
});

const professionalDetailsSchema = Yup.object().shape({
  professionalDetails: Yup.array().of(
    Yup.object().shape({
      isCurrent: Yup.boolean().required("Is Required"),
      startDate: Yup.string()
        .matches(yearFormat, "Invalid date format: MM/DD/YYYY")
        .required("Is Required: MM/DD/YYYY"),
      endDate: Yup.string()
        .matches(yearFormat, "Invalid date format: MM/DD/YYYY")
        .required("Is Required: MM/DD/YYYY"),
      jobTitle: Yup.string().required("Is Required"),
      companyName: Yup.string().required("Is Required"),
      city: Yup.string().required("Is Required"),
      stateId: Yup.number()
        .oneOf(
          [...Array(51).keys()].map((i) => i + 1),
          "Please select a state"
        )
        .required("Is Required"),
      country: Yup.string().required("Is Required"),
      description: Yup.string().required("Is Required"),
    })
  ),
});

const certSchema = Yup.object().shape({
  certifications: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Is Required"),
      description: Yup.string().required("Is Required"),
      expireDate: Yup.string()
        .matches(yearFormat, "Invalid date format: MM/DD/YYYY")
        .required("Is Required: MM/DD/YYYY"),
      issueDate: Yup.string()
        .matches(yearFormat, "Invalid date format: MM/DD/YYYY")
        .required("Is Required: MM/DD/YYYY"),
      fileId: Yup.number().required("Is Required"),
    })
  ),
});

const skillsSchema = Yup.array()
  .min(1, "Please select at least one skill.")
  .of(Yup.number().required("Please select a valid skill."));

const toolsSchema = Yup.array()
  .min(1, "At least one tool must be selected")
  .of(Yup.number().required("At least one tool must be selected"));

var dashboardSchema = {
  personalDetailsSchema,
  educationSchema,
  certSchema,
  professionalDetailsSchema,
  skillsSchema,
  toolsSchema,
};

export default dashboardSchema;

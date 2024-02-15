import * as Yup from "yup";

const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;
const yearFormat = /^\d{4}-\d{2}-\d{2}$/;

const profilePageSchema = Yup.object().shape({
  TitleTypeId: Yup.number()
    .oneOf([1, 2, 3, 4], "Please select a Title")
    .required("Title is required"),
  Phone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number format: (XXX) XXX-XXXX")
    .required("Phone number is required: (XXX) XXX-XXXX"),
  Fax: Yup.string()
    .matches(phoneRegExp, "Invalid fax number format: (XXX) XXX-XXXX")
    .required("Fax number is required: (XXX) XXX-XXXX"),
  GenderTypeId: Yup.number()
    .oneOf([1, 2, 3, 9, 10], "Please select a gender")
    .required("Gender is required"),
  CurrentSalary: Yup.string()
    .nullable(),
  Currency: Yup.string()
    .nullable(),
  TargetSalary: Yup.string()
    .nullable(),
});

const certificationsSchema = Yup.object().shape({
  certifications: Yup.array().of(
    Yup.object().shape({
      Name: Yup.string().required("Is Required"),
      Description: Yup.string().required("Is Required"),
      ExpireDate: Yup.string()
        .matches(yearFormat, "Invalid date format: YYYY-MM-DD")
        .required("Is Required: YYYY-MM-DD"),
      IssueDate: Yup.string()
        .matches(yearFormat, "Invalid date format: YYYY-MM-DD")
        .required("Is Required: YYYY-MM-DD"),
      FileId: Yup.number().required("Is Required")  
    })
  ),
});

const proDetailsSchema = Yup.object().shape({
  professionalDetails: Yup.array().of(
    Yup.object().shape({
      IsCurrent: Yup.boolean().required("Is Required"),
      StartDate: Yup.string()
        .matches(yearFormat, "Invalid date format: YYYY-MM-DD")
        .required("Is Required: YYYY-MM-DD"),
      EndDate: Yup.string()
        .matches(yearFormat, "Invalid date format: YYYY-MM-DD")
        .required("Is Required: YYYY-MM-DD"),
      JobTitle: Yup.string().required("Is Required"),
      CompanyName: Yup.string().required("Is Required"),
      City: Yup.string().required("Is Required"),
      StateId: Yup.number()
      .oneOf(
        [...Array(51).keys()].map((i) => i + 1),
        "Please select a state"
        )
        .required("Is Required"),
      Country: Yup.string().required("Is Required"),
      Description: Yup.string().required("Is Required"),
    })
  ),
});

const skillsSchema = Yup.object().shape({
  Skills: Yup.array()
    .min(1, "Please select at least one skill.")
    .of(Yup.number().required("Please select a valid skill.")),
});

const toolsSchema = Yup.object().shape({
  Tools: Yup.array()
    .min(1, "At least one tool must be selected")
    .of(Yup.number().required("At least one tool must be selected")),
});

const educationSchema = Yup.object().shape({
  educationDetails: Yup.array().of(
    Yup.object().shape({
      DegreeTypeId: Yup.number().min(1)
        .required("Please select a degree type"),
      Major: Yup.string().required("Is Required"),
      InstituteName: Yup.string().required("Is Required"),
      StartDate: Yup.string()
        .matches(yearFormat, "Invalid date format: YYYY-MM-DD")
        .required("Is Required: YYYY-MM-DD"),
      EndDate: Yup.string()
        .matches(yearFormat, "Invalid date format: YYYY-MM-DD")
        .required("Is Required: YYYY-MM-DD"),
      GPA: Yup.string().required("Is Required"),
      Percentage: Yup.string().required("Is Required"),
    })
  )
});

var profileSchema = {
  profilePageSchema,
  certificationsSchema,
  proDetailsSchema,
  skillsSchema,
  toolsSchema,
  educationSchema,
};

export default profileSchema;

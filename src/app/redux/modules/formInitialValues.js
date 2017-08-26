const initialThemeState = {
  name: "",
  description: "",
  linkedIssue: "",
  state: "In buffer"
};

const initialIssueState = {
  name: "",
  description: "",
  state: "Draft",
  default: "false",
  defaultForSpecificNACE: ""
};

const initialRegisterState = {
  firstName: "",
  lastName: "",
  email: "",
  emailConfirmation: "",
  phone: "",
  password: "",
  passwordConfirmation: ""
};

const initialUserState = {
  id: "",
  data: {
    role: "",
    state: "",
    emailConfirmed: false,
    pathToEmploymentConfirmation: "",
    previousEmploymentConfirmationPaths: [],
    employmentConfirmed: false
  },
  personalInformation: {
    optOut: false,
    phone: "",
    email: "",
    lastName: "",
    firstName: ""
  },
  voting: {
    votedFor: []
  },
  company: {
    state: "",
    name: "",
    companyID: ""
  }
};

const initialCompanyIssueMessageState = {
  messageText: "",
  messageAttachments: []
};

const initialCompanyIssuePublishState = {
  officialResponse: "",
  attachments: [],
  attachmentsToBePublished: [],
  state: "Published"
};

export const initialFormState = {
  theme: initialThemeState,
  issue: initialIssueState,
  register: initialRegisterState,
  user: initialUserState,
  companyIssueMessage: initialCompanyIssueMessageState,
  companyIssuePublish: initialCompanyIssuePublishState
};

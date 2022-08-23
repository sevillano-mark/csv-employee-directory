export const CustomErrors = {
  CommunityNotFound: {
    apiErrorCode: "E_0001_0001",
    errorMessage: "Community not found",
    reason: `Community doesn't exist`,
  },
  CommunityCreateFailed: {
    apiErrorCode: "E_0001_0002",
    errorMessage: "Community not created",
    reason: `Failed creating Community`,
  },
  CommunityCannotDeleteHasEmployee: {
    apiErrorCode: "E_0001_0003",
    errorMessage: "Cannot delete Community ",
    reason: `It has at least one employee associated with it.`,
  },
  CommunityDeleteFailed: {
    apiErrorCode: "E_0001_0004",
    errorMessage: "Cannot delete Community ",
    reason: `Internal server error`,
  },
  CommunityCountFailed: {
    apiErrorCode: "E_0001_0003",
    errorMessage: "Community Count failed",
    reason: `It has at least one employee associated with it.`,
  },
  EmployeeNotFound: {
    apiErrorCode: "E_0002_0001",
    errorMessage: "Employee not found",
    reason: `Employee doesn't exist`,
  },
  EmployeeCreateFailed: {
    apiErrorCode: "E_0002_0002",
    errorMessage: "Employee not created",
    reason: `Failed creating Employee`,
  },
  EmployeeSearchYearInvalid: {
    apiErrorCode: "E_0002_0002",
    errorMessage: "Year parameter invalid",
    reason: `Year is not a number`,
  },
};

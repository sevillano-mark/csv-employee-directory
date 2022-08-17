export const CustomErrors = {
  CommunityNotFound: {
    apiErrorCode: 'E_0001_0001',
    errorMessage: 'Community not found',
    reason: `Community doesn't exist`,
  },
  CommunityCreateFailed: {
    apiErrorCode: 'E_0001_0002',
    errorMessage: 'Community not created',
    reason: `Failed creating Community`,
  },
  EmployeeNotFound: {
    apiErrorCode: 'E_0002_0001',
    errorMessage: 'Employee not found',
    reason: `Employee doesn't exist`,
  },
  EmployeeCreateFailed: {
    apiErrorCode: 'E_0002_0002',
    errorMessage: 'Employee not created',
    reason: `Failed creating Employee`,
  },
};

// errorMessages.js

// export export export const errorMessages = {
//   AUTH: {
//     INVALID_CREDENTIALS: 'Invalid email or password',
//     UNAUTHORIZED: 'Not authorized to access this route',
//     INVALID_TOKEN: 'Invalid or malformed token',
//     TOKEN_EXPIRED: 'Your token has expired. Please log in again',
//     NO_TOKEN: 'You are not logged in. Please log in to get access',
//     TOKEN_REQUIRED: 'No token, authorization denied',
//     INVALID_REFRESH_TOKEN: 'Invalid refresh token',
//     ACCOUNT_DEACTIVATED: 'Your account has been deactivated',
//     PASSWORD_MISMATCH: 'Current password is incorrect',
//     PASSWORD_CHANGED: 'User recently changed password. Please log in again',
//     PASSWORD_RESET_LINK_EXPIRED: 'Password reset link has expired',
//     USER_NOT_FOUND: 'The user belonging to this token no longer exists',
//     NOT_AUTHORIZED: 'You do not have permission to perform this action',
//     SIGN_UP_ERROR: 'Sign Up Error',
//     LOGIN_ERROR: 'Login Error',
//     LOGOUT_ERROR: 'LogOut Error',
//   },

//   USER: {
//     NOT_FOUND: 'User not found',
//     ALREADY_EXISTS: 'User with this email already exists',
//     EMAIL_NOT_EXISTS: 'User with this email does Not exists',
//     DELETE_NOT_ALLOWED: 'Cannot delete your own account',
//     INVALID_CREDENTIALS: 'Invalid credentials',
//     INACTIVE_ACCOUNT: 'Your account is inactive. Please contact support',
//   },

//   STORE: {
//     NOT_FOUND: 'Store not found',
//     ALREADY_EXISTS: 'Store with this name already exists',
//     OWNER_REQUIRED: 'Only store owners can perform this action',
//     INVALID_LOCATION: 'Invalid location data provided',
//   },

//   RATING: {
//     NOT_FOUND: 'Rating not found',
//     ALREADY_EXISTS: 'You have already rated this store',
//     OWNER_REQUIRED: 'Only the rating owner can perform this action',
//     INVALID_RATING: 'Rating must be between 1 and 5',
//   },

//   VALIDATION: {
//     INVALID_EMAIL: 'Please provide a valid email address',
//     INVALID_PASSWORD: 'Password must be 8-16 characters long and include at least one uppercase letter and one special character',
//     PASSWORD_MISMATCH: 'Passwords do not match',
//     REQUIRED_FIELD: 'This field is required',
//     INVALID_INPUT: 'Invalid input data',
//   },

//   UPLOAD: {
//     INVALID_FILE_TYPE: 'Invalid file type. Only JPG, PNG, and JPEG files are allowed',
//     FILE_TOO_LARGE: 'File size too large. Maximum size is 5MB',
//     UPLOAD_FAILED: 'Failed to upload file',
//   },

//   GENERAL: {
//     NOT_FOUND: 'Resource not found',
//     FORBIDDEN: 'You do not have permission to perform this action',
//     INTERNAL_ERROR: 'Internal server error',
//     BAD_REQUEST: 'Bad request',
//     RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
//   },
// };

// // Optional helper function
// export const getErrorMessage = (category, key) => {
//   if (errorMessages[category] && errorMessages[category][key]) {
//     return errorMessages[category][key];
//   }
//   return errorMessages.GENERAL.INTERNAL_ERROR;
// };

export const errorMessages = {
  /* Authentication & Authorization */
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Not authorized to access this route',
    INVALID_TOKEN: 'Invalid or malformed token',
    TOKEN_EXPIRED: 'Your token has expired. Please log in again',
    NO_TOKEN: 'You are not logged in. Please log in to get access',
    TOKEN_REQUIRED: 'No token, authorization denied',
    TOKEN_NOT_FOUND: 'Token not Found',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    ACCOUNT_DEACTIVATED: 'Your account has been deactivated',
    PASSWORD_MISMATCH: 'Current password is incorrect',
    PASSWORD_CHANGED: 'User recently changed password. Please log in again',
    PASSWORD_RESET_LINK_EXPIRED: 'Password reset link has expired',
    USER_NOT_FOUND: 'The user belonging to this token no longer exists',
    NOT_AUTHORIZED: 'You do not have permission to perform this action',
    SIGN_UP_ERROR: 'Sign Up Error',
    LOGIN_ERROR: 'Login Error',
    LOGOUT_ERROR: 'LogOut Error',

  },

  /* User */
  USER: {
    NOT_FOUND: 'User not found',
    ALREADY_EXISTS: 'User with this email already exists',
    EMAIL_NOT_EXISTS: 'User with this email does Not exists',
    DELETE_NOT_ALLOWED: 'Cannot delete your own account',
    INVALID_CREDENTIALS: 'Invalid credentials',
    INACTIVE_ACCOUNT: 'Your account is inactive. Please contact support',
    NOT_FOUND: 'User not found',
    UNABLE_TO_UPDATE_ASSISTATANT: 'Unable to update Assistat',
  },

  ASSISTANT: {
    UNABLE_TO_UPDATE: 'Unable to update assistant',
    UNABLE_TO_ASK_UPDATE_ASSISTATANT: 'Unable to ask update Assistat',
    UNABLE_TO_ASK: 'Unable to process assistant request',
    JSON_DOES_NOT_MATCH: 'JSON does not match',
    ASSISTATANT_NOT_UNDERSTAND: 'Assistant could not understand the command',
    DID_NOT_UNDERSTAND_THE_COMMAND: "I didn't understand the command",
  },
  /* Store */
  STORE: {
    NOT_FOUND: 'Store not found',
    ALREADY_EXISTS: 'Store with this name already exists',
    OWNER_REQUIRED: 'Only store owners can perform this action',
    INVALID_LOCATION: 'Invalid location data provided',
  },

  /* Rating */
  RATING: {
    NOT_FOUND: 'Rating not found',
    ALREADY_EXISTS: 'You have already rated this store',
    OWNER_REQUIRED: 'Only the rating owner can perform this action',
    INVALID_RATING: 'Rating must be between 1 and 5',
  },

  /* Validation */
  VALIDATION: {
    INVALID_EMAIL: 'Please provide a valid email address',
    INVALID_PASSWORD: 'Password must be 8-16 characters long and include at least one uppercase letter and one special character',
    PASSWORD_MISMATCH: 'Passwords do not match',
    REQUIRED_FIELD: 'This field is required',
    INVALID_INPUT: 'Invalid input data',
  },

  /* File Upload */
  UPLOAD: {
    INVALID_FILE_TYPE: 'Invalid file type. Only JPG, PNG, and JPEG files are allowed',
    FILE_TOO_LARGE: 'File size too large. Maximum size is 5MB',
    UPLOAD_FAILED: 'Failed to upload file',
    CLOUDINARY_ERROR: 'cloudinary Error',
  },

  /* General */
  GENERAL: {
    NOT_FOUND: 'Resource not found',
    FORBIDDEN: 'You do not have permission to perform this action',
    INTERNAL_ERROR: 'Internal server error',
    BAD_REQUEST: 'Bad request',
    RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
  },
};

// Helper function to get error message
export const getErrorMessage = (category, key) => {
  if (errorMessages[category] && errorMessages[category][key]) {
    return errorMessages[category][key];
  }
  return errorMessages.GENERAL.INTERNAL_ERROR;
};

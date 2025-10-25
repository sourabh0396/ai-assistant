// Success Messages
export const HttpSuccessMessage = {
  /* Authentication */
  LOGIN_SUCCESS: 'Logged in successfully',
  REGISTER_SUCCESS: 'Registration successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  PASSWORD_RESET_LINK_SENT: 'Password reset link sent to your email',
  PASSWORD_RESET_SUCCESS: 'Password has been reset successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  
  /* User Management */
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  USER_RETRIEVED: 'User retrieved successfully',
  USERS_RETRIEVED: 'Users retrieved successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  USER_STATUS_UPDATED: 'User status updated successfully',
  
  /* Store Management */
  STORE_CREATED: 'Store created successfully',
  STORE_UPDATED: 'Store updated successfully',
  STORE_DELETED: 'Store deleted successfully',
  STORE_RETRIEVED: 'Store retrieved successfully',
  STORES_RETRIEVED: 'Stores retrieved successfully',
  STORE_STATS_RETRIEVED: 'Store statistics retrieved successfully',
  
  /* Rating Management */
  RATING_CREATED: 'Rating submitted successfully',
  RATING_UPDATED: 'Rating updated successfully',
  RATING_DELETED: 'Rating deleted successfully',
  RATING_RETRIEVED: 'Rating retrieved successfully',
  RATINGS_RETRIEVED: 'Ratings retrieved successfully',
  
  /* General */
  OPERATION_SUCCESSFUL: 'Operation completed successfully',
  DATA_RETRIEVED: 'Data retrieved successfully',
  NO_DATA_FOUND: 'No data found',
  WELCOME: 'Welcome to Store Review System API'
};

// Error Messages
export const HttpErrorMessage = {
  /* Authentication */
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'Not authorized to access this route',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_REQUIRED: 'No token, authorization denied',
  ACCOUNT_DEACTIVATED: 'Your account has been deactivated',
  PASSWORD_MISMATCH: 'Current password is incorrect',
  PASSWORD_RESET_LINK_EXPIRED: 'Password reset link has expired',
  
  /* User Management */
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User with this email already exists',
  USER_DELETE_NOT_ALLOWED: 'Cannot delete your own account',
  
  /* Store Management */
  STORE_NOT_FOUND: 'Store not found',
  STORE_ALREADY_EXISTS: 'Store with this name already exists',
  STORE_OWNER_REQUIRED: 'Only store owners can perform this action',
  
  /* Rating Management */
  RATING_NOT_FOUND: 'Rating not found',
  RATING_ALREADY_EXISTS: 'You have already rated this store',
  RATING_OWNER_REQUIRED: 'Only the rating owner can perform this action',
  
  /* Validation */
  VALIDATION_ERROR: 'Validation failed',
  INVALID_EMAIL: 'Please provide a valid email address',
  INVALID_PASSWORD: 'Password must be 8-16 characters long and include at least one uppercase letter and one special character',
  INVALID_RATING: 'Rating must be between 1 and 5',
  
  /* General */
  INTERNAL_SERVER_ERROR: 'Internal server error',
  ROUTE_NOT_FOUND: 'Route not found',
  PERMISSION_DENIED: 'You do not have permission to perform this action',
  TOO_MANY_REQUESTS: 'Too many requests, please try again later'
};

// Status Codes
export const HttpStatus = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLY_HINTS: 103,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};

// Note: Using ES module exports above to align with package.json "type": "module"

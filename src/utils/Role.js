export const hasRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

export const ROLES = {
  SUPER_ADMIN: "superadmin",
  ADMIN: "admin",
  STUDENT: "student",
  USER: "user",
};

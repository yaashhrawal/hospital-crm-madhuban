// Console blocker disabled for debugging
export const setUserStatus = (isAdmin: boolean, email: string) => {
  console.log('Console blocker disabled. User:', email, 'Admin:', isAdmin);
};

export const initializeConsoleBlocking = () => {
  // No-op
};
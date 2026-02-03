// DevTools blocker disabled for debugging
export const blockDevTools = () => { };
export const allowDevTools = () => { };
export const setDevToolsAccess = (isAdmin: boolean, userEmail: string) => {
  console.log('DevTools blocker disabled. User:', userEmail, 'Admin:', isAdmin);
};
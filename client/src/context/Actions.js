export const LoginStart = (userCredentials) => ({type:"LOGIN_START"});
export const LoginSuccess = (user) => ({type:"LOGIN_SUCCESS", payload: user,});
export const LoginFailed = () => ({type:"LOGIN_FAILURE"});

export const Logout = () => ({type:"LOGOUT"});

export const updateStart = (userCredentials) => ({type:"UPDATE_START"});
export const updateSuccess = (user) => ({type:"UPDATE_SUCCESS", payload: user,});
export const updateFailed = () => ({type:"UPDATE_FAILURE"});
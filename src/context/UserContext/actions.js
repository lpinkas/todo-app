import jwt_decode from "jwt-decode";
import { login } from "../../services/users";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = async (email, password, dispatch, seterror, setSuccess) => {
  //login
  const { status, data } = await login(email, password);
  if (status) {
    console.log('Login exitoso', data);
    const token = data;
    localStorage.setItem("jwt", token);
    const decoded = jwt_decode(token);
    seterror && seterror("");
    setSuccess(true);
    dispatch(setCurrentUser(decoded));
  } else {
    console.error('Error custom', data);
    seterror(data);
    setSuccess(false);
    logoutUser(dispatch);
  }
};

export const setCurrentUser = (decoded) => {
  //si se loguea , setear datos del usuario
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = (dispatch) => {
  //logout
  localStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

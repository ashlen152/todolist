import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../ultils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    console.log();
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => loadUser(), []);

  //login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      await loadUser();
      return response.data;
    } catch (e) {
      if (e.response.data) return e.response.data;
      else return { success: false, message: e.message };
    }
  };

  const registerUser = async (registerForm) =>{
    try {
      const response = await axios.post(`${apiUrl}/auth/register`,registerForm);
      if(response.data.success){
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken);
      }

      await loadUser();
      return response.data;
    } catch (e) {
      if (e.response.data) return e.response.data;
      else return { success: false, message: e.message };
    }
  }

  const logOutUser = ()=>{
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  }
  // Context data
  const authContextData = { loginUser,registerUser,logOutUser, authState };

  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
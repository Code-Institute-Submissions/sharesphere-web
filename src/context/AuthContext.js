import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { axiosReq, axiosRes } from "../axios/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/Utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    /**
     * Check if loggedInUser is saved in localStorage to use as default
     * to avoid having the page flash as though the user is unathenticated.
     *
     * This also helps avoiding faulty API requests that rely on the users
     * id.
     */
    const savedLogin = localStorage.getItem("loggedInUser");
    return savedLogin ? JSON.parse(savedLogin) : null;
  });

  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    try {
      const { data } = await axiosReq.get("/dj-rest-auth/user/");
      return data;
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(() => {
    const verifyLogin = async () => {
      /**
       * Verifies users login status, manages the state and the localStorage
       * object for the loggedInUser state.
       *
       * The first time a user logs in and data is returned from
       * the /dj-rest-auth/user/ endpoint there won't be a localStorage object
       * with the user data yet. In which case the loggedInUser will be set with
       * the data returned and loggedInUser localStorage item will be created to
       * contain the same data so that in can be accessed in loggedInUser default
       * state.
       *
       * If the users tokens have expired and access to the /dj-rest-auth/user/
       * endpoint is denied and no data is returned loggedInUser will be set to
       * null and the loggedInUser object is removed from localStorage until
       * the user logs in again.
       *
       * If a login is saved and the session is valid but the user has been updated
       * through the profile updating rendering a mismatch in the data sotred on
       * the server and the data in the localStorage object then the state and
       * the localStorage object will be updated to match the server data.
       */
      if (shouldRefreshToken()) {
        const data = await checkLoginStatus();
        const savedLogin = localStorage.getItem("loggedInUser");

        if (!savedLogin && data) {
          setLoggedInUser(data);
          localStorage.setItem("loggedInUser", JSON.stringify(data));
        } else if (savedLogin && !data) {
          setLoggedInUser(null);
          localStorage.removeItem("loggedInUser");
        } else if (savedLogin && data && savedLogin !== data) {
          setLoggedInUser(data);
          localStorage.setItem("loggedInUser", JSON.stringify(data));
        }
      }
    };
    verifyLogin();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      /**
       * Interceptor suitable for requests and actions that don't
       * require the user to be authenticated. Like simply loading
       * the post feed.
       */
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (error) {
            console.log("axios interceptor", error);
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (error) => {
        console.log("interceptor error");
        return Promise.reject(error);
      }
    );

    axiosRes.interceptors.response.use(
      /**
       * Interceptor suitable for requests and actions that do
       * require the user to be authenticated. Like making a post
       * request to create a post.
       * This will ensure that if the user was logged in when their
       * refersh token expired they are redirected to sign in again
       * before performing the action.
       */
      (response) => response,
      async (err) => {
        if (err.response.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (refreshError) {
            console.log(refreshError);
            // https://github.com/mr-fibonacci/moments/blob/bb6657e265fb18360b841e10d9d633dad06f4e5c/src/contexts/CurrentUserContext.js#L61-L66
            // Redirect user to sign in if session expired while using the site
            setLoggedInUser((prevLoggedInUser) => {
              if (prevLoggedInUser) {
                removeTokenTimestamp();
                navigate("/signin");
              }
              return null;
            });
          }
          return Promise.reject(err);
        } else {
          console.log(err.response);
          return Promise.reject(err);
        }
      }
    );
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { axiosInstance } from "../axios/axiosDefaults";
import { useNavigate } from "react-router-dom";

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
      const { data } = await axiosInstance.get("/dj-rest-auth/user/");
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
      const data = await checkLoginStatus();
      const savedLogin = localStorage.getItem("loggedInUser");

      if (!savedLogin && data) {
        setLoggedInUser(data);
        localStorage.setItem("loggedInUser", JSON.stringify(data));
      } else if (savedLogin && !data) {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
      } else if (savedLogin && data && savedLogin != data) {
        setLoggedInUser(data);
        localStorage.setItem("loggedInUser", JSON.stringify(data));
      }
    };
    verifyLogin();
  }, []);

  useMemo(() => {
    axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (error) {
          console.log("axios interceptor", error);
          return config;
        }
        return config;
      },
      (error) => {
        console.log("interceptor error");
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (refreshError) {
            console.log(refreshError);
            // https://github.com/Felteng/moments-wt/blob/32487da6ddeed417f582334ce05c0401ca115912/src/contexts/CurrentUserContext.js#L37-L43
            setLoggedInUser((prevLoggedInUser) => {
              if (prevLoggedInUser) {
                navigate("/signin");
              }
              return null;
            });
          }
          return Promise.reject(err);
        } else {
          console.log(err.response.data);
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

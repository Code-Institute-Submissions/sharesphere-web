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
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate()

  const checkLoginStatus = async () => {
    try {
      const response = await axiosInstance.get("/dj-rest-auth/user/");
      return response.data;
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(() => {
    const verifyLogin = async () => {
      const data = await checkLoginStatus();
      setLoggedInUser(data);
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
          } catch (error) {
            console.log(error);
            navigate("/signin")
          }
          return err;
        }
      },
      (error) => {
        return Promise.reject(error);
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

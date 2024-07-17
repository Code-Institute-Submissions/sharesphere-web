import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SignInRequired = () => {
  /**
   * Component that can be conditionally used if userLoggedIn context is
   * false when the user attempts to access a page a logged out user can't
   * use.
   * The user will just be redirected with a warning message letting them
   * know that they need to sign in to access that page.
   */
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signin", {
      state: { warning: "You must be logged in to access that page" },
    });
  }, [navigate]);
};

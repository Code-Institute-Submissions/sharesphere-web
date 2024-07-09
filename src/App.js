import { Route, Routes } from "react-router-dom";
import css from "./styles/css/App.module.css";
import NavBar from "./components/NavBar";
import SignUp from "./pages/authentication/SignUp.js"
import "./axios/axiosDefaults";
import SignIn from "./pages/authentication/SignIn.js";


function App() {
  return (
    <div className={css.App}>
      <NavBar />
      <Routes>
        <Route path="/" element={<p>ShareSphere home</p>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<p>Your profile page</p>} />
        <Route path="*" element={<p>Nothing on this page, 404</p>} />
      </Routes>
    </div>
  );
}

export default App;

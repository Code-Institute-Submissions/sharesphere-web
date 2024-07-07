import { Route, Routes } from "react-router-dom";
import css from "./styles/css/App.module.css";
import NavBar from "./components/NavBar";
import SignUp from "./pages/authentication/SignUp.js"


function App() {
  return (
    <div className={css.App}>
      <NavBar />
      <Routes>
        <Route path="/" element={<p>ShareSphere home</p>} />
        <Route path="/signin" element={<p>ShareSphere sign in</p>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<p>Nothing on this page, 404</p>} />
      </Routes>
    </div>
  );
}

export default App;

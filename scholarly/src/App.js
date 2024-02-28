import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import Tutor from "./pages/Tutor";
import FindTutor from "./pages/FindTutor";
import ChatHome from "./pages/ChatHome";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/tutor" element={<Tutor />} />
      <Route path="/findtutor" element={<FindTutor />} />
      <Route path="/chathome" element={<ChatHome />} />
    </Routes>
  );
}

export default App;

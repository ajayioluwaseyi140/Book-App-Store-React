import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Layout/NavBar";
import Footer from "./Layout/Footer";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Signout from "./conponents/Signout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "./Pages/Hero";
import Book from "./Pages/Book";
import { storeContext } from "./context/storeContext";
import { useContext } from "react";
import Profile from "./Pages/Profile";



function App() {
  const { isAuth } = useContext(storeContext);

  return (
    <Router>
      <NavBar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={isAuth ? <Dashboard /> : <Hero />} />
        <Route path="/register" element={isAuth ? <Dashboard /> : <Register/>} />
        <Route path="/login" element={isAuth ? <Dashboard /> : <Login/>} />
        <Route path="/signout" element={isAuth ? <Signout /> : <Login/>} />
        <Route path="/hero" element={isAuth ? <Dashboard /> : <Hero/>} />
        <Route path="/book/:bookId" element={isAuth ? <Book /> : <Login/>} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Login/>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

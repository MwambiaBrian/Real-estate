import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
/**TODO
 *10. complete sign up page ui
 *11.complete sign up functionality
 *12. complete sign in functionality
 *13. Add redux toolkit
 *14. Add redux persist
 *15. Add google OAuth functinlaity
 *16. Update the header and make the profule page private
 * 17. Complete profile page ui
 *
 */

export default App;

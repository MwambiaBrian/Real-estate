import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";

import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
/**TODO
//  10. complete sign up page ui
//  11.complete sign up functionality
//  12. complete sign in functionality
//  13. Add redux toolkit
//  14. Add redux persist
//  15. Add google OAuth functinlaity
//  16. Update the header and make the profule page private
//  17. Complete profile page ui
//  18. Complete image upload functionality
//  20. Complete user update functionality
//  21. Add Delete User functionality
//  22. Add Sign Out functionality
//  24. Complete create listing page UI
//  25. Complete upload lsiting images functionality
//  26. Complete create listing page functionality
//  28. Complete show user listing page functionality
//  29.Complete delete user listings functionality
//  31. Complete update listing functionality
//  32. Add Image Slider to the listing page
//  33. Complete listing page
//  34.Add contact landlord functionality  to the lisiting page
 36. Complete header search form functiionality
 37. Create search page ui
 38.Add OnChange and OnSubmit functionality to the Search Page
 39. Create the Listing Item Component and show Listings
 40. Add Shore more  listings functionality
 41. Complete home page
 42. Complete about page
 



 *
 */

export default App;

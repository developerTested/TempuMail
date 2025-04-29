// import { useState } from "react";
import Header from "./components/Header";
import Inbox from "./components/Inbox";
import EmailGenerator from "./components/emailGenerator";
// import EmailDetails from "./components/EmailDetails";
import HowItWorks from "./components/HowItsWork";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import "./index.css";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <EmailGenerator />
              <Inbox />
            </>
          }
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/howitswork" element={<HowItWorks />} />
      </Routes>

      <></>
    </>
  );
}

export default App;

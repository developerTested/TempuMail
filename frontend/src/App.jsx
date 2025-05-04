import Header from "./components/Header";
import Inbox from "./components/Inbox";
import EmailGenerator from "./components/EmailGenerator";
import HowItWorks from "./components/HowItsWork";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";

export default function App() {
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
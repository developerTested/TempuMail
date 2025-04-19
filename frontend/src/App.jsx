import { useState } from "react";
import Header from "./components/Header";
import Inbox from "./components/Inbox";
import EmailGenerator from "./components/emailGenerator";
import EmailDetails from "./components/EmailDetails";

import "./index.css";
function App() {
  return (
    <>
      <Header />
      <>
        <EmailGenerator />
        <Inbox />
      </>
    </>
  );
}

export default App;

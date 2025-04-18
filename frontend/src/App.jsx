import { useState } from "react";
import Header from "./components/Header";
import Inbox from "./components/Inbox";
import EmailGenerator from "./components/EmailGenerator";

import "./index.css";
function App() {

  return (
    <>
      <Header />

      <EmailGenerator />
      <Inbox />
    </>
  );
}

export default App;

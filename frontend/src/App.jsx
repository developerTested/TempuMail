import { useState } from "react";
import Header from "./components/Header";
import EmailGenerator from "./components/emailGenerator";
import "./index.css";
import Inbox from "./components/Inbox";

function App() {
  const [email, setEmail] = useState("");

  return (
    <>
      <Header />

      <EmailGenerator setMail={setEmail} />
      <Inbox email={email} />
    </>
  );
}

export default App;

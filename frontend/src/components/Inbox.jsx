import React, { useEffect, useState } from "react";

export default function Inbox() {

  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📩 Inbox mail fetch function
  const fetchInbox = async () => {

    const email = localStorage.getItem("email");

    if (!email.length) {
      return false;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://tempu-mail.vercel.app/api/inbox/${email}`
      );
      const result = await response.json();

      if (result.data) {
        setInbox(result.data);
      }

    } catch (error) {
      console.error("Error while fetching inbox mail", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto refresh inbox every 10 seconds
  useEffect(() => {

    fetchInbox(); // pehle ek baar call karo

    const interval = setInterval(fetchInbox, 10000); // har 10 sec me mail check

    return () => clearInterval(interval); // cleanup on component unmount
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="mt-10 w-full max-w-3xl min-h-[500px] bg-white text-black rounded-md overflow-hidden shadow">
        <div className="bg-gray-200 px-4 py-2 font-semibold flex justify-between">
          <span>SENDER</span>
          <span>SUBJECT</span>
          <span>VIEW</span>
        </div>

        {loading ? (
          <div className="px-4 py-6 text-center text-gray-500">
            Loading emails...
          </div>
        ) : inbox.length === 0 ? (
          <div className="px-4 py-6 text-center text-gray-500">
            No email found yet.
          </div>
        ) : (
          inbox.map((email, index) => (
            <div
              key={index}
              className="px-4 py-3 border-b border-gray-200 flex justify-between items-center"
            >
              <span>{email.sender}</span>
              <span>{email.subject}</span>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => alert(email.body)}
              >
                View
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
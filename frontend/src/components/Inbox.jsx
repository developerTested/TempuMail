import React, { useEffect, useState } from "react";

const Inbox = ({ email }) => {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevLength, setPrevLength] = useState(0);

  // 📩 Inbox mail fetch function
  const fetchInbox = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://tempu-mail.vercel.app/api/inbox?email=${email}`
      );
      const result = await response.json();

      // ✅ Agar naye mail aaye ho to alert dikha do
      if (result.data.length > prevLength) {
        alert("📩 New mail received!");
      }

      setPrevLength(result.data.length); // update previous mail count
      setInbox(result.data);
    } catch (error) {
      console.error("Error while fetching inbox mail", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto refresh inbox every 10 seconds
  useEffect(() => {
    if (!email) return;

    fetchInbox(); // pehle ek baar call karo

    const interval = setInterval(fetchInbox, 10000); // har 10 sec me mail check

    return () => clearInterval(interval); // cleanup on component unmount
  }, [email]);

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

export default Inbox;

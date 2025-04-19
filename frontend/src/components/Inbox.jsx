import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setselectedEmail] = useState(null);

  const fetchInbox = async () => {
    const email = localStorage.getItem("email");

    if (!email?.length) {
      return;
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

  useEffect(() => {
    fetchInbox();
    const interval = setInterval(fetchInbox, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-start w-full min-h-screen  bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-md shadow-md h-[500px] overflow-y-auto">
        {selectedEmail ? (
          <div className="p-6">
            <button
              onClick={() => setselectedEmail(null)}
              className="mb-4 text-blue-600 hover:underline flex items-center"
            >
              ← Back to Inbox
            </button>

            <h2 className="text-2xl font-bold mb-2">{selectedEmail.subject}</h2>
            <p className="text-gray-600 mb-4">From: {selectedEmail.sender}</p>
            <div
              className="prose prose-sm sm:prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
            />
          </div>
        ) : (
          <>
            <div className="bg-[#111827] text-white px-4 py-3 font-semibold text-lg">
              Inbox ({inbox.length})
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-500">
                Loading emails...
              </div>
            ) : inbox.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No emails found
              </div>
            ) : (
              <>
                <div className="bg-gray-200 px-4 py-2 font-semibold grid grid-cols-3 text-sm border-b border-gray-300">
                  <span>SENDER</span>
                  <span>SUBJECT</span>
                  <span className="text-center">VIEW</span>
                </div>

                <div className="divide-y">
                  {inbox.map((email) => (
                    <div
                      key={email.id}
                      className="grid grid-cols-3 items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => setselectedEmail(email)}
                    >
                      <div className="font-medium truncate">{email.sender}</div>
                      <div className="text-sm text-gray-600 truncate">
                        {email.subject}
                      </div>
                      <div className="text-center text-blue-600 hover:underline text-sm">
                        View
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

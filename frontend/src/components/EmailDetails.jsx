// import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EmailDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="p-6 text-center">No email data found.</div>;
  }

  const { sender, subject, body } = state || {};
  console.log(body);

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-6 shadow rounded-md">
      <button onClick={() => navigate(-1)} className="text-blue-600">
        ← Back to Inbox
      </button>
      <h2 className="text-2xl font-semibold mb-2">{subject}</h2>
      <p className="text-gray-500 mb-4 ">from: {sender}</p>
      <div className="whitespace-pre-wrap">{body}</div>

      <div
        className="text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
};

export default EmailDetails;

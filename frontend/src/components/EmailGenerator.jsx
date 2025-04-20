import React, { useEffect, useState, useRef } from "react";

export default function EmailGenerator() {
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [costomMail, setCostomMail] = useState("");

  const fetchMailDetails = async (regenrate = false) => {
    if (regenrate) {
      localStorage.removeItem("email");
    }

    const emailExists = localStorage.getItem("email");

    if (emailExists) {
      setMail(emailExists);
    } else {
      try {
        setLoading(true);

        const response = await fetch(
          `https://tempu-mail.vercel.app/api/generate `
        );

        //  http://localhost:3000/api/generate/
        const result = await response.json();
        setMail(result.data);
        localStorage.setItem("email", result.data);
      } catch (error) {
        console.error("Error while fetching mail", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMailDetails();
  }, []);

  const copyClicBoard = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
    onclick = () => {
      navigator.clipboard.writeText(mail);
    };
  };

  //  costom Mail

  const fetchCostomMailDetails = async (regenrate = false) => {
    if (regenrate) {
      localStorage.removeItem("costomMail");
    }
    const emailExists = localStorage.getItem("costomMail");

    if (emailExists) {
      setCostomMail(emailExists);
    } else {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/custom`);
        const result = await response.json();
        setCostomMail(result.email);
        localStorage.setItem("email", result.email);
      } catch (error) {
        console.error("Errir while creating mail", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCostomMailDetails();
  }, []);

  return (
    <div className="w-full bg-[#111827] text-gray-100 py-16 flex justify-center">
      <div className="bg-[#1f2937] rounded-xl p-8 shadow-xl border border-gray-800 max-w-2xl w-full space-y-6">
        {/* Input  */}
        <h1 className="text-gray-50 text-xl">Generate Random Mail</h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            ref={inputRef}
            type="text"
            value={loading ? "Generating..." : mail}
            disabled={false}
            readOnly
            className="flex-1 bg-transparent text-cyan-400 font-mono text-lg p-3 border border-gray-700 rounded-lg focus:outline-none"
            onFocus={(e) => e.target.select()}
          />
          <button
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-900 transition"
            onClick={copyClicBoard}
          >
            Copy
          </button>
        </div>
        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={() => fetchMailDetails(true)}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </div>

        {/* Custom Email Section */}
        <div className="space-y-6 mt-10">
          <h1 className="text-gray-50 text-xl">Generate Custom Mail</h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              className="flex-1 bg-transparent text-cyan-400 font-mono text-lg p-3 border border-gray-700 rounded-lg focus:outline-none"
              type="text"
              value={costomMail}
              onChange={(e) => setCostomMail(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <button
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-900 transition"
              onClick={() => copyToClipboard(costomMail)}
            >
              Copy
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => fetchCostomMailDetails()} // Implement this
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Custom Email"}
            </button>
          </div>
        </div>

        {/* Description */}
        {/* <p className="text-gray-400 text-center text-sm leading-relaxed">
          Forget about spam, advertising mailings, hacking and attacking robots.
          <br />
          Temp Mail provides temporary, secure, anonymous, free, disposable
          email address.
        </p> */}
        {/* Copy / Refresh Buttons aligned right */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="bg-[#1f2937] border border-gray-600 hover:bg-[#374151] px-6 py-2 rounded text-sm">
            📄 Copy
          </button>
          <button className="bg-[#1f2937] border border-gray-600 hover:bg-[#374151] px-6 py-2 rounded text-sm">
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

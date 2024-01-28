import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Contact({ listing }) {
  const [landlord, setLardlord] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(
          `https://two0fastestate.onrender.com/api/user/${listing.userRef}`
        );
        const data = await res.json();
        setLardlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter Your Message here.."
            className="w-full border rounded-lg p-3"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;

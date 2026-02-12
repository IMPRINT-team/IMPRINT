import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login"); // or "/" if that’s your entry point
  };

  return (
        <div>
            <button onClick={handleLogout} className="logout-button">
                Log out
            </button>
        </div>
  );
};

export default Logout;

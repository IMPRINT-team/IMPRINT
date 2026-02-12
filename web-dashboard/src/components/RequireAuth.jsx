import React from "react"
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  return (
    <div>
        <div>
      <SignedIn>{children}</SignedIn>

      <SignedOut>
        <Navigate
          to={`/login?returnTo=${encodeURIComponent(location.pathname)}`}
          replace
        />
      </SignedOut>
      </div>
    </div>
  );
};

export default RequireAuth;

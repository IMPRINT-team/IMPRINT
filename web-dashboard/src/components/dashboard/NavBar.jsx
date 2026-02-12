import React, { useState } from "react";
import Logout from "./Logout.jsx";
import { SignedIn } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

const linkClasses =
  "rounded-full px-6 sm:px-10 lg:px-16 py-2 whitespace-nowrap " +
  "hover:shadow-glowHover hover:bg-primary/95 hover:text-neutral " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const NavBar = () => {
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <div data-debug-label="NavBar" className="overflow-x-hidden">
      <nav
        aria-label="Primary"
        className="
          mx-auto max-w-screen-xl
          flex flex-wrap items-center justify-center md:justify-between md:flex-nowrap gap-2
          rounded-full border border-primary bg-base-100 shadow-sm
          px-4 py-2
        "
      >
        <NavLink to="/admin/users" className={linkClasses}>
          Users
        </NavLink>

        <NavLink to="/admin/scanners" className={linkClasses}>
          Scanners
        </NavLink>

        <NavLink to="/admin/events" className={linkClasses}>
          Events
        </NavLink>

        {/* Logout Trigger */}
        <SignedIn>
          <button
            type="button"
            onClick={() => setConfirmLogout(true)}
            className={`${linkClasses} min-w-[7rem]`}
            aria-haspopup="dialog"
            aria-expanded={confirmLogout}
          >
            Log out
          </button>
        </SignedIn>
      </nav>

      {/* Logout Confirmation Dialog */}
      {confirmLogout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          <div className="bg-base-100 rounded-xl p-6 shadow-lg text-center w-96 max-w-[90vw]">
            <h2 id="logout-title" className="mb-4 text-lg font-semibold">
              Are you sure you want to log out?
            </h2>

            <div className="flex gap-4 justify-between">
              <button
                type="button"
                onClick={() => setConfirmLogout(false)}
                className="
                  flex-1 rounded-xl px-4 py-2 border
                  hover:bg-base-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                "
              >
                Cancel
              </button>

              <Logout redirectUrl="/login">
                <button
                  type="button"
                  className="
                    flex-1 rounded-xl px-4 py-2 bg-primary text-neutral
                    hover:bg-primary/90
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  "
                >
                  Log out
                </button>
              </Logout>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import Logout from "./Logout.jsx";
import { SignedIn } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

const linkClasses =
  "rounded-xl px-4 py-3 text-left whitespace-nowrap " +
  "hover:shadow-glowHover hover:bg-primary/95 hover:text-neutral " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const NavBar = ({ isOpen, onClose }) => {
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={onClose}
      />

      <aside
        id="dashboard-drawer"
        aria-label="Primary"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-primary bg-base-100 p-4 shadow-xl transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
            Navigation
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            aria-label="Close navigation menu"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/users" className={linkClasses} onClick={onClose}>
            Users
          </NavLink>

          <NavLink to="/admin/scanners" className={linkClasses} onClick={onClose}>
            Scanners
          </NavLink>

          <NavLink to="/admin/events" className={linkClasses} onClick={onClose}>
            Events
          </NavLink>

          <SignedIn>
            <button
              type="button"
              onClick={() => setConfirmLogout(true)}
              className={linkClasses}
              aria-haspopup="dialog"
              aria-expanded={confirmLogout}
            >
              Log out
            </button>
          </SignedIn>
        </nav>
      </aside>

      {confirmLogout && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          <div className="w-96 max-w-[90vw] rounded-xl bg-base-100 p-6 text-center shadow-lg">
            <h2 id="logout-title" className="mb-4 text-lg font-semibold">
              Are you sure you want to log out?
            </h2>

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => setConfirmLogout(false)}
                className="
                  flex-1 rounded-xl border px-4 py-2
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
                    flex-1 rounded-xl bg-primary px-4 py-2 text-neutral
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
    </>
  );
};

NavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NavBar;

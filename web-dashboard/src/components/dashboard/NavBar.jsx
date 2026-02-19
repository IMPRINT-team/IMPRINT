import { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import Logout from "./Logout.jsx";
import { NavLink } from "react-router-dom";

const linkClasses =
  "rounded-xl px-4 py-3 text-left whitespace-nowrap " +
  "hover:shadow-glowHover hover:bg-primary/95 hover:text-neutral " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const NavBar = ({ isOpen, onClose }) => {
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <>
      {/* Backdrop - Only visible on mobile when open */}
      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Sidebar / Drawer */}
      <aside
        id="dashboard-drawer"
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-primary bg-base-100 p-4 shadow-xl transition-transform duration-200
          lg:static lg:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-base-content/50">
            Menu
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="divider my-2"></div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
          <NavLink to="/admin/users" className={linkClasses} onClick={onClose}>
            Users
          </NavLink>

          <NavLink to="/admin/scanners" className={linkClasses} onClick={onClose}>
            Scanners
          </NavLink>

          <NavLink to="/admin/events" className={linkClasses} onClick={onClose}>
            Events
          </NavLink>

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => setConfirmLogout(true)}
              className={`${linkClasses} w-full`}
            >
              Log out
            </button>
          </div>
        </nav>
      </aside>

      {/* Logout Modal */}
      {confirmLogout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="w-96 max-w-[90vw] rounded-xl bg-base-100 p-6 text-center shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">
              Are you sure you want to log out?
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmLogout(false)}
                className="flex-1 rounded-xl border px-4 py-2 hover:bg-base-200"
              >
                Cancel
              </button>
              <Logout redirectUrl="/login">
                <button className="flex-1 rounded-xl bg-primary px-4 py-2 text-neutral hover:bg-primary/90">
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

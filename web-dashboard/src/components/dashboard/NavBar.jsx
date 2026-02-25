import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronRight, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import Logout from "./Logout.jsx";
import { NavLink } from "react-router-dom";

const baseLinkClasses =
  "rounded-xl px-4 py-3 text-left transition-colors duration-200 " +
  "hover:shadow-glowHover hover:bg-primary/95 hover:text-neutral " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const navItems = [
  { to: "/admin/users", label: "Users" },
  { to: "/admin/scanners", label: "Scanners" },
  { to: "/admin/events", label: "Events" },
];

const NavBar = ({
  isOpen,
  onClose,
  isExpanded,
  isPinned,
  onHoverChange,
  onTogglePinned,
}) => {
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

      {/* Mobile Sidebar / Drawer */}
      <aside
        id="dashboard-drawer"
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-primary bg-base-100 p-4 shadow-xl transition-transform duration-200
          lg:hidden
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
            className="btn btn-ghost btn-sm"
            aria-label="Close navigation menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="divider my-2" />

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={baseLinkClasses} onClick={onClose}>
              {item.label}
            </NavLink>
          ))}

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => setConfirmLogout(true)}
              className={`${baseLinkClasses} w-full`}
            >
              Log out
            </button>
          </div>
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className="relative hidden min-h-0 rounded-2xl border border-primary/40 bg-base-100/90 p-3 shadow-xl backdrop-blur lg:flex lg:flex-col"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      >
        <button
          type="button"
          onClick={onTogglePinned}
          aria-label={isPinned ? "Collapse sidebar" : "Pin sidebar open"}
          className="btn btn-ghost btn-sm absolute right-2 top-2 z-10"
        >
          {isPinned ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
        </button>

        <div className="mb-4 mt-2 px-2 text-xs font-bold uppercase tracking-widest text-base-content/50">
          Menu
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={`${baseLinkClasses} ${isExpanded ? "justify-start" : "justify-center px-3"} flex items-center gap-2`}
              title={isExpanded ? undefined : item.label}
            >
              <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                  isExpanded ? "max-w-32 opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          ))}

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => setConfirmLogout(true)}
              className={`${baseLinkClasses} ${
                isExpanded ? "justify-start" : "justify-center px-3"
              } flex w-full items-center gap-2`}
              title={isExpanded ? undefined : "Log out"}
            >
              <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                  isExpanded ? "max-w-32 opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                Log out
              </span>
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
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isExpanded: PropTypes.bool,
  isPinned: PropTypes.bool,
  onHoverChange: PropTypes.func,
  onTogglePinned: PropTypes.func,
};

NavBar.defaultProps = {
  isOpen: false,
  onClose: () => {},
  isExpanded: false,
  isPinned: false,
  onHoverChange: () => {},
  onTogglePinned: () => {},
};

export default NavBar;

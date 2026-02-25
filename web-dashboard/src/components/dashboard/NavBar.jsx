import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronRight, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout.jsx";
import ImprintLogo from "../branding/ImprintLogo.jsx";
import ThemeSelector from "./ThemeSelector.jsx";

const baseLinkClasses =
  "rounded-xl px-3 py-3 text-left transition-colors duration-200 " +
  "hover:shadow-glowHover hover:bg-primary/95 hover:text-neutral " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const navItems = [
  { to: "/admin/users", label: "Users" },
  { to: "/admin/scanners", label: "Scanners" },
  { to: "/admin/events", label: "Events" },
];

const labelTransitionClasses =
  "overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)]";

const getRevealClasses = (isExpanded, expandedWidth = "max-w-[200px]") =>
  isExpanded
    ? `${expandedWidth} opacity-100 translate-x-0`
    : "max-w-0 opacity-0 -translate-x-1";

const CollapsibleLabel = ({ isExpanded, children, expandedWidth }) => (
  <span className={[labelTransitionClasses, getRevealClasses(isExpanded, expandedWidth)].join(" ")}>
    {children}
  </span>
);

CollapsibleLabel.propTypes = {
  isExpanded: PropTypes.bool,
  children: PropTypes.node.isRequired,
  expandedWidth: PropTypes.string,
};

CollapsibleLabel.defaultProps = {
  isExpanded: false,
  expandedWidth: "max-w-[200px]",
};

const DesktopNavItem = ({ to, label, isExpanded }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        baseLinkClasses,
        "flex items-center gap-3",
        isActive ? "border border-primary/30 bg-primary/15 text-primary" : "border border-transparent",
      ].join(" ")
    }
    title={!isExpanded ? label : undefined}
  >
    <span className="grid w-9 place-items-center">
      <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
    </span>
    <CollapsibleLabel isExpanded={isExpanded}>{label}</CollapsibleLabel>
  </NavLink>
);

DesktopNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
};

DesktopNavItem.defaultProps = {
  isExpanded: false,
};

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
      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

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

          <div className="mt-auto flex flex-col gap-2">
            <ThemeSelector isExpanded />

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

      <aside
        className={[
          "relative hidden h-full min-h-0 rounded-2xl border border-primary/40 bg-base-100/90 shadow-xl backdrop-blur",
          "lg:flex lg:flex-col",
        ].join(" ")}
        onMouseEnter={() => !isPinned && onHoverChange(true)}
        onMouseLeave={() => !isPinned && onHoverChange(false)}
      >

          {isExpanded && (
            <button
              type="button"
              onClick={onTogglePinned}
              aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar open"}
              className="btn btn-ghost btn-sm absolute right-2 top-2 z-10"
            >
              {isPinned ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
            </button>
          )}

        <div className="flex min-h-0 flex-1 flex-col p-3">
          <div className="mb-3 mt-2 flex items-center gap-3 px-1">
            <ImprintLogo className="text-primary size-14 shrink-0" aria-hidden="true" />

            <div className={[labelTransitionClasses, getRevealClasses(isExpanded, "max-w-[180px]")].join(" ")}>
              <div className="text-sm font-bold tracking-wide">IMPRINT</div>
              <div className="text-[11px] uppercase tracking-widest opacity-50">Admin</div>
            </div>
          </div>

          <div className="divider my-2" />

          <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-hidden">
            {navItems.map((item) => (
              <DesktopNavItem key={item.to} to={item.to} label={item.label} isExpanded={isExpanded} />
            ))}

            <div className="mt-auto flex flex-col gap-2">
              <ThemeSelector isExpanded={isExpanded} />

              <button
                type="button"
                onClick={() => setConfirmLogout(true)}
                className={[baseLinkClasses, "flex w-full items-center gap-3 border border-transparent"].join(
                  " ",
                )}
                title={!isExpanded ? "Log out" : undefined}
              >
                <span className="grid w-9 place-items-center">
                  <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
                </span>
                <CollapsibleLabel isExpanded={isExpanded}>Log out</CollapsibleLabel>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {confirmLogout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="w-96 max-w-[90vw] rounded-xl bg-base-100 p-6 text-center shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Are you sure you want to log out?</h2>
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

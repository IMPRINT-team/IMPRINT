import { useState } from "react";
import PropTypes from "prop-types";
import {
  ClipboardList,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  MemoryStick,
  Users,
  X,
  TestTubeDiagonal,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout.jsx";
import ImprintLogo from "../branding/ImprintLogo.jsx";
import ThemeSelector from "./ThemeSelector.jsx";

const baseLinkClasses =
  "rounded-xl border border-transparent bg-base-100 px-3 py-3 text-left transition-all duration-500 " +
  "hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const navItems = [
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/scanners", label: "Scanners", icon: MemoryStick },
  { to: "/admin/events", label: "Events", icon: ClipboardList },
  { to: "/TestNew", label: "TestNew", icon: TestTubeDiagonal },
];

const labelTransitionClasses =
  "overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]";

const getRevealClasses = (isExpanded) =>
  isExpanded
    ? "opacity-100"
    : "opacity-0 pointer-events-none";

const CollapsibleLabel = ({ isExpanded, children, expandedWidth }) => (
  <span
    className={[
      labelTransitionClasses,
      getRevealClasses(isExpanded, expandedWidth),
    ].join(" ")}
  >
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

const DesktopNavItem = ({ to, label, icon: Icon, isExpanded }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        baseLinkClasses,
        "flex items-center gap-3 min-w-0" ,
        isActive
          ? "border border-primary/30 bg-primary/15 text-primary"
          : "border border-transparent",
      ].join(" ")
    }
    title={!isExpanded ? label : undefined}
  >
    <span className="flex w-9 shrink-0 items-center justify-center">
      <Icon className="size-4 shrink-0" aria-hidden="true" />
    </span>

    <CollapsibleLabel isExpanded={isExpanded}>
      {label}
    </CollapsibleLabel>
  </NavLink>
);

DesktopNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
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
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-500 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Mobile Drawer */}
      <aside
        className="relative hidden h-full min-h-0 rounded-2xl border border-primary/40 bg-base-100/90 shadow-xl backdrop-blur lg:flex lg:flex-col"
        onMouseEnter={() => !isPinned && onHoverChange(true)}
        onMouseLeave={() => !isPinned && onHoverChange(false)}
      >
        {isExpanded && (
          <button
            type="button"
            onClick={onTogglePinned}
            className="btn btn-ghost btn-round btn-sm absolute right-2 top-2 z-10"
          >
            {isPinned ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeftOpen className="size-4" />
            )}
          </button>
        )}

        <div className="flex min-h-0 flex-1 flex-col p-3">
          {/* Brand Logo Section */}
          <div className="mb-3 mt-2 flex items-center gap-3 px-1">
            <ImprintLogo className="text-primary size-14 shrink-0" />
            <div
              className={[
                labelTransitionClasses,
                getRevealClasses(isExpanded, "max-w-[180px]"),
              ].join(" ")}
            >
              <div className="text-sm font-bold tracking-wide">IMPRINT</div>
              <div className="text-[11px] uppercase tracking-widest opacity-50">
                Admin
              </div>
            </div>
          </div>

          <div className="divider my-2" />

          {/* Main Navigation */}
          <nav className="flex min-h-0 flex-1 flex-col gap-2">
            <div className="flex flex-col gap-2 overflow-y-auto">
              {navItems.map((item) => (
                <DesktopNavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  isExpanded={isExpanded}
                />
              ))}
            </div>

            {/* Bottom Actions - Grouped together */}
            <div className="mt-auto flex flex-col gap-2 pt-2">
              <div className="divider my-2" />
              
              {/* Theme Selector - Ensure this component accepts isExpanded and matches baseLinkClasses internally */}
              <ThemeSelector isExpanded={isExpanded} />

              <button
                type="button"
                onClick={() => setConfirmLogout(true)}
                className={`${baseLinkClasses} flex items-center gap-3 min-w-0`}
                title={!isExpanded ? "Log out" : undefined}
              >
                <span className="flex w-9 shrink-0 items-center justify-center">
                  <LogOut className="size-4 shrink-0" aria-hidden="true" />
                </span>

                <CollapsibleLabel isExpanded={isExpanded}>
                  Log out
                </CollapsibleLabel>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className="relative hidden h-full min-h-0 rounded-2xl border border-primary/40 bg-base-100/90 shadow-xl backdrop-blur lg:flex lg:flex-col"
        onMouseEnter={() => !isPinned && onHoverChange(true)}
        onMouseLeave={() => !isPinned && onHoverChange(false)}
      >
        {isExpanded && (
          <button
            type="button"
            onClick={onTogglePinned}
            className="btn btn-ghost btn-sm absolute right-2 top-2 z-10"
          >
            {isPinned ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeftOpen className="size-4" />
            )}
          </button>
        )}

        <div className="flex min-h-0 flex-1 flex-col p-3">
          <div className="mb-3 mt-2 flex items-center gap-3 px-1">
            <ImprintLogo className="text-primary size-14 shrink-0" />
            <div
              className={[
                labelTransitionClasses,
                getRevealClasses(isExpanded, "max-w-[180px]"),
              ].join(" ")}
            >
              <div className="text-sm font-bold tracking-wide">
                IMPRINT
              </div>
              <div className="text-[11px] uppercase tracking-widest opacity-50">
                Admin
              </div>
            </div>
          </div>

          <div className="divider my-2" />

          <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-hidden">
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                isExpanded={isExpanded}
              />
            ))}

            <div className="mt-auto flex flex-col gap-2">
              <ThemeSelector isExpanded={isExpanded} />

              <button
                type="button"
                onClick={() => setConfirmLogout(true)}
                className={`${baseLinkClasses} flex w-full items-center gap-3`}
              >
                <span className="grid w-9 place-items-center">
                  <LogOut className="size-4 shrink-0" />
                </span>

                <CollapsibleLabel isExpanded={isExpanded}>
                  Log out
                </CollapsibleLabel>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Logout Modal */}
      {confirmLogout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="w-96 max-w-[90vw] rounded-xl bg-base-100 p-6 text-center shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">
              Are you sure you want to log out?
            </h2>
            <div className="flex flex-col gap-3">
              <Logout className="btn btn-outline btn-primary w-full">
                Log out
              </Logout>

              <button
                onClick={() => setConfirmLogout(false)}
                className="btn btn-outline btn-neutral w-full"
              >
                Cancel
              </button>
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
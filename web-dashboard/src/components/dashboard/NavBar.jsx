import {useThemeStore} from "../stores/useThemeStore.js"
import { NavLink } from "react-router-dom";

const BASE_URL = "http://localhost:5173/"

const NavBar = () => {
  return (
    <div>
      <nav aria-label="Primary" className="navbar flex rounded-full border border-primary bg-base-100 shadow-sm row-span-2 align-content-center justify-around">
        <NavLink to="/admin/users" className="border rounded-3xl px-32 py-2 border-transparent hover:shadow-glowHover hover:bg-primary/95 hover:text-neutral">Users</NavLink>
        <NavLink to="/admin/scanners" className="border rounded-3xl px-32 py-2 border-transparent hover:shadow-glowHover hover:bg-primary/95 hover:text-neutral">Scanners</NavLink>
        <NavLink to="/admin/events" className="border rounded-3xl px-32 py-2 border-transparent hover:shadow-glowHover hover:bg-primary/95 hover:text-neutral">Events</NavLink>
      </nav>
    </div>
  );
  }

export default NavBar

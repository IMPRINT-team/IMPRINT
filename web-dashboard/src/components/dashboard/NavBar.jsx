const BASE_URL = "http://localhost:5173/"

const NavBar = () => {
  return (
    <div>
      <div aria-label="Primary" className="navbar flex rounded-3xl border border-base-300/50 bg-base-100/80 px-6 pt-4 shadow-sm row-span-2 align-content-center justify-around">
        <a href="">Users</a>
        <a href="">Scanners</a>
        <a href="">Events</a>
        <a href="">Users</a>
        <a href={BASE_URL + "login"}>Login</a>
      </div>
    </div>
  );
  }

export default NavBar

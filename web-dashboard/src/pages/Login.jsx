import CardShell from "../components/dashboard/CardShell"
import ImprintLogo from "../components/branding/ImprintLogo"

const Login = () => (
  <div className="relative min-h-screen flex items-center justify-center bg-base-100 px-6 text-base-content">
    
    {/* Background Logo */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
      <ImprintLogo className="w-[60rem] h-[60rem]" />
    </div>

    {/* Foreground Login Card */}
    <CardShell className="relative z-10 overflow-hidden">
      <form className="w-full flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">IMPRINT</h1>
          <p className="text-lg">Login</p>
        </div>

        {/* SVG Divider */}
        <svg
          viewBox="0 0 400 10"
          preserveAspectRatio="none"
          className="w-full h-3 opacity-40"
        >
          <line
            x1="0"
            y1="5"
            x2="400"
            y2="5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        {/* Labels and Input Fields */}
        <label className="form-label" htmlFor="txtUsername">
          Username
        </label>
        <input
          className="form-control"
          id="txtUsername"
          type="text"
        />

        <label className="form-label" htmlFor="txtPassword">
          Password
        </label>
        <input
          className="form-control"
          id="txtPassword"
          type="password"
        />

        <button
          id="btnLogin"
          className="btn btn-primary mt-4 w-full"
          type="button"
        >
          Login
        </button>
      </form>
    </CardShell>

  </div>
)

export default Login

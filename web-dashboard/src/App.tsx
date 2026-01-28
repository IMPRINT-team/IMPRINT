import Dashboard from './features/dashboard/Dashboard'
import cors from "cors";

const App = () => {
  const isPlaygroundRoute = window.location.pathname.startsWith('/playground')

  if (isPlaygroundRoute) {
    return (
      <div className="min-h-screen bg-void text-slate-300">
        <Dashboard />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-void text-slate-300 flex items-center justify-center outline">
      <div className="p-6 bg-void outline outline-sky-950 rounded-lg shadow">
        <div className="flex justify-center">
          <h1 className="text-3xl">IMPRINT Login</h1>
        </div>
      </div>
    </main>
  )
}

export default App

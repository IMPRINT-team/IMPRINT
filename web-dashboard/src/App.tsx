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
    <main className="min-h-screen bg-void text-slate-300">
      <section
        className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-16"
        aria-labelledby="imprint-dashboard-title"
      >
        <header className="flex flex-col gap-2">
          <h1
            id="imprint-dashboard-title"
            className="font-serif text-2xl font-black uppercase tracking-tight text-slate-100"
          >
            IMPRINT Dashboard
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Dashboard UI is now available under /playground.
          </p>
        </header>
      </section>
    </main>
  )
}

export default App

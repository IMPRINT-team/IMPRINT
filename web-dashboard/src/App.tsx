import Dashboard from './features/dashboard/Dashboard'

const App = () => {
  const isPlaygroundRoute = window.location.pathname.startsWith('/playground')

  return (
    <div className="min-h-screen bg-void text-slate-300">
      {isPlaygroundRoute ? (
        <Dashboard />
      ) : (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-16">
          <h1 className="font-serif text-2xl font-black uppercase tracking-tight text-slate-100">
            IMPRINT Dashboard
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Dashboard UI is now available under /playground.
          </p>
        </div>
      )}
    </div>
  )
}

export default App

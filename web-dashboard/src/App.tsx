import { useAuth } from '@workos-inc/authkit-react';
import Dashboard from './features/dashboard/Dashboard';
import SignIn from './features/dashboard/signIn';

const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void text-[10px] uppercase tracking-[0.2em] text-slate-500">
        Verifying Session...
      </div>
    );
  }

  // If we have a user, show the Dashboard
  if (user) {
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

export default App;
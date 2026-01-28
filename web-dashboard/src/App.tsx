import { useAuth } from './context/AuthContext';
import Dashboard from './features/dashboard/Dashboard';
import SignIn from './features/dashboard/signIn';
import cors from "cors";

const App = () => {
  const { user, isLoading } = useAuth();

  // 1. Show loading while checking localStorage
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void text-[10px] uppercase tracking-[0.2em] text-slate-500">
        Loading System...
      </div>
    );
  }

  // 2. If User exists (Login Successful), show the Dashboard (Playground)
  if (user) {
    return (
      <div className="min-h-screen bg-void text-slate-300">
        <Dashboard />
      </div>
    );
  }

  // 3. Otherwise, stay on Login
  return <SignIn />;
}

export default App;
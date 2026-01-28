import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      // Success: Save to context
      login(data.token, data.user);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void text-slate-300">
      <div className="flex w-full max-w-md flex-col gap-8 px-6">
        <header className="flex flex-col items-center gap-4 border-b border-cyan-500/30 pb-8">
          <h1 className="font-serif text-3xl font-black uppercase tracking-tight text-slate-100">Imprint</h1>
          <div className="flex items-center gap-3">
             <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-500">Login</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
          
          {error && <div className="bg-red-500/10 border border-red-500/50 p-2 text-center text-xs text-red-400">{error}</div>}

          <div className="flex flex-col gap-4">
            <div className="group flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 focus:border-cyan-500 outline-none" 
                required 
              />
            </div>
            <div className="group flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 focus:border-cyan-500 outline-none" 
                required 
              />
            </div>
          </div>

          <button disabled={loading} type="submit" className="mt-2 flex w-full justify-center rounded bg-cyan-600 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-cyan-500 disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
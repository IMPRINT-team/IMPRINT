import { useAuth } from '@workos-inc/authkit-react';

const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void text-slate-300">
      <div className="flex w-full max-w-md flex-col gap-8 px-6">
        
        {/* Header / Logo Area */}
        <header className="flex flex-col items-center gap-4 border-b border-cyan-500/30 pb-8">
          <h1 className="font-serif text-3xl font-black uppercase tracking-tight text-slate-100">
            Imprint
          </h1>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-slate-700"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-500">
              Login Redirect
            </span>
            <span className="h-px w-8 bg-slate-700"></span>
          </div>
        </header>

        {/* Login Action Panel */}
        <div className="flex flex-col gap-6 rounded border border-slate-800 bg-slate-900/50 p-8 text-center backdrop-blur-sm">

          <button
            onClick={() => signIn()}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded bg-cyan-600 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-cyan-500"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
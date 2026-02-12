import React from "react"
import ImprintLogo from "../components/branding/ImprintLogo";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/playground";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-base-100 px-6 text-base-content">

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <ImprintLogo className="w-[60rem] h-[60rem]" />
      </div>

      {/* If already signed in, go straight to playground */}
      <SignedIn>
        <Navigate to={returnTo} replace />
      </SignedIn>

      {/* Login Card */}
      <SignedOut>
        <div className="w-full max-w-md">
          <SignIn
            signInFields={[
              { identifier: "email_address" },
              { password: true },
            ]}
            appearance={{
              elements: {
                /* Main card */
                card:
                  "bg-white border border-neutral-300 rounded-xl shadow-lg px-8 py-10 w-full",

                /* Header */
                headerTitle:
                  "text-3xl font-bold text-neutral-900 text-center",
                headerSubtitle:
                  "text-sm text-neutral-500 text-center mt-1",

                /* Form layout */
                form:
                  "mt-6 flex flex-col gap-5",

                formFieldRow:
                  "flex flex-col gap-1",

                formFieldLabel:
                  "text-sm font-medium text-neutral-700",

                /* Inputs */
                formFieldInput:
                  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",

                /* Primary button */
                formButtonPrimary:
                  "mt-2 w-full rounded-md bg-primary text-white font-semibold py-2 hover:bg-primary/90 transition",

                /* Footer */
                footer:
                  "mt-6 text-center",

                footerActionText:
                  "text-sm text-neutral-600",

                footerActionLink:
                  "text-sm font-medium text-primary hover:underline",

                /* Hide Clerk branding if you want */
                identityPreview:
                  "hidden",
              },
            }}
          />
        </div>
      </SignedOut>
    </div>
  );
};

export default Login;

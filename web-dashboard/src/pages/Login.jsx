import React from "react"
import CardShell from "../components/dashboard/CardShell";
import ImprintLogo from "../components/branding/ImprintLogo";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-base-100 px-6 text-base-content">

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <ImprintLogo className="w-[60rem] h-[60rem]" />
      </div>

      {/* If already signed in, go straight to playground */}
      <SignedIn>
        <Navigate to="/playground" replace />
      </SignedIn>

      {/* Login Card */}
      <SignedOut>
        <CardShell className="relative z-10 overflow-hidden w-full max-w-md">
          <div className="w-full flex flex-col gap-4">

            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold">IMPRINT</h1>
              <p className="text-lg">Login</p>
            </div>

            {/* Divider */}
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

            {/* Clerk Sign In */}
            <SignIn
              routing="path"
              path="/login"
              redirectUrl="/playground"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "btn btn-primary w-full mt-4",
                  card: "shadow-none bg-transparent p-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "btn btn-outline w-full",
                  formFieldInput:
                    "input w-full border-2 border-neutral-content bg-base-100",
                  formFieldLabel:
                    "label text-sm font-medium text-base-content",
                  footerActionLink:
                    "link link-primary",
                },
              }}
            />
          </div>
        </CardShell>
      </SignedOut>
    </div>
  );
};

export default Login;

import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import {BrowserRouter} from "react-router-dom"
import { ClerkProvider } from '@clerk/clerk-react'


const rootElement = document.getElementById("root")

// From Clerk quickstart. Support both Vite-prefixed and container-injected Clerk env keys.
const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ??
  import.meta.env.CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to VITE_CLERK_PUBLISHABLE_KEY (or CLERK_PUBLISHABLE_KEY) in .env')
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)

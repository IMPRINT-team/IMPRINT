import { SignedIn, SignOutButton } from "@clerk/clerk-react";
import React from "react";

const Logout = ()=>{
    return(
        <div>
            <SignedIn>
            <SignOutButton redirectUrl="/login">
                <button
                className="px-4 py-2 rounded-md border border-neutral-300
                            text-neutral-700 hover:bg-neutral-100
                            transition font-medium">
                Log out
                </button>
            </SignOutButton>
            </SignedIn>
        </div>
    );
}

export default Logout

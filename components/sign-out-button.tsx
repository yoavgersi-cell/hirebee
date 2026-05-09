"use client"

import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-xs text-gray-400 hover:text-gray-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100"
    >
      Sign out
    </button>
  )
}

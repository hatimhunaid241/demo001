"use client";

import { useActionState } from "react";
import { createUser } from "@/actions/admin/users";

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createUser, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Full name"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="admin@example.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
          Password <span className="text-red-400">*</span>
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
        />
      </div>

      {state?.error   && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">✓ User created successfully.</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
      >
        {pending ? "Creating…" : "Create User"}
      </button>
    </form>
  );
}

"use client";

import { useActionState, useState } from "react";
import { sendNewsletter } from "@/actions/admin/newsletter";

const EMAIL_TYPES = ["New Collection", "Showcase", "Reminder"];

// Isolated so a key change causes a full remount, resetting all local state and
// native input values without needing useEffect + multiple setState calls.
function FormInner({ chessSets, subscribers, action, pending, state }) {
  const [selectedSets, setSelectedSets] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState(subscribers.map((s) => s.id));
  const [setSearch, setSetSearch] = useState("");
  const [recipientSearch, setRecipientSearch] = useState("");

  const filteredSets = chessSets.filter((s) =>
    s.name.toLowerCase().includes(setSearch.toLowerCase()),
  );
  const filteredRecipients = subscribers.filter((s) =>
    s.email.toLowerCase().includes(recipientSearch.toLowerCase()),
  );

  function toggleSet(id) {
    setSelectedSets((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleRecipient(id) {
    setSelectedRecipients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function selectAllRecipients() {
    setSelectedRecipients(subscribers.map((s) => s.id));
  }

  function deselectAllRecipients() {
    setSelectedRecipients([]);
  }

  return (
    <form action={action} className="space-y-8">
      {/* Hidden inputs for multi-select values */}
      {selectedSets.map((id) => (
        <input key={`set-${id}`} type="hidden" name="chessSetIds" value={id} />
      ))}
      {selectedRecipients.map((id) => (
        <input key={`rec-${id}`} type="hidden" name="recipientIds" value={id} />
      ))}

      {/* Subject */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
          Subject *
        </label>
        <input
          name="subject"
          type="text"
          required
          placeholder="e.g. Introducing the Ivory Series"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
          Email Type
        </label>
        <select
          name="type"
          defaultValue="Showcase"
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-400 transition-colors bg-white">
          {EMAIL_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Intro text */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
          Intro Text <span className="normal-case font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          name="intro"
          rows={3}
          placeholder="A brief message to open the newsletter…"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-400 transition-colors resize-none"
        />
      </div>

      {/* Chess Set Picker */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
          Chess Sets to Feature *{" "}
          <span className="normal-case font-normal text-gray-400">
            ({selectedSets.length} selected)
          </span>
        </label>
        <input
          type="text"
          placeholder="Search chess sets…"
          value={setSearch}
          onChange={(e) => setSetSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-indigo-400 transition-colors"
        />
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-52 overflow-y-auto">
          {filteredSets.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-400 italic">No sets found</p>
          ) : (
            filteredSets.map((set) => {
              const checked = selectedSets.includes(set.id);
              return (
                <label
                  key={set.id}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSet(set.id)}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm text-gray-700">{set.name}</span>
                </label>
              );
            })
          )}
        </div>
      </div>

      {/* Recipient Picker */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            Recipients *{" "}
            <span className="normal-case font-normal text-gray-400">
              ({selectedRecipients.length} of {subscribers.length})
            </span>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={selectAllRecipients}
              className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors">
              Select all
            </button>
            <button
              type="button"
              onClick={deselectAllRecipients}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Deselect all
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search subscribers…"
          value={recipientSearch}
          onChange={(e) => setRecipientSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-indigo-400 transition-colors"
        />
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-52 overflow-y-auto">
          {filteredRecipients.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-400 italic">No subscribers found</p>
          ) : (
            filteredRecipients.map((sub) => {
              const checked = selectedRecipients.includes(sub.id);
              return (
                <label
                  key={sub.id}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRecipient(sub.id)}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm text-gray-700">{sub.email}</span>
                </label>
              );
            })
          )}
        </div>
      </div>

      {/* Error / Success feedback */}
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}
      {state?.success && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
          <p className="font-medium">
            Sent to {state.sent} of {state.total} subscriber{state.total !== 1 ? "s" : ""}
          </p>
          {state.errors?.length > 0 && (
            <p className="mt-1 text-red-500">{state.errors.length} failed — check server logs</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={pending || selectedSets.length === 0 || selectedRecipients.length === 0}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
        {pending ? "Sending…" : "Send Newsletter"}
      </button>
    </form>
  );
}

export default function SendNewsletterForm({ chessSets, subscribers }) {
  const [state, action, pending] = useActionState(sendNewsletter, null);

  // "setState during render" pattern (React docs approved) to detect each new
  // success and bump the key — no useEffect, no ref access during render.
  const [resetKey, setResetKey] = useState(0);
  const [prevSuccessState, setPrevSuccessState] = useState(null);
  if (state?.success && state !== prevSuccessState) {
    setPrevSuccessState(state);
    setResetKey((k) => k + 1);
  }

  return (
    <FormInner
      key={resetKey}
      chessSets={chessSets}
      subscribers={subscribers}
      action={action}
      pending={pending}
      state={state}
    />
  );
}

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { togglePublished, reorderChessSets } from "@/actions/admin/chess-sets";

export default function ChessSetsTable({ initialSets }) {
  const [sets, setSets] = useState(initialSets);
  const dragId = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  function handleDragStart(e, id) {
    dragId.current = id;
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e, id) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (id !== dragId.current) setDragOver(id);
  }

  function handleDrop(e, targetId) {
    e.preventDefault();
    setDragOver(null);
    if (dragId.current === targetId) return;

    const from = sets.findIndex((s) => s.id === dragId.current);
    const to   = sets.findIndex((s) => s.id === targetId);
    const next = [...sets];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setSets(next);
    reorderChessSets(next.map((s) => s.id));
  }

  function handleDragEnd() {
    dragId.current = null;
    setDragOver(null);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">#</th>
            <th className="px-3 py-3 w-8"></th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Year</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 w-32"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sets.map((set, i) => (
            <tr
              key={set.id}
              draggable
              onDragStart={(e) => handleDragStart(e, set.id)}
              onDragOver={(e) => handleDragOver(e, set.id)}
              onDrop={(e) => handleDrop(e, set.id)}
              onDragEnd={handleDragEnd}
              className={`transition-colors ${
                dragOver === set.id
                  ? "bg-indigo-50 border-t-2 border-indigo-400"
                  : "hover:bg-gray-50"
              }`}
            >
              <td className="px-6 py-4 text-gray-400 font-medium">{i + 1}</td>
              <td className="px-3 py-4 text-gray-300 cursor-grab active:cursor-grabbing select-none text-center">
                ⠿
              </td>
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{set.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{set.slug}</p>
              </td>
              <td className="px-6 py-4 text-gray-500">{set.category}</td>
              <td className="px-6 py-4 text-gray-500">{set.year}</td>
              <td className="px-6 py-4">
                <form action={togglePublished}>
                  <input type="hidden" name="id" value={set.id} />
                  <input type="hidden" name="published" value={String(!set.published)} />
                  <button
                    type="submit"
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer border transition-colors ${
                      set.published
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {set.published ? "Published" : "Draft"}
                  </button>
                </form>
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/admin/chess-sets/${set.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  Edit →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

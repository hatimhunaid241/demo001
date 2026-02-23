"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join("");
}

const allCountries = getCountries().map((code) => ({
  code,
  name: en[code] || code,
  dial: `+${getCountryCallingCode(code)}`,
  flag: getFlagEmoji(code),
}));

export default function PhoneField({ value, onChange, required }) {
  const [country, setCountry] = useState("NL");
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const selected = useMemo(
    () => allCountries.find((c) => c.code === country) || allCountries[0],
    [country]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q
      ? allCountries.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.dial.includes(q) ||
            c.code.toLowerCase().includes(q)
        )
      : allCountries;
  }, [search]);

  // Sync combined value to parent
  useEffect(() => {
    if (onChange) {
      onChange(number ? `${selected.dial}${number.replace(/^0+/, "")}` : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, selected]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search when dropdown opens
  useEffect(() => {
    if (open && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSelect = (c) => {
    setCountry(c.code);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="flex items-end gap-0 border-b border-medium-gray pb-3 focus-within:border-gold transition-colors duration-300 relative">
      {/* ── Country selector ── */}
      <div ref={dropdownRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 pr-4 group outline-none"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="text-xl leading-none">{selected.flag}</span>
          <span className="font-(family-name:--font-cormorant) text-base text-charcoal tracking-wider">
            {selected.dial}
          </span>
          {/* Chevron */}
          <svg
            className={`w-3 h-3 text-text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* ── Dropdown ── */}
        {open && (
          <div className="absolute top-full left-0 mt-3 z-50 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-medium-gray w-72">
            {/* Search */}
            <div className="p-3 border-b border-medium-gray">
              <div className="flex items-center gap-2 border-b border-medium-gray pb-2">
                <svg
                  className="w-3.5 h-3.5 text-text-muted shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path
                    d="M10.5 10.5L14 14"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="flex-1 bg-transparent text-charcoal font-(family-name:--font-cormorant) text-[13px] tracking-wide outline-none placeholder:text-text-muted/50"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-text-muted hover:text-charcoal transition-colors duration-200 text-xs leading-none"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Country list */}
            <ul
              role="listbox"
              className="max-h-60 overflow-y-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-3 font-(family-name:--font-cormorant) text-sm text-text-muted italic text-center">
                  No countries found
                </li>
              ) : (
                filtered.map((c) => (
                  <li
                    key={c.code}
                    role="option"
                    aria-selected={c.code === country}
                    onClick={() => handleSelect(c)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150 ${
                      c.code === country
                        ? "bg-warm-gray"
                        : "hover:bg-warm-gray"
                    }`}
                  >
                    <span className="text-base leading-none shrink-0">{c.flag}</span>
                    <span className="flex-1 font-(family-name:--font-cormorant) text-[13px] tracking-wide text-charcoal truncate">
                      {c.name}
                    </span>
                    <span
                      className={`font-(family-name:--font-cormorant) text-[12px] tracking-wider shrink-0 ${
                        c.code === country ? "text-gold" : "text-text-muted"
                      }`}
                    >
                      {c.dial}
                    </span>
                    {c.code === country && (
                      <svg className="w-3 h-3 text-gold shrink-0" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Thin vertical divider */}
      <div className="w-px h-5 bg-medium-gray mr-4 self-center shrink-0" />

      {/* ── Phone number input ── */}
      <input
        type="tel"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required={required}
        placeholder="Your phone number"
        className="flex-1 bg-transparent border-none outline-none text-charcoal font-(family-name:--font-cormorant) text-base placeholder:text-text-muted/40"
      />
    </div>
  );
}

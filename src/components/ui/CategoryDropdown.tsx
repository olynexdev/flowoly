"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  categories: string[];
  selectedCategory?: string; // your current single-selection value from Redux (keeps compatibility)
  onApply?: (selected: string[]) => void; // called when user clicks Apply
  onClose?: () => void;
};

export default function CategoryDropdown({
  categories = [],
  selectedCategory,
  onApply,
  onClose,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(() =>
    selectedCategory && selectedCategory !== "all"
      ? new Set([selectedCategory])
      : new Set()
  );

  const toggleRef = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!toggleRef.current) return;
      if (!toggleRef.current.contains(e.target as Node)) {
        setOpen(false);
        onClose?.();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    // if redux selectedCategory changes, reflect it in the local selected set
    if (selectedCategory && selectedCategory !== "all") {
      setSelected(new Set([selectedCategory]));
    } else {
      setSelected(new Set());
    }
  }, [selectedCategory]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.toLowerCase().includes(q));
  }, [categories, query]);

  const toggleItem = (c: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const clearAll = () => {
    setSelected(new Set());
  };

  const apply = () => {
    setOpen(false);
    onApply?.(Array.from(selected));
  };

  const selectedCount = selected.size;

  return (
    <div ref={toggleRef} className="relative z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-3 rounded-lg py-[14px] px-[24px] bg-[#000101] border border-[#b3bcb580] text-white shadow-sm"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 6h18M6 12h12M10 18h4"
            stroke="#cbd5e1"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="whitespace-nowrap">Search by category</span>
        <span className="ml-2 text-sm text-slate-400">
          {" "}
          {selectedCount > 0 ? `• ${selectedCount}` : ""}
        </span>
        <svg
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#cbd5e1"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="menu"
          aria-label="Browse categories"
          className="absolute left-0 mt-3 w-[680px] max-w-[90vw] bg-[#0b0e12] border border-[#26303a] rounded-2xl shadow-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-slate-300">Browse By Categories</div>
              <div className="text-xs text-slate-400 mt-1">
                {" "}
                {categories.length}+ Templates
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  clearAll();
                }}
                className="text-sm px-3 py-2 rounded-lg bg-[#0f1720] border border-[#202832] text-slate-300"
              >
                Clear
              </button>
              <button
                onClick={apply}
                className="text-sm px-3 py-2 rounded-lg bg-gradient-to-r from-[#0ea5a4] to-[#06b6d4] text-black font-semibold"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search categories"
                className="w-full rounded-lg border border-[#24313a] px-4 h-12 bg-[#071018] text-white placeholder:text-slate-400"
                aria-label="Search categories"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                {filtered.length}
              </div>
            </div>
          </div>

          {/* Checkbox grid with scroll */}
          <div
            className="max-h-[400px] overflow-auto py-1 pr-2"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {filtered.length === 0 ? (
                <div className="col-span-2 text-slate-400 p-4">
                  No categories found
                </div>
              ) : (
                filtered.map((cat, idx) => {
                  const isChecked = selected.has(cat);
                  return (
                    <label
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#071822] transition-colors cursor-pointer border border-transparent"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(cat)}
                        className="mt-1 w-4 h-4 rounded border-[#2a333b] bg-[#081018] text-green-400"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-white font-medium">
                          {cat}
                        </div>
                        <div className="text-xs text-slate-400">Templates</div>
                      </div>
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {/* optionally helpful hint */}
          <div className="mt-4 text-xs text-slate-400">
            Tip: select multiple categories to refine results.
          </div>
        </div>
      )}
    </div>
  );
}

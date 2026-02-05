"use client";

import { CheckCheck, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Option = {
  id: number;
  name: string;
  slug: string;
};

type SidebarOptionsProps = {
  options: Option[];
  onChange?: (selected: number[]) => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const SidebarOptions = ({
  options,
  onChange,
  selectedIds,
  setSelectedIds,
}: SidebarOptionsProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  console.log(selectedIds);

  /* ---------- Click outside ---------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- Toggle ---------- */
  const toggleOption = (id: number) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];

      onChange?.(next);
      return next;
    });
  };

  const selectedNames = options
    .filter((opt) => selectedIds.includes(opt.id))
    .map((o) => o.name)
    .join(", ");

  /* ---------- Option Row ---------- */
  const OptionRow = (option: Option) => {
    const isSelected = selectedIds.includes(option.id);

    return (
      <label
        key={option.id}
        className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleOption(option.id)}
            className="sr-only"
          />

          <div
            role="checkbox"
            aria-checked={isSelected}
            className={`w-4 h-4 border rounded flex items-center justify-center transition ${
              isSelected ? "bg-black border-black" : "bg-white border-gray-400"
            }`}
          >
            {isSelected && <CheckCheck size={12} className="text-white" />}
          </div>

          <span className="text-sm font-medium">{option.name}</span>
        </div>

        {/* Replace with real count */}
        <span className="text-xs text-gray-400">{option.id * 3}</span>
      </label>
    );
  };

  return (
    <div className="w-full" ref={ref}>
      {/* MOBILE DROPDOWN */}
      <div className="md:hidden relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full bg-white border-b border-gray-300 py-2 px-3 text-left flex justify-between items-center font-semibold hover:bg-gray-50"
        >
          <span className="truncate max-w-[85%]">
            {selectedIds.length ? selectedNames : "Categories"}
          </span>

          <ChevronDown
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`absolute w-full mt-1 bg-white shadow-lg rounded-md max-h-96 overflow-auto transition ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          } origin-top z-10`}
        >
          {options.map(OptionRow)}
        </div>
      </div>

      {/* DESKTOP INLINE */}
      <div className="hidden md:block border rounded-md bg-white">
        <div className="px-3 py-2 font-semibold border-b">Categories</div>
        {options.map(OptionRow)}
      </div>
    </div>
  );
};

export default SidebarOptions;

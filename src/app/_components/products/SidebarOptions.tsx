import { CheckCheck, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SidebarOptionsProps = {
  options: {
    id: number;
    name: string;
    slug: string;
  }[];
};

const SidebarOptions = ({ options }: SidebarOptionsProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border-b border-gray-300 py-2 px-3 text-left flex justify-between items-center font-semibold hover:bg-gray-50 transition"
        aria-expanded={open}
        aria-controls="sidebar-options-list"
      >
        <span className="truncate max-w-[85%]">
          {selected.length > 0 ? selected.join(", ") : "Brands"}
        </span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        id="sidebar-options-list"
        className={`absolute w-full mt-1 bg-white shadow-lg rounded-md max-h-96 overflow-auto transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        } origin-top z-10`}
      >
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 cursor-pointer select-none transition"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(option.name)}
                onChange={() => toggleOption(option.name)}
                className="hidden"
              />
              <div
                className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                  selected.includes(option.name)
                    ? "bg-black border-black"
                    : "bg-white border-gray-400"
                }`}
              >
                {selected.includes(option.name) && (
                  <CheckCheck size={12} className="text-white" />
                )}
              </div>
              <span className="text-sm font-medium">{option.name}</span>
            </div>
            <span className="text-xs text-gray-400">
              {option.id * Math.floor(Math.random() * 10)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SidebarOptions;

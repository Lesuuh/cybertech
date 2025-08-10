import { CheckCheck, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SidebarOptionsProps = {
  options: {
    id: number;
    name: string;
    slug: string;
  }[];
};

const SiderbarOptions = ({ options }: SidebarOptionsProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event?.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border-b border-gray-300 py-2 text-left cursor-pointer "
      >
        {selected.length > 0 ? (
          <span>{selected.join(", ")}</span>
        ) : (
          <div className="text-gray-900 font-semibold flex justify-between items-center cursor-pointer select-none">
            Brands
            <div
              className={`transform transition-transform duration-500 ease-in-out ${
                open ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDown />
            </div>
          </div>
        )}
      </button>
      {open && (
        <div className="absolute mt-1 w-full bg-white max-h-96 overflow-auto z-10">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center py-2 hover:bg-blue-100 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.name)}
                onChange={() => toggleOption(option.name)}
                className="form-checkbox hidden h-4 w-4 text-blue-600 peer"
              />
              <span
                className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center
               peer-checked:bg-black"
              >
                {/* Checkmark icon - SVG */}
                <CheckCheck size={10} className="hidden peer-checked:block" />
              </span>

              <p className="ml-2 font-semibold text-sm flex  items-center">
                {option.name}{" "}
                <span className="text-gray-400 text-xs  ml-2">
                  {option.id * Math.floor(Math.random() * 10)}
                </span>
              </p>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SiderbarOptions;

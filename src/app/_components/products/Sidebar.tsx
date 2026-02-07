import { Dispatch, SetStateAction } from "react";
import SidebarOptions from "./SidebarOptions";

import { categories } from "@/app/data/data";

interface SidebarProps {
  selectedIds: number[];
  setSelectedIds: Dispatch<SetStateAction<number[]>>;
}

const Sidebar = ({ selectedIds, setSelectedIds }: SidebarProps) => {
  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarOptions
          options={categories}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>

      {/* Mobile Dropdown */}
      <div className="block md:hidden z-[999] w-full">
        <SidebarOptions
          options={categories}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>
    </div>
  );
};

export default Sidebar;

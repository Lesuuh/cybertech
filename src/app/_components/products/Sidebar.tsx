import SiderbarOptions from "./SidebarOptions";

import { categories } from "@/app/data/data";

const Sidebar = () => {
  return (
    <div>
      <SiderbarOptions options={categories} />
    </div>
  );
};

export default Sidebar;

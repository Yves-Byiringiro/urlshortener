import { useState } from "react";
import { SideNavigation } from "./side-navigation";
import { TopNavigation } from "./top-navigation";
import classNames from "classnames";

export const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SideNavigation open={open} setOpen={setOpen} />
      <TopNavigation />

      <div
        className={classNames(
          "text-base transition lg:p-0 p-8 bg-[#f4f6fa] text-black min-h-[100vh] !pt-[60px] lg:pl-[230px]"
        )}
      >
        {children}
      </div>
    </>
  );
};

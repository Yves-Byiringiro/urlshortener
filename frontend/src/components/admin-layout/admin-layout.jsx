import { useState } from "react";
import { SideNavigation } from "./side-navigation";
import { TopNavigation } from "./top-navigation";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router";


export const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const {isAuthenticated }  = useSelector(state=>state.auth);

  const location = useLocation();

  if(!isAuthenticated){
      return <Navigate to="/login" replace state={{from:location}} />
  }
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

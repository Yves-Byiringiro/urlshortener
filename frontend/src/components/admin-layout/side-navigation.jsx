import { Link } from "react-router-dom";
import { FaChartSimple } from "react-icons/fa6";
import { FiHome, FiGlobe } from "react-icons/fi";
import { IoLink, IoQrCode } from "react-icons/io5";
import { LuFolderHeart } from "react-icons/lu";
import { RiPagesLine } from "react-icons/ri";
import { Button } from "../button";
import classNames from "classnames";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

export const SideNavigation = ({ open, setOpen }) => {
  return (
    <>
      <div>
        {!open && (
          <button
            className={classNames(
              "flex fixed top-3 left-4 z-50 items-center gap-1 px-2 text-black bg-gray-50"
            )}
            onClick={() => setOpen(!open)}
          >
            <GiHamburgerMenu className="text-4xl" />
          </button>
        )}
      </div>
      <div
        className={classNames(
          "fixed top-0 -left-96 transition lg:left-0 bottom-0 p-3 w-[230px] border-r border-r-gray-300 bg-white z-40",
          {
            "!left-0": open,
          }
        )}
      >
        <div className="flex content-between items-center">
          <div className="flex-1">
            <img
              src="/logo.svg"
              width={200}
              height={100}
              alt="Main Yves"
              className="w-[100px] h-[50px]"
            />
          </div>

          <button
            className="p-2 bg-red-200 text-red-500 rounded-full"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
        </div>

        <div className="flex flex-col pt-8">
          <Button variant="blue">Create new</Button>

          <div className="text-black border-t mt-2 border-gray-200 flex flex-col gap-3 pt-6">
            {[ 
              { icon: <FiHome />, title: "Home", to: "/home" },
              { icon: <IoLink />, title: "Links", to: "/links" },
              { icon: <IoQrCode />, title: "QR Codes", to: "#" },
              { icon: <RiPagesLine />, title: "Pages", to: "#" },
              { icon: <FaChartSimple />, title: "Analytics", to: "/analytics" },
              { icon: <LuFolderHeart />, title: "Campaigns", to: "#" },
              { icon: <FiGlobe />, title: "Custom domain", to: "#" },
            ].map(({ icon, title, to }, index) => (
              <Link
                to={to} 
                className="flex gap-2 items-center px-3 rounded border-l-4 border-l-transparent hover:border-l-blue-500 hover:text-blue-600 hover:bg-blue-100 p-2"
                key={index}
              >
                <span className="text-xl">{icon}</span>
                <span>{title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


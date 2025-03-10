import { Button } from "./button";
import { MdKeyboardArrowDown, MdLanguage, MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Banner } from "./banner";
import { GiHamburgerMenu } from "react-icons/gi";

export const Navigation = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <nav className="border-b border-gray-700 bg-[#031f39]">
      <Banner />
      <div className="px-3 lg:px-0 app-container py-2 mx-auto flex items-center justify-between">
        <img
          src="../../public/logo.svg"
          width={200}
          height={100}
          alt="YB"
          className="w-[100px] h-[50px]"
        />

        <button className="lg:hidden block">
          <GiHamburgerMenu className="text-3xl" />
        </button>
        <div className="hidden lg:flex gap-4">
          {["Platform", "Solutions", "Pricing", "Resources"].map((app) => (
            <Link key={app} to={app} className="flex gap-1 items-center">
              {app} <MdKeyboardArrowDown />
            </Link>
          ))}
        </div>
        <div className="gap-2 hidden lg:flex">
          <Button variant="ghost" className="flex items-center gap-2">
            <MdLanguage /> Lang <MdOutlineArrowDropDown />
          </Button>
          <Button variant="ghost" onClick={handleLoginClick}>Login</Button>
          <Button variant="outline" onClick={handleSignUpClick}>Get a quote</Button>
          <Button variant="white" onClick={handleSignUpClick}>Sign up Free</Button>
        </div>
      </div>
    </nav>
  );
};

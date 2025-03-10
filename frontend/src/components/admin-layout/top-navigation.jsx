import { MdAccountCircle } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutState } from "../../context/slices/auth.slice";
import { useNavigate } from "react-router-dom";

export const TopNavigation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log("======================================")
  console.log(user)
  console.log("======================================")


  const handleLogout = () => {
    dispatch(logoutState());
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <div className="fixed text-black top-0 left-0 pl-[230px] right-0 px-3 flex items-center justify-end h-[60px] border-b border-b-gray-300 bg-white z-30">
      <div className="relative">
        <button
          className="flex items-center gap-1 px-2 bg-gray-50"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <MdAccountCircle className="text-4xl" />
          <span>{user?.username}</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

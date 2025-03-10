import { MdAccountCircle } from "react-icons/md";

export const TopNavigation = () => (
  <div className="fixed text-black top-0 left-0 pl-[230px] right-0 px-3 flex items-center justify-end h-[60px] border-b border-b-gray-300 bg-white z-30">
    <div>
      <button className="flex items-center gap-1 px-2 bg-gray-50">
        <MdAccountCircle className="text-4xl" /> <span>Yves</span>
      </button>
    </div>
  </div>
);

import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { baseURL } from "../context/api";
import {
  MdCalendarMonth,
  MdEdit,
  MdLink,
  MdOutlineContentCopy,
} from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { AdminLayout } from "../components/admin-layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserURLs } from "../context/slices/urls.slice";
import { useNavigate } from "react-router-dom";

export default function Links() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userUrls } = useSelector((state) => state.urls);

  useEffect(()=> {
    dispatch(getUserURLs());
  }, [])

  return (
    <>
      <AdminLayout>
        <div className="mx-auto app-container pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Yburl Links</h2>
            <Button variant="blue" onClick={() => navigate('/home')}>Create link</Button>
          </div>
          <div className="pt-2 pb-3 border-b border-gray-200">
            <input
              className="p-1 bg-white border-gray-400 rounded border w-[400px]"
              placeholder="Search"
              type="search"
            />
          </div>

          <div className="py-6 flex flex-col gap-3">
            {userUrls?.map(
              ({ short_code, long_url, created_at }, index) => (
                <div key={index} className="p-4 bg-white rounded-xl">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-full p-2 text-4xl bg-orange-100 text-orange-500">
                      <MdLink />
                    </div>

                    <div className="flex flex-col flex-1 gap-0.5">
                      <a
                        className="text-lg hover:underline font-bold"
                        href={`${baseURL}/${short_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {baseURL}/{short_code}
                      </a>
                      <a
                        className="text hover:underline text-blue-700 font-bold"
                        href={`${baseURL}/${short_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {baseURL}/{short_code}
                      </a>
                      <a
                        className="text-base hover:underline"
                        href={long_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {long_url}
                      </a>

                      <div className="pt-4 text-black flex items-center gap-1 opacity-90">
                        <MdCalendarMonth size={20}/> {created_at}
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-1">
                        {[
                          { title: "Copy", icon: <MdOutlineContentCopy /> },
                          { title: "Share", icon: <IoMdShare /> },
                          { title: "", icon: <MdEdit /> },
                        ].map(({ icon, title }, index) => (
                          <button
                            key={index}
                            className={`flex items-center ${title != 'Copy'? 'border' : 'bg-gray-100'}  p-2 px-2 gap-2 rounded`}
                          >
                            {icon} <span className="text-sm font-semibold">{title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

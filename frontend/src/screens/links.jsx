import { Button } from "../components/button";
import { Link } from "react-router-dom";
import {
  MdCalendarMonth,
  MdEdit,
  MdLink,
  MdOutlineContentCopy,
} from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { AdminLayout } from "../components/admin-layout/admin-layout";

export default function Links() {
  return (
    <>
      <AdminLayout>
        <div className="mx-auto app-container pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">yb url Links</h2>

            <Button variant="blue">Create link</Button>
          </div>
          <div className="pt-2 pb-3 border-b border-gray-200">
            <input
              className="p-1 bg-white border-gray-400 rounded border w-[400px]"
              placeholder="Search"
              type="search"
            />
          </div>

          <div className="py-6 flex flex-col gap-3">
            {[
              {
                title: "Line Height - Tailwind CSS",
                link: "#",
                shortUrlName: "bit.ly/4kAVGEU",
                fullLink: "https://v2.tailwindcss.com/docs/line-height",
                createdDate: "Mar 10, 2025",
              },
              {
                title: "New website",
                link: "#",
                shortUrlName: "bit.ly/4kAVGEU",
                fullLink: "https://v2.tailwindcss.com/docs/line-height",
                createdDate: "Mar 10, 2025",
              },
              {
                title: "Connection here",
                link: "#",
                shortUrlName: "bit.ly/4kAVGEU",
                fullLink: "https://v2.tailwindcss.com/docs/line-height",
                createdDate: "Mar 10, 2025",
              },
            ].map(
              ({ title, shortUrlName, fullLink, link, createdDate }, index) => (
                <div key={index} className="p-4 bg-white">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-full p-2 text-4xl bg-orange-100 text-orange-500">
                      <MdLink />
                    </div>

                    <div className="flex flex-col flex-1 gap-0.5">
                      <Link
                        className="text-lg hover:underline font-bold"
                        href={link}
                      >
                        {title}
                      </Link>

                      <Link
                        className="text hover:underline text-blue-700 font-bold"
                        href={link}
                      >
                        {shortUrlName}
                      </Link>
                      <Link className="text-sm hover:underline" href={link}>
                        {fullLink}
                      </Link>

                      <div className="pt-4 flex items-center gap-1 opacity-20">
                        <MdCalendarMonth /> {createdDate}
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-1">
                        {[
                          { title: "Copy", icon: <MdOutlineContentCopy /> },
                          { title: "Share", icon: <IoMdShare /> },
                          { title: "Edit", icon: <MdEdit /> },
                        ].map(({ icon, title }, index) => (
                          <button
                            key={index}
                            className="flex items-center bg-gray-100 p-1 px-2 gap-2 rounded"
                          >
                            {icon} <span className="text-sm">{title}</span>
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

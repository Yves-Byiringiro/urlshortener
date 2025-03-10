import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  MdCalendarMonth,
  MdEdit,
  MdLink,
  MdOutlineContentCopy,
} from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { AdminLayout } from "../components/admin-layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserAnalyticsURLs } from "../context/slices/urls.slice";

export default function Analytics() {
  const dispatch = useDispatch();
  const { urlsAnalytics,  } = useSelector((state) => state.urls);
  console.log("-------------------------------------------")
  console.log(urlsAnalytics)

  useEffect(()=> {
    dispatch(getUserAnalyticsURLs());
  }, [])

  return (
    <>
      <AdminLayout>
        <div className="mx-auto app-container pt-4">
          
          

         
        </div>
      </AdminLayout>
    </>
  );
}

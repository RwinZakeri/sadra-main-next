import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserDashboard from "./user/UserDashboard";
import TeacherDashbaord from "./teacher/TeacherDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import { showToast } from "@/components/module/AuthModules/Toastify";

//css

function DashboardHandler() {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard/whoami", {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        setUserId(response.data._id);
        setUserRole(response.data.role);
        setUserEmail(response.data.email);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setUserRole("error");
      });
  }, []);

  const navigate = useRouter();

  const clickHandler = () => {
    navigate.push("/login");
  };

  return (
    <div dir="rtl" className="panelContainer">
      {userRole === "USER" ? (
        <UserDashboard
          userId={userId}
          userEmail={userEmail}
          userRole={userRole}
        />
      ) : userRole === "TEACHER" ? (
        <TeacherDashbaord
          userId={userId}
          userEmail={userEmail}
          userRole={userRole}
        />
      ) : userRole === "ADMIN" ? (
        <AdminDashboard
          userId={userId}
          userEmail={userEmail}
          userRole={userRole}
        />
      ) : (
        <>
          <h1>ابتدا باید وارد شوید !</h1>
          <button
            className="login_Btn"
            style={{ cursor: "pointer" }}
            onClick={clickHandler}
          >
            ورود
          </button>
        </>
      )}
    </div>
  );
}

export default DashboardHandler;

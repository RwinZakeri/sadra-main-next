"use client";
import React, { useEffect, useState } from "react";
import NewClass from "./NewClass";
import { Divider } from "@mui/material";
import SignOutButton from "../../SignOutButton";
import axios from "axios";

import Drawer from "@mui/material/Drawer";
import { IoPerson } from "react-icons/io5";
import Box from "@mui/material/Box";
import Loading from "../../../../helper/Loading";
import Link from "next/link";
import ClassCard from "@/components/module/classes_module/ClassCard";
import { adminCategories, categories } from "../../Categories";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/module/AuthModules/Toastify";

function ClassList() {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teacherClass, setTeacherClass] = useState([]);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard/whoami", {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        const { role, _id } = response.data;
        setUserRole(role);
        setUserId(_id);

        return axios.get(`http://localhost:3001/api/classes/data/t/${_id}`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        });
      })
      .then((response2) => {
        setTeacherClass(response2.data.data);
        return axios.get("http://localhost:3001/api/classes/data", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        });
      })
      .then((response3) => {
        setLoading(false);
        setData(response3.data.data);
      })
      .catch((firstError) => {
        console.error(
          "Error:",
          firstError.response ? firstError.response.data : firstError.message
        );
        setUserRole("error");
      });
  }, []);

  const router = useRouter();
  const editHandler = (id) => {
    router.push(`/dashboard/teacher/classes/${id}`);
  };
  const deleteHandler = (id) => {
    if (confirm("آیا از حذف این ایتم اطمینان دارید؟")) {
      axios
        .delete(`http://localhost:3001/api/admin/panel/classes/${id}`, {
          withCredentials: true,
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        })
        .then((response) => {
          if (response.data.data.deletedCount === 1)
            showToast("ایتم با موفقیت حذف شد!", "success");
        })
        .catch((error) => {
          showToast(
            "در حذف کردن مشکلی پیس آمد! با پشتیبانی در ارتباط باشید",
            "error"
          );
        });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : userRole === "TEACHER" || userRole === "ADMIN" ? (
        <div dir="rtl" className="panelContainer">
          <div className="userPanel" dir="rtl">
            <div className="sideBarPanel">
              <div>
                {userRole === "TEACHER" ? (
                  categories.map((item) => (
                    <Link key={item.title} href={item.link}>
                      {item.title}
                    </Link>
                  ))
                ) : userRole === "ADMIN" ? (
                  adminCategories.map((item) => (
                    <Link key={item.title} href={item.link}>
                      {item.title}
                    </Link>
                  ))
                ) : (
                  <h3>ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.</h3>
                )}
              </div>
              <div>
                <SignOutButton />
              </div>
            </div>
            <div className="mainPanel">
              <div className="CardBoxContainer">
                {!data ? (
                  <Loading />
                ) : (
                  teacherClass?.slice(0, 7).map((item) => (
                    <div key={item.id}>
                      <Link key={item.id} href={`/classes/${item.id}`}>
                        <ClassCard key={item.id} {...item} />
                      </Link>

                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          gap: "1px",
                          marginTop: "-3.2rem",
                        }}
                      >
                        <button
                          className="login_Btn_No_Hid"
                          onClick={() => editHandler(item.id)}
                          style={{
                            width: "fit-content",
                            marginTop: "2rem",
                            cursor: "pointer",
                            backgroundColor: "darkblue",
                          }}
                          type="button"
                        >
                          ویرایش
                        </button>
                        <button
                          className="login_Btn_No_Hid"
                          onClick={() => deleteHandler(item.id)}
                          style={{
                            width: "fit-content",
                            marginTop: "2rem",
                            cursor: "pointer",
                            backgroundColor: "brown",
                          }}
                          type="button"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {!teacherClass && (
                <div>
                  <Divider />
                  <br />
                </div>
              )}
              <div>
                <h3 style={{ marginBottom: "1rem", marginTop: "2rem" }}>
                  برای ثبت کلاس از فرم زیر استفاده کنید:
                </h3>
                <NewClass />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>یک بار از حساب کاربری خود خارج شوید و دوباره وارد شوید.</h3>
      )}
      {/* Responsive */}

      <div className="MobileDrawerDash">
        <button onClick={mobileSetting} className="drawerButton">
          {" "}
          <IoPerson style={{ width: 20, height: 20 }} />
        </button>
      </div>

      <Drawer anchor="left" open={setting} onClose={() => setSetting(false)}>
        <Box>
          <ul className="dashboardList">
            {categories.map((item) => (
              <li key={item.title}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </Box>
      </Drawer>

      {/* Responsive */}
    </>
  );
}

export default ClassList;

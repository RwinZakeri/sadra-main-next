"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SignOutButton from "../../SignOutButton";
import { IoPerson } from "react-icons/io5";
import { Box, Divider, Drawer } from "@mui/material";
import Loading from "../../../../helper/Loading";
import { adminCategories, categories } from "../../Categories";
import Link from "next/link";
import { showToast } from "@/components/module/AuthModules/Toastify";
import { ToastContainer } from "react-toastify";

function ContactList() {
  const [userRole, setUserRole] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard/whoami", {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        const { role } = response.data;
        setUserRole(role);

        return axios.get(`http://localhost:3001/api/admin/panel/contact-us`, {
          withCredentials: true,
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        });
      })
      .then((response2) => {
        setData(response2.data.data);
      })
      .catch((firstError) => {
        console.error(
          "Error:",
          firstError.response ? firstError.response.data : firstError.message
        );
        setUserRole("error");
      });
  }, []);

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  const deleteHandler = (id) => {
    if (confirm("آیا از حذف این ایتم اطمینان دارید؟")) {
      axios
        .delete(`http://localhost:3001/api/admin/panel/contact-us/${id}`, {
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
      {userRole === "ADMIN" ? (
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
              <h1 style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                نظرات ارسال شده:
              </h1>
              <div className="resume-list">
                {!data ? (
                  <Loading />
                ) : (
                  data?.map((item) => (
                    <div key={item.id} className="resume-item">
                      <div
                        className="resume-details"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p>نام: {item.firstName}</p>
                        <p>نام خانوادگی: {item.lastName}</p>
                        <p>
                          شماره تلفن همراه:{" "}
                          <Link href={`tel:${item.phoneNumber}`}>
                            {item.phoneNumber}
                          </Link>
                        </p>
                        <p>متن نوشته شده: {item.description}</p>
                        <p>
                          تاریخ ارسال: <span>{item.date}</span>
                        </p>
                      </div>
                      <Divider />
                      <div style={{ marginTop: "1rem" }}>
                        <button
                          className="login_Btn_No_Hid"
                          onClick={() => deleteHandler(item._id)}
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
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
            {adminCategories.map((item) => (
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

export default ContactList;

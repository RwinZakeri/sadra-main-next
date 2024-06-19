"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SignOutButton from "../../SignOutButton";
import { IoPerson } from "react-icons/io5";
import Loading from "../../../../helper/Loading";
import Link from "next/link";
import { adminCategories, categories } from "../../Categories";
import { Divider } from "@mui/material";
import { showToast } from "@/components/module/AuthModules/Toastify";
import { ToastContainer } from "react-toastify";

function Resume() {
  const [data, setData] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [setting, setSetting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseToken = await axios.get(
          "http://localhost:3001/api/admin/panel/resume",
          {
            withCredentials: true,
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        );
        setData(responseToken.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

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
      })
      .catch((error) => {
        console.error("Error fetching user role:", error);
      });
  }, []);

  const mobileSetting = () => {
    setSetting((prev) => !prev);
  };

  const deleteHandler = (id) => {
    if (confirm("آیا از حذف این ایتم اطمینان دارید؟")) {
      axios
        .delete(`http://localhost:3001/api/admin/panel/resume/${id}`, {
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
              <div>
                <div>
                  <div className="MobileDrawerDash">
                    <button onClick={mobileSetting} className="drawerButton">
                      {" "}
                      <IoPerson style={{ width: 20, height: 20 }} />
                    </button>
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: "2rem" }}>
                    <h1>رزومه های ارسال شده:</h1>
                  </div>
                  <div className="resume-list">
                    {!data ? (
                      <Loading />
                    ) : (
                      data?.map((item) => {
                        return (
                          <div key={item.id} className="resume-item">
                            <div
                              className="resume-details"
                              style={{ marginBottom: "1rem" }}
                            >
                              <p>نام: {item.author.firstName}</p>
                              <p>نام خانوادگی: {item.author.lastName}</p>
                              <p>نام کاربری: {item.author.username}</p>
                              <p>
                                تلفن همراه:{" "}
                                <Link href={`tel:${item.author.phoneNumber}`}>
                                  {item.author.phoneNumber}
                                </Link>
                              </p>
                              {item.selectedJob && (
                                <>
                                  <p>
                                    موقعیت شغلی مورد نظر:{" "}
                                    {item.selectedJob.jobTitle}
                                  </p>
                                  <p>
                                    زمان موقعیت شغلی: {item.selectedJob.jobTime}
                                  </p>
                                  <p>
                                    مکان موقعیت شغلی:{" "}
                                    {item.selectedJob.jobPlace}
                                  </p>{" "}
                                  <p>تاریخ ارسال: {item.date}</p>
                                </>
                              )}
                            </div>
                            <div
                              className="resume-download"
                              style={{ marginBottom: "1rem" }}
                            >
                              <button className="login_Btn_No_Hid">
                                <a href={`/${item.resume}`} download={true}>
                                  دانلود رزومه
                                </a>
                              </button>
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
                        );
                      })
                    )}
                  </div>
                </div>
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
    </>
  );
}

export default Resume;

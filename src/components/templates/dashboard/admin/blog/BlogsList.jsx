import React, { useEffect, useState } from "react";
import SignOutButton from "../../SignOutButton";
import axios from "axios";
import { Divider, Grid } from "@mui/material";
import NewBlog from "./NewBlog";
import Drawer from "@mui/material/Drawer";
import { IoPerson } from "react-icons/io5";
import Box from "@mui/material/Box";
import Loading from "../../../../helper/Loading";
import { adminCategories, categories } from "../../Categories";
import Link from "next/link";
import BlogCard from "@/components/module/blog_module/BlogCard";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/module/AuthModules/Toastify";

function BlogsList() {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teacherBlog, setTeacherBlog] = useState([]);

  const [loading, setLoading] = useState(true);

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
        if (_id) {
          axios
            .get(`http://localhost:3001/api/blog/data`, {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
              },
            })
            .then((secondResponse) => {
              setLoading(false);
              setTeacherBlog(secondResponse.data.data);
            })
            .catch((secondError) => {
              console.error(
                "Second Request Error:",
                secondError.response
                  ? secondError.response.data
                  : secondError.message
              );
            });
        }
      })
      .catch((firstError) => {
        console.error(
          "First Request Error:",
          firstError.response ? firstError.response.data : firstError.message
        );
        setUserRole("error");
      });
  }, []);

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  const router = useRouter();
  const editHandler = (id) => {
    router.push(`/dashboard/admin/blog/${id}`);
  };
  const deleteHandler = (id) => {
    if (confirm("آیا از حذف این ایتم اطمینان دارید؟")) {
      axios
        .delete(`http://localhost:3001/api/admin/panel/blog/${id}`, {
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

  const isShownHandler = (id, isShown) => {
    const formData = new FormData();
    let newIsShown = isShown ? false : true;
    formData.append("isShown", newIsShown);
    if (confirm("آیا از این عملیات اطمینان دارید؟")) {
      axios
        .put(`http://localhost:3001/api/admin/panel/blog/${id}`, formData, {
          withCredentials: true,
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        })
        .then((response) => {
          if (response.status === 201)
            showToast("ایتم با موفقیت اپدیت شد! رفرش کنید.", "success");
        })
        .catch((error) => {
          showToast(
            "در اپدیت کردن مشکلی پیش آمد! با پشتیبانی در ارتباط باشید",
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
        <div className="panelContainer">
          {userRole === "TEACHER" || userRole === "ADMIN" ? (
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
                    <h3>
                      ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.
                    </h3>
                  )}
                </div>

                <div>
                  <SignOutButton />
                </div>
              </div>
              <div className="mainPanel">
                <div
                  className="blogCardsContainer"
                  style={{ marginTop: "5rem", marginBottom: "2rem" }}
                >
                  <Grid container spacing={3}>
                    {!teacherBlog ? (
                      <Loading />
                    ) : (
                      teacherBlog?.map((card, index) => {
                        return (
                          <Grid item key={index} xs={12} sm={6} md={4}>
                            <BlogCard
                              id={card.id}
                              imageData={card.imageData}
                              date={card.date}
                              title={card.title}
                              description={card.description}
                              author={card.author}
                              hashtags={card.hashtags}
                            />
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                gap: "1px",
                                marginTop: "-3.2rem",
                              }}
                            >
                              <div>
                                <button
                                  className="login_Btn_No_Hid"
                                  onClick={() => editHandler(card.id)}
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
                              </div>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                  className="login_Btn_No_Hid"
                                  onClick={() =>
                                    isShownHandler(card.id, card.isShown)
                                  }
                                  style={{
                                    width: "fit-content",
                                    marginTop: "2rem",
                                    cursor: "pointer",
                                    backgroundColor: card.isShown
                                      ? "darkred"
                                      : "green",
                                  }}
                                  type="button"
                                >
                                  {card.isShown ? (
                                    <span>مخفی کردن</span>
                                  ) : (
                                    <span>نمایش دادن</span>
                                  )}
                                </button>
                                <button
                                  className="login_Btn_No_Hid"
                                  onClick={() => deleteHandler(card.id)}
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
                          </Grid>
                        );
                      })
                    )}
                  </Grid>
                </div>
                {!teacherBlog && (
                  <div>
                    <br />
                    <Divider />
                    <br />
                  </div>
                )}
                <h3>برای ثبت بلاگ از فرم زیر استفاده کنید:</h3>
                <br />
                <NewBlog />
              </div>
            </div>
          ) : (
            <h2>ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.</h2>
          )}
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
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </Box>
      </Drawer>

      {/* Responsive */}
    </>
  );
}

export default BlogsList;

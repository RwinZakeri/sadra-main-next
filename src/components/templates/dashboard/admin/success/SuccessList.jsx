"use client";
import React, { useEffect, useState } from "react";
import SignOutButton from "../../SignOutButton";
import { Avatar, Button, Divider, Paper, Typography } from "@mui/material";
import NewSuccess from "./NewSuccess";
import axios from "axios";
import { Masonry } from "@mui/lab";
import { IoPerson } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import Loading from "../../../../helper/Loading";
import { useRouter } from "next/navigation";
import { adminCategories } from "../../Categories";
import Link from "next/link";
import VideoComponent from "@/components/VideoComponent";
import { showToast } from "@/components/module/AuthModules/Toastify";
import Image from "next/image";
function SuccessList() {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
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
        const { role, _id } = response.data;
        setUserRole(role);
        setUserId(_id);

        return axios.get("http://localhost:3001/api/student-success/data", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        });
      })
      .then((response4) => {
        setData(response4.data.data);
      })
      .catch((firstError) => {
        console.error(
          "Error:",
          firstError.response ? firstError.response.data : firstError.message
        );
        setUserRole("error");
      });
  }, []);

  const navigate = useRouter();

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  const deleteHandler = (id) => {
    if (confirm("آیا از حذف این ایتم اطمینان دارید؟")) {
      axios
        .delete(`http://localhost:3001/api/admin/panel/student-success/${id}`, {
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

  const handleEdit = (id) => {
    navigate.push(`/dashboard/admin/success/${id}`);
  };

  return (
    <>
      {userRole === "ADMIN" ? (
        <div dir="rtl" className="panelContainer">
          <div className="userPanel" dir="rtl">
            <div className="sideBarPanel">
              <div>
                {userRole === "ADMIN" ? (
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Masonry
                  columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
                  gutter={2}
                  style={{ width: "100%" }}
                >
                  {!data ? (
                    <Loading />
                  ) : (
                    data?.map((item) => (
                      <div key={item.id}>
                        {item?.videoSrc ? (
                          <VideoComponent
                            UrlAutorName={item.authorName}
                            videoSrc={`/${item.videoSrc}`}
                            videoTitle={item.videoTitle}
                            videoJob={item.videoJob}
                            videoThumbnail={`/${item.videoThumbnail}`}
                          />
                        ) : (
                          <Paper
                            spacing={2}
                            textalign={"center"}
                            sx={{
                              boxSizing: "border-box",
                              padding: "1.5rem 1.25rem",
                              textJustify: "inter-word",
                              textalign: "justify",
                              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)",
                              borderRadius: "0.625rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                                marginBottom: "1rem",
                                marginTop: "1rem",
                                boxSizing: "border-box",
                                cursor: "pointer",
                              }}
                              // onClick={() => clickHandler({name: item.authorName})}
                            >
                              <Avatar
                                src={`/${item?.author.profile}`}
                                alt={item.author.firstName}
                                style={{
                                  marginLeft: 15,
                                  objectFit: "cover",
                                  marginTop: 5,
                                  height: "3.125rem",
                                  width: "3.125rem",
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Typography
                                  fontFamily={"Yekan,sans-serif"}
                                  variant="h6"
                                >
                                  {item.author.firstName}
                                </Typography>
                                <Typography
                                  fontFamily={"Yekan,sans-serif"}
                                  variant="subtitle1"
                                >
                                  {item.author.job}
                                </Typography>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {item.image ? (
                                <Image
                                  className="successMainImage"
                                  width={400}
                                  height={400}
                                  src={`${item?.image}`}
                                  alt={`${item?.image}`}
                                  style={{
                                    borderRadius: "0.5rem",
                                    height: "350px",
                                    width: "95%",
                                    objectFit: "cover",
                                    objectPosition: "100% 50%",
                                    marginBottom: "1rem",
                                  }}
                                />
                              ) : null}
                            </div>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                lineHeight: "1.4rem",
                                marginBottom: "0.5rem",
                              }}
                              className="successPostDesc"
                              variant="body2"
                              fontFamily={"Yekan,sans-serif"}
                            >
                              {item.text}
                            </Typography>
                            <Divider />
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                textalign: "left",
                                marginTop: "0.75rem",
                              }}
                              className="successPostDesc"
                              variant="body2"
                              fontFamily={"Yekan,sans-serif"}
                            >
                              {item.date}
                            </Typography>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              marginTop={2}
                            >
                              <Button
                                sx={{ fontFamily: "Yekan, sans-serif" }}
                                variant="contained"
                                color="secondary"
                                onClick={() => handleEdit(item._id)}
                              >
                                ویرایش
                              </Button>
                              <Button
                                sx={{ fontFamily: "Yekan, sans-serif" }}
                                variant="contained"
                                color="error"
                                onClick={() => deleteHandler(item.id)}
                              >
                                حذف
                              </Button>
                            </Box>
                          </Paper>
                        )}
                      </div>
                    ))
                  )}
                </Masonry>
              </div>

              {/* <SuccessCard data={data && data} /> */}
              <br />
              <Divider />
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginTop: "2rem",
                }}
              >
                <h3>برای ثبت موفقیت دانشجویان این فرم را پر کنید.</h3>
                <div>
                  <NewSuccess />
                </div>
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
            {adminCategories.map((item) => (
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

export default SuccessList;

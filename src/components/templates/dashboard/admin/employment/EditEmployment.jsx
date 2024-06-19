"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Divider,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/helper/Loading";
import SignOutButton from "../../SignOutButton";
import { IoPerson } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import { showToast } from "@/components/module/AuthModules/Toastify";
import { adminCategories } from "../../Categories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputContact from "@/components/module/input_module/InputContact";
import EmploymentDetailCard from "@/components/module/employment_module/EmploymentDetailCard";

function EditEmployment({ emplymentId }) {
  const [adminRole, setAdminRole] = useState();

  const [loading, setLoading] = useState(true);

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  const [jobBranch, setJobBranch] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobPlace, setJobPlace] = useState("");
  const [jobTime, setJobTime] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const router = useRouter();

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
        setAdminRole(role);
      });

    axios
      .get(`http://localhost:3001/api/employment/data/${emplymentId}`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        setLoading(false);
        setJobBranch(response.data.data.branch);
        setJobCategory(response.data.data.jobCategory);
        setJobPlace(response.data.data.jobPlace);
        setJobTime(response.data.data.jobTime);
        setJobTitle(response.data.data.jobTitle);
      });
  }, [emplymentId]);

  const insertHandler = async () => {
    try {
      const response2 = await axios
        .put(
          `http://localhost:3001/api/admin/panel/employment/${emplymentId}`,
          {
            branch: jobBranch,
            jobCategory,
            jobTitle,
            jobPlace,
            jobTime,
          },
          {
            withCredentials: true,
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        )
        .then((res) => {
          showToast("اطلاعات شما ثبت شد!", "success");
        });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      showToast(
        `خطا در آپلود: ${
          error.response ? error.response.data.error : error.message
        }`,
        "error"
      );
    }
  };

  return (
    <>
      {adminRole === "ADMIN" ? (
        <div dir="rtl" className="panelContainer">
          <div className="userPanel" dir="rtl">
            <div className="sideBarPanel">
              <div>
                {adminRole === "ADMIN"
                  ? adminCategories.map((item) => (
                      <Link key={item.title} href={item.link}>
                        {item.title}
                      </Link>
                    ))
                  : router.push("/")}
              </div>
              <div>
                <SignOutButton />
              </div>
            </div>
            <div className="mainPanel">
              {loading ? (
                <Loading />
              ) : (
                <form
                  dir="rtl"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <InputContact
                    id={"branch"}
                    variable={jobBranch}
                    setVariable={setJobBranch}
                    subTitle={"محصول، آموزش، مارکتینگ، منابع انسانی، مالی"}
                    title={"شاخه"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"place"}
                    variable={jobCategory}
                    setVariable={setJobCategory}
                    title={"دسته بندی"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"category"}
                    variable={jobPlace}
                    setVariable={setJobPlace}
                    title={"محل کار"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"title"}
                    variable={jobTitle}
                    setVariable={setJobTitle}
                    title={"عنوان کار"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"time"}
                    variable={jobTime}
                    setVariable={setJobTime}
                    subTitle={"تمام وقت، پاره وقت و.."}
                    title={"بازه زمانی"}
                    type={"text"}
                    width={"100%"}
                  />

                  <Divider />
                  <h3>نمونه کارت</h3>
                  <EmploymentDetailCard
                    job={jobTitle}
                    time={jobTime}
                    place={jobPlace}
                    category={jobCategory}
                  />

                  <button
                    className="login_Btn_No_Hid"
                    onClick={insertHandler}
                    style={{
                      width: "fit-content",
                      marginTop: "2rem",
                      cursor: "pointer",
                    }}
                    type="button"
                  >
                    ثبت اطلاعات نوشته شده
                  </button>

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
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h3>ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.</h3>
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

export default EditEmployment;

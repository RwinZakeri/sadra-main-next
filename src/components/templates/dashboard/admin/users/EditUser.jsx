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
import SignOutButton from "../../SignOutButton";
import Loading from "@/components/helper/Loading";

import { IoPerson } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import { adminCategories } from "../../Categories";
import Link from "next/link";
import InputContact from "@/components/module/input_module/InputContact";
import { showToast } from "@/components/module/AuthModules/Toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
function EditUser({ userId }) {
  const [adminId, setAdminId] = useState();
  const [adminRole, setAdminRole] = useState();

  const [loading, setLoading] = useState(true);

  const [imageData, setImageData] = useState("");

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  // const [userId, setUserId] = useState();
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userUserName, setUserUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userJob, setUserJob] = useState("");
  const [userEducation, setUserEducation] = useState("");
  const [userIsStudent, setUserIsStudent] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userLinkedin, setUserLinkedin] = useState("");
  const [userPinterest, setUserPinterest] = useState("");
  const [userTwitterX, setUserTwitterX] = useState("");
  const [userFacebook, setUserFacebook] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard/whoami", {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        const { _id, role } = response.data;
        setAdminId(_id);
        setAdminRole(role);
      });

    axios
      .get(`http://localhost:3001/api/admin/panel/users/${userId}`, {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        setLoading(false);
        setUserName(response.data.data.firstName);
        setUserLastName(response.data.data.lastName);
        setUserUserName(response.data.data.username);
        setUserRole(response.data.data.role);
        setUserEmail(response.data.data.email);
        setUserAge(response.data.data.age);
        setUserPhoneNumber(response.data.data.phoneNumber);
        setUserJob(response.data.data.job);
        setUserEducation(response.data.data.education);
        setUserIsStudent(response.data.data.isStudent);
        setUserProfile(response.data.data.profile);
        setUserDescription(response.data.data.description);
        setUserLinkedin(response.data.data.linkedin);
        setUserPinterest(response.data.data.pinterest);
        setUserTwitterX(response.data.data.twitterX);
        setUserFacebook(response.data.data.facebook);
      });
  }, [userId]);

  const handleSelectChange = (event) => {
    setUserRole(event.target.value);
  };
  const handleSelectChange2 = (event) => {
    setUserEducation(event.target.value);
  };

  const handleCheckboxChange = (e) => {
    setUserIsStudent(e.target.checked);
  };

  const [fileName, setFileName] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageData(file);
    setFileName(file.name);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const dropzoneStyle = {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "10px",
  };

  const insertHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    imageData && formData.append("profile", imageData);
    formData.append("firstName", userName);
    formData.append("lastName", userLastName);
    formData.append("username", userUserName);
    formData.append("role", userRole);
    formData.append("email", userEmail);
    formData.append("age", userAge);
    formData.append("phoneNumber", userPhoneNumber);
    formData.append("job", userJob);
    formData.append("education", userEducation);
    formData.append("isStudent", userIsStudent);
    formData.append("description", userDescription);
    formData.append("linkedin", userLinkedin);
    formData.append("pinterest", userPinterest);
    formData.append("twitterX", userTwitterX);
    formData.append("facebook", userFacebook);

    try {
      const response = await axios
        .put(
          `http://localhost:3001/api/admin/panel/users/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          showToast(
            "کاربر با موفقیت اپدیت شد. بعد از تایید ادمین در سایت قرار میگیرد.",
            "success"
          );
        });
    } catch (error) {
      showToast(`خطا در آپلود: ${error.response.data.message}`, "error");
    }
  };
  const navigate = useRouter();

  const deleteHandler = async () => {
    if (confirm("آیا از حذف کردن این کاربر اطمینان دارید؟؟!")) {
      const response = await axios.delete(
        `http://localhost:3001/api/admin/panel/users/${userId}`,
        {
          withCredentials: true,
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        }
      );
      showToast(
        "کاربر با موفقیت حذف شد!، درحال ارسال به صفحه ی قبل",
        "success"
      );
      setTimeout(() => {
        navigate.replace("/dashboard/admin/users");
      }, 1500);
    } else {
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
                  : navigate.replace("/")}
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
                    id={"name"}
                    variable={userName}
                    setVariable={setUserName}
                    title={"نام"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"lastName"}
                    variable={userLastName}
                    setVariable={setUserLastName}
                    title={"نام خانوادگی"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"userName"}
                    variable={userUserName}
                    setVariable={setUserUserName}
                    title={"نام کاربری"}
                    type={"text"}
                    width={"100%"}
                  />

                  <FormControl variant="outlined">
                    <p>سطح کاربری</p>
                    <Select
                      id="education"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                        marginTop: "0.6rem",
                        width: "200px",
                      }}
                      value={userRole}
                      onChange={handleSelectChange}
                      required
                    >
                      <MenuItem
                        sx={{ fontFamily: "Yekan,sans-serif" }}
                        value="USER"
                      >
                        معمولی
                      </MenuItem>
                      <MenuItem
                        sx={{ fontFamily: "Yekan,sans-serif" }}
                        value="TEACHER"
                      >
                        دبیر
                      </MenuItem>
                      <MenuItem
                        sx={{ fontFamily: "Yekan,sans-serif" }}
                        value="ADMIN"
                      >
                        ادمین
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <InputContact
                    id={"email"}
                    variable={userEmail}
                    setVariable={setUserEmail}
                    title={"پست الکترونیکی"}
                    type={"email"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"job"}
                    variable={userJob}
                    setVariable={setUserJob}
                    title={"شغل"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"age"}
                    variable={userAge}
                    setVariable={setUserAge}
                    title={"سن"}
                    type={"number"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"phone"}
                    variable={userPhoneNumber}
                    setVariable={setUserPhoneNumber}
                    title={"شماره تماس"}
                    type={"text"}
                    width={"100%"}
                  />

                  <FormControl variant="outlined">
                    <p>مقطع تحصیلی</p>
                    <Select
                      id="education"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                        marginTop: "0.6rem",
                      }}
                      value={
                        userEducation === "" ? "مقطع تحصیلی" : userEducation
                      }
                      onChange={handleSelectChange2}
                      required
                    >
                      <MenuItem
                        value="مقطع تحصیلی"
                        disabled={userEducation !== "مقطع تحصیلی"}
                        sx={{ fontFamily: "Yekan,sans-serif" }}
                      >
                        مقطع تحصیلی
                      </MenuItem>
                      <MenuItem
                        sx={{ fontFamily: "Yekan,sans-serif" }}
                        value="دیپلم"
                      >
                        دیپلم
                      </MenuItem>
                      <MenuItem
                        sx={{ fontFamily: "Yekan,sans-serif" }}
                        value="لیسانس"
                      >
                        لیسانس
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl
                    sx={{
                      marginTop: "1rem",
                      display: "inline",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={userIsStudent === 1 ? true : false}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      sx={{ color: "#4ca773" }}
                      id="is-student"
                    />
                    <label htmlFor="is-student" style={{ cursor: "pointer" }}>
                      دانشجو هستم
                    </label>
                  </FormControl>

                  <div>
                    <p>عکس پروفایل</p>
                    <div {...getRootProps()} style={dropzoneStyle}>
                      <input {...getInputProps()} />
                      <p>
                        تصویر را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت
                        باشد
                      </p>
                      <p>
                        باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp
                        )
                      </p>
                      {fileName && (
                        <p style={{ marginTop: "10px" }}>
                          نام فایل انتخابی: {fileName}
                        </p>
                      )}
                      {userProfile !== "" && (
                        <>
                          تصویر فعلی:
                          <br />
                          <br />
                          <Image
                            src={`/${userProfile}`}
                            width={400}
                            height={400}
                            alt={userProfile}
                            style={{ height: "200px" }}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <InputContact
                    id={"description"}
                    variable={userDescription}
                    setVariable={setUserDescription}
                    title={"درباره کاربر"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"linkedin"}
                    variable={userLinkedin}
                    setVariable={setUserLinkedin}
                    subTitle={"در صورت نداشتن # بگذارید."}
                    title={"لینک لینکدین"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"pinterest"}
                    variable={userPinterest}
                    setVariable={setUserPinterest}
                    subTitle={"در صورت نداشتن # بگذارید."}
                    title={"لینک پینترست"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"twitter"}
                    variable={userTwitterX}
                    setVariable={setUserTwitterX}
                    subTitle={"در صورت نداشتن # بگذارید."}
                    title={"لینک توییتر یا X"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"facebook"}
                    variable={userFacebook}
                    setVariable={setUserFacebook}
                    subTitle={"در صورت نداشتن # بگذارید."}
                    title={"لینک فیس بوک"}
                    type={"text"}
                    width={"100%"}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                    <button
                      className="login_Btn_No_Hid"
                      onClick={deleteHandler}
                      style={{
                        width: "fit-content",
                        marginTop: "2rem",
                        cursor: "pointer",
                        background: "red",
                      }}
                      type="button"
                    >
                      حذف این کاربر
                    </button>
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

export default EditUser;

import axios from "axios";
import React, { useEffect, useState } from "react";
import SignOutButton from "../SignOutButton";
import DashboardCard from "../DashboardCard";

import Drawer from "@mui/material/Drawer";
import { IoPerson } from "react-icons/io5";
import Box from "@mui/material/Box";

//icons
import { FaMicroblog } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import {
  Checkbox,
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useDropzone } from "react-dropzone";
import Loading from "../../../helper/Loading";
import { showToast } from "@/components/module/AuthModules/Toastify";
import InputContact from "@/components/module/input/InputContact";
import { categories } from "../Categories";
import Link from "next/link";

function TeacherDashbaord({ userRole, userId }) {
  const theme = createTheme({
    direction: "rtl",
  });

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userUserName, setUserUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userJob, setUserJob] = useState("");
  const [userEducation, setUserEducation] = useState("");
  const [profile, setProfile] = useState("");
  const [authorDescription, setAuthorDescription] = useState("");
  const [authorLinkedin, setAuthorLinkedin] = useState("#");
  const [authorPinterest, setAuthorPinterest] = useState("#");
  const [authorTwitterX, setAuthorTwitterX] = useState("#");
  const [authorFacebook, setAuthorFacebook] = useState("#");

  const [userProf, setUserProf] = useState("");

  const [loading, setLoading] = useState(true);

  const handleSelectChange = (event) => {
    setUserEducation(event.target.value);
  };
  const insertHandler = async () => {
    if (
      userEmail === "" ||
      userName === "" ||
      userLastName === "" ||
      userAge === "" ||
      userPhone === "" ||
      userEducation === ""
    ) {
      showToast("لطفا تمامی فیلد هارا پرکنید.", "error");
      return;
    }

    if (!profile && userProf === "") {
      showToast("لطفاً یک تصویر را انتخاب کنید.", "error");
      return;
    }

    const formData = new FormData();
    if (profile) {
      formData.append("profile", profile);
    }

    // Add user details to the formData
    formData.append("id", userId);
    formData.append("firstName", userName);
    formData.append("lastName", userLastName);
    formData.append("username", userUserName);
    formData.append("email", userEmail);
    formData.append("age", userAge);
    formData.append("job", userJob);
    formData.append("phoneNumber", userPhone);
    formData.append("education", userEducation);
    formData.append("description", authorDescription);
    formData.append("linkedin", authorLinkedin);
    formData.append("pinterest", authorPinterest);
    formData.append("twitterX", authorTwitterX);
    formData.append("facebook", authorFacebook);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/dashboard",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        }
      );

      showToast(
        "اطلاعات شما ثبت شد! حالا، به صفحات دیگر دسترسی دارید.",
        "success"
      );
    } catch (error) {
      console.error("Error:", error.response.data.message);
      showToast(`خطا در آپلود : ${error.response.data.message}`, "error");
    }
  };

  useEffect(() => {
    userId &&
      axios
        .get(`http://localhost:3001/api/dashboard/whoami`, {
          withCredentials: true,
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        })
        .then((response) => {
          setLoading(false);
          setUserName(response.data.firstName);
          setUserLastName(response.data.lastName);
          setUserUserName(response.data.username);
          setUserEmail(response.data.email);
          setUserAge(response.data.age);
          setUserPhone(response.data.phoneNumber);
          setUserJob(response.data.job);
          setUserEducation(response.data.education);
          setAuthorDescription(response.data.description);
          setAuthorLinkedin(response.data.linkedin);
          setAuthorFacebook(response.data.facebook);
          setAuthorTwitterX(response.data.twitterX);
          setAuthorPinterest(response.data.pinterest);
          setUserProf(response.data.profile);
        })
        .catch((error) => {
          console.error(
            "Error1:",
            error.response ? error.response.data : error.message
          );
        });
  }, [userId]);

  const [fileName, setFileName] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfile(file);
    setFileName(file.name); // Set the file name in state
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

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : userRole === "TEACHER" ? (
        <div className="userPanel">
          <div className="sideBarPanel">
            <div>
              {categories.map((item) => (
                <Link key={item.title} href={item.link}>
                  {item.title}
                </Link>
              ))}
            </div>

            <div>
              <SignOutButton />
            </div>
          </div>
          {/* Responsive */}

          <div className="MobileDrawerDash">
            <button onClick={mobileSetting} className="drawerButton">
              {" "}
              <IoPerson style={{ width: 20, height: 20 }} />
            </button>
          </div>

          <Drawer
            anchor="left"
            open={setting}
            onClose={() => setSetting(false)}
          >
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
          <div className="mainPanel">
            <div className="cards-container">
              <DashboardCard
                icon={<FaMicroblog size={40} />}
                title={"بلاگ ها"}
                link={"/dashboard/teacher/blog"}
              />
              <DashboardCard
                icon={<MdEvent size={40} />}
                title={"رویداد ها"}
                link={"/dashboard/teacher/events"}
              />
              <DashboardCard
                icon={<SiGoogleclassroom size={40} />}
                title={"کلاس ها"}
                link={"/dashboard/teacher/classes"}
              />
            </div>
            <br />
            <Divider />
            <br />
            <form>
              <h1 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                ثبت اطلاعات تکمیلی:
              </h1>
              <ThemeProvider theme={theme}>
                <div className="formPanel">
                  <InputContact
                    id={"authorName"}
                    setVariable={setUserName}
                    variable={userName}
                    title={"نام"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"authorLastName"}
                    setVariable={setUserLastName}
                    variable={userLastName}
                    title={"نام خانوادگی"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"userusername"}
                    setVariable={setUserUserName}
                    variable={userUserName}
                    title={"نام کاربری"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"authorEmail"}
                    setVariable={setUserEmail}
                    variable={userEmail}
                    title={"پست الکترونیکی"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"authorAge"}
                    setVariable={setUserAge}
                    variable={userAge}
                    title={"سن"}
                    type={"number"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"authorJob"}
                    setVariable={setUserJob}
                    variable={userJob}
                    title={"شغل"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"userjob"}
                    setVariable={setUserPhone}
                    variable={userPhone}
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
                      onChange={handleSelectChange}
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

                  <div>
                    <p>عکس پروفایل</p>
                    <div {...getRootProps()} style={dropzoneStyle}>
                      <input {...getInputProps()} />
                      <p>
                        تصویر مقاله را انتخاب یا اینجا بکشید باید کمتر از 3
                        مگابایت باشد
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
                      {userProf && (
                        <p style={{ marginTop: "10px" }}>
                          عکس از قبل ثبت شده است.
                        </p>
                      )}
                    </div>
                  </div>

                  <InputContact
                    id={"authorDescription"}
                    setVariable={setAuthorDescription}
                    variable={authorDescription}
                    title={"شرح"}
                    subTitle={"توضیح کوتاهی درباره خودتان"}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"authorLinkedin"}
                    setVariable={setAuthorLinkedin}
                    variable={authorLinkedin}
                    title={"لینک لینکدین"}
                    subTitle={"در صورت نداشتن # بگذارید."}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"authorPinterest"}
                    setVariable={setAuthorPinterest}
                    variable={authorPinterest}
                    title={"لینک پینترست"}
                    subTitle={"در صورت نداشتن # بگذارید."}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"authorTwitterX"}
                    setVariable={setAuthorTwitterX}
                    variable={authorTwitterX}
                    title={"لینک توییتر(X)"}
                    subTitle={"در صورت نداشتن # بگذارید."}
                    type={"text"}
                    width={"100%"}
                  />
                  <InputContact
                    id={"authorFacebook"}
                    setVariable={setAuthorFacebook}
                    variable={authorFacebook}
                    title={"لینک فیس بوک"}
                    subTitle={"در صورت نداشتن # بگذارید."}
                    type={"text"}
                    width={"100%"}
                  />
                </div>
              </ThemeProvider>
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
                ثبت اطلاعات
              </button>
            </form>
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
          <br />
          <Divider />
        </div>
      ) : (
        <h2>ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.</h2>
      )}
    </>
  );
}

export default TeacherDashbaord;

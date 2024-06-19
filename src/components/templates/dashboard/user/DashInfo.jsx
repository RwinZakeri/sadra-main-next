import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignOutButton from "../SignOutButton";
import {
  Checkbox,
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import Drawer from "@mui/material/Drawer";
import { IoPerson } from "react-icons/io5";
import Box from "@mui/material/Box";
import Loading from "../../../helper/Loading";
import { userCategories } from "../Categories";
import Link from "next/link";
import { showToast } from "@/components/module/AuthModules/Toastify";

function DashInfo() {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userUserName, setUserUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userJob, setUserJob] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEducation, setUserEducation] = useState("مقطع تحصیلی");
  const [userIsStudent, setUserIsStudent] = useState(false);

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
        setLoading(false);
        setUserId(response.data._id);
        setUserRole(response.data.role);
        setUserEmail(response.data.email);
        setUserName(response.data.firstName);
        setUserLastName(response.data.lastName);
        setUserUserName(response.data.username);
        setUserAge(response.data.age);
        setUserJob(response.data.job);
        setUserPhone(response.data.phoneNumber);
        setUserEducation(response.data.education);
        setUserIsStudent(response.data.isStudent === "true" ? true : false);
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
    navigate.push("/auth/login");
  };

  const theme = createTheme({
    direction: "rtl",
  });

  const insertHandler = async () => {
    if (
      userEmail === "" ||
      userName === "" ||
      userUserName === "" ||
      userLastName === "" ||
      userAge === "" ||
      userPhone === "" ||
      userEducation === ""
    ) {
      showToast("لطفا تمامی فیلد هارا پرکنید.", "error");
    } else {
      const response = await axios.post(
        "http://localhost:3001/api/dashboard",
        {
          id: userId,
          firstName: userName,
          lastName: userLastName,
          username: userUserName,
          email: userEmail,
          job: userJob,
          age: userAge,
          phoneNumber: userPhone,
          education: userEducation,
          isStudent: userIsStudent,
        },
        {
          withCredentials: true,
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        }
      );
      showToast("اطلاعات شما با موفقیت ثبت شد.", "success");
    }
  };

  const handleCheckboxChange = (e) => {
    setUserIsStudent(e.target.checked);
  };

  const handleSelectChange = (event) => {
    setUserEducation(event.target.value);
  };

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };
  return (
    <div dir="rtl" className="panelContainer">
      {loading ? (
        <Loading />
      ) : userRole === "USER" ? (
        <div className="userPanel">
          <div className="sideBarPanel">
            <div>
              {userCategories.map((item) => (
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
                {userCategories.map((item) => (
                  <li key={item.title}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </Box>
          </Drawer>

          {/* Responsive */}

          <div className="mainPanel">
            <form>
              <h1>ثبت اطلاعات تکمیلی:</h1>
              <ThemeProvider theme={theme}>
                <div className="formPanel">
                  <FormControl
                    variant="outlined"
                    sx={{
                      marginTop: "1rem",
                      "&:focus-within": { borderColor: "green !important" },
                    }}
                  >
                    <InputLabel
                      htmlFor="first-name"
                      sx={{
                        left: "auto",
                        right: 40,
                        fontFamily: "Yekan, sans-serif",
                      }}
                    >
                      نام
                    </InputLabel>
                    <Input
                      id="first-name"
                      label="نام"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ marginTop: "1rem" }}>
                    <InputLabel
                      htmlFor="last-name"
                      sx={{
                        left: "auto",
                        right: 40,
                        fontFamily: "Yekan,sans-serif",
                      }}
                    >
                      نام خانوادگی
                    </InputLabel>
                    <Input
                      id="last-name"
                      label="نام خانوادگی"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      value={userLastName}
                      onChange={(e) => setUserLastName(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ marginTop: "1rem" }}>
                    <InputLabel
                      htmlFor="last-name"
                      sx={{
                        left: "auto",
                        right: 40,
                        fontFamily: "Yekan,sans-serif",
                      }}
                    >
                      نام کاربری
                    </InputLabel>
                    <Input
                      id="userName"
                      label="نام کاربری"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      value={userUserName}
                      onChange={(e) => setUserUserName(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ marginTop: "1rem" }}>
                    <InputLabel
                      htmlFor="last-name"
                      sx={{
                        left: "auto",
                        right: 40,
                        fontFamily: "Yekan,sans-serif",
                      }}
                    >
                      پست الکترونیکی
                    </InputLabel>
                    <Input
                      id="email"
                      label="پست الکترونیکی"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ marginTop: "1rem" }}>
                    <InputLabel
                      htmlFor="last-name"
                      sx={{
                        left: "auto",
                        right: 40,
                        fontFamily: "Yekan,sans-serif",
                      }}
                    >
                      سن
                    </InputLabel>
                    <Input
                      id="age"
                      label="سن"
                      type="number"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      value={userAge}
                      onChange={(e) => setUserAge(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ marginTop: "1rem" }}>
                    <InputLabel
                      htmlFor="job"
                      sx={{
                        left: "auto",
                        right: 40,
                        fontFamily: "Yekan,sans-serif",
                      }}
                    >
                      شغل
                    </InputLabel>
                    <Input
                      id="job"
                      label="شغل"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      value={userJob}
                      onChange={(e) => setUserJob(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ marginTop: "1rem" }}>
                    <InputLabel
                      htmlFor="phone"
                      sx={{
                        left: "auto",
                        right: 40,
                        fontFamily: "Yekan,sans-serif",
                      }}
                    >
                      شماره تماس
                    </InputLabel>
                    <Input
                      id="phone"
                      label="شماره تماس"
                      type="text"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ marginTop: "2rem" }}>
                    <h4 style={{ marginBottom: "0.5rem" }}>مقطع تحصیلی</h4>
                    <Select
                      id="education"
                      sx={{
                        position: "relative",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      value={userEducation}
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

                  <FormControl
                    sx={{
                      marginTop: "1rem",
                      display: "inline",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={userIsStudent === true ? true : false}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      sx={{ color: "#4ca773" }}
                      id="is-student"
                    />
                    <label htmlFor="is-student" style={{ cursor: "pointer" }}>
                      دانشجو هستم
                    </label>
                  </FormControl>
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
                ثبت اطلاعات نوشته شده
              </button>
              {/* <p className='panelHint'>با کلیک روی این دکمه به مرحله بعد ثبت اطلاعات ارسال میشوید.</p> */}
            </form>
          </div>
        </div>
      ) : (
        <>
          <h1>ابتدا از حساب کاربری خود خارج شوید و دوباره وارد شوید !</h1>
          <h1>اگر این مشکل ادامه پیدا کرد با تیم پشتیبانی در ارتباط باشید.</h1>
          <button
            className="login_Btn"
            style={{ cursor: "pointer" }}
            onClick={clickHandler}
          >
            ورود
          </button>
        </>
      )}
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
  );
}

export default DashInfo;

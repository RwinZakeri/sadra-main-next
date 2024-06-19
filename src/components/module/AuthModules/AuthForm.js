import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
// MUI
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  ThemeProvider,
  createTheme,
  Input,
  Checkbox,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { showToast } from "./Toastify";
import { ToastContainer } from "react-toastify";
import Logo from "../../../../public/assets/pics/logo.svg";
import authIllustration from "../../../../public/assets/pics/authIllustration.png";

const AuthForm = ({ isRegister }) => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard/whoami", {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        const { id } = response.data;
        setUserId(id);
      })
      .catch((error) => {
        console.error("please login first !");
        setUserRole("error");
      });
  }, []);

  const [values, setValues] = useState({
    userName: "",
    email: "",
    userEmail: "",
    password: "",
    showPassword: false,
    userIsAccepted: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isREGUsernameOK, setIsREGUsernameOK] = useState(true);
  const [isREGEmailOK, setIsREGEmailOK] = useState(true);
  const [isREGPassOK, setIsREGPassOK] = useState(true);
  const [isLOGEmailOK, setIsLOGEmailOK] = useState(true);
  const [isPassOK, setIsPassOK] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isRegister) {
      const Register = async ({ values }) => {
        if (values.userName.length < 3 || values.userName === "") {
          showToast("نام کاربری نمیتواند کمتر از 3 حرف باشد!", "error");
          setIsREGUsernameOK(false);
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (!emailRegex.test(values.email)) {
          setIsREGEmailOK(false);
          showToast("لطفا از درست بودن ایمیل خود اطمینان حاصل کنید.", "error");
        } else {
          setIsREGEmailOK(true);
        }
        if (
          values.password.length > 32 ||
          values.password.length === 0 ||
          values.password.length < 8
        ) {
          setIsREGPassOK(false);
          showToast(
            "رمز عبور نمیتواند خالی، بیشتر از 32 نویسه و یا کمتر از 8 نویسه باشد.",
            "error"
          );
        } else {
          setIsREGPassOK(true);
        }

        if (
          isREGEmailOK === true &&
          isREGPassOK === true &&
          isREGUsernameOK === true
        ) {
          try {
            const response = await axios.post(
              "http://localhost:3001/api/auth/register",
              {
                username: values.userName,
                email: values.email,
                password: values.password,
              },
              {
                headers: { "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY },
                withCredentials: true,
              }
            );

            const result = response.data;

            if (result.statusCode === 200) {
              showToast(
                "ثبت نام با موفقیت انجام شد. درحال ارسال به صفحه ورود..",
                "success"
              );
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            }
          } catch (error) {
            showToast(error.response.data.message, "error");
            console.error("Error during registration:", error);
          }
        } else {
        }
      };

      Register({ values });
    } else {
      const Login = async ({ values }) => {
        const usermail =
          /^(?:[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$|^[\w.-]{3,16}$/;

        if (!usermail.test(values.userEmail)) {
          setIsLOGEmailOK(false);
          showToast("لطفا از درست بودن ایمیل خود اطمینان حاصل کنید.", "error");
        } else {
          setIsLOGEmailOK(true);
        }
        if (
          values.password.length > 32 ||
          values.password.length === 0 ||
          values.password.length < 8
        ) {
          setIsPassOK(false);
          showToast(
            "رمز عبور نمیتواند خالی، بیشتر از 32 نویسه و یا کمتر از 8 نویسه باشد.",
            "error"
          );
        } else {
          setIsPassOK(true);
        }

        if (isLOGEmailOK === true && isPassOK === true) {
          try {
            let response = await axios.post(
              "http://localhost:3001/api/auth/login",
              {
                usernameOrEmail: values.userEmail,
                password: values.password,
              },
              {
                headers: { "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY },
                withCredentials: true,
              }
            );
            
            const result = await response.data;

            if (result?.statusCode === 200) {
              showToast(
                "ورود با موفقیت انجام شد. درحال ارسال به داشبورد..",
                "success"
              );
              setTimeout(() => {
                router.push("/dashboard");
              }, 1500);
            }

            if (result.error) {
              showToast(`${result.error}`, "error");
            }
          } catch (error) {
            console.error("Error during login:", error);
            showToast(`${error.response}`, "error");
          }
        } else {
        }
      };
      Login({ values });
    }
  };
  const dashboardLink = () => {
    router.push("/dashboard");
  };

  const theme = createTheme({
    direction: "rtl",
  });

  const [userIsAccepted, setUserIsAccepted] = useState(null);

  const handleCheckboxChange = (e) => {
    // Convert the checkbox value to 1 (true) or 0 (false)
    setUserIsAccepted(e.target.checked ? 1 : 0);
  };

  return (
    <>
      {
        !userId ? (
          <>
            <div className="authContainer" dir="rtl">
              <form onSubmit={handleSubmit} className="authFrom">
                <ThemeProvider theme={theme}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {isRegister === true ? (
                      <>
                        <h1 style={{ textAlign: "center" }}>
                          ایجاد حساب کاربری
                        </h1>
                        <FormControl
                          variant="outlined"
                          sx={{
                            marginTop: "1rem",
                            "&:focus-within": {
                              borderColor: "green !important",
                            },
                          }}
                        >
                          <InputLabel
                            htmlFor="username"
                            sx={{
                              left: "auto",
                              right: 40,
                              fontFamily: "Yekan, sans-serif",
                            }}
                          >
                            نام کاربری
                          </InputLabel>
                          <Input
                            id="username"
                            label="نام کاربری"
                            variant="outlined"
                            sx={{
                              position: "relative",
                              fontFamily: "Yekan, sans-serif",
                            }}
                            value={values.userName}
                            onChange={handleChange("userName")}
                            required
                            autoComplete="true"
                          />
                        </FormControl>

                        <FormControl
                          variant="outlined"
                          sx={{
                            marginTop: "1rem",
                            "&:focus-within": {
                              borderColor: "green !important",
                            },
                          }}
                        >
                          <InputLabel
                            htmlFor="email"
                            sx={{
                              left: "auto",
                              right: 40,
                              fontFamily: "Yekan, sans-serif",
                            }}
                          >
                            ایمیل
                          </InputLabel>
                          <Input
                            id="email"
                            label="ایمیل"
                            variant="outlined"
                            sx={{
                              position: "relative",
                              fontFamily: "Yekan, sans-serif",
                            }}
                            value={values.email}
                            onChange={handleChange("email")}
                            required
                            autoComplete="true"
                          />
                        </FormControl>
                      </>
                    ) : (
                      <>
                        <h1 style={{ textAlign: "center" }}>
                          ورود به حساب کاربری
                        </h1>
                        <FormControl
                          variant="outlined"
                          sx={{
                            marginTop: "1rem",
                            "&:focus-within": {
                              borderColor: "green !important",
                            },
                          }}
                        >
                          <InputLabel
                            htmlFor="userMail"
                            sx={{
                              left: "auto",
                              right: 40,
                              fontFamily: "Yekan, sans-serif",
                            }}
                          >
                            نام کاربری یا ایمیل
                          </InputLabel>
                          <Input
                            id="userMail"
                            label="نام کاربری یا ایمیل"
                            variant="outlined"
                            sx={{
                              position: "relative",
                              fontFamily: "Yekan, sans-serif",
                            }}
                            value={values.userEmail}
                            onChange={handleChange("userEmail")}
                            required
                            autoComplete="true"
                          />
                        </FormControl>
                      </>
                    )}

                    <FormControl
                      variant="outlined"
                      sx={{
                        marginTop: "1rem",
                        "&:focus-within": { borderColor: "green !important" },
                      }}
                    >
                      <InputLabel
                        htmlFor="password"
                        sx={{
                          left: "auto",
                          right: 40,
                          fontFamily: "Yekan, sans-serif",
                        }}
                      >
                        رمز عبور
                      </InputLabel>
                      <Input
                        id="password"
                        label="رمز عبور"
                        type={values.showPassword ? "text" : "password"}
                        variant="outlined"
                        sx={{
                          position: "relative",
                          fontFamily: "Yekan, sans-serif",
                        }}
                        value={values.password}
                        onChange={handleChange("password")}
                        required
                        autoComplete="true"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        inputProps={{ maxLength: 32 }}
                      />
                    </FormControl>

                    {isRegister === true ? (
                      <>
                        <div
                          className="AuthBtns"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <FormControl
                            sx={{
                              marginTop: "1rem",
                              display: "inline",
                              alignItems: "center",
                            }}
                          >
                            <Checkbox
                              checked={userIsAccepted === 1 ? true : false}
                              onChange={handleCheckboxChange}
                              inputProps={{ "aria-label": "controlled" }}
                              sx={{ color: "#4ca773" }}
                              id="is-student"
                              required
                            />
                            <label
                              htmlFor="is-student"
                              style={{ cursor: "pointer" }}
                            >
                              قوانین و مقررات سایت را میپذیرم
                            </label>
                          </FormControl>
                          <button
                            className="login_Btn_No_Hid"
                            style={{ cursor: "pointer" }}
                          >
                            ایجاد
                          </button>
                        </div>
                        <p style={{ marginTop: "2rem", textAlign: "center" }}>
                          از قبل حساب کاربری دارید؟{" "}
                          <Link href={"/login"} style={{ fontWeight: "900" }}>
                            ورود
                          </Link>
                        </p>
                      </>
                    ) : (
                      <>
                        <div
                          className="AuthBtns"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* <FormControl sx={{ marginTop: '1rem', display: 'inline', alignItems: 'center' }}>
                                                <Checkbox
                                                    checked={userIsAccepted === 1 ? true : false}
                                                    onChange={handleCheckboxChange}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    sx={{ color: '#4ca773' }}
                                                    id='is-student'
                                                    required
                                                />
                                                <label htmlFor="is-student" style={{ cursor:"pointer"}}>
                                                    مرا به خاطر بسپار
                                                </label>
                                            </FormControl> */}
                          <button
                            className="login_Btn_No_Hid"
                            style={{ cursor: "pointer" }}
                          >
                            ورود
                          </button>
                        </div>
                        <p style={{ marginTop: "2rem", textAlign: "center" }}>
                          حساب صدرا ندارید؟{" "}
                          <Link
                            href={"/register"}
                            style={{ fontWeight: "900" }}
                          >
                            ایجاد حساب کاربری
                          </Link>
                        </p>
                      </>
                    )}
                  </div>
                </ThemeProvider>
              </form>

              <div className="AuthDiv">
                <div className="authSmallLogo">
                  <Image src={Logo} width={200} height={200} alt="smallLogo" />
                  <h1 style={{ fontSize: "3rem" }}>صدرا</h1>
                </div>
                <div className="authBigLogo">
                  <Image
                    width={330}
                    height={300}
                    src={authIllustration}
                    alt="biglogo"
                  />
                </div>
                <div className="authHeader">
                  <h2>مؤسسه آموزشی و پژوهشی صدرا</h2>
                </div>
                <div className="authSubtitle">
                  <p>
                    با شرکت در دوره‌های آموزشی صدرا، از صفر شروع کن و در مسیر
                    یادگیری با بهترین متد‌های آموزشی ما همراه شو، تا ما پلی
                    باشیم برای ورود تضمینی به بازار کار
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ direction: "rtl" }}>
            <h1>شما قبلا وارد شده اید! از دکمه زیر وارد داشبور خود شوید .</h1>
            <button
              style={{ cursor: "pointer" }}
              onClick={dashboardLink}
              className="login_Btn_No_Hid"
            >
              داشبورد
            </button>
          </div>
        )
        // navigate("/")
      }
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
    </>
  );
};

export default AuthForm;

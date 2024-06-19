"use client";
import { Masonry } from "@mui/lab";
import { Avatar, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/helper/Loading";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import moment from "jalali-moment";
import { showToast } from "@/components/module/AuthModules/Toastify";
import InputContact from "@/components/module/input_module/InputContact";

function EditSuccess({ successId }) {
  const [adminRole, setAdminRole] = useState("");

  const [loading, setLoading] = useState(true);

  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  const [additionalPicture, setAdditionalPicture] = useState("");

  const [imageData, setImageData] = useState("");
  const [fileName, setFileName] = useState("");
  const [imagePath, setImagePath] = useState("");

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
      .get(`http://localhost:3001/api/student-success/data/${successId}`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        setLoading(false);
        setPostId(response.data.data._id);
        setText(response.data.data.text);
        setAdditionalPicture(response.data.data.image);
      });
  }, [successId]);
  //
  // const handleSubmit1 = async () => {
  //   try {
  //     if (imageData) {
  //       const formData = new FormData();
  //       formData.append("image", imageData);
  //       formData.append("text", text);

  //       const response = await axios
  //         .put(
  //           `http://localhost:3001/api/admin/panel/student-success/textPic/${postId}`,
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //             withCredentials: true,
  //           }
  //         )
  //         .then((response) => {
  //           showToast("پست آپدیت شد.", "success");
  //         })
  //         .catch((error) => {
  //           console.error(
  //             "Error:",
  //             error.response ? error.response.data : error.message
  //           );
  //           showToast("پست آپدیت نشد.", "error");
  //         });
  //     } else {

  //       const formData = new FormData();
  //       formData.append("text", text);

  //       const response = await axios
  //         .put(
  //           `http://localhost:3001/api/admin/panel/student-success/text/${postId}`,
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //             withCredentials: true,
  //           }
  //         )
  //         .then((response) => {
  //           showToast("پست آپدیت شد.", "success");
  //         })
  //         .catch((error) => {
  //           console.error(
  //             "Error:",
  //             error.response ? error.response.data : error.message
  //           );
  //           showToast("پست آپدیت نشد.", "error");
  //         });
  //     }

  //   } catch (error) {
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //     showToast(
  //       `خطا در آپلود پست: ${
  //         error.response ? error.response.data.error : error.message
  //       }`,
  //       "error"
  //     );
  //   }
  // };

  const handleSubmit1 = async () => {
    try {
      const formData = new FormData();
      if (imageData) {
        formData.append("image", imageData);
      }
      formData.append("text", text);

      const endpoint = imageData
        ? `http://localhost:3001/api/admin/panel/student-success/textPic/${postId}`
        : `http://localhost:3001/api/admin/panel/student-success/text/${postId}`;

      await axios.put(endpoint, formData, {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      });

      showToast("پست آپدیت شد.", "success");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      showToast(
        `خطا در آپلود پست: ${
          error.response ? error.response.data.error : error.message
        }`,
        "error"
      );
    }
  };

  const dropzoneStyle = {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "10px",
  };

  const onDropImage1 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageData(file);
    setFileName(file.name);
  };

  const {
    getRootProps: getRootPropsImage1,
    getInputProps: getInputPropsImage1,
  } = useDropzone({ onDrop: onDropImage1 });

  return (
    <div style={{ padding: "2rem 1rem", maxWidth: "1920px", margin: "0 auto" }}>
      {loading ? (
        <Loading />
      ) : adminRole === "ADMIN" ? (
        <div
          className="successMainContent"
          dir="rtl"
          style={{ maxWidth: "1920px", margin: "0 auto", overflow: "hidden" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <label htmlFor="detail2" style={{ cursor: "pointer" }}>
                توضیحات اصلی کارت
              </label>
              <textarea
                cols="30"
                rows="7"
                id="detail2"
                className="textArea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  resize: "vertical",
                  fontFamily: "Yekan, sans-serif",
                }}
              ></textarea>
            </div>

            {additionalPicture ? (
              <div>
                <Divider />
                <br />
                <div {...getRootPropsImage1()} style={dropzoneStyle}>
                  <input {...getInputPropsImage1()} />
                  <p>
                    تصویر نویسنده را انتخاب یا اینجا بکشید باید کمتر از 3
                    مگابایت باشد (فقط یک تصویر)
                  </p>
                  <p>
                    باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp )
                  </p>
                  {additionalPicture && (
                    <p style={{ marginTop: "10px" }}>
                      نام فایل انتخابی: {additionalPicture}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}

            <button
              className="login_Btn_No_Hid"
              onClick={handleSubmit1}
              style={{
                width: "fit-content",
                marginTop: "2rem",
                cursor: "pointer",
              }}
              type="button"
            >
              ثبت
            </button>
          </div>
        </div>
      ) : (
        <h3>ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.</h3>
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

export default EditSuccess;

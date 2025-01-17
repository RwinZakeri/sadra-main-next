import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import moment from "jalali-moment";
import { IoPerson } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import { showToast } from "@/components/module/AuthModules/Toastify";
import InputContact from "@/components/module/input_module/InputContact";
import { adminCategories } from "../../Categories";
import Link from "next/link";

function NewSuccess() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First request to get the user ID
        const responseToken = await axios.get(
          "http://localhost:3001/api/dashboard/whoami",
          {
            withCredentials: true,
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        );
        const { id } = responseToken.data;
        setUserRole(responseToken.data.role);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setUserRole("error");
      }
    };

    fetchData(); // Call the function
  }, []);

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [detailsDescription1, setDetailsDescription1] = useState("");
  const [detailsDescription2, setDetailsDescription2] = useState("");
  const [detailsDescription3, setDetailsDescription3] = useState("");
  const [descriptionImage2, setDescriptionImage2] = useState("");
  const [detailsDescription4, setDetailsDescription4] = useState("");
  const [detailsDescription5, setDetailsDescription5] = useState("");
  const [timeToRead, setTimeToRead] = useState("");

  const [imagePath3, setImagePath3] = useState("");

  //
  //
  //
  //
  //
  //
  //

  const [authorNameCardFirst, setAuthorNameCardFirst] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [descriptionImage1, setDescriptionImage1] = useState("");
  const [fileName, setFileName] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [newImagePath1, setNewImagePath1] = useState("");
  const [newImagePath2, setNewImagePath2] = useState("");

  const [imagePath2, setImagePath2] = useState("");
  //
  //
  const [fileName2, setFileName2] = useState("");
  const [addPicJob, setAddPicJob] = useState("");
  const [addPicName, setAddPicName] = useState("");
  const [addPicDesc, setAddPicDesc] = useState("");
  const [imageData, setImageData] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [fileName3, setFileName3] = useState("");
  const [newImagePath3, setNewImagePath3] = useState("");
  //
  //

  const [fileName4, setFileName4] = useState("");
  const [fileName5, setFileName5] = useState("");
  const [videoAuthorName, setVideoAuthorName] = useState("");
  const [videoJobTitle, setVideoJobTitle] = useState("");
  const [video, setVideo] = useState("");
  const [imagePath4, setImagePath4] = useState("");

  const onDropImage1 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageData(file);
    setFileName(file.name);
  };

  const {
    getRootProps: getRootPropsImage1,
    getInputProps: getInputPropsImage1,
  } = useDropzone({ onDrop: onDropImage1 });
  // const {
  //   getRootProps: getRootPropsImage4,
  //   getInputProps: getInputPropsImage4,
  // } = useDropzone({
  //   accept: "video/*",
  //   maxFiles: 1,
  //   maxSize: 10485760, // 10MB in bytes
  //   onDrop: (acceptedFiles) => {
  //     if (acceptedFiles && acceptedFiles.length > 0) {
  //       const selectedVideo = acceptedFiles[0];
  //       setVideo(selectedVideo);
  //       setFileName4(selectedVideo.name || "Untitled Video");
  //     } else {
  //       console.error("No video file selected");
  //     }
  //   },
  // });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!imageData) {
  //     showToast("لطفاً یک تصویر را انتخاب کنید.", "error");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("files", imageData);
  //   formData.append("files", descriptionImage1);
  //   formData.append("files", descriptionImage2);

  //   try {
  //     const response = await axios.post(
  //       "https://sadra-edu.com/api/upload/multiple/3",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     const imagePath1 = response.data.paths[0].split(`\\`).join("/");
  //     const imagePath2 = response.data.paths[1].split(`\\`).join("/");
  //     const imagePath3 = response.data.paths[2].split(`\\`).join("/");

  //     setImagePath(imagePath1);
  //     setImagePath2(imagePath2);
  //     setImagePath3(imagePath3);

  //     axios
  //       .post(`https://sadra-edu.com/api/dashboard/success/add`, {
  //         imageData: imagePath1,
  //         date: moment().locale("fa").format("YYYY-MM-DD"),
  //         title: title,
  //         description: description,
  //         authorName: authorName,
  //         authorLastName: authorLastName,
  //         hashtags: hashtags,
  //         detailsDescription1: detailsDescription1,
  //         detailsDescription2: detailsDescription2,
  //         descriptionImage1: imagePath2,
  //         descriptionImage2: imagePath3,
  //         detailsDescription4: detailsDescription4,
  //         detailsDescription5: detailsDescription5,
  //         timeToRead: timeToRead,
  //       })
  //       .then((response) => {
  //         showToast(
  //           "موفقیت دانشجو جدید با موفقیت ثبت شد. بعد از تایید ادمین در سایت قرار میگیرد.",
  //           "success"
  //         );
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Error:",
  //           error.response ? error.response.data : error.message
  //         );
  //       });
  //   } catch (error) {
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //     showToast(
  //       `خطا در آپلود تصویر: ${
  //         error.response ? error.response.data.error : error.message
  //       }`,
  //       "error"
  //     );
  //   }
  // };

  const handleSubmit1 = async () => {
    try {
      axios
        .post(
          `http://localhost:3001/api/admin/panel/student-success/text`,
          {
            text: detailsDescription4,
          },
          {
            withCredentials: true,
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        )
        .then((response) => {
          showToast(
            "موفقیت دانشجو جدید با موفقیت ثبت شد. بعد از تایید ادمین در سایت قرار میگیرد.",
            "success"
          );
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
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

  const handleSubmit2 = async () => {
    if (!imageData) {
      showToast("لطفاً یک تصویر را انتخاب کنید.", "error");
      return;
    }

    const formData2 = new FormData();
    formData2.append("image", imageData);
    formData2.append("text", addPicDesc);

    try {
      const response = await axios
        .post(
          "http://localhost:3001/api/admin/panel/student-success/textPic",
          formData2,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        )
        .then((response) => {
          showToast(
            "موفقیت دانشجو جدید با موفقیت ثبت شد. بعد از تایید ادمین در سایت قرار میگیرد.",
            "success"
          );
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
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

  // const handleSubmit3 = async () => {
  //     if (!descriptionImage1) {
  //         showToast('لطفاً یک تصویر را انتخاب کنید.', "error");
  //         return;
  //     }

  //     const formData2 = new FormData();
  //     formData2.append('videoData', video);

  //     try {
  //         const response = await axios.post('https://sadra-edu.com/api/upload/video', formData2, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data',
  //             },
  //         });

  //         const videoPath = response.data.paths[0].split(`\\`).join("/");

  //         setImagePath3(videoPath);

  //         showToast('اطلاعات با موفقیت آپلود شد.', 'success');
  //         axios.post(`https://sadra-edu.com/api/dashboard/success/add/2`, {
  //             authorPicture: imagePath2,
  //             authorName: addPicName,
  //             authorJob: addPicJob,
  //             description: addPicDesc,
  //             additionalPicture: imagePath3,
  //             date: moment().locale('fa').format('YYYY-MM-DD'),
  //         })
  //         .then(response => {
  //             showToast("پست جدید با موفقیت ثبت شد !", "success")
  //         })
  //         .catch(error => {
  //             console.error('Error:', error.response ? error.response.data : error.message);
  //         });
  //     } catch (error) {
  //         console.error('Error:', error.response ? error.response.data : error.message);
  //         showToast(`خطا در آپلود پست: ${error.response ? error.response.data.error : error.message}`, 'error');
  //     }
  // }

  // const handleSubmit3 = async () => {
  //     if (!video) {
  //         showToast('لطفاً یک ویدیو را انتخاب کنید.', 'error');
  //         return;
  //     }

  //     const formData2 = new FormData();
  //     formData2.append('videoData', video);

  //     try {
  //         const response = await axios.post('https://sadra-edu.com/api/upload/video', formData2, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data',
  //             },
  //         });

  //         const videoPath = response.data.path.split(`\\`).join("/");

  //         setImagePath3(videoPath);

  //         showToast('اطلاعات با موفقیت آپلود شد.', 'success');

  //         // Make sure to handle imagePath2, addPicName, addPicJob, and addPicDesc
  //         axios.post(`https://sadra-edu.com/api/dashboard/success/add/3`, {
  //             videoTitle: videoAuthorName,
  //             videoJob: videoJobTitle,
  //             videoSrc: imagePath3,
  //             videoThumbnail: imagePath3,
  //             date: moment().locale('fa').format('YYYY-MM-DD'),
  //         })
  //         .then(response => {
  //             showToast("پست جدید با موفقیت ثبت شد !", "success")
  //         })
  //         .catch(error => {
  //             console.error('Error:', error.response ? error.response.data : error.message);
  //         });
  //     } catch (error) {
  //         console.error('Error:', error.response ? error.response.data : error.message);
  //         showToast(`خطا در آپلود ویدیو: ${error.response ? error.response.data.error : error.message}`, 'error');
  //     }
  // };

  // const handleSubmit3 = async () => {
  //   if (!video) {
  //     showToast("لطفاً یک ویدیو را انتخاب کنید.", "error");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("videoData", video);

  //   try {
  //     // Upload video
  //     const videoResponse = await axios.post(
  //       "https://sadra-edu.com/api/upload/video",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     const videoPath = videoResponse.data.path.split(`\\`).join("/");
  //     setImagePath3(videoPath);

  //     // Handle image upload (assuming you have the image file in descriptionImage2)
  //     const imageFormData = new FormData();
  //     imageFormData.append("imageData", descriptionImage2);

  //     const imageResponse = await axios.post(
  //       "https://sadra-edu.com/api/upload/single/img",
  //       imageFormData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     const imagePath = imageResponse.data.path.split(`\\`).join("/");
  //     setImagePath4(imagePath);

  //     axios
  //       .post(`https://sadra-edu.com/api/dashboard/success/add/3`, {
  //         videoTitle: videoAuthorName,
  //         videoJob: videoJobTitle,
  //         videoSrc: imagePath3,
  //         videoThumbnail: imagePath4,
  //         date: moment().locale("fa").format("YYYY-MM-DD"),
  //       })
  //       .then((response) => {
  //         showToast(
  //           "موفقیت دانشجو جدید با موفقیت ثبت شد. بعد از تایید ادمین در سایت قرار میگیرد.",
  //           "success"
  //         );
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Error:",
  //           error.response ? error.response.data : error.message
  //         );
  //       });
  //   } catch (error) {
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //     showToast(
  //       `خطا در آپلود ویدیو: ${
  //         error.response ? error.response.data.error : error.message
  //       }`,
  //       "error"
  //     );
  //   }
  // };

  const dropzoneStyle = {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <form
      // onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="newBlogForm"
    >
      <div>
        <h3>برای ساخت پست باید از یکی از روش های زیر اقدام کنید:</h3>
        <p>فقط متن</p>
        <p>تصویر و متن</p>
        <p style={{ textDecoration: "line-through" }}>فقط ویدیو</p>
      </div>

      <Divider />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>حالت اول، فقط متن:</h2>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
        >
          <label htmlFor="detail4" style={{ cursor: "pointer" }}>
            توضیحات اصلی کارت
          </label>
          <textarea
            cols="30"
            rows="7"
            id="detail4"
            className="textArea"
            value={detailsDescription4}
            onChange={(e) => setDetailsDescription4(e.target.value)}
            style={{
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              resize: "vertical",
            }}
          ></textarea>
        </div>

        <button
          className="login_Btn_No_Hid"
          onClick={handleSubmit1}
          style={{ width: "fit-content", marginTop: "2rem", cursor: "pointer" }}
          type="button"
        >
          ثبت
        </button>
      </div>

      <Divider />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>حالت دوم، تصویر و متن:</h2>

        <div {...getRootPropsImage1()} style={dropzoneStyle}>
          <input {...getInputPropsImage1()} />
          <p>
            تصویر کارت را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت باشد (فقط
            یک تصویر)
          </p>
          <p>باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp )</p>
          {fileName && (
            <p style={{ marginTop: "10px" }}>نام فایل انتخابی: {fileName}</p>
          )}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
        >
          <label htmlFor="detail2" style={{ cursor: "pointer" }}>
            توضیحات اصلی کارت
          </label>
          <textarea
            cols="30"
            rows="7"
            id="detail2"
            className="textArea"
            value={addPicDesc}
            onChange={(e) => setAddPicDesc(e.target.value)}
            style={{
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              resize: "vertical",
            }}
          ></textarea>
        </div>

        <button
          className="login_Btn_No_Hid"
          onClick={handleSubmit2}
          style={{ width: "fit-content", marginTop: "2rem", cursor: "pointer" }}
          type="button"
        >
          ثبت
        </button>
      </div>

      <Divider />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>حالت سوم، فقط ویدیو:</h2>

        {/* <InputContact id={'videoname'} setVariable={setVideoAuthorName} variable={videoAuthorName} title={'نام نویسنده'} type={'text'} width={'100%'} />
                <InputContact id={'videojob'} setVariable={setVideoJobTitle} variable={videoJobTitle} title={'شغل نویسنده'} type={'text'} width={'100%'} />

                <p>فیلم معرفی</p>
                <div {...getRootPropsImage4()} style={dropzoneStyle}>
                    <input {...getInputPropsImage4()} accept='video/*' />
                    <p>ویدئو موفقیت را انتخاب یا اینجا بکشید باید کمتر از 10 مگابایت باشد (فقط یک ویدئو)</p>
                    <p>باید از یکی از این پسوند ها باشد: ( mp4, webm, ogg, mkv, avi )</p>
                    {fileName4 && (
                        <p style={{ marginTop: '10px' }}>
                            نام فایل انتخابی: {fileName4}
                        </p>
                    )}
                    {video && (
                        <video width="320" height="240" controls>
                            <source src={URL.createObjectURL(video)} type={video.type} />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                <div {...getRootPropsImage5()} style={dropzoneStyle}>
                    <input {...getInputPropsImage5()} />
                    <p>تصویر نمایشی فیلم را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت باشد (فقط یک تصویر)</p>
                    <p>باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp )</p>
                    {fileName5 && (
                        <p style={{ marginTop: '10px' }}>
                        نام فایل انتخابی: {fileName5}
                        </p>
                    )}
                </div>

                <button
                    className='login_Btn_No_Hid'
                    onClick={handleSubmit3}
                    style={{ width: 'fit-content', marginTop: '2rem', cursor: 'pointer' }}
                    type="button">
                        ثبت
                </button> */}
        <h2>این قسمت در حال ساخت میباشد.</h2>
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
    </form>
  );
}

export default NewSuccess;

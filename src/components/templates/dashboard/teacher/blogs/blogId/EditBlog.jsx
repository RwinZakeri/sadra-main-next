import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Divider } from "@mui/material";
import moment from "jalali-moment";

import Drawer from "@mui/material/Drawer";
import { IoPerson } from "react-icons/io5";
import Box from "@mui/material/Box";
import { categories } from "../../../Categories";
import { showToast } from "@/components/module/AuthModules/Toastify";
import InputContact from "@/components/module/input_module/InputContact";
import Link from "next/link";

function EditBlog({ blogId }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseToken = await axios.get(
          "http://localhost:3001/api/dashboard/whoami",
          {
            withCredentials: true,
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        );
        const { _id } = responseToken.data;
        setUserRole(responseToken.data.role);
        setAuthorName(responseToken.data.firstName);
        setAuthorLastName(responseToken.data.lastName);

        const responseToken2 = await axios.get(
          `http://localhost:3001/api/blog/data/${blogId}`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        );
        setFileName(responseToken2.data.data.imageData);
        setTitle(responseToken2.data.data.title);
        setDescription(responseToken2.data.data.description);
        setHashtags(responseToken2.data.data.hashtags);
        setDetailsDescription1(responseToken2.data.data.detailsDescription1);
        setDetailsDescription2(responseToken2.data.data.detailsDescription2);
        setDetailsDescription3(responseToken2.data.data.detailsDescription3);
        setFileName2(responseToken2.data.data.descriptionImage1);
        setFileName3(responseToken2.data.data.descriptionImage2);
        setDetailsDescription4(responseToken2.data.data.detailsDescription4);
        setDetailsDescription5(responseToken2.data.data.detailsDescription5);
        setTimeToRead(responseToken2.data.data.timeToRead);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setUserRole("error");
      }
    };

    fetchData();
  }, []);

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };
  const [userRole, setUserRole] = useState(null);

  const [imageData, setImageData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [detailsDescription1, setDetailsDescription1] = useState("");
  const [detailsDescription2, setDetailsDescription2] = useState("");
  const [detailsDescription3, setDetailsDescription3] = useState("");
  const [descriptionImage1, setDescriptionImage1] = useState("");
  const [descriptionImage2, setDescriptionImage2] = useState("");
  const [detailsDescription4, setDetailsDescription4] = useState("");
  const [detailsDescription5, setDetailsDescription5] = useState("");
  const [timeToRead, setTimeToRead] = useState("");

  const [fileName, setFileName] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [fileName3, setFileName3] = useState("");

  const onDropImage1 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageData(file);
    setFileName(file.name);
  };

  const onDropImage2 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setDescriptionImage1(file);
    setFileName2(file.name);
  };

  const onDropImage3 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setDescriptionImage2(file);
    setFileName3(file.name);
  };

  const {
    getRootProps: getRootPropsImage1,
    getInputProps: getInputPropsImage1,
  } = useDropzone({ onDrop: onDropImage1 });
  const {
    getRootProps: getRootPropsImage2,
    getInputProps: getInputPropsImage2,
  } = useDropzone({ onDrop: onDropImage2 });
  const {
    getRootProps: getRootPropsImage3,
    getInputProps: getInputPropsImage3,
  } = useDropzone({ onDrop: onDropImage3 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields and images are present
    if (
      !title ||
      !description ||
      !authorName ||
      !authorLastName ||
      !hashtags ||
      !detailsDescription1 ||
      !fileName ||
      !fileName2 ||
      !fileName3
    ) {
      showToast("لطفا تمامی فیلد ها و تصاویر لازم را انتخاب کنید.", "error");
      return;
    }

    const formData = new FormData();
    imageData && formData.append("imageData", imageData);
    descriptionImage1 &&
      formData.append("descriptionImage1", descriptionImage1);
    descriptionImage2 &&
      formData.append("descriptionImage2", descriptionImage2);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hashtags", hashtags);
    formData.append("detailsDescription1", detailsDescription1);
    formData.append("detailsDescription2", detailsDescription2);
    formData.append("detailsDescription3", detailsDescription3);
    formData.append("detailsDescription4", detailsDescription4);
    formData.append("detailsDescription5", detailsDescription5);
    formData.append("timeToRead", timeToRead);
    formData.append("date", moment().locale("fa").format("YYYY-MM-DD"));

    try {
      const response = await axios.put(
        `http://localhost:3001/api/admin/panel/blog/${blogId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
          withCredentials: true,
        }
      );

      showToast(
        "بلاگ جدید با موفقیت ثبت شد. بعد از تایید ادمین در سایت قرار میگیرد.",
        "success"
      );
    } catch (error) {
      showToast(`خطا در آپلود: ${error.response.data.message}`, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="newBlogForm"
      style={{ marginTop: "2rem" }}
    >
      <div {...getRootPropsImage1()} style={dropzoneStyle}>
        <input {...getInputPropsImage1()} />
        <p>
          تصویر مقاله را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت باشد (فقط
          یک تصویر)
        </p>
        <p>باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp )</p>
        {fileName && (
          <p style={{ marginTop: "10px" }}>نام فایل انتخابی: {fileName}</p>
        )}
      </div>
      <Divider />
      <p>اطلاعات اصلی:</p>
      <InputContact
        id={"title"}
        setVariable={setTitle}
        variable={title}
        title={"عنوان مقاله"}
        type={"text"}
        width={"100%"}
      />
      <InputContact
        id={"description"}
        setVariable={setDescription}
        variable={description}
        title={"شرح مقاله"}
        type={"text"}
        width={"100%"}
      />
      <InputContact
        id={"hashtags"}
        setVariable={setHashtags}
        variable={hashtags}
        subTitle={"با کاما ( , ) از هم جدا کنید"}
        title={"هشتگ ها"}
        type={"text"}
        width={"100%"}
      />
      {userRole === "admin" ? (
        <>
          <InputContact
            id={"authorFirstName"}
            setVariable={setAuthorName}
            variable={authorName}
            title={"نام نویسنده"}
            type={"text"}
            width={"100%"}
          />
          <InputContact
            id={"authorLastName"}
            setVariable={setAuthorLastName}
            variable={authorLastName}
            title={"نام خانوادگی نویسنده"}
            type={"text"}
            width={"100%"}
          />
        </>
      ) : (
        ""
      )}
      {/* <InputContact id={'detail1'} setVariable={setDetailsDescription1} variable={detailsDescription1} title={'متن اول'} type={'text'} width={'100%'} /> */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="detail1" style={{ cursor: "pointer" }}>
          توضیحات شماره 1
        </label>
        <textarea
          cols="30"
          rows="5"
          id="detail1"
          className="textArea"
          value={detailsDescription1}
          onChange={(e) => setDetailsDescription1(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
          }}
        ></textarea>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="detail2" style={{ cursor: "pointer" }}>
          توضیحات شماره 2
        </label>
        <textarea
          cols="30"
          rows="5"
          id="detail2"
          className="textArea"
          value={detailsDescription2}
          onChange={(e) => setDetailsDescription2(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
          }}
        ></textarea>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="detail3" style={{ cursor: "pointer" }}>
          توضیحات شماره 3
        </label>
        <textarea
          cols="30"
          rows="5"
          id="detail3"
          className="textArea"
          value={detailsDescription3}
          onChange={(e) => setDetailsDescription3(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
          }}
        ></textarea>
      </div>
      {/* pic */}
      <div>
        <p>عکس شماره 2</p>
        <div {...getRootPropsImage2()} style={dropzoneStyle}>
          <input {...getInputPropsImage2()} />
          <p>
            تصویر مقاله را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت باشد
            (فقط یک تصویر)
          </p>
          <p>باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp )</p>
          {fileName2 && (
            <p style={{ marginTop: "10px" }}>نام فایل انتخابی: {fileName2}</p>
          )}
        </div>
      </div>
      <div>
        <p>عکس شماره 3</p>
        <div {...getRootPropsImage3()} style={dropzoneStyle}>
          <input {...getInputPropsImage3()} />
          <p>
            تصویر مقاله را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت باشد
            (فقط یک تصویر)
          </p>
          <p>باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp )</p>
          {fileName3 && (
            <p style={{ marginTop: "10px" }}>نام فایل انتخابی: {fileName3}</p>
          )}
        </div>
      </div>
      {/* pic */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="detail4" style={{ cursor: "pointer" }}>
          توضیحات شماره 4
        </label>
        <textarea
          cols="30"
          rows="5"
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
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="detail5" style={{ cursor: "pointer" }}>
          توضیحات شماره 5
        </label>
        <textarea
          cols="30"
          rows="5"
          id="detail5"
          className="textArea"
          value={detailsDescription5}
          onChange={(e) => setDetailsDescription5(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
          }}
        ></textarea>
      </div>
      <Divider />
      <InputContact
        id={"ttr"}
        setVariable={setTimeToRead}
        variable={timeToRead}
        subTitle={"عددی بین 1 تا 100"}
        title={"زمان مورد نیاز برای خواندن"}
        type={"number"}
        width={"100%"}
        min={0}
        max={100}
      />

      <button
        className="login_Btn_No_Hid"
        onClick={handleSubmit}
        style={{ width: "fit-content", marginTop: "2rem", cursor: "pointer" }}
        type="button"
      >
        ثبت
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

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  marginTop: "10px",
};

export default EditBlog;

"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import { Divider, FormControl, MenuItem, Select } from "@mui/material";

import Drawer from "@mui/material/Drawer";
import { IoPerson } from "react-icons/io5";
import Box from "@mui/material/Box";
import InputContact from "@/components/module/input_module/InputContact";
import Link from "next/link";
import { showToast } from "@/components/module/AuthModules/Toastify";
import { categories } from "../../../Categories";
function EditClass({ classId }) {
  const [userRole, setUserRole] = useState("");

  const [imageData, setImageData] = useState("");

  const [title, setTitle] = useState(""); //1
  const [teacher, setTeacher] = useState(""); //2
  const [level, setLevel] = useState("آسان"); //3
  const [lessons, setLessons] = useState(""); //4
  const [time, setTime] = useState(""); //5
  const [price, setPrice] = useState(""); //6

  const [fileName, setFileName] = useState(""); //7

  const [discount, setDiscount] = useState(""); //8
  const [shortName, setShortName] = useState(""); //9
  const [subtitle, setSubTitle] = useState(""); //10
  const [date, setDate] = useState(""); //11
  const [place, setPlace] = useState(""); //12
  const [quantity, setQuantity] = useState(""); //13
  const [language, setLanguage] = useState(""); //14

  const [qeustion1, setQeustion1] = useState(""); //9
  const [answer1, setAnswer1] = useState(""); //10

  const [qeustion2, setQeustion2] = useState(""); //11
  const [answer2, setAnswer2] = useState(""); //12

  const [qeustion3, setQeustion3] = useState(""); //13
  const [answer3, setAnswer3] = useState(""); //14

  const [qeustion4, setQeustion4] = useState(""); //15
  const [answer4, setAnswer4] = useState(""); //16

  const [authorName, setAuthorName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");

  const [headers, setHeaders] = useState("");

  const [category, setCategory] = useState("شبکه");

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

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
        const { id } = responseToken.data;
        setUserRole(responseToken.data.role);

        const responseToken3 = await axios.get(
          `http://localhost:3001/api/classes/data/${classId}`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        );
        setTitle(responseToken3.data.data.title);
        setTeacher(
          responseToken3.data.data.author.firstName +
            " " +
            responseToken3.data.data.author.lastName
        );
        setLevel(responseToken3.data.data.level);
        setLessons(responseToken3.data.data.lessons);
        setTime(responseToken3.data.data.time);
        setPrice(responseToken3.data.data.price);
        setFileName(responseToken3.data.data.imageData);
        setDiscount(responseToken3.data.data.discount);
        setShortName(responseToken3.data.data.shortName);
        setSubTitle(responseToken3.data.data.subtitle);
        setDate(responseToken3.data.data.date);
        setPlace(responseToken3.data.data.place);
        setQuantity(responseToken3.data.data.quantity);
        setLanguage(responseToken3.data.data.language);
        setQeustion1(responseToken3.data.data.qeustion1);
        setAnswer1(responseToken3.data.data.answer1);
        setQeustion2(responseToken3.data.data.qeustion2);
        setAnswer2(responseToken3.data.data.answer2);
        setQeustion3(responseToken3.data.data.qeustion3);
        setAnswer3(responseToken3.data.data.answer3);
        setQeustion4(responseToken3.data.data.qeustion4);
        setAnswer4(responseToken3.data.data.answer4);
        setHeaders(responseToken3.data.data.headers);
        setCategory(responseToken3.data.data.category);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setUserRole("error");
      }
    };
    fetchData();
  }, [classId]);

  const onDropImage1 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageData(file);
    setFileName(file.name);
  };

  const {
    getRootProps: getRootPropsImage1,
    getInputProps: getInputPropsImage1,
  } = useDropzone({ onDrop: onDropImage1 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !category || !shortName || !subtitle || !place) {
        showToast("لطفا تمامی فیلد ها و تصاویر لازم را انتخاب کنید.", "error");
        return;
      }
      const formData = new FormData();
      imageData && formData.append("imageData", imageData);
      formData.append("title", title);
      formData.append("level", level);
      formData.append("lessons", lessons);
      formData.append("time", time);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("subtitle", subtitle);
      formData.append("shortName", shortName);
      formData.append("place", place);
      formData.append("quantity", quantity);
      formData.append("language", language);
      formData.append("qeustion1", qeustion1);
      formData.append("answer1", answer1);
      formData.append("qeustion2", qeustion2);
      formData.append("answer2", answer2);
      formData.append("qeustion3", qeustion3);
      formData.append("answer3", answer3);
      formData.append("qeustion4", qeustion4);
      formData.append("answer4", answer4);
      formData.append("headers", headers);
      formData.append("category", category);

      try {
        const response = await axios
          .put(
            `http://localhost:3001/api/admin/panel/classes/${classId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            showToast(
              "کلاس یا دوره جدید با موفقیت ذخیره شد. بعد از تایید ادمین در سایت قرار میگیرد.",
              "success"
            );
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error("Error occurred during request:", error);
        if (error.response) {
          showToast(error.response.data.message, "error");
          console.error("Response data:", error.response.data.message);
        }
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      showToast(
        `خطا در آپلود تصویر: ${
          error.response ? error.response.data.error : error.message
        }`,
        "error"
      );
    }
  };

  const handleSelectChange = (event) => {
    setLevel(event.target.value);
  };

  const handleSelectChangeLang = (event) => {
    setLanguage(event.target.value);
  };

  const handleSelectChangecategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="newBlogForm"
      style={{ marginTop: "2erm" }}
    >
      <InputContact
        id={"title"}
        setVariable={setTitle}
        variable={title}
        title={"عنوان کلاس یا دوره"}
        type={"text"}
        width={"100%"}
      />
      {userRole === "ADMIN" ? (
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
        <InputContact
          id={"teacher"}
          disabled={userRole === "TEACHER" ? true : false}
          setVariable={setTeacher}
          subtitle={
            "درصورت نداشتن دسترسی در تغییر، به این معنا است که نام از قبل وارد شده است."
          }
          variable={teacher}
          title={"استاد دوره"}
          type={"text"}
          width={"100%"}
        />
      )}
      <FormControl variant="outlined">
        <p>سطح دشواری (سطح دشواری انتخاب شده:‌ {level})</p>
        <Select
          id="education"
          sx={{
            position: "relative",
            fontFamily: "Yekan, sans-serif",
            marginTop: "0.6rem",
          }}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="آسان" sx={{ fontFamily: "Yekan,sans-serif" }}>
            آسان
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="متوسط">
            متوسط
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="سخت">
            سخت
          </MenuItem>
        </Select>
      </FormControl>
      <InputContact
        id={"lessons"}
        setVariable={setLessons}
        variable={lessons}
        title={"تعداد دروس"}
        type={"number"}
        width={"100%"}
      />
      <InputContact
        id={"time"}
        setVariable={setTime}
        variable={time}
        subTitle={"واحد ساعت، مانند 40"}
        title={"مدت زمان دوره"}
        type={"number"}
        width={"100%"}
      />
      <InputContact
        id={"price"}
        setVariable={setPrice}
        variable={price}
        subTitle={"براساس واحد تومان، مانند 150000"}
        title={"قیمت"}
        type={"number"}
        width={"100%"}
      />

      <div {...getRootPropsImage1()} style={dropzoneStyle}>
        <input {...getInputPropsImage1()} />
        <p>
          تصویر معرفی کلاس را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت باشد
          (فقط یک تصویر)
        </p>
        <p>باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp )</p>
        {fileName && (
          <p style={{ marginTop: "10px" }}>نام فایل انتخابی: {fileName}</p>
        )}
      </div>

      <InputContact
        id={"discount"}
        setVariable={setDiscount}
        variable={discount}
        subTitle={"بر اساس درصد"}
        title={"تخفیف"}
        type={"number"}
        width={"100%"}
        min={0}
        max={100}
      />
      <InputContact
        id={"headSubTitle"}
        setVariable={setShortName}
        variable={shortName}
        subTitle={"مانند طراحی قالب یا..."}
        title={"نام کوتاه رویداد"}
        type={"text"}
        width={"100%"}
      />
      <InputContact
        id={"detailSubtitle"}
        setVariable={setSubTitle}
        variable={subtitle}
        title={"اطلاعات کوتاه رویداد"}
        subTitle={"مانند: دوره ی طراحی وب دوره ای مهم در ..."}
        type={"text"}
        width={"100%"}
      />
      <FormControl variant="outlined">
        <p>دسته بندی (دسته بندی انتخاب شده:‌ {category})</p>
        <Select
          id="education"
          sx={{
            position: "relative",
            fontFamily: "Yekan, sans-serif",
            marginTop: "0.6rem",
          }}
          onChange={handleSelectChangecategory}
          required
        >
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="" disabled>
            زبان
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="فارسی">
            فارسی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="عربی">
            عربی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="انگلیسی">
            انگلیسی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="ترکی">
            ترکی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="روسی">
            روسی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="المانی">
            المانی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="اسپانیا">
            اسپانیا
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="فرانسه">
            فرانسه
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="" disabled>
            فناوری اطلاعات
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="امنیت">
            امنیت
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: "Yekan,sans-serif" }}
            value="برنامه نویسی"
          >
            برنامه نویسی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="مجازی سازی">
            مجازی سازی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="زیرساخت">
            زیرساخت
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="" disabled>
            رسانه
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: "Yekan,sans-serif" }}
            value="طراحی و تدوین"
          >
            طراحی و تدوین
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="سواد رسانه">
            سواد رسانه
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="تولید محتوی">
            تولید محتوی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="نویسندگی">
            نویسندگی
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: "Yekan,sans-serif" }}
            value="شبکه اجتماعی"
          >
            شبکه اجتماعی
          </MenuItem>
        </Select>
      </FormControl>
      <InputContact
        id={"date"}
        setVariable={setDate}
        variable={date}
        subTitle={"سال ماه روز برای مثال : 2024 10 5"}
        title={"تاریخ"}
        type={"text"}
        width={"100%"}
      />
      <InputContact
        id={"place"}
        setVariable={setPlace}
        variable={place}
        subTitle={"تهران یا.."}
        title={"محل برگزاری"}
        type={"text"}
        width={"100%"}
      />
      {/* <InputContact id={'quantity'} setVariable={setQuantity} variable={quantity} title={'تعداد دروس'} type={'number'} width={'100%'} /> */}
      {/* <InputContact id={'language'} setVariable={setLanguage} variable={language} subTitle={"فارسی، انگلیسی و..."} title={'زبان'} type={'text'} width={'100%'} /> */}
      <FormControl variant="outlined">
        <p>زبان (زبان انتخاب شده:‌ {language})</p>
        <Select
          id="education"
          sx={{
            position: "relative",
            fontFamily: "Yekan, sans-serif",
            marginTop: "0.6rem",
          }}
          onChange={handleSelectChangeLang}
          required
        >
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="فارسی">
            فارسی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="عربی">
            عربی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="انگلیسی">
            انگلیسی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="ترکی">
            ترکی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="روسی">
            روسی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="المانی">
            المانی
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="اسپانیا">
            اسپانیا
          </MenuItem>
          <MenuItem sx={{ fontFamily: "Yekan,sans-serif" }} value="فرانسه">
            فرانسه
          </MenuItem>
        </Select>
      </FormControl>

      <Divider />
      <h3>چه چیز هایی یاد میگیریم؟</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="question1" style={{ cursor: "pointer" }}>
          عنوان شماره 1{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( مانند تحقیقات مبانی و طراحی UX )
          </span>
        </label>
        <InputContact
          id={"question1"}
          setVariable={setQeustion1}
          variable={qeustion1}
          type={"text"}
          width={"100%"}
        />
      </div>
      {/* <div style={{display:"flex", flexDirection:"column", gap:"0.6rem"}}>
                <label htmlFor='answer1' style={{cursor:"pointer"}}>توضیحات شماره 1</label>
                <textarea cols="30" rows="5" 
                    id='answer1'
                    className='textArea'
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                >
                </textarea>
            </div> */}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="question2" style={{ cursor: "pointer" }}>
          عنوان شماره 2{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( مانند مفهوم نمونه سازی Low-Fidelity )
          </span>
        </label>
        <InputContact
          id={"question2"}
          setVariable={setQeustion2}
          variable={qeustion2}
          type={"text"}
          width={"100%"}
        />
      </div>
      {/* <div style={{display:"flex", flexDirection:"column", gap:"0.6rem"}}>
                <label htmlFor='answer2' style={{cursor:"pointer"}}>توضیحات شماره 2</label>
                <textarea cols="30" rows="5" 
                    id='answer2'
                    className='textArea'
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
                >
                </textarea>
            </div> */}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="question3" style={{ cursor: "pointer" }}>
          عنوان شماره 3{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( مانند نمونه سازی High-Fidelity تا تجزیه و تحلیل Post-Launch )
          </span>
        </label>
        <InputContact
          id={"question3"}
          setVariable={setQeustion3}
          variable={qeustion3}
          type={"text"}
          width={"100%"}
        />
      </div>
      {/* <div style={{display:"flex", flexDirection:"column", gap:"0.6rem"}}>
                <label htmlFor='answer3' style={{cursor:"pointer"}}>توضیحات شماره 3</label>
                <textarea cols="30" rows="5" 
                    id='answer3'
                    className='textArea'
                    value={answer3}
                    onChange={(e) => setAnswer3(e.target.value)}
                >
                </textarea>
            </div> */}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="question4" style={{ cursor: "pointer" }}>
          عنوان شماره 4{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( مانند CAPSTONE - طراحی نمونه کاره )
          </span>
        </label>
        <InputContact
          id={"question4"}
          setVariable={setQeustion4}
          variable={qeustion4}
          type={"text"}
          width={"100%"}
        />
      </div>
      {/* <div style={{display:"flex", flexDirection:"column", gap:"0.6rem"}}>
                <label htmlFor='answer4' style={{cursor:"pointer"}}>توضیحات شماره 4</label>
                <textarea cols="30" rows="5" 
                    id='answer4'
                    className='textArea'
                    value={answer4}
                    onChange={(e) => setAnswer4(e.target.value)}
                >
                </textarea>
            </div> */}
      {/* <Divider/> */}
      {/* pic */}
      {/* <div>
                <p>فیلم معرفی</p>
                <div {...getRootPropsImage3()} style={dropzoneStyle}>
                    <input {...getInputPropsImage3()} accept='video/*' />
                    <p>ویدئو رویداد را انتخاب یا اینجا بکشید باید کمتر از 10 مگابایت باشد (فقط یک ویدئو)</p>
                    <p>باید از یکی از این پسوند ها باشد: ( mp4, webm, ogg, mkv, avi )</p>
                    {fileName3 && (
                        <p style={{ marginTop: '10px' }}>
                            نام فایل انتخابی: {fileName3}
                        </p>
                    )}
                    {video && (
                        <video width="320" height="240" controls>
                            <source src={URL.createObjectURL(video)} type={video.type} />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            </div>
            <div>
                <p>عکس نمایشی فیلم</p>
                <div {...getRootPropsImage2()} style={dropzoneStyle}>
                    <input {...getInputPropsImage2()} />
                    <p>تامبنیل را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت باشد (فقط یک تصویر)</p>
                    <p>باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, webp )</p>
                    {fileName2 && (
                        <p style={{ marginTop: '10px' }}>
                            نام فایل انتخابی: {fileName2}
                        </p>
                    )}
                </div>
            </div> */}
      {/* pic */}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="headers" style={{ cursor: "pointer" }}>
          سرفصل های دوره{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( بعد از نوشتن هر سرفصل آن را با{" "}
            <span style={{ fontSize: "2rem" }}>,</span> از هم جدا کنید )
          </span>
        </label>
        <textarea
          cols="30"
          rows="5"
          id="headers"
          className="textArea"
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
            fontFamily: "Yekan,sans-serif",
          }}
        ></textarea>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="answer1" style={{ cursor: "pointer" }}>
          توضیحات تکمیلی{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( برای رفتن به خط بعد از کارکتر ^ استفاده کنید. )
          </span>
        </label>
        <textarea
          cols="30"
          rows="5"
          id="answer1"
          className="textArea"
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
            fontFamily: "Yekan,sans-serif",
          }}
        ></textarea>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="answer2" style={{ cursor: "pointer" }}>
          توضیحات اضافی{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( برای رفتن به خط بعد از کارکتر ^ استفاده کنید. )
          </span>
        </label>
        <textarea
          cols="30"
          rows="5"
          id="answer2"
          className="textArea"
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
            fontFamily: "Yekan,sans-serif",
          }}
        ></textarea>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="answer3" style={{ cursor: "pointer" }}>
          توضیحات اضافی{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( برای رفتن به خط بعد از کارکتر ^ استفاده کنید. )
          </span>
        </label>
        <textarea
          cols="30"
          rows="5"
          id="answer3"
          className="textArea"
          value={answer3}
          onChange={(e) => setAnswer3(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
            fontFamily: "Yekan,sans-serif",
          }}
        ></textarea>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label htmlFor="answer4" style={{ cursor: "pointer" }}>
          توضیحات اضافی{" "}
          <span style={{ color: "#667085", cursor: "text" }}>
            ( برای رفتن به خط بعد از کارکتر ^ استفاده کنید. )
          </span>
        </label>
        <textarea
          cols="30"
          rows="5"
          id="answer4"
          className="textArea"
          value={answer4}
          onChange={(e) => setAnswer4(e.target.value)}
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            resize: "vertical",
            fontFamily: "Yekan,sans-serif",
          }}
        ></textarea>
      </div>

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

export default EditClass;

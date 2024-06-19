"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import mongoose from "mongoose";
import { showToast } from "../AuthModules/Toastify";
function DataInput(id) {
  const dropzoneStyle = {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "25px",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "10px",
  };

  const onDropImage1 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageData(file);
    setFileName(file.name);
  };
  const [fileName, setFileName] = useState("");
  const [imageData, setImageData] = useState("");

  const [selectedJob, setSelectedJob] = useState("");

  const {
    getRootProps: getRootPropsImage1,
    getInputProps: getInputPropsImage1,
  } = useDropzone({ onDrop: onDropImage1 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageData) {
      showToast("لطفاً یک تصویر را انتخاب کنید.", "error");
      return;
    }
    setSelectedJob(id.id);

    const formData = new FormData();
    formData.append("file", imageData);
    selectedJob && formData.append("selectedJob", selectedJob);

    try {
      const response = await axios
        .post(
          "http://localhost:3001/api/resume/admin/panel/resume ",
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
            "رزومه ی شما ارسال شد! منتظر تماس از تیم پشتیبانی باشید.",
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
        `خطا در آپلود تصویر: ${
          error.response ? error.response.data.error : error.message
        }`,
        "error"
      );
    }
  };

  return (
    <div style={{ marginBottom: "3rem", marginTop: "3rem", padding: 40 }}>
      <h1>برای ثبت رزومه ی خود از فرم زیر اقدام فرمایید.</h1>
      <form action="">
        <div {...getRootPropsImage1()} style={dropzoneStyle}>
          <input {...getInputPropsImage1()} />
          <p>
            را انتخاب یا اینجا بکشید باید کمتر از 3 مگابایت باشد فایل مورد نظر
          </p>
          <p>باید از یکی از این پسوند ها باشد: ( png, jpg, jpeg, pdf )</p>
          {fileName && (
            <p style={{ marginTop: "10px" }}>نام فایل انتخابی: {fileName}</p>
          )}
        </div>
        <button
          className="login_Btn_No_Hid"
          onClick={handleSubmit}
          style={{
            width: "fit-content",
            marginTop: "2rem",
            cursor: "pointer",
          }}
          type="button"
        >
          ارسال
        </button>
      </form>
    </div>
  );
}

export default DataInput;

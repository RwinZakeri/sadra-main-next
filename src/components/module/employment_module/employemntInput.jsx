"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import DataInput from "./dataInput.jsx";
function EmploymentInputs() {
  return (
    <>
      <DataInput />
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
}

export default EmploymentInputs;

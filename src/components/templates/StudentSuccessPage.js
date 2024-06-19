import React from "react";
import Link from "next/link";
// Styles
// Mui
import { Masonry } from "@mui/lab";
import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
// Component
import SuccessCard from "../module/student_module/SuccessCard";

function StudentSuccessPage({ data }) {
  return (
    <div>
      <div className="successHero" dir="rtl">
        <div className="successHeroImage"></div>
        <div className="successHeroContent">
          <h1 className="successHeroContentHeader">
            داستان موفقیت همراهان صدرا
          </h1>
          <p className="successHeroContentText">
            برای شنیدن داستان موفقیت دانش آموزان و استاید ما فقط از ما نپرسید،
            خود این همراهان صدرا هستن که برای شما داستان‌های خودشون رو روایت
            می‌کنن.
          </p>
        </div>
        <div className="successHeroImageSmall"></div>
      </div>
      <div className="successMain">
        <SuccessCard data={data && data} />
      </div>
    </div>
  );
}

export default StudentSuccessPage;

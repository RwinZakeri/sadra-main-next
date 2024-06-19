import React from "react";

import Link from "next/link";
// Styles
// Components
import Line from "../module/Line";

import {
  Table,
  GrowArrow,
  PowerIcon,
  PersonWithHeart,
} from "../../../public/assets/svg/EmploymentIcon";
// Mui

import { ToastContainer } from "react-toastify";
import GroupComponent from "../module/employment_module/groupComponent";
import QuestionsCom from "../module/employment_module/questions";
import DataInput from "../module/employment_module/dataInput";
import EmploymentData from "../module/employment_module/employmentData";

const EmploymentPage = ({data}) => {

  return (
    <div className="Employment_container">
      <div className="Employment_Head">
        <h1>همکاری با صدرا</h1>
        <p>
          صدرا، بستری قدرتمند از جنس خلق و تحول است و به افرادی که به فراتر از
          خود متعهدند، فرصت می‌دهد که «حرفه‌ای‌ترین و تاثیرگذارترین» نسخه خود را
          خلق کنند و آن را کار و زندگی کنند.
        </p>
      </div>
      <div className="OurValue">
        <div className="OurValieIconHead">
          <Line /> <h2>ارزش‌های ما</h2>
        </div>

        <div className="OurValue_Detail">
          <h2 id="textMB">جایی که هم باعث رشد خودت میشی، هم دیگران</h2>
          <p>
            صدرا، محیطی رو فراهم کرده تا از توانایی‌ها و ویژگی‌هایی که شما رو
            نسبت به مدرسان دیگه، برتر میکنه به بهترین شکل مورد استفاده قرار
            بگیره تا شما هم به بهترین شکل ممکن این توانایی‌ها رو در اختیار
            دیگران قرار بدید و مسیر پیشرفت‌شون رو هموار کنی و میتونی توانایی‌هات
            رو بهبود بدی و بهترین نسخه خودت باشی.اینجا همون سرزمین فرصت‌هاست!
          </p>

          <div className="Icons">
            <ul className="iconUnorderedList">
              <li>
                <Table />
                نتیجه گرایی
              </li>
              <li>
                <GrowArrow />
                پیشرفت مداوم
              </li>
              <li>
                <PowerIcon />
                قدرت‌ بخشی
              </li>
              <li>
                <PersonWithHeart />
                احترام همیشگی
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="Chance_container">
        <div className="ChanceIcon">
          <Line />
          <h2>فرصت‌های شغلی</h2>
        </div>

        <h2>فرصت‌هایی برای رسیدن به رویاهای خود</h2>

        <EmploymentData data={data.data} />

        <DataInput />

        <QuestionsCom />

        <GroupComponent />

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
    </div>
  );
};

export default EmploymentPage;

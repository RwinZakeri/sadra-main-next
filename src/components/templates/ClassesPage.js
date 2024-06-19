import React from "react";
import Link from "next/link";

// Components
import SearchBox from "../module/SearchBox";
import ClassCard from "../module/classes_module/ClassCard";
import EventCard from "../module/event_module/EventCard";
import FilterList from "../module/classes_module/FilterList";
import ClassesData from "../module/classes_module/classesData";
// Icons
import { FaLongArrowAltLeft } from "react-icons/fa";

// import { useSearchParams } from "next/navigation";
function ClassesPage({ category, data }) {

  return (
    <div className="classContainer" dir="rtl">
      <div className="TopClassContainer">
        <h1>کلاس های صدرا</h1>
        <p>
          صدرا با فراهم کردن شرایطی ایده‌آل، سالانه رویدادهای زیادی در حوزه‌ی
          تکنولوژی در شهرهای بزرگی مثل تهران، اصفهان، مشهد و شیراز برگزار می‌کند
          که مدرسان این رویدادها از بهترین‌ مدرسان کشور بوده و آماده‌ی انتقال
          دانش خود به دانشجویان می‌باشند.{" "}
        </p>

        <FilterList />
      </div>
      {/* ref={classBodyRef} */}
      <div className="classBody">
        <div className="classBodyTitle">
          <h2>دوره های پیشنهادی</h2>
          <Link href={"/classes?category=all"}>
            <div className="courceLink">
              نمایش همه <FaLongArrowAltLeft />{" "}
            </div>
          </Link>
        </div>

        <ClassesData data={data.data} category={category} />
        {/* <ComponentProps /> */}
      </div>
    </div>
  );
}

export default ClassesPage;

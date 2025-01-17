import React from "react";
import Image from "next/image";

import { CiClock2 } from "react-icons/ci";
import { RiStackFill } from "react-icons/ri";
import { MdOutlineStackedBarChart } from "react-icons/md";

export default function ClassCard({
  id,
  title,
  teacherFirstName,
  teacherLastName,
  level,
  lessons,
  time,
  price,
  image,
  category,
}) {
  const newImage = image?.split("/").splice(1).splice(1).join("/");
  return (
    <div className="CardBox">
      <div className="imgContainer">
        <Image width={400} height={400} src={`/${newImage}`} alt={title} />
        <div className="cardInfo">
          <h2>{title}</h2>
          {category === "برنامه نویسی" &&
          (teacherFirstName?.trim().length !== 0 ||
            teacherLastName?.trim().length !== 0) ? (
            <p>
              استاد {teacherFirstName} {teacherLastName}
            </p>
          ) : null}
          <div className="moreCardDetail">
            <span>
              <MdOutlineStackedBarChart className="classIcon" /> سطح {level}
            </span>
            <span>
              <RiStackFill className="classIcon" /> {lessons} درس
            </span>
            <span>
              <CiClock2 className="classIcon" /> {time} ساعت{" "}
            </span>
          </div>
        </div>
      </div>

      <div className="priceContainer">
        {price === "0" || !price ? (
          <span id="freePrice">رایگان</span>
        ) : (
          <>
            <span>{price}</span>
            <span>هزارتومان</span>
          </>
        )}
      </div>
    </div>
  );
}

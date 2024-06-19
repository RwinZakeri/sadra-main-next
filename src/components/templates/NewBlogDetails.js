import React from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
// Component
import VerticalProgressBar from "../module/ProgressBar";
import Line from "../module/Line";
import BlogCard from "../module/blog_module/BlogCard";
// mui
import { Avatar, CardContent, Divider, Grid, Typography } from "@mui/material";
// Styles
//icons:
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

function NewBlogDetails({ data }) {
  const {
    _id,
    image,
    date,
    title,
    description,
    author,
    hashtags,
    detailsDescription1,
    detailsDescription2,
    detailsDescription3,
    descriptionImage1,
    descriptionImage2,
    detailsDescription4,
    detailsDescription5,
    timeToRead,
    profile,
  } = data.data;
  if (!data.data) {
    return (
      <>
        <h1>در حال دریافت اطلاعات</h1>
      </>
    );
  }
  const tags = hashtags ? hashtags.split(",") : "";
  return (
    <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
      {true && (
        <React.Fragment>
          <div className="Home">
            <div className="BoxData">
              <div className="tags" id="hashtagsDetails" dir="rtl">
                {tags &&
                  tags.map((tag) => (
                    <>
                      <Link
                        className="link"
                        key={tag}
                        href={`/blog/tags/${tag}`}
                        style={{
                          background: "rgba(255, 255, 255, 0.65)",
                          color: "black",
                        }}
                      >
                        #{tag}
                      </Link>
                    </>
                  ))}
              </div>
              <h1 dir="rtl">{title}</h1>
              <h2 dir="rtl" style={{ color: "#D0D5DD", fontWeight: "400" }}>
                {detailsDescription1}
              </h2>
              <p dir="rtl" style={{ color: "#FFF", fontWeight: "700" }}>
                {author
                  ? ` نوشته شده توسط ${author.username}`
                  : "نویسنده ای تعریف نشده"}
              </p>
            </div>

            <div className="BoxImage">
              <Image width={1000} height={900} src={image} alt={image} />
            </div>
          </div>
          <div className="mainContentBlogDetails">
            <div className="timeProgressBlogDetails" dir="rtl">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>{date?.split("-").join("/")}</span>&nbsp;
                <span>
                  <Line />
                </span>
                &nbsp;
                <span>{timeToRead} دقیقه</span>
              </div>
              <VerticalProgressBar
                bgcolor={"#6AD095"}
                progress={timeToRead}
                width={"5px"}
              />
              <span id="dissapear" style={{ marginRight: "4rem" }}>
                پایان
              </span>
            </div>
            <div className="ContentTextBlogDetails">
              <div>
                <p style={{ color: "#475467" }} dir="rtl">
                  {detailsDescription1}
                </p>
                <br />
                <p style={{ color: "#475467" }} dir="rtl">
                  {detailsDescription2}
                </p>
                <br />
                <p style={{ color: "#475467" }} dir="rtl">
                  {detailsDescription3}
                </p>
                <br />
              </div>
              <div className="BlogDetailsPictures">
                <Image
                  width={400}
                  height={400}
                  src={descriptionImage1}
                  alt={descriptionImage1}
                  className="BlogDetailsPicture"
                />
                <Image
                  width={400}
                  height={400}
                  src={descriptionImage2}
                  alt={descriptionImage2}
                  className="BlogDetailsPicture"
                />
              </div>
              <div className="BlogDetailsSummery">
                <p dir="rtl" style={{ color: "#475467" }}>
                  {detailsDescription4}
                </p>
                <h1
                  dir="rtl"
                  className="middleBlogHeader"
                  style={{ color: "#4CA773" }}
                >
                  {title}
                </h1>
                <p dir="rtl" style={{ color: "#475467" }}>
                  {detailsDescription4}
                </p>
              </div>
              <div className="BlogPostInfo">
                <div className="tags" id="hashtagsDetails" dir="rtl">
                  {tags &&
                    tags.map((tag) => (
                      <Link
                        className="link"
                        key={tag}
                        href={`/blog/tags/${tag}`}
                        style={{
                          background: "rgba(0, 0, 0, 0.65)",
                          color: "#FFF",
                        }}
                      >
                        #{tag}
                      </Link>
                    ))}
                </div>

                <br />
                <Divider />
                <br />

                <div className="authorInfo">
                  <div className="authorIcons">
                    <Link href={`linkedin`}>
                      <FaLinkedin size={25} color="#495057" />
                    </Link>
                    <Link href={`pinterest`}>
                      <FaPinterest size={25} color="#495057" />
                    </Link>
                    <Link href={``}>
                      <FaSquareXTwitter size={25} color="#495057" />
                    </Link>
                    <Link href={``}>
                      <FaFacebook size={25} color="#495057" />
                    </Link>
                  </div>
                  <CardContent
                    style={{
                      direction: "rtl",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      textAlign: "right",
                    }}
                  >
                    <Avatar
                      src={profile}
                      alt={"test"}
                      style={{ marginLeft: 10, objectFit: "cover" }}
                    />
                    <div>
                      <div>
                        <Typography
                          fontFamily={"Yekan, sans-serif"}
                          variant="subtitle1"
                          color={"#475467"}
                        >
                          {author ? author.username : "نویسنده ای تعریف نشده"}
                        </Typography>
                        <Typography
                          fontFamily={"Yekan, sans-serif"}
                          variant="body2"
                          color={"#98A2B3"}
                        >
                          {author ? author.username : "نویسنده ای تعریف نشده"}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default NewBlogDetails;

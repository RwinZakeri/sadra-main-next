import React from "react";
import Link from "next/link";
import axios from "axios";

// Styles
// Components
import Image from "next/image";
// Icons
import { FaRegClock } from "react-icons/fa6";
import { BsStack } from "react-icons/bs";
import { MdOutlineStackedBarChart } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import QuestionIcon from "../../../public/assets/svg/QuestionIcon";
// MUI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";


export default function ClassDetailPage({ data }) {


  
  const {
    title,
    author,
    category,
    level,
    lessons,
    time,
    price,
    image,
    discount,
    quantity,
    shortName,
    subtitle,
    Detail_Head_Title,
    detailSubtitle,
    date,
    place,
    language,
    status,
    qeustion1,
    answer1,
    qeustion2,
    answer2,
    qeustion3,
    answer3,
    qeustion4,
    answer4,
    headers,
  } = data;

  return (
    <>
      <div className="Details" dir="rtl">
        <div className="HeadDetail">
          <div className="HeadDetailData">
            <h1 style={{ color: "#F9F9F9" }}>{title}</h1>
            <p style={{ color: "#E0E0E0" }}>{subtitle}</p>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="bodyDetailContainer" dir="rtl">
        <div className="infoContainer">
          <h2 style={{ fontSize: 34, marginBottom: 24 }}>
            چه چیزی یاد می‌گیریم؟
          </h2>

          <div className="overView">
            <div className="overViewBox1">
              <FaCheck style={{ width: 20, height: 20, marginLeft: 5 }} />{" "}
              {qeustion1}
            </div>
            <div className="overViewBox1">
              <FaCheck style={{ width: 20, height: 20, marginLeft: 5 }} />{" "}
              {qeustion2}
            </div>
            <div className="overViewBox1">
              <FaCheck style={{ width: 20, height: 20, marginLeft: 5 }} />{" "}
              {qeustion3}
            </div>
            <div className="overViewBox1">
              <FaCheck style={{ width: 20, height: 20, marginLeft: 5 }} />{" "}
              {qeustion4}
            </div>
          </div>
          <div className="Questions">
            <Accordion sx={{ maxWidth: "96%" }}>
              <AccordionSummary
                expandIcon={<QuestionIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontFamily={"Yekan , sans-serif"}>
                  سرفصل های این دوره :
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontFamily={"Yekan , sans-serif"}>
                  {headers
                    ?.split(",")
                    .slice(0, 100)
                    .map((item, index) => (
                      <div className="overViewBox1" key={index}>
                        <FaCheck
                          style={{ width: 20, height: 20, marginLeft: 5 }}
                        />
                        <li>{item}</li>
                      </div>
                    ))}
                  {headers?.split(",").length > 100 && (
                    <div className="overViewBox1">
                      <h3 style={{ marginRight: "25px" }}>
                        و ده ها سرفصل دیگر...
                      </h3>
                    </div>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          {qeustion1 !== "" && (
            <div className="info1">
              <h3>توضیحات تکمیلی</h3>
              <br />
              {answer1?.split("^").map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}
          {qeustion2 !== "" && (
            <div className="info2">
              {answer2?.split("^").map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}
          {qeustion3 !== "" && (
            <div className="info3">
              {answer3?.split("^").map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}
          {qeustion4 !== "" && (
            <div className="info4">
              {answer4?.split("^").map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}
        </div>
        {/* Card */}
        <div className="CardContainer">
          <div className="CardDetail">
            {/* <Image width={400} height={300} src={image} alt={title} /> */}
            {/* <Skeleton variant="rectangular" width={"100%"} height={"55%"} /> */}
            <Image width={400} height={300} src={"/assets/3.png"} alt={title} />
            <div className="topCard">
              {/* <span id='price'><span>{price}</span><span>هزار تومان</span></span> */}

              {/* <div>
              <span style={{display : "flex"}}>
                  {
                    Number(discount) ? (
                    <div>
                      <span id="price">{price * (100 - Number(discount)) / 100 ? (
                      <div style={{display : "flex" , flexDirection : "column" , position : "relative" , alignItems : "center" , justifyContent : "center"}}>
                        <span>{price * (100 - Number(discount)) / 100}</span><span style={{fontSize : 12}} >هزارتومان</span>
                        <span style={{ opacity : 0.5 , fontSize : 16 ,position : "absolute" ,top : -38 , textDecoration : "line-through" , display : "flex" , flexDirection : "column" , alignItems : "center" , justifyContent : "center"}} >{price} <span style={{position : "absolute" , top : 13}} >هزارتومان</span> </span>
                      </div>
                      ) : (
                            <div style={{position : "relative"}}>
                            <span style={{ opacity : 0.5 ,position : "absolute" , top : -40 , right : 14 , fontSize : 17 , textDecoration : "line-through"}} >{price} <span style={{position : "absolute" , right : -7, top : 17}} >هزارتومان</span></span>
                            <span style={{fontWeight : 700 , fontSize : 23}} >رایگان</span>
                            </div>
                          )}</span>
                    </div>
                    ) : <span id="price">{price} <span id="rial">هزارتومان</span></span>
                  }
              </span>
              </div> */}

              {/* test */}
            </div>
            {/* <Button variant={"outlined"} onClick={sabtHandler}>همین حالا ثبت نام کن</Button> */}
            <div className="cadTitle">
              <h3>توضیحات دوره</h3>
              <h1>{detailSubtitle}</h1>
            </div>
            <div className="CardFooter">
              <h2>جزئیات دوره</h2>
              <div className="time">
                {/* <span style={{display : "flex" , alignItems : "center" , justifyContent : "flex-start" , marginBottom : 10 }} >
                <CiCalendarDate style={{width : 23 , height : 23 , marginLeft : 5 , marginBottom : 4}} />
                {usePersianNumber(date?.split(" ")[0])}<span style={{padding : 3}} >/</span>{usePersianNumber(date?.split(" ")[1])}<span  style={{padding : 3}} >/</span>{usePersianNumber(date?.split(" ")[2])}
              </span> */}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <FaRegClock
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 7,
                      marginBottom: 7,
                    }}
                  />
                  طول زمان دوره {time} ساعت
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <BsStack
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 5,
                      marginBottom: 4,
                    }}
                  />
                  <span>{lessons} مبحث</span>
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <MdOutlineStackedBarChart
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 5,
                      marginBottom: 4,
                    }}
                  />
                  <span>سطح {level}</span>
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <FaEarthAmericas
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 5,
                      marginBottom: 4,
                    }}
                  />
                  <span>زبان {language}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='detailFooter' dir='rtl'>
      <div className='detailFooterTitle'>
        <h2>مروری بر دوره‌های پیشین</h2>
      </div>
        <VideoPlayer  video={videoSrc} poster={thumbnail}   />
      <div style={{display : "flex" , alignItems : "center" , justifyContent : "center" , marginTop : 150 , flexWrap : "wrap"}} >
      {
        teachersData.map(item =><EventDetailTeacherCard key={item.id} data={item} />)
      }
      </div>
    </div> */}
    </>
  );
}

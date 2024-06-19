import React, { useEffect, useState } from "react";
import Image from "next/image";
// Styles
// import "../../templates/HomePage.css";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";
// Icons

// Imported Pic
import LogoSvg from "/public/assets/logos/آب و فاضلاب استان تهران  سفید.png";
import LogoSvg2 from "/public/assets/logos/موج پردازان البرز سفید.png";
import LogoSvg3 from "/public/assets/logos/بیمه میهن سفید.png";

// export async function fetchcommentData(){
//   const res = await fetch("https://sadra-edu.com/api/HomeContactsDetail/data");
//   const data = await res.json()
//   // if(!data){
//   //   throw new Error("error while fetching comment data")
//   // }
//   return data;
// }
import { successStory } from "@/components/data/homeData";

function SuccessStory() {
  // const commentData = await fetchcommentData();

  return (
    <>
      <div className="Slider">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {successStory.map((item) => (
            <SwiperSlide key={item.id}>
              <p
                key={item.id}
                id="cardComment"
                style={{
                  padding: "0rem 3rem",
                  textAlign: "center",
                  textJustify: "inter-word",
                }}
              >
                {item.comment}
              </p>
              <Image width={500} height={500} src={item.profile} alt="prof" />
              <p id="cardName">{item.name}</p>
              <p id="cardJob">{item.job}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="contact_corporates">
        <Image
          width={500}
          height={500}
          src={LogoSvg}
          alt="a1"
          className="logoMainPage"
          style={{ height: "85px", width: "230px" }}
        />
        <Image
          width={500}
          height={500}
          src={LogoSvg2}
          alt="a2"
          className="logoMainPage"
          style={{ height: "85px", width: "230px" }}
        />
        <Image
          width={500}
          height={500}
          src={LogoSvg3}
          alt="a3"
          className="logoMainPage"
          style={{ height: "85px", width: "230px" }}
        />
      </div>
    </>
  );
}

export default SuccessStory;

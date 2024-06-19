import React from "react";
import Link from "next/link";
// Styles
// Components
import SearchBox from "../module/SearchBox";
import EventCard from "../module/event_module/EventCard";
// MUI

// Icons

import dynamic from "next/dynamic";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const EventDataHydrationErr = dynamic(() =>
  import("../module/event_module/eventData", { ssr: false })
);

export default function EventsPage({data}) {
  const popularEvent = [
    {
      id: 1,
      title: "UI Design",
    },
    {
      id: 2,
      title: "UX Design",
    },
    {
      id: 3,
      title: "Front-end",
    },
  ];

  const categories = [
    {
      id: 1,
      title: "UI/UX طراحی",
      quantity: 160,
    },
    {
      id: 2,
      title: "Graphic طراحی",
      quantity: 90,
    },
    {
      id: 3,
      title: "Game طراحی",
      quantity: 25,
    },
    {
      id: 4,
      title: "Front-End",
      quantity: 5,
    },
    {
      id: 5,
      title: "Back-End",
      quantity: 20,
    },
    {
      id: 6,
      title: "Data Science",
      quantity: 65,
    },
  ];

  return (
    <div className="eventContainer">
      <div className="eventHeader">
        <h1 dir="rtl">رویدادهای صدرا</h1>
        <p dir="rtl">
          صدرا با فراهم کردن شرایطی ایده‌آل، سالانه رویدادهای زیادی در حوزه‌ی
          تکنولوژی در شهرهای بزرگی مثل تهران، اصفهان، مشهد و شیراز برگزار می‌کند
          که مدرسان این رویدادها از بهترین‌ مدرسان کشور بوده و آماده‌ی انتقال
          دانش خود به دانشجویان می‌باشند.{" "}
        </p>
        <SearchBox dir="ltr" />
        <span id="popStyle">
          {" "}
          {popularEvent.map((item, index) => (
            <span key={index}>{`${item.title} , `}</span>
          ))}{" "}
          : محبوب‌ها
        </span>
      </div>

      <div className="eventBody">
        <div className="tutorialBox">
          <EventDataHydrationErr data={data} />

          {/* <Box sx={{ width: '100%', typography: 'body1' , direction : "rtl" }}>
  <TabContext value={value}>

    {
      TabHeaders?.map((Tab) => (
        <TabPanel key={Tab.id} value={Tab.id.toString()} >
          <div key={Tab.id} className='event_card_info'>
                {
                  data?.map((item)=>(
                    item?.isShown === 1 && <Link key={item.id} href={`/events/${item.id}`}><EventCard key={item.id} {...item} /></Link>
                  ))
                }
          </div>
        </TabPanel>
      ))
    }


  </TabContext>
</Box> */}
        </div>
        <div></div>
      </div>
    </div>
  );
}

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassCard from "../module/classes_module/ClassCard";
import EventCard from "../module/event_module/EventCard";
import BlogCard from "../module/blog_module/BlogCard";
function SearchPage({ filters }) {
  const myArray = ["classes", "events", "blog"];
  const [data, setData] = useState([]);

  // if (RegEx.length) {
  // }
  let RegEx;
  if (filters.value) {
    RegEx = new RegExp(filters.value);
  }

  if (filters.option) {
    useState(() => {
      axios
        .get(`http://localhost:3001/api/${filters.option}/data`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        })
        .then((res) => setData(res.data.data));
    }, []);
  } else if (!filters.option) {
    useState(() => {
      myArray.map((item) => {
        axios
          .get(`http://localhost:3001/api/${item}/data`, {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          })
          .then((res) => setData((prev) => [...prev, res.data.data]));
      });
    });
    // myArray.map((item) => console.log(item));
  }

  return (
    <div>
      {!filters.option && !filters.value ? (
        toast.error("error")
      ) : filters.option && !filters.value.length ? (
        data?.map((item) =>
          filters.option == "classes" ? (
            <Link key={item._id} href={`/${filters.option}/${item._id}`}>
              <ClassCard {...item} />
            </Link>
          ) : filters.option ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <div style={{ width: 250 }}>
                <Link href={`/events/${item.id}`}>
                  <EventCard {...item} />
                </Link>
              </div>
            </div>
          ) : filters.option == "blog" ? (
            <Link href={`/blog/${item.id}`}>
              <BlogCard {...item} />
            </Link>
          ) : null
        )
      ) : !filters.option && filters.value.length ? (
        data
          ?.map((item) => item.filter((da) => da.title.match(RegEx)))
          .map((pro) =>
            pro.map((item) =>
              item.branch == "classes" ? (
                <Link key={item._id} href={`/classes/${item._id}`}>
                  <ClassCard {...item} />
                </Link>
              ) : item.branch == "blog" ? (
                <Link href={`/blog/${item.id}`}>
                  <BlogCard {...item} />
                </Link>
              ) : item.branch == "event" ? (
                <Link href={`/events/${item.id}`}>
                  <EventCard {...item} />
                </Link>
              ) : null
            )
          )
      ) : (
        <p>متاسفانه چنین دیتایی وجود ندارد</p>
      )}

      {/* 
      {!filters.option && !filters.value ? (
        data.map((item, index) => item.map((item) => <h1>{item.title}</h1>))
      ) : !filters.option && filters.value.length ? (
        data
          .map((item) => item.filter((da) => da.title.match(RegEx)))
          .map((pro) => pro.map((item) => <h1>{item.title}</h1>))
      ) : (
        <p>متاسفانه چنین دیتایی وجود ندارد</p>
      )} */}
    </div>
  );
}

export default SearchPage;

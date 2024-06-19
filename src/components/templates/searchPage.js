"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchPage({ filters }) {
  const myArray = ["classes", "events", "blog"];
  const [data, setData] = useState([]);
  // if (RegEx.length) {
  //   console.log(true);
  // }
  // console.log(filters);
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
        data?.map((item) => (
          <Link key={item._id} href={`/${filters.option}/${item._id}`}>
            <h1>{item.title}</h1>
          </Link>
        ))
      ) : !filters.option && filters.value.length ? (
        data
          ?.map((item) => item.filter((da) => da.title.match(RegEx)))
          .map((pro) => pro.map((item) => <h1 key={item._id}>{item.title}</h1>))
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

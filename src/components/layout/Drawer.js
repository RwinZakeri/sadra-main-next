"use client";
import React, { useEffect, useState } from "react";

// MUI parts
import { Box, Drawer, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";

// Icons
import { IoIosHome } from "react-icons/io";
import { MdOutlineEvent } from "react-icons/md";
import { MdOutlineClass } from "react-icons/md";
import { GoDiscussionClosed } from "react-icons/go";
import { MdEmojiEvents } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { BiUserPlus } from "react-icons/bi";

const SideBar = ({ isOpen, setIsopen }) => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/dashboard/whoami", {
          credentials: "include",
          headers: { "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const response = await res.json();
        const { id } = response;
        setUserId(id);
      } catch (error) {
        console.warn("Error fetching data:", error);
      }
    };

    fetchAuth();
  }, []);

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsopen(false)}>
      <Box p={2} width="250px" textAlign="center" role="presentation">
        <Typography variant="h6" component="div">
          <ul style={{ marginTop: 100 }}>
            <li style={{ margin: 30, position: "relative" }}>
              <Link
                style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                href="/"
              >
                <IoIosHome
                  style={{ position: "absolute", right: 10, top: 7 }}
                />{" "}
                صفحه اصلی{" "}
              </Link>
            </li>
            <li style={{ margin: 30, position: "relative" }}>
              <Link
                style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                href="/events"
              >
                {" "}
                رویدادها{" "}
                <MdOutlineEvent
                  style={{ position: "absolute", right: 10, top: 7 }}
                />
              </Link>
            </li>
            <li style={{ margin: 30, position: "relative" }}>
              <Link
                style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                href="/classes"
              >
                کلاس‌ها{" "}
                <MdOutlineClass
                  style={{ position: "absolute", right: 10, top: 7 }}
                />{" "}
              </Link>
            </li>
            <li style={{ margin: 30, position: "relative" }}>
              <Link
                style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                href="/blog"
              >
                بلاگ{" "}
                <GoDiscussionClosed
                  style={{ position: "absolute", right: 32, top: 7 }}
                />
              </Link>
            </li>
            <li style={{ margin: 30, position: "relative" }}>
              <Link
                style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                href="/success"
              >
                موفقیت دانشجویان{" "}
                <MdEmojiEvents
                  style={{
                    position: "absolute",
                    right: -18,
                    top: 7,
                    color: "gold",
                  }}
                />
              </Link>
            </li>
            <li style={{ margin: 30, position: "relative" }}>
              <Link
                style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                href="/employment"
              >
                {" "}
                همکاری با ما{" "}
                <BiUserPlus
                  style={{ position: "absolute", right: 5, top: 7 }}
                />{" "}
              </Link>
            </li>
            <li style={{ margin: 30, position: "relative" }}>
              <Link
                style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                href="/contact"
              >
                {" "}
                تماس با ما{" "}
                <IoCall style={{ position: "absolute", right: 10, top: 7 }} />
              </Link>
            </li>
            {userId ? (
              <li style={{ margin: 30 }}>
                <Link
                  style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                  to={"/dashboard"}
                >
                  داشبورد
                </Link>
              </li>
            ) : (
              <li style={{ margin: 30, position: "relative" }}>
                <Link
                  style={{ color: "#212121", fontFamily: "Yekan, sans-serif" }}
                  href={"/register"}
                >
                  <IoMdLogIn
                    style={{ position: "absolute", right: -5, top: 8 }}
                  />{" "}
                  ثبت نام و ورود
                </Link>
              </li>
            )}
          </ul>
        </Typography>
      </Box>
    </Drawer>
  );
};

export default SideBar;

"use client";
import React, { useState } from "react";
import { MdOutlineStackedBarChart } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdPhoneMissed } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminCategories } from "../../Categories";
import Image from "next/image";

function UserCard({ user }) {
  const navigate = useRouter();
  const editHandler = () => {
    navigate.push(`/dashboard/admin/users/${user._id}`);
  };

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  return (
    <div className="CardBox" dir="rtl">
      <TableContainer component={Paper} dir="rtl">
        <Table aria-label="user details table">
          <TableBody>
            <TableRow>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "right",
                    fontFamily: "Yekan, sans-serif",
                  }}
                >
                  <div className="imgContainer">
                    {(user.role === "TEACHER" || user.role === "ADMIN") &&
                    user.profile ? (
                      <Image
                        height={100}
                        width={100}
                        src={`/${user.profile}`}
                        alt={"profile"}
                      />
                    ) : (
                      <Image
                        src="/assets/userPlaceholder/placeholder.jpg"
                        alt={user.id}
                        height={75}
                        width={75}
                      />
                    )}
                    <div className="cardInfo">
                      <h2>
                        {user.name} {user.lastName}
                      </h2>
                      <div
                        className="moreCardDetail"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <MdOutlineStackedBarChart className="classIcon" />
                          سطح کاربری{" "}
                          {user.role === "TEACHER"
                            ? "دبیر"
                            : user.role === "ADMIN"
                            ? "ادمین"
                            : "معمولی"}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Link href={`mailto:${user.email}`}>
                            {" "}
                            <MdOutlineAlternateEmail className="classIcon" />
                            ایمیل {user.email}
                          </Link>
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <MdPhoneMissed className="classIcon" />
                          َشماره تماس{" "}
                          <Link href={`tel:${user.phoneNumber}`}>
                            {" "}
                            {user.phoneNumber}{" "}
                          </Link>
                        </span>
                      </div>
                      <p>
                        تاریخ آخرین ورود: <span>{user.lastDateIn}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="login_Btn_No_Hid_2"
                      style={{
                        marginLeft: "1rem",
                        cursor: "pointer",
                        height: "fit-content",
                        backgroundColor: "#4CA773",
                        fontSize: "1.2rem",
                        padding: "0.8rem 2rem",
                        color: "#FFf",
                        fontFamily: "Yekan, sans-serif",
                      }}
                      onClick={editHandler}
                      fontFamily={"Yekan, sans-serif"}
                    >
                      ویرایش
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="MobileDrawerDash">
        <button onClick={mobileSetting} className="drawerButton">
          {" "}
          <IoPerson style={{ width: 20, height: 20 }} />
        </button>
      </div>

      <Drawer anchor="left" open={setting} onClose={() => setSetting(false)}>
        <Box>
          <ul className="dashboardList">
            {adminCategories.map((item) => (
              <li key={item.title}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </Box>
      </Drawer>

      {/* Responsive */}
    </div>
  );
}

export default UserCard;

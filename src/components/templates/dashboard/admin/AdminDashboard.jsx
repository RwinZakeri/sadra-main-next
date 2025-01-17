import axios from "axios";
import React, { useEffect, useState } from "react";
import SignOutButton from "../SignOutButton";
import { Divider } from "@mui/material";
import DashboardCard from "../DashboardCard";

import { IoPerson } from "react-icons/io5";

import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

//icons
import { SiGoogleclassroom } from "react-icons/si";
import { FaMicroblog, FaUserCheck } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaRegSmileBeam } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { BiBookmarkAlt } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { adminCategories } from "../Categories";
import Link from "next/link";

const AdminDashboard = ({ userId, userEmail, userRole }) => {
  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  return (
    <>
      {userRole === "ADMIN" ? (
        <div dir="rtl" className="panelContainer">
          <div className="userPanel" dir="rtl">
            <div className="sideBarPanel">
              <div>
                {adminCategories.map((item) => (
                  <Link key={item.title} href={item.link}>
                    {item.title}
                  </Link>
                ))}
              </div>
              <div>
                <SignOutButton />
              </div>
            </div>
            <div className="mainPanel">
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "space-around",
                }}
              >
                <DashboardCard
                  icon={<FaMicroblog size={40} />}
                  title={"بلاگ ها"}
                  link={"/dashboard/admin/blog"}
                />
                <DashboardCard
                  icon={<MdEvent size={40} />}
                  title={"رویداد ها"}
                  link={"/dashboard/admin/events"}
                />
                <DashboardCard
                  icon={<SiGoogleclassroom size={40} />}
                  title={"کلاس ها"}
                  link={"/dashboard/admin/classes"}
                />
                <DashboardCard
                  icon={<FaUsers size={40} />}
                  title={"کاربر ها"}
                  link={"/dashboard/admin/users"}
                />
                <DashboardCard
                  icon={<AiFillDatabase size={40} />}
                  title={"موقعیت های شغلی"}
                  link={"/dashboard/admin/employment"}
                />
                <DashboardCard
                  icon={<FaRegSmileBeam size={40} />}
                  title={"موفقیت دانشجویان"}
                  link={"/dashboard/admin/success"}
                />
                <DashboardCard
                  icon={<BiBookmarkAlt size={40} />}
                  title={"روزمه ها"}
                  link={"/dashboard/admin/resume"}
                />
                <DashboardCard
                  icon={<FaCommentAlt size={40} />}
                  title={"نظرات"}
                  link={"/dashboard/admin/contact"}
                />
                {/* <DashboardCard
                  icon={<FaUserCheck size={40} />}
                  title={"تیم استخدام"}
                  link={"/dashboard/admin/jobTeam"}
                /> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>یک بار از حساب کاربری خود خارج شوید و دوباره وارد شوید.</h3>
      )}
      {/* Responsive */}

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
    </>
  );
};

export default AdminDashboard;

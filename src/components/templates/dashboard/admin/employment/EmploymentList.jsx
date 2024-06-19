"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SignOutButton from "../../SignOutButton";
import NewEmployment from "./NewEmployment";
import { Divider } from "@mui/material";

import { IoPerson } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import Loading from "../../../../helper/Loading";
import { adminCategories, categories } from "../../Categories";
import Link from "next/link";
import EmploymentDetailCard from "@/components/module/employment_module/EmploymentDetailCard";

function EmploymentList() {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard/whoami", {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        const { role, _id } = response.data;
        setUserRole(role);
        setUserId(_id);

        return axios.get("http://localhost:3001/api/employment/data", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        });
      })
      .then((response4) => {
        setData(response4.data.data);
      })
      .catch((firstError) => {
        console.error(
          "Error:",
          firstError.response ? firstError.response.data : firstError.message
        );
        setUserRole("error");
      });
  }, []);

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
                {userRole === "TEACHER" ? (
                  categories.map((item) => (
                    <Link key={item.title} href={item.link}>
                      {item.title}
                    </Link>
                  ))
                ) : userRole === "ADMIN" ? (
                  adminCategories.map((item) => (
                    <Link key={item.title} href={item.link}>
                      {item.title}
                    </Link>
                  ))
                ) : (
                  <h3>ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.</h3>
                )}
              </div>
              <div>
                <SignOutButton />
              </div>
            </div>
            <div className="mainPanel">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "1rem",
                }}
              >
                {!data ? (
                  <Loading />
                ) : (
                  data?.map((emp, index) => (
                    <EmploymentDetailCard
                      key={index}
                      job={emp.jobTitle}
                      time={emp.jobTime}
                      place={emp.jobPlace}
                      category={emp.jobCategory}
                      id={emp._id}
                      isAdmin={true}
                      isShown={emp.isShown}
                    />
                  ))
                )}
              </div>
              <Divider />
              <div style={{ marginTop: "1rem" }}>
                <h3>برای ثبت فرصت کاری جدید این فرم را پر کنید.</h3>
                <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                  <NewEmployment />
                </div>
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
}

export default EmploymentList;

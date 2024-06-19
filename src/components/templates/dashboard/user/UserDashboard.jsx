import axios from "axios";
import React, { useEffect, useState } from "react";
import SignOutButton from "../SignOutButton";
import { Box, Divider } from "@mui/material";
import { IoMdInformationCircle } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import DashboardCard from "../DashboardCard";
import Loading from "../../../helper/Loading";
import Link from "next/link";
import { userCategories } from "../Categories";

function UserDashboard() {
  const [loading, setLoading] = useState(true);

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard/whoami", {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        const { role } = response.data;
        setLoading(false);
        setUserRole(role);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
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
      {loading ? (
        <Loading />
      ) : userRole === "USER" ? (
        <div className="userPanel">
          <div className="sideBarPanel">
            <div>
              {userCategories.map((item) => (
                <li key={item.title}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </div>

            <div>
              <SignOutButton />
            </div>
          </div>

          {/* Responsive */}

          <div className="MobileDrawerDash">
            <button onClick={mobileSetting} className="drawerButton">
              {" "}
              <IoPerson style={{ width: 20, height: 20 }} />
            </button>
          </div>

          <Drawer
            anchor="left"
            open={setting}
            onClose={() => setSetting(false)}
          >
            <Box>
              <ul className="dashboardList">
                {userCategories.map((item) => (
                  <li key={item.title}>
                    <Link to={item.link}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
          </Drawer>

          {/* Responsive */}

          <div className="mainPanel">
            <div className="cards-container">
              <DashboardCard
                icon={<IoMdInformationCircle size={40} />}
                title={"تکمیل اطلاعات"}
                link={"/dashboard/user"}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1>ابتدا از حساب کاربری خود خارج شوید و دوباره لاگین کنید</h1>
      )}
    </>
  );
}

export default UserDashboard;

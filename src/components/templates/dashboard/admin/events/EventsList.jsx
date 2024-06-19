"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SignOutButton from "../../SignOutButton";
import { Box, Divider, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import NewEvent from "./NewEvent";

import Drawer from "@mui/material/Drawer";
import { IoPerson } from "react-icons/io5";
import Loading from "../../../../helper/Loading";
import { adminCategories, categories } from "../../Categories";
import Link from "next/link";
import EventCard from "@/components/module/event_module/EventCard";

function EventsList() {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teacherBlog, setTeacherBlog] = useState("");

  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [value, setValue] = React.useState("1");
  const [TabHeaders, setTabHeaders] = useState([
    {
      id: 1,
      title: "رویدادها",
    },
    {
      id: 2,
      title: "دوره ها",
    },
    {
      id: 3,
      title: "مدرس‌ها",
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data2, setData2] = useState([]);
  useEffect(() => {
    setValue(1);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events/data", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        });
        const jsonData = await response.json();
        setLoading(false);
        setData2(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard/whoami", {
        withCredentials: true,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
        },
      })
      .then((response) => {
        const { role, id } = response.data;
        setUserRole(role);
        setUserId(id);
        // if (id) {
        //     axios.get(`https://sadra-edu.com/api/dashboard/blogs/${id}`)
        //         .then(secondResponse => {
        //         setTeacherBlog(secondResponse.data[0])
        //         })
        //         .catch(secondError => {
        //         console.error('Second Request Error:', secondError.response ? secondError.response.data : secondError.message);
        //     });
        // }
      })
      .catch((firstError) => {
        console.error(
          "First Request Error:",
          firstError.response ? firstError.response.data : firstError.message
        );
        setUserRole("error");
      });

    // const fetchData = async () => {
    //     try {
    //         const responseToken = await axios.get('https://sadra-edu.com/api/blog/data');
    //         setData(responseToken.data);
    //         const responseToken2 = await axios.get('https://sadra-edu.com/api/TeacherUsers/data');
    //         setUsers(await responseToken2.data[0]);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : userRole === "TEACHER" || userRole === "ADMIN" ? (
        <div className="panelContainer">
          {userRole === "TEACHER" || userRole === "ADMIN" ? (
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
                    <h3>
                      ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.
                    </h3>
                  )}
                </div>
                <br />
                <br />
                <br />
                <div>
                  <SignOutButton />
                </div>
              </div>
              <div className="mainPanel">
                {/* <Box
                  sx={{ width: "100%", typography: "body1", direction: "rtl" }}
                >
                  <TabContext value={value}>
                    {TabHeaders.map((Tab) => (
                      <TabPanel value={Tab.id} key={Tab.id}>
                        <div className="event_card_info">
                          {!data2 ? (
                            <Loading />
                          ) : (
                            data2?.filter((item) => item.category === Tab.title)
                              .map((item) => (
                                <Link key={item.id} href={`/events/${item.id}`}>
                                  <EventCard key={item.id} {...item} />
                                </Link>
                              ))
                          )}
                        </div>
                      </TabPanel>
                    ))}
                  </TabContext>
                </Box> */}

                <Divider />
                <div style={{ marginTop: "2rem" }}>
                  <h3>برای ثبت رویداد جدید از فرم زیر استفاده کنید:</h3>
                  <br />
                  <NewEvent />
                </div>
              </div>
            </div>
          ) : (
            <h2>ابتدا از حساب کاربری خود خارج شده و دوباره وارد شوید.</h2>
          )}
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
            {categories.map((item) => (
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

export default EventsList;

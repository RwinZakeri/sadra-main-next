"use client";
import React, { useState } from "react";
import Link from "next/link";
// Mui
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import moment from "jalali-moment";
import { ToastContainer } from "react-toastify";
// Component
import EmploymentDetailCard from "./EmploymentDetailCard";

function EmploymentData({ data }) {
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabHeader = [
    {
      id: 1,
      TabTitle: "همه",
    },
    {
      id: 2,
      TabTitle: "محصول",
    },
    {
      id: 3,
      TabTitle: "آموزش",
    },
    {
      id: 4,
      TabTitle: "مارکتینگ",
    },
    {
      id: 5,
      TabTitle: "منابع انسانی",
    },
    {
      id: 6,
      TabTitle: "مالی",
    },
  ];

  return (
    <div className="Tabs_job_chances">
      <Box
        fontFamily="Yekan , sans-serif"
        sx={{ width: "100%", typography: "body1" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              fontFamily="Yekan , sans-serif"
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              TabIndicatorProps={{ style: { backgroundColor: "#4CA773" } }}
            >
              {tabHeader.map((item) => (
                <Tab
                  key={item.id}
                  sx={{ fontFamily: "Yekan , sans-serif" }}
                  label={item.TabTitle}
                  value={item.id}
                />
              ))}
            </TabList>
          </Box>
          {tabHeader.map((Tab) => (
            <TabPanel key={Tab.id} value={Tab.id}>
              <div className="JonsCardsContainer">
                {Tab.TabTitle === "همه"
                  ? data
                      .filter((item) => item.isShown)
                      .map((item) => (
                        <Link
                          className="navigateLinkStyle"
                          key={item.id}
                          href={`/employment/${item._id}`}
                        >
                          <EmploymentDetailCard
                            key={item.id}
                            job={item.jobTitle}
                            place={item.jobPlace}
                            category={item.jobCategory}
                            time={item.jobTime}
                            id={item.id}
                          />
                        </Link>
                      ))
                  : data
                      .filter(
                        (item) =>
                          item.jobCategory === Tab.TabTitle && item.isShown
                      )
                      .map((filteredItem) => (
                        <Link
                          className="navigateLinkStyle"
                          key={filteredItem.id}
                          href={`/employment/${filteredItem.id}`}
                        >
                          <EmploymentDetailCard
                            key={filteredItem.id}
                            job={filteredItem.jobTitle}
                            place={filteredItem.jobPlace}
                            category={filteredItem.jobCategory}
                            time={filteredItem.jobTime}
                            id={filteredItem.id}
                          />
                        </Link>
                      ))}
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </div>
  );
}

export default EmploymentData;

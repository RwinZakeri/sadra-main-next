import React, { useEffect, useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button } from "@mui/material";
// Component
import CardPopular from "../home_module/CardPopular";

const PopCourceTab = ({ popularEvents }) => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabHeaders = [
    {
      id: 1,
      title: "شبکه",
    },
    {
      id: 2,
      title: "برنامه نویسی",
    },
  ];
  return (
    <>
      <Box
        sx={{
          minHeight: "602px",
          width: "100%",
          typography: "body1",
          direction: "rtl",
          mt: "6rem",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              TabIndicatorProps={{ style: { backgroundColor: "#4CA773" } }}
              onChange={handleChange}
            >
              {TabHeaders.map((item) => (
                <Tab
                  key={item.id}
                  sx={{ fontFamily: "Yekan,sans-serif" }}
                  label={item.title}
                  value={item.id.toString()}
                />
              ))}
            </TabList>
          </Box>
          {TabHeaders.map((Tab) => (
            <TabPanel key={Tab.id} value={Tab.id.toString()}>
              <div className="popCardEvent">
                {popularEvents
                  ?.filter((item) => item.category === Tab.title)
                  .slice(0, 3)
                  .map(
                    (item) =>
                      item.isShown && <CardPopular key={item.id} {...item} />
                  )}
                {/* {popularEvents.map((item) => <CardPopular key={item.id} {...item} />)} */}
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default PopCourceTab;

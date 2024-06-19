import React from "react";
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

// Component
import StudentCard from "../success_module/StudentCard";
import groupData from "./groupData";

function GroupComponent() {
  const jobTeam = groupData;
  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>اعضای تیم جذب و استخدام</h1>
      <div>
        <Grid container spacing={2}>
          {jobTeam.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={6} lg={3}>
              <StudentCard
                student={item}
                account={item.account}
                accountLink={item.accountLink}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div></div>
    </div>
  );
}

export default GroupComponent;

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
import Line from "../Line";
// Logo
import QuestionIcon from "../../../../public/assets/svg/QuestionIcon";
import Questions from "./questionsData";
function QuestionsCom() {
  return (
    <div className="Question_Container">
      <div className="ChanceIcon">
        <Line />
        <h2>سوال‌های پرتکرار</h2>
      </div>

      <div className="Com">
        {Questions.map((item) => (
          <Accordion key={item.id}>
            <AccordionSummary
              expandIcon={<QuestionIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography fontFamily={"Yekan , sans-serif"}>
                {item.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography fontFamily={"Yekan , sans-serif"}>
                {item.question}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default QuestionsCom;

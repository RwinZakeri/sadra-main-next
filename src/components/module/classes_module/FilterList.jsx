import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
// Components
import SearchBox from "../SearchBox.js";
// Icons
import { IoGameControllerOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { CiPen } from "react-icons/ci";
import { FiLayout } from "react-icons/fi";
import { LuGitFork } from "react-icons/lu";
import { FiPieChart } from "react-icons/fi";
import { SiAdobephotoshop } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { IoIosApps } from "react-icons/io";
import { FaNetworkWired } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { MdDeveloperMode } from "react-icons/md";
import { GrVirtualStorage } from "react-icons/gr";
import { GiNetworkBars } from "react-icons/gi";
import { IoShareSocial } from "react-icons/io5";
import { TbSocial } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineSocialDistance } from "react-icons/md";
// Mui
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

function FilterList() {
  const classBodyRef = useRef(null);

  const ListSearcher = async (e) => {
    // const searchedValue = e.target.innerText;
  };
  const popularEvent = [
    {
      id: 1,
      title: "UI Design",
    },
    {
      id: 2,
      title: "UX Design",
    },
    {
      id: 3,
      title: "Front-end",
    },
  ];
  const categories = [
    {
      id: 1,
      categorie: "زبان",
      iconName: IoLanguage,
    },
    {
      id: 2,
      categorie: "فناوری اطلاعات",
      iconName: FaDatabase,
    },
    {
      id: 3,
      categorie: "رسانه",
      iconName: FaNetworkWired,
    },
  ];

  return (
    <>
      <div className="searchBoxContainer">
        <SearchBox />
        <span id="popStyle">
          {" "}
          {popularEvent &&
            popularEvent.map((item, index) => (
              <span
                style={{ color: "white" }}
                key={index}
              >{`${item.title} , `}</span>
            ))}{" "}
          <span style={{ color: "white" }}>: محبوب‌ها</span>
        </span>
      </div>

      <div className="Categories">
        <h2>دپارتمان ها</h2>
        <div className="BoxContainer">
          <Accordion
            sx={{ width: 300, paddingTop: 0, backgroundColor: "#2e2e2e" }}
          >
            <AccordionSummary
              expandIcon={<IoLanguage style={{ color: "white", width: 40 }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                fontSize: 19,
                height: 70,
                borderRadius: 2,
                backgroundColor: "#2e2e2e",
                paddingLeft: 10,
                paddingRight: 10,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {categories[0].categorie}
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#2e2e2e", color: "white" }}
            >
              <div className="BoxItems">
                <ul className="unorderList" onClick={ListSearcher}>
                  <li>
                    <Link href={"/classes?category=انگلیسی"}>
                      انگلیسی <span className="fi fi-gb"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/classes?category=عربی"}>
                      عربی <span className="fi fi-ae"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/classes?category=ترکی"}>
                      ترکی <span className="fi fi-tr"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/classes?category=روسی"}>
                      روسی <span className="fi fi-ru"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/classes?category=فرانسه"}>
                      فرانسه <span className="fi fi-fr"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/classes?category=اسپانیا"}>
                      اسپانیا <span className="fi fi-es"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/classes?category=المانی"}>
                      المانی<span className="fi fi-de"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/classes?category=فارسی"}>
                      فارسی<span className="fi fi-ir"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/classes?category=string"}>
                      string<span className="fi fi-ir"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{ width: 300, paddingTop: 0, backgroundColor: "#2e2e2e" }}
          >
            <AccordionSummary
              expandIcon={<FaDatabase style={{ color: "white", width: 30 }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                fontSize: 19,
                height: 70,
                borderRadius: 2,
                backgroundColor: "#2e2e2e",
                paddingLeft: 5,
                paddingRight: 5,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {categories[1].categorie}
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#2e2e2e", color: "white" }}
            >
              <div className="BoxItems">
                <ul className="unorderList" onClick={ListSearcher}>
                  <Link href={"/classes?category=شبکه"}>
                    <li>
                      شبکه <FaNetworkWired />
                    </li>
                  </Link>
                  <Link href={"/classes?category=امنیت"}>
                    <li>
                      امنیت <MdOutlineSecurity />
                    </li>
                  </Link>
                  <Link href={"/classes?category=برنامه نویسی "}>
                    <li>
                      برنامه نویسی <MdDeveloperMode />
                    </li>
                  </Link>
                  <Link href={"/classes?category=مجازی سازی"}>
                    <li>
                      مجازی سازی <GrVirtualStorage />
                    </li>
                  </Link>
                  {/* <li>زیرساخت <GiNetworkBars/></li> */}
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{ width: 300, paddingTop: 0, backgroundColor: "#2e2e2e" }}
          >
            <AccordionSummary
              expandIcon={
                <IoShareSocial style={{ color: "white", width: 30 }} />
              }
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                fontSize: 19,
                height: 70,
                borderRadius: 2,
                backgroundColor: "#2e2e2e",
                paddingLeft: 5,
                paddingRight: 5,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {categories[2].categorie}
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#2e2e2e", color: "white" }}
            >
              <div className="BoxItems">
                <ul className="unorderList" onClick={ListSearcher}>
                  <Link href={`/classes?category=طراحی و تدوین`}>
                    <li>
                      طراحی و تدوین <SiAdobephotoshop />
                    </li>
                  </Link>
                  <Link href={`/classes?category=سواد رسانه`}>
                    <li>
                      سواد رسانه <TbSocial />
                    </li>
                  </Link>
                  <Link href={`/classes?category=تولید محتوا`}>
                    <li>
                      تولید محتوا <MdContentCopy />
                    </li>
                  </Link>
                  <Link href={`/classes?category=نویسندگی`}>
                    <li>
                      نویسندگی <IoIosCreate />
                    </li>
                  </Link>
                  <Link href={`/classes?category=شبکه اجتماعی`}>
                    <li>
                      شبکه اجتماعی <MdOutlineSocialDistance />
                    </li>
                  </Link>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default FilterList;

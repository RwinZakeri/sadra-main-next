"use client";
import { useRouter } from "next/navigation";
// Material ui Components
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
// Icons
import { FaStar, FaCalendarAlt, FaLevelUpAlt } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { GoStack } from "react-icons/go";
import { MdOutlineStackedBarChart } from "react-icons/md";
import { red } from "@mui/material/colors";

// custome Hooks

const CardPopular = ({
  image,
  id,
  teacherFirstName,
  teacherLastName,
  rate,
  price,
  time,
  level,
  lessons,
  title,
  discount,
  category,
}) => {
  const newImage = image?.split("/").splice(1).splice(1).join("/");
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/classes/${id}`);
  };
  return (
    <Card sx={{ minWidth:"300px" }} onClick={clickHandler}>
      <CardMedia
        sx={{ maxHeight: 170 }}
        component="img"
        height="170"
        image={`/${newImage}`}
        alt={title}
      />
      <CardContent>
        <Typography
          fontFamily={"Yekan,sans-serif"}
          gutterBottom
          variant="h5"
          component="div"
        >
          <span>{title}</span>
        </Typography>
        <div
          fontFamily={"Yekan,sans-serif"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 112,
          }}
        >
          <Typography
            fontFamily={"Yekan,sans-serif"}
            gutterBottom
            variant="h5"
            component="div"
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {category === "برنامه نویسی" &&
              (teacherFirstName?.trim().length !== 0 ||
                teacherLastName?.trim().length !== 0) ? (
                <p>
                  استاد {teacherFirstName} {teacherLastName}
                </p>
              ) : null}
            </span>
          </Typography>

          <Typography
            fontFamily={"Yekan,sans-serif"}
            variant="h6"
            component="div"
          >
            <div></div>
          </Typography>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <IconButton aria-label="time">
          <CiClock2 />{" "}
          <Typography fontFamily={"Yekan,sans-serif"} sx={{ fontSize: 14 }}>
            {" "}
            {time} ساعت
          </Typography>
        </IconButton>
        <IconButton aria-label="lessons">
          <GoStack style={{ padding: 1 }} />{" "}
          <Typography fontFamily={"Yekan,sans-serif"} sx={{ fontSize: 14 }}>
            {" "}
            <span>درس</span> {lessons}
          </Typography>
        </IconButton>
        <IconButton aria-label="level">
          <MdOutlineStackedBarChart />{" "}
          <Typography fontFamily={"Yekan,sans-serif"} sx={{ fontSize: 14 }}>
            {" "}
            <span>سطح</span> {level}
          </Typography>
        </IconButton>
      </CardActions>
      <div></div>
    </Card>
  );
};

export default CardPopular;

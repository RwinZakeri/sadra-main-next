// Styles
// mui components
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
  Divider,
} from "@mui/material";
// Icons
import { BiCalendar, BiTime } from "react-icons/bi";
// custome hook

const EventCard = ({
  image,
  title,
  price,
  teacherFirstName,
  teacherLastName,
  date,
  time,
  discount,
  author,
}) => {
  // const newImage = image?.split('/').splice(1).splice(1).join('/');
  // const splitedTime = time.split("");

  return (
    <div className="CardEvent">
      <Card sx={{ width: "100%", borderRadius: 3 }}>
        <CardMedia
          component="img"
          maxheight={60}
          image={image}
          alt={title}
          sx={{ aspectRatio: "2/1 !important" }}
        />
        <div className="MainDetial" style={{ height: 200 }}>
          <CardContent>
            <Typography
              fontFamily={"Yekan, sans-serif"}
              sx={{
                minWidth: 240,
                maxWidth: 240,
                minHeight: 90,
                maxheight: 90,
                fontSize: 19,
              }}
              gutterBottom
              variant="h6"
            >
              <span
                id="eventCardTitle"
                style={{ fontSize: 20, fontWeight: 500 }}
              >
                {`${title.split(" ")[0]} ${
                  title.split(" ")[1] ? title.split(" ")[1] : ""
                }`}
              </span>
            </Typography>
            <div className="CardEventDetail">
              <Typography
                fontFamily={"Yekan, sans-serif"}
                sx={{ fontSize: 17, fontWeight: 700 }}
                variant="h6"
                color="text.secondary"
              >
                <p>
                  {author ? (
                    <p>استاد {author.username}</p>
                  ) : (
                    "استادی تغریف نشده"
                  )}
                </p>
              </Typography>

              {/* <Typography fontFamily={'Yekan, sans-serif'} variant="h6" sx={{paddingLeft : 2}} color="text.secondary">
          <span style={{display : "flex"}}>
            {
              Number(discount) ? (
              <div>
                <span id="price">{price * (100 - Number(discount)) / 100 ? (
              <div style={{display : "flex" , flexDirection : "column" , position : "relative" , alignItems : "center" , justifyContent : "center"}}>
                <span>{(price * (100 - Number(discount)) / 100)}</span><span style={{fontSize : 12}} >هزارتومان</span>
                <span style={{ opacity : 0.5 , fontSize : 16 ,position : "absolute" ,top : -38 , textDecoration : "line-through" , display : "flex" , flexDirection : "column" , alignItems : "center" , justifyContent : "center"}} > {(price)}<span style={{position : "absolute" , top : 13}} >هزارتومان</span> </span>
                <span style={{position : "absolute" , top : -260 ,left : -20 , color : "white" , backgroundColor : "#F04438" , fontSize : 17 , padding : 5 , borderRadius : 1000}} >{(discount)}%</span>
              </div>
              ) : (
                  <div style={{position : "relative"}}>
                  <span style={{ opacity : 0.5 ,position : "absolute" , top : -38 , right : 15 , fontSize : 17 , textDecoration : "line-through"}} >{(price)} <span style={{position : "absolute" , right : -10, top : 14}} >هزارتومان</span></span>
                  <span style={{fontWeight : 700}} >رایگان</span>
                  <span style={{position : "absolute" , top : -268 ,left : -30, color : "white" , backgroundColor : "#F04438" , fontSize : 17 , padding : 5 , borderRadius : 1000}} >{(discount)}%</span>
                  </div>
                  )}</span>
              </div>
              ) : (
                <span id="price"> {(price)} <span id="rial">هزارتومان</span></span>
              )
            }
        </span>
          </Typography> */}
            </div>
          </CardContent>
        </div>
        <Divider />
        <div
          className="bottom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardActions disableSpacing>
            <IconButton aria-label="date">
              <BiCalendar />
            </IconButton>
            <Typography
              fontFamily={"Yekan, sans-serif"}
              sx={{ fontSize: 15 }}
              variant="h1"
              color="text.secondary"
            >
              <p style={{ fontSize: 15 }}>
                {date ? date.split("/").join("/") : <p>تاریخی تنظیم نشده</p>}
              </p>
            </Typography>

            <IconButton aria-label="time">
              <BiTime />
            </IconButton>
            {/* <Typography
              fontFamily={"Yekan, sans-serif"}
              sx={{ fontSize: 15 }}
              variant="h1"
              color="text.secondary"
            >
              {splitedTime[0] ? splitedTime[0] : "0"}
              {splitedTime[1] ? splitedTime[1] : "0"}:
              {splitedTime[2] ? splitedTime[2] : "0"}
              {splitedTime[3] ? splitedTime[3] : "0"}
            </Typography> */}
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default EventCard;

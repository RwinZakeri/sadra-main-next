import Link from "next/link";
import Image from "next/image";
// styles
// Components
// Icons
import { FaChevronLeft } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";

// Async fetchdata
export async function fetchData(id) {
  const res = await fetch(`http://localhost:3001/api/events/data/${id}`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
    },
  });
  const json = await res.json();
  if (!json) {
    throw Error("error while fetching events");
  }
  return json;
}

const EventDetail = ({ data }) => {
  // Data
  const {
    title,
    author,
    category,
    lessons,
    time,
    price,
    image,
    discount,
    Detail_Head_Title,
    detailSubtitle,
    date,
    place,
    quantity,
    language,
    whatWeLearnQ1,
    whatWeLearnA1,
    whatWeLearnQ2,
    whatWeLearnA2,
    whatWeLearnQ3,
    whatWeLearnA3,
    whatWeLearnQ4,
    whatWeLearnA4,
    status,
  } = data;
  return (
    <>
      <div className="Details" dir="rtl">
        <div className="HeadDetail">
          <div>
            <Link href={"/events"}>
              <p style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 18, color: "#98A2B3" }}>
                  {category}
                </span>{" "}
                &nbsp; <FaChevronLeft color="#FFF" /> &nbsp;{" "}
                <span style={{ fontSize: 18, color: "#FFF" }}>{title}</span>
              </p>
            </Link>
          </div>
          <div className="HeadDetailData">
            <h1 style={{ color: "#F9F9F9", fontSize: 18 }}>{title}</h1>
            <p style={{ color: "#E0E0E0", fontSize: 22 }}>
              {Detail_Head_Title}
            </p>
          </div>
        </div>
      </div>
      <div className="bodyDetailContainer" dir="rtl">
        <div className="infoContainer">
          <h2 style={{ fontSize: 34, marginBottom: 24 }}>
            چه چیزی یاد می‌گیریم؟
          </h2>
          <div className="info1">
            <h3>{whatWeLearnQ1}</h3>
            <p>{whatWeLearnA1}</p>
          </div>
          <div className="info2">
            <h3>{whatWeLearnQ2}</h3>
            <p>{whatWeLearnA2}</p>
          </div>
          <div className="info3">
            <h3>{whatWeLearnQ3}</h3>
            <p>{whatWeLearnA3}</p>
          </div>
          <div className="info4">
            <h3>{whatWeLearnQ4}</h3>
            <p>{whatWeLearnA4}</p>
          </div>
        </div>
        <div className="CardContainer">
          <div className="CardDetail">
            <Image width={400} height={400} src={image} alt={title} />
            <div className="topCard">
              <div></div>
            </div>
            <div className="cadTitle">
              <h3>توضیحات رویداد</h3>
              <h1>{detailSubtitle}</h1>
            </div>
            <div className="CardFooter">
              <h2>جزئیات رویداد</h2>
              <div className="time">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <CiCalendarDate
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 5,
                      marginBottom: 4,
                    }}
                  />
                  {date ? date : "تاریخی تعریف نشده"}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <FaRegClock
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 5,
                      marginBottom: 4,
                    }}
                  />
                  {time.split("")[0] ? time.split("")[0] : "0"}
                  {time.split("")[1] ? time.split("")[1] : "0"}:
                  {time.split("")[2] ? time.split("")[2] : "0"}
                  {time.split("")[3] ? time.split("")[3] : "0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;

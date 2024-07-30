import Image from "next/image";
import Link from "next/link";
// Components
import SearchBox from "../module/SearchBox";
import Line from "../module/Line";
import VideoPlayer from "../module/VideoPlayer";
import CommentCard from "../module/home_module/CommentCard";
import CardPopular from "../module/home_module/CardPopular";
import EventCard from "../module/event_module/EventCard";
import Loading from "../helper/Loading";
// MUI
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button } from "@mui/material";
// Icons
import { TiMessages } from "react-icons/ti";
import { CiCalendar } from "react-icons/ci";
// Imported Pic
import imageAbout from "../../../public/assets/image_about_us.png";

// my component
// import SuccessStory from "../module/(home_module)/successStory.jsx"
import SuccessStory from "../module/(home_module)/successStory.js";
import PopCource from "../module/(home_module)/popCource.jsx";
import CommentsComponent from "../module/(home_module)/comments.jsx";

const Home = ({ data }) => {
  return (
    <>
      <div className="Home">
        <div className="BoxData">
          <h1>مؤسسه صدرا</h1>
          <h2>استعدادیابی مهارت افزایی و معرفی به بازار کار</h2>
          <p>
            با شرکت در دوره‌های آموزشی صدرا، از صفر شروع کن و در مسیر یادگیری با
            بهترین متد‌های آموزشی ما همراه شو، تا ما پلی باشیم برای ورود تضمینی
            به بازار کار
          </p>
          <SearchBox firstWidth="80%" />
        </div>
        <div className="ImageBox"></div>
      </div>

      {/* Why US */}

      <div dir="rtl" className="why_Container" id="maxWidth">
        <div className="why_us">
          <div className="why_us_Icons" id="maxWidth">
            <Line />
            <h2>چرا ما</h2>
          </div>
          <h1>شرکت در دوره‌ها مساوی با ورود قطعی به بازار کار</h1>
          <p>
            صدرا، از متدهایی استفاده می‌کنه که مسیر یادگیری برای شما هموارتر
            می‌کنه و نیروی کاری تربیت می‌کنه که صدرا با افتخار به شرکت‌های موفق
            معرفی می‌کنه و اشتغال به کار شما رو، بعد از دوره تضمین می‌کنه.
          </p>
          <div className="Box_Container">
            <div className="data_Box1">
              <h1 style={{ color: "#fff" }}>پشتیبانی بعد از اتمام دوره</h1>
              <p style={{ color: "#fff" }}>
                اگر در طول دوره‌ یا بعد از اتمام آن مشکل دارید، امکان گفت و گو و
                رفع مشکل برای شما وجود دارد.
              </p>
              <CiCalendar className="Icon" />
            </div>

            <div className="data_Box2">
              <h1 style={{ color: "#fff" }}>دوره‌های آفلاین</h1>
              <p style={{ color: "#fff" }}>
                اگر امکان شرکت در دوره‌های حضوری یا آنلاین را ندارید، امکان
                استفاده از ویدیوهای ضبط شده برای شما دوره‌ها وجود دارد.
              </p>
              <TiMessages className="Icon" />
            </div>
          </div>
        </div>
      </div>
      {/* part Three Media vidoe */}
      <div className="learn_container" dir="rtl" id="maxWidth">
        <div className="learn_icon">
          <Line />
          <h2>آموزش ما</h2>
        </div>

        <h1>استفاده از متدهای جدید آموزشی</h1>
        <p dir="rtl">
          صدرا، از استانداردها و چارچوب‌های سفارشی جدید آموزشی استفاده می‌کنه
          ترکیبی از ترکیبی از CSTA ،ISTE ،PBLو ADIF است که در حال حاضر در آمریکا
          و کانادا در حال اجراست و باعث سهولت در یادگیری دانشجویان و دانش‌آموزان
          شده و پیشرفت آن‌ها به وضوح، قابل رویت است.
        </p>
        <div className="Video_Container">
          <VideoPlayer
            video={"/assets/videoMain.mp4"}
            poster={"/assets/pics/logosadra.png"}
          />
        </div>
      </div>

      <div className="Contact_slider" id="maxWidth">
        <div className="success_container">
          <Line />
          <h2>داستان‌های موفقیت</h2>
        </div>

        <h1>بیش از 500 دانش‌آموخته از مسیر خود راضی بودند</h1>
        {/* ************ */}
        <SuccessStory />
        {/* ************ */}
      </div>
      {/* Part Five */}

      <div className="popular_Tutorial" id="maxWidth" dir="rtl">
        <div className="popIcons">
          <Line />
          <h2>دوره‌های محبوب</h2>
        </div>

        <div className="popTexts">
          <div className="dataCon1">
            <h2>بیش از 100 دوره‌ی فعال برای پیشرفت شما</h2>
          </div>

          <div className="dataCon2">
            <h2>
              ما طیف وسیعی از دسته‌ها را برای کمک به شما در انتخاب دوره‌هایی که
              متناسب با تخصص شما هستند ارائه می‌کنیم. بیش از 100 دوره شما را از
              پایه راهنمایی می کند.
            </h2>
          </div>
        </div>
        <PopCource data={data} />
      </div>
      <div dir="rtl" className="mobile_reverse" id="maxWidth">
        <div className="home_about_con">
          <div className="about_image_con">
            <div className="about_text">
              <div className="about_icons">
                <h1>درباره ما</h1>
                <Line />
              </div>
              <h1 dir="rtl">افزایش رشد فردی و تقویت استعداد شما</h1>
              <p dir="rtl">
                با بیش از یک دهه فعالیت زیرا همیشه می خواهیم خدمات آموزشی ارائه
                دهیم که در مدارس آموزش داده نمی شود.
              </p>
            </div>
            <div className="about_img_container">
              <Image width={500} height={500} src={imageAbout} alt="man" />
            </div>
          </div>
          <div className="about_data">
            <div>
              <h2>1100+</h2>
              <p>دانش‌آموز در حال استفاده از این سامانه</p>
            </div>
            <div>
              <h2>100+</h2>
              <p>دوره موجود در دسته‌بندی‌های مختلف</p>
            </div>
            <div>
              <h2>150+</h2>
              <p>مربی مجرب که به شما آموزش می‌دهند</p>
            </div>
          </div>
        </div>
      </div>

      <div className="Comments_container">
        <div className="Icons_comments">
          <h2>نظرات شما</h2>
          <Line />
        </div>

        <h1>نظرات همراهان قبلی صدرا</h1>

        <CommentsComponent />
      </div>
    </>
  );
};

export default Home;

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// styles
// Logos
import { Corporations1 } from "../../../public/assets/svg/Corporations";
import { Corporations2 } from "../../../public/assets/svg/Corporations";
import { Corporations3 } from "../../../public/assets/svg/Corporations";
import { Corporations4 } from "../../../public/assets/svg/Corporations";
import { Corporations5 } from "../../../public/assets/svg/Corporations";
import { Logo } from "../../../public/assets/svg/Logo";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
// images
import image1 from "../../../public/assets/logos/سازمان آموزش فنی و حرفه ای کشور سفید.png";
import image2 from "../../../public/assets/logos/شرکت فرآورده‌های لبنی میهن سفید.png";
import image3 from "../../../public/assets/logos/مکتب شریف سفید.png";
import image4 from "../../../public/assets/logos/مجتمع فنی تهران سفید.png";
import loadSadra from "../../../public/assets/pics/logosadra.png";

const Footer = () => {
  const router = useRouter();
  const linkHandler = () => {
    router.push("/auth/register");
  };
  return (
    <div className="Footer" dir="rtl">
      <div className="Footer_content">
        <h1 className="Footer_text_1">
          در دوره‌هایی که علاقه داری شرکت کن و رشد شغلی خودت رو ببین
        </h1>
        <p className="Footer_text_2">
          مربیان ما همه چیز را به راحتی به شما آموزش می دهند. امروز با ثبت نام
          در دوره های عالی با قیمت های مقرون به صرفه، مسیر شغلی خود را بهبود
          ببخشید.
        </p>

        {/* <div>
        <button className='start_Btn' style={{cursor:"pointer"}} onClick={linkHandler}>همین حالا شروع کن</button>
      </div> */}
      </div>

      <div className="corporations">
        <ul>
          <li>
            <Image
              src={image1}
              width={250}
              height={100}
              alt="aa"
              className="logoMainPage"
            />
          </li>
          <li>
            <Image
              src={image2}
              width={250}
              height={100}
              alt="aa"
              className="logoMainPage"
            />
          </li>
          <li>
            <Image
              src={image3}
              width={250}
              height={100}
              alt="aa"
              className="logoMainPage"
            />
          </li>
          <li>
            <Image
              src={image4}
              width={250}
              height={100}
              alt="aa"
              className="logoMainPage"
            />
          </li>
          {/* <li>
            <img src="../../../public/assets/logos/" alt="aa" className='logoMainPage' />
          </li> */}
        </ul>
      </div>

      <div className="detail_container">
        <div className="More_Detail">
          <div className="detail_right" dir="ltr">
            <div
              dir="rtl"
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  width: "100%",
                }}
              >
                <h1>صدرا</h1>
                <Image
                  width={500}
                  height={50}
                  alt="fuck"
                  className="logo"
                  src={loadSadra}
                />
              </div>
            </div>
            <p dir="rtl">
              صدرا یک پلتفرم یادگیری آنلاین ملی است که به هر کسی و در هر کجا
              دسترسی به دوره های آنلاین را ارائه می دهد.
            </p>
          </div>

          <div className="lists">
            <div className="Forums">
              <ul>
                <li>
                  <h2>انجمن‌ها</h2>
                </li>
                {/* <li><p>دانشنامه</p></li> */}
                <li>
                  <Link href={"/employment"}>
                    <p>سوالات پرتکرار</p>{" "}
                  </Link>{" "}
                </li>
              </ul>
            </div>
            <div className="companiese">
              <ul>
                <li>
                  <h2>شرکت</h2>
                </li>
                <li>
                  <p>شرایط و قوانین</p>
                </li>
                <li>
                  <p>سیاست حفظ حریم خصوصی</p>
                </li>
                <li>
                  <p>کوکی‌ها</p>
                </li>
              </ul>
            </div>

            <div className="pages">
              <ul>
                <li>
                  <h2>صفحات</h2>
                </li>
                <li>
                  <Link href={"/"}>
                    <p>صفحه نخست</p>{" "}
                  </Link>{" "}
                </li>
                <li>
                  <Link href={"/classes"}>
                    <p>دوره‌ها</p>{" "}
                  </Link>{" "}
                </li>
                <li>
                  <Link href={"/events"}>
                    <p>رویدادها</p>{" "}
                  </Link>{" "}
                </li>
                {/* <li><Link><p>اساتید</p> </Link> </li> */}
                <li>
                  <Link href={"/contact"}>
                    <p>درباره ما</p>{" "}
                  </Link>{" "}
                </li>
                <li>
                  <Link href={"/employment"}>
                    <p>آموزش در صدرا</p>{" "}
                  </Link>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='footer_end'>
        <div className='end_container'>

          <div className='socialmedia'>
            <CiFacebook className='icons' />
            <FaInstagram className='icons' />
            <FaTwitter className='icons' />
            <CiLinkedin className='icons' />
          </div>

          <p>Made with ❤️ by Rwin & Amiriar</p>
          
        </div>
      </div> */}
    </div>
  );
};

export default Footer;

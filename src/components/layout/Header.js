import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// images
import { Logo } from "../../../public/assets/svg/Logo";
import Logo2 from "../../../public/assets/svg/Logo2";
import loadSadra from "../../../public/assets/pics/logosadra.png";
import { RxHamburgerMenu } from "react-icons/rx";
import sadraLogo from "../../../public/assets/pics/sadraLogo.svg";
// Components
import SideBar from "./Drawer.js";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/dashboard/whoami", {
          credentials: "include",
          headers: { "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY },
        });

        if (!res.ok) {
          // Handle different HTTP status codes
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const response = await res.json();
        const { id } = response;
        setUserId(id);
      } catch (error) {
        console.error("Fetch error: ", error);
        // Handle the error silently without displaying anything to the user
      }
    };

    fetchAuth();
  }, []);

  const clickHandler = () => {
    router.push("/register");
  };
  const dashboardHandler = () => {
    router.push("/dashboard");
  };

  const [isOpen, setIsopen] = useState(false);

  return (
    <div className="NavBar" dir="rtl">
      <div className="List_Logo">
        <div className="logo_Container">
          <Link href={"/"}>
            <Image
              width={50}
              height={50}
              alt="logo"
              className="logo"
              src={loadSadra}
            />
          </Link>
          <Link href={"/"}>
            <Logo2 className="logo2" />
          </Link>
        </div>
        <div>
          <ul>
            <li>
              <Link className={pathname === "/" ? "active" : "link"} href={"/"}>
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/classes" ? "active" : "link"}
                href={"/classes"}
              >
                کلاس‌ها
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/events" ? "active" : "link"}
                href={"/events"}
              >
                رویدادها
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/blog" ? "active" : "link"}
                href={"/blog"}
              >
                بلاگ
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/employment" ? "active" : "link"}
                href={"/employment"}
              >
                همکاری با ما
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/success" ? "active" : "link"}
                href={"/success"}
              >
                موفقیت دانشجویان
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/contact" ? "active" : "link"}
                href={"/contact"}
              >
                تماس با ما
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="login_Btn_con">
        {userId ? (
          <button
            className="login_Btn"
            style={{ cursor: "pointer" }}
            onClick={() => dashboardHandler()}
          >
            داشبورد
          </button>
        ) : (
          <button
            className="login_Btn"
            style={{ cursor: "pointer" }}
            onClick={() => clickHandler()}
          >
            ثبت نام و ورود
          </button>
        )}
        <RxHamburgerMenu
          className="burgur"
          onClick={() => setIsopen((e) => !e)}
        />
      </div>

      <SideBar setIsopen={setIsopen} isOpen={isOpen} />
    </div>
  );
};

export default Header;

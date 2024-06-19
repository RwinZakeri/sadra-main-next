import "./globals.css";
import "./404.css";
import "../components/module/SearchBox.css";
import "../components/module/classes_module/ClassCard.css";
import "../components/templates/ClassesPage.css";
import "../components/module/event_module/EventCard.css";
import "../components/helper/Loading.css";
import "../components/module/VideoPlayer.css";
import "../components/module/home_module/CommentCard.css";
import "../components/templates/HomePage.css";
import Layout from "@/components/layout/Layout";
import "../components/layout/Footer.css";
import "../components/layout/Header.css";
import "../components/templates/ClassDetailPage.css";
import "../components/module/eventDetail_module/EventDetailTeacherCard.css";
import "../components/templates/EventPage.css";
import "../components/templates/EventDetailStyle.css";
import "../components/templates/./BlogPage.css";
import "../components/module/blog_module/BlogCard.css";
import "../components/templates/BlogDetails.css";
import "../components/templates/Employement.css";
import "../components/templates/EmploymentForm.css";
import "../components/module/AuthModules/toastify-rtl.css"; // Import your custom RTL CSS file
import "react-toastify/dist/ReactToastify.css";
import "../components/module/employment_module/EmploymentDetailCard.js";
import "../components/module/employment_module/EmploymentDetailCard.css";
import "../components/templates/StudentSuccessPage.css";
import "../components/templates/ContactUsPage.css";
import "../components/module/AuthModules/AuthStyles.css";
import "../components/templates/AuthRegister.js";
// import "./AuthLoginPage.css";
// import "./Dashboard.css";
import "../components/templates/dashboard/Dashboard.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

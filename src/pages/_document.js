import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html dir="rtl" lang="fa">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="description"
          content="شرکت صدرا (موسسه صدرا) با تمرکز بر استعداد یابی در حوزه برنامه نویسی، شبکه و کاریابی فعالیت می‌کند. هدف ما شناسایی و پرورش استعدادهای برتر، ایجاد فرصت‌های شغلی مناسب و ارتقاء سطح دانش و مهارت‌های افراد است. با تیمی متخصص و متعهد، به شما کمک می‌کنیم تا بهترین مسیر شغلی را پیدا کنید و به موفقیت‌های بیشتری دست یابید."
        />
        <meta
          name="keywords"
          content="موسسه صدرا, شرکت صدرا, استعداد یابی برنامه نویسی, استعداد یابی شبکه, کاریابی, فرصت‌های شغلی, پرورش استعدادها, آموزش برنامه نویسی, آموزش شبکه, استخدام برنامه نویس, استخدام شبکه, موقعیت‌های شغلی فناوری اطلاعات, IT کاریابی, توسعه مهارت‌های شغلی, صدرا تکنولوژی"
        />
        <title>موسسه صدرا</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import Link from "next/link";
const PageNotFound = () => {
  return (
    <div className="flex-container">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="fadeIn">صفحه مورد نظر یافت نشد </h3>
        <button>
          <Link href={"/"} name="button" style={{ fontFamily: "Yekan" }}>
            برگشت به صفحه اصلی
          </Link>
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;

import { useState } from "react";
import { useRouter } from "next/navigation";
// Styles
// import "./SearchBox.css";
// Icons
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { showToast } from "./AuthModules/Toastify";

const myRegEx = /[a-zA-Z\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u0698]+/;
function SearchBox({ firstWidth }) {
  // Router
  const router = useRouter();
  // States
  const [selectedOption, setSelectedOption] = useState(""); // Default selected option (English value)
  const [inputValue, setInputValue] = useState("");
  // Functions
  const clickHandler = () => {
    if (!selectedOption) {
      if (!inputValue || !myRegEx.test(inputValue)) {
        showToast("لطفا فیلتر را اعمال کنید", "error");
        return;
      }
    }
    if (selectedOption && inputValue) {
      if (!myRegEx.test(inputValue)) {
        showToast("لطفا فیلتر را اعمال کنید", "error");
        return;
      }
    }
    router.push(`/search?option=${selectedOption}&value=${inputValue}`);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="search_Container" style={{ width: firstWidth }} dir="ltr">
      <input
        className="search_input"
        placeholder="جستجو دوره‌ها، مربیان و رخدادها"
        type="text"
        onChange={handleInputChange}
        value={inputValue}
      />
      <div>
        <select
          className="select_options"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="">بدون فیلتر</option>
          <option value="classes">کلاس ها</option>
          <option value="events">رویداد ها</option>
          <option value="blog">بلاگ ها</option>
        </select>
      </div>

      <button className="search_Btn" onClick={clickHandler}>
        <FaSearch className="search-icon" />
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default SearchBox;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Styles
import "./SearchBox.css";
// Icons
import { FaSearch } from "react-icons/fa";

function SearchBox({ firstWidth }) {
  // Router
  const router = useRouter();
  // States
  const [selectedOption, setSelectedOption] = useState(""); // Default selected option (English value)
  const [inputValue, setInputValue] = useState("");
  // Functions
  const clickHandler = () => {
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
    </div>
  );
}

export default SearchBox;

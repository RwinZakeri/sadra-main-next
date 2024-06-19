import React from "react";
import { useRouter } from "next/navigation";
// Styles
// Components
import { Button } from "@mui/material";
import axios from "axios";
import { showToast } from "../AuthModules/Toastify";
import { ToastContainer } from "react-toastify";

const EmploymentDetailCard = ({ job, time, place, category, id, isAdmin }) => {
  const router = useRouter();
  const edithandler = () => {
    router.push(`/dashboard/admin/employment/${id}`);
  };

  const deleteHandler = async () => {
    if (confirm("آیا از حذف کردن این موقعیت شغلی اطمینان دارید؟؟!")) {
      await axios
        .post(`https://sadra-edu.com/api/employment/delete/${id}`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        })
        .then(() => {
          showToast("موقعیت شغلی با موفقیت حذف شد!", "success");
        });
    } else {
    }
  };

  return (
    <div className="JobsCard" style={{ cursor: "pointer" }}>
      <div className="topPart">
        <h2>{job}</h2>
        <span>{category}</span>
      </div>
      <div className="botton">
        <p>{time}</p>،&nbsp;<p>{place}</p>
      </div>
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d5745b",
              width: "fit-content",
              fontFamily: "Yekan, sans-serif",
            }}
            onClick={deleteHandler}
          >
            حذف
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3ea2d9",
              width: "fit-content",
              fontFamily: "Yekan, sans-serif",
            }}
            onClick={edithandler}
          >
            ویرایش
          </Button>
        </div>
      )}
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
};

export default EmploymentDetailCard;

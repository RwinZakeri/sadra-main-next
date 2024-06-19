import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const navigate = useRouter();

  const signOut = async () => {
    try {
      await axios
        .get("http://localhost:3001/api/auth/logout", {
          withCredentials: true,
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        })
        .then(() => navigate.push("/"));
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      style={{ cursor: "pointer" }}
      className="login_Btn_No_Hid_2"
      onClick={signOut}
    >
      خروج از حساب کاربری
    </button>
  );
};

export default SignOutButton;

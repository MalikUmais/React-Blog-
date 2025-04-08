import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { HiLogout } from "react-icons/hi";

function LogoutBtn({ fullWidth = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <button
      className={`
        flex items-center justify-center px-4 py-2 rounded-full
        bg-red-50 text-red-600 font-medium
        hover:bg-red-100 transition-colors
        ${fullWidth ? "w-full" : ""}
      `}
      onClick={logoutHandler}
    >
      <HiLogout className="mr-1.5" />
      Logout
    </button>
  );
}

export default LogoutBtn;

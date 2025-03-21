"use client";
import { Badge } from "@mui/material";
import { PiBellRingingFill } from "react-icons/pi";
import styles from "@/app/styles/reminder.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import MissedTodosPopUp from "../popups/miss-todos";

export default function Reminder() {
  const [openPopUp, setOpenPopup] = useState(false);
  const aboutToMiss = useSelector((state: any) => state.todos.aboutToMiss);
  return (
    <>
      {openPopUp && (
        <>
          <MissedTodosPopUp data={aboutToMiss} />
          <div
            onClick={() => setOpenPopup(false)}
            className="fixed left-0 top-0 w-full h-dvh bg-myOverlay z-10"
          ></div>
        </>
      )}
      <div
        onClick={() => (aboutToMiss.length > 0 ? setOpenPopup(true) : "")}
        className={aboutToMiss.length > 0 ? styles.dad + ` cursor-pointer` : ""}
      >
        <Badge
          badgeContent={aboutToMiss.length}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#f15a00",
            },
          }}
        >
          <PiBellRingingFill className={styles.ringer + ` text-[20px] text-white duration-300`} />
        </Badge>
      </div>
    </>
  );
}

import { lilita_One } from "@/app/fonts/fonts";
import { PROFILE_SERVER_REQ, SERVER_COLLECTOR_REQ } from "@/app/utils/requests-hub/server-requests";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import Reminder from "../reminder/reminder";

const Header = async () => {
  const response = await SERVER_COLLECTOR_REQ(PROFILE_SERVER_REQ);
  return (
    <header className="w-full px-[5px] flex justify-center">
      <div className="w-full flex justify-between items-center bg-myBlack">
        <h1 className={lilita_One.className + " text-[28px] py-5"}>Taskify</h1>
        <div className="flex items-center gap-3">
          <Reminder />
          <div className="myDropDown relative flex items-center gap-2 hover:bg-orangeOverlay cursor-pointer duration-300 px-2 h-[73px]">
            <Avatar alt={response?.data?.name} src={response?.data?.avatarURL} />
            <h3>{response?.data?.name}</h3>
            <Link href={"/log-in"}>
              <div className="absolute w-full py-2 text-center shadow-xl bg-[#f15a001c] text-[12px] top-[75px] left-0 rounded-lg">
                LOG OUT
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

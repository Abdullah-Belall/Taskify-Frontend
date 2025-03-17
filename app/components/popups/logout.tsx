"use client";
import { Button } from "@mui/material";
import { useState } from "react";

interface LogOutPopUpProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogOutPopUp({ onClose, onConfirm }: LogOutPopUpProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    onConfirm();
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="z-20 fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] px-5 py-7 rounded-lg bg-myBlack flex flex-col">
      <h1 className="font-bold text-center mb-4">Log out</h1>
      <p className="text-center text-white mb-4">Are you sure you want to log out?</p>
      <Button
        onClick={handleConfirm}
        disabled={isLoading}
        style={{
          width: "100%",
          backgroundColor: "#f15a00",
          marginTop: "20px",
        }}
        variant="contained"
      >
        {isLoading ? "Logging out..." : "Confirm"}
      </Button>
    </div>
  );
}

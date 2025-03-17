"use client";
import { Button, ButtonGroup } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { IoAddCircle } from "react-icons/io5";
import CategoryPopUp from "../popups/category";
import { useState } from "react";

export default function MyButtonGroup({
  categores,
}: {
  onClick: (category: string) => void;
  categores: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    router.push(`?${params.toString()}`);
  };
  return (
    <>
      {openPopUp && (
        <>
          <CategoryPopUp
            onClose={() => setOpenPopUp(false)}
            onCategoryAdded={(newCategory: string) => {
              handleClick(newCategory);
              setOpenPopUp(false);
            }}
          />
          <div
            onClick={() => setOpenPopUp(false)}
            className="fixed left-0 top-0 w-full h-dvh bg-myOverlay z-10"
          ></div>
        </>
      )}
      <ButtonGroup
        variant="text"
        aria-label="Basic button group"
        sx={{
          "& .MuiButton-root": { color: "#f15a00" },
          borderColor: "#eee",
          "& .MuiButtonGroup-grouped:not(:last-of-type)": { borderColor: "#f15a004a" },
        }}
      >
        {categores?.map((category) => (
          <Button key={category} onClick={() => handleClick(category)}>
            {category}
          </Button>
        ))}
        <Button onClick={() => setOpenPopUp(true)} key="add">
          Add
          <IoAddCircle className="ml-1 text-[22px]" />
        </Button>
      </ButtonGroup>
    </>
  );
}

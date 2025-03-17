"use client";
import { COLLECTOR_REQ, NEW_CATEGORY_REQ } from "@/app/utils/requests-hub/client-requests";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory, deleteCategory } from "@/app/store/data-slice";

interface CategoryPopUpProps {
  onClose: () => void;
  onCategoryAdded: (category: string) => void;
}

export default function CategoryPopUp({ onCategoryAdded }: CategoryPopUpProps) {
  const [categoryInp, setCategoryInp] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (categoryInp.length === 0) return;
    dispatch(addCategory({ categoryName: categoryInp }));
    const response = await COLLECTOR_REQ(NEW_CATEGORY_REQ, { categoryName: categoryInp });
    if (!response.done && response.status === 401) {
      dispatch(deleteCategory(categoryInp));
      router.push("/log-in");
      return;
    }
    if (!response.done) {
      dispatch(deleteCategory(categoryInp));
      return;
    }
    onCategoryAdded(categoryInp);
  };

  return (
    <div className="z-20 fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] px-5 py-7 rounded-lg bg-myBlack flex flex-col">
      <h1 className="font-bold text-center mb-4">NEW CATEGORY</h1>
      <input
        value={categoryInp}
        onChange={(e) => setCategoryInp(e.target.value)}
        type="text"
        placeholder="Enter category name"
        className={`placeholder:text-sm p-3 w-full outline-none rounded-lg border border-gray-200 text-sm caret-myOrange text-myOrange`}
      />
      <Button
        onClick={handleSend}
        style={{
          width: "100%",
          backgroundColor: "#f15a00",
          marginTop: "20px",
        }}
        variant="contained"
      >
        Create
      </Button>
    </div>
  );
}

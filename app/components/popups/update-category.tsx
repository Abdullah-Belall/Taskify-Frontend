"use client";
import { COLLECTOR_REQ, UPDATE_CATEGORY_NAME_REQ } from "@/app/utils/requests-hub/client-requests";
import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategoryName, deleteCategory, addCategory } from "@/app/store/data-slice";

interface UpdateCategoryPopUpProps {
  onClose: () => void;
  onCategoryUpdated: (newCategoryName: string) => void;
  initialCategoryName: string;
}

export default function UpdateCategoryPopUp({
  onClose,
  onCategoryUpdated,
  initialCategoryName,
}: UpdateCategoryPopUpProps) {
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (categoryName.length === 0 || categoryName === initialCategoryName || isLoading) return;
    setIsLoading(true);
    dispatch(updateCategoryName({ oldName: initialCategoryName, newName: categoryName }));
    const response = await COLLECTOR_REQ(UPDATE_CATEGORY_NAME_REQ, {
      oldCategoryName: initialCategoryName,
      newCategoryName: categoryName,
    });
    if (!response.done) {
      dispatch(deleteCategory(categoryName));
      dispatch(addCategory({ categoryName: initialCategoryName }));
      alert("Failed to update category. Please try again.");
      return;
    }

    onCategoryUpdated(categoryName);
    onClose();

    setIsLoading(false);
  };

  return (
    <div className="z-20 fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] px-5 py-7 rounded-lg bg-myBlack flex flex-col">
      <h1 className="font-bold text-center mb-4">UPDATE CATEGORY</h1>
      <input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        type="text"
        placeholder="Enter new category name"
        className="placeholder:text-sm p-3 w-full outline-none rounded-lg border border-gray-200 text-sm caret-myOrange text-myOrange mb-4"
      />
      <Button
        onClick={handleConfirm}
        disabled={isLoading}
        style={{
          width: "100%",
          backgroundColor: "#2563eb",
          marginTop: "20px",
        }}
        variant="contained"
      >
        {isLoading ? "Updating..." : "Confirm"}
      </Button>
    </div>
  );
}

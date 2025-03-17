"use client";
import { COLLECTOR_REQ, UPDATE_TODO_REQ } from "@/app/utils/requests-hub/client-requests";
import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "@/app/store/data-slice";

interface EditTodoPopUpProps {
  onClose: () => void;
  onTodoUpdated: () => void;
  id: string;
  initialTitle: string;
  initialDescription: string;
  categoryName: string;
}

export default function EditTodoPopUp({
  onClose,
  onTodoUpdated,
  id,
  initialTitle,
  initialDescription,
  categoryName,
}: EditTodoPopUpProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = async () => {
    if (title.length === 0 || isLoading) return;
    setIsLoading(true);
    dispatch(
      updateTodo({
        categoryName,
        todoId: id,
        updatedTodo: { title, description },
      })
    );
    const response = await COLLECTOR_REQ(UPDATE_TODO_REQ, {
      todoId: id,
      categoryName,
      title,
      description,
    });
    if (!response.done) {
      dispatch(
        updateTodo({
          categoryName,
          todoId: id,
          updatedTodo: { title: initialTitle, description: initialDescription },
        })
      );
      alert("Failed to update todo. Please try again.");
      return;
    }
    onTodoUpdated();
    onClose();

    setIsLoading(false);
  };

  return (
    <div className="min-w-[280px] z-20 fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] px-5 py-7 rounded-lg bg-myBlack flex flex-col">
      <h1 className="font-bold text-center mb-4">EDIT TODO</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter todo title"
        className="placeholder:text-sm p-3 w-full outline-none rounded-lg border border-gray-200 text-sm caret-myOrange text-myOrange mb-4"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter todo description"
        className="placeholder:text-sm p-3 w-full outline-none rounded-lg border border-gray-200 text-sm caret-myOrange text-myOrange mb-4 h-24 resize-none"
      />
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
        {isLoading ? "Updating..." : "Confirm"}
      </Button>
    </div>
  );
}

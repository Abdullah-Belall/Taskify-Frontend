"use client";
import { COLLECTOR_REQ, DELETE_TODO_REQ } from "@/app/utils/requests-hub/client-requests";
import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, addTodo } from "@/app/store/data-slice";
import { Todo } from "@/app/types/todo";

interface DeleteTodoPopUpProps {
  onClose: () => void;
  onTodoDeleted: () => void;
  id: string;
  categoryName: string;
  todo: Todo;
}

export default function DeleteTodoPopUp({
  onClose,
  onTodoDeleted,
  id,
  categoryName,
  todo,
}: DeleteTodoPopUpProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;
    setIsLoading(true);
    dispatch(deleteTodo({ categoryName, todoId: id }));
    const response = await COLLECTOR_REQ(DELETE_TODO_REQ, { todoId: id, categoryName });
    if (!response.done) {
      dispatch(addTodo({ categoryName, todo }));
      alert("Failed to delete todo. Please try again.");
      return;
    }
    onTodoDeleted();
    onClose();
  };

  return (
    <div className="z-20 fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] px-5 py-7 rounded-lg bg-myBlack flex flex-col">
      <h1 className="font-bold text-center mb-4">DELETE TODO</h1>
      <p className="text-center text-white mb-4">Are you sure you want to delete this todo?</p>
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
        {isLoading ? "Deleting..." : "Confirm"}
      </Button>
    </div>
  );
}

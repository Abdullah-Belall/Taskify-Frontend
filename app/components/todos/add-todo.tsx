"use client";
import { COLLECTOR_REQ, NEW_TODO_REQ } from "@/app/utils/requests-hub/client-requests";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "@/app/store/data-slice";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const handleCreate = async () => {
    const categoryName = searchParams.get("category");
    if (title.length === 0 || !categoryName || loading) return;

    setLoading(true);

    const newTodo = {
      id: Date.now().toString(),
      title,
      description: "",
      status: "in-progress" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addTodo({ categoryName, todo: newTodo }));

    const response = await COLLECTOR_REQ(NEW_TODO_REQ, {
      categoryName,
      title,
      description: "",
    });
    if (response.done && response.data) {
      dispatch(addTodo({ categoryName, todo: response.data }));
    }

    if (!response.done) {
      dispatch(deleteTodo({ categoryName, todoId: newTodo.id }));
      alert("Failed to add todo. Please try again.");
    }
  };

  return (
    <div className="w-full p-2 flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter todo title"
        className={`placeholder:text-sm p-3 w-full outline-none rounded-lg border border-gray-200 text-sm caret-myOrange text-myOrange`}
      />
      <Button
        onClick={handleCreate}
        disabled={loading}
        style={{
          backgroundColor: "#f15a00",
        }}
        variant="contained"
      >
        {loading ? "Creating..." : "Create"}
      </Button>
    </div>
  );
}

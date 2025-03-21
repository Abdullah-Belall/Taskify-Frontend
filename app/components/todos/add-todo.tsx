"use client";
import { COLLECTOR_REQ, NEW_TODO_REQ } from "@/app/utils/requests-hub/client-requests";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "@/app/store/data-slice";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const handleCreate = async () => {
    const categoryName = searchParams.get("category");
    if (title.length === 0 || !categoryName || loading) return;

    setLoading(true);

    const response = await COLLECTOR_REQ(NEW_TODO_REQ, {
      categoryName,
      title,
      description: "",
    });
    if (response.done) {
      dispatch(addTodo({ categoryName, todo: response.data }));
    }
    setLoading(false);
    setTitle("");
  };

  return (
    <div className="w-full px-2 flex gap-2">
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

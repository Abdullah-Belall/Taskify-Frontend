"use client";
import { COLLECTOR_REQ, UPDATE_TODO_REQ } from "@/app/utils/requests-hub/client-requests";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setAboutToMiss, updateTodo } from "@/app/store/data-slice";
import { selectTodosByCategory } from "@/app/store/data-slice";
import { useState } from "react";
import EditTodoPopUp from "../popups/edit-todo";
import DeleteTodoPopUp from "../popups/delete-todo";

export default function TodoComponent({
  id,
  title,
  description,
  createdAt,
  status: initialStatus,
}: {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: "completed" | "in-progress";
}) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category") || "";
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const todos = useSelector((state: any) => selectTodosByCategory(state, categoryName));
  const currentTodo = todos.find((todo) => todo.id === id);
  const status = currentTodo ? currentTodo.status : initialStatus;

  function formatDateTime(dateString: string) {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  }

  const handleUpdate = async (data: { title?: string; description?: string; status?: string }) => {
    if (isUpdating) return;

    setIsUpdating(true);
    const newStatus = data.status || (status === "completed" ? "in-progress" : "completed");
    const originalStatus = status;

    dispatch(
      updateTodo({
        categoryName,
        todoId: id,
        updatedTodo: { status: newStatus as "completed" | "in-progress" },
      })
    );

    const response = await COLLECTOR_REQ(UPDATE_TODO_REQ, {
      ...data,
      todoId: id,
      categoryName,
    });

    if (!response.done) {
      dispatch(
        updateTodo({
          categoryName,
          todoId: id,
          updatedTodo: { status: originalStatus },
        })
      );
      alert("There is a problem please try again later.");
    }

    setIsUpdating(false);
  };

  const handleEdit = () => {
    setIsEditPopupOpen(true);
  };

  const handleDelete = () => {
    setIsDeletePopupOpen(true);
  };
  return (
    <>
      {isEditPopupOpen && (
        <>
          <EditTodoPopUp
            onClose={() => setIsEditPopupOpen(false)}
            onTodoUpdated={() => {}}
            id={id}
            initialTitle={title}
            initialDescription={description}
            categoryName={categoryName}
          />
          <div
            onClick={() => setIsEditPopupOpen(false)}
            className="fixed left-0 top-0 w-full h-dvh bg-myOverlay z-10"
          ></div>
        </>
      )}
      {isDeletePopupOpen && (
        <>
          <DeleteTodoPopUp
            onClose={() => setIsDeletePopupOpen(false)}
            onTodoDeleted={() => {}}
            id={id}
            categoryName={categoryName}
            todo={{
              id,
              title,
              description,
              status,
              createdAt,
              updatedAt: createdAt,
            }}
          />
          <div
            onClick={() => setIsDeletePopupOpen(false)}
            className="fixed left-0 top-0 w-full h-dvh bg-myOverlay z-10"
          ></div>
        </>
      )}
      <li className="relative flex justify-between items-center bg-[#ffffff2e] rounded-md gap-[100px] px-3 py-7 hover:py-8 duration-200">
        <div>
          <h1 className="text-[20px] font-semibold">{title}</h1>
          <p className="text-sm max-w-[225px] text-[#eee]">{description}</p>
        </div>
        <ul className="flex gap-2">
          <li
            onClick={() =>
              handleUpdate({ status: status === "completed" ? "in-progress" : "completed" })
            }
            className={`text-[22px] p-2 rounded-full border-2 cursor-pointer duration-200 border-green-600 text-green-600 hover:bg-green-600 hover:text-white ${
              isUpdating
                ? "opacity-50 cursor-not-allowed"
                : status === "completed"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            <FaCheck />
          </li>
          <li
            onClick={handleEdit}
            className="text-[22px] p-2 rounded-full border-2 bg-white cursor-pointer duration-200 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <MdOutlineEdit />
          </li>
          <li
            onClick={handleDelete}
            className="text-[22px] p-2 rounded-full border-2 bg-white cursor-pointer duration-200 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <MdDeleteOutline />
          </li>
        </ul>
        <p className="absolute right-[5px] bottom-[5px] text-[10px]">{formatDateTime(createdAt)}</p>
      </li>
    </>
  );
}

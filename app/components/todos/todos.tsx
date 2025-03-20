"use client";
import {
  ALL_DATA_REQ,
  COLLECTOR_REQ,
  DELETE_CATEGORY_REQ,
} from "@/app/utils/requests-hub/client-requests";
import TodoComponent from "../others/todo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodosByCategory,
  setCategories,
  deleteCategory,
  addCategory,
} from "@/app/store/data-slice";
import { Todo } from "@/app/store/data-slice";
import MyButtonGroub from "../others/my-button-groub";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import DeletePopUp from "../popups/delete-category";
import AddTodo from "./add-todo";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import UpdateCategoryPopUp from "../popups/update-category";
import Sorted from "../others/sorted-by";

export default function Todos() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openUpdatePopUp, setOpenUpdatePopUp] = useState(false);
  const categories = useSelector((state: any) =>
    state.todos.categories?.map((cat: any) => cat.categoryName)
  );
  const allTodos = useSelector((state: any) =>
    selectTodosByCategory(state, searchParams.get("category") || "")
  );
  const selectedCategory = searchParams.get("category") || "";
  const selectedStatus = searchParams.get("status") || "all";
  const selectedTodos = allTodos.filter((todo: Todo) => {
    if (selectedStatus === "all") return true;
    return todo.status === selectedStatus;
  });

  const handleClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await COLLECTOR_REQ(ALL_DATA_REQ);
      handleClick(response.data ? response.data[0]?.categoryName : "");
      dispatch(setCategories(response.data));
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = async () => {
    if (!selectedCategory) return;
    const deletedCategory = categories?.find((cat: string) => cat === selectedCategory);
    dispatch(deleteCategory(selectedCategory));
    const remainingCategories = categories?.filter((cat: string) => cat !== selectedCategory);
    if (remainingCategories.length > 0) {
      handleClick(remainingCategories[0]);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("category");
      router.push(`?${params.toString()}`);
    }
    const response = await COLLECTOR_REQ(DELETE_CATEGORY_REQ, { categoryName: selectedCategory });
    if (!response.done) {
      dispatch(addCategory({ categoryName: deletedCategory }));
      alert("Failed to delete category. Please try again.");
    }
    setOpenDeletePopUp(false);
  };

  const handleUpdateCategory = () => {
    setOpenUpdatePopUp(true);
  };

  return (
    <>
      {openDeletePopUp && (
        <>
          <DeletePopUp type="Category" onDone={handleDelete} />
          <div
            onClick={() => setOpenDeletePopUp(false)}
            className="fixed left-0 top-0 w-full h-dvh bg-myOverlay z-10"
          ></div>
        </>
      )}
      {openUpdatePopUp && (
        <>
          <UpdateCategoryPopUp
            onClose={() => setOpenUpdatePopUp(false)}
            onCategoryUpdated={(newCategoryName) => {
              handleClick(newCategoryName);
            }}
            initialCategoryName={selectedCategory}
          />
          <div
            onClick={() => setOpenUpdatePopUp(false)}
            className="fixed left-0 top-0 w-full h-dvh bg-myOverlay z-10"
          ></div>
        </>
      )}
      <MyButtonGroub categores={categories} onClick={handleClick} />
      {categories?.length > 0 && (
        <>
          <Sorted />
          <div className="w-full flex justify-between items-center bg-[#ffffff2e] rounded-lg p-2">
            <h2 className="font-semibold">
              {selectedCategory
                ? `${selectedCategory.toUpperCase()} Category`
                : "No Category Selected"}
            </h2>
            {selectedCategory && (
              <div className="flex gap-2">
                <Button
                  onClick={handleUpdateCategory}
                  style={{
                    backgroundColor: "#2563eb",
                  }}
                  variant="contained"
                >
                  <MdOutlineEdit className="text-[20px]" />
                </Button>
                <Button
                  onClick={() => setOpenDeletePopUp(true)}
                  style={{
                    backgroundColor: "red",
                  }}
                  variant="contained"
                >
                  <MdDeleteOutline className="text-[20px]" />
                </Button>
              </div>
            )}
          </div>
        </>
      )}
      <ul
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="w-full flex flex-col gap-3 max-h-[250px] overflow-y-scroll"
      >
        {selectedTodos.length > 0 ? (
          selectedTodos.map((todo: Todo) => {
            return (
              <TodoComponent
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                status={todo.status}
                createdAt={todo.createdAt}
              />
            );
          })
        ) : (
          <p className="px-5 py-4 rounded-lg bg-[#ffffff2e] w-fit mx-auto my-5">No Todos</p>
        )}
      </ul>
      {categories?.length > 0 && <AddTodo />}
    </>
  );
}

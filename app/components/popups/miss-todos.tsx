"use client";
import { Todo } from "@/app/types/todo";
import MissedTodoComponent from "../others/missed-todo";

export default function MissedTodosPopUp({ data }: { data: Todo[] }) {
  return (
    <div className="z-20 fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] px-5 py-7 rounded-lg bg-myBlack flex flex-col">
      <h1 className="font-bold text-center mb-4">MISSED TODOS</h1>
      <ul
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="flex flex-col gap-2 overflow-y-scroll max-h-[280px]"
      >
        {data.map((e) => {
          return (
            <li
              key={e.id}
              className="min-w-[400px] relative flex flex-col bg-[#ffffff2e] rounded-md px-3 py-7"
            >
              <MissedTodoComponent
                category={e.category as string}
                title={e.title}
                description={e.description}
                createdAt={e.createdAt}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";
import { Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sorted() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStatus = searchParams.get("status") || "all";
  const handleSort = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleSort("all")}
        style={{
          backgroundColor: currentStatus === "all" ? "#f15a00" : "#ccc",
          color: "white",
        }}
        variant="contained"
      >
        All
      </Button>
      <Button
        onClick={() => handleSort("completed")}
        style={{
          backgroundColor: currentStatus === "completed" ? "#f15a00" : "#ccc",
          color: "white",
        }}
        variant="contained"
      >
        Completed
      </Button>
      <Button
        onClick={() => handleSort("in-progress")}
        style={{
          backgroundColor: currentStatus === "in-progress" ? "#f15a00" : "#ccc",
          color: "white",
        }}
        variant="contained"
      >
        In-Progress
      </Button>
    </div>
  );
}

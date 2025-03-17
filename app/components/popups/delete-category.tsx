import { Button } from "@mui/material";

export default function DeletePopUp({ type, onDone }: { type: string; onDone: any }) {
  return (
    <div className="z-20 fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] px-5 py-7 rounded-lg bg-myBlack flex flex-col">
      <h1 className="font-bold text-center mb-4">Delete {type}</h1>
      <p className="text-center">Are you sure you want to delete this {type}?</p>
      <Button
        onClick={onDone}
        style={{
          width: "100%",
          backgroundColor: "#f15a00",
          marginTop: "20px",
        }}
        variant="contained"
      >
        DELETE
      </Button>
    </div>
  );
}

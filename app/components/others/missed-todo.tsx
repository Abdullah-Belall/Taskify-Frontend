"use client";
export default function MissedTodoComponent({
  title,
  description,
  createdAt,
  category,
}: {
  title: string;
  description: string;
  createdAt: string;
  category: string;
}) {
  function formatDateTime(dateString: string) {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  }
  return (
    <>
      <h1 className="absolute left-[5px] top-[5px] text-[10px]">
        {category.toUpperCase()} Category
      </h1>
      <div>
        <h1 className="text-[20px] font-semibold">{title}</h1>
        <p className="text-sm max-w-[225px] text-[#eee]">{description}</p>
      </div>
      <p className="absolute right-[5px] bottom-[5px] text-[10px]">{formatDateTime(createdAt)}</p>
    </>
  );
}

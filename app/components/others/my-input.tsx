export default function MyInput({
  isFulled,
  isFocused,
  lable,
  children,
}: {
  isFulled: boolean;
  isFocused: boolean;
  children: React.ReactNode;
  lable: string;
}) {
  const lableCond = isFocused
    ? "top-[-15px] text-[14px] text-white"
    : isFulled
    ? "top-[-15px] text-[14px] text-myWhite"
    : "top-[50%] translate-y-[-50%] text-myWhite";
  return (
    <div className="relative w-full">
      <label className={`${lableCond} w-full absolute duration-300 cursor-auto`} htmlFor={lable}>
        {lable}
      </label>
      {children}
      <p
        className={`${
          isFocused ? "bg-white" : "bg-myWhite"
        } absolute button-0 left-0 w-full h-[1px]`}
      ></p>
    </div>
  );
}

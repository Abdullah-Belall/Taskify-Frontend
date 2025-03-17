import Header from "./components/header/header";
import ProtectedComponent from "./components/HOC/auth";
import Todos from "./components/todos/todos";

export default function Home() {
  return (
    <>
      <ProtectedComponent>
        <div className="w-full h-dvh flex justify-center items-center px-[5px]">
          <div className="w-full sm:w-[630px] flex flex-col gap-3 bg-myBlack p-4 rounded-lg">
            <div>
              <Header />
            </div>
            <div className="flex flex-col items-center gap-3">
              <Todos />
            </div>
          </div>
        </div>
      </ProtectedComponent>
    </>
  );
}

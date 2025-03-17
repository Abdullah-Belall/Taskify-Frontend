"use client";
import { Alert, Button } from "@mui/material";
import Image from "next/image";
import signUpImg from "@/public/login.svg";
import MyInput from "../components/others/my-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COLLECTOR_REQ, LOGIN_REQ, LOGOUT_REQ } from "../utils/requests-hub/client-requests";
import { unCountedMessage } from "../utils/base";
import Loader from "../components/others/loader";

export default function Login() {
  const router = useRouter();
  const [focuse, setFocuse] = useState({
    email: false,
    password: false,
  });
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [validationMessage, setVaildationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const logout = async () => {
      await COLLECTOR_REQ(LOGOUT_REQ);
    };
    logout();
  }, []);

  const handleFocuse = (label: "email" | "password") => {
    setFocuse({ ...focuse, [label]: !focuse[label] });
  };
  const handleInput = (label: "email" | "password", value: string) => {
    setInputs({ ...inputs, [label]: value });
  };
  const validation = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputs.email)) {
      setVaildationMessage("Invalid Email address.");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(inputs.password) || inputs.password.length < 8) {
      setVaildationMessage("Incorrect password.");
      return false;
    }
    setVaildationMessage("");
    return true;
  };
  const handleSubmit = async () => {
    if (!validation()) return;
    if (loading) return;
    setLoading(true);
    const { email, password } = inputs;
    const response = await LOGIN_REQ({
      email,
      password,
    });
    setLoading(false);
    if (!response.done) {
      setVaildationMessage(response.message || unCountedMessage);
      return;
    }
    router.replace(`/`);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="w-full h-dvh flex justify-center items-center">
        <div className="bg-myBlack w-full flex sm:w-[620px] lg:w-[1004px] lg:gap-9 rounded-xl py-[38px] px-[25px] mx-[10px]">
          <div className="w-full flex flex-col">
            <h2 className="text-myOrange text-[24px] font-semibold">Taskify</h2>
            <h1 className="text-[24px] font-bold mb-[78px]">Lost time is never found again</h1>
            <form className="w-full flex flex-col gap-10">
              <MyInput lable="Email" isFulled={inputs.email.length > 0} isFocused={focuse.email}>
                <input
                  onFocus={() => handleFocuse("email")}
                  onBlur={() => handleFocuse("email")}
                  onChange={(e) => handleInput("email", e.target.value)}
                  value={inputs.email}
                  className="w-full outline-0 bg-transparent py-[10px] duration-300"
                  type={"text"}
                  id={"Email"}
                />
              </MyInput>
              <MyInput
                isFulled={inputs.password.length > 0}
                lable="Password"
                isFocused={focuse.password}
              >
                <input
                  onFocus={() => handleFocuse("password")}
                  onBlur={() => handleFocuse("password")}
                  onChange={(e) => handleInput("password", e.target.value)}
                  value={inputs.password}
                  className="w-full outline-0 bg-transparent py-[10px] duration-300"
                  type={"password"}
                  id={"Password"}
                />
              </MyInput>
            </form>
            <Alert
              style={{
                backgroundColor: "transparent",
                color: "rgb(211, 47, 47)",
                marginTop: "10px",
                paddingLeft: "0",
                display: validationMessage ? "" : "none",
              }}
              severity="error"
            >
              {validationMessage}
            </Alert>
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#f15a00",
                marginTop: !validationMessage ? "40px" : "10px",
              }}
              variant="contained"
            >
              Log in
            </Button>

            <div
              onClick={() => router.push("/log-in/forgot-pass")}
              className="text-[#888] text-[14px] mt-2 cursor-pointer underline hover:text-myOrange w-fit hover:no-underline duration-300"
            >
              Forgot password
            </div>
            <div className="text-[#888] text-[14px] mt-2">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => router.push("/sign-up")}
                className="cursor-pointer hover:text-myOrange duration-300"
              >
                Sign up
              </span>
            </div>
          </div>
          <div className="hidden lg:block w-[.5px] h-[500px] bg-[#888] mx-4"></div>
          <div className="hidden lg:block relative w-full">
            <Image fill src={signUpImg} alt="Login logo" />
          </div>
        </div>
      </div>
    </>
  );
}

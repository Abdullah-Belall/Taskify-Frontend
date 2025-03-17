"use client";
import { Alert, Button } from "@mui/material";
import Image from "next/image";
import signUpImg from "@/public/undraw_complete-task_qgwk.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyInput from "../components/others/my-input";
import { SIGNUP_REQ } from "../utils/requests-hub/client-requests";
import Loader from "../components/others/loader";
import { unCountedMessage } from "../utils/base";

export default function SignUp() {
  const router = useRouter();
  const [focuse, setFocuse] = useState({
    linkedin: false,
    email: false,
    password: false,
    confirmPass: false,
  });
  const [inputs, setInputs] = useState({
    linkedin: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [validationMessage, setVaildationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFocuse = (label: "linkedin" | "email" | "password" | "confirmPass") => {
    setFocuse({ ...focuse, [label]: !focuse[label] });
  };
  const handleInput = (label: "linkedin" | "email" | "password" | "confirmPass", value: string) => {
    setInputs({ ...inputs, [label]: value });
  };
  const validation = () => {
    const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+\/?$/;
    if (!linkedInRegex.test(inputs.linkedin)) {
      setVaildationMessage("Invalid Linkedin URL.");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputs.email)) {
      setVaildationMessage("Invalid Email address.");
      return false;
    }
    if (inputs.password.length < 8) {
      setVaildationMessage("Password must be 8 or more character");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(inputs.password)) {
      setVaildationMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return false;
    }
    if (inputs.password !== inputs.confirmPass) {
      setVaildationMessage("Password should match.");
      return false;
    }
    setVaildationMessage("");
    return true;
  };
  const handleSubmit = async () => {
    if (!validation()) return;
    if (loading) return;
    setLoading(true);
    const { email, password, linkedin } = inputs;
    const response = await SIGNUP_REQ({
      linkedinUrl: linkedin,
      email,
      password,
    });
    setLoading(false);
    if (!response.done) {
      setVaildationMessage(response.message || unCountedMessage);
      return;
    }
    router.replace(`sign-up/${email}`);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="w-full h-dvh flex justify-center items-center">
        <div className="bg-myBlack w-full flex sm:w-[620px] lg:w-[1004px] lg:gap-9 rounded-xl py-[38px] px-[25px] mx-[10px]">
          <div className="w-full flex flex-col">
            <h2 className="text-myOrange text-[23px] font-semibold">Taskify</h2>
            <h1 className="text-[24px] font-bold mb-[28px]">
              Master your time, master your destiny
            </h1>
            <form className="w-full flex flex-col gap-8">
              <MyInput
                lable="Linkedin URL"
                isFulled={inputs.linkedin.length > 0}
                isFocused={focuse.linkedin}
              >
                <input
                  onFocus={() => handleFocuse("linkedin")}
                  onBlur={() => handleFocuse("linkedin")}
                  onChange={(e) => handleInput("linkedin", e.target.value)}
                  value={inputs.linkedin}
                  className="w-full outline-0 bg-transparent py-[10px] duration-300"
                  type={"text"}
                  id={"Linkedin URL"}
                />
              </MyInput>
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
              <MyInput
                isFulled={inputs.confirmPass.length > 0}
                lable="Confirm Password"
                isFocused={focuse.confirmPass}
              >
                <input
                  onFocus={() => handleFocuse("confirmPass")}
                  onBlur={() => handleFocuse("confirmPass")}
                  onChange={(e) => handleInput("confirmPass", e.target.value)}
                  value={inputs.confirmPass}
                  className="w-full outline-0 bg-transparent py-[10px] duration-300"
                  type={"password"}
                  id={"Confirm Password"}
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
                marginTop: !validationMessage ? "20px" : "",
              }}
              variant="contained"
            >
              Sign Up
            </Button>
            <div className="text-[#888] text-[14px] mt-2">
              Already have Account?{" "}
              <span
                onClick={() => router.push("log-in")}
                className="cursor-pointer hover:text-myOrange duration-300"
              >
                Log in
              </span>
            </div>
          </div>
          <div className="hidden lg:block w-[.5px] h-[500px] bg-[#888] mx-4"></div>
          <div className="hidden lg:block relative w-full">
            <Image className="translate-y-[25px]" fill src={signUpImg} alt={"Login logo"} />
          </div>
        </div>
      </div>
    </>
  );
}

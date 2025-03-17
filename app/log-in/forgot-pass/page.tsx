"use client";
import Loader from "@/app/components/others/loader";
import { unCountedMessage } from "@/app/utils/base";
import {
  LOGIN_WITH_CODE_FSTEP_REQ,
  LOGIN_WITH_CODE_SSTEP_REQ,
} from "@/app/utils/requests-hub/client-requests";
import { Alert, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ForgotPasswordComponent() {
  const router = useRouter();
  const [code1, setCode1] = useState<any>("");
  const [code2, setCode2] = useState<any>("");
  const [code3, setCode3] = useState<any>("");
  const [code4, setCode4] = useState<any>("");
  const [code5, setCode5] = useState<any>("");
  const one = useRef<any>();
  const two = useRef<any>();
  const three = useRef<any>();
  const four = useRef<any>();
  const five = useRef<any>();
  const [email, setEmail] = useState("");
  const [skipStep, setSkipStep] = useState(false);
  const [resendCode, setResendCode] = useState(0);
  const [validationMessage, setValidationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInp = (e: any) => {
    return e.target.value < 0 || e.target.value > 9 ? "" : e.target.value;
  };
  const handleSend = async () => {
    if (loading) return;
    if (!skipStep) {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isEmailValid) {
        setValidationMessage(`Invalid email.`);
        return;
      }
      setValidationMessage(``);
      setLoading(true);
      const response = await LOGIN_WITH_CODE_FSTEP_REQ({ email });
      if (response?.done) {
        setSkipStep(true);
        setValidationMessage(``);
      } else {
        setValidationMessage(response?.message as string);
      }
      setLoading(false);
      return;
    }

    const condition = code1 !== "" && code2 !== "" && code3 !== "" && code4 !== "" && code5 !== "";
    if (!condition) {
      setValidationMessage("Please fill all fields.");
      return;
    }
    setValidationMessage("");
    setLoading(true);
    const code = code1 + code2 + code3 + code4 + code5;
    const response = await LOGIN_WITH_CODE_SSTEP_REQ({ email, code });
    if (response?.done) {
      router.replace("/new-pass");
    } else {
      setValidationMessage(response?.message as string);
    }
    setLoading(false);
  };
  const ResendCode = async () => {
    if (loading) return;
    setResendCode(resendCode + 1);
    if (resendCode > 3) {
      setValidationMessage("Try again later.");
      return;
    }
    setLoading(true);
    const response = await LOGIN_WITH_CODE_FSTEP_REQ({ email });
    if (response?.done) {
      setValidationMessage(``);
    } else {
      setValidationMessage(response?.message || unCountedMessage);
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="w-full h-dvh relative px-[5px] flex justify-center items-center overflow-hidden py-12">
        <div className="w-full min-[388px]:w-[368px] relative bg-myBlack px-6 pt-10 pb-9 shadow-xl mx-auto max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-mainlight">
                <p>Forgot Password</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-anotherLight">
                <p>
                  {skipStep
                    ? "We sent a verification code to your email address"
                    : "We will send a code to your email address"}
                </p>
              </div>
            </div>
            <div>
              <form>
                <div className="flex flex-col">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`${
                      skipStep ? "hidden" : ""
                    } placeholder:text-sm p-3 w-full outline-none rounded-lg border border-gray-200 text-sm caret-myOrange text-myOrange`}
                  />
                  <div
                    className={`${
                      skipStep ? "" : "hidden"
                    } flex gap-2 flex-row items-center justify-between mx-auto w-full max-w-xs`}
                  >
                    <div className="w-16 h-16">
                      <input
                        onChange={(e) => {
                          setCode1(handleInp(e));
                          two.current.focus();
                        }}
                        value={code1}
                        ref={one}
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg caret-myOrange text-myOrange"
                        type="number"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <input
                        onChange={(e) => {
                          setCode2(handleInp(e));
                          three.current.focus();
                        }}
                        value={code2}
                        ref={two}
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg caret-myOrange text-myOrange"
                        type="number"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <input
                        onChange={(e) => {
                          setCode3(handleInp(e));
                          four.current.focus();
                        }}
                        value={code3}
                        ref={three}
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg caret-myOrange text-myOrange"
                        type="number"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <input
                        onChange={(e) => {
                          setCode4(handleInp(e));
                          five.current.focus();
                        }}
                        value={code4}
                        ref={four}
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg caret-myOrange text-myOrange"
                        type="number"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <input
                        onChange={(e) => {
                          setCode5(handleInp(e));
                        }}
                        value={code5}
                        ref={five}
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg caret-myOrange text-myOrange"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
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
                  onClick={handleSend}
                  style={{
                    width: "100%",
                    backgroundColor: "#f15a00",
                    marginTop: !validationMessage ? "20px" : "",
                  }}
                  variant="contained"
                >
                  Verify
                </Button>
                <div className={`${!skipStep && "hidden"} text-[#888] text-[14px] mt-2`}>
                  You didn&apos;t get the code?{" "}
                  <span
                    onClick={ResendCode}
                    className="cursor-pointer hover:text-myOrange duration-300"
                  >
                    Resend
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

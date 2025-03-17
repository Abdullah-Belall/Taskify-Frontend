"use client";
import { Alert, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Loader from "../../others/loader";
import { RESEND_CODE_REQ, VERIFY_EMAIL_REQ } from "@/app/utils/requests-hub/client-requests";
import { unCountedMessage } from "@/app/utils/base";

export default function VerifyEmailComponent() {
  const params = useParams<any>();
  const router = useRouter();
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [code5, setCode5] = useState("");
  const one = useRef<any>();
  const two = useRef<any>();
  const three = useRef<any>();
  const four = useRef<any>();
  const five = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleInp = (e: any) => {
    return e.target.value < 0 || e.target.value > 9 ? "" : e.target.value;
  };

  const resendCode = async () => {
    if (loading) return;
    const ready = params.verfiyEmail?.split("%40");
    const email = ready[0] + "@" + ready[1];
    setLoading(true);
    const response = await RESEND_CODE_REQ({ email });
    setLoading(false);
    if (!response.done) {
      setValidationMessage(response.message || unCountedMessage);
    }
  };

  const handleSend = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    const condition = code1 !== "" && code2 !== "" && code3 !== "" && code4 !== "" && code5 !== "";
    if (!condition) {
      setValidationMessage("Please fill all inputs.");
      return;
    }
    setValidationMessage("");
    setLoading(true);
    const code = code1 + code2 + code3 + code4 + code5;
    const ready = params.verfiyEmail?.split("%40");
    const email = ready[0] + "@" + ready[1];
    const response = await VERIFY_EMAIL_REQ({ email, code });
    if (response?.done) {
      router.replace(`/log-in`);
    } else {
      setValidationMessage(response?.message || unCountedMessage);
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="w-full px-[5px] h-dvh relative flex justify-center items-center overflow-hidden">
        <div className="w-full min-[388px]:w-fit relative bg-myBlack px-6 pt-10 pb-9 shadow-xl mx-auto rounded-2xl">
          <div className="mx-auto flex w-full flex-col space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium">
                <p>We have sent a code to your email</p>
              </div>
            </div>
            <div>
              <form>
                <div className="flex flex-col space-y-6">
                  <div className="flex gap-2 flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16">
                      <input
                        onChange={(e) => {
                          setCode1(handleInp(e));
                          two.current.focus();
                        }}
                        value={code1}
                        ref={one}
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-myOrange"
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
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-myOrange"
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
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-myOrange"
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
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-myOrange"
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
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-myOrange"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
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
              <div className="text-[#888] text-[14px] mt-2">
                You didn&apos;t get the code?{" "}
                <span
                  onClick={resendCode}
                  className="cursor-pointer hover:text-myOrange duration-300"
                >
                  Resend
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

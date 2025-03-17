"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button } from "@mui/material";
import { COLLECTOR_REQ, RESET_PASSWORD_REQ } from "@/app/utils/requests-hub/client-requests";
import Loader from "../others/loader";

export default function NewPasswordComponent() {
  const router = useRouter();
  const [validationMessage, setValidationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const vaildationChecker = () => {
    const isPasswordValid =
      /[A-Z]/.test(password) && /[@$%!&*]/.test(password) && password.length > 8;
    if (!isPasswordValid) {
      setValidationMessage(
        `Password must have at least one big, at least on of this signs @$%!&* and more than 8 character.`
      );
      return false;
    }
    if (password !== confirmPassword) {
      setValidationMessage("Password and confirm password aren't match.");
      return false;
    }
    return true;
  };
  const handleSend = async () => {
    if (loading) return;
    if (!vaildationChecker()) {
      return;
    }
    setLoading(true);
    const response = await COLLECTOR_REQ(RESET_PASSWORD_REQ, { newPassword: password });
    if (response?.done) {
      setValidationMessage(``);
      router.replace("/");
    } else {
      if (response.status === 401) {
        router.replace("/log-in");
      } else {
        setValidationMessage(response?.message as string);
      }
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="w-full px-[5px]">
        <div className="relative w-full h-dvh flex justify-center items-center overflow-hidden py-12">
          <div className="relative bg-myBlack px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl text-mainlight">
                  <p>New Password</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-anotherLight">
                  <p>
                    Do not give your password to anyone, not even the admin if they ask you for it.
                  </p>
                </div>
                <form className="flex flex-col gap-3 w-full">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                    className={`placeholder:text-sm mt-4 p-3 w-full outline-none rounded-lg border border-gray-200 text-sm caret-myOrange text-myOrange`}
                  />
                  <input
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Enter confirm password"
                    className={`placeholder:text-sm p-3 w-full outline-none rounded-lg border border-gray-200 text-sm caret-myOrange text-myOrange`}
                  />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

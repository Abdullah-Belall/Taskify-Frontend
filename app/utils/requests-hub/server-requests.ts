"use server";

import axios from "axios";
import { BaseWebsiteLink, unCountedMessage } from "../base";
import { cookies } from "next/headers";

const BASE_URL = BaseWebsiteLink + "/api";

const REFRESH_TOKEN_REQ = async () => {
  const refresh_token = await getCookieServer(`refresh_token`);
  try {
    const response = await axios.get(`${BASE_URL}/auth/refresh-token`, {
      headers: { cookie: `refresh_token=${refresh_token};` },
    });
    return response?.data?.done
      ? response?.data
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    return {
      done: false,
      message: error?.response?.data?.error?.message || unCountedMessage,
      status: error.status,
    };
  }
};
const PROFILE_SERVER_REQ = async ({ access_token }: { access_token: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        cookie: `access_token=${access_token};`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    return response?.data?.email
      ? { done: true, data: { ...response?.data } }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    return {
      done: false,
      message: error?.response?.data?.error?.message || unCountedMessage,
      status: error.status,
    };
  }
};

const SERVER_COLLECTOR_REQ = async (callBackFunc: any, dataBody?: any) => {
  let access_token = await getCookieServer("access_token");
  if (!access_token) {
    const refreshResponse = await REFRESH_TOKEN_REQ();
    if (!refreshResponse.done) return { done: false, message: "Unauthorized.", status: 401 };
    access_token = refreshResponse.access_token;
  }
  const response = await callBackFunc({ ...dataBody, access_token });
  if (!response.done && response.status === 401) {
    const refreshResponse = await REFRESH_TOKEN_REQ();
    if (!refreshResponse.done) return { done: false, message: "Unauthorized.", status: 401 };
    access_token = refreshResponse.access_token;
    const retryResponse = await callBackFunc({ ...dataBody, access_token });
    return retryResponse;
  }
  return response;
};
//* COOKIES HANDLER
const getCookieServer = async (keyName: string): Promise<string | undefined> => {
  return (await cookies()).get(keyName)?.value;
};

export { PROFILE_SERVER_REQ, SERVER_COLLECTOR_REQ };

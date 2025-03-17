"use client";
import axios from "axios";
import { BaseWebsiteLink, unCountedMessage } from "../base";
export interface ReqResInterface {
  done: boolean;
  message?: string;
  status?: number;
}
const BASE_URL = BaseWebsiteLink + "/api";

const SIGNUP_REQ = async (userPackage: {
  linkedinUrl: string;
  email: string;
  password: string;
}) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/auth/register`, userPackage);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const RESEND_CODE_REQ = async (data: { email: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/auth/resend-code`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const VERIFY_EMAIL_REQ = async (data: { email: string; code: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/auth/verify-code`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    const message = error?.response?.data?.error?.message || unCountedMessage;
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const LOGIN_REQ = async (data: { email: string; password: string }): Promise<ReqResInterface> => {
  try {
    const response: any = await axios.post(`${BASE_URL}/auth/sign-in`, data);
    if (response?.data?.done) {
      setCookie("access_token", response?.data?.access_token);
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const LOGIN_WITH_CODE_FSTEP_REQ = async (data: { email: string }): Promise<ReqResInterface> => {
  try {
    const response: any = await axios.post(`${BASE_URL}/auth/forgot-pass/step-one`, data);
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const LOGIN_WITH_CODE_SSTEP_REQ = async (data: {
  email: string;
  code: string;
}): Promise<ReqResInterface> => {
  try {
    const response: any = await axios.post(`${BASE_URL}/auth/forgot-pass/step-two`, data);
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    const message = error?.response?.data?.error?.message;
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const RESET_PASSWORD_REQ = async (data: { newPassword: string }) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/auth/reset-password`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const REFRESH_TOKEN_REQ = async (): Promise<ReqResInterface> => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/refresh-token`);
    if (response?.data?.access_token) {
      setCookie("access_token", response?.data?.access_token);
    }
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ALL_DATA_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/profile`);
    return response?.data?.email
      ? { done: true, data: response?.data.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const NEW_CATEGORY_REQ = async (data: { categoryName: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/actions/new-category`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const DELETE_CATEGORY_REQ = async (data: { categoryName: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/actions/delete-category`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const NEW_TODO_REQ = async (data: { categoryName: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/actions/new-todo`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_TODO_REQ = async (data: { title: string; description: string; status: string }) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/actions/edit-todo`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const DELETE_TODO_REQ = async (data: { categoryName: string; todoId: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/actions/delete-todo`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_CATEGORY_NAME_REQ = async (data: {
  categoryName: string;
  newCategoryName: string;
}) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/actions/edit-category`, data);
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const LOGOUT_REQ = async (): Promise<ReqResInterface> => {
  try {
    const response: any = await axios.post(`${BASE_URL}/auth/logout`);
    if (response?.data?.done) setCookie("access_token", "LOGGED OUT");
    if (response?.data?.done) {
      setCookie("access_token", "LOGGED OUT");
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.error?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const COLLECTOR_REQ = async (callBackFunc: any, dataBody?: any) => {
  const access_token = getCookie("access_token");
  if (!access_token) {
    const refreshResponse = await REFRESH_TOKEN_REQ();
    if (!refreshResponse.done) return { done: false, message: "Unauthorized.", status: 401 };
  }
  const response = await callBackFunc(dataBody);
  if (!response.done && response.status === 401) {
    const refreshResponse = await REFRESH_TOKEN_REQ();
    if (!refreshResponse.done) return { done: false, message: "Unauthorized.", status: 401 };
    const retryResponse = await callBackFunc(dataBody);
    return retryResponse;
  }
  return response;
};
//* COOKIES HANDLERS
const setCookie = (keyName: string, value: string) => {
  document.cookie = `${keyName}=${value}; path=/; max-age=${15 * 60}; SameSite=Strict`;
};
const getCookie = (keyName: string): string | null => {
  const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${keyName}=`));
  return cookie ? cookie.split("=")[1] : null;
};
export {
  SIGNUP_REQ,
  RESEND_CODE_REQ,
  VERIFY_EMAIL_REQ,
  LOGIN_REQ,
  LOGIN_WITH_CODE_FSTEP_REQ,
  LOGIN_WITH_CODE_SSTEP_REQ,
  RESET_PASSWORD_REQ,
  COLLECTOR_REQ,
  ALL_DATA_REQ,
  NEW_CATEGORY_REQ,
  DELETE_CATEGORY_REQ,
  NEW_TODO_REQ,
  UPDATE_TODO_REQ,
  DELETE_TODO_REQ,
  UPDATE_CATEGORY_NAME_REQ,
  LOGOUT_REQ,
};

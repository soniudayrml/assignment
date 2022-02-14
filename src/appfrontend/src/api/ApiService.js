import axios from "axios";

const getToken = () => {
  return localStorage.getItem("USER_KEY");
};

export const userLogin = (authRequest) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/authenticate`,
    data: authRequest,
  });
};

export const userRegisteration = (authRequest) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/register`,
    data: authRequest,
  });
};
export const forgotPassword = (authRequest) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/forgot`,
    data: authRequest,
  });
};
export const addCommentToUser = (authRequest) => {
  return axios({
    method: "POST",
    url: `${
      process.env.hostUrl || "http://localhost:8080"
    }/comments/user/${localStorage.getItem("USER_ID")}/comment`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: authRequest,
  });
};

export const getAllComments = () => {
  return axios({
    method: "GET",
    url: `${process.env.hostUrl || "http://localhost:8080"}/comments`,
  });
};

export const getUser = () => {
  return axios({
    method: "GET",
    url: `${
      process.env.hostUrl || "http://localhost:8080"
    }/user/${localStorage.getItem("USER_ID")}`,
  });
};

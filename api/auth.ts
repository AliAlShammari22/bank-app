import UserInfo from "@/types/UserInfo";
import instance from ".";
import { storeToken } from "./storage";

const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post(
    "/mini-project/api/auth/login",
    userInfo
  );
  if (data.token) {
    await storeToken(data.token);
  }
  return data;
};

const register = async (userInfo: UserInfo, image: string) => {
  const formData = new FormData();

  formData.append("username", userInfo.username);
  formData.append("password", userInfo.password);
  formData.append("image", {
    name: "image.jpg",
    uri: image,
    type: "image/jpeg",
  } as any);

  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );
  if (data.token) {
    await storeToken(data.token);
  }
  return data;
};

const me = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};

const updateProfile = async (image: string) => {
  const { data } = await instance.put("/mini-project/api/auth/profile", image);
  return data;
};

const getUserId = async () => {
  const { data } = await instance.get("/mini-project/api/auth/user/<userId>");
  return data;
};

export { getAllUsers, getUserId, login, me, register, updateProfile };

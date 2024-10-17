import Cookies from "js-cookie";

export const setUserIdInCookie = (userId: string) => {
  Cookies.set("userId", userId, { expires: 7, path: "/" }); 
};

export const getUserIdFromCookie = (): string | undefined => {
  return Cookies.get("userId");
};

export const removeUserIdFromCookie = () => {
  Cookies.remove("userId", { path: "/" });
};

export const getRefreshTokenFromCookie = () => {
  return Cookies.get("refreshToken");
}
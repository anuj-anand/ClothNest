export const decodedToken = () => {
  const token = localStorage.getItem("userToken");
  let parsedToken = token && JSON.parse(token).token.split(".")[1];
  let decryptedToken = parsedToken && window.atob(parsedToken);
  return JSON.parse(decryptedToken)?.exp
    ? JSON.parse(decryptedToken).exp * 1000
    : 0;
};

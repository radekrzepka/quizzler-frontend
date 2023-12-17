import { getCookie } from "cookies-next";

const getClientJWT = () => {
   const JWT = getCookie("JWT");
   return JWT;
};

export default getClientJWT;

import { cookies } from "next/headers";

const getServerJWT = () => {
   const cookieStore = cookies();
   return cookieStore.get("JWT")?.value;
};

export default getServerJWT;

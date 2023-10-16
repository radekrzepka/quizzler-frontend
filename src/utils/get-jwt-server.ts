import { cookies } from "next/headers";

const getJWT = () => {
   const cookieStore = cookies();
   return cookieStore.get("JWT")?.value;
}

export default getJWT;

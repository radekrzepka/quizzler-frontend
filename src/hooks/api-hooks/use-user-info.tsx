import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { getUser } from "@/utils/api-utils/get-user";

const useUserInfo = () => {
   const JWT = getCookie("JWT");

   return useQuery({
      queryKey: ["user"],
      queryFn: () => getUser(JWT),
      retry: 0,
   });
};

export default useUserInfo;

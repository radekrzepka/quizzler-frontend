import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { getCurrentUser } from "@/utils/api-utils/get-current-user";

const useCurrentUserInfo = () => {
   const JWT = getCookie("JWT");

   return useQuery({
      queryKey: ["user"],
      queryFn: () => getCurrentUser(JWT),
   });
};

export default useCurrentUserInfo;

import { useQuery } from "@tanstack/react-query";
import { getClientCurrentUser } from "@/utils/api-utils/get-client-current-user";

const useCurrentUserInfo = () => {
   return useQuery({
      queryKey: ["currentUser"],
      queryFn: () => getClientCurrentUser(),
      retry: 0,
   });
};

export default useCurrentUserInfo;

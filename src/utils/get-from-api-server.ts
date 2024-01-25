import getJWT from "@/utils/get-server-jwt";

const getFromAPI = async <T>(endpoint: string): Promise<T> => {
   const JWT = getJWT();

   await new Promise(resolve => setTimeout(resolve, 1000 * 1));

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: { Authorization: JWT as string },
   });
   if (res.status === 404) {
      return {} as T;
   }
   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as Promise<T>;
   return data;
};

export default getFromAPI;

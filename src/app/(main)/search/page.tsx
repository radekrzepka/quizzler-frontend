import SerachResults from "@/modules/serach/results/search-results";
import type { Lesson } from "@/types/lesson";
import type { UserInfo } from "@/types/user-info";
import getJWT from "@/utils/get-server-jwt";
import { notFound } from "next/navigation";

export interface ApiResponse {
   users: Array<UserInfo>;
   lessons: Array<Lesson>;
}

const getSearchedResults = async (query: string) => {
   const JWT = getJWT();

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/${query}`,
      { headers: { Authorization: JWT || "" } }
   );

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as ApiResponse;

   return data;
};

const Page = async ({
   searchParams,
}: {
   searchParams: Record<string, string | Array<string> | undefined>;
}) => {
   const query = searchParams.query;
   if (typeof query !== "string") return notFound();

   const results = await getSearchedResults(query);

   return <SerachResults results={results} query={query} />;
};

export default Page;

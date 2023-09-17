import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
   const headersList = headers();
   const JWT = headersList.get("authorization");

   console.log(request.body);

   const res = await fetch(`${process.env.API_URL}/lesson/add`, {
      headers: {
         Accept: "text/plain",
         Authorization: JWT as string,
      },
      method: "POST",
      body: request.body,
   });

   const data = await res.json();

   return NextResponse.json(
      { token: data, status: res.status },
      { status: res.status },
   );
}

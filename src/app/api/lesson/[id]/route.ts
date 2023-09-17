import { NextResponse } from "next/server";

export async function GET(
   request: Request,
   { params }: { params: { id: string } },
) {
   const JWT = request.headers.get("authorization");
   console.log(`${process.env.API_URL}/lesson/${params.id}`);

   const res = await fetch(`${process.env.API_URL}/lesson/${params.id}`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: JWT as string,
      },
      method: "GET",
   });

   const data = await res.json();

   return NextResponse.json(data, { status: res.status });
}

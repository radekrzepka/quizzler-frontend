import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
   const requestBody = await request.json();
   const JWT = request.headers.get("authorization");

   const res = await fetch(`${process.env.API_URL}/user/updateAvatar`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: JWT as string,
      },
      method: "PATCH",
      body: JSON.stringify(requestBody),
   });

   const responseData = await res.json();

   return NextResponse.json({
      status: res.status,
      message: responseData,
   });
}

import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
   const requestBody = await request.json();

   const JWT = request.headers.get("authorization");

   const res = await fetch(
      `${process.env.API_URL}/user/delete?userPassword=${requestBody.password}`,
      {
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT as string}`,
         },
         method: "DELETE",
         body: JSON.stringify(requestBody),
      },
   );

   const responseData = await res.json();

   return NextResponse.json({
      status: res.status,
   });
}

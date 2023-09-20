import { NextResponse } from "next/server";

async function handleRequest(
   request: Request,
   { params }: { params: { url: string[] } },
   method: string,
) {
   const bodyBuffer = await request.arrayBuffer();
   const endpointUrl = params.url.join("/");

   const res = await fetch(`${process.env.API_URL}/${endpointUrl}`, {
      headers: request.headers,
      method,
      body: bodyBuffer.byteLength > 0 ? bodyBuffer : null,
   });

   try {
      const data = await res.json();
      return NextResponse.json(
         { data },
         { status: res.status },
      );
   } catch {
      return NextResponse.json({}, { status: res.status });
   }
}

export const POST = (request: Request, params: { params: { url: string[] } }) =>
   handleRequest(request, params, "POST");

export const GET = (request: Request, params: { params: { url: string[] } }) =>
   handleRequest(request, params, "GET");

export const PATCH = (
   request: Request,
   params: { params: { url: string[] } },
) => handleRequest(request, params, "PATCH");

export const DELETE = (
   request: Request,
   params: { params: { url: string[] } },
) => handleRequest(request, params, "DELETE");

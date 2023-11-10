import { NextResponse } from "next/server";

async function handleRequest<T>(
   request: Request,
   { params }: { params: { url: Array<string> } },
   method: string
) {
   const bodyBuffer = await request.arrayBuffer();
   const endpointUrl = params.url.join("/");

   const parsedUrl = new URL(request.url || "");

   const res = await fetch(
      `${process.env.API_URL}/${endpointUrl}${parsedUrl.search}`,
      {
         headers: request.headers,
         method,
         body: bodyBuffer.byteLength > 0 ? bodyBuffer : null,
      }
   );

   try {
      const data = (await res.json()) as T;
      return NextResponse.json({ data, status: res.status });
   } catch {
      return NextResponse.json({ status: res.status });
   }
}

export const POST = (
   request: Request,
   params: { params: { url: Array<string> } }
) => handleRequest(request, params, "POST");

export const GET = (
   request: Request,
   params: { params: { url: Array<string> } }
) => handleRequest(request, params, "GET");

export const PATCH = (
   request: Request,
   params: { params: { url: Array<string> } }
) => handleRequest(request, params, "PATCH");

export const DELETE = (
   request: Request,
   params: { params: { url: Array<string> } }
) => handleRequest(request, params, "DELETE");

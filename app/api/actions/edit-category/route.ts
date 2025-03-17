import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const access_token = (await cookies()).get("access_token")?.value;
  if (!access_token) NextResponse.json({ error: { message: "Unauthorized." } }, { status: 404 });
  try {
    const body = await req.json();
    const body2 = { ...body };
    delete body2.oldCategoryName;
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/edit-category/${body.oldCategoryName}`,
      {
        method: "PATCH",
        body: JSON.stringify(body2),
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const data = await backendResponse.json();
    if (!backendResponse.ok) {
      return NextResponse.json({ error: data }, { status: backendResponse.status });
    }
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

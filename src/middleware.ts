import { NextRequest, NextResponse } from "next/server";
import { verify } from "./auth/token/jwt";

const CHAT_PAGE = "/chat";
const LOGIN_PAGE = "/";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("middleware", pathname);

  const token = request.cookies.get("token")?.value;
  if (pathname.startsWith(CHAT_PAGE)) {
    if (!token) return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:id?", "/"],
};

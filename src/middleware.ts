import { NextRequest, NextResponse } from "next/server";

const CHAT_PAGE = "/chat";
const LOGIN_PAGE = "/";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("middleware: ", pathname);

  const cookies = request.cookies;
  const token = cookies.get("token");

  if (pathname.startsWith(CHAT_PAGE) && !token) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
  }
}

export const config = {
  matcher: ["/chat/:id?", "/"],
};

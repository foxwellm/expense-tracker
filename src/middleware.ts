import { type NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/utils/supabase/middleware";

const PUBLIC_PATHS = ["/", "/signup"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (publicPath) =>
      pathname === publicPath || pathname.startsWith(`${publicPath}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths through
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

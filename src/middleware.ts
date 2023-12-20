import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase-type";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = new URL(req.url);
  if (!user && pathname !== "/sign-in" && pathname !== "/") {
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${encodeURIComponent(pathname)}`, req.url)
    );
  }
  if (user) {
    if (
      user.user_metadata.type === "leader" &&
      pathname !== "/office/dashboard" &&
      pathname !== "/office/staffs" &&
      pathname !== "/office/new-staff" &&
      pathname !== "/office/orders" &&
      pathname !== "/office/transfers" &&
      pathname !== "/office/central-hub" &&
      pathname !== "/office/hub" &&
      pathname !== "/"
    ) {
      return NextResponse.redirect(new URL(`/office/dashboard`, req.url));
    } else if (
      user.user_metadata.type === "tk_admin" &&
      pathname !== "/office/transfers" &&
      pathname !== "/" &&
      pathname !== "/office/new-staff" &&
      pathname !== "/office/staffs"
    ) {
      return NextResponse.redirect(new URL(`/office/transfers`, req.url));
    } else if (
      user.user_metadata.type === "gd_admin" &&
      pathname !== "/office/transfers" &&
      pathname !== "/office/orders" &&
      pathname !== "/" &&
      pathname !== "/office/new-staff" &&
      pathname !== "/office/staffs"
    ) {
      return NextResponse.redirect(new URL(`/office/orders`, req.url));
    } else if (
      user.user_metadata.type === "tk_staff" &&
      pathname !== "/office/new-transfer" &&
      pathname !== "/office/transfers" &&
      pathname !== "/"
    ) {
      return NextResponse.redirect(new URL(`/office/transfers`, req.url));
    } else if (
      user.user_metadata.type === "gd_staff" &&
      pathname !== "/office/new-transfer" &&
      pathname !== "/office/transfers" &&
      pathname !== "/office/new-order" &&
      pathname !== "/office/orders" &&
      pathname !== "/"
    ) {
      return NextResponse.redirect(new URL(`/office/orders`, req.url));
    }
  }
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};

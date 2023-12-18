import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase-type";

export async function middleware(req: NextRequest) {
  // const res = NextResponse.next();
  // const supabase = createMiddlewareClient<Database>({ req, res });
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // const { pathname } = new URL(req.url);
  // if (!user && pathname !== "/sign-in" && pathname !== "/") {
  //   return NextResponse.redirect(
  //     new URL(`/sign-in?redirect=${encodeURIComponent(pathname)}`, req.url)
  //   );
  // }
  // if (user) {
  //   if (
  //     (user.user_metadata.type === "leader" ||
  //       user.user_metadata.type === "gd_admin" ||
  //       user.user_metadata.type === "tk_admin") &&
  //     pathname !== "/office/dashboard" &&
  //     pathname !== "/office/staff" &&
  //     pathname !== "/office/new-staff" &&
  //     pathname !== "/office/orders" &&
  //     pathname !== "/office/transfers" &&
  //     pathname !== "/"
  //   ) {
  //     if (
  //       user.user_metadata.type === "tk_admin" &&
  //       pathname === "/office/orders"
  //     ) {
  //       return NextResponse.redirect(new URL(`/office/transfers`, req.url));
  //     }
  //     return NextResponse.redirect(new URL(`/office/dashboard`, req.url));
  //   } else if (
  //     user.user_metadata.type === "tk_staff" &&
  //     pathname !== "/office/new-transfer" &&
  //     pathname !== "/office/transfers" &&
  //     pathname !== "/"
  //   ) {
  //     return NextResponse.redirect(new URL(`/office/transfers`, req.url));
  //   } else if (
  //     // TODO: remove
  //     user.user_metadata.type === "gd_staff" &&
  //     pathname !== "/office/new-transfer" &&
  //     pathname !== "/office/transfers" &&
  //     pathname !== "/office/new-order" &&
  //     pathname !== "/office/orders" &&
  //     pathname !== "/"
  //   ) {
  //     console.log(pathname);
  //     return NextResponse.redirect(new URL(`/office/orders`, req.url));
  //   }
  // }
  // await supabase.auth.getSession();
  // return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};

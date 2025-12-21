import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { services } from "@/data/services";

export default async function proxy(request: NextRequest) {
    try {
        const user = await services.auth.getProfile();

        if (!user.success || !user.data) {
            const signInUrl = new URL("/signin", request.url);
            signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
            return NextResponse.redirect(signInUrl);
        }

        return NextResponse.next();

    } catch (err) {
        console.error("Proxy authentication error:", err);
        return NextResponse.redirect(new URL("/signin", request.url));
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
    ],
};
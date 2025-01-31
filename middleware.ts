import { auth } from "./src/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  function isProtectedRoute(pathname: string) {
    const protectedPaths = [
      "/user",
      "/worker",
      "/inventory",
      "/lot",
      "/cart",
      "/order",
      "/warehouse",
      "/marketing",
      "/delivery",
    ]

    return protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))
  }

  // If the user is not logged in and trying to access any protected route, redirect to login screen
  if (!isLoggedIn && isProtectedRoute(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }


  return NextResponse.next()
})



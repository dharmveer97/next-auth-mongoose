"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import type React from "react"
import { HeroUIProvider } from '@heroui/react';

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <HeroUIProvider>
      <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
    </HeroUIProvider>
  )

}


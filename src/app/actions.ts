"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "../lib/auth";

// import connectDatabase from '../graphql/utils/mongoose';

// await connectDatabase();

interface SignInValues {
  email: string;
  password: string;
}

interface SignInResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function handleCredentialsSignIn(
  values: SignInValues,
): Promise<SignInResponse> {
  const { email, password } = values;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: true,
      message: "Authentication successful",
    };
  } catch {
    return { success: false, error: "Authentication failed" };
  }
}

export async function handleGoogleSignIn() {
  await signIn("google");
}

export async function handleLogout() {
  await signOut().then(() => {
    redirect("/auth/login");
  });
}

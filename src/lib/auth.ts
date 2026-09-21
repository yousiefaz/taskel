import { auth } from "@/auth";

import { UnauthorizedError } from "@/lib/errors";

export async function getCurrentUser() {
  const session = await auth();

  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new UnauthorizedError();
  }

  return user;
}

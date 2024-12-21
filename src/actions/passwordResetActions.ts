"use server";

export async function sendPasswordResetEmail(email: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { error: null };
  } catch {
    return { error: "An unexpected error occured" };
  }
}

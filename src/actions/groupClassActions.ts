"use server";

export async function createClass(formData: FormData) {
  try {
    console.log(Object.fromEntries(formData));
    return { error: "null" };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

"use server";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ email, password });
  return { error: "Invalid email and password combination" };
}

export async function signup(formData: FormData) {
  const userData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  console.log(userData);
  return { error: "User with email already exists" };
}

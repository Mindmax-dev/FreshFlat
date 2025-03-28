import signUpUser, { signInUser } from "@/model/user";

export async function signUpUserController(email, password, username) {
  return await signUpUser(email, password, username);
}
export async function signInUserController(email, password) {
  return await signInUser(email, password);
}
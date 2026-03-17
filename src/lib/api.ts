import { RegistrationForm } from "./schemas";

export async function submitRegistration(data: RegistrationForm) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Submitting payload: ", data);
      // 25% chance of falling
      if (Math.random() < 0.25) {
        reject(new Error("500 Internal Server Error"));
      } else {
        resolve({ success: true, message: "Registration successful" });
      }
    }, 4000); // 4 seconds delay
  });
}

import { auth } from "@lib/auth.js";

const password = "1234";

async function seed() {
  await auth.api.signUpEmail({
    body: {
      name: "Admin User",
      email: "admin@cmu.com",
      password: password,
      image: "logos/robot.png",
    },
  });

  await auth.api.signUpEmail({
    body: {
      name: "Regular User",
      email: "user@cmu.com",
      password: password,
      image: "logos/robot.png",
    },
  });

  // If I seed this account, I don't get GitHub avatar when I use OAuth.
  //   await auth.api.signUpEmail({
  //     body: {
  //       name: "Nirand Pisutha-Arnond",
  //       email: "nnnpooh@gmail.com",
  //       password: password,
  //     },
  //   });
}

seed();

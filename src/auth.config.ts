import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/loginSchema";
import { compare } from "bcryptjs";
import { getUserByEmail } from "./app/actions/authActions";

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);
          if (!user || !(await compare(password, user.passwordHash))) {
            return null;
          }
          console.log(user);
          return { ...user, name: user.username };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

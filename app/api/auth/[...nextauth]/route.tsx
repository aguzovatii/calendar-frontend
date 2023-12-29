import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "signin",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
      ): Promise<User | null> {
        if (credentials === undefined) {
          return new Promise((resolve) => {
            resolve(null);
          });
        }
        return await fetch(
          process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          },
        )
          .then((response) => {
            return response.ok ? response.json() : { token: "" };
          })
          .then((jwt: { token: string }) => {
            if (jwt.token.length === 0) {
              return null;
            }

            return {
              id: credentials.username,
              jwt: jwt.token,
              name: credentials.username,
            };
          });
      },
    }),
    CredentialsProvider({
      id: "signup",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        timeZone: { label: "TimeZone", type: "text" },
      },
      async authorize(
        credentials:
          | Record<"username" | "password" | "timeZone", string>
          | undefined,
      ): Promise<User | null> {
        if (credentials === undefined) {
          return new Promise((resolve) => {
            resolve(null);
          });
        }
        return await fetch(
          process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/user",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
              time_zone: credentials.timeZone,
            }),
          },
        )
          .then((response) => {
            return response.ok ? response.json() : { token: "" };
          })
          .then((jwt: { token: string }) => {
            if (jwt.token.length === 0) {
              return null;
            }

            return {
              id: credentials.username,
              jwt: jwt.token,
              name: credentials.username,
            };
          });
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.accessToken = user.jwt;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

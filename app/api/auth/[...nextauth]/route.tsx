import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt/types";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser extends User {
  jwt?: string;
}

interface CustomJWT extends JWT {
  accessToken?: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "signin",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req): Promise<CustomUser> {
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
          .then((jwt) => {
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
      },
      async authorize(credentials, _req): Promise<CustomUser> {
        return await fetch(
          process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/user",
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
          .then((jwt) => {
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
    async jwt({ token, user }: { token: CustomJWT; user: CustomUser }) {
      if (user) {
        token.accessToken = user.jwt;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: CustomJWT }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

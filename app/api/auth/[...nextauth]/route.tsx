import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        age: {label: "Age", type: "text"}
      },
      async authorize(credentials, req) {
        const res = {ok: true};
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };

        console.log("Am ajuns:" + credentials);

        if (res.ok && user) {
          return user
        }

        return null
      },
    })
  ],
});

export { handler as GET, handler as POST };


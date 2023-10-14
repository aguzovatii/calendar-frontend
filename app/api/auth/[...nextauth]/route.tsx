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

        const res = await fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        console.log("Am ajuns:" + res);

        if (res.ok) {
          console.log("Am ajuns body:" + res.json);
          return {name: credentials.username, jwt: res.json}
        }

        return null
      },
    })
  ],
});

export { handler as GET, handler as POST };


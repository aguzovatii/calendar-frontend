import NextAuth, { User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

interface CustomUser extends User {
  jwt: string,
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        age: {label: "Age", type: "text"}
      },
      async authorize(credentials, _req):Promise<CustomUser> {

        const jwt: string = await fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        }).then((response) => {
          return response.ok ? response.json() : '';
        });

        if (jwt.length !== 0) {
          console.log("Am ajuns body:" + jwt);
          return {id: credentials.username, jwt: jwt}
        }

        return null
      },
    })
  ],
});

export { handler as GET, handler as POST };


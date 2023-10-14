import NextAuth, { Session, User} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"

interface CustomUser extends User {
  jwt: string,
}

interface CustomSession extends Session {
  accessToken: string,
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
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
          return {id: credentials.username + "abc", jwt: jwt.token, name: credentials.username}
        }

        return null
      },
    })
  ],

  callbacks:{
    async jwt({ token, account, profile, user} : {token: any, account:any, profile: any, user: CustomUser}) {
      if (user) {
        token.accessToken = user.jwt
      }
      console.log("profile: " +  JSON.stringify(profile));
      console.log("account: " + JSON.stringify(account));
      console.log("token: " + JSON.stringify(token));
      console.log("user: " + JSON.stringify(user));

      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      //session.user.id = token.id
      
      console.log("session: " +  JSON.stringify(session));
      console.log("user: " + JSON.stringify(user));
      console.log("token: " + JSON.stringify(token));

      return session
    },
  },
});

export { handler as GET, handler as POST };


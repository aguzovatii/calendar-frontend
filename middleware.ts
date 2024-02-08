import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/welcome',
  }
})

export const config = { matcher: ['/((?!welcome|auth/signin|auth/signup).*)'] }


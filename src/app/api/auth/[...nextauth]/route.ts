import NextAuth from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || '',
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      // profile(profile: GithubProfile) {
      //   console.log(profile)
      //   return profile
      // }
    })
  ],
  callbacks: {
    async signIn({user, account}) {
      console.log({user, account})
      return true
    }
  }
})

export { handler as GET, handler as POST }
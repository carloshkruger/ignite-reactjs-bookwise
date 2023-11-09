import { prismaClient } from "@/lib/prismaClient"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  secret: process.env.NEXTAUTH_SECRET || '',
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      profile(profile: GithubProfile) {
        return {
          id: String(profile.id),
          email: profile.email,
          name: profile.name,
          avatarUrl: profile.avatar_url
        }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          image: (user as any).avatarUrl
        }
      }
    }
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
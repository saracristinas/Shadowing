import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/pt/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.sub = user.id;
        token.picture = user.image;
      }
      // Quando loga com Google, pega a foto do profile
      if (profile?.picture) {
        token.picture = profile.picture;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Redirecionar para /platform após login
      if (url === baseUrl || url.includes('/login') || url.includes('/signup')) {
        return `${baseUrl}/platform`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
})

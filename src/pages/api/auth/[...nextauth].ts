import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/server/config/mongoose";
import User from "@/server/models/User";

// Export authOptions so other server code (getServerSession) can import the exact same options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) return null;

        // use async compare to avoid blocking the event loop
        const match = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!match) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
    updateAge: 10 * 60, // 10 minutes
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id ?? token.id;
        token.email = (user as any).email ?? token.email;
        token.name = (user as any).name ?? token.name;
        token.role = (user as any).role ?? token.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).id = token.id;
        (session as any).email = token.email;
        (session as any).name = token.name;
        (session as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/abcd-login-1234@admin", // custom admin login route
  },

  // Cookie options: NextAuth will manage CSRF tokens & cookie signing.
  // Keep secure:true in production and prefer SameSite='Lax' unless you really need cross-site cookies.
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // For most apps, 'Lax' is safer. Use 'None' only if cross-site contexts require it and secure is true.
        sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
        path: "/",
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

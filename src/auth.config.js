// Edge-safe NextAuth config (no DB or bcrypt imports — safe for middleware)
const authConfig = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  providers: [], // Credentials provider added in src/auth.js (Node runtime only)
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default authConfig;

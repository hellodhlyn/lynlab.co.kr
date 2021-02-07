import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      return user.id === process.env.GOOGLE_ALLOWED_USER_ID;
    },
    async session(session, token) {
      // TODO - fetch and set lynlab access token on this stage
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);

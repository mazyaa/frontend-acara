import environment from "@/config/env";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authServices from "@/services/auth.service";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";

export default NextAuth({
  // set session options
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },

  // set secret for JWT
  secret: environment.AUTH_SECRET,

  // set providers for authentication
  providers: [
    // Credentials provider for username and password login (local authentication) and more providers like Google, Facebook, etc. can be added here
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "passowrd" },
      },

      // authorize function to handle login
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        const result = await authServices.login({
          identifier,
          password,
        });

        // If the login is successful, retrieve the access token
        const accessToken = result.data.data;

        // If the access token is available, fetch the user profile
        const me = await authServices.getProfileWithToken(accessToken);

        // If the user profile is successfully retrieved, return the user object
        const user = me.data.data;

        // Check if the access token and user profile are valid
        // If valid, attach the access token to the user object
        if (
          accessToken &&
          result.status === 200 &&
          user._id &&
          me.status === 200
        ) {
          user.accessToken = accessToken;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  // set callbacks for JWT and session
  callbacks: {
    // Handle JWT token creation and update
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    // Handle session creation and update
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});

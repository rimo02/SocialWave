import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      username: string;
      bio?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    bio?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      username: string;
      bio?: string;
    };
  }
}

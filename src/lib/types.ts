// types.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }
}

export type codeObjectType = {
  id: string;
  userId: string;
  userPrompt: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

// types/user.ts
export interface User {
  name: string;
  email: string;
  image?: string; // Optional property
}

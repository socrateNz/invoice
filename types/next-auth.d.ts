import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      organizationId: string | null;
      role: string | null;
      systemRole: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    organizationId?: string | null;
    role?: string | null;
    systemRole: string;
  }
}

"use server";

import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";
import type { User } from "@/functions/create-user";

export type Session = {
  user: User | null;
};

const getSession = async (): Promise<IronSession<Session>> => {
  return await getIronSession<Session>(await cookies(), {
    cookieName: "sid",
    password: process.env.COOKIE_PASSWORD as string,
  });
};

export default getSession;

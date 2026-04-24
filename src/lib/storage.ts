import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import type { PrismaClient } from "@prisma/client";

export class StateStore implements NodeSavedStateStore {
  constructor(private prisma: PrismaClient) {}

  async get(key: string): Promise<NodeSavedState | undefined> {
    const authState = await this.prisma.authState.findFirst({
      where: {
        key,
      },
    });

    if (!authState) {
      return;
    }

    return JSON.parse(authState.state) as NodeSavedState;
  }

  async set(key: string, val: NodeSavedState) {
    const state = JSON.stringify(val);

    await this.prisma.authState.upsert({
      where: {
        key,
      },
      update: {
        state,
      },
      create: {
        key,
        state,
      },
    });
  }

  async del(key: string) {
    await this.prisma.authState.delete({
      where: {
        key,
      },
    });
  }
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private prisma: PrismaClient) {}

  async get(key: string): Promise<NodeSavedSession | undefined> {
    const authSession = await this.prisma.authSession.findFirst({
      where: {
        key,
      },
    });

    if (!authSession) {
      return;
    }

    return JSON.parse(authSession.session) as NodeSavedSession;
  }

  async set(key: string, val: NodeSavedSession) {
    const session = JSON.stringify(val);

    await this.prisma.authSession.upsert({
      where: {
        key,
      },
      update: {
        session,
      },
      create: {
        key,
        session,
      },
    });
  }

  async del(key: string) {
    await this.prisma.authSession.delete({
      where: {
        key,
      },
    });
  }
}

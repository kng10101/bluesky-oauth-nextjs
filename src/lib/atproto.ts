import {
  NodeOAuthClient,
  type OAuthClientMetadataInput,
} from "@atproto/oauth-client-node";
import type { PrismaClient } from "@prisma/client";
import { SessionStore, StateStore } from "@/lib/storage";

export function blueskyClientMetadata(): OAuthClientMetadataInput {
  const baseUrl: string = process.env.NEXT_PUBLIC_URL as string;

  return {
    client_name: "Project Name",
    client_id: `${baseUrl}/client-metadata.json`,
    client_uri: `${baseUrl}`,
    redirect_uris: [`${baseUrl}/oauth/callback`],
    policy_uri: `${baseUrl}/policy`,
    tos_uri: `${baseUrl}/tos`,
    scope: "atproto transition:generic",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    application_type: "web",
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true,
  };
}

const createBlueskyClient = async (
  prisma: PrismaClient,
): Promise<NodeOAuthClient> =>
  new NodeOAuthClient({
    clientMetadata: blueskyClientMetadata(),
    stateStore: new StateStore(prisma),
    sessionStore: new SessionStore(prisma),
  });

export default createBlueskyClient;

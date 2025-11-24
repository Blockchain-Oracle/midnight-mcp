/**
 * Mock Data for Identus MCP Server
 *
 * Provides realistic mock DIDs and credentials for testing without
 * requiring actual Hyperledger Identus SDK initialization.
 *
 * Based on Identus SDK v6.6.0 and W3C DID Core 1.0 specification.
 */

/**
 * Enable mock mode (set to false to use real Identus SDK)
 */
export const MOCK_MODE = process.env.IDENTUS_MOCK_MODE !== 'false';

/**
 * Mock Peer DIDs (did:peer:2.* format)
 *
 * Format: did:peer:2.<base58btc-encoded-multibase-multicodec-key>
 * - numalgo: 2 (multiple inception keys without doc)
 * - Keys: ED25519 (auth) + X25519 (key agreement)
 */
export const MOCK_DIDS = {
  AGENT_1: {
    did: 'did:peer:2.Ez6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc',
    agentId: 'agent-1',
    name: 'Alice',
    created: '2024-11-24T00:00:00Z',
    keyTypes: ['ED25519', 'X25519'],
    publicKeys: {
      auth: 'z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK',
      keyAgreement: 'z6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc',
    },
  },
  AGENT_2: {
    did: 'did:peer:2.Ez6LSghwSE437wnDE1pt3X6hVDUQzSjsHzinpX3XFvMjRAm7y',
    agentId: 'agent-2',
    name: 'Bob',
    created: '2024-11-24T01:00:00Z',
    keyTypes: ['ED25519', 'X25519'],
    publicKeys: {
      auth: 'z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH',
      keyAgreement: 'z6LSghwSE437wnDE1pt3X6hVDUQzSjsHzinpX3XFvMjRAm7y',
    },
  },
  AGENT_3: {
    did: 'did:peer:2.Ez6LSoMdmJz8HJBcRDLSPYhzj4FpFmPJRkEpLfPEYRotKcezL',
    agentId: 'agent-3',
    name: 'Charlie',
    created: '2024-11-24T02:00:00Z',
    keyTypes: ['ED25519', 'X25519'],
    publicKeys: {
      auth: 'z6MkrJVnaZkeFzdQyMZjqSBvBzMpvhjHofV6Ys4zVcBDQBJT',
      keyAgreement: 'z6LSoMdmJz8HJBcRDLSPYhzj4FpFmPJRkEpLfPEYRotKcezL',
    },
  },
};

/**
 * Mock DID Documents (W3C DID Core 1.0 format)
 */
export const MOCK_DID_DOCUMENTS = {
  [MOCK_DIDS.AGENT_1.did]: {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1',
      'https://w3id.org/security/suites/x25519-2020/v1',
    ],
    id: MOCK_DIDS.AGENT_1.did,
    verificationMethod: [
      {
        id: `${MOCK_DIDS.AGENT_1.did}#key-1`,
        type: 'Ed25519VerificationKey2020',
        controller: MOCK_DIDS.AGENT_1.did,
        publicKeyMultibase: MOCK_DIDS.AGENT_1.publicKeys.auth,
      },
      {
        id: `${MOCK_DIDS.AGENT_1.did}#key-2`,
        type: 'X25519KeyAgreementKey2020',
        controller: MOCK_DIDS.AGENT_1.did,
        publicKeyMultibase: MOCK_DIDS.AGENT_1.publicKeys.keyAgreement,
      },
    ],
    authentication: [`${MOCK_DIDS.AGENT_1.did}#key-1`],
    keyAgreement: [`${MOCK_DIDS.AGENT_1.did}#key-2`],
  },
  [MOCK_DIDS.AGENT_2.did]: {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1',
      'https://w3id.org/security/suites/x25519-2020/v1',
    ],
    id: MOCK_DIDS.AGENT_2.did,
    verificationMethod: [
      {
        id: `${MOCK_DIDS.AGENT_2.did}#key-1`,
        type: 'Ed25519VerificationKey2020',
        controller: MOCK_DIDS.AGENT_2.did,
        publicKeyMultibase: MOCK_DIDS.AGENT_2.publicKeys.auth,
      },
      {
        id: `${MOCK_DIDS.AGENT_2.did}#key-2`,
        type: 'X25519KeyAgreementKey2020',
        controller: MOCK_DIDS.AGENT_2.did,
        publicKeyMultibase: MOCK_DIDS.AGENT_2.publicKeys.keyAgreement,
      },
    ],
    authentication: [`${MOCK_DIDS.AGENT_2.did}#key-1`],
    keyAgreement: [`${MOCK_DIDS.AGENT_2.did}#key-2`],
  },
  [MOCK_DIDS.AGENT_3.did]: {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1',
      'https://w3id.org/security/suites/x25519-2020/v1',
    ],
    id: MOCK_DIDS.AGENT_3.did,
    verificationMethod: [
      {
        id: `${MOCK_DIDS.AGENT_3.did}#key-1`,
        type: 'Ed25519VerificationKey2020',
        controller: MOCK_DIDS.AGENT_3.did,
        publicKeyMultibase: MOCK_DIDS.AGENT_3.publicKeys.auth,
      },
      {
        id: `${MOCK_DIDS.AGENT_3.did}#key-2`,
        type: 'X25519KeyAgreementKey2020',
        controller: MOCK_DIDS.AGENT_3.did,
        publicKeyMultibase: MOCK_DIDS.AGENT_3.publicKeys.keyAgreement,
      },
    ],
    authentication: [`${MOCK_DIDS.AGENT_3.did}#key-1`],
    keyAgreement: [`${MOCK_DIDS.AGENT_3.did}#key-2`],
  },
};

/**
 * In-memory storage for dynamically created DIDs
 */
export const mockDIDStorage = new Map<string, typeof MOCK_DIDS.AGENT_1>();

/**
 * Initialize mock storage with predefined DIDs
 */
Object.values(MOCK_DIDS).forEach((did) => {
  mockDIDStorage.set(did.agentId, did);
});

/**
 * Helper: Generate mock DID for agent
 */
export function generateMockDID(agentId: string, name?: string) {
  // Generate deterministic mock DID based on agentId
  const hash = Buffer.from(agentId).toString('base64').replace(/[^A-Za-z0-9]/g, '');
  const did = `did:peer:2.Ez6LS${hash}MockDIDFor${agentId}`;

  const mockDID = {
    did,
    agentId,
    name: name || `Agent ${agentId}`,
    created: new Date().toISOString(),
    keyTypes: ['ED25519', 'X25519'] as const,
    publicKeys: {
      auth: `z6Mk${hash}AuthKey`,
      keyAgreement: `z6LS${hash}KeyAgreement`,
    },
  };

  // Store in mock storage
  mockDIDStorage.set(agentId, mockDID);

  return mockDID;
}

/**
 * Helper: Get mock DID by agent ID
 */
export function getMockDIDByAgentId(agentId: string) {
  return mockDIDStorage.get(agentId);
}

/**
 * Helper: Resolve mock DID to DID Document
 */
export function resolveMockDID(did: string) {
  // Check predefined mock DIDs
  const predefinedDoc = MOCK_DID_DOCUMENTS[did];
  if (predefinedDoc) {
    return predefinedDoc;
  }

  // Check dynamically created DIDs
  const entry = Array.from(mockDIDStorage.values()).find((d) => d.did === did);
  if (entry) {
    return {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/ed25519-2020/v1',
        'https://w3id.org/security/suites/x25519-2020/v1',
      ],
      id: entry.did,
      verificationMethod: [
        {
          id: `${entry.did}#key-1`,
          type: 'Ed25519VerificationKey2020',
          controller: entry.did,
          publicKeyMultibase: entry.publicKeys.auth,
        },
        {
          id: `${entry.did}#key-2`,
          type: 'X25519KeyAgreementKey2020',
          controller: entry.did,
          publicKeyMultibase: entry.publicKeys.keyAgreement,
        },
      ],
      authentication: [`${entry.did}#key-1`],
      keyAgreement: [`${entry.did}#key-2`],
    };
  }

  throw new Error(`DID not found: ${did}`);
}

/**
 * Helper: List all mock DIDs
 */
export function listMockDIDs(agentId?: string) {
  const dids = Array.from(mockDIDStorage.values());
  return agentId ? dids.filter((d) => d.agentId === agentId) : dids;
}

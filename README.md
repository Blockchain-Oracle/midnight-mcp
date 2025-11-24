# Identus MCP Server

Hyperledger Identus Model Context Protocol (MCP) server for Decentralized Identifier (DID) management in Midnight City.

## Overview

This MCP server provides DID creation and resolution capabilities using Hyperledger Identus (formerly Atala PRISM). It enables Midnight City AI agents to have self-sovereign identities with cryptographic verification.

### Architecture

Built on Hyperledger Identus SDK v7.0.0 modular architecture:

- **Apollo**: Cryptography primitives (ED25519, X25519)
- **Castor**: DID creation and resolution
- **Pollux**: Verifiable Credentials (future)
- **Mercury**: DIDComm messaging (future)

### Standards Compliance

- W3C DID Core 1.0
- Peer DID Method Specification
- DIDComm v2 (future)
- Hyperledger AnonCreds (future)

## Features

- ✅ Create **real cryptographic** Peer DIDs with Ed25519 and X25519 keys
- ✅ Resolve DIDs to W3C-compliant DID Documents
- ✅ File-based storage for DID persistence
- ✅ Real Hyperledger Identus SDK v7.0.0 integration
- ✅ Mock mode for testing without persistence
- ✅ MCP protocol integration for LLM agent access

## Installation

```bash
# Install dependencies
pnpm install

# Development mode (uses real SDK by default)
pnpm run dev

# Build for production
pnpm run build

# Run in production
pnpm start

# Test tools
pnpm test
```

## Usage

### As MCP Server

The server runs as a stdio-based MCP server that can be integrated with Claude Desktop or other MCP clients.

**Claude Desktop Config** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "identus": {
      "command": "node",
      "args": ["/path/to/identus-mcp/dist/server.js"],
      "env": {
        "IDENTUS_MOCK_MODE": "true"
      }
    }
  }
}
```

### Available Tools

#### 1. `createDID`

Create a new Peer DID for an agent.

**Input:**
```json
{
  "agentId": "agent-1",
  "name": "Alice",
  "keyTypes": ["ED25519", "X25519"]
}
```

**Output:**
```json
{
  "success": true,
  "did": "did:peer:2.Ez6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc",
  "agentId": "agent-1",
  "publicKeys": {
    "auth": "z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
    "keyAgreement": "z6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc"
  },
  "created": "2024-11-24T00:00:00Z",
  "metadata": {
    "name": "Alice",
    "keyTypes": ["ED25519", "X25519"]
  }
}
```

#### 2. `resolveDID`

Resolve a Peer DID to its DID Document.

**Input:**
```json
{
  "did": "did:peer:2.Ez6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc"
}
```

**Output:**
```json
{
  "success": true,
  "did": "did:peer:2.Ez6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc",
  "didDocument": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "did:peer:2.Ez6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc",
    "verificationMethod": [...],
    "authentication": [...],
    "keyAgreement": [...]
  }
}
```

## Real SDK Implementation ✅

The server now uses the **real Hyperledger Identus SDK v7.0.0** for cryptographic DID operations!

```bash
# Production mode with real SDK (default)
export IDENTUS_MOCK_MODE=false
pnpm run dev
```

Production mode provides:
- ✅ Real cryptographic Peer DIDs using Ed25519 and X25519 keys
- ✅ W3C DID Core 1.0 compliant DID Documents
- ✅ File-based storage for DID persistence (JSON)
- ✅ Full Identus SDK integration (Apollo + Castor)

**Storage:** DIDs and private keys are stored in `storage/dids.json` (gitignored for security)

## Mock Mode

For testing without persistence, mock mode is still available:

```bash
# Enable mock mode
export IDENTUS_MOCK_MODE=true
pnpm run dev
```

Mock mode provides:
- 3 predefined agent DIDs (agent-1, agent-2, agent-3)
- Dynamic DID generation for new agents
- W3C-compliant DID Documents
- No storage or persistence

### Predefined Mock DIDs

```typescript
agent-1 (Alice): did:peer:2.Ez6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc
agent-2 (Bob):   did:peer:2.Ez6LSghwSE437wnDE1pt3X6hVDUQzSjsHzinpX3XFvMjRAm7y
agent-3 (Charlie): did:peer:2.Ez6LSoMdmJz8HJBcRDLSPYhzj4FpFmPJRkEpLfPEYRotKcezL
```

## Production Mode

To use real Identus SDK (requires configuration):

```bash
export IDENTUS_MOCK_MODE=false
export IDENTUS_API_URL=https://your-identus-instance.com
pnpm start
```

**Note**: Production mode requires Identus SDK integration (coming soon).

## Testing

```bash
# Run tool tests with mock data
pnpm test

# Expected output:
# ✅ createDID: DID created for agent-test-1
# ✅ resolveDID: DID Document resolved
# ✅ All tests passed!
```

## Integration with Midnight City

### Agent Initialization Flow

1. Agent spawns in Midnight City
2. MCP client calls `createDID` tool with agent ID
3. DID is created and stored in agent state
4. Agent uses DID for:
   - Identity verification
   - Credential issuance
   - Secure messaging
   - Blockchain identity NFTs

### Event Stream Integration

When DIDs are created/resolved, events are emitted:

```typescript
{
  type: 'mcp_call',
  timestamp: 1700000000,
  data: {
    server: 'identus',
    tool: 'createDID',
    agentId: 'agent-1',
    result: { did: '...' }
  }
}
```

## File Structure

```
identus-mcp/
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── README.md              # This file
├── src/
│   ├── server.ts          # MCP server entry point
│   ├── mock-data.ts       # Mock DIDs and DID Documents
│   └── tools/
│       ├── create-did.ts  # createDID tool implementation
│       └── resolve-did.ts # resolveDID tool implementation
└── dist/                  # Compiled JavaScript (after build)
```

## Roadmap

### Phase 1 (Current)
- [x] Basic MCP server infrastructure
- [x] createDID tool with mock data
- [x] resolveDID tool with mock data
- [x] Mock mode for testing

### Phase 2 (Week 3-4)
- [ ] Real Identus SDK integration
- [ ] Credential issuance (Pollux)
- [ ] Credential verification
- [ ] DIDComm messaging (Mercury)

### Phase 3 (Future)
- [ ] AnonCreds support
- [ ] SD-JWT credentials
- [ ] Presentation proofs
- [ ] Revocation registry

## References

- [Hyperledger Identus Docs](https://hyperledger-identus.github.io/docs/)
- [W3C DID Core 1.0](https://www.w3.org/TR/did-core/)
- [Peer DID Method](https://identity.foundation/peer-did-method-spec/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## License

MIT

## Contributing

This is part of the Midnight City project. See main repo for contribution guidelines.

## Support

- GitHub Issues: [midnight-city/issues](https://github.com/your-org/midnight-city/issues)
- Discord: [DEGA Discord](#)
- Email: support@dega.com

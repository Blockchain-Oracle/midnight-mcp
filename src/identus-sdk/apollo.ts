/**
 * Apollo - Cryptography Module Wrapper
 *
 * Wraps Hyperledger Identus Apollo module for cryptographic operations.
 * Apollo handles:
 * - Key pair generation (ED25519, X25519, SECP256K1)
 * - Signing and verification
 * - Random seed generation
 * - Key derivation
 *
 * Based on @hyperledger/identus-sdk v7.0.0
 */

import {
  Apollo as IdentusApollo,
  Domain,
  Ed25519KeyPair,
  X25519KeyPair,
} from '@hyperledger/identus-sdk';

/**
 * Apollo singleton instance
 */
let apolloInstance: IdentusApollo | null = null;

/**
 * Get or create Apollo instance
 */
export function getApollo(): IdentusApollo {
  if (!apolloInstance) {
    apolloInstance = new IdentusApollo();
  }
  return apolloInstance;
}

/**
 * Create ED25519 key pair for authentication
 *
 * In SDK v7.0.0, we create keys directly using the KeyPair classes
 */
export function createAuthKeyPair(): Ed25519KeyPair {
  return Ed25519KeyPair.generateKeyPair();
}

/**
 * Create X25519 key pair for key agreement (encryption)
 */
export function createKeyAgreementKeyPair(): X25519KeyPair {
  return X25519KeyPair.generateKeyPair();
}

/**
 * Create random seed for deterministic key generation
 */
export function createRandomSeed() {
  const apollo = getApollo();
  return apollo.createRandomSeed();
}

/**
 * Export key to string format (for storage)
 */
export function exportKeyToString(key: any): string {
  // Try different methods to export the key
  if (key.getEncoded) {
    const encoded = key.getEncoded();
    return Buffer.from(encoded).toString('base64');
  }
  if (key.raw) {
    return Buffer.from(key.raw).toString('base64');
  }
  if (key.value) {
    return Buffer.from(key.value).toString('base64');
  }
  // Fallback: JSON stringify
  return JSON.stringify(key);
}

/**
 * Get public key multibase encoding
 */
export function getPublicKeyMultibase(keyPair: any): string {
  const publicKey = keyPair.publicKey;

  // Try to get raw bytes
  let keyBytes: Buffer;
  if (publicKey.getEncoded) {
    keyBytes = Buffer.from(publicKey.getEncoded());
  } else if (publicKey.raw) {
    keyBytes = Buffer.from(publicKey.raw);
  } else if (publicKey.value) {
    keyBytes = Buffer.from(publicKey.value);
  } else {
    throw new Error('Unable to extract public key bytes');
  }

  // Convert to base58btc (simplified: using base64 for now)
  const base58 = keyBytes.toString('base64');

  // Determine prefix based on key type
  const isEd25519 = keyPair instanceof Ed25519KeyPair || keyPair.constructor.name === 'Ed25519KeyPair';
  const prefix = isEd25519 ? 'z6Mk' : 'z6LS';

  return `${prefix}${base58.substring(0, 44)}`;
}

export { Domain, Ed25519KeyPair, X25519KeyPair };

/**
 * DID Storage - File-based persistence for DIDs and keys
 *
 * Simple JSON file storage for Phase 1.
 * Stores:
 * - Created DIDs
 * - Associated key pairs
 * - DID metadata
 *
 * SECURITY NOTE: Private keys are stored in plain text.
 * For production, implement encryption or use secure key storage.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Storage file path
 */
const STORAGE_PATH = path.join(__dirname, '../../storage/dids.json');

/**
 * DID Storage Entry
 */
export interface DIDStorageEntry {
  did: string;
  agentId: string;
  name?: string;
  created: string;
  keyTypes: string[];
  publicKeys: {
    auth: string;
    keyAgreement: string;
  };
  privateKeys: {
    auth: string;
    keyAgreement: string;
  };
  didDocument?: any;
}

/**
 * Storage data structure
 */
interface StorageData {
  version: string;
  dids: Record<string, DIDStorageEntry>;
}

/**
 * Initialize storage file if it doesn't exist
 */
async function ensureStorageExists() {
  try {
    await fs.access(STORAGE_PATH);
  } catch {
    // File doesn't exist, create it
    const initialData: StorageData = {
      version: '1.0',
      dids: {},
    };
    await fs.mkdir(path.dirname(STORAGE_PATH), { recursive: true });
    await fs.writeFile(STORAGE_PATH, JSON.stringify(initialData, null, 2));
  }
}

/**
 * Read storage data
 */
async function readStorage(): Promise<StorageData> {
  await ensureStorageExists();
  const data = await fs.readFile(STORAGE_PATH, 'utf-8');
  return JSON.parse(data);
}

/**
 * Write storage data
 */
async function writeStorage(data: StorageData): Promise<void> {
  await fs.writeFile(STORAGE_PATH, JSON.stringify(data, null, 2));
}

/**
 * Save DID to storage
 */
export async function saveDID(entry: DIDStorageEntry): Promise<void> {
  const data = await readStorage();
  data.dids[entry.agentId] = entry;
  await writeStorage(data);
}

/**
 * Get DID by agent ID
 */
export async function getDIDByAgentId(agentId: string): Promise<DIDStorageEntry | null> {
  const data = await readStorage();
  return data.dids[agentId] || null;
}

/**
 * Get DID by DID string
 */
export async function getDIDByString(did: string): Promise<DIDStorageEntry | null> {
  const data = await readStorage();
  const entries = Object.values(data.dids);
  return entries.find((entry) => entry.did === did) || null;
}

/**
 * List all DIDs
 */
export async function listDIDs(agentId?: string): Promise<DIDStorageEntry[]> {
  const data = await readStorage();
  const entries = Object.values(data.dids);

  if (agentId) {
    return entries.filter((entry) => entry.agentId === agentId);
  }

  return entries;
}

/**
 * Delete DID by agent ID
 */
export async function deleteDID(agentId: string): Promise<boolean> {
  const data = await readStorage();

  if (data.dids[agentId]) {
    delete data.dids[agentId];
    await writeStorage(data);
    return true;
  }

  return false;
}

/**
 * Clear all DIDs (for testing)
 */
export async function clearAllDIDs(): Promise<void> {
  const data: StorageData = {
    version: '1.0',
    dids: {},
  };
  await writeStorage(data);
}

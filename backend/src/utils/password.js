import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;
const SCHEME = 'scrypt';

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, KEY_LENGTH).toString('hex');
  return `${SCHEME}:${salt}:${derivedKey}`;
}

export function verifyPassword(password, storedHash) {
  const [scheme, salt, hash] = String(storedHash ?? '').split(':');
  if (scheme !== SCHEME || !salt || !hash) return false;

  const derivedKey = scryptSync(password, salt, KEY_LENGTH);
  const expected = Buffer.from(hash, 'hex');

  return derivedKey.length === expected.length && timingSafeEqual(derivedKey, expected);
}

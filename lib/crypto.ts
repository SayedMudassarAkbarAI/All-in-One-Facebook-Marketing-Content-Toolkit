import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits for GCM
const TAG_LENGTH = 16; // 128 bits auth tag

function getSecretKey(): Buffer {
  const secret = process.env.ENCRYPTION_SECRET_KEY || "default_fallback_secret_32bytes_len!";
  return crypto.createHash("sha256").update(secret).digest();
}

/**
 * Encrypts a plaintext string (e.g. Meta User or Page Access Token) using AES-256-GCM.
 * Output format: base64(iv + authTag + ciphertext)
 */
export function encryptToken(plainText: string): string {
  if (!plainText) return "";
  const key = getSecretKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Combine IV + Tag + Encrypted ciphertext
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString("base64");
}

/**
 * Decrypts a base64 string previously encrypted with encryptToken.
 */
export function decryptToken(encryptedBase64: string): string {
  if (!encryptedBase64) return "";
  const key = getSecretKey();
  const combined = Buffer.from(encryptedBase64, "base64");

  if (combined.length < IV_LENGTH + TAG_LENGTH) {
    throw new Error("Invalid encrypted payload size");
  }

  const iv = combined.subarray(0, IV_LENGTH);
  const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const ciphertext = combined.subarray(IV_LENGTH + TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString("utf8");
}

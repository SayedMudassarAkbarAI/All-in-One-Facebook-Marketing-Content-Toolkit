import { Redis } from "@upstash/redis";

// Graceful fallback if Upstash env vars are not set yet during development
let redisClient: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export const redis = redisClient;

/**
 * In-memory LRU cache fallback for local development or when Redis is not provisioned
 */
const localMemoryStore = new Map<string, { value: unknown; expiresAt: number }>();

export const memoryStore = {
  get<T>(key: string): T | null {
    const item = localMemoryStore.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      localMemoryStore.delete(key);
      return null;
    }
    return item.value as T;
  },
  set(key: string, value: unknown, ttlSeconds: number = 60) {
    localMemoryStore.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  },
  delete(key: string) {
    localMemoryStore.delete(key);
  },
};

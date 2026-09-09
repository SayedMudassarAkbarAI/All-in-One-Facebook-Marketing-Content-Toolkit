import { redis, memoryStore } from "./redis";

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function rateLimit(
  identifier: string,
  limit: number = 30,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  const key = `rate_limit:${identifier}`;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  if (redis) {
    try {
      // Sliding window using Redis
      const pipeline = redis.pipeline();
      pipeline.zremrangebyscore(key, 0, now - windowMs);
      pipeline.zadd(key, { score: now, member: `${now}-${Math.random()}` });
      pipeline.zcard(key);
      pipeline.expire(key, windowSeconds);

      const results = await pipeline.exec();
      const count = (results[2] as number) || 1;

      return {
        success: count <= limit,
        limit,
        remaining: Math.max(0, limit - count),
        reset: Math.floor((now + windowMs) / 1000),
      };
    } catch {
      // Fallback to local memory limiter if Redis request fails
    }
  }

  // In-memory fallback
  const cacheKey = `mem_rl:${identifier}`;
  const entry = memoryStore.get<{ count: number; resetAt: number }>(cacheKey);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(cacheKey, { count: 1, resetAt: now + windowMs }, windowSeconds);
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: Math.floor((now + windowMs) / 1000),
    };
  }

  entry.count += 1;
  const isAllowed = entry.count <= limit;

  return {
    success: isAllowed,
    limit,
    remaining: Math.max(0, limit - entry.count),
    reset: Math.floor(entry.resetAt / 1000),
  };
}

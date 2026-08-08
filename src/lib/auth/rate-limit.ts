export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(key: string, maxAttempts = 8, windowMs = 15 * 60 * 1000): Promise<RateLimitResult> {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (current.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  return { allowed: true, remaining: maxAttempts - current.count };
}

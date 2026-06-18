import { createHash, timingSafeEqual } from "crypto";

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

export function verifyAdminKey(adminKey: string) {
  const expectedKey = process.env.ADMIN_KEY;

  if (!expectedKey) {
    return false;
  }

  return timingSafeEqual(hash(adminKey.trim()), hash(expectedKey.trim()));
}

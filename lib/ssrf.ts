import { URL } from "url";

/**
 * Validates whether a given URL is safe to fetch, blocking private/internal IPs,
 * non-HTTP(S) protocols, and loopbacks (SSRF mitigation).
 */
export function isSafeUrl(rawUrl: string): { safe: boolean; error?: string; url?: URL } {
  try {
    const parsed = new URL(rawUrl);

    // Only allow HTTP and HTTPS
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { safe: false, error: "Only HTTP and HTTPS protocols are permitted." };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Disallow loopback / local hosts
    if (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal") ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname === "0.0.0.0"
    ) {
      return { safe: false, error: "Requests to localhost or internal networks are blocked." };
    }

    // Disallow RFC1918 private IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
    // and Cloud metadata IP (169.254.169.254)
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = hostname.match(ipv4Regex);
    if (match) {
      const octet1 = parseInt(match[1], 10);
      const octet2 = parseInt(match[2], 10);

      if (
        octet1 === 10 ||
        (octet1 === 172 && octet2 >= 16 && octet2 <= 31) ||
        (octet1 === 192 && octet2 === 168) ||
        (octet1 === 169 && octet2 === 254)
      ) {
        return { safe: false, error: "Requests to private IP addresses are blocked." };
      }
    }

    return { safe: true, url: parsed };
  } catch {
    return { safe: false, error: "Invalid URL provided." };
  }
}

/**
 * Verifies if the URL is an authorized Facebook domain for public media/posts.
 */
export function isFacebookUrl(rawUrl: string): boolean {
  const { safe, url } = isSafeUrl(rawUrl);
  if (!safe || !url) return false;

  const hostname = url.hostname.toLowerCase();
  const allowedDomains = [
    "facebook.com",
    "www.facebook.com",
    "m.facebook.com",
    "web.facebook.com",
    "fb.watch",
    "fb.com",
  ];

  return allowedDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
}

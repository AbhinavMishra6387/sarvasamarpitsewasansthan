const GITHUB_REPO = "https://raw.githubusercontent.com/AbhinavMishra6387/sarvasamarpitsewasansthan/main";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Handle root / index.html
    if (pathname === "/" || pathname === "" || pathname === "/index.html") {
      const res = await fetch(`${GITHUB_REPO}/index.html`, {
        cf: { cacheTtl: 300, cacheEverything: true }
      });
      return new Response(res.body, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300",
          "access-control-allow-origin": "*"
        }
      });
    }

    // Serve images, logo, and static assets from GitHub Raw CDN
    if (
      pathname.startsWith("/images/") ||
      pathname.startsWith("/public/") ||
      pathname === "/logo.jpg" ||
      pathname === "/favicon.svg" ||
      pathname === "/manifest.json"
    ) {
      const cleanPath = pathname.replace(/^\/public/, "");
      const res = await fetch(`${GITHUB_REPO}${cleanPath}`, {
        cf: { cacheTtl: 86400, cacheEverything: true }
      });
      return new Response(res.body, {
        status: res.status,
        headers: {
          "content-type": res.headers.get("content-type") || "image/jpeg",
          "cache-control": "public, max-age=86400, immutable",
          "access-control-allow-origin": "*"
        }
      });
    }

    // Default SPA fallback to index.html
    const res = await fetch(`${GITHUB_REPO}/index.html`, {
      cf: { cacheTtl: 300, cacheEverything: true }
    });
    return new Response(res.body, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
        "access-control-allow-origin": "*"
      }
    });
  }
};

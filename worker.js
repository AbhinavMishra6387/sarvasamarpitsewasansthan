const RAW_ORIGIN = "https://raw.githubusercontent.com/AbhinavMishra6387/sarvasamarpitsewasansthan/main";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf"
};

function getMimeType(pathname) {
  const dot = pathname.lastIndexOf(".");
  if (dot !== -1) {
    const ext = pathname.slice(dot).toLowerCase();
    if (MIME_TYPES[ext]) return MIME_TYPES[ext];
  }
  return "text/html; charset=utf-8";
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Permanent 301 Migration Redirect for Old Domain (sarva-samarpit-sewa-sansthan.in)
    // Ensures single-hop 301 redirect directly to https://sarvasamarpitsewasansthan.com for both HTTP and HTTPS
    if (url.hostname.toLowerCase().includes("sarva-samarpit-sewa-sansthan.in")) {
      if (url.pathname.startsWith("/google") && url.pathname.endsWith(".html")) {
        // Serve Google HTML verification token if needed
      } else {
        return Response.redirect(`https://sarvasamarpitsewasansthan.com${url.pathname}${url.search}`, 301);
      }
    }

    // 2. Enforce HTTPS Everywhere for New Domain
    const proto = request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
    if (proto === "http" || url.protocol === "http:") {
      return Response.redirect(`https://${url.host}${url.pathname}${url.search}`, 301);
    }

    // 3. Canonical Domain Normalization: Redirect WWW to Apex Domain (Fixes Cloudflare 522 & consolidates Google SEO)
    if (url.hostname.toLowerCase().startsWith("www.")) {
      const cleanHost = url.hostname.replace(/^www\./i, "");
      return Response.redirect(`https://${cleanHost}${url.pathname}${url.search}`, 301);
    }

    let path = '/' + url.pathname.split('/').filter(Boolean).join('/');
    if (path === "/" || path === "") {
      path = "/index.html";
    }
    if (path === "/sitemap") {
      path = "/sitemap.xml";
    }

    // Direct routing for all canonical SPA pages & Uttar Pradesh district landing pages
    const SPA_ROUTES = [
      "/about", "/vision", "/founder", "/trustees", "/executive-committee",
      "/free-education", "/food-distribution", "/social-welfare", "/religious-activities",
      "/healthcare", "/tree-plantation", "/women-hygiene", "/marriage-support", "/blanket-distribution",
      "/temple-seva", "/membership", "/volunteer", "/gallery", "/contact", "/donate",
      "/privacy-policy", "/terms-and-conditions", "/refund-policy",
      "/prayagraj", "/varanasi", "/ayodhya", "/lucknow", "/gorakhpur",
      "/kanpur", "/mathura", "/jhansi", "/meerut", "/mirzapur"
    ];
    if (SPA_ROUTES.includes(path.toLowerCase())) {
      path = "/index.html";
    }

    const isDynamicDoc = path.endsWith(".html") || path.endsWith(".xml") || path.endsWith(".txt");
    const freshParam = `_fresh=${Date.now()}`;
    const sep = url.search ? "&" : "?";
    const targetUrl = `${RAW_ORIGIN}${path}${url.search}${isDynamicDoc ? `${sep}${freshParam}` : ""}`;

    try {
      const res = await fetch(targetUrl, {
        headers: {
          "User-Agent": "SarvaSamarpit-Edge/2.0"
        },
        cf: {
          cacheTtl: isDynamicDoc ? 0 : 86400,
          cacheEverything: !isDynamicDoc
        }
      });

      if (!res.ok && res.status === 404 && !path.includes(".")) {
        // SPA Fallback: Route clean URLs to index.html
        const fallbackRes = await fetch(`${RAW_ORIGIN}/index.html?_fresh=${Date.now()}`);
        if (fallbackRes.ok) {
          const cleanHeaders = new Headers();
          cleanHeaders.set("content-type", "text/html; charset=utf-8");
          cleanHeaders.set("access-control-allow-origin", "*");
          cleanHeaders.set("cache-control", "no-cache, no-store, must-revalidate, max-age=0");
          cleanHeaders.set("strict-transport-security", "max-age=31536000; includeSubDomains; preload");
          cleanHeaders.set("x-content-type-options", "nosniff");
          cleanHeaders.set("x-frame-options", "SAMEORIGIN");
          cleanHeaders.set("referrer-policy", "strict-origin-when-cross-origin");
          return new Response(fallbackRes.body, { status: 200, headers: cleanHeaders });
        }
      }

      if (!res.ok) {
        return new Response(`File Not Found (${res.status}): ${path}`, {
          status: res.status,
          headers: { "content-type": "text/plain; charset=utf-8" }
        });
      }

      // Clean headers with strict security to guarantee Green Padlock & A+ SSL Rating:
      const cleanHeaders = new Headers();
      cleanHeaders.set("content-type", getMimeType(path));
      cleanHeaders.set("access-control-allow-origin", "*");
      cleanHeaders.set("strict-transport-security", "max-age=31536000; includeSubDomains; preload");
      cleanHeaders.set("x-content-type-options", "nosniff");
      cleanHeaders.set("x-frame-options", "SAMEORIGIN");
      cleanHeaders.set("referrer-policy", "strict-origin-when-cross-origin");

      if (path.endsWith(".xml")) {
        cleanHeaders.set("cache-control", "public, max-age=3600");
      } else if (isDynamicDoc) {
        cleanHeaders.set("cache-control", "no-cache, no-store, must-revalidate, max-age=0");
        cleanHeaders.set("pragma", "no-cache");
        cleanHeaders.set("expires", "0");
      } else {
        cleanHeaders.set("cache-control", "public, max-age=86400");
      }

      return new Response(res.body, {
        status: 200,
        headers: cleanHeaders
      });
    } catch (err) {
      return new Response("Connecting to Sarva Samarpit Sewa Sansthan...", {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }
  }
};

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
    let path = url.pathname;
    if (path === "/" || path === "") {
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
          const fallbackHeaders = new Headers(fallbackRes.headers);
          fallbackHeaders.set("content-type", "text/html; charset=utf-8");
          fallbackHeaders.set("access-control-allow-origin", "*");
          fallbackHeaders.set("cache-control", "no-cache, no-store, must-revalidate, max-age=0");
          return new Response(fallbackRes.body, { status: 200, headers: fallbackHeaders });
        }
      }

      if (!res.ok) {
        return new Response(`File Not Found (${res.status}): ${path}`, {
          status: res.status,
          headers: { "content-type": "text/plain; charset=utf-8" }
        });
      }

      const newHeaders = new Headers(res.headers);
      newHeaders.set("content-type", getMimeType(path));
      newHeaders.set("access-control-allow-origin", "*");

      if (isDynamicDoc) {
        newHeaders.set("cache-control", "no-cache, no-store, must-revalidate, max-age=0");
        newHeaders.set("pragma", "no-cache");
        newHeaders.set("expires", "0");
      } else {
        newHeaders.set("cache-control", "public, max-age=86400");
      }

      return new Response(res.body, {
        status: 200,
        headers: newHeaders
      });
    } catch (err) {
      return new Response("Connecting to Sarva Samarpit Sewa Sansthan...", {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }
  }
};

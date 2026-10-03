const GITHUB_PAGES_ORIGIN = "https://abhinavmishra6387.github.io/sarvasamarpitsewasansthan";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path === "/" || path === "") {
      path = "/index.html";
    }

    const isHtml = path.endsWith(".html") || path === "/index.html";
    const freshParam = `_edgeFresh=${Date.now()}`;
    const sep = url.search ? "&" : "?";
    const targetUrl = isHtml
      ? `${GITHUB_PAGES_ORIGIN}${path}${url.search}${sep}${freshParam}`
      : `${GITHUB_PAGES_ORIGIN}${path}${url.search}`;

    try {
      const reqHeaders = new Headers(request.headers);
      reqHeaders.set("User-Agent", "Cloudflare-Worker-SarvaSamarpit/2.0");

      const res = await fetch(targetUrl, {
        headers: reqHeaders,
        cf: {
          cacheTtl: isHtml ? 0 : 86400,
          cacheEverything: !isHtml
        }
      });

      if (!res.ok && res.status === 404 && !path.includes(".")) {
        // SPA Fallback: Route clean URLs to index.html
        const fallbackRes = await fetch(`${GITHUB_PAGES_ORIGIN}/index.html?_edgeFresh=${Date.now()}`, {
          headers: reqHeaders,
          cf: { cacheTtl: 0, cacheEverything: false }
        });
        const fallbackHeaders = new Headers(fallbackRes.headers);
        fallbackHeaders.set("access-control-allow-origin", "*");
        fallbackHeaders.set("cache-control", "no-cache, no-store, must-revalidate, max-age=0");
        fallbackHeaders.set("pragma", "no-cache");
        fallbackHeaders.set("expires", "0");
        return new Response(fallbackRes.body, {
          status: 200,
          headers: fallbackHeaders
        });
      }

      const newHeaders = new Headers(res.headers);
      newHeaders.set("access-control-allow-origin", "*");
      if (isHtml) {
        newHeaders.set("cache-control", "no-cache, no-store, must-revalidate, max-age=0");
        newHeaders.set("pragma", "no-cache");
        newHeaders.set("expires", "0");
      } else {
        newHeaders.set("cache-control", "public, max-age=86400");
      }

      return new Response(res.body, {
        status: res.status,
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

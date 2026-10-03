const GITHUB_PAGES_ORIGIN = "https://abhinavmishra6387.github.io/sarvasamarpitsewasansthan";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path === "/" || path === "") {
      path = "/index.html";
    }
    const targetUrl = `${GITHUB_PAGES_ORIGIN}${path}${url.search}`;

    const isHtml = path.endsWith(".html") || path === "/index.html";
    const cacheTtl = isHtml ? 60 : 86400;

    try {
      const reqHeaders = new Headers(request.headers);
      reqHeaders.set("User-Agent", "Cloudflare-Worker-SarvaSamarpit/1.0");

      const res = await fetch(targetUrl, {
        headers: reqHeaders,
        cf: { cacheTtl: cacheTtl, cacheEverything: !isHtml }
      });

      if (!res.ok && res.status === 404 && !path.includes(".")) {
        // SPA Fallback: Route clean URLs to index.html
        const fallbackRes = await fetch(`${GITHUB_PAGES_ORIGIN}/index.html`, {
          headers: reqHeaders,
          cf: { cacheTtl: 60, cacheEverything: false }
        });
        const fallbackHeaders = new Headers(fallbackRes.headers);
        fallbackHeaders.set("access-control-allow-origin", "*");
        fallbackHeaders.set("cache-control", "public, max-age=60, must-revalidate");
        return new Response(fallbackRes.body, {
          status: 200,
          headers: fallbackHeaders
        });
      }

      const newHeaders = new Headers(res.headers);
      newHeaders.set("access-control-allow-origin", "*");
      newHeaders.set("cache-control", isHtml ? "public, max-age=60, must-revalidate" : "public, max-age=86400");

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

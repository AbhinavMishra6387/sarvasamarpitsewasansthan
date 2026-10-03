const GITHUB_PAGES_ORIGIN = "https://abhinavmishra6387.github.io/sarvasamarpitsewasansthan";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const targetUrl = `${GITHUB_PAGES_ORIGIN}${path}${url.search}`;

    const isHtml = path.endsWith(".html") || path === "/index.html";
    const cacheTtl = isHtml ? 60 : 86400;

    try {
      const res = await fetch(targetUrl, {
        headers: request.headers,
        cf: { cacheTtl: cacheTtl, cacheEverything: !isHtml }
      });

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

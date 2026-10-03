const GITHUB_PAGES_ORIGIN = "https://abhinavmishra6387.github.io/sarvasamarpitsewasansthan";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const targetUrl = `${GITHUB_PAGES_ORIGIN}${path}${url.search}`;

    try {
      const res = await fetch(targetUrl, {
        headers: request.headers,
        cf: { cacheTtl: 86400, cacheEverything: true }
      });

      const newHeaders = new Headers(res.headers);
      newHeaders.set("access-control-allow-origin", "*");
      newHeaders.set("cache-control", "public, max-age=3600");

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

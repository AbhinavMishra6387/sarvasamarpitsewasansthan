export default {
  async fetch(request, env, ctx) {
    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      try {
        let response = await env.ASSETS.fetch(request);
        if (response.status === 404) {
          response = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
        }
        return response;
      } catch (err) {
        // proceed to fallback
      }
    }

    return new Response(
      '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/index.html"></head><body>Connecting to Sarva Samarpit Sewa Sansthan...</body></html>',
      { headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Fetch static asset
    let response = await env.ASSETS.fetch(request);

    // If 404 and URL does not point to a specific file extension, fallback to index.html
    const lastSegment = url.pathname.split('/').pop() || '';
    if (response.status === 404 && !lastSegment.includes('.')) {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }

    return response;
  }
};

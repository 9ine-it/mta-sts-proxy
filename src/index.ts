const POLICY = [
  "version: STSv1",
  "mode: testing",
  "mx: aspmx.l.google.com",
  "mx: *.aspmx.l.google.com",
  "max_age: 86400",
  "",
].join("\r\n");

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== "/.well-known/mta-sts.txt") {
      return new Response("Not found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          Allow: "GET, HEAD",
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    return new Response(request.method === "HEAD" ? null : POLICY, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  },
};

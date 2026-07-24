export default {
 async fetch(request, env, ctx) {
   const hostname = new URL(request.url).hostname;

   // Define policies per domain
   const policies = {
     "mta-sts.9ine.com": `version: STSv1
mode: testing
mx: aspmx.l.google.com
mx: *.aspmx.l.google.com
max_age: 86400`
   };

   const policy = policies[hostname];

   if (policy) {
     return new Response(policy, {
       headers: { "Content-Type": "text/plain" }
     });
   } else {
     return new Response("404 Not Found", {
       status: 404,
       headers: { "Content-Type": "text/plain" }
     });
   }
 }
}

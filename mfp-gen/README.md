## Get files
```js
find /dir/ -print
.join('\n')
a.reduce( (res, val) => {  res[val] = true; return res;}, {})
```

// https://github.com/disruptph/disruptjs/blob/master/packages/hygen-redux-generators/_templates/entity/new/actions.ejs.t
## hygen
> https://github.com/ronp001/hygen-create
```js
hygen-create start foo
hygen-create add package.json dist/hello.js 
hygen-create usename container
hygen-create status
hygen-create generate
 ```
 
 # NGING
 > as reverse
 https://github.com/willmendesneto/micro-frontend-pages

 ## MFRONTENDS videos
## NearForm microapps
- think about ember/jquery/backbone!
- eventbus - communication
- related microservices (isolated, one-responsibility, lightweight protocol/fast build)
- MFA <=> microservice
- Migration: microservices=>components=>microservices

How to:
## - bootstrap app
- iframe

- single-spa lib
- Frint framework?

## COMMUNICATION
- https://github.com/chrisdavies/eev message bus
- window.
- redux
- iframes#postMessage
- via serviceWorker 
- BroadcastChannel 


# FRONTEND proxy

https://learning.oreilly.com/library/view/micro-frontends-in/9781617296871/OEBPS/Text/03.xhtml

PROS
- Avoids browser security issues (CORS)
- Enables sharing data like login-state through cookies
- Better performance (only one DNS lookup, SSL handshake, ...)
const CACHE='ot-manual-v2';
const ASSETS=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting());});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const copy=r.clone();if(e.request.method==='GET'&&(e.request.headers.get('accept')||'').includes('text/html')){caches.open(CACHE).then(cc=>cc.put(e.request,copy)).catch(()=>{});}return r;}).catch(()=>c)));});

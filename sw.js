const CACHE='multijobs-v3';
const ASSETS=['./','./index.html','./style-mobile-v2.css?v=20261008-2','./script-mobile-v2.js?v=20261008-2','./manifest.json?v=20261012','./assets/icon.svg?v=20261012','./assets/app-icon.png?v=20261012'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./index.html'))))});

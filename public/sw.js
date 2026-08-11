const CACHE='luma-skin-v2';
const SHELL=['/','/index.html','/manifest.json','/icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match('/index.html'))))});
self.addEventListener('message',event=>{if(event.data?.type==='SKIN_NOTIFICATION')self.registration.showNotification(event.data.title,{body:event.data.body,icon:'/icon.svg',badge:'/icon.svg'})});
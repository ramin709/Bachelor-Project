const CACHE_NAME = 'version1';
const DYNAMIC_CACHE_NAME = 'dynamic-version1'
const staticAssets = [
    'index.html' ,
    'images/room1.webp',
    'images/room2.webp',
    'images/room3.webp',
    'images/room4.webp',
    'images/room5.webp',
    'images/room6.webp',
    'images/room7.webp',
    'images/room8.webp',
    'images/room9.jpg',
    'images/room10.webp',
]

const self = this;

self.addEventListener('install' , (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>{
            cache.addAll(staticAssets);
        })
    )
})

self.addEventListener('activate' , () => {

})

self.addEventListener('fetch' , (event) => {
    event.waitUntil(
        caches.match(event.request).then(res => {
            return res || fetch(event.request).then(fetchedRes => {
                caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                    cache.put(event.request , fetchedRes.clone());
                    return fetchedRes;
                })
            }).catch(err => console.log('unable to fetch from resource'));
        })
    )
})
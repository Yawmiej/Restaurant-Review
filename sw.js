//Name of cache and and array of all file
// to be added to the cache
const cacheName = 'restaurant-v1';
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/swRegister.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
  ];
  

//  Event listener that listens for install event of the service worker
//  and add the cache files when installation is complete 
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});



// Event listener that listens for fetch and 
// returns a response (cached file) if it exists,
// if it doesn't, it fetches it and saves it
// to the cache, the returns it.
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) {
                console.log('Found ', event.request, ' in cache');
                return response;
            } else {
                console.log('Could not find ', event.request, ' in cache, FETCHING!');
                return fetch(event.request)
                .then(function(response){
                    // Cloned the response to avoid using it twice
                    const responseClone = response.clone();
                    caches.open(cacheName).then(function(cache) {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});
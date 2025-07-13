const CACHE_NAME = "alloy-calculator-v1"

// Add all the files we want to cache
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Try to cache each file, but don't fail if some files can't be cached
      return Promise.allSettled(
        urlsToCache.map(url =>
          fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`)
              }
              return cache.put(url, response)
            })
            .catch(error => {
              console.warn(`Failed to cache ${url}:`, error)
            })
        )
      )
    })
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch new
      return response || fetch(event.request).catch(() => {
        // If both cache and network fail, return a simple offline page
        if (event.request.mode === 'navigate') {
          return new Response('You are offline. Please check your internet connection.', {
            headers: { 'Content-Type': 'text/plain' }
          })
        }
        return new Response(null, { status: 404 })
      })
    })
  )
})


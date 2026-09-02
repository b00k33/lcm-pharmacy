// LCM Pharmacy service worker -- installability + offline-read app shell.
// Hand-edited (no build step touches this file); bump CACHE_VERSION on any
// meaningful change so a fresh deploy evicts the old cache. Modelled on
// book33-app-redesign's sw.js (same project family, same GitHub Pages
// project-subpath deployment shape -- relative paths throughout), with one
// deliberate difference: no unconditional self.skipWaiting() on install.
//
// Her explicit ask (2026-08-16): a new version must NEVER activate itself.
// This app already has a hard rule against silent mid-session swaps (see
// phDoControlledUpdate() in the app itself -- the "gold Update button" that
// saves, pushes to the cloud and downloads a backup before anything
// changes). A waiting service worker sits untouched until that same button
// tells it to go, via postMessage({type:"SKIP_WAITING"}) -- see the
// "message" listener below and phDoControlledUpdate's STEP 4.
var CACHE_VERSION = "lcm-20260903-menu-stacking";

var SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-192-v2.png", "./icons/icon-512-v2.png", "./icons/apple-touch-icon-v2.png", "./icons/favicon-32-v2.png", "./icons/favicon-32-light-v2.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (c) {
      return Promise.all(SHELL.map(function (u) { return c.add(u).catch(function () {}); }));
    })
    // deliberately NOT calling self.skipWaiting() here -- see header comment
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      var olds = keys.filter(function (k) { return k !== CACHE_VERSION; });
      return Promise.all(olds.map(function (name) { return caches.delete(name); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// The ONLY thing that can flip a waiting worker into activating -- fired by
// phDoControlledUpdate() after save + cloud push + backup download all
// succeed, right before its own reload. No other code path calls this.
self.addEventListener("message", function (e) {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

// A hung connection (flaky clinic wifi, captive portal) must never leave a
// navigation pending forever -- race the network against a short timer and
// fall back to the cached shell either way.
function timeoutFetch(req, ms) {
  return new Promise(function (resolve, reject) {
    var t = setTimeout(function () { reject(new Error("sw-timeout")); }, ms);
    fetch(req).then(function (r) { clearTimeout(t); resolve(r); }, function (e) { clearTimeout(t); reject(e); });
  });
}

// Her hard requirement: the Supabase sync layer must always hit the real
// network, no matter what -- never served from cache, never intercepted.
// Matches both the baked-in default project and any custom URL she enters
// (sync.js validates every custom URL against this same *.supabase.co
// shape). Returning without calling respondWith() lets the browser handle
// the request completely normally, as if this worker didn't exist.
function isSupabase(url) {
  try { return /(^|\.)supabase\.co$/.test(new URL(url).hostname); } catch (e) { return false; }
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  if (isSupabase(req.url)) return;

  // Navigations (the app HTML itself): network-first, always -- an update
  // must be visible the moment it's live, never masked by a stale cached
  // copy while online. Cache is a pure offline fallback, refreshed
  // opportunistically whenever the network does succeed.
  // cache:"no-store" is required here, not optional -- plain fetch(req) is
  // still subject to the BROWSER's ordinary HTTP cache (GitHub Pages serves
  // this file with Cache-Control: max-age=600), so "network-first" alone
  // could still silently hand back a same-origin disk-cached response up to
  // 10 minutes stale even though the server already has the update. Found
  // live (2026-08-19): a real fix was deployed and confirmed on the server,
  // but a plain reload kept showing the old, broken page for several
  // minutes because of exactly this gap.
  if (req.mode === "navigate") {
    var freshReq = new Request(req, { cache: "no-store" });
    e.respondWith(
      timeoutFetch(freshReq, 4000).then(function (res) {
        caches.open(CACHE_VERSION).then(function (c) { c.put("./", res.clone()); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (c) { return c || caches.match("./"); });
      })
    );
    return;
  }

  // Everything else (icons, manifest, the jsdelivr Supabase-JS script,
  // Google Fonts): cache-first, so a repeat offline load still has them --
  // opaque cross-origin responses are cached too (status is always 0 for
  // those, so status===200 alone would skip them).
  e.respondWith(
    caches.match(req).then(function (cached) {
      return cached || fetch(req).then(function (res) {
        if (res && (res.status === 200 || res.type === "opaque")) {
          caches.open(CACHE_VERSION).then(function (c) { c.put(req, res.clone()); });
        }
        return res;
      }).catch(function () {
        return cached || caches.match(req, { ignoreSearch: true });
      });
    })
  );
});

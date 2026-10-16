/* ============================================================
   sw.js — Service Worker (çevrimdışı destek).
   Uygulama kabuğunu önceden önbelleğe alır; sonraki açılışlarda
   internet olmadan da çalışır. iOS'ta "Ana Ekrana Ekle" ile
   tam ekran, çevrimdışı bir uygulama gibi davranır.
   Not: Service Worker yalnızca HTTPS veya localhost üzerinde etkindir.
   ============================================================ */
"use strict";

var CACHE = "ielts8-shell-v4";

/* Önbelleğe alınacak uygulama kabuğu (yollar sorgusuz; eşleşmede ignoreSearch kullanılır). */
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/styles.css",
  "./js/data/criteria.js",
  "./js/data/descriptors.js",
  "./js/data/plan.js",
  "./js/data/reading.js",
  "./js/data/listening.js",
  "./js/data/writing.js",
  "./js/data/speaking.js",
  "./js/data/vocab.js",
  "./js/data/grammar.js",
  "./js/data/placement.js",
  "./js/store.js",
  "./js/app.js",
  "./js/native.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* Tek tek ekle: biri eksikse kurulum tümden düşmesin. */
      return Promise.all(ASSETS.map(function (url) {
        return c.add(url).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  /* Sayfa gezinmesi: önce önbellek, yoksa ağ, o da yoksa index.html. */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).catch(function () {
        return caches.match("./index.html", { ignoreSearch: true });
      })
    );
    return;
  }

  /* Diğer istekler: önce önbellek (sorgu yok sayılır), sonra ağ. */
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
        return res;
      });
    })
  );
});

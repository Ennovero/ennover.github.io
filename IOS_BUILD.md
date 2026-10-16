# iPhone'da çalıştırma — iki yol

Bu proje **aynı kaynak koddan** iki şekilde iPhone'da çalışır:

| Yol | Ne gerekir | Sonuç |
|---|---|---|
| **A. PWA** (hemen kullanılabilir) | Sadece iPhone + Safari | Ana ekrana eklenen, tam ekran, çevrimdışı uygulama |
| **B. Yerel iOS uygulaması** (Capacitor) | **macOS + Xcode** | `.app` / `.ipa` — App Store'a yüklenebilir gerçek uygulama |

> **Önemli:** Windows'ta iOS uygulaması **derlenemez** (Apple, imzalama ve derleme için macOS + Xcode şart koşar).
> Bu yüzden B yolu için bir Mac (veya bulut Mac / macOS CI) gerekir. A yolu bugün iPhone'da çalışır.

---

## A. PWA — bugün iPhone'da çalıştır (Mac gerekmez)

Service Worker ve "Ana Ekrana Ekle" **HTTPS** (veya `localhost`) gerektirir. En kolayı:

### A1. Ücretsiz HTTPS barındırma (önerilen)
1. Bu klasörün içeriğini (index.html, js/, assets/, icons/, manifest.webmanifest, sw.js) bir statik barındırma
   servisine yükle: **GitHub Pages**, **Netlify**, **Cloudflare Pages** veya **Vercel**.
2. Telefonda Safari ile siteyi aç.
3. **Paylaş** → **Ana Ekrana Ekle** → **Ekle**.
4. Artık ana ekrandaki **IELTS 8** simgesiyle tam ekran, çevrimdışı açılır.

### A2. Aynı Wi-Fi üzerinden PC'den deneme (sadece test)
```powershell
cd "C:\Users\Lenovo\Desktop\IELTS_UYGULAMA"
python -m http.server 8080
```
iPhone'dan `http://<PC-IP>:8080/index.html` adresini aç (ör. `http://192.168.1.20:8080/index.html`).
Bu yöntemde Service Worker **çalışmaz** (HTTPS olmadığı için) ama uygulama açılır ve "Ana Ekrana Ekle" denenebilir.

---

## B. Yerel iOS uygulaması (Capacitor) — macOS + Xcode

### Gereksinimler
* **macOS** (son sürüm önerilir)
* **Xcode** (App Store'dan) + Command Line Tools: `xcode-select --install`
* **Node.js 18+** ve **CocoaPods** (`sudo gem install cocoapods`)
* Apple Developer hesabı (ücretsiz hesap bile gerçek cihazda test için yeterlidir)

### Adımlar
```bash
# 1) Projeyi Mac'e kopyala, klasöre gir
cd ielts-band8-trainer

# 2) Bağımlılıkları kur
npm install

# 3) Web dosyalarını www/ içine kopyala (npm run sync:web bunu otomatik yapar)
npm run sync:web

# 4) iOS yerel projesini oluştur (yalnızca ilk seferde)
npm run ios:add

# 5) Simge/başlangıç ekranlarını üret (resources/icon.png -> Xcode AppIcon)
npm run assets:ios

# 6) Web içeriğini + eklentileri iOS projesine aktar
npm run ios:sync

# 7) Xcode'da aç
npm run ios:open
```

Xcode içinde:
1. Soldan **App** projesini seç → **Signing & Capabilities** → **Team** olarak Apple hesabını seç.
   (Bundle Identifier'ı gerekiyorsa `capacitor.config.json` içindeki `appId` ile değiştir.)
2. Üstten hedef olarak bir **simülatör** veya **bağlı iPhone**'u seç.
3. **▶ Run** (⌘R). Uygulama cihazda açılır.
4. Dağıtım için: **Product → Archive → Distribute App** (TestFlight / App Store).

> Kaynak kod değiştiğinde sadece `npm run ios:sync` çalıştırıp Xcode'da yeniden Run etmen yeterlidir.

### Windows'tan gerçek iOS derlemesi istiyorsan
Bir **bulut Mac** kullan (ör. MacStadium, MacinCloud) veya **GitHub Actions**'ta `macos-latest` runner ile
derleme adımlarını (yukarıdaki B adımları) otomatikleştir. Kod tarafında ek bir değişiklik gerekmez.

---

## Ayarları değiştirmek
* **Uygulama adı / kimliği:** `capacitor.config.json` → `appName`, `appId`
* **Ana ekran adı (PWA):** `index.html` içindeki `apple-mobile-web-app-title` ve `manifest.webmanifest` → `short_name`
* **Simge:** `resources/icon.png` (1024×1024) dosyasını değiştir → `npm run assets:ios`
  (Web/PWA simgeleri için: `npm run icons`)
* **Tema renkleri:** `assets/styles.css` içindeki `:root` değişkenleri ve `manifest.webmanifest` → `theme_color`

---

## Native iOS dokunuşları

| Özellik | Nerede ayarlanır |
|---|---|
| **Durum çubuğu rengi/stili** | `capacitor.config.json` → `plugins.StatusBar` + `js/native.js` (tema değişince otomatik güncellenir) |
| **Açılış ekranı (splash)** | `capacitor.config.json` → `plugins.SplashScreen` + `resources/splash.png` (`npm run assets:ios` ile Xcode'a işlenir) |
| **Açılış ekranı süresi** | `plugins.SplashScreen.launchShowDuration` |
| **Geri tuşu davranışı** | `js/native.js` → `App.addListener("backButton", ...)`: Panel'de değilse panele döner, paneldeyse uygulamadan çıkar |
| **PWA durum çubuğu rengi** | `<meta name="theme-color">` (tema ile güncellenir), `apple-mobile-web-app-status-bar-style` |
| **Çentik/güvenli alan** | `index.html` viewport `viewport-fit=cover` + `styles.css` `env(safe-area-inset-*)` |

Kurulumda `@capacitor/status-bar`, `@capacitor/splash-screen` ve `@capacitor/app` eklentileri
`npm install` ile gelir; `npm run ios:sync` bunları iOS projesine bağlar.

---

## PWA'yı (GitHub Pages) güncelleme + bilinen sorunlar

### Menüler çalışmıyordu (çözüldü)
iOS'ta "Ana Ekrana Ekle" ile açılan uygulamada sekme/menü geçişleri sayfayı yeniden yüklüyordu; nedeni rota
bilgisinin `window.location.hash` ile yazılmasıydı. Artık standalone modda `history.replaceState` kullanılıyor
ve `render()` de hash'e doğrudan yazmıyor. `tests/smoke-test.js` bölüm **[12]** bunu kalıcı olarak test eder.

### Yeni sürümü iPhone'a alma
1. Değişen dosyaları GitHub Pages repo'suna yükleyin (script'ler `?v=3` taşıdığı için önbellek kırılır).
2. Uygulamayı iPhone'da tamamen kapatıp açın — yeni service worker devreye girince sayfa bir kez otomatik yenilenir.
3. Israr eden eski sürüm için: ana ekran simgesini **sil → yeniden ekle** (en kesin yol).
4. iOS Safari'de site verilerini temizlemek de mümkündür:
   *Ayarlar → Safari → Gelişmiş → Web Sitesi Verileri*.

### Kontrol komutları
```bash
node tests/smoke-test.js      # 178 kontrol (iOS/PWA paketleme + standalone gezinme dahil)
python tools/make_icons.py    # simgeleri yeniden üret
python tools/make_splash.py   # açılış ekranlarını yeniden üret
```

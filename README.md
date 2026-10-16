# IELTS Band 8 Trainer — 2 Aylık Hazırlık Uygulaması

IELTS **Academic**'te 2 ay içinde **Band 8** hedefi için hazırlanmış, tamamen çevrimdışı çalışan
tek sayfalık bir web uygulaması. Reading, Listening ve Writing için sorular, örnek (model) cevaplar,
değerlendirme kriterleri ve 56 günlük çalışma programı içerir.

---

## 1. Nasıl açılır? (kurulum yok)

**En kolay yol:** `index.html` dosyasına çift tıkla. Uygulama tarayıcıda (Chrome / Edge önerilir) açılır.
Hiçbir sunucuya, internete veya `npm install`'a gerek yoktur.

**Alternatif (yerel sunucu):** `Baslat.bat` dosyasına çift tıkla. Bu, klasörde basit bir
Python HTTP sunucusu başlatır ve tarayıcıyı açar. (Python 3 kuruluysa çalışır.)

> Tarayıcı önerisi: **Microsoft Edge** veya **Google Chrome**.
> Listening bölümü `Web Speech API` ile sesli dikte yapar; bu API yalnızca modern tarayıcılarda bulunur.

---

## 2. Dosya yapısı

```
IELTS_UYGULAMA/
├── index.html              → Uygulama kabuğu (sekmeler, üst bar, alt bilgi)
├── Baslat.bat              → Yerel sunucu + tarayıcı başlatıcı (opsiyonel)
├── README.md               → Bu dosya
├── assets/
│   └── styles.css          → Tüm stiller (açık/koyu tema, yazdırma desteği)
├── js/
│   ├── store.js            → localStorage katmanı (cevaplar, ilerleme, ayarlar, hata defteri)
│   ├── app.js              → Yönlendirme, tüm görünümler, olay yönetimi, puanlama, otomatik kayıt
│   └── data/
│       ├── criteria.js     → Band ölçeği, ham puan → band dönüşümleri, sınav formatı
│       ├── descriptors.js  → Writing Task 1/2 + Speaking band tanımlayıcıları (9-6)
│       ├── plan.js         → 8 haftalık çalışma programı (148 görev)
│       ├── reading.js      → 10 sınav × 3 akademik metin + 40 soru + gerekçeli cevap anahtarı
│       ├── listening.js    → 10 sınav × 4 bölüm + 40 soru + seslendirilecek transcript'ler
│       ├── writing.js      → Task 1 (4 tip) + Task 2 (6 tip) Band 8 model cevaplar
│       ├── speaking.js     → Part 1-2-3 örnek sorular ve model cevaplar
│       ├── grammar.js      → 9 gramer grubu / 29 konu / 58 örnek (C2)
│       ├── vocab.js        → 12 konuda C2 akademik kelime + collocation listesi
│       └── placement.js    → 25 soruluk genel seviye tespit sınavı + CEFR/band eşlemesi
└── tests/
    └── smoke-test.js       → Otomatik doğrulama testi (node tests/smoke-test.js)
```

### iPhone / iOS dosyaları (bu pakete yeni eklendi)
```
IELTS_UYGULAMA/
├── manifest.webmanifest    → PWA manifesti (ad, ikonlar, standalone)
├── sw.js                   → Service worker (çevrimdışı önbellek)
├── icons/                  → Uygulama simgeleri (192 / 512 / 1024 / apple-touch-icon)
├── resources/icon.png      → Xcode AppIcon kaynağı (1024, @capacitor/assets için)
├── package.json            → npm betikleri + Capacitor bağımlılıkları
├── capacitor.config.json   → Capacitor (yerel iOS) yapılandırması
├── IOS_BUILD.md            → iPhone'da çalıştırma kılavuzu (PWA + Capacitor)
├── tools/
│   ├── make_icons.py       → Simge üretici (python tools/make_icons.py)
│   └── copy-web.js         → Web dosyalarını www/ içine kopyalar
└── www/                    → Capacitor'ın kullandığı üretilmiş web paketi (otomatik)

---

## 3. İçerik durumu

Her IELTS sınavı **Reading (3 metin / 40 soru) + Listening (4 bölüm / 40 soru) + Writing (Task 1 + Task 2) + Speaking (Part 1-2-3)** içerir.

| Sınav | Reading | Listening | Writing | Speaking |
|---|---|---|---|---|
| IELTS 1 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 2 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 3 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 4 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 5 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 6 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 7 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 8 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 9 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |
| IELTS 10 | ✅ tam | ✅ tam | ✅ tam | ✅ tam |

* **Hazır toplam:** **400 Reading sorusu** (10 sınav × 3 metin × 40 soru), **400 Listening sorusu** (10 sınav × 4 bölüm × 40 soru), 20 Writing görevi + 20 Band 8 model cevap, 10 Speaking seti, 128 C2 kelime + 30 kalıp, 9 gramer grubu / 29 konu / 58 örnek, **25 soruluk genel seviye tespit sınavı** (otomatik CEFR + tahmini IELTS bandı).
* **Cevaplar otomatik kaydedilir:** Her soruya verdiğin cevap, bulunduğun sınav + beceri + metin/bölüm kapsamına göre (`answers["t3:reading:p1"]`) `localStorage`'a yazılır. Uygulamayı kapatıp yeniden açtığında veya başka bir sınava geçip geri döndüğünde **tüm cevaplar olduğu gibi geri gelir**; "Kontrol Et" ile aldığın skorlar da (`marks`, `results`) saklanır ve bölüm rozetlerinde görünür. Sıfırdan başlamak istersen ilgili bölümdeki **Cevapları Temizle** düğmesini kullan.
* **Yeni içerik nasıl eklenir?** `js/data/reading.js` içinde `tests.push(tN)` bloğu ekleyip 3 `passages` tanımla; `js/data/listening.js` içinde aynı şekilde 4 `parts` tanımla. Soru nesnesi formatı: `{ n, text, input, options, answer, why }`. Ardından `node tests/smoke-test.js` ile doğrula.

---

## 3.1 Bölümlerin ayrıntısı

### Reading — her sınavda 3 metin / 40 soru
10 sınavın her biri 3 akademik metin ve 40 sorudan oluşur. Metin 1 kolay-orta, Metin 2 orta,
Metin 3 zor düzeydir; kolaydan zora doğru zorluk artışı gerçek sınavı taklit eder.

| Sınav | Metin 1 | Metin 2 | Metin 3 |
|---|---|---|---|
| IELTS 1 | Vertical Farming: Growing Up, Not Out | The Alien Intelligence of the Octopus | The Neolithic Revolution Reconsidered |
| IELTS 2 | The Machine That Freed the Wheel | Coral Reefs in Crisis | The Birth of Writing |
| IELTS 3 | Antarctica: The Frozen Laboratory | The Problem of Antibiotic Resistance | The Science of Urban Noise |
| IELTS 4 | From Goat Herds to Global Trade: The Story of Coffee | The Art of Memory | Mining the Deep Sea |
| IELTS 5 | The Long Journey of the Monarch Butterfly | The Silk Road: More Than a Trade Route | Attention in the Digital Age |
| IELTS 6 | The Return of the Wolf | The Economics of Free Time | Microfinance: Promise and Limits |
| IELTS 7 | The Problem of Desertification | Music and the Brain | The Box That Changed the World |
| IELTS 8 | The Hidden Life of Soil | Fair Trade: Does It Work? | The Crash and the Depression |
| IELTS 9 | The Origins of the Olympic Games | Photosynthesis and the Green Revolution | The Architecture of Libraries |
| IELTS 10 | The Story of Tea | Why Cities Are Getting Warmer | The Future of Work: Automation and Employment |

Kullanılan soru tipleri: **Matching Headings, Matching Information, Matching Features,
Summary Completion (kelime havuzlu ve havuzsuz), True/False/Not Given, Yes/No/Not Given,
Sentence Completion, Short Answer, MCQ.**

Her sorunun yanında **cevap + gerekçe (why)** ve hangi paragrafa dayandığı yazılıdır.
Ayrıca 6 soru tipi için ayrı ayrı **Band 8 stratejileri** vardır.

### Listening — her sınavda 4 bölüm / 40 soru
10 sınavın her birinde gerçek IELTS yapısı vardır: Part 1 günlük yaşam diyaloğu,
Part 2 toplum/eşya tanıtım monoloğu, Part 3 akademik tartışma (öğrenci + danışman),
Part 4 akademik ders.

| Bölüm | Format | Soru tipleri |
|---|---|---|
| Part 1 | Günlük diyalog (rezervasyon, kayıt, randevu) | Form / not tamamlama (ONE WORD AND/OR A NUMBER) |
| Part 2 | Tanıtım monoloğu (sergi, spor merkezi, dernek) | MCQ + not tamamlama |
| Part 3 | İki öğrenci + danışman tartışması | MCQ + "Kim söyledi?" eşleştirme (A/B/C) |
| Part 4 | Akademik ders | Not tamamlama (ONE WORD ONLY) |

Transcript'ler tarayıcıda **sesli okunur** (Web Speech API). Transcript varsayılan olarak gizlidir —
sınavda olduğu gibi **bir kez** dinle, sonra kontrol için aç. Hız ayarı 0.7x–1.4x arasındadır
(zorluğu artırmak için 1.1–1.25x önerilir).

### Writing — 10 soru + 10 model cevap
* **Task 1 (4 tip):** Line graph, Bar chart, Process diagram, Maps — her biri için gerçek veri
  tablosu/şema açıklaması ve Band 8 model cevap (~170 sözcük).
* **Task 2 (6 tip):** Opinion, Discussion, Advantages/Disadvantages, Problem/Solution, Two-part,
  kısmi katılım — her biri için plan şeması + Band 8 model essay (~250-270 sözcük) + "neden Band 8?" notları.
* **Yazı denetleyici:** Kendi metnini yaz; sözcük sayısı, paragraf sayısı, ortalama cümle uzunluğu,
  bağlaç çeşitliliği, overview/pozisyon cümlesi ve zayıf sözcük kontrolü otomatik yapılır.

### Speaking (bonus)
Part 1 (6 soru), Part 2 (4 cue card), Part 3 (3 konu × 3 soru) ve 30+ işe yarar kalıp.

### Kriterler & Band
Resmî band ölçeği, Listening/Academic Reading/General Reading dönüşüm tabloları,
Writing Task 1 & 2 ve Speaking için **Band 9 / 8 / 7 / 6** tanımlayıcıları (Band 8 vurgulu).

### Panel
Geri sayım, plan ilerlemesi, **Band Hesaplayıcı** (0,25 ve 0,75 yukarı yuvarlama),
ham puan → band çevirici ve **Hata Defteri** (localStorage'da saklanır).

### 8 Haftalık Plan
148 görev, haftada 6 gün + 1 hafif gün. Tik atılan her görev tarayıcıda kaydedilir.

| Hafta | Tema |
|---|---|
| 1 | Teşhis ve format hakimiyeti |
| 2 | Reading odak: hız ve doğruluk |
| 3 | Listening odak: tek dinlemede yakalama |
| 4 | Writing Task 1 derinlemesine |
| 5 | Writing Task 2 derinlemesine |
| 6 | Speaking + entegre pratik (1. tam mock) |
| 7 | Tam mock testler ve hata avı |
| 8 | Sınav simülasyonu ve tapering |

---

## 4. Piyasadaki yaygın IELTS programları ve bu uygulamanın yetenek kümesi

Aşağıdaki yetenek listesi; resmî hazırlık platformları (**IELTS Ready Premium / Road to IELTS**,
**IDP IELTS Prepare**), video-kurs platformları (**Magoosh**, **E2 Language**), yazma ağırlıklı
kurslar (**IELTS Advantage**) ve klasik kaynak **Cambridge IELTS Academic 1-19** Practice Tests
setlerinin ortak işlevlerinden derlenmiştir:

| Yetenek | Neden gerekli | Bu uygulamada |
|---|---|---|
| Tüm soru tiplerini kapsayan soru bankası | Reading'de 11, Listening'te çok sayıda tip var | Reading 6 tip, Listening 3 tip + strateji sayfası |
| Zamanlı deneme (mock) modu | 60 dk / 40 soru baskısı asıl zorluktur | Her modülde geri sayım sayacı |
| Gerekçeli cevap anahtarı | "Neden yanlış" öğrenmeyi sağlar | Her soruda gerekçe + paragraf referansı |
| Band değerlendirme | İlerlemeyi ölçmek için | Band hesaplayıcı + dönüşüm tabloları |
| Seviye tespiti (placement) | Hazırlığı doğru yerden başlatmak için | Panel'de 25 soruluk seviye tespit sınavı → otomatik CEFR + tahmini band |
| Yazma geri bildirimi | En yavaş gelişen beceri | Model cevaplar, plan şemaları, metin denetleyici, kriter listeleri |
| Konuşma modeli | Akıcılık yalnızca sesli pratikle gelişir | Cue card'lar + model yanıtlar |
| Kelime modülü | Lexical Resource bir kriterdir | 128 C2 kelime + 30 kalıp + collocation + test |
| Çalışma planı | Programsız çalışma dağılır | 8 hafta × 7 gün |
| Tek çalma + transcript | Transcript'i önce görmek öğrenmeyi azaltır | Transcript gizli, sesli dikte |
| İlerleme takibi | Zayıf soru tipini görmek için | localStorage: her soruya verilen cevap, skorlar, görevler, hata defteri |

---

## 5. Nasıl kullanılır (günde 2 saat)

0. **Başlamadan önce:** Panel'deki **Genel Seviye Tespit Sınavı**'nı çöz; mevcut seviyen (CEFR) ve tahmini IELTS bandın otomatik belirlenir.
1. **Isınma + tekrar (15 dk):** Kelime kartları + Hata Defteri.
2. **Beceri bloğu 1 (40 dk):** Plana göre Reading veya Listening.
3. **Beceri bloğu 2 (40 dk):** Plana göre Writing veya Speaking.
4. **Kapanış (5 dk):** Kaçırdığın sorunun nedenini Hata Defteri'ne yaz.

Her **pazar**: bir tam mock (Reading + Listening + Writing) ve hata analizi.
Sonuçları Panel'deki **Ham puan → band** çevirici ile band'e dönüştür ve kaydet.

---

## 6. Test / doğrulama

```powershell
cd "C:\Users\Lenovo\Desktop\IELTS_UYGULAMA"
node tests/smoke-test.js
```

Bu test; tüm veri dosyalarını yükler, 9 sayfayı da (Panel, Plan, Reading, Listening, Writing,
Speaking, Kriterler, Kelime, Nasıl Kullanılır) Node içindeki basit bir DOM taklidiyle render eder,
10 sınavın her biri için Reading'de 3 metin / 40 soru, Listening'te 4 bölüm / 40 soru olduğunu,
soru numaralarının 1-40 arası kesintisiz olduğunu, her sorunun cevap + gerekçeye sahip olduğunu,
seçeneklerin cevaplarla tutarlı olduğunu ve band dönüşümlerinin doğru olduğunu kontrol eder.
Ayrıca seviye tespit sınavı verisini (25 soru, 4 seçenek, geçerli cevap/gerekçe, CEFR/band katmanları) ve
Panel'deki seviye tespit akışını (başlat → cevapla → otomatik sonuç → kaydet/temizle) doğrular.
Ayrıca **iOS/PWA paketlemesini** doğrular: `manifest.webmanifest` (geçerli JSON, standalone, 192/512 ikon),
`sw.js` (service worker), simge dosyalarının geçerli PNG ve doğru ölçüde olduğu, `index.html`'deki iOS meta
etiketleri ve `capacitor.config.json` yapılandırması.
**Beklenen sonuç: 160 başarılı, 0 başarısız.**
(400 Reading + 400 Listening sorusu + 18 seviye tespit kontrolü + 18 iOS/PWA kontrolü + 10 sınav × 7 sayfa render + 12 kalıcılık kontrolü)

---

## 7. Kaynak ve telif notu (önemli)

* Bu uygulamadaki metinler, diyaloglar, sorular ve model cevaplar **resmî IELTS formatı** ve
  **kamuya açık band tanımlayıcıları** temel alınarak **özgün** olarak yazılmıştır.
* Telifli **Cambridge IELTS 1-19** kitap metinleri **birebir kopyalanmamıştır**.
  Gerçek sınav pratiği için bu kitapları ve
  [ielts.org ücretsiz örnek sorularını](https://ielts.org/take-a-test/preparation-resources/sample-test-questions)
  bu uygulamayla **birlikte** kullan.
* Band ölçeği ve puan dönüşümleri `ielts.org — IELTS scoring in detail` sayfasına;
  kriter tanımları kamuya açık `IELTS Writing/Speaking band descriptors` belgelerine dayanır.

---

## 8. Dürüst sınırlar

* Uygulama **otomatik band puanı vermez.** Writing/Speaking için yalnızca model cevap ve kriter sunar.
  Haftada en az bir kez bir öğretmenden veya güvenilir bir değerlendirme servisinden geri bildirim al.
* Listening'deki bilgisayar sesi (Web Speech API) gerçek sınav kaydından daha nettir; cümleler
  arasına kısa boşluk eklenir. Bu yüzden hızı 1.1–1.25x yaparak çalışmak daha gerçekçidir.
* Speaking modülü ses kaydı almaz; yanıtlarını telefonunla kaydedip dinlemen önerilir.
* `localStorage` temizlenirse ilerleme ve hata defteri silinir. Önemli notlarını ayrıca yedekle.

---

## 9. iPhone'da çalıştırma (iOS)

Uygulama **aynı kaynak koddan** iPhone'da iki şekilde çalışır:

### A. PWA — bugün, Mac gerekmez ✅
1. Klasörü bir HTTPS adresinde yayınla (GitHub Pages / Netlify / Cloudflare Pages / Vercel).
2. Telefonda **Safari** ile aç → **Paylaş** → **Ana Ekrana Ekle**.
3. Ana ekrandaki **IELTS 8** simgesiyle **tam ekran**, **çevrimdışı** açılır (service worker önbelleği).

Eklenenler: `manifest.webmanifest`, `sw.js`, `icons/` (192/512/1024 + apple-touch-icon), iOS meta etiketleri
(`apple-mobile-web-app-capable`, `apple-mobile-web-app-title`, `viewport-fit=cover`) ve çentik/güvenli alan CSS'i.

### B. Yerel iOS uygulaması (Capacitor) — macOS + Xcode
```bash
npm install
npm run ios:add      # ios/ Xcode projesini oluşturur
npm run assets:ios   # resources/icon.png -> Xcode AppIcon
npm run ios:sync     # www/ üretir ve iOS projesine aktarır
npm run ios:open     # Xcode'da açar
```
Xcode'da **Signing & Capabilities → Team** seç, cihaz/simülatör seç, **▶ Run**.

> **Sınır:** iOS uygulaması yalnızca **macOS + Xcode** ile derlenir; Windows'ta `.ipa` üretilemez.
> Ayrıntılı adımlar ve bulut-Mac/CI seçeneği için **[`IOS_BUILD.md`](IOS_BUILD.md)** dosyasına bak.

### Yardımcı komutlar
| Komut | Açıklama |
|---|---|
| `node tests/smoke-test.js` | Tüm doğrulama testleri (160 kontrol) |
| `python tools/make_icons.py` | Simgeleri yeniden üretir |
| `node tools/copy-web.js` | Web paketini `www/` içine kopyalar |


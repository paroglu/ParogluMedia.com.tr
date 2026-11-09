# 12 Sahne ve Medya Haritası

| Sahne | Bölüm / dosya | İçerik durumu |
| --- | --- | --- |
| 01 | `#giris`, `scene/01-hero-and-dialogs.js` | Yatay/dikey 15 sn portföy videoları, slogan kesin |
| 02 | `#hakkimizda` | “Her Karenin Bir Hikâyesi Var.” kesin |
| 03 | `#hizmetler`, `scene/03-service-stacking.js` | Dört hizmet kesin; çekim kolajları kısmen temsili |
| 04 | `#markalar`, `scene/04-brand-marquee.js` | 3 kulüp orijinal, Safran/SGB/DEG logoları temsili |
| 05 | `#projeler`, `scene/05-perspective-works.js` | Karabük / Kepez / Çorlu gerçek PDF kapakları; Safran/SGB temsili |
| 06 | `#rakamlar`, `scene/06-countup-stats.js` | Doğrulanmış sayılar bekliyor |
| 07 | `#neden`, `scene/07-scrolling-reviews.js` | Siyah-beyaz Karabük arka planı, 5 **örnek** değerlendirme |
| 08 | `#notlar`, `scene/08-horizontal-journal.js` | 4 kamera arkası/üretim kartı; temsili metinler |
| 09 | `#sss`, `scene/09-accordion-faq.js` | Onaylı 6 soru/cevap |
| 10 | `#teklif`, `scene/10-project-brief.js` | Mor teklif alanı, lokal proje özeti formu |
| 11 | `#footer`, `scene/11-footer-reveals.js` | Dört bağlantı kartı, Instagram gerçek bağlantısı |
| 12 | `#paroglu-chat`, `scene/12-whatsapp-chat.js` | WhatsApp numarası bekliyor, demo mesaj hazırlama çalışır |

## Değiştirilecek medya

- `media/hero-desktop.mp4`, `media/hero-mobile.mp4`: 1080p gerçek master çıktı.
- `media/brand/paroglumedia-original-white-background.png`: şeffaf PNG/SVG ile yenile.
- `media/logos/*TEMSILI.png`: orijinal marka logolarıyla değiştir.
- `media/portfolio/safran-placeholder.webp`, `sgb-placeholder.webp`: orijinal proje kapakları.
- `media/journal/*.webp`: kamera arkası fotoğrafları / videoları.
- `media/why-city-karabuk-demo.webp`: kendi gece drone çekiminden uygun sinematik kare.

**Not:** `media/portfolio/` dosya adını değiştirirsen hem HTML içindeki resim `src`/`--art-image` değerlerini hem de `assets/js/scene/01-hero-and-dialogs.js` içindeki `workProjects` dizisini güncelle.

Sahne 06 gerçek sayılarını eklemek için `index.html` içindeki `.stat-number` elemanlarının `data-value` alanına yalnızca doğrulanmış tamsayıları yaz.

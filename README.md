# ParogluMedia V14 — GitHub Pages kaynak projesi

**Ana slogan:** Görünen değil, hatırlanan işler üretiyoruz.

Bu depo, kullanıcının onayladığı **12 sahnelik animasyonlu prototipin** GitHub'a uygun, bölümlere ayrılmış kaynak sürümüdür. Mevcut ekran kaydının yerleşim ve hareketlerini korumak için sade **HTML + CSS + JavaScript** tercih edildi: yeniden yazımla görünüm kaybı yaşamadan GitHub Pages'de ek derleme kurmadan çalışır. Bu sürüm *Next.js / TypeScript projesi değildir*.

## Hemen yerelde çalıştır

Python 3 yüklü bir bilgisayarda bu klasörü aç ve:

```bash
python -m http.server 8000
```

Sonra `http://localhost:8000` adresine gir. Windows'ta gerekirse `py -m http.server 8000` kullan. `index.html` dosyasına çift tıklamak da mümkün olsa da, video/clipboard gibi özellikleri doğru test etmek için **yerel sunucu** kullan.

## GitHub'a yükle ve test yayını al

1. GitHub'da yeni, boş bir repo aç: `paroglumedia-v14` (mevcut canlı repo'yu değiştirme).
2. Bu ZIP'i aç. **ZIP dosyasının kendisini değil, içindeki dosya ve klasörleri** reponun ana dizinine yükle. `.github` klasörü de dahil olmalı.
3. `main` dalına commit et. GitHub > **Settings > Pages > Build and deployment > Source: GitHub Actions** seç.
4. **Actions** sekmesinde `Publish ParogluMedia preview to GitHub Pages` işinin tamamlanmasını kontrol et.
5. Test adresi genellikle `https://KULLANICI-ADI.github.io/paroglumedia-v14/` olur. Bu adresi gerçek proje adınla doğrula.
6. Canlı alan adına geçmeden önce `docs/RELEASE_CHECKLIST.md` dosyasını tamamla.

> **Önemli:** `robots.txt` ve `noindex` ayarları, temsili içerikler nedeniyle arama motorlarının bu sürümü listelemesini engellemek içindir. Bu önizleme linki herkesin erişimine açık olabilir; özel bilgi ekleme.

## Klasörler

- `index.html`: 12 sahnenin erişilebilir HTML yapısı ve SEO meta etiketleri
- `assets/css/style.css`: mevcut görsel düzen, animasyon stili, responsive kurallar
- `assets/js/config.js`: **WhatsApp numarası** ve kamuya açık bağlantı yapılandırması
- `assets/js/scene/`: 01–12 için birbirinden ayrılmış JavaScript animasyon/etkileşim dosyaları
- `media/`: iki hero videosu, portföy kapakları, logolar, örnek içerikler
- `.github/workflows/pages.yml`: GitHub Pages test yayını
- `docs/CONTENT_MAP.md`: sahneler ve değiştirilecek medya haritası
- `docs/RELEASE_CHECKLIST.md`: yayın öncesi kalite/güvenilirlik kontrol listesi

## WhatsApp numarasını ekleme

`assets/js/config.js` dosyasında `whatsappNumber` alanını düzenle. Format: **ülke koduyla birlikte rakamlar**, artı/boşluk/parantez olmadan. Numara boşken bağlantı devre dışı kalır; yanlış numaraya yönlendirme yapılmaz. Bu bilgi web sayfasında herkese açık hale gelir; özel numaranı kullanmak istemiyorsan kurumsal hat seç.

## Portföy videoları

- `media/hero-desktop.mp4` (kaynak: `paroglu_hero_1080p.mp4` — gerçek 910×512)
- `media/hero-mobile.mp4` (kaynak: `paroglu_hero_mobile_1080x1920.mp4` — gerçek 512×910)

Dosya adları yüksek çözünürlük çağrıştırsa da mevcut videolar gerçek 1080p değildir. Orijinal yüksek çözünürlük gelirse **aynı dosya adlarıyla değiştir**, kod değiştirmeye gerek kalmaz.

## Mevcut kısıtlar

- Safran / SGB kapakları ve bazı müşteri logoları **temsili**.
- Müşteri yorumları **gerçek alıntı değildir**; demo etiketiyle sunulur.
- Deneyim/proje/müşteri sayısı girilmedi (`—` gösterir).
- Proje özeti formu yalnızca metin üretir, sunucuya veri **göndermez**.
- WhatsApp numarası boş; bağlantı bilerek **pasif**.
- `media/brand/paroglumedia-original-white-background.png` yüklediğin logonun beyaz arka planını koruyan PNG kopyasıdır. Şeffaf logo sağlandığında menüye görsel olarak entegre edilebilir.
- Proje kartları demo önizlemesi açıyor; ayrı case-study sayfaları henüz üretilmedi.
- Animasyonlar orijinal prototipteki CSS/JavaScript davranışlarına dayanır; GSAP veya Next.js bağımlılığı eklenmedi.

## Güvenlik / lisans

İçerikler, özgün marka tasarımları ve müşteri logoları proje sahibinin sağladığı materyallerdir. Genel kullanıma açık lisans verilmemiştir. Yayın hakkı ve müşteri logo kullanım onayı proje sahibi tarafından doğrulanmalıdır. Kodda herhangi bir API anahtarı veya parola bulunmamalıdır.

# ParogluMedia V14 — GitHub Pages görünüm düzeltmesi

Ekran görüntüsündeki beyaz ve düz metinli sayfanın sebebi, tarayıcıya CSS (ve olası JS) dosyalarının ulaşmamasıdır. Bu paket tasarım stillerini ve animasyon JavaScript'ini `index.html` içine gömer, tüm küçük görselleri de içerir. Bu sayede `assets/` veya `media/` yanlışlıkla yüklenmemiş olsa bile **tasarım ve etkileşimler görünür**. Ancak iki giriş videosu hâlâ `media/hero-desktop.mp4` ve `media/hero-mobile.mp4` dosyalarını gerektirir.

## En hızlı onarım

1. Şu an görünen bozuk sitenin GitHub reposunu aç. Ekran görüntüsünde tarayıcı adresi `paroglu.github.io` olarak görünüyor; doğru reponun ve yayınlanan dalın hangisi olduğunu GitHub `Settings > Pages` bölümünden doğrula.
2. Repoda **yayınlanan klasörün ana dizinindeki `index.html` dosyasını**, bu paketteki `index.html` ile **değiştir**. Eski dosyanın bir yedeğini al. ZIP'i tek parça halinde yükleme.
3. Masaüstü ve mobil giriş videolarının görünmesi için paketteki `media/hero-desktop.mp4` ve `media/hero-mobile.mp4` dosyalarının da **aynı yayın köküne göre** `media/` klasöründe olduğundan emin ol.
4. Değişiklikleri `main` dalına commit et, GitHub `Actions` ve `Settings > Pages` üzerinden yayın durumunu kontrol et.
5. Safari'de gizli sekme açıp yeniden yükle. CSS'nin yüklendiğinden emin ol, kart animasyonlarını ve sohbet panelini test et.

## Doğru dosya konumu

    (GitHub Pages yayın kökü)/
      index.html
      media/
        hero-desktop.mp4
        hero-mobile.mp4
        ... (diğer medya dosyaları; bu sürümde resimler index.html içine gömülüdür)

Eğer repo `paroglumedia-v14` ise URL `https://paroglu.github.io/paroglumedia-v14/` olabilir. Eğer repo `paroglu.github.io` ise adres genellikle `https://paroglu.github.io/` olur. Gerçek adresi `Settings > Pages` üzerinden belirle.

## Sürüm düzenleme notu

Bu, **hızlı onarım sürümüdür**. HTML içine stil, JS ve resim gömdüğümüzden değişiklik yapmak için orijinal `assets/css/style.css`, `assets/js/` ve `media/` kaynakları üzerinden tekrar paket üretmek gerekir. Bunların tümü ZIP'in içinde korunmuştur.

WhatsApp numarası şu anda boştur ve bilinçli olarak yönlendirme yapmaz. Demo müşteri yorumları, temsili referanslar ve diğer eksikler önceki sürümle aynıdır.

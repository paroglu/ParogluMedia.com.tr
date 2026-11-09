# Kalite kontrol notları

Prototipten git deposuna geçerken 12 sahnenin HTML yapısı ve CSS kuralları korundu, tek parça script 11 bağımsız sahne betiğine ayrıldı. Bu ayrıştırma, herhangi bir görsel veya video içeriğini yeniden üretmedi.

Kontroller: statik kaynakların yüklenmesi, boş WhatsApp numarasının güvenli şekilde pasif olması, FAQ tıklaması, mesaj taslağı, 320/390/768/1440px yatay taşma kontrolü, tarayıcı konsolu, reduced-motion.

Sürüm Next.js değil: var olan test edilmiş hareketleri korumak için bağımlılıksız statik tercih edildi. Gerçek projeye dönüşümden önce performans, SEO, erişilebilirlik ve cihaz testi tekrar edilmelidir.

## Gerçekleştirilen otomatik duman testleri (9 Kasım 2026)

`node --check` tüm 11 sahne betiği ve `config.js` için geçti. Chromium üzerinden gömülü CSS/JS/görsel testinde 1440×900, 768×1024, 390×844 ve 320×690 boyutlarında: bölüm sayıları, SSS aç/kapa, sohbet aç/kapa, mesaj taslağı, numara boşken güvenli pasif WhatsApp bağlantısı, görsel bütünlüğü ve yatay taşma kontrolü geçti. Her testte 0 JS page error ve 0 bozuk görsel görüldü. Reduced-motion ile panel açıldı.

**Test sınırlaması:** Bu ortamda Chromium'un `localhost` adresi yönetim politikasıyla engellendi; bu nedenle canlı HTTP sunucusuna karşı uçtan uca GitHub Pages dağıtımı testi yapılamadı. Gömülü HTML/CSS/JS ve kaynak görselleriyle eşdeğer arayüz davranış testi yapıldı; ayrıca HTML içindeki tüm yerel kaynak yollarının dosyaları mevcut olduğu doğrulandı. Kullanıcının gerçek cihazında ve GitHub Pages üzerinde tekrar kontrol gerekir.

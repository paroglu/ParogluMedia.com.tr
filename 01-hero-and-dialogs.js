(()=>{
      const mobile = matchMedia('(max-width: 800px)');
      const reduce = matchMedia('(prefers-reduced-motion: reduce)');
      const videos = [...document.querySelectorAll('.hero-video')];
      const toggle = document.getElementById('play-toggle');
      const overlay = document.getElementById('modal-overlay');
      const modalBody = document.getElementById('modal-body');
      const panel = document.getElementById('modal-panel');
      const close = document.getElementById('close-modal');
      let previousFocus = null;
      let manuallyPaused = false;
      function activeVideo(){return document.getElementById(mobile.matches ? 'hero-mobile':'hero-desktop')}
      async function updateVideo(){
        videos.forEach(v=>{ if(v!==activeVideo())v.pause() });
        const v=activeVideo();
        if(reduce.matches||manuallyPaused||document.hidden){v.pause();toggle.textContent='▶';toggle.setAttribute('aria-label','Arka plan videosunu oynat');return}
        try{await v.play();toggle.textContent='Ⅱ';toggle.setAttribute('aria-label','Arka plan videosunu duraklat')}
        catch(e){toggle.textContent='▶';toggle.setAttribute('aria-label','Arka plan videosunu oynat')}
      }
      mobile.addEventListener?.('change',updateVideo);reduce.addEventListener?.('change',updateVideo);
      document.addEventListener('visibilitychange',updateVideo);
      toggle.addEventListener('click',()=>{manuallyPaused=!activeVideo().paused;updateVideo()});
      let ticking=false;
      function updateScroll(){
        const p=Math.max(0,Math.min(1,window.scrollY/420));
        document.documentElement.style.setProperty('--scroll-progress',p);
        ticking=false;
      }
      window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});
      updateScroll();
      function showDialog(content){
        previousFocus=document.activeElement;
        modalBody.innerHTML=content;
        overlay.classList.add('open');
        document.body.style.overflow='hidden';
        panel.focus();
      }
      function hideDialog(){
        const video=modalBody.querySelector('video');if(video){video.pause();video.removeAttribute('src')}
        overlay.classList.remove('open');modalBody.innerHTML='';document.body.style.overflow='';(window.__journalPreviousFocus||previousFocus)?.focus();window.__journalPreviousFocus=null;
      }
      close.addEventListener('click',hideDialog);
      overlay.addEventListener('click',(e)=>{if(e.target===overlay)hideDialog()});
      document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&overlay.classList.contains('open'))hideDialog()});
      document.getElementById('showreel-button').addEventListener('click',()=>{
        const source=mobile.matches?'media/hero-mobile.mp4':'media/hero-desktop.mp4';
        showDialog(`<h3 id="dialog-title">PAROGLUMEDIA / SHOWREEL</h3><video controls autoplay playsinline src="${source}"></video><p>Girişte kullanılan 15 saniyelik portföy videosu.</p>`)
      });
      document.getElementById('proposal-button').addEventListener('click',()=>window.openParogluBrief());
      const serviceNames=['Video Prodüksiyon','Grafik Tasarım','Sosyal Medya','Drone & Fotoğraf'];
      const serviceDetails=[
        'Reklam filmi, etkinlik ve yaratıcı video prodüksiyonu. Bu demo kartında görsel örnekler geçicidir; gerçek çekim videoları daha sonra eklenecek.',
        'Kurumsal kimlik, spor medya tasarımları, kampanya görselleri ve özgün yaratıcı çalışmalar. Örnekler mevcut PDF portföyünden alınmıştır.',
        'Markalara özel kreatif içerik geliştirme, düzenli görsel ve video üretimi, sosyal medya yayınları için tasarım.',
        'Uçuş koşulları ve geçerli izinlere uygun drone çekimleri; mekan, ürün ve etkinlik fotoğrafçılığı. Gerçek örnek görseller sonra eklenecek.'
      ];
      document.querySelectorAll('.service-cta').forEach((el,i)=>el.addEventListener('click',(e)=>{
        e.preventDefault();
        showDialog(`<h3 id="dialog-title">${serviceNames[i]}</h3><p>${serviceDetails[i]}</p><p>Hizmetin ayrıntıları ve proje kapsamı için teklif formunu kullanabilirsin.</p>`);
      }));
      document.getElementById('open-menu').addEventListener('click',()=>showDialog('<h3 id="dialog-title">Menü</h3><div class="menu-list"><a href="#giris" data-jump>01 — Giriş</a><a href="#hakkimizda" data-jump>02 — Her Karenin Bir Hikâyesi Var</a><a href="#hizmetler" data-jump>03 — Hizmetler</a><a href="#markalar" data-jump>04 — Güçlü Markalar</a><a href="#projeler" data-jump>05 — Kreatif Projeler</a><a href="#rakamlar" data-jump>06 — Rakamlarla ParogluMedia</a><a href="#neden" data-jump>07 — Neden ParogluMedia?</a><a href="#notlar" data-jump>08 — Kreatif Dünyadan Notlar</a><a href="#sss" data-jump>09 — Sıkça Sorulan Sorular</a><a href="#teklif" data-jump>10 — Bir Fikrin mi Var?</a><a href="#footer" data-jump>11 — Footer ve Bağlantılar</a></div><p>WhatsApp sohbet panelini sağ alttaki düğmeden açabilirsin.</p>'));
      modalBody.addEventListener('click',(e)=>{const el=e.target.closest('[data-jump]');if(el){hideDialog();location.hash=el.getAttribute('href')}});

      const workProjects = [
        {name:'Karabük İdman Yurdu',kind:'SPOR / KREATİF TASARIM',src:'media/portfolio/karabuk.webp',desc:'Şehir hikâyesi temalı maç günü görseli. PDF portföyü sayfa 3.',demo:false},
        {name:'Kepezspor',kind:'SPOR / GÖRSEL KONSEPT',src:'media/portfolio/kepez.webp',desc:'Kaplan temalı sinematik maç günü tasarımı. PDF portföyü sayfa 22.',demo:false},
        {name:'Çorluspor 1947',kind:'SPOR / HİKÂYE TASARIMI',src:'media/portfolio/corlu.webp',desc:'Retro televizyon kompozisyonlu çalışma. PDF portföyü sayfa 15.',demo:false},
        {name:'Safran Üretim Çiftliği',kind:'ÜRÜN / KREATİF ÜRETİM',src:'media/portfolio/safran-placeholder.webp',desc:'Bu temsili bir proje kapağıdır. Gerçek çalışma görseli sonra eklenecek.',demo:true},
        {name:'SGB Motors',kind:'OTOMOTİV / KREATİF İÇERİK',src:'media/portfolio/sgb-placeholder.webp',desc:'Bu temsili bir proje kapağıdır. Gerçek çalışma görseli sonra eklenecek.',demo:true},
      ];
      document.querySelectorAll('[data-work-open]').forEach(b=>b.addEventListener('click',()=>{
        const p=workProjects[Number(b.dataset.workOpen)];
        showDialog(`<h3 id="dialog-title">${p.name}</h3><p>${p.kind} · ${p.demo?'TEMSİLİ KAPAK':'GERÇEK PORTFÖY'}</p><img class="work-project-image" src="${p.src}" alt="${p.name} ${p.demo?'temsili kapağı':'orijinal tasarımı'}"><p>${p.desc}</p><p>Tam proje detayları ve ek materyaller daha sonra eklenecek.</p>`)
      }));
      updateVideo();
    })();

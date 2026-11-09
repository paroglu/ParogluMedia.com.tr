// SAHNE 10 — local interactive project brief; DOES NOT SEND anything to a server.
  (()=>{
    const offer=document.getElementById('teklif');
    const showcase=document.getElementById('offer-showcase');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let raf=0;
    function update(){
      raf=0;
      if(reduced.matches){showcase.style.setProperty('--p','0');return;}
      const rect=offer.getBoundingClientRect();
      const distance=Math.max(1,innerHeight+rect.height);
      const p=Math.max(-1,Math.min(1,(innerHeight-(rect.top+rect.height*.5))/distance*2));
      showcase.style.setProperty('--p',p.toFixed(3));
    }
    function schedule(){if(!raf)raf=requestAnimationFrame(update)}
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
    reduced.addEventListener?.('change',schedule);
    if(reduced.matches||!('IntersectionObserver' in window))offer.classList.add('is-visible');
    else new IntersectionObserver((entries,observer)=>{if(entries.some(e=>e.isIntersecting)){offer.classList.add('is-visible');observer.disconnect()}},{threshold:.12}).observe(offer);
    update();
    const overlay=document.getElementById('modal-overlay');
    const panel=document.getElementById('modal-panel');
    const body=document.getElementById('modal-body');
    window.openParogluBrief=()=>{
      window.__journalPreviousFocus=document.activeElement;
      body.innerHTML=`<h3 id="dialog-title">Proje Özeti Hazırla</h3>
        <p class="brief-info">Bu önizlemede form bilgileriniz hiçbir yere gönderilmez. Hazırlanan özeti kopyalayıp daha sonra WhatsApp veya e-posta üzerinden paylaşabilirsiniz.</p>
        <form class="brief-form" id="brief-form">
          <label>Ad Soyad <input name="name" required maxlength="80" autocomplete="name" placeholder="Adınız Soyadınız"></label>
          <label>İletişim Bilgisi <input name="contact" required maxlength="120" placeholder="Telefon veya e-posta"></label>
          <label>İlgilendiğiniz Hizmet <select name="service" required><option value="">Seçiniz</option><option>Video Prodüksiyon</option><option>Grafik Tasarım</option><option>Sosyal Medya</option><option>Drone & Fotoğraf</option><option>Diğer</option></select></label>
          <label>Projenizi Anlatın <textarea name="details" required maxlength="1500" placeholder="Fikriniz, çekim yeri, hedef tarih ve diğer detaylar..."></textarea></label>
          <button type="submit">Proje Özeti Oluştur ↗</button>
        </form><div id="brief-result" aria-live="polite"></div>`;
      overlay.classList.add('open');document.body.style.overflow='hidden';panel.focus();
      const form=body.querySelector('#brief-form');
      form.addEventListener('submit',e=>{
        e.preventDefault();
        if(!form.reportValidity())return;
        const data=new FormData(form);
        const txt=`ParogluMedia — Proje Talebi\nAd Soyad: ${data.get('name')}\nİletişim: ${data.get('contact')}\nHizmet: ${data.get('service')}\nProje Detayı: ${data.get('details')}`;
        const result=body.querySelector('#brief-result');
        result.replaceChildren();
        const note=document.createElement('p');note.className='brief-info';note.textContent='Özet hazır. Henüz gönderilmedi. Aşağıdaki metni kopyalayabilirsiniz.';
        const pre=document.createElement('pre');pre.className='brief-output';pre.textContent=txt;
        const btn=document.createElement('button');btn.className='brief-copy';btn.type='button';btn.textContent='Özeti Kopyala';
        btn.addEventListener('click',async()=>{
          try{await navigator.clipboard.writeText(txt);btn.textContent='Kopyalandı ✓'}
          catch(e){const selection=getSelection();const range=document.createRange();range.selectNodeContents(pre);selection.removeAllRanges();selection.addRange(range);btn.textContent='Metni seçtik — kopyalayın'}
        });
        result.append(note,pre,btn);
      });
    };
    document.querySelectorAll('[data-open-brief]').forEach(btn=>btn.addEventListener('click',()=>window.openParogluBrief()));
  })();

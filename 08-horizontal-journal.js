// SAHNE 08: Masaüstünde referans kayıttaki yatay kart hareketi scroll'a bağlanır.
  // Mobilde native touch + scroll-snap kullanılır, dikey sayfa kaydırması engellenmez.
  (()=>{
    const outer=document.getElementById('journal-scroll');
    const rail=document.getElementById('journal-rail');
    const windowEl=document.getElementById('journal-rail-window');
    const counter=document.getElementById('journal-count');
    const progressBar=document.getElementById('journal-progress-bar');
    const cards=Array.from(rail.querySelectorAll('.journal-card'));
    const mobile=matchMedia('(max-width:850px)');
    const reduce=matchMedia('(prefers-reduced-motion:reduce)');
    let raf=0;
    function progress(){
      if(mobile.matches || reduce.matches){
        rail.style.transform='';
        const max=Math.max(1,windowEl.scrollWidth-windowEl.clientWidth);
        return Math.max(0,Math.min(1,windowEl.scrollLeft/max));
      }
      const r=outer.getBoundingClientRect();
      const max=Math.max(1,outer.offsetHeight-innerHeight);
      return Math.max(0,Math.min(1,-r.top/max));
    }
    function draw(){
      raf=0;
      const p=progress();
      if(!mobile.matches&&!reduce.matches){
        const travel=Math.max(0,rail.scrollWidth-innerWidth);
        rail.style.transform=`translate3d(${-travel*p}px,0,0)`;
      }
      progressBar.style.transform=`scaleX(${p.toFixed(4)})`;
      const index=Math.min(cards.length-1,Math.floor((p*.999999)*cards.length));
      counter.textContent=String(index+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
    }
    function schedule(){if(!raf)raf=requestAnimationFrame(draw)}
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
    windowEl.addEventListener('scroll',schedule,{passive:true});
    mobile.addEventListener?.('change',schedule);reduce.addEventListener?.('change',schedule);
    document.querySelectorAll('[data-journal-open]').forEach((btn)=>{
      btn.addEventListener('click',()=>{
        const n=Number(btn.dataset.journalOpen)-1;
        const item=cards[n];
        const title=item.querySelector('h3').textContent;
        const desc=item.querySelector('.journal-meta p').textContent;
        const image=item.querySelector('.journal-cover img');
        const body=`<h3 id="dialog-title">${title}</h3><p>${desc}</p>${image?`<img class="work-project-image" src="${image.getAttribute('src')}" alt="Orijinal proje tasarımı">`:''}<p><strong>Önizleme:</strong> Gerçek kamera arkası fotoğrafları veya videoları henüz eklenmedi. Bu içerik yayımlanmış bir makale değildir.</p>`;
        const overlay=document.getElementById('modal-overlay');
        const modalBody=document.getElementById('modal-body');
        const panel=document.getElementById('modal-panel');
        window.__journalPreviousFocus=document.activeElement;
        modalBody.innerHTML=body;
        overlay.classList.add('open');document.body.style.overflow='hidden';panel.focus();
      });
    });
    // Existing modal close handler was defined in a separate closure. It restores original focus internally.
    draw();
  })();

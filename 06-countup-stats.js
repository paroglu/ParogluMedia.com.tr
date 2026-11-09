// Sahne 06: doğru değerler girilene kadar em dash göster, sayıları kesinlikle uydurma.
  // Gerçek değerler gelince HTML data-value="" alanları sayılarla doldurulabilir.
  (()=>{
    const section=document.querySelector('#rakamlar');
    if(!section)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const values=[...section.querySelectorAll('.stat-number')];
    const fmt=new Intl.NumberFormat('tr-TR');
    function animateCounter(el){
      if(el.dataset.counted==='true')return;
      const raw=el.dataset.value.trim();
      const end=Number(raw);
      if(!raw || !Number.isFinite(end) || end<0){el.textContent='—';el.setAttribute('aria-label','Veri bekleniyor');return;}
      const suffix=el.dataset.suffix||'';
      el.dataset.counted='true';
      el.setAttribute('aria-label',`${fmt.format(end)}${suffix}`);
      if(reduced.matches){el.textContent=fmt.format(end)+suffix;return;}
      const start=performance.now(),duration=1450;
      const tick=now=>{
        const t=Math.min(1,(now-start)/duration);
        const eased=1-Math.pow(1-t,4);
        el.textContent=fmt.format(Math.round(end*eased))+(t===1?suffix:'');
        if(t<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
    let seen=false;
    const reveal=()=>{
      if(seen)return;
      seen=true;
      section.classList.add('in-view');
      values.forEach(animateCounter);
    };
    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>{
        if(entries.some(e=>e.isIntersecting)){reveal();observer.disconnect();}
      },{threshold:.12});
      observer.observe(section);
    } else reveal();
    if(reduced.matches)reveal();
  })();

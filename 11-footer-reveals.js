// SAHNE 11 — animation purely based on visibility and modest scroll position.
  (()=>{
    const footer=document.getElementById('footer');
    const reduced=matchMedia('(prefers-reduced-motion:reduce)');
    if(!footer)return;
    if(reduced.matches||!('IntersectionObserver' in window))footer.classList.add('is-visible');
    else new IntersectionObserver((entries,observer)=>{
      if(entries.some(e=>e.isIntersecting)){footer.classList.add('is-visible');observer.disconnect()}
    },{threshold:.04}).observe(footer);
    let raf=0;
    function update(){raf=0;
      if(reduced.matches){footer.style.setProperty('--footer-shift','0');return;}
      const rect=footer.getBoundingClientRect();
      const v=Math.max(-1,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)*2-1));
      footer.style.setProperty('--footer-shift',v.toFixed(3));
    }
    function schedule(){if(!raf)raf=requestAnimationFrame(update)}
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
    reduced.addEventListener?.('change',schedule);
    update();
    // The offer card is an in-page link; its details are still composed by the existing brief dialog.
    // No email or WhatsApp sending is claimed in this preview.
  })();

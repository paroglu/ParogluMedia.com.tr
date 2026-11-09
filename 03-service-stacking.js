(()=>{
    const cards=[...document.querySelectorAll('.service-card')];
    if(!cards.length) return;
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf=0;
    function render(){
      raf=0;
      if(motion.matches){cards.forEach(c=>{c.style.transform='';c.style.filter='';});return;}
      const stickyTop=innerHeight*.07;
      for(let i=0;i<cards.length;i++){
        const card=cards[i], next=cards[i+1];
        if(!next){card.style.transform='scale(1)';card.style.filter='none';continue;}
        const r=next.getBoundingClientRect();
        const p=Math.max(0,Math.min(1,(stickyTop+card.offsetHeight*.67-r.top)/(card.offsetHeight*.67)));
        card.style.transform=`scale(${(1-p*.065).toFixed(4)})`;
        card.style.filter=`blur(${(p*2.7).toFixed(2)}px)`;
      }
    }
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(render)};
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
    motion.addEventListener?.('change',schedule);render();
  })();

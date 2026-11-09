// Sahne 07: desktop: scroll progress -> yatay galeri; mobil: yerel dokunmatik yatay kaydirma.
  (()=>{
    const section=document.getElementById('why-track');
    const sticky=document.getElementById('why-sticky');
    const rail=document.getElementById('why-review-rail');
    const windowEl=document.getElementById('why-rail-window');
    const counter=document.getElementById('why-counter');
    const mobile=matchMedia('(max-width: 850px)');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const cards=[...rail.querySelectorAll('.why-review-card')];
    let raf=0;
    function draw(){
      raf=0;
      if(mobile.matches || reduced.matches){
        rail.style.transform='';
        sticky.style.setProperty('--why-progress','0');
        return;
      }
      const r=section.getBoundingClientRect();
      const dist=Math.max(1,section.offsetHeight-innerHeight);
      const p=Math.max(0,Math.min(1,-r.top/dist));
      // Include last card edge with 8vw end margin.
      const end=Math.max(0,rail.scrollWidth-innerWidth + innerWidth*.08);
      rail.style.transform=`translate3d(${-end*p}px,0,0)`;
      sticky.style.setProperty('--why-progress',p.toFixed(4));
      const index=Math.min(cards.length-1,Math.floor(p*cards.length));
      counter.textContent=String(index+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
    }
    function schedule(){if(!raf)raf=requestAnimationFrame(draw)}
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    mobile.addEventListener?.('change',schedule);reduced.addEventListener?.('change',schedule);
    windowEl.addEventListener('scroll',()=>{
      if(!mobile.matches&&!reduced.matches)return;
      const c=cards[0];if(!c)return;
      const page=Math.max(0,Math.min(cards.length-1,Math.round(windowEl.scrollLeft/(c.offsetWidth+14))));
      counter.textContent=String(page+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
    },{passive:true});
    draw();
  })();

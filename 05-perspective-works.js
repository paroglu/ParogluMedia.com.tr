// Sahne 05: Dikey kaydırmanın konumunu kart perspektifine deterministik olarak bağlayan önizleme.
  // Son GitHub sürümünde GSAP/ScrollTrigger ile yeniden değerlendirilecek.
  (()=>{
    const section=document.getElementById('works-scroll-track');
    const cards=[...document.querySelectorAll('.work-card')];
    const nav=[...document.querySelectorAll('[data-work-step]')];
    const current=document.getElementById('works-current');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const count=cards.length;
    if(!section||!count)return;
    let ticking=false,prevActive=-1;
    const clamp=(a,b,v)=>Math.min(b,Math.max(a,v));
    function render(){
      ticking=false;
      if(reduced.matches){
        cards.forEach((el,i)=>{el.style.transform='';el.style.opacity='1';el.style.filter='none';el.style.pointerEvents='auto';el.style.zIndex=String(count-i)});
        current.textContent='01';return;
      }
      const rect=section.getBoundingClientRect();
      const distance=Math.max(1,section.offsetHeight-innerHeight);
      const progress=clamp(0,1,-rect.top/distance)*(count-1);
      const active=clamp(0,count-1,Math.round(progress));
      const cw=cards[0].offsetWidth;
      cards.forEach((el,i)=>{
        const relative=i-progress;
        let x=0,y=0,scale=1,angle=0,opacity=1,z=100;
        if(relative>=0){
          const depth=Math.min(3,relative);
          x = depth===0?0:(depth%2 < 1 ? 1 : -1)*Math.min(depth*0.18*cw,150);
          // Relative 1,2,3 are alternated at a small angle behind the active card.
          const layer=Math.min(4,Math.max(0,Math.ceil(relative)));
          x=depth * (layer%2===0?1:-1)*Math.min(cw*.12,75);
          y=depth*17;
          scale=1-depth*.075;
          angle=depth*(layer%2===0?5:-6);
          opacity=clamp(0,1,1-Math.max(0,relative-2.7)*.4);
          z=100-Math.floor(Math.max(0,relative)*12);
        } else {
          const gone=-relative;
          x=-gone* Math.min(innerWidth*.98,1000);
          y=-gone*92;
          scale=1+gone*.09;
          angle=-gone*16;
          opacity=clamp(0,1,1-gone*1.3);
          z=120;
        }
        el.style.transform=`translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0) rotate(${angle.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        el.style.opacity=opacity.toFixed(3);
        el.style.zIndex=String(z);
        el.style.pointerEvents=i===active?'auto':'none';
        el.style.visibility=opacity<.02?'hidden':'visible';
        el.setAttribute('aria-hidden',i===active?'false':'true');
        const b=el.querySelector('.work-open');if(b)b.tabIndex=i===active?0:-1;
      });
      if(prevActive!==active){
        current.textContent=String(active+1).padStart(2,'0');
        nav.forEach((d,i)=>{if(i===active)d.setAttribute('aria-current','step');else d.removeAttribute('aria-current')});
        prevActive=active;
      }
    }
    const schedule=()=>{if(!ticking){ticking=true;requestAnimationFrame(render)}};
    nav.forEach((b,i)=>b.addEventListener('click',()=>{
      const sectionY=section.getBoundingClientRect().top+scrollY;
      const targetY=sectionY+Math.max(0,section.offsetHeight-innerHeight)*i/(count-1);
      scrollTo({top:targetY,behavior:reduced.matches?'auto':'smooth'});
    }));
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    reduced.addEventListener?.('change',schedule);
    render();
  })();

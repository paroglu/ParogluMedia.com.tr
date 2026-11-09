/* PAROGLUMEDIA V15 — Progressive enhancements; no AI credentials in browser. */
(()=>{
 'use strict';
 const doc=document,root=doc.documentElement;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const on=(node,name,callback,options)=>node&&node.addEventListener(name,callback,options);
 const qs=(selector)=>doc.querySelector(selector);
 /* Existing loader contains the exact original ParogluMedia logo.
    Visually move THAT logo to the visible header logo without creating a fake duplicate. */
 const loader=qs('.pm-intro-layer .pm-loader-logo');
 const headerLogo=qs('#giris .header .pm-logo-plate');
 const introActive=root.classList.contains('pm-loading');
 if(introActive&&loader&&headerLogo&&!reduced.matches){
   on(window,'pageshow',()=>{if(!root.classList.contains('pm-loading'))root.classList.add('pm-logo-landed')},{once:true});
   setTimeout(()=>{
     if(!root.classList.contains('pm-loading')){root.classList.add('pm-logo-landed');return;}
     const from=loader.getBoundingClientRect(),to=headerLogo.getBoundingClientRect();
     if(!from.width||!to.width){root.classList.add('pm-logo-landed');return;}
     const dx=to.left-from.left,dy=to.top-from.top,scale=to.width/from.width;
     let settled=false;
     const settle=()=>{if(settled)return;settled=true;root.classList.add('pm-logo-landed')};
     try{
       const flight=loader.animate([
         {transform:'translate3d(0,0,0) scale(1)',opacity:1,offset:0},
         {transform:`translate3d(${dx*.35}px,${dy*.52-18}px,0) scale(${1+(scale-1)*.36})`,opacity:1,offset:.48},
         {transform:`translate3d(${dx}px,${dy}px,0) scale(${scale})`,opacity:1,offset:1}
       ],{duration:920,delay:0,easing:'cubic-bezier(.19,.81,.18,1)',fill:'forwards'});
       flight.onfinish=settle;
       setTimeout(settle,1030);
     }catch{settle();}
   },550);
 }else root.classList.add('pm-logo-landed');
 /* Motion typography for each major scene, without breaking existing headings and semantics. */
 const revealSelectors=[
  '#hakkimizda .section-label','#hakkimizda h2','#hakkimizda .pm-intro-description','#hakkimizda .pm-intro-details',
  '#hizmetler .services-head h2','#markalar h2','#projeler h2','#rakamlar h2',
  '#neden h2','#notlar h2','#sss h2','#teklif .offer-description','#footer .footer-title'
 ];
 const revealed=[...new Set(revealSelectors.flatMap(x=>[...doc.querySelectorAll(x)]))];
 revealed.forEach((e,i)=>{e.classList.add('pm-v15-reveal');if(i%3===1)e.classList.add('pm-delay-1');if(i%3===2)e.classList.add('pm-delay-2')});
 if(reduced.matches||!('IntersectionObserver' in window))revealed.forEach(x=>x.classList.add('pm-v15-visible'));
 else{
   const io=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('pm-v15-visible');io.unobserve(entry.target)}}},{threshold:.07,rootMargin:'0px 0px -5% 0px'});
   revealed.forEach(x=>io.observe(x));
 }
 /* Gallery movement: only a single CSS variable is updated. No scroll-jacking. */
 const introVisual=qs('.pm-intro-visual'),introSection=qs('#hakkimizda');
 if(introVisual&&introSection&&!reduced.matches){
   let scheduled=false;
   const update=()=>{scheduled=false;const r=introSection.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const progress=(innerHeight/2-(r.top+r.height/2))/innerHeight;introVisual.style.setProperty('--pm-intro-parallax',`${Math.max(-23,Math.min(23,progress*34)).toFixed(2)}px`)};
   const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}};
   on(window,'scroll',schedule,{passive:true});on(window,'resize',schedule,{passive:true});update();
 }
 /* Tiny full-body avatar hovers/sits over header navigation; onclick hop only. */
 const nav=qs('#giris .nav'),avatar=qs('#pm-nav-mascot');
 if(nav&&avatar){
   const targets=[...nav.querySelectorAll('a[href^="#"]')];
   const place=(link,animate)=>{
     const n=nav.getBoundingClientRect(),l=link.getBoundingClientRect();
     const x=l.left-n.left+l.width/2;
     avatar.style.transition=animate&&!reduced.matches?'left .55s cubic-bezier(.25,.75,.18,1),opacity .25s':'opacity .25s';
     avatar.style.left=x+'px';avatar.classList.add('pm-ready');
     if(animate&&!reduced.matches){
       avatar.animate([{transform:'translateX(-50%) translateY(0) rotate(0)',offset:0},{transform:'translateX(-50%) translateY(-28px) rotate(-6deg)',offset:.48},{transform:'translateX(-50%) translateY(0) rotate(0)',offset:1}],{duration:560,easing:'cubic-bezier(.23,.65,.2,1)'})
     }
   };
   const first=targets.find(x=>x.getAttribute('href')==='#hakkimizda')||targets[0];
   if(first){requestAnimationFrame(()=>place(first,false));on(window,'resize',()=>{const current=nav.querySelector('a.pm-avatar-selected')||first;place(current,false)},{passive:true})}
   targets.forEach(link=>{
     on(link,'pointerenter',()=>{avatar.classList.add('pm-peek');setTimeout(()=>avatar.classList.remove('pm-peek'),450)});
     on(link,'click',()=>{targets.forEach(x=>x.classList.remove('pm-avatar-selected'));link.classList.add('pm-avatar-selected');place(link,true)});
   });
 }
 /* Full screen cinematic menu. Original legacy modal handler is suppressed ONLY for its menu button. */
 const menu=qs('#pm-cinema-menu'),openBtn=qs('#open-menu'),closeBtn=qs('#pm-cinema-close');
 if(menu&&openBtn&&closeBtn){
   let lastFocus=null;
   const menuItems=[...menu.querySelectorAll('.pm-menu-link')];
   const previewImg=qs('#pm-menu-preview-image'),previewTitle=qs('#pm-menu-preview-title'),previewSub=qs('#pm-menu-preview-sub');
   const previewSources=['karabuk','kepez','corlu','karabuk','kepez','corlu','karabuk','kepez','corlu','karabuk','kepez','corlu'].map(s=>'media/portfolio/'+s+'.webp');
   const preview=(link)=>{
     for(const item of menuItems)item.classList.toggle('pm-menu-active',item===link);
     const n=Number(link.dataset.pmMenuPreview||0);
     if(previewImg&&previewImg.getAttribute('src')!==previewSources[n]){previewImg.classList.add('pm-preview-changing');setTimeout(()=>{previewImg.src=previewSources[n];previewImg.classList.remove('pm-preview-changing')},130)}
     if(previewTitle)previewTitle.textContent=link.dataset.pmMenuTitle||'ParogluMedia';
     if(previewSub)previewSub.textContent=link.dataset.pmMenuSub||'';
   };
   const setOpen=(value)=>{
     if(value){lastFocus=doc.activeElement;menu.inert=false;menu.setAttribute('aria-hidden','false');menu.classList.add('pm-menu-open');doc.body.classList.add('pm-menu-lock');openBtn.setAttribute('aria-expanded','true');closeBtn.focus({preventScroll:true});}
     else{menu.classList.remove('pm-menu-open');menu.setAttribute('aria-hidden','true');menu.inert=true;doc.body.classList.remove('pm-menu-lock');openBtn.setAttribute('aria-expanded','false');(lastFocus||openBtn).focus({preventScroll:true});}
   };
   openBtn.setAttribute('aria-controls','pm-cinema-menu');openBtn.setAttribute('aria-expanded','false');
   on(openBtn,'click',ev=>{ev.preventDefault();ev.stopImmediatePropagation();setOpen(true)},true);
   on(closeBtn,'click',()=>setOpen(false));
   on(menu.querySelector('.pm-menu-backdrop'),'click',()=>setOpen(false));
   menuItems.forEach((a,i)=>{
     on(a,'pointerenter',()=>preview(a));on(a,'focus',()=>preview(a));
     on(a,'click',ev=>{
       if(a.getAttribute('href')==='#pm-ai-panel'){ev.preventDefault();ev.stopPropagation();setOpen(false);qs('#pm-ai-launcher')?.click();return}
       setOpen(false);
     });
   });
   if(menuItems[0])preview(menuItems[0]);
   on(doc,'keydown',ev=>{
     if(!menu.classList.contains('pm-menu-open'))return;
     if(ev.key==='Escape'){ev.preventDefault();ev.stopPropagation();setOpen(false);return;}
     if(ev.key==='Tab'){
       const links=[...menu.querySelectorAll('a,button')].filter(x=>x.getClientRects().length>0);
       if(!links.length)return;
       const first=links[0],last=links[links.length-1];
       if(ev.shiftKey&&doc.activeElement===first){ev.preventDefault();last.focus()}
       else if(!ev.shiftKey&&doc.activeElement===last){ev.preventDefault();first.focus()}
     }
   },true);
 }
 /* Phone video deck: real muted clips from approved existing site video until new reels arrive. */
 const phone=qs('#pm-phone-screen');
 if(phone){
   const slides=[...phone.querySelectorAll('.pm-phone-slide')];
   const reelVideos=slides.map(s=>s.querySelector('video'));
   const counter=qs('#pm-reel-index');
   let current=0,visible=false,drag=null;
   const pauseOthers=()=>reelVideos.forEach((v,i)=>{if(i!==current){v.pause();v.currentTime=0}});
   const playCurrent=()=>{
     pauseOthers();
     const v=reelVideos[current];
     if(!v||!visible||doc.hidden||reduced.matches)return;
     v.muted=true;v.playsInline=true;v.play().catch(()=>{});
   };
   const show=(n)=>{
     current=(n+slides.length)%slides.length;
     slides.forEach((s,i)=>{s.classList.toggle('is-current',i===current);s.classList.toggle('is-before',i<current)});
     if(counter)counter.textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
     playCurrent();
   };
   on(qs('#pm-reel-next'),'click',()=>show(current+1));
   on(qs('#pm-reel-prev'),'click',()=>show(current-1));
   // Do not preventDefault: natural page scrolling must remain functional on touch devices.
   on(phone,'touchstart',ev=>{if(ev.touches.length===1){drag={y:ev.touches[0].clientY,x:ev.touches[0].clientX}}},{passive:true});
   on(phone,'touchend',ev=>{if(!drag||!ev.changedTouches.length)return;const dy=ev.changedTouches[0].clientY-drag.y,dx=ev.changedTouches[0].clientX-drag.x;drag=null;if(Math.abs(dy)>45&&Math.abs(dy)>Math.abs(dx)*1.25)show(current+(dy<0?1:-1))},{passive:true});
   on(phone,'pointerdown',ev=>{if(ev.pointerType==='mouse')drag={y:ev.clientY,x:ev.clientX}});
   on(phone,'pointerup',ev=>{if(ev.pointerType!=='mouse'||!drag)return;const dy=ev.clientY-drag.y,dx=ev.clientX-drag.x;drag=null;if(Math.abs(dy)>45&&Math.abs(dy)>Math.abs(dx))show(current+(dy<0?1:-1))});
   on(phone,'keydown',ev=>{if(ev.key==='ArrowUp'||ev.key==='ArrowDown'){ev.preventDefault();show(current+(ev.key==='ArrowDown'?1:-1))}});
   if('IntersectionObserver' in window){
     new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)playCurrent();else reelVideos.forEach(v=>v.pause())},{threshold:.12}).observe(phone);
   }else{visible=true;playCurrent()}
   on(doc,'visibilitychange',()=>doc.hidden?reelVideos.forEach(v=>v.pause()):playCurrent());
   show(0);
 }
})();

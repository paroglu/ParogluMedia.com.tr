(()=>{
    const tracks=[...document.querySelectorAll('.marquee-track')];
    if(!tracks.length)return;
    // Hover'da logolarin akisini durdurmadan yavaslat. Fare cikinca dogal hizina don.
    tracks.forEach(track=>{
      const row=track.closest('.marquee');
      let motion=track.getAnimations()[0];
      if(!motion) return;
      let frame=0,target=1;
      function easeRate(){
        frame=0;
        const next=motion.playbackRate+(target-motion.playbackRate)*.15;
        motion.playbackRate=Math.abs(next-target)<.015?target:next;
        if(motion.playbackRate!==target)frame=requestAnimationFrame(easeRate);
      }
      function adjust(next){target=next;if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(easeRate)}
      row.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')adjust(.22)});
      row.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')adjust(1)});
    });
    document.getElementById('brands-cta')?.addEventListener('click',()=>document.getElementById('proposal-button')?.click());
  })();

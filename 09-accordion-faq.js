// SAHNE 09 — accessible single-open FAQ; no external animation libraries required.
  (()=>{
    const section=document.getElementById('sss');
    const items=[...document.querySelectorAll('#faq-list .faq-item')];
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const setOpen=(item,open)=>{
      item.dataset.open=String(open);
      const btn=item.querySelector('.faq-question');
      const answer=item.querySelector('.faq-answer');
      btn.setAttribute('aria-expanded',String(open));
      answer.inert=!open;
    };
    items.forEach(item=>{
      const btn=item.querySelector('.faq-question');
      btn.addEventListener('click',()=>{
        const next=item.dataset.open!=='true';
        items.forEach(i=>setOpen(i,i===item&&next));
      });
    });
    if(reduced.matches||!('IntersectionObserver' in window))section.classList.add('is-visible');
    else{
      const observer=new IntersectionObserver(entries=>{
        if(entries.some(e=>e.isIntersecting)){
          section.classList.add('is-visible');observer.disconnect();
        }
      },{rootMargin:'0px 0px -12% 0px',threshold:.10});
      observer.observe(section);
    }
    document.getElementById('faq-contact').addEventListener('click',()=>window.openParogluBrief());
  })();

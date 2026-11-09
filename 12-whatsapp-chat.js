// SAHNE 12 — Local message preview + WhatsApp handoff. No data is sent by this demo.
(()=>{
  // Gerçek WhatsApp numarası onaylandıktan sonra 90XXXXXXXXXX formatında giriniz.
  // Burada hiçbir örnek/sahte telefon numarası kullanılmaz.
  const WHATSAPP_E164 = String(window.PAROGLUMEDIA_CONFIG?.whatsappNumber || '');
  const sanitizedNumber=WHATSAPP_E164.replace(/[^0-9]/g,'');
  const numberReady=/^[1-9][0-9]{9,14}$/.test(sanitizedNumber);
  const launch=document.getElementById('chat-launcher');
  const drawer=document.getElementById('paroglu-chat');
  const dismiss=document.getElementById('chat-dismiss');
  const textarea=document.getElementById('chat-text');
  const preview=document.getElementById('chat-preview-slot');
  const form=document.getElementById('chat-form');
  const copyBtn=document.getElementById('chat-copy');
  const wa=document.getElementById('chat-whatsapp');
  const status=document.getElementById('chat-status');
  const transcript=document.getElementById('chat-transcript');
  let preparedMessage='';
  const isOpen=()=>launch.getAttribute('aria-expanded')==='true';
  function setOpen(open){
    launch.setAttribute('aria-expanded',String(open));
    launch.setAttribute('aria-label',open?'ParogluMedia sohbet panelini kapat':'ParogluMedia sohbet panelini aç');
    drawer.classList.toggle('chat-open',open);
    drawer.setAttribute('aria-hidden',String(!open));
    drawer.inert=!open;
    if(open){dismiss.focus();}else{launch.focus();}
  }
  launch.addEventListener('click',()=>setOpen(!isOpen()));
  dismiss.addEventListener('click',()=>setOpen(false));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&isOpen()){e.preventDefault();setOpen(false);}
  });
  document.addEventListener('pointerdown',e=>{
    if(isOpen()&&!drawer.contains(e.target)&&!launch.contains(e.target)){setOpen(false);}
  });
  function updateWhatsApp(){
    if(!numberReady || !preparedMessage){
      wa.removeAttribute('href');wa.setAttribute('aria-disabled','true');wa.tabIndex=-1;
    }else{
      wa.href='https://wa.me/'+sanitizedNumber+'?text='+encodeURIComponent(preparedMessage);
      wa.target='_blank';wa.rel='noopener noreferrer';
      wa.setAttribute('aria-disabled','false');wa.tabIndex=0;
    }
  }
  function setStatus(text,css=''){
    status.textContent=text;
    status.className='chat-status '+css;
  }
  function setPrepared(text){
    const msg=text.trim().slice(0,1000);
    if(!msg){textarea.focus();return;}
    preparedMessage=msg;
    const bubble=document.createElement('div');bubble.className='chat-message chat-mine';
    bubble.textContent=msg;
    const caption=document.createElement('small');caption.textContent='Hazırlandı • Henüz gönderilmedi';bubble.appendChild(caption);
    preview.replaceChildren(bubble);
    copyBtn.disabled=false;
    updateWhatsApp();
    setStatus(numberReady?'Mesaj hazır. WhatsApp uygulamasında gönderimi tamamlayabilirsiniz.':'Mesaj hazırlandı, ancak numara henüz eklenmedi. Metni kopyalayabilirsiniz.',numberReady?'chat-success':'chat-warning');
    transcript.scrollTo({top:transcript.scrollHeight,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  }
  form.addEventListener('submit',e=>{e.preventDefault();setPrepared(textarea.value)});
  textarea.addEventListener('input',()=>{
    if(preparedMessage&&textarea.value.trim()!==preparedMessage){
      preparedMessage='';preview.replaceChildren();copyBtn.disabled=true;
      updateWhatsApp();setStatus('Mesajınız değişti. Göndermeden önce yeniden hazırlayın.');
    }
  });
  document.querySelectorAll('[data-chat-suggest]').forEach(btn=>btn.addEventListener('click',()=>{
    textarea.value=btn.getAttribute('data-chat-suggest');
    preparedMessage='';preview.replaceChildren();copyBtn.disabled=true;updateWhatsApp();
    setStatus('Örnek mesajı düzenleyebilir, ardından hazırlayabilirsiniz.');
    textarea.focus();
  }));
  copyBtn.addEventListener('click',async()=>{
    if(!preparedMessage)return;
    try{
      await navigator.clipboard.writeText(preparedMessage);
      setStatus('Mesaj panoya kopyalandı.','chat-success');
    }catch(e){
      // Clipboard API file:// veya güvensiz bağlamda kapalı olabilir.
      textarea.value=preparedMessage;textarea.focus();textarea.select();
      setStatus('Metin seçildi. Cihazınızın kopyalama komutunu kullanın.','chat-warning');
    }
  });
  wa.addEventListener('click',e=>{
    if(!numberReady||!preparedMessage){e.preventDefault();setStatus('WhatsApp numarası onaylanmadığı için bağlantı açılmadı.','chat-warning');}
  });
  updateWhatsApp();
})();

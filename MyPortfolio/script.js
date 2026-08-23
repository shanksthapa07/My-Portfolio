(function(){
  const root=document.documentElement;
  const themeToggle=document.getElementById('themeToggle');
  const sunIcon=document.getElementById('iconSun');
  const moonIcon=document.getElementById('iconMoon');
  let isLight=false;
  function applyTheme(){
    if(isLight){root.setAttribute('data-theme','light');sunIcon.style.display='none';moonIcon.style.display='block';}
    else{root.removeAttribute('data-theme');sunIcon.style.display='block';moonIcon.style.display='none';}
  }
  applyTheme();
  themeToggle.addEventListener('click',()=>{isLight=!isLight;applyTheme();});

  const menuToggle=document.getElementById('menuToggle');
  const nav=document.getElementById('nav');
  menuToggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded',open);
  });
  document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
  }));

  const sections=[...document.querySelectorAll('main section[id]')];
  const links=[...document.querySelectorAll('.nav-link')];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id));
      }
    });
  },{rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(s=>observer.observe(s));

  const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}
  }),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  const yearEl=document.getElementById('year');
  if(yearEl) yearEl.textContent=new Date().getFullYear();

  const form=document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(e.currentTarget);
      const subject=encodeURIComponent('Portfolio contact from '+data.get('name'));
      const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
      window.location.href=`mailto:thapa07shankar@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();

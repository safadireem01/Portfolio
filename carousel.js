// Mobile menu
const burger=document.getElementById('burger'),links=document.getElementById('links');
burger.addEventListener('click',()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
// Image carousels
document.querySelectorAll('.carousel-wrapper').forEach(w=>{
  const s=w.querySelector('.project-images');
  w.querySelector('.prev')?.addEventListener('click',()=>s.scrollBy({left:-s.clientWidth*.8}));
  w.querySelector('.next')?.addEventListener('click',()=>s.scrollBy({left:s.clientWidth*.8}));
});

// ===== Animations =====
document.documentElement.classList.add('js');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// nav shadow on scroll
const navEl=document.querySelector('.nav');
addEventListener('scroll',()=>navEl.classList.toggle('scrolled',scrollY>8),{passive:true});
// scroll reveal with stagger
const targets=document.querySelectorAll('.card,.case,.tl li,.head,.page-title,.skill-group,.contact .wrap,.two>div');
targets.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--d',(i%3)*0.1+'s')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
targets.forEach(el=>io.observe(el));
// count-up stats
document.querySelectorAll('[data-count]').forEach(el=>{
  const end=+el.dataset.count,suf=el.dataset.suffix||'';
  if(reduce){el.textContent=end+suf;return}
  el.textContent='0'+suf;
  const t0=performance.now()+600,dur=1200;
  const tick=now=>{const p=Math.min(Math.max((now-t0)/dur,0),1);
    el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
});

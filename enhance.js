/* Cursor, ultra-smooth scroll, spotlight/tilt hovers and intro sound */
(()=>{
const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)];
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---- links from config.js ---- */
qsa('[data-link]').forEach(a=>{const u=SITE.links[a.dataset.link];if(u)a.href=u;if(a.dataset.link==='email')a.removeAttribute('target')});
if(typeof translations!=='undefined'){translations.en['avatar.cap']='Me, in my natural habitat — behind a laptop, building.';translations.ar&&(translations.ar['avatar.cap']='أنا في بيئتي الطبيعية — قدّام اللابتوب، بابني.')}

/* ---- custom cursor: dot + eased ring ---- */
if(fine){
 const dot=qs('#cursor'),ring=qs('#cursorTrail');let x=-100,y=-100,rx=-100,ry=-100,shown=false;
 const place=(el,a,b)=>el.style.transform=`translate3d(${a}px,${b}px,0)`;
 addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;place(dot,x,y);if(!shown){shown=true;rx=x;ry=y;dot.classList.add('on');ring.classList.add('on')}},{passive:true});
 document.documentElement.addEventListener('mouseleave',()=>{dot.classList.remove('on');ring.classList.remove('on');shown=false});
 const tick=()=>{rx+=(x-rx)*.16;ry+=(y-ry)*.16;place(ring,rx,ry);requestAnimationFrame(tick)};tick();
 const HOVER='a,button,input,textarea,label,.skill,.social,.service-card,[role=button]';
 addEventListener('mouseover',e=>{const t=e.target;ring.classList.toggle('view',!!t.closest('.project-card'));ring.classList.toggle('hover',!!t.closest(HOVER)&&!t.closest('.project-card'))});
 addEventListener('mousedown',()=>ring.classList.add('down'));addEventListener('mouseup',()=>ring.classList.remove('down'));
}else{qs('#cursor')?.remove();qs('#cursorTrail')?.remove()}

/* ---- spotlight + tilt ---- */
qsa('.service-card,.project-card,.skill,.social,.contact-form').forEach(el=>el.addEventListener('pointermove',e=>{
 const r=el.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;el.style.setProperty('--mx',px+'px');el.style.setProperty('--my',py+'px');
 if(fine&&!reduced&&el.classList.contains('project-card'))el.style.transform=`translateY(-8px) rotateX(${(.5-py/r.height)*5}deg) rotateY(${(px/r.width-.5)*6}deg)`}));
qsa('.project-card').forEach((el,i)=>{el.style.transitionDelay=(i%3)*90+'ms';el.addEventListener('pointerleave',()=>{el.style.transform='';el.style.transitionDelay='0ms'})});
qsa('.service-card,.skill').forEach((el,i)=>el.style.transitionDelay=(i%4)*70+'ms');

/* ---- active nav + progress ---- */
const bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
const links=qsa('.nav-links a[href^="#"]'),secs=links.map(a=>qs(a.getAttribute('href'))).filter(Boolean);
const onScroll=()=>{const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${m>0?scrollY/m:0})`;
 let cur=secs[0];secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)cur=s});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur?.id))};
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* ---- ultra-smooth inertial scroll (desktop) ---- */
if(fine&&!reduced){
 document.documentElement.style.scrollBehavior='auto';
 let cur=scrollY,target=scrollY,run=false;const max=()=>document.documentElement.scrollHeight-innerHeight;
 const loop=()=>{cur+=(target-cur)*.085;if(Math.abs(target-cur)<.4){cur=target;run=false}scrollTo({top:cur,behavior:'instant'});if(run)requestAnimationFrame(loop)};
 const go=t=>{target=Math.max(0,Math.min(max(),t));if(!run){run=true;cur=scrollY;requestAnimationFrame(loop)}};
 addEventListener('wheel',e=>{if(e.ctrlKey||document.body.style.overflow==='hidden'||e.target.closest('.project-modal,.settings-panel'))return;e.preventDefault();go((run?target:scrollY)+e.deltaY*(e.deltaMode===1?34:.95))},{passive:false});
 addEventListener('scroll',()=>{if(!run)cur=target=scrollY},{passive:true});
 addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.getAttribute('href')==='#')return;const t=qs(a.getAttribute('href'));if(!t)return;e.preventDefault();go(t.getBoundingClientRect().top+scrollY-(t.id==='home'?0:40))});
}

})();

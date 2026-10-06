/* Intro sound (synthesised with Web Audio, no audio files) */
(()=>{
const qs=s=>document.querySelector(s);
const AC=window.AudioContext||window.webkitAudioContext;let ctx,out,wet,conv;

try{ctx=new AC();out=ctx.createGain();out.gain.value=.9;out.connect(ctx.destination);
 conv=ctx.createConvolver();const len=ctx.sampleRate*2.4,buf=ctx.createBuffer(2,len,ctx.sampleRate);
 for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
 conv.buffer=buf;wet=ctx.createGain();wet.gain.value=.45;conv.connect(wet);wet.connect(out)}catch(e){ctx=null}
const live=()=>ctx&&ctx.state==='running';
function tone(f,dur,vol,type,att,when){if(!live())return;const t=ctx.currentTime+(when||0),o=ctx.createOscillator(),g=ctx.createGain();o.type=type||'sine';o.frequency.value=f;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+(att||.01));g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(out);g.connect(conv);o.start(t);o.stop(t+dur+.05)}
window.IS={
 afterType(){if(!live())return;const t=ctx.currentTime,n=ctx.createBufferSource(),b=ctx.createBuffer(1,ctx.sampleRate*1.2,ctx.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;n.buffer=b;const f=ctx.createBiquadFilter(),g=ctx.createGain();f.type='bandpass';f.Q.value=1.2;
  f.frequency.setValueAtTime(250,t);f.frequency.exponentialRampToValueAtTime(3200,t+.9);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.16,t+.5);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);
  n.connect(f);f.connect(g);g.connect(out);g.connect(conv);n.start(t);tone(98,1.4,.22,'sine',.5)},
 letter(i){const s=[523.25,587.33,659.25,783.99,880][i%5];tone(s,1.1,.2,'triangle',.008);tone(s*2,.7,.06,'sine',.005);tone(s/2,1.2,.08,'sine',.02)},
 finish(){if(!live())return;[261.63,329.63,392,587.33].forEach((f,i)=>tone(f,2.6,.11,'sine',.35,i*.05));tone(1046.5,1.8,.05,'sine',.01,.25);tone(1318.5,1.8,.04,'sine',.01,.4);
  out.gain.setTargetAtTime(0,ctx.currentTime+1.6,.5);}
};

/* ---- click-to-start gate: browsers only allow sound after a user gesture ---- */
window.introGate=new Promise(done=>{
 const pre=document.querySelector('#preloader');
 if(!ctx||ctx.state==='running'||!pre)return done();
 const g=document.createElement('button');g.type='button';g.className='intro-gate';
 g.innerHTML='<span class="gate-ring"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg></span><span class="gate-text">Click anywhere to start</span><small>sound on</small>';
 pre.appendChild(g);
 let used=false;const go=()=>{if(used)return;used=true;['pointerdown','keydown','touchstart'].forEach(v=>removeEventListener(v,go,true));
  const finish=()=>{g.classList.add('out');setTimeout(()=>{g.remove();done()},450)};ctx.resume().then(finish,finish)};
 ['pointerdown','keydown','touchstart'].forEach(v=>addEventListener(v,go,true));
});
})();

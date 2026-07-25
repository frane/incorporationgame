"use strict";
/* ================================================================
   INCORPORATION — a bird's-eye bureaucracy adventure
   ================================================================ */
const CV = document.getElementById('cv'), X = CV.getContext('2d');
const W = 960, H = 600, T = 32;
X.imageSmoothingEnabled = false;

/* ---------------- audio ---------------- */
let AC = null;
function ac(){ if(!AC){ try{ AC = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
  if(AC && AC.state==='suspended'){ try{ AC.resume(); }catch(e){} } return AC; }
function tone(f,d,type,v,when){ if(typeof MUS!=='undefined' && !MUS.on) return;
  const a=ac(); if(!a) return; type=type||'square'; v=v||0.04; when=when||0;
  const o=a.createOscillator(), g=a.createGain();
  o.type=type; o.frequency.value=f;
  g.gain.setValueAtTime(v, a.currentTime+when);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime+when+d);
  o.connect(g); g.connect(a.destination);
  o.start(a.currentTime+when); o.stop(a.currentTime+when+d+0.03);
}
const MUS={on:true, timer:null, step:0};
function musicStart(){
  const a=ac(); if(!a || MUS.timer) return;
  const lead=[0,3,7,10,12,10,7,3, 0,3,7,10, 15,12,10,7];
  MUS.timer=setInterval(()=>{
    if(!MUS.on || !G || G.scene==='title') return;
    const st=MUS.step++;
    const base=110*Math.pow(2,(st%64<32?0:5)/12);
    if(st%2===0) tone(base, 0.30, 'triangle', 0.016);
    const n=lead[st%16];
    if(n!==null) tone(220*Math.pow(2,n/12), 0.16, 'square', G.waiting?0.006:0.011);
  }, 300);
}
const sfx = {
  blip : ()=>tone(620,0.045,'square',0.025),
  ok   : ()=>{ tone(660,.07); tone(880,.09,'square',.035,.07); },
  cash : ()=>{ tone(1150,.05,'triangle',.05); tone(870,.09,'triangle',.045,.05); },
  doc  : ()=>{ tone(170,.09,'sawtooth',.05); tone(115,.12,'sawtooth',.04,.06); },
  coffee:()=>{ tone(740,.06,'sine',.05); tone(990,.09,'sine',.04,.06); },
  deny : ()=>tone(200,.13,'square',.05),
  step : ()=>tone(440,.05,'triangle',.03),
  win  : ()=>{ [523,659,784,1047,1319].forEach((f,i)=>tone(f,.22,'square',.04,i*.13)); },
  sad  : ()=>{ [392,330,262,196].forEach((f,i)=>tone(f,.25,'sawtooth',.035,i*.18)); },
};

/* ---------------- helpers ---------------- */
function h2(x,y){ let n=(x|0)*374761393 + (y|0)*668265263; n=(n^(n>>13))*1274126177; return ((n^(n>>16))>>>0)/4294967295; }
function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
function val(f){ return (typeof f==='function') ? f(G) : f; }
function fmtMoney(n){ n=Math.round(n); return (n<0?'-':'')+'€'+Math.abs(n).toLocaleString('en-US'); }
function wrapText(str, maxW, font){ X.font=font; const words=String(str).split(' '); const lines=[]; let cur='';
  for(const w of words){ const t=cur?cur+' '+w:w; if(X.measureText(t).width>maxW && cur){ lines.push(cur); cur=w; } else cur=t; }
  if(cur) lines.push(cur); return lines; }

/* ================================================================
   COUNTRY DATA — the whole point of the game
   Step fields: who, lines[], cost (fees), capital (locked, still
   "yours"), wait (days), san (sanity damage), doc, choice
   ================================================================ */

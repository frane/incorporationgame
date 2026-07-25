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
const MUS={on:true, timer:null, next:0, step:0, bus:null};
function musBus(){
  const a=ac(); if(!a) return null;
  if(!MUS.bus){
    const master=a.createGain(); master.gain.value=0.55; master.connect(a.destination);
    const dly=a.createDelay(0.6); dly.delayTime.value=0.27;
    const fb=a.createGain(); fb.gain.value=0.25; dly.connect(fb); fb.connect(dly);
    const wet=a.createGain(); wet.gain.value=0.32; dly.connect(wet); wet.connect(master);
    MUS.bus={master, dly};
  }
  return MUS.bus;
}
function mnote(t,midi,dur,type,vol,echo){
  const a=ac(); const b=musBus(); if(!a||!b) return;
  const o=a.createOscillator(), g=a.createGain();
  o.type=type; o.frequency.value=440*Math.pow(2,(midi-69)/12);
  g.gain.setValueAtTime(0.0001,t);
  g.gain.linearRampToValueAtTime(vol,t+0.02);
  g.gain.setValueAtTime(vol,t+dur*0.5);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(b.master);
  if(echo) g.connect(b.dly);
  o.start(t); o.stop(t+dur+0.05);
}
/* a calm Am - F - C - G chip loop; melody enters every other half */
const MUS_CHORDS=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]];
const MUS_MEL=[76,null,74,null,72,null,74,76, 77,null,76,null,74,null,72,null,
               76,null,79,null,77,null,76,74, 72,null,74,null,69,null,null,null];
function musicStart(){
  const a=ac(); if(!a || MUS.timer) return;
  MUS.next=a.currentTime+0.1;
  MUS.timer=setInterval(()=>{
    const a2=ac(); if(!a2) return;
    if(!MUS.on || !G || G.scene==='title'){ MUS.next=Math.max(MUS.next,a2.currentTime+0.1); return; }
    const spb=0.27;
    while(MUS.next < a2.currentTime+0.45){
      const st=MUS.step, t=MUS.next;
      const bar=(st>>3)%4, half=(st>>5)%2, chord=MUS_CHORDS[bar];
      const duck=G.waiting?0.45:1;
      if(st%8===0) mnote(t,chord[0]-12,spb*3.2,'triangle',0.055*duck,false);
      if(st%8===4) mnote(t,chord[0]-12+(bar===3?2:0),spb*3.2,'triangle',0.045*duck,false);
      const ai=[0,1,2,1,0,1,2,1][st%8];
      if(!(st%8===7 && bar%2===1)) mnote(t,chord[ai]+(half?12:0),spb*0.95,'square',0.016*duck,true);
      const mv=MUS_MEL[st%32];
      if(mv!==null && half) mnote(t,mv,spb*1.9,'triangle',0.03*duck,true);
      MUS.step++; MUS.next+=spb;
    }
  },110);
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

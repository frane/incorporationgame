/* ================================================================
   GAME STATE
   ================================================================ */
const SAVE_KEY='incorporation_save_v1';
function lsGet(k,d){ try{ const v=localStorage.getItem(k); return v? JSON.parse(v):d; }catch(e){ return d; } }
function lsSet(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
const ACH_DEF=[
  ['first','First Blood (Legal)','incorporate anywhere'],
  ['speed','Speedrun','incorporate in a single day'],
  ['de','Endboss','complete Germany'],
  ['de_zen','Zen Master','Germany without a breakdown'],
  ['pt_name','It Is MY Name','Portugal: keep your own name'],
  ['mt','The Patient One','complete Malta'],
  ['broke','Out of Runway','go bankrupt on stamps'],
  ['coffee','Caffeinated','8 coffees in one run'],
  ['five','Jurisdiction Collector','incorporate in 5 countries'],
  ['all','Serial Founder','incorporate in all 28'],
];
let ACH=lsGet('inc_ach',{}), DONE=lsGet('inc_done',{}), PB=lsGet('inc_pb',{});
function award(id){
  if(ACH[id]) return;
  ACH[id]=1; lsSet('inc_ach',ACH);
  const d=ACH_DEF.find(a=>a[0]===id);
  if(G){ (G.newAch=G.newAch||[]).push(d?d[1]:id); toast('🏆 '+(d?d[1]:id)); }
  sfx.ok();
}
let hubMap=null;
let G=null;

function newGame(coName){
  return {
    scene:'title', coName:coName||'Yolo', renamed:null,
    days:0, money:30000, feesSpent:0, lockedCap:0, sanity:100,
    docs:[], progress:{}, vars:{}, visited:{}, bounces:{}, livingSpent:0,
    map:null, inOffice:-1, hubReturn:null,
    px:40*T+16, py:36*T+8, dir:1, moving:false, animT:0,
    dlg:null, waiting:null, fade:null, toasts:[], floaters:[],
    coffees:[], pendingWait:0, brokeDown:false, done:null, t:0,
    moneyFlash:0, dayFlash:0, winSel:0,
  };
}
function initCoffees(g){
  g.coffees=[];
  const spots=[[12,9],[34,9],[58,9],[20,18],[47,18],[68,18],[7,30],[72,30],[40,44],[15,54],[52,54],[68,54],[30,62],[55,62]];
  for(const [x,y] of spots) g.coffees.push({x:x*T+16,y:y*T+20,taken:false});
}

function save(){
  if(!G) return;
  try{
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      coName:G.coName, renamed:G.renamed, days:G.days, money:G.money, feesSpent:G.feesSpent,
      lockedCap:G.lockedCap, sanity:G.sanity, docs:G.docs, progress:G.progress,
      vars:G.vars, visited:G.visited, bounces:G.bounces, livingSpent:G.livingSpent, coffees:G.coffees.map(c=>c.taken), brokeDown:G.brokeDown,
    }));
  }catch(e){}
}
function loadSave(){
  try{ const s=localStorage.getItem(SAVE_KEY); return s? JSON.parse(s): null; }catch(e){ return null; }
}
function clearSave(){ try{ localStorage.removeItem(SAVE_KEY); }catch(e){} }

/* ---------------- flow helpers ---------------- */
function toast(txt){ G.toasts.push({txt,t:0}); }
function floater(txt,color){ G.floaters.push({x:G.px, y:G.py-52, txt, color:color||'#ffd766', t:0}); }
function pay(amt, isCapital){
  if(!amt) return;
  G.money-=amt;
  if(isCapital){ G.lockedCap+=amt; floater('-'+fmtMoney(amt)+' (capital)','#8fd4ff'); }
  else { G.feesSpent+=amt; floater('-'+fmtMoney(amt),'#ff9c8a'); }
  G.moneyFlash=0.9;
  sfx.cash();
}
function gainDoc(name){ G.docs.push(name); toast('📄 '+name); sfx.doc(); }
function addSanity(d){ G.sanity=clamp(G.sanity+d,0,100); }
function startFade(cb){ G.fade={a:0, dir:1, cb}; }
function startWait(days, cb){
  const dur=clamp(days*0.25, 1.6, 6.5);
  G.waiting={days, shown:0, t:0, dur, cb,
    thought: days>=5 ? WAIT_THOUGHTS[(Math.random()*WAIT_THOUGHTS.length)|0] : null,
    event: (days>=6 && Math.random()<0.4) ? WAIT_EVENTS[(Math.random()*WAIT_EVENTS.length)|0] : null };
  if(G.waiting.event) G.waiting.dur += 0.9;
}

function mkPage(speaker, ln){
  return (typeof ln==='string') ? {speaker, text:ln} : {speaker, text:ln.t, sub:ln.s};
}
function startDialog(pages, onDone){
  G.dlg={pages, i:0, chars:0, sel:0, onDone};
}
function advanceDialog(){
  const d=G.dlg; if(!d) return;
  const p=d.pages[d.i];
  if(d.chars < p.text.length){ d.chars=p.text.length; return; }
  if(p.options){
    const o=p.options[d.sel];
    if(o.set) Object.assign(G.vars, o.set);
    if(o.fn) o.fn(G);
    if(o.reply) d.pages.splice(d.i+1,0,{speaker:p.speaker, text:o.reply});
    sfx.ok();
  } else sfx.blip();
  d.i++; d.chars=0; d.sel=0;
  if(d.i>=d.pages.length){ const cb=d.onDone; G.dlg=null; if(cb) cb(); }
}

/* ---------------- country flow ---------------- */
function countryInfoText(c){
  return c.entity+' · ~'+c.estDays+' day'+(c.estDays>1?'s':'')+' · fees ~'+fmtMoney(c.estFees)
    + (c.estCap? ' · capital '+fmtMoney(c.estCap):'')
    + ' · bureaucracy: '+'📠'.repeat(c.rating);
}
function offerCountry(ci){
  const c=COUNTRIES[ci];
  const prog=G.progress[c.id]||0;
  const pages=[
    {speaker:c.flag+' '+c.name, text:c.tag},
    {speaker:c.flag+' '+c.name, text:countryInfoText(c) + (prog? '  ·  progress: step '+(prog+1)+'/'+c.steps.length : '')},
    {speaker:'', text:'Incorporate '+G.coName+' here?', options:[
      {label: prog? 'Go back in (step '+(prog+1)+'/'+c.steps.length+')' : 'Enter — let\'s do this', fn:()=>{ enterOffice(ci); }},
      {label:'\ud83d\udccb Field notes \u2014 the real rules & sources', fn:()=>{ G.notesFor=c; }},
      {label:'Not yet. Keep window-shopping jurisdictions.'},
    ]},
  ];
  startDialog(pages);
}
function enterOffice(ci){
  const c=COUNTRIES[ci];
  startFade(()=>{
    G.hubReturn={x:G.px, y:G.py+6};
    G.inOffice=ci;
    G.map=buildOffice(ci);
    const ex=(G.map.w/2)|0;
    G.px=ex*T+16; G.py=(G.map.h-2)*T+16; G.dir=1;
    if(!G.visited[c.id]){
      G.visited[c.id]=true; G.days+=1; G.money-=40; G.livingSpent+=40;
      toast('✈️ A day of travel to '+c.name);
      save();
    }
  });
}
function exitOffice(){
  startFade(()=>{
    G.inOffice=-1; G.map=hubMap;
    G.px=G.hubReturn.x; G.py=G.hubReturn.y+10;
    G.dir=0;
    save();
  });
}
function runStep(ci, idx){
  const c=COUNTRIES[ci], step=c.steps[idx];
  const pages=[];
  const lines = val(step.lines)||[];
  for(const ln of lines) pages.push(mkPage(step.who, ln));
  if(step.choice){
    const cp=mkPage(step.who, step.choice.prompt);
    cp.options = step.choice.options.map(o=>({label:o.label, set:o.set, fn:o.fn, reply:o.reply}));
    pages.push(cp);
  }
  startDialog(pages, ()=>{
    const cost=val(step.cost), cap=val(step.capital);
    if(cost) pay(cost,false);
    if(cap) pay(cap,true);
    if(step.san) addSanity(-step.san);
    if(step.doc) gainDoc(step.doc);
    const w=(val(step.wait)||0) + (G.pendingWait||0);
    G.pendingWait=0;
    const finish=()=>{
      G.progress[c.id]=(G.progress[c.id]||0)+1;
      save();
      if(G.progress[c.id]>=c.steps.length) completeCountry(ci);
      else sfx.ok();
    };
    if(w>0){ startWait(w, finish); if(step.queue) G.waiting.queue=step.queue; } else finish();
  });
}
function completeCountry(ci){
  const cc=COUNTRIES[ci];
  DONE[cc.id]=1; lsSet('inc_done',DONE);
  const cost=G.feesSpent+G.livingSpent;
  if(!PB[cc.id] || G.days<PB[cc.id].d){ PB[cc.id]={d:G.days, c:cost}; lsSet('inc_pb',PB); }
  award('first');
  if(G.days<=1) award('speed');
  if(cc.id==='de'){ award('de'); if(!G.brokeDown) award('de_zen'); }
  if(cc.id==='mt') award('mt');
  if(cc.id==='pt' && !G.renamed) award('pt_name');
  if(Object.keys(DONE).length>=5) award('five');
  if(Object.keys(DONE).length>=COUNTRIES.length) award('all');
  startFade(()=>{
    G.done=COUNTRIES[ci];
    G.scene='win'; G.winSel=0; G.winLock=0.9;
    clearSave();
    sfx.win();
  });
}

/* ---------------- interaction ---------------- */
const DX=[0,0,-1,1], DY=[1,-1,0,0]; // down, up, left, right
function interact(){
  if(G.dlg){ advanceDialog(); return; }
  if(G.waiting||G.fade) return;
  const m=G.map;
  const fx=G.px+DX[G.dir]*26, fy=G.py-8+DY[G.dir]*24;
  // NPCs
  for(const n of m.npcs){
    const dx=n.x-fx, dy=n.y-fy;
    if(dx*dx+dy*dy < 34*34){ talkTo(n); return; }
  }
  // meta tiles (front + current)
  for(const [tx,ty] of [[Math.floor(fx/T),Math.floor(fy/T)],[Math.floor(G.px/T),Math.floor((G.py-8)/T)]]){
    const meta=m.meta.get(mkey(tx,ty));
    if(meta){ useMeta(meta); return; }
  }
}
function talkTo(n){
  if(n.kind==='consultant'){
    startDialog([
      {speaker:'The Consultant', text:"Welcome to Incorporation Plaza. 28 doors, one goal: make your startup legally exist."},
      {speaker:'The Consultant', text:"Every country will happily incorporate you. The question is what it costs — in days, euros, and sanity. Read the signs by the doors before committing."},
      {speaker:'The Consultant', text:"Your wallet auto-converts currencies. Magic. Don't ask, focus on the paperwork. Coffee ☕ on the street restores sanity. You'll need it."},
      {speaker:'The Consultant', text:"And know this: nothing in here is invented. Every fee, wait and law the clerks quote is real \u2014 pick 'Field notes' at any door for the sources."},
      {speaker:'The Consultant', text:"The scaffolding south-west of the plaza, next to the American building? The EU — one company form for all 27 countries. Opening 2028. The crane hasn't moved since I started working here."},

    ]);
    return;
  }
  if(n.kind==='queuer'){
    const L=[
      {t:"Ich warte auf einen Notartermin. Seit März.", s:"I'm waiting for a notary appointment. Since March."},
      {t:"Man sagt, drinnen gibt es Wartenummern. Ich habe noch keine gesehen.", s:"They say there are ticket numbers inside. I haven't seen one yet."},
      {t:"Mein Sohn hat inzwischen in Delaware gegründet. Und schon verkauft.", s:"My son incorporated in Delaware in the meantime. And already sold."},
      {t:"Die Schlange wird nicht kürzer. Sie wird nur älter.", s:"The queue doesn't get shorter. It only gets older."},
    ];
    startDialog([mkPage('Wartender Gründer', L[(Math.random()*L.length)|0])]);
    return;
  }
  if(n.kind==='celebrant'){
    startDialog([{speaker:'Fresh Delaware Founder', text:"Filed this morning. Approved before lunch. Now I'm just standing here — I don't know what to do with the rest of the week."}]);
    return;
  }
  if(n.kind==='wanderer'){
    const L=[
      "Day 60. The register wants a letter from the bank. The bank wants a letter from the register.",
      "I came here to build an app. I now own forty-one certified photocopies.",
      "The consultant said 'read the signs'. The signs said 'fees'.",
    ];
    startDialog([{speaker:'Tired Founder', text:L[(Math.random()*L.length)|0]}]);
    return;
  }
  if(n.stepIdx!==undefined){ tryStep(n.stepIdx); return; }
}
function useMeta(meta){
  if(meta.t==='door'){ offerCountry(meta.c); }
  else if(meta.t==='sign'){
    const c=COUNTRIES[meta.c];
    startDialog([{speaker:c.flag+' '+c.name, text:countryInfoText(c)}]);
  }
  else if(meta.t==='welcome'){
    startDialog([
      {speaker:'⛲ Plaza Sign', text:"INCORPORATION PLAZA — 'Where dreams become filing numbers.' Signs by each door list the damage. Choose a door. Choose wisely."},
    ]);
  }
  else if(meta.t==='eu'||meta.t==='eusign'){
    sfx.deny();
    startDialog([
      {speaker:'🇪🇺 EU — Construction Site', text:"Behind this fence: the legendary '28th regime' — ONE European company form. One filing, one language, one register, valid in all 27 member states."},
      {speaker:'🇪🇺 EU — Construction Site', text:"Expected opening: 2028. The scaffolding went up around the Societas Europaea of 2004. It has not come down."},
      {speaker:'⚠ Site Notice', text:"NO ENTRY. Hard hats required. Unanimity required. Please check back... eventually."},
    ]);
  }
  else if(meta.t==='step'){ tryStep(meta.i); }
}
function tryStep(i){
  const ci=G.inOffice, c=COUNTRIES[ci];
  const cur=G.progress[c.id]||0;
  const curStep=c.steps[cur];
  const bKey=c.id+':'+cur;
  // are we mid-bounce and talking to the desk we were sent back to?
  if(curStep && curStep.bounce && G.bounces[bKey]===1 && i===curStep.bounce.to){
    startDialog(curStep.bounce.visitLines.map(t=>mkPage(c.steps[i].who, t)), ()=>{
      G.bounces[bKey]=2;
      if(curStep.bounce.doc) gainDoc(curStep.bounce.doc);
      if(curStep.bounce.san) addSanity(-curStep.bounce.san);
      save();
    });
    return;
  }
  if(i<cur){
    startDialog([{speaker:c.steps[i].who, text:"Already handled. Bureaucrats adore repeat visitors, but you have a company to found. Next desk, please."}]);
    sfx.deny();
  } else if(i>cur){
    startDialog([{speaker:c.steps[i].who, text:"Not me. You need "+c.steps[cur].who+" first. Where? Somewhere in this room. We have a system."}]);
    sfx.deny();
  } else {
    // bureaucratic loop: first visit gets you sent back down the hall
    if(curStep.bounce && !G.bounces[bKey]){
      G.bounces[bKey]=1;
      startDialog(curStep.bounce.lines.map(t=>mkPage(curStep.who, t)), ()=>{
        addSanity(-(curStep.bounce.sanBounce||6));
        floater('sent back ↩','#ff9c8a'); sfx.deny(); save();
      });
      return;
    }
    if(curStep.bounce && G.bounces[bKey]===1){
      startDialog([mkPage(curStep.who, curStep.bounce.nag || "Still missing it. Desk "+(curStep.bounce.to+1)+". I will wait. I am very good at waiting — it is my profession.")]);
      sfx.deny();
      return;
    }
    runStep(ci,i);
  }
}

/* ---------------- input ---------------- */
const KEY={};
window.addEventListener('keydown',e=>{
  if(G && G.scene==='title') return;
  const k=e.key;
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(k)) e.preventDefault();
  KEY[k.toLowerCase()]=true;
  if(!G) return;
  if(G.notesFor && G.scene!=='win'){
    if(k.toLowerCase()==='o' && G.notesFor.src){ try{ window.open(G.notesFor.src[0][1],'_blank'); }catch(e){} return; }
    if(k.toLowerCase()==='n'||k==='Escape'||k==='e'||k==='E'||k===' '||k==='Enter'){ G.notesFor=null; }
    return;
  }
  if(G.scene==='win' && G.notesFor && k.toLowerCase()==='o' && G.notesFor.src){ try{ window.open(G.notesFor.src[0][1],'_blank'); }catch(e){} return; }
  if(G.scene==='over'){
    if(k.toLowerCase()==='r'||k==='Enter'||k===' ') resetToTitle();
    return;
  }
  if(G.scene==='win'){
    if(k==='ArrowUp'||k==='ArrowDown'||k.toLowerCase()==='w'||k.toLowerCase()==='s'){ G.winSel=1-G.winSel; sfx.step(); return; }
    if(k.toLowerCase()==='r'){ resetToTitle(); return; }
    if(k.toLowerCase()==='n'){ G.notesFor=G.notesFor?null:G.done; return; }
    if(k.toLowerCase()==='c'){
      const [g]=grade(G.days);
      const txt='I incorporated "'+G.coName+'" in '+G.done.flag+' '+G.done.name+' in '+G.days+' days — '+
        fmtMoney(G.feesSpent)+' in fees, '+fmtMoney(G.livingSpent)+' on living, '+fmtMoney(G.lockedCap)+
        ' locked as capital. Grade '+g+'. Delaware does it in one day.';
      try{ navigator.clipboard.writeText(txt); }catch(e){}
      G.copied=1.6;
      return;
    }
    if((k==='Enter'||k===' '||k.toLowerCase()==='e') && !(G.winLock>0)) winConfirm();
    return;
  }
  if(G.dlg){
    const p=G.dlg.pages[G.dlg.i];
    if(p.options && G.dlg.chars>=p.text.length){
      if(k==='ArrowUp'||k.toLowerCase()==='w'){ G.dlg.sel=(G.dlg.sel+p.options.length-1)%p.options.length; sfx.step(); return; }
      if(k==='ArrowDown'||k.toLowerCase()==='s'){ G.dlg.sel=(G.dlg.sel+1)%p.options.length; sfx.step(); return; }
    }
    if(k==='e'||k==='E'||k===' '||k==='Enter'){ advanceDialog(); }
    return;
  }
  if(k.toLowerCase()==='m'){ MUS.on=!MUS.on; toast(MUS.on?'🔊 sound on':'🔇 sound off'); return; }
  if(k==='e'||k==='E'||k===' '||k==='Enter') interact();
});
window.addEventListener('keyup',e=>{ KEY[e.key.toLowerCase()]=false; });
/* touch controls */
if(('ontouchstart' in window) || navigator.maxTouchPoints>0 || /debug=touch/.test(location.search)){
  const tui=document.getElementById('touchUI');
  tui.style.display='block';
  document.documentElement.classList.add('touch');
  const ft=document.getElementById('foot');
  if(ft) ft.innerHTML='tap ▲▼◀▶ to move · E to talk · made with ♥ and AI by <a href="https://x.com/fbandov" target="_blank" rel="noopener" style="color:#8a90a4;">@fbandov</a>';
  window.addEventListener('pointerdown',()=>ac(),{passive:true});
  for(const b of tui.querySelectorAll('#dpad .tb')){
    const k=b.dataset.k;
    const on=e=>{ e.preventDefault(); KEY[k]=true; };
    const off=e=>{ e.preventDefault(); KEY[k]=false; };
    b.addEventListener('pointerdown',on);
    b.addEventListener('pointerup',off);
    b.addEventListener('pointercancel',off);
    b.addEventListener('pointerleave',off);
  }
  const ab=document.getElementById('abtn');
  ab.addEventListener('pointerdown',e=>{
    e.preventDefault();
    if(!G) return;
    if(G.scene==='win'){ if(!(G.winLock>0)) winConfirm(); return; }
    if(G.scene==='over'){ resetToTitle(); return; }
    if(G.dlg) advanceDialog(); else interact();
  });
}
function winConfirm(){
  if(G.winSel===0){
    // straight into a fresh run — no title, no intro, same company name
    clearSave();
    G=newGame(G.renamed||G.coName);
    initCoffees(G);
    G.map=hubMap; G.scene='play';
    toast('Day 0. Same dream, fresh paperwork.');
    return;
  }
  G.scene='play'; G.inOffice=-1; G.map=hubMap;
  G.px=40*T+16; G.py=36*T+8; G.dir=1;
  toast('🎉 Incorporated. The plaza is yours.');
}
CV.addEventListener('click',()=>{ CV.focus(); if(!G) return; if(G.scene==='over'){ resetToTitle(); return; } if(G.scene==='win'){ if(!(G.winLock>0)) winConfirm(); return; } if(G.dlg) advanceDialog(); });

/* ---------------- update ---------------- */
function update(dt){
  G.t+=dt;
  if(G.moneyFlash>0) G.moneyFlash-=dt;
  if(G.dayFlash>0) G.dayFlash-=dt;
  if(G.scene!=='play') return;

  // fade
  if(G.fade){
    const f=G.fade;
    f.a += dt*3*f.dir;
    if(f.dir>0 && f.a>=1){ f.a=1; if(f.cb){f.cb(); f.cb=null;} f.dir=-1; }
    if(f.dir<0 && f.a<=0){ G.fade=null; }
  }
  // waiting overlay
  if(G.waiting){
    const wt=G.waiting;
    wt.t+=dt;
    const frac=clamp(wt.t/wt.dur,0,1);
    const target=Math.round(frac*wt.days);
    while(wt.shown<target){ wt.shown++; G.days++; addSanity(-0.25); G.money-=40; G.livingSpent+=40; }
    if(wt.event && !wt.eventDone && frac>0.5){
      wt.eventDone=true;
      wt.days+=wt.event.d;
      if(wt.event.c){ G.money-=wt.event.c; G.feesSpent+=wt.event.c; }
      sfx.deny();
    }
    if(frac>=1){ const cb=wt.cb; G.waiting=null; G.dayFlash=1.2; if(cb) cb(); checkFail(); }
    return;
  }
  if(G.dlg||G.fade) { G.moving=false; return; }

  // movement
  let vx=0, vy=0;
  if(KEY['arrowleft']||KEY['a']) vx-=1;
  if(KEY['arrowright']||KEY['d']) vx+=1;
  if(KEY['arrowup']||KEY['w']) vy-=1;
  if(KEY['arrowdown']||KEY['s']) vy+=1;
  G.moving = !!(vx||vy);
  if(G.moving){
    if(Math.abs(vx)>Math.abs(vy)) G.dir = vx<0?2:3;
    else if(vy) G.dir = vy<0?1:0;
    const sp=(KEY['shift']?330:210)*dt, len=Math.hypot(vx,vy);
    tryMove(vx/len*sp, 0);
    tryMove(0, vy/len*sp);
    G.animT+=dt;
    G.stepT=(G.stepT||0)+dt;
    if(G.stepT>0.26){ G.stepT=0; if(MUS.on) tone(85,0.045,'triangle',0.02); }
  }
  // coffee pickup
  if(G.inOffice<0){
    for(const cf of G.coffees){
      if(cf.taken) continue;
      const dx=cf.x-G.px, dy=cf.y-(G.py-10);
      if(dx*dx+dy*dy<22*22){ cf.taken=true; addSanity(6); G.coffeeCount=(G.coffeeCount||0)+1;
        if(G.coffeeCount>=8) award('coffee');
        floater('+6 sanity ☕','#a8e6a0'); toast('☕ Founder fuel. +6 sanity.'); sfx.coffee(); save(); }
    }
  }
  // ambient life
  if(G.inOffice<0){
    for(const nn of G.map.npcs){
      if(nn.patrol){
        nn.x+=nn.vx*dt; nn.at=(nn.at||0)+dt; nn.moving=true; nn.dir=nn.vx>0?3:2;
        if(nn.x<nn.patrol[0]||nn.x>nn.patrol[1]) nn.vx*=-1;
      }
    }
    if(G.map.pigeons) for(const pg of G.map.pigeons){
      const pdx=pg.x-G.px, pdy=pg.y-G.py;
      if(pdx*pdx+pdy*pdy<3600 && pg.fly<=0){ pg.vx=Math.sign(pdx||1)*100; pg.vy=Math.sign(pdy||1)*70; pg.fly=0.6; }
      if(pg.fly>0){ pg.fly-=dt; pg.x+=pg.vx*dt; pg.y+=pg.vy*dt; }
      else if(Math.random()<0.008){ pg.x+=(Math.random()*2-1)*8; }
      pg.x=clamp(pg.x,2*T,(HUBW-2)*T); pg.y=clamp(pg.y,2*T,(HUBH-2)*T);
    }
  }
  // exit tile
  if(G.inOffice>=0){
    const meta=G.map.meta.get(mkey(Math.floor(G.px/T), Math.floor(G.py/T)));
    if(meta && meta.t==='exit') exitOffice();
  }
  // toasts / floaters
  for(const t of G.toasts) t.t+=dt;
  G.toasts=G.toasts.filter(t=>t.t<3.4);
  for(const f of G.floaters){ f.t+=dt; f.y-=dt*26; }
  G.floaters=G.floaters.filter(f=>f.t<1.6);

  checkFail();
}
function boxBlocked(px,py){
  const m=G.map, hw=9;
  for(const [cx,cy] of [[px-hw,py-6],[px+hw,py-6],[px-hw,py],[px+hw,py]]){
    if(solidAt(m, Math.floor(cx/T), Math.floor(cy/T))) return true;
  }
  return false;
}
function tryMove(dx,dy){
  const nx=G.px+dx, ny=G.py+dy;
  if(!boxBlocked(nx,ny) || boxBlocked(G.px,G.py)){ G.px=nx; G.py=ny; }
}
function checkFail(){
  if(G.scene!=='play') return;
  if(G.money < -2000){ G.scene='over'; clearSave(); award('broke'); sfx.sad(); return; }
  if(G.sanity<=0 && !G.brokeDown && !G.dlg){
    G.brokeDown=true;
    startDialog([
      {speaker:'Your Inner Voice', text:"You wake up on the floor of a government waiting room, clutching ticket #847."},
      {speaker:'Your Inner Voice', text:"In the dream, there was a place called Delaware. A form. A single form. It was beautiful."},
      {speaker:'Your Inner Voice', text:"You pull yourself together. Founders don't quit. Founders just... redomicile."},
    ], ()=>{ G.sanity=30; save(); });
  }
}

/* ---------------- intro & reset ---------------- */
function startRun(fromSave){
  const ui=document.getElementById('titleUI');
  ui.style.display='none';
  CV.focus();
  const name=document.getElementById('coName').value.trim()||'Yolo';
  if(!hubMap) hubMap=buildHub();
  const s=fromSave? loadSave(): null;
  G=newGame(name);
  initCoffees(G);
  if(s){
    Object.assign(G,{coName:s.coName, renamed:s.renamed, days:s.days, money:s.money,
      feesSpent:s.feesSpent, lockedCap:s.lockedCap, sanity:s.sanity, docs:s.docs,
      progress:s.progress, vars:s.vars, visited:s.visited, bounces:s.bounces||{}, livingSpent:s.livingSpent||0, brokeDown:s.brokeDown});
    if(s.coffees) s.coffees.forEach((t,i)=>{ if(G.coffees[i]) G.coffees[i].taken=t; });
  }
  G.map=hubMap; G.scene='play';
  ac(); musicStart(); // unlock audio on gesture
  if(!s){
    startDialog([
      {speaker:'Your Inner Voice', text:"You have an idea. It will change everything. Payments for dogs. Uber for notaries. Whatever it is — it's HUGE."},
      {speaker:'Your Inner Voice', text:"But an idea is not a company. To raise money, sign contracts, and legally exist, you must INCORPORATE "+G.coName+"."},
      {speaker:'Your Inner Voice', text:"This is Incorporation Plaza: 28 doors, 28 countries. Any of them can register "+G.coName+" as a real company — if you survive their process. You'll pay in days, euros and sanity."},
      {speaker:'Your Inner Voice', text:"Read the signs by the doors before committing. Off you go."},
    ]);
  } else {
    toast('Paperwork resumed. It missed you.');
  }
}
function resetToTitle(){
  G=newGame(document.getElementById('coName').value||'Yolo');
  showTitle();
}
function showTitle(){
  const ui=document.getElementById('titleUI');
  ui.style.display='flex';
  document.getElementById('btnCont').style.display = loadSave()? 'block':'none';
  if(G) G.scene='title';
}
document.getElementById('btnStart').addEventListener('click',()=>{ clearSave(); startRun(false); });
document.getElementById('btnCont').addEventListener('click',()=>startRun(true));
document.getElementById('coName').addEventListener('keydown',e=>{ if(e.key==='Enter'){ clearSave(); startRun(false);} e.stopPropagation(); });

/* ---------------- main loop ---------------- */
let last=performance.now();
function frame(now){
  const dt=Math.min((now-last)/1000, 0.05); last=now;
  if(G){
    update(dt);
    if(G.scene==='title') drawTitle();
    else if(G.scene==='win'){ G.t+=dt; if(G.winLock>0) G.winLock-=dt; drawWin(); if(G.notesFor) drawNotes(G.notesFor); }
    else if(G.scene==='over') drawOver();
    else {
      drawWorld(); drawHUD(); drawWaiting(); drawDialog();
      if(G.notesFor) drawNotes(G.notesFor);
      if(G.fade){ X.fillStyle='rgba(11,13,18,'+clamp(G.fade.a,0,1)+')'; X.fillRect(0,0,W,H); }
    }
  }
  requestAnimationFrame(frame);
}
G=newGame('Yolo');
showTitle();
requestAnimationFrame(frame);
/* debug hooks: ?debug=office:de | ?debug=win:de | ?debug=pos:12-50 | ?debug=step:de-0 */
(function(){
  const m=/[?&]debug=(\w+):([\w-]+)/.exec(location.search);
  if(!m) return;
  startRun(false); G.dlg=null;
  if(m[1]==='office' && CINDEX[m[2]]!==undefined) enterOffice(CINDEX[m[2]]);
  if(m[1]==='win' && CINDEX[m[2]]!==undefined){ G.days=94; G.feesSpent=2053; G.lockedCap=12500; G.sanity=41;
    G.docs=['1','2','3','4','5','6','7','8']; completeCountry(CINDEX[m[2]]); }
  if(m[1]==='pos'){ const p=m[2].split('-'); G.px=(+p[0])*T+16; G.py=(+p[1])*T+16; }
  if(m[1]==='walk'){ KEY['d']=true; setTimeout(()=>{ KEY['d']=false; }, 1500); }
  if(m[1]==='step'){ const p=m[2].split('-'); const ci=CINDEX[p[0]];
    if(ci!==undefined){ G.inOffice=ci; G.map=buildOffice(ci);
      const ex=(G.map.w/2)|0; G.px=ex*T+16; G.py=(G.map.h-3)*T+16;
      G.progress[p[0]]=+p[1]||0; runStep(ci, +p[1]||0); } }
})();

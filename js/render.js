/* ================================================================
   RENDERING
   ================================================================ */
function camera(){
  const m=G.map, mw=m.w*T, mh=m.h*T;
  let cx=clamp(G.px-W/2, 0, Math.max(0,mw-W));
  let cy=clamp(G.py-H/2, 0, Math.max(0,mh-H));
  const ox=mw<W? (W-mw)/2 : 0;
  const oy=mh<H? (H-mh)/2 : 0;
  return {cx:Math.round(cx-ox), cy:Math.round(cy-oy)};
}

let SEAS=1;
const SEAS_GRASS=['#63a955','#4c9a45','#96933f','#b9c1b9'];
const SEAS_TREE=[['#2f7a3a','#3c8c46'],['#2c7434','#388440'],['#8a6a2a','#a07c30'],['#5a685e','#6a786e']];
function drawTile(m,tx,ty,px,py){
  const t=m.t[ty*m.w+tx], r=h2(tx,ty);
  switch(t){
    case GRASS:
      X.fillStyle=SEAS_GRASS[SEAS]; X.fillRect(px,py,T,T);
      X.fillStyle = r>0.5? 'rgba(0,0,0,0.08)':'rgba(255,255,255,0.08)';
      X.fillRect(px+((r*23)|0)%24+3, py+((r*47)|0)%24+3, 3,3);
      X.fillRect(px+((r*61)|0)%26+2, py+((r*89)|0)%26+2, 2,2);
      break;
    case PATH:
      X.fillStyle='#d3b98a'; X.fillRect(px,py,T,T);
      X.fillStyle='#c2a878';
      X.fillRect(px+((r*31)|0)%22+4, py+((r*57)|0)%22+4, 4,3);
      break;
    case PLAZA:
      X.fillStyle='#b8b2a6'; X.fillRect(px,py,T,T);
      X.strokeStyle='#a8a296'; X.lineWidth=1;
      X.strokeRect(px+0.5,py+0.5,T,T);
      break;
    case ROOF: case ROOF2: {
      const own=m.own[ty*m.w+tx];
      if(own===99){ // EU: bare concrete slab, unfinished
        X.fillStyle = t===ROOF2? '#7e7a72':'#8a867e'; X.fillRect(px,py,T,T);
        X.fillStyle='rgba(0,0,0,0.16)'; X.fillRect(px,py+T-4,T,4);
        X.fillRect(px+((tx%2)?6:18),py+5,3,12);
        break; }
      const cc = own>=0? COUNTRIES[own] : null;
      const cols = cc&&cc.rc? cc.rc : ROOFCOLS[7];
      X.fillStyle = t===ROOF2? cols[1]:cols[0];
      X.fillRect(px,py,T,T);
      X.fillStyle='rgba(0,0,0,0.12)';
      X.fillRect(px,py+10,T,2); X.fillRect(px,py+22,T,2);
      if(cc&&cc.bs==='medit'){ X.fillStyle='rgba(0,0,0,0.14)';
        for(let xx=5;xx<T;xx+=10){ X.beginPath(); X.arc(px+xx,py+(t===ROOF2?26:12),4,0,Math.PI); X.fill(); } }
      else if(cc&&cc.bs==='mansard'){ X.fillStyle='rgba(255,255,255,0.10)'; X.fillRect(px,py+6,T,5); }
      break; }
    case WALL: {
      const own=m.own[ty*m.w+tx];
      if(own===99){ // unfinished concrete + cross-bracing
        X.fillStyle='#b8b4aa'; X.fillRect(px,py,T,T);
        X.fillStyle='#9a968c'; X.fillRect(px,py+T-5,T,5);
        X.strokeStyle='#8a7a5a'; X.lineWidth=2;
        X.strokeRect(px+1,py+1,T-2,T-2);
        X.beginPath(); X.moveTo(px,py); X.lineTo(px+T,py+T); X.moveTo(px+T,py); X.lineTo(px,py+T); X.stroke();
        break; }
      const cc = own>=0? COUNTRIES[own] : null;
      X.fillStyle = cc&&cc.wc? cc.wc : '#e8dcc8'; X.fillRect(px,py,T,T);
      X.fillStyle='rgba(0,0,0,0.08)'; X.fillRect(px,py+T-5,T,5);
      const bs = cc&&cc.bs;
      if(bs==='fachwerk'){
        X.fillStyle='#7a5a3a'; X.fillRect(px,py,3,T); X.fillRect(px+T-3,py,3,T); X.fillRect(px,py,T,3);
        X.strokeStyle='#7a5a3a'; X.lineWidth=3;
        X.beginPath(); X.moveTo(px+2,py+T-2); X.lineTo(px+T-2,py+2); X.stroke();
      } else if(bs==='brick'){
        X.fillStyle='rgba(0,0,0,0.18)';
        for(let yy=6;yy<T;yy+=8) X.fillRect(px,py+yy,T,2);
        X.fillRect(px+8,py,2,6); X.fillRect(px+20,py+8,2,6); X.fillRect(px+12,py+16,2,6); X.fillRect(px+24,py+24,2,6);
      } else if(bs==='nordic'){
        X.fillStyle='rgba(0,0,0,0.12)';
        for(let xx=7;xx<T;xx+=8) X.fillRect(px+xx,py,2,T);
        X.fillStyle='#eceae0'; X.fillRect(px,py+T-4,T,4);
      } else if(bs==='alpine'){
        X.fillStyle='#8a6a4a'; X.fillRect(px,py,T,4);
      } else if(bs==='pub'){
        X.fillStyle='#26331f'; X.fillRect(px,py+T-10,T,10);
        X.fillStyle='#d9b23c'; X.fillRect(px,py+T-12,T,2);
      } else if(bs==='azulejo'){
        X.fillStyle='#3f6fb5'; X.fillRect(px,py+T-8,T,8);
        X.fillStyle='#f2efe6'; for(let xx=3;xx<T;xx+=8) X.fillRect(px+xx,py+T-6,3,3);
      } else if(bs==='stone'){
        X.strokeStyle='rgba(0,0,0,0.15)'; X.lineWidth=1.5;
        X.strokeRect(px+0.5,py+(((tx+ty)%2)?3:13)+0.5,T-1,10);
      } else if(bs==='colonial'){
        X.fillStyle='rgba(0,0,0,0.10)'; X.fillRect(px,py+14,T,2);
        X.fillStyle='#ffffff'; X.fillRect(px,py+T-6,T,2);
      }
      break; }
    case WINDOW: {
      const cc=m.own[ty*m.w+tx]>=0? COUNTRIES[m.own[ty*m.w+tx]]:null;
      X.fillStyle=cc&&cc.wc?cc.wc:'#e8dcc8'; X.fillRect(px,py,T,T);
      X.fillStyle='#5a4a30'; X.fillRect(px+6,py+6,20,18);
      X.fillStyle='#96c8e8'; X.fillRect(px+8,py+8,7,6); X.fillRect(px+17,py+8,7,6);
      X.fillStyle='#6a90b0'; X.fillRect(px+8,py+16,7,6); X.fillRect(px+17,py+16,7,6);
      break; }
    case DOOR:
      if(m.own[ty*m.w+tx]===99){ // boarded-up EU door
        X.fillStyle='#b8b4aa'; X.fillRect(px,py,T,T);
        X.fillStyle='#3a3630'; X.fillRect(px+4,py+2,24,30);
        X.fillStyle='#b09050';
        X.save(); X.translate(px+16,py+16);
        X.rotate(0.5); X.fillRect(-17,-4,34,7);
        X.rotate(-1.0); X.fillRect(-17,-4,34,7);
        X.restore();
        break; }
      { const cc=m.own[ty*m.w+tx]>=0? COUNTRIES[m.own[ty*m.w+tx]]:null;
      X.fillStyle=cc&&cc.wc?cc.wc:'#e8dcc8'; X.fillRect(px,py,T,T); }
      X.fillStyle='#5a3a1a'; X.fillRect(px+4,py+2,24,30);
      X.fillStyle='#7a4a21'; X.fillRect(px+6,py+4,20,28);
      X.fillStyle='#f0c040'; X.fillRect(px+22,py+18,3,3);
      break;
    case SIGN:
      // ground under sign
      X.fillStyle = m===hubMap? '#57a04f' : '#cfc4a8'; X.fillRect(px,py,T,T);
      X.fillStyle='#6a4a24'; X.fillRect(px+14,py+14,4,16);
      X.fillStyle='#8a6a3a'; X.fillRect(px+3,py+2,26,15);
      X.strokeStyle='#5a4020'; X.lineWidth=2; X.strokeRect(px+4,py+3,24,13);
      break;
    case TREE:
      X.fillStyle=SEAS_GRASS[SEAS]; X.fillRect(px,py,T,T);
      X.fillStyle='#5a3a1a'; X.fillRect(px+13,py+18,6,12);
      X.fillStyle=SEAS_TREE[SEAS][0]; X.beginPath(); X.arc(px+16,py+12,12,0,7); X.fill();
      X.fillStyle=SEAS_TREE[SEAS][1]; X.beginPath(); X.arc(px+12,py+9,7,0,7); X.fill();
      break;
    case FLOWER: {
      X.fillStyle=SEAS_GRASS[SEAS]; X.fillRect(px,py,T,T);
      if(SEAS===3) break; // winter: no flowers, only paperwork
      const fc=['#e86a6a','#f0c040','#f0f0e8','#c88ae0'][((r*7)|0)%4];
      X.fillStyle=fc; X.fillRect(px+8,py+10,4,4); X.fillRect(px+20,py+18,4,4);
      X.fillStyle='#4c8f45'; X.fillRect(px+9,py+14,2,5); X.fillRect(px+21,py+22,2,5);
      break; }
    case FOUNTAIN: {
      X.fillStyle='#b8b2a6'; X.fillRect(px,py,T,T);
      X.fillStyle='#8a8478'; X.beginPath(); X.arc(px+16,py+16,14,0,7); X.fill();
      X.fillStyle='#4a90d9'; X.beginPath(); X.arc(px+16,py+16,10,0,7); X.fill();
      X.fillStyle='#8fd4ff';
      const b=Math.sin(G? G.t*4:0)*2;
      X.fillRect(px+13,py+9+b,6,4);
      break; }
    case FLOOR:
      X.fillStyle=((tx+ty)%2)?'#cfc4a8':'#c5ba9e'; X.fillRect(px,py,T,T);
      break;
    case WALLI:
      X.fillStyle='#8a90a4'; X.fillRect(px,py,T,T);
      X.fillStyle='#787e92'; X.fillRect(px,py+T-6,T,6);
      X.fillStyle='rgba(255,255,255,0.08)'; X.fillRect(px,py,T,3);
      break;
    case DESK:
      X.fillStyle=((tx+ty)%2)?'#cfc4a8':'#c5ba9e'; X.fillRect(px,py,T,T);
      X.fillStyle='#8a5c2f'; X.fillRect(px+1,py+2,30,22);
      X.fillStyle='#a06c38'; X.fillRect(px+1,py+2,30,6);
      X.fillStyle='#f2ead2'; X.fillRect(px+5,py+11,9,7);
      X.fillStyle='#d8d0b8'; X.fillRect(px+6,py+12,7,1); X.fillRect(px+6,py+14,7,1);
      break;
    case EXIT:
      X.fillStyle='#cfc4a8'; X.fillRect(px,py,T,T);
      X.fillStyle='#a03c3c'; X.fillRect(px+4,py+6,24,20);
      X.fillStyle='#f2e8cf'; X.font='bold 9px ui-monospace,Menlo,monospace'; X.textAlign='center';
      X.fillText('EXIT',px+16,py+19);
      break;
    case CARPET:
      X.fillStyle='#a03c3c'; X.fillRect(px,py,T,T);
      X.fillStyle='#8a3232'; X.fillRect(px,py,3,T); X.fillRect(px+T-3,py,3,T);
      break;
    case PLANT:
      X.fillStyle=((tx+ty)%2)?'#cfc4a8':'#c5ba9e'; X.fillRect(px,py,T,T);
      X.fillStyle='#a05a2a'; X.fillRect(px+10,py+18,12,10);
      X.fillStyle='#2f7a3a'; X.beginPath(); X.arc(px+16,py+12,9,0,7); X.fill();
      break;
  }
}

function drawPerson(px,py,dir,walkT,cols,moving,beard,beardCol){
  // feet anchor px,py
  X.fillStyle='rgba(0,0,0,0.25)';
  X.beginPath(); X.ellipse(px,py+1,10,4,0,0,7); X.fill();
  const lo = moving? Math.sin(walkT*12)*3 : 0;
  X.fillStyle=cols.pants;
  X.fillRect(px-7, py-12+(lo>0?lo:0)*0.8, 6, 12-(lo>0?lo:0)*0.8);
  X.fillRect(px+1, py-12+(lo<0?-lo:0)*0.8, 6, 12-(lo<0?-lo:0)*0.8);
  X.fillStyle=cols.shirt; X.fillRect(px-9,py-26,18,15);
  X.fillStyle=cols.skin;
  X.fillRect(px-11,py-24,3,8); X.fillRect(px+8,py-24,3,8);
  X.fillRect(px-8,py-40,16,15);
  X.fillStyle=cols.hair; X.fillRect(px-8,py-42,16,6);
  if(dir===2) X.fillRect(px-8,py-40,4,10);
  if(dir===3) X.fillRect(px+4,py-40,4,10);
  X.fillStyle='#22232e';
  if(dir===0){ X.fillRect(px-5,py-33,3,3); X.fillRect(px+2,py-33,3,3); }
  else if(dir===2){ X.fillRect(px-6,py-33,3,3); }
  else if(dir===3){ X.fillRect(px+3,py-33,3,3); }
  if(beard && dir!==1){
    X.fillStyle=beardCol||'#4a3320';
    X.fillRect(px-6,py-29,12,3);
    if(beard>2) X.fillRect(px-5,py-26,10,Math.min(beard-2,7));
  }
}

function drawWorld(){
  SEAS=Math.floor((((G&&G.days)||0)%84)/21);
  const {cx,cy}=camera(), m=G.map;
  X.fillStyle='#0b0d12'; X.fillRect(0,0,W,H);
  const x0=Math.max(0,Math.floor(cx/T)), y0=Math.max(0,Math.floor(cy/T));
  const x1=Math.min(m.w-1,Math.ceil((cx+W)/T)), y1=Math.min(m.h-1,Math.ceil((cy+H)/T));
  for(let ty=y0;ty<=y1;ty++) for(let tx=x0;tx<=x1;tx++)
    drawTile(m,tx,ty, tx*T-cx, ty*T-cy);

  // sign flags in hub
  X.textAlign='center'; X.textBaseline='middle';
  for(const [k,meta] of m.meta){
    if(meta.t!=='sign'&&meta.t!=='welcome'&&meta.t!=='eusign') continue;
    const [tx,ty]=k.split(',').map(Number);
    const px=tx*T-cx, py=ty*T-cy;
    if(px<-T||py<-T||px>W||py>H) continue;
    X.font='11px ui-monospace,Menlo,monospace';
    X.fillText(meta.t==='welcome'?'ℹ️':meta.t==='eusign'?'🚧':COUNTRIES[meta.c].flag, px+16, py+9);
  }
  // door flags
  if(m===hubMap){
    for(const [k,meta] of m.meta){
      if(meta.t!=='door'&&meta.t!=='eu') continue;
      const [tx,ty]=k.split(',').map(Number);
      const px=tx*T-cx, py=ty*T-cy;
      if(px<-T*2||py<-T*2||px>W+T||py>H+T) continue;
      X.font='14px ui-monospace,Menlo,monospace';
      X.fillText(meta.t==='eu'?'🇪🇺':COUNTRIES[meta.c].flag, px+16, py-8);
    }
  }
  // EU construction-site dressing
  if(m===hubMap) drawEUSite(cx,cy);
  // coffees
  if(G.inOffice<0){
    X.font='16px ui-monospace,Menlo,monospace';
    for(const cf of G.coffees){
      if(cf.taken) continue;
      const bob=Math.sin(G.t*3+cf.x)*2;
      X.fillText('☕', cf.x-cx, cf.y-cy-8+bob);
    }
  }

  // pigeons
  if(G.inOffice<0 && m.pigeons){
    for(const pg of m.pigeons){
      X.fillStyle='#8a90a4'; X.fillRect(pg.x-cx-3, pg.y-cy-4, 7, 5);
      X.fillStyle='#6b7280'; X.fillRect(pg.x-cx+2, pg.y-cy-8, 4, 4);
      X.fillStyle='#e0a020'; X.fillRect(pg.x-cx+6, pg.y-cy-6, 2, 1);
    }
  }
  // entities y-sorted
  const ents=[...m.npcs.map(n=>({y:n.y, draw:()=>{
      drawPerson(n.x-cx, n.y-cy, n.dir||0, n.at||0, n.cols, !!n.patrol);
    }, n})),
    {y:G.py, draw:()=>{
      const hairC = G.days>110?'#a8a8a8':G.days>75?'#8a8378':G.days>45?'#6e5a44':'#5a3a1a';
      const beardC = G.days>75?'#7a7468':'#4a3320';
      const bl=Math.max(0,Math.min(9,((G.days-4)/10)|0));
      drawPerson(G.px-cx,G.py-cy,G.dir,G.animT,{skin:'#e8b48c',shirt:'#4a90d9',hair:hairC,pants:'#33364a'},G.moving,bl,beardC);
    }}];
  ents.sort((a,b)=>a.y-b.y);
  for(const e of ents) e.draw();

  // done checkmarks only — finding the right desk is your problem
  if(G.inOffice>=0){
    const cur=G.progress[COUNTRIES[G.inOffice].id]||0;
    X.fillStyle='#a8e6a0'; X.font='bold 12px ui-monospace,Menlo,monospace';
    for(const n of m.npcs){
      if(n.stepIdx!==undefined && n.stepIdx<cur) X.fillText('✓', n.x-cx, n.y-cy-52);
    }
  }
  // consultant marker
  if(m===hubMap){
    for(const n of m.npcs){
      const bob=Math.sin(G.t*5)*3;
      X.fillStyle='#f0c040'; X.font='bold 13px ui-monospace,Menlo,monospace';
      X.fillText('!', n.x-cx, n.y-cy-52+bob);
    }
  }

  // map labels
  X.font='bold 11px ui-monospace,Menlo,monospace';
  for(const lb of m.labels){
    const px=lb.x-cx, py=lb.y-cy;
    if(px<-160||py<-20||px>W+160||py>H+20) continue;
    X.lineWidth=3; X.strokeStyle='rgba(11,13,18,0.75)';
    X.strokeText(lb.text,px,py);
    X.fillStyle='#f2e8cf'; X.fillText(lb.text,px,py);
  }

  // tap destination marker
  if(G.tapMark){
    const mk=G.tapMark, k=1-mk.t/0.45;
    X.strokeStyle = mk.hit? 'rgba(240,192,64,'+(k*0.9)+')' : 'rgba(242,232,207,'+(k*0.7)+')';
    X.lineWidth=2;
    X.beginPath(); X.arc(mk.x-cx, mk.y-cy, 4+14*(1-k), 0, 7); X.stroke();
  }
  // floaters
  X.font='bold 13px ui-monospace,Menlo,monospace';
  for(const f of G.floaters){
    X.globalAlpha=clamp(1.6-f.t,0,1);
    X.lineWidth=3; X.strokeStyle='rgba(11,13,18,0.8)';
    X.strokeText(f.txt, f.x-cx, f.y-cy);
    X.fillStyle=f.color; X.fillText(f.txt, f.x-cx, f.y-cy);
  }
  X.globalAlpha=1;
}

function drawEUSite(cx,cy){
  const x0=40*T-cx, y0=20*T-cy;
  const bx=x0+T, bw=8*T;
  if(bx>W+240||bx+bw<-240||y0>H+240||y0<-300) return;
  const wallTop=y0+2*T, wallBot=y0+5*T;
  // scaffolding: steel poles + wooden walk-planks over the facade
  X.strokeStyle='#8a94a0'; X.lineWidth=3;
  for(let i=0;i<=4;i++){
    const sx=bx+8+i*((bw-16)/4);
    X.beginPath(); X.moveTo(sx,wallTop-16); X.lineTo(sx,wallBot); X.stroke();
  }
  for(const yy of [wallTop+4, wallTop+36, wallTop+68]){
    X.fillStyle='#b08a50'; X.fillRect(bx+4,yy,bw-8,5);
    X.fillStyle='rgba(0,0,0,0.25)'; X.fillRect(bx+4,yy+5,bw-8,2);
  }
  // tower crane behind the roof
  const mx=bx+bw-18, mtop=y0-64;
  X.fillStyle='#e0a020';
  X.fillRect(mx-4,mtop,8,y0-mtop+10);
  X.fillRect(mx-84,mtop,128,6);
  X.fillRect(mx+40,mtop+6,5,12);
  X.strokeStyle='#d8d8e0'; X.lineWidth=1.5;
  X.beginPath(); X.moveTo(mx-72,mtop+6); X.lineTo(mx-72,mtop+40); X.stroke();
  X.fillStyle='#c0c8d0'; X.fillRect(mx-77,mtop+40,10,8);
  X.strokeStyle='#e0a020'; X.beginPath(); X.moveTo(mx,mtop); X.lineTo(mx+38,mtop+6); X.stroke();
  // EU flag on a pole at the site entrance
  {
    const fx=bx-26, ftop=y0+2*T-8;
    X.fillStyle='#9aa4ae'; X.fillRect(fx,ftop,3,86);
    X.fillStyle='#26429a'; X.fillRect(fx+3,ftop,34,22);
    X.fillStyle='#f0c040';
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2;
      X.fillRect(fx+20+Math.cos(a)*7-1, ftop+11+Math.sin(a)*7-1, 2,2);
    }
  }
  // rebar poking from the slab + tarp over one corner
  X.strokeStyle='#7a8894'; X.lineWidth=2;
  for(let i=0;i<7;i++){
    const rx=bx+14+i*((bw-28)/6);
    X.beginPath(); X.moveTo(rx,y0+8); X.lineTo(rx,y0-12); X.stroke();
    X.beginPath(); X.arc(rx+3,y0-12,3,Math.PI,2*Math.PI); X.stroke();
  }
  X.fillStyle='rgba(56,104,190,0.88)'; X.fillRect(bx+bw-3*T,y0,3*T,2*T-8);
  X.strokeStyle='rgba(255,255,255,0.25)'; X.lineWidth=2;
  X.beginPath(); X.moveTo(bx+bw-3*T+8,y0+4); X.lineTo(bx+bw-10,y0+2*T-16); X.stroke();
  // cones on the forecourt
  for(const cxx of [bx+26, bx+118, bx+228]){
    const cy2=wallBot+24;
    X.fillStyle='#e06820';
    X.beginPath(); X.moveTo(cxx,cy2-15); X.lineTo(cxx+7,cy2); X.lineTo(cxx-7,cy2); X.closePath(); X.fill();
    X.fillStyle='#f2ead2'; X.fillRect(cxx-4,cy2-7,8,3);
  }
  // striped barrier (gap at the sign/door)
  const fy=wallBot+34;
  const seg=(fx0,fx1)=>{
    X.fillStyle='#5a5a5a'; X.fillRect(fx0,fy-12,3,14); X.fillRect(fx1-3,fy-12,3,14);
    const n=Math.max(2,((fx1-fx0)/16)|0);
    for(let i=0;i<n;i++){ X.fillStyle=i%2?'#f2ead2':'#c0392b'; X.fillRect(fx0+i*((fx1-fx0)/n),fy-10,(fx1-fx0)/n,6); }
  };
  seg(bx-6, bx+3*T);
  seg(bx+7*T, bx+bw+6);
}
function drawHUD(){
  X.fillStyle='#0b0d12'; X.fillRect(0,0,W,46);
  X.fillStyle='#2a2f42'; X.fillRect(0,46,W,1);
  X.textAlign='left'; X.textBaseline='middle';
  X.font='bold 15px ui-monospace,Menlo,monospace';
  X.fillStyle = G.dayFlash>0? '#ffdf80':'#f0c040';
  X.fillText('DAY '+G.days, 14, 15);
  X.fillStyle = G.moneyFlash>0? '#ff6a5a' : (G.money<0? '#ff9c8a':'#f2e8cf');
  X.fillText(fmtMoney(G.money), 110, 15);
  X.font='bold 13px ui-monospace,Menlo,monospace';
  X.fillStyle='#f2e8cf'; X.fillText('SANITY', 264, 15);
  X.fillStyle='#2a2f42'; X.fillRect(330,8,100,12);
  const sc = G.sanity>60?'#7dc87d': G.sanity>30?'#f0c040':'#e05a4a';
  X.fillStyle=sc; X.fillRect(330,8,100*G.sanity/100,12);
  X.strokeStyle='#4a4f62'; X.lineWidth=1; X.strokeRect(330.5,8.5,100,12);
  X.fillStyle='#f2e8cf'; X.fillText('📄 '+G.docs.length, 448, 15);
  // damage line
  X.font='11px ui-monospace,Menlo,monospace'; X.fillStyle='#8a90a4';
  X.fillText('burned '+fmtMoney(G.feesSpent)+' in fees · '+fmtMoney(G.lockedCap)+' locked · '+fmtMoney(G.livingSpent)+' on rent & ramen (€40/day) · started with €30,000', 14, 36);
  if(location.search.includes('debug=')){ X.fillText((G.px|0)+','+(G.py|0), 850, 36); }
  // mission
  X.textAlign='right'; X.font='bold 13px ui-monospace,Menlo,monospace'; X.fillStyle='#f2e8cf';
  let mission;
  if(G.done) mission='✓ '+G.coName+' — incorporated in '+G.done.name;
  else if(G.inOffice>=0){
    const c=COUNTRIES[G.inOffice], p=G.progress[c.id]||0;
    mission=c.flag+' '+c.name+' — step '+Math.min(p+1,c.steps.length)+'/'+c.steps.length;
  } else mission='Mission: incorporate '+G.coName+'. Anywhere. Somehow.';
  X.fillText(mission, W-14, 15);
  X.textAlign='left';


  // toasts
  X.font='bold 12px ui-monospace,Menlo,monospace';
  G.toasts.forEach((t,i)=>{
    const a=clamp(Math.min(t.t*4, 3.4-t.t),0,1);
    X.globalAlpha=a*0.95;
    const tw=X.measureText(t.txt).width+20;
    X.fillStyle='#1b1e2b'; X.fillRect(W-tw-14, 40+i*30, tw, 24);
    X.strokeStyle='#f0c040'; X.strokeRect(W-tw-13.5, 40.5+i*30, tw, 24);
    X.fillStyle='#f2e8cf'; X.fillText(t.txt, W-tw-4, 52+i*30);
    X.globalAlpha=1;
  });

  // interact hint
  if(!G.dlg && !G.waiting && !G.fade){
    const m=G.map, fx=G.px+DX[G.dir]*26, fy=G.py-8+DY[G.dir]*24;
    let hint=null;
    for(const n of m.npcs){ const dx=n.x-fx,dy=n.y-fy; if(dx*dx+dy*dy<34*34){ hint={x:n.x,y:n.y-62}; break; } }
    if(!hint){
      for(const [tx,ty] of [[Math.floor(fx/T),Math.floor(fy/T)]]){
        if(m.meta.get(mkey(tx,ty))) hint={x:tx*T+16,y:ty*T-10};
      }
    }
    if(hint){
      const {cx,cy}=camera();
      X.fillStyle='#f0c040'; X.font='bold 12px ui-monospace,Menlo,monospace'; X.textAlign='center';
      X.fillText('[E]', hint.x-cx, hint.y-cy+Math.sin(G.t*6)*2);
      X.textAlign='left';
    }
  }
}

function drawDialog(){
  const d=G.dlg; if(!d) return;
  const p=d.pages[d.i];
  d.chars=Math.min(p.text.length, d.chars + 1.7);
  const bx=20, bw=W-40;
  // measure box height from full content
  const mainLines=wrapText(p.text, bw-60, '15px ui-monospace,Menlo,monospace');
  const subLines = p.sub? wrapText(p.sub, bw-80, 'italic 12px ui-monospace,Menlo,monospace') : [];
  let bh = 30 + (p.speaker?24:0) + mainLines.length*22 + (subLines.length? subLines.length*17+12:0) + 22;
  if(p.options) bh += p.options.length*24 + 8;
  const by=H-bh-16;
  X.fillStyle='rgba(20,23,34,0.96)'; X.fillRect(bx,by,bw,bh);
  X.strokeStyle='#e8dcc8'; X.lineWidth=3; X.strokeRect(bx+1.5,by+1.5,bw-3,bh-3);
  X.strokeStyle='#4a4f62'; X.lineWidth=1; X.strokeRect(bx+6.5,by+6.5,bw-13,bh-13);
  X.textAlign='left'; X.textBaseline='alphabetic';
  let ty=by+34;
  if(p.speaker){
    X.fillStyle='#f0c040'; X.font='bold 14px ui-monospace,Menlo,monospace';
    X.fillText(p.speaker.toUpperCase(), bx+24, ty); ty+=24;
  }
  X.fillStyle='#f2e8cf'; X.font='15px ui-monospace,Menlo,monospace';
  const shown=String(p.text).slice(0, d.chars|0);
  for(const line of wrapText(shown, bw-60, '15px ui-monospace,Menlo,monospace')){
    X.fillText(line, bx+24, ty); ty+=22;
  }
  if(d.chars>=p.text.length){
    ty=by+34+(p.speaker?24:0)+mainLines.length*22;
    if(subLines.length){
      ty+=6;
      X.fillStyle='#8a90a4'; X.font='italic 12px ui-monospace,Menlo,monospace';
      for(const line of subLines){ X.fillText(line, bx+34, ty); ty+=17; }
      ty+=6;
    }
    if(p.options){
      ty+=10;
      d._optY=p.options.map((_,i)=>ty+i*24);
      p.options.forEach((o,i)=>{
        X.fillStyle = i===d.sel? '#f0c040':'#8a90a4';
        X.font = i===d.sel? 'bold 14px ui-monospace,Menlo,monospace':'14px ui-monospace,Menlo,monospace';
        X.fillText((i===d.sel?'▸ ':'  ')+o.label, bx+44, ty+i*24);
      });
    } else {
      X.fillStyle='#f0c040'; X.font='bold 14px ui-monospace,Menlo,monospace';
      X.fillText('▼', bx+bw-30, by+bh-16+Math.sin(G.t*6)*2);
    }
  }
}

function drawWaiting(){
  const wt=G.waiting; if(!wt) return;
  const frac=clamp(wt.t/wt.dur,0,1);
  const cycles=clamp(wt.days,1,6);
  const ph=(frac*cycles)%1; // one day-night cycle
  const mix=(c1,c2,t)=>'rgb('+[0,1,2].map(i=>Math.round(c1[i]+(c2[i]-c1[i])*t)).join(',')+')';
  const DAYC=[116,168,214], DUSK=[196,110,66], NIGHT=[10,14,38];
  if(wt.queue){
    // the waiting hall: fluorescent purgatory
    X.fillStyle='#28231d'; X.fillRect(0,0,W,H);
    X.fillStyle='#1c1814'; X.fillRect(0,H*0.66,W,H*0.34);
    X.fillStyle='rgba(255,250,220,0.05)';
    for(let i=0;i<4;i++) X.fillRect(120+i*220,0,90,H*0.66);
    // counter desk
    X.fillStyle='#4a3a28'; X.fillRect(40,H*0.66-46,150,46);
    X.fillStyle='#5a4a34'; X.fillRect(40,H*0.66-46,150,10);
    // ticket board
    X.fillStyle='#0a0a0a'; X.fillRect(W/2-170,54,340,76);
    X.strokeStyle='#4a4f62'; X.lineWidth=2; X.strokeRect(W/2-169,55,338,74);
    X.textAlign='center';
    X.fillStyle='#ff4a3a'; X.font='bold 24px ui-monospace,Menlo,monospace';
    X.fillText(wt.queue+': '+(13+Math.floor(frac*frac*820)), W/2, 88);
    X.fillStyle='#f2e8cf'; X.font='bold 13px ui-monospace,Menlo,monospace';
    X.fillText('YOUR NUMBER: 847', W/2, 116);
    // the line, dwindling with agonizing slowness
    const ahead=Math.max(0,Math.ceil((1-frac)*8));
    for(let i=0;i<ahead;i++){
      drawPerson(230+i*58, H*0.66+58, 2, 0,
        {skin:'#d8a882', shirt:['#6b7280','#7a6a58','#4a5568','#5a617a'][i%4], hair:'#3a3a44', pants:'#33364a'}, false);
    }
    const qhairC = G.days>110?'#a8a8a8':G.days>75?'#8a8378':G.days>45?'#6e5a44':'#5a3a1a';
    const qbl=Math.max(0,Math.min(9,((G.days-4)/10)|0));
    drawPerson(230+ahead*58+16, H*0.66+58, 2, 0,
      {skin:'#e8b48c', shirt:'#4a90d9', hair:qhairC, pants:'#33364a'}, false, qbl, G.days>75?'#7a7468':'#4a3320');
    X.textAlign='left';
  } else {
  let sky;
  if(ph<0.40) sky=mix(DAYC,DAYC,0);
  else if(ph<0.50) sky=mix(DAYC,DUSK,(ph-0.40)/0.10);
  else if(ph<0.60) sky=mix(DUSK,NIGHT,(ph-0.50)/0.10);
  else if(ph<0.90) sky=mix(NIGHT,NIGHT,0);
  else sky=mix(NIGHT,DAYC,(ph-0.90)/0.10);
  X.fillStyle=sky; X.fillRect(0,0,W,H);
  if(ph>=0.55&&ph<0.95){
    for(let i=0;i<50;i++){
      X.fillStyle='rgba(255,255,255,'+(0.3+0.6*h2(i,3)).toFixed(2)+')';
      X.fillRect(((h2(i,1)*W)|0), ((h2(i,2)*H*0.55)|0), 2,2);
    }
  }
  // sun / moon arc
  const arcT = ph<0.5? ph*2 : (ph-0.5)*2;
  const ax=90+(W-180)*arcT, ay=H*0.52-Math.sin(arcT*Math.PI)*H*0.34;
  if(ph<0.5){ X.fillStyle='#ffd766'; X.beginPath(); X.arc(ax,ay,26,0,7); X.fill(); }
  else { X.fillStyle='#e8e8f0'; X.beginPath(); X.arc(ax,ay,20,0,7); X.fill();
         X.fillStyle=sky; X.beginPath(); X.arc(ax+9,ay-5,17,0,7); X.fill(); }
  // ground
  X.fillStyle= ph<0.5? '#2c4a30':'#1a2a20'; X.fillRect(0,H*0.70,W,H*0.30);
  // sleeping bag + founder (beard grows with the days)
  const bx=W/2, by=H*0.70+78;
  X.fillStyle='rgba(0,0,0,0.35)'; X.beginPath(); X.ellipse(bx,by+26,100,15,0,0,7); X.fill();
  X.fillStyle='#a03c3c'; X.fillRect(bx-58,by-8,132,34);
  X.beginPath(); X.arc(bx+74,by+9,17,0,7); X.fill();
  X.fillStyle='#7a2c2c'; X.fillRect(bx-58,by-8,132,9);
  const hairC = G.days>110?'#a8a8a8':G.days>75?'#8a8378':G.days>45?'#6e5a44':'#5a3a1a';
  const beardC = G.days>75?'#7a7468':'#4a3320';
  X.fillStyle='#e8b48c'; X.fillRect(bx-90,by-10,26,24);
  X.fillStyle=hairC; X.fillRect(bx-92,by-14,28,8);
  X.fillStyle='#22232e'; X.fillRect(bx-84,by-2,6,2); X.fillRect(bx-72,by-2,6,2);
  const bl=Math.max(0,Math.min(9,((G.days-4)/10)|0));
  if(bl){ X.fillStyle=beardC; X.fillRect(bx-88,by+9,22,3); if(bl>2) X.fillRect(bx-85,by+12,16,Math.min(bl-2,7)); }
  // Z z z
  X.fillStyle='#f2e8cf';
  for(let i=0;i<3;i++){
    const zt=(G.t*0.9+i*0.33)%1;
    X.globalAlpha=1-zt;
    X.font='bold '+(12+i*5)+'px ui-monospace,Menlo,monospace';
    X.textAlign='center';
    X.fillText('z', bx-100-zt*30+i*14, by-28-zt*46-i*8);
  }
  X.globalAlpha=1;
  }
  // counters
  X.textAlign='center';
  X.fillStyle='#f0c040'; X.font='bold 34px ui-monospace,Menlo,monospace';
  X.fillText('+'+wt.shown+' day'+(wt.shown===1?'':'s'), W/2, 84);
  X.fillStyle='#f2e8cf'; X.font='bold 14px ui-monospace,Menlo,monospace';
  X.fillText('DAY '+G.days+' · burned '+fmtMoney(G.feesSpent)+' in fees · '+fmtMoney(G.lockedCap)+' locked', W/2, 114);
  if(wt.thought){
    X.fillStyle='#c8cede'; X.font='italic 14px ui-monospace,Menlo,monospace';
    X.fillText('"'+wt.thought+'"', W/2, 142);
  }
  if(wt.eventDone && wt.event){
    X.fillStyle='#ff9c8a'; X.font='bold 14px ui-monospace,Menlo,monospace';
    X.fillText(wt.event.t, W/2, 172);
  }
  X.fillStyle='#2a2f42'; X.fillRect(W/2-140,H-38,280,10);
  X.fillStyle='#f0c040'; X.fillRect(W/2-140,H-38,280*frac,10);
  X.textAlign='left';
}

function grade(days){
  return days<=1?['S','Speedrun. The system never even saw you.']
    : days<=7?['A','Efficient. Suspicious. Are you secretly a bureaucracy?']
    : days<=21?['B','Respectable. Only mild paper cuts.']
    : days<=45?['C','You have seen things. Stamps, mostly.']
    : days<=90?['D','Your beard grew. Your dream aged. The forms won.']
    : ['F','You are now legally a company and spiritually a filing cabinet.'];
}
function drawWin(){
  X.fillStyle='#0f1118'; X.fillRect(0,0,W,H);
  const c=G.done;
  // confetti-ish pixels
  for(let i=0;i<60;i++){
    const rx=h2(i,7)*W, ry=(h2(i,13)*H + G.t*40*(0.5+h2(i,3)))%H;
    X.fillStyle=['#f0c040','#e05a4a','#4a90d9','#7dc87d'][i%4];
    X.fillRect(rx, ry, 4,4);
  }
  // certificate — the accomplishment, front and center
  const bx=120, by=24, bw=W-240, bh=228;
  X.fillStyle='#f2ead2'; X.fillRect(bx,by,bw,bh);
  X.strokeStyle='#b08e21'; X.lineWidth=4; X.strokeRect(bx+4,by+4,bw-8,bh-8);
  X.strokeStyle='#d9b23c'; X.lineWidth=1.5; X.strokeRect(bx+10,by+10,bw-20,bh-20);
  X.textAlign='center'; X.fillStyle='#6a5a20';
  X.font='bold 12px ui-monospace,Menlo,monospace';
  X.fillText('★ CERTIFICATE OF INCORPORATION ★', W/2, by+34);
  X.fillStyle='#22232e'; X.font='bold 32px ui-monospace,Menlo,monospace';
  X.fillText('You founded '+G.coName, W/2, by+76);
  X.font='15px ui-monospace,Menlo,monospace'; X.fillStyle='#4a4534';
  X.fillText('a '+c.entity+' in '+c.flag+' '+c.name, W/2, by+104);
  const spent=G.feesSpent+G.livingSpent;
  X.fillStyle='#22232e'; X.font='bold 26px ui-monospace,Menlo,monospace';
  X.fillText('in '+G.days+' day'+(G.days===1?'':'s')+' · for '+fmtMoney(spent), W/2, by+150);
  X.fillStyle='#6a5a20'; X.font='12px ui-monospace,Menlo,monospace';
  X.fillText('('+fmtMoney(G.feesSpent)+' fees + '+fmtMoney(G.livingSpent)+' living)'
    +(G.lockedCap? ' · '+fmtMoney(G.lockedCap)+' still locked as capital':''), W/2, by+176);
  if(G.renamed) X.fillText('(born "'+G.renamed+'", renamed by government list)', W/2, by+198);
  else X.fillText('Sanity left: '+Math.round(G.sanity)+'% · '+G.docs.length+' documents survived', W/2, by+198);
  // seal + grade
  const [g,quip]=grade(G.days);
  X.fillStyle='#c0392b'; X.beginPath(); X.arc(bx+bw-56,by+bh-52,32,0,7); X.fill();
  X.fillStyle='#f2ead2'; X.font='bold 32px ui-monospace,Menlo,monospace';
  X.fillText(g, bx+bw-56, by+bh-41);
  X.fillStyle='#f0c040'; X.font='italic 13px ui-monospace,Menlo,monospace';
  X.fillText('Grade '+g+' — '+quip, W/2, 274);
  if(G.newAch && G.newAch.length){
    X.fillStyle='#7dc87d'; X.font='bold 12px ui-monospace,Menlo,monospace';
    X.fillText('🏆 unlocked: '+G.newAch.join(' · '), W/2, 292);
  }
  if(Object.keys(DONE).length>=COUNTRIES.length){
    X.fillStyle='#ffd766'; X.font='bold 14px ui-monospace,Menlo,monospace';
    X.fillText('★ SERIAL FOUNDER — incorporated in all 28. Please seek help. ★', W/2, 292);
  }
  const outro = c.outro || ('It took '+G.days+' days. Somewhere in Delaware, a founder did all of this during a single lunch break.');
  X.fillStyle='#c8cede'; X.font='12px ui-monospace,Menlo,monospace';
  let oy=(G.newAch&&G.newAch.length)||Object.keys(DONE).length>=COUNTRIES.length? 312:296;
  for(const line of wrapText(outro, 760, '12px ui-monospace,Menlo,monospace')){ X.fillText(line, W/2, oy); oy+=16; }

  // league table
  X.fillStyle='#f0c040'; X.font='bold 12px ui-monospace,Menlo,monospace';
  X.fillText('— THE LEAGUE TABLE OF BUREAUCRACY (estimated days to exist) —', W/2, oy+12);
  const sorted=[...COUNTRIES].sort((a,b)=>a.estDays-b.estDays);
  X.font='10px ui-monospace,Menlo,monospace'; X.textAlign='left';
  const rows=Math.ceil(sorted.length/3), top=oy+26;
  sorted.forEach((cc,i)=>{
    const col=(i/rows)|0, row=i%rows;
    const x=68+col*300, y=top+row*14;
    X.fillStyle = cc===c? '#f0c040' : DONE[cc.id]? '#7dc87d' : '#8a90a4';
    const pb=PB[cc.id]? '  ✓'+PB[cc.id].d+'d' : '';
    X.fillText((cc===c?'▸ ':'  ')+cc.flag+' '+cc.name.padEnd(14).slice(0,14)+' '+String(cc.estDays).padStart(3)+'d ~'+fmtMoney(cc.estFees)+pb, x, y);
  });
  X.textAlign='center';
  if(G.copied>0){ G.copied-=0.016;
    X.fillStyle='#7dc87d'; X.font='bold 11px ui-monospace,Menlo,monospace';
    X.fillText('copied ✓', W-60, 20);
  } else {
    X.fillStyle='#5a617a'; X.font='11px ui-monospace,Menlo,monospace';
    X.fillText('C — copy · N — field notes', W-110, 20);
  }
  X.fillStyle='#f2e8cf'; X.font='bold 13px ui-monospace,Menlo,monospace';
  X.fillText('Play again? ('+Object.keys(DONE).length+'/28 conquered — your bests go into the table)', W/2, H-52);
  const wopts=['Yes — start over, day 0','No — keep going, incorporate in MORE countries'];
  wopts.forEach((o,i)=>{
    X.fillStyle = i===G.winSel? '#f0c040':'#8a90a4';
    X.font = i===G.winSel? 'bold 12px ui-monospace,Menlo,monospace':'12px ui-monospace,Menlo,monospace';
    X.fillText((i===G.winSel?'▸ ':'')+o, W/2, H-34+i*16);
  });
  X.textAlign='left';
}
function drawNotes(c){
  X.fillStyle='rgba(11,13,18,0.96)'; X.fillRect(40,30,W-80,H-60);
  X.strokeStyle='#f0c040'; X.lineWidth=2; X.strokeRect(41,31,W-82,H-62);
  X.textAlign='center';
  X.fillStyle='#f0c040'; X.font='bold 15px ui-monospace,Menlo,monospace';
  X.fillText(c.flag+' '+c.name+' — FIELD NOTES (all of it is real)', W/2, 60);
  X.textAlign='left'; X.fillStyle='#c8cede'; X.font='12px ui-monospace,Menlo,monospace';
  let ny=86;
  for(const line of wrapText(c.tag, W-160, '12px ui-monospace,Menlo,monospace')){ X.fillText(line, 70, ny); ny+=16; }
  ny+=10;
  X.fillStyle='#f2e8cf'; X.font='bold 12px ui-monospace,Menlo,monospace';
  X.fillText('The actual chain ('+(c.office||'')+'):', 70, ny); ny+=18;
  X.font='11px ui-monospace,Menlo,monospace';
  c.steps.forEach((st,i)=>{
    const cost=typeof st.cost==='function'? st.cost({vars:{de:'GmbH'}}) : st.cost;
    const cap=typeof st.capital==='function'? st.capital({vars:{de:'GmbH'}}) : st.capital;
    let line=(i+1)+'. '+st.who;
    if(cost) line+=' · '+fmtMoney(cost);
    if(cap) line+=' · '+fmtMoney(cap)+' capital';
    if(st.wait) line+=' · ~'+st.wait+' day'+(st.wait>1?'s':'');
    if(st.doc) line+=' → '+st.doc;
    X.fillStyle='#8a90a4';
    X.fillText(line.slice(0,110), 70, ny); ny+=15;
  });
  ny+=8;
  X.fillStyle='#5a617a'; X.font='italic 11px ui-monospace,Menlo,monospace';
  if(c.src){
    ny+=10;
    X.fillStyle='#f2e8cf'; X.font='bold 12px ui-monospace,Menlo,monospace';
    X.fillText('Sources — the actual rules:', 70, ny); ny+=17;
    X.font='11px ui-monospace,Menlo,monospace';
    for(const sc of c.src){
      X.fillStyle='#8fd4ff'; X.fillText('• '+sc[0], 70, ny);
      X.fillStyle='#5a617a'; X.fillText(sc[1].replace(/^https?:\/\/(www\.)?/,''), 96, ny+13);
      ny+=30;
    }
  }
  ny+=6;
  X.fillStyle='#5a617a'; X.font='italic 11px ui-monospace,Menlo,monospace';
  X.fillText('Rules, fees and timelines as of 2025/26. None of this is invented.', 70, ny);
  X.textAlign='center'; X.fillStyle='#f0c040'; X.font='bold 11px ui-monospace,Menlo,monospace';
  X.fillText('N — close'+(c.src? '  ·  O — open first source':''), W/2, H-42);
  X.textAlign='left';
}
function drawOver(){
  X.fillStyle='#12080a'; X.fillRect(0,0,W,H);
  X.textAlign='center';
  X.fillStyle='#e05a4a'; X.font='bold 44px ui-monospace,Menlo,monospace';
  X.fillText('OUT OF RUNWAY', W/2, H/2-60);
  X.fillStyle='#f2e8cf'; X.font='15px ui-monospace,Menlo,monospace';
  X.fillText('You spent your savings on stamps before writing a single line of code.', W/2, H/2-10);
  X.fillText('The bureaucracy thanks you for your contribution.', W/2, H/2+16);
  X.fillStyle='#8a90a4';
  X.fillText('Day '+G.days+' · '+fmtMoney(G.money)+' · '+G.docs.length+' documents that now mean nothing', W/2, H/2+58);
  X.fillStyle='#f0c040'; X.font='bold 13px ui-monospace,Menlo,monospace';
  X.fillText('press R to try again (maybe... Delaware this time?)', W/2, H/2+110);
  X.textAlign='left';
}
function drawTitle(){
  X.fillStyle='#0b0d12'; X.fillRect(0,0,W,H);
  // skyline of tiny embassies
  for(let i=0;i<14;i++){
    const bw=50+h2(i,1)*40, bh=60+h2(i,2)*90, bx=i*70-10, by=H-bh-70;
    X.fillStyle='#161a26'; X.fillRect(bx,by,bw,bh);
    X.fillStyle='#f0c040';
    for(let wy=0; wy<bh-20; wy+=18) for(let wx=8; wx<bw-12; wx+=16)
      if(h2(i*99+wx,wy)>0.5){ X.globalAlpha=0.5; X.fillRect(bx+wx,by+10+wy,6,8); X.globalAlpha=1; }
  }
  X.fillStyle='#1b1e2b'; X.fillRect(0,H-70,W,70);
  X.textAlign='center';
  X.fillStyle='#f0c040'; X.font='bold 58px ui-monospace,Menlo,monospace';
  X.fillText('INCORPORATION', W/2, 120);
  X.fillStyle='#8a90a4'; X.font='14px ui-monospace,Menlo,monospace';
  X.fillText('a bird\'s-eye adventure through company formation', W/2, 152);
  X.fillStyle='#5a617a'; X.font='12px ui-monospace,Menlo,monospace';
  X.fillText('28 jurisdictions · 1 startup dream · unlimited stamps', W/2, 176);
  const na=Object.keys(ACH).length, nd=Object.keys(DONE).length;
  if(na||nd){
    X.fillStyle='#8a90a4'; X.font='bold 11px ui-monospace,Menlo,monospace';
    X.fillText('🏆 '+na+'/'+ACH_DEF.length+' achievements · ✓ '+nd+'/28 jurisdictions conquered', W/2, 200);
    const un=ACH_DEF.filter(a=>ACH[a[0]]).map(a=>a[1]).join(' · ');
    if(un){ X.fillStyle='#5a617a'; X.font='10px ui-monospace,Menlo,monospace';
      for(const [i,line] of wrapText(un, 700, '10px ui-monospace,Menlo,monospace').entries()) X.fillText(line, W/2, 216+i*13); }
  }
  X.textAlign='left';
}

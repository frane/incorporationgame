/* ================================================================
   TILES & MAPS
   ================================================================ */
const GRASS=0, PATH=1, ROOF=2, ROOF2=3, WALL=4, DOOR=5, SIGN=6, TREE=7,
      FLOWER=8, PLAZA=9, FOUNTAIN=10, FLOOR=11, WALLI=12, DESK=13,
      EXIT=14, CARPET=15, PLANT=16, WINDOW=17;
const SOLID = new Set([ROOF,ROOF2,WALL,DOOR,SIGN,TREE,FOUNTAIN,WALLI,DESK,PLANT,WINDOW]);

const ROOFCOLS = [
  ['#c94f3d','#a03526'], ['#4a76b8','#345a94'], ['#4c9e63','#357c48'],
  ['#b8823f','#946227'], ['#8258b8','#644094'], ['#b84f88','#943a68'],
  ['#3fa8a0','#2c837c'], ['#7d8494','#5d6474'],
];
const USA_ROOF = ['#d9b23c','#ad8a1f'];

function newMap(w,h,fill){
  return { w, h, t:new Uint8Array(w*h).fill(fill), own:new Int16Array(w*h).fill(-1),
           meta:new Map(), npcs:[], labels:[] };
}
function mset(m,x,y,t,own){ if(x<0||y<0||x>=m.w||y>=m.h) return; m.t[y*m.w+x]=t; if(own!==undefined) m.own[y*m.w+x]=own; }
function mget(m,x,y){ if(x<0||y<0||x>=m.w||y>=m.h) return TREE; return m.t[y*m.w+x]; }
function solidAt(m,x,y){ return SOLID.has(mget(m,x,y)); }
function mkey(x,y){ return x+','+y; }

/* ------- hub ------- */
const HUBW=80, HUBH=66;
const HUB_POS={};
function buildHub(){
  const m = newMap(HUBW,HUBH,GRASS);
  function placeBuilding(x0,y0,i){
    for(let x=x0+1;x<=x0+8;x++){ mset(m,x,y0,ROOF2,i); mset(m,x,y0+1,ROOF,i); }
    for(let y=y0+2;y<=y0+4;y++) for(let x=x0+1;x<=x0+8;x++) mset(m,x,y,WALL,i);
    mset(m,x0+2,y0+3,WINDOW,i); mset(m,x0+7,y0+3,WINDOW,i);
    mset(m,x0+4,y0+4,DOOR,i); m.meta.set(mkey(x0+4,y0+4),{t:'door',c:i});
    mset(m,x0+6,y0+5,SIGN,i); m.meta.set(mkey(x0+6,y0+5),{t:'sign',c:i});
    mset(m,x0+4,y0+5,PATH); mset(m,x0+4,y0+6,PATH);
    m.labels.push({x:(x0+5)*T-T/2, y:y0*T-6, text:COUNTRIES[i].flag+' '+COUNTRIES[i].name});
  }
  // EU-country slots ringing the central plaza
  const slots=[];
  for(let c=0;c<6;c++) slots.push([3+c*12,3]);    // north outer
  for(let c=0;c<6;c++) slots.push([3+c*12,12]);   // north inner
  for(let r=0;r<3;r++) slots.push([2,24+r*9]);    // west
  for(let r=0;r<3;r++) slots.push([69,24+r*9]);   // east
  for(let c=0;c<6;c++) slots.push([3+c*12,48]);   // south inner
  for(let c=0;c<3;c++) slots.push([21+c*12,56]);  // south outer
  for(let i=1;i<COUNTRIES.length;i++){
    HUB_POS[i]=slots[i-1];
    placeBuilding(slots[i-1][0], slots[i-1][1], i);
  }
  // streets + avenues
  for(const y of [9,18,46,54,62]) for(let x=1;x<HUBW-1;x++) if(mget(m,x,y)===GRASS) mset(m,x,y,PATH);
  for(const x of [7,40,72]) for(let y=9;y<=62;y++) if(mget(m,x,y)===GRASS) mset(m,x,y,PATH);
  // central plaza
  for(let y=26;y<=38;y++) for(let x=26;x<=53;x++) mset(m,x,y,PLAZA);
  mset(m,40,32,FOUNTAIN);
  // USA and the EU construction site face the plaza from its north edge
  HUB_POS[0]=[28,20];
  placeBuilding(28,20,0);
  const ex0=40, ey0=20;
  for(let x=ex0+1;x<=ex0+8;x++){ mset(m,x,ey0,ROOF2,99); mset(m,x,ey0+1,ROOF,99); }
  for(let y=ey0+2;y<=ey0+4;y++) for(let x=ex0+1;x<=ex0+8;x++) mset(m,x,y,WALL,99);
  mset(m,ex0+2,ey0+3,WINDOW,99); mset(m,ex0+7,ey0+3,WINDOW,99);
  mset(m,ex0+4,ey0+4,DOOR,99); m.meta.set(mkey(ex0+4,ey0+4),{t:'eu'});
  mset(m,ex0+6,ey0+5,SIGN,99); m.meta.set(mkey(ex0+6,ey0+5),{t:'eusign'});
  m.labels.push({x:(ex0+5)*T-T/2, y:ey0*T-6, text:'🇪🇺 EU — opening 2028 🚧'});
  // trees & flowers on remaining grass
  for(let y=1;y<HUBH-1;y++) for(let x=1;x<HUBW-1;x++){
    if(mget(m,x,y)!==GRASS) continue;
    const r=h2(x,y);
    if(r>0.96 && !nearType(m,x,y,PATH,1) && !nearType(m,x,y,DOOR,2)) mset(m,x,y,TREE);
    else if(r>0.86) mset(m,x,y,FLOWER);
  }
  // border trees
  for(let x=0;x<HUBW;x++){ mset(m,x,0,TREE); mset(m,x,HUBH-1,TREE); }
  for(let y=0;y<HUBH;y++){ mset(m,0,y,TREE); mset(m,HUBW-1,y,TREE); }
  // welcome sign + consultant on the plaza
  mset(m,33,35,SIGN,-2); m.meta.set(mkey(33,35),{t:'welcome'});
  m.npcs.push({ x:46*T+16, y:34*T+24, name:'The Consultant', cols:{skin:'#e8b48c',shirt:'#3b3f52',hair:'#2a2a33',pants:'#23252f'}, kind:'consultant' });
  m.labels.push({x:40*T+16, y:26*T-10, text:'⛲ INCORPORATION PLAZA'});
  // plaza life: the queue outside Germany never gets shorter
  const deSlot=HUB_POS[CINDEX.de];
  if(deSlot){
    const qx=(deSlot[0]+4)*T+16;
    for(let q=0;q<4;q++)
      m.npcs.push({x:qx, y:(deSlot[1]+5)*T+34+q*30, kind:'queuer',
        cols:{skin:'#e0b090', shirt:['#6b7280','#4a5568','#7a6a58','#5a617a'][q], hair:'#3a3a44', pants:'#33364a'}});
  }
  m.npcs.push({x:35*T+16, y:25*T+28, kind:'celebrant', cols:{skin:'#e8b48c',shirt:'#e0a020',hair:'#5a3a1a',pants:'#33364a'}});
  m.npcs.push({x:20*T, y:9*T+20,  patrol:[10*T,62*T], vx:34,  kind:'wanderer', cols:{skin:'#dca87e',shirt:'#7a4fb5',hair:'#2a2a33',pants:'#33364a'}});
  m.npcs.push({x:55*T, y:54*T+20, patrol:[12*T,68*T], vx:-30, kind:'wanderer', cols:{skin:'#e8c49c',shirt:'#3f9d5a',hair:'#4a3320',pants:'#33364a'}});
  m.pigeons=[]; for(let i=0;i<4;i++) m.pigeons.push({x:(30+i*5)*T, y:(29+(i%2)*6)*T, vx:0, vy:0, fly:0});
  return m;
}
function nearType(m,x,y,t,r){
  for(let dy=-r;dy<=r;dy++) for(let dx=-r;dx<=r;dx++) if(mget(m,x+dx,y+dy)===t) return true;
  return false;
}

/* ------- office interiors ------- */
function buildOffice(ci){
  const c=COUNTRIES[ci];
  const n=c.steps.length, cols=Math.ceil(n/2);
  const w=Math.max(16, cols*5+6), h=14;
  const m=newMap(w,h,FLOOR);
  for(let x=0;x<w;x++){ mset(m,x,0,WALLI); mset(m,x,1,WALLI); mset(m,x,h-1,WALLI); }
  for(let y=0;y<h;y++){ mset(m,0,y,WALLI); mset(m,w-1,y,WALLI); }
  const ex=(w/2)|0;
  mset(m,ex,h-1,EXIT); m.meta.set(mkey(ex,h-1),{t:'exit'});
  for(let y=h-4;y<h-1;y++) mset(m,ex,y,CARPET);
  mset(m,1,2,PLANT); mset(m,w-2,2,PLANT); mset(m,1,h-2,PLANT); mset(m,w-2,h-2,PLANT);
  const roles=['#7a4fb5','#b5493a','#3f6fb5','#3f9d5a','#b57f3f','#b53f7c','#3fa9a2','#6b7280'];
  // desks scattered over two staggered rows; no marker reveals which is next
  for(let i=0;i<n;i++){
    const col=(i/2)|0, row=i%2;
    const dx=3+col*5+(row?2:0), dy=row?8:4;
    mset(m,dx,dy,DESK); m.meta.set(mkey(dx,dy),{t:'step',i});
    m.npcs.push({ x:dx*T+16, y:dy*T-4, name:c.steps[i].who, stepIdx:i,
      cols:{skin:'#e8b48c', shirt:roles[i%roles.length], hair:i%2?'#4a3320':'#22232e', pants:'#33364a'} });
    m.labels.push({x:dx*T+16, y:(dy+1)*T+16, text:c.steps[i].who.length>22? c.steps[i].who.slice(0,21)+'…' : c.steps[i].who});
  }
  m.labels.push({x:ex*T+16, y:T+26, text:c.flag+' '+(c.office||c.name)});
  return m;
}

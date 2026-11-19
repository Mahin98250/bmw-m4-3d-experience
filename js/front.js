// FRONT FASCIA: kidney grilles, mesh intake, air curtains, splitter, LED headlights, hood roundel
// remove the placeholder boxes that car.js puts on the nose
car.children.filter(o=>o.position.x>2.4&&o.geometry&&o.geometry.type==='BoxGeometry').forEach(o=>car.remove(o));
const fz=z=>{const w=Math.max(0,(Math.abs(z)-.75)/.2);return 2.42+.2*Math.sqrt(Math.max(0,1-w*w))};
const dark=new T.MeshPhysicalMaterial({color:0x020203,metalness:.4,roughness:.25,clearcoat:1});
const gloss=new T.MeshStandardMaterial({color:0x08090b,metalness:.8,roughness:.18});
const dchr=new T.MeshStandardMaterial({color:0x3a3d44,metalness:1,roughness:.2});
const led=new T.MeshBasicMaterial({color:new T.Color(4,4,4.5)});
const poly=a=>a.map(p=>new T.Vector2(p[0],p[1]));
// extrude a (z,y) outline along -x so shape-x becomes world z
function ext(sh,d,b){const g=new T.ExtrudeGeometry(sh,{depth:d,bevelEnabled:!!b,bevelThickness:b||0,bevelSize:b||0,bevelSegments:3});g.rotateY(-Math.PI/2);return g}

function kidney(s){
 const o=[[.035,.40],[.035,.74],[.43,.76],[.37,.40]],h=[[.07,.435],[.07,.705],[.395,.72],[.34,.435]];
 const fs=new T.Shape(poly(o));fs.holes.push(new T.Path(poly(h)));
 const fr=new T.Mesh(ext(fs,.05,.008),dchr);fr.position.x=2.635;
 const rc=new T.Mesh(ext(new T.Shape(poly(h)),.03,0),dark);rc.position.x=2.628;
 const g=new T.Group();g.add(fr,rc);
 for(let i=0;i<8;i++){const b=new T.Mesh(new T.BoxGeometry(.012,.26,.012),gloss);b.position.set(2.634,.575,.09+i*.032);g.add(b)}
 g.scale.z=s;car.add(g)}
[1,-1].forEach(kidney);

// lower mesh intake, splitter, air curtains
(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle='#050506';x.fillRect(0,0,64,64);x.strokeStyle='#2c3038';x.lineWidth=3;
 for(let r=0;r<3;r++)for(let q=0;q<3;q++){const cx=q*28+(r%2?14:0),cy=r*16;x.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;x.lineTo(cx+10*Math.cos(a),cy+10*Math.sin(a))}x.closePath();x.stroke()}
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(16,4);t.anisotropy=8;
 const m=new T.Mesh(new T.PlaneGeometry(1.08,.15).rotateY(Math.PI/2),new T.MeshStandardMaterial({map:t,metalness:.6,roughness:.45}));m.position.set(2.637,.25,0);car.add(m);
 const fr=new T.Mesh(new T.BoxGeometry(.02,.17,1.12),dchr);fr.position.set(2.628,.25,0);car.add(fr);
 const sp=new T.Mesh(new T.BoxGeometry(.4,.025,1.8),gloss);sp.position.set(2.72,.11,0);car.add(sp);
 [1,-1].forEach(s=>{const a=new T.Mesh(new T.BoxGeometry(.04,.26,.14),dark);a.position.set(2.6,.26,s*.8);a.rotation.y=-s*.45;car.add(a)})})();

// LED headlights: angular lens, two DRL bars, two projector eyes
function headlight(s){const g=new T.Group();
 const sh=new T.Shape(poly([[0,-.045],[.30,-.085],[.33,-.01],[.22,.055],[0,.045]]));
 const lens=new T.Mesh(ext(sh,.04,.006),new T.MeshPhysicalMaterial({color:0x0a0c10,metalness:.3,roughness:.05,clearcoat:1}));g.add(lens);
 const bar=(w,y,z)=>{const b=new T.Mesh(new T.BoxGeometry(.008,.011,w),led);b.position.set(.004,y,z);g.add(b)};
 bar(.26,.03,.17);bar(.2,-.03,.17);
 [.09,.17].forEach(z=>{const e=new T.Mesh(new T.CylinderGeometry(.018,.018,.012,16).rotateZ(Math.PI/2),led);e.position.set(.003,0,z);g.add(e)});
 g.position.set(2.54,.8,s*.42);g.rotation.z=.5;g.scale.z=s;car.add(g)}
[1,-1].forEach(headlight);

// roundel on the bonnet
(()=>{const p=hoodP(.9,0),g=new T.Group();g.position.set(p.x,p.y+.006,p.z);
 [0x1c69d4,0xf4f6f8,0x1c69d4,0xf4f6f8].forEach((c,i)=>{const m=new T.Mesh(new T.CircleGeometry(.055,24,i*Math.PI/2,Math.PI/2),new T.MeshBasicMaterial({color:c}));m.rotation.x=-Math.PI/2;g.add(m)});
 const r=new T.Mesh(new T.RingGeometry(.055,.068,32),dchr);r.rotation.x=-Math.PI/2;g.add(r);g.rotation.z=-.56;car.add(g)})();

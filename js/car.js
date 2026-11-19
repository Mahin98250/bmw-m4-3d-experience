// Car body, glass, lights, wheels. Shared globals: car, wheels, paint, blk, chr, pts
const car=new T.Group(),wheels=[];
const paint=new T.MeshPhysicalMaterial({color:0x1b4fd0,metalness:.65,roughness:.22,clearcoat:1,clearcoatRoughness:.04});
const glass=new T.MeshPhysicalMaterial({color:0x04060a,metalness:1,roughness:.04,clearcoat:1});
const blk=new T.MeshStandardMaterial({color:0x050506,roughness:.6}),chr=new T.MeshStandardMaterial({color:0xdddddd,metalness:1,roughness:.15});
const add=(g,m,x,y,z)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);car.add(o);return o};
const pts=[[-2.4,.3],[-2.45,.6],[-2.3,.88],[-1.6,.97],[-.6,1],[.6,1],[1.5,.97],[2.1,.85],[2.42,.65],[2.42,.4]].map(p=>new T.Vector2(...p));
const bg=new T.ExtrudeGeometry(new T.Shape(new T.SplineCurve(pts).getPoints(70)),{depth:1.5,bevelEnabled:true,bevelThickness:.2,bevelSize:.2,bevelSegments:10,curveSegments:60});
bg.translate(0,0,-.75);bg.computeVertexNormals();add(bg,paint,0,0,0);
const gs=new T.Shape();[[-1.3,1],[-.5,1.42],[.55,1.42],[1.3,1]].forEach((p,i)=>i?gs.lineTo(...p):gs.moveTo(...p));
const gg=new T.ExtrudeGeometry(gs,{depth:1.25,bevelEnabled:true,bevelThickness:.1,bevelSize:.08,bevelSegments:6});gg.translate(0,0,-.625);add(gg,glass,0,0,0);
add(new T.BoxGeometry(1.05,.05,1.2),paint,.02,1.45,0);
add(new T.BoxGeometry(.25,.05,1.7),blk,-2.38,1.02,0);
[-1,1].forEach(s=>{
 add(new T.BoxGeometry(.22,.12,.18),paint,.95,1.08,s*1.0);
 add(new T.BoxGeometry(.06,.36,.34),chr,2.62,.52,s*.24);add(new T.BoxGeometry(.07,.3,.28),blk,2.63,.52,s*.24);
 add(new T.BoxGeometry(.08,.09,.5),new T.MeshBasicMaterial({color:new T.Color(4,4,4.5)}),2.5,.76,s*.62).rotation.z=-.5;
 add(new T.BoxGeometry(.5,.14,.16),blk,2.5,.22,s*.62);
});
add(new T.BoxGeometry(.05,.09,1.35),new T.MeshBasicMaterial({color:new T.Color(3,.1,.1)}),-2.57,.8,0);
for(let i=0;i<3;i++)add(new T.BoxGeometry(2.6,.025,.01),new T.MeshBasicMaterial({color:[0x81c4ff,0x1c69d4,0xe7222e][i]}),0,.5-i*.04,.955);
function wheel(x,z){const g=new T.Group(),w=new T.Group();
 const tire=new T.Mesh(new T.CylinderGeometry(.42,.42,.32,48).rotateX(Math.PI/2),new T.MeshStandardMaterial({color:0x0a0a0a,roughness:.85}));
 const rim=new T.Mesh(new T.CylinderGeometry(.3,.3,.33,48).rotateX(Math.PI/2),new T.MeshStandardMaterial({color:0x15171c,metalness:1,roughness:.3}));
 w.add(tire,rim);
 for(let i=0;i<5;i++){const s=new T.Mesh(new T.BoxGeometry(.58,.055,.34),new T.MeshStandardMaterial({color:0xc9ced6,metalness:1,roughness:.2}));s.rotation.z=i*Math.PI/5;w.add(s)}
 const cap=new T.Mesh(new T.CylinderGeometry(.07,.07,.36,24).rotateX(Math.PI/2),new T.MeshBasicMaterial({color:0x1c69d4}));w.add(cap);
 g.add(w);const cal=new T.Mesh(new T.BoxGeometry(.2,.12,.05),new T.MeshStandardMaterial({color:0xe7222e,roughness:.4}));cal.position.set(.18,.1,z>0?.2:-.2);g.add(cal);
 g.position.set(x,.42,z);car.add(g);wheels.push(w);
 const a=new T.Mesh(new T.CircleGeometry(.5,40),new T.MeshBasicMaterial({color:0x000000}));a.position.set(x,.42,z>0?.955:-.955);if(z<0)a.rotation.y=Math.PI;car.add(a)}
[[1.5,.86],[1.5,-.86],[-1.5,.86],[-1.5,-.86]].forEach(p=>wheel(...p));
car.scale.setScalar(.9);S.add(car);

// TIRES: lathe-profiled rubber (rim protector, bulged sidewall, rounded shoulder), procedural tread + sidewall lettering
// Replaces the placeholder cylinder tires made in car.js
(()=>{
const cvs=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
// height map (light = raised) -> normal map
function hNormal(c,k){const w=c.width,h=c.height,d=c.getContext('2d').getImageData(0,0,w,h).data,o=cvs(w,h),x2=o.getContext('2d'),im=x2.createImageData(w,h);
 const H=(x,y)=>d[(Math.min(h-1,Math.max(0,y))*w+(x+w)%w)*4]/255;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const dx=(H(x+1,y)-H(x-1,y))*k,dy=(H(x,y+1)-H(x,y-1))*k,l=Math.hypot(dx,dy,1),i=(y*w+x)*4;
  im.data[i]=(.5-.5*dx/l)*255;im.data[i+1]=(.5+.5*dy/l)*255;im.data[i+2]=(.5+.5/l)*255;im.data[i+3]=255}
 x2.putImageData(im,0,0);return o}
const tex=(c,rep,srgb)=>{const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rep,1);t.anisotropy=8;if(srgb)t.encoding=T.sRGBEncoding;return t};
// resample a polyline to n points evenly by arc length (so texture v maps evenly)
function resamp(a,n){const L=[0];for(let i=1;i<a.length;i++)L.push(L[i-1]+Math.hypot(a[i][0]-a[i-1][0],a[i][1]-a[i-1][1]));const o=[];
 for(let k=0;k<n;k++){const d=L[L.length-1]*k/(n-1);let i=1;while(i<L.length-1&&L[i]<d)i++;const f=(d-L[i-1])/(L[i]-L[i-1]||1);o.push(new T.Vector2(a[i-1][0]+(a[i][0]-a[i-1][0])*f,a[i-1][1]+(a[i][1]-a[i-1][1])*f))}return o}

// tread pattern: white = rubber, black = grooves, grey = sipes (256 around x 512 across, tiled 56x)
const tc=cvs(256,512),t=tc.getContext('2d');t.fillStyle='#fff';t.fillRect(0,0,256,512);t.strokeStyle='#000';
[.23,.40,.60,.77].forEach(f=>{t.lineWidth=17;t.beginPath();t.moveTo(0,f*512);t.lineTo(256,f*512);t.stroke()});
const slot=(x,a,b,w,c)=>{t.strokeStyle=c||'#000';t.lineWidth=w;[0,-256].forEach(o=>{t.beginPath();t.moveTo(x+o,a*512);t.lineTo(x+o+30,b*512);t.stroke()})};
[[40,0,.23],[168,0,.23],[90,.23,.40],[218,.23,.40],[60,.60,.77],[188,.60,.77],[120,.77,1],[248,.77,1]].forEach(s=>slot(s[0],s[1],s[2],12));
[[104,0,.23],[232,0,.23],[154,.23,.40],[26,.23,.40],[30,.40,.60],[100,.40,.60],[170,.40,.60],[240,.40,.60],[124,.60,.77],[252,.60,.77],[184,.77,1],[56,.77,1]].forEach(s=>slot(s[0],s[1],s[2],3,'#666'));
for(let i=0;i<2500;i++){t.fillStyle='rgba(0,0,0,.10)';t.fillRect(Math.random()*256,Math.random()*512,2,2)}
const trM=new T.MeshStandardMaterial({color:0x1a1a1a,roughness:.92,map:tex(tc,56,true),normalMap:tex(hNormal(tc,1.6),56),side:T.DoubleSide,envMapIntensity:.4});

// sidewall: embossed lettering, rings, radial ticks (4096 around x 256 radial; top = bead, bottom = shoulder)
const sc2=cvs(4096,256),s=sc2.getContext('2d');s.fillStyle='#0b0b0c';s.fillRect(0,0,4096,256);
s.fillStyle='#17181a';[146,222].forEach(y=>s.fillRect(0,y,4096,2));
s.fillStyle='#1d1e20';for(let x=0;x<4096;x+=16)s.fillRect(x,230,3,20);
s.fillStyle='#34363a';s.textBaseline='middle';
const txt=(str,x,y,px,sp)=>{s.font='bold '+px+'px Arial, Helvetica, sans-serif';if('letterSpacing' in s)s.letterSpacing=sp+'px';s.fillText(str,x,y)};
txt('PERFORMANCE SPORT',180,188,58,6);txt('255/35 ZR19  96Y  XL',1500,188,56,3);txt('TUBELESS  RADIAL',2600,188,54,5);
txt('TREADWEAR 300  TRACTION AA  TEMPERATURE A',1000,156,26,3);txt('MADE FOR HIGH SPEED',3100,156,26,4);
const swM=new T.MeshStandardMaterial({color:0xffffff,roughness:.78,map:tex(sc2,1,true),normalMap:tex(hNormal(sc2,6),1),side:T.DoubleSide,envMapIntensity:.5});

// profiles in (radius, axial): rim protector ridge, bulged sidewall, rounded shoulder
const SW=[[.411,.162],[.404,.169],[.398,.173],[.375,.177],[.350,.173],[.333,.170],[.328,.177],[.316,.178],[.306,.172],[.298,.128]];
const R=[[.411,.162],[.4165,.150],[.4192,.135],[.42,.118]];
const desc=[...R,...R.map(p=>[p[0],-p[1]]).reverse()];
const lathe=(p,n)=>new T.LatheGeometry(p,n).rotateX(Math.PI/2);
const gT=lathe(resamp(desc.slice().reverse(),96),512),gO=lathe(resamp(SW,40),256),gI=lathe(resamp(SW.map(p=>[p[0],-p[1]]).reverse(),40),256);
const tire=new T.Group();tire.add(new T.Mesh(gT,trM),new T.Mesh(gO,swM),new T.Mesh(gI,swM));

// fit to the four wheels: lettering faces outward, rear tires slightly wider
wheels.forEach(w=>{const g=w.parent;w.remove(w.children[0]);const k=tire.clone();
 if(g.position.z<0)k.rotation.y=Math.PI;if(g.position.x<0)k.scale.z=1.06;w.add(k)});
})();

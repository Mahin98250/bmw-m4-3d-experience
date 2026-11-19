// BONNET: parametric panel that follows the body crown, with twin power-dome ridges
const HX0=1.25,HX1=2.32,NX=64,NZ=56;
const sm=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
const spl=new T.SplineCurve(pts).getPoints(70);
function bodyTop(x,z){let y=1,m=0;
 for(let i=0;i<spl.length-1;i++){const a=spl[i],b=spl[i+1];if(a.x<=x&&x<b.x){m=(b.y-a.y)/(b.x-a.x);y=a.y+m*(x-a.x);break}}
 const w=Math.max(0,(Math.abs(z)-.75)/.2);return y+.2*Math.sqrt(Math.max(0,1-w*w))*Math.sqrt(1+m*m)}
function hoodP(u,v){const x=HX0+(HX1-HX0)*u,z=v*(.9-.07*u*u);
 const ridge=[-1,1].reduce((s,k)=>s+Math.exp(-Math.pow((z-k*.3)/.12,2)),0)*.05*sm(0,.3,u)*(1-sm(.8,1,u));
 const valley=-Math.exp(-Math.pow(z/.1,2))*.012*sm(0,.4,u);
 return new T.Vector3(x,bodyTop(x,z)+.016+ridge+valley,z)}
const hv=[],hi=[];
for(let i=0;i<=NX;i++)for(let j=0;j<=NZ;j++){const p=hoodP(i/NX,j/NZ*2-1);hv.push(p.x,p.y,p.z)}
for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++){const a=i*(NZ+1)+j,b=a+1,c=a+NZ+1,d=c+1;hi.push(a,b,c,b,d,c)}
const hg=new T.BufferGeometry();hg.setAttribute('position',new T.Float32BufferAttribute(hv,3));hg.setIndex(hi);hg.computeVertexNormals();
const hm=paint.clone();hm.side=T.DoubleSide;car.add(new T.Mesh(hg,hm));
const ln=[];
for(let k=0;k<=20;k++)ln.push(hoodP(0,k/10-1));
for(let k=1;k<=20;k++)ln.push(hoodP(k/20,1));
for(let k=1;k<=20;k++)ln.push(hoodP(1,1-k/10));
for(let k=19;k>=1;k--)ln.push(hoodP(k/20,-1));
ln.forEach(p=>p.y+=.004);
car.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(ln,true,'centripetal'),260,.005,6,true),blk));

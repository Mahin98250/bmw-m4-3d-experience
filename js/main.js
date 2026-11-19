// Bootstrap: load part files listed in parts.js, then start camera path, speed lines and render loop
const ld=s=>new Promise(ok=>{const e=document.createElement('script');e.src=s;e.onload=ok;e.onerror=()=>{console.warn('failed to load '+s);ok()};document.head.appendChild(e)});
ld('js/parts.js').then(async()=>{for(const p of PARTS)await ld('js/'+p+'.js');start()});

function start(){
const N=140,lp=new Float32Array(N*6);
for(let i=0;i<N;i++){const x=Math.random()*40-20,y=Math.random()*3+.1,z=(Math.random()<.5?-1:1)*(1.6+Math.random()*6);lp.set([x,y,z,x+1.5+Math.random()*2,y,z],i*6)}
const lg=new T.BufferGeometry();lg.setAttribute('position',new T.BufferAttribute(lp,3));
const lm=new T.LineBasicMaterial({color:0x81c4ff,transparent:true,opacity:0});S.add(new T.LineSegments(lg,lm));
// camera path (position / look-at)
const V=(x,y,z)=>new T.Vector3(x,y,z);
const cp=new T.CatmullRomCurve3([V(5.4,2.5,3.8),V(1,1.1,7),V(7.5,.8,1.2),V(-1,1.3,-7),V(-7,1.2,3.5),V(5,3.2,6.5)],false,'centripetal');
const lp2=new T.CatmullRomCurve3([V(1.3,.85,0),V(0,.75,0),V(1.5,.6,0),V(0,.7,0),V(0,.7,0),V(0,.7,0)],false,'centripetal');
let tg=0,cur=0,prev=0,t0=0;
function sc(){const h=document.documentElement.scrollHeight-innerHeight;tg=h>0?Math.min(1,Math.max(0,scrollY/h)):0}
addEventListener('scroll',sc,{passive:true});
function rs(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.fov=innerWidth<700?55:40;cam.updateProjectionMatrix()}
addEventListener('resize',rs);rs();sc();
const secs=[...document.querySelectorAll('section')],dots=[...document.querySelectorAll('#dots b')];
secs.forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){s.classList.add('in');dots.forEach((d,i)=>d.classList.toggle('on',i==s.dataset.i))}}),{threshold:.5}).observe(s));
function loop(t){requestAnimationFrame(loop);const dt=Math.min((t-t0)/1000,.05);t0=t;
 cur+=(tg-cur)*.06;
 cam.position.copy(cp.getPoint(cur));cam.position.y+=Math.sin(t*.0006)*.05;cam.lookAt(lp2.getPoint(cur));
 car.rotation.y=Math.sin(cur*6.283)*.12+(cur<.05?t*.00012:0);
 car.position.y=Math.sin(t*.002)*.004;
 const d=(cur-prev)*90;prev=cur;wheels.forEach(w=>w.rotation.z-=d+dt*.8);
 const sp=Math.max(0,1-Math.abs(cur-.62)/.2);lm.opacity=sp*.55;
 if(sp>0){const a=lg.attributes.position.array;for(let i=0;i<N;i++){const k=i*6,v=sp*.9+.2;a[k]-=v;a[k+3]-=v;if(a[k+3]<-20){a[k]+=40;a[k+3]+=40}}lg.attributes.position.needsUpdate=true}
 p1.position.x=-4+Math.sin(t*.0008)*2;
 R.render(S,cam);}
requestAnimationFrame(t=>{t0=t;loop(t);const l=document.getElementById('load');l.style.opacity=0;setTimeout(()=>l.remove(),900)});
}

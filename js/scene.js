// Renderer, studio reflections, lights, floor. Shared globals: T, R, S, cam, p1, p2
const T=THREE,cv=document.getElementById('gl');
const R=new T.WebGLRenderer({canvas:cv,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.1;R.outputEncoding=T.sRGBEncoding;
const S=new T.Scene();S.background=new T.Color(0x07090d);S.fog=new T.Fog(0x07090d,9,30);
const cam=new T.PerspectiveCamera(40,1,.1,100);
// studio environment for reflections
const E=new T.Scene();E.background=new T.Color(0x0a0d14);
function box(w,h,x,y,z,i,c){const m=new T.Mesh(new T.BoxGeometry(w,h,.1),new T.MeshBasicMaterial({color:new T.Color(c||0xffffff).multiplyScalar(i)}));m.position.set(x,y,z);m.lookAt(0,0,0);E.add(m)}
box(14,1.2,0,9,0,9);box(2,8,-9,3,2,6);box(2,8,9,3,-2,6);box(10,1,0,2,-10,4,0x81c4ff);box(8,1,0,3,10,3,0xffd9c0);
S.environment=new T.PMREMGenerator(R).fromScene(E,.02).texture;
S.add(new T.AmbientLight(0xffffff,.12));
const dl=new T.DirectionalLight(0xffffff,1.1);dl.position.set(5,8,4);S.add(dl);
const p1=new T.PointLight(0x1c69d4,2.5,16);p1.position.set(-4,2,-3);S.add(p1);
const p2=new T.PointLight(0xe7222e,1.8,14);p2.position.set(4,1,-4);S.add(p2);
// floor
const fl=new T.Mesh(new T.CircleGeometry(40,64),new T.MeshStandardMaterial({color:0x0b0e14,roughness:.35,metalness:.6}));fl.rotation.x=-Math.PI/2;S.add(fl);
const ring=new T.Mesh(new T.RingGeometry(3.6,3.65,96),new T.MeshBasicMaterial({color:0x1c69d4}));ring.rotation.x=-Math.PI/2;ring.position.y=.01;S.add(ring);
(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(0,0,0,.9)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);
const m=new T.Mesh(new T.PlaneGeometry(7.5,3.6),new T.MeshBasicMaterial({map:new T.CanvasTexture(c),transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=.02;S.add(m)})();

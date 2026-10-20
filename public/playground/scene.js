import * as THREE from './vendor/three.module.js';
export function mountScene(root){
const $=id=>root.querySelector('#'+id),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
try{
const world=$('world'),renderer=new THREE.WebGLRenderer({canvas:$('scene'),antialias:true,alpha:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0xffffff,0);
const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera();camera.position.set(19,19,25);camera.lookAt(0,2,0);scene.add(new THREE.HemisphereLight(0xeaf2ff,0x8a9bb7,3));const sun=new THREE.DirectionalLight(0xffffff,4);sun.position.set(-8,22,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-25,right:25,top:25,bottom:-25});sun.shadow.bias=-.001;scene.add(sun);
const rig=new THREE.Group();scene.add(rig);const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.48,...extra});const white=mat(0xffffff),blue=mat(0x2155ff),orange=mat(0xff8149);
function box(w,h,d,m,x,y,z,parent=rig){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
box(20,.5,10,mat(0xdfe9ff),0,-.25,0);box(20,.32,10,white,0,.15,0);box(19.6,.08,9.6,mat(0xf6f9ff),0,.35,0);
for(let x=-9;x<=9;x+=1.5)box(.018,.012,8.5,mat(0xdce5f4),x,.4,0);for(let z=-4;z<=4;z++)box(18,.012,.018,mat(0xdce5f4),0,.4,z);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.13}));ground.rotation.x=-Math.PI/2;ground.position.y=-1;ground.receiveShadow=true;scene.add(ground);
const closes=[99,100,99.5,100.2,100,98,99.4,101.5,102.6,101.9,103,104],bars=[];let prev=98.8;const py=p=>.65+(p-97)*.83;
closes.forEach((c,i)=>{const o=prev;prev=c;const g=new THREE.Group();g.position.x=(i-5.5)*1.4;rig.add(g);const m=mat(c>=o?0x169c7b:0xe16670);box(.7,Math.max(.12,Math.abs(c-o)*.83),.7,m,0,py((o+c)/2),0,g);const lo=Math.min(o,c)-.25,hi=Math.max(o,c)+.25;box(.055,(hi-lo)*.83,.055,m,0,py((lo+hi)/2),0,g);bars.push(g);});
const zone=box(6.5,(101.25-99.65)*.83,1.5,mat(0x285dff,{transparent:true,opacity:.18,depthWrite:false}),5,py(100.45),0);const edges=new THREE.LineSegments(new THREE.EdgesGeometry(zone.geometry),new THREE.LineBasicMaterial({color:0x2155ff,transparent:true,opacity:.65}));zone.add(edges);
const reference=box(13,.025,.04,orange,-1,py(98.55),.65);box(1.05,1.66,1.05,mat(0x2155ff,{transparent:true,opacity:.13,depthWrite:false}),-0.7,py(99),0);
// A small physical field guide makes the scene feel like a desk, not a dashboard.
const book=new THREE.Group();book.position.set(-6,.7,3.1);book.rotation.y=-.15;rig.add(book);box(2.7,.35,1.8,blue,0,0,0,book);box(2.55,.15,1.68,white,.02,0,0,book);box(.3,.06,1.95,orange,.7,.21,.12,book);
const ring=new THREE.Mesh(new THREE.TorusGeometry(.65,.13,12,48),blue);ring.rotation.x=Math.PI/2;ring.position.set(7.8,.65,3);rig.add(ring);
let frame=0,disposed=false,lastSignature='';let yaw=-.14,targetYaw=-.14,zoom=1,building=performance.now(),drag=false,lastX=0;
function resize(){lastSignature="";const w=world.clientWidth,h=world.clientHeight,aspect=w/h;const span=w<760?17:18;camera.left=-span*aspect/2;camera.right=span*aspect/2;camera.top=span/2;camera.bottom=-span/2;camera.zoom=zoom;camera.updateProjectionMatrix();renderer.setSize(w,h,false);rig.position.set(w<760||root.closest('[dir=rtl]')?0:5.3,0,0);}
const observer=new ResizeObserver(resize);observer.observe(world);resize();$('fallback').hidden=true;
const anchors={sweep:new THREE.Vector3(-1,2,1),fvg:new THREE.Vector3(4.5,6.8,0),ob:new THREE.Vector3(-5,1,3)};
function pinPositions(){for(const [key,p]of Object.entries(anchors)){const v=rig.localToWorld(p.clone()).project(camera);const b=$('pin-'+key);const px=(v.x*.5+.5)*world.clientWidth;b.style.left=(world.clientWidth<760?Math.max(95,Math.min(world.clientWidth-95,px)):px)+'px';b.style.top=((-v.y*.5+.5)*world.clientHeight+(world.clientWidth<760&&key==='ob'?65:0))+'px';}}
$('rotate-left').onclick=()=>targetYaw-=.2;$('rotate-right').onclick=()=>targetYaw+=.2;$('zoom-in').onclick=()=>{zoom=Math.min(1.35,zoom+.1);resize();};$('zoom-out').onclick=()=>{zoom=Math.max(.7,zoom-.1);resize();};$('reset').onclick=()=>{targetYaw=-.14;zoom=1;root.dataset.apart='false';resize();};$('replay').onclick=()=>{building=performance.now();};
const canvas=$('scene');canvas.onpointerdown=e=>{drag=true;lastX=e.clientX;canvas.setPointerCapture(e.pointerId);};canvas.onpointermove=e=>{if(drag){targetYaw+=(e.clientX-lastX)*.004;lastX=e.clientX;}};canvas.onpointerup=()=>drag=false;canvas.onpointercancel=()=>drag=false;
function draw(now){if(disposed)return;frame=requestAnimationFrame(draw);const active=root.dataset.active||'fvg',apart=root.dataset.apart==='true';if(document.hidden||!root.getBoundingClientRect().height||root.getBoundingClientRect().bottom<0)return;yaw+=(targetYaw-yaw)*(reduced?1:.08);rig.rotation.y=yaw;bars.forEach((g,i)=>{const t=reduced?1:THREE.MathUtils.clamp((now-building-i*75)/700,0,1);g.scale.y=Math.max(.001,1-Math.pow(1-t,3));const selected=active==='fvg'?[6,7,8].includes(i):i===5;const z=apart&&selected?(active==='fvg'?(i-7)*2.3:2.5):0;g.position.z+=(z-g.position.z)*(reduced?1:.09);});zone.visible=active==='fvg'||$('inspector').hidden;reference.visible=active==='sweep'||$('inspector').hidden;const signature=[yaw.toFixed(4),camera.zoom,world.clientWidth,world.clientHeight,active,apart,...bars.map(g=>g.position.z.toFixed(3)+g.scale.y.toFixed(3))].join('|');if(signature!==lastSignature){lastSignature=signature;pinPositions();renderer.render(scene,camera);}}requestAnimationFrame(draw);
return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});renderer.dispose();};
}catch(error){$('fallback').innerHTML='<strong>Your browser could not open the 3D scene.</strong><p>You can still explore the concepts with the numbered buttons, or open the library.</p>';console.error(error);}



}

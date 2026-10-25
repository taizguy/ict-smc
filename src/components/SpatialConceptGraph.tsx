import React, { useEffect, useRef, useState } from 'react';
import { CONCEPT_SLUG_MAP, DEEP_SUB_CONCEPTS, GLOSSARY_CATEGORIES, getGlossaryConceptPath, getGlossarySubConceptPath } from '../utils/glossaryRoutes';
import { useTranslation } from '../i18n/TranslationProvider';

const colors = ['#60a5fa','#c4a0ff','#47d6b0','#ffb65b','#ff829b','#b8dc63','#6dd8f0'];
const names = ['Market foundations','Liquidity','Market structure','Imbalances & gaps','Order blocks','Time & sessions','Models & execution'];
type GraphNode = { id:string; label:string; parent?:string; color:string; x:number; y:number; z:number; path?:string; children:number };
const allNodes: GraphNode[] = [{id:'root',label:'ICT / SMC',color:'#f3f5ff',x:0,y:0,z:0,children:GLOSSARY_CATEGORIES.length}];
GLOSSARY_CATEGORIES.forEach((category,i)=>{
 const angle = i/GLOSSARY_CATEGORIES.length*Math.PI*2; const x=Math.cos(angle)*155,y=Math.sin(angle)*110,z=Math.sin(angle*2)*55;
 const members=Object.values(CONCEPT_SLUG_MAP).filter(c=>c.category===category.id);
 allNodes.push({id:category.id,label:names[i]||category.name,parent:'root',color:colors[i%colors.length],x,y,z,children:members.length});
 members.forEach((concept,j)=>{
  const a=angle; const cx=x*2.6+(j%2)*40,cy=y*1.7+(j-(members.length-1)/2)*70,cz=z+(j%3-1)*35;
  const children=DEEP_SUB_CONCEPTS.filter(d=>d.parentConceptId===concept.id);
  allNodes.push({id:concept.id,label:concept.shortName||concept.name,parent:category.id,color:colors[i%colors.length],x:cx,y:cy,z:cz,path:getGlossaryConceptPath(concept.slug,concept.categorySlug),children:children.length});
  children.forEach((d,k)=>allNodes.push({id:d.id,label:d.name,parent:concept.id,color:colors[i%colors.length],x:cx+Math.cos(a)*115,y:cy+Math.sin(a)*100+(k-(children.length-1)/2)*50,z:cz+50,path:getGlossarySubConceptPath(d.categorySlug,d.slug),children:0}));
 });
});
interface GraphAPI { update:(nodes:GraphNode[],selected:string)=>void; focus:(id:string)=>void; reset:()=>void; zoom:(factor:number)=>void }

export function SpatialConceptGraph(){
 const {href,locale}=useTranslation();const ur=locale==='ur';
 const host=useRef<HTMLDivElement>(null);const api=useRef<GraphAPI|null>(null);
 const [expanded,setExpanded]=useState<string[]>(['root']);const [selected,setSelected]=useState('root');const [query,setQuery]=useState('');const [error,setError]=useState('');
 const pick=useRef((id:string)=>{});
 pick.current=(id)=>{setSelected(id);setExpanded(old=>old.includes(id)?old.filter(v=>v!==id):[...old,id]);api.current?.focus(id);};
 const visible=allNodes.filter(n=>{let p=n.parent;while(p){if(!expanded.includes(p))return false;p=allNodes.find(v=>v.id===p)?.parent;}return true;});
 const active=allNodes.find(n=>n.id===selected)||allNodes[0];
 const matches=query.trim()?allNodes.filter(n=>`${n.label} ${CONCEPT_SLUG_MAP[n.id]?.name||''} ${n.id}`.toLowerCase().includes(query.trim().toLowerCase())):[];
 const find=(id:string)=>{const ancestors=['root'];let p=allNodes.find(n=>n.id===id)?.parent;while(p){ancestors.push(p);p=allNodes.find(n=>n.id===p)?.parent;}setExpanded(old=>[...new Set([...old,...ancestors])]);setSelected(id);setQuery('');requestAnimationFrame(()=>api.current?.focus(id));};
 useEffect(()=>{
  let disposed=false;let cleanup=()=>{};
  Promise.all([import('three'),import('three/addons/controls/OrbitControls.js'),import('three/addons/renderers/CSS2DRenderer.js')]).then(([T,{OrbitControls},{CSS2DRenderer,CSS2DObject}])=>{
   if(disposed||!host.current)return;const container=host.current;
   const renderer=new T.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));container.appendChild(renderer.domElement);
   const labels=new CSS2DRenderer();labels.domElement.className='sg-label-layer';container.appendChild(labels.domElement);
   const scene=new T.Scene();const camera=new T.PerspectiveCamera(46,1,1,6000);camera.position.set(0,40,670);
   const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.09;controls.minDistance=95;controls.maxDistance=4000;controls.enablePan=true;controls.enableZoom=false;
   scene.add(new T.AmbientLight(0xffffff,1.8));const light=new T.DirectionalLight(0xffffff,3);light.position.set(40,100,150);scene.add(light);
   const group=new T.Group();scene.add(group);const geometries:InstanceType<typeof T.BufferGeometry>[]=[];const materials:InstanceType<typeof T.Material>[]=[];
   let entries:{mesh:InstanceType<typeof T.Mesh>;target:InstanceType<typeof T.Vector3>}[]=[];let edges:{line:InstanceType<typeof T.Line>;a:string;b:string}[]=[];
   const objects=new Map<string,InstanceType<typeof T.Mesh>>();let focusAfterRender:string|undefined;let current:GraphNode[]=[];let focusPoint:InstanceType<typeof T.Vector3>|null=null;let cameraPoint:InstanceType<typeof T.Vector3>|null=null;
   const reduced=matchMedia('(prefers-reduced-motion: reduce)');
   const clear=()=>{for(const child of [...group.children]){child.traverse(obj=>{if(obj instanceof CSS2DObject)obj.element.remove();});group.remove(child);}geometries.splice(0).forEach(g=>g.dispose());materials.splice(0).forEach(m=>m.dispose());objects.clear();entries=[];edges=[];};
   api.current={
    update(nodes,selectedId){const focusedId=(document.activeElement as HTMLElement|null)?.dataset.nodeId;const previous=new Map(entries.map(e=>[e.mesh.name,e.mesh.position.clone()]));clear();current=nodes;
     nodes.forEach(n=>{const geometry=new T.IcosahedronGeometry(n.id==='root'?12:n.parent==='root'?8:4.5,2);geometries.push(geometry);const material=new T.MeshStandardMaterial({color:n.color,roughness:.3,metalness:.25,emissive:n.color,emissiveIntensity:selectedId===n.id?.5:.08});materials.push(material);const mesh=new T.Mesh(geometry,material);mesh.name=n.id;mesh.position.copy(previous.get(n.id)||previous.get(n.parent||'')||new T.Vector3(0,0,0));group.add(mesh);objects.set(n.id,mesh);entries.push({mesh,target:new T.Vector3(n.x,n.y,n.z)});
      const el=document.createElement('button');el.type='button';el.className=`sg-node-label ${selectedId===n.id?'is-selected':''}`;el.style.setProperty('--node-color',n.color);el.textContent=n.label+(n.children?` ${nodes.some(v=>v.parent===n.id)?'−':'+'}`:'');el.dataset.nodeId=n.id;if(n.children)el.setAttribute('aria-expanded',String(nodes.some(v=>v.parent===n.id)));el.setAttribute('aria-label',`${n.label}${n.children?', expand or collapse branch':', show concept'}`);el.onclick=()=>pick.current(n.id);const label=new CSS2DObject(el);label.position.set(0,-(n.id==='root'?24:18),0);mesh.add(label);
     });nodes.filter(n=>n.parent&&objects.has(n.parent)).forEach(n=>{const geometry=new T.BufferGeometry().setFromPoints([new T.Vector3(),new T.Vector3()]);geometries.push(geometry);const material=new T.LineBasicMaterial({color:n.color,transparent:true,opacity:.48});materials.push(material);const line=new T.Line(geometry,material);group.add(line);edges.push({line,a:n.parent!,b:n.id});});if(focusedId)focusAfterRender=focusedId;
    },
    focus(id){const n=allNodes.find(n=>n.id===id);if(!n)return;const family=allNodes.filter(v=>v.id===id||v.parent===id);const bounds=new T.Box3().setFromPoints(family.map(v=>new T.Vector3(v.x,v.y,v.z)));const sphere=bounds.getBoundingSphere(new T.Sphere());const v=T.MathUtils.degToRad(camera.fov);const h=2*Math.atan(Math.tan(v/2)*camera.aspect);const distance=Math.max(330,sphere.radius/Math.sin(Math.min(v,h)/2)*1.3);focusPoint=sphere.center;cameraPoint=focusPoint.clone().add(new T.Vector3(0,20,distance));},
    reset(){const bounds=new T.Box3().setFromPoints(current.map(n=>new T.Vector3(n.x,n.y,n.z)));const sphere=bounds.getBoundingSphere(new T.Sphere());const v=T.MathUtils.degToRad(camera.fov);const h=2*Math.atan(Math.tan(v/2)*camera.aspect);const distance=Math.max(500,sphere.radius/Math.sin(Math.min(v,h)/2)*1.25);focusPoint=sphere.center;cameraPoint=focusPoint.clone().add(new T.Vector3(0,20,distance));},
    zoom(factor){focusPoint=null;cameraPoint=null;camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);controls.update();}
   };
   const resize=()=>{const w=container.clientWidth,h=container.clientHeight;renderer.setSize(w,h);labels.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(w<600&&current.length<=8){camera.position.set(0,40,Math.max(670,520/camera.aspect));}};const ro=new ResizeObserver(resize);ro.observe(container);resize();
   let inView=true;const io=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;});io.observe(container);
   const raycaster=new T.Raycaster();const pointer=new T.Vector2();let downX=0,downY=0;const down=(e:PointerEvent)=>{downX=e.clientX;downY=e.clientY;};const up=(e:PointerEvent)=>{if(Math.hypot(e.clientX-downX,e.clientY-downY)>6)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects([...objects.values()],false)[0];if(hit)pick.current(hit.object.name);};renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointerup',up);
   const stopFlight=()=>{focusPoint=null;cameraPoint=null;};controls.addEventListener('start',stopFlight);
   renderer.setAnimationLoop(()=>{if(!inView||document.hidden)return;entries.forEach(({mesh,target})=>{reduced.matches?mesh.position.copy(target):mesh.position.lerp(target,.12);});edges.forEach(({line,a,b})=>{const positions=line.geometry.attributes.position as InstanceType<typeof T.BufferAttribute>;const p=objects.get(a)!.position,q=objects.get(b)!.position;positions.setXYZ(0,p.x,p.y,p.z);positions.setXYZ(1,q.x,q.y,q.z);positions.needsUpdate=true;});if(focusPoint&&cameraPoint){controls.target.lerp(focusPoint,reduced.matches?1:.08);camera.position.lerp(cameraPoint,reduced.matches?1:.08);}controls.update();renderer.render(scene,camera);labels.render(scene,camera);if(focusAfterRender){labels.domElement.querySelector<HTMLButtonElement>(`button[data-node-id="${focusAfterRender}"]`)?.focus({preventScroll:true});focusAfterRender=undefined;}});
   api.current.update(allNodes.filter(n=>!n.parent||n.parent==='root'),'root');
   cleanup=()=>{renderer.setAnimationLoop(null);ro.disconnect();io.disconnect();renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointerup',up);controls.dispose();clear();renderer.dispose();renderer.domElement.remove();labels.domElement.remove();api.current=null;};
  }).catch(()=>{if(!disposed)setError('The 3D view is unavailable on this device. Use the accessible concept tree below.');});
  return()=>{disposed=true;cleanup();};
 },[]);
 useEffect(()=>{api.current?.update(visible,selected);},[expanded,selected]);
 return <section className="spatial-graph"><header className="sg-intro"><span>KNOWLEDGE GRAPH · {allNodes.length} NODES</span><h2>{ur?'دیکھیں Smart Money Concepts کیسے جڑتے ہیں':<>See how <em>smart money concepts</em> fit together.</>}</h2><p>{ur?'شاخ پر کلک کرکے اسے کھولیں۔ خالی جگہ کو ڈریگ کرکے منظر گھمائیں۔':'A living map of the subject. Click a branch to grow it. Drag empty space to orbit. Follow the connections—not a trading signal.'}</p></header><div className="sg-search"><label htmlFor="sg-search">{ur?'تصور تلاش کریں':'Find and fly to a concept'}</label><input id="sg-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try Fair Value Gap…"/>{query&&<div className="sg-results">{matches.length?matches.slice(0,12).map(n=><button type="button" key={n.id} onClick={()=>find(n.id)}>{n.label} ↗</button>):<p>No matching concepts.</p>}</div>}</div><div className="sg-stage"><div ref={host} className="sg-canvas" aria-label="Interactive three-dimensional concept graph"/><div className="sg-stage-caption">{visible.length} / {allNodes.length} visible · Drag to orbit · Use + / − to zoom</div><div className="sg-controls"><button type="button" aria-label="Zoom in" onClick={()=>api.current?.zoom(.8)}>+</button><button type="button" aria-label="Zoom out" onClick={()=>api.current?.zoom(1.2)}>−</button><button type="button" onClick={()=>api.current?.reset()}>Recenter</button><button type="button" onClick={()=>{setExpanded(['root']);setSelected('root');api.current?.reset();}}>Collapse</button></div>{error&&<p role="status" className="sg-error">{error}</p>}</div><aside className="sg-inspector" aria-live="polite"><span style={{color:active.color}}>●</span><div><small>{active.parent?allNodes.find(n=>n.id===active.parent)?.label:'THE WHOLE SUBJECT'}</small><h3>{active.label}</h3><p>{active.children?`${active.children} connected topics. Select the node again to expand or collapse its branch.`:'This is a topic in the learning map. Open its explanation for definitions, conditions and limitations.'}</p>{active.path&&<a href={href(active.path)}>Read the explanation →</a>}</div></aside><p className="sg-note">Solid lines mean “grouped under”, not “causes”. The arrangement is a study aid, not a universal market sequence. ICT/SMC terms include interpretive conventions.</p></section>;
}

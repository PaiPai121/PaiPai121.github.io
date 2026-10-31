// All attachments retain the original image's canvas coordinates and painted proportions.
import {BodyMesh,bowAmount,bowPhase,breathAmount,bowMatrices,patAmount} from './body-mesh.js';
import {GazeEyes,gazeDirection} from './gaze-eyes.js';
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
const duration={greet:2.1,happy:2.4,pat:2.8,music:4.2,bow:3.5,surprise:1.5,land:.5};
const surface=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
const bounds=polygons=>{
  const p=polygons.flat(),xs=p.map(p=>p[0]),ys=p.map(p=>p[1]);
  const x=Math.floor(Math.min(...xs))-8,y=Math.floor(Math.min(...ys))-8;
  return [x,y,Math.ceil(Math.max(...xs))-x+8,Math.ceil(Math.max(...ys))-y+8];
};
function path(ctx,points,x=0,y=0){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0]-x,p[1]-y):ctx.moveTo(p[0]-x,p[1]-y));ctx.closePath();}
function patch(image,polygons,feather=3){
  const rect=bounds(polygons),[x,y,w,h]=rect,c=surface(w,h),mask=surface(w,h),m=mask.getContext('2d');
  m.fillStyle='#fff';m.filter=`blur(${feather}px)`;
  for(const polygon of polygons){path(m,polygon,x,y);m.fill();}
  const ctx=c.getContext('2d');ctx.drawImage(image,x,y,w,h,0,0,w,h);ctx.globalCompositeOperation='destination-in';ctx.drawImage(mask,0,0);
  return {image:c,rect};
}
function paint(ctx,part){ctx.drawImage(part.image,part.rect[0],part.rect[1]);}
function follow(s,target,dt,stiffness,damping){
  s.v+=((target-s.x)*stiffness-s.v*damping)*dt;s.x+=s.v*dt;
  if(Math.abs(s.x-target)<.0001&&Math.abs(s.v)<.0001){s.x=target;s.v=0;}
  return s.x-target;
}

export class SourceRig {
  constructor(canvas,config,images,onComplete){
    this.canvas=canvas;this.config=config;this.images=images;this.onComplete=onComplete;
    canvas.width=config.width;canvas.height=config.height;this.ctx=canvas.getContext('2d');
    this.scene=surface(config.width,config.height);this.artCtx=this.scene.getContext('2d');
    this.time=0;this.lastTime=0;this.actionStart=0;this.action='idle';this.mood='neutral';this.customMood=null;
    this.paused=true;this.calibrating=false;this.reduced=false;this.faceOnly=false;this.debug=false;
    this.bowValue=0;this.nodValue=0;this.hairFollow={x:0,v:0};this.capeFollow={x:0,v:0};this.bodySupported=true;
    try{this.bodyMesh=new BodyMesh(config.width,config.height,config.bodyRig);}
    catch(error){if(error.code!=='WEBGL_UNAVAILABLE')throw error;this.bodySupported=false;}
    this.blinkStart=-10;this.nextBlink=3.1;this.weights={smile:0,surprise:0,annoyed:0,sleep:0};
    this.gaze={x:0,y:0,targetX:0,targetY:0,last:-10,attentionUntil:0};this.currentBreath=0;
    this.gazeEyes=new GazeEyes(config.gaze,images.source,images.sclera);
    this.canvas.dataset.gazeZeroDiffPixels=String(this.gazeEyes.zeroDifference);
    this.closed=patch(images.closed,config.eyeRegions,3);
    this.half=patch(images.half,config.eyeRegions,3);
    this.cleanMouth=patch(images.clean,[config.mouthRegion],4);
    this.brows=config.browRegions.map(p=>{
      const clean=patch(images.clean,[p],3),original=patch(images.source,[p],0);
      const ctx=original.image.getContext('2d'),data=ctx.getImageData(0,0,original.image.width,original.image.height);
      for(let i=0;i<data.data.length;i+=4){if(data.data[i+2]<data.data[i]+8)data.data[i+3]=0;}
      ctx.putImageData(data,0,0);return {clean,original};
    });
    this.makeArmLayers();this.verifyRest();this.frame=this.frame.bind(this);this.draw(0,0);
  }
  makeArmLayers(){
    const c=this.config,[x,y,w,h]=bounds([c.armPolygon]);this.armRect=[x,y,w,h];
    const armMask=surface(w,h),handMask=surface(w,h);
    for(const [canvas,points] of [[armMask,c.armPolygon],[handMask,c.handPolygon]]){
      const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';path(ctx,points,x,y);ctx.fill();
    }
    const arm=armMask.getContext('2d').getImageData(0,0,w,h).data;
    const hand=handMask.getContext('2d').getImageData(0,0,w,h).data;
    this.base=surface(c.width,c.height);const base=this.base.getContext('2d');base.drawImage(this.images.source,0,0);
    const source=base.getImageData(x,y,w,h),clean=surface(w,h).getContext('2d');clean.drawImage(this.images.clean,-x,-y);
    const fill=clean.getImageData(0,0,w,h),fore=base.createImageData(w,h),palm=base.createImageData(w,h);
    for(let i=0;i<source.data.length;i+=4){
      if(arm[i+3]<128)continue;
      const target=hand[i+3]>=128?palm:fore;
      for(let j=0;j<4;j++)target.data[i+j]=source.data[i+j];
      // Opaque original pixels cover the underpainting exactly at rest. Transparent pixels stay transparent.
      if(source.data[i+3]===255){for(let j=0;j<3;j++)source.data[i+j]=fill.data[i+j];}
      else source.data[i+3]=0;
    }
    base.putImageData(source,x,y);
    this.forearm={image:surface(w,h),rect:this.armRect};this.hand={image:surface(w,h),rect:this.armRect};
    this.forearm.image.getContext('2d').putImageData(fore,0,0);this.hand.image.getContext('2d').putImageData(palm,0,0);
  }
  verifyRest(){
    const {width,height}=this.config,test=surface(width,height),reference=surface(width,height);
    const ctx=test.getContext('2d');ctx.drawImage(this.base,0,0);paint(ctx,this.forearm);paint(ctx,this.hand);
    reference.getContext('2d').drawImage(this.images.source,0,0);
    this.artCtx.drawImage(test,0,0);this.ctx.drawImage(this.scene,0,0);
    const a=this.ctx.getImageData(0,0,width,height).data,b=reference.getContext('2d').getImageData(0,0,width,height).data;
    let pixels=0,max=0;
    for(let i=0;i<a.length;i+=4){let diff=false;for(let j=0;j<4;j++){const d=Math.abs(a[i+j]-b[i+j]);max=Math.max(max,d);if(d)diff=true;}if(diff)pixels++;}
    this.canvas.dataset.restDiffPixels=String(pixels);this.canvas.dataset.restMaxChannelDiff=String(max);
    if(pixels)throw new Error(`Source-layer rest mismatch: ${pixels} pixels`);
  }
  play(action,reduced=false){
    this.reduced=reduced;this.action=this.calibrating?'idle':action;this.actionStart=this.time;this.customMood=null;
    if(this.action==='bow'&&!this.bodySupported){this.action='idle';this.onComplete?.('bow');}
    if(['greet','happy','pat'].includes(action))this.blinkStart=this.time+.25;
    if(['greet','surprise','pat'].includes(action))this.gaze.attentionUntil=this.time+(action==='pat'?2.8:1.2);
    this.canvas.dataset.action=this.action;
    if(this.calibrating||reduced){this.pause();this.draw(this.time,0);return;}
    this.resume();
  }
  resume(){if(this.paused){this.paused=false;this.lastTime=0;this.raf=requestAnimationFrame(this.frame);}}
  pause(){this.paused=true;cancelAnimationFrame(this.raf);}
  destroy(){this.pause();this.bodyMesh?.destroy();this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);}
  setCalibration(value){this.calibrating=!!value;this.pause();this.action='idle';this.canvas.dataset.action='idle';this.customMood=null;this.weights={smile:0,surprise:0,annoyed:0,sleep:0};this.bowValue=0;this.nodValue=0;this.hairFollow={x:0,v:0};this.capeFollow={x:0,v:0};this.gaze={x:0,y:0,targetX:0,targetY:0,last:-10,attentionUntil:0};this.blinkStart=-10;this.draw(this.time,0);if(!value&&!this.reduced)this.resume();}
  setFaceOnly(value){this.faceOnly=!!value;this.draw(this.time,0);}
  setExpression(mood){this.action='idle';this.canvas.dataset.action='idle';this.customMood=mood;this.gaze.attentionUntil=this.time+.8;this.draw(this.time,0);if(!this.calibrating&&!this.reduced)this.resume();}
  sourcePoint(clientX,clientY){
    const r=this.canvas.getBoundingClientRect(),c=this.config;
    if(!r.width||!r.height)return null;
    const s=Math.min(r.width/c.width,r.height/c.height);
    let x=(clientX-r.left-(r.width-c.width*s)/2)/s,y=(clientY-r.top-(r.height-c.height*s)/2)/s;
    if(this.faceOnly){x=(x-c.width/2)/1.25+645;y=(y-c.height/2)/1.25+500;}
    return [x,y];
  }
  isHeadPoint(clientX,clientY){
    const p=this.sourcePoint(clientX,clientY);if(!p)return false;
    const m=bowMatrices(this.config.bodyRig,this.bowValue,this.currentBreath,this.nodValue).head;
    const dx=p[0]-m[4],dy=p[1]-m[5],x=m[0]*dx+m[1]*dy,y=m[2]*dx+m[3]*dy;
    return Math.pow((x-620)/270,2)+Math.pow((y-405)/235,2)<=1;
  }
  lookAt(clientX,clientY){
    if(this.calibrating||this.reduced)return;
    const p=this.sourcePoint(clientX,clientY);if(!p)return;
    const [x,y]=p,c=this.config;
    const m=bowMatrices(c.bodyRig,this.bowValue,this.currentBreath,this.nodValue).head,[fx,fy]=c.gaze.center;
    const dx=x-(m[0]*fx+m[2]*fy+m[4]),dy=y-(m[1]*fx+m[3]*fy+m[5]);
    const target=gazeDirection((m[0]*dx+m[1]*dy)/(c.width*.72),(m[2]*dx+m[3]*dy)/(c.height*.7));
    this.gaze.targetX=target.x;this.gaze.targetY=target.y;this.gaze.last=this.time;
  }
  relaxGaze(){this.gaze.last=-10;}
  blink(){this.blinkStart=this.time;this.draw(this.time,0);if(!this.calibrating&&!this.reduced)this.resume();}
  blinkAmount(t){const age=t-this.blinkStart;if(age<0||age>.3)return 0;if(age<.10)return ease(age/.10);if(age<.16)return 1;return 1-ease((age-.16)/.14);}
  frame(timestamp){
    if(this.paused)return;
    const dt=this.lastTime?Math.min((timestamp-this.lastTime)/1000,.04):0;this.lastTime=timestamp;this.time+=dt;
    if(this.time>this.nextBlink){this.blinkStart=this.time;this.nextBlink=this.time+3.4+Math.random()*1.7;}
    if(duration[this.action]&&this.time-this.actionStart>=duration[this.action]){const completed=this.action;this.action='idle';this.canvas.dataset.action='idle';this.onComplete?.(completed);}
    this.draw(this.time,dt);this.raf=requestAnimationFrame(this.frame);
  }
  draw(t,dt){
    const ctx=this.artCtx,c=this.config,age=t-this.actionStart;
    const frozen=this.calibrating||this.reduced;
    this.mood=this.customMood||({happy:'smile',pat:'smile',bow:'smile',surprise:'surprise',lifted:'annoyed',sleep:'sleep'}[this.action])||'neutral';
    const k=frozen?1:1-Math.exp(-dt*15);
    for(const mood of Object.keys(this.weights)){
      const target=Number(mood===this.mood)*(this.action==='pat'&&!frozen?ease((age-.12)/.35)*(1-ease((age-1.65)/.55)):1);
      this.weights[mood]+=(target-this.weights[mood])*k;
    }
    const closure=this.action==='sleep'?1:Math.max(this.weights.smile,this.weights.annoyed*.5,frozen?0:this.blinkAmount(t));
    const eyeFrame=closure>=.78?2:closure>=.3?1:0;
    const engaged=!frozen&&this.time-this.gaze.last<1.8&&this.time>=this.gaze.attentionUntil&&['idle','greet','surprise'].includes(this.action);
    const gazeK=frozen?1:1-Math.exp(-dt*(engaged?8:4));
    this.gaze.x+=((engaged?this.gaze.targetX:0)-this.gaze.x)*gazeK;this.gaze.y+=((engaged?this.gaze.targetY:0)-this.gaze.y)*gazeK;
    if(Math.hypot(this.gaze.x,this.gaze.y)<.001){this.gaze.x=0;this.gaze.y=0;}
    const gx=eyeFrame===0?this.gaze.x:0,gy=eyeFrame===0?this.gaze.y:0;
    const strum=!frozen&&this.action==='music'?ease(age/.35)*(1-ease((age-3.65)/.55)):0;
    const fore=Math.sin(age*11)*3.8*strum,hand=Math.sin(age*11+.6)*8*strum;
    const moving=!frozen&&this.bodySupported;
    const bowTarget=moving&&this.action==='bow'?bowAmount(age):0;
    this.bowValue=moving?this.bowValue+(bowTarget-this.bowValue)*(1-Math.exp(-dt*18)):0;
    if(Math.abs(this.bowValue-bowTarget)<.00001)this.bowValue=bowTarget;
    const bow=this.bowValue;
    const nodTarget=moving&&this.action==='pat'?patAmount(age):0;
    this.nodValue=moving?this.nodValue+(nodTarget-this.nodValue)*(1-Math.exp(-dt*18)):0;
    if(Math.abs(this.nodValue-nodTarget)<.00001)this.nodValue=nodTarget;
    if(!moving){this.hairFollow={x:0,v:0};this.capeFollow={x:0,v:0};}
    const motion={
      breath:moving?breathAmount(Math.floor(t*24)/24):0,nod:this.nodValue,
      hair:moving?Math.max(-8,Math.min(8,follow(this.hairFollow,bow+this.nodValue*.25,dt,64,10)*24)):0,
      cape:moving?Math.max(-6,Math.min(6,follow(this.capeFollow,bow,dt,42,9)*18)):0
    };
    this.currentBreath=motion.breath;
    const artSignature=[this.mood,this.debug,eyeFrame,...Object.values(this.weights).map(v=>v.toFixed(3)),fore.toFixed(3),hand.toFixed(3),gx.toFixed(3),gy.toFixed(3)].join('|');
    const signature=[this.action,this.calibrating,this.faceOnly,artSignature,bow.toFixed(5),motion.nod.toFixed(5),motion.breath.toFixed(5),motion.hair.toFixed(3),motion.cape.toFixed(3)].join('|');
    if(signature===this.lastDraw)return;this.lastDraw=signature;
    if(artSignature!==this.lastArt){
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,c.width,c.height);
    ctx.drawImage(this.base,0,0);
    // Registered open / half / closed eyelid drawings, without cross-fading two eye outlines.
    if(eyeFrame)paint(ctx,eyeFrame===2?this.closed:this.half);
    else this.gazeEyes.draw(ctx,gx,gy);
    const expressive=this.weights.surprise+this.weights.annoyed;
    const mouthWeight=expressive+this.weights.sleep;
    if(mouthWeight>.001){
      ctx.globalAlpha=mouthWeight;paint(ctx,this.cleanMouth);ctx.globalAlpha=1;
      for(const mood of ['surprise','annoyed','sleep'])if(this.weights[mood]>.001){
        const mouth=c.mouths[mood==='sleep'?'neutral':mood];ctx.globalAlpha=this.weights[mood];ctx.save();ctx.translate(...c.mouthCenter);ctx.rotate(-12*Math.PI/180);
        ctx.drawImage(this.images.features,...mouth.rect,mouth.draw[0]-c.mouthCenter[0],mouth.draw[1]-c.mouthCenter[1],mouth.draw[2],mouth.draw[3]);ctx.restore();
      }
      ctx.globalAlpha=1;
    }
    if(expressive>.001){
      this.brows.forEach((b,i)=>{
        ctx.globalAlpha=expressive;paint(ctx,b.clean);ctx.globalAlpha=1;
        const [x,y,w,h]=b.original.rect,px=x+w*.5,py=y+h*.5;
        const shift=-9*this.weights.surprise+3*this.weights.annoyed;
        const r=(i===0?10:-9)*this.weights.annoyed;
        ctx.save();ctx.translate(px,py+shift);ctx.rotate(r*Math.PI/180);ctx.translate(-px,-py);paint(ctx,b.original);ctx.restore();
      });
    }
    ctx.save();ctx.translate(...c.elbow);ctx.rotate(fore*Math.PI/180);ctx.translate(-c.elbow[0],-c.elbow[1]);paint(ctx,this.forearm);
    ctx.translate(...c.wrist);ctx.rotate(hand*Math.PI/180);ctx.translate(-c.wrist[0],-c.wrist[1]);paint(ctx,this.hand);ctx.restore();
    if(this.debug){
      ctx.strokeStyle='#49a793';ctx.lineWidth=3;
      for(const polygon of [c.armPolygon,c.handPolygon,...c.eyeRegions,c.mouthRegion]){path(ctx,polygon);ctx.stroke();}
      ctx.fillStyle='#ffebaa';for(const p of [c.elbow,c.wrist]){ctx.beginPath();ctx.arc(...p,7,0,Math.PI*2);ctx.fill();ctx.stroke();}
      ctx.strokeStyle='#d39869';ctx.beginPath();ctx.moveTo(...c.bodyRig.hip);ctx.lineTo(...c.bodyRig.neck);ctx.stroke();
    }
    this.lastArt=artSignature;
    }
    let image=this.scene;
    if(moving&&(bow>0||motion.nod>0||motion.breath>0||motion.hair||motion.cape))image=this.bodyMesh.draw(this.scene,bow,artSignature,motion);
    const target=this.ctx;target.setTransform(1,0,0,1,0,0);target.clearRect(0,0,c.width,c.height);
    if(this.faceOnly){const s=1.25;target.setTransform(s,0,0,s,c.width/2-645*s,c.height/2-500*s);}
    target.drawImage(image,0,0);
    Object.assign(this.canvas.dataset,{renderer:'source-rig',bodySupport:this.bodySupported?'webgl':'unavailable',expression:this.mood,eyes:['open','half','closed'][eyeFrame],eyeClosure:closure.toFixed(3),gazeX:gx.toFixed(3),gazeY:gy.toFixed(3),gazeMode:this.time<this.gaze.attentionUntil?'contact':engaged?'follow':'return',forearmAngle:fore.toFixed(3),wristAngle:hand.toFixed(3),bowAmount:bow.toFixed(4),nodAmount:motion.nod.toFixed(4),patPhase:this.action==='pat'?(age<.4?'responding':age<1.35?'enjoying':age<2.2?'releasing':'settling'):'rest',breathAmount:motion.breath.toFixed(4),hairLag:motion.hair.toFixed(3),capeLag:motion.cape.toFixed(3),torsoAngle:(c.bodyRig.torsoAngle*bow).toFixed(3),headAngle:((c.bodyRig.torsoAngle+c.bodyRig.headAngle)*bow-2*motion.nod).toFixed(3),bodyPhase:this.action==='bow'?bowPhase(age):'rest',motionPhase:this.calibrating?'calibration':strum?'strum':this.action});
  }
}

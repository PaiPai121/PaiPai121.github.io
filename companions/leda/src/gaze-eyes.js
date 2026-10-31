// Move the original painted irises inside fixed eyelid/hair masks.
// A zero-offset reference cancels underpainting differences, preserving the approved face.
const surface=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
function polygon(ctx,points,x,y){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0]-x,p[1]-y):ctx.moveTo(p[0]-x,p[1]-y));ctx.closePath();}
export function gazeDirection(x,y){const d=Math.max(1,Math.hypot(x,y));return {x:x/d,y:y/d};}

export class GazeEyes {
  constructor(config,source,sclera){
    this.config=config;
    this.eyes=config.eyes.map(eye=>{
      const [x,y,w,h]=eye.crop,original=surface(w,h),white=surface(w,h),iris=surface(w,h),mask=surface(w,h),aperture=surface(w,h),work=surface(w,h),output=surface(w,h);
      original.getContext('2d').drawImage(source,-x,-y);white.getContext('2d').drawImage(sclera,-x,-y);
      const originalPixels=original.getContext('2d').getImageData(0,0,w,h);
      const center=eye.iris.reduce((p,a)=>[p[0]+a[0]/eye.iris.length,p[1]+a[1]/eye.iris.length],[0,0]);
      const expanded=eye.iris.map(p=>{const dx=p[0]-center[0],dy=p[1]-center[1],d=Math.hypot(dx,dy);return [p[0]+dx/d*2,p[1]+dy/d*2];});
      const mc=mask.getContext('2d');mc.fillStyle='#fff';polygon(mc,expanded,x,y);mc.fill();
      const ic=iris.getContext('2d');ic.drawImage(original,0,0);ic.globalCompositeOperation='destination-in';ic.drawImage(mask,0,0);
      const ip=ic.getImageData(0,0,w,h),ac=aperture.getContext('2d');ac.fillStyle='#fff';polygon(ac,eye.aperture,x,y);ac.fill();
      const ap=ac.getImageData(0,0,w,h);
      for(let i=0;i<ap.data.length;i+=4){
        const r=originalPixels.data[i],g=originalPixels.data[i+1],b=originalPixels.data[i+2];
        const hair=b>r*1.1&&b>g*1.05,skin=r>g*1.12&&r>b*1.2;
        if(hair||skin){ap.data[i+3]=0;ip.data[i+3]=0;}
        else if(Math.max(r,g,b)<100&&ip.data[i+3]<32)ap.data[i+3]=0;
      }
      ic.globalCompositeOperation='source-over';ic.putImageData(ip,0,0);ac.putImageData(ap,0,0);
      const wc=work.getContext('2d',{willReadFrequently:true});wc.drawImage(white,0,0);wc.drawImage(iris,0,0);
      return {config:eye,white,iris,work,ctx:wc,output,original:originalPixels,aperture:ap.data,reference:wc.getImageData(0,0,w,h).data,result:wc.createImageData(w,h)};
    });
    let differing=0;
    for(const eye of this.eyes){const pixels=this.render(eye,0,0);for(let i=0;i<pixels.length;i+=4)if([0,1,2,3].some(k=>pixels[i+k]!==eye.original.data[i+k]))differing++;}
    this.zeroDifference=differing;
    if(differing)throw new Error('Zero gaze changed the original face.');
  }
  render(eye,x,y){
    const [,,w,h]=eye.config.crop,ctx=eye.ctx;
    ctx.clearRect(0,0,w,h);ctx.drawImage(eye.white,0,0);ctx.drawImage(eye.iris,x,y);
    const current=ctx.getImageData(0,0,w,h).data,out=eye.result.data;
    for(let i=0;i<out.length;i+=4){
      const alpha=eye.aperture[i+3]/255;
      for(let k=0;k<3;k++)out[i+k]=Math.max(0,Math.min(255,Math.round(eye.original.data[i+k]+(current[i+k]-eye.reference[i+k])*alpha)));
      out[i+3]=eye.original.data[i+3];
    }
    eye.output.getContext('2d').putImageData(eye.result,0,0);return out;
  }
  draw(ctx,x,y){
    if(!x&&!y)return;
    for(const eye of this.eyes){
      this.render(eye,x*this.config.maxOffset[0]*eye.config.scale,y*this.config.maxOffset[1]*eye.config.scale);
      ctx.drawImage(eye.output,eye.config.crop[0],eye.config.crop[1]);
    }
  }
}

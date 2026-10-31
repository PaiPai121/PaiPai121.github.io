// Leda's light bow. A rigid face and instrument group connect to a bending torso;
// weights fade to zero above the soles. All coordinates are from the original drawing.
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
export function bowAmount(age){
  if(age<.75)return smooth(age/.75);
  if(age<1.35)return 1;
  return 1-smooth((age-1.35)/1.25);
}
export function bowPhase(age){return age<.75?'lowering':age<1.35?'hold':age<2.6?'rising':age<3.5?'settling':'rest';}
export function breathAmount(time){return .5-.5*Math.cos(time*Math.PI*2/4.8);}
export function patAmount(age){return smooth(age/.4)*(1-smooth((age-1.35)/.85));}
const point=(m,x,y)=>[m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]];
function rotation(degrees,[x,y],drop=0){const a=degrees*Math.PI/180,c=Math.cos(a),s=Math.sin(a);return [c,s,-s,c,x-c*x+s*y,y-s*x-c*y+drop];}
function multiply(a,b){return [a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]];}
export function bowMatrices(rig,amount,breath=0,nod=0){
  const torso=rotation(rig.torsoAngle*amount,rig.hip,rig.hipDrop*amount-breath*rig.breathLift);
  return {torso,head:multiply(torso,rotation(rig.headAngle*amount-2*nod,rig.neck,rig.neckDrop*amount+2*nod))};
}
function polygonDistance(x,y,p){
  let inside=false,min=Infinity;
  for(let i=0,j=p.length-1;i<p.length;j=i++){
    const [ax,ay]=p[j],[bx,by]=p[i],dx=bx-ax,dy=by-ay;
    if((ay>y)!==(by>y)&&x<(bx-ax)*(y-ay)/(by-ay)+ax)inside=!inside;
    const t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy)));
    min=Math.min(min,Math.hypot(x-ax-t*dx,y-ay-t*dy));
  }
  return inside?-min:min;
}
export function buildBodyMesh(width,height,rig){
  // Merge nearby grid lines so rigid-region boundaries cannot create thin folding cells.
  const axis=(steps,size,anchors)=>[...new Set([...Array.from({length:steps+1},(_,i)=>i*size/steps).filter(v=>!anchors.some(a=>Math.abs(v-a)<8)),...anchors])].sort((a,b)=>a-b);
  const xs=axis(40,width,[rig.faceBounds[0],rig.faceBounds[2]]);
  const ys=axis(44,height,[rig.headBottom,rig.chestTop,rig.lowerBlendTop,rig.soleY,rig.faceBounds[1],rig.faceBounds[3]]);
  const original=[],uv=[],weights=[],secondary=[],indices=[];
  for(const y of ys)for(const x of xs){
    const [left,top,right,bottom]=rig.faceBounds;
    const face=x>=left&&x<=right&&y>=top&&y<=bottom;
    const distance=polygonDistance(x,y,rig.carrierPolygon),carrier=distance<=rig.carrierMargin;
    let head=0,torso=0;
    if(face)head=1;
    else{
      if(y<=rig.headBottom)head=1;
      else if(y<rig.chestTop){torso=smooth((y-rig.headBottom)/(rig.chestTop-rig.headBottom));head=1-torso;}
      else torso=1-smooth((y-rig.lowerBlendTop)/(rig.soleY-rig.lowerBlendTop));
      const blend=1-smooth((distance-rig.carrierMargin)/80);
      head*=1-blend;torso=torso+(1-torso)*blend;
    }
    if(y>=rig.soleY){head=0;torso=0;}
    original.push(x,y);uv.push(x/width,y/height);weights.push(head,torso);
    const gaussian=(cx,cy,rx,ry)=>Math.exp(-Math.pow((x-cx)/rx,2)-Math.pow((y-cy)/ry,2));
    const free=!face&&!carrier&&y<rig.soleY;
    secondary.push(free?gaussian(1040,520,220,360):0,free?gaussian(280,850,180,180):0,free?gaussian(1020,975,180,165):0,free?gaussian(640,735,260,180):0);
  }
  for(let y=0;y<ys.length-1;y++)for(let x=0;x<xs.length-1;x++){
    const a=y*xs.length+x,b=a+1,c=a+xs.length,d=c+1;indices.push(a,b,d,a,d,c);
  }
  return {original:new Float64Array(original),uv:new Float32Array(uv),weights:new Float64Array(weights),secondary:new Float64Array(secondary),indices:new Uint16Array(indices),xs,ys};
}
export function skinBody(mesh,rig,amount,motion={breath:0,hair:0,cape:0}){
  const matrix=bowMatrices(rig,amount,motion.breath,motion.nod||0),out=new Float32Array(mesh.original.length);
  for(let i=0;i<out.length;i+=2){
    const x=mesh.original[i],y=mesh.original[i+1],h=mesh.weights[i],t=mesh.weights[i+1];
    const hp=point(matrix.head,x,y),tp=point(matrix.torso,x,y);
    const k=i*2,hair=mesh.secondary[k],left=mesh.secondary[k+1],right=mesh.secondary[k+2],chest=mesh.secondary[k+3];
    out[i]=x+(hp[0]-x)*h+(tp[0]-x)*t+hair*motion.hair+(right-left)*motion.cape+(x-rig.hip[0])*chest*motion.breath*rig.breathWidth;
    out[i+1]=y+(hp[1]-y)*h+(tp[1]-y)*t+hair*motion.hair*.3+(left+right)*motion.cape*.25;
  }
  return out;
}
// Sample the actual triangles used by the GPU, for face/hand contact regression checks.
export function sampleBody(mesh,vertices,x,y){
  let ix=mesh.xs.findIndex(v=>v>=x)-1,iy=mesh.ys.findIndex(v=>v>=y)-1;
  ix=Math.max(0,Math.min(mesh.xs.length-2,ix));iy=Math.max(0,Math.min(mesh.ys.length-2,iy));
  const u=(x-mesh.xs[ix])/(mesh.xs[ix+1]-mesh.xs[ix]),v=(y-mesh.ys[iy])/(mesh.ys[iy+1]-mesh.ys[iy]);
  const a=iy*mesh.xs.length+ix,b=a+1,c=a+mesh.xs.length,d=c+1;
  const ids=u>=v?[a,b,d]:[a,d,c],w=u>=v?[1-u,u-v,v]:[1-v,u,v-u];
  return [0,1].map(k=>ids.reduce((sum,id,i)=>sum+vertices[id*2+k]*w[i],0));
}

export class BodyMesh {
  constructor(width,height,rig){
    this.rig=rig;this.mesh=buildBodyMesh(width,height,rig);
    this.canvas=document.createElement('canvas');this.canvas.width=width;this.canvas.height=height;
    const gl=this.gl=this.canvas.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,preserveDrawingBuffer:true});
    if(!gl){const error=new Error('WebGL is unavailable for body movement.');error.code='WEBGL_UNAVAILABLE';throw error;}
    const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;};
    const vertex=compile(gl.VERTEX_SHADER,'attribute vec2 position;attribute vec2 uv;uniform vec2 size;varying vec2 tex;void main(){gl_Position=vec4(position.x/size.x*2.0-1.0,1.0-position.y/size.y*2.0,0.0,1.0);tex=uv;}');
    const fragment=compile(gl.FRAGMENT_SHADER,'precision mediump float;uniform sampler2D image;varying vec2 tex;void main(){gl_FragColor=texture2D(image,tex);}');
    this.program=gl.createProgram();gl.attachShader(this.program,vertex);gl.attachShader(this.program,fragment);gl.linkProgram(this.program);
    gl.deleteShader(vertex);gl.deleteShader(fragment);
    if(!gl.getProgramParameter(this.program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(this.program));
    gl.useProgram(this.program);gl.uniform2f(gl.getUniformLocation(this.program,'size'),width,height);
    this.position=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.position);
    const position=gl.getAttribLocation(this.program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    this.uv=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.uv);gl.bufferData(gl.ARRAY_BUFFER,this.mesh.uv,gl.STATIC_DRAW);
    const uv=gl.getAttribLocation(this.program,'uv');gl.enableVertexAttribArray(uv);gl.vertexAttribPointer(uv,2,gl.FLOAT,false,0,0);
    this.index=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.index);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.mesh.indices,gl.STATIC_DRAW);
    this.texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,this.texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
    gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);
  }
  draw(source,amount,textureRevision,motion){
    const gl=this.gl;
    if(textureRevision!==this.textureRevision){gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);this.textureRevision=textureRevision;}
    gl.bindBuffer(gl.ARRAY_BUFFER,this.position);gl.bufferData(gl.ARRAY_BUFFER,skinBody(this.mesh,this.rig,amount,motion),gl.DYNAMIC_DRAW);
    gl.clear(gl.COLOR_BUFFER_BIT);gl.drawElements(gl.TRIANGLES,this.mesh.indices.length,gl.UNSIGNED_SHORT,0);
    return this.canvas;
  }
  destroy(){const gl=this.gl;gl.deleteBuffer(this.position);gl.deleteBuffer(this.uv);gl.deleteBuffer(this.index);gl.deleteTexture(this.texture);gl.deleteProgram(this.program);}
}

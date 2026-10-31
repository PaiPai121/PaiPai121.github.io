/* FortuneWeave Pets · Standalone Web Component. No framework or network API required. */
(() => {
  'use strict';
  const script = document.currentScript;
  const rigModuleURL = new URL('./cutout-rig.js', script.src);
  const sourceRigURL = new URL('./source-rig.js', script.src);
  const assetBase = new URL('../assets/characters/', script.src);
  const style = `
    :host{display:block;position:fixed;right:28px;bottom:12px;width:var(--pet-size,160px);height:calc(var(--pet-size,160px)*1.5);z-index:1000;isolation:isolate;color:#332d31;font:14px/1.6 system-ui,-apple-system,"PingFang SC",sans-serif;pointer-events:none}
    :host([placement="stage"]){position:absolute;left:50%;right:auto;bottom:35px;transform:translateX(-50%);z-index:2}
    :host([side="left"]:not([placement="stage"])){left:28px;right:auto}
    :host([data-renderer="reference"]){height:calc(var(--pet-size,160px)*1.1)}
    :host([data-renderer="source-rig"]){height:calc(var(--pet-size,160px)*1.1)}
    :host([data-renderer="source-rig"]) .shadow{display:none}
    :host([data-renderer="reference"]) .figure{cursor:default}
    :host([data-renderer="reference"]) .tools,:host([data-renderer="reference"]) .shadow{display:none}
    :host([data-renderer="reference"]) img{filter:none}
    *{box-sizing:border-box}button{font:inherit}button:focus-visible{outline:2px solid var(--pet-accent,#9d4054);outline-offset:4px}button{touch-action:manipulation}
    .figure{position:absolute;inset:0;border:0;padding:0;background:none;cursor:grab;pointer-events:auto;touch-action:none;-webkit-tap-highlight-color:transparent;user-select:none}
    .figure:active{cursor:grabbing}.body{display:block;width:100%;height:100%;position:relative}
    img{width:100%;height:100%;object-fit:contain;pointer-events:none;user-select:none;-webkit-user-drag:none;filter:drop-shadow(0 8px 7px #35202415)}
    canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none}canvas[hidden],img[hidden]{display:none}
    .shadow{position:absolute;bottom:8.5%;left:25%;width:50%;height:4%;background:#573d4220;border-radius:50%;filter:blur(4px);transition:opacity .2s}
    .bubble{position:absolute;bottom:96%;left:50%;transform:translateX(-50%);width:max-content;max-width:min(242px,calc(100vw - 32px));padding:12px 16px;border:1px solid #e4d6c6;border-radius:16px 16px 16px 4px;background:#fffcf6;color:#493a3c;box-shadow:0 5px 20px #3d243010;pointer-events:auto;text-align:center;font-size:13px}
    .bubble[hidden],.tools[hidden],.figure[hidden],.shadow[hidden],.restore[hidden]{display:none}
    .tools{position:absolute;right:0;top:24%;display:flex;flex-direction:column;gap:7px;opacity:0;transition:opacity .2s;pointer-events:auto}
    :host(:hover) .tools,:host(:focus-within) .tools{opacity:1}.tools button{border:1px solid #e4d6c6;background:#fffcf6;color:#6d5a5e;border-radius:50%;width:28px;height:28px;padding:0;cursor:pointer}
    .restore{position:absolute;bottom:0;right:0;border:1px solid #dccab5;border-radius:18px;background:#fff9ee;color:#814454;padding:7px 13px;pointer-events:auto;cursor:pointer;white-space:nowrap}
    .effects{position:absolute;inset:0;pointer-events:none;overflow:visible}.particle{position:absolute;left:50%;top:17%;color:var(--pet-accent,#9d4054);font-size:23px;animation:float 1.3s ease-out forwards;animation-delay:var(--delay);opacity:0}
    :host([data-state="lifted"]) .shadow{opacity:0}:host([face-closeup]) .shadow{display:none}
    @keyframes float{0%{opacity:0;transform:translate(0,5px) scale(.6)}20%{opacity:1}100%{opacity:0;transform:translate(var(--dx),-85px) scale(1.15)}}
    @media(hover:none){.tools{opacity:1}}@media(prefers-reduced-motion:reduce){.body,.particle{animation:none!important}.particle{display:none}}
  `;
  class FortuneWeavePet extends HTMLElement {
    static observedAttributes = ['size', 'character'];
    constructor() {
      super();
      this.attachShadow({mode:'open'}).innerHTML = `<style>${style}</style><div class="shadow"></div><button class="figure" aria-label="和蕾达互动，按回车打招呼，方向键移动，Escape 取消拖动"><span class="body"><img alt="" draggable="false"><canvas hidden aria-hidden="true"></canvas></span></button><div class="effects" aria-hidden="true"></div><div class="bubble" role="status" aria-live="polite" hidden></div><div class="tools"><button class="music" aria-label="奏一小节" title="奏一小节">♪</button><button class="hide" aria-label="收起桌宠" title="收起">−</button></div><button class="restore" hidden>蕾达 ♫</button>`;
      this.$ = s => this.shadowRoot.querySelector(s);
      this.timers = new Set();
      this.state = 'idle';
      this.lastActivity = Date.now();
      this.abort = null;
      this.loadVersion = 0;
      this.rig = null;
      this.reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    }
    connectedCallback() {
      if (this.abort) return;
      this.abort = new AbortController();
      const signal = this.abort.signal;
      const on = (el, type, fn) => el.addEventListener(type, fn, {signal});
      this.style.setProperty('--pet-size', `${this.size}px`);
      on(this.$('.figure'), 'pointerdown', e => this.pointerDown(e));
      on(this.$('.figure'), 'pointermove', e => this.pointerMove(e));
      on(this.$('.figure'), 'pointerup', e => this.pointerUp(e));
      on(this.$('.figure'), 'pointercancel', () => this.cancelPointer());
      on(this.$('.figure'), 'lostpointercapture', () => this.cancelPointer());
      on(this.$('.figure'), 'keydown', e => this.keydown(e));
      on(this.$('.music'), 'click', () => this.act('music'));
      on(this.$('.hide'), 'click', () => this.hide());
      on(this.$('.restore'), 'click', () => this.show());
      on(window, 'pointermove', e => this.rig?.lookAt?.(e.clientX,e.clientY));
      on(window, 'pointerout', e => {if(!e.relatedTarget)this.rig?.relaxGaze?.();});
      on(window, 'blur', () => this.rig?.relaxGaze?.());
      on(window, 'resize', () => this.clampPosition());
      on(document, 'visibilitychange', () => {
        this.cancelPointer();
        if (document.hidden) { this.clearIdle(); this.stopAnimation(); }
        else { this.renderAnimation(this.state); this.armIdle(); }
      });
      on(this.reduceMotion, 'change', () => this.renderAnimation(this.state));
      this.loadCharacter();
    }
    disconnectedCallback() {
      this.cancelFall();this.cancelPointer(); this.stopAnimation();this.rig?.destroy();this.rig=null;
      this.abort?.abort(); this.abort = null; this.loadVersion++;
      for (const timer of this.timers) clearTimeout(timer);
      this.timers.clear(); this.clearIdle();
    }
    attributeChangedCallback(name, oldValue, value) {
      if (oldValue === value) return;
      if (name === 'size') { this.style.setProperty('--pet-size', `${this.size}px`); this.clampPosition(); }
      if (name === 'character' && this.isConnected && this.abort) this.loadCharacter();
    }
    get size() { const v = Number(this.getAttribute('size') || 160); return Number.isFinite(v) ? Math.min(300,Math.max(80,v)) : 160; }
    later(fn, ms) { const id = setTimeout(() => { this.timers.delete(id); fn(); },ms); this.timers.add(id); return id; }
    emit(action) { this.dispatchEvent(new CustomEvent('pet:interaction',{detail:{character:this.getAttribute('character')||'leda',action,state:this.state},bubbles:true,composed:true})); }
    async loadCharacter() {
      const version = ++this.loadVersion;
      this.rig?.destroy();this.rig=null;this.$('canvas').hidden=true;this.$('img').hidden=false;
      const id = this.getAttribute('character') || 'leda';
      try {
        if (!/^[a-z0-9-]+$/.test(id)) throw new Error('Invalid character ID');
        const url = new URL(`${id}/character.json`,assetBase);
        const response = await fetch(url,{signal:this.abort.signal});
        if (!response.ok) throw new Error(`Character HTTP ${response.status}`);
        const character = await response.json();
        if (version !== this.loadVersion) return;
        this.character = character;
        this.characterURL = url;
        this.style.setProperty('--pet-accent',character.accent);
        this.$('img').src = new URL(character.image,url).href;
        await this.$('img').decode();
        if (version !== this.loadVersion) return;
        this.$('img').alt = `${character.name} Q版桌宠`;
        this.$('.restore').textContent = `${character.name} ♫`;
        this.$('.figure').setAttribute('aria-label',`和${character.name}互动，回车打招呼，方向键移动`);
        this.referenceOnly=character.renderMode==='reference'&&!this.hasAttribute('review-rejected-rig');
        const sourceRig=character.renderMode==='source-rig'&&!this.hasAttribute('review-rejected-rig');
        this.dataset.renderer=this.referenceOnly?'reference':sourceRig?'source-rig':'cutout-rig';
        if(this.referenceOnly)this.$('.figure').setAttribute('aria-label',`${character.name}原始完整造型，静态参考`);
        if(sourceRig){
          const configURL=new URL(character.sourceRig,url);
          const [module,response]=await Promise.all([import(sourceRigURL.href),fetch(configURL,{signal:this.abort.signal})]);
          if(!response.ok)throw new Error(`Source rig HTTP ${response.status}`);
          const config=await response.json(),images={source:this.$('img')};
          await Promise.all(['clean','closed','half','features','sclera'].map(async name=>{const im=new Image();im.src=new URL(config[name],configURL).href;await im.decode();images[name]=im;}));
          if(version!==this.loadVersion)return;
          this.rig=new module.SourceRig(this.$('canvas'),config,images,completed=>{
            if(completed==='music'&&this.state==='music'&&!this.pointer&&!this.hasAttribute('calibration')&&this.rig.bodySupported){this.act('bow');return;}
            this.state='idle';this.dataset.state='idle';this.emit('idle');
          });
          this.rig.setFaceOnly(this.hasAttribute('face-closeup'));this.rig.setCalibration(this.hasAttribute('calibration'));
          this.$('canvas').hidden=false;this.$('img').hidden=true;
        }else if(!this.referenceOnly) {
          const configURL=new URL(character.rig,url);
          const [module,configResponse]=await Promise.all([import(rigModuleURL.href),fetch(configURL,{signal:this.abort.signal})]);
          if(!configResponse.ok)throw new Error(`Rig HTTP ${configResponse.status}`);
          const config=await configResponse.json();
          const atlas=new Image();atlas.src=new URL(config.atlas,configURL).href;await atlas.decode();
          if(version!==this.loadVersion)return;
          let faceImages;
          if(config.face){
            const load=async name=>{const im=new Image();im.src=new URL(config.face[name],configURL).href;await im.decode();return im;};
            const [base,features]=await Promise.all([load('baseAtlas'),load('featuresAtlas')]);faceImages={base,features};
          }
          if(version!==this.loadVersion)return;
          this.rig=new module.CutoutRig(this.$('canvas'),config,atlas,()=>{this.state='idle';this.dataset.state='idle';this.emit('idle');},faceImages);
          this.rig.setFaceOnly(this.hasAttribute('face-closeup'));
          this.rig.setCalibration(this.hasAttribute('calibration'));
          this.$('canvas').hidden=false;this.$('img').hidden=true;
        }
        this.restorePosition();
        this.act(this.hasAttribute('face-closeup')||this.hasAttribute('calibration')?'idle':'greet'); this.armIdle();
        this.dispatchEvent(new CustomEvent('pet:ready',{bubbles:true,composed:true,detail:{character:id,animated:!!this.rig,renderer:this.dataset.renderer,bodyMotion:sourceRig?this.rig.bodySupported:false}}));
      } catch (error) {
        if (error.name === 'AbortError' || version !== this.loadVersion) return;
        this.say('角色素材加载失败，请检查资源路径。',0);
        this.dispatchEvent(new CustomEvent('pet:error',{detail:{message:error.message},bubbles:true,composed:true}));
      }
    }
    say(text, duration=4200) {
      clearTimeout(this.bubbleTimer);
      this.$('.bubble').textContent = text; this.$('.bubble').hidden = false;
      if (duration) this.bubbleTimer=this.later(()=>{this.$('.bubble').hidden=true;},duration);
    }
    line(kind) { const lines=this.character?.lines[kind] || this.character?.lines.tap || []; return lines[Math.floor(Math.random()*lines.length)] || ''; }
    stopAnimation() {this.rig?.pause();}
    renderAnimation(action) {
      if(!this.rig)return false;
      this.rig.play(action,this.reduceMotion.matches);
      return true;
    }
    setRigDebug(value){if(this.rig){this.rig.debug=!!value;this.rig.draw(this.rig.time,0);}}
    setCalibration(value){this.cancelFall();this.cancelPointer();this.toggleAttribute('calibration',!!value);this.rig?.setCalibration(value);this.state='idle';this.dataset.state='idle';this.$('.bubble').hidden=true;this.armIdle();}
    setExpression(mood){this.state='idle';this.dataset.state='idle';this.rig?.setExpression(mood);this.dispatchEvent(new CustomEvent('pet:expression',{detail:{mood},bubbles:true,composed:true}));}
    setFaceCloseup(value){this.toggleAttribute('face-closeup',!!value);this.rig?.setFaceOnly(value);}
    blink(){if(this.state==='sleep')this.act('wake');this.rig?.blink();this.emit('blink');}
    act(action='happy') {
      if(this.referenceOnly)return;
      if(!this.character||(this.character.renderMode==='source-rig'&&!this.rig))return;
      if(this.hasAttribute('calibration'))action='idle';
      const valid=['idle','greet','happy','pat','music','bow','surprise','lifted','land','sleep','wake','tap'];
      if (!valid.includes(action)) return;
      this.lastActivity=Date.now(); clearTimeout(this.actionTimer);
      this.state=action==='wake'?'greet':action==='tap'?'surprise':action;
      this.dataset.state=this.state;
      if (action !== 'idle') this.say(this.line(action));
      const animated=this.renderAnimation(this.state);
      if (animated && ['happy','pat','music'].includes(action)) this.burst(action==='music'?'♪':'♥');
      if (!animated && !['idle','sleep','lifted'].includes(action)) this.actionTimer=this.later(()=>{this.state='idle';this.dataset.state='idle';this.renderAnimation('idle');},1500);
      this.emit(action); this.armIdle();
    }
    burst(char) {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      for(let i=0;i<5;i++) {
        const p=document.createElement('span');p.className='particle';p.textContent=char;
        p.style.setProperty('--dx',`${(i-2)*23}px`);p.style.setProperty('--delay',`${i*95}ms`);
        this.$('.effects').append(p);this.later(()=>p.remove(),1900);
      }
    }
    pointerDown(e) {
      if(this.referenceOnly)return;
      if(this.hasAttribute('calibration'))return;
      if(e.button!==0 || this.pointer) return;
      this.cancelFall();this.rig?.setGrabPoint?.(e.clientX,e.clientY);
      if(this.state==='sleep') this.act('wake');
      this.pointer={id:e.pointerId,x:e.clientX,y:e.clientY,start:this.getBoundingClientRect(),dragging:false,pat:false,head:this.rig?.isHeadPoint?.(e.clientX,e.clientY)??((e.clientY-this.getBoundingClientRect().top)<this.getBoundingClientRect().height*.43),distance:0,lastX:e.clientX,lastY:e.clientY,lastTime:e.timeStamp,vx:0,vy:0};
      this.$('.figure').setPointerCapture(e.pointerId);
      this.holdTimer=this.later(()=>{if(this.pointer&&!this.pointer.pat){this.pointer.dragging=true;this.dataset.motion='held';this.act('lifted');}},420);
    }
    pointerMove(e) {
      const p=this.pointer;if(!p||p.id!==e.pointerId)return;
      const dx=e.clientX-p.x,dy=e.clientY-p.y;
      const dt=Math.max(.008,(e.timeStamp-p.lastTime)/1000);
      p.vx=p.vx*.6+(e.clientX-p.lastX)/dt*.4;p.vy=p.vy*.6+(e.clientY-p.lastY)/dt*.4;p.lastTime=e.timeStamp;
      const head=p.head&&(this.rig?.isHeadPoint?.(e.clientX,e.clientY)??((e.clientY-p.start.top)<p.start.height*.43));
      const headStroke=!p.dragging&&head&&Math.abs(dy)<18;
      if(headStroke) {
        p.distance+=Math.abs(e.clientX-p.lastX);p.lastX=e.clientX;
        if(p.distance>Math.max(14,p.start.width*.1)&&!p.pat){p.pat=true;clearTimeout(this.holdTimer);this.act('pat');}
      }
      if(p.pat){p.lastX=e.clientX;p.lastY=e.clientY;return;}
      if(!p.dragging&&!headStroke&&Math.hypot(dx,dy)>18){p.dragging=true;clearTimeout(this.holdTimer);this.act('lifted');}
      if(p.dragging){this.dataset.motion='held';this.rig?.setDragVelocity?.(p.vx,p.vy);this.setPosition(p.start.left+dx,p.start.top+dy);}
      p.lastX=e.clientX;p.lastY=e.clientY;
    }
    pointerUp(e) {
      const p=this.pointer;if(!p||p.id!==e.pointerId)return;
      clearTimeout(this.holdTimer);this.pointer=null;
      if(this.$('.figure').hasPointerCapture(e.pointerId))this.$('.figure').releasePointerCapture(e.pointerId);
      if(p.dragging){this.fallToGround(p.vy);return;}
      if(p.pat)return;
      const now=Date.now();
      if(now-(this.lastTap||0)<300){clearTimeout(this.tapTimer);this.lastTap=0;this.act('happy');}
      else {this.lastTap=now;this.tapTimer=this.later(()=>this.act('tap'),280);}
    }
    cancelFall(){if(this.fallFrame)cancelAnimationFrame(this.fallFrame);this.fallFrame=null;this.dataset.motion='grounded';this.rig?.setDragVelocity?.(0,0);}
    fallToGround(velocity=0){
      this.cancelFall();
      const stage=this.getAttribute('placement')==='stage';
      const parentRect=()=>stage?this.parentElement.getBoundingClientRect():{left:0,top:0,width:innerWidth,height:innerHeight};
      const rect=this.getBoundingClientRect(),parent=parentRect(),x=rect.left-parent.left;
      let y=rect.top-parent.top,v=Math.max(0,Math.min(700,velocity)),last=0;
      const floor=()=>Math.max(0,parentRect().height-rect.height-(stage?35:12));
      const place=()=>{const p=parentRect();this.setPosition(p.left+x,p.top+y);};
      const finish=()=>{y=floor();place();this.fallFrame=null;this.dataset.motion='grounded';this.act('land');this.savePosition();};
      if(this.reduceMotion.matches||y>=floor()-1){finish();return;}
      this.dataset.motion='falling';this.emit('fall');
      const tick=timestamp=>{
        const dt=last?Math.min(.035,(timestamp-last)/1000):0;last=timestamp;
        y+=v*dt+900*dt*dt;v+=1800*dt;
        if(y>=floor()){finish();return;}
        place();this.fallFrame=requestAnimationFrame(tick);
      };
      this.fallFrame=requestAnimationFrame(tick);
    }
    cancelPointer() { if(!this.pointer)return;const id=this.pointer.id;this.pointer=null;clearTimeout(this.holdTimer);if(this.$('.figure').hasPointerCapture(id))this.$('.figure').releasePointerCapture(id);if(this.state==='lifted')this.act('land'); }
    keydown(e) {
      if(this.referenceOnly)return;
      if(['Enter',' '].includes(e.key)){e.preventDefault();this.act(e.shiftKey?'music':'happy');}
      if(e.key==='Escape'){this.cancelPointer();this.$('.bubble').hidden=true;}
      const step=e.shiftKey?24:10;const move={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]}[e.key];
      if(move){e.preventDefault();const r=this.getBoundingClientRect();this.setPosition(r.left+move[0],r.top+move[1]);this.savePosition();}
    }
    setPosition(x,y) {
      const r=this.getBoundingClientRect();
      const stage=this.getAttribute('placement')==='stage';
      const parent=stage?this.parentElement.getBoundingClientRect():{left:0,top:0,width:innerWidth,height:innerHeight};
      this.style.transform='none';this.style.right='auto';this.style.bottom='auto';
      this.style.left=`${Math.max(0,Math.min(x-parent.left,parent.width-r.width))}px`;
      this.style.top=`${Math.max(0,Math.min(y-parent.top,parent.height-r.height))}px`;
    }
    clampPosition(){if(!this.isConnected||!this.style.top)return;const r=this.getBoundingClientRect();this.setPosition(r.left,r.top);}
    get storageKey(){return this.getAttribute('storage-key');}
    savePosition(){if(!this.storageKey||this.getAttribute('placement')==='stage')return;try{const r=this.getBoundingClientRect();localStorage.setItem(this.storageKey,JSON.stringify({x:r.left,y:r.top}));}catch{}}
    restorePosition(){if(!this.storageKey||this.getAttribute('placement')==='stage')return;try{const p=JSON.parse(localStorage.getItem(this.storageKey));if(p&&Number.isFinite(p.x)&&Number.isFinite(p.y))this.setPosition(p.x,p.y);}catch{}}
    reset(){this.cancelFall();this.cancelPointer();for(const key of ['left','right','top','bottom','transform'])this.style.removeProperty(key);if(this.storageKey)try{localStorage.removeItem(this.storageKey);}catch{}this.show();}
    hide(){this.cancelFall();this.cancelPointer();this.stopAnimation();for(const s of ['.figure','.shadow','.tools','.bubble'])this.$(s).hidden=true;this.$('.restore').hidden=false;this.clearIdle();this.emit('hide');}
    show(){for(const s of ['.figure','.shadow','.tools'])this.$(s).hidden=false;this.$('.restore').hidden=true;this.act('greet');}
    clearIdle(){clearTimeout(this.idleTimer);}
    armIdle(){this.clearIdle();if(this.referenceOnly||this.hasAttribute('calibration')||this.getAttribute('auto-idle')==='false'||document.hidden||this.$('.figure').hidden||this.state==='sleep')return;this.idleTimer=this.later(()=>{if(!this.pointer)this.act('sleep');},45000);}
    destroy(){this.remove();}
  }
  if(!customElements.get('fortuneweave-pet'))customElements.define('fortuneweave-pet',FortuneWeavePet);
  window.FortuneWeavePets={
    mount({target=document.body,character='leda',size=160,side='right',storageKey,...options}={}){
      const pet=document.createElement('fortuneweave-pet');pet.setAttribute('character',character);pet.setAttribute('size',size);pet.setAttribute('side',side);
      if(storageKey)pet.setAttribute('storage-key',storageKey);if(options.placement)pet.setAttribute('placement',options.placement);
      target.append(pet);return pet;
    }
  };
  if(script.dataset.character){const mount=()=>window.FortuneWeavePets.mount({character:script.dataset.character,size:script.dataset.size||160,storageKey:script.dataset.storageKey});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();}
})();

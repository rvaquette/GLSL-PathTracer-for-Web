import{a as ot}from"./chunks/chunk-Q4WHUCDY.js";import"./chunks/chunk-ANN5UYCF.js";var Dt=class{dispose(){}},Yi=class extends Dt{name;image;rgba=null;width=null;height=null;flipY=!1;constructor(e=null,t=null){super(),this.name=e,this.image=t}},bt=class extends Yi{constructor(e=null,t=null){super(e,t)}async loadTextureAsync(e){if(typeof window<"u")return new Promise((t,n)=>{let i=new Image;i.crossOrigin="anonymous",i.onload=()=>{this.name=e,this.image=i,this.width=i.width,this.height=i.height,t(!0)},i.onerror=()=>t(!1),i.src=e});try{let n=(await import("sharp")).default(e).ensureAlpha(),i=await n.metadata(),s=await n.raw().toBuffer();return this.name=e,this.image=null,this.width=i.width??null,this.height=i.height??null,this.rgba=new Uint8Array(s),!0}catch(t){return console.error("Failed to load texture in Node:",t),!1}}};var Xe=class o extends Dt{static _instance=null;copyAudio=!1;sampleRate=44100;playTime=180;textureDimensions=512;playSamples;audioContext;audioBuffer;buffer;internalFormat;format;gltype;constructor(){super(),this.playSamples=this.playTime*this.sampleRate,this.audioContext=new AudioContext;let e=()=>{this.audioContext.state==="suspended"&&this.audioContext.resume()};document.addEventListener("click",e,{once:!0}),document.addEventListener("keydown",e,{once:!0}),document.addEventListener("touchstart",e,{once:!0}),this.audioBuffer=this.audioContext.createBuffer(2,this.playSamples,this.sampleRate),this.buffer=new Uint8Array(this.textureDimensions*this.textureDimensions*4),this.internalFormat=L.gl.raw.RGBA8,this.format=L.gl.raw.RGBA,this.gltype=L.gl.raw.UNSIGNED_BYTE}static instance(){return o._instance||(o._instance=new o),o._instance}};async function Zr(o){return(await he(o)).ok}async function he(o){if(/^https?:\/\//i.test(o)||typeof window<"u"){let s=await fetch(o);return{ok:s.ok,statusText:s.statusText,arrayBuffer:()=>s.arrayBuffer(),text:()=>s.text(),json:()=>s.json(),blob:()=>s.blob()}}let e=await import("fs"),t=await import("path"),n=t.join,i=t.isAbsolute;try{let s=i(o)?`.${o}`:n(process.cwd(),o);return{ok:e.existsSync(s),statusText:e.existsSync(s)?"OK":"Not Found",arrayBuffer:async()=>e.readFileSync(s).buffer,text:async()=>e.readFileSync(s,{encoding:"utf8"}),json:async()=>JSON.parse(e.readFileSync(s,{encoding:"utf8"})),blob:async()=>new Blob([e.readFileSync(s)])}}catch(s){return console.error("Failed to read local file:",o,s),{ok:!1,statusText:s.message,arrayBuffer:async()=>new ArrayBuffer(0),text:async()=>"",json:async()=>null,blob:async()=>null}}}function iu(o,e){return console.log(`Saving ${o}`),new Promise(async t=>{if(typeof window<"u"){let n=new Blob([e],{type:"application/octet-stream"}),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=o,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i),t(!0)}else{let n=await import("fs/promises");try{if(e instanceof ArrayBuffer||e instanceof SharedArrayBuffer){let i=Buffer.from(e);await n.writeFile(o,i)}else{let i=await import("path/win32");await n.writeFile(o,e,"utf8")}t(!0)}catch(i){console.error("Failed to save file:",o,i),t(!1)}}})}var Ce=class o{channel;type;filepath;sampler;id;soundTexture;audioTexture;imageTexture;imageTextures;arrayBuffer;xres;yres;internalFormat=L.gl?.raw.RGBA8;format=L.gl?.raw.RGBA;gltype=L.gl?.raw.UNSIGNED_BYTE;texture;buffer;static pauseOrContinue(e,t){let n=e.audioTexture;n&&(t?n.audio.pause():n.audio.play())}static createTexture(e){return e.imageTextures?o.createTextureFromCubemap(e):e.type==="texture"||e.type==="video"||e.type==="floats"?o.createTextureFromImage(e):e.audioTexture?o.createTextureFromAudio(e):e.type==="volume"?o.createTextureFromVolume(e):e.type==="keyboard"?o.createTextureFromKeyboard(e):null}static bindTexture(e,t){let n=L.gl;if(n.activeTexture(n.raw.TEXTURE0+e.channel),e.type==="video")o.updateTextureFromVideo(e);else if(e.type==="music")o.updateTextureFromAudio(e);else if(e.type==="keyboard")n.bindTexture(n.raw.TEXTURE_2D,e.texture);else if(e.texture)e.type==="texture"||e.type==="floats"?n.bindTexture(n.raw.TEXTURE_2D,e.texture):e.type==="cubemap"?n.bindTexture(n.raw.TEXTURE_CUBE_MAP,e.texture):e.type==="volume"&&n.bindTexture(n.raw.TEXTURE_3D,e.texture);else if(e.buffer){if(e.type==="cubeA")n.bindTexture(n.raw.TEXTURE_CUBE_MAP,e.buffer.textures[1-e.buffer.frontIndex]),e.sampler&&(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_WRAP_S,n.raw.CLAMP_TO_EDGE),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_WRAP_T,n.raw.CLAMP_TO_EDGE),e.sampler.filter==="linear"?(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR)):e.sampler.filter==="mipmap"&&(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.raw.TEXTURE_CUBE_MAP)));else if(n.bindTexture(n.raw.TEXTURE_2D,e.buffer.textures[t?1-e.buffer.frontIndex:e.buffer.frontIndex]),e.sampler){var i=n.raw.REPEAT;e.sampler.wrap==="clamp"&&(i=n.raw.CLAMP_TO_EDGE),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_S,i),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_T,i),e.sampler.filter==="linear"?(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR)):e.sampler.filter==="mipmap"&&(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.raw.TEXTURE_2D))}}}static unbindTexture(e){let t=L.gl;t.activeTexture(t.raw.TEXTURE0+e.channel),t.bindTexture(t.raw.TEXTURE_2D,null),t.bindTexture(t.raw.TEXTURE_3D,null),t.bindTexture(t.raw.TEXTURE_CUBE_MAP,null)}static createTextureFromImage(e){let t=L.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_2D,n);let i=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.pixelStorei(t.raw.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.raw.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.raw.NONE),e.arrayBuffer?t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer):t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.format,e.gltype,e.imageTexture.image);var s=t.raw.REPEAT;return e.sampler&&e.sampler.wrap==="clamp"&&(s=t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,s),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,s),!e.sampler||e.sampler.filter==="none"?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)):e.sampler&&(e.sampler.filter==="linear"||e.type==="video")?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)):e.sampler&&e.sampler.filter==="mipmap"?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_2D)):e.sampler&&e.sampler.filter==="nearest"&&(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_2D)),t.bindTexture(t.raw.TEXTURE_2D,null),t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,!1),n}static updateTextureFromVideo(e){let t=L.gl;if(!e.imageTexture.copyVideo){t.bindTexture(t.raw.TEXTURE_2D,null);return}t.bindTexture(t.raw.TEXTURE_2D,e.texture);let n=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,n),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.format,e.gltype,e.imageTexture.image)}static createTextureFromCubemap(e){let t=L.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_CUBE_MAP,n);let i=e.sampler&&e.sampler.vflip=="true";return t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_X,0,e.internalFormat,e.format,e.gltype,e.imageTextures[0].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_X,0,e.internalFormat,e.format,e.gltype,e.imageTextures[1].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_Y,0,e.internalFormat,e.format,e.gltype,i?e.imageTextures[3].image:e.imageTextures[2].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,e.internalFormat,e.format,e.gltype,i?e.imageTextures[2].image:e.imageTextures[3].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_Z,0,e.internalFormat,e.format,e.gltype,e.imageTextures[4].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,e.internalFormat,e.format,e.gltype,e.imageTextures[5].image),!e.sampler||e.sampler.filter==="none"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)):e.sampler&&e.sampler.filter==="linear"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)):e.sampler&&e.sampler.filter==="mipmap"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_CUBE_MAP)):e.sampler&&e.sampler.filter==="nearest"&&(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_CUBE_MAP)),t.bindTexture(t.raw.TEXTURE_CUBE_MAP,null),t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,!1),n}static createTextureFromVolume(e){let t=L.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_3D,n),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_BASE_LEVEL,0),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAX_LEVEL,Math.log2(e.xres)),(!e.sampler||e.sampler.filter==="none")&&(t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)),e.sampler&&(e.sampler.filter==="linear"||e.sampler.filter==="mipmap")&&(t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)),t.texImage3D(t.raw.TEXTURE_3D,0,e.internalFormat,e.xres,e.yres,e.yres,0,e.format,e.gltype,e.arrayBuffer);var i=t.raw.REPEAT;return e.sampler&&e.sampler.wrap==="clamp"&&(i=t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_R,i),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_S,i),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_T,i),t.bindTexture(t.raw.TEXTURE_3D,null),n}static createTextureFromKeyboard(e){let t=L.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,t.raw.CLAMP_TO_EDGE),t.bindTexture(t.raw.TEXTURE_2D,null),n}static updateTextureFromKeyboard(e){let t=L.gl;t.bindTexture(t.raw.TEXTURE_2D,e.texture),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer)}static createTextureFromAudio(e){let t=L.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,null),t.bindTexture(t.raw.TEXTURE_2D,null),n}static updateTextureFromAudio(e){let t=L.gl,n=e.audioTexture;if(!n.copyAudio){t.bindTexture(t.raw.TEXTURE_2D,null);return}n.update(),t.bindTexture(t.raw.TEXTURE_2D,e.texture);let i=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.texSubImage2D(t.raw.TEXTURE_2D,0,0,0,e.xres,1,e.format,e.gltype,n.freqData),t.texSubImage2D(t.raw.TEXTURE_2D,0,0,1,e.xres,1,e.format,e.gltype,n.waveData)}},Pn=class o{inputs;type;code=null;shader=null;fbos=null;textures=null;flip=!1;frontIndex=0;xres;yres;soundCompiled=!1;playNode=null;time=0;static createFBOAndTexture(e,t,n,i,s){e.fbos=[],e.textures=[],e.frontIndex=0,e.type==="cubeA"?(o.createFBOTextureCubeA(e),o.createFBOTextureCubeA(e)):e.type==="sound"?o.createFBOTextureSound(e):o.createFBOTexture(e,t,n,i,s)}static createFBOTexture(e,t,n,i,s){let r=L.gl,l=r.createFramebuffer();r.bindFramebuffer(r.raw.FRAMEBUFFER,l);let a=o.createTexture(i);if((!t||!n)&&(r.framebufferTexture2D(r.raw.FRAMEBUFFER,r.raw.COLOR_ATTACHMENT0,r.raw.TEXTURE_2D,a,0),r.bindTexture(r.raw.TEXTURE_2D,null),r.bindFramebuffer(r.raw.FRAMEBUFFER,null)),e.fbos.push(l),e.textures.push(a),t){if(!n){let u=r.createFramebuffer();r.bindFramebuffer(r.raw.FRAMEBUFFER,u),e.fbos.push(u)}let c=o.createTexture(s);r.framebufferTexture2D(r.raw.FRAMEBUFFER,r.raw.COLOR_ATTACHMENT0,r.raw.TEXTURE_2D,c,0),r.bindTexture(r.raw.TEXTURE_2D,null),r.bindFramebuffer(r.raw.FRAMEBUFFER,null),e.textures.push(c)}}static createFBOTextureCubeA(e){let t=L.gl,n=o.createTextureFromCubeA(e.xres,e.yres),i=t.createFramebuffer();t.bindFramebuffer(t.raw.FRAMEBUFFER,i),t.framebufferTexture2D(t.raw.FRAMEBUFFER,t.raw.COLOR_ATTACHMENT0,t.raw.TEXTURE_CUBE_MAP_POSITIVE_X,n,0),t.bindFramebuffer(t.raw.FRAMEBUFFER,null),e.fbos.push(i),e.textures.push(n)}static createTextureFromCubeA(e,t,n="linear",i=L.gl.raw.RGBA16F,s=L.gl.raw.RGBA,r=L.gl.raw.FLOAT){let l=L.gl,a=l.createTexture();return l.bindTexture(l.raw.TEXTURE_CUBE_MAP,a),l.texImage2D(l.raw.TEXTURE_CUBE_MAP_POSITIVE_X,0,i,e,t,0,s,r,null),l.texImage2D(l.raw.TEXTURE_CUBE_MAP_NEGATIVE_X,0,i,e,t,0,s,r,null),l.texImage2D(l.raw.TEXTURE_CUBE_MAP_POSITIVE_Y,0,i,e,t,0,s,r,null),l.texImage2D(l.raw.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,i,e,t,0,s,r,null),l.texImage2D(l.raw.TEXTURE_CUBE_MAP_POSITIVE_Z,0,i,e,t,0,s,r,null),l.texImage2D(l.raw.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,i,e,t,0,s,r,null),n==="linear"&&(l.texParameteri(l.raw.TEXTURE_CUBE_MAP,l.raw.TEXTURE_MAG_FILTER,l.raw.LINEAR),l.texParameteri(l.raw.TEXTURE_CUBE_MAP,l.raw.TEXTURE_MIN_FILTER,l.raw.LINEAR)),n==="mipmap"&&(l.texParameteri(l.raw.TEXTURE_CUBE_MAP,l.raw.TEXTURE_MAG_FILTER,l.raw.LINEAR),l.texParameteri(l.raw.TEXTURE_CUBE_MAP,l.raw.TEXTURE_MIN_FILTER,l.raw.LINEAR_MIPMAP_LINEAR),l.generateMipmap(l.raw.TEXTURE_CUBE_MAP)),n==="nearest"&&(l.texParameteri(l.raw.TEXTURE_CUBE_MAP,l.raw.TEXTURE_MAG_FILTER,l.raw.LINEAR),l.texParameteri(l.raw.TEXTURE_CUBE_MAP,l.raw.TEXTURE_MIN_FILTER,l.raw.NEAREST_MIPMAP_LINEAR)),l.bindTexture(l.raw.TEXTURE_CUBE_MAP,null),a}static createTexture(e){let t=L.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texImage2D(t.raw.TEXTURE_2D,0,t.raw.RGBA32F,e.x,e.y,0,t.raw.RGBA,t.raw.FLOAT,null),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,t.raw.CLAMP_TO_EDGE),t.bindTexture(t.raw.TEXTURE_2D,null),n}static createFBOTextureSound(e){let t=L.gl,n=t.createFramebuffer();t.bindFramebuffer(t.raw.FRAMEBUFFER,n);let i=o.createTextureFromSound();t.framebufferTexture2D(t.raw.FRAMEBUFFER,t.raw.COLOR_ATTACHMENT0,t.raw.TEXTURE_2D,i,0),t.bindFramebuffer(t.raw.FRAMEBUFFER,null),e.fbos.push(n),e.textures.push(i)}static createTextureFromSound(){let e=L.gl,t=Xe.instance(),n=e.createTexture();return e.bindTexture(e.raw.TEXTURE_2D,n),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texImage2D(e.raw.TEXTURE_2D,0,t.internalFormat,t.textureDimensions,t.textureDimensions,0,t.format,t.gltype,null),e.bindTexture(e.raw.TEXTURE_2D,null),n}static drawBuffer(e,t){e.type=="sound"&&!e.soundCompiled&&(o.drawTextureFromSound(e,t),e.soundCompiled=!0,this.pauseOrContinue(e,!1))}static pauseOrContinue(e,t){e.playNode&&(e.time=Date.now(),e.playNode.disconnect(),e.playNode.stop(),e.playNode=null),t||(e.playNode=Xe.instance().audioContext.createBufferSource(),e.playNode.buffer=Xe.instance().audioBuffer,e.playNode.connect(Xe.instance().audioContext.destination),e.time>0?e.playNode.start(Date.now()-e.time):e.playNode.start(0))}static drawTextureFromSound(e,t){let n=L.gl,i=n.getAttribLocation(t,"pos"),s=n.getUniformLocation(t,"iTimeOffset"),r=n.getUniformLocation(t,"iSampleOffset"),l=Xe.instance(),a=l.buffer,c=l.textureDimensions*l.textureDimensions,u=l.audioBuffer.getChannelData(0),h=l.audioBuffer.getChannelData(1),d=l.playSamples/c;for(let f=0;f<d;f++){let p=f*c;n.uniform1f(s,p/l.sampleRate),n.uniform1i(r,p),n.drawUnitQuad_XY(i),n.readPixels(0,0,l.textureDimensions,l.textureDimensions,n.raw.RGBA,n.raw.UNSIGNED_BYTE,a,0);for(let g=0;g<c;g++)u[p+g]=-1+2*(a[4*g+0]+256*a[4*g+1])/65535,h[p+g]=-1+2*(a[4*g+2]+256*a[4*g+3])/65535}return!0}},ti=class{constructor(e=null){e&&(this.id=e.id,this.common=e.common,this.bufferA=e.bufferA,this.bufferB=e.bufferB,this.bufferC=e.bufferC,this.bufferD=e.bufferD,this.cubeA=e.cubeA,this.sound=e.sound,this.image=e.image)}fromShadertoyJson(e){this.id=e.info?.id,this.isGlslPathtracer=e.flags?.mFlagGlslPathTracer||!1;for(let t of e.renderpass){if(t.type=="common"){this.common=!0,this.commonCode=t.code;continue}let n=new Pn;n.type=t.type,n.code=t.code,n.inputs=[];for(let i of t.inputs){let s=new Ce;if(s.channel=i.channel,s.type=i.type,s.id=i.id||null,i.type!=="buffer")s.filepath=i.filepath;else switch(i.filepath){case"/media/previz/buffer00.png":s.type="bufferA";break;case"/media/previz/buffer01.png":s.type="bufferB";break;case"/media/previz/buffer02.png":s.type="bufferC";break;case"/media/previz/buffer03.png":s.type="bufferD";break}s.sampler=i.sampler,n.inputs.push(s)}switch(t.name){case"Buffer A":this.bufferA=n,n.type="bufferA";break;case"Buffer B":this.bufferB=n,n.type="bufferB";break;case"Buffer C":this.bufferC=n,n.type="bufferC";break;case"Buffer D":this.bufferD=n,n.type="bufferD";break;case"Cube A":this.cubeA=n,n.type="cubeA";break;case"Sound":this.sound=n,n.type="sound";break;case"Image":this.image=n,n.type="image";break}}}id;isGlslPathtracer=!1;common=!1;bufferA;bufferB;bufferC;bufferD;cubeA;sound;image;commonCode="";buffers;imageTexture=null;tileOutputTextures=null;accumFramebuffers=null;pathTraceTextures=null;getAllShaders(){let e={};return this.common&&(e.common=this.commonCode),this.bufferA&&(e.bufferA=this.bufferA.code),this.bufferB&&(e.bufferB=this.bufferB.code),this.bufferC&&(e.bufferC=this.bufferC.code),this.bufferD&&(e.bufferD=this.bufferD.code),this.cubeA&&(e.cubeA=this.cubeA.code),this.sound&&(e.sound=this.sound.code),this.image&&(e.image=this.image.code),e}getAllInputs(e){let t=[],n=null;switch(e){case"common":break;case"bufferA":n=this.bufferA;break;case"bufferB":n=this.bufferB;break;case"bufferC":n=this.bufferC;break;case"bufferD":n=this.bufferD;break;case"cubeA":n=this.cubeA;break;case"sound":n=this.sound;break;case"image":n=this.image;break}return n&&(t=n.inputs.map(i=>({type:i.type,filepath:i.filepath,sampler:i.sampler}))),t}},qi=class{mDataView;mOffset;constructor(e){this.mDataView=e,this.mOffset=0}Seek(e){this.mOffset=e}ReadUInt8(){var e=new Uint8Array(this.mDataView,this.mOffset)[0];return this.mOffset+=1,e}ReadUInt16(){var e=new Uint16Array(this.mDataView,this.mOffset)[0];return this.mOffset+=2,e}ReadUInt32(){var e=new Uint32Array(this.mDataView,this.mOffset)[0];return this.mOffset+=4,e}ReadUInt64(){return this.ReadUInt32()+(this.ReadUInt32()<<32)}ReadFloat32(){var e=new Float32Array(this.mDataView,this.mOffset)[0];return this.mOffset+=4,e}ReadFloat32Array(e){for(var t=new Float32Array(this.mDataView,this.mOffset),n=[],i=0;i<e;i++)n[i]=t[i];return this.mOffset+=4*e,n}ReadFloat32ArrayNative(e){var t=new Float32Array(this.mDataView,this.mOffset);return this.mOffset+=4*e,t}WriteUInt8(e){new Uint8Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=1}WriteUInt16(e){new Uint16Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=2}WriteUInt32(e){new Uint32Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=4}WriteUInt64(e){this.WriteUInt32(e&4294967295),this.WriteUInt32(e>>32)}WriteFloat32(e){new Float32Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=4}WriteFloat32Array(e){for(var t=0;t<e.length;t++)this.WriteFloat32(e[t])}Save(e){return iu(e,this.mDataView)}};var Ft=class o extends Dt{static _instance=null;buffer;xRes;yRes;internalFormat;format;gltype;input=null;constructor(){super(),this.buffer=new Uint8Array(256*3);for(let e=0;e<256*3;e++)this.buffer[e]=0;this.xRes=256,this.yRes=3,this.internalFormat=L.gl.raw.R8,this.format=L.gl.raw.RED,this.gltype=L.gl.raw.UNSIGNED_BYTE}keydown(e){let t=e.keyCode;this.buffer[t+0*256]!=255&&(this.buffer[t+0*256]=255,this.buffer[t+1*256]=255,this.buffer[t+2*256]=255-this.buffer[t+2*256],this.input&&Ce.updateTextureFromKeyboard(this.input))}keyup(e){let t=e.keyCode;this.buffer[t+0*256]=0,this.buffer[t+1*256]=0,this.input&&Ce.updateTextureFromKeyboard(this.input)}eraseKeypresses(){for(let e=0;e<256;e++)this.buffer[e+1*256]=0;this.input&&Ce.updateTextureFromKeyboard(this.input)}static instance(){return o._instance||(o._instance=new o),o._instance}};var Z=class o{x;y;constructor(e=0,t=0){this.x=e,this.y=t}clone(){return new o(this.x,this.y)}static add(e,t){return e.add(t)}add(e){return new o(this.x+e.x,this.y+e.y)}static subtract(e,t){return e.subtract(t)}subtract(e){return new o(this.x-e.x,this.y-e.y)}scale(e){return new o(this.x*e,this.y*e*e)}};var se=class o{static _isMouseDown=!1;static _isMouseOver=!1;static _isMouseWheel=!1;static _escapePressed=!1;static _paused=!1;static buttons=0;static downPosition=new Z(0,0);static movePosition=new Z(0,0);static deltaPosition=new Z(0,0);static pauseOrContinue(e){o._paused=e}static isMouseDown(e){return o._paused?!1:e===2?o._isMouseDown&&(o.buttons&4)!==0:o._isMouseDown&&(o.buttons&e+1)!==0}static keydown(e){o._paused||(e.key==="Escape"&&Nn.instance.pauseOrContinue(),Ft.instance().keydown(e))}static keyup(e){o._paused||Ft.instance().keyup(e)}static mouseEnter(){o._paused||(o._isMouseOver=!0)}static mouseLeave(){o._paused||(o._isMouseOver=!1)}static mouseDown(e){o._paused||(o._isMouseDown=!0,o.buttons=e.buttons,o.downPosition=new Z(e.offsetX,L.canvas.height-e.offsetY))}static touchStart(e){o._paused||(e.preventDefault(),o._isMouseDown=!0,o.buttons=1,o.downPosition=o.getTouchCanvasPosition(e.changedTouches[0]),o.movePosition=o.downPosition)}static mouseMove(e){o._paused||o._isMouseDown&&(o.movePosition=new Z(e.offsetX,L.canvas.height-e.offsetY))}static touchMove(e){o._paused||(e.preventDefault(),o._isMouseDown&&(o.movePosition=o.getTouchCanvasPosition(e.changedTouches[0])))}static mouseUp(){o._paused||(o._isMouseDown=!1,o.downPosition=new Z(0,0))}static touchCancel(e){o._paused||(e.preventDefault(),o._isMouseDown=!1,o.downPosition=new Z(0,0))}static mouseWheel(e){o._paused||(o._isMouseWheel=!0,o.deltaPosition=new Z(e.deltaX,e.deltaY))}static isAnyMouseDown(){return o._paused?!1:o._isMouseDown}static getMouseDragDelta(e){return o.isMouseDown(e)?new Z(o.movePosition.x-o.downPosition.x,o.movePosition.y-o.downPosition.y):new Z(0,0)}static resetMouseDragDelta(e){o.isMouseDown(e)&&(o.downPosition=o.movePosition)}static getTouchCanvasPosition(e){let t=L.canvas;if(!t)return new Z(0,0);let n=t.getBoundingClientRect(),i=(e.clientX-n.left)*(t.width/n.width),s=(e.clientY-n.top)*(t.height/n.height);return new Z(i,t.height-s)}};var L=class o{static _instance=null;document;canvas;gl;constructor(e,t){this.document=e,this.canvas=t,this.canvas.tabIndex=0;var n={alpha:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"};let i=t.getContext("webgl2",n);if(!i)throw new Error("WebGL2 not supported");this.gl=new ot(i),this.gl.getExtension("OES_texture_float_linear"),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("OES_texture_half_float_linear"),ot.profiling&&this.gl.getExtension("WEBGL_debug_shaders"),this.gl.raw.hint(this.gl.raw.FRAGMENT_SHADER_DERIVATIVE_HINT,this.gl.raw.NICEST);let s=i.getSupportedExtensions();console.log(`Available WebGL extensions:
`,s.join(`
`)),window.addEventListener("resize",async r=>{}),this.canvas.addEventListener("keydown",async r=>{se.keydown(r),r.preventDefault()},!1),this.canvas.addEventListener("keyup",async r=>{se.keyup(r),r.preventDefault()},!1),this.canvas.onmousedown=function(r){se.mouseDown(r)},this.canvas.onmouseenter=function(r){se.mouseEnter()},this.canvas.onmouseleave=function(r){se.mouseLeave()},this.canvas.onmousemove=function(r){se.mouseMove(r)},this.canvas.onmouseup=function(r){se.mouseUp()},this.canvas.onwheel=function(r){se.mouseWheel(r)},this.canvas.ontouchstart=function(r){se.touchStart(r)},this.canvas.ontouchmove=function(r){se.touchMove(r)},this.canvas.ontouchcancel=function(r){se.touchCancel(r)}}static get document(){return o._instance==null?null:o._instance.document}static get canvas(){return o._instance==null?null:o._instance.canvas}static get gl(){return o._instance==null?null:o._instance.gl}static setInstance(e,t){o._instance=new o(e,t)}};var _=class o{x;y;z;constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}toArray(){return[this.x,this.y,this.z]}clone(){return new o(this.x,this.y,this.z)}static fromVec4(e){return new o(e.x,e.y,e.z)}multiply(e){return new o(this.x*e.x,this.y*e.y,this.z*e.z)}static add(e,t){return e.add(t)}add(e){return new o(this.x+e.x,this.y+e.y,this.z+e.z)}static subtract(e,t){return e.subtract(t)}subtract(e){return new o(this.x-e.x,this.y-e.y,this.z-e.z)}static scale(e,t){return e.scale(t)}scale(e){return new o(this.x*e,this.y*e,this.z*e)}get(e){return e===0?this.x:e===1?this.y:this.z}set(e,t){e===0?this.x=t:e===1?this.y=t:this.z=t}static log(e){return new o(Math.log(e.x),Math.log(e.y),Math.log(e.z))}static negate(e){return new o(-e.x,-e.y,-e.z)}static min(e,t){return new o(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z))}static max(e,t){return new o(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))}static cross(e,t){return new o(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x)}static pow(e,t){return new o(Math.pow(e.x,t),Math.pow(e.y,t),Math.pow(e.z,t))}static Length(e){return Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)}static dot(e,t){return e.x*t.x+e.y*t.y+e.z*t.z}static distance(e,t){return o.Length(e.subtract(t))}static clamp(e,t,n){return new o(Math.max(t.x,Math.min(e.x,n.x)),Math.max(t.y,Math.min(e.y,n.y)),Math.max(t.z,Math.min(e.z,n.z)))}static normalize(e){let t=o.Length(e);return new o(e.x/t,e.y/t,e.z/t)}};var ni=class{renderResolution;screenZoom;originalRenderResolution;uniformLightCol;backgroundCol;tileWidth;tileHeight;maxDepth;maxSpp;RRDepth;texArrayWidth;texArrayHeight;enableRR;enableDenoiser;denoiserFrameCnt;enableTonemap;enableAces;simpleAcesFit;openglNormalMap;enableEnvMap;enableUniformLight;hideEmitters;enableBackground;transparentBackground;independentRenderSize;enableRoughnessMollification;enableVolumeMIS;envMapIntensity;envMapRot;roughnessMollificationAmt;pixelRatio;sssMode;flipTexturesY=!1;useRayMarching=!1;useThinFilmLUT=!0;constructor(){this.renderResolution=new Z(1280,720),this.originalRenderResolution=new Z(1280,720),this.screenZoom=1,this.uniformLightCol=new _(.3,.3,.3),this.backgroundCol=new _(1,1,1),this.tileWidth=100,this.tileHeight=100,this.maxDepth=2,this.maxSpp=-1,this.RRDepth=2,this.texArrayWidth=2048,this.texArrayHeight=2048,this.enableRR=!0,this.enableDenoiser=!1,this.denoiserFrameCnt=10,this.enableTonemap=!0,this.enableAces=!1,this.simpleAcesFit=!1,this.openglNormalMap=!0,this.enableEnvMap=!1,this.enableUniformLight=!1,this.hideEmitters=!1,this.enableBackground=!1,this.transparentBackground=!1,this.independentRenderSize=!1,this.enableRoughnessMollification=!1,this.enableVolumeMIS=!1,this.envMapIntensity=1,this.envMapRot=0,this.roughnessMollificationAmt=0,this.pixelRatio=.25,this.sssMode=0}};var Jr=class{constructor(e){this.shaders=e;if(this.gl=L.gl,this.program=this.gl.createProgram(),!this.program)throw new Error("Unable to create WebGL program.");for(let t of e)this.gl.attachShader(this.program,t.getObject());this.gl.linkProgram(this.program)}shaders;gl;program;linked=!1;async waitForLinkAsync(){if(this.linked)return;let e=this.gl.getExtension("KHR_parallel_shader_compile");if(e)for(;!this.gl.getProgramParameter(this.program,e.COMPLETION_STATUS_KHR);)await new Promise(n=>setTimeout(n,0));for(let t of this.shaders)this.gl.detachShader(this.program,t.getObject());if(!this.gl.getProgramParameter(this.program,this.gl.raw.LINK_STATUS)){let t=this.gl.getProgramInfoLog(this.program);throw this.gl.deleteProgram(this.program),new Error(`Error linking program: ${t}`)}this.linked=!0}use(){if(!this.linked)throw new Error("Program not linked yet");this.gl.useProgram(this.program)}stopUsing(){this.gl.useProgram(null)}getObject(){return this.program}dispose(){this.gl.deleteProgram(this.program)}};var Qr=class{gl;vao=null;vbo=null;constructor(){this.gl=L.gl,this.vao=this.gl.createVertexArray(),this.vbo=this.gl.createBuffer(),this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.raw.ARRAY_BUFFER,this.vbo);let e=new Float32Array([-1,1,0,1,-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,-1,1,0,1,1,1,1]);this.gl.bufferData(this.gl.raw.ARRAY_BUFFER,e,this.gl.raw.STATIC_DRAW),this.gl.enableVertexAttribArray(0),this.gl.vertexAttribPointer(0,2,this.gl.raw.FLOAT,!1,4*Float32Array.BYTES_PER_ELEMENT,0),this.gl.enableVertexAttribArray(1),this.gl.vertexAttribPointer(1,2,this.gl.raw.FLOAT,!1,4*Float32Array.BYTES_PER_ELEMENT,2*Float32Array.BYTES_PER_ELEMENT),this.gl.bindVertexArray(null)}draw(e){e.use(),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.raw.TRIANGLES,0,6),this.gl.bindVertexArray(null),e.stopUsing()}};var ji=class{shader;constructor(e,t){let n=L.gl;if(this.shader=n.createShader(t),console.log(`Compiling Shader ${e.path}`),n.shaderSource(this.shader,e.src),n.compileShader(this.shader),!n.getShaderParameter(this.shader,n.raw.COMPILE_STATUS)){let s=n.getShaderInfoLog(this.shader)||"Unknown error";n.deleteShader(this.shader),this.shader=null;let r=`Shader compilation error in ${e.path}
${e.src}
${s}`;throw alert(e.path+" : "+s),console.error(r),new Error(r)}}getObject(){if(!this.shader)throw new Error("Shader object is null.");return this.shader}};var Se=class o{static async loadAsync(e,t=!1,n="#include"){n+=" ";let i;try{if(i=await he(e),!i.ok)throw new Error}catch{return console.error(`ERROR: could not open the shader at: ${e}`),{src:"",path:e,dump:t}}let s=await i.text();return await o.loadShaderSourceAsync(s,e,t,n)}static async loadShaderSourceAsync(e,t,n=!1,i="#include"){let s=e.split(/\r?\n/),r="";for(let l of s){if(l.includes(i)){let a=l.replace(i,"").trim().replace(/["<>]/g,""),c=o.resolveRelativePath(t,a),u=await o.loadAsync(c,n,i.trim());r+=u.src;continue}r+=l+`
`}return{src:r,path:t,dump:n}}static resolveRelativePath(e,t){return t.startsWith("http://")||t.startsWith("https://")?new URL(t,e).toString():t.startsWith("/")?t:e.substring(0,e.lastIndexOf("/")+1)+t}};var an=class o{static maxBufferTextureWidth=4096;gl;_scene;shadersDirectory;programs=[];quad;pixelRatio;_sampleCounter=1;get sampleCounter(){return this._sampleCounter}set sampleCounter(e){this._sampleCounter=e}currentBuffer=0;frameCounter=1;_renderSize=new Z(0,0);tileWidth=0;tileHeight=0;invNumTiles=new Z(0,0);numTiles=new Z(0,0);tile=new Z(0,0);outputFBO=null;denoiserFBO=null;outputShader=null;denoised=!1;stopRequested=!1;constructor(e){this._scene=e}emitSceneStage(e,t){typeof window>"u"||window.dispatchEvent(new CustomEvent("scene-stage",{detail:{stage:e,message:t}}))}get scene(){return this._scene}get renderSize(){return this._renderSize}consumeStopRequested(){let e=this.stopRequested;return this.stopRequested=!1,e}async initAsync(){this.gl=L.gl,this.shadersDirectory="./shaders/",this.stopRequested=!1,this.quad=new Qr,this.pixelRatio=this.scene.renderOptions.pixelRatio,this.emitSceneStage("processing","Traitement de la scene"),this.scene.initialized||await this.scene.processSceneAsync(),this.initFBOs(),await this.initShadersAsync()}createTexture(e,t,n,i,s,r){let l=this.gl,a=l.createTexture();return l.bindTexture(l.raw.TEXTURE_2D,a),l.texImage2D(l.raw.TEXTURE_2D,0,e,t,n,0,i,s,r),l.texParameteri(l.raw.TEXTURE_2D,l.raw.TEXTURE_WRAP_S,l.raw.CLAMP_TO_EDGE),l.texParameteri(l.raw.TEXTURE_2D,l.raw.TEXTURE_WRAP_T,l.raw.CLAMP_TO_EDGE),l.texParameteri(l.raw.TEXTURE_2D,l.raw.TEXTURE_MAG_FILTER,l.raw.NEAREST),l.texParameteri(l.raw.TEXTURE_2D,l.raw.TEXTURE_MIN_FILTER,l.raw.NEAREST),l.bindTexture(l.raw.TEXTURE_2D,null),a}createBufferTexture(e,t){let n=this.gl,i=e.length/t,s=Math.min(o.maxBufferTextureWidth,i),r=Math.ceil(i/s);if(s*r*t!==e.length){let l=new Float32Array(s*r*t);l.set(e),e=l}return this.createTexture(t==4?n.raw.RGBA32F:n.raw.RGB32F,s,r,t==4?n.raw.RGBA:n.raw.RGB,n.raw.FLOAT,e)}createBufferTextureInt(e,t){let n=this.gl,i=e.length/t,s=Math.min(o.maxBufferTextureWidth,i),r=Math.ceil(i/s);if(s*r*t!==e.length){let l=new Int32Array(s*r*t);l.set(e),e=l}return this.createTexture(t==4?n.raw.RGBA32I:n.raw.RGB32I,s,r,t==4?n.raw.RGBA_INTEGER:n.raw.RGB_INTEGER,n.raw.INT,e)}createBufferTextureUint(e,t){let n=this.gl,i=e.length/t,s=this.scene.renderOptions.texArrayWidth,r=Math.ceil(i/s);return this.createTexture(t==4?n.raw.RGBA8UI:n.raw.RGB8UI,s,r,t==4?n.raw.RGBA_INTEGER:n.raw.RGB_INTEGER,n.raw.UNSIGNED_BYTE,e)}dispose(){let e=this.gl;this.outputFBO&&(e.deleteFramebuffer(this.outputFBO),this.outputFBO=null),this.denoiserFBO&&(e.deleteFramebuffer(this.denoiserFBO),this.denoiserFBO=null),this.outputShader&&(this.outputShader.dispose(),this.outputShader=null),this.programs.forEach(t=>t.dispose()),this.programs=[]}async resizeRendererAsync(){let e=this.gl;this.dispose(),this.initFBOs(),await this.initShadersAsync()}pauseOrContinue(e){}initFBOs(){}initFBOs_(e){let t=this.gl;this.sampleCounter=1,this.currentBuffer=0,this.frameCounter=1,this._renderSize=this.scene.renderOptions.renderResolution,e&&(this.tileWidth=this.scene.renderOptions.tileWidth,this.tileHeight=this.scene.renderOptions.tileHeight,this.invNumTiles.x=this.tileWidth/this.renderSize.x,this.invNumTiles.y=this.tileHeight/this.renderSize.y,this.numTiles.x=Math.ceil(this.renderSize.x/this.tileWidth),this.numTiles.y=Math.ceil(this.renderSize.y/this.tileHeight),this.tile.x=-1,this.tile.y=this.numTiles.y-1),console.log("Render Resolution :",this.renderSize.x,this.renderSize.y),console.log("Preview Resolution :",Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),e&&console.log("Tile Size :",this.tileWidth,this.tileHeight)}disposeShaders(){this.outputShader&&(this.outputShader.dispose(),this.outputShader=null),this.programs.forEach(e=>e.dispose()),this.programs=[]}async reloadShadersAsync(){this.disposeShaders(),await this.initShadersAsync()}loadShaders(e,t){let n=this.gl,i=[];i.push(new ji(e,n.raw.VERTEX_SHADER)),i.push(new ji(t,n.raw.FRAGMENT_SHADER));let s=new Jr(i);return this.programs.push(s),s}async initShadersAsync(){this.emitSceneStage("compile","Compilation des shaders");let[e,t]=await Promise.all([Se.loadAsync(this.shadersDirectory+"common/vertex.glsl"),Se.loadAsync(this.shadersDirectory+"output.glsl")]);this.outputShader=this.loadShaders(e,t)}render(){}present(){}getProgress(){let e=this.scene.renderOptions.maxSpp;return e<=0?0:this.sampleCounter*100/e}getSampleCount(){return this.sampleCounter}exportTextureToImage(e,t,n,i){if(!e){console.error("Cannot export null texture");return}let s=this.gl,r=s.createFramebuffer();if(s.bindFramebuffer(s.raw.FRAMEBUFFER,r),s.framebufferTexture2D(s.raw.FRAMEBUFFER,s.raw.COLOR_ATTACHMENT0,s.raw.TEXTURE_2D,e,0),s.raw.checkFramebufferStatus(s.raw.FRAMEBUFFER)!==s.raw.FRAMEBUFFER_COMPLETE){console.error("Framebuffer is not complete"),s.bindFramebuffer(s.raw.FRAMEBUFFER,null),s.deleteFramebuffer(r);return}let l=new Float32Array(t*n*4);s.raw.readPixels(0,0,t,n,s.raw.RGBA,s.raw.FLOAT,l);let a=new Uint8Array(t*n*4);for(let f=0;f<l.length;f++)a[f]=Math.min(255,Math.max(0,Math.floor(l[f]*255)));s.bindFramebuffer(s.raw.FRAMEBUFFER,null),s.deleteFramebuffer(r);let c=document.createElement("canvas");c.width=t,c.height=n,c.style.border="2px solid black";let u=c.getContext("2d");if(!u){console.error("Cannot get 2D context from canvas");return}let h=u.createImageData(t,n);for(let f=0;f<n;f++)for(let p=0;p<t;p++){let g=(f*t+p)*4,x=((n-1-f)*t+p)*4;h.data[x]=a[g],h.data[x+1]=a[g+1],h.data[x+2]=a[g+2],h.data[x+3]=a[g+3]}u.putImageData(h,0,0),L.document.getElementById(i)?.appendChild(c)}async update(e,t){}};var ea="/*__PROCEDURAL_MATERIAL_INJECTION__*/",ta="/*__PROCEDURAL_GEOMETRY_INJECTION__*/",na="/*__PROCEDURAL_ENV_INJECTION__*/",ii=class o extends an{_denoiserRunning=!1;backendReady=!1;denoiser=null;denoiserExecutedOneTime=!1;denoiserTexture=null;denoiserInputFramePtr=null;BVHTex=null;vertexIndicesTex=null;verticesTex=null;normalsTex=null;materialsTex=null;transformsTex=null;lightsTex=null;textureMapsArrayTex=null;envMapTex=null;envMapCDFTex=null;thinFilmLutTex=null;pathTraceTextureLowRes=null;pathTraceTexture=null;accumTexture=null;tileOutputTexture=[null,null];pathTraceFBO=null;pathTraceFBOLowRes=null;accumFBO=null;pathTraceShader=null;pathTraceShaderLowRes=null;tonemapShader=null;_initDenoiserAsync(e){if(typeof document>"u"){this.scene.renderOptions.enableDenoiser=!1,this.backendReady=!0;return}import("./chunks/denoiser-R4B6EPN5.js").then(t=>{let n=t.Denoiser;if(!n)throw new Error("Denoiser export not found.");let i=document.getElementById("_denoiserOutput");i===null&&(i=document.createElement("canvas"),i.id="_denoiserOutput",i.style.display="none",document.body.appendChild(i)),this.denoiser=new n("webgl",i),this.denoiser.onBackendReady(()=>{this.denoiser&&(this.denoiser.useTiling=!0,this.denoiser.onExecute(s=>{!this.denoiserFBO||!this.denoiserTexture||(e.bindFramebuffer(e.raw.FRAMEBUFFER,this.denoiserFBO),e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture),e.texSubImage2D(e.raw.TEXTURE_2D,0,0,0,this.denoiser.width,this.denoiser.height,e.raw.RGBA,e.raw.FLOAT,s),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.denoiserExecutedOneTime||(this.denoiserExecutedOneTime=!0))},"float32"),this.backendReady=!0)})}).catch(t=>{console.warn("Denoiser disabled (module load failed):",t),this.scene.renderOptions.enableDenoiser=!1,this.backendReady=!0,this.denoiser=null})}constructor(e){super(e)}dispose(){super.dispose();let e=this.gl;this.pathTraceTexture&&(e.deleteTexture(this.pathTraceTexture),this.pathTraceTexture=null),this.pathTraceTextureLowRes&&(e.deleteTexture(this.pathTraceTextureLowRes),this.pathTraceTextureLowRes=null),this.accumTexture&&(e.deleteTexture(this.accumTexture),this.accumTexture=null),this.tileOutputTexture[0]&&(e.deleteTexture(this.tileOutputTexture[0]),this.tileOutputTexture[0]=null),this.tileOutputTexture[1]&&(e.deleteTexture(this.tileOutputTexture[1]),this.tileOutputTexture[1]=null),this.denoiserTexture&&(e.deleteTexture(this.denoiserTexture),this.denoiserTexture=null),this.BVHTex&&(e.deleteTexture(this.BVHTex),this.BVHTex=null),this.vertexIndicesTex&&(e.deleteTexture(this.vertexIndicesTex),this.vertexIndicesTex=null),this.verticesTex&&(e.deleteTexture(this.verticesTex),this.verticesTex=null),this.normalsTex&&(e.deleteTexture(this.normalsTex),this.normalsTex=null),this.materialsTex&&(e.deleteTexture(this.materialsTex),this.materialsTex=null),this.transformsTex&&(e.deleteTexture(this.transformsTex),this.transformsTex=null),this.lightsTex&&(e.deleteTexture(this.lightsTex),this.lightsTex=null),this.textureMapsArrayTex&&(e.deleteTexture(this.textureMapsArrayTex),this.textureMapsArrayTex=null),this.envMapTex&&(e.deleteTexture(this.envMapTex),this.envMapTex=null),this.envMapCDFTex&&(e.deleteTexture(this.envMapCDFTex),this.envMapCDFTex=null),this.thinFilmLutTex&&(e.deleteTexture(this.thinFilmLutTex),this.thinFilmLutTex=null),this.denoiser&&(this.denoiser.dispose(),this.denoiser=null),this.pathTraceFBO&&(e.deleteFramebuffer(this.pathTraceFBO),this.pathTraceFBO=null),this.pathTraceFBOLowRes&&(e.deleteFramebuffer(this.pathTraceFBOLowRes),this.pathTraceFBOLowRes=null),this.accumFBO&&(e.deleteFramebuffer(this.accumFBO),this.accumFBO=null),this.pathTraceShader&&(this.pathTraceShader.dispose(),this.pathTraceShader=null),this.pathTraceShaderLowRes&&(this.pathTraceShaderLowRes.dispose(),this.pathTraceShaderLowRes=null),this.tonemapShader&&(this.tonemapShader.dispose(),this.tonemapShader=null)}initFBOs(){super.initFBOs_(!0);let e=this.gl;this.pathTraceFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBO),this.pathTraceTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.tileWidth,this.tileHeight,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.pathTraceTexture,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.pathTraceFBOLowRes=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),this.pathTraceTextureLowRes=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio),0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.pathTraceTextureLowRes,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.accumFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.accumFBO),this.accumTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.accumTexture,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.outputFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),this.tileOutputTexture[0]=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[0]),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),this.tileOutputTexture[1]=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[1]),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.tileOutputTexture[this.currentBuffer],0),this.backendReady=!this.scene.renderOptions.enableDenoiser,this.denoiserInputFramePtr=new Float32Array(this.renderSize.x*this.renderSize.y*4),this.denoiserTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),this.denoiserFBO=e.createFramebuffer(),this.scene.renderOptions.enableDenoiser&&this._initDenoiserAsync(e),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}disposeShaders(){super.disposeShaders(),this.pathTraceShader&&(this.pathTraceShader.dispose(),this.pathTraceShader=null),this.pathTraceShaderLowRes&&(this.pathTraceShaderLowRes.dispose(),this.pathTraceShaderLowRes=null),this.tonemapShader&&(this.tonemapShader.dispose(),this.tonemapShader=null)}async initShadersAsync(){await super.initShadersAsync();let e=this.gl,t=this.scene,[n,i,s,r,l]=await Promise.all([Se.loadAsync(this.shadersDirectory+"common/vertex.glsl"),Se.loadAsync(this.shadersDirectory+"tile.glsl"),Se.loadAsync(this.shadersDirectory+"preview.glsl"),Se.loadAsync(this.shadersDirectory+"output.glsl"),Se.loadAsync(this.shadersDirectory+"tonemap.glsl")]),a=this.scene.proceduralMaterialGlsl?.trim().length?`${this.scene.proceduralMaterialGlsl}
`:`vec3 EvalProceduralDisplacementLocal(int matId, vec2 uv, int texLayer) { return vec3(0.0); }
void ApplyProceduralMaterialOverrides(int matId, inout Material mat, inout State state, ivec4 texIDs, Ray r) {}
void ApplyProceduralMaterialClosureContract(int matId, in Material mat, in State state) {}
`,c=`vec3 EvalProceduralDisplacementLocal(int matId, vec2 uv, int texLayer);
void ApplyProceduralMaterialOverrides(int matId, inout Material mat, inout State state, ivec4 texIDs, Ray r);
void ApplyProceduralMaterialClosureContract(int matId, in Material mat, in State state);
`,u=this.scene.proceduralEnvGlsl?.trim().length?`${this.scene.proceduralEnvGlsl}
`:"";i.src=i.src.replace(ta,a+ta),s.src=s.src.replace(ta,a+ta),i.src=i.src.replace(ea,c+ea),s.src=s.src.replace(ea,c+ea),i.src=i.src.replace(na,u+na),s.src=s.src.replace(na,u+na);let[h,d]=this.scene.getDefines();function f(x,m){let y=x.src.indexOf("#version");if(y!==-1){let b=x.src.indexOf(`
`,y);x.src=x.src.slice(0,b+1)+m+x.src.slice(b+1)}else x.src=m+x.src}f(i,h),f(s,h),f(l,d),this.outputShader=this.loadShaders(n,r),this.tonemapShader=this.loadShaders(n,l),this.pathTraceShader=this.loadShaders(n,i),this.pathTraceShaderLowRes=this.loadShaders(n,s);let p=await Promise.all(this.programs.map(x=>(console.log("Linking program..."),x.waitForLinkAsync())));console.log();let g;this.pathTraceShader.use(),g=this.pathTraceShader.getObject(),t.envMap&&(e.uniform2f(e.raw.getUniformLocation(g,"envMapRes"),t.envMap.width,t.envMap.height),e.uniform1f(e.raw.getUniformLocation(g,"envMapTotalSum"),t.envMap.totalSum)),e.uniform1i(e.raw.getUniformLocation(g,"topBVHIndex"),t.topLevelIndex),e.uniform2f(e.raw.getUniformLocation(g,"resolution"),this.renderSize.x,this.renderSize.y),e.uniform2f(e.raw.getUniformLocation(g,"invNumTiles"),this.invNumTiles.x,this.invNumTiles.y),e.uniform1i(e.raw.getUniformLocation(g,"numOfLights"),t.lights.length),e.uniform1i(e.raw.getUniformLocation(g,"accumTexture"),0),e.uniform1i(e.raw.getUniformLocation(g,"BVH"),1),e.uniform1i(e.raw.getUniformLocation(g,"vertexIndicesTex"),2),e.uniform1i(e.raw.getUniformLocation(g,"verticesTex"),3),e.uniform1i(e.raw.getUniformLocation(g,"normalsTex"),4),e.uniform1i(e.raw.getUniformLocation(g,"materialsTex"),5),e.uniform1i(e.raw.getUniformLocation(g,"transformsTex"),6),e.uniform1i(e.raw.getUniformLocation(g,"lightsTex"),7),e.uniform1i(e.raw.getUniformLocation(g,"textureMapsArrayTex"),8),e.uniform1i(e.raw.getUniformLocation(g,"envMapTex"),9),e.uniform1i(e.raw.getUniformLocation(g,"envMapCDFTex"),10),e.uniform1i(e.raw.getUniformLocation(g,"thinFilmLutTex"),11),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),g=this.pathTraceShaderLowRes.getObject(),t.envMap&&(e.uniform2f(e.raw.getUniformLocation(g,"envMapRes"),t.envMap.width,t.envMap.height),e.uniform1f(e.raw.getUniformLocation(g,"envMapTotalSum"),t.envMap.totalSum)),e.uniform1i(e.raw.getUniformLocation(g,"topBVHIndex"),t.topLevelIndex),e.uniform2f(e.raw.getUniformLocation(g,"resolution"),this.renderSize.x,this.renderSize.y),e.uniform1i(e.raw.getUniformLocation(g,"numOfLights"),t.lights.length),e.uniform1i(e.raw.getUniformLocation(g,"accumTexture"),0),e.uniform1i(e.raw.getUniformLocation(g,"BVH"),1),e.uniform1i(e.raw.getUniformLocation(g,"vertexIndicesTex"),2),e.uniform1i(e.raw.getUniformLocation(g,"verticesTex"),3),e.uniform1i(e.raw.getUniformLocation(g,"normalsTex"),4),e.uniform1i(e.raw.getUniformLocation(g,"materialsTex"),5),e.uniform1i(e.raw.getUniformLocation(g,"transformsTex"),6),e.uniform1i(e.raw.getUniformLocation(g,"lightsTex"),7),e.uniform1i(e.raw.getUniformLocation(g,"textureMapsArrayTex"),8),e.uniform1i(e.raw.getUniformLocation(g,"envMapTex"),9),e.uniform1i(e.raw.getUniformLocation(g,"envMapCDFTex"),10),e.uniform1i(e.raw.getUniformLocation(g,"thinFilmLutTex"),11),this.pathTraceShaderLowRes.stopUsing()}get scene(){return this._scene}async initAsync(){await super.initAsync(),this.initGPUDataBuffers()}async resizeRendererAsync(){await super.resizeRendererAsync(),this.initGPUDataBuffers()}static buildThinFilmLut(e,t,n=1.5,i=1.5){let l=[700,546,436],a=2*Math.PI,c=new Float32Array(e*t*3);function u(h,d,f){let p=Math.sqrt(Math.max(0,1-h*h)),g=d/f*p;if(g>=1)return 1;let x=Math.sqrt(Math.max(0,1-g*g)),m=(d*h-f*x)/(d*h+f*x),y=(f*h-d*x)/(f*h+d*x);return .5*(m*m+y*y)}for(let h=0;h<t;h++)for(let d=0;d<e;d++){let f=(d+.5)/e,p=(h+.5)/t*1200,g=(h*e+d)*3,m=Math.sqrt(Math.max(0,1-f*f))*1/n,y=Math.sqrt(Math.max(0,1-m*m)),b=u(f,1,n),M=1-b,v=u(y,n,i);for(let w=0;w<3;w++){let T=l[w],S=a*n*p*y/T,E=1-b*v*Math.cos(2*S),I=b*b+M*M*v+2*b*M*v*Math.cos(S);c[g+w]=Math.max(0,Math.min(1,I/Math.max(E,1e-5)))}}return c}initGPUDataBuffers(){let e=this.gl;e.pixelStorei(e.raw.PACK_ALIGNMENT,1);let t=this.scene.bvhData();this.BVHTex=this.createBufferTexture(t,3);let n=this.scene.vertIndicesData();this.vertexIndicesTex=this.createBufferTextureInt(n,3);let i=this.scene.verticesData();this.verticesTex=this.createBufferTexture(i,4);let s=this.scene.normalsData();this.normalsTex=this.createBufferTexture(s,4);{let r=this.scene.materialsData();this.materialsTex=this.createBufferTexture(r,4)}{let r=this.scene.transformsData();this.transformsTex=this.createBufferTexture(r,4)}if(this.scene.lights.length>0){let r=this.scene.lightsData();this.lightsTex=this.createBufferTexture(r,3)}if(this.scene.textures.length>0||this.scene.textureMapsArray?.length>0){let r=this.scene.textureMapsArray;this.textureMapsArrayTex=this.createBufferTextureUint(r,4)}if(this.scene.envMap){let r=this.scene.envMap;this.envMapTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGB32F,r.width,r.height,0,e.raw.RGB,e.raw.FLOAT,r.img),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.LINEAR),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.LINEAR),e.bindTexture(e.raw.TEXTURE_2D,null),this.envMapCDFTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapCDFTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.R32F,r.width,r.height,0,e.raw.RED,e.raw.FLOAT,r.cdf),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.bindTexture(e.raw.TEXTURE_2D,null)}e.activeTexture(e.raw.TEXTURE1),e.bindTexture(e.raw.TEXTURE_2D,this.BVHTex),e.activeTexture(e.raw.TEXTURE2),e.bindTexture(e.raw.TEXTURE_2D,this.vertexIndicesTex),e.activeTexture(e.raw.TEXTURE3),e.bindTexture(e.raw.TEXTURE_2D,this.verticesTex),e.activeTexture(e.raw.TEXTURE4),e.bindTexture(e.raw.TEXTURE_2D,this.normalsTex),e.activeTexture(e.raw.TEXTURE5),e.bindTexture(e.raw.TEXTURE_2D,this.materialsTex),e.activeTexture(e.raw.TEXTURE6),e.bindTexture(e.raw.TEXTURE_2D,this.transformsTex),e.activeTexture(e.raw.TEXTURE7),e.bindTexture(e.raw.TEXTURE_2D,this.lightsTex),e.activeTexture(e.raw.TEXTURE8),e.bindTexture(e.raw.TEXTURE_2D,this.textureMapsArrayTex),e.activeTexture(e.raw.TEXTURE9),e.bindTexture(e.raw.TEXTURE_2D,this.envMapTex),e.activeTexture(e.raw.TEXTURE10),e.bindTexture(e.raw.TEXTURE_2D,this.envMapCDFTex);{let l=o.buildThinFilmLut(64,64);this.thinFilmLutTex&&e.deleteTexture(this.thinFilmLutTex),this.thinFilmLutTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.thinFilmLutTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGB32F,64,64,0,e.raw.RGB,e.raw.FLOAT,l),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.LINEAR),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.LINEAR),e.bindTexture(e.raw.TEXTURE_2D,null),e.activeTexture(e.raw.TEXTURE11),e.bindTexture(e.raw.TEXTURE_2D,this.thinFilmLutTex)}}render(){let e=this.gl;if(!(!this.scene.dirty&&this.scene.renderOptions.maxSpp!==-1&&this.sampleCounter>=this.scene.renderOptions.maxSpp)){if(e.activeTexture(e.raw.TEXTURE0),this.scene.dirty)e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),this.quad.draw(this.pathTraceShaderLowRes),this.scene.instancesModified=!1,this.scene.dirty=!1,this.scene.envMapModified=!1;else{let t=[],n=0,i=0;e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBO),e.viewport(0,0,this.tileWidth,this.tileHeight),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),n=performance.now(),this.quad.draw(this.pathTraceShader),i=performance.now(),t.push(`pathTraceShader: Render time: ${(i-n).toFixed(2)} ms`),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.accumFBO),e.viewport(this.tileWidth*this.tile.x,this.tileHeight*this.tile.y,this.tileWidth,this.tileHeight),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTexture),n=performance.now(),this.quad.draw(this.outputShader),i=performance.now(),t.push(`outputShader: Render time: ${(i-n).toFixed(2)} ms`),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.tileOutputTexture[this.currentBuffer],0),e.viewport(0,0,this.renderSize.x,this.renderSize.y),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),n=performance.now(),this.quad.draw(this.tonemapShader),i=performance.now(),t.push(`tonemapShader: Render time: ${(i-n).toFixed(2)} ms`),console.info(t.join(`
`))}e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),this.scene.dirty||this.sampleCounter===1?(e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),this.quad.draw(this.tonemapShader)):(this.scene.renderOptions.enableDenoiser&&this.denoiserExecutedOneTime&&this.denoiserTexture?e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture):e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[1-this.currentBuffer]),this.quad.draw(this.outputShader))}async update(e,t){let n=this.gl,i=this.scene;if(!i.dirty&&i.renderOptions.maxSpp!==-1&&this.sampleCounter>=i.renderOptions.maxSpp)return;if(i.instancesModified){let r=this.scene.transformsData(),l=r.length/4,a=Math.min(an.maxBufferTextureWidth,l),c=Math.ceil(l/a);n.bindTexture(n.raw.TEXTURE_2D,this.transformsTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGBA32F,a,c,0,n.raw.RGBA,n.raw.FLOAT,r);let u=this.scene.materialsData(),h=u.length/4,d=Math.min(an.maxBufferTextureWidth,h),f=Math.ceil(h/d);n.bindTexture(n.raw.TEXTURE_2D,this.materialsTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGBA32F,d,f,0,n.raw.RGBA,n.raw.FLOAT,u)}if(i.envMapModified&&i.envMap){let r=i.envMap;this.envMapTex&&(n.bindTexture(n.raw.TEXTURE_2D,this.envMapTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGB32F,r.width,r.height,0,n.raw.RGB,n.raw.FLOAT,r.img)),this.envMapCDFTex&&(n.bindTexture(n.raw.TEXTURE_2D,this.envMapCDFTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.R32F,r.width,r.height,0,n.raw.RED,n.raw.FLOAT,r.cdf));let l;this.pathTraceShader&&this.pathTraceShaderLowRes&&(this.pathTraceShader.use(),l=this.pathTraceShader.getObject(),n.uniform2f(n.raw.getUniformLocation(l,"envMapRes"),i.envMap.width,i.envMap.height),n.uniform1f(n.raw.getUniformLocation(l,"envMapTotalSum"),i.envMap.totalSum),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),l=this.pathTraceShaderLowRes.getObject(),n.uniform2f(n.raw.getUniformLocation(l,"envMapRes"),i.envMap.width,i.envMap.height),n.uniform1f(n.raw.getUniformLocation(l,"envMapTotalSum"),i.envMap.totalSum),this.pathTraceShaderLowRes.stopUsing())}if(i.renderOptions.enableDenoiser&&this.sampleCounter>1&&this.backendReady&&this.denoiser){if(!this.denoised||this.frameCounter%(i.renderOptions.denoiserFrameCnt*(this.numTiles.x*this.numTiles.y))==0){if(this._denoiserRunning)return;this._denoiserRunning=!0;try{if(!this.denoiserFBO||!this.tileOutputTexture[1-this.currentBuffer]){console.warn("Denoiser: FBO ou texture de sortie non initialis\xE9e."),this._denoiserRunning=!1;return}(this.denoiserInputFramePtr===null||this.denoiserInputFramePtr.length!==this._renderSize.x*this._renderSize.y*4)&&(this.denoiserInputFramePtr=new Float32Array(this._renderSize.x*this._renderSize.y*4)),n.bindFramebuffer(n.raw.FRAMEBUFFER,this.denoiserFBO),n.framebufferTexture2D(n.raw.FRAMEBUFFER,n.raw.COLOR_ATTACHMENT0,n.raw.TEXTURE_2D,this.tileOutputTexture[1-this.currentBuffer],0),n.raw.readPixels(0,0,this._renderSize.x,this._renderSize.y,n.raw.RGBA,n.raw.FLOAT,this.denoiserInputFramePtr);for(let r=0;r<this.denoiserInputFramePtr.length;r++){let l=this.denoiserInputFramePtr[r];(!Number.isFinite(l)||isNaN(l))&&(l=0),this.denoiserInputFramePtr[r]=Math.min(Math.max(l,0),1)}this.denoised=!0,this.denoiser.width=this._renderSize.x,this.denoiser.height=this._renderSize.y,await this.denoiser.setInputData("color",this.denoiserInputFramePtr),await this.denoiser.execute()}catch(r){this.denoised=!1,console.error("Erreur denoiser:",r)}finally{this._denoiserRunning=!1}}}else this.denoised=!1;if(i.dirty){if(ot.profiling){let r=L.document.getElementById("bufferA");r?.replaceChildren(),r=L.document.getElementById("bufferB"),r?.replaceChildren(),r=L.document.getElementById("bufferC"),r?.replaceChildren(),r=L.document.getElementById("bufferD"),r?.replaceChildren(),r=L.document.getElementById("image"),r?.replaceChildren()}if(this.tile.x=-1,this.tile.y=this.numTiles.y-1,this.sampleCounter=1,this.denoised=!1,this.frameCounter=1,i.renderOptions.enableDenoiser&&this.denoiser){try{this.denoiser.abort()}catch(r){console.warn("Erreur lors de l'abandon du denoiser:",r)}this.denoiserExecutedOneTime=!1,this.denoised=!1}this.accumFBO&&(n.bindFramebuffer(n.raw.FRAMEBUFFER,this.accumFBO),n.clear(n.raw.COLOR_BUFFER_BIT),n.bindFramebuffer(n.raw.FRAMEBUFFER,null))}else ot.profiling&&this.sampleCounter<=4&&this.frameCounter>1&&(this.exportTextureToImage(this.pathTraceTexture,this.tileWidth,this.tileHeight,"bufferB"),this.exportTextureToImage(this.accumTexture,this.renderSize.x,this.renderSize.y,"bufferC"),this.exportTextureToImage(this.tileOutputTexture[this.currentBuffer],this.renderSize.x,this.renderSize.y,"bufferD"),this.exportTextureToImage(this.tileOutputTexture[1-this.currentBuffer],this.renderSize.x,this.renderSize.y,"image")),this.frameCounter++,this.tile.x++,this.tile.x>=this.numTiles.x&&(this.tile.x=0,this.tile.y--,this.tile.y<0&&(this.tile.x=0,this.tile.y=this.numTiles.y-1,this.sampleCounter++,this.currentBuffer=1-this.currentBuffer));let s;return this.pathTraceShader.use(),s=this.pathTraceShader.getObject(),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.right"),i.camera.right.x,i.camera.right.y,i.camera.right.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.up"),i.camera.up.x,i.camera.up.y,i.camera.up.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.forward"),i.camera.forward.x,i.camera.forward.y,i.camera.forward.z),n.uniform1f(n.raw.getUniformLocation(s,"camera.fov"),i.camera.fov),n.uniform1f(n.raw.getUniformLocation(s,"camera.focalDist"),i.camera.focalDist),n.uniform1f(n.raw.getUniformLocation(s,"camera.aperture"),i.camera.aperture),n.uniform1i(n.raw.getUniformLocation(s,"enableEnvMap"),i.envMap!==null&&i.renderOptions.enableEnvMap?1:0),n.uniform1f(n.raw.getUniformLocation(s,"envMapIntensity"),i.renderOptions.envMapIntensity),n.uniform1f(n.raw.getUniformLocation(s,"envMapRot"),i.renderOptions.envMapRot/360),n.uniform1i(n.raw.getUniformLocation(s,"maxDepth"),i.dirty?2:i.renderOptions.maxDepth),n.uniform2f(n.raw.getUniformLocation(s,"tileOffset"),this.tile.x*this.invNumTiles.x,this.tile.y*this.invNumTiles.y),n.uniform3f(n.raw.getUniformLocation(s,"uniformLightCol"),i.renderOptions.uniformLightCol.x,i.renderOptions.uniformLightCol.y,i.renderOptions.uniformLightCol.z),n.uniform1f(n.raw.getUniformLocation(s,"roughnessMollificationAmt"),i.renderOptions.roughnessMollificationAmt),n.uniform1i(n.raw.getUniformLocation(s,"frameNum"),this.frameCounter),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),s=this.pathTraceShaderLowRes.getObject(),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.right"),i.camera.right.x,i.camera.right.y,i.camera.right.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.up"),i.camera.up.x,i.camera.up.y,i.camera.up.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.forward"),i.camera.forward.x,i.camera.forward.y,i.camera.forward.z),n.uniform1f(n.raw.getUniformLocation(s,"camera.fov"),i.camera.fov),n.uniform1f(n.raw.getUniformLocation(s,"camera.focalDist"),i.camera.focalDist),n.uniform1f(n.raw.getUniformLocation(s,"camera.aperture"),i.camera.aperture),n.uniform1i(n.raw.getUniformLocation(s,"enableEnvMap"),i.envMap!==null&&i.renderOptions.enableEnvMap?1:0),n.uniform1f(n.raw.getUniformLocation(s,"envMapIntensity"),i.renderOptions.envMapIntensity),n.uniform1f(n.raw.getUniformLocation(s,"envMapRot"),i.renderOptions.envMapRot/360),n.uniform1i(n.raw.getUniformLocation(s,"maxDepth"),i.renderOptions.maxDepth),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"uniformLightCol"),i.renderOptions.uniformLightCol.x,i.renderOptions.uniformLightCol.y,i.renderOptions.uniformLightCol.z),n.uniform1f(n.raw.getUniformLocation(s,"roughnessMollificationAmt"),i.renderOptions.roughnessMollificationAmt),this.pathTraceShaderLowRes.stopUsing(),this.tonemapShader.use(),s=this.tonemapShader.getObject(),n.uniform1f(n.raw.getUniformLocation(s,"invSampleCounter"),1/this.sampleCounter),n.uniform1i(n.raw.getUniformLocation(s,"enableTonemap"),i.renderOptions.enableTonemap?1:0),n.uniform1i(n.raw.getUniformLocation(s,"enableAces"),i.renderOptions.enableAces?1:0),n.uniform1i(n.raw.getUniformLocation(s,"simpleAcesFit"),i.renderOptions.simpleAcesFit?1:0),n.uniform3f(n.raw.getUniformLocation(s,"backgroundCol"),i.renderOptions.backgroundCol.x,i.renderOptions.backgroundCol.y,i.renderOptions.backgroundCol.z),this.tonemapShader.stopUsing(),Promise.resolve()}};var si=class extends an{constructor(e){super(e)}dispose(){super.dispose();let e=this.gl;for(let t of this.scene.shadertoyShader.buffers){for(let n of t.textures)e.deleteTexture(n);for(let n of t.inputs)n.texture&&e.deleteTexture(n.texture)}this.scene.shadertoyShader.imageTexture=null;for(let t of this.scene.shadertoyShader.buffers)for(let n of t.fbos)e.deleteFramebuffer(n);for(let t of this.scene.shadertoyShader.buffers)t.shader.dispose(),t.shader=null,t.playNode&&(t.playNode.stop(),t.playNode=null)}pauseOrContinue(e){for(let t of this.scene.shadertoyShader.buffers){Pn.pauseOrContinue(t,e);for(let n of t.inputs)Ce.pauseOrContinue(n,e)}}initFBOs(){super.initFBOs_(this.scene.shadertoyShader.isGlslPathtracer);let e=this.gl;this.frameCounter=0;for(let t=0;t<this.scene.shadertoyShader.buffers.length;t++){let n=this.scene.shadertoyShader.buffers[t],i=n.inputs.some(c=>c.type===n.type);for(let c=0;c<n.inputs.length;c++){let u=n.inputs[c];u.type==="bufferA"||u.type==="bufferB"||u.type==="bufferC"||u.type==="bufferD"||u.type==="cubeA"?u.buffer=this.scene.shadertoyShader.buffers.find(h=>h.type===u.type):u.texture=Ce.createTexture(u)}let s=i,r=!1,l=this.renderSize,a=this.renderSize;this.scene.shadertoyShader.isGlslPathtracer&&(n.type==="bufferB"&&(s=!0,l=new Z(this.tileWidth,this.tileHeight),a=new Z(Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio))),n.type==="bufferD"&&(s=!0,r=!0)),Pn.createFBOAndTexture(n,s,r,l,a)}this.scene.shadertoyShader.imageTexture=this.scene.shadertoyShader.buffers.find(t=>t.type==="image").textures[0],this.scene.shadertoyShader.isGlslPathtracer&&(this.scene.shadertoyShader.pathTraceTextures=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferB").textures,this.scene.shadertoyShader.accumFramebuffers=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferC").fbos,this.scene.shadertoyShader.tileOutputTextures=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferD").textures),this.denoised&&(this.denoiserFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.denoiserFBO)),this.outputFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}disposeShaders(){super.disposeShaders();for(let e of this.scene.shadertoyShader.buffers)e.shader.dispose(),e.shader=null}async initShadersAsync(){await super.initShadersAsync();let e=this.gl,t=this.scene,[n,i,s,r]=await Promise.all([Se.loadAsync(this.shadersDirectory+"shadertoy/vertex.glsl"),Se.loadAsync(this.shadersDirectory+"shadertoy/fragment.glsl"),Se.loadAsync(this.shadersDirectory+"shadertoy/cubeA.glsl"),Se.loadAsync(this.shadersDirectory+"shadertoy/sound.glsl")]),l=this.scene.shadertoyShader.commonCode||"",a="";for(let u=0;u<this.scene.shadertoyShader.buffers.length;u++){let h=this.scene.shadertoyShader.buffers[u],d=[];for(let p=0;p<5;p++){let g=h.inputs.find(x=>x.channel===p);g?g.type==="cubemap"||g.type==="cubeA"?d.push(`uniform samplerCube iChannel${g.channel};`):g.type==="volume"?d.push(`uniform sampler3D iChannel${g.channel};`):d.push(`uniform sampler2D iChannel${g.channel};`):d.push(`uniform sampler2D iChannel${p};`)}let f;if(h.type==="cubeA"){let p={src:s.src,path:s.path,dump:s.dump};p.src=p.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",a+(l+h.code)),p.path=h.type+".glsl",f=this.loadShaders(n,p)}else if(h.type==="sound"){let p={src:r.src,path:r.path,dump:s.dump};p.src=p.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",a+(l+h.code)),p.path=h.type+".glsl",f=this.loadShaders(n,p)}else{let p={src:i.src,path:i.path,dump:i.dump};p.src=p.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",a+(l+h.code)),p.path=h.type+".glsl",f=this.loadShaders(n,p)}h.shader=f}let c=await Promise.all(this.programs.map(u=>(console.log("Linking program..."),u.waitForLinkAsync())));console.log();for(let u of this.scene.shadertoyShader.buffers){let h=u.shader,d=new Date,f=[d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()*60*60+d.getMinutes()*60+d.getSeconds()+d.getMilliseconds()/1e3],p=[this.renderSize.x,this.renderSize.y];u.type==="cubeA"&&(p=[u.xres,u.yres]),h.use();let g=h.getObject();e.uniform1i(e.raw.getUniformLocation(g,"iChannel0"),0),e.uniform1i(e.raw.getUniformLocation(g,"iChannel1"),1),e.uniform1i(e.raw.getUniformLocation(g,"iChannel2"),2),e.uniform1i(e.raw.getUniformLocation(g,"iChannel3"),3),e.uniform1i(e.raw.getUniformLocation(g,"iChannel4"),4),e.uniform1f(e.raw.getUniformLocation(g,"iFrameRate"),60),e.uniform4fv(e.raw.getUniformLocation(g,"iDate"),f),e.uniform3f(e.raw.getUniformLocation(g,"iResolution"),p[0],p[1],1);let x=[0,0,0,0,0,0,0,0,0,0,0,0];u.inputs.sort((m,y)=>m.channel-y.channel).forEach((m,y)=>{m.type==="cubeA"||m.type==="texture"||m.type==="volume"||m.type==="cubemap"||m.type==="floats"?(x[m.channel*3+0]=m.xres,x[m.channel*3+1]=m.yres,x[m.channel*3+2]=1):(x[m.channel*3+0]=this.renderSize.x,x[m.channel*3+1]=this.renderSize.y,x[m.channel*3+2]=1)}),e.uniform3fv(e.raw.getUniformLocation(g,"iChannelResolution"),x),u.type==="cubeA"?e.uniform4fv(e.raw.getUniformLocation(g,"unViewport"),[0,0,u.xres,u.yres]):u.type=="sound"&&(e.uniform3fv(e.raw.getUniformLocation(g,"iChannelTime"),[0,0,0,0]),e.uniform1f(e.raw.getUniformLocation(g,"iSampleRate"),Xe.instance().sampleRate)),this.scene.shadertoyShader.isGlslPathtracer&&u.type==="bufferB"&&e.uniform2f(e.raw.getUniformLocation(g,"invNumTiles"),this.invNumTiles.x,this.invNumTiles.y),h.stopUsing()}}get scene(){return this._scene}render(){let e=this.gl;if(!this.scene.dirty&&this.scene.renderOptions.maxSpp!==-1&&this.sampleCounter>=this.scene.renderOptions.maxSpp)return;e.activeTexture(e.raw.TEXTURE0);for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];if(i.type!=="sound")continue;if(i.soundCompiled)break;e.activeTexture(e.raw.TEXTURE0);let s=i.fbos.length>1;i.frontIndex=s&&i.flip?1:0,e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),e.viewport(0,0,i.xres,i.yres);for(let r=0;r<i.inputs.length;r++){let l=i.inputs[r];Ce.bindTexture(l,l.buffer===i)}i.shader.use(),Pn.drawBuffer(i,i.shader.getObject()),i.shader.stopUsing();for(let r=0;r<i.inputs.length;r++){let l=i.inputs[r];Ce.unbindTexture(l)}}let t=[];for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];if(i.type==="sound")continue;let s=i.fbos.length>1||i.type==="cubeA";if(i.frontIndex=s&&i.flip?1:0,i.type==="cubeA"){let r=0,l=i.shader.getObject(),a=e.getAttribLocation(l,"pos");for(let c=0;c<6;c++){e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),e.viewport(0,0,i.xres,i.yres),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_CUBE_MAP_POSITIVE_X+c,i.textures[i.frontIndex],0);for(let y=0;y<i.inputs.length;y++){let b=i.inputs[y];Ce.bindTexture(b,b.buffer===i)}let u=[],h=[],d=[],f=[],p=[0,0,0];c===0?(u=[1,1,1],h=[1,1,-1],d=[1,-1,-1],f=[1,-1,1]):c===1?(u=[-1,1,-1],h=[-1,1,1],d=[-1,-1,1],f=[-1,-1,-1]):c===2?(u=[-1,1,-1],h=[1,1,-1],d=[1,1,1],f=[-1,1,1]):c===3?(u=[-1,-1,1],h=[1,-1,1],d=[1,-1,-1],f=[-1,-1,-1]):c===4?(u=[-1,1,1],h=[1,1,1],d=[1,-1,1],f=[-1,-1,1]):c===5&&(u=[1,1,-1],h=[-1,1,-1],d=[-1,-1,-1],f=[1,-1,-1]);let g=[u[0],u[1],u[2],h[0],h[1],h[2],d[0],d[1],d[2],f[0],f[1],f[2],p[0],p[1],p[2]],x=performance.now();i.shader.use(),e.uniform3fv(e.raw.getUniformLocation(l,"unCorners"),g),e.drawUnitQuad_XY(a),i.shader.stopUsing();let m=performance.now();r+=m-x;for(let y=0;y<i.inputs.length;y++){let b=i.inputs[y];Ce.unbindTexture(b)}}t.push(`${i.type}: Render time: ${(r/6).toFixed(2)} ms`)}else{let r=!1;if(this.scene.shadertoyShader.isGlslPathtracer&&i.type==="bufferB"&&(e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[this.scene.dirty?1:0]),r=!0),r||e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),this.scene.shadertoyShader.isGlslPathtracer&&i.type==="bufferD"&&e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.scene.shadertoyShader.tileOutputTextures[this.scene.dirty?0:this.currentBuffer],0),r=!1,this.scene.shadertoyShader.isGlslPathtracer&&(i.type==="bufferB"&&(this.scene.dirty?e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)):e.viewport(0,0,this.tileWidth,this.tileHeight),r=!0),i.type==="bufferC"&&!this.scene.dirty&&(e.viewport(this.tileWidth*this.tile.x,this.tileHeight*this.tile.y,this.tileWidth,this.tileHeight),r=!0)),r||e.viewport(0,0,this.renderSize.x,this.renderSize.y),r=!1,this.scene.shadertoyShader.isGlslPathtracer&&(i.type==="bufferC"&&(r=!0,e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.pathTraceTextures[this.scene.dirty?1:0])),i.type==="image"&&(r=!0,e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.tileOutputTextures[this.scene.dirty?0:1-this.currentBuffer]))),!r)for(let c=0;c<i.inputs.length;c++){let u=i.inputs[c];Ce.bindTexture(u,u.buffer===i)}let l=performance.now();this.quad.draw(i.shader);let a=performance.now();t.push(`${i.type}: Render time: ${(a-l).toFixed(2)} ms`);for(let c=0;c<i.inputs.length;c++){let u=i.inputs[c];Ce.unbindTexture(u)}}}for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];i.flip=!i.flip}Ft.instance().eraseKeypresses(),console.info(t.join(`
`)),this.scene.dirty&&(this.scene.dirty=!1),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.imageTexture),this.quad.draw(this.outputShader)}update(e,t){let n=this.gl,i=this.scene;if(!(!i.dirty&&i.renderOptions.maxSpp!==-1&&this.sampleCounter>=i.renderOptions.maxSpp)){if(i.dirty){if(ot.profiling){let s=L.document.getElementById("bufferA");s?.replaceChildren(),s=L.document.getElementById("bufferB"),s?.replaceChildren(),s=L.document.getElementById("bufferC"),s?.replaceChildren(),s=L.document.getElementById("bufferD"),s?.replaceChildren(),s=L.document.getElementById("image"),s?.replaceChildren()}this.tile.x=-1,this.tile.y=this.numTiles.y-1,this.sampleCounter=1,this.denoised=!1,this.frameCounter=0,i.shadertoyShader?.isGlslPathtracer&&(n.bindFramebuffer(n.raw.FRAMEBUFFER,i.shadertoyShader.accumFramebuffers[0]),n.clear(n.raw.COLOR_BUFFER_BIT),n.bindFramebuffer(n.raw.FRAMEBUFFER,null))}else ot.profiling&&i.shadertoyShader?.isGlslPathtracer&&this.sampleCounter<=4&&(this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferA").textures[0],this.renderSize.x,this.renderSize.y,"bufferA"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures[0],this.tileWidth,this.tileHeight,"bufferB"),i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures.length>1&&this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures[1],this.tileWidth,this.tileHeight,"bufferB"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferC").textures[0],this.renderSize.x,this.renderSize.y,"bufferC"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferD").textures[this.currentBuffer],this.renderSize.x,this.renderSize.y,"bufferD"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferD").textures[1-this.currentBuffer],this.renderSize.x,this.renderSize.y,"image")),this.frameCounter++,this.tile.x++,this.tile.x>=this.numTiles.x&&(this.tile.x=0,this.tile.y--,this.tile.y<0&&(this.tile.x=0,this.tile.y=this.numTiles.y-1,this.sampleCounter++,this.currentBuffer=1-this.currentBuffer));for(let s=0;s<i.shadertoyShader.buffers.length;s++){let r=i.shadertoyShader.buffers[s];r.shader.use();let l=r.shader.getObject();n.uniform1f(n.raw.getUniformLocation(l,"iTime"),e),n.uniform1f(n.raw.getUniformLocation(l,"iTimeDelta"),t),n.uniform1i(n.raw.getUniformLocation(l,"iFrame"),this.frameCounter),n.uniform4f(n.raw.getUniformLocation(l,"iMouse"),se.movePosition.x,se.movePosition.y,se.downPosition.x,se.downPosition.y),i.shadertoyShader.isGlslPathtracer&&(r.type==="bufferB"?(n.raw.uniform1i(n.raw.getUniformLocation(l,"dirty"),i.dirty?1:0),n.uniform2f(n.raw.getUniformLocation(l,"tileOffset"),i.dirty?0:this.tile.x*this.invNumTiles.x,i.dirty?0:this.tile.y*this.invNumTiles.y)):r.type==="bufferD"&&n.uniform1f(n.raw.getUniformLocation(l,"invSampleCounter"),i.dirty?1:1/this.sampleCounter)),r.shader.stopUsing()}}}};var K=class o{pmin;pmax;constructor(e,t){if(e===void 0&&t===void 0)this.pmin=new _(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),this.pmax=new _(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);else if(e!==void 0&&t===void 0)this.pmin=e.clone(),this.pmax=e.clone();else if(e!==void 0&&t!==void 0)this.pmin=_.min(e,t),this.pmax=_.max(e,t);else throw new Error("Invalid constructor arguments")}clone(){return new o(this.pmin.clone(),this.pmax.clone())}center(){return this.pmin.add(this.pmax).scale(.5)}extents(){return this.pmax.subtract(this.pmin)}surfaceArea(){let e=this.extents();return 2*(e.x*e.y+e.x*e.z+e.y*e.z)}grow(e){e instanceof _?(this.pmin=_.min(this.pmin,e),this.pmax=_.max(this.pmax,e)):e instanceof o&&(this.pmin=_.min(this.pmin,e.pmin),this.pmax=_.max(this.pmax,e.pmax))}contains(e){let t=this.extents().scale(.5);return Math.abs(this.center().x-e.x)<=t.x&&Math.abs(this.center().y-e.y)<=t.y&&Math.abs(this.center().z-e.z)<=t.z}maxdim(){let e=this.extents();return e.x>=e.y&&e.x>=e.z?0:e.y>=e.x&&e.y>=e.z?1:e.z>=e.x&&e.z>=e.y?2:0}get(e){if(e===0)return this.pmin;if(e===1)return this.pmax;throw new Error("Index out of bounds")}};function su(o,e){return new K(_.min(o.pmin,e.pmin),_.max(o.pmax,e.pmax))}function ru(o,e){return new K(_.max(o.pmin,e.pmin),_.min(o.pmax,e.pmax))}var ri=class{type=0;bounds=new K;index=0;startidx=null;numprims=null;lc=null;rc=null};function Ih(o){return o!==o}var Dn=class o{static kMaxPrimitivesPerLeaf=1;m_bounds=new K;m_height=0;m_nodes=[];m_nodecnt=0;m_packed_indices=[];m_indices=[];m_usesah=!0;m_num_bins=16;m_traversal_cost=1;constructor(e,t=64,n=!1){this.m_num_bins=t,this.m_usesah=n,this.m_height=0,this.m_traversal_cost=e}build(e){for(let t=0;t<e.length;++t)this.m_bounds.grow(e[t]);this.buildImpl(e,e.length)}bounds(){return this.m_bounds}initNodeAllocator(e){this.m_nodecnt=0,this.m_nodes=new Array(e);for(let t=0;t<e;++t)this.m_nodes[t]=new ri}allocateNode(){return this.m_nodes[this.m_nodecnt++]}buildNode(e,t,n,i){this.m_height=Math.max(this.m_height,e.level);let s=this.allocateNode();if(s.bounds=e.bounds,s.index=e.index,e.numprims<2){s.type=1,s.startidx=this.m_packed_indices.length,s.numprims=e.numprims;for(let r=0;r<e.numprims;++r)this.m_packed_indices.push(i[e.startidx+r])}else{let r=e.centroid_bounds.maxdim(),l=e.centroid_bounds.center().get(r);if(this.m_usesah){let x=this.findSahSplit(e,t,n,i);if(!Ih(x.split)&&(r=x.dim,l=x.split,e.numprims<x.sah&&e.numprims<o.kMaxPrimitivesPerLeaf)){s.type=1,s.startidx=this.m_packed_indices.length,s.numprims=e.numprims;for(let m=0;m<e.numprims;++m)this.m_packed_indices.push(i[e.startidx+m]);e.ptr&&(e.isLeft?e.ptr.lc=s:e.ptr.rc=s);return}}s.type=0;let a=new K,c=new K,u=new K,h=new K,d=e.startidx,f=(e.numprims+e.startidx&1)!==0;if(e.centroid_bounds.extents().get(r)>0){let x=e.startidx,m=e.startidx+e.numprims;if(f)for(;;){for(;x!==m&&n[i[x]].get(r)<l;)a.grow(t[i[x]]),u.grow(n[i[x]]),++x;if(x===m--)break;for(c.grow(t[i[x]]),h.grow(n[i[x]]);x!==m&&n[i[m]].get(r)>=l;)c.grow(t[i[m]]),h.grow(n[i[m]]),--m;if(x===m)break;a.grow(t[i[m]]),u.grow(n[i[m]]),[i[x++],i[m]]=[i[m],i[x]]}else for(;;){for(;x!==m&&n[i[x]].get(r)>=l;)a.grow(t[i[x]]),u.grow(n[i[x]]),++x;if(x===m--)break;for(c.grow(t[i[x]]),h.grow(n[i[x]]);x!==m&&n[i[m]].get(r)<l;)c.grow(t[i[m]]),h.grow(n[i[m]]),--m;if(x===m)break;a.grow(t[i[m]]),u.grow(n[i[m]]),[i[x++],i[m]]=[i[m],i[x]]}d=x}if(d===e.startidx||d===e.startidx+e.numprims){d=e.startidx+(e.numprims>>1);for(let x=e.startidx;x<d;++x)a.grow(t[i[x]]),u.grow(n[i[x]]);for(let x=d;x<e.startidx+e.numprims;++x)c.grow(t[i[x]]),h.grow(n[i[x]])}let p={startidx:e.startidx,numprims:d-e.startidx,ptr:s,isLeft:!0,bounds:a,centroid_bounds:u,level:e.level+1,index:e.index<<1},g={startidx:d,numprims:e.numprims-(d-e.startidx),ptr:s,isLeft:!1,bounds:c,centroid_bounds:h,level:e.level+1,index:(e.index<<1)+1};this.buildNode(p,t,n,i),this.buildNode(g,t,n,i)}e.ptr&&(e.isLeft?e.ptr.lc=s:e.ptr.rc=s)}findSahSplit(e,t,n,i){let s=-1,r=Number.POSITIVE_INFINITY,l={dim:0,split:NaN,sah:r,overlap:0},a=e.centroid_bounds.extents();if(_.dot(a,a)===0)return l;let c=[[],[],[]];c[0]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new K,count:0})),c[1]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new K,count:0})),c[2]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new K,count:0}));let u=1/e.bounds.surfaceArea(),h=e.centroid_bounds.pmin;for(let d=0;d<3;++d){let f=h.get(d),p=a.get(d),g=1/p;if(p===0)continue;for(let v=0;v<this.m_num_bins;++v)c[d][v].count=0,c[d][v].bounds=new K;for(let v=e.startidx;v<e.startidx+e.numprims;++v){let w=i[v],T=Math.min(Math.floor(this.m_num_bins*((n[w].get(d)-f)*g)),this.m_num_bins-1);c[d][T].count++,c[d][T].bounds.grow(t[w])}let x=new Array(this.m_num_bins-1),m=new K;for(let v=this.m_num_bins-1;v>0;--v)m.grow(c[d][v].bounds),x[v-1]=new K,x[v-1].pmin=m.pmin,x[v-1].pmax=m.pmax;let y=new K,b=0,M=e.numprims;for(let v=0;v<this.m_num_bins-1;++v){y.grow(c[d][v].bounds),b+=c[d][v].count,M-=c[d][v].count;let w=this.m_traversal_cost+(b*y.surfaceArea()+M*x[v].surfaceArea())*u;w<r&&(l.dim=d,s=v,l.sah=r=w)}}return s!==-1&&(l.split=h.get(l.dim)+(s+1)*(a.get(l.dim)/this.m_num_bins)),l}buildImpl(e,t){this.initNodeAllocator(2*t-1);let n=new Array(t);this.m_indices=new Array(t);for(let r=0;r<t;++r)this.m_indices[r]=r;let i=new K;for(let r=0;r<t;++r){let l=e[r].center();i.grow(l),n[r]=l}let s={startidx:0,numprims:t,ptr:null,isLeft:!1,bounds:this.m_bounds,centroid_bounds:i,level:0,index:1};this.buildNode(s,e,n,this.m_indices)}printStatistics(){console.log("Class name: Bvh"),console.log("SAH:",this.m_usesah?"enabled":"disabled"),console.log("SAH bins:",this.m_num_bins),console.log("Number of triangles:",this.m_indices.length),console.log("Number of nodes:",this.m_nodecnt),console.log("Tree height:",this.m_height)}getIndices(){return this.m_packed_indices}getNumIndices(){return this.m_packed_indices.length}};var ia=class{meshes=[];meshInstances=[];bvhRootStartIndices=[];topLevelBvh=null;curNode=0;curTriIndex=0;nodeTexWidth;nodes=[];topLevelIndex=0;processBLASNodes(e){let t=e.bounds;this.nodes[this.curNode]={bboxmin:t.pmin,bboxmax:t.pmax,LRLeaf:new _(0,0,0)};let n=this.curNode;return e.type===1?(this.nodes[this.curNode].LRLeaf.x=this.curTriIndex+e.startidx,this.nodes[this.curNode].LRLeaf.y=e.numprims,this.nodes[this.curNode].LRLeaf.z=1):(this.curNode++,this.nodes[n].LRLeaf.x=this.processBLASNodes(e.lc),this.curNode++,this.nodes[n].LRLeaf.y=this.processBLASNodes(e.rc)),n}processTLASNodes(e){let t=e.bounds;this.nodes[this.curNode]={bboxmin:t.pmin,bboxmax:t.pmax,LRLeaf:new _(0,0,0)};let n=this.curNode;if(e.type===1){if(!this.topLevelBvh)throw new Error("topLevelBvh is null");let i=this.topLevelBvh.m_packed_indices[e.startidx],s=this.meshInstances[i].meshID,r=this.meshInstances[i].materialID;this.nodes[this.curNode].LRLeaf.x=this.bvhRootStartIndices[s],this.nodes[this.curNode].LRLeaf.y=r,this.nodes[this.curNode].LRLeaf.z=-i-1}else this.curNode++,this.nodes[n].LRLeaf.x=this.processTLASNodes(e.lc),this.curNode++,this.nodes[n].LRLeaf.y=this.processTLASNodes(e.rc);return n}processBLAS(){let e=0;for(let n=0;n<this.meshes.length;n++)e+=this.meshes[n].bvh.m_nodecnt;this.topLevelIndex=e,e+=2*this.meshInstances.length,this.nodes=new Array(e);for(let n=0;n<e;++n)this.nodes[n]={bboxmin:new _(0,0,0),bboxmax:new _(0,0,0),LRLeaf:new _(0,0,0)};let t=0;this.curTriIndex=0;for(let n=0;n<this.meshes.length;n++){let i=this.meshes[n];this.curNode=t,this.bvhRootStartIndices.push(t),t+=i.bvh.m_nodecnt,this.processBLASNodes(i.bvh.m_nodes[0]),this.curTriIndex+=i.bvh.getNumIndices()}}processTLAS(){if(this.curNode=this.topLevelIndex,!this.topLevelBvh)throw new Error("topLevelBvh is null");this.processTLASNodes(this.topLevelBvh.m_nodes[0])}updateTLAS(e,t){this.topLevelBvh=e,this.meshInstances=t,this.curNode=this.topLevelIndex,this.processTLASNodes(e.m_nodes[0])}process(e,t,n){this.topLevelBvh=e,this.meshes=t,this.meshInstances=n,this.processBLAS(),this.processTLAS()}};function au(o,e,t,n=!1){let i=Ph(o,e,t,n);return i?new Uint8Array(i.data.buffer):null}function Ph(o,e,t,n=!1){let i=L.document.getElementById("textures"),s=L.document.createElement("canvas");i?.appendChild(s),s.width=e,s.height=t;let r=s.getContext("2d");return r?(n?(r.scale(1,-1),r.drawImage(o,0,-t,e,t)):r.drawImage(o,0,0,e,t),r.getImageData(0,0,e,t)):null}var X=class{x;y;z;w;constructor(e=0,t=0,n=0,i=0){e instanceof _?(this.x=e.x,this.y=e.y,this.z=e.z,this.w=t):(this.x=e,this.y=t,this.z=n,this.w=i)}get(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new RangeError("Index out of range for Vec4")}}get xyz(){return new _(this.x,this.y,this.z)}get wxy(){return new _(this.w,this.x,this.y)}toString(){return`Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`}};function Nh(o,e,t,n,i,s,r){let l=2*i,a=e-o,c=n-t,u=s-i;r[0]=l/a,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=l/c,r[6]=0,r[7]=0,r[8]=(e+o)/a,r[9]=(n+t)/c,r[10]=(-s-i)/u,r[11]=-1,r[12]=0,r[13]=0,r[14]=-l*s/u,r[15]=0}function Dh(o,e,t,n,i){let s=t*Math.tan(o*Math.PI/180),r=s*e;Nh(-r,r,-s,s,t,n,i)}function ou(o){let e=1/(_.Length(o)+1e-7);return o.scale(1/e)}function Fh(o,e,t,n){let i=ou(o.subtract(e)),s=ou(_.cross(t,i)),r=_.cross(i,s);n[0]=s.x,n[1]=r.x,n[2]=i.x,n[3]=0,n[4]=s.y,n[5]=r.y,n[6]=i.y,n[7]=0,n[8]=s.z,n[9]=r.z,n[10]=i.z,n[11]=0,n[12]=-_.dot(s,o),n[13]=-_.dot(r,o),n[14]=-_.dot(i,o),n[15]=1}var ai=class o{position;pivot;worldUp;pitch;yaw;radius;fov;focalDist;aperture;isMoving=!1;forward=new _(0,0,0);right=new _(0,0,0);up=new _(0,0,0);constructor(e,t,n){this.position=e.clone(),this.pivot=t.clone(),this.worldUp=new _(0,1,0);let i=_.normalize(this.pivot.subtract(this.position));this.pitch=Math.asin(i.y)*180/Math.PI,this.yaw=Math.atan2(i.z,i.x)*180/Math.PI,this.radius=_.distance(e,t),this.fov=n*Math.PI/180,this.focalDist=.1,this.aperture=0,this.updateCamera()}clone(){let e=new o(this.position,this.pivot,this.fov*180/Math.PI);return e.pitch=this.pitch,e.yaw=this.yaw,e.radius=this.radius,e.focalDist=this.focalDist,e.aperture=this.aperture,e.isMoving=this.isMoving,e.forward=this.forward.clone(),e.right=this.right.clone(),e.up=this.up.clone(),e}offsetOrientation(e,t){this.pitch-=t,this.yaw+=e,this.updateCamera()}strafe(e,t){let n=this.right.scale(-e).add(this.up.scale(t));this.pivot=this.pivot.add(n),this.updateCamera()}setRadius(e){this.radius+=e,this.updateCamera()}setFov(e){this.fov=e*Math.PI/180}updateCamera(){let e=this.yaw*Math.PI/180,t=this.pitch*Math.PI/180,n=new _(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t));this.forward=_.normalize(n),this.position=this.pivot.add(this.forward.scale(-this.radius)),this.right=_.normalize(_.cross(this.forward,this.worldUp)),this.up=_.normalize(_.cross(this.right,this.forward))}computeViewProjectionMatrix(e,t,n){let i=this.position.add(this.forward);Fh(this.position,i,this.up,e);let s=1/n*Math.tan(this.fov/2);Dh(s*180/Math.PI,n,.1,1e3,t)}};var Hu=1;var Wu=3,bi=0,Xu=1,Ss=2;var Ml=1;var Sl=100;var wl=204,El=205;var Al=0,Rl=1,Cl=2,as=3,Il=4,Ll=5,Pl=6,Nl=7,ja=0,Yu=1,qu=2;var Kl=1,Zl=2,Jl=3,Ql=4,ec=5,tc=6,nc=7,Dl="attached",ju="detached",ic=300,Ku=301,sc=302;var Zu=306,zn=1e3,Ht=1001,os=1002,vi=1003,rc=1004;var ac=1005;var tt=1006,oc=1007;var Ii=1008;var lc=1009;var Ct=1015,Li=1016;var cc=1023;var Ju=1028;var kn=2300,Vn=2301,Ia=2302,Fl=2303,Ul=2400,Bl=2401,Ol=2402,Qu=2500;var uc=0,ws=1,Pi=2;var hc=0;var dc="",Te="srgb",Ue="srgb-linear",Gl="linear",La="srgb";var Gn=7680;var zl=519;var Pa=35044;var pn=2e3,ls=2001;function Uh(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Bh(o){return ArrayBuffer.isView(o)&&!(o instanceof DataView)}function Na(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}var lu={},Ti=null;function kl(...o){let e="THREE."+o.shift();Ti?Ti("log",e,...o):console.log(e,...o)}function eh(o){let e=o[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=o[1];t&&t.isStackTrace?o[0]+=" "+t.getLocation():o[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return o}function re(...o){o=eh(o);let e="THREE."+o.shift();if(Ti)Ti("warn",e,...o);else{let t=o[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...o)}}function fe(...o){o=eh(o);let e="THREE."+o.shift();if(Ti)Ti("error",e,...o);else{let t=o[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...o)}}function Vl(...o){let e=o.join(" ");e in lu||(lu[e]=!0,re(...o))}var Oh={[Al]:Rl,[Cl]:Pl,[Il]:Nl,[as]:Ll,[Rl]:Al,[Pl]:Cl,[Nl]:Il,[Ll]:as},mn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}},Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cu=1234567,ss=Math.PI/180,Mi=180/Math.PI;function dt(){let o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[o&255]+Ie[o>>8&255]+Ie[o>>16&255]+Ie[o>>24&255]+"-"+Ie[e&255]+Ie[e>>8&255]+"-"+Ie[e>>16&15|64]+Ie[e>>24&255]+"-"+Ie[t&63|128]+Ie[t>>8&255]+"-"+Ie[t>>16&255]+Ie[t>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function J(o,e,t){return Math.max(e,Math.min(t,o))}function fc(o,e){return(o%e+e)%e}function Gh(o,e,t,n,i){return n+(o-e)*(i-n)/(t-e)}function zh(o,e,t){return o!==e?(t-o)/(e-o):0}function rs(o,e,t){return(1-t)*o+t*e}function kh(o,e,t,n){return rs(o,e,1-Math.exp(-t*n))}function Vh(o,e=1){return e-Math.abs(fc(o,e*2)-e)}function $h(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*(3-2*o))}function Hh(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*o*(o*(o*6-15)+10))}function Wh(o,e){return o+Math.floor(Math.random()*(e-o+1))}function Xh(o,e){return o+Math.random()*(e-o)}function Yh(o){return o*(.5-Math.random())}function qh(o){o!==void 0&&(cu=o);let e=cu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function jh(o){return o*ss}function Kh(o){return o*Mi}function Zh(o){return(o&o-1)===0&&o!==0}function Jh(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function Qh(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function ed(o,e,t,n,i){let s=Math.cos,r=Math.sin,l=s(t/2),a=r(t/2),c=s((e+n)/2),u=r((e+n)/2),h=s((e-n)/2),d=r((e-n)/2),f=s((n-e)/2),p=r((n-e)/2);switch(i){case"XYX":o.set(l*u,a*h,a*d,l*c);break;case"YZY":o.set(a*d,l*u,a*h,l*c);break;case"ZXZ":o.set(a*h,a*d,l*u,l*c);break;case"XZX":o.set(l*u,a*p,a*f,l*c);break;case"YXY":o.set(a*f,l*u,a*p,l*c);break;case"ZYZ":o.set(a*p,a*f,l*u,l*c);break;default:re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ht(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function le(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}var pc={DEG2RAD:ss,RAD2DEG:Mi,generateUUID:dt,clamp:J,euclideanModulo:fc,mapLinear:Gh,inverseLerp:zh,lerp:rs,damp:kh,pingpong:Vh,smoothstep:$h,smootherstep:Hh,randInt:Wh,randFloat:Xh,randFloatSpread:Yh,seededRandom:qh,degToRad:jh,radToDeg:Kh,isPowerOfTwo:Zh,ceilPowerOfTwo:Jh,floorPowerOfTwo:Qh,setQuaternionFromProperEuler:ed,normalize:le,denormalize:ht},ue=class o{static{o.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=J(this.x,e.x,t.x),this.y=J(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=J(this.x,e,t),this.y=J(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(J(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(J(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},je=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,l){let a=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=s[r+0],f=s[r+1],p=s[r+2],g=s[r+3];if(h!==g||a!==d||c!==f||u!==p){let x=a*d+c*f+u*p+h*g;x<0&&(d=-d,f=-f,p=-p,g=-g,x=-x);let m=1-l;if(x<.9995){let y=Math.acos(x),b=Math.sin(y);m=Math.sin(m*y)/b,l=Math.sin(l*y)/b,a=a*m+d*l,c=c*m+f*l,u=u*m+p*l,h=h*m+g*l}else{a=a*m+d*l,c=c*m+f*l,u=u*m+p*l,h=h*m+g*l;let y=1/Math.sqrt(a*a+c*c+u*u+h*h);a*=y,c*=y,u*=y,h*=y}}e[t]=a,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,r){let l=n[i],a=n[i+1],c=n[i+2],u=n[i+3],h=s[r],d=s[r+1],f=s[r+2],p=s[r+3];return e[t]=l*p+u*h+a*f-c*d,e[t+1]=a*p+u*d+c*h-l*f,e[t+2]=c*p+u*f+l*d-a*h,e[t+3]=u*p-l*h-a*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,r=e._order,l=Math.cos,a=Math.sin,c=l(n/2),u=l(i/2),h=l(s/2),d=a(n/2),f=a(i/2),p=a(s/2);switch(r){case"XYZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"YXZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"ZXY":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"ZYX":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"YZX":this._x=d*u*h+c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h-d*f*p;break;case"XZY":this._x=d*u*h-c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h+d*f*p;break;default:re("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],l=t[5],a=t[9],c=t[2],u=t[6],h=t[10],d=n+l+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-a)*f,this._y=(s-c)*f,this._z=(r-i)*f}else if(n>l&&n>h){let f=2*Math.sqrt(1+n-l-h);this._w=(u-a)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+c)/f}else if(l>h){let f=2*Math.sqrt(1+l-n-h);this._w=(s-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(a+u)/f}else{let f=2*Math.sqrt(1+h-n-l);this._w=(r-i)/f,this._x=(s+c)/f,this._y=(a+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(J(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,l=t._x,a=t._y,c=t._z,u=t._w;return this._x=n*u+r*l+i*c-s*a,this._y=i*u+r*a+s*l-n*c,this._z=s*u+r*c+n*a-i*l,this._w=r*u-n*l-i*a-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,l=this.dot(e);l<0&&(n=-n,i=-i,s=-s,r=-r,l=-l);let a=1-t;if(l<.9995){let c=Math.acos(l),u=Math.sin(c);a=Math.sin(a*c)/u,t=Math.sin(t*c)/u,this._x=this._x*a+n*t,this._y=this._y*a+i*t,this._z=this._z*a+s*t,this._w=this._w*a+r*t,this._onChangeCallback()}else this._x=this._x*a+n*t,this._y=this._y*a+i*t,this._z=this._z*a+s*t,this._w=this._w*a+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class o{static{o.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(uu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(uu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,l=e.z,a=e.w,c=2*(r*i-l*n),u=2*(l*t-s*i),h=2*(s*n-r*t);return this.x=t+a*c+r*h-l*u,this.y=n+a*u+l*c-s*h,this.z=i+a*h+s*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=J(this.x,e.x,t.x),this.y=J(this.y,e.y,t.y),this.z=J(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=J(this.x,e,t),this.y=J(this.y,e,t),this.z=J(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(J(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,r=t.x,l=t.y,a=t.z;return this.x=i*a-s*l,this.y=s*r-n*a,this.z=n*l-i*r,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zo.copy(this).projectOnVector(e),this.sub(Zo)}reflect(e){return this.sub(Zo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(J(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Zo=new A,uu=new je,Y=class o{static{o.prototype.isMatrix3=!0}constructor(e,t,n,i,s,r,l,a,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,l,a,c)}set(e,t,n,i,s,r,l,a,c){let u=this.elements;return u[0]=e,u[1]=i,u[2]=l,u[3]=t,u[4]=s,u[5]=a,u[6]=n,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],l=n[3],a=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],p=n[8],g=i[0],x=i[3],m=i[6],y=i[1],b=i[4],M=i[7],v=i[2],w=i[5],T=i[8];return s[0]=r*g+l*y+a*v,s[3]=r*x+l*b+a*w,s[6]=r*m+l*M+a*T,s[1]=c*g+u*y+h*v,s[4]=c*x+u*b+h*w,s[7]=c*m+u*M+h*T,s[2]=d*g+f*y+p*v,s[5]=d*x+f*b+p*w,s[8]=d*m+f*M+p*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],l=e[5],a=e[6],c=e[7],u=e[8];return t*r*u-t*l*c-n*s*u+n*l*a+i*s*c-i*r*a}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],l=e[5],a=e[6],c=e[7],u=e[8],h=u*r-l*c,d=l*a-u*s,f=c*s-r*a,p=t*h+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/p;return e[0]=h*g,e[1]=(i*c-u*n)*g,e[2]=(l*n-i*r)*g,e[3]=d*g,e[4]=(u*t-i*a)*g,e[5]=(i*s-l*t)*g,e[6]=f*g,e[7]=(n*a-c*t)*g,e[8]=(r*t-n*s)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,l){let a=Math.cos(s),c=Math.sin(s);return this.set(n*a,n*c,-n*(a*r+c*l)+r+e,-i*c,i*a,-i*(-c*r+a*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(Jo.makeScale(e,t)),this}rotate(e){return this.premultiply(Jo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Jo=new Y,hu=new Y().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),du=new Y().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function td(){let o={enabled:!0,workingColorSpace:Ue,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===La&&(i.r=Wt(i.r),i.g=Wt(i.g),i.b=Wt(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===La&&(i.r=yi(i.r),i.g=yi(i.g),i.b=yi(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===dc?Gl:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Vl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Vl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return o.define({[Ue]:{primaries:e,whitePoint:n,transfer:Gl,toXYZ:hu,fromXYZ:du,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Te},outputColorSpaceConfig:{drawingBufferColorSpace:Te}},[Te]:{primaries:e,whitePoint:n,transfer:La,toXYZ:hu,fromXYZ:du,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Te}}}),o}var Fe=td();function Wt(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function yi(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}var oi,Da=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{oi===void 0&&(oi=Na("canvas")),oi.width=e.width,oi.height=e.height;let i=oi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=oi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Na("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Wt(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Wt(t[n]/255)*255):t[n]=Wt(t[n]);return{data:t,width:e.width,height:e.height}}else return re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},nd=0,Fa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=dt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,l=i.length;r<l;r++)i[r].isDataTexture?s.push(Qo(i[r].image)):s.push(Qo(i[r]))}else s=Qo(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Qo(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Da.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(re("Texture: Unable to serialize Texture."),{})}var id=0,el=new A,ft=class o extends mn{constructor(e=o.DEFAULT_IMAGE,t=o.DEFAULT_MAPPING,n=Ht,i=Ht,s=tt,r=Ii,l=cc,a=lc,c=o.DEFAULT_ANISOTROPY,u=dc){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=dt(),this.name="",this.source=new Fa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=a,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Y,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(el).x}get height(){return this.source.getSize(el).y}get depth(){return this.source.getSize(el).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){re(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ic)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zn:e.x=e.x-Math.floor(e.x);break;case Ht:e.x=e.x<0?0:1;break;case os:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zn:e.y=e.y-Math.floor(e.y);break;case Ht:e.y=e.y<0?0:1;break;case os:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ft.DEFAULT_IMAGE=null;ft.DEFAULT_MAPPING=ic;ft.DEFAULT_ANISOTROPY=1;var nt=class o{static{o.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,a=e.elements,c=a[0],u=a[4],h=a[8],d=a[1],f=a[5],p=a[9],g=a[2],x=a[6],m=a[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(p-x)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(p+x)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,M=(f+1)/2,v=(m+1)/2,w=(u+d)/4,T=(h+g)/4,S=(p+x)/4;return b>M&&b>v?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=w/n,s=T/n):M>v?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=w/i,s=S/i):v<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(v),n=T/s,i=S/s),this.set(n,i,s,t),this}let y=Math.sqrt((x-p)*(x-p)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(x-p)/y,this.y=(h-g)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=J(this.x,e.x,t.x),this.y=J(this.y,e.y,t.y),this.z=J(this.z,e.z,t.z),this.w=J(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=J(this.x,e,t),this.y=J(this.y,e,t),this.z=J(this.z,e,t),this.w=J(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(J(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var te=class o{static{o.prototype.isMatrix4=!0}constructor(e,t,n,i,s,r,l,a,c,u,h,d,f,p,g,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,l,a,c,u,h,d,f,p,g,x)}set(e,t,n,i,s,r,l,a,c,u,h,d,f,p,g,x){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=r,m[9]=l,m[13]=a,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=p,m[11]=g,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new o().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,i=1/li.setFromMatrixColumn(e,0).length(),s=1/li.setFromMatrixColumn(e,1).length(),r=1/li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),l=Math.sin(n),a=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=r*u,f=r*h,p=l*u,g=l*h;t[0]=a*u,t[4]=-a*h,t[8]=c,t[1]=f+p*c,t[5]=d-g*c,t[9]=-l*a,t[2]=g-d*c,t[6]=p+f*c,t[10]=r*a}else if(e.order==="YXZ"){let d=a*u,f=a*h,p=c*u,g=c*h;t[0]=d+g*l,t[4]=p*l-f,t[8]=r*c,t[1]=r*h,t[5]=r*u,t[9]=-l,t[2]=f*l-p,t[6]=g+d*l,t[10]=r*a}else if(e.order==="ZXY"){let d=a*u,f=a*h,p=c*u,g=c*h;t[0]=d-g*l,t[4]=-r*h,t[8]=p+f*l,t[1]=f+p*l,t[5]=r*u,t[9]=g-d*l,t[2]=-r*c,t[6]=l,t[10]=r*a}else if(e.order==="ZYX"){let d=r*u,f=r*h,p=l*u,g=l*h;t[0]=a*u,t[4]=p*c-f,t[8]=d*c+g,t[1]=a*h,t[5]=g*c+d,t[9]=f*c-p,t[2]=-c,t[6]=l*a,t[10]=r*a}else if(e.order==="YZX"){let d=r*a,f=r*c,p=l*a,g=l*c;t[0]=a*u,t[4]=g-d*h,t[8]=p*h+f,t[1]=h,t[5]=r*u,t[9]=-l*u,t[2]=-c*u,t[6]=f*h+p,t[10]=d-g*h}else if(e.order==="XZY"){let d=r*a,f=r*c,p=l*a,g=l*c;t[0]=a*u,t[4]=-h,t[8]=c*u,t[1]=d*h+g,t[5]=r*u,t[9]=f*h-p,t[2]=p*h-f,t[6]=l*u,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sd,e,rd)}lookAt(e,t,n){let i=this.elements;return Ye.subVectors(e,t),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),on.crossVectors(n,Ye),on.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),on.crossVectors(n,Ye)),on.normalize(),sa.crossVectors(Ye,on),i[0]=on.x,i[4]=sa.x,i[8]=Ye.x,i[1]=on.y,i[5]=sa.y,i[9]=Ye.y,i[2]=on.z,i[6]=sa.z,i[10]=Ye.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],l=n[4],a=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],p=n[2],g=n[6],x=n[10],m=n[14],y=n[3],b=n[7],M=n[11],v=n[15],w=i[0],T=i[4],S=i[8],E=i[12],I=i[1],N=i[5],D=i[9],G=i[13],U=i[2],R=i[6],H=i[10],P=i[14],ne=i[3],B=i[7],F=i[11],ae=i[15];return s[0]=r*w+l*I+a*U+c*ne,s[4]=r*T+l*N+a*R+c*B,s[8]=r*S+l*D+a*H+c*F,s[12]=r*E+l*G+a*P+c*ae,s[1]=u*w+h*I+d*U+f*ne,s[5]=u*T+h*N+d*R+f*B,s[9]=u*S+h*D+d*H+f*F,s[13]=u*E+h*G+d*P+f*ae,s[2]=p*w+g*I+x*U+m*ne,s[6]=p*T+g*N+x*R+m*B,s[10]=p*S+g*D+x*H+m*F,s[14]=p*E+g*G+x*P+m*ae,s[3]=y*w+b*I+M*U+v*ne,s[7]=y*T+b*N+M*R+v*B,s[11]=y*S+b*D+M*H+v*F,s[15]=y*E+b*G+M*P+v*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],l=e[5],a=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],p=e[3],g=e[7],x=e[11],m=e[15],y=a*f-c*d,b=l*f-c*h,M=l*d-a*h,v=r*f-c*u,w=r*d-a*u,T=r*h-l*u;return t*(g*y-x*b+m*M)-n*(p*y-x*v+m*w)+i*(p*b-g*v+m*T)-s*(p*M-g*w+x*T)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],l=e[5],a=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],p=e[12],g=e[13],x=e[14],m=e[15],y=t*l-n*r,b=t*a-i*r,M=t*c-s*r,v=n*a-i*l,w=n*c-s*l,T=i*c-s*a,S=u*g-h*p,E=u*x-d*p,I=u*m-f*p,N=h*x-d*g,D=h*m-f*g,G=d*m-f*x,U=y*G-b*D+M*N+v*I-w*E+T*S;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/U;return e[0]=(l*G-a*D+c*N)*R,e[1]=(i*D-n*G-s*N)*R,e[2]=(g*T-x*w+m*v)*R,e[3]=(d*w-h*T-f*v)*R,e[4]=(a*I-r*G-c*E)*R,e[5]=(t*G-i*I+s*E)*R,e[6]=(x*M-p*T-m*b)*R,e[7]=(u*T-d*M+f*b)*R,e[8]=(r*D-l*I+c*S)*R,e[9]=(n*I-t*D-s*S)*R,e[10]=(p*w-g*M+m*y)*R,e[11]=(h*M-u*w-f*y)*R,e[12]=(l*E-r*N-a*S)*R,e[13]=(t*N-n*E+i*S)*R,e[14]=(g*b-p*v-x*y)*R,e[15]=(u*v-h*b+d*y)*R,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,l=e.y,a=e.z,c=s*r,u=s*l;return this.set(c*r+n,c*l-i*a,c*a+i*l,0,c*l+i*a,u*l+n,u*a-i*r,0,c*a-i*l,u*a+i*r,s*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,r=t._y,l=t._z,a=t._w,c=s+s,u=r+r,h=l+l,d=s*c,f=s*u,p=s*h,g=r*u,x=r*h,m=l*h,y=a*c,b=a*u,M=a*h,v=n.x,w=n.y,T=n.z;return i[0]=(1-(g+m))*v,i[1]=(f+M)*v,i[2]=(p-b)*v,i[3]=0,i[4]=(f-M)*w,i[5]=(1-(d+m))*w,i[6]=(x+y)*w,i[7]=0,i[8]=(p+b)*T,i[9]=(x-y)*T,i[10]=(1-(d+g))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let r=li.set(i[0],i[1],i[2]).length(),l=li.set(i[4],i[5],i[6]).length(),a=li.set(i[8],i[9],i[10]).length();s<0&&(r=-r),lt.copy(this);let c=1/r,u=1/l,h=1/a;return lt.elements[0]*=c,lt.elements[1]*=c,lt.elements[2]*=c,lt.elements[4]*=u,lt.elements[5]*=u,lt.elements[6]*=u,lt.elements[8]*=h,lt.elements[9]*=h,lt.elements[10]*=h,t.setFromRotationMatrix(lt),n.x=r,n.y=l,n.z=a,this}makePerspective(e,t,n,i,s,r,l=pn,a=!1){let c=this.elements,u=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,g;if(a)p=s/(r-s),g=r*s/(r-s);else if(l===pn)p=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(l===ls)p=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,r,l=pn,a=!1){let c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,g;if(a)p=1/(r-s),g=r/(r-s);else if(l===pn)p=-2/(r-s),g=-(r+s)/(r-s);else if(l===ls)p=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},li=new A,lt=new te,sd=new A(0,0,0),rd=new A(1,1,1),on=new A,sa=new A,Ye=new A,fu=new te,pu=new je,gn=class o{constructor(e=0,t=0,n=0,i=o.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],r=i[4],l=i[8],a=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(J(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-J(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,f),this._z=Math.atan2(a,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(J(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(a,s));break;case"ZYX":this._y=Math.asin(-J(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(a,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(J(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(l,f));break;case"XZY":this._z=Math.asin(-J(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pu.setFromEuler(this),this.setFromQuaternion(pu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gn.DEFAULT_ORDER="XYZ";var Ua=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ad=0,mu=new A,ci=new je,Ut=new te,ra=new A,Ki=new A,od=new A,ld=new je,gu=new A(1,0,0),xu=new A(0,1,0),_u=new A(0,0,1),yu={type:"added"},cd={type:"removed"},ui={type:"childadded",child:null},tl={type:"childremoved",child:null},_e=class o extends mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=dt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=o.DEFAULT_UP.clone();let e=new A,t=new gn,n=new je,i=new A(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new te},normalMatrix:{value:new Y}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=o.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=o.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ua,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.multiply(ci),this}rotateOnWorldAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.premultiply(ci),this}rotateX(e){return this.rotateOnAxis(gu,e)}rotateY(e){return this.rotateOnAxis(xu,e)}rotateZ(e){return this.rotateOnAxis(_u,e)}translateOnAxis(e,t){return mu.copy(e).applyQuaternion(this.quaternion),this.position.add(mu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gu,e)}translateY(e){return this.translateOnAxis(xu,e)}translateZ(e){return this.translateOnAxis(_u,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ut.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ra.copy(e):ra.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ut.lookAt(Ki,ra,this.up):Ut.lookAt(ra,Ki,this.up),this.quaternion.setFromRotationMatrix(Ut),i&&(Ut.extractRotation(i.matrixWorld),ci.setFromRotationMatrix(Ut),this.quaternion.premultiply(ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yu),ui.child=e,this.dispatchEvent(ui),ui.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cd),tl.child=e,this.dispatchEvent(tl),tl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ut.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ut.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ut),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yu),ui.child=e,this.dispatchEvent(ui),ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,e,od),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,ld,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(l=>({...l})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(l,a){return l[a.uuid]===void 0&&(l[a.uuid]=a.toJSON(e)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let a=l.shapes;if(Array.isArray(a))for(let c=0,u=a.length;c<u;c++){let h=a[c];s(e.shapes,h)}else s(e.shapes,a)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let a=0,c=this.material.length;a<c;a++)l.push(s(e.materials,this.material[a]));i.material=l}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let l=0;l<this.children.length;l++)i.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let l=0;l<this.animations.length;l++){let a=this.animations[l];i.animations.push(s(e.animations,a))}}if(t){let l=r(e.geometries),a=r(e.materials),c=r(e.textures),u=r(e.images),h=r(e.shapes),d=r(e.skeletons),f=r(e.animations),p=r(e.nodes);l.length>0&&(n.geometries=l),a.length>0&&(n.materials=a),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(l){let a=[];for(let c in l){let u=l[c];delete u.metadata,a.push(u)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};_e.DEFAULT_UP=new A(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xt=class extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}};var th={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ln={h:0,s:0,l:0},aa={h:0,s:0,l:0};function nl(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?o+(e-o)*6*t:t<1/2?e:t<2/3?o+(e-o)*6*(2/3-t):o}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Te){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Fe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Fe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Fe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Fe.workingColorSpace){if(e=fc(e,1),t=J(t,0,1),n=J(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=nl(r,s,e+1/3),this.g=nl(r,s,e),this.b=nl(r,s,e-1/3)}return Fe.colorSpaceToWorking(this,i),this}setStyle(e,t=Te){function n(s){s!==void 0&&parseFloat(s)<1&&re("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,r=i[1],l=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:re("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Te){let n=th[e.toLowerCase()];return n!==void 0?this.setHex(n,t):re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wt(e.r),this.g=Wt(e.g),this.b=Wt(e.b),this}copyLinearToSRGB(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Te){return Fe.workingToColorSpace(Le.copy(this),e),Math.round(J(Le.r*255,0,255))*65536+Math.round(J(Le.g*255,0,255))*256+Math.round(J(Le.b*255,0,255))}getHexString(e=Te){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Fe.workingColorSpace){Fe.workingToColorSpace(Le.copy(this),t);let n=Le.r,i=Le.g,s=Le.b,r=Math.max(n,i,s),l=Math.min(n,i,s),a,c,u=(l+r)/2;if(l===r)a=0,c=0;else{let h=r-l;switch(c=u<=.5?h/(r+l):h/(2-r-l),r){case n:a=(i-s)/h+(i<s?6:0);break;case i:a=(s-n)/h+2;break;case s:a=(n-i)/h+4;break}a/=6}return e.h=a,e.s=c,e.l=u,e}getRGB(e,t=Fe.workingColorSpace){return Fe.workingToColorSpace(Le.copy(this),t),e.r=Le.r,e.g=Le.g,e.b=Le.b,e}getStyle(e=Te){Fe.workingToColorSpace(Le.copy(this),e);let t=Le.r,n=Le.g,i=Le.b;return e!==Te?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ln),this.setHSL(ln.h+e,ln.s+t,ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ln),e.getHSL(aa);let n=rs(ln.h,aa.h,t),i=rs(ln.s,aa.s,t),s=rs(ln.l,aa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Le=new q;q.NAMES=th;var ct=new A,Bt=new A,il=new A,Ot=new A,hi=new A,di=new A,bu=new A,sl=new A,rl=new A,al=new A,ol=new nt,ll=new nt,cl=new nt,fn=class o{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ct.subVectors(e,t),i.cross(ct);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ct.subVectors(i,t),Bt.subVectors(n,t),il.subVectors(e,t);let r=ct.dot(ct),l=ct.dot(Bt),a=ct.dot(il),c=Bt.dot(Bt),u=Bt.dot(il),h=r*c-l*l;if(h===0)return s.set(0,0,0),null;let d=1/h,f=(c*a-l*u)*d,p=(r*u-l*a)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ot)===null?!1:Ot.x>=0&&Ot.y>=0&&Ot.x+Ot.y<=1}static getInterpolation(e,t,n,i,s,r,l,a){return this.getBarycoord(e,t,n,i,Ot)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(s,Ot.x),a.addScaledVector(r,Ot.y),a.addScaledVector(l,Ot.z),a)}static getInterpolatedAttribute(e,t,n,i,s,r){return ol.setScalar(0),ll.setScalar(0),cl.setScalar(0),ol.fromBufferAttribute(e,t),ll.fromBufferAttribute(e,n),cl.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(ol,s.x),r.addScaledVector(ll,s.y),r.addScaledVector(cl,s.z),r}static isFrontFacing(e,t,n,i){return ct.subVectors(n,t),Bt.subVectors(e,t),ct.cross(Bt).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ct.subVectors(this.c,this.b),Bt.subVectors(this.a,this.b),ct.cross(Bt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return o.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return o.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return o.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return o.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return o.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,r,l;hi.subVectors(i,n),di.subVectors(s,n),sl.subVectors(e,n);let a=hi.dot(sl),c=di.dot(sl);if(a<=0&&c<=0)return t.copy(n);rl.subVectors(e,i);let u=hi.dot(rl),h=di.dot(rl);if(u>=0&&h<=u)return t.copy(i);let d=a*h-u*c;if(d<=0&&a>=0&&u<=0)return r=a/(a-u),t.copy(n).addScaledVector(hi,r);al.subVectors(e,s);let f=hi.dot(al),p=di.dot(al);if(p>=0&&f<=p)return t.copy(s);let g=f*c-a*p;if(g<=0&&c>=0&&p<=0)return l=c/(c-p),t.copy(n).addScaledVector(di,l);let x=u*p-f*h;if(x<=0&&h-u>=0&&f-p>=0)return bu.subVectors(s,i),l=(h-u)/(h-u+(f-p)),t.copy(i).addScaledVector(bu,l);let m=1/(x+g+d);return r=g*m,l=d*m,t.copy(n).addScaledVector(hi,r).addScaledVector(di,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ke=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ut.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ut.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ut.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,l=s.count;r<l;r++)e.isMesh===!0?e.getVertexPosition(r,ut):ut.fromBufferAttribute(s,r),ut.applyMatrix4(e.matrixWorld),this.expandByPoint(ut);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oa.copy(n.boundingBox)),oa.applyMatrix4(e.matrixWorld),this.union(oa)}let i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ut),ut.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zi),la.subVectors(this.max,Zi),fi.subVectors(e.a,Zi),pi.subVectors(e.b,Zi),mi.subVectors(e.c,Zi),cn.subVectors(pi,fi),un.subVectors(mi,pi),Fn.subVectors(fi,mi);let t=[0,-cn.z,cn.y,0,-un.z,un.y,0,-Fn.z,Fn.y,cn.z,0,-cn.x,un.z,0,-un.x,Fn.z,0,-Fn.x,-cn.y,cn.x,0,-un.y,un.x,0,-Fn.y,Fn.x,0];return!ul(t,fi,pi,mi,la)||(t=[1,0,0,0,1,0,0,0,1],!ul(t,fi,pi,mi,la))?!1:(ca.crossVectors(cn,un),t=[ca.x,ca.y,ca.z],ul(t,fi,pi,mi,la))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ut).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ut).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Gt=[new A,new A,new A,new A,new A,new A,new A,new A],ut=new A,oa=new Ke,fi=new A,pi=new A,mi=new A,cn=new A,un=new A,Fn=new A,Zi=new A,la=new A,ca=new A,Un=new A;function ul(o,e,t,n,i){for(let s=0,r=o.length-3;s<=r;s+=3){Un.fromArray(o,s);let l=i.x*Math.abs(Un.x)+i.y*Math.abs(Un.y)+i.z*Math.abs(Un.z),a=e.dot(Un),c=t.dot(Un),u=n.dot(Un);if(Math.max(-Math.max(a,c,u),Math.min(a,c,u))>l)return!1}return!0}var $t=ud();function ud(){let o=new ArrayBuffer(4),e=new Float32Array(o),t=new Uint32Array(o),n=new Uint32Array(512),i=new Uint32Array(512);for(let a=0;a<256;++a){let c=a-127;c<-27?(n[a]=0,n[a|256]=32768,i[a]=24,i[a|256]=24):c<-14?(n[a]=1024>>-c-14,n[a|256]=1024>>-c-14|32768,i[a]=-c-1,i[a|256]=-c-1):c<=15?(n[a]=c+15<<10,n[a|256]=c+15<<10|32768,i[a]=13,i[a|256]=13):c<128?(n[a]=31744,n[a|256]=64512,i[a]=24,i[a|256]=24):(n[a]=31744,n[a|256]=64512,i[a]=13,i[a|256]=13)}let s=new Uint32Array(2048),r=new Uint32Array(64),l=new Uint32Array(64);for(let a=1;a<1024;++a){let c=a<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[a]=c|u}for(let a=1024;a<2048;++a)s[a]=939524096+(a-1024<<13);for(let a=1;a<31;++a)r[a]=a<<23;r[31]=1199570944,r[32]=2147483648;for(let a=33;a<63;++a)r[a]=2147483648+(a-32<<23);r[63]=3347054592;for(let a=1;a<64;++a)a!==32&&(l[a]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:r,offsetTable:l}}function hd(o){Math.abs(o)>65504&&re("DataUtils.toHalfFloat(): Value out of range."),o=J(o,-65504,65504),$t.floatView[0]=o;let e=$t.uint32View[0],t=e>>23&511;return $t.baseTable[t]+((e&8388607)>>$t.shiftTable[t])}function dd(o){let e=o>>10;return $t.uint32View[0]=$t.mantissaTable[$t.offsetTable[e]+(o&1023)]+$t.exponentTable[e],$t.floatView[0]}var xn=class{static toHalfFloat(e){return hd(e)}static fromHalfFloat(e){return dd(e)}},ve=new A,ua=new ue,fd=0,Pe=class extends mn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pa,this.updateRanges=[],this.gpuType=Ct,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ua.fromBufferAttribute(this,t),ua.applyMatrix3(e),this.setXY(t,ua.x,ua.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ve.fromBufferAttribute(this,t),ve.applyMatrix3(e),this.setXYZ(t,ve.x,ve.y,ve.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ve.fromBufferAttribute(this,t),ve.applyMatrix4(e),this.setXYZ(t,ve.x,ve.y,ve.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ve.fromBufferAttribute(this,t),ve.applyNormalMatrix(e),this.setXYZ(t,ve.x,ve.y,ve.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ve.fromBufferAttribute(this,t),ve.transformDirection(e),this.setXYZ(t,ve.x,ve.y,ve.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ht(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=le(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ht(t,this.array)),t}setX(e,t){return this.normalized&&(t=le(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ht(t,this.array)),t}setY(e,t){return this.normalized&&(t=le(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ht(t,this.array)),t}setZ(e,t){return this.normalized&&(t=le(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ht(t,this.array)),t}setW(e,t){return this.normalized&&(t=le(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=le(t,this.array),n=le(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=le(t,this.array),n=le(n,this.array),i=le(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=le(t,this.array),n=le(n,this.array),i=le(i,this.array),s=le(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pa&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ba=class extends Pe{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Oa=class extends Pe{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ze=class extends Pe{constructor(e,t,n){super(new Float32Array(e),t,n)}},pd=new Ke,Ji=new A,hl=new A,ke=class{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):pd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ji.subVectors(e,this.center);let t=Ji.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ji,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ji.copy(e.center).add(hl)),this.expandByPoint(Ji.copy(e.center).sub(hl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},md=0,et=new te,dl=new _e,gi=new A,qe=new Ke,Qi=new Ke,Ee=new A,it=class o extends mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=dt(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uh(e)?Oa:Ba)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Y().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return et.makeRotationFromQuaternion(e),this.applyMatrix4(et),this}rotateX(e){return et.makeRotationX(e),this.applyMatrix4(et),this}rotateY(e){return et.makeRotationY(e),this.applyMatrix4(et),this}rotateZ(e){return et.makeRotationZ(e),this.applyMatrix4(et),this}translate(e,t,n){return et.makeTranslation(e,t,n),this.applyMatrix4(et),this}scale(e,t,n){return et.makeScale(e,t,n),this.applyMatrix4(et),this}lookAt(e){return dl.lookAt(e),dl.updateMatrix(),this.applyMatrix4(dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ze(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ke);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];qe.setFromBufferAttribute(s),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ke);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){let n=this.boundingSphere.center;if(qe.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let l=t[s];Qi.setFromBufferAttribute(l),this.morphTargetsRelative?(Ee.addVectors(qe.min,Qi.min),qe.expandByPoint(Ee),Ee.addVectors(qe.max,Qi.max),qe.expandByPoint(Ee)):(qe.expandByPoint(Qi.min),qe.expandByPoint(Qi.max))}qe.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Ee.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ee));if(t)for(let s=0,r=t.length;s<r;s++){let l=t[s],a=this.morphTargetsRelative;for(let c=0,u=l.count;c<u;c++)Ee.fromBufferAttribute(l,c),a&&(gi.fromBufferAttribute(e,c),Ee.add(gi)),i=Math.max(i,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),l=[],a=[];for(let S=0;S<n.count;S++)l[S]=new A,a[S]=new A;let c=new A,u=new A,h=new A,d=new ue,f=new ue,p=new ue,g=new A,x=new A;function m(S,E,I){c.fromBufferAttribute(n,S),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,I),d.fromBufferAttribute(s,S),f.fromBufferAttribute(s,E),p.fromBufferAttribute(s,I),u.sub(c),h.sub(c),f.sub(d),p.sub(d);let N=1/(f.x*p.y-p.x*f.y);isFinite(N)&&(g.copy(u).multiplyScalar(p.y).addScaledVector(h,-f.y).multiplyScalar(N),x.copy(h).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(N),l[S].add(g),l[E].add(g),l[I].add(g),a[S].add(x),a[E].add(x),a[I].add(x))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let S=0,E=y.length;S<E;++S){let I=y[S],N=I.start,D=I.count;for(let G=N,U=N+D;G<U;G+=3)m(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let b=new A,M=new A,v=new A,w=new A;function T(S){v.fromBufferAttribute(i,S),w.copy(v);let E=l[S];b.copy(E),b.sub(v.multiplyScalar(v.dot(E))).normalize(),M.crossVectors(w,E);let N=M.dot(a[S])<0?-1:1;r.setXYZW(S,b.x,b.y,b.z,N)}for(let S=0,E=y.length;S<E;++S){let I=y[S],N=I.start,D=I.count;for(let G=N,U=N+D;G<U;G+=3)T(e.getX(G+0)),T(e.getX(G+1)),T(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new A,s=new A,r=new A,l=new A,a=new A,c=new A,u=new A,h=new A;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),g=e.getX(d+1),x=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),u.subVectors(r,s),h.subVectors(i,s),u.cross(h),l.fromBufferAttribute(n,p),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.add(u),a.add(u),c.add(u),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),u.subVectors(r,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ee.fromBufferAttribute(e,t),Ee.normalize(),e.setXYZ(t,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function e(l,a){let c=l.array,u=l.itemSize,h=l.normalized,d=new c.constructor(a.length*u),f=0,p=0;for(let g=0,x=a.length;g<x;g++){l.isInterleavedBufferAttribute?f=a[g]*l.data.stride+l.offset:f=a[g]*u;for(let m=0;m<u;m++)d[p++]=c[f++]}return new Pe(d,u,h)}if(this.index===null)return re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new o,n=this.index.array,i=this.attributes;for(let l in i){let a=i[l],c=e(a,n);t.setAttribute(l,c)}let s=this.morphAttributes;for(let l in s){let a=[],c=s[l];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);a.push(f)}t.morphAttributes[l]=a}t.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let l=0,a=r.length;l<a;l++){let c=r[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let a=this.parameters;for(let c in a)a[c]!==void 0&&(e[c]=a[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let a in n){let c=n[a];e.data.attributes[a]=c.toJSON(e.data)}let i={},s=!1;for(let a in this.morphAttributes){let c=this.morphAttributes[a],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[a]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));let l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let r=e.groups;for(let c=0,u=r.length;c<u;c++){let h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}let l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());let a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Si=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pa,this.updateRanges=[],this.version=0,this.uuid=dt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},De=new A,wi=class o{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)De.fromBufferAttribute(this,t),De.applyMatrix4(e),this.setXYZ(t,De.x,De.y,De.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)De.fromBufferAttribute(this,t),De.applyNormalMatrix(e),this.setXYZ(t,De.x,De.y,De.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)De.fromBufferAttribute(this,t),De.transformDirection(e),this.setXYZ(t,De.x,De.y,De.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ht(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=le(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=le(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=le(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=le(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=le(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ht(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ht(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ht(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ht(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=le(t,this.array),n=le(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=le(t,this.array),n=le(n,this.array),i=le(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=le(t,this.array),n=le(n,this.array),i=le(i,this.array),s=le(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){kl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Pe(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new o(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){kl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},gd=0,Be=class extends mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=dt(),this.name="",this.type="Material",this.blending=Ml,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wl,this.blendDst=El,this.blendEquation=Sl,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gn,this.stencilZFail=Gn,this.stencilZPass=Gn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){re(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ml&&(n.blending=this.blending),this.side!==bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wl&&(n.blendSrc=this.blendSrc),this.blendDst!==El&&(n.blendDst=this.blendDst),this.blendEquation!==Sl&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==as&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let r=[];for(let l in s){let a=s[l];delete a.metadata,r.push(a)}return r}if(t){let s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var zt=new A,fl=new A,ha=new A,hn=new A,pl=new A,da=new A,ml=new A,$n=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zt.copy(this.origin).addScaledVector(this.direction,t),zt.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fl.copy(e).add(t).multiplyScalar(.5),ha.copy(t).sub(e).normalize(),hn.copy(this.origin).sub(fl);let s=e.distanceTo(t)*.5,r=-this.direction.dot(ha),l=hn.dot(this.direction),a=-hn.dot(ha),c=hn.lengthSq(),u=Math.abs(1-r*r),h,d,f,p;if(u>0)if(h=r*a-l,d=r*l-a,p=s*u,h>=0)if(d>=-p)if(d<=p){let g=1/u;h*=g,d*=g,f=h*(h+r*d+2*l)+d*(r*h+d+2*a)+c}else d=s,h=Math.max(0,-(r*d+l)),f=-h*h+d*(d+2*a)+c;else d=-s,h=Math.max(0,-(r*d+l)),f=-h*h+d*(d+2*a)+c;else d<=-p?(h=Math.max(0,-(-r*s+l)),d=h>0?-s:Math.min(Math.max(-s,-a),s),f=-h*h+d*(d+2*a)+c):d<=p?(h=0,d=Math.min(Math.max(-s,-a),s),f=d*(d+2*a)+c):(h=Math.max(0,-(r*s+l)),d=h>0?s:Math.min(Math.max(-s,-a),s),f=-h*h+d*(d+2*a)+c);else d=r>0?-s:s,h=Math.max(0,-(r*d+l)),f=-h*h+d*(d+2*a)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(fl).addScaledVector(ha,d),f}intersectSphere(e,t){zt.subVectors(e.center,this.origin);let n=zt.dot(this.direction),i=zt.dot(zt)-n*n,s=e.radius*e.radius;if(i>s)return null;let r=Math.sqrt(s-i),l=n-r,a=n+r;return a<0?null:l<0?this.at(a,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,l,a,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,r=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,r=(e.min.y-d.y)*u),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),h>=0?(l=(e.min.z-d.z)*h,a=(e.max.z-d.z)*h):(l=(e.max.z-d.z)*h,a=(e.min.z-d.z)*h),n>a||l>i)||((l>n||n!==n)&&(n=l),(a<i||i!==i)&&(i=a),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,zt)!==null}intersectTriangle(e,t,n,i,s){pl.subVectors(t,e),da.subVectors(n,e),ml.crossVectors(pl,da);let r=this.direction.dot(ml),l;if(r>0){if(i)return null;l=1}else if(r<0)l=-1,r=-r;else return null;hn.subVectors(this.origin,e);let a=l*this.direction.dot(da.crossVectors(hn,da));if(a<0)return null;let c=l*this.direction.dot(pl.cross(hn));if(c<0||a+c>r)return null;let u=-l*hn.dot(ml);return u<0?null:this.at(u/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Mt=class extends Be{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=ja,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},vu=new te,Bn=new $n,fa=new ke,Tu=new A,pa=new A,ma=new A,ga=new A,gl=new A,xa=new A,Mu=new A,_a=new A,pt=class extends _e{constructor(e=new it,t=new Mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let l=this.morphTargetInfluences;if(s&&l){xa.set(0,0,0);for(let a=0,c=s.length;a<c;a++){let u=l[a],h=s[a];u!==0&&(gl.fromBufferAttribute(h,e),r?xa.addScaledVector(gl,u):xa.addScaledVector(gl.sub(t),u))}t.add(xa)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(s),Bn.copy(e.ray).recast(e.near),!(fa.containsPoint(Bn.origin)===!1&&(Bn.intersectSphere(fa,Tu)===null||Bn.origin.distanceToSquared(Tu)>(e.far-e.near)**2))&&(vu.copy(s).invert(),Bn.copy(e.ray).applyMatrix4(vu),!(n.boundingBox!==null&&Bn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Bn)))}_computeIntersections(e,t,n){let i,s=this.geometry,r=this.material,l=s.index,a=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(l!==null)if(Array.isArray(r))for(let p=0,g=d.length;p<g;p++){let x=d[p],m=r[x.materialIndex],y=Math.max(x.start,f.start),b=Math.min(l.count,Math.min(x.start+x.count,f.start+f.count));for(let M=y,v=b;M<v;M+=3){let w=l.getX(M),T=l.getX(M+1),S=l.getX(M+2);i=ya(this,m,e,n,c,u,h,w,T,S),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=x.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let x=p,m=g;x<m;x+=3){let y=l.getX(x),b=l.getX(x+1),M=l.getX(x+2);i=ya(this,r,e,n,c,u,h,y,b,M),i&&(i.faceIndex=Math.floor(x/3),t.push(i))}}else if(a!==void 0)if(Array.isArray(r))for(let p=0,g=d.length;p<g;p++){let x=d[p],m=r[x.materialIndex],y=Math.max(x.start,f.start),b=Math.min(a.count,Math.min(x.start+x.count,f.start+f.count));for(let M=y,v=b;M<v;M+=3){let w=M,T=M+1,S=M+2;i=ya(this,m,e,n,c,u,h,w,T,S),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=x.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let x=p,m=g;x<m;x+=3){let y=x,b=x+1,M=x+2;i=ya(this,r,e,n,c,u,h,y,b,M),i&&(i.faceIndex=Math.floor(x/3),t.push(i))}}}};function xd(o,e,t,n,i,s,r,l){let a;if(e.side===Xu?a=n.intersectTriangle(r,s,i,!0,l):a=n.intersectTriangle(i,s,r,e.side===bi,l),a===null)return null;_a.copy(l),_a.applyMatrix4(o.matrixWorld);let c=t.ray.origin.distanceTo(_a);return c<t.near||c>t.far?null:{distance:c,point:_a.clone(),object:o}}function ya(o,e,t,n,i,s,r,l,a,c){o.getVertexPosition(l,pa),o.getVertexPosition(a,ma),o.getVertexPosition(c,ga);let u=xd(o,e,t,n,pa,ma,ga,Mu);if(u){let h=new A;fn.getBarycoord(Mu,pa,ma,ga,h),i&&(u.uv=fn.getInterpolatedAttribute(i,l,a,c,h,new ue)),s&&(u.uv1=fn.getInterpolatedAttribute(s,l,a,c,h,new ue)),r&&(u.normal=fn.getInterpolatedAttribute(r,l,a,c,h,new A),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:l,b:a,c,normal:new A,materialIndex:0};fn.getNormal(pa,ma,ga,d.normal),u.face=d,u.barycoord=h}return u}var es=new nt,Su=new nt,wu=new nt,_d=new nt,Eu=new te,ba=new A,xl=new ke,Au=new te,_l=new $n,cs=class extends pt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Dl,this.bindMatrix=new te,this.bindMatrixInverse=new te,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ke),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ba),this.boundingBox.expandByPoint(ba)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ke),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ba),this.boundingSphere.expandByPoint(ba)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xl.copy(this.boundingSphere),xl.applyMatrix4(i),e.ray.intersectsSphere(xl)!==!1&&(Au.copy(i).invert(),_l.copy(e.ray).applyMatrix4(Au),!(this.boundingBox!==null&&_l.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,_l)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new nt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Dl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ju?this.bindMatrixInverse.copy(this.bindMatrix).invert():re("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Su.fromBufferAttribute(i.attributes.skinIndex,e),wu.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(es.copy(t),t.set(0,0,0,0)):(es.set(...t,1),t.set(0,0,0)),es.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let r=wu.getComponent(s);if(r!==0){let l=Su.getComponent(s);Eu.multiplyMatrices(n.bones[l].matrixWorld,n.boneInverses[l]),t.addScaledVector(_d.copy(es).applyMatrix4(Eu),r)}}return t.isVector4&&(t.w=es.w),t.applyMatrix4(this.bindMatrixInverse)}},Ei=class extends _e{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ai=class extends ft{constructor(e=null,t=1,n=1,i,s,r,l,a,c=vi,u=vi,h,d){super(null,r,l,a,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ru=new te,yd=new te,us=class o{constructor(e=[],t=[]){this.uuid=dt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){re("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new te)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new te;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){let l=e[s]?e[s].matrixWorld:yd;Ru.multiplyMatrices(l,t[s]),Ru.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new o(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ai(t,e,e,cc,Ct);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],r=t[s];r===void 0&&(re("Skeleton: No bone found with UUID:",s),r=new Ei),this.bones.push(r),this.boneInverses.push(new te().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let r=t[i];e.bones.push(r.uuid);let l=n[i];e.boneInverses.push(l.toArray())}return e}},_n=class extends Pe{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},xi=new te,Cu=new te,va=[],Iu=new Ke,bd=new te,ts=new pt,ns=new ke,hs=class extends pt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _n(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,bd)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ke),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xi),Iu.copy(e.boundingBox).applyMatrix4(xi),this.boundingBox.union(Iu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ke),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xi),ns.copy(e.boundingSphere).applyMatrix4(xi),this.boundingSphere.union(ns)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let l=0;l<n.length;l++)n[l]=i[r+l]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(ts.geometry=this.geometry,ts.material=this.material,ts.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ns.copy(this.boundingSphere),ns.applyMatrix4(n),e.ray.intersectsSphere(ns)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,xi),Cu.multiplyMatrices(n,xi),ts.matrixWorld=Cu,ts.raycast(e,va);for(let r=0,l=va.length;r<l;r++){let a=va[r];a.instanceId=s,a.object=this,t.push(a)}va.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new _n(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ai(new Float32Array(i*this.count),i,this.count,Ju,Ct));let s=this.morphTexture.source.data.data,r=0;for(let c=0;c<n.length;c++)r+=n[c];let l=this.geometry.morphTargetsRelative?1:1-r,a=i*e;return s[a]=l,s.set(n,a+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},yl=new A,vd=new A,Td=new Y,Vt=class{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=yl.subVectors(n,t).cross(vd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(yl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Td.getNormalMatrix(e),i=this.coplanarPoint(yl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},On=new ke,Md=new ue(.5,.5),Ta=new A,Ga=class{constructor(e=new Vt,t=new Vt,n=new Vt,i=new Vt,s=new Vt,r=new Vt){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){let l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(i),l[4].copy(s),l[5].copy(r),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pn,n=!1){let i=this.planes,s=e.elements,r=s[0],l=s[1],a=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],p=s[8],g=s[9],x=s[10],m=s[11],y=s[12],b=s[13],M=s[14],v=s[15];if(i[0].setComponents(c-r,f-u,m-p,v-y).normalize(),i[1].setComponents(c+r,f+u,m+p,v+y).normalize(),i[2].setComponents(c+l,f+h,m+g,v+b).normalize(),i[3].setComponents(c-l,f-h,m-g,v-b).normalize(),n)i[4].setComponents(a,d,x,M).normalize(),i[5].setComponents(c-a,f-d,m-x,v-M).normalize();else if(i[4].setComponents(c-a,f-d,m-x,v-M).normalize(),t===pn)i[5].setComponents(c+a,f+d,m+x,v+M).normalize();else if(t===ls)i[5].setComponents(a,d,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(e){On.center.set(0,0,0);let t=Md.distanceTo(e.center);return On.radius=.7071067811865476+t,On.applyMatrix4(e.matrixWorld),this.intersectsSphere(On)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ta.x=i.normal.x>0?e.max.x:e.min.x,Ta.y=i.normal.y>0?e.max.y:e.min.y,Ta.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ta)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var St=class extends Be{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new q(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},za=new A,ka=new A,Lu=new te,is=new $n,Ma=new ke,bl=new A,Pu=new A,Hn=class extends _e{constructor(e=new it,t=new St){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)za.fromBufferAttribute(t,i-1),ka.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=za.distanceTo(ka);e.setAttribute("lineDistance",new ze(n,1))}else re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ma.copy(n.boundingSphere),Ma.applyMatrix4(i),Ma.radius+=s,e.ray.intersectsSphere(Ma)===!1)return;Lu.copy(i).invert(),is.copy(e.ray).applyMatrix4(Lu);let l=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=l*l,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,r.start),p=Math.min(u.count,r.start+r.count);for(let g=f,x=p-1;g<x;g+=c){let m=u.getX(g),y=u.getX(g+1),b=Sa(this,e,is,a,m,y,g);b&&t.push(b)}if(this.isLineLoop){let g=u.getX(p-1),x=u.getX(f),m=Sa(this,e,is,a,g,x,p-1);m&&t.push(m)}}else{let f=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let g=f,x=p-1;g<x;g+=c){let m=Sa(this,e,is,a,g,g+1,g);m&&t.push(m)}if(this.isLineLoop){let g=Sa(this,e,is,a,p-1,f,p-1);g&&t.push(g)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}};function Sa(o,e,t,n,i,s,r){let l=o.geometry.attributes.position;if(za.fromBufferAttribute(l,i),ka.fromBufferAttribute(l,s),t.distanceSqToSegment(za,ka,bl,Pu)>n)return;bl.applyMatrix4(o.matrixWorld);let c=e.ray.origin.distanceTo(bl);if(!(c<e.near||c>e.far))return{distance:c,point:Pu.clone().applyMatrix4(o.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:o}}var Nu=new A,Du=new A,yn=class extends Hn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Nu.fromBufferAttribute(t,i),Du.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Nu.distanceTo(Du);e.setAttribute("lineDistance",new ze(n,1))}else re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ds=class extends Hn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},mt=class extends Be{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fu=new te,$l=new $n,wa=new ke,Ea=new A,Yt=class extends _e{constructor(e=new it,t=new mt){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(i),wa.radius+=s,e.ray.intersectsSphere(wa)===!1)return;Fu.copy(i).invert(),$l.copy(e.ray).applyMatrix4(Fu);let l=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=l*l,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let p=d,g=f;p<g;p++){let x=c.getX(p);Ea.fromBufferAttribute(h,x),Uu(Ea,x,a,i,e,t,this)}}else{let d=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let p=d,g=f;p<g;p++)Ea.fromBufferAttribute(h,p),Uu(Ea,p,a,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}};function Uu(o,e,t,n,i,s,r){let l=$l.distanceSqToPoint(o);if(l<t){let a=new A;$l.closestPointToPoint(o,a),a.applyMatrix4(n);let c=i.ray.origin.distanceTo(a);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(l),point:a,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}function nh(o){let e={};for(let t in o){e[t]={};for(let n in o[t]){let i=o[t][n];if(Bu(i))i.isRenderTargetTexture?(re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Bu(i[0])){let s=[];for(let r=0,l=i.length;r<l;r++)s[r]=i[r].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Oe(o){let e={};for(let t=0;t<o.length;t++){let n=nh(o[t]);for(let i in n)e[i]=n[i]}return e}function Bu(o){return o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)}var Wn=class extends Be{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ve=class extends Wn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return J(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new q(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new q(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new q(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},fs=class extends Be{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new q(16777215),this.specular=new q(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=ja,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Aa(o,e){return!o||o.constructor===e?o:typeof e.BYTES_PER_ELEMENT=="number"?new e(o):Array.prototype.slice.call(o)}function Sd(o){function e(i,s){return o[i]-o[s]}let t=o.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ou(o,e,t){let n=o.length,i=new o.constructor(n);for(let s=0,r=0;r!==n;++s){let l=t[s]*e;for(let a=0;a!==e;++a)i[r++]=o[l+a]}return i}function ih(o,e,t,n){let i=1,s=o[0];for(;s!==void 0&&s[n]===void 0;)s=o[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push(...r)),s=o[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=o[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=o[i++];while(s!==void 0)}var wt=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let r;t:{i:if(!(e<i)){for(let l=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(s=i,i=t[++n],e<i)break e}r=t.length;break t}if(!(e>=s)){let l=t[1];e<l&&(n=2,s=l);for(let a=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=s,s=t[--n-1],e>=s)break e}r=n,n=0;break t}break n}for(;n<r;){let l=n+r>>>1;e<t[l]?r=l:n=l+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Va=class extends wt{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ul,endingEnd:Ul}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,r=e+1,l=i[s],a=i[r];if(l===void 0)switch(this.getSettings_().endingStart){case Bl:s=e,l=2*t-n;break;case Ol:s=i.length-2,l=t+i[s]-i[s+1];break;default:s=e,l=n}if(a===void 0)switch(this.getSettings_().endingEnd){case Bl:r=e,a=2*n-t;break;case Ol:r=1,a=n+i[1]-i[0];break;default:r=e-1,a=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-l),this._weightNext=c/(a-n),this._offsetPrev=s*u,this._offsetNext=r*u}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,l=this.valueSize,a=e*l,c=a-l,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),g=p*p,x=g*p,m=-d*x+2*d*g-d*p,y=(1+d)*x+(-1.5-2*d)*g+(-.5+d)*p+1,b=(-1-f)*x+(1.5+f)*g+.5*p,M=f*x-f*g;for(let v=0;v!==l;++v)s[v]=m*r[u+v]+y*r[c+v]+b*r[a+v]+M*r[h+v];return s}},$a=class extends wt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,l=this.valueSize,a=e*l,c=a-l,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==l;++d)s[d]=r[c+d]*h+r[a+d]*u;return s}},Ha=class extends wt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Wa=class extends wt{interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,l=this.valueSize,a=e*l,c=a-l,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){let g=(n-t)/(i-t),x=1-g;for(let m=0;m!==l;++m)s[m]=r[c+m]*x+r[a+m]*g;return s}let f=l*2,p=e-1;for(let g=0;g!==l;++g){let x=r[c+g],m=r[a+g],y=p*f+g*2,b=d[y],M=d[y+1],v=e*f+g*2,w=h[v],T=h[v+1],S=(n-t)/(i-t),E,I,N,D,G;for(let U=0;U<8;U++){E=S*S,I=E*S,N=1-S,D=N*N,G=D*N;let H=G*t+3*D*S*b+3*N*E*w+I*i-n;if(Math.abs(H)<1e-10)break;let P=3*D*(b-t)+6*N*S*(w-b)+3*E*(i-w);if(Math.abs(P)<1e-10)break;S=S-H/P,S=Math.max(0,Math.min(1,S))}s[g]=G*x+3*D*S*M+3*N*E*T+I*m}return s}},$e=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Aa(t,this.TimeBufferType),this.values=Aa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Aa(e.times,Array),values:Aa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Va(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Wa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case kn:t=this.InterpolantFactoryMethodDiscrete;break;case Vn:t=this.InterpolantFactoryMethodLinear;break;case Ia:t=this.InterpolantFactoryMethodSmooth;break;case Fl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return re("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return kn;case this.InterpolantFactoryMethodLinear:return Vn;case this.InterpolantFactoryMethodSmooth:return Ia;case this.InterpolantFactoryMethodBezier:return Fl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let l=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*l,r*l)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(fe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(fe("KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let l=0;l!==s;l++){let a=n[l];if(typeof a=="number"&&isNaN(a)){fe("KeyframeTrack: Time is not a valid number.",this,l,a),e=!1;break}if(r!==null&&r>a){fe("KeyframeTrack: Out of order keys.",this,l,a,r),e=!1;break}r=a}if(i!==void 0&&Bh(i))for(let l=0,a=i.length;l!==a;++l){let c=i[l];if(isNaN(c)){fe("KeyframeTrack: Value is not a valid number.",this,l,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ia,s=e.length-1,r=1;for(let l=1;l<s;++l){let a=!1,c=e[l],u=e[l+1];if(c!==u&&(l!==1||c!==e[0]))if(i)a=!0;else{let h=l*n,d=h-n,f=h+n;for(let p=0;p!==n;++p){let g=t[h+p];if(g!==t[d+p]||g!==t[f+p]){a=!0;break}}}if(a){if(l!==r){e[r]=e[l];let h=l*n,d=r*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++r}}if(s>0){e[r]=e[s];for(let l=s*n,a=r*n,c=0;c!==n;++c)t[a+c]=t[l+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};$e.prototype.ValueTypeName="";$e.prototype.TimeBufferType=Float32Array;$e.prototype.ValueBufferType=Float32Array;$e.prototype.DefaultInterpolation=Vn;var qt=class extends $e{constructor(e,t,n){super(e,t,n)}};qt.prototype.ValueTypeName="bool";qt.prototype.ValueBufferType=Array;qt.prototype.DefaultInterpolation=kn;qt.prototype.InterpolantFactoryMethodLinear=void 0;qt.prototype.InterpolantFactoryMethodSmooth=void 0;var ps=class extends $e{constructor(e,t,n,i){super(e,t,n,i)}};ps.prototype.ValueTypeName="color";var Et=class extends $e{constructor(e,t,n,i){super(e,t,n,i)}};Et.prototype.ValueTypeName="number";var Xa=class extends wt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,l=this.valueSize,a=(n-t)/(i-t),c=e*l;for(let u=c+l;c!==u;c+=4)je.slerpFlat(s,0,r,c-l,r,c,a);return s}},At=class extends $e{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Xa(this.times,this.values,this.getValueSize(),e)}};At.prototype.ValueTypeName="quaternion";At.prototype.InterpolantFactoryMethodSmooth=void 0;var jt=class extends $e{constructor(e,t,n){super(e,t,n)}};jt.prototype.ValueTypeName="string";jt.prototype.ValueBufferType=Array;jt.prototype.DefaultInterpolation=kn;jt.prototype.InterpolantFactoryMethodLinear=void 0;jt.prototype.InterpolantFactoryMethodSmooth=void 0;var Rt=class extends $e{constructor(e,t,n,i){super(e,t,n,i)}};Rt.prototype.ValueTypeName="vector";var ms=class{constructor(e="",t=-1,n=[],i=Qu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=dt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,l=n.length;r!==l;++r)t.push(Ed(n[r]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,r=n.length;s!==r;++s)t.push($e.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,r=[];for(let l=0;l<s;l++){let a=[],c=[];a.push((l+s-1)%s,l,(l+1)%s),c.push(0,1,0);let u=Sd(a);a=Ou(a,1,u),c=Ou(c,1,u),!i&&a[0]===0&&(a.push(s),c.push(c[0])),r.push(new Et(".morphTargetInfluences["+t[l].name+"]",a,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let l=0,a=e.length;l<a;l++){let c=e[l],u=c.name.match(s);if(u&&u.length>1){let h=u[1],d=i[h];d||(i[h]=d=[]),d.push(c)}}let r=[];for(let l in i)r.push(this.CreateFromMorphTargetSequence(l,i[l],t,n));return r}static parseAnimation(e,t){if(re("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return fe("AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,p,g){if(f.length!==0){let x=[],m=[];ih(f,x,m,p),x.length!==0&&g.push(new h(d,x,m))}},i=[],s=e.name||"default",r=e.fps||30,l=e.blendMode,a=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let g=0;g<d[p].morphTargets.length;g++)f[d[p].morphTargets[g]]=-1;for(let g in f){let x=[],m=[];for(let y=0;y!==d[p].morphTargets.length;++y){let b=d[p];x.push(b.time),m.push(b.morphTarget===g?1:0)}i.push(new Et(".morphTargetInfluence["+g+"]",x,m))}a=f.length*r}else{let f=".bones["+t[h].name+"]";n(Rt,f+".position",d,"pos",i),n(At,f+".quaternion",d,"rot",i),n(Rt,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,a,i,l)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function wd(o){switch(o.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Et;case"vector":case"vector2":case"vector3":case"vector4":return Rt;case"color":return ps;case"quaternion":return At;case"bool":case"boolean":return qt;case"string":return jt}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+o)}function Ed(o){if(o.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=wd(o.type);if(o.times===void 0){let t=[],n=[];ih(o.keys,t,n,"value"),o.times=t,o.values=n}return e.parse!==void 0?e.parse(o):new e(o.name,o.times,o.values,o.interpolation)}var Tt={enabled:!1,files:{},add:function(o,e){this.enabled!==!1&&(Gu(o)||(this.files[o]=e))},get:function(o){if(this.enabled!==!1&&!Gu(o))return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};function Gu(o){try{let e=o.slice(o.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Ya=class{constructor(e,t,n){let i=this,s=!1,r=0,l=0,a,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){l++,s===!1&&i.onStart!==void 0&&i.onStart(u,r,l),s=!0},this.itemEnd=function(u){r++,i.onProgress!==void 0&&i.onProgress(u,r,l),r===l&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return a?a(u):u},this.setURLModifier=function(u){return a=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],p=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},sh=new Ya,Ze=class{constructor(e){this.manager=e!==void 0?e:sh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ze.DEFAULT_MATERIAL_NAME="__DEFAULT";var kt={},Hl=class extends Error{constructor(e,t){super(e),this.response=t}},Kt=class extends Ze{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Tt.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(kt[e]!==void 0){kt[e].push({onLoad:t,onProgress:n,onError:i});return}kt[e]=[],kt[e].push({onLoad:t,onProgress:n,onError:i});let r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),l=this.mimeType,a=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&re("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=kt[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,g=0,x=new ReadableStream({start(m){y();function y(){h.read().then(({done:b,value:M})=>{if(b)m.close();else{g+=M.byteLength;let v=new ProgressEvent("progress",{lengthComputable:p,loaded:g,total:f});for(let w=0,T=u.length;w<T;w++){let S=u[w];S.onProgress&&S.onProgress(v)}m.enqueue(M),y()}},b=>{m.error(b)})}}});return new Response(x)}else throw new Hl(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(a){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,l));case"json":return c.json();default:if(l==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(l),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Tt.add(`file:${e}`,c);let u=kt[e];delete kt[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=kt[e];if(u===void 0)throw this.manager.itemError(e),c;delete kt[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var _i=new WeakMap,qa=class extends Ze{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=Tt.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);else{let h=_i.get(r);h===void 0&&(h=[],_i.set(r,h)),h.push({onLoad:t,onError:i})}return r}let l=Na("img");function a(){u(),t&&t(this);let h=_i.get(this)||[];for(let d=0;d<h.length;d++){let f=h[d];f.onLoad&&f.onLoad(this)}_i.delete(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),Tt.remove(`image:${e}`);let d=_i.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(h)}_i.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){l.removeEventListener("load",a,!1),l.removeEventListener("error",c,!1)}return l.addEventListener("load",a,!1),l.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),Tt.add(`image:${e}`,l),s.manager.itemStart(e),l.src=e,l}};var gs=class extends Ze{constructor(e){super(e)}load(e,t,n,i){let s=this,r=new Ai,l=new Kt(this.manager);return l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setPath(this.path),l.setWithCredentials(s.withCredentials),l.load(e,function(a){let c;try{c=s.parse(a)}catch(u){i!==void 0?i(u):fe(u);return}c.image!==void 0?r.image=c.image:c.data!==void 0&&(r.image.width=c.width,r.image.height=c.height,r.image.data=c.data),r.wrapS=c.wrapS!==void 0?c.wrapS:Ht,r.wrapT=c.wrapT!==void 0?c.wrapT:Ht,r.magFilter=c.magFilter!==void 0?c.magFilter:tt,r.minFilter=c.minFilter!==void 0?c.minFilter:tt,r.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(r.colorSpace=c.colorSpace),c.flipY!==void 0&&(r.flipY=c.flipY),c.format!==void 0&&(r.format=c.format),c.type!==void 0&&(r.type=c.type),c.mipmaps!==void 0&&(r.mipmaps=c.mipmaps,r.minFilter=Ii),c.mipmapCount===1&&(r.minFilter=tt),c.generateMipmaps!==void 0&&(r.generateMipmaps=c.generateMipmaps),r.needsUpdate=!0,t&&t(r,c)},n,i),r}},xs=class extends Ze{constructor(e){super(e)}load(e,t,n,i){let s=new ft,r=new qa(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(l){s.image=l,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Ri=class extends _e{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new q(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var vl=new te,zu=new A,ku=new A,_s=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=lc,this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ga,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;zu.setFromMatrixPosition(e.matrixWorld),t.position.copy(zu),ku.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ku),t.updateMatrixWorld(),vl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ls||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ra=new A,Ca=new je,vt=new A,ys=class extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ra,Ca,vt),vt.x===1&&vt.y===1&&vt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ra,Ca,vt.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ra,Ca,vt),vt.x===1&&vt.y===1&&vt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ra,Ca,vt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},dn=new A,Vu=new ue,$u=new ue,Xn=class extends ys{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Mi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mi*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(dn.x,dn.y).multiplyScalar(-e/dn.z),dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(dn.x,dn.y).multiplyScalar(-e/dn.z)}getViewSize(e,t){return this.getViewBounds(e,Vu,$u),t.subVectors($u,Vu)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ss*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let a=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/a,t-=r.offsetY*n/c,i*=r.width/a,n*=r.height/c}let l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Wl=class extends _s{constructor(){super(new Xn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Mi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},bs=class extends Ri{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new Wl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Xl=class extends _s{constructor(){super(new Xn(90,1,.5,500)),this.isPointLightShadow=!0}},vs=class extends Ri{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Xl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ci=class extends ys{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,r=n+e,l=i+t,a=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,l-=u*this.view.offsetY,a=l-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,l,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Yl=class extends _s{constructor(){super(new Ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ts=class extends Ri{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new Yl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Zt=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Tl=new WeakMap,Ms=class extends Ze{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&re("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&re("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=Tt.get(`image-bitmap:${e}`);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{Tl.has(r)===!0?(i&&i(Tl.get(r)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);return}let l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader,l.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let a=fetch(e,l).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){Tt.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),Tl.set(a,c),Tt.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Tt.add(`image-bitmap:${e}`,a),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var mc="\\[\\]\\.:\\/",Ad=new RegExp("["+mc+"]","g"),gc="[^"+mc+"]",Rd="[^"+mc.replace("\\.","")+"]",Cd=/((?:WC+[\/:])*)/.source.replace("WC",gc),Id=/(WCOD+)?/.source.replace("WCOD",Rd),Ld=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gc),Pd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gc),Nd=new RegExp("^"+Cd+Id+Ld+Pd+"$"),Dd=["material","materials","bones","map"],ql=class{constructor(e,t,n){let i=n||de.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},de=class o{constructor(e,t,n){this.path=t,this.parsedPath=n||o.parseTrackName(t),this.node=o.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new o.Composite(e,t,n):new o(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ad,"")}static parseTrackName(e){let t=Nd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Dd.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let r=0;r<s.length;r++){let l=s[r];if(l.name===t||l.uuid===t)return l;let a=n(l.children);if(a)return a}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=o.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){re("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let r=e[i];if(r===void 0){let c=t.nodeName;fe("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}a=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(a=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};de.Composite=ql;de.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};de.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};de.prototype.GetterByBindingType=[de.prototype._getValue_direct,de.prototype._getValue_array,de.prototype._getValue_arrayElement,de.prototype._getValue_toArray];de.prototype.SetterByBindingTypeAndVersioning=[[de.prototype._setValue_direct,de.prototype._setValue_direct_setNeedsUpdate,de.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[de.prototype._setValue_array,de.prototype._setValue_array_setNeedsUpdate,de.prototype._setValue_array_setMatrixWorldNeedsUpdate],[de.prototype._setValue_arrayElement,de.prototype._setValue_arrayElement_setNeedsUpdate,de.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[de.prototype._setValue_fromArray,de.prototype._setValue_fromArray_setNeedsUpdate,de.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var D0=new Float32Array(1);var jl=class o{static{o.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");var Fd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ud=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Od=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$d=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Hd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ef=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,rf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,af=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,of=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,df="gl_FragColor = linearToOutputTexel( gl_FragColor );",ff=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,gf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Sf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ef=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Af=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Rf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,If=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Df=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ff=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Uf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Of=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Gf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ep=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ap=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,op=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,up=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,yp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ep=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ip=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Up=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$p=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Zp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,im=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,om=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ee={alphahash_fragment:Fd,alphahash_pars_fragment:Ud,alphamap_fragment:Bd,alphamap_pars_fragment:Od,alphatest_fragment:Gd,alphatest_pars_fragment:zd,aomap_fragment:kd,aomap_pars_fragment:Vd,batching_pars_vertex:$d,batching_vertex:Hd,begin_vertex:Wd,beginnormal_vertex:Xd,bsdfs:Yd,iridescence_fragment:qd,bumpmap_pars_fragment:jd,clipping_planes_fragment:Kd,clipping_planes_pars_fragment:Zd,clipping_planes_pars_vertex:Jd,clipping_planes_vertex:Qd,color_fragment:ef,color_pars_fragment:tf,color_pars_vertex:nf,color_vertex:sf,common:rf,cube_uv_reflection_fragment:af,defaultnormal_vertex:of,displacementmap_pars_vertex:lf,displacementmap_vertex:cf,emissivemap_fragment:uf,emissivemap_pars_fragment:hf,colorspace_fragment:df,colorspace_pars_fragment:ff,envmap_fragment:pf,envmap_common_pars_fragment:mf,envmap_pars_fragment:gf,envmap_pars_vertex:xf,envmap_physical_pars_fragment:Rf,envmap_vertex:_f,fog_vertex:yf,fog_pars_vertex:bf,fog_fragment:vf,fog_pars_fragment:Tf,gradientmap_pars_fragment:Mf,lightmap_pars_fragment:Sf,lights_lambert_fragment:wf,lights_lambert_pars_fragment:Ef,lights_pars_begin:Af,lights_toon_fragment:Cf,lights_toon_pars_fragment:If,lights_phong_fragment:Lf,lights_phong_pars_fragment:Pf,lights_physical_fragment:Nf,lights_physical_pars_fragment:Df,lights_fragment_begin:Ff,lights_fragment_maps:Uf,lights_fragment_end:Bf,lightprobes_pars_fragment:Of,logdepthbuf_fragment:Gf,logdepthbuf_pars_fragment:zf,logdepthbuf_pars_vertex:kf,logdepthbuf_vertex:Vf,map_fragment:$f,map_pars_fragment:Hf,map_particle_fragment:Wf,map_particle_pars_fragment:Xf,metalnessmap_fragment:Yf,metalnessmap_pars_fragment:qf,morphinstance_vertex:jf,morphcolor_vertex:Kf,morphnormal_vertex:Zf,morphtarget_pars_vertex:Jf,morphtarget_vertex:Qf,normal_fragment_begin:ep,normal_fragment_maps:tp,normal_pars_fragment:np,normal_pars_vertex:ip,normal_vertex:sp,normalmap_pars_fragment:rp,clearcoat_normal_fragment_begin:ap,clearcoat_normal_fragment_maps:op,clearcoat_pars_fragment:lp,iridescence_pars_fragment:cp,opaque_fragment:up,packing:hp,premultiplied_alpha_fragment:dp,project_vertex:fp,dithering_fragment:pp,dithering_pars_fragment:mp,roughnessmap_fragment:gp,roughnessmap_pars_fragment:xp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:yp,shadowmap_vertex:bp,shadowmask_pars_fragment:vp,skinbase_vertex:Tp,skinning_pars_vertex:Mp,skinning_vertex:Sp,skinnormal_vertex:wp,specularmap_fragment:Ep,specularmap_pars_fragment:Ap,tonemapping_fragment:Rp,tonemapping_pars_fragment:Cp,transmission_fragment:Ip,transmission_pars_fragment:Lp,uv_pars_fragment:Pp,uv_pars_vertex:Np,uv_vertex:Dp,worldpos_vertex:Fp,background_vert:Up,background_frag:Bp,backgroundCube_vert:Op,backgroundCube_frag:Gp,cube_vert:zp,cube_frag:kp,depth_vert:Vp,depth_frag:$p,distance_vert:Hp,distance_frag:Wp,equirect_vert:Xp,equirect_frag:Yp,linedashed_vert:qp,linedashed_frag:jp,meshbasic_vert:Kp,meshbasic_frag:Zp,meshlambert_vert:Jp,meshlambert_frag:Qp,meshmatcap_vert:em,meshmatcap_frag:tm,meshnormal_vert:nm,meshnormal_frag:im,meshphong_vert:sm,meshphong_frag:rm,meshphysical_vert:am,meshphysical_frag:om,meshtoon_vert:lm,meshtoon_frag:cm,points_vert:um,points_frag:hm,shadow_vert:dm,shadow_frag:fm,sprite_vert:pm,sprite_frag:mm},z={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Y},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Y}},envmap:{envMap:{value:null},envMapRotation:{value:new Y},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Y}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Y}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Y},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Y},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Y},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Y}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Y}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Y}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0},uvTransform:{value:new Y}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Y},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0}}},rh={basic:{uniforms:Oe([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Oe([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.fog,z.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Oe([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.fog,z.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Oe([z.common,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.roughnessmap,z.metalnessmap,z.fog,z.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Oe([z.common,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.gradientmap,z.fog,z.lights,{emissive:{value:new q(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Oe([z.common,z.bumpmap,z.normalmap,z.displacementmap,z.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Oe([z.points,z.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Oe([z.common,z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Oe([z.common,z.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Oe([z.common,z.bumpmap,z.normalmap,z.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Oe([z.sprite,z.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Y},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Y}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:Oe([z.common,z.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:Oe([z.lights,z.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};rh.physical={uniforms:Oe([rh.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Y},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Y},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Y},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Y},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Y},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Y},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Y},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Y},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Y},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Y},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Y},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Y}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var gm=new Y;gm.set(-1,0,0,0,1,0,0,0,1);var jv={[Kl]:"LINEAR_TONE_MAPPING",[Zl]:"REINHARD_TONE_MAPPING",[Jl]:"CINEON_TONE_MAPPING",[Ql]:"ACES_FILMIC_TONE_MAPPING",[tc]:"AGX_TONE_MAPPING",[nc]:"NEUTRAL_TONE_MAPPING",[ec]:"CUSTOM_TONE_MAPPING"};var Kv=new Float32Array(16),Zv=new Float32Array(9),Jv=new Float32Array(4);var Qv={[Kl]:"Linear",[Zl]:"Reinhard",[Jl]:"Cineon",[Ql]:"ACESFilmic",[tc]:"AgX",[nc]:"Neutral",[ec]:"Custom"};var eT={[Hu]:"SHADOWMAP_TYPE_PCF",[Wu]:"SHADOWMAP_TYPE_VSM"};var tT={[Ku]:"ENVMAP_TYPE_CUBE",[sc]:"ENVMAP_TYPE_CUBE",[Zu]:"ENVMAP_TYPE_CUBE_UV"};var nT={[sc]:"ENVMAP_MODE_REFRACTION"};var iT={[ja]:"ENVMAP_BLENDING_MULTIPLY",[Yu]:"ENVMAP_BLENDING_MIX",[qu]:"ENVMAP_BLENDING_ADD"};var xm=new Y;xm.set(-1,0,0,0,1,0,0,0,1);var sT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);var Ka=class extends gs{constructor(e){super(e),this.type=Li}parse(e){let r=function(S,E){switch(S){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(E||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(E||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(E||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(E||""))}},h=function(S,E,I){E=E||1024;let D=S.pos,G=-1,U=0,R="",H=String.fromCharCode.apply(null,new Uint16Array(S.subarray(D,D+128)));for(;0>(G=H.indexOf(`
`))&&U<E&&D<S.byteLength;)R+=H,U+=H.length,D+=128,H=String.fromCharCode.apply(null,new Uint16Array(S.subarray(D,D+128)));return-1<G?(I!==!1&&(S.pos+=U+G+1),R+H.slice(0,G)):!1},d=function(S){let E=/^#\?(\S+)/,I=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,N=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,D=/^\s*FORMAT=(\S+)\s*$/,G=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,U={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},R,H;for((S.pos>=S.byteLength||!(R=h(S)))&&r(1,"no header found"),(H=R.match(E))||r(3,"bad initial token"),U.valid|=1,U.programtype=H[1],U.string+=R+`
`;R=h(S),R!==!1;){if(U.string+=R+`
`,R.charAt(0)==="#"){U.comments+=R+`
`;continue}if((H=R.match(I))&&(U.gamma=parseFloat(H[1])),(H=R.match(N))&&(U.exposure=parseFloat(H[1])),(H=R.match(D))&&(U.valid|=2,U.format=H[1]),(H=R.match(G))&&(U.valid|=4,U.height=parseInt(H[1],10),U.width=parseInt(H[2],10)),U.valid&2&&U.valid&4)break}return U.valid&2||r(3,"missing format specifier"),U.valid&4||r(3,"missing image size specifier"),U},f=function(S,E,I){let N=E;if(N<8||N>32767||S[0]!==2||S[1]!==2||S[2]&128)return new Uint8Array(S);N!==(S[2]<<8|S[3])&&r(3,"wrong scanline width");let D=new Uint8Array(4*E*I);D.length||r(4,"unable to allocate buffer space");let G=0,U=0,R=4*N,H=new Uint8Array(4),P=new Uint8Array(R),ne=I;for(;ne>0&&U<S.byteLength;){U+4>S.byteLength&&r(1),H[0]=S[U++],H[1]=S[U++],H[2]=S[U++],H[3]=S[U++],(H[0]!=2||H[1]!=2||(H[2]<<8|H[3])!=N)&&r(3,"bad rgbe scanline format");let B=0,F;for(;B<R&&U<S.byteLength;){F=S[U++];let j=F>128;if(j&&(F-=128),(F===0||B+F>R)&&r(3,"bad scanline data"),j){let W=S[U++];for(let we=0;we<F;we++)P[B++]=W}else P.set(S.subarray(U,U+F),B),B+=F,U+=F}let ae=N;for(let j=0;j<ae;j++){let W=0;D[G]=P[j+W],W+=N,D[G+1]=P[j+W],W+=N,D[G+2]=P[j+W],W+=N,D[G+3]=P[j+W],G+=4}ne--}return D},p=function(S,E,I,N){let D=S[E+3],G=Math.pow(2,D-128)/255;I[N+0]=S[E+0]*G,I[N+1]=S[E+1]*G,I[N+2]=S[E+2]*G,I[N+3]=1},g=function(S,E,I,N){let D=S[E+3],G=Math.pow(2,D-128)/255;I[N+0]=xn.toHalfFloat(Math.min(S[E+0]*G,65504)),I[N+1]=xn.toHalfFloat(Math.min(S[E+1]*G,65504)),I[N+2]=xn.toHalfFloat(Math.min(S[E+2]*G,65504)),I[N+3]=xn.toHalfFloat(1)},x=new Uint8Array(e);x.pos=0;let m=d(x),y=m.width,b=m.height,M=f(x.subarray(x.pos),y,b),v,w,T;switch(this.type){case Ct:T=M.length/4;let S=new Float32Array(T*4);for(let I=0;I<T;I++)p(M,I*4,S,I*4);v=S,w=Ct;break;case Li:T=M.length/4;let E=new Uint16Array(T*4);for(let I=0;I<T;I++)g(M,I*4,E,I*4);v=E,w=Li;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:y,height:b,data:v,header:m.string,gamma:m.gamma,exposure:m.exposure,type:w}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(r,l){switch(r.type){case Ct:case Li:r.colorSpace=Ue,r.minFilter=tt,r.magFilter=tt,r.generateMipmaps=!1,r.flipY=!0;break}t&&t(r,l)}return super.load(e,s,n,i)}};var Za=class{static async loadHDRAsync(e){let n=await(await he(e)).arrayBuffer(),s=new Ka().setDataType(Ct).parse(n),r=s.data,l=new Float32Array(s.width*s.height*3);for(let a=0,c=0;a<r.length;a+=4,c+=3)l[c+0]=r[a+0],l[c+1]=r[a+1],l[c+2]=r[a+2];return[l,s.width,s.height]}};function _m(o,e,t){return .212671*o+.71516*e+.072169*t}var Es=class{width;height;img;cdf;totalSum;constructor(){this.width=0,this.height=0,this.img=null,this.cdf=null,this.totalSum=0}dispose(){this.img=null,this.cdf=null}buildCDF(){if(!this.img||!this.width||!this.height)return;let e=new Float32Array(this.width*this.height);for(let t=0;t<this.height;t++)for(let n=0;n<this.width;n++){let i=t*this.width*3+n*3;e[n+t*this.width]=_m(this.img[i+0],this.img[i+1],this.img[i+2])}this.cdf=new Float32Array(this.width*this.height),this.cdf[0]=e[0];for(let t=1;t<this.width*this.height;t++)this.cdf[t]=this.cdf[t-1]+e[t];this.totalSum=this.cdf[this.width*this.height-1]}async loadMapAsync(e){return[this.img,this.width,this.height]=await Za.loadHDRAsync(e),this.img==null?!1:(this.buildCDF(),!0)}};var It=class{name;baseWeight=1;baseDiffuseRoughness=0;baseColor=new _(1,1,1);specularColor=new _(1,1,1);coatColor=new _(1,1,1);anisotropic=0;emission=new _(0,0,0);padding1=0;metallic=0;roughness=.5;subsurface=0;specularTint=0;sheen=0;sheenTint=0;clearcoat=0;clearcoatGloss=0;coatIOR=1.6;coatRoughnessAnisotropy=0;coatDarkening=1;specTrans=0;ior=1.5;baseColorTexID=-1;metallicRoughnessTexID=-1;normalmapTexID=-1;emissionmapTexID=-1;displacementTexID=-1;opacity=1;alphaMode=0;alphaCutoff=0;doubleSided=0;mediumType=0;mediumScattering=0;mediumColor=new _(1,1,1);mediumAnisotropy=0;mediumAbsorption=0;mediumThickness=1;subsurfaceRadiusScale=new _(1,1,1);fuzzColor=new _(-1,-1,-1);fuzzRoughness=.5;dispersionScale=0;abbeNumber=50;thinWalled=0;transmissionColor=new _(1,1,1);thinFilmWeight=0;thinFilmThickness=0;thinFilmIor=1.5;uvScale=new Z(1,1);specularWeight=1;anisotropyRotation=0;coatAnisotropyRotation=0;coatAffectRoughness=0;transmissionExtraRoughness=0;materialType=0;constructor(){}toVec4Array(){return[new X(this.baseColor.x,this.baseColor.y,this.baseColor.z,this.anisotropic),new X(this.emission.x,this.emission.y,this.emission.z,this.mediumThickness),new X(this.metallic,this.roughness,this.subsurface,this.specularTint),new X(this.sheen,this.sheenTint,this.clearcoat,this.clearcoatGloss),new X(this.specTrans,this.ior,this.mediumType,this.mediumScattering),new X(this.mediumColor.x,this.mediumColor.y,this.mediumColor.z,this.mediumAnisotropy),new X(this.baseColorTexID,this.metallicRoughnessTexID,this.normalmapTexID,this.emissionmapTexID),new X(this.opacity,this.alphaMode,this.alphaCutoff,this.doubleSided),new X(this.mediumAbsorption,this.baseWeight,this.baseDiffuseRoughness,this.coatDarkening),new X(this.specularColor.x,this.specularColor.y,this.specularColor.z,this.coatIOR),new X(this.coatColor.x,this.coatColor.y,this.coatColor.z,this.coatRoughnessAnisotropy),new X(this.transmissionColor.x,this.transmissionColor.y,this.transmissionColor.z,this.thinWalled),new X(this.subsurfaceRadiusScale.x,this.subsurfaceRadiusScale.y,this.subsurfaceRadiusScale.z,this.fuzzColor.x),new X(this.fuzzRoughness,this.dispersionScale,this.abbeNumber,this.fuzzColor.y),new X(this.thinFilmWeight,this.thinFilmThickness,this.thinFilmIor,this.fuzzColor.z),new X(this.uvScale.x,this.uvScale.y,this.specularWeight,this.anisotropyRotation),new X(this.coatAnisotropyRotation,this.coatAffectRoughness,this.transmissionExtraRoughness,this.materialType),new X(this.displacementTexID,0,0,0)]}};var Ja=class extends Dn{m_max_split_depth;m_num_nodes_for_regular;m_num_nodes_required;m_extra_refs_budget;m_min_overlap;m_num_nodes_archived;m_node_archive=[];constructor(e,t,n,i,s){super(e,t,!0),this.m_max_split_depth=n,this.m_min_overlap=i,this.m_extra_refs_budget=s,this.m_num_nodes_required=0,this.m_num_nodes_for_regular=0,this.m_num_nodes_archived=0}buildImpl(e,t){let n=new Array(t),i=new Array(t),s=new K;for(let l=0;l<t;++l){let a=e[l].center();n[l]={bounds:e[l],center:a,idx:l},s.grow(a)}this.m_num_nodes_for_regular=2*t-1,this.m_num_nodes_required=Math.floor(this.m_num_nodes_for_regular*(1+this.m_extra_refs_budget)),this.initNodeAllocator(this.m_num_nodes_required);let r={startidx:0,numprims:t,ptr:null,isLeft:!1,bounds:this.m_bounds,centroid_bounds:s,level:0,index:0};this.buildNodeSplit(r,n)}buildNodeSplit(e,t){this.m_height=Math.max(this.m_height,e.level);let n=this.allocateNode();if(n.bounds=e.bounds,e.numprims<4){n.type=1,n.startidx=this.m_packed_indices.length,n.numprims=e.numprims;for(let i=e.startidx;i<e.startidx+e.numprims;++i)this.m_packed_indices.push(t[i].idx)}else{n.type=0;let i=e.centroid_bounds.maxdim(),s=e.centroid_bounds.center().get(i),r=this.findObjectSahSplit(e,t),l={dim:0,split:NaN,sah:Number.MAX_VALUE,overlap:0},a=0;if(e.level<this.m_max_split_depth&&this.m_nodecnt<this.m_num_nodes_required&&r.overlap>this.m_min_overlap&&(l=this.findSpatialSahSplit(e,t),!isNaN(l.split)&&l.sah<r.sah&&(a=1)),a===1){let v=e.startidx+e.numprims*2;t.length<v&&(t.length=v);let w=0;this.splitPrimRefs(l,e,t,T=>{w=T}),e.numprims+=w,s=l.split,i=l.dim}else s=isNaN(r.split)?s:r.split,i=isNaN(r.split)?i:r.dim;let c=new K,u=new K,h=new K,d=new K,f=e.startidx,p=e.numprims+e.startidx&1,g=(v,w)=>v<w,x=(v,w)=>v>=w,m=p?g:x,y=p?x:g;if(e.centroid_bounds.extents().get(i)>0){let v=e.startidx,w=e.startidx+e.numprims;for(;;){for(;v!==w&&m(t[v].center.get(i),s);)c.grow(t[v].bounds),h.grow(t[v].center),++v;if(v===w--)break;for(u.grow(t[v].bounds),d.grow(t[v].center);v!==w&&y(t[w].center.get(i),s);)u.grow(t[w].bounds),d.grow(t[w].center),--w;if(v===w)break;c.grow(t[w].bounds),h.grow(t[w].center),[t[v++],t[w]]=[t[w],t[v]]}f=v}if(f===e.startidx||f===e.startidx+e.numprims){f=e.startidx+(e.numprims>>1);for(let v=e.startidx;v<f;++v)c.grow(t[v].bounds),h.grow(t[v].center);for(let v=f;v<e.startidx+e.numprims;++v)u.grow(t[v].bounds),d.grow(t[v].center)}let b={startidx:e.startidx,numprims:f-e.startidx,ptr:n,isLeft:!0,bounds:c,centroid_bounds:h,level:e.level+1,index:0},M={startidx:f,numprims:e.numprims-(f-e.startidx),ptr:n,isLeft:!1,bounds:u,centroid_bounds:d,level:e.level+1,index:0};this.buildNodeSplit(M,t),this.buildNodeSplit(b,t)}e.ptr&&(e.isLeft?e.ptr.lc=n:e.ptr.rc=n)}findObjectSahSplit(e,t){let n=-1,i=Number.MAX_VALUE,s={dim:0,split:NaN,sah:i,overlap:0},r=e.centroid_bounds.extents();if(_.dot(r,r)===0)return s;let l=[[],[],[]];l[0]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new K,count:0})),l[1]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new K,count:0})),l[2]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new K,count:0}));let a=1/e.bounds.surfaceArea(),c=e.centroid_bounds.pmin;for(let u=0;u<3;++u){let h=c.get(u),d=r.get(u),f=1/d;if(d===0)continue;for(let b=0;b<this.m_num_bins;++b)l[u][b].count=0,l[u][b].bounds=new K;for(let b=e.startidx;b<e.startidx+e.numprims;++b){let M=b,v=Math.min(Math.floor(this.m_num_bins*((t[M].center.get(u)-h)*f)),this.m_num_bins-1);l[u][v].count++,l[u][v].bounds.grow(t[M].bounds)}let p=new Array(this.m_num_bins-1),g=new K;for(let b=this.m_num_bins-1;b>0;--b)g.grow(l[u][b].bounds),p[b-1]=g.clone();let x=new K,m=0,y=e.numprims;for(let b=0;b<this.m_num_bins-1;++b){x.grow(l[u][b].bounds),m+=l[u][b].count,y-=l[u][b].count;let M=this.m_traversal_cost+(m*x.surfaceArea()+y*p[b].surfaceArea())*a;M<i&&(s.dim=u,n=b,i=M,s.overlap=ru(x,p[b]).surfaceArea()*a)}}return n!==-1&&(s.split=c.get(s.dim)+(n+1)*(r.get(s.dim)/this.m_num_bins),s.sah=i),s}findSpatialSahSplit(e,t){let s={dim:0,split:NaN,sah:Number.MAX_VALUE,overlap:0},r=e.bounds.extents(),l=1/e.bounds.surfaceArea();if(_.dot(r,r)===0)return s;let a=[[],[],[]];for(let f=0;f<3;++f)a[f]=Array(128).fill(null).map(()=>({bounds:new K,enter:0,exit:0}));let c=e.bounds.pmin,u=e.bounds.extents().scale(1/128),h=new _(1/u.x,1/u.y,1/u.z);for(let f=e.startidx;f<e.startidx+e.numprims;++f){let p=t[f],g=_.clamp(p.bounds.pmin.subtract(c).multiply(h),new _(0,0,0),new _(127,127,127)),x=_.clamp(p.bounds.pmax.subtract(c).multiply(h),g,new _(127,127,127));for(let m=0;m<3;++m){if(r.get(m)===0)continue;let y=p;for(let b=g.get(m);b<x.get(m);++b){let M={...y},v={...y},w=c.get(m)+u.get(m)*(b+1);this.splitPrimRef(y,m,w,M,v)&&(a[m][b].bounds.grow(M.bounds),y=v)}a[m][x.get(m)].bounds.grow(y.bounds),a[m][g.get(m)].enter++,a[m][x.get(m)].exit++}}let d=new Array(127);for(let f=0;f<3;++f){if(r.get(f)===0)continue;let p=new K;for(let y=127;y>0;--y)p=su(p,a[f][y].bounds),d[y-1]=p.clone();let g=new K,x=0,m=e.numprims;for(let y=1;y<128;++y){g.grow(a[f][y-1].bounds),x+=a[f][y-1].enter,m-=a[f][y-1].exit;let b=this.m_traversal_cost+(g.surfaceArea()+d[y-1].surfaceArea()*m)*l;b<s.sah&&(s.sah=b,s.dim=f,s.split=c.get(f)+u.get(f)*y,s.overlap=0)}}return s}splitPrimRef(e,t,n,i,s){return i.idx=s.idx=e.idx,i.bounds=e.bounds.clone(),s.bounds=e.bounds.clone(),n>e.bounds.pmin.get(t)&&n<e.bounds.pmax.get(t)?(i.bounds.pmax.set(t,n),s.bounds.pmin.set(t,n),!0):!1}splitPrimRefs(e,t,n,i){let s=t.numprims;for(let r=t.startidx;r<t.startidx+t.numprims;++r){if(t.startidx+s>=n.length)throw new Error("Out of bounds");let l={...n[r]},a={...n[r]};this.splitPrimRef(n[r],e.dim,e.split,l,a)&&(n[r]=l,n[t.startidx+s++]=a)}i(s-t.numprims)}allocateNode(){if(this.m_nodecnt-this.m_num_nodes_archived>=this.m_num_nodes_for_regular){this.m_node_archive.push(this.m_nodes),this.m_num_nodes_archived+=this.m_num_nodes_for_regular,this.m_nodes=new Array(this.m_num_nodes_for_regular);for(let e=0;e<this.m_num_nodes_for_regular;++e)this.m_nodes[e]=new ri}return this.m_nodes[this.m_nodecnt++-this.m_num_nodes_archived]}initNodeAllocator(e){this.m_node_archive=[],this.m_nodecnt=0,this.m_nodes=new Array(e);for(let t=0;t<e;++t)this.m_nodes[t]=new ri}printStatistics(){let e=Math.floor((this.m_num_nodes_for_regular+1)/2),t=this.m_packed_indices.length;return["Class name: SplitBvh","SAH: enabled (forced)",`SAH bins: ${this.m_num_bins}`,`Max split depth: ${this.m_max_split_depth}`,`Min node overlap: ${this.m_min_overlap}`,`Number of triangles: ${e}`,`Number of triangle refs: ${t}`,`Ref duplication: ${(t-e)/e*100}%`,`Number of nodes: ${this.m_nodecnt}`,`Number of nodes in corresponding non-split BVH: ${this.m_num_nodes_for_regular}`,`Node overhead: ${(this.m_nodecnt-this.m_num_nodes_for_regular)/this.m_num_nodes_for_regular*100}%`,`Tree height: ${this.getHeight()}`].join(`
`)}getHeight(){return this.m_height}};var xc=class extends Error{constructor(e){super(`found duplicate attribute: ${e.key}`)}},ce=class{constructor(e,t,n,i=!1){this.key=e;this.size=t;this.type=n;this.normalized=i;switch(n){case"BYTE":case"UNSIGNED_BYTE":this.sizeOfType=1;break;case"SHORT":case"UNSIGNED_SHORT":this.sizeOfType=2;break;case"FLOAT":this.sizeOfType=4;break;default:throw new Error(`Unknown gl type: ${n}`)}this.sizeInBytes=this.sizeOfType*t}key;size;type;normalized;sizeOfType;sizeInBytes},Ae=class{static POSITION=new ce("position",3,"FLOAT");static NORMAL=new ce("normal",3,"FLOAT");static TANGENT=new ce("tangent",3,"FLOAT");static BITANGENT=new ce("bitangent",3,"FLOAT");static UV=new ce("uv",2,"FLOAT");static MATERIAL_INDEX=new ce("materialIndex",1,"SHORT");static MATERIAL_ENABLED=new ce("materialEnabled",1,"UNSIGNED_SHORT");static AMBIENT=new ce("ambient",3,"FLOAT");static DIFFUSE=new ce("diffuse",3,"FLOAT");static SPECULAR=new ce("specular",3,"FLOAT");static SPECULAR_EXPONENT=new ce("specularExponent",3,"FLOAT");static EMISSIVE=new ce("emissive",3,"FLOAT");static TRANSMISSION_FILTER=new ce("transmissionFilter",3,"FLOAT");static DISSOLVE=new ce("dissolve",1,"FLOAT");static ILLUMINATION=new ce("illumination",1,"UNSIGNED_SHORT");static REFRACTION_INDEX=new ce("refractionIndex",1,"FLOAT");static SHARPNESS=new ce("sharpness",1,"FLOAT");static MAP_DIFFUSE=new ce("mapDiffuse",1,"SHORT");static MAP_AMBIENT=new ce("mapAmbient",1,"SHORT");static MAP_SPECULAR=new ce("mapSpecular",1,"SHORT");static MAP_SPECULAR_EXPONENT=new ce("mapSpecularExponent",1,"SHORT");static MAP_DISSOLVE=new ce("mapDissolve",1,"SHORT");static ANTI_ALIASING=new ce("antiAliasing",1,"UNSIGNED_SHORT");static MAP_BUMP=new ce("mapBump",1,"SHORT");static MAP_DISPLACEMENT=new ce("mapDisplacement",1,"SHORT");static MAP_DECAL=new ce("mapDecal",1,"SHORT");static MAP_EMISSIVE=new ce("mapEmissive",1,"SHORT");stride;attributes;attributeMap;constructor(...e){this.attributes=e,this.attributeMap={};let t=0,n=0;for(let i of e){if(this.attributeMap[i.key])throw new xc(i);t%i.sizeOfType!==0&&(t+=i.sizeOfType-t%i.sizeOfType,console.warn("Layout requires padding before "+i.key+" attribute")),this.attributeMap[i.key]={attribute:i,size:i.size,type:i.type,normalized:i.normalized,offset:t},t+=i.sizeInBytes,n=Math.max(n,i.sizeOfType)}t%n!==0&&(t+=n-t%n,console.warn("Layout requires padding at the back")),this.stride=t;for(let i of e)this.attributeMap[i.key].stride=this.stride}};var ym=/^[og]\s*(.+)?/,bm=/^mtllib /,vm=/^usemtl /,Tm=/^usemap /,ah=/\s+/,oh=new A,_c=new A,lh=new A,ch=new A,st=new A,Qa=new q;function Mm(){let o={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}let n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(i,s){let r=this._finalize(!1);r&&(r.inherited||r.groupCount<=0)&&this.materials.splice(r.index,1);let l={index:this.materials.length,name:i||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:r!==void 0?r.smooth:this.smooth,groupStart:r!==void 0?r.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(a){let c={index:typeof a=="number"?a:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(l),l},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(i){let s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),i&&this.materials.length>1)for(let r=this.materials.length-1;r>=0;r--)this.materials[r].groupCount<=0&&this.materials.splice(r,1);return i&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},n&&n.name&&typeof n.clone=="function"){let i=n.clone(0);i.inherited=!0,this.object.materials.push(i)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){let i=this.vertices,s=this.object.geometry.vertices;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addVertexPoint:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){let i=this.normals,s=this.object.geometry.normals;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addFaceNormal:function(e,t,n){let i=this.vertices,s=this.object.geometry.normals;oh.fromArray(i,e),_c.fromArray(i,t),lh.fromArray(i,n),st.subVectors(lh,_c),ch.subVectors(oh,_c),st.cross(ch),st.normalize(),s.push(st.x,st.y,st.z),s.push(st.x,st.y,st.z),s.push(st.x,st.y,st.z)},addColor:function(e,t,n){let i=this.colors,s=this.object.geometry.colors;i[e]!==void 0&&s.push(i[e+0],i[e+1],i[e+2]),i[t]!==void 0&&s.push(i[t+0],i[t+1],i[t+2]),i[n]!==void 0&&s.push(i[n+0],i[n+1],i[n+2])},addUV:function(e,t,n){let i=this.uvs,s=this.object.geometry.uvs;s.push(i[e+0],i[e+1]),s.push(i[t+0],i[t+1]),s.push(i[n+0],i[n+1])},addDefaultUV:function(){let e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){let t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,i,s,r,l,a,c){let u=this.vertices.length,h=this.parseVertexIndex(e,u),d=this.parseVertexIndex(t,u),f=this.parseVertexIndex(n,u);if(this.addVertex(h,d,f),this.addColor(h,d,f),l!==void 0&&l!==""){let p=this.normals.length;h=this.parseNormalIndex(l,p),d=this.parseNormalIndex(a,p),f=this.parseNormalIndex(c,p),this.addNormal(h,d,f)}else this.addFaceNormal(h,d,f);if(i!==void 0&&i!==""){let p=this.uvs.length;h=this.parseUVIndex(i,p),d=this.parseUVIndex(s,p),f=this.parseUVIndex(r,p),this.addUV(h,d,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";let t=this.vertices.length;for(let n=0,i=e.length;n<i;n++){let s=this.parseVertexIndex(e[n],t);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";let n=this.vertices.length,i=this.uvs.length;for(let s=0,r=e.length;s<r;s++)this.addVertexLine(this.parseVertexIndex(e[s],n));for(let s=0,r=t.length;s<r;s++)this.addUVLine(this.parseUVIndex(t[s],i))}};return o.startObject("",!1),o}var Ni=class extends Ze{constructor(e){super(e),this.materials=null}load(e,t,n,i){let s=this,r=new Kt(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(l){try{t(s.parse(l))}catch(a){i?i(a):console.error(a),s.manager.itemError(e)}},n,i)}setMaterials(e){return this.materials=e,this}parse(e){let t=new Mm;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));let n=e.split(`
`),i=[];for(let l=0,a=n.length;l<a;l++){let c=n[l].trimStart();if(c.length===0)continue;let u=c.charAt(0);if(u!=="#")if(u==="v"){let h=c.split(ah);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(Qa.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),Te),t.colors.push(Qa.r,Qa.g,Qa.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(u==="f"){let d=c.slice(1).trim().split(ah),f=[];for(let g=0,x=d.length;g<x;g++){let m=d[g];if(m.length>0){let y=m.split("/");f.push(y)}}let p=f[0];for(let g=1,x=f.length-1;g<x;g++){let m=f[g],y=f[g+1];t.addFace(p[0],m[0],y[0],p[1],m[1],y[1],p[2],m[2],y[2])}}else if(u==="l"){let h=c.substring(1).trim().split(" "),d=[],f=[];if(c.indexOf("/")===-1)d=h;else for(let p=0,g=h.length;p<g;p++){let x=h[p].split("/");x[0]!==""&&d.push(x[0]),x[1]!==""&&f.push(x[1])}t.addLineGeometry(d,f)}else if(u==="p"){let d=c.slice(1).trim().split(" ");t.addPointGeometry(d)}else if((i=ym.exec(c))!==null){let h=(" "+i[0].slice(1).trim()).slice(1);t.startObject(h)}else if(vm.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(bm.test(c))t.materialLibraries.push(c.substring(7).trim());else if(Tm.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(i=c.split(" "),i.length>1){let d=i[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;let h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}t.finalize();let s=new Xt;if(s.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let l=0,a=t.objects.length;l<a;l++){let c=t.objects[l],u=c.geometry,h=c.materials,d=u.type==="Line",f=u.type==="Points",p=!1;if(u.vertices.length===0)continue;let g=new it;g.setAttribute("position",new ze(u.vertices,3)),u.normals.length>0&&g.setAttribute("normal",new ze(u.normals,3)),u.colors.length>0&&(p=!0,g.setAttribute("color",new ze(u.colors,3))),u.hasUVIndices===!0&&g.setAttribute("uv",new ze(u.uvs,2));let x=[];for(let y=0,b=h.length;y<b;y++){let M=h[y],v=M.name+"_"+M.smooth+"_"+p,w=t.materials[v];if(this.materials!==null){if(w=this.materials.create(M.name),d&&w&&!(w instanceof St)){let T=new St;Be.prototype.copy.call(T,w),T.color.copy(w.color),w=T}else if(f&&w&&!(w instanceof mt)){let T=new mt({size:10,sizeAttenuation:!1});Be.prototype.copy.call(T,w),T.color.copy(w.color),T.map=w.map,w=T}}w===void 0&&(d?w=new St:f?w=new mt({size:1,sizeAttenuation:!1}):w=new fs,w.name=M.name,w.flatShading=!M.smooth,w.vertexColors=p,t.materials[v]=w),x.push(w)}let m;if(x.length>1){for(let y=0,b=h.length;y<b;y++){let M=h[y];g.addGroup(M.groupStart,M.groupCount,y)}d?m=new yn(g,x):f?m=new Yt(g,x):m=new pt(g,x)}else d?m=new yn(g,x[0]):f?m=new Yt(g,x[0]):m=new pt(g,x[0]);m.name=c.name,s.add(m)}else if(t.vertices.length>0){let l=new mt({size:1,sizeAttenuation:!1}),a=new it;a.setAttribute("position",new ze(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(a.setAttribute("color",new ze(t.colors,3)),l.vertexColors=!0);let c=new Yt(a,l);s.add(c)}return s}};var Di=class o{vertices;vertexNormals;textures;indices;name="";vertexMaterialIndices;indicesPerMaterial=[];materialNames;materialIndices;materialsByIndex={};tangents=[];bitangents=[];textureStride;constructor(e={}){this.vertices=[],this.vertexNormals=[],this.textures=[],this.indices=[],this.vertexMaterialIndices=[],this.materialNames=[],this.materialIndices={},this.textureStride=e.enableWTextureCoord?3:2}static loadObjFile(e,t){t=t||{},t.materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord;let i=new Ni().parse(e);return o.fromThreeObject(i,t)}static fromThreeObject(e,t){t=t||{},t.materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord;let n=r=>Array.from(r.array),i=r=>{let l=r.getIndex();if(l)return Array.from(l.array);let a=r.getAttribute("position");return a?Array.from({length:a.count},(c,u)=>u):[]},s=[];return e.traverse(r=>{let l=r;if(!l.isMesh)return;let a=l.geometry,c=a.getAttribute("position");if(!c||c.count===0)return;let u=new o(t);u.name=l.name||"",u.vertices=n(c);let h=a.getAttribute("normal");if(h)u.vertexNormals=n(h);else{let f=a.clone();f.computeVertexNormals();let p=f.getAttribute("normal");u.vertexNormals=p?n(p):new Array(c.count*3).fill(0)}let d=a.getAttribute("uv");if(d){let f=n(d);if(t.enableWTextureCoord){u.textures=[];for(let p=0;p<f.length;p+=2)u.textures.push(f[p],f[p+1],0)}else u.textures=f}else u.textures=[];u.indices=i(a),u.indicesPerMaterial=[u.indices],t.calcTangentsAndBitangents&&u.textures.length>0&&u.calculateTangentsAndBitangents(),s.push(u)}),s}finalizeMesh(e,t,n,i,s){this.vertices=t.verts,this.vertexNormals=t.norms,this.textures=t.textures,this.vertexMaterialIndices=t.materialIndices,this.indices=t.indices[n],this.indicesPerMaterial=t.indices,this.materialNames=i,this.materialIndices=s,this.materialsByIndex={},e.calcTangentsAndBitangents&&this.calculateTangentsAndBitangents()}calculateTangentsAndBitangents(){console.assert(!!(this.vertices&&this.vertices.length&&this.vertexNormals&&this.vertexNormals.length&&this.textures&&this.textures.length),"Missing attributes for calculating tangents and bitangents");let e={tangents:[...new Array(this.vertices.length)].map(r=>0),bitangents:[...new Array(this.vertices.length)].map(r=>0)},t=this.indices,n=this.vertices,i=this.vertexNormals,s=this.textures;for(let r=0;r<t.length;r+=3){let l=t[r+0],a=t[r+1],c=t[r+2],u=n[l*3+0],h=n[l*3+1],d=n[l*3+2],f=s[l*2+0],p=s[l*2+1],g=n[a*3+0],x=n[a*3+1],m=n[a*3+2],y=s[a*2+0],b=s[a*2+1],M=n[c*3+0],v=n[c*3+1],w=n[c*3+2],T=s[c*2+0],S=s[c*2+1],E=g-u,I=x-h,N=m-d,D=M-u,G=v-h,U=w-d,R=y-f,H=b-p,P=T-f,ne=S-p,B=R*ne-H*P,F=1/Math.abs(B<1e-4?1:B),ae=(E*ne-D*H)*F,j=(I*ne-G*H)*F,W=(N*ne-U*H)*F,we=(D*R-E*P)*F,Qe=(G*R-I*P)*F,yt=(U*R-N*P)*F,ei=i[l*3+0],rn=i[l*3+1],me=i[l*3+2],Wr=i[a*3+0],Xr=i[a*3+1],Yr=i[a*3+2],qr=i[c*3+0],jr=i[c*3+1],Kr=i[c*3+2],vo=ae*ei+j*rn+W*me,To=ae*Wr+j*Xr+W*Yr,Mo=ae*qr+j*jr+W*Kr,So=ae-ei*vo,wo=j-rn*vo,Eo=W-me*vo,Ao=ae-Wr*To,Ro=j-Xr*To,Co=W-Yr*To,Io=ae-qr*Mo,Lo=j-jr*Mo,Po=W-Kr*Mo,No=Math.sqrt(So*So+wo*wo+Eo*Eo),Do=Math.sqrt(Ao*Ao+Ro*Ro+Co*Co),Fo=Math.sqrt(Io*Io+Lo*Lo+Po*Po),Uo=we*ei+Qe*rn+yt*me,Bo=we*Wr+Qe*Xr+yt*Yr,Oo=we*qr+Qe*jr+yt*Kr,Go=we-ei*Uo,zo=Qe-rn*Uo,ko=yt-me*Uo,Vo=we-Wr*Bo,$o=Qe-Xr*Bo,Ho=yt-Yr*Bo,Wo=we-qr*Oo,Xo=Qe-jr*Oo,Yo=yt-Kr*Oo,qo=Math.sqrt(Go*Go+zo*zo+ko*ko),jo=Math.sqrt(Vo*Vo+$o*$o+Ho*Ho),Ko=Math.sqrt(Wo*Wo+Xo*Xo+Yo*Yo);e.tangents[l*3+0]+=So/No,e.tangents[l*3+1]+=wo/No,e.tangents[l*3+2]+=Eo/No,e.tangents[a*3+0]+=Ao/Do,e.tangents[a*3+1]+=Ro/Do,e.tangents[a*3+2]+=Co/Do,e.tangents[c*3+0]+=Io/Fo,e.tangents[c*3+1]+=Lo/Fo,e.tangents[c*3+2]+=Po/Fo,e.bitangents[l*3+0]+=Go/qo,e.bitangents[l*3+1]+=zo/qo,e.bitangents[l*3+2]+=ko/qo,e.bitangents[a*3+0]+=Vo/jo,e.bitangents[a*3+1]+=$o/jo,e.bitangents[a*3+2]+=Ho/jo,e.bitangents[c*3+0]+=Wo/Ko,e.bitangents[c*3+1]+=Xo/Ko,e.bitangents[c*3+2]+=Yo/Ko}this.tangents=e.tangents,this.bitangents=e.bitangents}makeBufferData(e){let t=this.vertices.length/3,n=new ArrayBuffer(e.stride*t);n.numItems=t;let i=new DataView(n);for(let s=0,r=0;s<t;s++){r=s*e.stride;for(let l of e.attributes){let a=r+e.attributeMap[l.key].offset;switch(l.key){case Ae.POSITION.key:i.setFloat32(a,this.vertices[s*3],!0),i.setFloat32(a+4,this.vertices[s*3+1],!0),i.setFloat32(a+8,this.vertices[s*3+2],!0);break;case Ae.UV.key:i.setFloat32(a,this.textures[s*2],!0),i.setFloat32(a+4,this.textures[s*2+1],!0);break;case Ae.NORMAL.key:i.setFloat32(a,this.vertexNormals[s*3],!0),i.setFloat32(a+4,this.vertexNormals[s*3+1],!0),i.setFloat32(a+8,this.vertexNormals[s*3+2],!0);break;case Ae.MATERIAL_INDEX.key:i.setInt16(a,this.vertexMaterialIndices[s],!0);break;case Ae.AMBIENT.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.ambient[0],!0),i.setFloat32(a+4,u.ambient[1],!0),i.setFloat32(a+8,u.ambient[2],!0);break}case Ae.DIFFUSE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.diffuse[0],!0),i.setFloat32(a+4,u.diffuse[1],!0),i.setFloat32(a+8,u.diffuse[2],!0);break}case Ae.SPECULAR.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.specular[0],!0),i.setFloat32(a+4,u.specular[1],!0),i.setFloat32(a+8,u.specular[2],!0);break}case Ae.SPECULAR_EXPONENT.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.specularExponent,!0);break}case Ae.EMISSIVE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.emissive[0],!0),i.setFloat32(a+4,u.emissive[1],!0),i.setFloat32(a+8,u.emissive[2],!0);break}case Ae.TRANSMISSION_FILTER.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.transmissionFilter[0],!0),i.setFloat32(a+4,u.transmissionFilter[1],!0),i.setFloat32(a+8,u.transmissionFilter[2],!0);break}case Ae.DISSOLVE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.dissolve,!0);break}case Ae.ILLUMINATION.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setInt16(a,u.illumination,!0);break}case Ae.REFRACTION_INDEX.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.refractionIndex,!0);break}case Ae.SHARPNESS.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.sharpness,!0);break}case Ae.ANTI_ALIASING.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setInt16(a,u.antiAliasing?1:0,!0);break}}}}return n}makeIndexBufferData(){let e=new Uint16Array(this.indices);return e.numItems=this.indices.length,e}makeIndexBufferDataForMaterials(...e){let t=new Array().concat(...e.map(i=>this.indicesPerMaterial[i])),n=new Uint16Array(t);return n.numItems=t.length,n}addMaterialLibrary(e){for(let t in e.materials){if(!(t in this.materialIndices))continue;let n=e.materials[t],i=this.materialIndices[n.name];this.materialsByIndex[i]=n}}};var eo=class{static async loadObjFileAsync(e){let t=new Ni;try{let n=await t.loadAsync(e);return Di.fromThreeObject(n)}catch{let i=await he(e);if(!i.ok)throw new Error(`Failed to load OBJ file: ${i.statusText}`);let s=await i.text();return Di.loadObjFile(s)}}};var As=class{static degrees(e){return e*(180/Math.PI)}static radians(e){return e*(Math.PI/180)}static clamp(e,t,n){return Math.min(n,Math.max(e,t))}};var bn=class{name="";verticesUVX=[];normalsUVY=[];bvh;constructor(){this.bvh=new Ja(2,64,0,.001,0)}dispose(){this.verticesUVX=[],this.normalsUVY=[],this.bvh=null}async loadFromFileAsync(e){this.name=e;let t=[];try{t=await eo.loadObjFileAsync(e)}catch(n){return console.error("Unable to load model",n),!1}for(let n of t){let i=n.vertices,s=n.vertexNormals,r=n.textures;for(let l=0;l<n.indices.length;l+=3)for(let a=0;a<3;a++){let c=n.indices[l+a],u=i[3*c+0],h=i[3*c+1],d=i[3*c+2],f=s[3*c+0],p=s[3*c+1],g=s[3*c+2],x,m;r&&r.length>0?(x=r[2*c+0],m=1-r[2*c+1]):a===0?x=m=0:a===1?(x=0,m=1):x=m=1,this.verticesUVX.push(new X(u,h,d,x)),this.normalsUVY.push(new X(f,p,g,m))}}return!0}buildBVH(){let e=Math.floor(this.verticesUVX.length/3),t=new Array(e);for(let n=0;n<e;++n){let i=new _(this.verticesUVX[n*3+0].x,this.verticesUVX[n*3+0].y,this.verticesUVX[n*3+0].z),s=new _(this.verticesUVX[n*3+1].x,this.verticesUVX[n*3+1].y,this.verticesUVX[n*3+1].z),r=new _(this.verticesUVX[n*3+2].x,this.verticesUVX[n*3+2].y,this.verticesUVX[n*3+2].z),l=new K;l.grow(i),l.grow(s),l.grow(r),t[n]=l}this.bvh.build(t)}},vn=class{name;meshID;transform;materialID;constructor(e,t,n,i){this.name=e,this.meshID=t,this.transform=n,this.materialID=i}};var Fi=class{renderOptions=new ni;meshes=[];transforms=[];materials=[];meshInstances=[];lights=[];envMap=null;camera=null;textures=[];proceduralMaterialGlsl="";proceduralEnvGlsl="";materialxEnvStrategy="cpu";materialxLightStrategy="cpu";initialized=!1;dirty=!0;instancesModified=!1;envMapModified=!1;sceneName;constructor(e){this.sceneName=e}dispose(){this.meshes.forEach(e=>e.dispose?.()),this.meshes=[],this.textures.forEach(e=>e.dispose?.()),this.textures=[],this.proceduralMaterialGlsl="",this.proceduralEnvGlsl="",this.materialxEnvStrategy="cpu",this.materialxLightStrategy="cpu",this.camera=null,this.envMap=null}createRenderer(){throw new Error("Unsupported render mode")}addCamera(e,t,n){this.camera=new ai(e,t,n)}async addMeshAsync(e){let t=this.meshes.findIndex(i=>i.name===`scenes/pathtracer/${e}`);if(t!==-1)return t;let n=new bn;return console.log(`Loading model ${e}`),await n.loadFromFileAsync(`scenes/pathtracer/${e}`)?(this.meshes.push(n),this.meshes.length-1):(console.log(`Unable to load model ${e}`),-1)}async addTextureAsync(e){let t=this.textures.findIndex(i=>i.name===`scenes/pathtracer/${e}`);if(t!==-1)return t;let n=new bt;return console.log(`Loading texture ${e}`),e.startsWith("http")||(e=`scenes/pathtracer/${e}`),await n.loadTextureAsync(e)?(this.textures.push(n),this.textures.length-1):(console.log(`Unable to load texture ${e}`),-1)}async addTextureByUrlAsync(e){let t=this.textures.findIndex(i=>i.name===e);if(t!==-1)return t;let n=new bt;return console.log(`Loading texture ${e}`),await n.loadTextureAsync(e)?(this.textures.push(n),this.textures.length-1):(console.log(`Unable to load texture ${e}`),-1)}addMaterial(e){return this.materials.push(e),this.materials.length-1}async addEnvMapAsync(e){this.envMap&&(this.envMap.dispose(),this.envMap=null),this.envMap=new Es,await this.envMap.loadMapAsync(`/scenes/pathtracer/${e}`)?console.log(`HDR ${e} loaded`):(console.log(`Unable to load HDR ${e}`),this.envMap=null),this.envMapModified=!0,this.dirty=!0}async addEnvMapByUrlAsync(e){this.envMap&&(this.envMap.dispose(),this.envMap=null),this.envMap=new Es;let t=e.startsWith("/")||e.startsWith("http")?e:`/${e}`;await this.envMap.loadMapAsync(t)?console.log(`HDR ${e} loaded`):(console.log(`Unable to load HDR ${e}`),this.envMap=null),this.envMapModified=!0,this.dirty=!0}addMeshInstance(e){return this.meshInstances.push(e),this.meshInstances.length-1}addLight(e){return this.lights.push(e),this.lights.length-1}rebuildInstances(){}async processSceneAsync(){}getDefines(e=!1){let t="",n="";return this.renderOptions.enableEnvMap&&(e||this.envMap)&&(t+=`#define OPT_ENVMAP
`),this.lights&&this.lights.length>0&&(t+=`#define OPT_LIGHTS
`),this.renderOptions.enableRR&&(t+=`#define OPT_RR
`,t+=`#define OPT_RR_DEPTH ${this.renderOptions.RRDepth}
`),this.renderOptions.enableUniformLight&&(t+=`#define OPT_UNIFORM_LIGHT
`),this.renderOptions.openglNormalMap&&(t+=`#define OPT_OPENGL_NORMALMAP
`),this.renderOptions.hideEmitters&&(t+=`#define OPT_HIDE_EMITTERS
`),this.renderOptions.enableBackground&&(t+=`#define OPT_BACKGROUND
`,n+=`#define OPT_BACKGROUND
`),this.renderOptions.transparentBackground&&(t+=`#define OPT_TRANSPARENT_BACKGROUND
`,n+=`#define OPT_TRANSPARENT_BACKGROUND
`),this.materials&&this.materials.some(r=>r.alphaMode!==0)&&(t+=`#define OPT_ALPHA_TEST
`),this.renderOptions.enableRoughnessMollification&&(t+=`#define OPT_ROUGHNESS_MOLLIFICATION
`),(this.materials&&this.materials.some(r=>r.mediumType!==0)||this.renderOptions.sssMode!==0)&&(t+=`#define OPT_MEDIUM
`),this.renderOptions.enableVolumeMIS&&(t+=`#define OPT_VOL_MIS
`),this.materials&&this.materials.some(r=>r.dispersionScale&&r.dispersionScale>0)&&(t+=`#define OPENPBR_DISPERSION
`),t+=`#define SSS_MODE ${this.renderOptions.sssMode===1?1:this.renderOptions.sssMode===2?2:0}
`,this.renderOptions.useThinFilmLUT&&(t+=`#define OPT_THINFILM_LUT
`),this.proceduralMaterialGlsl.includes("gMaterialXClosureContractValid")&&(t+=`#define OPT_MATERIALX_RUNTIME
`),(this.proceduralEnvGlsl?.trim().length??0)>0&&(t+=`#define OPT_MATERIALX_ENV_RUNTIME
`),[t,n]}};var gt=class extends Fi{vertIndices=[];verticesUVX=[];normalsUVY=[];sceneBvh;bvhTranslator=new ia;sceneBounds=new K;textureMapsArray=new Uint8Array;constructor(e){super(e),this.sceneBvh=new Dn(10,64,!1)}createRenderer(){return new ii(this)}dispose(){super.dispose(),this.bvhTranslator=null,this.sceneBvh=null,this.textureMapsArray=null}largePush(e,t){let n=e.length;for(let i=0;i<n;i++)t.push(e[i])}createTLAS(){let e=this.meshInstances.map((t,n)=>{let s=this.meshes[t.meshID].bvh.bounds(),r=t.transform,l=s.pmin,a=s.pmax,c=new _(r.data[0][0],r.data[0][1],r.data[0][2]),u=new _(r.data[1][0],r.data[1][1],r.data[1][2]),h=new _(r.data[2][0],r.data[2][1],r.data[2][2]),d=new _(r.data[3][0],r.data[3][1],r.data[3][2]),f=c.scale(l.x),p=c.scale(a.x),g=u.scale(l.y),x=u.scale(a.y),m=h.scale(l.z),y=h.scale(a.z),b=_.min(f,p).add(_.min(g,x)).add(_.min(m,y)).add(d),M=_.max(f,p).add(_.max(g,x)).add(_.max(m,y)).add(d);return new K(b,M)});this.sceneBvh.build(e),this.sceneBounds=this.sceneBvh.bounds()}createBLAS(){this.meshes.forEach(e=>{console.log(`Building BVH for ${e.name}`),e.buildBVH()})}get topLevelIndex(){return this.bvhTranslator.topLevelIndex}rebuildInstances(){this.instancesModified=!0,this.dirty=!0,this.sceneBvh=new Dn(10,64,!1),this.createTLAS(),this.bvhTranslator.updateTLAS(this.sceneBvh,this.meshInstances),this.transforms=this.meshInstances.map(e=>e.transform)}async processSceneAsync(){console.log("Processing scene data"),this.createBLAS(),console.log("Building scene BVH"),this.createTLAS(),console.log("Flattening BVH"),this.bvhTranslator.process(this.sceneBvh,this.meshes,this.meshInstances);let e=0;this.vertIndices=[],this.verticesUVX=[],this.normalsUVY=[],console.log("Copying Mesh Data");for(let t of this.meshes){let n=t.bvh.getNumIndices(),i=t.bvh.getIndices();for(let s=0;s<n;s++){let r=i[s],l=r*3+0+e,a=r*3+1+e,c=r*3+2+e;this.vertIndices.push({x:l,y:a,z:c})}this.largePush(t.verticesUVX,this.verticesUVX),this.largePush(t.normalsUVY,this.normalsUVY),e+=t.verticesUVX.length}if(console.log("Copying transforms"),this.transforms=this.meshInstances.map(t=>t.transform),this.textures.length>0){console.log("Copying and resizing textures");let t=L.gl,n=16384;if(t&&(n=t.raw.getParameter(t.raw.MAX_TEXTURE_SIZE)),this.renderOptions.texArrayHeight*this.textures.length>n){let l=this.renderOptions.texArrayWidth,a=this.renderOptions.texArrayHeight;for(;a*this.textures.length>n;)a=Math.floor(a/2),l=Math.floor(l/2);this.renderOptions.texArrayWidth=l,this.renderOptions.texArrayHeight=a}let i=this.renderOptions.texArrayWidth,s=this.renderOptions.texArrayHeight,r=i*s*4;this.textureMapsArray=new Uint8Array(r*this.textures.length);for(let l=0;l<this.textures.length;l++){let a=this.textures[l],c=null;a.image!==null?c=au(a.image,i,s,a.flipY):c=await(await import("sharp")).default(Buffer.from(a.rgba),{raw:{width:a.width,height:a.height,channels:4}}).resize(i,s).flip(a.flipY).raw().toBuffer(),this.textureMapsArray.set(c,l*r)}}if(!this.camera){let t=this.sceneBvh.bounds(),n=t.extents(),i=t.center();this.addCamera(new _(i.x,i.y,i.z+_.Length(n)*2),i,45)}this.initialized=!0}bvhData(e=null){let t=e===null?this.bvhTranslator.nodes:this.bvhTranslator.nodes.slice(e);return new Float32Array(t.flatMap(i=>[i.bboxmin.x,i.bboxmin.y,i.bboxmin.z,i.bboxmax.x,i.bboxmax.y,i.bboxmax.z,i.LRLeaf.x,i.LRLeaf.y,i.LRLeaf.z]))}vertIndicesData(){return new Int32Array(this.vertIndices.flatMap(t=>[t.x,t.y,t.z]))}verticesData(){return new Float32Array(this.verticesUVX.flatMap(t=>[t.x,t.y,t.z,t.w]))}normalsData(){return new Float32Array(this.normalsUVY.flatMap(t=>[t.x,t.y,t.z,t.w]))}materialsData(){return new Float32Array(this.materials.flatMap(t=>t.toVec4Array().flatMap(n=>[n.x,n.y,n.z,n.w])))}transformsData(){return new Float32Array(this.transforms.flatMap(t=>[t.data[0][0],t.data[0][1],t.data[0][2],t.data[0][3],t.data[1][0],t.data[1][1],t.data[1][2],t.data[1][3],t.data[2][0],t.data[2][1],t.data[2][2],t.data[2][3],t.data[3][0],t.data[3][1],t.data[3][2],t.data[3][3]]))}lightsData(){return new Float32Array(this.lights.flatMap(t=>[t.position.x,t.position.y,t.position.z,t.emission.x,t.emission.y,t.emission.z,t.u.x,t.u.y,t.u.z,t.v.x,t.v.y,t.v.z,t.radius,t.area,t.type]))}computeSceneData(e){let t=new yc,n=[],i=this.materials.map(T=>T.toVec4Array()).flat();n=n.concat(i);let s=this.transforms.map(T=>[new X(T.data[0][0],T.data[0][1],T.data[0][2],T.data[0][3]),new X(T.data[1][0],T.data[1][1],T.data[1][2],T.data[1][3]),new X(T.data[2][0],T.data[2][1],T.data[2][2],T.data[2][3]),new X(T.data[3][0],T.data[3][1],T.data[3][2],T.data[3][3])]).flat();n=n.concat(s);let r=this.lights.map(T=>[new X(T.position.x,T.position.y,T.position.z,0),new X(T.emission.x,T.emission.y,T.emission.z,0),new X(T.u.x,T.u.y,T.u.z,0),new X(T.v.x,T.v.y,T.v.z,0),new X(T.radius,T.area,T.type,0)]).flat();n=n.concat(r);let l=this.bvhTranslator.nodes.map(T=>[new X(T.bboxmin.x,T.bboxmin.y,T.bboxmin.z,0),new X(T.bboxmax.x,T.bboxmax.y,T.bboxmax.z,0),new X(T.LRLeaf.x,T.LRLeaf.y,T.LRLeaf.z,0)]).flat();n=n.concat(l);let a=this.vertIndices.map(T=>new X(T.x,T.y,T.z,0));n=n.concat(a);let c=this.verticesUVX.map(T=>new X(T.x,T.y,T.z,T.w));n=n.concat(c);let u=this.normalsUVY.map(T=>new X(T.x,T.y,T.z,T.w));n=n.concat(u);let h=0,d=h+i.length,f=d+s.length,p=f+r.length,g=p+l.length,x=g+a.length,m=x+c.length,y="";this.textures.length>0&&!e?y=`
int textureMapsArrayIndices[${this.textures.length}] = int[](${this.textures.map((T,S)=>S).join(", ")});
`:y=`
int textureMapsArrayIndices[1] = int[](0);
`,t.materialsIndex=h,t.transformsIndex=d,t.lightsIndex=f,t.bvhIndex=p,t.vertexIndicesIndex=g,t.verticesIndex=x,t.normalsIndex=m,t.data=n;let b=new ArrayBuffer(n.length*4*4),M=new Float32Array(b);for(let T=0;T<n.length;T++)M[T*4+0]=n[T].x,M[T*4+1]=n[T].y,M[T*4+2]=n[T].z,M[T*4+3]=n[T].w;t.buffer=b,this.textureMapsArray.length>0&&(t.textureBuffer=this.textureMapsArray.buffer,t.textureWidth=this.renderOptions.texArrayWidth,t.textureHeight=this.renderOptions.texArrayHeight*this.textures.length);let v=this.getDefines(!0)[0].trim(),w=t.data.length>1e3;return t.commonCode=`${w&&!e?"#define OPT_USE_MESHDATA_BLOB":""}
        
${v.trim()}
`.trim(),t.bufferACode=`
vec3 eye = vec3(${this.camera.position.x.toFixed(6)}, ${this.camera.position.y.toFixed(6)}, ${this.camera.position.z.toFixed(6)});
vec3 lookat = vec3(${this.camera.pivot.x.toFixed(6)}, ${this.camera.pivot.y.toFixed(6)}, ${this.camera.pivot.z.toFixed(6)});
float fov = ${(this.camera.fov/Math.PI*180).toFixed(6)};
`.trim(),t.bufferBCode=`
    #define materialsTex (${`${h} + MESH_DATA_OFFSET`})
    #define transformsTex (${`${d} + MESH_DATA_OFFSET`})
    #define lightsTex (${`${f} + MESH_DATA_OFFSET`})
    #define BVH (${`${p} + MESH_DATA_OFFSET`})
    #define vertexIndicesTex (${`${g} + MESH_DATA_OFFSET`})
    #define verticesTex (${`${x} + MESH_DATA_OFFSET`})
    #define normalsTex (${`${m} + MESH_DATA_OFFSET`})

    //-------------------------- Uniforms ---------------------------

    vec3 uniformLightCol = vec3(${this.renderOptions.uniformLightCol.x.toFixed(6)}, ${this.renderOptions.uniformLightCol.y.toFixed(6)}, ${this.renderOptions.uniformLightCol.z.toFixed(6)});
    int numOfLights = ${this.lights.length};
    int numOfMaterials = ${this.materials.length};
    int maxDepth = ${this.renderOptions.maxDepth};
    int topBVHIndex = ${this.bvhTranslator.topLevelIndex};
    float roughnessMollificationAmt = ${this.renderOptions.roughnessMollificationAmt.toFixed(6)};
    float envMapIntensity = ${this.renderOptions.envMapIntensity.toFixed(6)};
    ${y}
`.trim(),t.bufferDCode=`
bool enableTonemap = ${this.renderOptions.enableTonemap?"true":"false"};
bool enableAces = ${this.renderOptions.enableAces?"true":"false"};
bool simpleAcesFit = ${this.renderOptions.simpleAcesFit?"true":"false"};
vec3 backgroundCol = vec3(${this.renderOptions.backgroundCol.x.toFixed(6)}, ${this.renderOptions.backgroundCol.y.toFixed(6)}, ${this.renderOptions.backgroundCol.z.toFixed(6)});
`.trim(),t}generateMeshCode(e,t){function n(d){return`vec4(${d.x.toFixed(6)},${d.y.toFixed(6)},${d.z.toFixed(6)},${d.w.toFixed(6)})`}let i=new Map,s=[];for(let d=e.materialsIndex;d<e.transformsIndex;d+=9)s.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3],e.data[d+4],e.data[d+5],e.data[d+6],e.data[d+7],e.data[d+8]]);i.set("Materials",s);let r=[];for(let d=e.transformsIndex;d<e.lightsIndex;d+=4)r.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3]]);i.set("Transforms",r);let l=[];for(let d=e.lightsIndex;d<e.bvhIndex;d+=5)l.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3],e.data[d+4]]);if(i.set("Lights",l),!t){let d=[];for(let x=e.bvhIndex;x<e.vertexIndicesIndex;x+=3)d.push([e.data[x+0],e.data[x+1],e.data[x+2]]);i.set("BVH",d);let f=[];for(let x=e.vertexIndicesIndex;x<e.verticesIndex;x++)f.push([e.data[x]]);i.set("Vertex Indices",f);let p=[];for(let x=e.verticesIndex;x<e.normalsIndex;x++)p.push([e.data[x]]);i.set("Vertices",p);let g=[];for(let x=e.normalsIndex;x<e.data.length;x++)g.push([e.data[x]]);i.set("Normals",g)}let a="        ",c=0,u="";return i.forEach((d,f)=>{u+=a+`// ${f}
`,d.forEach(p=>{u+=a,p.forEach(g=>{u+=n(g)+(c<e.data.length-1?",":""),c++}),u+=`
`})}),`
#define VEC4_COUNT ${t?e.bvhIndex:e.data.length}

vec4[VEC4_COUNT] getData() {
    vec4 data[VEC4_COUNT] = vec4[](
${u.trimEnd()}
    );
    return data;
}
`.trim().trim()}},yc=class{commonCode;bufferACode;bufferBCode;bufferDCode;buffer;textureBuffer;textureWidth;textureHeight;data;bvhIndex;vertexIndicesIndex;verticesIndex;normalsIndex;materialsIndex;transformsIndex;lightsIndex};var Ui=class extends Fi{shadertoyShader=null;constructor(e){super(e)}createRenderer(){return new si(this)}async processSceneAsync(){this.camera||this.addCamera(new _(0,0,2),new _(0,0,0),45),this.initialized=!0}};var ie=class o{data;constructor(e=1,t=0,n=0,i=0,s=0,r=1,l=0,a=0,c=0,u=0,h=1,d=0,f=0,p=0,g=0,x=1){this.data=[[e,t,n,i],[s,r,l,a],[c,u,h,d],[f,p,g,x]]}static Translate(e){let t=new o;return t.data[3][0]=e.x,t.data[3][1]=e.y,t.data[3][2]=e.z,t}static Scale(e){let t=new o;return t.data[0][0]=e.x,t.data[1][1]=e.y,t.data[2][2]=e.z,t}static QuatToMatrix(e,t,n,i){let s=new o,r=e+e,l=t+t,a=n+n,c=e*r,u=e*l,h=e*a,d=t*l,f=t*a,p=n*a,g=i*r,x=i*l,m=i*a;return s.data[0][0]=1-(d+p),s.data[0][1]=u+m,s.data[0][2]=h-x,s.data[0][3]=0,s.data[1][0]=u-m,s.data[1][1]=1-(c+p),s.data[1][2]=f+g,s.data[1][3]=0,s.data[2][0]=h+x,s.data[2][1]=f-g,s.data[2][2]=1-(c+d),s.data[2][3]=0,s.data[3][0]=0,s.data[3][1]=0,s.data[3][2]=0,s.data[3][3]=1,s}multiply(e){let t=new o;for(let n=0;n<4;++n)for(let i=0;i<4;++i){t.data[n][i]=0;for(let s=0;s<4;++s)t.data[n][i]+=this.data[n][s]*e.data[s][i]}return t}get(e){return this.data[e]}decompose(){let e=new _(this.data[3][0],this.data[3][1],this.data[3][2]),t=new _(Math.sqrt(this.data[0][0]*this.data[0][0]+this.data[0][1]*this.data[0][1]+this.data[0][2]*this.data[0][2]),Math.sqrt(this.data[1][0]*this.data[1][0]+this.data[1][1]*this.data[1][1]+this.data[1][2]*this.data[1][2]),Math.sqrt(this.data[2][0]*this.data[2][0]+this.data[2][1]*this.data[2][1]+this.data[2][2]*this.data[2][2])),n=new _(this.data[0][0]/t.x,this.data[1][1]/t.y,this.data[2][2]/t.z);return{translation:e,scale:t,rotation:n}}static fromDecomposed(e,t,n){let i=o.QuatToMatrix(n.x,n.y,n.z,1),s=o.Scale(t);return o.Translate(e).multiply(s).multiply(i)}};function bc(o,e){if(e===uc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===Pi||e===ws){let t=o.getIndex();if(t===null){let r=[],l=o.getAttribute("position");if(l!==void 0){for(let a=0;a<l.count;a++)r.push(a);o.setIndex(r),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}let n=t.count-2,i=[];if(e===Pi)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=o.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}function hh(o){let e=new Map,t=new Map,n=o.clone();return dh(o,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let s=i,r=e.get(i),l=r.skeleton.bones;s.skeleton=r.skeleton.clone(),s.bindMatrix.copy(r.bindMatrix),s.skeleton.bones=l.map(function(a){return t.get(a)}),s.bind(s.skeleton,s.bindMatrix)}),n}function dh(o,e,t){t(o,e);for(let n=0;n<o.children.length;n++)dh(o.children[n],e.children[n],t)}var to=class extends Ze{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ac(t)}),this.register(function(t){return new Rc(t)}),this.register(function(t){return new Bc(t)}),this.register(function(t){return new Oc(t)}),this.register(function(t){return new Gc(t)}),this.register(function(t){return new Ic(t)}),this.register(function(t){return new Lc(t)}),this.register(function(t){return new Pc(t)}),this.register(function(t){return new Nc(t)}),this.register(function(t){return new Ec(t)}),this.register(function(t){return new Dc(t)}),this.register(function(t){return new Cc(t)}),this.register(function(t){return new Uc(t)}),this.register(function(t){return new Fc(t)}),this.register(function(t){return new Sc(t)}),this.register(function(t){return new no(t,Q.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new no(t,Q.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new zc(t)})}load(e,t,n,i){let s=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let c=Zt.extractUrlBase(e);r=Zt.resolveURL(c,this.path)}else r=Zt.extractUrlBase(e);this.manager.itemStart(e);let l=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},a=new Kt(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(c){try{s.parse(c,r,function(u){t(u),s.manager.itemEnd(e)},l)}catch(u){l(u)}},n,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,r={},l={},a=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(a.decode(new Uint8Array(e,0,4))===xh){try{r[Q.KHR_BINARY_GLTF]=new kc(e)}catch(h){i&&i(h);return}s=JSON.parse(r[Q.KHR_BINARY_GLTF].content)}else s=JSON.parse(a.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new qc(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case Q.KHR_MATERIALS_UNLIT:r[h]=new wc;break;case Q.KHR_DRACO_MESH_COMPRESSION:r[h]=new Vc(s,this.dracoLoader);break;case Q.KHR_TEXTURE_TRANSFORM:r[h]=new $c;break;case Q.KHR_MESH_QUANTIZATION:r[h]=new Hc;break;default:d.indexOf(h)>=0&&l[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(r),c.setPlugins(l),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function Sm(){let o={};return{get:function(e){return o[e]},add:function(e,t){o[e]=t},remove:function(e){delete o[e]},removeAll:function(){o={}}}}function ye(o,e,t){let n=o.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var Q={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Sc=class{constructor(e){this.parser=e,this.name=Q.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,a=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,u=new q(16777215);a.color!==void 0&&u.setRGB(a.color[0],a.color[1],a.color[2],Ue);let h=a.range!==void 0?a.range:0;switch(a.type){case"directional":c=new Ts(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new vs(u),c.distance=h;break;case"spot":c=new bs(u),c.distance=h,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle!==void 0?a.spot.innerConeAngle:0,a.spot.outerConeAngle=a.spot.outerConeAngle!==void 0?a.spot.outerConeAngle:Math.PI/4,c.angle=a.spot.outerConeAngle,c.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+a.type)}return c.position.set(0,0,0),Lt(c,a),a.intensity!==void 0&&(c.intensity=a.intensity),c.name=t.createUniqueName(a.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],l=(s.extensions&&s.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(a){return n._getNodeRef(t.cache,l,a)})}},wc=class{constructor(){this.name=Q.KHR_MATERIALS_UNLIT}getMaterialType(){return Mt}extendParams(e,t,n){let i=[];e.color=new q(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],Ue),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Te))}return Promise.all(i)}},Ec=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Ac=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(s,s)}return Promise.all(i)}},Rc=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_DISPERSION}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Cc=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},Ic=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_SHEEN}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new q(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Ue)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Te)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Lc=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Pc=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_VOLUME}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let s=n.attenuationColor||[1,1,1];return t.attenuationColor=new q().setRGB(s[0],s[1],s[2],Ue),Promise.all(i)}},Nc=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_IOR}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Dc=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_SPECULAR}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let s=n.specularColorFactor||[1,1,1];return t.specularColor=new q().setRGB(s[0],s[1],s[2],Ue),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Te)),Promise.all(i)}},Fc=class{constructor(e){this.parser=e,this.name=Q.EXT_MATERIALS_BUMP}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Uc=class{constructor(e){this.parser=e,this.name=Q.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return ye(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=ye(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Bc=class{constructor(e){this.parser=e,this.name=Q.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}},Oc=class{constructor(e){this.parser=e,this.name=Q.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],l=i.images[r.source],a=n.textureLoader;if(l.uri){let c=n.options.manager.getHandler(l.uri);c!==null&&(a=c)}return n.loadTextureImage(e,r.source,a)}},Gc=class{constructor(e){this.parser=e,this.name=Q.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],l=i.images[r.source],a=n.textureLoader;if(l.uri){let c=n.options.manager.getHandler(l.uri);c!==null&&(a=c)}return n.loadTextureImage(e,r.source,a)}},no=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(l){let a=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(l,a,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){let f=new ArrayBuffer(u*h);return r.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}},zc=class{constructor(e){this.name=Q.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==rt.TRIANGLES&&c.mode!==rt.TRIANGLE_STRIP&&c.mode!==rt.TRIANGLE_FAN&&c.mode!==void 0)return null;let r=n.extensions[this.name].attributes,l=[],a={};for(let c in r)l.push(this.parser.getDependency("accessor",r[c]).then(u=>(a[c]=u,a[c])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let p of h){let g=new te,x=new A,m=new je,y=new A(1,1,1),b=new hs(p.geometry,p.material,d);for(let M=0;M<d;M++)a.TRANSLATION&&x.fromBufferAttribute(a.TRANSLATION,M),a.ROTATION&&m.fromBufferAttribute(a.ROTATION,M),a.SCALE&&y.fromBufferAttribute(a.SCALE,M),b.setMatrixAt(M,g.compose(x,m,y));for(let M in a)if(M==="_COLOR_0"){let v=a[M];b.instanceColor=new _n(v.array,v.itemSize,v.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&p.geometry.setAttribute(M,a[M]);_e.prototype.copy.call(b,p),this.parser.assignFinalMaterial(b),f.push(b)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},xh="glTF",Rs=12,fh={JSON:1313821514,BIN:5130562},kc=class{constructor(e){this.name=Q.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Rs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==xh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Rs,s=new DataView(e,Rs),r=0;for(;r<i;){let l=s.getUint32(r,!0);r+=4;let a=s.getUint32(r,!0);if(r+=4,a===fh.JSON){let c=new Uint8Array(e,Rs+r,l);this.content=n.decode(c)}else if(a===fh.BIN){let c=Rs+r;this.body=e.slice(c,c+l)}r+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Vc=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Q.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,l={},a={},c={};for(let u in r){let h=Xc[u]||u.toLowerCase();l[h]=r[u]}for(let u in e.attributes){let h=Xc[u]||u.toLowerCase();if(r[u]!==void 0){let d=n.accessors[e.attributes[u]],f=Bi[d.componentType];c[h]=f.name,a[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(let p in f.attributes){let g=f.attributes[p],x=a[p];x!==void 0&&(g.normalized=x)}h(f)},l,c,Ue,d)})})}},$c=class{constructor(){this.name=Q.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Hc=class{constructor(){this.name=Q.KHR_MESH_QUANTIZATION}},io=class extends wt{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,l=this.valueSize,a=l*2,c=l*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,p=e*c,g=p-c,x=-2*f+3*d,m=f-d,y=1-x,b=m-d+h;for(let M=0;M!==l;M++){let v=r[g+M+l],w=r[g+M+a]*u,T=r[p+M+l],S=r[p+M]*u;s[M]=y*v+b*w+x*T+m*S}return s}},wm=new je,Wc=class extends io{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return wm.fromArray(s).normalize().toArray(s),s}},rt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Bi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ph={9728:vi,9729:tt,9984:rc,9985:oc,9986:ac,9987:Ii},mh={33071:Ht,33648:os,10497:zn},vc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Xc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Tn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Em={CUBICSPLINE:void 0,LINEAR:Vn,STEP:kn},Tc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Am(o){return o.DefaultMaterial===void 0&&(o.DefaultMaterial=new Wn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:bi})),o.DefaultMaterial}function qn(o,e,t){for(let n in t.extensions)o[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Lt(o,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(o.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Rm(o,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(o);let r=[],l=[],a=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):o.attributes.position;r.push(d)}if(i){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):o.attributes.normal;l.push(d)}if(s){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):o.attributes.color;a.push(d)}}return Promise.all([Promise.all(r),Promise.all(l),Promise.all(a)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(o.morphAttributes.position=u),i&&(o.morphAttributes.normal=h),s&&(o.morphAttributes.color=d),o.morphTargetsRelative=!0,o})}function Cm(o,e){if(o.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)o.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(o.morphTargetInfluences.length===t.length){o.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)o.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Im(o){let e,t=o.extensions&&o.extensions[Q.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Mc(t.attributes):e=o.indices+":"+Mc(o.attributes)+":"+o.mode,o.targets!==void 0)for(let n=0,i=o.targets.length;n<i;n++)e+=":"+Mc(o.targets[n]);return e}function Mc(o){let e="",t=Object.keys(o).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+o[t[n]]+";";return e}function Yc(o){switch(o){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Lm(o){return o.search(/\.jpe?g($|\?)/i)>0||o.search(/^data\:image\/jpeg/)===0?"image/jpeg":o.search(/\.webp($|\?)/i)>0||o.search(/^data\:image\/webp/)===0?"image/webp":o.search(/\.ktx2($|\?)/i)>0||o.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Pm=new te,qc=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Sm,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let l=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(l)===!0;let a=l.match(/Version\/(\d+)/);i=n&&a?parseInt(a[1],10):-1,s=l.indexOf("Firefox")>-1,r=s?l.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new xs(this.options.manager):this.textureLoader=new Ms(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Kt(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let l={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return qn(s,l,i),Lt(l,i),Promise.all(n._invokeAll(function(a){return a.afterRoot&&a.afterRoot(l)})).then(function(){for(let a of l.scenes)a.updateMatrixWorld();e(l)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i].joints;for(let l=0,a=r.length;l<a;l++)e[r[l]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(r,l)=>{let a=this.associations.get(r);a!=null&&this.associations.set(l,a);for(let[c,u]of r.children.entries())s(u,l.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Q.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,r){n.load(Zt.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let r=vc[i.type],l=Bi[i.componentType],a=i.normalized===!0,c=new l(i.count*r);return Promise.resolve(new Pe(c,r,a))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){let l=r[0],a=vc[i.type],c=Bi[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*a,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,g,x;if(f&&f!==h){let m=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,b=t.cache.get(y);b||(g=new c(l,m*f,i.count*f/u),b=new Si(g,f/u),t.cache.add(y,b)),x=new wi(b,a,d%f/u,p)}else l===null?g=new c(i.count*a):g=new c(l,d,i.count*a),x=new Pe(g,a,p);if(i.sparse!==void 0){let m=vc.SCALAR,y=Bi[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,v=new y(r[1],b,i.sparse.count*m),w=new c(r[2],M,i.sparse.count*a);l!==null&&(x=new Pe(x.array.slice(),x.itemSize,x.normalized)),x.normalized=!1;for(let T=0,S=v.length;T<S;T++){let E=v[T];if(x.setX(E,w[T*a]),a>=2&&x.setY(E,w[T*a+1]),a>=3&&x.setZ(E,w[T*a+2]),a>=4&&x.setW(E,w[T*a+3]),a>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}x.normalized=p}return x})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s],l=this.textureLoader;if(r.uri){let a=n.manager.getHandler(r.uri);a!==null&&(l=a)}return this.loadTextureImage(e,s,l)}loadTextureImage(e,t,n){let i=this,s=this.json,r=s.textures[e],l=s.images[t],a=(l.uri||l.bufferView)+":"+r.sampler;if(this.textureCache[a])return this.textureCache[a];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=r.name||l.name||"",u.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(u.name=l.uri);let d=(s.samplers||{})[r.sampler]||{};return u.magFilter=ph[d.magFilter]||tt,u.minFilter=ph[d.minFilter]||Ii,u.wrapS=mh[d.wrapS]||zn,u.wrapT=mh[d.wrapT]||zn,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==vi&&u.minFilter!==tt,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[a]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let r=i.images[e],l=self.URL||self.webkitURL,a=r.uri||"",c=!1;if(r.bufferView!==void 0)a=n.getDependency("bufferView",r.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:r.mimeType});return a=l.createObjectURL(d),a});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(a).then(function(h){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(g){let x=new ft(g);x.needsUpdate=!0,d(x)}),t.load(Zt.resolveURL(h,s.path),p,void 0,f)})}).then(function(h){return c===!0&&l.revokeObjectURL(a),Lt(h,r),h.userData.mimeType=r.mimeType||Lm(r.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",a),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[Q.KHR_TEXTURE_TRANSFORM]){let l=n.extensions!==void 0?n.extensions[Q.KHR_TEXTURE_TRANSFORM]:void 0;if(l){let a=s.associations.get(r);r=s.extensions[Q.KHR_TEXTURE_TRANSFORM].extendTexture(r,l),s.associations.set(r,a)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){let l="PointsMaterial:"+n.uuid,a=this.cache.get(l);a||(a=new mt,Be.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,a.sizeAttenuation=!1,this.cache.add(l,a)),n=a}else if(e.isLine){let l="LineBasicMaterial:"+n.uuid,a=this.cache.get(l);a||(a=new St,Be.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,this.cache.add(l,a)),n=a}if(i||s||r){let l="ClonedMaterial:"+n.uuid+":";i&&(l+="derivative-tangents:"),s&&(l+="vertex-colors:"),r&&(l+="flat-shading:");let a=this.cache.get(l);a||(a=n.clone(),s&&(a.vertexColors=!0),r&&(a.flatShading=!0),i&&(a.normalScale&&(a.normalScale.y*=-1),a.clearcoatNormalScale&&(a.clearcoatNormalScale.y*=-1)),this.cache.add(l,a),this.associations.set(a,this.associations.get(n))),n=a}e.material=n}getMaterialType(){return Wn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],r,l={},a=s.extensions||{},c=[];if(a[Q.KHR_MATERIALS_UNLIT]){let h=i[Q.KHR_MATERIALS_UNLIT];r=h.getMaterialType(),c.push(h.extendParams(l,s,t))}else{let h=s.pbrMetallicRoughness||{};if(l.color=new q(1,1,1),l.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;l.color.setRGB(d[0],d[1],d[2],Ue),l.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(l,"map",h.baseColorTexture,Te)),l.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,l.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(l,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(l,"roughnessMap",h.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,l)})))}s.doubleSided===!0&&(l.side=Ss);let u=s.alphaMode||Tc.OPAQUE;if(u===Tc.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,u===Tc.MASK&&(l.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==Mt&&(c.push(t.assignTexture(l,"normalMap",s.normalTexture)),l.normalScale=new ue(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;l.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&r!==Mt&&(c.push(t.assignTexture(l,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==Mt){let h=s.emissiveFactor;l.emissive=new q().setRGB(h[0],h[1],h[2],Ue)}return s.emissiveTexture!==void 0&&r!==Mt&&c.push(t.assignTexture(l,"emissiveMap",s.emissiveTexture,Te)),Promise.all(c).then(function(){let h=new r(l);return s.name&&(h.name=s.name),Lt(h,s),t.associations.set(h,{materials:e}),s.extensions&&qn(i,h,s),h})}createUniqueName(e){let t=de.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(l){return n[Q.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,t).then(function(a){return gh(a,l,t)})}let r=[];for(let l=0,a=e.length;l<a;l++){let c=e[l],u=Im(c),h=i[u];if(h)r.push(h.promise);else{let d;c.extensions&&c.extensions[Q.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=gh(new it,c,t),i[u]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,l=[];for(let a=0,c=r.length;a<c;a++){let u=r[a].material===void 0?Am(this.cache):this.getDependency("material",r[a].material);l.push(u)}return l.push(t.loadGeometries(r)),Promise.all(l).then(function(a){let c=a.slice(0,a.length-1),u=a[a.length-1],h=[];for(let f=0,p=u.length;f<p;f++){let g=u[f],x=r[f],m,y=c[f];if(x.mode===rt.TRIANGLES||x.mode===rt.TRIANGLE_STRIP||x.mode===rt.TRIANGLE_FAN||x.mode===void 0)m=s.isSkinnedMesh===!0?new cs(g,y):new pt(g,y),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),x.mode===rt.TRIANGLE_STRIP?m.geometry=bc(m.geometry,ws):x.mode===rt.TRIANGLE_FAN&&(m.geometry=bc(m.geometry,Pi));else if(x.mode===rt.LINES)m=new yn(g,y);else if(x.mode===rt.LINE_STRIP)m=new Hn(g,y);else if(x.mode===rt.LINE_LOOP)m=new ds(g,y);else if(x.mode===rt.POINTS)m=new Yt(g,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+x.mode);Object.keys(m.geometry.morphAttributes).length>0&&Cm(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Lt(m,s),x.extensions&&qn(i,m,x),t.assignFinalMaterial(m),h.push(m)}for(let f=0,p=h.length;f<p;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&qn(i,h[0],s),h[0];let d=new Xt;s.extensions&&qn(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=h.length;f<p;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Xn(pc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ci(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Lt(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),r=i,l=[],a=[];for(let c=0,u=r.length;c<u;c++){let h=r[c];if(h){l.push(h);let d=new te;s!==null&&d.fromArray(s.array,c*16),a.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new us(l,a)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],l=[],a=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){let f=i.channels[h],p=i.samplers[f.sampler],g=f.target,x=g.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,y=i.parameters!==void 0?i.parameters[p.output]:p.output;g.node!==void 0&&(r.push(this.getDependency("node",x)),l.push(this.getDependency("accessor",m)),a.push(this.getDependency("accessor",y)),c.push(p),u.push(g))}return Promise.all([Promise.all(r),Promise.all(l),Promise.all(a),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],p=h[2],g=h[3],x=h[4],m=[];for(let b=0,M=d.length;b<M;b++){let v=d[b],w=f[b],T=p[b],S=g[b],E=x[b];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();let I=n._createAnimationTracks(v,w,T,S,E);if(I)for(let N=0;N<I.length;N++)m.push(I[N])}let y=new ms(s,void 0,m);return Lt(y,i),y})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(l){if(l.isMesh)for(let a=0,c=i.weights.length;a<c;a++)l.morphTargetInfluences[a]=i.weights[a]}),r})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],l=i.children||[];for(let c=0,u=l.length;c<u;c++)r.push(n.getDependency("node",l[c]));let a=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),a]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Pm)});for(let f=0,p=h.length;f<p;f++)u.add(h[f]);if(u.userData.pivot!==void 0&&h.length>0){let f=u.userData.pivot,p=h[0];u.pivot=new A().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",l=[],a=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return a&&l.push(a),s.camera!==void 0&&l.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){l.push(c)}),this.nodeCache[e]=Promise.all(l).then(function(c){let u;if(s.isBone===!0?u=new Ei:c.length>1?u=new Xt:c.length===1?u=c[0]:u=new _e,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=r),Lt(u,s),s.extensions&&qn(n,u,s),s.matrix!==void 0){let h=new te;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Xt;n.name&&(s.name=i.createUniqueName(n.name)),Lt(s,n),n.extensions&&qn(t,s,n);let r=n.nodes||[],l=[];for(let a=0,c=r.length;a<c;a++)l.push(i.getDependency("node",r[a]));return Promise.all(l).then(function(a){for(let u=0,h=a.length;u<h;u++){let d=a[u];d.parent!==null?s.add(hh(d)):s.add(d)}let c=u=>{let h=new Map;for(let[d,f]of i.associations)(d instanceof Be||d instanceof ft)&&h.set(d,f);return u.traverse(d=>{let f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let r=[],l=e.name?e.name:e.uuid,a=[];function c(f){f.morphTargetInfluences&&a.push(f.name?f.name:f.uuid)}Tn[s.path]===Tn.weights?(c(e),e.isGroup&&e.children.forEach(c)):a.push(l);let u;switch(Tn[s.path]){case Tn.weights:u=Et;break;case Tn.rotation:u=At;break;case Tn.translation:case Tn.scale:u=Rt;break;default:n.itemSize===1?u=Et:u=Rt;break}let h=i.interpolation!==void 0?Em[i.interpolation]:Vn,d=this._getArrayFromAccessor(n);for(let f=0,p=a.length;f<p;f++){let g=new u(a[f]+"."+Tn[s.path],t.array,d,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),r.push(g)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Yc(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof At?Wc:io;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Nm(o,e,t){let n=e.attributes,i=new Ke;if(n.POSITION!==void 0){let l=t.json.accessors[n.POSITION],a=l.min,c=l.max;if(a!==void 0&&c!==void 0){if(i.set(new A(a[0],a[1],a[2]),new A(c[0],c[1],c[2])),l.normalized){let u=Yc(Bi[l.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let l=new A,a=new A;for(let c=0,u=s.length;c<u;c++){let h=s[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(a.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),a.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),a.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let g=Yc(Bi[d.componentType]);a.multiplyScalar(g)}l.max(a)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(l)}o.boundingBox=i;let r=new ke;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,o.boundingSphere=r}function gh(o,e,t){let n=e.attributes,i=[];function s(r,l){return t.getDependency("accessor",r).then(function(a){o.setAttribute(l,a)})}for(let r in n){let l=Xc[r]||r.toLowerCase();l in o.attributes||i.push(s(n[r],l))}if(e.indices!==void 0&&!o.index){let r=t.getDependency("accessor",e.indices).then(function(l){o.setIndex(l)});i.push(r)}return Fe.workingColorSpace!==Ue&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Fe.workingColorSpace}" not supported.`),Lt(o,e),Nm(o,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Rm(o,e.targets,t):o})}async function Qt(o,e,t,n,i){try{let s=await new to().loadAsync(o);s.scene.updateMatrixWorld(!0);let r=new Map,l=new Map,a=f=>{let p=f.elements;return new ie(p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8],p[9],p[10],p[11],p[12],p[13],p[14],p[15])},c=f=>{if(!f)return-1;let p=r.get(f);if(p!==void 0)return p;let g=f.image,x=new bt(f.name||null,g??null);if(x.flipY=t.flipTexturesY,g){let y=g;x.width=y.width??null,x.height=y.height??null}e.textures.push(x);let m=e.textures.length-1;return r.set(f,m),m},u=()=>{if(e.materials.length===0){let f=new It;f.name="Default",e.addMaterial(f)}return 0},h=f=>{if(!f)return u();let p=l.get(f);if(p!==void 0)return p;let g=new It;g.name=f.name;let x=f;if(x.color&&(g.baseColor=new _(x.color.r??1,x.color.g??1,x.color.b??1)),typeof x.ior=="number"&&(g.ior=x.ior),g.opacity=x.opacity??1,g.alphaCutoff=x.alphaTest??.5,x.alphaMode==="BLEND"||x.transparent?g.alphaMode=1:x.alphaMode==="MASK"||(x.alphaTest??0)>0?g.alphaMode=2:g.alphaMode=0,typeof x.roughness=="number"&&(g.roughness=Math.sqrt(x.roughness)),typeof x.metalness=="number"&&(g.metallic=x.metalness),typeof x.specularIntensity=="number"&&(g.specularTint=x.specularIntensity,g.specularColor=new _(x.specularIntensity,x.specularIntensity,x.specularIntensity)),x.specularColor){let y=x.specularColor.r??1,b=x.specularColor.g??1,M=x.specularColor.b??1,v=typeof x.specularIntensity=="number"?x.specularIntensity:1;g.specularColor=new _(y*v,b*v,M*v);let w=((x.specularColor.r??1)+(x.specularColor.g??1)+(x.specularColor.b??1))/3;g.specularTint*=w}if(typeof x.clearcoat=="number"&&(g.clearcoat=x.clearcoat),typeof x.clearcoatRoughness=="number"){let y=Math.min(1,Math.max(0,x.clearcoatRoughness));g.clearcoatGloss=1-y}if(typeof x.sheen=="number"&&(g.sheen=x.sheen),x.sheenColor&&(g.sheenTint=((x.sheenColor.r??0)+(x.sheenColor.g??0)+(x.sheenColor.b??0))/3),typeof x.anisotropy=="number"&&(g.anisotropic=Math.abs(x.anisotropy)),x.emissive){let y=x.emissiveIntensity??1;g.emission=new _((x.emissive.r??0)*y,(x.emissive.g??0)*y,(x.emissive.b??0)*y)}typeof x.transmission=="number"&&(g.specTrans=x.transmission),typeof x.attenuationDistance=="number"&&Number.isFinite(x.attenuationDistance)&&x.attenuationDistance>0&&(g.mediumScattering=0,g.mediumAbsorption=1/x.attenuationDistance),x.attenuationColor&&(g.mediumColor=new _(x.attenuationColor.r??1,x.attenuationColor.g??1,x.attenuationColor.b??1)),g.specTrans>0&&g.mediumAbsorption>0&&(g.mediumType=1,typeof x.thickness=="number"&&(g.mediumThickness=Math.max(x.thickness,0))),g.doubleSided=x.side===Ss?1:0,g.baseColorTexID=c(x.map),g.metallicRoughnessTexID=c(x.metalnessMap??x.roughnessMap),g.normalmapTexID=c(x.normalMap),g.emissionmapTexID=c(x.emissiveMap);let m=e.addMaterial(g);return l.set(f,m),m},d=(f,p,g,x,m,y,b)=>{for(let M=0;M<y;M++){let v=m(b+M),w=p.getX(v),T=p.getY(v),S=p.getZ(v),E=g.getX(v),I=g.getY(v),N=g.getZ(v),D=x?x.getX(v):M%3===1?0:1,G=x?x.getY(v):M%3===0?0:1;f.verticesUVX.push(new X(w,T,S,D)),f.normalsUVY.push(new X(E,I,N,1-G))}};return s.scene.traverse(f=>{let p=f;if(!p.isMesh)return;let g=p.geometry,x=g.getAttribute("position");if(!x||x.count===0)return;let m=g.getAttribute("normal");if(!m){let E=g.clone();if(E.computeVertexNormals(),m=E.getAttribute("normal"),!m)return}let y=g.getAttribute("uv"),b=g.getIndex(),M=E=>b?b.getX(E):E,v=b?b.count:x.count,w=a(p.matrixWorld).multiply(n),T=Array.isArray(p.material)?p.material:[p.material],S=g.groups&&g.groups.length>0?g.groups:[{start:0,count:v,materialIndex:0}];for(let E=0;E<S.length;E++){let I=S[E],N=Math.floor(I.count/3)*3;if(N<=0)continue;let D=new bn;D.name=p.name||`GLTFMesh_${e.meshes.length}`,d(D,x,m,y,M,N,I.start);let G=e.meshes.length;e.meshes.push(D);let U=T[I.materialIndex]??T[0]??null,R=h(U),H=new vn(p.name||`Instance_${G}`,G,w,R);e.addMeshInstance(H)}}),e.materials.length===0&&u(),e.meshes.length>0}catch(s){return console.error("Error loading GLTF file:",s),!1}}var Dm=`<div class="gl-box">
  <svg viewBox="0 0 55 60">
    <text x="27" y="56" class="gl-fps">00 FPS</text>
    <text x="28" y="8" class="gl-mem"></text>
    <rect x="0" y="14" rx="4" ry="4" width="55" height="32"></rect>
    <polyline class="gl-chart"></polyline>
  </svg>
  <svg viewBox="0 0 14 60" class="gl-cpu-svg">
    <line x1="7" y1="38" x2="7" y2="11" class="opacity"/>
    <line x1="7" y1="38" x2="7" y2="11" class="gl-cpu" stroke-dasharray="0 27"/>
    <path d="M5.35 43c-.464 0-.812.377-.812.812v1.16c-.783.1972-1.421.812-1.595 1.624h-1.16c-.435 0-.812.348-.812.812s.348.812.812.812h1.102v1.653H1.812c-.464 0-.812.377-.812.812 0 .464.377.812.812.812h1.131c.1943.783.812 1.392 1.595 1.595v1.131c0 .464.377.812.812.812.464 0 .812-.377.812-.812V53.15h1.653v1.073c0 .464.377.812.812.812.464 0 .812-.377.812-.812v-1.131c.783-.1943 1.392-.812 1.595-1.595h1.131c.464 0 .812-.377.812-.812 0-.464-.377-.812-.812-.812h-1.073V48.22h1.102c.435 0 .812-.348.812-.812s-.348-.812-.812-.812h-1.16c-.1885-.783-.812-1.421-1.595-1.624v-1.131c0-.464-.377-.812-.812-.812-.464 0-.812.377-.812.812v1.073H6.162v-1.073c0-.464-.377-.812-.812-.812zm.58 3.48h2.088c.754 0 1.363.609 1.363 1.363v2.088c0 .754-.609 1.363-1.363 1.363H5.93c-.754 0-1.363-.609-1.363-1.363v-2.088c0-.754.609-1.363 1.363-1.363z"/>
  </svg>
  <svg viewBox="0 0 14 60" class="gl-gpu-svg">
    <line x1="7" y1="38" x2="7" y2="11" class="opacity"/>
    <line x1="7" y1="38" x2="7" y2="11" class="gl-gpu" stroke-dasharray="0 27"/>
    <path d="M1.94775 43.3772a.736.736 0 10-.00416 1.472c.58535.00231.56465.1288.6348.3197.07015.18975.04933.43585.04933.43585l-.00653.05405v8.671a.736.736 0 101.472 0v-1.4145c.253.09522.52785.1495.81765.1495h5.267c1.2535 0 2.254-.9752 2.254-2.185v-3.105c0-1.2075-1.00625-2.185-2.254-2.185h-5.267c-.28865 0-.5635.05405-.8165.1495.01806-.16445.04209-.598-.1357-1.0787-.22425-.6072-.9499-1.2765-2.0125-1.2765zm2.9095 3.6455c.42435 0 .7659.36225.7659.8119v2.9785c0 .44965-.34155.8119-.7659.8119s-.7659-.36225-.7659-.8119v-2.9785c0-.44965.34155-.8119.7659-.8119zm4.117 0a2.3 2.3 0 012.3 2.3 2.3 2.3 0 01-2.3 2.3 2.3 2.3 0 01-2.3-2.3 2.3 2.3 0 012.3-2.3z"/>
  </svg>
</div>`,Fm=`#gl-bench {
  position:absolute;
  left:0;
  top:0;
  z-index:1000;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

#gl-bench div {
  position: relative;
  display: block;
  margin: 4px;
  padding: 0 7px 0 10px;
  background: #6c6;
  border-radius: 15px;
  cursor: pointer;
  opacity: 0.9;
}

#gl-bench svg {
  height: 60px;
  margin: 0 -1px;
}

#gl-bench text {
  font-size: 12px;
  font-family: Helvetica,Arial,sans-serif;
  font-weight: 700;
  dominant-baseline: middle;
  text-anchor: middle;
}

#gl-bench .gl-mem {
  font-size: 9px;
}

#gl-bench line {
  stroke-width: 5;
  stroke: #112211;
  stroke-linecap: round;
}

#gl-bench polyline {
  fill: none;
  stroke: #112211;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3.5;
}

#gl-bench rect {
  fill: #448844;
}

#gl-bench .opacity {
  stroke: #448844;
}
`,so=class{constructor(e,t={}){this.css=Fm,this.svg=Dm,this.paramLogger=()=>{},this.chartLogger=()=>{},this.chartLen=20,this.chartHz=20,this.names=[],this.cpuAccums=[],this.gpuAccums=[],this.activeAccums=[],this.chart=new Array(this.chartLen),this.now=()=>performance&&performance.now?performance.now():Date.now(),this.updateUI=()=>{[].forEach.call(this.nodes["gl-gpu-svg"],l=>{l.style.display=this.trackGPU?"inline":"none"})},Object.assign(this,t),this.detected=0,this.finished=[],this.isFramebuffer=0,this.frameId=0;let n,i=0,s,r=l=>{++i<20?n=requestAnimationFrame(r):(this.detected=Math.ceil(1e3*i/(l-s)/70),cancelAnimationFrame(n)),s||(s=l)};if(requestAnimationFrame(r),e){let l=async(c,u)=>Promise.resolve(setTimeout(()=>{e.getError();let h=this.now()-c;u.forEach((d,f)=>{d&&(this.gpuAccums[f]+=h)})},0)),a=(c,u,h)=>function(){let d=u.now();c.apply(h,arguments),u.trackGPU&&u.finished.push(l(d,u.activeAccums.slice(0)))};["drawArrays","drawElements","drawArraysInstanced","drawBuffers","drawElementsInstanced","drawRangeElements"].forEach(c=>{e[c]&&(e[c]=a(e[c],this,e))}),e.getExtension=((c,u)=>function(){let h=c.apply(e,arguments);return h&&["drawElementsInstancedANGLE","drawBuffersWEBGL"].forEach(d=>{h[d]&&(h[d]=a(h[d],u,h))}),h})(e.getExtension,this)}if(!this.withoutUI){this.dom||(this.dom=document.body);let l=document.createElement("div");l.id="gl-bench",this.dom.appendChild(l),this.dom.insertAdjacentHTML("afterbegin",'<style id="gl-bench-style">'+this.css+"</style>"),this.dom=l,this.dom.addEventListener("click",()=>{this.trackGPU=!this.trackGPU,this.updateUI()}),this.paramLogger=((a,c,u)=>{let h=["gl-cpu","gl-gpu","gl-mem","gl-fps","gl-gpu-svg","gl-chart"],d=Object.assign({},h);return h.forEach(f=>d[f]=c.getElementsByClassName(f)),this.nodes=d,(f,p,g,x,m,y,b)=>{d["gl-cpu"][f].style.strokeDasharray=(p*.27).toFixed(0)+" 100",d["gl-gpu"][f].style.strokeDasharray=(g*.27).toFixed(0)+" 100",d["gl-mem"][f].innerHTML=u[f]?u[f]:x?"mem: "+x.toFixed(0)+"mb":"",d["gl-fps"][f].innerHTML=m.toFixed(0)+" FPS",a(u[f],p,g,x,m,y,b)}})(this.paramLogger,this.dom,this.names),this.chartLogger=((a,c)=>{let u={"gl-chart":c.getElementsByClassName("gl-chart")};return(h,d,f)=>{let p="",g=d.length;for(let x=0;x<g;x++){let m=(f+x+1)%g;d[m]!=null&&(p=p+" "+(55*x/(g-1)).toFixed(1)+","+(45-d[m]*22/60/this.detected).toFixed(1))}u["gl-chart"][h].setAttribute("points",p),a(this.names[h],d,f)}})(this.chartLogger,this.dom)}}addUI(e){this.names.indexOf(e)==-1&&(this.names.push(e),this.dom&&(this.dom.insertAdjacentHTML("beforeend",this.svg),this.updateUI()),this.cpuAccums.push(0),this.gpuAccums.push(0),this.activeAccums.push(!1))}nextFrame(e){this.frameId++;let t=e||this.now();if(this.frameId<=1)this.paramFrame=this.frameId,this.paramTime=t;else{let n=t-this.paramTime;if(n>=1e3){let i=this.frameId-this.paramFrame,s=i/n*1e3;for(let r=0;r<this.names.length;r++){let l=this.cpuAccums[r]/n*100,a=this.gpuAccums[r]/n*100,c=performance&&performance.memory?performance.memory.usedJSHeapSize/(1<<20):0;this.paramLogger(r,l,a,c,s,n,i),this.cpuAccums[r]=0,Promise.all(this.finished).then(()=>{this.gpuAccums[r]=0,this.finished=[]})}this.paramFrame=this.frameId,this.paramTime=t}}if(!this.detected||!this.chartFrame)this.chartFrame=this.frameId,this.chartTime=t,this.circularId=0;else{let n=t-this.chartTime,i=this.chartHz*n/1e3;for(;--i>0&&this.detected;){let r=(this.frameId-this.chartFrame)/n*1e3;this.chart[this.circularId%this.chartLen]=r;for(let l=0;l<this.names.length;l++)this.chartLogger(l,this.chart,this.circularId);this.circularId++,this.chartFrame=this.frameId,this.chartTime=t}}}begin(e){this.updateAccums(e)}end(e){this.updateAccums(e)}updateAccums(e){let t=this.names.indexOf(e);t==-1&&(t=this.names.length,this.addUI(e));let n=this.now(),i=n-this.t0;for(let s=0;s<t+1;s++)this.activeAccums[s]&&(this.cpuAccums[s]+=i);this.activeAccums[t]=!this.activeAccums[t],this.t0=n}};var Mn=class o{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),o.nextNameID=o.nextNameID||0,this.$name.id=`lil-gui-name-${++o.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",r=>r.stopPropagation()),this.domElement.addEventListener("keyup",r=>r.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},jc=class extends Mn{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function Kc(o){let e,t;return(e=o.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}var Um={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:Kc,toHexString:Kc},Is={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},Bm={isPrimitive:!1,match:o=>Array.isArray(o),fromHexString(o,e,t=1){let n=Is.fromHexString(o);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([o,e,t],n=1){n=255/n;let i=o*n<<16^e*n<<8^t*n<<0;return Is.toHexString(i)}},Om={isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,e,t=1){let n=Is.fromHexString(o);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:o,g:e,b:t},n=1){n=255/n;let i=o*n<<16^e*n<<8^t*n<<0;return Is.toHexString(i)}},Gm=[Um,Is,Bm,Om];function zm(o){return Gm.find(e=>e.match(o))}var Zc=class extends Mn{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=zm(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{let s=Kc(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},Cs=class extends Mn{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}},Jc=class extends Mn{constructor(e,t,n,i,s,r){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);let l=r!==void 0;this.step(l?r:this._getImplicitStep(),l),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;let t=()=>{let y=parseFloat(this.$input.value);isNaN(y)||(this._stepExplicit&&(y=this._snap(y)),this.setValue(this._clamp(y)))},n=y=>{let b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+y),this.$input.value=this.getValue())},i=y=>{y.key==="Enter"&&this.$input.blur(),y.code==="ArrowUp"&&(y.preventDefault(),n(this._step*this._arrowKeyMultiplier(y))),y.code==="ArrowDown"&&(y.preventDefault(),n(this._step*this._arrowKeyMultiplier(y)*-1))},s=y=>{this._inputFocused&&(y.preventDefault(),n(this._step*this._normalizeMouseWheel(y)))},r=!1,l,a,c,u,h,d=5,f=y=>{l=y.clientX,a=c=y.clientY,r=!0,u=this.getValue(),h=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",g)},p=y=>{if(r){let b=y.clientX-l,M=y.clientY-a;Math.abs(M)>d?(y.preventDefault(),this.$input.blur(),r=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>d&&g()}if(!r){let b=y.clientY-c;h-=b*this._step*this._arrowKeyMultiplier(y),u+h>this._max?h=this._max-u:u+h<this._min&&(h=this._min-u),this._snapClampSetValue(u+h)}c=y.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",g)},x=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",x),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");let e=(m,y,b,M,v)=>(m-y)/(b-y)*(v-M)+M,t=m=>{let y=this.$slider.getBoundingClientRect(),b=e(m,y.left,y.right,this._min,this._max);this._snapClampSetValue(b)},n=m=>{this._setDraggingStyle(!0),t(m.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=m=>{t(m.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)},r=!1,l,a,c=m=>{m.preventDefault(),this._setDraggingStyle(!0),t(m.touches[0].clientX),r=!1},u=m=>{m.touches.length>1||(this._hasScrollBar?(l=m.touches[0].clientX,a=m.touches[0].clientY,r=!0):c(m),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=m=>{if(r){let y=m.touches[0].clientX-l,b=m.touches[0].clientY-a;Math.abs(y)>Math.abs(b)?c(m):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else m.preventDefault(),t(m.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},f=this._callOnFinishChange.bind(this),p=400,g,x=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();let b=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+b),this.$input.value=this.getValue(),clearTimeout(g),g=setTimeout(f,p)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",x,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},Qc=class extends Mn{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{let n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},eu=class extends Mn{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},km=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "\u2195";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "\u25BE";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "\u25B8";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "\u2713";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Vm(o){let e=document.createElement("style");e.innerHTML=o;let t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}var _h=!1,ro=class o{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:r=!1,injectStyles:l=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),a&&this.domElement.classList.add("allow-touch-styles"),!_h&&l&&(Vm(km),_h=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=r}add(e,t,n,i,s){if(Object(n)===n)return new Qc(this,e,t,n);let r=e[t];switch(typeof r){case"number":return new Jc(this,e,t,n,i,s);case"boolean":return new jc(this,e,t);case"string":return new eu(this,e,t);case"function":return new Cs(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,r)}addColor(e,t,n=1){return new Zc(this,e,t,n)}addFolder(e){let t=new o({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Cs||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Cs)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");let n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);let i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}};function be(o,e){let t=o.querySelector(`input[name="${e}"]`);if(!t)return null;let n=parseFloat(t.getAttribute("value")??"");return isNaN(n)?null:n}function ao(o,e){let t=o.querySelector(`input[name="${e}"]`);if(!t)return null;let n=parseInt(t.getAttribute("value")??"",10);return isNaN(n)?null:n}function Pt(o,e){let t=o.querySelector(`input[name="${e}"]`);if(!t)return null;let n=(t.getAttribute("value")??"").split(",").map(i=>parseFloat(i.trim()));return n.length<3||n.some(isNaN)?null:new _(n[0],n[1],n[2])}function Nt(o,e){let t=o.querySelector(`input[name="${e}"]`);if(!t)return null;let i=(t.getAttribute("value")??"").replace(/\s+/g,",").replace(/,+/g,",").split(",").map(s=>parseFloat(s.trim()));return i.length<3||i.some(isNaN)?null:new _(i[0],i[1],i[2])}function oo(o,e){let t=o.querySelector(`input[name="${e}"]`);return t?t.getAttribute("value")?.toLowerCase()==="true":null}var He=class{name;constructor(e){this.name=e}static clamp01(e){return Math.min(Math.max(e,0),1)}static clampVec(e){return _.clamp(e.clone(),new _(0,0,0),new _(1,1,1))}static resetMaterial(e){e.materialType=0,e.baseWeight=1,e.baseDiffuseRoughness=0,e.metallic=0,e.specularTint=0,e.specularWeight=1,e.specularColor=new _(1,1,1),e.anisotropic=0,e.anisotropyRotation=0,e.specTrans=0,e.transmissionColor=new _(1,1,1),e.transmissionExtraRoughness=0,e.subsurface=0,e.subsurfaceRadiusScale=new _(1,1,1),e.sheen=0,e.sheenTint=0,e.fuzzColor=new _(-1,-1,-1),e.fuzzRoughness=.5,e.clearcoat=0,e.clearcoatGloss=1,e.coatColor=new _(1,1,1),e.coatIOR=1.6,e.coatDarkening=1,e.coatRoughnessAnisotropy=0,e.coatAnisotropyRotation=0,e.coatAffectRoughness=0,e.thinFilmWeight=0,e.thinFilmThickness=0,e.thinFilmIor=1.5,e.emission=new _(0,0,0),e.opacity=1,e.alphaMode=0,e.alphaCutoff=0,e.doubleSided=0,e.thinWalled=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0,e.dispersionScale=0,e.abbeNumber=50,e.uvScale=new Z(1,1)}};var en=class o extends He{base_weight=1;base_color=new _(.8,.8,.8);base_diffuse_roughness=0;base_metalness=0;specular_weight=1;specular_color=new _(1,1,1);specular_roughness=.3;specular_ior=1.5;specular_roughness_anisotropy=0;transmission_weight=0;transmission_color=new _(1,1,1);transmission_depth=0;transmission_scatter=new _(0,0,0);transmission_scatter_anisotropy=0;transmission_dispersion_scale=0;transmission_dispersion_abbe_number=20;subsurface_weight=0;subsurface_color=new _(.8,.8,.8);subsurface_radius=1;subsurface_radius_scale=new _(1,.5,.25);subsurface_scatter_anisotropy=0;fuzz_weight=0;fuzz_color=new _(1,1,1);fuzz_roughness=.5;coat_weight=0;coat_color=new _(1,1,1);coat_roughness=0;coat_roughness_anisotropy=0;coat_ior=1.6;coat_darkening=1;thin_film_weight=0;thin_film_thickness=.5;thin_film_ior=1.4;emission_luminance=0;emission_color=new _(1,1,1);geometry_opacity=1;geometry_thin_walled=!1;constructor(e){super(e)}toMaterial(e){if(e.baseWeight=this.base_weight,e.baseColor=this.base_color.clone(),e.baseDiffuseRoughness=this.base_diffuse_roughness,e.metallic=Math.min(Math.max(this.base_metalness,0),1),e.roughness=Math.min(Math.max(this.specular_roughness,.001),1),e.ior=Math.max(this.specular_ior,1),e.anisotropic=this.specular_roughness_anisotropy,e.specularColor=_.clamp(this.specular_color.clone(),new _(0,0,0),new _(1,1,1)),e.specularWeight=Math.min(Math.max(this.specular_weight,0),1),e.specTrans=Math.min(Math.max(this.transmission_weight,0),1),e.transmissionColor=_.clamp(this.transmission_color.clone(),new _(0,0,0),new _(1,1,1)),e.dispersionScale=Math.min(Math.max(this.transmission_dispersion_scale,0),1),e.abbeNumber=Math.max(this.transmission_dispersion_abbe_number,1),e.thinWalled=this.geometry_thin_walled?1:0,e.doubleSided=this.geometry_thin_walled?1:0,e.subsurface=Math.min(Math.max(this.subsurface_weight,0),1),e.subsurfaceRadiusScale=_.max(this.subsurface_radius_scale.clone(),new _(.001,.001,.001)),this.geometry_thin_walled)e.subsurface=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;else if(this.subsurface_weight>0){e.mediumType=2,e.mediumColor=_.clamp(this.subsurface_color.clone(),new _(0,0,0),new _(1,1,1)),e.mediumAnisotropy=Math.min(Math.max(this.subsurface_scatter_anisotropy,-.99),.99),e.mediumThickness=Math.max(this.subsurface_radius,0);let t=Math.min(Math.max(this.subsurface_color.x*.2126+this.subsurface_color.y*.7152+this.subsurface_color.z*.0722,0),1),n=1/Math.max(this.subsurface_radius,.001);e.mediumAbsorption=n*(1-t),e.mediumScattering=n-e.mediumAbsorption}else if(!this.geometry_thin_walled&&this.transmission_weight>0&&this.transmission_depth>0){e.mediumType=1,e.mediumColor=_.clamp(this.transmission_color.clone(),new _(0,0,0),new _(1,1,1));let t=Math.max(this.transmission_depth,0);e.mediumThickness=0,e.mediumAnisotropy=Math.min(Math.max(this.transmission_scatter_anisotropy,-.99),.99),e.mediumScattering=0,e.mediumAbsorption=1/Math.max(t,.001)}else e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;e.sheen=Math.min(Math.max(this.fuzz_weight,0),1),e.fuzzColor=_.clamp(this.fuzz_color.clone(),new _(0,0,0),new _(1,1,1)),e.sheenTint=0,e.fuzzRoughness=Math.min(Math.max(this.fuzz_roughness,0),1),e.clearcoat=Math.min(Math.max(this.coat_weight,0),1),e.clearcoatGloss=Math.min(Math.max(1-this.coat_roughness,0),1),e.coatColor=_.clamp(this.coat_color.clone(),new _(0,0,0),new _(1,1,1)),e.coatIOR=Math.max(this.coat_ior,1.01),e.coatRoughnessAnisotropy=Math.min(Math.max(this.coat_roughness_anisotropy,0),1),e.coatDarkening=Math.min(Math.max(this.coat_darkening,0),1),e.emission=new _(this.emission_color.x*this.emission_luminance,this.emission_color.y*this.emission_luminance,this.emission_color.z*this.emission_luminance),e.opacity=Math.min(Math.max(this.geometry_opacity,0),1),e.alphaMode=e.opacity<1?1:0,e.thinFilmWeight=Math.min(Math.max(this.thin_film_weight,0),1),e.thinFilmThickness=Math.max(this.thin_film_thickness*1e3,0),e.thinFilmIor=Math.max(this.thin_film_ior,1)}static parse(e){let t=e.getAttribute("name")??"openPbr",n=new o(t),i=(l,a)=>{let c=be(e,a);c!==null&&(n[l]=c)},s=(l,a)=>{let c=Pt(e,a);c!==null&&(n[l]=c)},r=(l,a)=>{let c=oo(e,a);c!==null&&(n[l]=c)};return i("base_weight","base_weight"),s("base_color","base_color"),i("base_diffuse_roughness","base_diffuse_roughness"),i("base_metalness","base_metalness"),i("specular_weight","specular_weight"),s("specular_color","specular_color"),i("specular_roughness","specular_roughness"),i("specular_ior","specular_ior"),i("specular_roughness_anisotropy","specular_roughness_anisotropy"),i("transmission_weight","transmission_weight"),s("transmission_color","transmission_color"),i("transmission_depth","transmission_depth"),s("transmission_scatter","transmission_scatter"),i("transmission_scatter_anisotropy","transmission_scatter_anisotropy"),i("transmission_dispersion_scale","transmission_dispersion_scale"),i("transmission_dispersion_abbe_number","transmission_dispersion_abbe_number"),i("subsurface_weight","subsurface_weight"),s("subsurface_color","subsurface_color"),i("subsurface_radius","subsurface_radius"),s("subsurface_radius_scale","subsurface_radius_scale"),i("subsurface_scatter_anisotropy","subsurface_scatter_anisotropy"),i("fuzz_weight","fuzz_weight"),s("fuzz_color","fuzz_color"),i("fuzz_roughness","fuzz_roughness"),i("coat_weight","coat_weight"),s("coat_color","coat_color"),i("coat_roughness","coat_roughness"),i("coat_roughness_anisotropy","coat_roughness_anisotropy"),i("coat_ior","coat_ior"),i("coat_darkening","coat_darkening"),i("thin_film_weight","thin_film_weight"),i("thin_film_thickness","thin_film_thickness"),i("thin_film_ior","thin_film_ior"),i("emission_luminance","emission_luminance"),s("emission_color","emission_color"),i("geometry_opacity","geometry_opacity"),r("geometry_thin_walled","geometry_thin_walled"),n}static aluminumBrushed(){let e=new o("Aluminum_Brushed");return e.base_color=new _(.912,.914,.92),e.base_metalness=1,e.specular_color=new _(.97,.979,.988),e.specular_roughness=.2,e.specular_roughness_anisotropy=.9,e}static plastic(){let e=new o("Plastic");return e.base_color=new _(.78,.12,.12),e.base_metalness=0,e.specular_roughness=.28,e.specular_ior=1.5,e}static metal(){let e=new o("Metal");return e.base_color=new _(.72,.74,.76),e.base_metalness=1,e.specular_roughness=.22,e.specular_roughness_anisotropy=.15,e}static gold(){let e=new o("Gold");return e.base_color=new _(.98,.78,.18),e.base_metalness=1,e.specular_roughness=.12,e}static silver(){let e=new o("Silver");return e.base_color=new _(.93,.94,.95),e.base_metalness=1,e.specular_roughness=.08,e}static carPaint(){let e=new o("Car_Paint");return e.base_color=new _(.1,.6,.9),e.specular_ior=1.6,e.specular_roughness=.3,e.coat_weight=1,e.coat_roughness=.02,e.coat_ior=1.6,e}static glass(){let e=new o("Glass");return e.specular_roughness=0,e.specular_ior=1.52,e.transmission_weight=1,e.transmission_dispersion_abbe_number=64,e.transmission_dispersion_scale=1,e}static honey(){let e=new o("Honey");return e.specular_roughness=0,e.specular_ior=1.504,e.transmission_weight=1,e.transmission_color=new _(.83,.4,.04),e.transmission_depth=2,e.transmission_scatter=new _(.9,.9,.9),e}static ketchup(){let e=new o("Ketchup");return e.base_color=new _(.164,.006,.002),e.specular_roughness=0,e.specular_ior=1.3,e.subsurface_weight=1,e.subsurface_color=new _(.164,.006,.002),e.subsurface_radius_scale=new _(.476,.058,.039),e}static lightBulb(){let e=new o("Light_Bulb");return e.emission_color=new _(1,.415,.099),e.emission_luminance=1e4,e}static emissive(){let e=new o("Emissive");return e.base_color=new _(.05,.05,.05),e.emission_color=new _(1,.9,.7),e.emission_luminance=1500,e}static clearcoatPlastic(){let e=new o("Clearcoat_Plastic");return e.base_color=new _(.2,.35,.9),e.base_metalness=0,e.specular_roughness=.25,e.coat_weight=1,e.coat_color=new _(1,1,1),e.coat_roughness=.03,e}static paintedMetal(){let e=new o("Painted_Metal");return e.base_color=new _(.82,.1,.1),e.base_metalness=1,e.specular_roughness=.3,e.coat_weight=1,e.coat_color=new _(1,1,1),e.coat_roughness=.05,e}static subsurfaceSkin(){let e=new o("Subsurface_Skin");return e.base_color=new _(.72,.52,.44),e.specular_roughness=.35,e.specular_ior=1.45,e.subsurface_weight=1,e.subsurface_color=new _(.74,.46,.38),e.subsurface_radius=1.2,e.subsurface_radius_scale=new _(1,.45,.2),e}static thinGlass(){let e=new o("Thin_Glass");return e.specular_roughness=0,e.specular_ior=1.5,e.transmission_weight=1,e.geometry_thin_walled=!0,e}static frostedGlass(){let e=new o("Frosted_Glass");return e.specular_roughness=.35,e.specular_ior=1.5,e.transmission_weight=1,e.transmission_depth=1,e.transmission_color=new _(.95,.97,1),e}static pearl(){let e=new o("Pearl");return e.base_color=new _(.8,.75,.7),e.specular_roughness=.35,e.specular_ior=1.5,e.subsurface_weight=1,e.subsurface_color=new _(.8,.75,.7),e.subsurface_radius_scale=new _(.3,.5,.3),e.coat_weight=1,e.coat_roughness=.15,e.coat_ior=1.68,e.thin_film_weight=1,e.thin_film_thickness=.42,e.thin_film_ior=2,e}static soapBubble(){let e=new o("Soap_Bubble");return e.specular_roughness=0,e.specular_ior=1,e.transmission_weight=1,e.thin_film_weight=1,e.thin_film_thickness=.5,e.thin_film_ior=1.4,e.geometry_thin_walled=!0,e}static velvet(){let e=new o("Velvet");return e.base_color=new _(.02,.02,.02),e.specular_roughness=.8,e.fuzz_weight=1,e.fuzz_color=new _(.4,.4,.4),e.fuzz_roughness=.5,e}static PRESET_NAMES=["-- None --","Default","Plastic","Metal","Gold","Silver","Aluminum Brushed","Car Paint","Clearcoat Plastic","Painted Metal","Glass","Thin Glass","Frosted Glass","Honey","Ketchup","Light Bulb","Emissive","Subsurface Skin","Pearl","Soap Bubble","Velvet"];static presetByName(e){switch(e){case"Default":return new o("Default");case"Plastic":return o.plastic();case"Metal":return o.metal();case"Gold":return o.gold();case"Silver":return o.silver();case"Aluminum Brushed":return o.aluminumBrushed();case"Car Paint":return o.carPaint();case"Clearcoat Plastic":return o.clearcoatPlastic();case"Painted Metal":return o.paintedMetal();case"Glass":return o.glass();case"Thin Glass":return o.thinGlass();case"Frosted Glass":return o.frostedGlass();case"Honey":return o.honey();case"Ketchup":return o.ketchup();case"Light Bulb":return o.lightBulb();case"Emissive":return o.emissive();case"Subsurface Skin":return o.subsurfaceSkin();case"Pearl":return o.pearl();case"Soap Bubble":return o.soapBubble();case"Velvet":return o.velvet();default:return null}}};var tu=class{sampleCount=0},Ls=class o{static showGui=!0;static params=new tu;static gui=null;static guiResizeHandler=null;static guiDragCleanup=null;static actionButtonsCleanup=null;static guiManualPosition=null;static openPbrPresetByMaterialID=new Map;static build(e){if(!o.showGui){o.gui&&(o.gui.destroy(),o.gui=null),o.guiResizeHandler&&(window.removeEventListener("resize",o.guiResizeHandler),o.guiResizeHandler=null),o.guiDragCleanup&&(o.guiDragCleanup(),o.guiDragCleanup=null),o.actionButtonsCleanup&&(o.actionButtonsCleanup(),o.actionButtonsCleanup=null);return}o.gui&&(o.gui.destroy(),o.gui=null),o.guiDragCleanup&&(o.guiDragCleanup(),o.guiDragCleanup=null),o.actionButtonsCleanup&&(o.actionButtonsCleanup(),o.actionButtonsCleanup=null);let t=o.getAdaptiveGuiWidth(),n=new ro({title:"Settings",width:t});o.gui=n,o.guiResizeHandler&&(window.removeEventListener("resize",o.guiResizeHandler),o.guiResizeHandler=null);let i=()=>{let m=n.domElement,y=window.matchMedia("(max-width: 900px)").matches;if(m.style.width=`${o.getAdaptiveGuiWidth()}px`,m.style.maxWidth="calc(100vw - 20px)",m.style.maxHeight=y?"calc(100vh - 90px)":"calc(100vh - 50px)",m.style.overflowY="auto",m.style.display="block",m.style.position="fixed",m.style.zIndex="1500",document.body.classList.toggle("gui-compact",y),document.body.classList.remove("gui-hidden"),o.guiManualPosition){let b=o.clampGuiPosition(m,o.guiManualPosition.x,o.guiManualPosition.y);o.guiManualPosition=b,o.applyGuiPosition(m,b.x,b.y)}else n.domElement.style.right="8px",n.domElement.style.top="8px",n.domElement.style.left="auto"};o.guiResizeHandler=i,window.addEventListener("resize",i),i(),o.guiDragCleanup=o.enableGuiDragging(n);let s=e.renderer,r=s.scene,l=r instanceof gt,a=r.renderOptions,c={rewind:()=>(e.rewind(),!0),pauseOrContinue:()=>e.pauseOrContinue(),fullscreen:async()=>{let m=document.getElementById("canvas");m&&(m.requestFullscreen?await m.requestFullscreen():m.mozRequestFullScreen?await m.mozRequestFullScreen():m.webkitRequestFullscreen?await m.webkitRequestFullscreen():m.msRequestFullscreen&&await m.msRequestFullscreen(),m.focus&&m.focus())},isPaused:()=>!!e.stopped},u={enableDebug:ot.profiling,showBenchmark:!0};n.add(s,"sampleCounter").listen().name("Samples").disable(),o.actionButtonsCleanup=o.addActionButtonsRow(n,c);let h=o.attachBenchmarkToGui(n.domElement);h&&n.add(u,"showBenchmark").name("Show Benchmark").onChange(m=>{h.style.display=m?"flex":"none"});let d=n.addFolder("Scene").close();{let m=r.sceneName??"",y=e.scenes.find(T=>m===T||m===`/scenes/pathtracer/${T}`),b=e.shadertoyScenes.find(T=>m===T||m===`/scenes/shadertoy/examples/${T}/shader.json`),M=e.shadertoyGlslPathtracerScenes.find(T=>m===`/scenes/shadertoy/examples/glsl-pathtracer/${T}/shadertoy.json`),v=e.shadertoyGlslPathtracerScenes.find(T=>m===`/scenes/shadertoy/examples/glsl-pathtracer/${T}/data.json`),w={pathTracingScene:y,shadertoyScene:b,glslPathTracerScene:M,glslPathTracerScene2:v};d.add(w,"pathTracingScene",e.scenes).name("PathTracer Scene").onChange(async T=>{w.pathTracingScene=T,await e.startSceneAsync(`/scenes/pathtracer/${T}`)}),d.add(w,"shadertoyScene",e.shadertoyScenes).name("ShaderToy Scene").onChange(async T=>{w.shadertoyScene=T,await e.startSceneAsync(`/scenes/shadertoy/examples/${T}/shader.json`)}),d.add(w,"glslPathTracerScene",e.shadertoyGlslPathtracerScenes).name("GLSL-PathTracer Scene (with Shadertoy)").onChange(async T=>{w.glslPathTracerScene=T,await e.startSceneAsync(`/scenes/shadertoy/examples/glsl-pathtracer/${T}/shadertoy.json`)}),d.add(w,"glslPathTracerScene2",e.shadertoyGlslPathtracerScenes).name("GLSL-PathTracer Scene (with Pathtracer)").onChange(async T=>{w.glslPathTracerScene2=T,await e.startSceneAsync(`/scenes/shadertoy/examples/glsl-pathtracer/${T}/data.json`)}),l&&d.add({envMap:e.envMaps[e.envMapIdx]},"envMap",e.envMaps).name("EnvMaps").onChange(async T=>{await r.addEnvMapAsync(`HDR/${T}`)})}let f=n.addFolder("Render Settings").close();{let m=a.screenZoom;if(f.add({zoom:m},"zoom",[.25,.5,.75,1]).listen().name("Screen Zoom").onChange(y=>{a.screenZoom=y,e.resizeAsync(a.originalRenderResolution.x*y,a.originalRenderResolution.y*y)}),f.add(a,"pixelRatio",[.25,.5,.75,1]).listen().name("Pixel Ratio").onChange(y=>{a.tileWidth=Math.floor(a.renderResolution.x*y),a.tileHeight=Math.floor(a.renderResolution.y*y),e.startSceneAsync(r.sceneName)}),f.add(a,"maxSpp",-1,256).step(1).listen().name("Max SPP").onChange(y=>{e.optionsChanged=!0}),l){f.add(a,"maxDepth",1,10).listen().name("Max Depth").onChange(b=>{e.optionsChanged=!0}),f.add(a,"enableRR").listen().name("Enable Russian Roulette").onChange(b=>{e.reloadShaders=!0}),f.add(a,"RRDepth",1,10).listen().name("Russian Roulette Depth").onChange(b=>{e.reloadShaders=!0}),f.add(a,"enableRoughnessMollification").listen().name("Enable Roughness Mollification").onChange(b=>{e.reloadShaders=!0}),f.add(a,"roughnessMollificationAmt").listen().name("Roughness Mollification Amount").onChange(b=>{e.optionsChanged=!0}),f.add(a,"enableVolumeMIS").listen().name("Enable Volume MIS").onChange(b=>{e.reloadShaders=!0}),f.add(a,"useThinFilmLUT").listen().name("Thin Film: use LUT").onChange(b=>{e.reloadShaders=!0});let y=a.sssMode===1?"randomWalk":a.sssMode===2?"dipole":"none";f.add({sssMode:y},"sssMode",["none","randomWalk","dipole"]).name("SSS Mode").onChange(b=>{a.sssMode=b==="randomWalk"?1:b==="dipole"?2:0,e.reloadShaders=!0,e.optionsChanged=!0}),(l||r?.shadertoyShader?.isGlslPathtracer)&&(f.add(a,"enableDenoiser").listen().name("Enable Denoiser"),f.add(a,"denoiserFrameCnt",5,20).step(1).listen().name("Denoiser Frame Count"))}}let p=n.addFolder("Environment").close();{let m=_.pow(a.uniformLightCol,.45454545454545453);p.addColor({rgb:{r:m.x,g:m.y,b:m.z}},"rgb").listen().name("Uniform Light Color (Gamma Corrected)").onChange(y=>{a.uniformLightCol=_.pow(new _(y.r,y.g,y.b),2.2),e.optionsChanged=!0}),p.add(a,"enableEnvMap").listen().name("Enable Environment Map").onChange(y=>{e.reloadShaders=!0}),p.add(a,"envMapIntensity",.1,10).listen().name("Environment Map Intensity").onChange(y=>{e.optionsChanged=!0}),p.add(a,"envMapRot",0,360).listen().name("Environment Map Rotation").onChange(y=>{e.optionsChanged=!0}),p.add(a,"hideEmitters").listen().name("Hide Emitters").onChange(y=>{e.reloadShaders=!0}),p.add(a,"enableBackground").listen().name("Enable Background").onChange(y=>{e.reloadShaders=!0}),p.addColor(a,"backgroundCol").listen().name("Background Color").onChange(y=>{e.optionsChanged=!0}),p.add(a,"transparentBackground").listen().name("Transparent Background").onChange(y=>{e.reloadShaders=!0})}let g=n.addFolder("Tonemapping").close();{let m=g.add(a,"enableTonemap").listen().name("Enable Tonemap"),y=g.add(a,"enableAces").listen().name("Enable ACES"),b=g.add(a,"simpleAcesFit").listen().name("Simple ACES Fit");m.onChange(M=>{M?y.enable():(y.setValue(!1),b.setValue(!1),y.disable(),b.disable())}),y.onChange(M=>{M?b.enable():(b.disable(),b.setValue(!1))})}let x=n.addFolder("Camera").close();{let m=As.degrees(r.camera.fov);x.add({fov:m},"fov",10,90).listen().name("Fov").onChange(b=>{r.camera.setFov(b),e.optionsChanged=!0});let y=r.camera.aperture*1e3;x.add({aperture:y},"aperture",0,10).listen().name("Aperture").onChange(b=>{r.camera.aperture=b/1e3,e.optionsChanged=!0}),x.add(r.camera,"focalDist",.01,50).listen().name("Focal Distance").onChange(b=>{e.optionsChanged=!0}),x.add({pos:`${r.camera.position.x.toFixed(2)}, ${r.camera.position.y.toFixed(2)}, ${r.camera.position.z.toFixed(2)}`},"pos").listen().name("Pos").disable()}if(r.materials&&r.materials.length>0){let m=n.addFolder("Materials").close();{let y=[];for(let M=0;M<r.materials.length;M++)y.push(r.materials[M].name);let b=null;m.add({instance:"-- None --"},"instance",y).onChange(M=>{M==="-- None --"?(b?.destroy(),b=null):b=o.onMaterialChanged(m,b,M,e)}),b=o.onMaterialChanged(m,b,r.materials[0].name,e)}}if(r.meshInstances&&r.meshInstances.length>0){let m=n.addFolder("Instances").close();{let y=[];for(let M=0;M<r.meshInstances.length;M++)y.push(r.meshInstances[M].name);let b=null;m.add({instance:""},"instance",y).onChange(M=>{b=o.onInstanceChanged(m,b,M,e)}),b=o.onInstanceChanged(m,b,r.meshInstances[0].name,e)}}}static onMaterialChanged(e,t,n,i){let s=i.renderer.scene,r=s.renderOptions;t?.destroy(),t=e.addFolder("Material").close();let l=s.materials.findIndex(B=>B?.name===n);l<0&&(l=0);let a=s.materials[l];if(!a)return t;let c=B=>{a.materialType=0,a.baseWeight=1,a.baseDiffuseRoughness=B,a.metallic=0,a.specularWeight=0,a.specTrans=0,a.clearcoat=0,i.objectPropChanged=!0},u=t.addFolder("D4 Diffuse Presets").open();{let B={lambert:()=>c(0),orenNayar:()=>c(.5),burley:()=>c(.9)};u.add(B,"lambert").name("Lambert (r=0.0)"),u.add(B,"orenNayar").name("Oren-Nayar (r=0.5)"),u.add(B,"burley").name("Burley (r=0.9)")}let h=(B,F,ae)=>{a.materialType=0,a.baseWeight=1,a.metallic=1,a.specTrans=0,a.clearcoat=0,a.specularWeight=1,a.roughness=B,a.anisotropic=F,a.anisotropyRotation=ae,i.objectPropChanged=!0},d=t.addFolder("D4 Conductor Presets").open();{let B={smoothBrdf:()=>h(.12,0,0),anisotropicBrdf:()=>h(.28,.85,.25),roughBsdf:()=>h(.72,0,0)};d.add(B,"smoothBrdf").name("Conductor BRDF Smooth (r=0.12)"),d.add(B,"anisotropicBrdf").name("Conductor BRDF Aniso (r=0.28)"),d.add(B,"roughBsdf").name("Conductor BSDF Rough (r=0.72)")}let f=(B,F,ae,j,W)=>{a.materialType=0,a.baseWeight=1,a.metallic=0,a.specularWeight=1,a.clearcoat=0,a.specTrans=B,a.ior=F,a.roughness=ae,a.thinWalled=j,a.transmissionExtraRoughness=W,a.transmissionColor=new _(1,1,1),i.objectPropChanged=!0},p=t.addFolder("D4 Dielectric Presets").open();{let B={brdfReflective:()=>f(.08,1.5,.08,0,0),bsdfMixed:()=>f(.5,1.52,.12,0,0),btdfTirTarget:()=>f(1,2.2,.02,0,0)};p.add(B,"brdfReflective").name("Dielectric BRDF Reflective"),p.add(B,"bsdfMixed").name("Dielectric BSDF Mixed"),p.add(B,"btdfTirTarget").name("Dielectric BTDF TIR Target")}let g=o.openPbrPresetByMaterialID.get(l),m={preset:g&&en.PRESET_NAMES.includes(g)?g:en.PRESET_NAMES[0]},y=l;t.add(m,"preset",[...en.PRESET_NAMES]).name("OpenPBR Preset").onChange(B=>{if(o.openPbrPresetByMaterialID.set(y,B),B==="-- None --")return;let F=en.presetByName(B);F&&(F.toMaterial(a),i.reloadShaders=!0,i.objectPropChanged=!0,t=o.onMaterialChanged(e,t,B,i))});let b=t.addFolder("Base").open();{let B=_.pow(a.baseColor,.45454545454545453);b.addColor({rgb:{r:B.x,g:B.y,b:B.z}},"rgb").listen().name("Albedo (Gamma Corrected)").onChange(F=>{a.baseColor=_.pow(new _(F.r,F.g,F.b),2.2),i.objectPropChanged=!0}),b.add(a,"baseWeight",0,1).listen().name("Base Weight").onChange(F=>{i.objectPropChanged=!0}),b.add(a,"baseDiffuseRoughness",0,1).listen().name("Base Diffuse Roughness").onChange(F=>{i.objectPropChanged=!0}),b.add(a,"metallic",0,1).listen().name("Metallic").onChange(F=>{i.objectPropChanged=!0}),b.add(a,"roughness",0,1).listen().name("Roughness").onChange(F=>{i.objectPropChanged=!0})}let M=t.addFolder("Specular").open();{M.add(a,"specularTint",0,1).listen().name("SpecularTint").onChange(F=>{i.objectPropChanged=!0});let B=_.pow(a.specularColor,1/2.2);M.addColor({rgb:{r:B.x,g:B.y,b:B.z}},"rgb").listen().name("Specular Color").onChange(F=>{a.specularColor=_.pow(new _(F.r,F.g,F.b),2.2),i.objectPropChanged=!0}),M.add(a,"ior",1.001,2.5).listen().name("Ior").onChange(F=>{i.objectPropChanged=!0}),M.add(a,"specularWeight",0,1).listen().name("Specular Weight").onChange(F=>{i.objectPropChanged=!0}),M.add(a,"anisotropic",0,1).listen().name("Anisotropic").onChange(F=>{i.objectPropChanged=!0}),M.add(a,"anisotropyRotation",0,1).listen().name("Anisotropy Rotation").onChange(F=>{i.objectPropChanged=!0})}let v=t.addFolder("Coat").open();{v.add(a,"clearcoat",0,1).listen().name("Clearcoat").onChange(F=>{i.objectPropChanged=!0}),v.add(a,"clearcoatGloss",0,1).listen().name("ClearcoatGloss").onChange(F=>{i.objectPropChanged=!0});let B=_.pow(a.coatColor,1/2.2);v.addColor({rgb:{r:B.x,g:B.y,b:B.z}},"rgb").listen().name("Coat Color").onChange(F=>{a.coatColor=_.pow(new _(F.r,F.g,F.b),2.2),i.objectPropChanged=!0}),v.add(a,"coatIOR",1.01,10).listen().name("Coat IOR").onChange(F=>{i.objectPropChanged=!0}),v.add(a,"coatRoughnessAnisotropy",0,1).listen().name("Coat Roughness Anisotropy").onChange(F=>{i.objectPropChanged=!0}),v.add(a,"coatAnisotropyRotation",0,1).listen().name("Coat Anisotropy Rotation").onChange(F=>{i.objectPropChanged=!0}),v.add(a,"coatDarkening",0,1).listen().name("Coat Darkening").onChange(F=>{i.objectPropChanged=!0}),v.add(a,"coatAffectRoughness",0,1).listen().name("Coat Affect Roughness").onChange(F=>{i.objectPropChanged=!0})}let w=t.addFolder("Sheen").open();{w.add(a,"sheen",0,1).listen().name("Sheen").onChange(j=>{i.objectPropChanged=!0}),w.add(a,"sheenTint",0,1).listen().name("SheenTint").onChange(j=>{i.objectPropChanged=!0}),w.add(a,"fuzzRoughness",0,1).listen().name("Fuzz Roughness").onChange(j=>{i.objectPropChanged=!0});let B={useCustom:a.fuzzColor.x>=0,get rgb(){let j=a.fuzzColor.x>=0?a.fuzzColor:new _(1,1,1),W=_.pow(j,1/2.2);return{r:W.x,g:W.y,b:W.z}}},F=null,ae=()=>{F=w.addColor(B,"rgb").listen().name("Fuzz Color").onChange(j=>{a.fuzzColor=_.pow(new _(j.r,j.g,j.b),2.2),i.objectPropChanged=!0})};w.add(B,"useCustom").listen().name("Custom Fuzz Color").onChange(j=>{j?(a.fuzzColor=new _(1,1,1),F||ae(),F.domElement.style.display=""):(a.fuzzColor=new _(-1,-1,-1),F&&(F.domElement.style.display="none")),i.objectPropChanged=!0}),ae(),B.useCustom||(F.domElement.style.display="none")}let T,S,E,I=()=>{let B=a.specTrans>0&&a.dispersionScale>0;S&&(S.domElement.style.display=B?"":"none"),E&&(E.domElement.style.display=B?"":"none")},N=t.addFolder("Transmission").open();{T=N.add(a,"specTrans",0,1).listen().name("SpecTrans").onChange(F=>{i.objectPropChanged=!0,I()});let B=_.pow(a.transmissionColor,1/2.2);N.addColor({rgb:{r:B.x,g:B.y,b:B.z}},"rgb").listen().name("Transmission").onChange(F=>{a.transmissionColor=_.pow(new _(F.r,F.g,F.b),2.2),i.objectPropChanged=!0}),N.add(a,"thinWalled",0,1).step(1).listen().name("Thin Walled").onChange(F=>{i.objectPropChanged=!0}),N.add(a,"transmissionExtraRoughness",0,1).listen().name("Transmission Extra Roughness").onChange(F=>{i.objectPropChanged=!0})}let D=t.addFolder("SSS").open();{let B,F,ae,j=()=>{let W=a.subsurface>0;B.domElement.style.display=W?"":"none",F.domElement.style.display=W?"":"none",ae.domElement.style.display=W?"":"none"};D.add(a,"subsurface",0,1).listen().name("Subsurface").onChange(W=>{i.objectPropChanged=!0,j()}),B=D.add({subsurfaceRadiusScaleX:a.subsurfaceRadiusScale.x},"subsurfaceRadiusScaleX",0,1).listen().name("Subsurface Radius Scale X").onChange(W=>{a.subsurfaceRadiusScale.x=W,i.objectPropChanged=!0}),F=D.add({subsurfaceRadiusScaleY:a.subsurfaceRadiusScale.y},"subsurfaceRadiusScaleY",0,1).listen().name("Subsurface Radius Scale Y").onChange(W=>{a.subsurfaceRadiusScale.y=W,i.objectPropChanged=!0}),ae=D.add({subsurfaceRadiusScaleZ:a.subsurfaceRadiusScale.z},"subsurfaceRadiusScaleZ",0,1).listen().name("Subsurface Radius Scale Z").onChange(W=>{a.subsurfaceRadiusScale.z=W,i.objectPropChanged=!0}),j()}let G=t.addFolder("Medium").open();{let B,F,ae,j,W,we=()=>{let me=a.mediumType!==0;B.domElement.style.display=me?"":"none",F.domElement.style.display=me?"":"none",ae.domElement.style.display=me?"":"none",W.domElement.style.display=me?"":"none",j.domElement.style.display=me?"":"none"},Qe=()=>{let me=a.mediumType===2;j.domElement.style.display=me?"":"none"},yt=a.mediumType,ei=yt===0?"None":yt===1?"Absorb":yt===2?"Scatter":"Emissive";G.add({mediumType:ei},"mediumType",["None","Absorb","Scatter","Emissive"]).listen().name("Medium Type").onChange(me=>{i.reloadShaders=!0,i.objectPropChanged=!0,a.mediumType=me==="None"?0:me==="Absorb"?1:me==="Scatter"?2:3,we(),Qe()});let rn=_.pow(a.mediumColor,1/2.2);B=G.addColor({rgb:{r:rn.x,g:rn.y,b:rn.z}},"rgb").listen().name("Medium Color (Gamma Corrected)").onChange(me=>{a.mediumColor=_.pow(new _(me.r,me.g,me.b),2.2),i.objectPropChanged=!0}),F=G.add(a,"mediumScattering",0,5).listen().name("Medium Scattering (sigma_s)").onChange(me=>{i.objectPropChanged=!0}),ae=G.add(a,"mediumAbsorption",0,5).listen().name("Medium Absorption").onChange(me=>{i.objectPropChanged=!0}),j=G.add(a,"mediumAnisotropy",-.99,.99).listen().name("Medium Anisotropy").onChange(me=>{i.objectPropChanged=!0}),W=G.add(a,"mediumThickness",0,5).listen().name("Medium Thickness").onChange(me=>{i.objectPropChanged=!0}),we(),Qe()}let U=t.addFolder("Emission").open();{let B=_.pow(a.emission,.45454545454545453);U.addColor({rgb:{r:B.x,g:B.y,b:B.z}},"rgb").listen().name("Emission (Gamma Corrected)").onChange(F=>{a.emission=_.pow(new _(F.r,F.g,F.b),2.2),i.objectPropChanged=!0})}let R=t.addFolder("Thin Film").open();R.add(a,"thinFilmWeight",0,1).listen().name("Thin Film Weight").onChange(B=>{i.objectPropChanged=!0}),R.add(a,"thinFilmThickness",0,2e3).listen().name("Thin Film Thickness (nm)").onChange(B=>{i.objectPropChanged=!0}),R.add(a,"thinFilmIor",1,3).listen().name("Thin Film IOR").onChange(B=>{i.objectPropChanged=!0});let H=t.addFolder("Dispersion").open();S=H.add(a,"dispersionScale",0,1).listen().name("Dispersion Scale").onChange(B=>{i.objectPropChanged=!0,I()}),E=H.add(a,"abbeNumber",1,100).listen().name("Abbe Number").onChange(B=>{i.objectPropChanged=!0}),I();let P=t.addFolder("Alpha").open();{let B,F=()=>{let W=a.alphaMode!==0;B.domElement.style.display=W?"":"none"},j=a.alphaMode===0?"Opaque":"Blend";P.add({alphaMode:j},"alphaMode",["Opaque","Blend"]).listen().name("Alpha Mode").onChange(W=>{a.alphaMode=W==="Opaque"?0:1,i.reloadShaders=!0,i.objectPropChanged=!0,F()}),B=P.add(a,"opacity",0,1).listen().name("Opacity").onChange(W=>{i.objectPropChanged=!0}),P.add(a,"alphaCutoff",0,1).listen().name("Alpha Cutoff").onChange(W=>{i.objectPropChanged=!0}),P.add(a,"doubleSided",0,1,1).listen().name("Double Sided").onChange(W=>{i.objectPropChanged=!0}),F()}let ne=t.addFolder("UV").open();return ne.add({uvScaleX:a.uvScale.x},"uvScaleX",.01,10).listen().name("UV Scale X").onChange(B=>{a.uvScale.x=B,i.objectPropChanged=!0}),ne.add({uvScaleY:a.uvScale.y},"uvScaleY",.01,10).listen().name("UV Scale Y").onChange(B=>{a.uvScale.y=B,i.objectPropChanged=!0}),t}static onInstanceChanged(e,t,n,i){let s=i.renderer.scene;t?.destroy(),t=e.addFolder("Transforms").close();let r=s.meshInstances.find(h=>h.name===n),l=r.transform,a,c,u;return{translation:a,rotation:c,scale:u}=l.decompose(),t.add({x:a.x,y:a.y,z:a.z},"x").listen().name("Translation").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:a.x,y:a.y,z:a.z},"x").listen().name("Translation").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:a.x,y:a.y,z:a.z},"x").listen().name("Translation").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{o.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t}static onTransformChanged(e,t,n,i){i.transform=ie.fromDecomposed(e,t,n)}static getAdaptiveGuiWidth(){let e=window.innerWidth;return e<=480?Math.max(250,e-24):e<=900?Math.max(280,Math.floor(e*.8)):e<=1400?360:400}static attachBenchmarkToGui(e){let t=e.querySelector(".bench-host");t||(t=document.createElement("div"),t.className="bench-host",t.style.margin="8px",t.style.padding="6px",t.style.borderRadius="8px",t.style.background="rgba(14, 22, 34, 0.72)",t.style.border="1px solid rgba(90, 130, 170, 0.35)",t.style.display="flex",t.style.alignItems="flex-start",t.style.justifyContent="flex-start",e.appendChild(t));let n=document.getElementById("gl-bench-embedded-style");n||(n=document.createElement("style"),n.id="gl-bench-embedded-style",n.textContent=`
                #gl-bench {
                    display: inline-block !important;
                    width: auto !important;
                }

                #gl-bench .gl-box {
                    display: inline-block !important;
                    width: auto !important;
                    max-width: max-content;
                }
            `,document.head.appendChild(n));let i=document.getElementById("gl-bench");return i?(t.style.display="flex",i.style.position="relative",i.style.display="inline-block",i.style.width="auto",i.style.left="0",i.style.top="0",i.style.margin="0",i.style.zIndex="1",t.replaceChildren(i),t):(t.style.display="none",t)}static addActionButtonsRow(e,t){let n="controls-action-row-style",i=document.getElementById(n);i||(i=document.createElement("style"),i.id=n,i.textContent=`
                .lil-gui li.controls-action-row {
                    min-height: auto !important;
                    //padding: 6px 6px 8px 6px !important;
                }

                .lil-gui .controls-action-buttons {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 6px;
                    width: 100%;
                }

                .lil-gui .controls-action-buttons button {
                    min-height: 28px;
                    padding: 4px 6px;
                    font-size: 11px;
                    line-height: 1.15;
                    border-radius: 6px;
                    border: 1px solid rgba(112, 170, 212, 0.35);
                    background: rgba(42, 62, 86, 0.85);
                    color: #d9ebff;
                    cursor: pointer;
                }

                .lil-gui .controls-action-buttons button:hover {
                    background: rgba(64, 90, 121, 0.92);
                }

                .lil-gui .controls-action-buttons .icon {
                    display: none;
                    font-weight: 700;
                    font-size: 12px;
                    letter-spacing: 0.2px;
                }

                @media (max-width: 900px) {
                    .lil-gui .controls-action-buttons .label {
                        display: none;
                    }

                    .lil-gui .controls-action-buttons .icon {
                        display: inline;
                    }

                    .lil-gui .controls-action-buttons button {
                        padding: 4px;
                        min-height: 26px;
                    }
                }
            `,document.head.appendChild(i));let s=e.domElement.querySelector(".children");if(!s)return()=>{};let r=document.createElement("li");r.className="controller controls-action-row";let l=document.createElement("div");l.className="controls-action-buttons";let a=document.createElement("button");a.type="button",a.title="Rewind",a.setAttribute("aria-label","Rewind"),a.innerHTML='<span class="label">Rewind</span><span class="icon">&lt;&lt;</span>',a.addEventListener("click",x=>{x.preventDefault(),t.rewind(),d(t.isPaused())});let c=document.createElement("button");c.type="button";let u=document.createElement("span");u.className="label";let h=document.createElement("span");h.className="icon",c.appendChild(u),c.appendChild(h);let d=x=>{let m=x?"Continue":"Pause";c.title=m,c.setAttribute("aria-label",m),u.textContent=m,h.textContent=x?">":"||"};d(t.isPaused());let f=window.setTimeout(()=>{d(t.isPaused())},0),p=window.setInterval(()=>{if(!document.body.contains(c)){window.clearInterval(p);return}d(t.isPaused())},200);c.addEventListener("click",x=>{x.preventDefault();let m=t.pauseOrContinue();d(m)});let g=document.createElement("button");return g.type="button",g.title="Fullscreen",g.setAttribute("aria-label","Fullscreen"),g.innerHTML='<span class="label">Fullscreen</span><span class="icon">[]</span>',g.addEventListener("click",x=>{x.preventDefault(),t.fullscreen()}),l.appendChild(a),l.appendChild(c),l.appendChild(g),r.appendChild(l),s.appendChild(r),()=>{window.clearTimeout(f),window.clearInterval(p)}}static enableGuiDragging(e){let t=e.domElement,n=t.querySelector(".title")??t;n.style.cursor="move";let i=!1,s=0,r=0,l=u=>{if(!i)return;let h=u.clientX-s,d=u.clientY-r,f=o.clampGuiPosition(t,h,d);o.guiManualPosition=f,o.applyGuiPosition(t,f.x,f.y)},a=()=>{i=!1,window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",a)},c=u=>{if(u.button!==0)return;let h=t.getBoundingClientRect();i=!0,s=u.clientX-h.left,r=u.clientY-h.top,o.applyGuiPosition(t,h.left,h.top),window.addEventListener("mousemove",l),window.addEventListener("mouseup",a),u.preventDefault()};return n.addEventListener("mousedown",c),()=>{n.removeEventListener("mousedown",c),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",a)}}static applyGuiPosition(e,t,n){e.style.right="auto",e.style.left=`${t}px`,e.style.top=`${n}px`}static clampGuiPosition(e,t,n){let s=Math.max(4,window.innerWidth-e.offsetWidth-4),r=Math.max(4,window.innerHeight-e.offsetHeight-4);return{x:Math.min(Math.max(4,t),s),y:Math.min(Math.max(4,n),r)}}};var lo=class extends Yi{playing=!1;timeupdate=!1;copyVideo=!1;loadTexture(e){let t=document.createElement("video");this.image=t,L.document.getElementById("textures")?.appendChild(t),t.controls=!0,t.playsInline=!0,t.muted=!0,t.loop=!0,t.addEventListener("playing",()=>{this.playing=!0,this.checkReady()},!0),t.addEventListener("timeupdate",()=>{this.timeupdate=!0,this.checkReady()},!0),t.src=e,t.play()}checkReady(){this.playing&&this.timeupdate&&(this.copyVideo=!0)}};var co=class extends Dt{internalFormat;format;gltype;audio;playing=!1;timeupdate=!1;copyAudio=!1;audioContext;analyser;freqData;waveData;constructor(){super(),this.audioContext=new AudioContext,this.audioContext.resume(),this.analyser=this.audioContext.createAnalyser(),this.freqData=new Uint8Array(this.analyser.frequencyBinCount),this.waveData=new Uint8Array(this.analyser.frequencyBinCount),this.internalFormat=L.gl.raw.R8,this.format=L.gl.raw.RED,this.gltype=L.gl.raw.UNSIGNED_BYTE}loadTexture(e){let t=document.createElement("audio");this.audio=t,t.loop=!0,t.autoplay=!0,t.crossOrigin="anonymous",t.controls=!0,t.addEventListener("playing",()=>{this.playing=!0,this.checkReady()},!0),t.addEventListener("timeupdate",()=>{this.timeupdate=!0,this.checkReady()},!0),t.addEventListener("canplay",()=>{this.audioContext.createMediaElementSource(t).connect(this.analyser),this.analyser.connect(this.audioContext.destination)},!0),t.src=e,t.load()}checkReady(){this.playing&&this.timeupdate&&(this.copyAudio=!0)}update(){this.analyser.getByteFrequencyData(this.freqData),this.analyser.getByteTimeDomainData(this.waveData)}};async function uo(o,e,t,n=null){let i=await he(o);if(!i.ok)return console.error(`Couldn't open ${o} for reading`),!1;let s=await i.text();if(n&&(s=await n(o,s),s===null))return console.error(`Callback failed for ${o}`),!1;let r=null;try{r=new ti(JSON.parse(s))}catch(a){return console.error(`Error parsing Shadertoy shader from ${o}:`,a),!1}let l=o.split("/").slice(0,-1).join("/");return nu(l,r,e,t,n)}async function nu(o,e,t,n,i=null){if(e.common&&(!e.commonCode||e.commonCode==="")){let l=await Se.loadAsync(`${o}/common.glsl`);if(!l.src)return console.error("Couldn't open common.glsl for reading"),!1;i&&(l.src=await i(`${o}/common.glsl`,l.src)),e.commonCode=l.src}if(e.isGlslPathtracer){let l=/^#define OPT_SHADERTOY_LIGHT(.*)$/m;e.commonCode=e.commonCode.replace(l,"// #define OPT_SHADERTOY_LIGHT$1")}let s={},r={};for(let l of[e.bufferA,e.bufferB,e.bufferC,e.bufferD,e.cubeA,e.sound,e.image])if(l){if(l===e.bufferA?l.type="bufferA":l===e.bufferB?l.type="bufferB":l===e.bufferC?l.type="bufferC":l===e.bufferD?l.type="bufferD":l===e.cubeA?(l.type="cubeA",l.xres=1024,l.yres=1024):l===e.sound?(l.type="sound",l.xres=Xe.instance().textureDimensions,l.yres=Xe.instance().textureDimensions):l===e.image&&(l.type="image"),!l.code||l.code===""){let a=await Se.loadAsync(`${o}/${l.type}.glsl`);if(!a.src)return console.error(`Couldn't open ${l.type}.glsl for reading`),!1;if(i&&(a.src=await i(`${o}/${l.type}.glsl`,a.src),a.src===null))return console.error(`Callback failed for ${l.type}.glsl`),!1;l.code=a.src}for(let a of l.inputs){if(L.gl==null)break;if(a.type==="keyboard"){let c=Ft.instance();a.arrayBuffer=c.buffer,a.xres=c.xRes,a.yres=c.yRes,a.internalFormat=c.internalFormat,a.format=c.format,a.gltype=c.gltype,c.input=a}else if(a.filepath){if(a.type==="floats"){let c;if(r[a.filepath])c=r[a.filepath];else{let u=a.filepath;u.startsWith("http")||(u=`scenes/shadertoy/${u}`);let h=await he(u);if(!h.ok)return console.error(`Couldn't open ${a.filepath} for reading`),!1;let d=await h.arrayBuffer(),f=new qi(d),p=f.ReadUInt32(),g=f.ReadUInt32(),x=f.ReadUInt32(),m=f.ReadUInt32(),y=f.ReadUInt8(),b=f.ReadUInt8(),M=f.ReadUInt16(),v,w,T;if(y===1&&M===10)[v,w,T]=[L.gl.raw.R32F,L.gl.raw.RGB,L.gl.raw.FLOAT];else if(y===3&&M===10)[v,w,T]=[L.gl.raw.RGB32F,L.gl.raw.RED,L.gl.raw.FLOAT];else if(y===4&&M===10)[v,w,T]=[L.gl.raw.RGBA32F,L.gl.raw.RGBA,L.gl.raw.FLOAT];else return console.error(`Unsupported texture format: ${y} channels, ${M} format`),!1;let S=new Float32Array(d,20);r[a.filepath]={buffer:S,xRes:g,yRes:x,internalFormat:v,format:w,gltype:T},c=r[a.filepath]}a.arrayBuffer=c.buffer,a.xres=c.xRes,a.yres=c.yRes,a.internalFormat=c.internalFormat,a.format=c.format,a.gltype=c.gltype}else if(a.type==="volume"){let c;if(r[a.filepath])c=r[a.filepath];else{let u=a.filepath;u.startsWith("http")||(u=`scenes/shadertoy/${u}`);let h=await he(u);if(!h.ok)return console.error(`Couldn't open ${a.filepath} for reading`),!1;let d=await h.arrayBuffer(),f=new qi(d),p=f.ReadUInt32(),g=f.ReadUInt32(),x=f.ReadUInt32(),m=f.ReadUInt32(),y=f.ReadUInt8(),b=f.ReadUInt8(),M=f.ReadUInt16(),v,w,T;if(y===1&&M===0)[v,w,T]=[L.gl.raw.R8,L.gl.raw.RED,L.gl.raw.UNSIGNED_BYTE];else if(y===4&&M===0)[v,w,T]=[L.gl.raw.RGBA8,L.gl.raw.RGBA,L.gl.raw.UNSIGNED_BYTE];else return console.error(`Unsupported texture format: ${y} channels, ${M} format`),!1;let S=new Uint8Array(d,20);r[a.filepath]={buffer:S,xRes:g,yRes:x,internalFormat:v,format:w,gltype:T},c=r[a.filepath]}a.arrayBuffer=c.buffer,a.xres=c.xRes,a.yres=c.yRes,a.internalFormat=c.internalFormat,a.format=c.format,a.gltype=c.gltype}else if(a.filepath.endsWith("jpg")||a.filepath.endsWith("png"))if(a.type==="cubemap"&&a.filepath.endsWith("cubemap00.png"))a.type="cubeA",a.internalFormat=L.gl.raw.RGBA8,a.format=L.gl.raw.RGBA,a.gltype=L.gl.raw.UNSIGNED_BYTE;else if(a.type==="cubemap"){let c=a.filepath.substring(a.filepath.lastIndexOf("/")+1,a.filepath.lastIndexOf(".")),u=a.filepath.substring(a.filepath.lastIndexOf(".")+1),h=a.filepath.substring(0,a.filepath.lastIndexOf("/"));a.imageTextures=[];for(let d=0;d<6;d++){let f;if(d==0?f=a.filepath:f=h+`/${c}_${d}.${u}`,s[f])a.imageTextures.push(s[f]);else{let p=new bt;if(f.startsWith("http")||(f=`scenes/shadertoy/${f}`),!await p.loadTextureAsync(f))return console.error(`Couldn't load texture ${f}`),!1;s[f]=p,a.imageTextures.push(p)}}}else{let c;if(s[a.filepath])c=s[a.filepath];else{let u=new bt,h=a.filepath;if(h.startsWith("http")||(h=`scenes/shadertoy/${h}`),!await u.loadTextureAsync(h))return console.error(`Couldn't load texture ${a.filepath}`),!1;c=u,s[a.filepath]=u}a.imageTexture=c,a.xres=c.width,a.yres=c.height,a.internalFormat=L.gl.raw.RGBA8,a.format=L.gl.raw.RGBA,a.gltype=L.gl.raw.UNSIGNED_BYTE}else if(a.filepath.endsWith("mp4")||a.filepath.endsWith("webm")){let c;if(s[a.filepath])c=s[a.filepath];else{let u=new lo,h=a.filepath;h.startsWith("http")||(h=`scenes/shadertoy/${h}`),u.loadTexture(h),c=u,s[a.filepath]=u}a.imageTexture=c,a.internalFormat=L.gl.raw.RGBA8,a.format=L.gl.raw.RGBA,a.gltype=L.gl.raw.UNSIGNED_BYTE}else if(a.filepath.endsWith("mp3")||a.filepath.endsWith("ogg")){let c;if(s[a.filepath])c=s[a.filepath];else{let u=new co,h=a.filepath;h.startsWith("http")||(h=`scenes/shadertoy/${h}`),u.loadTexture(h),c=u,s[a.filepath]=u}a.audioTexture=c,a.xres=c.analyser.frequencyBinCount,a.yres=2,a.internalFormat=c.internalFormat,a.format=c.format,a.gltype=c.gltype}}}e.buffers=e.buffers||[],e.buffers.push(l)}return t&&(t.shadertoyShader=e),!0}async function yh(o,e,t,n=null){let i=await he(o);if(!i.ok)return console.error(`Couldn't open ${o} for reading`),!1;let s=await i.text();n&&(s=await n(o,s));let r=null;try{r=JSON.parse(s)}catch(c){return console.error(`Error parsing Shadertoy shader from ${o}:`,c),!1}let l=new ti;l.fromShadertoyJson(r);let a=o.split("/").slice(0,-1).join("/");return nu(a,l,e,t,n)}var Oi=class{static async readBlob(e){try{let t=await fetch(this.buildUrl(e),{method:"GET"});return t.ok?await t.blob():(console.error("Failed to read blob from:",e,t.statusText),null)}catch(t){return console.error("Failed to read blob from:",e,t),null}}static async writeBlob(e,t,n=null){console.log(`Uploading ${e} to Azure Blob Storage`);let i="scenes",s=process.env.AZURE_STORAGE_ACCOUNT_SAS_TOKEN,r=this.buildUrl(`${e}?${s}`),l=typeof t=="string"?new Blob([t]).size.toString():t.byteLength.toString(),a=await fetch(r,{method:"PUT",headers:{"x-ms-version":"2019-12-12","x-ms-date":new Date().toUTCString(),"x-ms-blob-type":"BlockBlob","Content-Type":n??(typeof t=="string"?"application/json":"application/octet-stream"),"Content-Length":l},body:typeof t=="string"?t:new Uint8Array(t)});return a.ok?!0:(console.error("Failed to create blob:",e,a.statusText),!1)}static buildUrl(e,t="scenes"){return`https://rvawebgl.blob.core.windows.net/$web/${t}/${e}`}};var xt=class{position;emission;u;v;radius;area;type;constructor(){this.position=new _,this.emission=new _,this.u=new _,this.v=new _,this.radius=0,this.area=0,this.type=0}};var Gi=class o extends He{base=1;base_color=new _(.8,.8,.8);diffuse_roughness=0;metalness=0;specular=1;specular_color=new _(1,1,1);specular_roughness=.2;specular_IOR=1.5;specular_anisotropy=0;specular_rotation=0;transmission=0;transmission_color=new _(1,1,1);transmission_depth=0;transmission_scatter=new _(0,0,0);transmission_scatter_anisotropy=0;transmission_dispersion=0;transmission_extra_roughness=0;subsurface=0;subsurface_color=new _(1,1,1);subsurface_radius=new _(1,1,1);subsurface_scale=1;subsurface_anisotropy=0;sheen=0;sheen_color=new _(1,1,1);sheen_roughness=.3;thin_walled=!1;coat=0;coat_color=new _(1,1,1);coat_roughness=.1;coat_anisotropy=0;coat_rotation=0;coat_IOR=1.5;coat_affect_color=0;coat_affect_roughness=0;thin_film_thickness=0;thin_film_IOR=1.5;emission=0;emission_color=new _(1,1,1);opacity=new _(1,1,1);constructor(e){super(e)}toMaterial(e){if(e.baseWeight=o.clamp01(this.base),e.baseColor=o.clampVec(new _(this.base_color.x*this.base,this.base_color.y*this.base,this.base_color.z*this.base)),e.baseDiffuseRoughness=o.clamp01(this.diffuse_roughness),e.metallic=o.clamp01(this.metalness),e.roughness=Math.min(Math.max(this.specular_roughness,.001),1),e.ior=Math.max(this.specular_IOR,1),e.anisotropic=o.clamp01(this.specular_anisotropy),e.anisotropyRotation=o.clamp01(this.specular_rotation),e.specularColor=o.clampVec(this.specular_color),e.specularWeight=o.clamp01(this.specular),e.specularTint=0,e.specTrans=o.clamp01(this.transmission),e.transmissionColor=o.clampVec(this.transmission_color),e.transmissionExtraRoughness=Math.max(this.transmission_extra_roughness,0),this.transmission_dispersion>0?(e.dispersionScale=1,e.abbeNumber=Math.max(this.transmission_dispersion,1)):(e.dispersionScale=0,e.abbeNumber=50),e.thinWalled=this.thin_walled?1:0,e.doubleSided=this.thin_walled?1:0,e.subsurface=o.clamp01(this.subsurface),e.subsurfaceRadiusScale=_.max(this.subsurface_radius.clone(),new _(.001,.001,.001)),this.thin_walled)e.subsurface=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;else if(this.subsurface>0){e.mediumType=2,e.mediumColor=o.clampVec(this.subsurface_color),e.mediumAnisotropy=Math.min(Math.max(this.subsurface_anisotropy,-.99),.99);let n=Math.max(this.subsurface_scale,.001);e.mediumThickness=n;let i=o.clamp01(this.subsurface_color.x*.2126+this.subsurface_color.y*.7152+this.subsurface_color.z*.0722),s=1/n;e.mediumAbsorption=s*(1-i),e.mediumScattering=s-e.mediumAbsorption}else if(this.transmission>0&&this.transmission_depth>0){e.mediumType=1,e.mediumColor=o.clampVec(this.transmission_color),e.mediumAnisotropy=Math.min(Math.max(this.transmission_scatter_anisotropy,-.99),.99);let n=Math.max(this.transmission_depth,.001);e.mediumThickness=0,e.mediumScattering=0,e.mediumAbsorption=1/n}else e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;e.sheen=o.clamp01(this.sheen),e.fuzzColor=o.clampVec(this.sheen_color),e.sheenTint=0,e.fuzzRoughness=o.clamp01(this.sheen_roughness),e.clearcoat=o.clamp01(this.coat),e.coatColor=o.clampVec(this.coat_color),e.clearcoatGloss=o.clamp01(1-this.coat_roughness),e.coatRoughnessAnisotropy=o.clamp01(this.coat_anisotropy),e.coatAnisotropyRotation=o.clamp01(this.coat_rotation),e.coatIOR=Math.max(this.coat_IOR,1.01),e.coatDarkening=o.clamp01(this.coat_affect_color),e.coatAffectRoughness=o.clamp01(this.coat_affect_roughness),e.thinFilmThickness=Math.max(this.thin_film_thickness,0),e.thinFilmIor=Math.max(this.thin_film_IOR,1),e.thinFilmWeight=this.thin_film_thickness>0?1:0,e.emission=new _(this.emission_color.x*this.emission,this.emission_color.y*this.emission,this.emission_color.z*this.emission);let t=o.clamp01(this.opacity.x*.2126+this.opacity.y*.7152+this.opacity.z*.0722);e.opacity=t,e.alphaMode=t<1?1:0}static parse(e){let t=new o("default"),n=(r,l)=>{let a=be(e,l);a!==null&&(t[r]=a)},i=(r,l)=>{let a=Pt(e,l);a!==null&&(t[r]=a)},s=(r,l)=>{let a=oo(e,l);a!==null&&(t[r]=a)};return n("base","base"),i("base_color","base_color"),n("diffuse_roughness","diffuse_roughness"),n("metalness","metalness"),n("specular","specular"),i("specular_color","specular_color"),n("specular_roughness","specular_roughness"),n("specular_IOR","specular_IOR"),n("specular_anisotropy","specular_anisotropy"),n("specular_rotation","specular_rotation"),n("transmission","transmission"),i("transmission_color","transmission_color"),n("transmission_depth","transmission_depth"),i("transmission_scatter","transmission_scatter"),n("transmission_scatter_anisotropy","transmission_scatter_anisotropy"),n("transmission_dispersion","transmission_dispersion"),n("transmission_extra_roughness","transmission_extra_roughness"),n("subsurface","subsurface"),i("subsurface_color","subsurface_color"),i("subsurface_radius","subsurface_radius"),n("subsurface_scale","subsurface_scale"),n("subsurface_anisotropy","subsurface_anisotropy"),n("sheen","sheen"),i("sheen_color","sheen_color"),n("sheen_roughness","sheen_roughness"),s("thin_walled","thin_walled"),n("coat","coat"),i("coat_color","coat_color"),n("coat_roughness","coat_roughness"),n("coat_anisotropy","coat_anisotropy"),n("coat_rotation","coat_rotation"),n("coat_IOR","coat_IOR"),n("coat_affect_color","coat_affect_color"),n("coat_affect_roughness","coat_affect_roughness"),n("thin_film_thickness","thin_film_thickness"),n("thin_film_IOR","thin_film_IOR"),n("emission","emission"),i("emission_color","emission_color"),i("opacity","opacity"),t}};var ho=class o extends He{baseColor=new _(.18,.18,.18);subsurface=0;metallic=0;specular=.5;specularTint=0;roughness=.5;anisotropic=0;sheen=0;sheenTint=.5;clearcoat=0;clearcoatGloss=1;transmission=0;ior=1.5;opacity=1;constructor(e){super(e)}toMaterial(e){if(e.baseWeight=1,e.baseColor=_.clamp(this.baseColor.clone(),new _(0,0,0),new _(1,1,1)),e.metallic=o.clamp01(this.metallic),e.subsurface=o.clamp01(this.subsurface),this.ior!==1.5)e.ior=Math.max(this.ior,1);else{let t=.08*o.clamp01(this.specular),n=Math.sqrt(Math.max(t,0)),i=1-n;e.ior=i>1e-4?Math.max((1+n)/i,1):1}e.specularTint=o.clamp01(this.specularTint),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.anisotropic=o.clamp01(this.anisotropic),e.sheen=o.clamp01(this.sheen),e.sheenTint=o.clamp01(this.sheenTint),e.clearcoat=o.clamp01(this.clearcoat),e.clearcoatGloss=o.clamp01(this.clearcoatGloss),e.specTrans=o.clamp01(this.transmission),e.opacity=o.clamp01(this.opacity),e.alphaMode=e.opacity<1?1:0}static parse(e){let t=e.getAttribute("name")??"disneyPrincipled",n=new o(t),i=(r,l)=>{let a=be(e,l);a!==null&&(n[r]=a)};return((r,l)=>{let a=Pt(e,l);a!==null&&(n[r]=a)})("baseColor","baseColor"),i("subsurface","subsurface"),i("metallic","metallic"),i("specular","specular"),i("specularTint","specularTint"),i("roughness","roughness"),i("anisotropic","anisotropic"),i("sheen","sheen"),i("sheenTint","sheenTint"),i("clearcoat","clearcoat"),i("clearcoatGloss","clearcoatGloss"),i("transmission","transmission"),i("ior","ior"),i("opacity","opacity"),n}};var fo=class o extends He{base_color=new _(1,1,1);alpha=1;alpha_mode=0;alpha_cutoff=.5;metallic=1;roughness=1;ior=1.5;specular=1;specular_color=new _(1,1,1);emissive=new _(0,0,0);emissive_strength=1;sheen_color=new _(0,0,0);sheen_roughness=0;clearcoat=0;clearcoat_roughness=0;transmission=0;thickness=0;attenuation_distance=0;attenuation_color=new _(1,1,1);iridescence=0;iridescence_ior=1.3;iridescence_thickness=100;constructor(e){super(e)}toMaterial(e){e.baseWeight=1,e.baseColor=o.clampVec(this.base_color),e.metallic=o.clamp01(this.metallic),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.ior=Math.max(this.ior,1),e.specularColor=o.clampVec(this.specular_color.scale(o.clamp01(this.specular))),e.specTrans=o.clamp01(this.transmission);let t=Math.max(this.sheen_color.x,this.sheen_color.y,this.sheen_color.z);e.sheen=o.clamp01(t),e.fuzzColor=o.clampVec(this.sheen_color),e.fuzzRoughness=o.clamp01(this.sheen_roughness),e.clearcoat=o.clamp01(this.clearcoat),e.clearcoatGloss=o.clamp01(1-this.clearcoat_roughness),e.emission=new _(this.emissive.x*this.emissive_strength,this.emissive.y*this.emissive_strength,this.emissive.z*this.emissive_strength),e.opacity=o.clamp01(this.alpha),e.alphaMode=this.alpha_mode===1?2:this.alpha_mode===2?1:0,e.alphaCutoff=o.clamp01(this.alpha_cutoff),this.transmission>0&&this.attenuation_distance>0&&(e.mediumType=1,e.mediumColor=o.clampVec(this.attenuation_color),e.mediumScattering=0,e.mediumAbsorption=1/Math.max(this.attenuation_distance,.001),e.mediumThickness=Math.max(this.thickness,0)),e.thinFilmWeight=o.clamp01(this.iridescence),e.thinFilmThickness=Math.max(this.iridescence_thickness,0),e.thinFilmIor=Math.max(this.iridescence_ior,1)}static parse(e){let t=e.getAttribute("name")??"gltfPbr",n=new o(t),i=(l,a)=>{let c=be(e,a);c!==null&&(n[l]=c)},s=(l,a)=>{let c=ao(e,a);c!==null&&(n[l]=c)},r=(l,a)=>{let c=Pt(e,a);c!==null&&(n[l]=c)};return r("base_color","base_color"),i("alpha","alpha"),s("alpha_mode","alpha_mode"),i("alpha_cutoff","alpha_cutoff"),i("metallic","metallic"),i("roughness","roughness"),i("ior","ior"),i("specular","specular"),r("specular_color","specular_color"),r("emissive","emissive"),i("emissive_strength","emissive_strength"),r("sheen_color","sheen_color"),i("sheen_roughness","sheen_roughness"),i("clearcoat","clearcoat"),i("clearcoat_roughness","clearcoat_roughness"),i("transmission","transmission"),i("thickness","thickness"),i("attenuation_distance","attenuation_distance"),r("attenuation_color","attenuation_color"),i("iridescence","iridescence"),i("iridescence_ior","iridescence_ior"),i("iridescence_thickness","iridescence_thickness"),n}};var po=class o extends He{diffuseColor=new _(.18,.18,.18);emissiveColor=new _(0,0,0);useSpecularWorkflow=0;specularColor=new _(0,0,0);metallic=0;roughness=.5;clearcoat=0;clearcoatRoughness=.01;ior=1.5;normal=new _(0,0,1);displacement=0;occlusion=1;opacity=1;opacityThreshold=0;constructor(e){super(e)}toMaterial(e){e.baseWeight=1,e.baseColor=o.clampVec(this.diffuseColor),this.useSpecularWorkflow===1?(e.metallic=0,e.specularColor=o.clampVec(this.specularColor)):e.metallic=o.clamp01(this.metallic),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.ior=Math.max(this.ior,1),e.clearcoat=o.clamp01(this.clearcoat),e.clearcoatGloss=o.clamp01(1-this.clearcoatRoughness),e.emission=o.clampVec(this.emissiveColor),e.opacity=o.clamp01(this.opacity),this.opacityThreshold>0?(e.alphaMode=2,e.alphaCutoff=o.clamp01(this.opacityThreshold)):this.opacity<1&&(e.alphaMode=1)}static parse(e){let t=new o("default"),n=(r,l)=>{let a=be(e,l);a!==null&&(t[r]=a)},i=(r,l)=>{let a=ao(e,l);a!==null&&(t[r]=a)},s=(r,l)=>{let a=Pt(e,l);a!==null&&(t[r]=a)};return s("diffuseColor","diffuseColor"),s("emissiveColor","emissiveColor"),i("useSpecularWorkflow","useSpecularWorkflow"),s("specularColor","specularColor"),n("metallic","metallic"),n("roughness","roughness"),n("clearcoat","clearcoat"),n("clearcoatRoughness","clearcoatRoughness"),n("ior","ior"),n("occlusion","occlusion"),n("opacity","opacity"),n("opacityThreshold","opacityThreshold"),t}};var Ps=class o extends He{melaninConcentration=.5;melaninRedness=.5;melaninMix=1;baseColor=new _(1,1,1);explicitAbsorptionCoefficient=null;longitudinalRoughness=.1;azimuthalRoughness=.1;cuticleAngle=.5;tint_R=new _(1,1,1);tint_TT=new _(1,1,1);tint_TRT=new _(1,1,1);ior=1.55;constructor(e){super(e)}toMaterial(e){let t=new _(.506,1.036,1.923),n=new _(.343,.733,1.924),i=o.clamp01(this.melaninRedness),s=Math.max(this.melaninConcentration,0),r=new _(s*(t.x*(1-i)+n.x*i),s*(t.y*(1-i)+n.y*i),s*(t.z*(1-i)+n.z*i)),l=o.clamp01(this.azimuthalRoughness),a=5.969-.215*l+2.532*Math.pow(l,2)-10.73*Math.pow(l,3)+5.574*Math.pow(l,4)+.245*Math.pow(l,5),c=a*a,u=1e-5,h=new _(Math.pow(Math.log(Math.max(this.baseColor.x,u)),2)/c,Math.pow(Math.log(Math.max(this.baseColor.y,u)),2)/c,Math.pow(Math.log(Math.max(this.baseColor.z,u)),2)/c),d=o.clamp01(this.melaninMix),f=this.explicitAbsorptionCoefficient?new _(Math.max(this.explicitAbsorptionCoefficient.x,0),Math.max(this.explicitAbsorptionCoefficient.y,0),Math.max(this.explicitAbsorptionCoefficient.z,0)):new _(r.x*d+h.x*(1-d),r.y*d+h.y*(1-d),r.z*d+h.z*(1-d));e.materialType=1,e.baseColor=new _(o.clamp01(this.tint_R.x),o.clamp01(this.tint_R.y),o.clamp01(this.tint_R.z)),e.specularColor=new _(Math.max(f.x,0),Math.max(f.y,0),Math.max(f.z,0)),e.transmissionColor=new _(o.clamp01(this.tint_TT.x),o.clamp01(this.tint_TT.y),o.clamp01(this.tint_TT.z)),e.coatColor=new _(o.clamp01(this.tint_TRT.x),o.clamp01(this.tint_TRT.y),o.clamp01(this.tint_TRT.z)),e.roughness=Math.min(Math.max(this.longitudinalRoughness,.01),1),e.anisotropic=Math.min(Math.max(this.azimuthalRoughness,.01),1),e.specularTint=o.clamp01(this.cuticleAngle),e.ior=Math.max(this.ior,1),e.doubleSided=1,e.coatIOR=1.6}static parse(e){let t=new o("default"),n=(s,r)=>{let l=be(e,r);l!==null&&(t[s]=l)},i=(s,r)=>{let l=Nt(e,r);l!==null&&(t[s]=l)};return n("melaninConcentration","melaninConcentration"),n("melaninRedness","melaninRedness"),n("melaninMix","melaninMix"),i("baseColor","baseColor"),n("longitudinalRoughness","longitudinalRoughness"),n("azimuthalRoughness","azimuthalRoughness"),n("cuticleAngle","cuticleAngle"),i("tint_R","tint_R"),i("tint_TT","tint_TT"),i("tint_TRT","tint_TRT"),n("ior","ior"),t}};var C=class{name;inputs=new Map;constructor(e){this.name=e}getDependencies(){let e=[];for(let t of this.inputs.values())t.kind==="connection"&&e.push(t.sourceName);return e}parseInputs(e){for(let t of Array.from(e.children)){let n=t.tagName.toLowerCase();if(n!=="input"&&n!=="parameter")continue;let i=t.getAttribute("name")??"";if(!i)continue;let s=t.getAttribute("type")??"float",r=t.getAttribute("value")??"",l=t.getAttribute("nodename")??"",a=t.getAttribute("output")??"",c=t.getAttribute("interfacename")??"";this.inputs.set(i,l?{kind:"connection",sourceName:l,outputName:a||void 0}:c?{kind:"interface",interfaceName:c,type:s}:{kind:"literal",value:r,type:s})}}literalValue(e){let t=this.inputs.get(e);return t?.kind==="literal"?t.value:null}literalFloat(e){let t=this.literalValue(e);if(t===null)return null;let n=parseFloat(t);return isNaN(n)?null:n}resolveGLSL(e,t){let n=this.inputs.get(e);if(!n)return"0.0";if(n.kind==="literal")return n.value.length>0?n.value:"0.0";if(n.kind==="interface"){let l=t.ifaceValues?.get(n.interfaceName);return l!==void 0?l:(this.warn(t,`Missing interface binding '${n.interfaceName}' for node '${this.name}', input '${e}'.`),this.zeroOfType(n.type))}let i=t.emitted.get(n.sourceName);if(!i){this.warn(t,`Unresolved source '${n.sourceName}' for node '${this.name}', input '${e}'.`);let l=n.outputName?.toLowerCase()??"";return l==="r"||l==="g"||l==="b"||l==="a"||l==="outx"||l==="outy"||l==="outz"||l==="outw"?"0.0":this.zeroOfType(this.outputType)}if(!n.outputName)return i;let s=t.emitted.get(`${n.sourceName}:${n.outputName}`);if(s)return s;let r=$m(n.outputName);return r.length>0?`${i}.${r}`:i}zeroOfType(e){switch(e){case"float":case"integer":case"boolean":return"0.0";case"color2":case"vector2":return"vec2(0.0)";case"vector4":case"color4":return"vec4(0.0)";case"matrix33":return"mat3(0.0)";case"matrix44":return"mat4(0.0)";default:return"vec3(0.0)"}}warn(e,t){e.warnings||(e.warnings=[]),e.warnings.push(t)}resolveRawValue(e,t){let n=this.inputs.get(e);return n?n.kind==="literal"?n.value.length>0?n.value:null:n.kind==="interface"?t.get(n.interfaceName)??null:null:null}};function $m(o){let e=o.toLowerCase();return e==="r"?"x":e==="g"?"y":e==="b"?"z":e==="a"?"w":e==="rgb"?"rgb":e==="rgba"?"rgba":e==="outx"||e==="outr"?"x":e==="outy"||e==="outg"?"y":e==="outz"||e==="outb"?"z":e==="outw"||e==="outa"?"w":e==="outcolor"||e==="outrgb"?"rgb":""}function k(o,e){return o.getAttribute("type")??e}function V(o){switch(o){case"float":return"float";case"integer":return"int";case"boolean":return"bool";case"color2":case"vector2":return"vec2";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3";case"vector4":case"color4":return"vec4";case"matrix33":return"mat3";case"matrix44":return"mat4";default:return"float"}}function zi(o){return o==="BSDF"||o==="VDF"||o==="EDF"}function vh(o){return`clamp(max(max(vec3(${o}).r, vec3(${o}).g), vec3(${o}).b), 0.0, 1.0)`}function We(o){switch(o){case"float":return"0.0";case"integer":return"0";case"boolean":return"false";case"color2":case"vector2":return"vec2(0.0)";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3(0.0)";case"vector4":case"color4":return"vec4(0.0)";case"matrix33":return"mat3(0.0)";case"matrix44":return"mat4(0.0)";default:return"0.0"}}function ge(o){switch(o){case"float":return"1.0";case"integer":return"1";case"boolean":return"true";case"color2":case"vector2":return"vec2(1.0)";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3(1.0)";case"vector4":case"color4":return"vec4(1.0)";case"matrix33":return"mat3(1.0)";case"matrix44":return"mat4(1.0)";default:return"1.0"}}function xe(o,e){let t=V(o);return o==="integer"||o==="boolean"||t==="float"||t==="int"||t==="bool"?e:`${t}(${e})`}function Th(o,e,t){return o==="=="?`abs((${e}) - (${t})) <= 1e-6`:`(${e} ${o} ${t})`}function _t(o,e){if(o===void 0)return e;let t=Number.parseFloat(o);return Number.isFinite(t)?`${t}`:e}function Hm(o,e){if(o===void 0)return e;let t=Number.parseInt(o,10);return Number.isFinite(t)?`${t}`:e}function Mh(o,e){let t=e.split(",").map(n=>n.trim()).filter(Boolean);switch(o){case"float":return _t(t[0],"0.0");case"integer":return Hm(t[0],"0");case"boolean":{let n=(t[0]??"").toLowerCase();return n==="1"||n==="true"?"true":"false"}case"color2":case"vector2":return`vec2(${_t(t[0],"0.0")}, ${_t(t[1],"0.0")})`;case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return`vec3(${_t(t[0],"0.0")}, ${_t(t[1],"0.0")}, ${_t(t[2],"0.0")})`;case"vector4":case"color4":return`vec4(${_t(t[0],"0.0")}, ${_t(t[1],"0.0")}, ${_t(t[2],"0.0")}, ${_t(t[3],"1.0")})`;case"matrix33":return`mat3(${bh(t,9).join(", ")})`;case"matrix44":return`mat4(${bh(t,16).join(", ")})`;default:return"0.0"}}function bh(o,e){let t=[];for(let n=0;n<e;n++)t.push(_t(o[n],"0.0"));return t}var Ns=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`a2_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e);return e.lines.push(`${n} ${t} = atan(${i}, ${s});`),e.emitted.set(this.name,t),t}};var Je=class extends C{outputType="float";op;mode;constructor(e,t,n="operator"){super(e),this.op=t,this.mode=n}parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`b_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e),r=this.mode==="function"?`${this.op}(${i}, ${s})`:`(${i} ${this.op} ${s})`;if(e.lines.push(`${n} ${t} = ${r};`),e.emitted.set(this.name,t),zi(this.outputType)){let l=this.inputs.get("in1"),a=this.inputs.get("in2"),c=l?.kind==="connection"?l.sourceName:null,u=a?.kind==="connection"?a.sourceName:null,h=c?e.closureContracts?.get(c):void 0,d=u?e.closureContracts?.get(u):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:t,sampleExpr:t,pdfExpr:h?.pdfExpr??d?.pdfExpr??"1.0",flagsExpr:h&&d?`(${h.flagsExpr} | ${d.flagsExpr})`:h?.flagsExpr??d?.flagsExpr??"0"})}return t}};var Ds=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`cl_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("low",e),r=this.resolveGLSL("high",e);return e.lines.push(`${n} ${t} = clamp(${i}, ${s}, ${r});`),e.emitted.set(this.name,t),t}};var Sn=class extends C{outputType="vector3";arity;constructor(e,t){super(e),this.arity=t}parse(e){return this.parseInputs(e),this.outputType=k(e,this.defaultType()),this}emitGLSL(e){let t=`cmb_${this.name}`,n=V(this.outputType),i=[];for(let s=1;s<=this.arity;s++)i.push(this.resolveGLSL(`in${s}`,e));return e.lines.push(`${n} ${t} = ${n}(${i.join(", ")});`),e.emitted.set(this.name,t),t}defaultType(){return this.arity<=2?"vector2":this.arity===3?"vector3":"vector4"}};var Fs=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`k_${this.name}`,n=this.resolveGLSL("value",e),i=V(this.outputType),s=Mh(this.outputType,n);return e.lines.push(`${i} ${t} = ${s};`),e.emitted.set(this.name,t),t}};var Us=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`dot_${this.name}`,n=this.resolveGLSL("in",e),i=V(this.outputType);return e.lines.push(`${i} ${t} = ${n};`),e.emitted.set(this.name,t),t}};var Bs=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`ext_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("index",e),r=Number.parseInt(s,10),l=Number.isFinite(r)?["x","y","z","w"][Math.max(0,Math.min(3,r))]:"x";return e.lines.push(`${n} ${t} = ${i}.${l};`),e.emitted.set(this.name,t),t}};var Ge=class extends C{outputType;filePath="";colorspace="";constructor(e,t="color3"){super(e),this.outputType=t}parse(e){this.parseInputs(e),this.filePath=this.literalValue("file")??"";let t=Array.from(e.children).find(n=>n.tagName.toLowerCase()==="input"&&n.getAttribute("name")==="file");return this.colorspace=t?.getAttribute("colorspace")??"",this}emitGLSL(e){let t=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):e.texCoordExpr??"vTexCoords",n=`img_${this.name}`,i=this.outputType==="float"?"float":"vec3",s=this.outputType==="float"?".r":".rgb",r=e.textureArrayUniform?`texture(${e.textureArrayUniform}, vec3(${t}, float(${e.textureLayerExpr??"0"})))${s}`:`texture(${e.envTexUniform}, ${t})${s}`;return e.lines.push(`${i} ${n} = ${r};`),e.emitted.set(this.name,n),n}};var ki=class extends C{outputType="color3";hdrFile="";rotation=0;parse(e){return this.parseInputs(e),this.hdrFile=this.literalValue("file")??"",this.rotation=this.literalFloat("rotation")??0,this}emitGLSL(e){let t=this.resolveGLSL("viewdir",e),i=this.inputs.get("rotation")?.kind==="connection"?this.resolveGLSL("rotation",e):"envMapRot",s=`theta_${this.name}`,r=`uv_${this.name}`,l=`c_${this.name}`;return e.lines.push(`float ${s} = acos(clamp(${t}.y, -1.0, 1.0));`,`vec2 ${r} = vec2((PI + atan(${t}.z, ${t}.x)) * INV_TWO_PI + ${i}, ${s} * INV_PI);`,`vec3 ${l} = texture(${e.envTexUniform}, ${r}).rgb;`),e.emitted.set(this.name,l),l}};var Vi=class extends C{outputType="lightshader";parse(e){return this.parseInputs(e),this}resolveIntensity(e){let t=this.resolveRawValue("intensity",e);if(t===null)return 1;let n=parseFloat(t);return isNaN(n)?1:n}emitGLSL(e){let t=this.resolveGLSL("edf",e),n=this.resolveGLSL("intensity",e),i=`light_${this.name}`;return e.lines.push(`vec3 ${i} = ${t} * ${n};`),e.emitted.set(this.name,i),i}};var Os=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`lum_${this.name}`,n=V(this.outputType),s=`dot((${this.resolveGLSL("in",e)}).rgb, vec3(0.2126, 0.7152, 0.0722))`,r=n==="float"?s:`${n}(${s})`;return e.lines.push(`${n} ${t} = ${r};`),e.emitted.set(this.name,t),t}};var wn=class extends C{outputType="color3";get in2Literal(){return this.literalFloat("in2")}parse(e){return this.parseInputs(e),this.outputType=k(e,"color3"),this}emitGLSL(e){let t=V(this.outputType),n=this.resolveGLSL("in1",e),s=this.inputs.get("in2")?.kind==="connection"?this.resolveGLSL("in2",e):e.preferEnvMapIntensityLiterals?"envMapIntensity":this.resolveGLSL("in2",e),r=`mul_${this.name}`;if(zi(this.outputType)){e.lines.push(`${t} ${r} = vec3(${n}) * vec3(${s});`);let l=this.inputs.get("in1"),a=this.inputs.get("in2"),c=l?.kind==="connection"?l.sourceName:null,u=a?.kind==="connection"?a.sourceName:null,h=c?e.closureContracts?.get(c):void 0,d=u?e.closureContracts?.get(u):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:r,sampleExpr:r,pdfExpr:h?.pdfExpr??d?.pdfExpr??"1.0",flagsExpr:h&&d?`(${h.flagsExpr} | ${d.flagsExpr})`:h?.flagsExpr??d?.flagsExpr??"0"})}else e.lines.push(`${t} ${r} = (${n}) * (${s});`);return e.emitted.set(this.name,r),r}};var Wm="1",Xm="2",Ym="4",oe=class extends C{outputType="BSDF";parse(e){return this.parseInputs(e),this}emitGLSL(e){return"vec3(0.0)"}scalar(e,t,n){return this.inputs.has(t)?this.resolveGLSL(t,e):n}color(e,t,n){return this.inputs.has(t)?this.resolveGLSL(t,e):n}registerClosureContract(e,t,n,i,s,r){e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:t,evalExpr:n,sampleExpr:i,pdfExpr:s,flagsExpr:r})}flagReflect(){return Wm}flagTransmit(){return Xm}flagEmissive(){return Ym}};var Me=class extends oe{kindHint;mode;constructor(e,t="generic",n="reflect"){super(e),this.kindHint=t,this.mode=n}emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color",this.mode==="emissive"?"vec3(1.0)":"vec3(0.8)"),i=this.scalar(e,"roughness","0.35"),s=`closure_${this.name}`;e.lines.push(`float fallbackRough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float fallbackScale_${this.name} = mix(1.0, 0.6, fallbackRough_${this.name});`),e.lines.push(`vec3 ${s} = max((${n}) * (${t}) * fallbackScale_${this.name}, vec3(0.0));`),e.lines.push(`float fallbackPdf_${this.name} = clamp(0.2 + 0.8 * (1.0 - fallbackRough_${this.name}), 1e-4, 1.0);`),e.lines.push(`vec3 fallbackSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`);let r=this.flagReflect();return this.mode==="transmit"?r=this.flagTransmit():this.mode==="both"?r=`(${this.flagReflect()} | ${this.flagTransmit()})`:this.mode==="emissive"&&(r=this.flagEmissive()),this.registerClosureContract(e,this.kindHint,s,`fallbackSample_${this.name}`,`fallbackPdf_${this.name}`,r),e.emitted.set(this.name,s),s}};var Gs=class extends C{outputType="vector3";scale=1;parse(e){return this.parseInputs(e),this.scale=this.literalFloat("scale")??1,this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=`nm_${this.name}`;return e.lines.push(`vec3 ${n} = normalize(${t} * 2.0 - 1.0) * ${this.scale.toFixed(4)};`),e.emitted.set(this.name,n),n}};var zs=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`sp_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e);return e.lines.push(`${n} ${t} = pow(max(${i}, ${n}(0.0)), ${s});`),e.emitted.set(this.name,t),t}};var tn=class extends C{outputType="multioutput";arity;constructor(e,t){super(e),this.arity=t}parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=this.arity===2?"vec2":this.arity===3?"vec3":"vec4",i=`sep_${this.name}`;e.lines.push(`${n} ${i}_in = ${t};`);let s=["x","y","z","w"];for(let l=0;l<this.arity;l++){let a=s[l],c=`${i}_out${a}`;e.lines.push(`float ${c} = ${i}_in.${a};`),e.emitted.set(`${this.name}:out${a}`,c),a==="x"&&e.emitted.set(`${this.name}:outr`,c),a==="y"&&e.emitted.set(`${this.name}:outg`,c),a==="z"&&e.emitted.set(`${this.name}:outb`,c),a==="w"&&e.emitted.set(`${this.name}:outa`,c)}let r=`${i}_outx`;return e.emitted.set(this.name,r),r}};var ks=class extends C{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=k(e,"color3"),this}emitGLSL(e){let t=`swz_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=(this.literalValue("channels")??"").trim(),r=qm(n),l=jm(s,r);return e.lines.push(`${n} ${t} = (${i}).${l};`),e.emitted.set(this.name,t),t}};function qm(o){return o==="vec2"?2:o==="vec3"?3:o==="vec4"?4:1}function jm(o,e){let t=o.toLowerCase().replace(/[^xyzwrgba]/g,"");return t.length>=e?t.slice(0,e).replace(/r/g,"x").replace(/g/g,"y").replace(/b/g,"z").replace(/a/g,"w"):["x","xy","xyz","xyzw"][Math.max(0,Math.min(3,e-1))]}var Vs=class extends C{outputType="vector2";index=0;parse(e){let t=e.getAttribute("index");return this.index=t!==null?parseInt(t,10):0,this}emitGLSL(e){let t=`tc_${this.name}`;return e.lines.push(`vec2 ${t} = ${e.texCoordExpr??"vTexCoords"};`),e.emitted.set(this.name,t),t}};var $i=class extends C{outputType="vector2";uvScale=[1,1];parse(e){this.parseInputs(e);let n=(this.literalValue("mat")??"").split(",").map(i=>parseFloat(i.trim()));return n.length>=5&&(this.uvScale=[isNaN(n[0])?1:n[0],isNaN(n[4])?1:n[4]]),this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=`tm_${this.name}`;return e.lines.push(`vec2 ${n} = vec2(${this.uvScale[0].toFixed(4)}, ${this.uvScale[1].toFixed(4)}) * ${t};`),e.emitted.set(this.name,n),n}};var Re=class extends C{outputType="float";fnName;constructor(e,t){super(e),this.fnName=t}parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`u_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e);return e.lines.push(`${n} ${t} = ${this.fnName}(${i});`),e.emitted.set(this.name,t),t}};var En=class extends C{outputType="EDF";parse(e){return this.parseInputs(e),this}resolveColor(e){let t=this.resolveRawValue("color",e);if(!t)return[1,1,1];let n=t.split(",").map(i=>parseFloat(i.trim()));return n.length<3||n.some(isNaN)?[1,1,1]:[n[0],n[1],n[2]]}emitGLSL(e){let t=this.inputs.get("color"),n;if(!t)n="vec3(1.0)";else if(t.kind==="connection")n=e.emitted.get(t.sourceName)??"vec3(1.0)";else{let s=t.kind==="literal"?t.value:e.ifaceValues?.get(t.interfaceName)??null;n=s?Km(s):"vec3(1.0)"}let i=`edf_${this.name}`;return e.lines.push(`vec3 ${i} = ${n};`),e.lines.push(`vec3 edfSample_${this.name} = normalize(max(${i}, vec3(1e-6)));`),e.lines.push(`float edfPdf_${this.name} = 1.0;`),e.emitted.set(this.name,i),e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"edf",evalExpr:i,sampleExpr:`edfSample_${this.name}`,pdfExpr:`edfPdf_${this.name}`,flagsExpr:"4"}),i}};function Km(o){let e=o.split(",").map(t=>t.trim());return e.length>=3?`vec3(${e.slice(0,3).join(", ")})`:`vec3(${o})`}var $s=class extends C{outputType="vector3";parse(e){return this}emitGLSL(e){let t=`vd_${this.name}`;return e.lines.push(`vec3 ${t} = r.direction;`),e.emitted.set(this.name,t),t}};var Hs=class extends C{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=k(e,"color3"),this}emitGLSL(e){let t=`hsv2rgb_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=`hsv_${this.name}`,r=`p_${this.name}`;return e.lines.push(`vec3 ${s} = (${i}).rgb;`),e.lines.push(`vec3 ${r} = abs(fract(${s}.xxx + vec3(0.0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0);`),e.lines.push(`vec3 ${t} = ${s}.z * mix(vec3(1.0), clamp(${r} - 1.0, 0.0, 1.0), ${s}.y);`),n!=="vec3"&&e.lines.push(`${n} ${t}_cast = ${n}(${t});`),e.emitted.set(this.name,n==="vec3"?t:`${t}_cast`),n==="vec3"?t:`${t}_cast`}};var Ws=class extends C{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=k(e,"color3"),this}emitGLSL(e){let t=`rgb2hsv_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=`rgb_${this.name}`,r=`k_${this.name}`,l=`p_${this.name}`,a=`q_${this.name}`,c=`d_${this.name}`,u=`e_${this.name}`;return e.lines.push(`vec3 ${s} = (${i}).rgb;`),e.lines.push(`vec4 ${r} = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);`),e.lines.push(`vec4 ${l} = mix(vec4(${s}.bg, ${r}.wz), vec4(${s}.gb, ${r}.xy), step(${s}.b, ${s}.g));`),e.lines.push(`vec4 ${a} = mix(vec4(${l}.xyw, ${s}.r), vec4(${s}.r, ${l}.yzx), step(${l}.x, ${s}.r));`),e.lines.push(`float ${c} = ${a}.x - min(${a}.w, ${a}.y);`),e.lines.push(`float ${u} = 1.0e-10;`),e.lines.push(`vec3 ${t} = vec3(abs(${a}.z + (${a}.w - ${a}.y) / (6.0 * ${c} + ${u})), ${c} / (${a}.x + ${u}), ${a}.x);`),n!=="vec3"&&e.lines.push(`${n} ${t}_cast = ${n}(${t});`),e.emitted.set(this.name,n==="vec3"?t:`${t}_cast`),n==="vec3"?t:`${t}_cast`}};var Xs=class extends C{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=k(e,"vector3"),this}emitGLSL(e){let t=`norm_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e);return e.lines.push(`${n} ${t} = normalize(${i});`),e.emitted.set(this.name,t),t}};var Ys=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`dotp_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`float ${t} = dot(${n}, ${i});`),e.emitted.set(this.name,t),t}};var qs=class extends C{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=k(e,"vector3"),this}emitGLSL(e){let t=`cross_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`vec3 ${t} = cross(${n}, ${i});`),e.emitted.set(this.name,t),t}};var js=class extends C{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=k(e,"vector3"),this}emitGLSL(e){let t=`refl_${this.name}`,n=this.resolveGLSL("in",e),i=this.resolveGLSL("normal",e),s=V(this.outputType);return e.lines.push(`${s} ${t} = reflect(${n}, ${i});`),e.emitted.set(this.name,t),t}};var Ks=class extends C{outputType="float";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`mag_${this.name}`,n=this.resolveGLSL("in",e);return e.lines.push(`float ${t} = length(${n});`),e.emitted.set(this.name,t),t}};var Zs=class extends C{outputType="float";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`facing_${this.name}`,n=this.inputs.has("normal")?this.resolveGLSL("normal",e):"vec3(0.0, 0.0, 1.0)",i=this.inputs.has("view_position")?this.resolveGLSL("view_position",e):"vec3(0.0, 0.0, 1.0)",s=this.inputs.has("invert")?this.resolveGLSL("invert",e):"false";return e.lines.push(`float ${t}_base = clamp(dot(normalize(${n}), normalize(${i})), 0.0, 1.0);`),e.lines.push(`float ${t} = bool(${s}) ? (1.0 - ${t}_base) : ${t}_base;`),e.emitted.set(this.name,t),t}};var Js=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`cmp_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("intest",e),s=this.inputs.has("cutoff")?this.resolveGLSL("cutoff",e):"0.0",r=this.inputs.has("in1")?this.resolveGLSL("in1",e):ge(this.outputType),l=this.inputs.has("in2")?this.resolveGLSL("in2",e):We(this.outputType);return e.lines.push(`${n} ${t} = ((${i}) > (${s})) ? ${r} : ${l};`),e.emitted.set(this.name,t),t}};var An=class extends C{outputType="float";op;constructor(e,t){super(e),this.op=t}parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`ifc_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("value1",e),s=this.resolveGLSL("value2",e),r=Th(this.op,i,s);if(this.outputType==="boolean"&&!this.inputs.has("in1")&&!this.inputs.has("in2"))return e.lines.push(`bool ${t} = ${r};`),e.emitted.set(this.name,t),t;let l=this.inputs.has("in1")?this.resolveGLSL("in1",e):ge(this.outputType),a=this.inputs.has("in2")?this.resolveGLSL("in2",e):We(this.outputType);return e.lines.push(`${n} ${t} = (${r}) ? ${l} : ${a};`),e.emitted.set(this.name,t),t}};var Qs=class extends An{constructor(e){super(e,"==")}};var er=class extends An{constructor(e){super(e,">")}};var tr=class extends An{constructor(e){super(e,">=")}};var nr=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`sw_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("which",e),s=this.inputs.has("in1")?this.resolveGLSL("in1",e):We(this.outputType);e.lines.push(`int ${t}_idx = clamp(int(floor(${i} + 0.5)), 1, 10);`),e.lines.push(`${n} ${t} = ${s};`);for(let r=2;r<=10;r++){if(!this.inputs.has(`in${r}`))continue;let l=this.resolveGLSL(`in${r}`,e);e.lines.push(`if (${t}_idx == ${r}) { ${t} = ${l}; }`)}return e.emitted.set(this.name,t),t}};var Rn=class extends C{outputType="boolean";op;constructor(e,t){super(e),this.op=t}parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`lgc_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`bool ${t} = bool(${n}) ${this.op} bool(${i});`),e.emitted.set(this.name,t),t}};var ir=class extends Rn{constructor(e){super(e,"&&")}};var sr=class extends Rn{constructor(e){super(e,"||")}};var rr=class extends Rn{constructor(e){super(e,"!=")}};var ar=class extends C{outputType="boolean";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`not_${this.name}`,n=this.resolveGLSL("in",e);return e.lines.push(`bool ${t} = !bool(${n});`),e.emitted.set(this.name,t),t}};var or=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`remap_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("inlow",e),r=this.resolveGLSL("inhigh",e),l=this.resolveGLSL("outlow",e),a=this.resolveGLSL("outhigh",e),c=xe(this.outputType,"1e-6"),u=`((${i}) - (${s})) / max((${r}) - (${s}), ${c})`,h=`(${l}) + (${a} - ${l}) * (${u})`;return e.lines.push(`${n} ${t} = ${h};`),e.emitted.set(this.name,t),t}};var lr=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`smooth_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("low",e),r=this.resolveGLSL("high",e);return e.lines.push(`${n} ${t} = smoothstep(${s}, ${r}, ${i});`),e.emitted.set(this.name,t),t}};var cr=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`contrast_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=this.inputs.has("amount")?this.resolveGLSL("amount",e):ge(this.outputType),r=this.inputs.has("pivot")?this.resolveGLSL("pivot",e):xe(this.outputType,"0.5");return e.lines.push(`${n} ${t} = ((${i}) - (${r})) * (${s}) + (${r});`),e.emitted.set(this.name,t),t}};var ur=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`inv_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=this.inputs.has("amount")?this.resolveGLSL("amount",e):ge(this.outputType);return e.lines.push(`${n} ${t} = (${s}) - (${i});`),e.emitted.set(this.name,t),t}};var hr=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`mix_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("fg",e),s=this.resolveGLSL("bg",e),r=this.resolveGLSL("mix",e);if(zi(this.outputType)){let l=vh(r);e.lines.push(`float mixW_${this.name} = ${l};`),e.lines.push(`${n} ${t} = (${s}) * (1.0 - mixW_${this.name}) + (${i}) * mixW_${this.name};`);let a=this.inputs.get("fg"),c=this.inputs.get("bg"),u=a?.kind==="connection"?a.sourceName:null,h=c?.kind==="connection"?c.sourceName:null,d=u?e.closureContracts?.get(u):void 0,f=h?e.closureContracts?.get(h):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:t,sampleExpr:t,pdfExpr:d&&f?`mix((${f.pdfExpr}), (${d.pdfExpr}), mixW_${this.name})`:d?.pdfExpr??f?.pdfExpr??"1.0",flagsExpr:d&&f?`(${d.flagsExpr} | ${f.flagsExpr})`:d?.flagsExpr??f?.flagsExpr??"0"})}else e.lines.push(`${n} ${t} = mix(${s}, ${i}, ${r});`);return e.emitted.set(this.name,t),t}};var dr=class extends C{outputType="color3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`bb_${this.name}`,i=`((${this.resolveGLSL("temperature",e)}) / 100.0)`,s=`clamp(${i} <= 66.0 ? 1.0 : (1.292936186062745 * pow(${i} - 60.0, -0.1332047592)), 0.0, 1.0)`,r=`clamp(${i} <= 66.0 ? (0.3900815787690196 * log(max(${i}, 1.0)) - 0.6318414437886275) : (1.129890860895294 * pow(${i} - 60.0, -0.0755148492)), 0.0, 1.0)`,l=`clamp(${i} >= 66.0 ? 1.0 : (${i} <= 19.0 ? 0.0 : (0.5432067891101961 * log(${i} - 10.0) - 1.19625408914)), 0.0, 1.0)`;return e.lines.push(`vec3 ${t} = vec3(${s}, ${r}, ${l});`),e.emitted.set(this.name,t),t}};var fr=class extends oe{emitGLSL(e){let t=this.color(e,"tint_R","vec3(1.0)"),n=this.color(e,"tint_TT","vec3(1.0)"),i=this.color(e,"tint_TRT","vec3(1.0)"),s=this.scalar(e,"ior","1.55"),r=this.scalar(e,"cuticle_angle","0.5"),l=this.color(e,"absorption_coefficient","vec3(0.3, 0.8, 1.5)"),a=this.inputs.has("roughness_R")?this.resolveGLSL("roughness_R",e):"vec2(0.1, 0.1)",c=this.inputs.has("roughness_TT")?this.resolveGLSL("roughness_TT",e):a,u=this.inputs.has("roughness_TRT")?this.resolveGLSL("roughness_TRT",e):a,h=`hair_${this.name}`;return e.lines.push(`vec2 hairRoughR_${this.name} = ${a};`),e.lines.push(`vec2 hairRoughTT_${this.name} = ${c};`),e.lines.push(`vec2 hairRoughTRT_${this.name} = ${u};`),e.lines.push(`float hairRoughAvg_${this.name} = clamp((hairRoughR_${this.name}.x + hairRoughTT_${this.name}.x + hairRoughTRT_${this.name}.x) / 3.0, 0.01, 1.0);`),e.lines.push(`float hairIor_${this.name} = max(${s}, 1.0);`),e.lines.push(`float hairCuticle_${this.name} = clamp(${r}, 0.0, 1.0);`),e.lines.push(`vec3 hairAbs_${this.name} = max(${l}, vec3(0.0));`),e.lines.push(`vec3 hairTintMix_${this.name} = (0.5 * ${t}) + (0.35 * ${n}) + (0.15 * ${i});`),e.lines.push(`vec3 ${h} = max(hairTintMix_${this.name}, vec3(0.0)) * (1.0 + 0.05 * (hairIor_${this.name} - 1.0)) * (1.0 + 0.1 * hairCuticle_${this.name}) * (1.0 - 0.3 * hairRoughAvg_${this.name}) * exp(-0.1 * hairAbs_${this.name});`),e.lines.push(`vec3 chiangHairSample_${this.name} = normalize(max(${h}, vec3(1e-6)));`),e.lines.push(`float chiangHairPdf_${this.name} = clamp(0.5 + 0.5 * (1.0 - hairRoughAvg_${this.name}), 1e-4, 1.0);`),e.emitted.set(this.name,h),this.registerClosureContract(e,"hair",h,`chiangHairSample_${this.name}`,`chiangHairPdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),h}};var pr=class extends C{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("color")?this.resolveGLSL("color",e):this.inputs.has("base_color")?this.resolveGLSL("base_color",e):"vec3(1.0)",n=this.inputs.has("azimuthal_roughness")?this.resolveGLSL("azimuthal_roughness",e):this.inputs.has("beta_m")?this.resolveGLSL("beta_m",e):"0.1",i=`hairSigmaA_${this.name}`,s=`hairBetaM_${this.name}`,r=`hairSigmaDenom_${this.name}`,l=`hairSafeColor_${this.name}`;return e.lines.push(`float ${s} = clamp(${n}, 0.0, 1.0);`),e.lines.push(`float ${r} = 5.969 - 0.215 * ${s} + 2.532 * ${s} * ${s} - 10.73 * ${s} * ${s} * ${s} + 5.574 * pow(${s}, 4.0) + 0.245 * pow(${s}, 5.0);`),e.lines.push(`vec3 ${l} = max(${t}, vec3(1e-5));`),e.lines.push(`vec3 ${i} = pow(log(${l}), vec3(2.0)) / max(${r} * ${r}, 1e-5);`),e.emitted.set(this.name,i),i}};var mr=class extends C{outputType="multioutput";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("longitudinal_roughness")?this.resolveGLSL("longitudinal_roughness",e):this.inputs.has("roughness")?this.resolveGLSL("roughness",e):"0.1",n=this.inputs.has("azimuthal_roughness")?this.resolveGLSL("azimuthal_roughness",e):this.inputs.has("roughness")?this.resolveGLSL("roughness",e):"0.1",i=`hairRough_${this.name}`,s=`${i}_outx`,r=`${i}_outy`;return e.lines.push(`float ${s} = clamp(${t}, 0.01, 1.0);`),e.lines.push(`float ${r} = clamp(${n}, 0.01, 1.0);`),e.lines.push(`vec2 ${i} = vec2(${s}, ${r});`),e.emitted.set(this.name,i),e.emitted.set(`${this.name}:outx`,s),e.emitted.set(`${this.name}:outy`,r),e.emitted.set(`${this.name}:outr`,s),e.emitted.set(`${this.name}:outg`,r),e.emitted.set(`${this.name}:longitudinal_roughness`,s),e.emitted.set(`${this.name}:azimuthal_roughness`,r),e.emitted.set(`${this.name}:betan`,s),e.emitted.set(`${this.name}:betam`,r),i}};var gr=class extends C{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rougha_${this.name}`,n=this.resolveGLSL("roughness",e),i=this.resolveGLSL("anisotropy",e);return e.lines.push(`float ${t}_r = max(${n}, 1e-4);`),e.lines.push(`float ${t}_a = clamp(${i}, -0.99, 0.99);`),e.lines.push(`vec2 ${t} = vec2(${t}_r / (1.0 + ${t}_a), ${t}_r * (1.0 + ${t}_a));`),e.emitted.set(this.name,t),t}};var xr=class extends C{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`roughd_${this.name}`,n=this.resolveGLSL("roughness",e);return e.lines.push(`vec2 ${t} = vec2(${n});`),e.emitted.set(this.name,t),t}};var _r=class extends C{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("melanin")?this.resolveGLSL("melanin",e):this.inputs.has("melanin_concentration")?this.resolveGLSL("melanin_concentration",e):"0.5",n=this.inputs.has("melanin_redness")?this.resolveGLSL("melanin_redness",e):this.inputs.has("melaninRedness")?this.resolveGLSL("melaninRedness",e):"0.5",i=`hairMelaninSigmaA_${this.name}`,s=`hairMelanin_${this.name}`,r=`hairRedness_${this.name}`;return e.lines.push(`float ${s} = max(${t}, 0.0);`),e.lines.push(`float ${r} = clamp(${n}, 0.0, 1.0);`),e.lines.push(`vec3 ${i} = ${s} * mix(vec3(0.506, 1.036, 1.923), vec3(0.343, 0.733, 1.924), ${r});`),e.emitted.set(this.name,i),i}};var yr=class extends C{outputType="multioutput";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`aior_${this.name}`,n=this.inputs.has("reflectivity")?this.resolveGLSL("reflectivity",e):"vec3(1.0)",i=this.inputs.has("edge_color")?this.resolveGLSL("edge_color",e):"vec3(1.0)",s=`${t}_ior`,r=`${t}_extinction`;return e.lines.push(`vec3 ${s} = max(vec3(1.0), vec3(1.0) + vec3(${n}) * 4.0);`),e.lines.push(`vec3 ${r} = max(vec3(0.0), (vec3(1.0) - vec3(${i})) * 3.0);`),e.emitted.set(`${this.name}:ior`,s),e.emitted.set(`${this.name}:extinction`,r),e.emitted.set(this.name,s),s}};var br=class extends C{outputType="surfaceshader";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("bsdf")?this.resolveGLSL("bsdf",e):"vec3(0.0)",n=this.inputs.has("vdf")?this.resolveGLSL("vdf",e):"vec3(0.0)",i=this.inputs.has("edf")?this.resolveGLSL("edf",e):"vec3(0.0)",s=this.inputs.has("opacity")?this.resolveGLSL("opacity",e):"1.0",r=`surface_${this.name}`;e.lines.push(`float surfaceOpacity_${this.name} = clamp(${s}, 0.0, 1.0);`),e.lines.push(`vec3 ${r} = ((${t}) + (${n})) * surfaceOpacity_${this.name} + (${i});`),e.emitted.set(this.name,r);let l=this.inputs.get("bsdf"),a=this.inputs.get("vdf"),c=this.inputs.get("edf"),u=l?.kind==="connection"?e.closureContracts?.get(l.sourceName):void 0,h=a?.kind==="connection"?e.closureContracts?.get(a.sourceName):void 0,d=c?.kind==="connection"?e.closureContracts?.get(c.sourceName):void 0;return e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:u?.kind??h?.kind??"generic",evalExpr:r,sampleExpr:u?.sampleExpr??h?.sampleExpr??r,pdfExpr:u?.pdfExpr??h?.pdfExpr??"1.0",flagsExpr:d?`((${u?.flagsExpr??"0"} | ${h?.flagsExpr??"0"}) | ${d.flagsExpr})`:`(${u?.flagsExpr??"0"} | ${h?.flagsExpr??"0"})`}),r}};var jn=class extends C{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`p2d_${this.name}`,n=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):this.inputs.has("in")?this.resolveGLSL("in",e):"vTexCoords",i=this.inputs.has("offset")?this.resolveGLSL("offset",e):"vec2(0.0)",s=this.inputs.has("scale")?this.resolveGLSL("scale",e):"vec2(1.0)",r=this.inputs.has("pivot")?this.resolveGLSL("pivot",e):"vec2(0.0)";return e.lines.push(`vec2 ${t} = ((${n}) - (${r})) * (${s}) + (${r}) + (${i});`),e.emitted.set(this.name,t),t}};var Kn=class extends C{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rot2_${this.name}`,n=this.resolveGLSL("in",e),i=this.inputs.has("amount")?this.resolveGLSL("amount",e):"0.0";return e.lines.push(`float ${t}_a = (abs(${i}) > 6.2831853) ? radians(${i}) : (${i});`),e.lines.push(`float ${t}_c = cos(${t}_a);`),e.lines.push(`float ${t}_s = sin(${t}_a);`),e.lines.push(`vec2 ${t} = vec2(${t}_c * (${n}).x - ${t}_s * (${n}).y, ${t}_s * (${n}).x + ${t}_c * (${n}).y);`),e.emitted.set(this.name,t),t}};var vr=class extends C{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rot3_${this.name}`,n=this.resolveGLSL("in",e),i=this.inputs.has("axis")?this.resolveGLSL("axis",e):"vec3(0.0, 0.0, 1.0)",s=this.inputs.has("amount")?this.resolveGLSL("amount",e):"0.0";return e.lines.push(`float ${t}_a = (abs(${s}) > 6.2831853) ? radians(${s}) : (${s});`),e.lines.push(`vec3 ${t}_ax = normalize(${i});`),e.lines.push(`float ${t}_c = cos(${t}_a);`),e.lines.push(`float ${t}_s = sin(${t}_a);`),e.lines.push(`vec3 ${t} = (${n}) * ${t}_c + cross(${t}_ax, (${n})) * ${t}_s + ${t}_ax * dot(${t}_ax, (${n})) * (1.0 - ${t}_c);`),e.emitted.set(this.name,t),t}};function Zm(o){if(!o)return null;let e=o.split(",").map(t=>Number.parseFloat(t.trim())).filter(t=>Number.isFinite(t));return e.length>=16?{expr:`mat4(${e.slice(0,16).map(n=>`${n}`).join(", ")})`,dim:4}:e.length>=9?{expr:`mat3(${e.slice(0,9).map(n=>`${n}`).join(", ")})`,dim:3}:null}var Cn=class extends C{outputType="vector3";mode;matExpr=null;matDim=3;constructor(e,t){super(e),this.mode=t}parse(e){this.parseInputs(e),this.outputType=k(e,"vector3");let t=this.literalValue("mat")??"",n=Zm(t);return n&&(this.matExpr=n.expr,this.matDim=n.dim),this}emitGLSL(e){let t=`tf_${this.name}`,n=this.resolveGLSL("in",e),i=V(this.outputType);return this.matExpr?(this.outputType==="vector2"?this.matDim===3?(e.lines.push(`vec3 ${t}_p = ${this.matExpr} * vec3((${n}).xy, ${this.mode==="point"?"1.0":"0.0"});`),e.lines.push(`vec2 ${t} = ${t}_p.xy;`)):(e.lines.push(`vec4 ${t}_p = ${this.matExpr} * vec4((${n}).xy, 0.0, ${this.mode==="point"?"1.0":"0.0"});`),e.lines.push(`vec2 ${t} = ${t}_p.xy;`)):this.outputType==="vector4"?e.lines.push(`vec4 ${t} = ${this.matDim===4?this.matExpr:`mat4(${this.matExpr})`} * vec4(${n});`):this.mode==="normal"?this.matDim===4?(e.lines.push(`mat3 ${t}_nmat = mat3(transpose(inverse(${this.matExpr})));`),e.lines.push(`vec3 ${t} = normalize(${t}_nmat * vec3(${n}));`)):e.lines.push(`vec3 ${t} = normalize(transpose(inverse(${this.matExpr})) * vec3(${n}));`):this.mode==="point"?this.matDim===4?(e.lines.push(`vec4 ${t}_p = ${this.matExpr} * vec4(vec3(${n}), 1.0);`),e.lines.push(`vec3 ${t} = ${t}_p.xyz;`)):e.lines.push(`vec3 ${t} = ${this.matExpr} * vec3(${n});`):this.matDim===4?(e.lines.push(`vec4 ${t}_v = ${this.matExpr} * vec4(vec3(${n}), 0.0);`),e.lines.push(`vec3 ${t} = ${t}_v.xyz;`)):e.lines.push(`vec3 ${t} = ${this.matExpr} * vec3(${n});`),e.emitted.set(this.name,t),t):(e.lines.push(`${i} ${t} = ${n};`),e.emitted.set(this.name,t),t)}};var Tr=class extends Cn{constructor(e){super(e,"point")}};var Mr=class extends Cn{constructor(e){super(e,"vector")}};var Sr=class extends Cn{constructor(e){super(e,"normal")}};function Sh(o,e){switch(o){case"float":return e;case"integer":return`int(${e})`;case"boolean":return`((${e}) > 0.5)`;case"vector2":case"color2":return`vec2(${e})`;case"vector3":case"color3":case"EDF":case"lightshader":case"surfaceshader":return`vec3(${e})`;case"vector4":case"color4":return`vec4(${e})`;default:return e}}var pe=class extends C{outputType="float";kind;constructor(e,t){super(e),this.kind=t}parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`d2_${this.name}`,n=V(this.outputType),i=this.inputs.has("in")?this.resolveGLSL("in",e):this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):this.inputs.has("position")?this.resolveGLSL("position",e):"vTexCoords",s=`vec2(${i})`,r=`vec3(${i}, 0.0)`,l=`fract(sin(dot(${r}, vec3(12.9898, 78.233, 37.719))) * 43758.5453)`,a=l;return this.kind==="checker"?a=`mod(floor(${s}.x) + floor(${s}.y), 2.0)`:this.kind==="grid"?a=`max(step(0.95, fract(${s}.x)), step(0.95, fract(${s}.y)))`:this.kind==="circle"?a=`1.0 - step(0.25, length(fract(${s}) - vec2(0.5)))`:this.kind==="line"?a=`1.0 - step(0.05, abs(fract(${s}.y) - 0.5))`:this.kind==="trianglewave"?a=`abs(fract(${s}.x) * 2.0 - 1.0)`:this.kind==="fractal2d"||this.kind==="fractal3d"?a=`(${l} + fract(sin(dot(${r} * 2.0, vec3(12.9898, 78.233, 37.719))) * 43758.5453) * 0.5)`:this.kind==="cellnoise2d"||this.kind==="cellnoise3d"?a=`fract(sin(dot(floor(${r}), vec3(127.1, 311.7, 74.7))) * 43758.5453)`:(this.kind==="worleynoise2d"||this.kind==="worleynoise3d")&&(a=`length(fract(${s}) - vec2(0.5))`,a=`1.0 - clamp(${a} * 2.0, 0.0, 1.0)`),this.kind==="heighttonormal"?(e.lines.push(`vec3 ${t}_n = normalize(vec3(0.0, 0.0, 1.0));`),e.lines.push(`${n} ${t} = ${Sh(this.outputType,`${t}_n.z`)};`)):e.lines.push(`${n} ${t} = ${Sh(this.outputType,a)};`),e.emitted.set(this.name,t),t}};var wr=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=`bsdf_${this.name}`;return e.lines.push(`vec3 ${i} = (${n}) * (${t}) * (1.0 / 3.14159265);`),e.emitted.set(this.name,i),this.registerClosureContract(e,"diffuse",i,i,"(1.0 / 3.14159265)",this.flagReflect()),i}};var Er=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=this.scalar(e,"roughness","0.0"),s=`bsdf_${this.name}`;return e.lines.push(`float rough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float oren_${this.name} = 1.0 - 0.5 * rough_${this.name};`),e.lines.push(`vec3 ${s} = (${n}) * (${t}) * oren_${this.name} * (1.0 / 3.14159265);`),e.emitted.set(this.name,s),this.registerClosureContract(e,"diffuse",s,s,`oren_${this.name} * (1.0 / 3.14159265)`,this.flagReflect()),s}};var Ar=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=this.scalar(e,"roughness","0.5"),s=`bsdf_${this.name}`;return e.lines.push(`float burleyRough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float burleyScale_${this.name} = mix(1.0, 0.8, burleyRough_${this.name});`),e.lines.push(`vec3 ${s} = (${n}) * (${t}) * burleyScale_${this.name} * (1.0 / 3.14159265);`),e.emitted.set(this.name,s),this.registerClosureContract(e,"diffuse",s,s,`burleyScale_${this.name} * (1.0 / 3.14159265)`,this.flagReflect()),s}};var Rr=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(0.8, 0.2, 0.2)"),i=this.color(e,"radius","vec3(1.0)"),s=this.scalar(e,"anisotropy","0.0"),r=`subsurface_${this.name}`;return e.lines.push(`float subsurfaceWeight_${this.name} = clamp(${t}, 0.0, 1.0);`),e.lines.push(`vec3 subsurfaceColor_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`vec3 subsurfaceRadius_${this.name} = max(${i}, vec3(0.001));`),e.lines.push(`float subsurfaceAniso_${this.name} = clamp(${s}, -0.95, 0.95);`),e.lines.push(`vec3 subsurfaceTransmission_${this.name} = exp(-1.0 / subsurfaceRadius_${this.name});`),e.lines.push(`float subsurfaceDirectional_${this.name} = mix(0.65, 1.35, 0.5 * (subsurfaceAniso_${this.name} + 1.0));`),e.lines.push(`vec3 ${r} = subsurfaceWeight_${this.name} * subsurfaceColor_${this.name} * subsurfaceTransmission_${this.name} * subsurfaceDirectional_${this.name};`),e.lines.push(`float subsurfacePdf_${this.name} = clamp(0.35 + 0.65 * subsurfaceWeight_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 subsurfaceSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"subsurface",r,`subsurfaceSample_${this.name}`,`subsurfacePdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),r}};var Cr=class extends oe{outputType="VDF";emitGLSL(e){let t=this.color(e,"absorption","vec3(0.1)"),n=this.color(e,"scattering","vec3(0.0)"),i=this.scalar(e,"anisotropy","0.0"),s=`vdf_${this.name}`;return e.lines.push(`vec3 vdfAbs_${this.name} = max(${t}, vec3(0.0));`),e.lines.push(`vec3 vdfSca_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`float vdfAniso_${this.name} = clamp(${i}, -0.95, 0.95);`),e.lines.push(`float vdfForward_${this.name} = mix(0.35, 1.65, 0.5 * (vdfAniso_${this.name} + 1.0));`),e.lines.push(`vec3 ${s} = (vdfSca_${this.name} + exp(-vdfAbs_${this.name})) * vdfForward_${this.name};`),e.lines.push(`float vdfPdf_${this.name} = clamp(0.2 + 0.8 * (1.0 - abs(vdfAniso_${this.name})), 1e-4, 1.0);`),e.lines.push(`vec3 vdfSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`),e.emitted.set(this.name,s),this.registerClosureContract(e,"volume",s,`vdfSample_${this.name}`,`vdfPdf_${this.name}`,this.flagTransmit()),s}};var Ir=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"reflectivity","vec3(1.0)"),i=this.color(e,"edge_color",n),s=this.scalar(e,"roughness","0.15"),r=`bsdf_${this.name}`;return e.lines.push(`vec3 condF0_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`vec3 condF90_${this.name} = max(${i}, vec3(0.0));`),e.lines.push(`vec3 ${r} = mix(condF0_${this.name}, condF90_${this.name}, 0.25) * (${t});`),e.lines.push(`float condAlpha_${this.name} = max((${s}) * (${s}), 0.001);`),e.lines.push(`float condPdf_${this.name} = 1.0 / (1.0 + 8.0 * condAlpha_${this.name});`),e.lines.push(`vec3 condSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"conductor",r,`condSample_${this.name}`,`condPdf_${this.name}`,this.flagReflect()),r}};var Lr=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"ior","vec3(1.5)"),i=this.color(e,"extinction","vec3(1.0)"),s=this.scalar(e,"roughness","0.35"),r=`bsdf_${this.name}`;return e.lines.push(`vec3 condEta_${this.name} = max(${n}, vec3(0.001));`),e.lines.push(`vec3 condK_${this.name} = max(${i}, vec3(0.0));`),e.lines.push(`vec3 condApprox_${this.name} = condK_${this.name} / (condEta_${this.name} + condK_${this.name} + vec3(1.0));`),e.lines.push(`vec3 ${r} = condApprox_${this.name} * (${t});`),e.lines.push(`float condAlpha_${this.name} = max((${s}) * (${s}), 0.001);`),e.lines.push(`float condPdf_${this.name} = 1.0 / (1.0 + 6.0 * condAlpha_${this.name});`),e.lines.push(`vec3 condSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"conductor",r,`condSample_${this.name}`,`condPdf_${this.name}`,this.flagReflect()),r}};var Pr=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=this.color(e,"base","vec3(0.0)"),r=`bsdf_${this.name}`;return e.lines.push(`float dielIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float dielF0_${this.name} = pow((dielIor_${this.name} - 1.0) / (dielIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 dielSpec_${this.name} = (${n}) * dielF0_${this.name};`),e.lines.push(`vec3 ${r} = mix(${s}, dielSpec_${this.name}, clamp(${t}, 0.0, 1.0));`),e.lines.push(`float dielPdf_${this.name} = clamp(dielF0_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 dielSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"dielectric",r,`dielSample_${this.name}`,`dielPdf_${this.name}`,this.flagReflect()),r}};var Nr=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=this.color(e,"base","vec3(0.0)"),r=`bsdf_${this.name}`;return e.lines.push(`float dielIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float dielF0_${this.name} = pow((dielIor_${this.name} - 1.0) / (dielIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 dielR_${this.name} = (${n}) * dielF0_${this.name};`),e.lines.push(`vec3 dielT_${this.name} = (${n}) * (1.0 - dielF0_${this.name});`),e.lines.push(`vec3 dielMix_${this.name} = dielR_${this.name} + 0.5 * dielT_${this.name};`),e.lines.push(`vec3 ${r} = mix(${s}, dielMix_${this.name}, clamp(${t}, 0.0, 1.0));`),e.lines.push(`float dielPdf_${this.name} = clamp(0.5 * (dielF0_${this.name} + (1.0 - dielF0_${this.name})), 1e-4, 1.0);`),e.lines.push(`vec3 dielSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"dielectric",r,`dielSample_${this.name}`,`dielPdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),r}};var Dr=class extends oe{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=`bsdf_${this.name}`;return e.lines.push(`float btdfIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float btdfF0_${this.name} = pow((btdfIor_${this.name} - 1.0) / (btdfIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 ${s} = (${n}) * (1.0 - btdfF0_${this.name}) * clamp(${t}, 0.0, 1.0);`),e.lines.push(`float btdfPdf_${this.name} = clamp(1.0 - btdfF0_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 btdfSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`),e.emitted.set(this.name,s),this.registerClosureContract(e,"transmission",s,`btdfSample_${this.name}`,`btdfPdf_${this.name}`,this.flagTransmit()),s}};var Fr=class extends C{outputType="EDF";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("color0")?this.resolveGLSL("color0",e):"vec3(1.0)",n=this.inputs.has("color90")?this.resolveGLSL("color90",e):"vec3(1.0)",i=this.inputs.has("exponent")?this.resolveGLSL("exponent",e):"5.0",s=this.inputs.has("base")?this.resolveGLSL("base",e):"vec3(0.0)",r=`edf_${this.name}`;return e.lines.push(`float schlickW_${this.name} = clamp(1.0 / (1.0 + max(${i}, 0.0)), 0.0, 1.0);`),e.lines.push(`vec3 schlickColor_${this.name} = mix(${t}, ${n}, schlickW_${this.name});`),e.lines.push(`vec3 ${r} = max(${s}, vec3(0.0)) * schlickColor_${this.name};`),e.lines.push(`vec3 schlickSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.lines.push(`float schlickPdf_${this.name} = clamp(0.5 + 0.5 * schlickW_${this.name}, 1e-4, 1.0);`),e.emitted.set(this.name,r),e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"edf",evalExpr:r,sampleExpr:`schlickSample_${this.name}`,pdfExpr:`schlickPdf_${this.name}`,flagsExpr:"4"}),r}};var Ur=class extends oe{emitGLSL(e){let t=this.color(e,"top","vec3(0.0)"),n=this.color(e,"base","vec3(0.0)"),i=`bsdf_${this.name}`;e.lines.push(`float topEnergy_${this.name} = clamp(max(max(${t}.r, ${t}.g), ${t}.b), 0.0, 1.0);`),e.lines.push(`vec3 ${i} = ${t} + (1.0 - topEnergy_${this.name}) * ${n};`),e.emitted.set(this.name,i);let s=this.inputs.get("top"),r=this.inputs.get("base"),l=s?.kind==="connection"?e.closureContracts?.get(s.sourceName):void 0,a=r?.kind==="connection"?e.closureContracts?.get(r.sourceName):void 0,c=l?.pdfExpr??"1.0",u=a?.pdfExpr??"1.0",h=l?.flagsExpr??this.flagReflect(),d=a?.flagsExpr??this.flagReflect();return this.registerClosureContract(e,"layered",i,i,`mix((${u}), (${c}), topEnergy_${this.name})`,`((${h}) | (${d}))`),i}};var Br=class extends oe{emitGLSL(e){let t=this.color(e,"top","vec3(0.0)"),n=this.color(e,"base","vec3(0.0)"),i=this.scalar(e,"scale_top","1.0"),s=this.scalar(e,"scale_base","1.0"),r=this.scalar(e,"scale_layer","1.0"),l=`bsdf_${this.name}`;e.lines.push(`vec3 topScaled_${this.name} = (${t}) * (${i});`),e.lines.push(`vec3 baseScaled_${this.name} = (${n}) * (${s});`),e.lines.push(`float topEnergy_${this.name} = clamp(max(max(topScaled_${this.name}.r, topScaled_${this.name}.g), topScaled_${this.name}.b), 0.0, 1.0);`),e.lines.push(`vec3 layerCombined_${this.name} = topScaled_${this.name} + (1.0 - topEnergy_${this.name}) * baseScaled_${this.name};`),e.lines.push(`vec3 ${l} = layerCombined_${this.name} * (${r});`),e.emitted.set(this.name,l);let a=this.inputs.get("top"),c=this.inputs.get("base"),u=a?.kind==="connection"?a.sourceName:null,h=c?.kind==="connection"?c.sourceName:null,d=u?e.closureContracts?.get(u):void 0,f=h?e.closureContracts?.get(h):void 0,p=d&&f?`(${d.flagsExpr} | ${f.flagsExpr})`:d?.flagsExpr??f?.flagsExpr??this.flagReflect(),g=d&&f?`mix((${f.pdfExpr}), (${d.pdfExpr}), topEnergy_${this.name})`:d?.pdfExpr??f?.pdfExpr??"1.0";return this.registerClosureContract(e,"layered",l,l,g,p),l}};function Jm(o,e,t,n){for(let i of t){let s=o.resolveGLSL(i,e);if(s!=="0.0")return s}return We(n)}var nn=class extends C{outputType="vector3";expr;constructor(e,t){super(e),this.expr=t}parse(e){return this.parseInputs(e),this.outputType=k(e,"vector3"),this}emitGLSL(e){let t=`geom_${this.name}`,n=V(this.outputType),i=xe(this.outputType,this.expr);return e.lines.push(`${n} ${t} = ${i};`),e.emitted.set(this.name,t),t}},Or=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`conv_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=xe(this.outputType,i);return e.lines.push(`${n} ${t} = ${s};`),e.emitted.set(this.name,t),t}},Gr=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`range_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e),s=this.inputs.has("inlow")?this.resolveGLSL("inlow",e):"0.0",r=this.inputs.has("inhigh")?this.resolveGLSL("inhigh",e):"1.0",l=this.inputs.has("outlow")?this.resolveGLSL("outlow",e):We(this.outputType),a=this.inputs.has("outhigh")?this.resolveGLSL("outhigh",e):ge(this.outputType),c=this.inputs.has("gamma")?this.resolveGLSL("gamma",e):"1.0";return e.lines.push(`float ${t}_t = ((${i}) - (${s})) / max((${r}) - (${s}), 1e-6);`),e.lines.push(`${t}_t = clamp(${t}_t, 0.0, 1.0);`),e.lines.push(`${t}_t = pow(max(${t}_t, 0.0), 1.0 / max(${c}, 1e-6));`),e.lines.push(`${n} ${t} = mix(${xe(this.outputType,l)}, ${xe(this.outputType,a)}, ${t}_t);`),e.emitted.set(this.name,t),t}},sn=class extends C{outputType="color3";axis;constructor(e,t){super(e),this.axis=t}parse(e){return this.parseInputs(e),this.outputType=k(e,"color3"),this}emitGLSL(e){let t=`ramp_${this.name}`,n=V(this.outputType),i=this.inputs.has("bg")?this.resolveGLSL("bg",e):We(this.outputType),s=this.inputs.has("fg")?this.resolveGLSL("fg",e):ge(this.outputType),r=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):"vec2(0.0)",l=this.axis==="x"?`${r}.x`:`${r}.y`;return e.lines.push(`${n} ${t} = mix(${xe(this.outputType,i)}, ${xe(this.outputType,s)}, clamp(${l}, 0.0, 1.0));`),e.emitted.set(this.name,t),t}},Hi=class extends C{outputType="color3";axis;constructor(e,t){super(e),this.axis=t}parse(e){return this.parseInputs(e),this.outputType=k(e,"color3"),this}emitGLSL(e){let t=`split_${this.name}`,n=V(this.outputType),i=this.inputs.has("bg")?this.resolveGLSL("bg",e):We(this.outputType),s=this.inputs.has("fg")?this.resolveGLSL("fg",e):ge(this.outputType),r=this.inputs.has("center")?this.resolveGLSL("center",e):"0.5",l=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):"vec2(0.0)",a=this.axis==="x"?`${l}.x`:`${l}.y`;return e.lines.push(`float ${t}_m = step(${r}, ${a});`),e.lines.push(`${n} ${t} = mix(${xe(this.outputType,i)}, ${xe(this.outputType,s)}, ${t}_m);`),e.emitted.set(this.name,t),t}},zr=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType="float",this}emitGLSL(e){let t=`dist_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`float ${t} = length((${n}) - (${i}));`),e.emitted.set(this.name,t),t}},In=class extends C{outputType="color3";mode;constructor(e,t){super(e),this.mode=t}parse(e){return this.parseInputs(e),this.outputType=k(e,"color3"),this}emitGLSL(e){let t=`blend_${this.name}`,n=V(this.outputType),i=xe(this.outputType,this.inputs.has("fg")?this.resolveGLSL("fg",e):ge(this.outputType)),s=xe(this.outputType,this.inputs.has("bg")?this.resolveGLSL("bg",e):We(this.outputType));return this.mode==="screen"?e.lines.push(`${n} ${t} = ${ge(this.outputType)} - (${ge(this.outputType)} - ${i}) * (${ge(this.outputType)} - ${s});`):this.mode==="overlay"?e.lines.push(`${n} ${t} = mix(2.0 * ${i} * ${s}, ${ge(this.outputType)} - 2.0 * (${ge(this.outputType)} - ${i}) * (${ge(this.outputType)} - ${s}), step(0.5, ${s}));`):this.mode==="dodge"?e.lines.push(`${n} ${t} = ${s} / max(${ge(this.outputType)} - ${i}, ${xe(this.outputType,"vec3(1e-6)")});`):e.lines.push(`${n} ${t} = ${ge(this.outputType)} - ((${ge(this.outputType)} - ${s}) / max(${i}, ${xe(this.outputType,"vec3(1e-6)")});`),e.emitted.set(this.name,t),t}},kr=class extends C{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=k(e,"vector3"),this}emitGLSL(e){let t=`refract_${this.name}`,n=this.inputs.has("in")?this.resolveGLSL("in",e):"vec3(0.0, 0.0, -1.0)",i=this.inputs.has("normal")?this.resolveGLSL("normal",e):"vec3(0.0, 0.0, 1.0)",s=this.inputs.has("ior")?this.resolveGLSL("ior",e):"1.5";return e.lines.push(`vec3 ${t} = refract(normalize(vec3(${n})), normalize(vec3(${i})), 1.0 / max(${s}, 1e-6));`),e.emitted.set(this.name,t),t}},Vr=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`sat_${this.name}`,n=V(this.outputType),i=this.resolveGLSL("in",e);return e.lines.push(`${n} ${t} = clamp(${xe(this.outputType,i)}, ${We(this.outputType)}, ${ge(this.outputType)});`),e.emitted.set(this.name,t),t}},$r=class extends C{outputType="float";parse(e){return this}emitGLSL(e){let t=`time_${this.name}`;return e.lines.push(`float ${t} = 0.0;`),e.emitted.set(this.name,t),t}},Hr=class extends C{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=k(e,"color3"),this}emitGLSL(e){let t=`unpremult_${this.name}`,n=V(this.outputType),i=this.inputs.has("in")?this.resolveGLSL("in",e):We(this.outputType),s=this.inputs.has("alpha")?this.resolveGLSL("alpha",e):"1.0";return e.lines.push(`${n} ${t} = ${xe(this.outputType,i)} / max(${xe(this.outputType,s)}, ${xe(this.outputType,"vec3(1e-6)")});`),e.emitted.set(this.name,t),t}},at=class extends C{outputType="float";parse(e){return this.parseInputs(e),this.outputType=k(e,"float"),this}emitGLSL(e){let t=`compat_${this.name}`,n=V(this.outputType),i=Jm(this,e,["in","value","fg","bg","normal","position"],this.outputType);return e.lines.push(`${n} ${t} = ${xe(this.outputType,i)};`),e.emitted.set(this.name,t),t}};function O(o){return(e,t)=>new o(e).parse(t)}function Wi(o=[]){return new Map([["constant",O(Fs)],["dot",O(Us)],["add",(e,t)=>new Je(e,"+").parse(t)],["subtract",(e,t)=>new Je(e,"-").parse(t)],["multiply",O(wn)],["divide",(e,t)=>new Je(e,"/").parse(t)],["min",(e,t)=>new Je(e,"min","function").parse(t)],["max",(e,t)=>new Je(e,"max","function").parse(t)],["modulo",(e,t)=>new Je(e,"mod","function").parse(t)],["power",(e,t)=>new Je(e,"pow","function").parse(t)],["safepower",O(zs)],["clamp",O(Ds)],["atan2",O(Ns)],["absval",(e,t)=>new Re(e,"abs").parse(t)],["sign",(e,t)=>new Re(e,"sign").parse(t)],["sin",(e,t)=>new Re(e,"sin").parse(t)],["cos",(e,t)=>new Re(e,"cos").parse(t)],["tan",(e,t)=>new Re(e,"tan").parse(t)],["asin",(e,t)=>new Re(e,"asin").parse(t)],["acos",(e,t)=>new Re(e,"acos").parse(t)],["sqrt",(e,t)=>new Re(e,"sqrt").parse(t)],["exp",(e,t)=>new Re(e,"exp").parse(t)],["ln",(e,t)=>new Re(e,"log").parse(t)],["floor",(e,t)=>new Re(e,"floor").parse(t)],["ceil",(e,t)=>new Re(e,"ceil").parse(t)],["round",(e,t)=>new Re(e,"round").parse(t)],["fract",(e,t)=>new Re(e,"fract").parse(t)],["combine",(e,t)=>new Sn(e,3).parse(t)],["combine2",(e,t)=>new Sn(e,2).parse(t)],["combine3",(e,t)=>new Sn(e,3).parse(t)],["combine4",(e,t)=>new Sn(e,4).parse(t)],["separate",(e,t)=>new tn(e,4).parse(t)],["separate2",(e,t)=>new tn(e,2).parse(t)],["separate3",(e,t)=>new tn(e,3).parse(t)],["separate4",(e,t)=>new tn(e,4).parse(t)],["extract",O(Bs)],["swizzle",O(ks)],["luminance",O(Os)],["rgbtohsv",O(Ws)],["hsvtorgb",O(Hs)],["normalize",O(Xs)],["dotproduct",O(Ys)],["crossproduct",O(qs)],["reflect",O(js)],["magnitude",O(Ks)],["facingratio",O(Zs)],["compare",O(Js)],["ifequal",O(Qs)],["ifgreater",O(er)],["ifgreatereq",O(tr)],["switch",O(nr)],["and",O(ir)],["or",O(sr)],["not",O(ar)],["xor",O(rr)],["remap",O(or)],["smoothstep",O(lr)],["contrast",O(cr)],["invert",O(ur)],["mix",O(hr)],["diffuse_brdf",O(wr)],["oren_nayar_diffuse_bsdf",O(Er)],["burley_diffuse_bsdf",O(Ar)],["subsurface_bsdf",O(Rr)],["conductor_brdf",O(Ir)],["conductor_bsdf",O(Lr)],["dielectric_brdf",O(Pr)],["dielectric_bsdf",O(Nr)],["dielectric_btdf",O(Dr)],["anisotropic_vdf",O(Cr)],["generalized_schlick_edf",O(Fr)],["uniform_edf",O(En)],["layer",O(Ur)],["scaled_layer",O(Br)],["blackbody",O(dr)],["chiang_hair_bsdf",O(fr)],["chiang_hair_absorption_from_color",O(pr)],["chiang_hair_roughness",O(mr)],["deon_hair_absorption_from_melanin",O(_r)],["surface",O(br)],["gltf_colorimage",(e,t)=>new Ge(e,"color4").parse(t)],["color4split",(e,t)=>new tn(e,4).parse(t)],["flake2d",(e,t)=>new pe(e,"noise2d").parse(t)],["flake3d",(e,t)=>new pe(e,"noise3d").parse(t)],["upstream_graph_def",(e,t)=>new pe(e,"noise2d").parse(t)],["customtype",(e,t)=>new pe(e,"noise2d").parse(t)],["triplanarprojection",(e,t)=>new Ge(e,"color3").parse(t)],["hextiledimage",(e,t)=>new Ge(e,"color3").parse(t)],["hextilednormalmap",(e,t)=>new Ge(e,"vector3").parse(t)],["generalized_schlick_brdf",(e,t)=>new Me(e,"generic","reflect").parse(t)],["generalized_schlick_bsdf",(e,t)=>new Me(e,"generic","both").parse(t)],["sheen_bsdf",(e,t)=>new Me(e,"generic","reflect").parse(t)],["translucent_bsdf",(e,t)=>new Me(e,"generic","both").parse(t)],["lamaconductor",(e,t)=>new Me(e,"conductor","reflect").parse(t)],["lamadielectric",(e,t)=>new Me(e,"dielectric","both").parse(t)],["lamadiffuse",(e,t)=>new Me(e,"diffuse","reflect").parse(t)],["lamageneralizedschlick",(e,t)=>new Me(e,"generic","reflect").parse(t)],["lamairidescence",(e,t)=>new Me(e,"generic","reflect").parse(t)],["lamalayer",(e,t)=>new Me(e,"composed","both").parse(t)],["lamamix",(e,t)=>new Me(e,"composed","both").parse(t)],["lamaadd",(e,t)=>new Me(e,"composed","both").parse(t)],["lamasss",(e,t)=>new Me(e,"subsurface","both").parse(t)],["lamasheen",(e,t)=>new Me(e,"generic","reflect").parse(t)],["lamatranslucent",(e,t)=>new Me(e,"generic","both").parse(t)],["lamaemission",(e,t)=>new Me(e,"edf","emissive").parse(t)],["roughness_anisotropy",O(gr)],["roughness_dual",O(xr)],["artistic_ior",O(yr)],["place2d",O(jn)],["rotate2d",O(Kn)],["rotate3d",O(vr)],["transformpoint",O(Tr)],["transformvector",O(Mr)],["transformnormal",O(Sr)],["heighttonormal",(e,t)=>new pe(e,"heighttonormal").parse(t)],["noise2d",(e,t)=>new pe(e,"noise2d").parse(t)],["noise3d",(e,t)=>new pe(e,"noise3d").parse(t)],["fractal2d",(e,t)=>new pe(e,"fractal2d").parse(t)],["fractal3d",(e,t)=>new pe(e,"fractal3d").parse(t)],["cellnoise2d",(e,t)=>new pe(e,"cellnoise2d").parse(t)],["cellnoise3d",(e,t)=>new pe(e,"cellnoise3d").parse(t)],["worleynoise2d",(e,t)=>new pe(e,"worleynoise2d").parse(t)],["worleynoise3d",(e,t)=>new pe(e,"worleynoise3d").parse(t)],["checker",(e,t)=>new pe(e,"checker").parse(t)],["checkerboard",(e,t)=>new pe(e,"checker").parse(t)],["grid",(e,t)=>new pe(e,"grid").parse(t)],["circle",(e,t)=>new pe(e,"circle").parse(t)],["line",(e,t)=>new pe(e,"line").parse(t)],["trianglewave",(e,t)=>new pe(e,"trianglewave").parse(t)],["position",(e,t)=>new nn(e,"vec3(uv, 0.0)").parse(t)],["normal",(e,t)=>new nn(e,"vec3(0.0, 0.0, 1.0)").parse(t)],["tangent",(e,t)=>new nn(e,"vec3(1.0, 0.0, 0.0)").parse(t)],["bitangent",(e,t)=>new nn(e,"vec3(0.0, 1.0, 0.0)").parse(t)],["frame",(e,t)=>new nn(e,"vec3(0.0, 0.0, 1.0)").parse(t)],["range",O(Gr)],["convert",O(Or)],["unifiednoise2d",(e,t)=>new pe(e,"noise2d").parse(t)],["unifiednoise3d",(e,t)=>new pe(e,"noise3d").parse(t)],["creatematrix",O(at)],["determinant",O(at)],["transpose",O(at)],["invertmatrix",O(at)],["difference",(e,t)=>new Je(e,"-").parse(t)],["minus",(e,t)=>new Je(e,"-").parse(t)],["distance",O(zr)],["dodge",(e,t)=>new In(e,"dodge").parse(t)],["burn",(e,t)=>new In(e,"burn").parse(t)],["overlay",(e,t)=>new In(e,"overlay").parse(t)],["screen",(e,t)=>new In(e,"screen").parse(t)],["refract",O(kr)],["saturate",O(Vr)],["time",O($r)],["unpremult",O(Hr)],["ramp",(e,t)=>new sn(e,"x").parse(t)],["ramp_gradient",(e,t)=>new sn(e,"x").parse(t)],["ramp4",(e,t)=>new sn(e,"x").parse(t)],["ramplr",(e,t)=>new sn(e,"x").parse(t)],["ramptb",(e,t)=>new sn(e,"y").parse(t)],["splitlr",(e,t)=>new Hi(e,"x").parse(t)],["splittb",(e,t)=>new Hi(e,"y").parse(t)],["gltf_normalmap",(e,t)=>new at(e).parse(t)],["bump",(e,t)=>new at(e).parse(t)],["colorcorrect",(e,t)=>new at(e).parse(t)],["texcoord",(e,t)=>new at(e).parse(t)],...o])}var Ln=class{graphName;nodes=new Map;constructor(e){this.graphName=e}getNode(e){return this.nodes.get(e)}allNodes(){return this.nodes}static _resolvePath(e,t){if(!t)return e;let n=(t+e).split("/"),i=[];for(let s of n)s===".."?i.pop():s!=="."&&i.push(s);return i.join("/")}_topoSort(e){let t=[],n=new Set,i=s=>{if(n.has(s))return;n.add(s);let r=this.nodes.get(s);if(r){for(let l of r.getDependencies())i(l);t.push(r)}};return i(e),t}_findNodeOfType(e,t){let n=this.nodes.get(e),i=new Set;for(;n;){if(n instanceof t)return n;if(i.has(n.name))break;i.add(n.name);let s=n.getDependencies();n=s.length>0?this.nodes.get(s[0]):void 0}return null}static _parseNodes(e,t,n,i={}){let s=i.strictUnknownTags===!0,r=i.unknownTags,l=i.contextLabel??e.getAttribute("name")??"nodegraph";for(let a of Array.from(e.children)){let c=a.tagName.toLowerCase();if(c==="output")continue;let u=t.get(c),h=a.getAttribute("name");if(!u){if(r?.add(c),s)throw new Error(`[MtlxNodeGraph] Unknown node tag "${c}" in ${l}`);continue}h&&n.set(h,u(h,a))}}static _readOutputMap(e){let t=new Map;for(let n of Array.from(e.children)){if(n.tagName.toLowerCase()!=="output")continue;let i=n.getAttribute("name")??"",s=n.getAttribute("nodename")??"",r=n.getAttribute("type")??"";i&&s&&t.set(i,{nodename:s,type:r})}return t}};var mo=class o extends Ln{outputNodeName="";static NODE_REGISTRY=Wi([["viewdirection",O($s)],["latlongimage",O(ki)],["multiply",O(wn)]]);constructor(e){super(e)}static parse(e,t={}){let n=e.getAttribute("name")??"envMap",i=new o(n);o._parseNodes(e,o.NODE_REGISTRY,i.nodes,t);let s=e.querySelector("output");return i.outputNodeName=s?.getAttribute("nodename")??"",i}extractConfig(e=""){let t="",n=0,i=1;for(let s of this.nodes.values())s instanceof ki?(t=o._resolvePath(s.hdrFile,e),n=s.rotation):s instanceof wn&&(i=s.in2Literal??1);return{hdrPath:t,rotation:n,intensity:i}}emitGLSL(e="envMapTex"){if(!this.outputNodeName)return"";let t=this._topoSort(this.outputNodeName),n={emitted:new Map,lines:[],envTexUniform:e,preferEnvMapIntensityLiterals:!0},i="";for(let l of t)i=l.emitGLSL(n);let s=`EvalEnvGraph_${this.graphName}`,r=n.lines.map(l=>`    ${l}`).join(`
`);return[`vec3 ${s}(Ray r, sampler2D ${e}) {`,r,`    return ${i};`,"}"].join(`
`)}};var go=class o extends Ln{outputNodeName="";static NODE_REGISTRY=Wi([["uniform_edf",O(En)],["light",O(Vi)]]);constructor(e){super(e)}static parse(e,t={}){let n=e.getAttribute("name")??"lightGraph",i=new o(n);o._parseNodes(e,o.NODE_REGISTRY,i.nodes,t);let s=e.querySelector("output");return i.outputNodeName=s?.getAttribute("nodename")??"",i}extractConfig(e=new Map){let t=[1,1,1],n=1;for(let i of this.nodes.values())i instanceof En?t=i.resolveColor(e):i instanceof Vi&&(n=i.resolveIntensity(e));return{color:t,intensity:n}}emitGLSL(e=new Map){if(!this.outputNodeName)return"";let t=this._topoSort(this.outputNodeName),n={emitted:new Map,lines:[],envTexUniform:"",ifaceValues:e},i="";for(let l of t)i=l.emitGLSL(n);let s=`EvalLightGraph_${this.graphName}`,r=n.lines.map(l=>`    ${l}`).join(`
`);return[`vec3 ${s}() {`,r,`    return ${i};`,"}"].join(`
`)}};var Zn=class o extends Ln{outputMap=new Map;static NODE_REGISTRY=Wi([["texcoord",O(Vs)],["transformmatrix",O($i)],["place2d",O(jn)],["rotate2d",O(Kn)],["normalmap",O(Gs)],["image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Ge(e,n).parse(t)}],["tiledimage",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Ge(e,n).parse(t)}],["gltf_image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Ge(e,n).parse(t)}],["token_image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Ge(e,n).parse(t)}],["usduvtexture",(e,t)=>{let n=(t.getAttribute("type")??"color3").toLowerCase()==="multioutput"?"color3":t.getAttribute("type")??"color3";return new Ge(e,n).parse(t)}]]);constructor(e){super(e)}static parse(e,t={}){let n=e.getAttribute("name")??"surfaceGraph",i=new o(n);o._parseNodes(e,o.NODE_REGISTRY,i.nodes,t);for(let[s,r]of o._readOutputMap(e))i.outputMap.set(s,r);return i}allOutputs(){return this.outputMap}extractConfig(e=""){let t=new Map;for(let[n,i]of this.outputMap){let s=this._findNodeOfType(i.nodename,Ge);s&&t.set(n,{filePath:o._resolvePath(s.filePath,e),colorspace:s.colorspace,uvScale:this._findUvScale(s)})}return{outputs:t}}emitPathtracerGLSL(e){let t=[];for(let[n,i]of this.outputMap){if(e&&!e.has(n))continue;let s=this._topoSort(i.nodename),r={emitted:new Map,lines:[],envTexUniform:"",texCoordExpr:"uv",textureArrayUniform:"textureMapsArrayTex",textureLayerExpr:"texLayer",warnings:[]},l="";for(let h of s)l=h.emitGLSL(r);let a=this._outputTypeToGlsl(i.type||this.getNode(i.nodename)?.outputType||"color3"),c=this.outputFunctionName(n),u=r.lines.map(h=>`    ${h}`).join(`
`);if(t.push({outputName:n,functionName:c,glslType:a,closureContract:r.closureContracts?.has(i.nodename)?{outputName:n,kind:r.closureContracts.get(i.nodename).kind,evalExpr:r.closureContracts.get(i.nodename).evalExpr,sampleExpr:r.closureContracts.get(i.nodename).sampleExpr,pdfExpr:r.closureContracts.get(i.nodename).pdfExpr,flagsExpr:r.closureContracts.get(i.nodename).flagsExpr}:void 0,code:[`${a} ${c}(vec2 uv, int texLayer) {`,u,`    return ${l};`,"}"].join(`
`)}),r.warnings&&r.warnings.length>0)for(let h of r.warnings)console.warn(`[MtlxSurfaceNodeGraph:${this.graphName}:${n}] ${h}`)}return t}outputFunctionName(e){let t=this.graphName.replace(/[^A-Za-z0-9_]/g,"_"),n=e.replace(/[^A-Za-z0-9_]/g,"_");return`EvalSurfaceGraph_${t}_${n}`}getOutputClosureContract(e){let t=e?this.outputMap.get(e):this.outputMap.values().next().value;if(!t)return null;let n=this._topoSort(t.nodename),i={emitted:new Map,lines:[],envTexUniform:"",texCoordExpr:"uv",textureArrayUniform:"textureMapsArrayTex",textureLayerExpr:"texLayer",warnings:[]};for(let r of n)r.emitGLSL(i);let s=i.closureContracts?.get(t.nodename);return s?{outputName:e??[...this.outputMap.keys()][0],kind:s.kind,evalExpr:s.evalExpr,sampleExpr:s.sampleExpr,pdfExpr:s.pdfExpr,flagsExpr:s.flagsExpr}:null}_findUvScale(e){for(let t of e.getDependencies()){let n=this.nodes.get(t);if(n instanceof $i)return n.uvScale}return[1,1]}_outputTypeToGlsl(e){switch((e||"").toLowerCase()){case"float":case"integer":case"boolean":return"float";case"vector2":case"color2":return"vec2";case"vector4":case"color4":return"vec4";case"matrix33":return"mat3";case"matrix44":return"mat4";default:return"vec3"}}};var wh={base_color:"baseColorTexID",baseColor:"baseColorTexID",coat_color:"baseColorTexID",specular_roughness:"metallicRoughnessTexID",roughness:"metallicRoughnessTexID",metalness:"metallicRoughnessTexID",metallic:"metallicRoughnessTexID",coat_roughness:"metallicRoughnessTexID",normal:"normalmapTexID",geometry_normal:"normalmapTexID",emission_color:"emissionmapTexID",emissive:"emissionmapTexID",emissiveColor:"emissionmapTexID",diffuseColor:"baseColorTexID"},eg=new Set(["image","tiledimage","hextiledimage","gltf_image","gltf_colorimage","gltf_normalmap","token_image","usduvtexture","hextilednormalmap","triplanarprojection"]);function tg(o){let e=o||"",t=0;return e.includes("1")&&(t|=1),e.includes("2")&&(t|=2),e.includes("4")&&(t|=4),t}function ng(o){switch(o){case"diffuse":return"diffuse";case"conductor":return"conductor";case"dielectric":case"transmission":return"dielectric";case"subsurface":return"subsurface";case"volume":return"volume";case"hair":return"hair";default:return"generic"}}var Ne=class o{static REGISTRY=[{tag:"simple_hair",parse:e=>Ps.parse(e)},{tag:"standard_surface",parse:e=>Gi.parse(e)},{tag:"open_pbr_surface",parse:e=>en.parse(e)},{tag:"disney_principled",parse:e=>ho.parse(e)},{tag:"gltf_pbr",parse:e=>fo.parse(e)},{tag:"UsdPreviewSurface",parse:e=>po.parse(e)}];static _dirOf(e){return e.substring(0,e.lastIndexOf("/")+1)}static async _fetchText(e){let t=await he(e);if(!t.ok)throw new Error(`[MtlxLoader] ${t.statusText??"Read error"} fetching ${e}`);return t.text()}static _resolvePrefix(e,t){let n=o.normalizePath(e+t);return n.endsWith("/")?n:n+"/"}static _findSurfaceEl(e,t){let n=t?`[name="${t}"]`:"";for(let i of o.REGISTRY){let s=e.querySelector(i.tag+n);if(s)return s}return null}static _selectSurfaceMaterialEl(e,t){return t?e.querySelector(`surfacematerial[name="${t}"]`)??e.querySelector("surfacematerial"):e.querySelector("surfacematerial")}static _selectVolumeMaterialEl(e,t){return t?e.querySelector(`volumematerial[name="${t}"]`)??e.querySelector("volumematerial"):e.querySelector("volumematerial")}static _readMaterialInputBinding(e,t){let n=e?.querySelector(`input[name="${t}"]`)??null;return{nodename:n?.getAttribute("nodename")??null,nodegraph:n?.getAttribute("nodegraph")??null,output:n?.getAttribute("output")??null,value:n?.getAttribute("value")??null}}static _resolveSurfaceElFromBinding(e,t){if(t.nodename)return o._findSurfaceEl(e,t.nodename);if(t.nodegraph){let n=e.querySelector(`nodegraph[name="${t.nodegraph}"]`);if(!n)return null;let s=(o._findDirectOutput(n,t.output)??o._findDirectOutput(n))?.getAttribute("nodename")??null;return s?o._findSurfaceEl(n,s):null}return null}static _resolveSurfaceNodeNameFromBinding(e,t){if(t.nodename)return t.nodename;if(!t.nodegraph)return null;let n=e.querySelector(`nodegraph[name="${t.nodegraph}"]`);return n?(o._findDirectOutput(n,t.output)??o._findDirectOutput(n))?.getAttribute("nodename")??null:null}static resolveSurfaceMaterialBindings(e,t){let n=o._selectSurfaceMaterialEl(e,t),i=o._readMaterialInputBinding(n,"surfaceshader"),s=o._readMaterialInputBinding(n,"volumeshader"),r=o._readMaterialInputBinding(n,"displacementshader");return{surfaceMaterialName:n?.getAttribute("name")??null,surfaceShader:i,volumeShader:s,displacementShader:r,surfaceShaderNodeName:i.nodename,volumeShaderNodeName:s.nodename,displacementShaderNodeName:r.nodename}}static resolveVolumeMaterialBindings(e,t){let n=o._selectVolumeMaterialEl(e,t),i=o._readMaterialInputBinding(n,"volumeshader");return{volumeMaterialName:n?.getAttribute("name")??null,volumeShader:i,volumeShaderNodeName:i.nodename}}static _parseSurface(e,t){let n=t?`[name="${t}"]`:"";for(let i of o.REGISTRY){let s=e.querySelector(i.tag+n);if(s)return i.parse(s)}return null}static _parseSurfaceEl(e){if(!e)return null;let t=e.tagName.toLowerCase();for(let n of o.REGISTRY)if(n.tag.toLowerCase()===t)return n.parse(e);return null}static _parseVec3(e){if(!e)return null;let t=e.split(",").map(n=>parseFloat(n.trim()));return t.length<3||t.some(isNaN)?null:new _(t[0],t[1],t[2])}static parse(e){let t=new DOMParser().parseFromString(e,"text/xml");return o.parseFromDoc(t)}static parseFromDoc(e,t){let n=o.resolveSurfaceMaterialBindings(e,t),i=n.surfaceMaterialName??"Unknown",s=o._resolveSurfaceElFromBinding(e,n.surfaceShader);if(s){let c=o._parseSurfaceEl(s);if(c)return c}let r=o._parseSurface(e);if(r)return r;let l=o.parseNodeDefs(e);if(l.byNodeName.size>0&&l.implByDefName.size>0){let c=o._resolveSurfaceNodeNameFromBinding(e,n.surfaceShader);if(c)for(let[u,h]of l.byNodeName){let d=e.querySelector(`${u}[name="${c}"]`);if(!d)continue;let f=l.implByDefName.get(h.defName);if(!f)continue;let p=o._buildIfaceValues(d,h),g=o._resolveNodeDefImpl(f,p,i);if(g)return g}for(let[u,h]of l.byNodeName){let d=e.querySelector(u);if(!d)continue;let f=l.implByDefName.get(h.defName);if(!f)continue;let p=o._buildIfaceValues(d,h),g=o._resolveNodeDefImpl(f,p,i);if(g)return g}for(let[u,h]of l.implByDefName){let d=l.byDefName.get(u);if(!d)continue;let f=o._buildIfaceValues(null,d),p=o._resolveNodeDefImpl(h,f,i);if(p)return p}}let a=o._parseChiangHairSurfaceGraph(e,t);if(a)return a;throw new Error("No supported surface shader found in document.")}static normalizePath(e){let t=e.split("/"),n=[];for(let i of t)i===".."?n.pop():i!=="."&&n.push(i);return n.join("/")}static _directInputs(e){return Array.from(e.children).filter(t=>t.tagName.toLowerCase()==="input")}static _directOutputs(e){return Array.from(e.children).filter(t=>t.tagName.toLowerCase()==="output")}static _findDirectInput(e,t){return o._directInputs(e).find(n=>n.getAttribute("name")===t)??null}static _findDirectOutput(e,t){let n=o._directOutputs(e);return n.length===0?null:t?n.find(i=>i.getAttribute("name")===t)??n[0]:n[0]}static _findNamedChild(e,t){if(!t)return null;for(let n of Array.from(e.children))if(n.getAttribute("name")===t)return n;return null}static _parseVec3LooseValue(e){if(!e)return null;let t=e.replace(/\s+/g,",").replace(/,+/g,",").split(",").map(n=>Number.parseFloat(n.trim()));return t.length<3||t.some(n=>!Number.isFinite(n))?null:new _(t[0],t[1],t[2])}static _parseVec2LooseValue(e){if(!e)return null;let t=e.replace(/\s+/g,",").replace(/,+/g,",").split(",").map(n=>Number.parseFloat(n.trim()));return t.length<2||t.some(n=>!Number.isFinite(n))?null:[t[0],t[1]]}static _literalFloatInput(e,t){let n=o._findDirectInput(e,t);if(!n)return null;let i=Number.parseFloat(n.getAttribute("value")??"");return Number.isFinite(i)?i:null}static _literalVec3Input(e,t){return o._parseVec3LooseValue(o._findDirectInput(e,t)?.getAttribute("value"))}static _literalVec2Input(e,t){return o._parseVec2LooseValue(o._findDirectInput(e,t)?.getAttribute("value"))}static _populateSimpleHairAbsorption(e,t,n){let i=o._findDirectInput(n,"absorption_coefficient");if(!i)return;let s=o._parseVec3LooseValue(i.getAttribute("value"));if(s){e.explicitAbsorptionCoefficient=s;return}let r=o._findNamedChild(t,i.getAttribute("nodename"));if(!r)return;let l=r.tagName.toLowerCase();if(l==="mix"){let a=o._literalFloatInput(r,"mix");a!==null&&(e.melaninMix=Math.min(Math.max(a,0),1));let c=o._findNamedChild(t,o._findDirectInput(r,"fg")?.getAttribute("nodename"));if(c?.tagName.toLowerCase()==="deon_hair_absorption_from_melanin"){let h=o._literalFloatInput(c,"melanin_concentration"),d=o._literalFloatInput(c,"melanin_redness");h!==null&&(e.melaninConcentration=h),d!==null&&(e.melaninRedness=d)}let u=o._findNamedChild(t,o._findDirectInput(r,"bg")?.getAttribute("nodename"));if(u?.tagName.toLowerCase()==="chiang_hair_absorption_from_color"){let h=o._literalVec3Input(u,"color")??o._literalVec3Input(u,"base_color");h&&(e.baseColor=h)}return}if(l==="deon_hair_absorption_from_melanin"){let a=o._literalFloatInput(r,"melanin_concentration"),c=o._literalFloatInput(r,"melanin_redness");e.melaninMix=1,a!==null&&(e.melaninConcentration=a),c!==null&&(e.melaninRedness=c);return}if(l==="chiang_hair_absorption_from_color"){let a=o._literalVec3Input(r,"color")??o._literalVec3Input(r,"base_color");e.melaninMix=0,a&&(e.baseColor=a)}}static _parseChiangHairBsdfNode(e,t,n){if(t.tagName.toLowerCase()!=="chiang_hair_bsdf")return null;let i=new Ps(n||(t.getAttribute("name")??"chiang_hair")),s=o._literalVec3Input(t,"tint_R"),r=o._literalVec3Input(t,"tint_TT"),l=o._literalVec3Input(t,"tint_TRT"),a=o._literalFloatInput(t,"ior"),c=o._literalFloatInput(t,"cuticle_angle"),u=o._literalVec2Input(t,"roughness_R");s&&(i.tint_R=s),r&&(i.tint_TT=r),l&&(i.tint_TRT=l),a!==null&&(i.ior=a),c!==null&&(i.cuticleAngle=c),u&&(i.longitudinalRoughness=u[0],i.azimuthalRoughness=u[1]);let h=o._findDirectInput(t,"roughness_R"),d=o._findNamedChild(e,h?.getAttribute("nodename"));if(d?.tagName.toLowerCase()==="chiang_hair_roughness"){let f=o._literalFloatInput(d,"longitudinal")??o._literalFloatInput(d,"longitudinal_roughness"),p=o._literalFloatInput(d,"azimuthal")??o._literalFloatInput(d,"azimuthal_roughness");f!==null&&(i.longitudinalRoughness=f),p!==null&&(i.azimuthalRoughness=p)}return o._populateSimpleHairAbsorption(i,e,t),i}static _parseChiangHairSurfaceGraph(e,t){let n=o._resolveSurfaceNodeNameFromBinding(e,o.resolveSurfaceMaterialBindings(e,t).surfaceShader);for(let i of Array.from(e.querySelectorAll("nodegraph"))){let s=o._findDirectOutput(i,"out")??o._findDirectOutput(i);if(!s)continue;let r=(s.getAttribute("type")??"").toLowerCase();if(r&&r!=="surfaceshader")continue;let l=s.getAttribute("nodename");if(n&&l!==n)continue;let a=o._findNamedChild(i,l);if(!a||a.tagName.toLowerCase()!=="surface")continue;let c=o._findDirectInput(a,"bsdf"),u=o._findNamedChild(i,c?.getAttribute("nodename"));if(!u)continue;let h=o._parseChiangHairBsdfNode(i,u,t??l??i.getAttribute("name")??"chiang_hair");if(h)return h}return null}static _parseVec2Value(e,t=[1,1]){if(!e)return t;let n=e.split(",").map(i=>Number.parseFloat(i.trim()));return n.length>=2&&Number.isFinite(n[0])&&Number.isFinite(n[1])?[n[0],n[1]]:n.length>=1&&Number.isFinite(n[0])?[n[0],n[0]]:t}static _mulVec2(e,t){return[e[0]*t[0],e[1]*t[1]]}static _selectPrimaryConnectionInput(e){let t=["in","texcoord","fg","bg","in1","in2"],n=o._directInputs(e);for(let i of t){let s=n.find(r=>r.getAttribute("name")===i);if(s&&(s.getAttribute("nodename")||s.getAttribute("nodegraph")))return s}return n.find(i=>i.getAttribute("nodename")||i.getAttribute("nodegraph"))??null}static _buildGraphContexts(e,t){let n=new Map,i=e.documentElement.getAttribute("fileprefix")??"";for(let s of Array.from(e.querySelectorAll("nodegraph"))){let r=s.getAttribute("name");if(!r)continue;let l=s.getAttribute("fileprefix")??i,a=o._resolvePrefix(t,l),c=new Map;for(let u of Array.from(s.children)){let h=u.tagName.toLowerCase();if(h==="output"||h==="input")continue;let d=u.getAttribute("name");d&&c.set(d,u)}n.set(r,{name:r,prefix:a,nodeMap:c,outputs:o._directOutputs(s)})}return n}static _resolveUvScaleFromInput(e,t,n,i){if(!e)return[1,1];let s=e.getAttribute("nodegraph");if(s)return o._resolveUvScaleFromGraph(s,e.getAttribute("output"),n,i);let r=e.getAttribute("nodename");return r?o._resolveUvScaleFromNode(t,r,n,i):[1,1]}static _resolveUvScaleFromGraph(e,t,n,i){let s=`uv-graph:${e}:${t??""}`;if(i.has(s))return[1,1];i.add(s);let r=n.get(e);if(!r)return[1,1];let l=r.outputs.find(u=>t?u.getAttribute("name")===t:!0)??r.outputs[0]??null;if(!l)return[1,1];let a=l.getAttribute("nodegraph");if(a)return o._resolveUvScaleFromGraph(a,l.getAttribute("output"),n,i);let c=l.getAttribute("nodename");return c?o._resolveUvScaleFromNode(r,c,n,i):[1,1]}static _resolveUvScaleFromNode(e,t,n,i){let s=`uv-node:${e.name}:${t}`;if(i.has(s))return[1,1];i.add(s);let r=e.nodeMap.get(t);if(!r)return[1,1];let l=r.tagName.toLowerCase();if(l==="transformmatrix"){let c=(o._findDirectInput(r,"mat")?.getAttribute("value")??"").split(",").map(d=>Number.parseFloat(d.trim())),u=[Number.isFinite(c[0])?c[0]:1,Number.isFinite(c[4])?c[4]:1],h=o._resolveUvScaleFromInput(o._findDirectInput(r,"in"),e,n,i);return o._mulVec2(h,u)}if(l==="place2d"){let a=o._parseVec2Value(o._findDirectInput(r,"scale")?.getAttribute("value")),c=o._resolveUvScaleFromInput(o._findDirectInput(r,"texcoord")??o._findDirectInput(r,"in"),e,n,i);return o._mulVec2(c,a)}return l==="rotate2d"||l==="rotate3d"||l==="texcoord"?o._resolveUvScaleFromInput(o._findDirectInput(r,"texcoord")??o._findDirectInput(r,"in"),e,n,i):o._resolveUvScaleFromInput(o._selectPrimaryConnectionInput(r),e,n,i)}static _resolvedTextureFromImage(e,t,n){let i=o._findDirectInput(e,"file")??o._findDirectInput(e,"filex")??o._findDirectInput(e,"filey")??o._findDirectInput(e,"filez"),s=i?.getAttribute("value")??"";if(!s)return null;let r=i?.getAttribute("colorspace")??e.getAttribute("colorspace")??"",l=o._findDirectInput(e,"uvtiling"),a=l?.getAttribute("value")?o._parseVec2Value(l.getAttribute("value")):o._resolveUvScaleFromInput(o._findDirectInput(e,"texcoord"),t,n,new Set);return{filename:t.prefix+s,colorspace:r,uvtiling:a}}static _resolveTextureFromGraph(e,t,n,i){let s=`graph:${e}:${t??""}`;if(i.has(s))return null;i.add(s);let r=n.get(e);if(!r)return null;let l=r.outputs.find(u=>t?u.getAttribute("name")===t:!0)??r.outputs[0]??null;if(!l)return null;let a=l.getAttribute("nodegraph");if(a)return o._resolveTextureFromGraph(a,l.getAttribute("output"),n,i);let c=l.getAttribute("nodename");return c?o._resolveTextureFromNode(r,c,n,i):null}static _resolveTextureFromNode(e,t,n,i){let s=`node:${e.name}:${t}`;if(i.has(s))return null;i.add(s);let r=e.nodeMap.get(t);if(!r)return null;if(eg.has(r.tagName.toLowerCase()))return o._resolvedTextureFromImage(r,e,n);let l=o._selectPrimaryConnectionInput(r);if(!l)return null;let a=l.getAttribute("nodegraph");if(a)return o._resolveTextureFromGraph(a,l.getAttribute("output"),n,i);let c=l.getAttribute("nodename");return c?o._resolveTextureFromNode(e,c,n,i):null}static resolveNodeGraphs(e,t){let n=new Map,i=o._buildGraphContexts(e,t);for(let[s,r]of i){let l=new Map;for(let a of r.outputs){let c=a.getAttribute("name");if(!c)continue;let u=o._resolveTextureFromGraph(s,c,i,new Set);u&&l.set(c,u)}n.set(s,l)}return n}static resolveInput(e,t){let n=e.getAttribute("nodegraph"),i=e.getAttribute("output");if(!n)return null;let s=t.get(n);return s?i?s.get(i)??null:s.values().next().value??null:null}static parseNodeDefs(e){let t=new Map,n=new Map,i=new Map;for(let s of Array.from(e.querySelectorAll("nodedef"))){let r=s.getAttribute("name"),l=s.getAttribute("node");if(!r||!l)continue;let a=s.getAttribute("nodegroup")??"",c=new Map,u=new Map;for(let d of Array.from(s.children)){let f=d.tagName.toLowerCase(),p=d.getAttribute("name"),g=d.getAttribute("type")??"";p&&(f==="input"?c.set(p,{name:p,type:g,defaultValue:d.getAttribute("value")??null}):f==="output"&&u.set(p,{name:p,type:g}))}let h={defName:r,nodeName:l,nodeGroup:a,inputs:c,outputs:u};t.set(r,h),n.set(l,h)}for(let s of Array.from(e.querySelectorAll("nodegraph"))){let r=s.getAttribute("nodedef"),l=s.getAttribute("name");!r||!l||i.set(r,{graphName:l,defName:r,element:s})}return{byDefName:t,byNodeName:n,implByDefName:i}}static resolveSurfaceTextures(e,t,n){let i=new Map,s=o.resolveNodeGraphs(e,t),r=null,l=o.resolveSurfaceMaterialBindings(e,n);if(r=o._resolveSurfaceElFromBinding(e,l.surfaceShader),r||(r=o._findSurfaceEl(e)),!r)return i;let a=e.documentElement.getAttribute("fileprefix")??"",c=o._resolvePrefix(t,a),u=new Map;for(let d of Array.from(e.documentElement.children)){let f=d.getAttribute("name");f&&u.set(f,d)}let h=Array.from(r.querySelectorAll("input"));for(let d of h){let f=d.getAttribute("name")??"",p=wh[f];if(!p||i.has(p))continue;let g=o.resolveInput(d,s);if(!g){let x=d.getAttribute("nodename");if(x&&!d.getAttribute("nodegraph")){let m={name:"__document__",prefix:c,nodeMap:u,outputs:[]};g=o._resolveTextureFromNode(m,x,new Map,new Set)}}g&&i.set(p,g)}return i}static collectSurfaceGraphBindings(e,t){let n=[],i=null,s=o.resolveSurfaceMaterialBindings(e,t);if(i=o._resolveSurfaceElFromBinding(e,s.surfaceShader),i||(i=o._findSurfaceEl(e)),!i)return n;let r=new Map,l=new Set,a=(c,u)=>{let h=u.replace(/[^A-Za-z0-9_]/g,"_"),d=c.replace(/[^A-Za-z0-9_]/g,"_"),f=`EvalSurfaceDirect_${h}_${d}`;return c==="roughness"||c==="specular_roughness"||c==="coat_roughness"||c==="metalness"||c==="metallic"?{functionName:f,functionCode:[`float ${f}(vec2 uv, int texLayer) {`,"    return texture(textureMapsArrayTex, vec3(uv, float(texLayer))).r;","}"].join(`
`)}:c==="normal"||c==="geometry_normal"?{functionName:f,functionCode:[`vec3 ${f}(vec2 uv, int texLayer) {`,"    return normalize(texture(textureMapsArrayTex, vec3(uv, float(texLayer))).rgb * 2.0 - 1.0);","}"].join(`
`)}:{functionName:f,functionCode:[`vec3 ${f}(vec2 uv, int texLayer) {`,"    return texture(textureMapsArrayTex, vec3(uv, float(texLayer))).rgb;","}"].join(`
`)}};for(let c of Array.from(i.querySelectorAll("input"))){let u=c.getAttribute("name")??"",h=wh[u],d=c.getAttribute("nodegraph");if(!h)continue;if(d){let p=r.get(d);if(!p){let b=e.querySelector(`nodegraph[name="${d}"]`);if(!b)continue;p=Zn.parse(b),r.set(d,p)}let g=c.getAttribute("output")??p.allOutputs().keys().next().value??"";if(!g||!p.allOutputs().has(g))continue;let x=p.outputFunctionName(g),m=p.emitPathtracerGLSL(new Set([g])),y=m.find(b=>b.functionName===x)?.code??"";if(!y)continue;l.has(x)||l.add(x),n.push({inputName:u,field:h,source:"nodegraph",graphName:d,outputName:g,graph:p,functionName:x,functionCode:y,glslType:m.find(b=>b.functionName===x)?.glslType??"vec3"});continue}let f=c.getAttribute("nodename");if(f){let p=a(u,f);l.has(p.functionName)||l.add(p.functionName),n.push({inputName:u,field:h,source:"nodename",functionName:p.functionName,functionCode:p.functionCode,glslType:u==="roughness"||u==="specular_roughness"||u==="coat_roughness"||u==="metalness"||u==="metallic"?"float":"vec3"})}}return n}static collectSurfaceGraphClosureBinding(e,t){let n=o._resolveSurfaceNodeNameFromBinding(e,o.resolveSurfaceMaterialBindings(e,t).surfaceShader);for(let i of Array.from(e.querySelectorAll("nodegraph"))){let s=Zn.parse(i);for(let[r,l]of s.allOutputs()){let a=(l.type??"").toLowerCase();if(a&&a!=="surfaceshader"||n&&l.nodename!==n)continue;let c=s.getOutputClosureContract(r);if(!c)continue;let u=ng(c.kind),h=tg(c.flagsExpr);return u==="generic"&&(h&1)!==0&&(h&2)!==0&&(u="hair"),{kind:u,flags:h}}}return null}static _createSyntheticNodeGraphFromContainer(e,t,n,i,s,r){if(!t)return null;let l=e.createElement("nodegraph");l.setAttribute("name",n);let a=t.tagName.toLowerCase()==="nodegraph"?Array.from(t.children):Array.from(e.documentElement.children);for(let u of a)l.appendChild(u.cloneNode(!0));let c=e.createElement("output");return c.setAttribute("name",i),c.setAttribute("type",s||"float"),c.setAttribute("nodename",r),l.appendChild(c),l}static _emitSurfaceNodeFunction(e,t,n,i,s){let r="__copilot_displacement_output",l=o._createSyntheticNodeGraphFromContainer(e,t,s,r,i,n);if(!l)return null;let a=Zn.parse(l),c=a.outputFunctionName(r),u=a.emitPathtracerGLSL(new Set([r])).find(h=>h.functionName===c)??null;return u?{functionName:c,functionCode:u.code,glslType:u.glslType}:null}static collectSurfaceDisplacementBinding(e,t,n){let s=o.resolveSurfaceMaterialBindings(e,n).displacementShader;if(!s.nodename&&!s.nodegraph)return null;let r=o._buildGraphContexts(e,t),l=o.resolveNodeGraphs(e,t),a=e.documentElement.getAttribute("fileprefix")??"",c=o._resolvePrefix(t,a),u=new Map;for(let w of Array.from(e.documentElement.children)){let T=w.getAttribute("name");T&&u.set(T,w)}let h={name:"__document__",prefix:c,nodeMap:u,outputs:[]},d=null,f=null,p=s.nodegraph?"nodegraph":"nodename",g=null;if(s.nodegraph?(d=r.get(s.nodegraph)??null,f=e.querySelector(`nodegraph[name="${s.nodegraph}"]`)??null,g=(d?.outputs.find(T=>s.output?T.getAttribute("name")===s.output:!0)??d?.outputs[0]??null)?.getAttribute("nodename")??null):s.nodename&&(d=h,f=e.documentElement,g=s.nodename),!d||!g)return null;let x=d.nodeMap.get(g)??null;if(!x)return null;let m=o._findDirectInput(x,"displacement");if(!m)return null;let y=be(x,"scale")??1,b=null;if(m.getAttribute("nodegraph")){let w=m.getAttribute("nodegraph"),T=e.querySelector(`nodegraph[name="${w}"]`);if(!T)return null;let S=Zn.parse(T),E=m.getAttribute("output")??S.allOutputs().keys().next().value??"";if(!E||!S.allOutputs().has(E))return null;let I=S.outputFunctionName(E),N=S.emitPathtracerGLSL(new Set([E])).find(D=>D.functionName===I)??null;return N?(b=l.get(w)?.get(E)??null,{source:"nodegraph",functionName:I,functionCode:N.code,glslType:N.glslType,scale:y,texture:b}):null}let M=m.getAttribute("nodename");if(!M)return null;b=o._resolveTextureFromNode(d,M,r,new Set);let v=o._emitSurfaceNodeFunction(e,f,M,m.getAttribute("type")??"float",`${d.name}_displacement_runtime`);return v?{source:p,functionName:v.functionName,functionCode:v.functionCode,glslType:v.glslType,scale:y,texture:b}:null}static _escapeXml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}static _buildIfaceValues(e,t){let n=new Map;for(let[i,s]of t.inputs)s.defaultValue!==null&&n.set(i,s.defaultValue);if(e)for(let i of Array.from(e.children)){if(i.tagName.toLowerCase()!=="input")continue;let s=i.getAttribute("name"),r=i.getAttribute("value");s&&r!==null&&n.set(s,r)}return n}static _buildSyntheticSurface(e,t){let n=e.tagName,i=o._escapeXml(e.getAttribute("name")??"_synth"),s=`<materialx version="1.39"><${n} name="${i}">`;for(let r of Array.from(e.children)){if(r.tagName.toLowerCase()!=="input")continue;let l=r.getAttribute("name")??"";if(!l)continue;let a=r.getAttribute("type")??"",c=r.getAttribute("colorspace")??"",u=r.getAttribute("interfacename"),h=r.getAttribute("value"),d=u!==null?t.get(u)??h:h;d!=null&&(s+=`<input name="${o._escapeXml(l)}"`,s+=` type="${o._escapeXml(a)}"`,s+=` value="${o._escapeXml(d)}"`,c&&(s+=` colorspace="${o._escapeXml(c)}"`),s+="/>")}return s+=`</${n}></materialx>`,new DOMParser().parseFromString(s,"text/xml")}static _resolveNodeDefImpl(e,t,n){let i=e.element,s=null,l=i.querySelector("output")?.getAttribute("nodename")??null;if(l){for(let c of Array.from(i.children))if(c.getAttribute("name")===l){s=c;break}}if(s||(s=o._findSurfaceEl(i)),!s)return null;let a=o._buildSyntheticSurface(s,t);return o._parseSurface(a)}static parseLights(e){let t=[];e.querySelectorAll("directional_light").forEach(i=>{let s=Nt(i,"direction")??new _(0,0,-1),r=Nt(i,"color")??new _(1,1,1),l=be(i,"intensity")??1,a=new xt;a.position=new _(-s.x,-s.y,-s.z),a.emission=new _(r.x*l,r.y*l,r.z*l),a.type=2,a.area=0,t.push(a)}),e.querySelectorAll("point_light").forEach(i=>{let s=Nt(i,"position")??new _(0,0,0),r=Nt(i,"color")??new _(1,1,1),l=be(i,"intensity")??1,a=be(i,"decay_rate")??2,c=new xt;c.position=s,c.emission=new _(r.x*l,r.y*l,r.z*l),c.type=3,c.radius=a,c.area=0,t.push(c)}),e.querySelectorAll("spot_light").forEach(i=>{let s=Nt(i,"position")??new _(0,0,0),r=Nt(i,"direction")??new _(0,0,-1),l=Nt(i,"color")??new _(1,1,1),a=be(i,"intensity")??1,c=be(i,"decay_rate")??2,u=be(i,"inner_angle")??.9,h=be(i,"outer_angle")??.7,d=Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)||1,f=new xt;f.position=s,f.emission=new _(l.x*a,l.y*a,l.z*a),f.u=new _(r.x/d,r.y/d,r.z/d),f.v=new _(u,h,0),f.type=4,f.radius=c,f.area=0,t.push(f)});let n=o.parseNodeDefs(e);for(let[i,s]of n.byDefName){if(!Array.from(s.outputs.values()).some(a=>a.type==="lightshader"))continue;let r=n.implByDefName.get(i);if(!r)continue;let l=go.parse(r.element);for(let a of Array.from(e.querySelectorAll(s.nodeName))){let c=o._buildIfaceValues(a,s),u=l.extractConfig(c),h=new xt,[d,f,p]=u.color;h.emission=new _(d*u.intensity,f*u.intensity,p*u.intensity),h.area=0;let g=o._parseVec3(c.get("position")??""),x=o._parseVec3(c.get("direction")??"");if(g)if(h.position=g,x){let m=Math.sqrt(x.x*x.x+x.y*x.y+x.z*x.z)||1;h.u=new _(x.x/m,x.y/m,x.z/m),h.v=new _(.9,.7,0),h.type=4}else h.type=3;else x?(h.position=new _(-x.x,-x.y,-x.z),h.type=2):(h.position=new _(0,0,0),h.type=3);t.push(h)}}return t}static parseEnvGraph(e,t=""){let i=new DOMParser().parseFromString(e,"text/xml").querySelector("nodegraph");if(!i)throw new Error("[MtlxLoader] No <nodegraph> found in document.");let s=mo.parse(i),r=s.extractConfig(t);return{graph:s,config:r,toGLSL:l=>s.emitGLSL(l),applyToScene:async l=>{r.hdrPath&&await l.addEnvMapByUrlAsync(r.hdrPath),l.renderOptions.envMapIntensity=r.intensity,l.renderOptions.envMapRot=r.rotation*360,l.renderOptions.enableEnvMap=!0}}}static async expandXiIncludes(e,t,n=0){if(n>10)return e;let i=/<xi:include\s[^>]*href=["']([^"']+)["'][^>]*\/?>/g,s=[...e.matchAll(i)];if(s.length===0)return e;let r=t.includes("/")?t.substring(0,t.lastIndexOf("/")+1):"";for(let l of s){let a=l[1],c=a.startsWith("http")||a.startsWith("/")?a:o.normalizePath(r+a),u="";try{let h=await o._fetchText(c);u=(await o.expandXiIncludes(h,c,n+1)).replace(/<\?xml[^>]*\?>/g,"").replace(/^\s*<materialx[^>]*>/,"").replace(/<\/materialx>\s*$/,"").trim()}catch(h){console.warn(`[MtlxLoader] xi:include: failed to fetch ${c}:`,h)}e=e.replace(l[0],u)}return e}static async parseFromUrl(e,t){let n=await o._fetchText(e),i=await o.expandXiIncludes(n,e),s=new DOMParser().parseFromString(i,"text/xml");return o.parseFromDoc(s,t)}static async fetchAndExpand(e){let t=await o._fetchText(e),n=await o.expandXiIncludes(t,e),i=new DOMParser().parseFromString(n,"text/xml");return{xml:n,doc:i,mtlxDir:o._dirOf(e)}}static async parseEnvGraphFromUrl(e,t){let n=await o._fetchText(e);return o.parseEnvGraph(n,t??o._dirOf(e))}};var Jn=1,Xi=2,Qn=4;function $(o){return o.substring(o.indexOf(" ")+1).trim()}function Eh(o){let e=Math.max(o.emission.x,o.emission.y,o.emission.z)>1e-6,t=Math.min(Math.max(o.metallic,0),1),n=Math.min(Math.max(o.specTrans,0),1),i=Math.min(Math.max(o.specularWeight,0),1),s=Math.min(Math.max(o.baseWeight,0),1);if(o.materialType>=.5)return{kind:"hair",model:0,flags:Jn|Xi|(e?Qn:0)};let r=t>.98&&n<.02&&i<.2,l=t<.02&&n>.95&&s<.2,a=t<.02&&n<.02&&i<.05,c=o.subsurface>.05||o.subsurfaceRadiusScale.x>1.001||o.subsurfaceRadiusScale.y>1.001||o.subsurfaceRadiusScale.z>1.001;if(o.mediumType===2||o.mediumScattering>1e-4||o.mediumAbsorption>1e-4)return{kind:"volume",model:0,flags:Xi|(e?Qn:0)};if(c)return{kind:"subsurface",model:0,flags:Jn|Xi|(e?Qn:0)};if(r)return{kind:"conductor",model:o.roughness<.5?0:1,flags:Jn|(e?Qn:0)};if(l){let d=n,f=d<.2?0:d<.8?1:2,p=f===0?Jn:f===2?Xi:Jn|Xi;return{kind:"dielectric",model:f,flags:p|(e?Qn:0)}}if(a){let d=Math.min(Math.max(o.baseDiffuseRoughness,0),1);return{kind:"diffuse",model:d<.2?0:d<.75?1:2,flags:Jn|(e?Qn:0)}}return{kind:"generic",model:0,flags:Jn|(n>.02?Xi:0)|(e?Qn:0)}}function ig(o,e){let t=Eh(e);return{kind:o.kind,model:t.model,flags:o.flags>0?o.flags:t.flags}}function sg(o,e){let t=[`        case ${o}:`],n="state.texCoord * mat.uvScale";for(let i of e){let s=i.functionName;switch(i.inputName){case"base_color":case"baseColor":case"diffuseColor":t.push(`            if (texIDs.x >= 0) mat.baseColor = clamp(${s}(${n}, texIDs.x), vec3(0.0), vec3(1.0));`);break;case"coat_color":t.push(`            if (texIDs.x >= 0) mat.coatColor = clamp(${s}(${n}, texIDs.x), vec3(0.0), vec3(1.0));`);break;case"emission_color":case"emissive":case"emissiveColor":t.push(`            if (texIDs.w >= 0) mat.emission = max(${s}(${n}, texIDs.w), vec3(0.0));`);break;case"normal":case"geometry_normal":t.push(`            if (texIDs.z >= 0) { vec3 origNormal = state.normal; vec3 proceduralNormal = normalize(${s}(${n}, texIDs.z)); state.normal = normalize(state.tangent * proceduralNormal.x + state.bitangent * proceduralNormal.y + state.normal * proceduralNormal.z); state.ffnormal = dot(origNormal, r.direction) <= 0.0 ? state.normal : -state.normal; }`);break;case"roughness":case"specular_roughness":t.push(`            if (texIDs.y >= 0) mat.roughness = max(clamp(${s}(${n}, texIDs.y), 0.0, 1.0), 0.001);`);break;case"coat_roughness":t.push(`            if (texIDs.y >= 0) mat.clearcoatRoughness = max(clamp(${s}(${n}, texIDs.y), 0.0, 1.0), 0.001);`);break;case"metalness":case"metallic":t.push(`            if (texIDs.y >= 0) mat.metallic = clamp(${s}(${n}, texIDs.y), 0.0, 1.0);`);break}}return t.push("            break;"),t.join(`
`)}function rg(o,e){let t=[`        case ${o}:`];switch(t.push("            gMaterialXClosureContractValid = 1;"),e.kind){case"diffuse":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_DIFFUSE;");break;case"conductor":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_CONDUCTOR;");break;case"dielectric":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_DIELECTRIC;");break;case"subsurface":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_SUBSURFACE;");break;case"volume":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_VOLUME;");break;case"hair":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_HAIR;");break;default:t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_GENERIC;");break}return t.push(`            gMaterialXClosureModel = ${Math.max(0,e.model)};`),t.push(`            gMaterialXClosureFlags = ${Math.max(0,e.flags)};`),t.push("            break;"),t.join(`
`)}function ag(o,e){let t=[`        case ${o}:`],n=`${e.functionName}(uv, texLayer)`,i=Number.isFinite(e.scale)?e.scale:1;return e.glslType==="float"?t.push(`            return vec3(0.0, 0.0, ${n} * ${i.toFixed(6)});`):e.glslType==="vec2"?t.push(`            return vec3(${n}, 0.0) * ${i.toFixed(6)};`):e.glslType==="vec4"?t.push(`            return (${n}).xyz * ${i.toFixed(6)};`):t.push(`            return ${n} * ${i.toFixed(6)};`),t.join(`
`)}function og(o){let e=o.toGLSL("envMapTex"),t=e.match(/vec3\s+(EvalEnvGraph_[A-Za-z0-9_]+)/);if(!t)return"";let n=t[1];return[e,"vec4 EvalEnvMap(Ray r) {",`    vec3 color = ${n}(r, envMapTex);`,"    float theta = acos(clamp(r.direction.y, -1.0, 1.0));","    float safeSum = max(envMapTotalSum, 1e-6);","    float pdf = Luminance(color) / safeSum;","    return vec4(color, (pdf * envMapRes.x * envMapRes.y) / (TWO_PI * PI * max(sin(theta), 1e-6)));","}"].join(`

`)}async function xo(o,e,t){let n=await he(o);if(!n.ok)return console.error(`Couldn't open ${o} for reading`),!1;let i=await n.text(),s=o.substring(0,o.lastIndexOf("/")+1),r=i.split(`
`);console.log("Loading Scene..");let l=new Map,a=[],c=new Map,u=[],h=[],d=[];e.materialxEnvStrategy="cpu",e.materialxLightStrategy="cpu",e.proceduralEnvGlsl="";let f=new It;e.addMaterial(f);let p=0;for(;p<r.length;){let x=r[p].trim();if(x.split(" ")[0]=="#"||x===""){p++;continue}if(x.split(" ")[0]=="materialx_env_strategy"){let m=$(x).toLowerCase();e.materialxEnvStrategy=m==="glsl"?"glsl":"cpu",p++;continue}if(x.split(" ")[0]=="materialx_light_strategy"){let m=$(x).toLowerCase();e.materialxLightStrategy=m==="glsl"?"glsl":"cpu",p++;continue}if(x.split(" ")[0]=="material"){let m=new It,y=$(x);m.name=y;let b="none",M="none",v="none",w="none",T="none",S="none",E="none",I=!1,N="",D="",G=[],U=null,R=null;for(p++;p<r.length;){let P=r[p].trim();if(P.includes("}"))break;if(P.split(" ")[0]=="color"){let[,ne,B,F]=P.split(/\s+/);m.baseColor=new _(parseFloat(ne),parseFloat(B),parseFloat(F))}if(P.split(" ")[0]=="opacity"&&(m.opacity=parseFloat($(P))),P.split(" ")[0]=="alphamode"&&(S=$(P)),P.split(" ")[0]=="alphacutoff"&&(m.alphaCutoff=parseFloat($(P))),P.split(" ")[0]=="emission"){let[,ne,B,F]=P.split(/\s+/);m.emission=new _(parseFloat(ne),parseFloat(B),parseFloat(F))}if(P.split(" ")[0]=="metallic"&&(m.metallic=parseFloat($(P))),P.split(" ")[0]=="roughness"&&(m.roughness=parseFloat($(P))),P.split(" ")[0]=="subsurface"&&(m.subsurface=parseFloat($(P))),P.split(" ")[0]=="thickness"&&(m.mediumThickness=parseFloat($(P))),P.split(" ")[0]=="speculartint"&&(m.specularTint=parseFloat($(P))),P.split(" ")[0]=="anisotropic"&&(m.anisotropic=parseFloat($(P))),P.split(" ")[0]=="sheen"&&(m.sheen=parseFloat($(P))),P.split(" ")[0]=="sheentint"&&(m.sheenTint=parseFloat($(P))),P.split(" ")[0]=="clearcoat"&&(m.clearcoat=parseFloat($(P))),P.split(" ")[0]=="clearcoatgloss"&&(m.clearcoatGloss=parseFloat($(P))),P.split(" ")[0]=="spectrans"&&(m.specTrans=parseFloat($(P))),P.split(" ")[0]=="ior"&&(m.ior=parseFloat($(P))),P.split(" ")[0]=="transmissioncolor"){let[,ne,B,F]=P.split(/\s+/);m.transmissionColor=new _(parseFloat(ne),parseFloat(B),parseFloat(F)),I=!0}if(P.split(" ")[0]=="thinwalled"&&(m.thinWalled=parseFloat($(P))),P.split(" ")[0]=="albedotexture"&&(b=$(P)),P.split(" ")[0]=="metallicroughnesstexture"&&(M=$(P)),P.split(" ")[0]=="normaltexture"&&(v=$(P)),P.split(" ")[0]=="emissiontexture"&&(w=$(P)),P.split(" ")[0]=="mediumtype"&&(E=$(P)),P.split(" ")[0]=="mediumdensity"&&(m.mediumScattering=parseFloat($(P))),P.split(" ")[0]=="mediumabsorption"&&(m.mediumAbsorption=parseFloat($(P))),P.split(" ")[0]=="mediumcolor"){let[,ne,B,F]=P.split(/\s+/);m.mediumColor=new _(parseFloat(ne),parseFloat(B),parseFloat(F))}P.split(" ")[0]=="mediumanisotropy"&&(m.mediumAnisotropy=parseFloat($(P))),P.split(" ")[0]=="doublesided"&&(m.doubleSided=parseFloat($(P))),P.split(" ")[0]=="materialx_document"&&(N=$(P)),P.split(" ")[0]=="materialx_surface"&&(D=$(P)),p++}if(N){let H=Ne.normalizePath(s+N);try{let P=await Ne.fetchAndExpand(H),ne=P.doc,B=Ne.resolveSurfaceMaterialBindings(ne,D||void 0),F=Ne.parseFromDoc(ne,D||void 0);Gi.resetMaterial(m),F.toMaterial(m);let ae=P.mtlxDir,j=Ne.resolveSurfaceTextures(ne,ae,D||void 0);G=Ne.collectSurfaceGraphBindings(ne,D||void 0),U=Ne.collectSurfaceGraphClosureBinding(ne,D||void 0),R=Ne.collectSurfaceDisplacementBinding(ne,ae,D||void 0);for(let[W,we]of j){let Qe=await e.addTextureByUrlAsync(we.filename);Qe>=0&&(m[W]=Qe,(we.uvtiling[0]!==1||we.uvtiling[1]!==1)&&m.uvScale.x===1&&m.uvScale.y===1&&(m.uvScale=new Z(we.uvtiling[0],we.uvtiling[1])))}if(R?.texture){let W=await e.addTextureByUrlAsync(R.texture.filename);W>=0&&(m.displacementTexID=W,(R.texture.uvtiling[0]!==1||R.texture.uvtiling[1]!==1)&&m.uvScale.x===1&&m.uvScale.y===1&&(m.uvScale=new Z(R.texture.uvtiling[0],R.texture.uvtiling[1])))}}catch(P){console.warn(`MaterialX document not found or invalid: ${H}`,P)}}if(b&&b!=="none"&&(m.baseColorTexID=await e.addTextureAsync(b)),M&&M!=="none"&&(m.metallicRoughnessTexID=await e.addTextureAsync(M)),v&&v!=="none"&&(m.normalmapTexID=await e.addTextureAsync(v)),w&&w!=="none"&&(m.emissionmapTexID=await e.addTextureAsync(w)),S==="opaque"?m.alphaMode=0:S==="blend"?m.alphaMode=1:S==="mask"&&(m.alphaMode=2),E==="absorb"?m.mediumType=1:E==="scatter"?m.mediumType=2:E==="emissive"&&(m.mediumType=3),m.specTrans>0&&!I&&(m.transmissionColor=m.baseColor.clone()),!l.has(y)){let H=e.addMaterial(m);if(l.set(y,H),N){let P=U?ig(U,m):Eh(m);d.push(rg(H,P))}if(G.length>0){for(let P of G)c.set(P.functionName,P.functionCode);u.push(sg(H,G))}R&&(c.set(R.functionName,R.functionCode),h.push(ag(H,R)))}p++;continue}if(x.split(" ")[0]=="materialx_lights"){let m=$(x),y=Ne.normalizePath(s+m);try{let M=(await Ne.fetchAndExpand(y)).doc;e.materialxLightStrategy==="glsl"&&console.warn("materialx_light_strategy=glsl requested, but runtime lightshader GLSL is not integrated yet; falling back to CPU parseLights.");let v=Ne.parseLights(M);for(let w of v)e.addLight(w);console.log(`MaterialX lights loaded: ${v.length} light(s) from ${y}`)}catch(b){console.warn(`MaterialX lights document not found or invalid: ${y}`,b)}p++;continue}if(x.split(" ")[0]=="materialx_envmap"){let m=$(x),y=Ne.normalizePath(s+m);try{let b=await Ne.parseEnvGraphFromUrl(y);if(b.config.hdrPath&&await e.addEnvMapByUrlAsync(b.config.hdrPath),t.envMapIntensity=b.config.intensity,t.envMapRot=b.config.rotation*360,t.enableEnvMap=!0,e.materialxEnvStrategy==="glsl"){let M=og(b);M.length>0?e.proceduralEnvGlsl=M:(e.proceduralEnvGlsl="",console.warn("materialx_env_strategy=glsl requested, but no runtime GLSL override could be generated; falling back to default EvalEnvMap path."))}else e.proceduralEnvGlsl="";console.log(`MaterialX env map loaded from ${y}`)}catch(b){console.warn(`Failed to load MaterialX env map: ${b}`)}p++;continue}if(x.split(" ")[0]=="light"){let m=new xt,y=new _,b=new _,M="none";for(p++;p<r.length&&!r[p].includes("}");){let v=r[p].trim();if(v.split(" ")[0]=="position"){let[,w,T,S]=v.split(/\s+/);m.position=new _(parseFloat(w),parseFloat(T),parseFloat(S))}if(v.split(" ")[0]=="emission"){let[,w,T,S]=v.split(/\s+/);m.emission=new _(parseFloat(w),parseFloat(T),parseFloat(S))}if(v.split(" ")[0]=="radius"&&(m.radius=parseFloat($(v))),v.split(" ")[0]=="v1"){let[,w,T,S]=v.split(/\s+/);y=new _(parseFloat(w),parseFloat(T),parseFloat(S))}if(v.split(" ")[0]=="v2"){let[,w,T,S]=v.split(/\s+/);b=new _(parseFloat(w),parseFloat(T),parseFloat(S))}v.split(" ")[0]=="type"&&(M=$(v)),p++}M==="quad"?(m.type=0,m.u=y.subtract(m.position),m.v=b.subtract(m.position),m.area=_.Length(_.cross(m.u,m.v))):M==="sphere"?(m.type=1,m.area=4*Math.PI*m.radius*m.radius):M==="distant"&&(m.type=2,m.area=0),e.addLight(m),p++;continue}if(x.split(" ")[0]=="camera"){let m=new ie,y=new _,b=new _,M=45,v=0,w=1,T=!1;for(p++;p<r.length&&!r[p].includes("}");){let S=r[p].trim();if(S.split(" ")[0]=="position"){let[,E,I,N]=S.split(/\s+/);y=new _(parseFloat(E),parseFloat(I),parseFloat(N))}if(S.split(" ")[0]=="lookat"){let[,E,I,N]=S.split(/\s+/);b=new _(parseFloat(E),parseFloat(I),parseFloat(N))}if(S.split(" ")[0]=="aperture"&&(v=parseFloat($(S))),S.split(" ")[0]=="focaldist"&&(w=parseFloat($(S))),S.split(" ")[0]=="fov"&&(M=parseFloat($(S))),S.split(" ")[0]=="matrix"){let E=S.split(/\s+/).slice(1).map(Number);E.length===16&&E.every(I=>!isNaN(I))&&(m=new ie(E[0],E[4],E[8],E[12],E[1],E[5],E[9],E[13],E[2],E[6],E[10],E[14],E[3],E[7],E[11],E[15]),T=!0)}p++}if(T){let S=new _(m.data[2][0],m.data[2][1],m.data[2][2]);y=new _(m.data[3][0],m.data[3][1],m.data[3][2]),b=y.add(S)}e.addCamera(y,b,M),e.camera.aperture=v,e.camera.focalDist=w,p++;continue}if(x.split(" ")[0]=="renderer"){let U=function(R){if(R==="true")return!0;if(R==="false")return!1};var g=U;let m="none",y="none",b="none",M="none",v="none",w="none",T="none",S="none",E="none",I="none",N="none",D="none",G="none";for(p++;p<r.length&&!r[p].includes("}");){let R=r[p].trim();if(R.split(" ")[0]=="envmapfile"&&(m=$(R)),R.split(" ")[0]=="resolution"){let[,H,P]=R.split(/\s+/);t.renderResolution=new Z(parseInt(H),parseInt(P)),t.originalRenderResolution=t.renderResolution.clone()}if(R.split(" ")[0]=="envmapintensity"&&(t.envMapIntensity=parseFloat($(R))),R.split(" ")[0]=="maxdepth"&&(t.maxDepth=parseFloat($(R))),R.split(" ")[0]=="maxspp"&&(t.maxSpp=parseFloat($(R))),R.split(" ")[0]=="tilewidth"&&(t.tileWidth=parseFloat($(R))),R.split(" ")[0]=="tileheight"&&(t.tileHeight=parseFloat($(R))),R.split(" ")[0]=="enablerr"&&(y=$(R)),R.split(" ")[0]=="rrdepth"&&(t.RRDepth=parseFloat($(R))),R.split(" ")[0]=="enabletonemap"&&(E=$(R)),R.split(" ")[0]=="enableaces"&&(b=$(R)),R.split(" ")[0]=="texarraywidth"&&(t.texArrayWidth=parseFloat($(R))),R.split(" ")[0]=="texarrayheight"&&(t.texArrayHeight=parseFloat($(R))),R.split(" ")[0]=="openglnormalmap"&&(M=$(R)),R.split(" ")[0]=="hideemitters"&&(v=$(R)),R.split(" ")[0]=="enablebackground"&&(T=$(R)),R.split(" ")[0]=="transparentbackground"&&(w=$(R)),R.split(" ")[0]=="backgroundcolor"){let[,H,P,ne]=R.split(/\s+/);t.backgroundCol=new _(parseFloat(H),parseFloat(P),parseFloat(ne))}if(R.split(" ")[0]=="independentrendersize"&&(S=$(R)),R.split(" ")[0]=="envmaprotation"&&(t.envMapRot=parseFloat($(R))),R.split(" ")[0]=="enableroughnessmollification"&&(I=$(R)),R.split(" ")[0]=="roughnessmollificationamt"&&(t.roughnessMollificationAmt=parseFloat($(R))),R.split(" ")[0]=="enablevolumemis"&&(N=$(R)),R.split(" ")[0]=="enableuniformlight"&&(D=$(R)),R.split(" ")[0]=="sssmode"&&(G=$(R)),R.split(" ")[0]=="uniformlightcolor"){let[,H,P,ne]=R.split(/\s+/);t.uniformLightCol=new _(parseFloat(H),parseFloat(P),parseFloat(ne))}p++}m!=="none"?(Nn.instance.envMapIdx=Nn.instance.envMaps.findIndex(R=>m.endsWith(R)),await e.addEnvMapAsync(m),t.enableEnvMap=!0):t.enableEnvMap=!1,U(b)!==void 0&&(t.enableAces=U(b)),U(y)!==void 0&&(t.enableRR=U(y)),U(M)!==void 0&&(t.openglNormalMap=U(M)),U(v)!==void 0&&(t.hideEmitters=U(v)),U(T)!==void 0&&(t.enableBackground=U(T)),U(w)!==void 0&&(t.transparentBackground=U(w)),U(S)!==void 0&&(t.independentRenderSize=U(S)),U(E)!==void 0&&(t.enableTonemap=U(E)),U(I)!==void 0&&(t.enableRoughnessMollification=U(I)),U(N)!==void 0&&(t.enableVolumeMIS=U(N)),U(D)!==void 0&&(t.enableUniformLight=U(D)),G==="none"?t.sssMode=0:G==="randomwalk"?t.sssMode=1:G==="dipole"&&(t.sssMode=2),p++;continue}if(x.split(" ")[0]=="mesh"){let m=null,y=new X,b=new ie,M=new ie,v=new ie,w=new ie,T=0,S="none",E=!1;for(p++;p<r.length&&!r[p].includes("}");){let I=r[p].trim(),N=null;if(I.split(" ")[0]=="name"&&(S=I.substring(5).trim()),I.split(" ")[0]=="file"&&(m=$(I)),I.split(" ")[0]=="material"&&(N=$(I),l.has(N)?T=l.get(N):console.error(`Could not find material ${N}`)),I.split(" ")[0]=="matrix"){let D=I.split(/\s+/).slice(1).map(Number);D.length===16&&D.every(G=>!isNaN(G))&&(b=new ie(D[0],D[4],D[8],D[12],D[1],D[5],D[9],D[13],D[2],D[6],D[10],D[14],D[3],D[7],D[11],D[15]),E=!0)}if(I.split(" ")[0]=="position"){let[,D,G,U]=I.split(/\s+/);M=ie.Translate(new _(parseFloat(D),parseFloat(G),parseFloat(U)))}if(I.split(" ")[0]=="scale"){let[,D,G,U]=I.split(/\s+/);w=ie.Scale(new _(parseFloat(D),parseFloat(G),parseFloat(U)))}if(I.split(" ")[0]=="rotation"){let[,D,G,U,R]=I.split(/\s+/);y=new X(parseFloat(D),parseFloat(G),parseFloat(U),parseFloat(R)),v=ie.QuatToMatrix(y.x,y.y,y.z,y.w)}p++}if(m){let I=await e.addMeshAsync(m);if(I!==-1){let N;if(S&&S!=="none")N=S;else{let U=Math.max(m.lastIndexOf("/"),m.lastIndexOf("\\"));N=m.substring(U+1)}let D;E?D=b:D=w.multiply(v).multiply(M);let G=new vn(N,I,D,T);e.addMeshInstance(G)}}p++;continue}if(x.split(" ")[0]=="gltf"){let m=null,y=new X,b=new ie,M=new _,v=new ie,w=new _(1,1,1),T=!1;for(p++;p<r.length&&!r[p].includes("}");){let S=r[p].trim();if(S.split(" ")[0]=="file"&&(m=$(S)),S.split(" ")[0]=="matrix"){let E=S.split(/\s+/).slice(1).map(Number);E.length===16&&E.every(I=>!isNaN(I))&&(b=new ie(E[0],E[4],E[8],E[12],E[1],E[5],E[9],E[13],E[2],E[6],E[10],E[14],E[3],E[7],E[11],E[15]),T=!0)}if(S.split(" ")[0]=="position"){let[,E,I,N]=S.split(/\s+/);M=new _(parseFloat(E),parseFloat(I),parseFloat(N))}if(S.split(" ")[0]=="scale"){let[,E,I,N]=S.split(/\s+/);w=new _(parseFloat(E),parseFloat(I),parseFloat(N))}if(S.split(" ")[0]=="rotation"){let[,E,I,N,D]=S.split(/\s+/);y=new X(parseFloat(E),parseFloat(I),parseFloat(N),parseFloat(D)),v=ie.QuatToMatrix(y.x,y.y,y.z,y.w)}p++}if(m){let S=m.substring(m.lastIndexOf(".")+1).toLowerCase(),E;T?E=b:E=ie.Scale(w).multiply(v).multiply(ie.Translate(M));let I=!1;if(S==="gltf"?I=await Qt(s+m,e,t,E,!1):S==="glb"&&(I=await Qt(s+m,e,t,E,!0)),!I)throw console.error(`Unable to load gltf ${m}`),new Error(`Unable to load gltf ${m}`)}}p++}return e.proceduralMaterialGlsl=u.length>0||h.length>0||d.length>0?[...c.values(),"vec3 EvalProceduralDisplacementLocal(int matId, vec2 uv, int texLayer) {","    switch (matId) {",...h,"        default:","            return vec3(0.0);","    }","}","void ApplyProceduralMaterialOverrides(int matId, inout Material mat, inout State state, ivec4 texIDs, Ray r) {","    switch (matId) {",...u,"        default:","            break;","    }","}","void ApplyProceduralMaterialClosureContract(int matId, in Material mat, in State state) {","    switch (matId) {",...d,"        default:","            break;","    }","}"].join(`

`):"",!0}function _o(o,e,t,n){let i=o.indexOf(e),s=o.indexOf(t);if(i!==-1&&s!==-1&&s>i){let r=o.substring(0,i+e.length),l=o.substring(s);return r+`
`+n+`
`+l}return o}async function Ah(o,e,t,n=null){let i="",s=await he(o);s.ok&&(i=await s.text());let r=o.split("/").reverse()[0].split(".")[0],l=".scene";if(!await Zr(`scenes/pathtracer/${r}${l}`)&&(l=".gltf",!await Zr(`scenes/pathtracer/${r}${l}`)&&(l=".glb",!await Zr(`scenes/pathtracer/${r}${l}`))))return console.error(`Failed to load scene ${r} from Shadertoy shader`),!1;let a=new gt(r);a.renderOptions=t;let c=!1;if(l===".scene"?c=await xo(`/scenes/pathtracer/${r}${l}`,a,t):l===".gltf"?c=await Qt(`/scenes/pathtracer/${r}${l}`,a,t,new ie,!1):l===".glb"&&(c=await Qt(`/scenes/pathtracer/${r}${l}`,a,t,new ie,!0)),!c)return console.error("Failed to load scene from Shadertoy shader"),!1;t=a.renderOptions,a.lights.length===0&&(t.enableEnvMap=!0),a.renderOptions=t,await a.processSceneAsync();let u=a.computeSceneData(t.useRayMarching),h=u.data.length>1e3;return await uo(t.useRayMarching?"/shaders/shadertoy/pathtracing-fast/shader.json":"/shaders/shadertoy/pathtracing/shader.json",e,t,async(d,f)=>{if(d.indexOf("common.glsl")!==-1){let p=f,g=u.commonCode;t.useRayMarching&&(g=`
#define OPT_RAYMARCHING
${g}
`),g=g.trim(),f=_o(p,"// START_COMMON_CODE","// END_COMMON_CODE",g)}if(d.indexOf("bufferA.glsl")!==-1){let p=f;u.bufferACode=`
${u.bufferACode}

${h?"":a.generateMeshCode(u,t.useRayMarching)}
`,u.bufferACode=u.bufferACode.trim(),f=_o(p,"// START_BUFFERA_CODE","// END_BUFFERA_CODE",u.bufferACode)}if(d.indexOf("bufferB.glsl")!==-1){let p=f;t.useRayMarching&&(u.bufferBCode=`
${i}

${u.bufferBCode}
`),u.bufferBCode=u.bufferBCode.trim(),f=_o(p,"// START_BUFFERB_CODE","// END_BUFFERB_CODE",u.bufferBCode)}return d.indexOf("bufferD.glsl")!==-1&&(f=_o(f,"// START_BUFFERD_CODE","// END_BUFFERD_CODE",u.bufferDCode)),n&&!await n(d,f,null,void 0,void 0)?(console.error(`Callback failed for ${d}`),null):f})?(e.renderOptions=t,await e.processSceneAsync(),await n("commonCode.glsl",u.commonCode,null,void 0,void 0),await n("bufferACode.glsl",u.bufferACode,null,void 0,void 0),await n("bufferBCode.glsl",u.bufferBCode,null,void 0,void 0),await n("bufferDCode.glsl",u.bufferDCode,null,void 0,void 0),t.useRayMarching||(await n("meshData.bin",null,u.buffer,void 0,void 0),u.textureBuffer&&await n("textures.bin",null,u.textureBuffer,u.textureWidth,u.textureHeight)),!0):(console.error("Failed to load Shadertoy shader"),!1)}var yo=class o extends gt{static MATERIAL_STRIDES=[72,60,32];sceneConfig=null;bvhDataArray=null;vertIndicesDataArray=null;verticesDataArray=null;normalsDataArray=null;_topLevelIndex=0;constructor(e){super(e)}dispose(){super.dispose(),this.bvhDataArray=null,this.vertIndicesDataArray=null,this.verticesDataArray=null,this.normalsDataArray=null,this.lightsDataArray=null}createTLAS(){}createBLAS(){}rebuildInstances(){this.instancesModified=!0,this.dirty=!0}async processSceneAsync(){}get topLevelIndex(){return this._topLevelIndex}set topLevelIndex(e){this._topLevelIndex=e}bvhData(e=null){return this.bvhDataArray}vertIndicesData(){return this.vertIndicesDataArray}verticesData(){return this.verticesDataArray}normalsData(){return this.normalsDataArray}set transformsDataArray(e){if(e){this.transforms=[];for(let t=0;t<e.length;t+=16){let n=new ie;n.data[0][0]=e[t],n.data[0][1]=e[t+1],n.data[0][2]=e[t+2],n.data[0][3]=e[t+3],n.data[1][0]=e[t+4],n.data[1][1]=e[t+5],n.data[1][2]=e[t+6],n.data[1][3]=e[t+7],n.data[2][0]=e[t+8],n.data[2][1]=e[t+9],n.data[2][2]=e[t+10],n.data[2][3]=e[t+11],n.data[3][0]=e[t+12],n.data[3][1]=e[t+13],n.data[3][2]=e[t+14],n.data[3][3]=e[t+15],this.transforms.push(n)}}}set materialsDataArray(e){if(e){this.materials=[];let t=32,n=this.sceneConfig?this.sceneConfig.materials.length+1:0;if(n>0){let i=e.length/n;Number.isInteger(i)&&o.MATERIAL_STRIDES.includes(i)&&(t=i)}if(t===32){let i=o.MATERIAL_STRIDES.filter(s=>e.length%s===0);i.length>0&&(t=i[0])}for(let i=0;i<e.length;i+=t){let s=new It;s.baseColor=new _(e[i],e[i+1],e[i+2]),s.anisotropic=e[i+3],s.emission=new _(e[i+4],e[i+5],e[i+6]),s.mediumThickness=e[i+7],s.metallic=e[i+8],s.roughness=e[i+9],s.subsurface=e[i+10],s.specularTint=e[i+11],s.sheen=e[i+12],s.sheenTint=e[i+13],s.clearcoat=e[i+14],s.clearcoatGloss=e[i+15],s.specTrans=e[i+16],s.ior=e[i+17],s.mediumType=e[i+18],s.mediumScattering=e[i+19],s.mediumColor=new _(e[i+20],e[i+21],e[i+22]),s.mediumAnisotropy=e[i+23],s.baseColorTexID=e[i+24],s.metallicRoughnessTexID=e[i+25],s.normalmapTexID=e[i+26],s.emissionmapTexID=e[i+27],s.opacity=e[i+28],s.alphaMode=e[i+29],s.alphaCutoff=e[i+30],s.doubleSided=e[i+31],t>=60&&(s.mediumAbsorption=e[i+32],s.baseWeight=e[i+33],s.baseDiffuseRoughness=e[i+34],s.coatDarkening=e[i+35],s.specularColor=new _(e[i+36],e[i+37],e[i+38]),s.coatIOR=e[i+39],s.coatColor=new _(e[i+40],e[i+41],e[i+42]),s.coatRoughnessAnisotropy=e[i+43],s.transmissionColor=new _(e[i+44],e[i+45],e[i+46]),s.thinWalled=e[i+47],s.subsurfaceRadiusScale=new _(e[i+48],e[i+49],e[i+50]),s.fuzzColor=new _(e[i+51],e[i+55],e[i+59]),s.fuzzRoughness=e[i+52],s.dispersionScale=e[i+53],s.abbeNumber=e[i+54],s.thinFilmWeight=e[i+56],s.thinFilmThickness=e[i+57],s.thinFilmIor=e[i+58],s.uvScale=new Z(e[i+60],e[i+61]),s.specularWeight=e[i+62],s.anisotropyRotation=e[i+63],s.coatAnisotropyRotation=e[i+64],s.coatAffectRoughness=e[i+65],s.transmissionExtraRoughness=e[i+66],s.materialType=e[i+67]),t>=72&&(s.displacementTexID=e[i+68]),this.materials.push(s)}}}set lightsDataArray(e){if(e){this.lights=[];for(let t=0;t<e.length;t+=15){let n=new xt;n.position=new _(e[t],e[t+1],e[t+2]),n.emission=new _(e[t+3],e[t+4],e[t+5]),n.u=new _(e[t+6],e[t+7],e[t+8]),n.v=new _(e[t+9],e[t+10],e[t+11]),n.radius=e[t+12],n.area=e[t+13],n.type=e[t+14],this.lights.push(n)}}}computeSceneData(e){return null}generateMeshCode(e,t){return null}};function bo(o,e,t){return t===void 0?o.subarray(e*4):o.subarray(e*4,t*4)}function Rh(o,e,t){let n=o.subarray(e*4,t*4),i=[];for(let s=0;s<n.length;s+=4)i.push(new _(n[s],n[s+1],n[s+2]));return new Float32Array(i.flatMap(s=>[s.x,s.y,s.z]))}function lg(o,e,t){let n=o.subarray(e*4,t*4),i=[];for(let s=0;s<n.length;s+=4)i.push(new _(n[s],n[s+1],n[s+2]));return new Int32Array(i.flatMap(s=>[s.x,s.y,s.z]))}function cg(o,e,t,n=!1){let i=L.document.createElement("canvas");i.width=e,i.height=t;let s=i.getContext("2d");return s?(n?(s.scale(1,-1),s.drawImage(o,0,-t,e,t)):s.drawImage(o,0,0,e,t),s.getImageData(0,0,e,t)):null}function ug(o,e,t,n=!1){let i=cg(o,e,t,n);return i?new Uint8Array(i.data.buffer):null}async function Ch(o,e,t){console.info(`Loading scene ${o}...`);let s=await(await he(o)).json();e.sceneConfig=s;let r=new _(...s.camera.eye),l=new _(...s.camera.lookat),a=s.camera.fov;e.camera=new ai(r,l,a),t.enableTonemap=s.display.enableTonemap,t.enableAces=s.display.enableAces,t.simpleAcesFit=s.display.simpleAcesFit,t.backgroundCol=new _(...s.display.backgroundCol),t.uniformLightCol=new _(...s.uniforms.uniformLightCol),t.maxDepth=s.uniforms.maxDepth,t.roughnessMollificationAmt=s.uniforms.roughnessMollificationAmt,t.envMapIntensity=s.uniforms.envMapIntensity,t.enableEnvMap=s.defines.includes("OPT_ENVMAP"),t.enableRoughnessMollification=s.defines.includes("OPT_ROUGHNESS_MOLLIFICATION"),t.enableRR=s.defines.includes("OPT_RR");let c=s.defines.find(d=>d.startsWith("OPT_RR_DEPTH "));if(c){let d=parseInt(c.split(" ")[1]);isNaN(d)||(t.RRDepth=d)}t.enableUniformLight=s.defines.includes("OPT_UNIFORM_LIGHT"),t.openglNormalMap=s.defines.includes("OPT_OPENGL_NORMALMAP"),t.hideEmitters=s.defines.includes("OPT_HIDE_EMITTERS"),t.enableBackground=s.defines.includes("OPT_BACKGROUND"),t.openglNormalMap=s.defines.includes("OPT_OPENGL_NORMALMAP"),t.enableBackground=s.defines.includes("OPT_BACKGROUND"),t.transparentBackground=s.defines.includes("OPT_TRANSPARENT_BACKGROUND"),t.enableVolumeMIS=s.defines.includes("OPT_VOL_MIS"),s.resolution&&(t.renderResolution=new Z(...s.resolution),t.originalRenderResolution=t.renderResolution.clone(),t.tileWidth=s.tileWidth,t.tileHeight=s.tileHeight);let u=await Oi.readBlob(`shadertoy/examples/glsl-pathtracer/${s.scene}/meshData.bin`),h=new Float32Array(await u?.arrayBuffer(),20);if(e.materialsDataArray=bo(h,s.indices.materialsTex,s.indices.transformsTex),e.transformsDataArray=bo(h,s.indices.transformsTex,s.indices.lightsTex),e.lightsDataArray=Rh(h,s.indices.lightsTex,s.indices.BVH),e.bvhDataArray=Rh(h,s.indices.BVH,s.indices.vertexIndicesTex),e.vertIndicesDataArray=lg(h,s.indices.vertexIndicesTex,s.indices.verticesTex),e.verticesDataArray=bo(h,s.indices.verticesTex,s.indices.normalsTex),e.normalsDataArray=bo(h,s.indices.normalsTex,2*s.indices.normalsTex-s.indices.verticesTex),s.meshes.forEach(d=>{let f=new bn;f.name=d.name,e.meshes.push(f)}),s.meshes.forEach((d,f)=>{let p=s.materials.findIndex(x=>x===d.material)+1,g=new vn(d.name,f,new ie,p);e.meshInstances.push(g)}),e.topLevelIndex=s.uniforms.topBVHIndex,s.materials.forEach((d,f,p)=>{e.materials[f+1].name=d}),s.withTexture){let d=await new Promise((f,p)=>{let g=new Image;g.crossOrigin="anonymous",g.onload=()=>{f(g)},g.onerror=()=>f(!1),g.src=Oi.buildUrl(`shadertoy/examples/glsl-pathtracer/${s.scene}/textures.png`)});d&&(e.textureMapsArray=ug(d,d.width,d.height))}return e.renderOptions=t,!0}var Nn=class o{static _instance=null;stopped;working;static get instance(){return o._instance||(o._instance=new o),o._instance}scenes=[];shadertoyScenes=[];shadertoyGlslPathtracerScenes=[];envMaps=[];envMapIdx=0;mouseSensitivity=.01;scene=null;_renderer=null;renderOptions=new ni;lastTime;firstTime;bench=null;optionsChanged=!1;objectPropChanged=!1;reloadShaders=!1;constructor(){this.lastTime=performance.now()}emitSceneStage(e,t){typeof window>"u"||window.dispatchEvent(new CustomEvent("scene-stage",{detail:{stage:e,message:t}}))}get renderer(){return this._renderer}get currentScene(){return this.scene}static getExt(e){if(e.indexOf(".")===-1)return"";let t=e.split(".");return t[t.length-1].toLowerCase()}async getSceneFilesAsync(){try{let e=await he("/pathtracer.json");this.scenes=await e.json(),e=await he("/shadertoy.json"),this.shadertoyScenes=await e.json(),e=await he("/shadertoy-glsl-pathtracer.json"),this.shadertoyGlslPathtracerScenes=await e.json()}catch(e){console.error("Error fetching scene files:",e)}}async getEnvMapsAsync(){try{let e=await he("/envmaps.json");this.envMaps=await e.json()}catch(e){console.error("Error fetching envMaps files:",e)}}async loadSceneAsync(e,t=!1,n=!1,i=null){let s=e,r=o.getExt(e),l=!1,a=new ie;if((r==="scene"||r==="gltf"||r==="glb")&&!s.startsWith("/scenes/pathtracer/")&&(s=`/scenes/pathtracer/${s}`),r===""&&!s.startsWith("/scenes/shadertoy/examples/")){let u=`/scenes/shadertoy/examples/${s}/shadertoy.json`;(await he(u)).ok||(u=`/scenes/shadertoy/examples/${s}/shader.json`),s=u}r==="shadertoyscene"&&!s.startsWith("/scenes/shadertoy/examples/glsl-pathtracer/")&&(s=`/scenes/shadertoy/examples/glsl-pathtracer/${s}`);let c=r==="shadertoyscene"||(r===""||r==="json")&&(s.endsWith("shadertoy.json")||s.endsWith("shader.json"));return this.scene=c?new Ui(e):s.endsWith("data.json")?new yo(e):new gt(e),this.renderOptions.flipTexturesY=t,this.renderOptions.useRayMarching=n,r==="scene"?l=await xo(s,this.scene,this.renderOptions):r==="gltf"?l=await Qt(s,this.scene,this.renderOptions,a,!1):r==="glb"?l=await Qt(s,this.scene,this.renderOptions,a,!0):(r===""||r==="json")&&s.endsWith("shadertoy.json")?l=await yh(s,this.scene,this.renderOptions):(r===""||r==="json")&&s.endsWith("shader.json")?l=await uo(s,this.scene,this.renderOptions):r==="shadertoyscene"?l=await Ah(s,this.scene,this.renderOptions,i):s.endsWith("data.json")&&(l=await Ch(s,this.scene,this.renderOptions)),l?(r!==""&&this.scene.envMap===null&&this.envMaps.length>0&&this.scene.lights.length===0&&(await this.scene.addEnvMapAsync(`HDR/${this.envMaps[this.envMapIdx]}`),this.renderOptions.enableEnvMap=!0,this.renderOptions.envMapIntensity=1.5),this.scene.renderOptions=this.renderOptions,this.renderOptions.renderResolution.x=Math.floor(this.renderOptions.originalRenderResolution.x*this.renderOptions.screenZoom),this.renderOptions.renderResolution.y=Math.floor(this.renderOptions.originalRenderResolution.y*this.renderOptions.screenZoom),this.renderOptions.tileWidth=Math.floor(this.renderOptions.renderResolution.x*this.renderOptions.pixelRatio/this.renderOptions.screenZoom),this.renderOptions.tileHeight=Math.floor(this.renderOptions.renderResolution.y*this.renderOptions.pixelRatio/this.renderOptions.screenZoom),this.resizeCanvas(this.renderOptions.renderResolution.x,this.renderOptions.renderResolution.y),!0):(console.error("Unable to load scene"),!1)}async initRendererAsync(){return this.scene?(this._renderer&&this._renderer.dispose(),this._renderer=this.scene instanceof Ui?new si(this.scene):new ii(this.scene),await this.renderer.initAsync(),!0):(console.error("Scene not loaded"),!1)}render(){let e=L.gl;this.renderer.render(),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),e.viewport(0,0,this.renderOptions.renderResolution.x,this.renderOptions.renderResolution.y),this.renderer.present()}update(e,t){let n=!1;if(se.isAnyMouseDown()){if(this.scene instanceof gt){if(se.isMouseDown(0)){let i=se.getMouseDragDelta(0);this.scene.camera.offsetOrientation(i.x,i.y),se.resetMouseDragDelta(0)}else if(se.isMouseDown(1)){let i=se.getMouseDragDelta(1);this.scene.camera.setRadius(this.mouseSensitivity*i.y),se.resetMouseDragDelta(1)}else if(se.isMouseDown(2)){let i=se.getMouseDragDelta(2);this.scene.camera.strafe(this.mouseSensitivity*i.x,this.mouseSensitivity*i.y),se.resetMouseDragDelta(2)}}this.scene&&(this.scene.dirty=!0)}this.renderer.update(e,t)}resizeCanvas(e,t){let n=L.canvas;n!=null&&(n.width=e,n.style.width=e+"px",n.height=t,n.style.height=t+"px")}async resizeAsync(e,t){for(this.pauseOrContinue(!0);this.working;)await new Promise(n=>setTimeout(n,100));this.resizeCanvas(e,t),this.renderOptions.renderResolution.x=e,this.renderOptions.renderResolution.y=t,this.scene.renderOptions=this.renderOptions,await this.renderer.resizeRendererAsync(),this.emitSceneStage("launch","Lancement du rendu"),this.pauseOrContinue()}async mainLoopAsync(e){let t=L.gl;this.working=!0,this.optionsChanged&&(this.optionsChanged=!1,this.scene.dirty=!0,this.firstTime=e),this.objectPropChanged&&(this.objectPropChanged=!1,this.scene.rebuildInstances()),this.reloadShaders&&(this.reloadShaders=!1,this.scene.dirty=!0,this.firstTime=e,await this.renderer.reloadShadersAsync()),this.bench?.begin("mainLoop");let n=e;this.firstTime===void 0&&(this.firstTime=n);let i=(n-this.firstTime)/1e3,s=(n-this.lastTime)/1e3;this.lastTime=n,this.update(i,s),t.clearColor(0,0,0,0),t.clear(t.raw.COLOR_BUFFER_BIT|t.raw.DEPTH_BUFFER_BIT),t.disable(t.raw.DEPTH_TEST),this.render(),this.bench?.end("mainLoop"),this.bench?.nextFrame(e),this.working=!1,this.stopped||requestAnimationFrame(r=>{this.stopped||this.mainLoopAsync(r)})}async startSceneAsync(e){for(this.pauseOrContinue(!0);this.working;)await new Promise(n=>setTimeout(n,100));if(L.document.getElementById("textures")?.replaceChildren(),this.emitSceneStage("loading","Chargement de la scene"),!!await this.loadSceneAsync(e,this.renderOptions.flipTexturesY,this.renderOptions.useRayMarching)&&await this.initRendererAsync()){if(Ls.build(this),typeof window.loadAllShaders=="function")if(this.scene instanceof Ui&&this.scene.shadertoyShader){let n=this.scene.shadertoyShader.getAllShaders();window.loadAllShaders(n)}else window.loadAllShaders({image:""});this.emitSceneStage("launch","Lancement du rendu"),this.pauseOrContinue()}}rewind(){this.pauseOrContinue(!0),this.scene.dirty=!0,this.firstTime=performance.now(),requestAnimationFrame(e=>{this.mainLoopAsync(e),requestAnimationFrame(t=>{this.mainLoopAsync(t)})})}pauseOrContinue(e=!1){return this.stopped=!this.stopped||e,this.renderer?.pauseOrContinue(this.stopped),se.pauseOrContinue(this.stopped),this.stopped||requestAnimationFrame(async t=>{this.stopped||await this.mainLoopAsync(t)}),this.stopped}async runAsync(e){L.setInstance(e.document,e.canvas),Ls.showGui&&(this.bench=new so(L.gl.raw,{trackGPU:!0,paramLogger:(t,n,i,s,r,l,a)=>{}})),await this.getSceneFilesAsync(),await this.getEnvMapsAsync(),e.scene||(e.scene=this.shadertoyScenes.length>0?this.shadertoyScenes[0]:this.scenes.length>0?this.scenes[0]:null),e.scene&&await this.startSceneAsync(e.scene)}};export{Nn as Main};
/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

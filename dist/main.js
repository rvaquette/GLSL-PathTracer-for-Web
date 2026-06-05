import{a as tt}from"./chunks/chunk-Q4WHUCDY.js";import"./chunks/chunk-ANN5UYCF.js";var It=class{dispose(){}},zi=class extends It{name;image;rgba=null;width=null;height=null;flipY=!1;constructor(e=null,t=null){super(),this.name=e,this.image=t}},mt=class extends zi{constructor(e=null,t=null){super(e,t)}async loadTextureAsync(e){if(typeof window<"u")return new Promise((t,n)=>{let i=new Image;i.crossOrigin="anonymous",i.onload=()=>{this.name=e,this.image=i,this.width=i.width,this.height=i.height,t(!0)},i.onerror=()=>t(!1),i.src=e});try{let n=(await import("sharp")).default(e).ensureAlpha(),i=await n.metadata(),s=await n.raw().toBuffer();return this.name=e,this.image=null,this.width=i.width??null,this.height=i.height??null,this.rgba=new Uint8Array(s),!0}catch(t){return console.error("Failed to load texture in Node:",t),!1}}};var Ve=class l extends It{static _instance=null;copyAudio=!1;sampleRate=44100;playTime=180;textureDimensions=512;playSamples;audioContext;audioBuffer;buffer;internalFormat;format;gltype;constructor(){super(),this.playSamples=this.playTime*this.sampleRate,this.audioContext=new AudioContext;let e=()=>{this.audioContext.state==="suspended"&&this.audioContext.resume()};document.addEventListener("click",e,{once:!0}),document.addEventListener("keydown",e,{once:!0}),document.addEventListener("touchstart",e,{once:!0}),this.audioBuffer=this.audioContext.createBuffer(2,this.playSamples,this.sampleRate),this.buffer=new Uint8Array(this.textureDimensions*this.textureDimensions*4),this.internalFormat=P.gl.raw.RGBA8,this.format=P.gl.raw.RGBA,this.gltype=P.gl.raw.UNSIGNED_BYTE}static instance(){return l._instance||(l._instance=new l),l._instance}};async function Br(l){return(await ue(l)).ok}async function ue(l){if(/^https?:\/\//i.test(l)||typeof window<"u"){let s=await fetch(l);return{ok:s.ok,statusText:s.statusText,arrayBuffer:()=>s.arrayBuffer(),text:()=>s.text(),json:()=>s.json(),blob:()=>s.blob()}}let e=await import("fs"),t=await import("path"),n=t.join,i=t.isAbsolute;try{let s=i(l)?`.${l}`:n(process.cwd(),l);return{ok:e.existsSync(s),statusText:e.existsSync(s)?"OK":"Not Found",arrayBuffer:async()=>e.readFileSync(s).buffer,text:async()=>e.readFileSync(s,{encoding:"utf8"}),json:async()=>JSON.parse(e.readFileSync(s,{encoding:"utf8"})),blob:async()=>new Blob([e.readFileSync(s)])}}catch(s){return console.error("Failed to read local file:",l,s),{ok:!1,statusText:s.message,arrayBuffer:async()=>new ArrayBuffer(0),text:async()=>"",json:async()=>null,blob:async()=>null}}}function $c(l,e){return console.log(`Saving ${l}`),new Promise(async t=>{if(typeof window<"u"){let n=new Blob([e],{type:"application/octet-stream"}),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=l,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i),t(!0)}else{let n=await import("fs/promises");try{if(e instanceof ArrayBuffer||e instanceof SharedArrayBuffer){let i=Buffer.from(e);await n.writeFile(l,i)}else{let i=await import("path/win32");await n.writeFile(l,e,"utf8")}t(!0)}catch(i){console.error("Failed to save file:",l,i),t(!1)}}})}var Ee=class l{channel;type;filepath;sampler;id;soundTexture;audioTexture;imageTexture;imageTextures;arrayBuffer;xres;yres;internalFormat=P.gl?.raw.RGBA8;format=P.gl?.raw.RGBA;gltype=P.gl?.raw.UNSIGNED_BYTE;texture;buffer;static pauseOrContinue(e,t){let n=e.audioTexture;n&&(t?n.audio.pause():n.audio.play())}static createTexture(e){return e.imageTextures?l.createTextureFromCubemap(e):e.type==="texture"||e.type==="video"||e.type==="floats"?l.createTextureFromImage(e):e.audioTexture?l.createTextureFromAudio(e):e.type==="volume"?l.createTextureFromVolume(e):e.type==="keyboard"?l.createTextureFromKeyboard(e):null}static bindTexture(e,t){let n=P.gl;if(n.activeTexture(n.raw.TEXTURE0+e.channel),e.type==="video")l.updateTextureFromVideo(e);else if(e.type==="music")l.updateTextureFromAudio(e);else if(e.type==="keyboard")n.bindTexture(n.raw.TEXTURE_2D,e.texture);else if(e.texture)e.type==="texture"||e.type==="floats"?n.bindTexture(n.raw.TEXTURE_2D,e.texture):e.type==="cubemap"?n.bindTexture(n.raw.TEXTURE_CUBE_MAP,e.texture):e.type==="volume"&&n.bindTexture(n.raw.TEXTURE_3D,e.texture);else if(e.buffer){if(e.type==="cubeA")n.bindTexture(n.raw.TEXTURE_CUBE_MAP,e.buffer.textures[1-e.buffer.frontIndex]),e.sampler&&(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_WRAP_S,n.raw.CLAMP_TO_EDGE),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_WRAP_T,n.raw.CLAMP_TO_EDGE),e.sampler.filter==="linear"?(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR)):e.sampler.filter==="mipmap"&&(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.raw.TEXTURE_CUBE_MAP)));else if(n.bindTexture(n.raw.TEXTURE_2D,e.buffer.textures[t?1-e.buffer.frontIndex:e.buffer.frontIndex]),e.sampler){var i=n.raw.REPEAT;e.sampler.wrap==="clamp"&&(i=n.raw.CLAMP_TO_EDGE),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_S,i),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_T,i),e.sampler.filter==="linear"?(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR)):e.sampler.filter==="mipmap"&&(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.raw.TEXTURE_2D))}}}static unbindTexture(e){let t=P.gl;t.activeTexture(t.raw.TEXTURE0+e.channel),t.bindTexture(t.raw.TEXTURE_2D,null),t.bindTexture(t.raw.TEXTURE_3D,null),t.bindTexture(t.raw.TEXTURE_CUBE_MAP,null)}static createTextureFromImage(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_2D,n);let i=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.pixelStorei(t.raw.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.raw.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.raw.NONE),e.arrayBuffer?t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer):t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.format,e.gltype,e.imageTexture.image);var s=t.raw.REPEAT;return e.sampler&&e.sampler.wrap==="clamp"&&(s=t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,s),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,s),!e.sampler||e.sampler.filter==="none"?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)):e.sampler&&(e.sampler.filter==="linear"||e.type==="video")?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)):e.sampler&&e.sampler.filter==="mipmap"?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_2D)):e.sampler&&e.sampler.filter==="nearest"&&(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_2D)),t.bindTexture(t.raw.TEXTURE_2D,null),t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,!1),n}static updateTextureFromVideo(e){let t=P.gl;if(!e.imageTexture.copyVideo){t.bindTexture(t.raw.TEXTURE_2D,null);return}t.bindTexture(t.raw.TEXTURE_2D,e.texture);let n=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,n),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.format,e.gltype,e.imageTexture.image)}static createTextureFromCubemap(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_CUBE_MAP,n);let i=e.sampler&&e.sampler.vflip=="true";return t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_X,0,e.internalFormat,e.format,e.gltype,e.imageTextures[0].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_X,0,e.internalFormat,e.format,e.gltype,e.imageTextures[1].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_Y,0,e.internalFormat,e.format,e.gltype,i?e.imageTextures[3].image:e.imageTextures[2].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,e.internalFormat,e.format,e.gltype,i?e.imageTextures[2].image:e.imageTextures[3].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_Z,0,e.internalFormat,e.format,e.gltype,e.imageTextures[4].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,e.internalFormat,e.format,e.gltype,e.imageTextures[5].image),!e.sampler||e.sampler.filter==="none"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)):e.sampler&&e.sampler.filter==="linear"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)):e.sampler&&e.sampler.filter==="mipmap"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_CUBE_MAP)):e.sampler&&e.sampler.filter==="nearest"&&(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_CUBE_MAP)),t.bindTexture(t.raw.TEXTURE_CUBE_MAP,null),t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,!1),n}static createTextureFromVolume(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_3D,n),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_BASE_LEVEL,0),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAX_LEVEL,Math.log2(e.xres)),(!e.sampler||e.sampler.filter==="none")&&(t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)),e.sampler&&(e.sampler.filter==="linear"||e.sampler.filter==="mipmap")&&(t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)),t.texImage3D(t.raw.TEXTURE_3D,0,e.internalFormat,e.xres,e.yres,e.yres,0,e.format,e.gltype,e.arrayBuffer);var i=t.raw.REPEAT;return e.sampler&&e.sampler.wrap==="clamp"&&(i=t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_R,i),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_S,i),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_T,i),t.bindTexture(t.raw.TEXTURE_3D,null),n}static createTextureFromKeyboard(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,t.raw.CLAMP_TO_EDGE),t.bindTexture(t.raw.TEXTURE_2D,null),n}static updateTextureFromKeyboard(e){let t=P.gl;t.bindTexture(t.raw.TEXTURE_2D,e.texture),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer)}static createTextureFromAudio(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,null),t.bindTexture(t.raw.TEXTURE_2D,null),n}static updateTextureFromAudio(e){let t=P.gl,n=e.audioTexture;if(!n.copyAudio){t.bindTexture(t.raw.TEXTURE_2D,null);return}n.update(),t.bindTexture(t.raw.TEXTURE_2D,e.texture);let i=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.texSubImage2D(t.raw.TEXTURE_2D,0,0,0,e.xres,1,e.format,e.gltype,n.freqData),t.texSubImage2D(t.raw.TEXTURE_2D,0,0,1,e.xres,1,e.format,e.gltype,n.waveData)}},En=class l{inputs;type;code=null;shader=null;fbos=null;textures=null;flip=!1;frontIndex=0;xres;yres;soundCompiled=!1;playNode=null;time=0;static createFBOAndTexture(e,t,n,i,s){e.fbos=[],e.textures=[],e.frontIndex=0,e.type==="cubeA"?(l.createFBOTextureCubeA(e),l.createFBOTextureCubeA(e)):e.type==="sound"?l.createFBOTextureSound(e):l.createFBOTexture(e,t,n,i,s)}static createFBOTexture(e,t,n,i,s){let r=P.gl,o=r.createFramebuffer();r.bindFramebuffer(r.raw.FRAMEBUFFER,o);let a=l.createTexture(i);if((!t||!n)&&(r.framebufferTexture2D(r.raw.FRAMEBUFFER,r.raw.COLOR_ATTACHMENT0,r.raw.TEXTURE_2D,a,0),r.bindTexture(r.raw.TEXTURE_2D,null),r.bindFramebuffer(r.raw.FRAMEBUFFER,null)),e.fbos.push(o),e.textures.push(a),t){if(!n){let u=r.createFramebuffer();r.bindFramebuffer(r.raw.FRAMEBUFFER,u),e.fbos.push(u)}let c=l.createTexture(s);r.framebufferTexture2D(r.raw.FRAMEBUFFER,r.raw.COLOR_ATTACHMENT0,r.raw.TEXTURE_2D,c,0),r.bindTexture(r.raw.TEXTURE_2D,null),r.bindFramebuffer(r.raw.FRAMEBUFFER,null),e.textures.push(c)}}static createFBOTextureCubeA(e){let t=P.gl,n=l.createTextureFromCubeA(e.xres,e.yres),i=t.createFramebuffer();t.bindFramebuffer(t.raw.FRAMEBUFFER,i),t.framebufferTexture2D(t.raw.FRAMEBUFFER,t.raw.COLOR_ATTACHMENT0,t.raw.TEXTURE_CUBE_MAP_POSITIVE_X,n,0),t.bindFramebuffer(t.raw.FRAMEBUFFER,null),e.fbos.push(i),e.textures.push(n)}static createTextureFromCubeA(e,t,n="linear",i=P.gl.raw.RGBA16F,s=P.gl.raw.RGBA,r=P.gl.raw.FLOAT){let o=P.gl,a=o.createTexture();return o.bindTexture(o.raw.TEXTURE_CUBE_MAP,a),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_POSITIVE_X,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_NEGATIVE_X,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_POSITIVE_Y,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_POSITIVE_Z,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,i,e,t,0,s,r,null),n==="linear"&&(o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MAG_FILTER,o.raw.LINEAR),o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MIN_FILTER,o.raw.LINEAR)),n==="mipmap"&&(o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MAG_FILTER,o.raw.LINEAR),o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MIN_FILTER,o.raw.LINEAR_MIPMAP_LINEAR),o.generateMipmap(o.raw.TEXTURE_CUBE_MAP)),n==="nearest"&&(o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MAG_FILTER,o.raw.LINEAR),o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MIN_FILTER,o.raw.NEAREST_MIPMAP_LINEAR)),o.bindTexture(o.raw.TEXTURE_CUBE_MAP,null),a}static createTexture(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texImage2D(t.raw.TEXTURE_2D,0,t.raw.RGBA32F,e.x,e.y,0,t.raw.RGBA,t.raw.FLOAT,null),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,t.raw.CLAMP_TO_EDGE),t.bindTexture(t.raw.TEXTURE_2D,null),n}static createFBOTextureSound(e){let t=P.gl,n=t.createFramebuffer();t.bindFramebuffer(t.raw.FRAMEBUFFER,n);let i=l.createTextureFromSound();t.framebufferTexture2D(t.raw.FRAMEBUFFER,t.raw.COLOR_ATTACHMENT0,t.raw.TEXTURE_2D,i,0),t.bindFramebuffer(t.raw.FRAMEBUFFER,null),e.fbos.push(n),e.textures.push(i)}static createTextureFromSound(){let e=P.gl,t=Ve.instance(),n=e.createTexture();return e.bindTexture(e.raw.TEXTURE_2D,n),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texImage2D(e.raw.TEXTURE_2D,0,t.internalFormat,t.textureDimensions,t.textureDimensions,0,t.format,t.gltype,null),e.bindTexture(e.raw.TEXTURE_2D,null),n}static drawBuffer(e,t){e.type=="sound"&&!e.soundCompiled&&(l.drawTextureFromSound(e,t),e.soundCompiled=!0,this.pauseOrContinue(e,!1))}static pauseOrContinue(e,t){e.playNode&&(e.time=Date.now(),e.playNode.disconnect(),e.playNode.stop(),e.playNode=null),t||(e.playNode=Ve.instance().audioContext.createBufferSource(),e.playNode.buffer=Ve.instance().audioBuffer,e.playNode.connect(Ve.instance().audioContext.destination),e.time>0?e.playNode.start(Date.now()-e.time):e.playNode.start(0))}static drawTextureFromSound(e,t){let n=P.gl,i=n.getAttribLocation(t,"pos"),s=n.getUniformLocation(t,"iTimeOffset"),r=n.getUniformLocation(t,"iSampleOffset"),o=Ve.instance(),a=o.buffer,c=o.textureDimensions*o.textureDimensions,u=o.audioBuffer.getChannelData(0),h=o.audioBuffer.getChannelData(1),d=o.playSamples/c;for(let f=0;f<d;f++){let m=f*c;n.uniform1f(s,m/o.sampleRate),n.uniform1i(r,m),n.drawUnitQuad_XY(i),n.readPixels(0,0,o.textureDimensions,o.textureDimensions,n.raw.RGBA,n.raw.UNSIGNED_BYTE,a,0);for(let g=0;g<c;g++)u[m+g]=-1+2*(a[4*g+0]+256*a[4*g+1])/65535,h[m+g]=-1+2*(a[4*g+2]+256*a[4*g+3])/65535}return!0}},qn=class{constructor(e=null){e&&(this.id=e.id,this.common=e.common,this.bufferA=e.bufferA,this.bufferB=e.bufferB,this.bufferC=e.bufferC,this.bufferD=e.bufferD,this.cubeA=e.cubeA,this.sound=e.sound,this.image=e.image)}fromShadertoyJson(e){this.id=e.info?.id,this.isGlslPathtracer=e.flags?.mFlagGlslPathTracer||!1;for(let t of e.renderpass){if(t.type=="common"){this.common=!0,this.commonCode=t.code;continue}let n=new En;n.type=t.type,n.code=t.code,n.inputs=[];for(let i of t.inputs){let s=new Ee;if(s.channel=i.channel,s.type=i.type,s.id=i.id||null,i.type!=="buffer")s.filepath=i.filepath;else switch(i.filepath){case"/media/previz/buffer00.png":s.type="bufferA";break;case"/media/previz/buffer01.png":s.type="bufferB";break;case"/media/previz/buffer02.png":s.type="bufferC";break;case"/media/previz/buffer03.png":s.type="bufferD";break}s.sampler=i.sampler,n.inputs.push(s)}switch(t.name){case"Buffer A":this.bufferA=n,n.type="bufferA";break;case"Buffer B":this.bufferB=n,n.type="bufferB";break;case"Buffer C":this.bufferC=n,n.type="bufferC";break;case"Buffer D":this.bufferD=n,n.type="bufferD";break;case"Cube A":this.cubeA=n,n.type="cubeA";break;case"Sound":this.sound=n,n.type="sound";break;case"Image":this.image=n,n.type="image";break}}}id;isGlslPathtracer=!1;common=!1;bufferA;bufferB;bufferC;bufferD;cubeA;sound;image;commonCode="";buffers;imageTexture=null;tileOutputTextures=null;accumFramebuffers=null;pathTraceTextures=null;getAllShaders(){let e={};return this.common&&(e.common=this.commonCode),this.bufferA&&(e.bufferA=this.bufferA.code),this.bufferB&&(e.bufferB=this.bufferB.code),this.bufferC&&(e.bufferC=this.bufferC.code),this.bufferD&&(e.bufferD=this.bufferD.code),this.cubeA&&(e.cubeA=this.cubeA.code),this.sound&&(e.sound=this.sound.code),this.image&&(e.image=this.image.code),e}getAllInputs(e){let t=[],n=null;switch(e){case"common":break;case"bufferA":n=this.bufferA;break;case"bufferB":n=this.bufferB;break;case"bufferC":n=this.bufferC;break;case"bufferD":n=this.bufferD;break;case"cubeA":n=this.cubeA;break;case"sound":n=this.sound;break;case"image":n=this.image;break}return n&&(t=n.inputs.map(i=>({type:i.type,filepath:i.filepath,sampler:i.sampler}))),t}},ki=class{mDataView;mOffset;constructor(e){this.mDataView=e,this.mOffset=0}Seek(e){this.mOffset=e}ReadUInt8(){var e=new Uint8Array(this.mDataView,this.mOffset)[0];return this.mOffset+=1,e}ReadUInt16(){var e=new Uint16Array(this.mDataView,this.mOffset)[0];return this.mOffset+=2,e}ReadUInt32(){var e=new Uint32Array(this.mDataView,this.mOffset)[0];return this.mOffset+=4,e}ReadUInt64(){return this.ReadUInt32()+(this.ReadUInt32()<<32)}ReadFloat32(){var e=new Float32Array(this.mDataView,this.mOffset)[0];return this.mOffset+=4,e}ReadFloat32Array(e){for(var t=new Float32Array(this.mDataView,this.mOffset),n=[],i=0;i<e;i++)n[i]=t[i];return this.mOffset+=4*e,n}ReadFloat32ArrayNative(e){var t=new Float32Array(this.mDataView,this.mOffset);return this.mOffset+=4*e,t}WriteUInt8(e){new Uint8Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=1}WriteUInt16(e){new Uint16Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=2}WriteUInt32(e){new Uint32Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=4}WriteUInt64(e){this.WriteUInt32(e&4294967295),this.WriteUInt32(e>>32)}WriteFloat32(e){new Float32Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=4}WriteFloat32Array(e){for(var t=0;t<e.length;t++)this.WriteFloat32(e[t])}Save(e){return $c(e,this.mDataView)}};var Lt=class l extends It{static _instance=null;buffer;xRes;yRes;internalFormat;format;gltype;input=null;constructor(){super(),this.buffer=new Uint8Array(256*3);for(let e=0;e<256*3;e++)this.buffer[e]=0;this.xRes=256,this.yRes=3,this.internalFormat=P.gl.raw.R8,this.format=P.gl.raw.RED,this.gltype=P.gl.raw.UNSIGNED_BYTE}keydown(e){let t=e.keyCode;this.buffer[t+0*256]!=255&&(this.buffer[t+0*256]=255,this.buffer[t+1*256]=255,this.buffer[t+2*256]=255-this.buffer[t+2*256],this.input&&Ee.updateTextureFromKeyboard(this.input))}keyup(e){let t=e.keyCode;this.buffer[t+0*256]=0,this.buffer[t+1*256]=0,this.input&&Ee.updateTextureFromKeyboard(this.input)}eraseKeypresses(){for(let e=0;e<256;e++)this.buffer[e+1*256]=0;this.input&&Ee.updateTextureFromKeyboard(this.input)}static instance(){return l._instance||(l._instance=new l),l._instance}};var ee=class l{x;y;constructor(e=0,t=0){this.x=e,this.y=t}clone(){return new l(this.x,this.y)}static add(e,t){return e.add(t)}add(e){return new l(this.x+e.x,this.y+e.y)}static subtract(e,t){return e.subtract(t)}subtract(e){return new l(this.x-e.x,this.y-e.y)}scale(e){return new l(this.x*e,this.y*e*e)}};var se=class l{static _isMouseDown=!1;static _isMouseOver=!1;static _isMouseWheel=!1;static _escapePressed=!1;static _paused=!1;static buttons=0;static downPosition=new ee(0,0);static movePosition=new ee(0,0);static deltaPosition=new ee(0,0);static pauseOrContinue(e){l._paused=e}static isMouseDown(e){return l._paused?!1:e===2?l._isMouseDown&&(l.buttons&4)!==0:l._isMouseDown&&(l.buttons&e+1)!==0}static keydown(e){l._paused||(e.key==="Escape"&&An.instance.pauseOrContinue(),Lt.instance().keydown(e))}static keyup(e){l._paused||Lt.instance().keyup(e)}static mouseEnter(){l._paused||(l._isMouseOver=!0)}static mouseLeave(){l._paused||(l._isMouseOver=!1)}static mouseDown(e){l._paused||(l._isMouseDown=!0,l.buttons=e.buttons,l.downPosition=new ee(e.offsetX,P.canvas.height-e.offsetY))}static touchStart(e){l._paused||(e.preventDefault(),l._isMouseDown=!0,l.buttons=1,l.downPosition=l.getTouchCanvasPosition(e.changedTouches[0]),l.movePosition=l.downPosition)}static mouseMove(e){l._paused||l._isMouseDown&&(l.movePosition=new ee(e.offsetX,P.canvas.height-e.offsetY))}static touchMove(e){l._paused||(e.preventDefault(),l._isMouseDown&&(l.movePosition=l.getTouchCanvasPosition(e.changedTouches[0])))}static mouseUp(){l._paused||(l._isMouseDown=!1,l.downPosition=new ee(0,0))}static touchCancel(e){l._paused||(e.preventDefault(),l._isMouseDown=!1,l.downPosition=new ee(0,0))}static mouseWheel(e){l._paused||(l._isMouseWheel=!0,l.deltaPosition=new ee(e.deltaX,e.deltaY))}static isAnyMouseDown(){return l._paused?!1:l._isMouseDown}static getMouseDragDelta(e){return l.isMouseDown(e)?new ee(l.movePosition.x-l.downPosition.x,l.movePosition.y-l.downPosition.y):new ee(0,0)}static resetMouseDragDelta(e){l.isMouseDown(e)&&(l.downPosition=l.movePosition)}static getTouchCanvasPosition(e){let t=P.canvas;if(!t)return new ee(0,0);let n=t.getBoundingClientRect(),i=(e.clientX-n.left)*(t.width/n.width),s=(e.clientY-n.top)*(t.height/n.height);return new ee(i,t.height-s)}};var P=class l{static _instance=null;document;canvas;gl;constructor(e,t){this.document=e,this.canvas=t,this.canvas.tabIndex=0;var n={alpha:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"};let i=t.getContext("webgl2",n);if(!i)throw new Error("WebGL2 not supported");this.gl=new tt(i),this.gl.getExtension("OES_texture_float_linear"),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("OES_texture_half_float_linear"),tt.profiling&&this.gl.getExtension("WEBGL_debug_shaders"),this.gl.raw.hint(this.gl.raw.FRAGMENT_SHADER_DERIVATIVE_HINT,this.gl.raw.NICEST);let s=i.getSupportedExtensions();console.log(`Available WebGL extensions:
`,s.join(`
`)),window.addEventListener("resize",async r=>{}),this.canvas.addEventListener("keydown",async r=>{se.keydown(r),r.preventDefault()},!1),this.canvas.addEventListener("keyup",async r=>{se.keyup(r),r.preventDefault()},!1),this.canvas.onmousedown=function(r){se.mouseDown(r)},this.canvas.onmouseenter=function(r){se.mouseEnter()},this.canvas.onmouseleave=function(r){se.mouseLeave()},this.canvas.onmousemove=function(r){se.mouseMove(r)},this.canvas.onmouseup=function(r){se.mouseUp()},this.canvas.onwheel=function(r){se.mouseWheel(r)},this.canvas.ontouchstart=function(r){se.touchStart(r)},this.canvas.ontouchmove=function(r){se.touchMove(r)},this.canvas.ontouchcancel=function(r){se.touchCancel(r)}}static get document(){return l._instance==null?null:l._instance.document}static get canvas(){return l._instance==null?null:l._instance.canvas}static get gl(){return l._instance==null?null:l._instance.gl}static setInstance(e,t){l._instance=new l(e,t)}};var _=class l{x;y;z;constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}toArray(){return[this.x,this.y,this.z]}clone(){return new l(this.x,this.y,this.z)}static fromVec4(e){return new l(e.x,e.y,e.z)}multiply(e){return new l(this.x*e.x,this.y*e.y,this.z*e.z)}static add(e,t){return e.add(t)}add(e){return new l(this.x+e.x,this.y+e.y,this.z+e.z)}static subtract(e,t){return e.subtract(t)}subtract(e){return new l(this.x-e.x,this.y-e.y,this.z-e.z)}static scale(e,t){return e.scale(t)}scale(e){return new l(this.x*e,this.y*e,this.z*e)}get(e){return e===0?this.x:e===1?this.y:this.z}set(e,t){e===0?this.x=t:e===1?this.y=t:this.z=t}static log(e){return new l(Math.log(e.x),Math.log(e.y),Math.log(e.z))}static negate(e){return new l(-e.x,-e.y,-e.z)}static min(e,t){return new l(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z))}static max(e,t){return new l(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))}static cross(e,t){return new l(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x)}static pow(e,t){return new l(Math.pow(e.x,t),Math.pow(e.y,t),Math.pow(e.z,t))}static Length(e){return Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)}static dot(e,t){return e.x*t.x+e.y*t.y+e.z*t.z}static distance(e,t){return l.Length(e.subtract(t))}static clamp(e,t,n){return new l(Math.max(t.x,Math.min(e.x,n.x)),Math.max(t.y,Math.min(e.y,n.y)),Math.max(t.z,Math.min(e.z,n.z)))}static normalize(e){let t=l.Length(e);return new l(e.x/t,e.y/t,e.z/t)}};var jn=class{renderResolution;screenZoom;originalRenderResolution;uniformLightCol;backgroundCol;tileWidth;tileHeight;maxDepth;maxSpp;RRDepth;texArrayWidth;texArrayHeight;enableRR;enableDenoiser;denoiserFrameCnt;enableTonemap;enableAces;simpleAcesFit;openglNormalMap;enableEnvMap;enableUniformLight;hideEmitters;enableBackground;transparentBackground;independentRenderSize;enableRoughnessMollification;enableVolumeMIS;envMapIntensity;envMapRot;roughnessMollificationAmt;pixelRatio;sssMode;flipTexturesY=!1;useRayMarching=!1;useThinFilmLUT=!0;constructor(){this.renderResolution=new ee(1280,720),this.originalRenderResolution=new ee(1280,720),this.screenZoom=1,this.uniformLightCol=new _(.3,.3,.3),this.backgroundCol=new _(1,1,1),this.tileWidth=100,this.tileHeight=100,this.maxDepth=2,this.maxSpp=-1,this.RRDepth=2,this.texArrayWidth=2048,this.texArrayHeight=2048,this.enableRR=!0,this.enableDenoiser=!1,this.denoiserFrameCnt=10,this.enableTonemap=!0,this.enableAces=!1,this.simpleAcesFit=!1,this.openglNormalMap=!0,this.enableEnvMap=!1,this.enableUniformLight=!1,this.hideEmitters=!1,this.enableBackground=!1,this.transparentBackground=!1,this.independentRenderSize=!1,this.enableRoughnessMollification=!1,this.enableVolumeMIS=!1,this.envMapIntensity=1,this.envMapRot=0,this.roughnessMollificationAmt=0,this.pixelRatio=.25,this.sssMode=0}};var Or=class{constructor(e){this.shaders=e;if(this.gl=P.gl,this.program=this.gl.createProgram(),!this.program)throw new Error("Unable to create WebGL program.");for(let t of e)this.gl.attachShader(this.program,t.getObject());this.gl.linkProgram(this.program)}shaders;gl;program;linked=!1;async waitForLinkAsync(){if(this.linked)return;let e=this.gl.getExtension("KHR_parallel_shader_compile");if(e)for(;!this.gl.getProgramParameter(this.program,e.COMPLETION_STATUS_KHR);)await new Promise(n=>setTimeout(n,0));for(let t of this.shaders)this.gl.detachShader(this.program,t.getObject());if(!this.gl.getProgramParameter(this.program,this.gl.raw.LINK_STATUS)){let t=this.gl.getProgramInfoLog(this.program);throw this.gl.deleteProgram(this.program),new Error(`Error linking program: ${t}`)}this.linked=!0}use(){if(!this.linked)throw new Error("Program not linked yet");this.gl.useProgram(this.program)}stopUsing(){this.gl.useProgram(null)}getObject(){return this.program}dispose(){this.gl.deleteProgram(this.program)}};var Gr=class{gl;vao=null;vbo=null;constructor(){this.gl=P.gl,this.vao=this.gl.createVertexArray(),this.vbo=this.gl.createBuffer(),this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.raw.ARRAY_BUFFER,this.vbo);let e=new Float32Array([-1,1,0,1,-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,-1,1,0,1,1,1,1]);this.gl.bufferData(this.gl.raw.ARRAY_BUFFER,e,this.gl.raw.STATIC_DRAW),this.gl.enableVertexAttribArray(0),this.gl.vertexAttribPointer(0,2,this.gl.raw.FLOAT,!1,4*Float32Array.BYTES_PER_ELEMENT,0),this.gl.enableVertexAttribArray(1),this.gl.vertexAttribPointer(1,2,this.gl.raw.FLOAT,!1,4*Float32Array.BYTES_PER_ELEMENT,2*Float32Array.BYTES_PER_ELEMENT),this.gl.bindVertexArray(null)}draw(e){e.use(),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.raw.TRIANGLES,0,6),this.gl.bindVertexArray(null),e.stopUsing()}};var Vi=class{shader;constructor(e,t){let n=P.gl;if(this.shader=n.createShader(t),console.log(`Compiling Shader ${e.path}`),n.shaderSource(this.shader,e.src),n.compileShader(this.shader),!n.getShaderParameter(this.shader,n.raw.COMPILE_STATUS)){let s=n.getShaderInfoLog(this.shader)||"Unknown error";n.deleteShader(this.shader),this.shader=null;let r=`Shader compilation error in ${e.path}
${e.src}
${s}`;throw alert(e.path+" : "+s),console.error(r),new Error(r)}}getObject(){if(!this.shader)throw new Error("Shader object is null.");return this.shader}};var Te=class l{static async loadAsync(e,t=!1,n="#include"){n+=" ";let i;try{if(i=await ue(e),!i.ok)throw new Error}catch{return console.error(`ERROR: could not open the shader at: ${e}`),{src:"",path:e,dump:t}}let s=await i.text();return await l.loadShaderSourceAsync(s,e,t,n)}static async loadShaderSourceAsync(e,t,n=!1,i="#include"){let s=e.split(/\r?\n/),r="";for(let o of s){if(o.includes(i)){let a=o.replace(i,"").trim().replace(/["<>]/g,""),c=l.resolveRelativePath(t,a),u=await l.loadAsync(c,n,i.trim());r+=u.src;continue}r+=o+`
`}return{src:r,path:t,dump:n}}static resolveRelativePath(e,t){return t.startsWith("http://")||t.startsWith("https://")?new URL(t,e).toString():t.startsWith("/")?t:e.substring(0,e.lastIndexOf("/")+1)+t}};var Qt=class l{static maxBufferTextureWidth=4096;gl;_scene;shadersDirectory;programs=[];quad;pixelRatio;_sampleCounter=1;get sampleCounter(){return this._sampleCounter}set sampleCounter(e){this._sampleCounter=e}currentBuffer=0;frameCounter=1;_renderSize=new ee(0,0);tileWidth=0;tileHeight=0;invNumTiles=new ee(0,0);numTiles=new ee(0,0);tile=new ee(0,0);outputFBO=null;denoiserFBO=null;outputShader=null;denoised=!1;stopRequested=!1;constructor(e){this._scene=e}emitSceneStage(e,t){typeof window>"u"||window.dispatchEvent(new CustomEvent("scene-stage",{detail:{stage:e,message:t}}))}get scene(){return this._scene}get renderSize(){return this._renderSize}consumeStopRequested(){let e=this.stopRequested;return this.stopRequested=!1,e}async initAsync(){this.gl=P.gl,this.shadersDirectory="./shaders/",this.stopRequested=!1,this.quad=new Gr,this.pixelRatio=this.scene.renderOptions.pixelRatio,this.emitSceneStage("processing","Traitement de la scene"),this.scene.initialized||await this.scene.processSceneAsync(),this.initFBOs(),await this.initShadersAsync()}createTexture(e,t,n,i,s,r){let o=this.gl,a=o.createTexture();return o.bindTexture(o.raw.TEXTURE_2D,a),o.texImage2D(o.raw.TEXTURE_2D,0,e,t,n,0,i,s,r),o.texParameteri(o.raw.TEXTURE_2D,o.raw.TEXTURE_WRAP_S,o.raw.CLAMP_TO_EDGE),o.texParameteri(o.raw.TEXTURE_2D,o.raw.TEXTURE_WRAP_T,o.raw.CLAMP_TO_EDGE),o.texParameteri(o.raw.TEXTURE_2D,o.raw.TEXTURE_MAG_FILTER,o.raw.NEAREST),o.texParameteri(o.raw.TEXTURE_2D,o.raw.TEXTURE_MIN_FILTER,o.raw.NEAREST),o.bindTexture(o.raw.TEXTURE_2D,null),a}createBufferTexture(e,t){let n=this.gl,i=e.length/t,s=Math.min(l.maxBufferTextureWidth,i),r=Math.ceil(i/s);if(s*r*t!==e.length){let o=new Float32Array(s*r*t);o.set(e),e=o}return this.createTexture(t==4?n.raw.RGBA32F:n.raw.RGB32F,s,r,t==4?n.raw.RGBA:n.raw.RGB,n.raw.FLOAT,e)}createBufferTextureInt(e,t){let n=this.gl,i=e.length/t,s=Math.min(l.maxBufferTextureWidth,i),r=Math.ceil(i/s);if(s*r*t!==e.length){let o=new Int32Array(s*r*t);o.set(e),e=o}return this.createTexture(t==4?n.raw.RGBA32I:n.raw.RGB32I,s,r,t==4?n.raw.RGBA_INTEGER:n.raw.RGB_INTEGER,n.raw.INT,e)}createBufferTextureUint(e,t){let n=this.gl,i=e.length/t,s=this.scene.renderOptions.texArrayWidth,r=Math.ceil(i/s);return this.createTexture(t==4?n.raw.RGBA8UI:n.raw.RGB8UI,s,r,t==4?n.raw.RGBA_INTEGER:n.raw.RGB_INTEGER,n.raw.UNSIGNED_BYTE,e)}dispose(){let e=this.gl;this.outputFBO&&(e.deleteFramebuffer(this.outputFBO),this.outputFBO=null),this.denoiserFBO&&(e.deleteFramebuffer(this.denoiserFBO),this.denoiserFBO=null),this.outputShader&&(this.outputShader.dispose(),this.outputShader=null),this.programs.forEach(t=>t.dispose()),this.programs=[]}async resizeRendererAsync(){let e=this.gl;this.dispose(),this.initFBOs(),await this.initShadersAsync()}pauseOrContinue(e){}initFBOs(){}initFBOs_(e){let t=this.gl;this.sampleCounter=1,this.currentBuffer=0,this.frameCounter=1,this._renderSize=this.scene.renderOptions.renderResolution,e&&(this.tileWidth=this.scene.renderOptions.tileWidth,this.tileHeight=this.scene.renderOptions.tileHeight,this.invNumTiles.x=this.tileWidth/this.renderSize.x,this.invNumTiles.y=this.tileHeight/this.renderSize.y,this.numTiles.x=Math.ceil(this.renderSize.x/this.tileWidth),this.numTiles.y=Math.ceil(this.renderSize.y/this.tileHeight),this.tile.x=-1,this.tile.y=this.numTiles.y-1),console.log("Render Resolution :",this.renderSize.x,this.renderSize.y),console.log("Preview Resolution :",Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),e&&console.log("Tile Size :",this.tileWidth,this.tileHeight)}disposeShaders(){this.outputShader&&(this.outputShader.dispose(),this.outputShader=null),this.programs.forEach(e=>e.dispose()),this.programs=[]}async reloadShadersAsync(){this.disposeShaders(),await this.initShadersAsync()}loadShaders(e,t){let n=this.gl,i=[];i.push(new Vi(e,n.raw.VERTEX_SHADER)),i.push(new Vi(t,n.raw.FRAGMENT_SHADER));let s=new Or(i);return this.programs.push(s),s}async initShadersAsync(){this.emitSceneStage("compile","Compilation des shaders");let[e,t]=await Promise.all([Te.loadAsync(this.shadersDirectory+"common/vertex.glsl"),Te.loadAsync(this.shadersDirectory+"output.glsl")]);this.outputShader=this.loadShaders(e,t)}render(){}present(){}getProgress(){let e=this.scene.renderOptions.maxSpp;return e<=0?0:this.sampleCounter*100/e}getSampleCount(){return this.sampleCounter}exportTextureToImage(e,t,n,i){if(!e){console.error("Cannot export null texture");return}let s=this.gl,r=s.createFramebuffer();if(s.bindFramebuffer(s.raw.FRAMEBUFFER,r),s.framebufferTexture2D(s.raw.FRAMEBUFFER,s.raw.COLOR_ATTACHMENT0,s.raw.TEXTURE_2D,e,0),s.raw.checkFramebufferStatus(s.raw.FRAMEBUFFER)!==s.raw.FRAMEBUFFER_COMPLETE){console.error("Framebuffer is not complete"),s.bindFramebuffer(s.raw.FRAMEBUFFER,null),s.deleteFramebuffer(r);return}let o=new Float32Array(t*n*4);s.raw.readPixels(0,0,t,n,s.raw.RGBA,s.raw.FLOAT,o);let a=new Uint8Array(t*n*4);for(let f=0;f<o.length;f++)a[f]=Math.min(255,Math.max(0,Math.floor(o[f]*255)));s.bindFramebuffer(s.raw.FRAMEBUFFER,null),s.deleteFramebuffer(r);let c=document.createElement("canvas");c.width=t,c.height=n,c.style.border="2px solid black";let u=c.getContext("2d");if(!u){console.error("Cannot get 2D context from canvas");return}let h=u.createImageData(t,n);for(let f=0;f<n;f++)for(let m=0;m<t;m++){let g=(f*t+m)*4,p=((n-1-f)*t+m)*4;h.data[p]=a[g],h.data[p+1]=a[g+1],h.data[p+2]=a[g+2],h.data[p+3]=a[g+3]}u.putImageData(h,0,0),P.document.getElementById(i)?.appendChild(c)}async update(e,t){}};var zr="/*__PROCEDURAL_MATERIAL_INJECTION__*/",kr="/*__PROCEDURAL_ENV_INJECTION__*/",Kn=class l extends Qt{_denoiserRunning=!1;backendReady=!1;denoiser=null;denoiserExecutedOneTime=!1;denoiserTexture=null;denoiserInputFramePtr=null;BVHTex=null;vertexIndicesTex=null;verticesTex=null;normalsTex=null;materialsTex=null;transformsTex=null;lightsTex=null;textureMapsArrayTex=null;envMapTex=null;envMapCDFTex=null;thinFilmLutTex=null;pathTraceTextureLowRes=null;pathTraceTexture=null;accumTexture=null;tileOutputTexture=[null,null];pathTraceFBO=null;pathTraceFBOLowRes=null;accumFBO=null;pathTraceShader=null;pathTraceShaderLowRes=null;tonemapShader=null;_initDenoiserAsync(e){if(typeof document>"u"){this.scene.renderOptions.enableDenoiser=!1,this.backendReady=!0;return}import("./chunks/denoiser-R4B6EPN5.js").then(t=>{let n=t.Denoiser;if(!n)throw new Error("Denoiser export not found.");let i=document.getElementById("_denoiserOutput");i===null&&(i=document.createElement("canvas"),i.id="_denoiserOutput",i.style.display="none",document.body.appendChild(i)),this.denoiser=new n("webgl",i),this.denoiser.onBackendReady(()=>{this.denoiser&&(this.denoiser.useTiling=!0,this.denoiser.onExecute(s=>{!this.denoiserFBO||!this.denoiserTexture||(e.bindFramebuffer(e.raw.FRAMEBUFFER,this.denoiserFBO),e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture),e.texSubImage2D(e.raw.TEXTURE_2D,0,0,0,this.denoiser.width,this.denoiser.height,e.raw.RGBA,e.raw.FLOAT,s),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.denoiserExecutedOneTime||(this.denoiserExecutedOneTime=!0))},"float32"),this.backendReady=!0)})}).catch(t=>{console.warn("Denoiser disabled (module load failed):",t),this.scene.renderOptions.enableDenoiser=!1,this.backendReady=!0,this.denoiser=null})}constructor(e){super(e)}dispose(){super.dispose();let e=this.gl;this.pathTraceTexture&&(e.deleteTexture(this.pathTraceTexture),this.pathTraceTexture=null),this.pathTraceTextureLowRes&&(e.deleteTexture(this.pathTraceTextureLowRes),this.pathTraceTextureLowRes=null),this.accumTexture&&(e.deleteTexture(this.accumTexture),this.accumTexture=null),this.tileOutputTexture[0]&&(e.deleteTexture(this.tileOutputTexture[0]),this.tileOutputTexture[0]=null),this.tileOutputTexture[1]&&(e.deleteTexture(this.tileOutputTexture[1]),this.tileOutputTexture[1]=null),this.denoiserTexture&&(e.deleteTexture(this.denoiserTexture),this.denoiserTexture=null),this.BVHTex&&(e.deleteTexture(this.BVHTex),this.BVHTex=null),this.vertexIndicesTex&&(e.deleteTexture(this.vertexIndicesTex),this.vertexIndicesTex=null),this.verticesTex&&(e.deleteTexture(this.verticesTex),this.verticesTex=null),this.normalsTex&&(e.deleteTexture(this.normalsTex),this.normalsTex=null),this.materialsTex&&(e.deleteTexture(this.materialsTex),this.materialsTex=null),this.transformsTex&&(e.deleteTexture(this.transformsTex),this.transformsTex=null),this.lightsTex&&(e.deleteTexture(this.lightsTex),this.lightsTex=null),this.textureMapsArrayTex&&(e.deleteTexture(this.textureMapsArrayTex),this.textureMapsArrayTex=null),this.envMapTex&&(e.deleteTexture(this.envMapTex),this.envMapTex=null),this.envMapCDFTex&&(e.deleteTexture(this.envMapCDFTex),this.envMapCDFTex=null),this.thinFilmLutTex&&(e.deleteTexture(this.thinFilmLutTex),this.thinFilmLutTex=null),this.denoiser&&(this.denoiser.dispose(),this.denoiser=null),this.pathTraceFBO&&(e.deleteFramebuffer(this.pathTraceFBO),this.pathTraceFBO=null),this.pathTraceFBOLowRes&&(e.deleteFramebuffer(this.pathTraceFBOLowRes),this.pathTraceFBOLowRes=null),this.accumFBO&&(e.deleteFramebuffer(this.accumFBO),this.accumFBO=null),this.pathTraceShader&&(this.pathTraceShader.dispose(),this.pathTraceShader=null),this.pathTraceShaderLowRes&&(this.pathTraceShaderLowRes.dispose(),this.pathTraceShaderLowRes=null),this.tonemapShader&&(this.tonemapShader.dispose(),this.tonemapShader=null)}initFBOs(){super.initFBOs_(!0);let e=this.gl;this.pathTraceFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBO),this.pathTraceTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.tileWidth,this.tileHeight,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.pathTraceTexture,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.pathTraceFBOLowRes=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),this.pathTraceTextureLowRes=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio),0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.pathTraceTextureLowRes,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.accumFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.accumFBO),this.accumTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.accumTexture,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.outputFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),this.tileOutputTexture[0]=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[0]),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),this.tileOutputTexture[1]=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[1]),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.tileOutputTexture[this.currentBuffer],0),this.backendReady=!this.scene.renderOptions.enableDenoiser,this.denoiserInputFramePtr=new Float32Array(this.renderSize.x*this.renderSize.y*4),this.denoiserTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),this.denoiserFBO=e.createFramebuffer(),this.scene.renderOptions.enableDenoiser&&this._initDenoiserAsync(e),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}disposeShaders(){super.disposeShaders(),this.pathTraceShader&&(this.pathTraceShader.dispose(),this.pathTraceShader=null),this.pathTraceShaderLowRes&&(this.pathTraceShaderLowRes.dispose(),this.pathTraceShaderLowRes=null),this.tonemapShader&&(this.tonemapShader.dispose(),this.tonemapShader=null)}async initShadersAsync(){await super.initShadersAsync();let e=this.gl,t=this.scene,[n,i,s,r,o]=await Promise.all([Te.loadAsync(this.shadersDirectory+"common/vertex.glsl"),Te.loadAsync(this.shadersDirectory+"tile.glsl"),Te.loadAsync(this.shadersDirectory+"preview.glsl"),Te.loadAsync(this.shadersDirectory+"output.glsl"),Te.loadAsync(this.shadersDirectory+"tonemap.glsl")]),a=this.scene.proceduralMaterialGlsl?.trim().length?`${this.scene.proceduralMaterialGlsl}
`:"",c=this.scene.proceduralEnvGlsl?.trim().length?`${this.scene.proceduralEnvGlsl}
`:"";i.src=i.src.replace(zr,a+zr),s.src=s.src.replace(zr,a+zr),i.src=i.src.replace(kr,c+kr),s.src=s.src.replace(kr,c+kr);let[u,h]=this.scene.getDefines();function d(g,p){let x=g.src.indexOf("#version");if(x!==-1){let y=g.src.indexOf(`
`,x);g.src=g.src.slice(0,y+1)+p+g.src.slice(y+1)}else g.src=p+g.src}d(i,u),d(s,u),d(o,h),this.outputShader=this.loadShaders(n,r),this.tonemapShader=this.loadShaders(n,o),this.pathTraceShader=this.loadShaders(n,i),this.pathTraceShaderLowRes=this.loadShaders(n,s);let f=await Promise.all(this.programs.map(g=>(console.log("Linking program..."),g.waitForLinkAsync())));console.log();let m;this.pathTraceShader.use(),m=this.pathTraceShader.getObject(),t.envMap&&(e.uniform2f(e.raw.getUniformLocation(m,"envMapRes"),t.envMap.width,t.envMap.height),e.uniform1f(e.raw.getUniformLocation(m,"envMapTotalSum"),t.envMap.totalSum)),e.uniform1i(e.raw.getUniformLocation(m,"topBVHIndex"),t.topLevelIndex),e.uniform2f(e.raw.getUniformLocation(m,"resolution"),this.renderSize.x,this.renderSize.y),e.uniform2f(e.raw.getUniformLocation(m,"invNumTiles"),this.invNumTiles.x,this.invNumTiles.y),e.uniform1i(e.raw.getUniformLocation(m,"numOfLights"),t.lights.length),e.uniform1i(e.raw.getUniformLocation(m,"accumTexture"),0),e.uniform1i(e.raw.getUniformLocation(m,"BVH"),1),e.uniform1i(e.raw.getUniformLocation(m,"vertexIndicesTex"),2),e.uniform1i(e.raw.getUniformLocation(m,"verticesTex"),3),e.uniform1i(e.raw.getUniformLocation(m,"normalsTex"),4),e.uniform1i(e.raw.getUniformLocation(m,"materialsTex"),5),e.uniform1i(e.raw.getUniformLocation(m,"transformsTex"),6),e.uniform1i(e.raw.getUniformLocation(m,"lightsTex"),7),e.uniform1i(e.raw.getUniformLocation(m,"textureMapsArrayTex"),8),e.uniform1i(e.raw.getUniformLocation(m,"envMapTex"),9),e.uniform1i(e.raw.getUniformLocation(m,"envMapCDFTex"),10),e.uniform1i(e.raw.getUniformLocation(m,"thinFilmLutTex"),11),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),m=this.pathTraceShaderLowRes.getObject(),t.envMap&&(e.uniform2f(e.raw.getUniformLocation(m,"envMapRes"),t.envMap.width,t.envMap.height),e.uniform1f(e.raw.getUniformLocation(m,"envMapTotalSum"),t.envMap.totalSum)),e.uniform1i(e.raw.getUniformLocation(m,"topBVHIndex"),t.topLevelIndex),e.uniform2f(e.raw.getUniformLocation(m,"resolution"),this.renderSize.x,this.renderSize.y),e.uniform1i(e.raw.getUniformLocation(m,"numOfLights"),t.lights.length),e.uniform1i(e.raw.getUniformLocation(m,"accumTexture"),0),e.uniform1i(e.raw.getUniformLocation(m,"BVH"),1),e.uniform1i(e.raw.getUniformLocation(m,"vertexIndicesTex"),2),e.uniform1i(e.raw.getUniformLocation(m,"verticesTex"),3),e.uniform1i(e.raw.getUniformLocation(m,"normalsTex"),4),e.uniform1i(e.raw.getUniformLocation(m,"materialsTex"),5),e.uniform1i(e.raw.getUniformLocation(m,"transformsTex"),6),e.uniform1i(e.raw.getUniformLocation(m,"lightsTex"),7),e.uniform1i(e.raw.getUniformLocation(m,"textureMapsArrayTex"),8),e.uniform1i(e.raw.getUniformLocation(m,"envMapTex"),9),e.uniform1i(e.raw.getUniformLocation(m,"envMapCDFTex"),10),e.uniform1i(e.raw.getUniformLocation(m,"thinFilmLutTex"),11),this.pathTraceShaderLowRes.stopUsing()}get scene(){return this._scene}async initAsync(){await super.initAsync(),this.initGPUDataBuffers()}async resizeRendererAsync(){await super.resizeRendererAsync(),this.initGPUDataBuffers()}static buildThinFilmLut(e,t,n=1.5,i=1.5){let o=[700,546,436],a=2*Math.PI,c=new Float32Array(e*t*3);function u(h,d,f){let m=Math.sqrt(Math.max(0,1-h*h)),g=d/f*m;if(g>=1)return 1;let p=Math.sqrt(Math.max(0,1-g*g)),x=(d*h-f*p)/(d*h+f*p),y=(f*h-d*p)/(f*h+d*p);return .5*(x*x+y*y)}for(let h=0;h<t;h++)for(let d=0;d<e;d++){let f=(d+.5)/e,m=(h+.5)/t*1200,g=(h*e+d)*3,x=Math.sqrt(Math.max(0,1-f*f))*1/n,y=Math.sqrt(Math.max(0,1-x*x)),b=u(f,1,n),T=1-b,M=u(y,n,i);for(let w=0;w<3;w++){let v=o[w],S=a*n*m*y/v,R=1-b*M*Math.cos(2*S),D=b*b+T*T*M+2*b*T*M*Math.cos(S);c[g+w]=Math.max(0,Math.min(1,D/Math.max(R,1e-5)))}}return c}initGPUDataBuffers(){let e=this.gl;e.pixelStorei(e.raw.PACK_ALIGNMENT,1);let t=this.scene.bvhData();this.BVHTex=this.createBufferTexture(t,3);let n=this.scene.vertIndicesData();this.vertexIndicesTex=this.createBufferTextureInt(n,3);let i=this.scene.verticesData();this.verticesTex=this.createBufferTexture(i,4);let s=this.scene.normalsData();this.normalsTex=this.createBufferTexture(s,4);{let r=this.scene.materialsData();this.materialsTex=this.createBufferTexture(r,4)}{let r=this.scene.transformsData();this.transformsTex=this.createBufferTexture(r,4)}if(this.scene.lights.length>0){let r=this.scene.lightsData();this.lightsTex=this.createBufferTexture(r,3)}if(this.scene.textures.length>0||this.scene.textureMapsArray?.length>0){let r=this.scene.textureMapsArray;this.textureMapsArrayTex=this.createBufferTextureUint(r,4)}if(this.scene.envMap){let r=this.scene.envMap;this.envMapTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGB32F,r.width,r.height,0,e.raw.RGB,e.raw.FLOAT,r.img),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.LINEAR),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.LINEAR),e.bindTexture(e.raw.TEXTURE_2D,null),this.envMapCDFTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapCDFTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.R32F,r.width,r.height,0,e.raw.RED,e.raw.FLOAT,r.cdf),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.bindTexture(e.raw.TEXTURE_2D,null)}e.activeTexture(e.raw.TEXTURE1),e.bindTexture(e.raw.TEXTURE_2D,this.BVHTex),e.activeTexture(e.raw.TEXTURE2),e.bindTexture(e.raw.TEXTURE_2D,this.vertexIndicesTex),e.activeTexture(e.raw.TEXTURE3),e.bindTexture(e.raw.TEXTURE_2D,this.verticesTex),e.activeTexture(e.raw.TEXTURE4),e.bindTexture(e.raw.TEXTURE_2D,this.normalsTex),e.activeTexture(e.raw.TEXTURE5),e.bindTexture(e.raw.TEXTURE_2D,this.materialsTex),e.activeTexture(e.raw.TEXTURE6),e.bindTexture(e.raw.TEXTURE_2D,this.transformsTex),e.activeTexture(e.raw.TEXTURE7),e.bindTexture(e.raw.TEXTURE_2D,this.lightsTex),e.activeTexture(e.raw.TEXTURE8),e.bindTexture(e.raw.TEXTURE_2D,this.textureMapsArrayTex),e.activeTexture(e.raw.TEXTURE9),e.bindTexture(e.raw.TEXTURE_2D,this.envMapTex),e.activeTexture(e.raw.TEXTURE10),e.bindTexture(e.raw.TEXTURE_2D,this.envMapCDFTex);{let o=l.buildThinFilmLut(64,64);this.thinFilmLutTex&&e.deleteTexture(this.thinFilmLutTex),this.thinFilmLutTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.thinFilmLutTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGB32F,64,64,0,e.raw.RGB,e.raw.FLOAT,o),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.LINEAR),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.LINEAR),e.bindTexture(e.raw.TEXTURE_2D,null),e.activeTexture(e.raw.TEXTURE11),e.bindTexture(e.raw.TEXTURE_2D,this.thinFilmLutTex)}}render(){let e=this.gl;if(!(!this.scene.dirty&&this.scene.renderOptions.maxSpp!==-1&&this.sampleCounter>=this.scene.renderOptions.maxSpp)){if(e.activeTexture(e.raw.TEXTURE0),this.scene.dirty)e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),this.quad.draw(this.pathTraceShaderLowRes),this.scene.instancesModified=!1,this.scene.dirty=!1,this.scene.envMapModified=!1;else{let t=[],n=0,i=0;e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBO),e.viewport(0,0,this.tileWidth,this.tileHeight),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),n=performance.now(),this.quad.draw(this.pathTraceShader),i=performance.now(),t.push(`pathTraceShader: Render time: ${(i-n).toFixed(2)} ms`),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.accumFBO),e.viewport(this.tileWidth*this.tile.x,this.tileHeight*this.tile.y,this.tileWidth,this.tileHeight),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTexture),n=performance.now(),this.quad.draw(this.outputShader),i=performance.now(),t.push(`outputShader: Render time: ${(i-n).toFixed(2)} ms`),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.tileOutputTexture[this.currentBuffer],0),e.viewport(0,0,this.renderSize.x,this.renderSize.y),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),n=performance.now(),this.quad.draw(this.tonemapShader),i=performance.now(),t.push(`tonemapShader: Render time: ${(i-n).toFixed(2)} ms`),console.info(t.join(`
`))}e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),this.scene.dirty||this.sampleCounter===1?(e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),this.quad.draw(this.tonemapShader)):(this.scene.renderOptions.enableDenoiser&&this.denoiserExecutedOneTime&&this.denoiserTexture?e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture):e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[1-this.currentBuffer]),this.quad.draw(this.outputShader))}async update(e,t){let n=this.gl,i=this.scene;if(!i.dirty&&i.renderOptions.maxSpp!==-1&&this.sampleCounter>=i.renderOptions.maxSpp)return;if(i.instancesModified){let r=this.scene.transformsData(),o=r.length/4,a=Math.min(Qt.maxBufferTextureWidth,o),c=Math.ceil(o/a);n.bindTexture(n.raw.TEXTURE_2D,this.transformsTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGBA32F,a,c,0,n.raw.RGBA,n.raw.FLOAT,r);let u=this.scene.materialsData(),h=u.length/4,d=Math.min(Qt.maxBufferTextureWidth,h),f=Math.ceil(h/d);n.bindTexture(n.raw.TEXTURE_2D,this.materialsTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGBA32F,d,f,0,n.raw.RGBA,n.raw.FLOAT,u)}if(i.envMapModified&&i.envMap){let r=i.envMap;this.envMapTex&&(n.bindTexture(n.raw.TEXTURE_2D,this.envMapTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGB32F,r.width,r.height,0,n.raw.RGB,n.raw.FLOAT,r.img)),this.envMapCDFTex&&(n.bindTexture(n.raw.TEXTURE_2D,this.envMapCDFTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.R32F,r.width,r.height,0,n.raw.RED,n.raw.FLOAT,r.cdf));let o;this.pathTraceShader&&this.pathTraceShaderLowRes&&(this.pathTraceShader.use(),o=this.pathTraceShader.getObject(),n.uniform2f(n.raw.getUniformLocation(o,"envMapRes"),i.envMap.width,i.envMap.height),n.uniform1f(n.raw.getUniformLocation(o,"envMapTotalSum"),i.envMap.totalSum),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),o=this.pathTraceShaderLowRes.getObject(),n.uniform2f(n.raw.getUniformLocation(o,"envMapRes"),i.envMap.width,i.envMap.height),n.uniform1f(n.raw.getUniformLocation(o,"envMapTotalSum"),i.envMap.totalSum),this.pathTraceShaderLowRes.stopUsing())}if(i.renderOptions.enableDenoiser&&this.sampleCounter>1&&this.backendReady&&this.denoiser){if(!this.denoised||this.frameCounter%(i.renderOptions.denoiserFrameCnt*(this.numTiles.x*this.numTiles.y))==0){if(this._denoiserRunning)return;this._denoiserRunning=!0;try{if(!this.denoiserFBO||!this.tileOutputTexture[1-this.currentBuffer]){console.warn("Denoiser: FBO ou texture de sortie non initialis\xE9e."),this._denoiserRunning=!1;return}(this.denoiserInputFramePtr===null||this.denoiserInputFramePtr.length!==this._renderSize.x*this._renderSize.y*4)&&(this.denoiserInputFramePtr=new Float32Array(this._renderSize.x*this._renderSize.y*4)),n.bindFramebuffer(n.raw.FRAMEBUFFER,this.denoiserFBO),n.framebufferTexture2D(n.raw.FRAMEBUFFER,n.raw.COLOR_ATTACHMENT0,n.raw.TEXTURE_2D,this.tileOutputTexture[1-this.currentBuffer],0),n.raw.readPixels(0,0,this._renderSize.x,this._renderSize.y,n.raw.RGBA,n.raw.FLOAT,this.denoiserInputFramePtr);for(let r=0;r<this.denoiserInputFramePtr.length;r++){let o=this.denoiserInputFramePtr[r];(!Number.isFinite(o)||isNaN(o))&&(o=0),this.denoiserInputFramePtr[r]=Math.min(Math.max(o,0),1)}this.denoised=!0,this.denoiser.width=this._renderSize.x,this.denoiser.height=this._renderSize.y,await this.denoiser.setInputData("color",this.denoiserInputFramePtr),await this.denoiser.execute()}catch(r){this.denoised=!1,console.error("Erreur denoiser:",r)}finally{this._denoiserRunning=!1}}}else this.denoised=!1;if(i.dirty){if(tt.profiling){let r=P.document.getElementById("bufferA");r?.replaceChildren(),r=P.document.getElementById("bufferB"),r?.replaceChildren(),r=P.document.getElementById("bufferC"),r?.replaceChildren(),r=P.document.getElementById("bufferD"),r?.replaceChildren(),r=P.document.getElementById("image"),r?.replaceChildren()}if(this.tile.x=-1,this.tile.y=this.numTiles.y-1,this.sampleCounter=1,this.denoised=!1,this.frameCounter=1,i.renderOptions.enableDenoiser&&this.denoiser){try{this.denoiser.abort()}catch(r){console.warn("Erreur lors de l'abandon du denoiser:",r)}this.denoiserExecutedOneTime=!1,this.denoised=!1}this.accumFBO&&(n.bindFramebuffer(n.raw.FRAMEBUFFER,this.accumFBO),n.clear(n.raw.COLOR_BUFFER_BIT),n.bindFramebuffer(n.raw.FRAMEBUFFER,null))}else tt.profiling&&this.sampleCounter<=4&&this.frameCounter>1&&(this.exportTextureToImage(this.pathTraceTexture,this.tileWidth,this.tileHeight,"bufferB"),this.exportTextureToImage(this.accumTexture,this.renderSize.x,this.renderSize.y,"bufferC"),this.exportTextureToImage(this.tileOutputTexture[this.currentBuffer],this.renderSize.x,this.renderSize.y,"bufferD"),this.exportTextureToImage(this.tileOutputTexture[1-this.currentBuffer],this.renderSize.x,this.renderSize.y,"image")),this.frameCounter++,this.tile.x++,this.tile.x>=this.numTiles.x&&(this.tile.x=0,this.tile.y--,this.tile.y<0&&(this.tile.x=0,this.tile.y=this.numTiles.y-1,this.sampleCounter++,this.currentBuffer=1-this.currentBuffer));let s;return this.pathTraceShader.use(),s=this.pathTraceShader.getObject(),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.right"),i.camera.right.x,i.camera.right.y,i.camera.right.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.up"),i.camera.up.x,i.camera.up.y,i.camera.up.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.forward"),i.camera.forward.x,i.camera.forward.y,i.camera.forward.z),n.uniform1f(n.raw.getUniformLocation(s,"camera.fov"),i.camera.fov),n.uniform1f(n.raw.getUniformLocation(s,"camera.focalDist"),i.camera.focalDist),n.uniform1f(n.raw.getUniformLocation(s,"camera.aperture"),i.camera.aperture),n.uniform1i(n.raw.getUniformLocation(s,"enableEnvMap"),i.envMap!==null&&i.renderOptions.enableEnvMap?1:0),n.uniform1f(n.raw.getUniformLocation(s,"envMapIntensity"),i.renderOptions.envMapIntensity),n.uniform1f(n.raw.getUniformLocation(s,"envMapRot"),i.renderOptions.envMapRot/360),n.uniform1i(n.raw.getUniformLocation(s,"maxDepth"),i.dirty?2:i.renderOptions.maxDepth),n.uniform2f(n.raw.getUniformLocation(s,"tileOffset"),this.tile.x*this.invNumTiles.x,this.tile.y*this.invNumTiles.y),n.uniform3f(n.raw.getUniformLocation(s,"uniformLightCol"),i.renderOptions.uniformLightCol.x,i.renderOptions.uniformLightCol.y,i.renderOptions.uniformLightCol.z),n.uniform1f(n.raw.getUniformLocation(s,"roughnessMollificationAmt"),i.renderOptions.roughnessMollificationAmt),n.uniform1i(n.raw.getUniformLocation(s,"frameNum"),this.frameCounter),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),s=this.pathTraceShaderLowRes.getObject(),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.right"),i.camera.right.x,i.camera.right.y,i.camera.right.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.up"),i.camera.up.x,i.camera.up.y,i.camera.up.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.forward"),i.camera.forward.x,i.camera.forward.y,i.camera.forward.z),n.uniform1f(n.raw.getUniformLocation(s,"camera.fov"),i.camera.fov),n.uniform1f(n.raw.getUniformLocation(s,"camera.focalDist"),i.camera.focalDist),n.uniform1f(n.raw.getUniformLocation(s,"camera.aperture"),i.camera.aperture),n.uniform1i(n.raw.getUniformLocation(s,"enableEnvMap"),i.envMap!==null&&i.renderOptions.enableEnvMap?1:0),n.uniform1f(n.raw.getUniformLocation(s,"envMapIntensity"),i.renderOptions.envMapIntensity),n.uniform1f(n.raw.getUniformLocation(s,"envMapRot"),i.renderOptions.envMapRot/360),n.uniform1i(n.raw.getUniformLocation(s,"maxDepth"),i.renderOptions.maxDepth),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"uniformLightCol"),i.renderOptions.uniformLightCol.x,i.renderOptions.uniformLightCol.y,i.renderOptions.uniformLightCol.z),n.uniform1f(n.raw.getUniformLocation(s,"roughnessMollificationAmt"),i.renderOptions.roughnessMollificationAmt),this.pathTraceShaderLowRes.stopUsing(),this.tonemapShader.use(),s=this.tonemapShader.getObject(),n.uniform1f(n.raw.getUniformLocation(s,"invSampleCounter"),1/this.sampleCounter),n.uniform1i(n.raw.getUniformLocation(s,"enableTonemap"),i.renderOptions.enableTonemap?1:0),n.uniform1i(n.raw.getUniformLocation(s,"enableAces"),i.renderOptions.enableAces?1:0),n.uniform1i(n.raw.getUniformLocation(s,"simpleAcesFit"),i.renderOptions.simpleAcesFit?1:0),n.uniform3f(n.raw.getUniformLocation(s,"backgroundCol"),i.renderOptions.backgroundCol.x,i.renderOptions.backgroundCol.y,i.renderOptions.backgroundCol.z),this.tonemapShader.stopUsing(),Promise.resolve()}};var Zn=class extends Qt{constructor(e){super(e)}dispose(){super.dispose();let e=this.gl;for(let t of this.scene.shadertoyShader.buffers){for(let n of t.textures)e.deleteTexture(n);for(let n of t.inputs)n.texture&&e.deleteTexture(n.texture)}this.scene.shadertoyShader.imageTexture=null;for(let t of this.scene.shadertoyShader.buffers)for(let n of t.fbos)e.deleteFramebuffer(n);for(let t of this.scene.shadertoyShader.buffers)t.shader.dispose(),t.shader=null,t.playNode&&(t.playNode.stop(),t.playNode=null)}pauseOrContinue(e){for(let t of this.scene.shadertoyShader.buffers){En.pauseOrContinue(t,e);for(let n of t.inputs)Ee.pauseOrContinue(n,e)}}initFBOs(){super.initFBOs_(this.scene.shadertoyShader.isGlslPathtracer);let e=this.gl;this.frameCounter=0;for(let t=0;t<this.scene.shadertoyShader.buffers.length;t++){let n=this.scene.shadertoyShader.buffers[t],i=n.inputs.some(c=>c.type===n.type);for(let c=0;c<n.inputs.length;c++){let u=n.inputs[c];u.type==="bufferA"||u.type==="bufferB"||u.type==="bufferC"||u.type==="bufferD"||u.type==="cubeA"?u.buffer=this.scene.shadertoyShader.buffers.find(h=>h.type===u.type):u.texture=Ee.createTexture(u)}let s=i,r=!1,o=this.renderSize,a=this.renderSize;this.scene.shadertoyShader.isGlslPathtracer&&(n.type==="bufferB"&&(s=!0,o=new ee(this.tileWidth,this.tileHeight),a=new ee(Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio))),n.type==="bufferD"&&(s=!0,r=!0)),En.createFBOAndTexture(n,s,r,o,a)}this.scene.shadertoyShader.imageTexture=this.scene.shadertoyShader.buffers.find(t=>t.type==="image").textures[0],this.scene.shadertoyShader.isGlslPathtracer&&(this.scene.shadertoyShader.pathTraceTextures=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferB").textures,this.scene.shadertoyShader.accumFramebuffers=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferC").fbos,this.scene.shadertoyShader.tileOutputTextures=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferD").textures),this.denoised&&(this.denoiserFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.denoiserFBO)),this.outputFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}disposeShaders(){super.disposeShaders();for(let e of this.scene.shadertoyShader.buffers)e.shader.dispose(),e.shader=null}async initShadersAsync(){await super.initShadersAsync();let e=this.gl,t=this.scene,[n,i,s,r]=await Promise.all([Te.loadAsync(this.shadersDirectory+"shadertoy/vertex.glsl"),Te.loadAsync(this.shadersDirectory+"shadertoy/fragment.glsl"),Te.loadAsync(this.shadersDirectory+"shadertoy/cubeA.glsl"),Te.loadAsync(this.shadersDirectory+"shadertoy/sound.glsl")]),o=this.scene.shadertoyShader.commonCode||"",a="";for(let u=0;u<this.scene.shadertoyShader.buffers.length;u++){let h=this.scene.shadertoyShader.buffers[u],d=[];for(let m=0;m<5;m++){let g=h.inputs.find(p=>p.channel===m);g?g.type==="cubemap"||g.type==="cubeA"?d.push(`uniform samplerCube iChannel${g.channel};`):g.type==="volume"?d.push(`uniform sampler3D iChannel${g.channel};`):d.push(`uniform sampler2D iChannel${g.channel};`):d.push(`uniform sampler2D iChannel${m};`)}let f;if(h.type==="cubeA"){let m={src:s.src,path:s.path,dump:s.dump};m.src=m.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",a+(o+h.code)),m.path=h.type+".glsl",f=this.loadShaders(n,m)}else if(h.type==="sound"){let m={src:r.src,path:r.path,dump:s.dump};m.src=m.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",a+(o+h.code)),m.path=h.type+".glsl",f=this.loadShaders(n,m)}else{let m={src:i.src,path:i.path,dump:i.dump};m.src=m.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",a+(o+h.code)),m.path=h.type+".glsl",f=this.loadShaders(n,m)}h.shader=f}let c=await Promise.all(this.programs.map(u=>(console.log("Linking program..."),u.waitForLinkAsync())));console.log();for(let u of this.scene.shadertoyShader.buffers){let h=u.shader,d=new Date,f=[d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()*60*60+d.getMinutes()*60+d.getSeconds()+d.getMilliseconds()/1e3],m=[this.renderSize.x,this.renderSize.y];u.type==="cubeA"&&(m=[u.xres,u.yres]),h.use();let g=h.getObject();e.uniform1i(e.raw.getUniformLocation(g,"iChannel0"),0),e.uniform1i(e.raw.getUniformLocation(g,"iChannel1"),1),e.uniform1i(e.raw.getUniformLocation(g,"iChannel2"),2),e.uniform1i(e.raw.getUniformLocation(g,"iChannel3"),3),e.uniform1i(e.raw.getUniformLocation(g,"iChannel4"),4),e.uniform1f(e.raw.getUniformLocation(g,"iFrameRate"),60),e.uniform4fv(e.raw.getUniformLocation(g,"iDate"),f),e.uniform3f(e.raw.getUniformLocation(g,"iResolution"),m[0],m[1],1);let p=[0,0,0,0,0,0,0,0,0,0,0,0];u.inputs.sort((x,y)=>x.channel-y.channel).forEach((x,y)=>{x.type==="cubeA"||x.type==="texture"||x.type==="volume"||x.type==="cubemap"||x.type==="floats"?(p[x.channel*3+0]=x.xres,p[x.channel*3+1]=x.yres,p[x.channel*3+2]=1):(p[x.channel*3+0]=this.renderSize.x,p[x.channel*3+1]=this.renderSize.y,p[x.channel*3+2]=1)}),e.uniform3fv(e.raw.getUniformLocation(g,"iChannelResolution"),p),u.type==="cubeA"?e.uniform4fv(e.raw.getUniformLocation(g,"unViewport"),[0,0,u.xres,u.yres]):u.type=="sound"&&(e.uniform3fv(e.raw.getUniformLocation(g,"iChannelTime"),[0,0,0,0]),e.uniform1f(e.raw.getUniformLocation(g,"iSampleRate"),Ve.instance().sampleRate)),this.scene.shadertoyShader.isGlslPathtracer&&u.type==="bufferB"&&e.uniform2f(e.raw.getUniformLocation(g,"invNumTiles"),this.invNumTiles.x,this.invNumTiles.y),h.stopUsing()}}get scene(){return this._scene}render(){let e=this.gl;if(!this.scene.dirty&&this.scene.renderOptions.maxSpp!==-1&&this.sampleCounter>=this.scene.renderOptions.maxSpp)return;e.activeTexture(e.raw.TEXTURE0);for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];if(i.type!=="sound")continue;if(i.soundCompiled)break;e.activeTexture(e.raw.TEXTURE0);let s=i.fbos.length>1;i.frontIndex=s&&i.flip?1:0,e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),e.viewport(0,0,i.xres,i.yres);for(let r=0;r<i.inputs.length;r++){let o=i.inputs[r];Ee.bindTexture(o,o.buffer===i)}i.shader.use(),En.drawBuffer(i,i.shader.getObject()),i.shader.stopUsing();for(let r=0;r<i.inputs.length;r++){let o=i.inputs[r];Ee.unbindTexture(o)}}let t=[];for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];if(i.type==="sound")continue;let s=i.fbos.length>1||i.type==="cubeA";if(i.frontIndex=s&&i.flip?1:0,i.type==="cubeA"){let r=0,o=i.shader.getObject(),a=e.getAttribLocation(o,"pos");for(let c=0;c<6;c++){e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),e.viewport(0,0,i.xres,i.yres),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_CUBE_MAP_POSITIVE_X+c,i.textures[i.frontIndex],0);for(let y=0;y<i.inputs.length;y++){let b=i.inputs[y];Ee.bindTexture(b,b.buffer===i)}let u=[],h=[],d=[],f=[],m=[0,0,0];c===0?(u=[1,1,1],h=[1,1,-1],d=[1,-1,-1],f=[1,-1,1]):c===1?(u=[-1,1,-1],h=[-1,1,1],d=[-1,-1,1],f=[-1,-1,-1]):c===2?(u=[-1,1,-1],h=[1,1,-1],d=[1,1,1],f=[-1,1,1]):c===3?(u=[-1,-1,1],h=[1,-1,1],d=[1,-1,-1],f=[-1,-1,-1]):c===4?(u=[-1,1,1],h=[1,1,1],d=[1,-1,1],f=[-1,-1,1]):c===5&&(u=[1,1,-1],h=[-1,1,-1],d=[-1,-1,-1],f=[1,-1,-1]);let g=[u[0],u[1],u[2],h[0],h[1],h[2],d[0],d[1],d[2],f[0],f[1],f[2],m[0],m[1],m[2]],p=performance.now();i.shader.use(),e.uniform3fv(e.raw.getUniformLocation(o,"unCorners"),g),e.drawUnitQuad_XY(a),i.shader.stopUsing();let x=performance.now();r+=x-p;for(let y=0;y<i.inputs.length;y++){let b=i.inputs[y];Ee.unbindTexture(b)}}t.push(`${i.type}: Render time: ${(r/6).toFixed(2)} ms`)}else{let r=!1;if(this.scene.shadertoyShader.isGlslPathtracer&&i.type==="bufferB"&&(e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[this.scene.dirty?1:0]),r=!0),r||e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),this.scene.shadertoyShader.isGlslPathtracer&&i.type==="bufferD"&&e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.scene.shadertoyShader.tileOutputTextures[this.scene.dirty?0:this.currentBuffer],0),r=!1,this.scene.shadertoyShader.isGlslPathtracer&&(i.type==="bufferB"&&(this.scene.dirty?e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)):e.viewport(0,0,this.tileWidth,this.tileHeight),r=!0),i.type==="bufferC"&&!this.scene.dirty&&(e.viewport(this.tileWidth*this.tile.x,this.tileHeight*this.tile.y,this.tileWidth,this.tileHeight),r=!0)),r||e.viewport(0,0,this.renderSize.x,this.renderSize.y),r=!1,this.scene.shadertoyShader.isGlslPathtracer&&(i.type==="bufferC"&&(r=!0,e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.pathTraceTextures[this.scene.dirty?1:0])),i.type==="image"&&(r=!0,e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.tileOutputTextures[this.scene.dirty?0:1-this.currentBuffer]))),!r)for(let c=0;c<i.inputs.length;c++){let u=i.inputs[c];Ee.bindTexture(u,u.buffer===i)}let o=performance.now();this.quad.draw(i.shader);let a=performance.now();t.push(`${i.type}: Render time: ${(a-o).toFixed(2)} ms`);for(let c=0;c<i.inputs.length;c++){let u=i.inputs[c];Ee.unbindTexture(u)}}}for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];i.flip=!i.flip}Lt.instance().eraseKeypresses(),console.info(t.join(`
`)),this.scene.dirty&&(this.scene.dirty=!1),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.imageTexture),this.quad.draw(this.outputShader)}update(e,t){let n=this.gl,i=this.scene;if(!(!i.dirty&&i.renderOptions.maxSpp!==-1&&this.sampleCounter>=i.renderOptions.maxSpp)){if(i.dirty){if(tt.profiling){let s=P.document.getElementById("bufferA");s?.replaceChildren(),s=P.document.getElementById("bufferB"),s?.replaceChildren(),s=P.document.getElementById("bufferC"),s?.replaceChildren(),s=P.document.getElementById("bufferD"),s?.replaceChildren(),s=P.document.getElementById("image"),s?.replaceChildren()}this.tile.x=-1,this.tile.y=this.numTiles.y-1,this.sampleCounter=1,this.denoised=!1,this.frameCounter=0,i.shadertoyShader?.isGlslPathtracer&&(n.bindFramebuffer(n.raw.FRAMEBUFFER,i.shadertoyShader.accumFramebuffers[0]),n.clear(n.raw.COLOR_BUFFER_BIT),n.bindFramebuffer(n.raw.FRAMEBUFFER,null))}else tt.profiling&&i.shadertoyShader?.isGlslPathtracer&&this.sampleCounter<=4&&(this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferA").textures[0],this.renderSize.x,this.renderSize.y,"bufferA"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures[0],this.tileWidth,this.tileHeight,"bufferB"),i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures.length>1&&this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures[1],this.tileWidth,this.tileHeight,"bufferB"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferC").textures[0],this.renderSize.x,this.renderSize.y,"bufferC"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferD").textures[this.currentBuffer],this.renderSize.x,this.renderSize.y,"bufferD"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferD").textures[1-this.currentBuffer],this.renderSize.x,this.renderSize.y,"image")),this.frameCounter++,this.tile.x++,this.tile.x>=this.numTiles.x&&(this.tile.x=0,this.tile.y--,this.tile.y<0&&(this.tile.x=0,this.tile.y=this.numTiles.y-1,this.sampleCounter++,this.currentBuffer=1-this.currentBuffer));for(let s=0;s<i.shadertoyShader.buffers.length;s++){let r=i.shadertoyShader.buffers[s];r.shader.use();let o=r.shader.getObject();n.uniform1f(n.raw.getUniformLocation(o,"iTime"),e),n.uniform1f(n.raw.getUniformLocation(o,"iTimeDelta"),t),n.uniform1i(n.raw.getUniformLocation(o,"iFrame"),this.frameCounter),n.uniform4f(n.raw.getUniformLocation(o,"iMouse"),se.movePosition.x,se.movePosition.y,se.downPosition.x,se.downPosition.y),i.shadertoyShader.isGlslPathtracer&&(r.type==="bufferB"?(n.raw.uniform1i(n.raw.getUniformLocation(o,"dirty"),i.dirty?1:0),n.uniform2f(n.raw.getUniformLocation(o,"tileOffset"),i.dirty?0:this.tile.x*this.invNumTiles.x,i.dirty?0:this.tile.y*this.invNumTiles.y)):r.type==="bufferD"&&n.uniform1f(n.raw.getUniformLocation(o,"invSampleCounter"),i.dirty?1:1/this.sampleCounter)),r.shader.stopUsing()}}}};var j=class l{pmin;pmax;constructor(e,t){if(e===void 0&&t===void 0)this.pmin=new _(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),this.pmax=new _(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);else if(e!==void 0&&t===void 0)this.pmin=e.clone(),this.pmax=e.clone();else if(e!==void 0&&t!==void 0)this.pmin=_.min(e,t),this.pmax=_.max(e,t);else throw new Error("Invalid constructor arguments")}clone(){return new l(this.pmin.clone(),this.pmax.clone())}center(){return this.pmin.add(this.pmax).scale(.5)}extents(){return this.pmax.subtract(this.pmin)}surfaceArea(){let e=this.extents();return 2*(e.x*e.y+e.x*e.z+e.y*e.z)}grow(e){e instanceof _?(this.pmin=_.min(this.pmin,e),this.pmax=_.max(this.pmax,e)):e instanceof l&&(this.pmin=_.min(this.pmin,e.pmin),this.pmax=_.max(this.pmax,e.pmax))}contains(e){let t=this.extents().scale(.5);return Math.abs(this.center().x-e.x)<=t.x&&Math.abs(this.center().y-e.y)<=t.y&&Math.abs(this.center().z-e.z)<=t.z}maxdim(){let e=this.extents();return e.x>=e.y&&e.x>=e.z?0:e.y>=e.x&&e.y>=e.z?1:e.z>=e.x&&e.z>=e.y?2:0}get(e){if(e===0)return this.pmin;if(e===1)return this.pmax;throw new Error("Index out of bounds")}};function Wc(l,e){return new j(_.min(l.pmin,e.pmin),_.max(l.pmax,e.pmax))}function Xc(l,e){return new j(_.max(l.pmin,e.pmin),_.min(l.pmax,e.pmax))}var Jn=class{type=0;bounds=new j;index=0;startidx=null;numprims=null;lc=null;rc=null};function xh(l){return l!==l}var Rn=class l{static kMaxPrimitivesPerLeaf=1;m_bounds=new j;m_height=0;m_nodes=[];m_nodecnt=0;m_packed_indices=[];m_indices=[];m_usesah=!0;m_num_bins=16;m_traversal_cost=1;constructor(e,t=64,n=!1){this.m_num_bins=t,this.m_usesah=n,this.m_height=0,this.m_traversal_cost=e}build(e){for(let t=0;t<e.length;++t)this.m_bounds.grow(e[t]);this.buildImpl(e,e.length)}bounds(){return this.m_bounds}initNodeAllocator(e){this.m_nodecnt=0,this.m_nodes=new Array(e);for(let t=0;t<e;++t)this.m_nodes[t]=new Jn}allocateNode(){return this.m_nodes[this.m_nodecnt++]}buildNode(e,t,n,i){this.m_height=Math.max(this.m_height,e.level);let s=this.allocateNode();if(s.bounds=e.bounds,s.index=e.index,e.numprims<2){s.type=1,s.startidx=this.m_packed_indices.length,s.numprims=e.numprims;for(let r=0;r<e.numprims;++r)this.m_packed_indices.push(i[e.startidx+r])}else{let r=e.centroid_bounds.maxdim(),o=e.centroid_bounds.center().get(r);if(this.m_usesah){let p=this.findSahSplit(e,t,n,i);if(!xh(p.split)&&(r=p.dim,o=p.split,e.numprims<p.sah&&e.numprims<l.kMaxPrimitivesPerLeaf)){s.type=1,s.startidx=this.m_packed_indices.length,s.numprims=e.numprims;for(let x=0;x<e.numprims;++x)this.m_packed_indices.push(i[e.startidx+x]);e.ptr&&(e.isLeft?e.ptr.lc=s:e.ptr.rc=s);return}}s.type=0;let a=new j,c=new j,u=new j,h=new j,d=e.startidx,f=(e.numprims+e.startidx&1)!==0;if(e.centroid_bounds.extents().get(r)>0){let p=e.startidx,x=e.startidx+e.numprims;if(f)for(;;){for(;p!==x&&n[i[p]].get(r)<o;)a.grow(t[i[p]]),u.grow(n[i[p]]),++p;if(p===x--)break;for(c.grow(t[i[p]]),h.grow(n[i[p]]);p!==x&&n[i[x]].get(r)>=o;)c.grow(t[i[x]]),h.grow(n[i[x]]),--x;if(p===x)break;a.grow(t[i[x]]),u.grow(n[i[x]]),[i[p++],i[x]]=[i[x],i[p]]}else for(;;){for(;p!==x&&n[i[p]].get(r)>=o;)a.grow(t[i[p]]),u.grow(n[i[p]]),++p;if(p===x--)break;for(c.grow(t[i[p]]),h.grow(n[i[p]]);p!==x&&n[i[x]].get(r)<o;)c.grow(t[i[x]]),h.grow(n[i[x]]),--x;if(p===x)break;a.grow(t[i[x]]),u.grow(n[i[x]]),[i[p++],i[x]]=[i[x],i[p]]}d=p}if(d===e.startidx||d===e.startidx+e.numprims){d=e.startidx+(e.numprims>>1);for(let p=e.startidx;p<d;++p)a.grow(t[i[p]]),u.grow(n[i[p]]);for(let p=d;p<e.startidx+e.numprims;++p)c.grow(t[i[p]]),h.grow(n[i[p]])}let m={startidx:e.startidx,numprims:d-e.startidx,ptr:s,isLeft:!0,bounds:a,centroid_bounds:u,level:e.level+1,index:e.index<<1},g={startidx:d,numprims:e.numprims-(d-e.startidx),ptr:s,isLeft:!1,bounds:c,centroid_bounds:h,level:e.level+1,index:(e.index<<1)+1};this.buildNode(m,t,n,i),this.buildNode(g,t,n,i)}e.ptr&&(e.isLeft?e.ptr.lc=s:e.ptr.rc=s)}findSahSplit(e,t,n,i){let s=-1,r=Number.POSITIVE_INFINITY,o={dim:0,split:NaN,sah:r,overlap:0},a=e.centroid_bounds.extents();if(_.dot(a,a)===0)return o;let c=[[],[],[]];c[0]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new j,count:0})),c[1]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new j,count:0})),c[2]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new j,count:0}));let u=1/e.bounds.surfaceArea(),h=e.centroid_bounds.pmin;for(let d=0;d<3;++d){let f=h.get(d),m=a.get(d),g=1/m;if(m===0)continue;for(let M=0;M<this.m_num_bins;++M)c[d][M].count=0,c[d][M].bounds=new j;for(let M=e.startidx;M<e.startidx+e.numprims;++M){let w=i[M],v=Math.min(Math.floor(this.m_num_bins*((n[w].get(d)-f)*g)),this.m_num_bins-1);c[d][v].count++,c[d][v].bounds.grow(t[w])}let p=new Array(this.m_num_bins-1),x=new j;for(let M=this.m_num_bins-1;M>0;--M)x.grow(c[d][M].bounds),p[M-1]=new j,p[M-1].pmin=x.pmin,p[M-1].pmax=x.pmax;let y=new j,b=0,T=e.numprims;for(let M=0;M<this.m_num_bins-1;++M){y.grow(c[d][M].bounds),b+=c[d][M].count,T-=c[d][M].count;let w=this.m_traversal_cost+(b*y.surfaceArea()+T*p[M].surfaceArea())*u;w<r&&(o.dim=d,s=M,o.sah=r=w)}}return s!==-1&&(o.split=h.get(o.dim)+(s+1)*(a.get(o.dim)/this.m_num_bins)),o}buildImpl(e,t){this.initNodeAllocator(2*t-1);let n=new Array(t);this.m_indices=new Array(t);for(let r=0;r<t;++r)this.m_indices[r]=r;let i=new j;for(let r=0;r<t;++r){let o=e[r].center();i.grow(o),n[r]=o}let s={startidx:0,numprims:t,ptr:null,isLeft:!1,bounds:this.m_bounds,centroid_bounds:i,level:0,index:1};this.buildNode(s,e,n,this.m_indices)}printStatistics(){console.log("Class name: Bvh"),console.log("SAH:",this.m_usesah?"enabled":"disabled"),console.log("SAH bins:",this.m_num_bins),console.log("Number of triangles:",this.m_indices.length),console.log("Number of nodes:",this.m_nodecnt),console.log("Tree height:",this.m_height)}getIndices(){return this.m_packed_indices}getNumIndices(){return this.m_packed_indices.length}};var Vr=class{meshes=[];meshInstances=[];bvhRootStartIndices=[];topLevelBvh=null;curNode=0;curTriIndex=0;nodeTexWidth;nodes=[];topLevelIndex=0;processBLASNodes(e){let t=e.bounds;this.nodes[this.curNode]={bboxmin:t.pmin,bboxmax:t.pmax,LRLeaf:new _(0,0,0)};let n=this.curNode;return e.type===1?(this.nodes[this.curNode].LRLeaf.x=this.curTriIndex+e.startidx,this.nodes[this.curNode].LRLeaf.y=e.numprims,this.nodes[this.curNode].LRLeaf.z=1):(this.curNode++,this.nodes[n].LRLeaf.x=this.processBLASNodes(e.lc),this.curNode++,this.nodes[n].LRLeaf.y=this.processBLASNodes(e.rc)),n}processTLASNodes(e){let t=e.bounds;this.nodes[this.curNode]={bboxmin:t.pmin,bboxmax:t.pmax,LRLeaf:new _(0,0,0)};let n=this.curNode;if(e.type===1){if(!this.topLevelBvh)throw new Error("topLevelBvh is null");let i=this.topLevelBvh.m_packed_indices[e.startidx],s=this.meshInstances[i].meshID,r=this.meshInstances[i].materialID;this.nodes[this.curNode].LRLeaf.x=this.bvhRootStartIndices[s],this.nodes[this.curNode].LRLeaf.y=r,this.nodes[this.curNode].LRLeaf.z=-i-1}else this.curNode++,this.nodes[n].LRLeaf.x=this.processTLASNodes(e.lc),this.curNode++,this.nodes[n].LRLeaf.y=this.processTLASNodes(e.rc);return n}processBLAS(){let e=0;for(let n=0;n<this.meshes.length;n++)e+=this.meshes[n].bvh.m_nodecnt;this.topLevelIndex=e,e+=2*this.meshInstances.length,this.nodes=new Array(e);for(let n=0;n<e;++n)this.nodes[n]={bboxmin:new _(0,0,0),bboxmax:new _(0,0,0),LRLeaf:new _(0,0,0)};let t=0;this.curTriIndex=0;for(let n=0;n<this.meshes.length;n++){let i=this.meshes[n];this.curNode=t,this.bvhRootStartIndices.push(t),t+=i.bvh.m_nodecnt,this.processBLASNodes(i.bvh.m_nodes[0]),this.curTriIndex+=i.bvh.getNumIndices()}}processTLAS(){if(this.curNode=this.topLevelIndex,!this.topLevelBvh)throw new Error("topLevelBvh is null");this.processTLASNodes(this.topLevelBvh.m_nodes[0])}updateTLAS(e,t){this.topLevelBvh=e,this.meshInstances=t,this.curNode=this.topLevelIndex,this.processTLASNodes(e.m_nodes[0])}process(e,t,n){this.topLevelBvh=e,this.meshes=t,this.meshInstances=n,this.processBLAS(),this.processTLAS()}};function Yc(l,e,t,n=!1){let i=yh(l,e,t,n);return i?new Uint8Array(i.data.buffer):null}function yh(l,e,t,n=!1){let i=P.document.getElementById("textures"),s=P.document.createElement("canvas");i?.appendChild(s),s.width=e,s.height=t;let r=s.getContext("2d");return r?(n?(r.scale(1,-1),r.drawImage(l,0,-t,e,t)):r.drawImage(l,0,0,e,t),r.getImageData(0,0,e,t)):null}var $=class{x;y;z;w;constructor(e=0,t=0,n=0,i=0){e instanceof _?(this.x=e.x,this.y=e.y,this.z=e.z,this.w=t):(this.x=e,this.y=t,this.z=n,this.w=i)}get(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new RangeError("Index out of range for Vec4")}}get xyz(){return new _(this.x,this.y,this.z)}get wxy(){return new _(this.w,this.x,this.y)}toString(){return`Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`}};function bh(l,e,t,n,i,s,r){let o=2*i,a=e-l,c=n-t,u=s-i;r[0]=o/a,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=o/c,r[6]=0,r[7]=0,r[8]=(e+l)/a,r[9]=(n+t)/c,r[10]=(-s-i)/u,r[11]=-1,r[12]=0,r[13]=0,r[14]=-o*s/u,r[15]=0}function vh(l,e,t,n,i){let s=t*Math.tan(l*Math.PI/180),r=s*e;bh(-r,r,-s,s,t,n,i)}function qc(l){let e=1/(_.Length(l)+1e-7);return l.scale(1/e)}function Th(l,e,t,n){let i=qc(l.subtract(e)),s=qc(_.cross(t,i)),r=_.cross(i,s);n[0]=s.x,n[1]=r.x,n[2]=i.x,n[3]=0,n[4]=s.y,n[5]=r.y,n[6]=i.y,n[7]=0,n[8]=s.z,n[9]=r.z,n[10]=i.z,n[11]=0,n[12]=-_.dot(s,l),n[13]=-_.dot(r,l),n[14]=-_.dot(i,l),n[15]=1}var Qn=class l{position;pivot;worldUp;pitch;yaw;radius;fov;focalDist;aperture;isMoving=!1;forward=new _(0,0,0);right=new _(0,0,0);up=new _(0,0,0);constructor(e,t,n){this.position=e.clone(),this.pivot=t.clone(),this.worldUp=new _(0,1,0);let i=_.normalize(this.pivot.subtract(this.position));this.pitch=Math.asin(i.y)*180/Math.PI,this.yaw=Math.atan2(i.z,i.x)*180/Math.PI,this.radius=_.distance(e,t),this.fov=n*Math.PI/180,this.focalDist=.1,this.aperture=0,this.updateCamera()}clone(){let e=new l(this.position,this.pivot,this.fov*180/Math.PI);return e.pitch=this.pitch,e.yaw=this.yaw,e.radius=this.radius,e.focalDist=this.focalDist,e.aperture=this.aperture,e.isMoving=this.isMoving,e.forward=this.forward.clone(),e.right=this.right.clone(),e.up=this.up.clone(),e}offsetOrientation(e,t){this.pitch-=t,this.yaw+=e,this.updateCamera()}strafe(e,t){let n=this.right.scale(-e).add(this.up.scale(t));this.pivot=this.pivot.add(n),this.updateCamera()}setRadius(e){this.radius+=e,this.updateCamera()}setFov(e){this.fov=e*Math.PI/180}updateCamera(){let e=this.yaw*Math.PI/180,t=this.pitch*Math.PI/180,n=new _(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t));this.forward=_.normalize(n),this.position=this.pivot.add(this.forward.scale(-this.radius)),this.right=_.normalize(_.cross(this.forward,this.worldUp)),this.up=_.normalize(_.cross(this.right,this.forward))}computeViewProjectionMatrix(e,t,n){let i=this.position.add(this.forward);Th(this.position,i,this.up,e);let s=1/n*Math.tan(this.fov/2);vh(s*180/Math.PI,n,.1,1e3,t)}};var Lu=1;var Pu=3,fi=0,Du=1,xs=2;var ul=1;var hl=100;var dl=204,fl=205;var pl=0,ml=1,gl=2,Qi=3,xl=4,_l=5,yl=6,bl=7,Na=0,Nu=1,Fu=2;var Bl=1,Ol=2,Gl=3,zl=4,kl=5,Vl=6,Hl=7,vl="attached",Uu="detached",$l=300,Bu=301,Wl=302;var Ou=306,Nn=1e3,zt=1001,es=1002,pi=1003,Xl=1004;var Yl=1005;var Ke=1006,ql=1007;var Mi=1008;var jl=1009;var St=1015,Si=1016;var Kl=1023;var Gu=1028;var Fn=2300,Un=2301,ma=2302,Tl=2303,Ml=2400,Sl=2401,wl=2402,zu=2500;var Zl=0,_s=1,wi=2;var Jl=0;var Ql="",ye="srgb",Pe="srgb-linear",El="linear",ga="srgb";var Dn=7680;var Al=519;var xa=35044;var ln=2e3,ts=2001;function Mh(l){for(let e=l.length-1;e>=0;--e)if(l[e]>=65535)return!0;return!1}function Sh(l){return ArrayBuffer.isView(l)&&!(l instanceof DataView)}function _a(l){return document.createElementNS("http://www.w3.org/1999/xhtml",l)}var jc={},mi=null;function Rl(...l){let e="THREE."+l.shift();mi?mi("log",e,...l):console.log(e,...l)}function ku(l){let e=l[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=l[1];t&&t.isStackTrace?l[0]+=" "+t.getLocation():l[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return l}function re(...l){l=ku(l);let e="THREE."+l.shift();if(mi)mi("warn",e,...l);else{let t=l[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...l)}}function fe(...l){l=ku(l);let e="THREE."+l.shift();if(mi)mi("error",e,...l);else{let t=l[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...l)}}function Cl(...l){let e=l.join(" ");e in jc||(jc[e]=!0,re(...l))}var wh={[pl]:ml,[gl]:yl,[xl]:bl,[Qi]:_l,[ml]:pl,[yl]:gl,[bl]:xl,[_l]:Qi},cn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}},Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kc=1234567,Zi=Math.PI/180,gi=180/Math.PI;function at(){let l=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[l&255]+Ae[l>>8&255]+Ae[l>>16&255]+Ae[l>>24&255]+"-"+Ae[e&255]+Ae[e>>8&255]+"-"+Ae[e>>16&15|64]+Ae[e>>24&255]+"-"+Ae[t&63|128]+Ae[t>>8&255]+"-"+Ae[t>>16&255]+Ae[t>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function Z(l,e,t){return Math.max(e,Math.min(t,l))}function ec(l,e){return(l%e+e)%e}function Eh(l,e,t,n,i){return n+(l-e)*(i-n)/(t-e)}function Ah(l,e,t){return l!==e?(t-l)/(e-l):0}function Ji(l,e,t){return(1-t)*l+t*e}function Rh(l,e,t,n){return Ji(l,e,1-Math.exp(-t*n))}function Ch(l,e=1){return e-Math.abs(ec(l,e*2)-e)}function Ih(l,e,t){return l<=e?0:l>=t?1:(l=(l-e)/(t-e),l*l*(3-2*l))}function Lh(l,e,t){return l<=e?0:l>=t?1:(l=(l-e)/(t-e),l*l*l*(l*(l*6-15)+10))}function Ph(l,e){return l+Math.floor(Math.random()*(e-l+1))}function Dh(l,e){return l+Math.random()*(e-l)}function Nh(l){return l*(.5-Math.random())}function Fh(l){l!==void 0&&(Kc=l);let e=Kc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Uh(l){return l*Zi}function Bh(l){return l*gi}function Oh(l){return(l&l-1)===0&&l!==0}function Gh(l){return Math.pow(2,Math.ceil(Math.log(l)/Math.LN2))}function zh(l){return Math.pow(2,Math.floor(Math.log(l)/Math.LN2))}function kh(l,e,t,n,i){let s=Math.cos,r=Math.sin,o=s(t/2),a=r(t/2),c=s((e+n)/2),u=r((e+n)/2),h=s((e-n)/2),d=r((e-n)/2),f=s((n-e)/2),m=r((n-e)/2);switch(i){case"XYX":l.set(o*u,a*h,a*d,o*c);break;case"YZY":l.set(a*d,o*u,a*h,o*c);break;case"ZXZ":l.set(a*h,a*d,o*u,o*c);break;case"XZX":l.set(o*u,a*m,a*f,o*c);break;case"YXY":l.set(a*f,o*u,a*m,o*c);break;case"ZYZ":l.set(a*m,a*f,o*u,o*c);break;default:re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function rt(l,e){switch(e.constructor){case Float32Array:return l;case Uint32Array:return l/4294967295;case Uint16Array:return l/65535;case Uint8Array:return l/255;case Int32Array:return Math.max(l/2147483647,-1);case Int16Array:return Math.max(l/32767,-1);case Int8Array:return Math.max(l/127,-1);default:throw new Error("Invalid component type.")}}function oe(l,e){switch(e.constructor){case Float32Array:return l;case Uint32Array:return Math.round(l*4294967295);case Uint16Array:return Math.round(l*65535);case Uint8Array:return Math.round(l*255);case Int32Array:return Math.round(l*2147483647);case Int16Array:return Math.round(l*32767);case Int8Array:return Math.round(l*127);default:throw new Error("Invalid component type.")}}var tc={DEG2RAD:Zi,RAD2DEG:gi,generateUUID:at,clamp:Z,euclideanModulo:ec,mapLinear:Eh,inverseLerp:Ah,lerp:Ji,damp:Rh,pingpong:Ch,smoothstep:Ih,smootherstep:Lh,randInt:Ph,randFloat:Dh,randFloatSpread:Nh,seededRandom:Fh,degToRad:Uh,radToDeg:Bh,isPowerOfTwo:Oh,ceilPowerOfTwo:Gh,floorPowerOfTwo:zh,setQuaternionFromProperEuler:kh,normalize:oe,denormalize:rt},ce=class l{static{l.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Z(this.x,e.x,t.x),this.y=Z(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Z(this.x,e,t),this.y=Z(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},We=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,o){let a=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=s[r+0],f=s[r+1],m=s[r+2],g=s[r+3];if(h!==g||a!==d||c!==f||u!==m){let p=a*d+c*f+u*m+h*g;p<0&&(d=-d,f=-f,m=-m,g=-g,p=-p);let x=1-o;if(p<.9995){let y=Math.acos(p),b=Math.sin(y);x=Math.sin(x*y)/b,o=Math.sin(o*y)/b,a=a*x+d*o,c=c*x+f*o,u=u*x+m*o,h=h*x+g*o}else{a=a*x+d*o,c=c*x+f*o,u=u*x+m*o,h=h*x+g*o;let y=1/Math.sqrt(a*a+c*c+u*u+h*h);a*=y,c*=y,u*=y,h*=y}}e[t]=a,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,r){let o=n[i],a=n[i+1],c=n[i+2],u=n[i+3],h=s[r],d=s[r+1],f=s[r+2],m=s[r+3];return e[t]=o*m+u*h+a*f-c*d,e[t+1]=a*m+u*d+c*h-o*f,e[t+2]=c*m+u*f+o*d-a*h,e[t+3]=u*m-o*h-a*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,r=e._order,o=Math.cos,a=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),d=a(n/2),f=a(i/2),m=a(s/2);switch(r){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:re("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-a)*f,this._y=(s-c)*f,this._z=(r-i)*f}else if(n>o&&n>h){let f=2*Math.sqrt(1+n-o-h);this._w=(u-a)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+c)/f}else if(o>h){let f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(a+u)/f}else{let f=2*Math.sqrt(1+h-n-o);this._w=(r-i)/f,this._x=(s+c)/f,this._y=(a+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Z(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,o=t._x,a=t._y,c=t._z,u=t._w;return this._x=n*u+r*o+i*c-s*a,this._y=i*u+r*a+s*o-n*c,this._z=s*u+r*c+n*a-i*o,this._w=r*u-n*o-i*a-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,r=-r,o=-o);let a=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);a=Math.sin(a*c)/u,t=Math.sin(t*c)/u,this._x=this._x*a+n*t,this._y=this._y*a+i*t,this._z=this._z*a+s*t,this._w=this._w*a+r*t,this._onChangeCallback()}else this._x=this._x*a+n*t,this._y=this._y*a+i*t,this._z=this._z*a+s*t,this._w=this._w*a+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class l{static{l.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z,a=e.w,c=2*(r*i-o*n),u=2*(o*t-s*i),h=2*(s*n-r*t);return this.x=t+a*c+r*h-o*u,this.y=n+a*u+o*c-s*h,this.z=i+a*h+s*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Z(this.x,e.x,t.x),this.y=Z(this.y,e.y,t.y),this.z=Z(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Z(this.x,e,t),this.y=Z(this.y,e,t),this.z=Z(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,r=t.x,o=t.y,a=t.z;return this.x=i*a-s*o,this.y=s*r-n*a,this.z=n*o-i*r,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Oo.copy(this).projectOnVector(e),this.sub(Oo)}reflect(e){return this.sub(Oo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Oo=new E,Zc=new We,X=class l{static{l.prototype.isMatrix3=!0}constructor(e,t,n,i,s,r,o,a,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,a,c)}set(e,t,n,i,s,r,o,a,c){let u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=a,u[6]=n,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[3],a=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],g=i[0],p=i[3],x=i[6],y=i[1],b=i[4],T=i[7],M=i[2],w=i[5],v=i[8];return s[0]=r*g+o*y+a*M,s[3]=r*p+o*b+a*w,s[6]=r*x+o*T+a*v,s[1]=c*g+u*y+h*M,s[4]=c*p+u*b+h*w,s[7]=c*x+u*T+h*v,s[2]=d*g+f*y+m*M,s[5]=d*p+f*b+m*w,s[8]=d*x+f*T+m*v,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-n*s*u+n*o*a+i*s*c-i*r*a}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],c=e[7],u=e[8],h=u*r-o*c,d=o*a-u*s,f=c*s-r*a,m=t*h+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/m;return e[0]=h*g,e[1]=(i*c-u*n)*g,e[2]=(o*n-i*r)*g,e[3]=d*g,e[4]=(u*t-i*a)*g,e[5]=(i*s-o*t)*g,e[6]=f*g,e[7]=(n*a-c*t)*g,e[8]=(r*t-n*s)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,o){let a=Math.cos(s),c=Math.sin(s);return this.set(n*a,n*c,-n*(a*r+c*o)+r+e,-i*c,i*a,-i*(-c*r+a*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Go.makeScale(e,t)),this}rotate(e){return this.premultiply(Go.makeRotation(-e)),this}translate(e,t){return this.premultiply(Go.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Go=new X,Jc=new X().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qc=new X().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vh(){let l={enabled:!0,workingColorSpace:Pe,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ga&&(i.r=kt(i.r),i.g=kt(i.g),i.b=kt(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ga&&(i.r=di(i.r),i.g=di(i.g),i.b=di(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ql?El:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Cl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),l.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Cl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),l.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return l.define({[Pe]:{primaries:e,whitePoint:n,transfer:El,toXYZ:Jc,fromXYZ:Qc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ye},outputColorSpaceConfig:{drawingBufferColorSpace:ye}},[ye]:{primaries:e,whitePoint:n,transfer:ga,toXYZ:Jc,fromXYZ:Qc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ye}}}),l}var Le=Vh();function kt(l){return l<.04045?l*.0773993808:Math.pow(l*.9478672986+.0521327014,2.4)}function di(l){return l<.0031308?l*12.92:1.055*Math.pow(l,.41666)-.055}var ei,ya=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ei===void 0&&(ei=_a("canvas")),ei.width=e.width,ei.height=e.height;let i=ei.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ei}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=_a("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=kt(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(kt(t[n]/255)*255):t[n]=kt(t[n]);return{data:t,width:e.width,height:e.height}}else return re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Hh=0,ba=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=at(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?s.push(zo(i[r].image)):s.push(zo(i[r]))}else s=zo(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function zo(l){return typeof HTMLImageElement<"u"&&l instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&l instanceof ImageBitmap?ya.getDataURL(l):l.data?{data:Array.from(l.data),width:l.width,height:l.height,type:l.data.constructor.name}:(re("Texture: Unable to serialize Texture."),{})}var $h=0,ko=new E,ot=class l extends cn{constructor(e=l.DEFAULT_IMAGE,t=l.DEFAULT_MAPPING,n=zt,i=zt,s=Ke,r=Mi,o=Kl,a=jl,c=l.DEFAULT_ANISOTROPY,u=Ql){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=at(),this.name="",this.source=new ba(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=a,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new X,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ko).x}get height(){return this.source.getSize(ko).y}get depth(){return this.source.getSize(ko).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){re(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$l)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Nn:e.x=e.x-Math.floor(e.x);break;case zt:e.x=e.x<0?0:1;break;case es:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Nn:e.y=e.y-Math.floor(e.y);break;case zt:e.y=e.y<0?0:1;break;case es:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ot.DEFAULT_IMAGE=null;ot.DEFAULT_MAPPING=$l;ot.DEFAULT_ANISOTROPY=1;var Ze=class l{static{l.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,a=e.elements,c=a[0],u=a[4],h=a[8],d=a[1],f=a[5],m=a[9],g=a[2],p=a[6],x=a[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,T=(f+1)/2,M=(x+1)/2,w=(u+d)/4,v=(h+g)/4,S=(m+p)/4;return b>T&&b>M?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=w/n,s=v/n):T>M?T<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(T),n=w/i,s=S/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=v/s,i=S/s),this.set(n,i,s,t),this}let y=Math.sqrt((p-m)*(p-m)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(p-m)/y,this.y=(h-g)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+x-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Z(this.x,e.x,t.x),this.y=Z(this.y,e.y,t.y),this.z=Z(this.z,e.z,t.z),this.w=Z(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Z(this.x,e,t),this.y=Z(this.y,e,t),this.z=Z(this.z,e,t),this.w=Z(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var te=class l{static{l.prototype.isMatrix4=!0}constructor(e,t,n,i,s,r,o,a,c,u,h,d,f,m,g,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,a,c,u,h,d,f,m,g,p)}set(e,t,n,i,s,r,o,a,c,u,h,d,f,m,g,p){let x=this.elements;return x[0]=e,x[4]=t,x[8]=n,x[12]=i,x[1]=s,x[5]=r,x[9]=o,x[13]=a,x[2]=c,x[6]=u,x[10]=h,x[14]=d,x[3]=f,x[7]=m,x[11]=g,x[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new l().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,i=1/ti.setFromMatrixColumn(e,0).length(),s=1/ti.setFromMatrixColumn(e,1).length(),r=1/ti.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),o=Math.sin(n),a=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=r*u,f=r*h,m=o*u,g=o*h;t[0]=a*u,t[4]=-a*h,t[8]=c,t[1]=f+m*c,t[5]=d-g*c,t[9]=-o*a,t[2]=g-d*c,t[6]=m+f*c,t[10]=r*a}else if(e.order==="YXZ"){let d=a*u,f=a*h,m=c*u,g=c*h;t[0]=d+g*o,t[4]=m*o-f,t[8]=r*c,t[1]=r*h,t[5]=r*u,t[9]=-o,t[2]=f*o-m,t[6]=g+d*o,t[10]=r*a}else if(e.order==="ZXY"){let d=a*u,f=a*h,m=c*u,g=c*h;t[0]=d-g*o,t[4]=-r*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=r*u,t[9]=g-d*o,t[2]=-r*c,t[6]=o,t[10]=r*a}else if(e.order==="ZYX"){let d=r*u,f=r*h,m=o*u,g=o*h;t[0]=a*u,t[4]=m*c-f,t[8]=d*c+g,t[1]=a*h,t[5]=g*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*a,t[10]=r*a}else if(e.order==="YZX"){let d=r*a,f=r*c,m=o*a,g=o*c;t[0]=a*u,t[4]=g-d*h,t[8]=m*h+f,t[1]=h,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-g*h}else if(e.order==="XZY"){let d=r*a,f=r*c,m=o*a,g=o*c;t[0]=a*u,t[4]=-h,t[8]=c*u,t[1]=d*h+g,t[5]=r*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wh,e,Xh)}lookAt(e,t,n){let i=this.elements;return He.subVectors(e,t),He.lengthSq()===0&&(He.z=1),He.normalize(),en.crossVectors(n,He),en.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),en.crossVectors(n,He)),en.normalize(),Hr.crossVectors(He,en),i[0]=en.x,i[4]=Hr.x,i[8]=He.x,i[1]=en.y,i[5]=Hr.y,i[9]=He.y,i[2]=en.z,i[6]=Hr.z,i[10]=He.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[4],a=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],g=n[6],p=n[10],x=n[14],y=n[3],b=n[7],T=n[11],M=n[15],w=i[0],v=i[4],S=i[8],R=i[12],D=i[1],I=i[5],B=i[9],N=i[13],C=i[2],A=i[6],z=i[10],K=i[14],de=i[3],F=i[7],U=i[11],ne=i[15];return s[0]=r*w+o*D+a*C+c*de,s[4]=r*v+o*I+a*A+c*F,s[8]=r*S+o*B+a*z+c*U,s[12]=r*R+o*N+a*K+c*ne,s[1]=u*w+h*D+d*C+f*de,s[5]=u*v+h*I+d*A+f*F,s[9]=u*S+h*B+d*z+f*U,s[13]=u*R+h*N+d*K+f*ne,s[2]=m*w+g*D+p*C+x*de,s[6]=m*v+g*I+p*A+x*F,s[10]=m*S+g*B+p*z+x*U,s[14]=m*R+g*N+p*K+x*ne,s[3]=y*w+b*D+T*C+M*de,s[7]=y*v+b*I+T*A+M*F,s[11]=y*S+b*B+T*z+M*U,s[15]=y*R+b*N+T*K+M*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],o=e[5],a=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],g=e[7],p=e[11],x=e[15],y=a*f-c*d,b=o*f-c*h,T=o*d-a*h,M=r*f-c*u,w=r*d-a*u,v=r*h-o*u;return t*(g*y-p*b+x*T)-n*(m*y-p*M+x*w)+i*(m*b-g*M+x*v)-s*(m*T-g*w+p*v)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],g=e[13],p=e[14],x=e[15],y=t*o-n*r,b=t*a-i*r,T=t*c-s*r,M=n*a-i*o,w=n*c-s*o,v=i*c-s*a,S=u*g-h*m,R=u*p-d*m,D=u*x-f*m,I=h*p-d*g,B=h*x-f*g,N=d*x-f*p,C=y*N-b*B+T*I+M*D-w*R+v*S;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/C;return e[0]=(o*N-a*B+c*I)*A,e[1]=(i*B-n*N-s*I)*A,e[2]=(g*v-p*w+x*M)*A,e[3]=(d*w-h*v-f*M)*A,e[4]=(a*D-r*N-c*R)*A,e[5]=(t*N-i*D+s*R)*A,e[6]=(p*T-m*v-x*b)*A,e[7]=(u*v-d*T+f*b)*A,e[8]=(r*B-o*D+c*S)*A,e[9]=(n*D-t*B-s*S)*A,e[10]=(m*w-g*T+x*y)*A,e[11]=(h*T-u*w-f*y)*A,e[12]=(o*R-r*I-a*S)*A,e[13]=(t*I-n*R+i*S)*A,e[14]=(g*b-m*M-p*y)*A,e[15]=(u*M-h*b+d*y)*A,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,o=e.y,a=e.z,c=s*r,u=s*o;return this.set(c*r+n,c*o-i*a,c*a+i*o,0,c*o+i*a,u*o+n,u*a-i*r,0,c*a-i*o,u*a+i*r,s*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,r=t._y,o=t._z,a=t._w,c=s+s,u=r+r,h=o+o,d=s*c,f=s*u,m=s*h,g=r*u,p=r*h,x=o*h,y=a*c,b=a*u,T=a*h,M=n.x,w=n.y,v=n.z;return i[0]=(1-(g+x))*M,i[1]=(f+T)*M,i[2]=(m-b)*M,i[3]=0,i[4]=(f-T)*w,i[5]=(1-(d+x))*w,i[6]=(p+y)*w,i[7]=0,i[8]=(m+b)*v,i[9]=(p-y)*v,i[10]=(1-(d+g))*v,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let r=ti.set(i[0],i[1],i[2]).length(),o=ti.set(i[4],i[5],i[6]).length(),a=ti.set(i[8],i[9],i[10]).length();s<0&&(r=-r),nt.copy(this);let c=1/r,u=1/o,h=1/a;return nt.elements[0]*=c,nt.elements[1]*=c,nt.elements[2]*=c,nt.elements[4]*=u,nt.elements[5]*=u,nt.elements[6]*=u,nt.elements[8]*=h,nt.elements[9]*=h,nt.elements[10]*=h,t.setFromRotationMatrix(nt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,r,o=ln,a=!1){let c=this.elements,u=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),m,g;if(a)m=s/(r-s),g=r*s/(r-s);else if(o===ln)m=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===ts)m=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,r,o=ln,a=!1){let c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),m,g;if(a)m=1/(r-s),g=r/(r-s);else if(o===ln)m=-2/(r-s),g=-(r+s)/(r-s);else if(o===ts)m=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ti=new E,nt=new te,Wh=new E(0,0,0),Xh=new E(1,1,1),en=new E,Hr=new E,He=new E,eu=new te,tu=new We,un=class l{constructor(e=0,t=0,n=0,i=l.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],r=i[4],o=i[8],a=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Z(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Z(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(a,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Z(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(a,s));break;case"ZYX":this._y=Math.asin(-Z(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(a,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Z(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Z(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return eu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(eu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tu.setFromEuler(this),this.setFromQuaternion(tu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};un.DEFAULT_ORDER="XYZ";var va=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Yh=0,nu=new E,ni=new We,Pt=new te,$r=new E,Hi=new E,qh=new E,jh=new We,iu=new E(1,0,0),su=new E(0,1,0),ru=new E(0,0,1),au={type:"added"},Kh={type:"removed"},ii={type:"childadded",child:null},Vo={type:"childremoved",child:null},ge=class l extends cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=at(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=l.DEFAULT_UP.clone();let e=new E,t=new un,n=new We,i=new E(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new te},normalMatrix:{value:new X}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=l.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=l.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new va,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ni.setFromAxisAngle(e,t),this.quaternion.multiply(ni),this}rotateOnWorldAxis(e,t){return ni.setFromAxisAngle(e,t),this.quaternion.premultiply(ni),this}rotateX(e){return this.rotateOnAxis(iu,e)}rotateY(e){return this.rotateOnAxis(su,e)}rotateZ(e){return this.rotateOnAxis(ru,e)}translateOnAxis(e,t){return nu.copy(e).applyQuaternion(this.quaternion),this.position.add(nu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(iu,e)}translateY(e){return this.translateOnAxis(su,e)}translateZ(e){return this.translateOnAxis(ru,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$r.copy(e):$r.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pt.lookAt(Hi,$r,this.up):Pt.lookAt($r,Hi,this.up),this.quaternion.setFromRotationMatrix(Pt),i&&(Pt.extractRotation(i.matrixWorld),ni.setFromRotationMatrix(Pt),this.quaternion.premultiply(ni.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(au),ii.child=e,this.dispatchEvent(ii),ii.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kh),Vo.child=e,this.dispatchEvent(Vo),Vo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(au),ii.child=e,this.dispatchEvent(ii),ii.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,qh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,jh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,a){return o[a.uuid]===void 0&&(o[a.uuid]=a.toJSON(e)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let a=o.shapes;if(Array.isArray(a))for(let c=0,u=a.length;c<u;c++){let h=a[c];s(e.shapes,h)}else s(e.shapes,a)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let a=0,c=this.material.length;a<c;a++)o.push(s(e.materials,this.material[a]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let a=this.animations[o];i.animations.push(s(e.animations,a))}}if(t){let o=r(e.geometries),a=r(e.materials),c=r(e.textures),u=r(e.images),h=r(e.shapes),d=r(e.skeletons),f=r(e.animations),m=r(e.nodes);o.length>0&&(n.geometries=o),a.length>0&&(n.materials=a),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function r(o){let a=[];for(let c in o){let u=o[c];delete u.metadata,a.push(u)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};ge.DEFAULT_UP=new E(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vt=class extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}};var Vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},tn={h:0,s:0,l:0},Wr={h:0,s:0,l:0};function Ho(l,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?l+(e-l)*6*t:t<1/2?e:t<2/3?l+(e-l)*6*(2/3-t):l}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ye){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Le.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Le.workingColorSpace){return this.r=e,this.g=t,this.b=n,Le.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Le.workingColorSpace){if(e=ec(e,1),t=Z(t,0,1),n=Z(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=Ho(r,s,e+1/3),this.g=Ho(r,s,e),this.b=Ho(r,s,e-1/3)}return Le.colorSpaceToWorking(this,i),this}setStyle(e,t=ye){function n(s){s!==void 0&&parseFloat(s)<1&&re("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:re("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ye){let n=Vu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kt(e.r),this.g=kt(e.g),this.b=kt(e.b),this}copyLinearToSRGB(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ye){return Le.workingToColorSpace(Re.copy(this),e),Math.round(Z(Re.r*255,0,255))*65536+Math.round(Z(Re.g*255,0,255))*256+Math.round(Z(Re.b*255,0,255))}getHexString(e=ye){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Le.workingColorSpace){Le.workingToColorSpace(Re.copy(this),t);let n=Re.r,i=Re.g,s=Re.b,r=Math.max(n,i,s),o=Math.min(n,i,s),a,c,u=(o+r)/2;if(o===r)a=0,c=0;else{let h=r-o;switch(c=u<=.5?h/(r+o):h/(2-r-o),r){case n:a=(i-s)/h+(i<s?6:0);break;case i:a=(s-n)/h+2;break;case s:a=(n-i)/h+4;break}a/=6}return e.h=a,e.s=c,e.l=u,e}getRGB(e,t=Le.workingColorSpace){return Le.workingToColorSpace(Re.copy(this),t),e.r=Re.r,e.g=Re.g,e.b=Re.b,e}getStyle(e=ye){Le.workingToColorSpace(Re.copy(this),e);let t=Re.r,n=Re.g,i=Re.b;return e!==ye?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(tn),this.setHSL(tn.h+e,tn.s+t,tn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(tn),e.getHSL(Wr);let n=Ji(tn.h,Wr.h,t),i=Ji(tn.s,Wr.s,t),s=Ji(tn.l,Wr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Re=new q;q.NAMES=Vu;var it=new E,Dt=new E,$o=new E,Nt=new E,si=new E,ri=new E,ou=new E,Wo=new E,Xo=new E,Yo=new E,qo=new Ze,jo=new Ze,Ko=new Ze,on=class l{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),it.subVectors(e,t),i.cross(it);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){it.subVectors(i,t),Dt.subVectors(n,t),$o.subVectors(e,t);let r=it.dot(it),o=it.dot(Dt),a=it.dot($o),c=Dt.dot(Dt),u=Dt.dot($o),h=r*c-o*o;if(h===0)return s.set(0,0,0),null;let d=1/h,f=(c*a-o*u)*d,m=(r*u-o*a)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Nt)===null?!1:Nt.x>=0&&Nt.y>=0&&Nt.x+Nt.y<=1}static getInterpolation(e,t,n,i,s,r,o,a){return this.getBarycoord(e,t,n,i,Nt)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(s,Nt.x),a.addScaledVector(r,Nt.y),a.addScaledVector(o,Nt.z),a)}static getInterpolatedAttribute(e,t,n,i,s,r){return qo.setScalar(0),jo.setScalar(0),Ko.setScalar(0),qo.fromBufferAttribute(e,t),jo.fromBufferAttribute(e,n),Ko.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(qo,s.x),r.addScaledVector(jo,s.y),r.addScaledVector(Ko,s.z),r}static isFrontFacing(e,t,n,i){return it.subVectors(n,t),Dt.subVectors(e,t),it.cross(Dt).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return it.subVectors(this.c,this.b),Dt.subVectors(this.a,this.b),it.cross(Dt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return l.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return l.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return l.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return l.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return l.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,r,o;si.subVectors(i,n),ri.subVectors(s,n),Wo.subVectors(e,n);let a=si.dot(Wo),c=ri.dot(Wo);if(a<=0&&c<=0)return t.copy(n);Xo.subVectors(e,i);let u=si.dot(Xo),h=ri.dot(Xo);if(u>=0&&h<=u)return t.copy(i);let d=a*h-u*c;if(d<=0&&a>=0&&u<=0)return r=a/(a-u),t.copy(n).addScaledVector(si,r);Yo.subVectors(e,s);let f=si.dot(Yo),m=ri.dot(Yo);if(m>=0&&f<=m)return t.copy(s);let g=f*c-a*m;if(g<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(ri,o);let p=u*m-f*h;if(p<=0&&h-u>=0&&f-m>=0)return ou.subVectors(s,i),o=(h-u)/(h-u+(f-m)),t.copy(i).addScaledVector(ou,o);let x=1/(p+g+d);return r=g*x,o=d*x,t.copy(n).addScaledVector(si,r).addScaledVector(ri,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xe=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(st.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(st.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=st.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,st):st.fromBufferAttribute(s,r),st.applyMatrix4(e.matrixWorld),this.expandByPoint(st);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xr.copy(n.boundingBox)),Xr.applyMatrix4(e.matrixWorld),this.union(Xr)}let i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,st),st.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($i),Yr.subVectors(this.max,$i),ai.subVectors(e.a,$i),oi.subVectors(e.b,$i),li.subVectors(e.c,$i),nn.subVectors(oi,ai),sn.subVectors(li,oi),Cn.subVectors(ai,li);let t=[0,-nn.z,nn.y,0,-sn.z,sn.y,0,-Cn.z,Cn.y,nn.z,0,-nn.x,sn.z,0,-sn.x,Cn.z,0,-Cn.x,-nn.y,nn.x,0,-sn.y,sn.x,0,-Cn.y,Cn.x,0];return!Zo(t,ai,oi,li,Yr)||(t=[1,0,0,0,1,0,0,0,1],!Zo(t,ai,oi,li,Yr))?!1:(qr.crossVectors(nn,sn),t=[qr.x,qr.y,qr.z],Zo(t,ai,oi,li,Yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,st).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(st).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ft[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ft[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ft[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ft[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ft[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ft[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ft[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ft[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ft),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ft=[new E,new E,new E,new E,new E,new E,new E,new E],st=new E,Xr=new Xe,ai=new E,oi=new E,li=new E,nn=new E,sn=new E,Cn=new E,$i=new E,Yr=new E,qr=new E,In=new E;function Zo(l,e,t,n,i){for(let s=0,r=l.length-3;s<=r;s+=3){In.fromArray(l,s);let o=i.x*Math.abs(In.x)+i.y*Math.abs(In.y)+i.z*Math.abs(In.z),a=e.dot(In),c=t.dot(In),u=n.dot(In);if(Math.max(-Math.max(a,c,u),Math.min(a,c,u))>o)return!1}return!0}var Gt=Zh();function Zh(){let l=new ArrayBuffer(4),e=new Float32Array(l),t=new Uint32Array(l),n=new Uint32Array(512),i=new Uint32Array(512);for(let a=0;a<256;++a){let c=a-127;c<-27?(n[a]=0,n[a|256]=32768,i[a]=24,i[a|256]=24):c<-14?(n[a]=1024>>-c-14,n[a|256]=1024>>-c-14|32768,i[a]=-c-1,i[a|256]=-c-1):c<=15?(n[a]=c+15<<10,n[a|256]=c+15<<10|32768,i[a]=13,i[a|256]=13):c<128?(n[a]=31744,n[a|256]=64512,i[a]=24,i[a|256]=24):(n[a]=31744,n[a|256]=64512,i[a]=13,i[a|256]=13)}let s=new Uint32Array(2048),r=new Uint32Array(64),o=new Uint32Array(64);for(let a=1;a<1024;++a){let c=a<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[a]=c|u}for(let a=1024;a<2048;++a)s[a]=939524096+(a-1024<<13);for(let a=1;a<31;++a)r[a]=a<<23;r[31]=1199570944,r[32]=2147483648;for(let a=33;a<63;++a)r[a]=2147483648+(a-32<<23);r[63]=3347054592;for(let a=1;a<64;++a)a!==32&&(o[a]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:r,offsetTable:o}}function Jh(l){Math.abs(l)>65504&&re("DataUtils.toHalfFloat(): Value out of range."),l=Z(l,-65504,65504),Gt.floatView[0]=l;let e=Gt.uint32View[0],t=e>>23&511;return Gt.baseTable[t]+((e&8388607)>>Gt.shiftTable[t])}function Qh(l){let e=l>>10;return Gt.uint32View[0]=Gt.mantissaTable[Gt.offsetTable[e]+(l&1023)]+Gt.exponentTable[e],Gt.floatView[0]}var hn=class{static toHalfFloat(e){return Jh(e)}static fromHalfFloat(e){return Qh(e)}},_e=new E,jr=new ce,ed=0,Ce=class extends cn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ed++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xa,this.updateRanges=[],this.gpuType=St,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)jr.fromBufferAttribute(this,t),jr.applyMatrix3(e),this.setXY(t,jr.x,jr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_e.fromBufferAttribute(this,t),_e.applyMatrix3(e),this.setXYZ(t,_e.x,_e.y,_e.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_e.fromBufferAttribute(this,t),_e.applyMatrix4(e),this.setXYZ(t,_e.x,_e.y,_e.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_e.fromBufferAttribute(this,t),_e.applyNormalMatrix(e),this.setXYZ(t,_e.x,_e.y,_e.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_e.fromBufferAttribute(this,t),_e.transformDirection(e),this.setXYZ(t,_e.x,_e.y,_e.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=rt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=oe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=rt(t,this.array)),t}setX(e,t){return this.normalized&&(t=oe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=rt(t,this.array)),t}setY(e,t){return this.normalized&&(t=oe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=rt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=oe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=rt(t,this.array)),t}setW(e,t){return this.normalized&&(t=oe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=oe(t,this.array),n=oe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=oe(t,this.array),n=oe(n,this.array),i=oe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=oe(t,this.array),n=oe(n,this.array),i=oe(i,this.array),s=oe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xa&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ta=class extends Ce{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ma=class extends Ce{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ue=class extends Ce{constructor(e,t,n){super(new Float32Array(e),t,n)}},td=new Xe,Wi=new E,Jo=new E,Be=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):td.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wi.subVectors(e,this.center);let t=Wi.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Wi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wi.copy(e.center).add(Jo)),this.expandByPoint(Wi.copy(e.center).sub(Jo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},nd=0,je=new te,Qo=new ge,ci=new E,$e=new Xe,Xi=new Xe,Me=new E,Je=class l extends cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=at(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mh(e)?Ma:Ta)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new X().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return je.makeRotationFromQuaternion(e),this.applyMatrix4(je),this}rotateX(e){return je.makeRotationX(e),this.applyMatrix4(je),this}rotateY(e){return je.makeRotationY(e),this.applyMatrix4(je),this}rotateZ(e){return je.makeRotationZ(e),this.applyMatrix4(je),this}translate(e,t,n){return je.makeTranslation(e,t,n),this.applyMatrix4(je),this}scale(e,t,n){return je.makeScale(e,t,n),this.applyMatrix4(je),this}lookAt(e){return Qo.lookAt(e),Qo.updateMatrix(),this.applyMatrix4(Qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ci).negate(),this.translate(ci.x,ci.y,ci.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ue(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xe);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];$e.setFromBufferAttribute(s),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Be);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){let n=this.boundingSphere.center;if($e.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let o=t[s];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(Me.addVectors($e.min,Xi.min),$e.expandByPoint(Me),Me.addVectors($e.max,Xi.max),$e.expandByPoint(Me)):($e.expandByPoint(Xi.min),$e.expandByPoint(Xi.max))}$e.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Me.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Me));if(t)for(let s=0,r=t.length;s<r;s++){let o=t[s],a=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Me.fromBufferAttribute(o,c),a&&(ci.fromBufferAttribute(e,c),Me.add(ci)),i=Math.max(i,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ce(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),o=[],a=[];for(let S=0;S<n.count;S++)o[S]=new E,a[S]=new E;let c=new E,u=new E,h=new E,d=new ce,f=new ce,m=new ce,g=new E,p=new E;function x(S,R,D){c.fromBufferAttribute(n,S),u.fromBufferAttribute(n,R),h.fromBufferAttribute(n,D),d.fromBufferAttribute(s,S),f.fromBufferAttribute(s,R),m.fromBufferAttribute(s,D),u.sub(c),h.sub(c),f.sub(d),m.sub(d);let I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(g.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),o[S].add(g),o[R].add(g),o[D].add(g),a[S].add(p),a[R].add(p),a[D].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let S=0,R=y.length;S<R;++S){let D=y[S],I=D.start,B=D.count;for(let N=I,C=I+B;N<C;N+=3)x(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let b=new E,T=new E,M=new E,w=new E;function v(S){M.fromBufferAttribute(i,S),w.copy(M);let R=o[S];b.copy(R),b.sub(M.multiplyScalar(M.dot(R))).normalize(),T.crossVectors(w,R);let I=T.dot(a[S])<0?-1:1;r.setXYZW(S,b.x,b.y,b.z,I)}for(let S=0,R=y.length;S<R;++S){let D=y[S],I=D.start,B=D.count;for(let N=I,C=I+B;N<C;N+=3)v(e.getX(N+0)),v(e.getX(N+1)),v(e.getX(N+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ce(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new E,s=new E,r=new E,o=new E,a=new E,c=new E,u=new E,h=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,p),u.subVectors(r,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,m),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),o.add(u),a.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),u.subVectors(r,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Me.fromBufferAttribute(e,t),Me.normalize(),e.setXYZ(t,Me.x,Me.y,Me.z)}toNonIndexed(){function e(o,a){let c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(a.length*u),f=0,m=0;for(let g=0,p=a.length;g<p;g++){o.isInterleavedBufferAttribute?f=a[g]*o.data.stride+o.offset:f=a[g]*u;for(let x=0;x<u;x++)d[m++]=c[f++]}return new Ce(d,u,h)}if(this.index===null)return re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new l,n=this.index.array,i=this.attributes;for(let o in i){let a=i[o],c=e(a,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let a=[],c=s[o];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);a.push(f)}t.morphAttributes[o]=a}t.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,a=r.length;o<a;o++){let c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let a=this.parameters;for(let c in a)a[c]!==void 0&&(e[c]=a[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let a in n){let c=n[a];e.data.attributes[a]=c.toJSON(e.data)}let i={},s=!1;for(let a in this.morphAttributes){let c=this.morphAttributes[a],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[a]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let r=e.groups;for(let c=0,u=r.length;c<u;c++){let h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},xi=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xa,this.updateRanges=[],this.version=0,this.uuid=at()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=at()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=at()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ie=new E,_i=class l{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ie.fromBufferAttribute(this,t),Ie.applyMatrix4(e),this.setXYZ(t,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ie.fromBufferAttribute(this,t),Ie.applyNormalMatrix(e),this.setXYZ(t,Ie.x,Ie.y,Ie.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ie.fromBufferAttribute(this,t),Ie.transformDirection(e),this.setXYZ(t,Ie.x,Ie.y,Ie.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=rt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=oe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=oe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=oe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=oe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=oe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=rt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=rt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=rt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=rt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=oe(t,this.array),n=oe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=oe(t,this.array),n=oe(n,this.array),i=oe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=oe(t,this.array),n=oe(n,this.array),i=oe(i,this.array),s=oe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Rl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Ce(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new l(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Rl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},id=0,De=class extends cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=at(),this.name="",this.type="Material",this.blending=ul,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dl,this.blendDst=fl,this.blendEquation=hl,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Dn,this.stencilZFail=Dn,this.stencilZPass=Dn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){re(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ul&&(n.blending=this.blending),this.side!==fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dl&&(n.blendSrc=this.blendSrc),this.blendDst!==fl&&(n.blendDst=this.blendDst),this.blendEquation!==hl&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Dn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Dn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Dn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let r=[];for(let o in s){let a=s[o];delete a.metadata,r.push(a)}return r}if(t){let s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ut=new E,el=new E,Kr=new E,rn=new E,tl=new E,Zr=new E,nl=new E,Bn=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ut)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ut.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ut.copy(this.origin).addScaledVector(this.direction,t),Ut.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){el.copy(e).add(t).multiplyScalar(.5),Kr.copy(t).sub(e).normalize(),rn.copy(this.origin).sub(el);let s=e.distanceTo(t)*.5,r=-this.direction.dot(Kr),o=rn.dot(this.direction),a=-rn.dot(Kr),c=rn.lengthSq(),u=Math.abs(1-r*r),h,d,f,m;if(u>0)if(h=r*a-o,d=r*o-a,m=s*u,h>=0)if(d>=-m)if(d<=m){let g=1/u;h*=g,d*=g,f=h*(h+r*d+2*o)+d*(r*h+d+2*a)+c}else d=s,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*a)+c;else d=-s,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*a)+c;else d<=-m?(h=Math.max(0,-(-r*s+o)),d=h>0?-s:Math.min(Math.max(-s,-a),s),f=-h*h+d*(d+2*a)+c):d<=m?(h=0,d=Math.min(Math.max(-s,-a),s),f=d*(d+2*a)+c):(h=Math.max(0,-(r*s+o)),d=h>0?s:Math.min(Math.max(-s,-a),s),f=-h*h+d*(d+2*a)+c);else d=r>0?-s:s,h=Math.max(0,-(r*d+o)),f=-h*h+d*(d+2*a)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(el).addScaledVector(Kr,d),f}intersectSphere(e,t){Ut.subVectors(e.center,this.origin);let n=Ut.dot(this.direction),i=Ut.dot(Ut)-n*n,s=e.radius*e.radius;if(i>s)return null;let r=Math.sqrt(s-i),o=n-r,a=n+r;return a<0?null:o<0?this.at(a,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,o,a,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,r=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,r=(e.min.y-d.y)*u),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),h>=0?(o=(e.min.z-d.z)*h,a=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,a=(e.min.z-d.z)*h),n>a||o>i)||((o>n||n!==n)&&(n=o),(a<i||i!==i)&&(i=a),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ut)!==null}intersectTriangle(e,t,n,i,s){tl.subVectors(t,e),Zr.subVectors(n,e),nl.crossVectors(tl,Zr);let r=this.direction.dot(nl),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;rn.subVectors(this.origin,e);let a=o*this.direction.dot(Zr.crossVectors(rn,Zr));if(a<0)return null;let c=o*this.direction.dot(tl.cross(rn));if(c<0||a+c>r)return null;let u=-o*rn.dot(nl);return u<0?null:this.at(u/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},_t=class extends De{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=Na,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},lu=new te,Ln=new Bn,Jr=new Be,cu=new E,Qr=new E,ea=new E,ta=new E,il=new E,na=new E,uu=new E,ia=new E,lt=class extends ge{constructor(e=new Je,t=new _t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){na.set(0,0,0);for(let a=0,c=s.length;a<c;a++){let u=o[a],h=s[a];u!==0&&(il.fromBufferAttribute(h,e),r?na.addScaledVector(il,u):na.addScaledVector(il.sub(t),u))}t.add(na)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(s),Ln.copy(e.ray).recast(e.near),!(Jr.containsPoint(Ln.origin)===!1&&(Ln.intersectSphere(Jr,cu)===null||Ln.origin.distanceToSquared(cu)>(e.far-e.near)**2))&&(lu.copy(s).invert(),Ln.copy(e.ray).applyMatrix4(lu),!(n.boundingBox!==null&&Ln.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ln)))}_computeIntersections(e,t,n){let i,s=this.geometry,r=this.material,o=s.index,a=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(r))for(let m=0,g=d.length;m<g;m++){let p=d[m],x=r[p.materialIndex],y=Math.max(p.start,f.start),b=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let T=y,M=b;T<M;T+=3){let w=o.getX(T),v=o.getX(T+1),S=o.getX(T+2);i=sa(this,x,e,n,c,u,h,w,v,S),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let p=m,x=g;p<x;p+=3){let y=o.getX(p),b=o.getX(p+1),T=o.getX(p+2);i=sa(this,r,e,n,c,u,h,y,b,T),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(a!==void 0)if(Array.isArray(r))for(let m=0,g=d.length;m<g;m++){let p=d[m],x=r[p.materialIndex],y=Math.max(p.start,f.start),b=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let T=y,M=b;T<M;T+=3){let w=T,v=T+1,S=T+2;i=sa(this,x,e,n,c,u,h,w,v,S),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let p=m,x=g;p<x;p+=3){let y=p,b=p+1,T=p+2;i=sa(this,r,e,n,c,u,h,y,b,T),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}};function sd(l,e,t,n,i,s,r,o){let a;if(e.side===Du?a=n.intersectTriangle(r,s,i,!0,o):a=n.intersectTriangle(i,s,r,e.side===fi,o),a===null)return null;ia.copy(o),ia.applyMatrix4(l.matrixWorld);let c=t.ray.origin.distanceTo(ia);return c<t.near||c>t.far?null:{distance:c,point:ia.clone(),object:l}}function sa(l,e,t,n,i,s,r,o,a,c){l.getVertexPosition(o,Qr),l.getVertexPosition(a,ea),l.getVertexPosition(c,ta);let u=sd(l,e,t,n,Qr,ea,ta,uu);if(u){let h=new E;on.getBarycoord(uu,Qr,ea,ta,h),i&&(u.uv=on.getInterpolatedAttribute(i,o,a,c,h,new ce)),s&&(u.uv1=on.getInterpolatedAttribute(s,o,a,c,h,new ce)),r&&(u.normal=on.getInterpolatedAttribute(r,o,a,c,h,new E),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:a,c,normal:new E,materialIndex:0};on.getNormal(Qr,ea,ta,d.normal),u.face=d,u.barycoord=h}return u}var Yi=new Ze,hu=new Ze,du=new Ze,rd=new Ze,fu=new te,ra=new E,sl=new Be,pu=new te,rl=new Bn,ns=class extends lt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vl,this.bindMatrix=new te,this.bindMatrixInverse=new te,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xe),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ra),this.boundingBox.expandByPoint(ra)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Be),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ra),this.boundingSphere.expandByPoint(ra)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sl.copy(this.boundingSphere),sl.applyMatrix4(i),e.ray.intersectsSphere(sl)!==!1&&(pu.copy(i).invert(),rl.copy(e.ray).applyMatrix4(pu),!(this.boundingBox!==null&&rl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,rl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ze,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===vl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Uu?this.bindMatrixInverse.copy(this.bindMatrix).invert():re("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;hu.fromBufferAttribute(i.attributes.skinIndex,e),du.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Yi.copy(t),t.set(0,0,0,0)):(Yi.set(...t,1),t.set(0,0,0)),Yi.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let r=du.getComponent(s);if(r!==0){let o=hu.getComponent(s);fu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(rd.copy(Yi).applyMatrix4(fu),r)}}return t.isVector4&&(t.w=Yi.w),t.applyMatrix4(this.bindMatrixInverse)}},yi=class extends ge{constructor(){super(),this.isBone=!0,this.type="Bone"}},bi=class extends ot{constructor(e=null,t=1,n=1,i,s,r,o,a,c=pi,u=pi,h,d){super(null,r,o,a,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},mu=new te,ad=new te,is=class l{constructor(e=[],t=[]){this.uuid=at(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){re("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new te)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new te;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){let o=e[s]?e[s].matrixWorld:ad;mu.multiplyMatrices(o,t[s]),mu.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new l(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new bi(t,e,e,Kl,St);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],r=t[s];r===void 0&&(re("Skeleton: No bone found with UUID:",s),r=new yi),this.bones.push(r),this.boneInverses.push(new te().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let r=t[i];e.bones.push(r.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},dn=class extends Ce{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ui=new te,gu=new te,aa=[],xu=new Xe,od=new te,qi=new lt,ji=new Be,ss=class extends lt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new dn(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,od)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xe),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ui),xu.copy(e.boundingBox).applyMatrix4(ui),this.boundingBox.union(xu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Be),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ui),ji.copy(e.boundingSphere).applyMatrix4(ui),this.boundingSphere.union(ji)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(qi.geometry=this.geometry,qi.material=this.material,qi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ji.copy(this.boundingSphere),ji.applyMatrix4(n),e.ray.intersectsSphere(ji)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ui),gu.multiplyMatrices(n,ui),qi.matrixWorld=gu,qi.raycast(e,aa);for(let r=0,o=aa.length;r<o;r++){let a=aa[r];a.instanceId=s,a.object=this,t.push(a)}aa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new dn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new bi(new Float32Array(i*this.count),i,this.count,Gu,St));let s=this.morphTexture.source.data.data,r=0;for(let c=0;c<n.length;c++)r+=n[c];let o=this.geometry.morphTargetsRelative?1:1-r,a=i*e;return s[a]=o,s.set(n,a+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},al=new E,ld=new E,cd=new X,Ot=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=al.subVectors(n,t).cross(ld.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(al),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||cd.getNormalMatrix(e),i=this.coplanarPoint(al).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Pn=new Be,ud=new ce(.5,.5),oa=new E,Sa=class{constructor(e=new Ot,t=new Ot,n=new Ot,i=new Ot,s=new Ot,r=new Ot){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ln,n=!1){let i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],m=s[8],g=s[9],p=s[10],x=s[11],y=s[12],b=s[13],T=s[14],M=s[15];if(i[0].setComponents(c-r,f-u,x-m,M-y).normalize(),i[1].setComponents(c+r,f+u,x+m,M+y).normalize(),i[2].setComponents(c+o,f+h,x+g,M+b).normalize(),i[3].setComponents(c-o,f-h,x-g,M-b).normalize(),n)i[4].setComponents(a,d,p,T).normalize(),i[5].setComponents(c-a,f-d,x-p,M-T).normalize();else if(i[4].setComponents(c-a,f-d,x-p,M-T).normalize(),t===ln)i[5].setComponents(c+a,f+d,x+p,M+T).normalize();else if(t===ts)i[5].setComponents(a,d,p,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pn)}intersectsSprite(e){Pn.center.set(0,0,0);let t=ud.distanceTo(e.center);return Pn.radius=.7071067811865476+t,Pn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pn)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(oa.x=i.normal.x>0?e.max.x:e.min.x,oa.y=i.normal.y>0?e.max.y:e.min.y,oa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(oa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var yt=class extends De{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new q(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},wa=new E,Ea=new E,_u=new te,Ki=new Bn,la=new Be,ol=new E,yu=new E,On=class extends ge{constructor(e=new Je,t=new yt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)wa.fromBufferAttribute(t,i-1),Ea.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=wa.distanceTo(Ea);e.setAttribute("lineDistance",new Ue(n,1))}else re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),la.copy(n.boundingSphere),la.applyMatrix4(i),la.radius+=s,e.ray.intersectsSphere(la)===!1)return;_u.copy(i).invert(),Ki.copy(e.ray).applyMatrix4(_u);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,r.start),m=Math.min(u.count,r.start+r.count);for(let g=f,p=m-1;g<p;g+=c){let x=u.getX(g),y=u.getX(g+1),b=ca(this,e,Ki,a,x,y,g);b&&t.push(b)}if(this.isLineLoop){let g=u.getX(m-1),p=u.getX(f),x=ca(this,e,Ki,a,g,p,m-1);x&&t.push(x)}}else{let f=Math.max(0,r.start),m=Math.min(d.count,r.start+r.count);for(let g=f,p=m-1;g<p;g+=c){let x=ca(this,e,Ki,a,g,g+1,g);x&&t.push(x)}if(this.isLineLoop){let g=ca(this,e,Ki,a,m-1,f,m-1);g&&t.push(g)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function ca(l,e,t,n,i,s,r){let o=l.geometry.attributes.position;if(wa.fromBufferAttribute(o,i),Ea.fromBufferAttribute(o,s),t.distanceSqToSegment(wa,Ea,ol,yu)>n)return;ol.applyMatrix4(l.matrixWorld);let c=e.ray.origin.distanceTo(ol);if(!(c<e.near||c>e.far))return{distance:c,point:yu.clone().applyMatrix4(l.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:l}}var bu=new E,vu=new E,fn=class extends On{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)bu.fromBufferAttribute(t,i),vu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+bu.distanceTo(vu);e.setAttribute("lineDistance",new Ue(n,1))}else re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},rs=class extends On{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ct=class extends De{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Tu=new te,Il=new Bn,ua=new Be,ha=new E,Ht=class extends ge{constructor(e=new Je,t=new ct){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(i),ua.radius+=s,e.ray.intersectsSphere(ua)===!1)return;Tu.copy(i).invert(),Il.copy(e.ray).applyMatrix4(Tu);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let m=d,g=f;m<g;m++){let p=c.getX(m);ha.fromBufferAttribute(h,p),Mu(ha,p,a,i,e,t,this)}}else{let d=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let m=d,g=f;m<g;m++)ha.fromBufferAttribute(h,m),Mu(ha,m,a,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Mu(l,e,t,n,i,s,r){let o=Il.distanceSqToPoint(l);if(o<t){let a=new E;Il.closestPointToPoint(l,a),a.applyMatrix4(n);let c=i.ray.origin.distanceTo(a);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:a,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}function Hu(l){let e={};for(let t in l){e[t]={};for(let n in l[t]){let i=l[t][n];if(Su(i))i.isRenderTargetTexture?(re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Su(i[0])){let s=[];for(let r=0,o=i.length;r<o;r++)s[r]=i[r].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Ne(l){let e={};for(let t=0;t<l.length;t++){let n=Hu(l[t]);for(let i in n)e[i]=n[i]}return e}function Su(l){return l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)}var Gn=class extends De{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Oe=class extends Gn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Z(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new q(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new q(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new q(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},as=class extends De{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new q(16777215),this.specular=new q(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=Na,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function da(l,e){return!l||l.constructor===e?l:typeof e.BYTES_PER_ELEMENT=="number"?new e(l):Array.prototype.slice.call(l)}function hd(l){function e(i,s){return l[i]-l[s]}let t=l.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function wu(l,e,t){let n=l.length,i=new l.constructor(n);for(let s=0,r=0;r!==n;++s){let o=t[s]*e;for(let a=0;a!==e;++a)i[r++]=l[o+a]}return i}function $u(l,e,t,n){let i=1,s=l[0];for(;s!==void 0&&s[n]===void 0;)s=l[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push(...r)),s=l[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=l[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=l[i++];while(s!==void 0)}var bt=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let r;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}r=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let a=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=s,s=t[--n-1],e>=s)break e}r=n,n=0;break t}break n}for(;n<r;){let o=n+r>>>1;e<t[o]?r=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Aa=class extends bt{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ml,endingEnd:Ml}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,r=e+1,o=i[s],a=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case Sl:s=e,o=2*t-n;break;case wl:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(a===void 0)switch(this.getSettings_().endingEnd){case Sl:r=e,a=2*n-t;break;case wl:r=1,a=n+i[1]-i[0];break;default:r=e-1,a=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(a-n),this._offsetPrev=s*u,this._offsetNext=r*u}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),g=m*m,p=g*m,x=-d*p+2*d*g-d*m,y=(1+d)*p+(-1.5-2*d)*g+(-.5+d)*m+1,b=(-1-f)*p+(1.5+f)*g+.5*m,T=f*p-f*g;for(let M=0;M!==o;++M)s[M]=x*r[u+M]+y*r[c+M]+b*r[a+M]+T*r[h+M];return s}},Ra=class extends bt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)s[d]=r[c+d]*h+r[a+d]*u;return s}},Ca=class extends bt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ia=class extends bt{interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){let g=(n-t)/(i-t),p=1-g;for(let x=0;x!==o;++x)s[x]=r[c+x]*p+r[a+x]*g;return s}let f=o*2,m=e-1;for(let g=0;g!==o;++g){let p=r[c+g],x=r[a+g],y=m*f+g*2,b=d[y],T=d[y+1],M=e*f+g*2,w=h[M],v=h[M+1],S=(n-t)/(i-t),R,D,I,B,N;for(let C=0;C<8;C++){R=S*S,D=R*S,I=1-S,B=I*I,N=B*I;let z=N*t+3*B*S*b+3*I*R*w+D*i-n;if(Math.abs(z)<1e-10)break;let K=3*B*(b-t)+6*I*S*(w-b)+3*R*(i-w);if(Math.abs(K)<1e-10)break;S=S-z/K,S=Math.max(0,Math.min(1,S))}s[g]=N*p+3*B*S*T+3*I*R*v+D*x}return s}},Ge=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=da(t,this.TimeBufferType),this.values=da(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:da(e.times,Array),values:da(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ca(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ra(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Aa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ia(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Fn:t=this.InterpolantFactoryMethodDiscrete;break;case Un:t=this.InterpolantFactoryMethodLinear;break;case ma:t=this.InterpolantFactoryMethodSmooth;break;case Tl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return re("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fn;case this.InterpolantFactoryMethodLinear:return Un;case this.InterpolantFactoryMethodSmooth:return ma;case this.InterpolantFactoryMethodBezier:return Tl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(fe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(fe("KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==s;o++){let a=n[o];if(typeof a=="number"&&isNaN(a)){fe("KeyframeTrack: Time is not a valid number.",this,o,a),e=!1;break}if(r!==null&&r>a){fe("KeyframeTrack: Out of order keys.",this,o,a,r),e=!1;break}r=a}if(i!==void 0&&Sh(i))for(let o=0,a=i.length;o!==a;++o){let c=i[o];if(isNaN(c)){fe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ma,s=e.length-1,r=1;for(let o=1;o<s;++o){let a=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)a=!0;else{let h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){let g=t[h+m];if(g!==t[d+m]||g!==t[f+m]){a=!0;break}}}if(a){if(o!==r){e[r]=e[o];let h=o*n,d=r*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++r}}if(s>0){e[r]=e[s];for(let o=s*n,a=r*n,c=0;c!==n;++c)t[a+c]=t[o+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Ge.prototype.ValueTypeName="";Ge.prototype.TimeBufferType=Float32Array;Ge.prototype.ValueBufferType=Float32Array;Ge.prototype.DefaultInterpolation=Un;var $t=class extends Ge{constructor(e,t,n){super(e,t,n)}};$t.prototype.ValueTypeName="bool";$t.prototype.ValueBufferType=Array;$t.prototype.DefaultInterpolation=Fn;$t.prototype.InterpolantFactoryMethodLinear=void 0;$t.prototype.InterpolantFactoryMethodSmooth=void 0;var os=class extends Ge{constructor(e,t,n,i){super(e,t,n,i)}};os.prototype.ValueTypeName="color";var vt=class extends Ge{constructor(e,t,n,i){super(e,t,n,i)}};vt.prototype.ValueTypeName="number";var La=class extends bt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=(n-t)/(i-t),c=e*o;for(let u=c+o;c!==u;c+=4)We.slerpFlat(s,0,r,c-o,r,c,a);return s}},Tt=class extends Ge{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new La(this.times,this.values,this.getValueSize(),e)}};Tt.prototype.ValueTypeName="quaternion";Tt.prototype.InterpolantFactoryMethodSmooth=void 0;var Wt=class extends Ge{constructor(e,t,n){super(e,t,n)}};Wt.prototype.ValueTypeName="string";Wt.prototype.ValueBufferType=Array;Wt.prototype.DefaultInterpolation=Fn;Wt.prototype.InterpolantFactoryMethodLinear=void 0;Wt.prototype.InterpolantFactoryMethodSmooth=void 0;var Mt=class extends Ge{constructor(e,t,n,i){super(e,t,n,i)}};Mt.prototype.ValueTypeName="vector";var ls=class{constructor(e="",t=-1,n=[],i=zu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=at(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,o=n.length;r!==o;++r)t.push(fd(n[r]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,r=n.length;s!==r;++s)t.push(Ge.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,r=[];for(let o=0;o<s;o++){let a=[],c=[];a.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let u=hd(a);a=wu(a,1,u),c=wu(c,1,u),!i&&a[0]===0&&(a.push(s),c.push(c[0])),r.push(new vt(".morphTargetInfluences["+t[o].name+"]",a,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,a=e.length;o<a;o++){let c=e[o],u=c.name.match(s);if(u&&u.length>1){let h=u[1],d=i[h];d||(i[h]=d=[]),d.push(c)}}let r=[];for(let o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return r}static parseAnimation(e,t){if(re("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return fe("AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,m,g){if(f.length!==0){let p=[],x=[];$u(f,p,x,m),p.length!==0&&g.push(new h(d,p,x))}},i=[],s=e.name||"default",r=e.fps||30,o=e.blendMode,a=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let g=0;g<d[m].morphTargets.length;g++)f[d[m].morphTargets[g]]=-1;for(let g in f){let p=[],x=[];for(let y=0;y!==d[m].morphTargets.length;++y){let b=d[m];p.push(b.time),x.push(b.morphTarget===g?1:0)}i.push(new vt(".morphTargetInfluence["+g+"]",p,x))}a=f.length*r}else{let f=".bones["+t[h].name+"]";n(Mt,f+".position",d,"pos",i),n(Tt,f+".quaternion",d,"rot",i),n(Mt,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,a,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function dd(l){switch(l.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return vt;case"vector":case"vector2":case"vector3":case"vector4":return Mt;case"color":return os;case"quaternion":return Tt;case"bool":case"boolean":return $t;case"string":return Wt}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+l)}function fd(l){if(l.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=dd(l.type);if(l.times===void 0){let t=[],n=[];$u(l.keys,t,n,"value"),l.times=t,l.values=n}return e.parse!==void 0?e.parse(l):new e(l.name,l.times,l.values,l.interpolation)}var xt={enabled:!1,files:{},add:function(l,e){this.enabled!==!1&&(Eu(l)||(this.files[l]=e))},get:function(l){if(this.enabled!==!1&&!Eu(l))return this.files[l]},remove:function(l){delete this.files[l]},clear:function(){this.files={}}};function Eu(l){try{let e=l.slice(l.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Pa=class{constructor(e,t,n){let i=this,s=!1,r=0,o=0,a,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,r,o),s=!0},this.itemEnd=function(u){r++,i.onProgress!==void 0&&i.onProgress(u,r,o),r===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return a?a(u):u},this.setURLModifier=function(u){return a=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Wu=new Pa,Ye=class{constructor(e){this.manager=e!==void 0?e:Wu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ye.DEFAULT_MATERIAL_NAME="__DEFAULT";var Bt={},Ll=class extends Error{constructor(e,t){super(e),this.response=t}},Xt=class extends Ye{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=xt.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Bt[e]!==void 0){Bt[e].push({onLoad:t,onProgress:n,onError:i});return}Bt[e]=[],Bt[e].push({onLoad:t,onProgress:n,onError:i});let r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,a=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&re("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Bt[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,g=0,p=new ReadableStream({start(x){y();function y(){h.read().then(({done:b,value:T})=>{if(b)x.close();else{g+=T.byteLength;let M=new ProgressEvent("progress",{lengthComputable:m,loaded:g,total:f});for(let w=0,v=u.length;w<v;w++){let S=u[w];S.onProgress&&S.onProgress(M)}x.enqueue(T),y()}},b=>{x.error(b)})}}});return new Response(p)}else throw new Ll(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(a){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{xt.add(`file:${e}`,c);let u=Bt[e];delete Bt[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Bt[e];if(u===void 0)throw this.manager.itemError(e),c;delete Bt[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var hi=new WeakMap,Da=class extends Ye{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=xt.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);else{let h=hi.get(r);h===void 0&&(h=[],hi.set(r,h)),h.push({onLoad:t,onError:i})}return r}let o=_a("img");function a(){u(),t&&t(this);let h=hi.get(this)||[];for(let d=0;d<h.length;d++){let f=h[d];f.onLoad&&f.onLoad(this)}hi.delete(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),xt.remove(`image:${e}`);let d=hi.get(this)||[];for(let f=0;f<d.length;f++){let m=d[f];m.onError&&m.onError(h)}hi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",a,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",a,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),xt.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var cs=class extends Ye{constructor(e){super(e)}load(e,t,n,i){let s=this,r=new bi,o=new Xt(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(a){let c;try{c=s.parse(a)}catch(u){i!==void 0?i(u):fe(u);return}c.image!==void 0?r.image=c.image:c.data!==void 0&&(r.image.width=c.width,r.image.height=c.height,r.image.data=c.data),r.wrapS=c.wrapS!==void 0?c.wrapS:zt,r.wrapT=c.wrapT!==void 0?c.wrapT:zt,r.magFilter=c.magFilter!==void 0?c.magFilter:Ke,r.minFilter=c.minFilter!==void 0?c.minFilter:Ke,r.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(r.colorSpace=c.colorSpace),c.flipY!==void 0&&(r.flipY=c.flipY),c.format!==void 0&&(r.format=c.format),c.type!==void 0&&(r.type=c.type),c.mipmaps!==void 0&&(r.mipmaps=c.mipmaps,r.minFilter=Mi),c.mipmapCount===1&&(r.minFilter=Ke),c.generateMipmaps!==void 0&&(r.generateMipmaps=c.generateMipmaps),r.needsUpdate=!0,t&&t(r,c)},n,i),r}},us=class extends Ye{constructor(e){super(e)}load(e,t,n,i){let s=new ot,r=new Da(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},vi=class extends ge{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new q(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var ll=new te,Au=new E,Ru=new E,hs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=jl,this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sa,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Au.setFromMatrixPosition(e.matrixWorld),t.position.copy(Au),Ru.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ru),t.updateMatrixWorld(),ll.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ll,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ts||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ll)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},fa=new E,pa=new We,gt=new E,ds=class extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(fa,pa,gt),gt.x===1&&gt.y===1&&gt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,pa,gt.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(fa,pa,gt),gt.x===1&&gt.y===1&&gt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,pa,gt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},an=new E,Cu=new ce,Iu=new ce,zn=class extends ds{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=gi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Zi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gi*2*Math.atan(Math.tan(Zi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){an.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(an.x,an.y).multiplyScalar(-e/an.z),an.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(an.x,an.y).multiplyScalar(-e/an.z)}getViewSize(e,t){return this.getViewBounds(e,Cu,Iu),t.subVectors(Iu,Cu)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Zi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let a=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/a,t-=r.offsetY*n/c,i*=r.width/a,n*=r.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Pl=class extends hs{constructor(){super(new zn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=gi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},fs=class extends vi{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new Pl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Dl=class extends hs{constructor(){super(new zn(90,1,.5,500)),this.isPointLightShadow=!0}},ps=class extends vi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Dl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ti=class extends ds{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,r=n+e,o=i+t,a=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=u*this.view.offsetY,a=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Nl=class extends hs{constructor(){super(new Ti(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ms=class extends vi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new Nl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Yt=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var cl=new WeakMap,gs=class extends Ye{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&re("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&re("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=xt.get(`image-bitmap:${e}`);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{cl.has(r)===!0?(i&&i(cl.get(r)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let a=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){xt.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),cl.set(a,c),xt.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});xt.add(`image-bitmap:${e}`,a),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var nc="\\[\\]\\.:\\/",pd=new RegExp("["+nc+"]","g"),ic="[^"+nc+"]",md="[^"+nc.replace("\\.","")+"]",gd=/((?:WC+[\/:])*)/.source.replace("WC",ic),xd=/(WCOD+)?/.source.replace("WCOD",md),_d=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ic),yd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ic),bd=new RegExp("^"+gd+xd+_d+yd+"$"),vd=["material","materials","bones","map"],Fl=class{constructor(e,t,n){let i=n||he.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},he=class l{constructor(e,t,n){this.path=t,this.parsedPath=n||l.parseTrackName(t),this.node=l.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new l.Composite(e,t,n):new l(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(pd,"")}static parseTrackName(e){let t=bd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);vd.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===t||o.uuid===t)return o;let a=n(o.children);if(a)return a}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=l.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){re("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let r=e[i];if(r===void 0){let c=t.nodeName;fe("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}a=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(a=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};he.Composite=Fl;he.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};he.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};he.prototype.GetterByBindingType=[he.prototype._getValue_direct,he.prototype._getValue_array,he.prototype._getValue_arrayElement,he.prototype._getValue_toArray];he.prototype.SetterByBindingTypeAndVersioning=[[he.prototype._setValue_direct,he.prototype._setValue_direct_setNeedsUpdate,he.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[he.prototype._setValue_array,he.prototype._setValue_array_setNeedsUpdate,he.prototype._setValue_array_setMatrixWorldNeedsUpdate],[he.prototype._setValue_arrayElement,he.prototype._setValue_arrayElement_setNeedsUpdate,he.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[he.prototype._setValue_fromArray,he.prototype._setValue_fromArray_setNeedsUpdate,he.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var y0=new Float32Array(1);var Ul=class l{static{l.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");var Td=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Md=`#ifdef USE_ALPHAHASH
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
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ed=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rd=`#ifdef USE_AOMAP
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
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Id=`#ifdef USE_BATCHING
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
#endif`,Ld=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Fd=`#ifdef USE_IRIDESCENCE
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
#endif`,Ud=`#ifdef USE_BUMPMAP
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
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Wd=`#define PI 3.141592653589793
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
} // validated`,Xd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yd=`vec3 transformedNormal = objectNormal;
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
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ef=`#ifdef USE_ENVMAP
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
#endif`,tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
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
#endif`,sf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rf=`#ifdef USE_ENVMAP
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
#endif`,af=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,of=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uf=`#ifdef USE_GRADIENTMAP
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
}`,hf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,df=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,mf=`#ifdef USE_ENVMAP
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
#endif`,gf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_f=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bf=`PhysicalMaterial material;
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
#endif`,vf=`uniform sampler2D dfgLUT;
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
}`,Tf=`
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
#endif`,Mf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ef=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Af=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,If=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Df=`#if defined( USE_POINTS_UV )
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
#endif`,Nf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ff=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Uf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Of=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gf=`#ifdef USE_MORPHTARGETS
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
#endif`,zf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Vf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$f=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xf=`#ifdef USE_NORMALMAP
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
#endif`,Yf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,np=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ip=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ap=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,op=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,lp=`float getShadowMask() {
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
}`,cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,up=`#ifdef USE_SKINNING
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
#endif`,hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dp=`#ifdef USE_SKINNING
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
#endif`,fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,xp=`#ifdef USE_TRANSMISSION
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
#endif`,_p=`#ifdef USE_TRANSMISSION
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
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
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`#include <common>
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
}`,Ip=`#if DEPTH_PACKING == 3200
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
}`,Lp=`#define DISTANCE
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
}`,Pp=`#define DISTANCE
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
}`,Dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Np=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`uniform float scale;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Bp=`#include <common>
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
}`,Op=`uniform vec3 diffuse;
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
}`,Gp=`#define LAMBERT
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
}`,zp=`#define LAMBERT
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
}`,kp=`#define MATCAP
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
}`,Vp=`#define MATCAP
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
}`,Hp=`#define NORMAL
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
}`,$p=`#define NORMAL
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
}`,Wp=`#define PHONG
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
}`,Xp=`#define PHONG
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
}`,Yp=`#define STANDARD
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
}`,qp=`#define STANDARD
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
}`,jp=`#define TOON
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
}`,Kp=`#define TOON
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
}`,Zp=`uniform float size;
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
}`,Jp=`uniform vec3 diffuse;
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
}`,Qp=`#include <common>
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
}`,em=`uniform vec3 color;
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
}`,tm=`uniform float rotation;
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
}`,nm=`uniform vec3 diffuse;
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
}`,Q={alphahash_fragment:Td,alphahash_pars_fragment:Md,alphamap_fragment:Sd,alphamap_pars_fragment:wd,alphatest_fragment:Ed,alphatest_pars_fragment:Ad,aomap_fragment:Rd,aomap_pars_fragment:Cd,batching_pars_vertex:Id,batching_vertex:Ld,begin_vertex:Pd,beginnormal_vertex:Dd,bsdfs:Nd,iridescence_fragment:Fd,bumpmap_pars_fragment:Ud,clipping_planes_fragment:Bd,clipping_planes_pars_fragment:Od,clipping_planes_pars_vertex:Gd,clipping_planes_vertex:zd,color_fragment:kd,color_pars_fragment:Vd,color_pars_vertex:Hd,color_vertex:$d,common:Wd,cube_uv_reflection_fragment:Xd,defaultnormal_vertex:Yd,displacementmap_pars_vertex:qd,displacementmap_vertex:jd,emissivemap_fragment:Kd,emissivemap_pars_fragment:Zd,colorspace_fragment:Jd,colorspace_pars_fragment:Qd,envmap_fragment:ef,envmap_common_pars_fragment:tf,envmap_pars_fragment:nf,envmap_pars_vertex:sf,envmap_physical_pars_fragment:mf,envmap_vertex:rf,fog_vertex:af,fog_pars_vertex:of,fog_fragment:lf,fog_pars_fragment:cf,gradientmap_pars_fragment:uf,lightmap_pars_fragment:hf,lights_lambert_fragment:df,lights_lambert_pars_fragment:ff,lights_pars_begin:pf,lights_toon_fragment:gf,lights_toon_pars_fragment:xf,lights_phong_fragment:_f,lights_phong_pars_fragment:yf,lights_physical_fragment:bf,lights_physical_pars_fragment:vf,lights_fragment_begin:Tf,lights_fragment_maps:Mf,lights_fragment_end:Sf,lightprobes_pars_fragment:wf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:Af,logdepthbuf_pars_vertex:Rf,logdepthbuf_vertex:Cf,map_fragment:If,map_pars_fragment:Lf,map_particle_fragment:Pf,map_particle_pars_fragment:Df,metalnessmap_fragment:Nf,metalnessmap_pars_fragment:Ff,morphinstance_vertex:Uf,morphcolor_vertex:Bf,morphnormal_vertex:Of,morphtarget_pars_vertex:Gf,morphtarget_vertex:zf,normal_fragment_begin:kf,normal_fragment_maps:Vf,normal_pars_fragment:Hf,normal_pars_vertex:$f,normal_vertex:Wf,normalmap_pars_fragment:Xf,clearcoat_normal_fragment_begin:Yf,clearcoat_normal_fragment_maps:qf,clearcoat_pars_fragment:jf,iridescence_pars_fragment:Kf,opaque_fragment:Zf,packing:Jf,premultiplied_alpha_fragment:Qf,project_vertex:ep,dithering_fragment:tp,dithering_pars_fragment:np,roughnessmap_fragment:ip,roughnessmap_pars_fragment:sp,shadowmap_pars_fragment:rp,shadowmap_pars_vertex:ap,shadowmap_vertex:op,shadowmask_pars_fragment:lp,skinbase_vertex:cp,skinning_pars_vertex:up,skinning_vertex:hp,skinnormal_vertex:dp,specularmap_fragment:fp,specularmap_pars_fragment:pp,tonemapping_fragment:mp,tonemapping_pars_fragment:gp,transmission_fragment:xp,transmission_pars_fragment:_p,uv_pars_fragment:yp,uv_pars_vertex:bp,uv_vertex:vp,worldpos_vertex:Tp,background_vert:Mp,background_frag:Sp,backgroundCube_vert:wp,backgroundCube_frag:Ep,cube_vert:Ap,cube_frag:Rp,depth_vert:Cp,depth_frag:Ip,distance_vert:Lp,distance_frag:Pp,equirect_vert:Dp,equirect_frag:Np,linedashed_vert:Fp,linedashed_frag:Up,meshbasic_vert:Bp,meshbasic_frag:Op,meshlambert_vert:Gp,meshlambert_frag:zp,meshmatcap_vert:kp,meshmatcap_frag:Vp,meshnormal_vert:Hp,meshnormal_frag:$p,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:Yp,meshphysical_frag:qp,meshtoon_vert:jp,meshtoon_frag:Kp,points_vert:Zp,points_frag:Jp,shadow_vert:Qp,shadow_frag:em,sprite_vert:tm,sprite_frag:nm},G={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new X},alphaMap:{value:null},alphaMapTransform:{value:new X},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new X}},envmap:{envMap:{value:null},envMapRotation:{value:new X},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new X}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new X}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new X},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new X},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new X},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new X}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new X}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new X}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new E},probesMax:{value:new E},probesResolution:{value:new E}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new X},alphaTest:{value:0},uvTransform:{value:new X}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new X},alphaMap:{value:null},alphaMapTransform:{value:new X},alphaTest:{value:0}}},Xu={basic:{uniforms:Ne([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:Ne([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.fog,G.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:Ne([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.fog,G.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:Ne([G.common,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.roughnessmap,G.metalnessmap,G.fog,G.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:Ne([G.common,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.gradientmap,G.fog,G.lights,{emissive:{value:new q(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:Ne([G.common,G.bumpmap,G.normalmap,G.displacementmap,G.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:Ne([G.points,G.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:Ne([G.common,G.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:Ne([G.common,G.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:Ne([G.common,G.bumpmap,G.normalmap,G.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:Ne([G.sprite,G.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new X},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new X}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:Ne([G.common,G.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:Ne([G.lights,G.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};Xu.physical={uniforms:Ne([Xu.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new X},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new X},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new X},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new X},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new X},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new X},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new X},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new X},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new X},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new X},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new X},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new X}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var im=new X;im.set(-1,0,0,0,1,0,0,0,1);var Nv={[Bl]:"LINEAR_TONE_MAPPING",[Ol]:"REINHARD_TONE_MAPPING",[Gl]:"CINEON_TONE_MAPPING",[zl]:"ACES_FILMIC_TONE_MAPPING",[Vl]:"AGX_TONE_MAPPING",[Hl]:"NEUTRAL_TONE_MAPPING",[kl]:"CUSTOM_TONE_MAPPING"};var Fv=new Float32Array(16),Uv=new Float32Array(9),Bv=new Float32Array(4);var Ov={[Bl]:"Linear",[Ol]:"Reinhard",[Gl]:"Cineon",[zl]:"ACESFilmic",[Vl]:"AgX",[Hl]:"Neutral",[kl]:"Custom"};var Gv={[Lu]:"SHADOWMAP_TYPE_PCF",[Pu]:"SHADOWMAP_TYPE_VSM"};var zv={[Bu]:"ENVMAP_TYPE_CUBE",[Wl]:"ENVMAP_TYPE_CUBE",[Ou]:"ENVMAP_TYPE_CUBE_UV"};var kv={[Wl]:"ENVMAP_MODE_REFRACTION"};var Vv={[Na]:"ENVMAP_BLENDING_MULTIPLY",[Nu]:"ENVMAP_BLENDING_MIX",[Fu]:"ENVMAP_BLENDING_ADD"};var sm=new X;sm.set(-1,0,0,0,1,0,0,0,1);var Hv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);var Fa=class extends cs{constructor(e){super(e),this.type=Si}parse(e){let r=function(S,R){switch(S){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(R||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(R||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(R||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(R||""))}},h=function(S,R,D){R=R||1024;let B=S.pos,N=-1,C=0,A="",z=String.fromCharCode.apply(null,new Uint16Array(S.subarray(B,B+128)));for(;0>(N=z.indexOf(`
`))&&C<R&&B<S.byteLength;)A+=z,C+=z.length,B+=128,z=String.fromCharCode.apply(null,new Uint16Array(S.subarray(B,B+128)));return-1<N?(D!==!1&&(S.pos+=C+N+1),A+z.slice(0,N)):!1},d=function(S){let R=/^#\?(\S+)/,D=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,I=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,B=/^\s*FORMAT=(\S+)\s*$/,N=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,C={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},A,z;for((S.pos>=S.byteLength||!(A=h(S)))&&r(1,"no header found"),(z=A.match(R))||r(3,"bad initial token"),C.valid|=1,C.programtype=z[1],C.string+=A+`
`;A=h(S),A!==!1;){if(C.string+=A+`
`,A.charAt(0)==="#"){C.comments+=A+`
`;continue}if((z=A.match(D))&&(C.gamma=parseFloat(z[1])),(z=A.match(I))&&(C.exposure=parseFloat(z[1])),(z=A.match(B))&&(C.valid|=2,C.format=z[1]),(z=A.match(N))&&(C.valid|=4,C.height=parseInt(z[1],10),C.width=parseInt(z[2],10)),C.valid&2&&C.valid&4)break}return C.valid&2||r(3,"missing format specifier"),C.valid&4||r(3,"missing image size specifier"),C},f=function(S,R,D){let I=R;if(I<8||I>32767||S[0]!==2||S[1]!==2||S[2]&128)return new Uint8Array(S);I!==(S[2]<<8|S[3])&&r(3,"wrong scanline width");let B=new Uint8Array(4*R*D);B.length||r(4,"unable to allocate buffer space");let N=0,C=0,A=4*I,z=new Uint8Array(4),K=new Uint8Array(A),de=D;for(;de>0&&C<S.byteLength;){C+4>S.byteLength&&r(1),z[0]=S[C++],z[1]=S[C++],z[2]=S[C++],z[3]=S[C++],(z[0]!=2||z[1]!=2||(z[2]<<8|z[3])!=I)&&r(3,"bad rgbe scanline format");let F=0,U;for(;F<A&&C<S.byteLength;){U=S[C++];let Y=U>128;if(Y&&(U-=128),(U===0||F+U>A)&&r(3,"bad scanline data"),Y){let W=S[C++];for(let qe=0;qe<U;qe++)K[F++]=W}else K.set(S.subarray(C,C+U),F),F+=U,C+=U}let ne=I;for(let Y=0;Y<ne;Y++){let W=0;B[N]=K[Y+W],W+=I,B[N+1]=K[Y+W],W+=I,B[N+2]=K[Y+W],W+=I,B[N+3]=K[Y+W],N+=4}de--}return B},m=function(S,R,D,I){let B=S[R+3],N=Math.pow(2,B-128)/255;D[I+0]=S[R+0]*N,D[I+1]=S[R+1]*N,D[I+2]=S[R+2]*N,D[I+3]=1},g=function(S,R,D,I){let B=S[R+3],N=Math.pow(2,B-128)/255;D[I+0]=hn.toHalfFloat(Math.min(S[R+0]*N,65504)),D[I+1]=hn.toHalfFloat(Math.min(S[R+1]*N,65504)),D[I+2]=hn.toHalfFloat(Math.min(S[R+2]*N,65504)),D[I+3]=hn.toHalfFloat(1)},p=new Uint8Array(e);p.pos=0;let x=d(p),y=x.width,b=x.height,T=f(p.subarray(p.pos),y,b),M,w,v;switch(this.type){case St:v=T.length/4;let S=new Float32Array(v*4);for(let D=0;D<v;D++)m(T,D*4,S,D*4);M=S,w=St;break;case Si:v=T.length/4;let R=new Uint16Array(v*4);for(let D=0;D<v;D++)g(T,D*4,R,D*4);M=R,w=Si;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:y,height:b,data:M,header:x.string,gamma:x.gamma,exposure:x.exposure,type:w}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(r,o){switch(r.type){case St:case Si:r.colorSpace=Pe,r.minFilter=Ke,r.magFilter=Ke,r.generateMipmaps=!1,r.flipY=!0;break}t&&t(r,o)}return super.load(e,s,n,i)}};var Ua=class{static async loadHDRAsync(e){let n=await(await ue(e)).arrayBuffer(),s=new Fa().setDataType(St).parse(n),r=s.data,o=new Float32Array(s.width*s.height*3);for(let a=0,c=0;a<r.length;a+=4,c+=3)o[c+0]=r[a+0],o[c+1]=r[a+1],o[c+2]=r[a+2];return[o,s.width,s.height]}};function rm(l,e,t){return .212671*l+.71516*e+.072169*t}var ys=class{width;height;img;cdf;totalSum;constructor(){this.width=0,this.height=0,this.img=null,this.cdf=null,this.totalSum=0}dispose(){this.img=null,this.cdf=null}buildCDF(){if(!this.img||!this.width||!this.height)return;let e=new Float32Array(this.width*this.height);for(let t=0;t<this.height;t++)for(let n=0;n<this.width;n++){let i=t*this.width*3+n*3;e[n+t*this.width]=rm(this.img[i+0],this.img[i+1],this.img[i+2])}this.cdf=new Float32Array(this.width*this.height),this.cdf[0]=e[0];for(let t=1;t<this.width*this.height;t++)this.cdf[t]=this.cdf[t-1]+e[t];this.totalSum=this.cdf[this.width*this.height-1]}async loadMapAsync(e){return[this.img,this.width,this.height]=await Ua.loadHDRAsync(e),this.img==null?!1:(this.buildCDF(),!0)}};var wt=class{name;baseWeight=1;baseDiffuseRoughness=0;baseColor=new _(1,1,1);specularColor=new _(1,1,1);coatColor=new _(1,1,1);anisotropic=0;emission=new _(0,0,0);padding1=0;metallic=0;roughness=.5;subsurface=0;specularTint=0;sheen=0;sheenTint=0;clearcoat=0;clearcoatGloss=0;coatIOR=1.6;coatRoughnessAnisotropy=0;coatDarkening=1;specTrans=0;ior=1.5;baseColorTexID=-1;metallicRoughnessTexID=-1;normalmapTexID=-1;emissionmapTexID=-1;opacity=1;alphaMode=0;alphaCutoff=0;doubleSided=0;mediumType=0;mediumDensity=0;mediumColor=new _(1,1,1);mediumAnisotropy=0;mediumAbsorption=0;mediumThickness=1;subsurfaceRadiusScale=new _(1,1,1);fuzzColor=new _(-1,-1,-1);fuzzRoughness=.5;dispersionScale=0;abbeNumber=50;thinWalled=0;transmissionColor=new _(1,1,1);thinFilmWeight=0;thinFilmThickness=0;thinFilmIor=1.5;uvScale=new ee(1,1);specularWeight=1;anisotropyRotation=0;coatAnisotropyRotation=0;coatAffectRoughness=0;transmissionExtraRoughness=0;materialType=0;constructor(){}toVec4Array(){return[new $(this.baseColor.x,this.baseColor.y,this.baseColor.z,this.anisotropic),new $(this.emission.x,this.emission.y,this.emission.z,this.mediumThickness),new $(this.metallic,this.roughness,this.subsurface,this.specularTint),new $(this.sheen,this.sheenTint,this.clearcoat,this.clearcoatGloss),new $(this.specTrans,this.ior,this.mediumType,this.mediumDensity),new $(this.mediumColor.x,this.mediumColor.y,this.mediumColor.z,this.mediumAnisotropy),new $(this.baseColorTexID,this.metallicRoughnessTexID,this.normalmapTexID,this.emissionmapTexID),new $(this.opacity,this.alphaMode,this.alphaCutoff,this.doubleSided),new $(this.mediumAbsorption,this.baseWeight,this.baseDiffuseRoughness,this.coatDarkening),new $(this.specularColor.x,this.specularColor.y,this.specularColor.z,this.coatIOR),new $(this.coatColor.x,this.coatColor.y,this.coatColor.z,this.coatRoughnessAnisotropy),new $(this.transmissionColor.x,this.transmissionColor.y,this.transmissionColor.z,this.thinWalled),new $(this.subsurfaceRadiusScale.x,this.subsurfaceRadiusScale.y,this.subsurfaceRadiusScale.z,this.fuzzColor.x),new $(this.fuzzRoughness,this.dispersionScale,this.abbeNumber,this.fuzzColor.y),new $(this.thinFilmWeight,this.thinFilmThickness,this.thinFilmIor,this.fuzzColor.z),new $(this.uvScale.x,this.uvScale.y,this.specularWeight,this.anisotropyRotation),new $(this.coatAnisotropyRotation,this.coatAffectRoughness,this.transmissionExtraRoughness,this.materialType)]}};var Ba=class extends Rn{m_max_split_depth;m_num_nodes_for_regular;m_num_nodes_required;m_extra_refs_budget;m_min_overlap;m_num_nodes_archived;m_node_archive=[];constructor(e,t,n,i,s){super(e,t,!0),this.m_max_split_depth=n,this.m_min_overlap=i,this.m_extra_refs_budget=s,this.m_num_nodes_required=0,this.m_num_nodes_for_regular=0,this.m_num_nodes_archived=0}buildImpl(e,t){let n=new Array(t),i=new Array(t),s=new j;for(let o=0;o<t;++o){let a=e[o].center();n[o]={bounds:e[o],center:a,idx:o},s.grow(a)}this.m_num_nodes_for_regular=2*t-1,this.m_num_nodes_required=Math.floor(this.m_num_nodes_for_regular*(1+this.m_extra_refs_budget)),this.initNodeAllocator(this.m_num_nodes_required);let r={startidx:0,numprims:t,ptr:null,isLeft:!1,bounds:this.m_bounds,centroid_bounds:s,level:0,index:0};this.buildNodeSplit(r,n)}buildNodeSplit(e,t){this.m_height=Math.max(this.m_height,e.level);let n=this.allocateNode();if(n.bounds=e.bounds,e.numprims<4){n.type=1,n.startidx=this.m_packed_indices.length,n.numprims=e.numprims;for(let i=e.startidx;i<e.startidx+e.numprims;++i)this.m_packed_indices.push(t[i].idx)}else{n.type=0;let i=e.centroid_bounds.maxdim(),s=e.centroid_bounds.center().get(i),r=this.findObjectSahSplit(e,t),o={dim:0,split:NaN,sah:Number.MAX_VALUE,overlap:0},a=0;if(e.level<this.m_max_split_depth&&this.m_nodecnt<this.m_num_nodes_required&&r.overlap>this.m_min_overlap&&(o=this.findSpatialSahSplit(e,t),!isNaN(o.split)&&o.sah<r.sah&&(a=1)),a===1){let M=e.startidx+e.numprims*2;t.length<M&&(t.length=M);let w=0;this.splitPrimRefs(o,e,t,v=>{w=v}),e.numprims+=w,s=o.split,i=o.dim}else s=isNaN(r.split)?s:r.split,i=isNaN(r.split)?i:r.dim;let c=new j,u=new j,h=new j,d=new j,f=e.startidx,m=e.numprims+e.startidx&1,g=(M,w)=>M<w,p=(M,w)=>M>=w,x=m?g:p,y=m?p:g;if(e.centroid_bounds.extents().get(i)>0){let M=e.startidx,w=e.startidx+e.numprims;for(;;){for(;M!==w&&x(t[M].center.get(i),s);)c.grow(t[M].bounds),h.grow(t[M].center),++M;if(M===w--)break;for(u.grow(t[M].bounds),d.grow(t[M].center);M!==w&&y(t[w].center.get(i),s);)u.grow(t[w].bounds),d.grow(t[w].center),--w;if(M===w)break;c.grow(t[w].bounds),h.grow(t[w].center),[t[M++],t[w]]=[t[w],t[M]]}f=M}if(f===e.startidx||f===e.startidx+e.numprims){f=e.startidx+(e.numprims>>1);for(let M=e.startidx;M<f;++M)c.grow(t[M].bounds),h.grow(t[M].center);for(let M=f;M<e.startidx+e.numprims;++M)u.grow(t[M].bounds),d.grow(t[M].center)}let b={startidx:e.startidx,numprims:f-e.startidx,ptr:n,isLeft:!0,bounds:c,centroid_bounds:h,level:e.level+1,index:0},T={startidx:f,numprims:e.numprims-(f-e.startidx),ptr:n,isLeft:!1,bounds:u,centroid_bounds:d,level:e.level+1,index:0};this.buildNodeSplit(T,t),this.buildNodeSplit(b,t)}e.ptr&&(e.isLeft?e.ptr.lc=n:e.ptr.rc=n)}findObjectSahSplit(e,t){let n=-1,i=Number.MAX_VALUE,s={dim:0,split:NaN,sah:i,overlap:0},r=e.centroid_bounds.extents();if(_.dot(r,r)===0)return s;let o=[[],[],[]];o[0]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new j,count:0})),o[1]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new j,count:0})),o[2]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new j,count:0}));let a=1/e.bounds.surfaceArea(),c=e.centroid_bounds.pmin;for(let u=0;u<3;++u){let h=c.get(u),d=r.get(u),f=1/d;if(d===0)continue;for(let b=0;b<this.m_num_bins;++b)o[u][b].count=0,o[u][b].bounds=new j;for(let b=e.startidx;b<e.startidx+e.numprims;++b){let T=b,M=Math.min(Math.floor(this.m_num_bins*((t[T].center.get(u)-h)*f)),this.m_num_bins-1);o[u][M].count++,o[u][M].bounds.grow(t[T].bounds)}let m=new Array(this.m_num_bins-1),g=new j;for(let b=this.m_num_bins-1;b>0;--b)g.grow(o[u][b].bounds),m[b-1]=g.clone();let p=new j,x=0,y=e.numprims;for(let b=0;b<this.m_num_bins-1;++b){p.grow(o[u][b].bounds),x+=o[u][b].count,y-=o[u][b].count;let T=this.m_traversal_cost+(x*p.surfaceArea()+y*m[b].surfaceArea())*a;T<i&&(s.dim=u,n=b,i=T,s.overlap=Xc(p,m[b]).surfaceArea()*a)}}return n!==-1&&(s.split=c.get(s.dim)+(n+1)*(r.get(s.dim)/this.m_num_bins),s.sah=i),s}findSpatialSahSplit(e,t){let s={dim:0,split:NaN,sah:Number.MAX_VALUE,overlap:0},r=e.bounds.extents(),o=1/e.bounds.surfaceArea();if(_.dot(r,r)===0)return s;let a=[[],[],[]];for(let f=0;f<3;++f)a[f]=Array(128).fill(null).map(()=>({bounds:new j,enter:0,exit:0}));let c=e.bounds.pmin,u=e.bounds.extents().scale(1/128),h=new _(1/u.x,1/u.y,1/u.z);for(let f=e.startidx;f<e.startidx+e.numprims;++f){let m=t[f],g=_.clamp(m.bounds.pmin.subtract(c).multiply(h),new _(0,0,0),new _(127,127,127)),p=_.clamp(m.bounds.pmax.subtract(c).multiply(h),g,new _(127,127,127));for(let x=0;x<3;++x){if(r.get(x)===0)continue;let y=m;for(let b=g.get(x);b<p.get(x);++b){let T={...y},M={...y},w=c.get(x)+u.get(x)*(b+1);this.splitPrimRef(y,x,w,T,M)&&(a[x][b].bounds.grow(T.bounds),y=M)}a[x][p.get(x)].bounds.grow(y.bounds),a[x][g.get(x)].enter++,a[x][p.get(x)].exit++}}let d=new Array(127);for(let f=0;f<3;++f){if(r.get(f)===0)continue;let m=new j;for(let y=127;y>0;--y)m=Wc(m,a[f][y].bounds),d[y-1]=m.clone();let g=new j,p=0,x=e.numprims;for(let y=1;y<128;++y){g.grow(a[f][y-1].bounds),p+=a[f][y-1].enter,x-=a[f][y-1].exit;let b=this.m_traversal_cost+(g.surfaceArea()+d[y-1].surfaceArea()*x)*o;b<s.sah&&(s.sah=b,s.dim=f,s.split=c.get(f)+u.get(f)*y,s.overlap=0)}}return s}splitPrimRef(e,t,n,i,s){return i.idx=s.idx=e.idx,i.bounds=e.bounds.clone(),s.bounds=e.bounds.clone(),n>e.bounds.pmin.get(t)&&n<e.bounds.pmax.get(t)?(i.bounds.pmax.set(t,n),s.bounds.pmin.set(t,n),!0):!1}splitPrimRefs(e,t,n,i){let s=t.numprims;for(let r=t.startidx;r<t.startidx+t.numprims;++r){if(t.startidx+s>=n.length)throw new Error("Out of bounds");let o={...n[r]},a={...n[r]};this.splitPrimRef(n[r],e.dim,e.split,o,a)&&(n[r]=o,n[t.startidx+s++]=a)}i(s-t.numprims)}allocateNode(){if(this.m_nodecnt-this.m_num_nodes_archived>=this.m_num_nodes_for_regular){this.m_node_archive.push(this.m_nodes),this.m_num_nodes_archived+=this.m_num_nodes_for_regular,this.m_nodes=new Array(this.m_num_nodes_for_regular);for(let e=0;e<this.m_num_nodes_for_regular;++e)this.m_nodes[e]=new Jn}return this.m_nodes[this.m_nodecnt++-this.m_num_nodes_archived]}initNodeAllocator(e){this.m_node_archive=[],this.m_nodecnt=0,this.m_nodes=new Array(e);for(let t=0;t<e;++t)this.m_nodes[t]=new Jn}printStatistics(){let e=Math.floor((this.m_num_nodes_for_regular+1)/2),t=this.m_packed_indices.length;return["Class name: SplitBvh","SAH: enabled (forced)",`SAH bins: ${this.m_num_bins}`,`Max split depth: ${this.m_max_split_depth}`,`Min node overlap: ${this.m_min_overlap}`,`Number of triangles: ${e}`,`Number of triangle refs: ${t}`,`Ref duplication: ${(t-e)/e*100}%`,`Number of nodes: ${this.m_nodecnt}`,`Number of nodes in corresponding non-split BVH: ${this.m_num_nodes_for_regular}`,`Node overhead: ${(this.m_nodecnt-this.m_num_nodes_for_regular)/this.m_num_nodes_for_regular*100}%`,`Tree height: ${this.getHeight()}`].join(`
`)}getHeight(){return this.m_height}};var sc=class extends Error{constructor(e){super(`found duplicate attribute: ${e.key}`)}},le=class{constructor(e,t,n,i=!1){this.key=e;this.size=t;this.type=n;this.normalized=i;switch(n){case"BYTE":case"UNSIGNED_BYTE":this.sizeOfType=1;break;case"SHORT":case"UNSIGNED_SHORT":this.sizeOfType=2;break;case"FLOAT":this.sizeOfType=4;break;default:throw new Error(`Unknown gl type: ${n}`)}this.sizeInBytes=this.sizeOfType*t}key;size;type;normalized;sizeOfType;sizeInBytes},Se=class{static POSITION=new le("position",3,"FLOAT");static NORMAL=new le("normal",3,"FLOAT");static TANGENT=new le("tangent",3,"FLOAT");static BITANGENT=new le("bitangent",3,"FLOAT");static UV=new le("uv",2,"FLOAT");static MATERIAL_INDEX=new le("materialIndex",1,"SHORT");static MATERIAL_ENABLED=new le("materialEnabled",1,"UNSIGNED_SHORT");static AMBIENT=new le("ambient",3,"FLOAT");static DIFFUSE=new le("diffuse",3,"FLOAT");static SPECULAR=new le("specular",3,"FLOAT");static SPECULAR_EXPONENT=new le("specularExponent",3,"FLOAT");static EMISSIVE=new le("emissive",3,"FLOAT");static TRANSMISSION_FILTER=new le("transmissionFilter",3,"FLOAT");static DISSOLVE=new le("dissolve",1,"FLOAT");static ILLUMINATION=new le("illumination",1,"UNSIGNED_SHORT");static REFRACTION_INDEX=new le("refractionIndex",1,"FLOAT");static SHARPNESS=new le("sharpness",1,"FLOAT");static MAP_DIFFUSE=new le("mapDiffuse",1,"SHORT");static MAP_AMBIENT=new le("mapAmbient",1,"SHORT");static MAP_SPECULAR=new le("mapSpecular",1,"SHORT");static MAP_SPECULAR_EXPONENT=new le("mapSpecularExponent",1,"SHORT");static MAP_DISSOLVE=new le("mapDissolve",1,"SHORT");static ANTI_ALIASING=new le("antiAliasing",1,"UNSIGNED_SHORT");static MAP_BUMP=new le("mapBump",1,"SHORT");static MAP_DISPLACEMENT=new le("mapDisplacement",1,"SHORT");static MAP_DECAL=new le("mapDecal",1,"SHORT");static MAP_EMISSIVE=new le("mapEmissive",1,"SHORT");stride;attributes;attributeMap;constructor(...e){this.attributes=e,this.attributeMap={};let t=0,n=0;for(let i of e){if(this.attributeMap[i.key])throw new sc(i);t%i.sizeOfType!==0&&(t+=i.sizeOfType-t%i.sizeOfType,console.warn("Layout requires padding before "+i.key+" attribute")),this.attributeMap[i.key]={attribute:i,size:i.size,type:i.type,normalized:i.normalized,offset:t},t+=i.sizeInBytes,n=Math.max(n,i.sizeOfType)}t%n!==0&&(t+=n-t%n,console.warn("Layout requires padding at the back")),this.stride=t;for(let i of e)this.attributeMap[i.key].stride=this.stride}};var am=/^[og]\s*(.+)?/,om=/^mtllib /,lm=/^usemtl /,cm=/^usemap /,Yu=/\s+/,qu=new E,rc=new E,ju=new E,Ku=new E,Qe=new E,Oa=new q;function um(){let l={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}let n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(i,s){let r=this._finalize(!1);r&&(r.inherited||r.groupCount<=0)&&this.materials.splice(r.index,1);let o={index:this.materials.length,name:i||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:r!==void 0?r.smooth:this.smooth,groupStart:r!==void 0?r.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(a){let c={index:typeof a=="number"?a:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(i){let s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),i&&this.materials.length>1)for(let r=this.materials.length-1;r>=0;r--)this.materials[r].groupCount<=0&&this.materials.splice(r,1);return i&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},n&&n.name&&typeof n.clone=="function"){let i=n.clone(0);i.inherited=!0,this.object.materials.push(i)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){let i=this.vertices,s=this.object.geometry.vertices;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addVertexPoint:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){let i=this.normals,s=this.object.geometry.normals;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addFaceNormal:function(e,t,n){let i=this.vertices,s=this.object.geometry.normals;qu.fromArray(i,e),rc.fromArray(i,t),ju.fromArray(i,n),Qe.subVectors(ju,rc),Ku.subVectors(qu,rc),Qe.cross(Ku),Qe.normalize(),s.push(Qe.x,Qe.y,Qe.z),s.push(Qe.x,Qe.y,Qe.z),s.push(Qe.x,Qe.y,Qe.z)},addColor:function(e,t,n){let i=this.colors,s=this.object.geometry.colors;i[e]!==void 0&&s.push(i[e+0],i[e+1],i[e+2]),i[t]!==void 0&&s.push(i[t+0],i[t+1],i[t+2]),i[n]!==void 0&&s.push(i[n+0],i[n+1],i[n+2])},addUV:function(e,t,n){let i=this.uvs,s=this.object.geometry.uvs;s.push(i[e+0],i[e+1]),s.push(i[t+0],i[t+1]),s.push(i[n+0],i[n+1])},addDefaultUV:function(){let e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){let t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,i,s,r,o,a,c){let u=this.vertices.length,h=this.parseVertexIndex(e,u),d=this.parseVertexIndex(t,u),f=this.parseVertexIndex(n,u);if(this.addVertex(h,d,f),this.addColor(h,d,f),o!==void 0&&o!==""){let m=this.normals.length;h=this.parseNormalIndex(o,m),d=this.parseNormalIndex(a,m),f=this.parseNormalIndex(c,m),this.addNormal(h,d,f)}else this.addFaceNormal(h,d,f);if(i!==void 0&&i!==""){let m=this.uvs.length;h=this.parseUVIndex(i,m),d=this.parseUVIndex(s,m),f=this.parseUVIndex(r,m),this.addUV(h,d,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";let t=this.vertices.length;for(let n=0,i=e.length;n<i;n++){let s=this.parseVertexIndex(e[n],t);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";let n=this.vertices.length,i=this.uvs.length;for(let s=0,r=e.length;s<r;s++)this.addVertexLine(this.parseVertexIndex(e[s],n));for(let s=0,r=t.length;s<r;s++)this.addUVLine(this.parseUVIndex(t[s],i))}};return l.startObject("",!1),l}var Ei=class extends Ye{constructor(e){super(e),this.materials=null}load(e,t,n,i){let s=this,r=new Xt(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(o){try{t(s.parse(o))}catch(a){i?i(a):console.error(a),s.manager.itemError(e)}},n,i)}setMaterials(e){return this.materials=e,this}parse(e){let t=new um;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));let n=e.split(`
`),i=[];for(let o=0,a=n.length;o<a;o++){let c=n[o].trimStart();if(c.length===0)continue;let u=c.charAt(0);if(u!=="#")if(u==="v"){let h=c.split(Yu);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(Oa.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),ye),t.colors.push(Oa.r,Oa.g,Oa.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(u==="f"){let d=c.slice(1).trim().split(Yu),f=[];for(let g=0,p=d.length;g<p;g++){let x=d[g];if(x.length>0){let y=x.split("/");f.push(y)}}let m=f[0];for(let g=1,p=f.length-1;g<p;g++){let x=f[g],y=f[g+1];t.addFace(m[0],x[0],y[0],m[1],x[1],y[1],m[2],x[2],y[2])}}else if(u==="l"){let h=c.substring(1).trim().split(" "),d=[],f=[];if(c.indexOf("/")===-1)d=h;else for(let m=0,g=h.length;m<g;m++){let p=h[m].split("/");p[0]!==""&&d.push(p[0]),p[1]!==""&&f.push(p[1])}t.addLineGeometry(d,f)}else if(u==="p"){let d=c.slice(1).trim().split(" ");t.addPointGeometry(d)}else if((i=am.exec(c))!==null){let h=(" "+i[0].slice(1).trim()).slice(1);t.startObject(h)}else if(lm.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(om.test(c))t.materialLibraries.push(c.substring(7).trim());else if(cm.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(i=c.split(" "),i.length>1){let d=i[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;let h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}t.finalize();let s=new Vt;if(s.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let o=0,a=t.objects.length;o<a;o++){let c=t.objects[o],u=c.geometry,h=c.materials,d=u.type==="Line",f=u.type==="Points",m=!1;if(u.vertices.length===0)continue;let g=new Je;g.setAttribute("position",new Ue(u.vertices,3)),u.normals.length>0&&g.setAttribute("normal",new Ue(u.normals,3)),u.colors.length>0&&(m=!0,g.setAttribute("color",new Ue(u.colors,3))),u.hasUVIndices===!0&&g.setAttribute("uv",new Ue(u.uvs,2));let p=[];for(let y=0,b=h.length;y<b;y++){let T=h[y],M=T.name+"_"+T.smooth+"_"+m,w=t.materials[M];if(this.materials!==null){if(w=this.materials.create(T.name),d&&w&&!(w instanceof yt)){let v=new yt;De.prototype.copy.call(v,w),v.color.copy(w.color),w=v}else if(f&&w&&!(w instanceof ct)){let v=new ct({size:10,sizeAttenuation:!1});De.prototype.copy.call(v,w),v.color.copy(w.color),v.map=w.map,w=v}}w===void 0&&(d?w=new yt:f?w=new ct({size:1,sizeAttenuation:!1}):w=new as,w.name=T.name,w.flatShading=!T.smooth,w.vertexColors=m,t.materials[M]=w),p.push(w)}let x;if(p.length>1){for(let y=0,b=h.length;y<b;y++){let T=h[y];g.addGroup(T.groupStart,T.groupCount,y)}d?x=new fn(g,p):f?x=new Ht(g,p):x=new lt(g,p)}else d?x=new fn(g,p[0]):f?x=new Ht(g,p[0]):x=new lt(g,p[0]);x.name=c.name,s.add(x)}else if(t.vertices.length>0){let o=new ct({size:1,sizeAttenuation:!1}),a=new Je;a.setAttribute("position",new Ue(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(a.setAttribute("color",new Ue(t.colors,3)),o.vertexColors=!0);let c=new Ht(a,o);s.add(c)}return s}};var Ai=class l{vertices;vertexNormals;textures;indices;name="";vertexMaterialIndices;indicesPerMaterial=[];materialNames;materialIndices;materialsByIndex={};tangents=[];bitangents=[];textureStride;constructor(e={}){this.vertices=[],this.vertexNormals=[],this.textures=[],this.indices=[],this.vertexMaterialIndices=[],this.materialNames=[],this.materialIndices={},this.textureStride=e.enableWTextureCoord?3:2}static loadObjFile(e,t){t=t||{},t.materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord;let i=new Ei().parse(e);return l.fromThreeObject(i,t)}static fromThreeObject(e,t){t=t||{},t.materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord;let n=r=>Array.from(r.array),i=r=>{let o=r.getIndex();if(o)return Array.from(o.array);let a=r.getAttribute("position");return a?Array.from({length:a.count},(c,u)=>u):[]},s=[];return e.traverse(r=>{let o=r;if(!o.isMesh)return;let a=o.geometry,c=a.getAttribute("position");if(!c||c.count===0)return;let u=new l(t);u.name=o.name||"",u.vertices=n(c);let h=a.getAttribute("normal");if(h)u.vertexNormals=n(h);else{let f=a.clone();f.computeVertexNormals();let m=f.getAttribute("normal");u.vertexNormals=m?n(m):new Array(c.count*3).fill(0)}let d=a.getAttribute("uv");if(d){let f=n(d);if(t.enableWTextureCoord){u.textures=[];for(let m=0;m<f.length;m+=2)u.textures.push(f[m],f[m+1],0)}else u.textures=f}else u.textures=[];u.indices=i(a),u.indicesPerMaterial=[u.indices],t.calcTangentsAndBitangents&&u.textures.length>0&&u.calculateTangentsAndBitangents(),s.push(u)}),s}finalizeMesh(e,t,n,i,s){this.vertices=t.verts,this.vertexNormals=t.norms,this.textures=t.textures,this.vertexMaterialIndices=t.materialIndices,this.indices=t.indices[n],this.indicesPerMaterial=t.indices,this.materialNames=i,this.materialIndices=s,this.materialsByIndex={},e.calcTangentsAndBitangents&&this.calculateTangentsAndBitangents()}calculateTangentsAndBitangents(){console.assert(!!(this.vertices&&this.vertices.length&&this.vertexNormals&&this.vertexNormals.length&&this.textures&&this.textures.length),"Missing attributes for calculating tangents and bitangents");let e={tangents:[...new Array(this.vertices.length)].map(r=>0),bitangents:[...new Array(this.vertices.length)].map(r=>0)},t=this.indices,n=this.vertices,i=this.vertexNormals,s=this.textures;for(let r=0;r<t.length;r+=3){let o=t[r+0],a=t[r+1],c=t[r+2],u=n[o*3+0],h=n[o*3+1],d=n[o*3+2],f=s[o*2+0],m=s[o*2+1],g=n[a*3+0],p=n[a*3+1],x=n[a*3+2],y=s[a*2+0],b=s[a*2+1],T=n[c*3+0],M=n[c*3+1],w=n[c*3+2],v=s[c*2+0],S=s[c*2+1],R=g-u,D=p-h,I=x-d,B=T-u,N=M-h,C=w-d,A=y-f,z=b-m,K=v-f,de=S-m,F=A*de-z*K,U=1/Math.abs(F<1e-4?1:F),ne=(R*de-B*z)*U,Y=(D*de-N*z)*U,W=(I*de-C*z)*U,qe=(B*A-R*K)*U,Ct=(N*A-D*K)*U,pt=(C*A-I*K)*U,Yn=i[o*3+0],Jt=i[o*3+1],pe=i[o*3+2],Lr=i[a*3+0],Pr=i[a*3+1],Dr=i[a*3+2],Nr=i[c*3+0],Fr=i[c*3+1],Ur=i[c*3+2],oo=ne*Yn+Y*Jt+W*pe,lo=ne*Lr+Y*Pr+W*Dr,co=ne*Nr+Y*Fr+W*Ur,uo=ne-Yn*oo,ho=Y-Jt*oo,fo=W-pe*oo,po=ne-Lr*lo,mo=Y-Pr*lo,go=W-Dr*lo,xo=ne-Nr*co,_o=Y-Fr*co,yo=W-Ur*co,bo=Math.sqrt(uo*uo+ho*ho+fo*fo),vo=Math.sqrt(po*po+mo*mo+go*go),To=Math.sqrt(xo*xo+_o*_o+yo*yo),Mo=qe*Yn+Ct*Jt+pt*pe,So=qe*Lr+Ct*Pr+pt*Dr,wo=qe*Nr+Ct*Fr+pt*Ur,Eo=qe-Yn*Mo,Ao=Ct-Jt*Mo,Ro=pt-pe*Mo,Co=qe-Lr*So,Io=Ct-Pr*So,Lo=pt-Dr*So,Po=qe-Nr*wo,Do=Ct-Fr*wo,No=pt-Ur*wo,Fo=Math.sqrt(Eo*Eo+Ao*Ao+Ro*Ro),Uo=Math.sqrt(Co*Co+Io*Io+Lo*Lo),Bo=Math.sqrt(Po*Po+Do*Do+No*No);e.tangents[o*3+0]+=uo/bo,e.tangents[o*3+1]+=ho/bo,e.tangents[o*3+2]+=fo/bo,e.tangents[a*3+0]+=po/vo,e.tangents[a*3+1]+=mo/vo,e.tangents[a*3+2]+=go/vo,e.tangents[c*3+0]+=xo/To,e.tangents[c*3+1]+=_o/To,e.tangents[c*3+2]+=yo/To,e.bitangents[o*3+0]+=Eo/Fo,e.bitangents[o*3+1]+=Ao/Fo,e.bitangents[o*3+2]+=Ro/Fo,e.bitangents[a*3+0]+=Co/Uo,e.bitangents[a*3+1]+=Io/Uo,e.bitangents[a*3+2]+=Lo/Uo,e.bitangents[c*3+0]+=Po/Bo,e.bitangents[c*3+1]+=Do/Bo,e.bitangents[c*3+2]+=No/Bo}this.tangents=e.tangents,this.bitangents=e.bitangents}makeBufferData(e){let t=this.vertices.length/3,n=new ArrayBuffer(e.stride*t);n.numItems=t;let i=new DataView(n);for(let s=0,r=0;s<t;s++){r=s*e.stride;for(let o of e.attributes){let a=r+e.attributeMap[o.key].offset;switch(o.key){case Se.POSITION.key:i.setFloat32(a,this.vertices[s*3],!0),i.setFloat32(a+4,this.vertices[s*3+1],!0),i.setFloat32(a+8,this.vertices[s*3+2],!0);break;case Se.UV.key:i.setFloat32(a,this.textures[s*2],!0),i.setFloat32(a+4,this.textures[s*2+1],!0);break;case Se.NORMAL.key:i.setFloat32(a,this.vertexNormals[s*3],!0),i.setFloat32(a+4,this.vertexNormals[s*3+1],!0),i.setFloat32(a+8,this.vertexNormals[s*3+2],!0);break;case Se.MATERIAL_INDEX.key:i.setInt16(a,this.vertexMaterialIndices[s],!0);break;case Se.AMBIENT.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.ambient[0],!0),i.setFloat32(a+4,u.ambient[1],!0),i.setFloat32(a+8,u.ambient[2],!0);break}case Se.DIFFUSE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.diffuse[0],!0),i.setFloat32(a+4,u.diffuse[1],!0),i.setFloat32(a+8,u.diffuse[2],!0);break}case Se.SPECULAR.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.specular[0],!0),i.setFloat32(a+4,u.specular[1],!0),i.setFloat32(a+8,u.specular[2],!0);break}case Se.SPECULAR_EXPONENT.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.specularExponent,!0);break}case Se.EMISSIVE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.emissive[0],!0),i.setFloat32(a+4,u.emissive[1],!0),i.setFloat32(a+8,u.emissive[2],!0);break}case Se.TRANSMISSION_FILTER.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.transmissionFilter[0],!0),i.setFloat32(a+4,u.transmissionFilter[1],!0),i.setFloat32(a+8,u.transmissionFilter[2],!0);break}case Se.DISSOLVE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.dissolve,!0);break}case Se.ILLUMINATION.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setInt16(a,u.illumination,!0);break}case Se.REFRACTION_INDEX.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.refractionIndex,!0);break}case Se.SHARPNESS.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(a,u.sharpness,!0);break}case Se.ANTI_ALIASING.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setInt16(a,u.antiAliasing?1:0,!0);break}}}}return n}makeIndexBufferData(){let e=new Uint16Array(this.indices);return e.numItems=this.indices.length,e}makeIndexBufferDataForMaterials(...e){let t=new Array().concat(...e.map(i=>this.indicesPerMaterial[i])),n=new Uint16Array(t);return n.numItems=t.length,n}addMaterialLibrary(e){for(let t in e.materials){if(!(t in this.materialIndices))continue;let n=e.materials[t],i=this.materialIndices[n.name];this.materialsByIndex[i]=n}}};var Ga=class{static async loadObjFileAsync(e){let t=new Ei;try{let n=await t.loadAsync(e);return Ai.fromThreeObject(n)}catch{let i=await ue(e);if(!i.ok)throw new Error(`Failed to load OBJ file: ${i.statusText}`);let s=await i.text();return Ai.loadObjFile(s)}}};var bs=class{static degrees(e){return e*(180/Math.PI)}static radians(e){return e*(Math.PI/180)}static clamp(e,t,n){return Math.min(n,Math.max(e,t))}};var pn=class{name="";verticesUVX=[];normalsUVY=[];bvh;constructor(){this.bvh=new Ba(2,64,0,.001,0)}dispose(){this.verticesUVX=[],this.normalsUVY=[],this.bvh=null}async loadFromFileAsync(e){this.name=e;let t=[];try{t=await Ga.loadObjFileAsync(e)}catch(n){return console.error("Unable to load model",n),!1}for(let n of t){let i=n.vertices,s=n.vertexNormals,r=n.textures;for(let o=0;o<n.indices.length;o+=3)for(let a=0;a<3;a++){let c=n.indices[o+a],u=i[3*c+0],h=i[3*c+1],d=i[3*c+2],f=s[3*c+0],m=s[3*c+1],g=s[3*c+2],p,x;r&&r.length>0?(p=r[2*c+0],x=1-r[2*c+1]):a===0?p=x=0:a===1?(p=0,x=1):p=x=1,this.verticesUVX.push(new $(u,h,d,p)),this.normalsUVY.push(new $(f,m,g,x))}}return!0}buildBVH(){let e=Math.floor(this.verticesUVX.length/3),t=new Array(e);for(let n=0;n<e;++n){let i=new _(this.verticesUVX[n*3+0].x,this.verticesUVX[n*3+0].y,this.verticesUVX[n*3+0].z),s=new _(this.verticesUVX[n*3+1].x,this.verticesUVX[n*3+1].y,this.verticesUVX[n*3+1].z),r=new _(this.verticesUVX[n*3+2].x,this.verticesUVX[n*3+2].y,this.verticesUVX[n*3+2].z),o=new j;o.grow(i),o.grow(s),o.grow(r),t[n]=o}this.bvh.build(t)}},mn=class{name;meshID;transform;materialID;constructor(e,t,n,i){this.name=e,this.meshID=t,this.transform=n,this.materialID=i}};var Ri=class{renderOptions=new jn;meshes=[];transforms=[];materials=[];meshInstances=[];lights=[];envMap=null;camera=null;textures=[];proceduralMaterialGlsl="";proceduralEnvGlsl="";materialxEnvStrategy="cpu";materialxLightStrategy="cpu";initialized=!1;dirty=!0;instancesModified=!1;envMapModified=!1;sceneName;constructor(e){this.sceneName=e}dispose(){this.meshes.forEach(e=>e.dispose?.()),this.meshes=[],this.textures.forEach(e=>e.dispose?.()),this.textures=[],this.proceduralMaterialGlsl="",this.proceduralEnvGlsl="",this.materialxEnvStrategy="cpu",this.materialxLightStrategy="cpu",this.camera=null,this.envMap=null}createRenderer(){throw new Error("Unsupported render mode")}addCamera(e,t,n){this.camera=new Qn(e,t,n)}async addMeshAsync(e){let t=this.meshes.findIndex(i=>i.name===`scenes/pathtracer/${e}`);if(t!==-1)return t;let n=new pn;return console.log(`Loading model ${e}`),await n.loadFromFileAsync(`scenes/pathtracer/${e}`)?(this.meshes.push(n),this.meshes.length-1):(console.log(`Unable to load model ${e}`),-1)}async addTextureAsync(e){let t=this.textures.findIndex(i=>i.name===`scenes/pathtracer/${e}`);if(t!==-1)return t;let n=new mt;return console.log(`Loading texture ${e}`),e.startsWith("http")||(e=`scenes/pathtracer/${e}`),await n.loadTextureAsync(e)?(this.textures.push(n),this.textures.length-1):(console.log(`Unable to load texture ${e}`),-1)}async addTextureByUrlAsync(e){let t=this.textures.findIndex(i=>i.name===e);if(t!==-1)return t;let n=new mt;return console.log(`Loading texture ${e}`),await n.loadTextureAsync(e)?(this.textures.push(n),this.textures.length-1):(console.log(`Unable to load texture ${e}`),-1)}addMaterial(e){return this.materials.push(e),this.materials.length-1}async addEnvMapAsync(e){this.envMap&&(this.envMap.dispose(),this.envMap=null),this.envMap=new ys,await this.envMap.loadMapAsync(`/scenes/pathtracer/${e}`)?console.log(`HDR ${e} loaded`):(console.log(`Unable to load HDR ${e}`),this.envMap=null),this.envMapModified=!0,this.dirty=!0}async addEnvMapByUrlAsync(e){this.envMap&&(this.envMap.dispose(),this.envMap=null),this.envMap=new ys;let t=e.startsWith("/")||e.startsWith("http")?e:`/${e}`;await this.envMap.loadMapAsync(t)?console.log(`HDR ${e} loaded`):(console.log(`Unable to load HDR ${e}`),this.envMap=null),this.envMapModified=!0,this.dirty=!0}addMeshInstance(e){return this.meshInstances.push(e),this.meshInstances.length-1}addLight(e){return this.lights.push(e),this.lights.length-1}rebuildInstances(){}async processSceneAsync(){}getDefines(e=!1){let t="",n="";return this.renderOptions.enableEnvMap&&(e||this.envMap)&&(t+=`#define OPT_ENVMAP
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
`),[t,n]}};var ut=class extends Ri{vertIndices=[];verticesUVX=[];normalsUVY=[];sceneBvh;bvhTranslator=new Vr;sceneBounds=new j;textureMapsArray=new Uint8Array;constructor(e){super(e),this.sceneBvh=new Rn(10,64,!1)}createRenderer(){return new Kn(this)}dispose(){super.dispose(),this.bvhTranslator=null,this.sceneBvh=null,this.textureMapsArray=null}largePush(e,t){let n=e.length;for(let i=0;i<n;i++)t.push(e[i])}createTLAS(){let e=this.meshInstances.map((t,n)=>{let s=this.meshes[t.meshID].bvh.bounds(),r=t.transform,o=s.pmin,a=s.pmax,c=new _(r.data[0][0],r.data[0][1],r.data[0][2]),u=new _(r.data[1][0],r.data[1][1],r.data[1][2]),h=new _(r.data[2][0],r.data[2][1],r.data[2][2]),d=new _(r.data[3][0],r.data[3][1],r.data[3][2]),f=c.scale(o.x),m=c.scale(a.x),g=u.scale(o.y),p=u.scale(a.y),x=h.scale(o.z),y=h.scale(a.z),b=_.min(f,m).add(_.min(g,p)).add(_.min(x,y)).add(d),T=_.max(f,m).add(_.max(g,p)).add(_.max(x,y)).add(d);return new j(b,T)});this.sceneBvh.build(e),this.sceneBounds=this.sceneBvh.bounds()}createBLAS(){this.meshes.forEach(e=>{console.log(`Building BVH for ${e.name}`),e.buildBVH()})}get topLevelIndex(){return this.bvhTranslator.topLevelIndex}rebuildInstances(){this.instancesModified=!0,this.dirty=!0,this.sceneBvh=new Rn(10,64,!1),this.createTLAS(),this.bvhTranslator.updateTLAS(this.sceneBvh,this.meshInstances),this.transforms=this.meshInstances.map(e=>e.transform)}async processSceneAsync(){console.log("Processing scene data"),this.createBLAS(),console.log("Building scene BVH"),this.createTLAS(),console.log("Flattening BVH"),this.bvhTranslator.process(this.sceneBvh,this.meshes,this.meshInstances);let e=0;this.vertIndices=[],this.verticesUVX=[],this.normalsUVY=[],console.log("Copying Mesh Data");for(let t of this.meshes){let n=t.bvh.getNumIndices(),i=t.bvh.getIndices();for(let s=0;s<n;s++){let r=i[s],o=r*3+0+e,a=r*3+1+e,c=r*3+2+e;this.vertIndices.push({x:o,y:a,z:c})}this.largePush(t.verticesUVX,this.verticesUVX),this.largePush(t.normalsUVY,this.normalsUVY),e+=t.verticesUVX.length}if(console.log("Copying transforms"),this.transforms=this.meshInstances.map(t=>t.transform),this.textures.length>0){console.log("Copying and resizing textures");let t=P.gl,n=16384;if(t&&(n=t.raw.getParameter(t.raw.MAX_TEXTURE_SIZE)),this.renderOptions.texArrayHeight*this.textures.length>n){let o=this.renderOptions.texArrayWidth,a=this.renderOptions.texArrayHeight;for(;a*this.textures.length>n;)a=Math.floor(a/2),o=Math.floor(o/2);this.renderOptions.texArrayWidth=o,this.renderOptions.texArrayHeight=a}let i=this.renderOptions.texArrayWidth,s=this.renderOptions.texArrayHeight,r=i*s*4;this.textureMapsArray=new Uint8Array(r*this.textures.length);for(let o=0;o<this.textures.length;o++){let a=this.textures[o],c=null;a.image!==null?c=Yc(a.image,i,s,a.flipY):c=await(await import("sharp")).default(Buffer.from(a.rgba),{raw:{width:a.width,height:a.height,channels:4}}).resize(i,s).flip(a.flipY).raw().toBuffer(),this.textureMapsArray.set(c,o*r)}}if(!this.camera){let t=this.sceneBvh.bounds(),n=t.extents(),i=t.center();this.addCamera(new _(i.x,i.y,i.z+_.Length(n)*2),i,45)}this.initialized=!0}bvhData(e=null){let t=e===null?this.bvhTranslator.nodes:this.bvhTranslator.nodes.slice(e);return new Float32Array(t.flatMap(i=>[i.bboxmin.x,i.bboxmin.y,i.bboxmin.z,i.bboxmax.x,i.bboxmax.y,i.bboxmax.z,i.LRLeaf.x,i.LRLeaf.y,i.LRLeaf.z]))}vertIndicesData(){return new Int32Array(this.vertIndices.flatMap(t=>[t.x,t.y,t.z]))}verticesData(){return new Float32Array(this.verticesUVX.flatMap(t=>[t.x,t.y,t.z,t.w]))}normalsData(){return new Float32Array(this.normalsUVY.flatMap(t=>[t.x,t.y,t.z,t.w]))}materialsData(){return new Float32Array(this.materials.flatMap(t=>t.toVec4Array().flatMap(n=>[n.x,n.y,n.z,n.w])))}transformsData(){return new Float32Array(this.transforms.flatMap(t=>[t.data[0][0],t.data[0][1],t.data[0][2],t.data[0][3],t.data[1][0],t.data[1][1],t.data[1][2],t.data[1][3],t.data[2][0],t.data[2][1],t.data[2][2],t.data[2][3],t.data[3][0],t.data[3][1],t.data[3][2],t.data[3][3]]))}lightsData(){return new Float32Array(this.lights.flatMap(t=>[t.position.x,t.position.y,t.position.z,t.emission.x,t.emission.y,t.emission.z,t.u.x,t.u.y,t.u.z,t.v.x,t.v.y,t.v.z,t.radius,t.area,t.type]))}computeSceneData(e){let t=new ac,n=[],i=this.materials.map(v=>v.toVec4Array()).flat();n=n.concat(i);let s=this.transforms.map(v=>[new $(v.data[0][0],v.data[0][1],v.data[0][2],v.data[0][3]),new $(v.data[1][0],v.data[1][1],v.data[1][2],v.data[1][3]),new $(v.data[2][0],v.data[2][1],v.data[2][2],v.data[2][3]),new $(v.data[3][0],v.data[3][1],v.data[3][2],v.data[3][3])]).flat();n=n.concat(s);let r=this.lights.map(v=>[new $(v.position.x,v.position.y,v.position.z,0),new $(v.emission.x,v.emission.y,v.emission.z,0),new $(v.u.x,v.u.y,v.u.z,0),new $(v.v.x,v.v.y,v.v.z,0),new $(v.radius,v.area,v.type,0)]).flat();n=n.concat(r);let o=this.bvhTranslator.nodes.map(v=>[new $(v.bboxmin.x,v.bboxmin.y,v.bboxmin.z,0),new $(v.bboxmax.x,v.bboxmax.y,v.bboxmax.z,0),new $(v.LRLeaf.x,v.LRLeaf.y,v.LRLeaf.z,0)]).flat();n=n.concat(o);let a=this.vertIndices.map(v=>new $(v.x,v.y,v.z,0));n=n.concat(a);let c=this.verticesUVX.map(v=>new $(v.x,v.y,v.z,v.w));n=n.concat(c);let u=this.normalsUVY.map(v=>new $(v.x,v.y,v.z,v.w));n=n.concat(u);let h=0,d=h+i.length,f=d+s.length,m=f+r.length,g=m+o.length,p=g+a.length,x=p+c.length,y="";this.textures.length>0&&!e?y=`
int textureMapsArrayIndices[${this.textures.length}] = int[](${this.textures.map((v,S)=>S).join(", ")});
`:y=`
int textureMapsArrayIndices[1] = int[](0);
`,t.materialsIndex=h,t.transformsIndex=d,t.lightsIndex=f,t.bvhIndex=m,t.vertexIndicesIndex=g,t.verticesIndex=p,t.normalsIndex=x,t.data=n;let b=new ArrayBuffer(n.length*4*4),T=new Float32Array(b);for(let v=0;v<n.length;v++)T[v*4+0]=n[v].x,T[v*4+1]=n[v].y,T[v*4+2]=n[v].z,T[v*4+3]=n[v].w;t.buffer=b,this.textureMapsArray.length>0&&(t.textureBuffer=this.textureMapsArray.buffer,t.textureWidth=this.renderOptions.texArrayWidth,t.textureHeight=this.renderOptions.texArrayHeight*this.textures.length);let M=this.getDefines(!0)[0].trim(),w=t.data.length>1e3;return t.commonCode=`${w&&!e?"#define OPT_USE_MESHDATA_BLOB":""}
        
${M.trim()}
`.trim(),t.bufferACode=`
vec3 eye = vec3(${this.camera.position.x.toFixed(6)}, ${this.camera.position.y.toFixed(6)}, ${this.camera.position.z.toFixed(6)});
vec3 lookat = vec3(${this.camera.pivot.x.toFixed(6)}, ${this.camera.pivot.y.toFixed(6)}, ${this.camera.pivot.z.toFixed(6)});
float fov = ${(this.camera.fov/Math.PI*180).toFixed(6)};
`.trim(),t.bufferBCode=`
    #define materialsTex (${`${h} + MESH_DATA_OFFSET`})
    #define transformsTex (${`${d} + MESH_DATA_OFFSET`})
    #define lightsTex (${`${f} + MESH_DATA_OFFSET`})
    #define BVH (${`${m} + MESH_DATA_OFFSET`})
    #define vertexIndicesTex (${`${g} + MESH_DATA_OFFSET`})
    #define verticesTex (${`${p} + MESH_DATA_OFFSET`})
    #define normalsTex (${`${x} + MESH_DATA_OFFSET`})

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
`.trim(),t}generateMeshCode(e,t){function n(d){return`vec4(${d.x.toFixed(6)},${d.y.toFixed(6)},${d.z.toFixed(6)},${d.w.toFixed(6)})`}let i=new Map,s=[];for(let d=e.materialsIndex;d<e.transformsIndex;d+=9)s.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3],e.data[d+4],e.data[d+5],e.data[d+6],e.data[d+7],e.data[d+8]]);i.set("Materials",s);let r=[];for(let d=e.transformsIndex;d<e.lightsIndex;d+=4)r.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3]]);i.set("Transforms",r);let o=[];for(let d=e.lightsIndex;d<e.bvhIndex;d+=5)o.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3],e.data[d+4]]);if(i.set("Lights",o),!t){let d=[];for(let p=e.bvhIndex;p<e.vertexIndicesIndex;p+=3)d.push([e.data[p+0],e.data[p+1],e.data[p+2]]);i.set("BVH",d);let f=[];for(let p=e.vertexIndicesIndex;p<e.verticesIndex;p++)f.push([e.data[p]]);i.set("Vertex Indices",f);let m=[];for(let p=e.verticesIndex;p<e.normalsIndex;p++)m.push([e.data[p]]);i.set("Vertices",m);let g=[];for(let p=e.normalsIndex;p<e.data.length;p++)g.push([e.data[p]]);i.set("Normals",g)}let a="        ",c=0,u="";return i.forEach((d,f)=>{u+=a+`// ${f}
`,d.forEach(m=>{u+=a,m.forEach(g=>{u+=n(g)+(c<e.data.length-1?",":""),c++}),u+=`
`})}),`
#define VEC4_COUNT ${t?e.bvhIndex:e.data.length}

vec4[VEC4_COUNT] getData() {
    vec4 data[VEC4_COUNT] = vec4[](
${u.trimEnd()}
    );
    return data;
}
`.trim().trim()}},ac=class{commonCode;bufferACode;bufferBCode;bufferDCode;buffer;textureBuffer;textureWidth;textureHeight;data;bvhIndex;vertexIndicesIndex;verticesIndex;normalsIndex;materialsIndex;transformsIndex;lightsIndex};var Ci=class extends Ri{shadertoyShader=null;constructor(e){super(e)}createRenderer(){return new Zn(this)}async processSceneAsync(){this.camera||this.addCamera(new _(0,0,2),new _(0,0,0),45),this.initialized=!0}};var ie=class l{data;constructor(e=1,t=0,n=0,i=0,s=0,r=1,o=0,a=0,c=0,u=0,h=1,d=0,f=0,m=0,g=0,p=1){this.data=[[e,t,n,i],[s,r,o,a],[c,u,h,d],[f,m,g,p]]}static Translate(e){let t=new l;return t.data[3][0]=e.x,t.data[3][1]=e.y,t.data[3][2]=e.z,t}static Scale(e){let t=new l;return t.data[0][0]=e.x,t.data[1][1]=e.y,t.data[2][2]=e.z,t}static QuatToMatrix(e,t,n,i){let s=new l,r=e+e,o=t+t,a=n+n,c=e*r,u=e*o,h=e*a,d=t*o,f=t*a,m=n*a,g=i*r,p=i*o,x=i*a;return s.data[0][0]=1-(d+m),s.data[0][1]=u+x,s.data[0][2]=h-p,s.data[0][3]=0,s.data[1][0]=u-x,s.data[1][1]=1-(c+m),s.data[1][2]=f+g,s.data[1][3]=0,s.data[2][0]=h+p,s.data[2][1]=f-g,s.data[2][2]=1-(c+d),s.data[2][3]=0,s.data[3][0]=0,s.data[3][1]=0,s.data[3][2]=0,s.data[3][3]=1,s}multiply(e){let t=new l;for(let n=0;n<4;++n)for(let i=0;i<4;++i){t.data[n][i]=0;for(let s=0;s<4;++s)t.data[n][i]+=this.data[n][s]*e.data[s][i]}return t}get(e){return this.data[e]}decompose(){let e=new _(this.data[3][0],this.data[3][1],this.data[3][2]),t=new _(Math.sqrt(this.data[0][0]*this.data[0][0]+this.data[0][1]*this.data[0][1]+this.data[0][2]*this.data[0][2]),Math.sqrt(this.data[1][0]*this.data[1][0]+this.data[1][1]*this.data[1][1]+this.data[1][2]*this.data[1][2]),Math.sqrt(this.data[2][0]*this.data[2][0]+this.data[2][1]*this.data[2][1]+this.data[2][2]*this.data[2][2])),n=new _(this.data[0][0]/t.x,this.data[1][1]/t.y,this.data[2][2]/t.z);return{translation:e,scale:t,rotation:n}}static fromDecomposed(e,t,n){let i=l.QuatToMatrix(n.x,n.y,n.z,1),s=l.Scale(t);return l.Translate(e).multiply(s).multiply(i)}};function oc(l,e){if(e===Zl)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),l;if(e===wi||e===_s){let t=l.getIndex();if(t===null){let r=[],o=l.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);l.setIndex(r),t=l.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),l}let n=t.count-2,i=[];if(e===wi)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=l.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),l}function Ju(l){let e=new Map,t=new Map,n=l.clone();return Qu(l,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let s=i,r=e.get(i),o=r.skeleton.bones;s.skeleton=r.skeleton.clone(),s.bindMatrix.copy(r.bindMatrix),s.skeleton.bones=o.map(function(a){return t.get(a)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Qu(l,e,t){t(l,e);for(let n=0;n<l.children.length;n++)Qu(l.children[n],e.children[n],t)}var za=class extends Ye{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new pc(t)}),this.register(function(t){return new mc(t)}),this.register(function(t){return new Sc(t)}),this.register(function(t){return new wc(t)}),this.register(function(t){return new Ec(t)}),this.register(function(t){return new xc(t)}),this.register(function(t){return new _c(t)}),this.register(function(t){return new yc(t)}),this.register(function(t){return new bc(t)}),this.register(function(t){return new fc(t)}),this.register(function(t){return new vc(t)}),this.register(function(t){return new gc(t)}),this.register(function(t){return new Mc(t)}),this.register(function(t){return new Tc(t)}),this.register(function(t){return new hc(t)}),this.register(function(t){return new ka(t,J.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new ka(t,J.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ac(t)})}load(e,t,n,i){let s=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let c=Yt.extractUrlBase(e);r=Yt.resolveURL(c,this.path)}else r=Yt.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},a=new Xt(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(c){try{s.parse(c,r,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,r={},o={},a=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(a.decode(new Uint8Array(e,0,4))===sh){try{r[J.KHR_BINARY_GLTF]=new Rc(e)}catch(h){i&&i(h);return}s=JSON.parse(r[J.KHR_BINARY_GLTF].content)}else s=JSON.parse(a.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Fc(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case J.KHR_MATERIALS_UNLIT:r[h]=new dc;break;case J.KHR_DRACO_MESH_COMPRESSION:r[h]=new Cc(s,this.dracoLoader);break;case J.KHR_TEXTURE_TRANSFORM:r[h]=new Ic;break;case J.KHR_MESH_QUANTIZATION:r[h]=new Lc;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(r),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function hm(){let l={};return{get:function(e){return l[e]},add:function(e,t){l[e]=t},remove:function(e){delete l[e]},removeAll:function(){l={}}}}function xe(l,e,t){let n=l.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var J={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},hc=class{constructor(e){this.parser=e,this.name=J.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,a=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,u=new q(16777215);a.color!==void 0&&u.setRGB(a.color[0],a.color[1],a.color[2],Pe);let h=a.range!==void 0?a.range:0;switch(a.type){case"directional":c=new ms(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ps(u),c.distance=h;break;case"spot":c=new fs(u),c.distance=h,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle!==void 0?a.spot.innerConeAngle:0,a.spot.outerConeAngle=a.spot.outerConeAngle!==void 0?a.spot.outerConeAngle:Math.PI/4,c.angle=a.spot.outerConeAngle,c.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+a.type)}return c.position.set(0,0,0),Et(c,a),a.intensity!==void 0&&(c.intensity=a.intensity),c.name=t.createUniqueName(a.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(a){return n._getNodeRef(t.cache,o,a)})}},dc=class{constructor(){this.name=J.KHR_MATERIALS_UNLIT}getMaterialType(){return _t}extendParams(e,t,n){let i=[];e.color=new q(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],Pe),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,ye))}return Promise.all(i)}},fc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},pc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ce(s,s)}return Promise.all(i)}},mc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_DISPERSION}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},gc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},xc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_SHEEN}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new q(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Pe)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,ye)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},_c=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},yc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_VOLUME}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let s=n.attenuationColor||[1,1,1];return t.attenuationColor=new q().setRGB(s[0],s[1],s[2],Pe),Promise.all(i)}},bc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_IOR}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},vc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_SPECULAR}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let s=n.specularColorFactor||[1,1,1];return t.specularColor=new q().setRGB(s[0],s[1],s[2],Pe),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,ye)),Promise.all(i)}},Tc=class{constructor(e){this.parser=e,this.name=J.EXT_MATERIALS_BUMP}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Mc=class{constructor(e){this.parser=e,this.name=J.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return xe(this.parser,e,this.name)!==null?Oe:null}extendMaterialParams(e,t){let n=xe(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Sc=class{constructor(e){this.parser=e,this.name=J.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}},wc=class{constructor(e){this.parser=e,this.name=J.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],a=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(a=c)}return n.loadTextureImage(e,r.source,a)}},Ec=class{constructor(e){this.parser=e,this.name=J.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],a=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(a=c)}return n.loadTextureImage(e,r.source,a)}},ka=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let a=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(o,a,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){let f=new ArrayBuffer(u*h);return r.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}},Ac=class{constructor(e){this.name=J.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==et.TRIANGLES&&c.mode!==et.TRIANGLE_STRIP&&c.mode!==et.TRIANGLE_FAN&&c.mode!==void 0)return null;let r=n.extensions[this.name].attributes,o=[],a={};for(let c in r)o.push(this.parser.getDependency("accessor",r[c]).then(u=>(a[c]=u,a[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let m of h){let g=new te,p=new E,x=new We,y=new E(1,1,1),b=new ss(m.geometry,m.material,d);for(let T=0;T<d;T++)a.TRANSLATION&&p.fromBufferAttribute(a.TRANSLATION,T),a.ROTATION&&x.fromBufferAttribute(a.ROTATION,T),a.SCALE&&y.fromBufferAttribute(a.SCALE,T),b.setMatrixAt(T,g.compose(p,x,y));for(let T in a)if(T==="_COLOR_0"){let M=a[T];b.instanceColor=new dn(M.array,M.itemSize,M.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&m.geometry.setAttribute(T,a[T]);ge.prototype.copy.call(b,m),this.parser.assignFinalMaterial(b),f.push(b)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},sh="glTF",vs=12,eh={JSON:1313821514,BIN:5130562},Rc=class{constructor(e){this.name=J.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,vs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==sh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-vs,s=new DataView(e,vs),r=0;for(;r<i;){let o=s.getUint32(r,!0);r+=4;let a=s.getUint32(r,!0);if(r+=4,a===eh.JSON){let c=new Uint8Array(e,vs+r,o);this.content=n.decode(c)}else if(a===eh.BIN){let c=vs+r;this.body=e.slice(c,c+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Cc=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=J.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},a={},c={};for(let u in r){let h=Dc[u]||u.toLowerCase();o[h]=r[u]}for(let u in e.attributes){let h=Dc[u]||u.toLowerCase();if(r[u]!==void 0){let d=n.accessors[e.attributes[u]],f=Ii[d.componentType];c[h]=f.name,a[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(let m in f.attributes){let g=f.attributes[m],p=a[m];p!==void 0&&(g.normalized=p)}h(f)},o,c,Pe,d)})})}},Ic=class{constructor(){this.name=J.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Lc=class{constructor(){this.name=J.KHR_MESH_QUANTIZATION}},Va=class extends bt{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=o*2,c=o*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,m=e*c,g=m-c,p=-2*f+3*d,x=f-d,y=1-p,b=x-d+h;for(let T=0;T!==o;T++){let M=r[g+T+o],w=r[g+T+a]*u,v=r[m+T+o],S=r[m+T]*u;s[T]=y*M+b*w+p*v+x*S}return s}},dm=new We,Pc=class extends Va{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return dm.fromArray(s).normalize().toArray(s),s}},et={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ii={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},th={9728:pi,9729:Ke,9984:Xl,9985:ql,9986:Yl,9987:Mi},nh={33071:zt,33648:es,10497:Nn},lc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Dc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},gn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fm={CUBICSPLINE:void 0,LINEAR:Un,STEP:Fn},cc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function pm(l){return l.DefaultMaterial===void 0&&(l.DefaultMaterial=new Gn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:fi})),l.DefaultMaterial}function Vn(l,e,t){for(let n in t.extensions)l[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Et(l,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(l.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function mm(l,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(l);let r=[],o=[],a=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):l.attributes.position;r.push(d)}if(i){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):l.attributes.normal;o.push(d)}if(s){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):l.attributes.color;a.push(d)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(a)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(l.morphAttributes.position=u),i&&(l.morphAttributes.normal=h),s&&(l.morphAttributes.color=d),l.morphTargetsRelative=!0,l})}function gm(l,e){if(l.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)l.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(l.morphTargetInfluences.length===t.length){l.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)l.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function xm(l){let e,t=l.extensions&&l.extensions[J.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+uc(t.attributes):e=l.indices+":"+uc(l.attributes)+":"+l.mode,l.targets!==void 0)for(let n=0,i=l.targets.length;n<i;n++)e+=":"+uc(l.targets[n]);return e}function uc(l){let e="",t=Object.keys(l).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+l[t[n]]+";";return e}function Nc(l){switch(l){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function _m(l){return l.search(/\.jpe?g($|\?)/i)>0||l.search(/^data\:image\/jpeg/)===0?"image/jpeg":l.search(/\.webp($|\?)/i)>0||l.search(/^data\:image\/webp/)===0?"image/webp":l.search(/\.ktx2($|\?)/i)>0||l.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var ym=new te,Fc=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new hm,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let a=o.match(/Version\/(\d+)/);i=n&&a?parseInt(a[1],10):-1,s=o.indexOf("Firefox")>-1,r=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new us(this.options.manager):this.textureLoader=new gs(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xt(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let o={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return Vn(s,o,i),Et(o,i),Promise.all(n._invokeAll(function(a){return a.afterRoot&&a.afterRoot(o)})).then(function(){for(let a of o.scenes)a.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i].joints;for(let o=0,a=r.length;o<a;o++)e[r[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(r,o)=>{let a=this.associations.get(r);a!=null&&this.associations.set(o,a);for(let[c,u]of r.children.entries())s(u,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[J.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,r){n.load(Yt.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let r=lc[i.type],o=Ii[i.componentType],a=i.normalized===!0,c=new o(i.count*r);return Promise.resolve(new Ce(c,r,a))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){let o=r[0],a=lc[i.type],c=Ii[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*a,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,g,p;if(f&&f!==h){let x=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+x+":"+i.count,b=t.cache.get(y);b||(g=new c(o,x*f,i.count*f/u),b=new xi(g,f/u),t.cache.add(y,b)),p=new _i(b,a,d%f/u,m)}else o===null?g=new c(i.count*a):g=new c(o,d,i.count*a),p=new Ce(g,a,m);if(i.sparse!==void 0){let x=lc.SCALAR,y=Ii[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,T=i.sparse.values.byteOffset||0,M=new y(r[1],b,i.sparse.count*x),w=new c(r[2],T,i.sparse.count*a);o!==null&&(p=new Ce(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let v=0,S=M.length;v<S;v++){let R=M[v];if(p.setX(R,w[v*a]),a>=2&&p.setY(R,w[v*a+1]),a>=3&&p.setZ(R,w[v*a+2]),a>=4&&p.setW(R,w[v*a+3]),a>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=m}return p})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s],o=this.textureLoader;if(r.uri){let a=n.manager.getHandler(r.uri);a!==null&&(o=a)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,r=s.textures[e],o=s.images[t],a=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[a])return this.textureCache[a];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=r.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(s.samplers||{})[r.sampler]||{};return u.magFilter=th[d.magFilter]||Ke,u.minFilter=th[d.minFilter]||Mi,u.wrapS=nh[d.wrapS]||Nn,u.wrapT=nh[d.wrapT]||Nn,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==pi&&u.minFilter!==Ke,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[a]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let r=i.images[e],o=self.URL||self.webkitURL,a=r.uri||"",c=!1;if(r.bufferView!==void 0)a=n.getDependency("bufferView",r.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:r.mimeType});return a=o.createObjectURL(d),a});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(a).then(function(h){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(g){let p=new ot(g);p.needsUpdate=!0,d(p)}),t.load(Yt.resolveURL(h,s.path),m,void 0,f)})}).then(function(h){return c===!0&&o.revokeObjectURL(a),Et(h,r),h.userData.mimeType=r.mimeType||_m(r.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",a),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[J.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[J.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let a=s.associations.get(r);r=s.extensions[J.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,a)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,a=this.cache.get(o);a||(a=new ct,De.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,a.sizeAttenuation=!1,this.cache.add(o,a)),n=a}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,a=this.cache.get(o);a||(a=new yt,De.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,this.cache.add(o,a)),n=a}if(i||s||r){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let a=this.cache.get(o);a||(a=n.clone(),s&&(a.vertexColors=!0),r&&(a.flatShading=!0),i&&(a.normalScale&&(a.normalScale.y*=-1),a.clearcoatNormalScale&&(a.clearcoatNormalScale.y*=-1)),this.cache.add(o,a),this.associations.set(a,this.associations.get(n))),n=a}e.material=n}getMaterialType(){return Gn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],r,o={},a=s.extensions||{},c=[];if(a[J.KHR_MATERIALS_UNLIT]){let h=i[J.KHR_MATERIALS_UNLIT];r=h.getMaterialType(),c.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new q(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Pe),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,ye)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=xs);let u=s.alphaMode||cc.OPAQUE;if(u===cc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===cc.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==_t&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ce(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&r!==_t&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==_t){let h=s.emissiveFactor;o.emissive=new q().setRGB(h[0],h[1],h[2],Pe)}return s.emissiveTexture!==void 0&&r!==_t&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,ye)),Promise.all(c).then(function(){let h=new r(o);return s.name&&(h.name=s.name),Et(h,s),t.associations.set(h,{materials:e}),s.extensions&&Vn(i,h,s),h})}createUniqueName(e){let t=he.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[J.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(a){return ih(a,o,t)})}let r=[];for(let o=0,a=e.length;o<a;o++){let c=e[o],u=xm(c),h=i[u];if(h)r.push(h.promise);else{let d;c.extensions&&c.extensions[J.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=ih(new Je,c,t),i[u]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,o=[];for(let a=0,c=r.length;a<c;a++){let u=r[a].material===void 0?pm(this.cache):this.getDependency("material",r[a].material);o.push(u)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(a){let c=a.slice(0,a.length-1),u=a[a.length-1],h=[];for(let f=0,m=u.length;f<m;f++){let g=u[f],p=r[f],x,y=c[f];if(p.mode===et.TRIANGLES||p.mode===et.TRIANGLE_STRIP||p.mode===et.TRIANGLE_FAN||p.mode===void 0)x=s.isSkinnedMesh===!0?new ns(g,y):new lt(g,y),x.isSkinnedMesh===!0&&x.normalizeSkinWeights(),p.mode===et.TRIANGLE_STRIP?x.geometry=oc(x.geometry,_s):p.mode===et.TRIANGLE_FAN&&(x.geometry=oc(x.geometry,wi));else if(p.mode===et.LINES)x=new fn(g,y);else if(p.mode===et.LINE_STRIP)x=new On(g,y);else if(p.mode===et.LINE_LOOP)x=new rs(g,y);else if(p.mode===et.POINTS)x=new Ht(g,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(x.geometry.morphAttributes).length>0&&gm(x,s),x.name=t.createUniqueName(s.name||"mesh_"+e),Et(x,s),p.extensions&&Vn(i,x,p),t.assignFinalMaterial(x),h.push(x)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&Vn(i,h[0],s),h[0];let d=new Vt;s.extensions&&Vn(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new zn(tc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ti(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Et(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),r=i,o=[],a=[];for(let c=0,u=r.length;c<u;c++){let h=r[c];if(h){o.push(h);let d=new te;s!==null&&d.fromArray(s.array,c*16),a.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new is(o,a)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],o=[],a=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){let f=i.channels[h],m=i.samplers[f.sampler],g=f.target,p=g.node,x=i.parameters!==void 0?i.parameters[m.input]:m.input,y=i.parameters!==void 0?i.parameters[m.output]:m.output;g.node!==void 0&&(r.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",x)),a.push(this.getDependency("accessor",y)),c.push(m),u.push(g))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],m=h[2],g=h[3],p=h[4],x=[];for(let b=0,T=d.length;b<T;b++){let M=d[b],w=f[b],v=m[b],S=g[b],R=p[b];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let D=n._createAnimationTracks(M,w,v,S,R);if(D)for(let I=0;I<D.length;I++)x.push(D[I])}let y=new ls(s,void 0,x);return Et(y,i),y})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let a=0,c=i.weights.length;a<c;a++)o.morphTargetInfluences[a]=i.weights[a]}),r})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],o=i.children||[];for(let c=0,u=o.length;c<u;c++)r.push(n.getDependency("node",o[c]));let a=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),a]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,ym)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);if(u.userData.pivot!==void 0&&h.length>0){let f=u.userData.pivot,m=h[0];u.pivot=new E().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],m.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",o=[],a=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return a&&o.push(a),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(s.isBone===!0?u=new yi:c.length>1?u=new Vt:c.length===1?u=c[0]:u=new ge,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=r),Et(u,s),s.extensions&&Vn(n,u,s),s.matrix!==void 0){let h=new te;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Vt;n.name&&(s.name=i.createUniqueName(n.name)),Et(s,n),n.extensions&&Vn(t,s,n);let r=n.nodes||[],o=[];for(let a=0,c=r.length;a<c;a++)o.push(i.getDependency("node",r[a]));return Promise.all(o).then(function(a){for(let u=0,h=a.length;u<h;u++){let d=a[u];d.parent!==null?s.add(Ju(d)):s.add(d)}let c=u=>{let h=new Map;for(let[d,f]of i.associations)(d instanceof De||d instanceof ot)&&h.set(d,f);return u.traverse(d=>{let f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let r=[],o=e.name?e.name:e.uuid,a=[];function c(f){f.morphTargetInfluences&&a.push(f.name?f.name:f.uuid)}gn[s.path]===gn.weights?(c(e),e.isGroup&&e.children.forEach(c)):a.push(o);let u;switch(gn[s.path]){case gn.weights:u=vt;break;case gn.rotation:u=Tt;break;case gn.translation:case gn.scale:u=Mt;break;default:n.itemSize===1?u=vt:u=Mt;break}let h=i.interpolation!==void 0?fm[i.interpolation]:Un,d=this._getArrayFromAccessor(n);for(let f=0,m=a.length;f<m;f++){let g=new u(a[f]+"."+gn[s.path],t.array,d,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),r.push(g)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Nc(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Tt?Pc:Va;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function bm(l,e,t){let n=e.attributes,i=new Xe;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],a=o.min,c=o.max;if(a!==void 0&&c!==void 0){if(i.set(new E(a[0],a[1],a[2]),new E(c[0],c[1],c[2])),o.normalized){let u=Nc(Ii[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new E,a=new E;for(let c=0,u=s.length;c<u;c++){let h=s[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(a.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),a.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),a.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){let g=Nc(Ii[d.componentType]);a.multiplyScalar(g)}o.max(a)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}l.boundingBox=i;let r=new Be;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,l.boundingSphere=r}function ih(l,e,t){let n=e.attributes,i=[];function s(r,o){return t.getDependency("accessor",r).then(function(a){l.setAttribute(o,a)})}for(let r in n){let o=Dc[r]||r.toLowerCase();o in l.attributes||i.push(s(n[r],o))}if(e.indices!==void 0&&!l.index){let r=t.getDependency("accessor",e.indices).then(function(o){l.setIndex(o)});i.push(r)}return Le.workingColorSpace!==Pe&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Le.workingColorSpace}" not supported.`),Et(l,e),bm(l,e,t),Promise.all(i).then(function(){return e.targets!==void 0?mm(l,e.targets,t):l})}async function jt(l,e,t,n,i){try{let s=await new za().loadAsync(l);s.scene.updateMatrixWorld(!0);let r=new Map,o=new Map,a=f=>{let m=f.elements;return new ie(m[0],m[1],m[2],m[3],m[4],m[5],m[6],m[7],m[8],m[9],m[10],m[11],m[12],m[13],m[14],m[15])},c=f=>{if(!f)return-1;let m=r.get(f);if(m!==void 0)return m;let g=f.image,p=new mt(f.name||null,g??null);if(p.flipY=t.flipTexturesY,g){let y=g;p.width=y.width??null,p.height=y.height??null}e.textures.push(p);let x=e.textures.length-1;return r.set(f,x),x},u=()=>{if(e.materials.length===0){let f=new wt;f.name="Default",e.addMaterial(f)}return 0},h=f=>{if(!f)return u();let m=o.get(f);if(m!==void 0)return m;let g=new wt;g.name=f.name;let p=f;if(p.color&&(g.baseColor=new _(p.color.r??1,p.color.g??1,p.color.b??1)),typeof p.ior=="number"&&(g.ior=p.ior),g.opacity=p.opacity??1,g.alphaCutoff=p.alphaTest??.5,p.alphaMode==="BLEND"||p.transparent?g.alphaMode=1:p.alphaMode==="MASK"||(p.alphaTest??0)>0?g.alphaMode=2:g.alphaMode=0,typeof p.roughness=="number"&&(g.roughness=Math.sqrt(p.roughness)),typeof p.metalness=="number"&&(g.metallic=p.metalness),typeof p.specularIntensity=="number"&&(g.specularTint=p.specularIntensity,g.specularColor=new _(p.specularIntensity,p.specularIntensity,p.specularIntensity)),p.specularColor){let y=p.specularColor.r??1,b=p.specularColor.g??1,T=p.specularColor.b??1,M=typeof p.specularIntensity=="number"?p.specularIntensity:1;g.specularColor=new _(y*M,b*M,T*M);let w=((p.specularColor.r??1)+(p.specularColor.g??1)+(p.specularColor.b??1))/3;g.specularTint*=w}if(typeof p.clearcoat=="number"&&(g.clearcoat=p.clearcoat),typeof p.clearcoatRoughness=="number"){let y=Math.min(1,Math.max(0,p.clearcoatRoughness));g.clearcoatGloss=1-y}if(typeof p.sheen=="number"&&(g.sheen=p.sheen),p.sheenColor&&(g.sheenTint=((p.sheenColor.r??0)+(p.sheenColor.g??0)+(p.sheenColor.b??0))/3),typeof p.anisotropy=="number"&&(g.anisotropic=Math.abs(p.anisotropy)),p.emissive){let y=p.emissiveIntensity??1;g.emission=new _((p.emissive.r??0)*y,(p.emissive.g??0)*y,(p.emissive.b??0)*y)}typeof p.transmission=="number"&&(g.specTrans=p.transmission),typeof p.attenuationDistance=="number"&&Number.isFinite(p.attenuationDistance)&&p.attenuationDistance>0&&(g.mediumDensity=1/p.attenuationDistance,g.mediumAbsorption=g.mediumDensity),p.attenuationColor&&(g.mediumColor=new _(p.attenuationColor.r??1,p.attenuationColor.g??1,p.attenuationColor.b??1)),g.specTrans>0&&g.mediumDensity>0&&(g.mediumType=1),g.doubleSided=p.side===xs?1:0,g.baseColorTexID=c(p.map),g.metallicRoughnessTexID=c(p.metalnessMap??p.roughnessMap),g.normalmapTexID=c(p.normalMap),g.emissionmapTexID=c(p.emissiveMap);let x=e.addMaterial(g);return o.set(f,x),x},d=(f,m,g,p,x,y,b)=>{for(let T=0;T<y;T++){let M=x(b+T),w=m.getX(M),v=m.getY(M),S=m.getZ(M),R=g.getX(M),D=g.getY(M),I=g.getZ(M),B=p?p.getX(M):T%3===1?0:1,N=p?p.getY(M):T%3===0?0:1;f.verticesUVX.push(new $(w,v,S,B)),f.normalsUVY.push(new $(R,D,I,1-N))}};return s.scene.traverse(f=>{let m=f;if(!m.isMesh)return;let g=m.geometry,p=g.getAttribute("position");if(!p||p.count===0)return;let x=g.getAttribute("normal");if(!x){let R=g.clone();if(R.computeVertexNormals(),x=R.getAttribute("normal"),!x)return}let y=g.getAttribute("uv"),b=g.getIndex(),T=R=>b?b.getX(R):R,M=b?b.count:p.count,w=a(m.matrixWorld).multiply(n),v=Array.isArray(m.material)?m.material:[m.material],S=g.groups&&g.groups.length>0?g.groups:[{start:0,count:M,materialIndex:0}];for(let R=0;R<S.length;R++){let D=S[R],I=Math.floor(D.count/3)*3;if(I<=0)continue;let B=new pn;B.name=m.name||`GLTFMesh_${e.meshes.length}`,d(B,p,x,y,T,I,D.start);let N=e.meshes.length;e.meshes.push(B);let C=v[D.materialIndex]??v[0]??null,A=h(C),z=new mn(m.name||`Instance_${N}`,N,w,A);e.addMeshInstance(z)}}),e.materials.length===0&&u(),e.meshes.length>0}catch(s){return console.error("Error loading GLTF file:",s),!1}}var vm=`<div class="gl-box">
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
</div>`,Tm=`#gl-bench {
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
`,Ha=class{constructor(e,t={}){this.css=Tm,this.svg=vm,this.paramLogger=()=>{},this.chartLogger=()=>{},this.chartLen=20,this.chartHz=20,this.names=[],this.cpuAccums=[],this.gpuAccums=[],this.activeAccums=[],this.chart=new Array(this.chartLen),this.now=()=>performance&&performance.now?performance.now():Date.now(),this.updateUI=()=>{[].forEach.call(this.nodes["gl-gpu-svg"],o=>{o.style.display=this.trackGPU?"inline":"none"})},Object.assign(this,t),this.detected=0,this.finished=[],this.isFramebuffer=0,this.frameId=0;let n,i=0,s,r=o=>{++i<20?n=requestAnimationFrame(r):(this.detected=Math.ceil(1e3*i/(o-s)/70),cancelAnimationFrame(n)),s||(s=o)};if(requestAnimationFrame(r),e){let o=async(c,u)=>Promise.resolve(setTimeout(()=>{e.getError();let h=this.now()-c;u.forEach((d,f)=>{d&&(this.gpuAccums[f]+=h)})},0)),a=(c,u,h)=>function(){let d=u.now();c.apply(h,arguments),u.trackGPU&&u.finished.push(o(d,u.activeAccums.slice(0)))};["drawArrays","drawElements","drawArraysInstanced","drawBuffers","drawElementsInstanced","drawRangeElements"].forEach(c=>{e[c]&&(e[c]=a(e[c],this,e))}),e.getExtension=((c,u)=>function(){let h=c.apply(e,arguments);return h&&["drawElementsInstancedANGLE","drawBuffersWEBGL"].forEach(d=>{h[d]&&(h[d]=a(h[d],u,h))}),h})(e.getExtension,this)}if(!this.withoutUI){this.dom||(this.dom=document.body);let o=document.createElement("div");o.id="gl-bench",this.dom.appendChild(o),this.dom.insertAdjacentHTML("afterbegin",'<style id="gl-bench-style">'+this.css+"</style>"),this.dom=o,this.dom.addEventListener("click",()=>{this.trackGPU=!this.trackGPU,this.updateUI()}),this.paramLogger=((a,c,u)=>{let h=["gl-cpu","gl-gpu","gl-mem","gl-fps","gl-gpu-svg","gl-chart"],d=Object.assign({},h);return h.forEach(f=>d[f]=c.getElementsByClassName(f)),this.nodes=d,(f,m,g,p,x,y,b)=>{d["gl-cpu"][f].style.strokeDasharray=(m*.27).toFixed(0)+" 100",d["gl-gpu"][f].style.strokeDasharray=(g*.27).toFixed(0)+" 100",d["gl-mem"][f].innerHTML=u[f]?u[f]:p?"mem: "+p.toFixed(0)+"mb":"",d["gl-fps"][f].innerHTML=x.toFixed(0)+" FPS",a(u[f],m,g,p,x,y,b)}})(this.paramLogger,this.dom,this.names),this.chartLogger=((a,c)=>{let u={"gl-chart":c.getElementsByClassName("gl-chart")};return(h,d,f)=>{let m="",g=d.length;for(let p=0;p<g;p++){let x=(f+p+1)%g;d[x]!=null&&(m=m+" "+(55*p/(g-1)).toFixed(1)+","+(45-d[x]*22/60/this.detected).toFixed(1))}u["gl-chart"][h].setAttribute("points",m),a(this.names[h],d,f)}})(this.chartLogger,this.dom)}}addUI(e){this.names.indexOf(e)==-1&&(this.names.push(e),this.dom&&(this.dom.insertAdjacentHTML("beforeend",this.svg),this.updateUI()),this.cpuAccums.push(0),this.gpuAccums.push(0),this.activeAccums.push(!1))}nextFrame(e){this.frameId++;let t=e||this.now();if(this.frameId<=1)this.paramFrame=this.frameId,this.paramTime=t;else{let n=t-this.paramTime;if(n>=1e3){let i=this.frameId-this.paramFrame,s=i/n*1e3;for(let r=0;r<this.names.length;r++){let o=this.cpuAccums[r]/n*100,a=this.gpuAccums[r]/n*100,c=performance&&performance.memory?performance.memory.usedJSHeapSize/(1<<20):0;this.paramLogger(r,o,a,c,s,n,i),this.cpuAccums[r]=0,Promise.all(this.finished).then(()=>{this.gpuAccums[r]=0,this.finished=[]})}this.paramFrame=this.frameId,this.paramTime=t}}if(!this.detected||!this.chartFrame)this.chartFrame=this.frameId,this.chartTime=t,this.circularId=0;else{let n=t-this.chartTime,i=this.chartHz*n/1e3;for(;--i>0&&this.detected;){let r=(this.frameId-this.chartFrame)/n*1e3;this.chart[this.circularId%this.chartLen]=r;for(let o=0;o<this.names.length;o++)this.chartLogger(o,this.chart,this.circularId);this.circularId++,this.chartFrame=this.frameId,this.chartTime=t}}}begin(e){this.updateAccums(e)}end(e){this.updateAccums(e)}updateAccums(e){let t=this.names.indexOf(e);t==-1&&(t=this.names.length,this.addUI(e));let n=this.now(),i=n-this.t0;for(let s=0;s<t+1;s++)this.activeAccums[s]&&(this.cpuAccums[s]+=i);this.activeAccums[t]=!this.activeAccums[t],this.t0=n}};var xn=class l{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),l.nextNameID=l.nextNameID||0,this.$name.id=`lil-gui-name-${++l.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",r=>r.stopPropagation()),this.domElement.addEventListener("keyup",r=>r.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},Uc=class extends xn{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function Bc(l){let e,t;return(e=l.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=l.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=l.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}var Mm={isPrimitive:!0,match:l=>typeof l=="string",fromHexString:Bc,toHexString:Bc},Ms={isPrimitive:!0,match:l=>typeof l=="number",fromHexString:l=>parseInt(l.substring(1),16),toHexString:l=>"#"+l.toString(16).padStart(6,0)},Sm={isPrimitive:!1,match:l=>Array.isArray(l),fromHexString(l,e,t=1){let n=Ms.fromHexString(l);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([l,e,t],n=1){n=255/n;let i=l*n<<16^e*n<<8^t*n<<0;return Ms.toHexString(i)}},wm={isPrimitive:!1,match:l=>Object(l)===l,fromHexString(l,e,t=1){let n=Ms.fromHexString(l);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:l,g:e,b:t},n=1){n=255/n;let i=l*n<<16^e*n<<8^t*n<<0;return Ms.toHexString(i)}},Em=[Mm,Ms,Sm,wm];function Am(l){return Em.find(e=>e.match(l))}var Oc=class extends xn{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Am(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{let s=Bc(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},Ts=class extends xn{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}},Gc=class extends xn{constructor(e,t,n,i,s,r){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);let o=r!==void 0;this.step(o?r:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;let t=()=>{let y=parseFloat(this.$input.value);isNaN(y)||(this._stepExplicit&&(y=this._snap(y)),this.setValue(this._clamp(y)))},n=y=>{let b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+y),this.$input.value=this.getValue())},i=y=>{y.key==="Enter"&&this.$input.blur(),y.code==="ArrowUp"&&(y.preventDefault(),n(this._step*this._arrowKeyMultiplier(y))),y.code==="ArrowDown"&&(y.preventDefault(),n(this._step*this._arrowKeyMultiplier(y)*-1))},s=y=>{this._inputFocused&&(y.preventDefault(),n(this._step*this._normalizeMouseWheel(y)))},r=!1,o,a,c,u,h,d=5,f=y=>{o=y.clientX,a=c=y.clientY,r=!0,u=this.getValue(),h=0,window.addEventListener("mousemove",m),window.addEventListener("mouseup",g)},m=y=>{if(r){let b=y.clientX-o,T=y.clientY-a;Math.abs(T)>d?(y.preventDefault(),this.$input.blur(),r=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>d&&g()}if(!r){let b=y.clientY-c;h-=b*this._step*this._arrowKeyMultiplier(y),u+h>this._max?h=this._max-u:u+h<this._min&&(h=this._min-u),this._snapClampSetValue(u+h)}c=y.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",g)},p=()=>{this._inputFocused=!0},x=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",p),this.$input.addEventListener("blur",x)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");let e=(x,y,b,T,M)=>(x-y)/(b-y)*(M-T)+T,t=x=>{let y=this.$slider.getBoundingClientRect(),b=e(x,y.left,y.right,this._min,this._max);this._snapClampSetValue(b)},n=x=>{this._setDraggingStyle(!0),t(x.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=x=>{t(x.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)},r=!1,o,a,c=x=>{x.preventDefault(),this._setDraggingStyle(!0),t(x.touches[0].clientX),r=!1},u=x=>{x.touches.length>1||(this._hasScrollBar?(o=x.touches[0].clientX,a=x.touches[0].clientY,r=!0):c(x),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=x=>{if(r){let y=x.touches[0].clientX-o,b=x.touches[0].clientY-a;Math.abs(y)>Math.abs(b)?c(x):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else x.preventDefault(),t(x.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},f=this._callOnFinishChange.bind(this),m=400,g,p=x=>{if(Math.abs(x.deltaX)<Math.abs(x.deltaY)&&this._hasScrollBar)return;x.preventDefault();let b=this._normalizeMouseWheel(x)*this._step;this._snapClampSetValue(this.getValue()+b),this.$input.value=this.getValue(),clearTimeout(g),g=setTimeout(f,m)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",p,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},zc=class extends xn{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{let n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},kc=class extends xn{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},Rm=`.lil-gui {
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
}`;function Cm(l){let e=document.createElement("style");e.innerHTML=l;let t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}var rh=!1,$a=class l{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:r=!1,injectStyles:o=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),a&&this.domElement.classList.add("allow-touch-styles"),!rh&&o&&(Cm(Rm),rh=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=r}add(e,t,n,i,s){if(Object(n)===n)return new zc(this,e,t,n);let r=e[t];switch(typeof r){case"number":return new Gc(this,e,t,n,i,s);case"boolean":return new Uc(this,e,t);case"string":return new kc(this,e,t);case"function":return new Ts(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,r)}addColor(e,t,n=1){return new Oc(this,e,t,n)}addFolder(e){let t=new l({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Ts||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Ts)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");let n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);let i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}};function be(l,e){let t=l.querySelector(`input[name="${e}"]`);if(!t)return null;let n=parseFloat(t.getAttribute("value")??"");return isNaN(n)?null:n}function Wa(l,e){let t=l.querySelector(`input[name="${e}"]`);if(!t)return null;let n=parseInt(t.getAttribute("value")??"",10);return isNaN(n)?null:n}function At(l,e){let t=l.querySelector(`input[name="${e}"]`);if(!t)return null;let n=(t.getAttribute("value")??"").split(",").map(i=>parseFloat(i.trim()));return n.length<3||n.some(isNaN)?null:new _(n[0],n[1],n[2])}function Rt(l,e){let t=l.querySelector(`input[name="${e}"]`);if(!t)return null;let i=(t.getAttribute("value")??"").replace(/\s+/g,",").replace(/,+/g,",").split(",").map(s=>parseFloat(s.trim()));return i.length<3||i.some(isNaN)?null:new _(i[0],i[1],i[2])}function Xa(l,e){let t=l.querySelector(`input[name="${e}"]`);return t?t.getAttribute("value")?.toLowerCase()==="true":null}var ze=class{name;constructor(e){this.name=e}static clamp01(e){return Math.min(Math.max(e,0),1)}static clampVec(e){return _.clamp(e.clone(),new _(0,0,0),new _(1,1,1))}static resetMaterial(e){e.materialType=0,e.baseWeight=1,e.baseDiffuseRoughness=0,e.metallic=0,e.specularTint=0,e.specularWeight=1,e.specularColor=new _(1,1,1),e.anisotropic=0,e.anisotropyRotation=0,e.specTrans=0,e.transmissionColor=new _(1,1,1),e.transmissionExtraRoughness=0,e.subsurface=0,e.subsurfaceRadiusScale=new _(1,1,1),e.sheen=0,e.sheenTint=0,e.fuzzColor=new _(-1,-1,-1),e.fuzzRoughness=.5,e.clearcoat=0,e.clearcoatGloss=1,e.coatColor=new _(1,1,1),e.coatIOR=1.5,e.coatDarkening=1,e.coatRoughnessAnisotropy=0,e.coatAnisotropyRotation=0,e.coatAffectRoughness=0,e.thinFilmWeight=0,e.thinFilmThickness=0,e.thinFilmIor=1.5,e.emission=new _(0,0,0),e.opacity=1,e.alphaMode=0,e.alphaCutoff=0,e.doubleSided=0,e.thinWalled=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumDensity=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0,e.dispersionScale=0,e.abbeNumber=50,e.uvScale=new ee(1,1)}};var Kt=class l extends ze{base_weight=1;base_color=new _(.8,.8,.8);base_diffuse_roughness=0;base_metalness=0;specular_weight=1;specular_color=new _(1,1,1);specular_roughness=.3;specular_ior=1.5;specular_roughness_anisotropy=0;transmission_weight=0;transmission_color=new _(1,1,1);transmission_depth=0;transmission_scatter=new _(0,0,0);transmission_scatter_anisotropy=0;transmission_dispersion_scale=0;transmission_dispersion_abbe_number=20;subsurface_weight=0;subsurface_color=new _(.8,.8,.8);subsurface_radius=1;subsurface_radius_scale=new _(1,.5,.25);subsurface_scatter_anisotropy=0;fuzz_weight=0;fuzz_color=new _(1,1,1);fuzz_roughness=.5;coat_weight=0;coat_color=new _(1,1,1);coat_roughness=0;coat_roughness_anisotropy=0;coat_ior=1.6;coat_darkening=1;thin_film_weight=0;thin_film_thickness=.5;thin_film_ior=1.4;emission_luminance=0;emission_color=new _(1,1,1);geometry_opacity=1;geometry_thin_walled=!1;constructor(e){super(e)}toMaterial(e){if(e.baseWeight=this.base_weight,e.baseColor=this.base_color.clone(),e.baseDiffuseRoughness=this.base_diffuse_roughness,e.metallic=Math.min(Math.max(this.base_metalness,0),1),e.roughness=Math.min(Math.max(this.specular_roughness,.001),1),e.ior=Math.max(this.specular_ior,1),e.anisotropic=this.specular_roughness_anisotropy,e.specularColor=_.clamp(this.specular_color.clone(),new _(0,0,0),new _(1,1,1)),e.specularWeight=Math.min(Math.max(this.specular_weight,0),1),e.specTrans=Math.min(Math.max(this.transmission_weight,0),1),e.transmissionColor=_.clamp(this.transmission_color.clone(),new _(0,0,0),new _(1,1,1)),e.dispersionScale=Math.min(Math.max(this.transmission_dispersion_scale,0),1),e.abbeNumber=Math.max(this.transmission_dispersion_abbe_number,1),e.thinWalled=this.geometry_thin_walled?1:0,e.doubleSided=this.geometry_thin_walled?1:0,e.subsurface=Math.min(Math.max(this.subsurface_weight,0),1),e.subsurfaceRadiusScale=_.max(this.subsurface_radius_scale.clone(),new _(.001,.001,.001)),this.geometry_thin_walled)e.subsurface=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumDensity=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;else if(this.subsurface_weight>0){e.mediumType=2,e.mediumColor=_.clamp(this.subsurface_color.clone(),new _(0,0,0),new _(1,1,1)),e.mediumAnisotropy=Math.min(Math.max(this.subsurface_scatter_anisotropy,-.99),.99),e.mediumThickness=Math.max(this.subsurface_radius,0),e.mediumDensity=1/Math.max(this.subsurface_radius,.001);let t=Math.min(Math.max(this.subsurface_color.x*.2126+this.subsurface_color.y*.7152+this.subsurface_color.z*.0722,0),1);e.mediumAbsorption=e.mediumDensity*(1-t)}else if(!this.geometry_thin_walled&&this.transmission_weight>0&&this.transmission_depth>0){e.mediumType=1,e.mediumColor=_.clamp(this.transmission_color.clone(),new _(0,0,0),new _(1,1,1));let t=Math.max(this.transmission_depth,0);e.mediumThickness=0,e.mediumDensity=1/Math.max(t,.001),e.mediumAnisotropy=Math.min(Math.max(this.transmission_scatter_anisotropy,-.99),.99),e.mediumAbsorption=e.mediumDensity}else e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumDensity=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;e.sheen=Math.min(Math.max(this.fuzz_weight,0),1),e.fuzzColor=_.clamp(this.fuzz_color.clone(),new _(0,0,0),new _(1,1,1)),e.sheenTint=0,e.fuzzRoughness=Math.min(Math.max(this.fuzz_roughness,0),1),e.clearcoat=Math.min(Math.max(this.coat_weight,0),1),e.clearcoatGloss=Math.min(Math.max(1-this.coat_roughness,0),1),e.coatColor=_.clamp(this.coat_color.clone(),new _(0,0,0),new _(1,1,1)),e.coatIOR=Math.max(this.coat_ior,1.01),e.coatRoughnessAnisotropy=Math.min(Math.max(this.coat_roughness_anisotropy,0),1),e.coatDarkening=Math.min(Math.max(this.coat_darkening,0),1),e.emission=new _(this.emission_color.x*this.emission_luminance,this.emission_color.y*this.emission_luminance,this.emission_color.z*this.emission_luminance),e.opacity=Math.min(Math.max(this.geometry_opacity,0),1),e.alphaMode=e.opacity<1?1:0,e.thinFilmWeight=Math.min(Math.max(this.thin_film_weight,0),1),e.thinFilmThickness=Math.max(this.thin_film_thickness*1e3,0),e.thinFilmIor=Math.max(this.thin_film_ior,1)}static parse(e){let t=e.getAttribute("name")??"openPbr",n=new l(t),i=(o,a)=>{let c=be(e,a);c!==null&&(n[o]=c)},s=(o,a)=>{let c=At(e,a);c!==null&&(n[o]=c)},r=(o,a)=>{let c=Xa(e,a);c!==null&&(n[o]=c)};return i("base_weight","base_weight"),s("base_color","base_color"),i("base_diffuse_roughness","base_diffuse_roughness"),i("base_metalness","base_metalness"),i("specular_weight","specular_weight"),s("specular_color","specular_color"),i("specular_roughness","specular_roughness"),i("specular_ior","specular_ior"),i("specular_roughness_anisotropy","specular_roughness_anisotropy"),i("transmission_weight","transmission_weight"),s("transmission_color","transmission_color"),i("transmission_depth","transmission_depth"),s("transmission_scatter","transmission_scatter"),i("transmission_scatter_anisotropy","transmission_scatter_anisotropy"),i("transmission_dispersion_scale","transmission_dispersion_scale"),i("transmission_dispersion_abbe_number","transmission_dispersion_abbe_number"),i("subsurface_weight","subsurface_weight"),s("subsurface_color","subsurface_color"),i("subsurface_radius","subsurface_radius"),s("subsurface_radius_scale","subsurface_radius_scale"),i("subsurface_scatter_anisotropy","subsurface_scatter_anisotropy"),i("fuzz_weight","fuzz_weight"),s("fuzz_color","fuzz_color"),i("fuzz_roughness","fuzz_roughness"),i("coat_weight","coat_weight"),s("coat_color","coat_color"),i("coat_roughness","coat_roughness"),i("coat_roughness_anisotropy","coat_roughness_anisotropy"),i("coat_ior","coat_ior"),i("coat_darkening","coat_darkening"),i("thin_film_weight","thin_film_weight"),i("thin_film_thickness","thin_film_thickness"),i("thin_film_ior","thin_film_ior"),i("emission_luminance","emission_luminance"),s("emission_color","emission_color"),i("geometry_opacity","geometry_opacity"),r("geometry_thin_walled","geometry_thin_walled"),n}static aluminumBrushed(){let e=new l("Aluminum_Brushed");return e.base_color=new _(.912,.914,.92),e.base_metalness=1,e.specular_color=new _(.97,.979,.988),e.specular_roughness=.2,e.specular_roughness_anisotropy=.9,e}static plastic(){let e=new l("Plastic");return e.base_color=new _(.78,.12,.12),e.base_metalness=0,e.specular_roughness=.28,e.specular_ior=1.5,e}static metal(){let e=new l("Metal");return e.base_color=new _(.72,.74,.76),e.base_metalness=1,e.specular_roughness=.22,e.specular_roughness_anisotropy=.15,e}static gold(){let e=new l("Gold");return e.base_color=new _(.98,.78,.18),e.base_metalness=1,e.specular_roughness=.12,e}static silver(){let e=new l("Silver");return e.base_color=new _(.93,.94,.95),e.base_metalness=1,e.specular_roughness=.08,e}static carPaint(){let e=new l("Car_Paint");return e.base_color=new _(.1,.6,.9),e.specular_ior=1.6,e.specular_roughness=.3,e.coat_weight=1,e.coat_roughness=.02,e.coat_ior=1.6,e}static glass(){let e=new l("Glass");return e.specular_roughness=0,e.specular_ior=1.52,e.transmission_weight=1,e.transmission_dispersion_abbe_number=64,e.transmission_dispersion_scale=1,e}static honey(){let e=new l("Honey");return e.specular_roughness=0,e.specular_ior=1.504,e.transmission_weight=1,e.transmission_color=new _(.83,.4,.04),e.transmission_depth=2,e.transmission_scatter=new _(.9,.9,.9),e}static ketchup(){let e=new l("Ketchup");return e.base_color=new _(.164,.006,.002),e.specular_roughness=0,e.specular_ior=1.3,e.subsurface_weight=1,e.subsurface_color=new _(.164,.006,.002),e.subsurface_radius_scale=new _(.476,.058,.039),e}static lightBulb(){let e=new l("Light_Bulb");return e.emission_color=new _(1,.415,.099),e.emission_luminance=1e4,e}static emissive(){let e=new l("Emissive");return e.base_color=new _(.05,.05,.05),e.emission_color=new _(1,.9,.7),e.emission_luminance=1500,e}static clearcoatPlastic(){let e=new l("Clearcoat_Plastic");return e.base_color=new _(.2,.35,.9),e.base_metalness=0,e.specular_roughness=.25,e.coat_weight=1,e.coat_color=new _(1,1,1),e.coat_roughness=.03,e}static paintedMetal(){let e=new l("Painted_Metal");return e.base_color=new _(.82,.1,.1),e.base_metalness=1,e.specular_roughness=.3,e.coat_weight=1,e.coat_color=new _(1,1,1),e.coat_roughness=.05,e}static subsurfaceSkin(){let e=new l("Subsurface_Skin");return e.base_color=new _(.72,.52,.44),e.specular_roughness=.35,e.specular_ior=1.45,e.subsurface_weight=1,e.subsurface_color=new _(.74,.46,.38),e.subsurface_radius=1.2,e.subsurface_radius_scale=new _(1,.45,.2),e}static thinGlass(){let e=new l("Thin_Glass");return e.specular_roughness=0,e.specular_ior=1.5,e.transmission_weight=1,e.geometry_thin_walled=!0,e}static frostedGlass(){let e=new l("Frosted_Glass");return e.specular_roughness=.35,e.specular_ior=1.5,e.transmission_weight=1,e.transmission_depth=1,e.transmission_color=new _(.95,.97,1),e}static pearl(){let e=new l("Pearl");return e.base_color=new _(.8,.75,.7),e.specular_roughness=.35,e.specular_ior=1.5,e.subsurface_weight=1,e.subsurface_color=new _(.8,.75,.7),e.subsurface_radius_scale=new _(.3,.5,.3),e.coat_weight=1,e.coat_roughness=.15,e.coat_ior=1.68,e.thin_film_weight=1,e.thin_film_thickness=.42,e.thin_film_ior=2,e}static soapBubble(){let e=new l("Soap_Bubble");return e.specular_roughness=0,e.specular_ior=1,e.transmission_weight=1,e.thin_film_weight=1,e.thin_film_thickness=.5,e.thin_film_ior=1.4,e.geometry_thin_walled=!0,e}static velvet(){let e=new l("Velvet");return e.base_color=new _(.02,.02,.02),e.specular_roughness=.8,e.fuzz_weight=1,e.fuzz_color=new _(.4,.4,.4),e.fuzz_roughness=.5,e}static PRESET_NAMES=["-- None --","Default","Plastic","Metal","Gold","Silver","Aluminum Brushed","Car Paint","Clearcoat Plastic","Painted Metal","Glass","Thin Glass","Frosted Glass","Honey","Ketchup","Light Bulb","Emissive","Subsurface Skin","Pearl","Soap Bubble","Velvet"];static presetByName(e){switch(e){case"Default":return new l("Default");case"Plastic":return l.plastic();case"Metal":return l.metal();case"Gold":return l.gold();case"Silver":return l.silver();case"Aluminum Brushed":return l.aluminumBrushed();case"Car Paint":return l.carPaint();case"Clearcoat Plastic":return l.clearcoatPlastic();case"Painted Metal":return l.paintedMetal();case"Glass":return l.glass();case"Thin Glass":return l.thinGlass();case"Frosted Glass":return l.frostedGlass();case"Honey":return l.honey();case"Ketchup":return l.ketchup();case"Light Bulb":return l.lightBulb();case"Emissive":return l.emissive();case"Subsurface Skin":return l.subsurfaceSkin();case"Pearl":return l.pearl();case"Soap Bubble":return l.soapBubble();case"Velvet":return l.velvet();default:return null}}};var Vc=class{sampleCount=0},Ya=class l{static params=new Vc;static gui=null;static guiResizeHandler=null;static guiDragCleanup=null;static actionButtonsCleanup=null;static guiManualPosition=null;static openPbrPresetByMaterialID=new Map;static build(e){l.gui&&(l.gui.destroy(),l.gui=null),l.guiDragCleanup&&(l.guiDragCleanup(),l.guiDragCleanup=null),l.actionButtonsCleanup&&(l.actionButtonsCleanup(),l.actionButtonsCleanup=null);let t=l.getAdaptiveGuiWidth(),n=new $a({title:"Settings",width:t});l.gui=n,l.guiResizeHandler&&(window.removeEventListener("resize",l.guiResizeHandler),l.guiResizeHandler=null);let i=()=>{let x=n.domElement,y=window.matchMedia("(max-width: 900px)").matches;if(x.style.width=`${l.getAdaptiveGuiWidth()}px`,x.style.maxWidth="calc(100vw - 20px)",x.style.maxHeight=y?"calc(100vh - 90px)":"calc(100vh - 50px)",x.style.overflowY="auto",x.style.display="block",x.style.position="fixed",x.style.zIndex="1500",document.body.classList.toggle("gui-compact",y),document.body.classList.remove("gui-hidden"),l.guiManualPosition){let b=l.clampGuiPosition(x,l.guiManualPosition.x,l.guiManualPosition.y);l.guiManualPosition=b,l.applyGuiPosition(x,b.x,b.y)}else n.domElement.style.right="8px",n.domElement.style.top="8px",n.domElement.style.left="auto"};l.guiResizeHandler=i,window.addEventListener("resize",i),i(),l.guiDragCleanup=l.enableGuiDragging(n);let s=e.renderer,r=s.scene,o=r instanceof ut,a=r.renderOptions,c={rewind:()=>(e.rewind(),!0),pauseOrContinue:()=>e.pauseOrContinue(),fullscreen:async()=>{let x=document.getElementById("canvas");x&&(x.requestFullscreen?await x.requestFullscreen():x.mozRequestFullScreen?await x.mozRequestFullScreen():x.webkitRequestFullscreen?await x.webkitRequestFullscreen():x.msRequestFullscreen&&await x.msRequestFullscreen(),x.focus&&x.focus())},isPaused:()=>!!e.stopped},u={enableDebug:tt.profiling,showBenchmark:!0};n.add(s,"sampleCounter").listen().name("Samples").disable(),l.actionButtonsCleanup=l.addActionButtonsRow(n,c);let h=l.attachBenchmarkToGui(n.domElement);h&&n.add(u,"showBenchmark").name("Show Benchmark").onChange(x=>{h.style.display=x?"flex":"none"});let d=n.addFolder("Scene").close();{let x=r.sceneName??"",y=e.scenes.find(v=>x===v||x===`/scenes/pathtracer/${v}`),b=e.shadertoyScenes.find(v=>x===v||x===`/scenes/shadertoy/examples/${v}/shader.json`),T=e.shadertoyGlslPathtracerScenes.find(v=>x===`/scenes/shadertoy/examples/glsl-pathtracer/${v}/shadertoy.json`),M=e.shadertoyGlslPathtracerScenes.find(v=>x===`/scenes/shadertoy/examples/glsl-pathtracer/${v}/data.json`),w={pathTracingScene:y,shadertoyScene:b,glslPathTracerScene:T,glslPathTracerScene2:M};d.add(w,"pathTracingScene",e.scenes).name("PathTracer Scene").onChange(async v=>{w.pathTracingScene=v,await e.startSceneAsync(`/scenes/pathtracer/${v}`)}),d.add(w,"shadertoyScene",e.shadertoyScenes).name("ShaderToy Scene").onChange(async v=>{w.shadertoyScene=v,await e.startSceneAsync(`/scenes/shadertoy/examples/${v}/shader.json`)}),d.add(w,"glslPathTracerScene",e.shadertoyGlslPathtracerScenes).name("GLSL-PathTracer Scene (with Shadertoy)").onChange(async v=>{w.glslPathTracerScene=v,await e.startSceneAsync(`/scenes/shadertoy/examples/glsl-pathtracer/${v}/shadertoy.json`)}),d.add(w,"glslPathTracerScene2",e.shadertoyGlslPathtracerScenes).name("GLSL-PathTracer Scene (with Pathtracer)").onChange(async v=>{w.glslPathTracerScene2=v,await e.startSceneAsync(`/scenes/shadertoy/examples/glsl-pathtracer/${v}/data.json`)}),o&&d.add({envMap:e.envMaps[e.envMapIdx]},"envMap",e.envMaps).name("EnvMaps").onChange(async v=>{await r.addEnvMapAsync(`HDR/${v}`)})}let f=n.addFolder("Render Settings").close();{let x=a.screenZoom;if(f.add({zoom:x},"zoom",[.25,.5,.75,1]).listen().name("Screen Zoom").onChange(y=>{a.screenZoom=y,e.resizeAsync(a.originalRenderResolution.x*y,a.originalRenderResolution.y*y)}),f.add(a,"pixelRatio",[.25,.5,.75,1]).listen().name("Pixel Ratio").onChange(y=>{a.tileWidth=Math.floor(a.renderResolution.x*y),a.tileHeight=Math.floor(a.renderResolution.y*y),e.startSceneAsync(r.sceneName)}),f.add(a,"maxSpp",-1,256).step(1).listen().name("Max SPP").onChange(y=>{e.optionsChanged=!0}),o){f.add(a,"maxDepth",1,10).listen().name("Max Depth").onChange(b=>{e.optionsChanged=!0}),f.add(a,"enableRR").listen().name("Enable Russian Roulette").onChange(b=>{e.reloadShaders=!0}),f.add(a,"RRDepth",1,10).listen().name("Russian Roulette Depth").onChange(b=>{e.reloadShaders=!0}),f.add(a,"enableRoughnessMollification").listen().name("Enable Roughness Mollification").onChange(b=>{e.reloadShaders=!0}),f.add(a,"roughnessMollificationAmt").listen().name("Roughness Mollification Amount").onChange(b=>{e.optionsChanged=!0}),f.add(a,"enableVolumeMIS").listen().name("Enable Volume MIS").onChange(b=>{e.reloadShaders=!0}),f.add(a,"useThinFilmLUT").listen().name("Thin Film: use LUT").onChange(b=>{e.reloadShaders=!0});let y=a.sssMode===1?"randomWalk":a.sssMode===2?"dipole":"none";f.add({sssMode:y},"sssMode",["none","randomWalk","dipole"]).name("SSS Mode").onChange(b=>{a.sssMode=b==="randomWalk"?1:b==="dipole"?2:0,e.reloadShaders=!0,e.optionsChanged=!0}),(o||r?.shadertoyShader?.isGlslPathtracer)&&(f.add(a,"enableDenoiser").listen().name("Enable Denoiser"),f.add(a,"denoiserFrameCnt",5,20).step(1).listen().name("Denoiser Frame Count"))}}let m=n.addFolder("Environment").close();{let x=_.pow(a.uniformLightCol,.45454545454545453);m.addColor({rgb:{r:x.x,g:x.y,b:x.z}},"rgb").listen().name("Uniform Light Color (Gamma Corrected)").onChange(y=>{a.uniformLightCol=_.pow(new _(y.r,y.g,y.b),2.2),e.optionsChanged=!0}),m.add(a,"enableEnvMap").listen().name("Enable Environment Map").onChange(y=>{e.reloadShaders=!0}),m.add(a,"envMapIntensity",.1,10).listen().name("Environment Map Intensity").onChange(y=>{e.optionsChanged=!0}),m.add(a,"envMapRot",0,360).listen().name("Environment Map Rotation").onChange(y=>{e.optionsChanged=!0}),m.add(a,"hideEmitters").listen().name("Hide Emitters").onChange(y=>{e.reloadShaders=!0}),m.add(a,"enableBackground").listen().name("Enable Background").onChange(y=>{e.reloadShaders=!0}),m.addColor(a,"backgroundCol").listen().name("Background Color").onChange(y=>{e.optionsChanged=!0}),m.add(a,"transparentBackground").listen().name("Transparent Background").onChange(y=>{e.reloadShaders=!0})}let g=n.addFolder("Tonemapping").close();{let x=g.add(a,"enableTonemap").listen().name("Enable Tonemap"),y=g.add(a,"enableAces").listen().name("Enable ACES"),b=g.add(a,"simpleAcesFit").listen().name("Simple ACES Fit");x.onChange(T=>{T?y.enable():(y.setValue(!1),b.setValue(!1),y.disable(),b.disable())}),y.onChange(T=>{T?b.enable():(b.disable(),b.setValue(!1))})}let p=n.addFolder("Camera").close();{let x=bs.degrees(r.camera.fov);p.add({fov:x},"fov",10,90).listen().name("Fov").onChange(b=>{r.camera.setFov(b),e.optionsChanged=!0});let y=r.camera.aperture*1e3;p.add({aperture:y},"aperture",0,10).listen().name("Aperture").onChange(b=>{r.camera.aperture=b/1e3,e.optionsChanged=!0}),p.add(r.camera,"focalDist",.01,50).listen().name("Focal Distance").onChange(b=>{e.optionsChanged=!0}),p.add({pos:`${r.camera.position.x.toFixed(2)}, ${r.camera.position.y.toFixed(2)}, ${r.camera.position.z.toFixed(2)}`},"pos").listen().name("Pos").disable()}if(r.materials&&r.materials.length>0){let x=n.addFolder("Materials").close();{let y=[];for(let T=0;T<r.materials.length;T++)y.push(r.materials[T].name);let b=null;x.add({instance:"-- None --"},"instance",y).onChange(T=>{T==="-- None --"?(b?.destroy(),b=null):b=l.onMaterialChanged(x,b,T,e)}),b=l.onMaterialChanged(x,b,r.materials[0].name,e)}}if(r.meshInstances&&r.meshInstances.length>0){let x=n.addFolder("Instances").close();{let y=[];for(let T=0;T<r.meshInstances.length;T++)y.push(r.meshInstances[T].name);let b=null;x.add({instance:""},"instance",y).onChange(T=>{b=l.onInstanceChanged(x,b,T,e)}),b=l.onInstanceChanged(x,b,r.meshInstances[0].name,e)}}}static onMaterialChanged(e,t,n,i){let s=i.renderer.scene,r=s.renderOptions;t?.destroy(),t=e.addFolder("Material").close();let o=s.materials.findIndex(F=>F?.name===n);o<0&&(o=0);let a=s.materials[o];if(!a)return t;let c=F=>{a.materialType=0,a.baseWeight=1,a.baseDiffuseRoughness=F,a.metallic=0,a.specularWeight=0,a.specTrans=0,a.clearcoat=0,i.objectPropChanged=!0},u=t.addFolder("D4 Diffuse Presets").open();{let F={lambert:()=>c(0),orenNayar:()=>c(.5),burley:()=>c(.9)};u.add(F,"lambert").name("Lambert (r=0.0)"),u.add(F,"orenNayar").name("Oren-Nayar (r=0.5)"),u.add(F,"burley").name("Burley (r=0.9)")}let h=(F,U,ne)=>{a.materialType=0,a.baseWeight=1,a.metallic=1,a.specTrans=0,a.clearcoat=0,a.specularWeight=1,a.roughness=F,a.anisotropic=U,a.anisotropyRotation=ne,i.objectPropChanged=!0},d=t.addFolder("D4 Conductor Presets").open();{let F={smoothBrdf:()=>h(.12,0,0),anisotropicBrdf:()=>h(.28,.85,.25),roughBsdf:()=>h(.72,0,0)};d.add(F,"smoothBrdf").name("Conductor BRDF Smooth (r=0.12)"),d.add(F,"anisotropicBrdf").name("Conductor BRDF Aniso (r=0.28)"),d.add(F,"roughBsdf").name("Conductor BSDF Rough (r=0.72)")}let f=(F,U,ne,Y,W)=>{a.materialType=0,a.baseWeight=1,a.metallic=0,a.specularWeight=1,a.clearcoat=0,a.specTrans=F,a.ior=U,a.roughness=ne,a.thinWalled=Y,a.transmissionExtraRoughness=W,a.transmissionColor=new _(1,1,1),i.objectPropChanged=!0},m=t.addFolder("D4 Dielectric Presets").open();{let F={brdfReflective:()=>f(.08,1.5,.08,0,0),bsdfMixed:()=>f(.5,1.52,.12,0,0),btdfTirTarget:()=>f(1,2.2,.02,0,0)};m.add(F,"brdfReflective").name("Dielectric BRDF Reflective"),m.add(F,"bsdfMixed").name("Dielectric BSDF Mixed"),m.add(F,"btdfTirTarget").name("Dielectric BTDF TIR Target")}let g=l.openPbrPresetByMaterialID.get(o),x={preset:g&&Kt.PRESET_NAMES.includes(g)?g:Kt.PRESET_NAMES[0]},y=o;t.add(x,"preset",[...Kt.PRESET_NAMES]).name("OpenPBR Preset").onChange(F=>{if(l.openPbrPresetByMaterialID.set(y,F),F==="-- None --")return;let U=Kt.presetByName(F);U&&(U.toMaterial(a),i.reloadShaders=!0,i.objectPropChanged=!0,t=l.onMaterialChanged(e,t,F,i))});let b=t.addFolder("Base").open();{let F=_.pow(a.baseColor,.45454545454545453);b.addColor({rgb:{r:F.x,g:F.y,b:F.z}},"rgb").listen().name("Albedo (Gamma Corrected)").onChange(U=>{a.baseColor=_.pow(new _(U.r,U.g,U.b),2.2),i.objectPropChanged=!0}),b.add(a,"baseWeight",0,1).listen().name("Base Weight").onChange(U=>{i.objectPropChanged=!0}),b.add(a,"baseDiffuseRoughness",0,1).listen().name("Base Diffuse Roughness").onChange(U=>{i.objectPropChanged=!0}),b.add(a,"metallic",0,1).listen().name("Metallic").onChange(U=>{i.objectPropChanged=!0}),b.add(a,"roughness",0,1).listen().name("Roughness").onChange(U=>{i.objectPropChanged=!0})}let T=t.addFolder("Specular").open();{T.add(a,"specularTint",0,1).listen().name("SpecularTint").onChange(U=>{i.objectPropChanged=!0});let F=_.pow(a.specularColor,1/2.2);T.addColor({rgb:{r:F.x,g:F.y,b:F.z}},"rgb").listen().name("Specular Color").onChange(U=>{a.specularColor=_.pow(new _(U.r,U.g,U.b),2.2),i.objectPropChanged=!0}),T.add(a,"ior",1.001,2.5).listen().name("Ior").onChange(U=>{i.objectPropChanged=!0}),T.add(a,"specularWeight",0,1).listen().name("Specular Weight").onChange(U=>{i.objectPropChanged=!0}),T.add(a,"anisotropic",0,1).listen().name("Anisotropic").onChange(U=>{i.objectPropChanged=!0}),T.add(a,"anisotropyRotation",0,1).listen().name("Anisotropy Rotation").onChange(U=>{i.objectPropChanged=!0})}let M=t.addFolder("Coat").open();{M.add(a,"clearcoat",0,1).listen().name("Clearcoat").onChange(U=>{i.objectPropChanged=!0}),M.add(a,"clearcoatGloss",0,1).listen().name("ClearcoatGloss").onChange(U=>{i.objectPropChanged=!0});let F=_.pow(a.coatColor,1/2.2);M.addColor({rgb:{r:F.x,g:F.y,b:F.z}},"rgb").listen().name("Coat Color").onChange(U=>{a.coatColor=_.pow(new _(U.r,U.g,U.b),2.2),i.objectPropChanged=!0}),M.add(a,"coatIOR",1.01,10).listen().name("Coat IOR").onChange(U=>{i.objectPropChanged=!0}),M.add(a,"coatRoughnessAnisotropy",0,1).listen().name("Coat Roughness Anisotropy").onChange(U=>{i.objectPropChanged=!0}),M.add(a,"coatAnisotropyRotation",0,1).listen().name("Coat Anisotropy Rotation").onChange(U=>{i.objectPropChanged=!0}),M.add(a,"coatDarkening",0,1).listen().name("Coat Darkening").onChange(U=>{i.objectPropChanged=!0}),M.add(a,"coatAffectRoughness",0,1).listen().name("Coat Affect Roughness").onChange(U=>{i.objectPropChanged=!0})}let w=t.addFolder("Sheen").open();{w.add(a,"sheen",0,1).listen().name("Sheen").onChange(Y=>{i.objectPropChanged=!0}),w.add(a,"sheenTint",0,1).listen().name("SheenTint").onChange(Y=>{i.objectPropChanged=!0}),w.add(a,"fuzzRoughness",0,1).listen().name("Fuzz Roughness").onChange(Y=>{i.objectPropChanged=!0});let F={useCustom:a.fuzzColor.x>=0,get rgb(){let Y=a.fuzzColor.x>=0?a.fuzzColor:new _(1,1,1),W=_.pow(Y,1/2.2);return{r:W.x,g:W.y,b:W.z}}},U=null,ne=()=>{U=w.addColor(F,"rgb").listen().name("Fuzz Color").onChange(Y=>{a.fuzzColor=_.pow(new _(Y.r,Y.g,Y.b),2.2),i.objectPropChanged=!0})};w.add(F,"useCustom").listen().name("Custom Fuzz Color").onChange(Y=>{Y?(a.fuzzColor=new _(1,1,1),U||ne(),U.domElement.style.display=""):(a.fuzzColor=new _(-1,-1,-1),U&&(U.domElement.style.display="none")),i.objectPropChanged=!0}),ne(),F.useCustom||(U.domElement.style.display="none")}let v,S,R,D=()=>{let F=a.specTrans>0&&a.dispersionScale>0;S&&(S.domElement.style.display=F?"":"none"),R&&(R.domElement.style.display=F?"":"none")},I=t.addFolder("Transmission").open();{v=I.add(a,"specTrans",0,1).listen().name("SpecTrans").onChange(U=>{i.objectPropChanged=!0,D()});let F=_.pow(a.transmissionColor,1/2.2);I.addColor({rgb:{r:F.x,g:F.y,b:F.z}},"rgb").listen().name("Transmission").onChange(U=>{a.transmissionColor=_.pow(new _(U.r,U.g,U.b),2.2),i.objectPropChanged=!0}),I.add(a,"thinWalled",0,1).step(1).listen().name("Thin Walled").onChange(U=>{i.objectPropChanged=!0}),I.add(a,"transmissionExtraRoughness",0,1).listen().name("Transmission Extra Roughness").onChange(U=>{i.objectPropChanged=!0})}let B=t.addFolder("SSS").open();{let F,U,ne,Y=()=>{let W=a.subsurface>0;F.domElement.style.display=W?"":"none",U.domElement.style.display=W?"":"none",ne.domElement.style.display=W?"":"none"};B.add(a,"subsurface",0,1).listen().name("Subsurface").onChange(W=>{i.objectPropChanged=!0,Y()}),F=B.add({subsurfaceRadiusScaleX:a.subsurfaceRadiusScale.x},"subsurfaceRadiusScaleX",0,1).listen().name("Subsurface Radius Scale X").onChange(W=>{a.subsurfaceRadiusScale.x=W,i.objectPropChanged=!0}),U=B.add({subsurfaceRadiusScaleY:a.subsurfaceRadiusScale.y},"subsurfaceRadiusScaleY",0,1).listen().name("Subsurface Radius Scale Y").onChange(W=>{a.subsurfaceRadiusScale.y=W,i.objectPropChanged=!0}),ne=B.add({subsurfaceRadiusScaleZ:a.subsurfaceRadiusScale.z},"subsurfaceRadiusScaleZ",0,1).listen().name("Subsurface Radius Scale Z").onChange(W=>{a.subsurfaceRadiusScale.z=W,i.objectPropChanged=!0}),Y()}let N=t.addFolder("Medium").open();{let F,U,ne,Y,W,qe=()=>{let pe=a.mediumType!==0;F.domElement.style.display=pe?"":"none",U.domElement.style.display=pe?"":"none",ne.domElement.style.display=pe?"":"none",W.domElement.style.display=pe?"":"none",Y.domElement.style.display=pe?"":"none"},Ct=()=>{let pe=a.mediumType===2;Y.domElement.style.display=pe?"":"none"},pt=a.mediumType,Yn=pt===0?"None":pt===1?"Absorb":pt===2?"Scatter":"Emissive";N.add({mediumType:Yn},"mediumType",["None","Absorb","Scatter","Emissive"]).listen().name("Medium Type").onChange(pe=>{i.reloadShaders=!0,i.objectPropChanged=!0,a.mediumType=pe==="None"?0:pe==="Absorb"?1:pe==="Scatter"?2:3,qe(),Ct()});let Jt=_.pow(a.mediumColor,1/2.2);F=N.addColor({rgb:{r:Jt.x,g:Jt.y,b:Jt.z}},"rgb").listen().name("Medium Color (Gamma Corrected)").onChange(pe=>{a.mediumColor=_.pow(new _(pe.r,pe.g,pe.b),2.2),i.objectPropChanged=!0}),U=N.add(a,"mediumDensity",0,5).listen().name("Medium Density").onChange(pe=>{i.objectPropChanged=!0}),ne=N.add(a,"mediumAbsorption",0,5).listen().name("Medium Absorption").onChange(pe=>{i.objectPropChanged=!0}),Y=N.add(a,"mediumAnisotropy",-.99,.99).listen().name("Medium Anisotropy").onChange(pe=>{i.objectPropChanged=!0}),W=N.add(a,"mediumThickness",0,5).listen().name("Medium Thickness").onChange(pe=>{i.objectPropChanged=!0}),qe(),Ct()}let C=t.addFolder("Emission").open();{let F=_.pow(a.emission,.45454545454545453);C.addColor({rgb:{r:F.x,g:F.y,b:F.z}},"rgb").listen().name("Emission (Gamma Corrected)").onChange(U=>{a.emission=_.pow(new _(U.r,U.g,U.b),2.2),i.objectPropChanged=!0})}let A=t.addFolder("Thin Film").open();A.add(a,"thinFilmWeight",0,1).listen().name("Thin Film Weight").onChange(F=>{i.objectPropChanged=!0}),A.add(a,"thinFilmThickness",0,2e3).listen().name("Thin Film Thickness (nm)").onChange(F=>{i.objectPropChanged=!0}),A.add(a,"thinFilmIor",1,3).listen().name("Thin Film IOR").onChange(F=>{i.objectPropChanged=!0});let z=t.addFolder("Dispersion").open();S=z.add(a,"dispersionScale",0,1).listen().name("Dispersion Scale").onChange(F=>{i.objectPropChanged=!0,D()}),R=z.add(a,"abbeNumber",1,100).listen().name("Abbe Number").onChange(F=>{i.objectPropChanged=!0}),D();let K=t.addFolder("Alpha").open();{let F,U=()=>{let W=a.alphaMode!==0;F.domElement.style.display=W?"":"none"},Y=a.alphaMode===0?"Opaque":"Blend";K.add({alphaMode:Y},"alphaMode",["Opaque","Blend"]).listen().name("Alpha Mode").onChange(W=>{a.alphaMode=W==="Opaque"?0:1,i.reloadShaders=!0,i.objectPropChanged=!0,U()}),F=K.add(a,"opacity",0,1).listen().name("Opacity").onChange(W=>{i.objectPropChanged=!0}),K.add(a,"alphaCutoff",0,1).listen().name("Alpha Cutoff").onChange(W=>{i.objectPropChanged=!0}),K.add(a,"doubleSided",0,1,1).listen().name("Double Sided").onChange(W=>{i.objectPropChanged=!0}),U()}let de=t.addFolder("UV").open();return de.add({uvScaleX:a.uvScale.x},"uvScaleX",.01,10).listen().name("UV Scale X").onChange(F=>{a.uvScale.x=F,i.objectPropChanged=!0}),de.add({uvScaleY:a.uvScale.y},"uvScaleY",.01,10).listen().name("UV Scale Y").onChange(F=>{a.uvScale.y=F,i.objectPropChanged=!0}),t}static onInstanceChanged(e,t,n,i){let s=i.renderer.scene;t?.destroy(),t=e.addFolder("Transforms").close();let r=s.meshInstances.find(h=>h.name===n),o=r.transform,a,c,u;return{translation:a,rotation:c,scale:u}=o.decompose(),t.add({x:a.x,y:a.y,z:a.z},"x").listen().name("Translation").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:a.x,y:a.y,z:a.z},"x").listen().name("Translation").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:a.x,y:a.y,z:a.z},"x").listen().name("Translation").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{l.onTransformChanged(a,u,c,r),i.objectPropChanged=!0}),t}static onTransformChanged(e,t,n,i){i.transform=ie.fromDecomposed(e,t,n)}static getAdaptiveGuiWidth(){let e=window.innerWidth;return e<=480?Math.max(250,e-24):e<=900?Math.max(280,Math.floor(e*.8)):e<=1400?360:400}static attachBenchmarkToGui(e){let t=e.querySelector(".bench-host");t||(t=document.createElement("div"),t.className="bench-host",t.style.margin="8px",t.style.padding="6px",t.style.borderRadius="8px",t.style.background="rgba(14, 22, 34, 0.72)",t.style.border="1px solid rgba(90, 130, 170, 0.35)",t.style.display="flex",t.style.alignItems="flex-start",t.style.justifyContent="flex-start",e.appendChild(t));let n=document.getElementById("gl-bench-embedded-style");n||(n=document.createElement("style"),n.id="gl-bench-embedded-style",n.textContent=`
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
            `,document.head.appendChild(i));let s=e.domElement.querySelector(".children");if(!s)return()=>{};let r=document.createElement("li");r.className="controller controls-action-row";let o=document.createElement("div");o.className="controls-action-buttons";let a=document.createElement("button");a.type="button",a.title="Rewind",a.setAttribute("aria-label","Rewind"),a.innerHTML='<span class="label">Rewind</span><span class="icon">&lt;&lt;</span>',a.addEventListener("click",p=>{p.preventDefault(),t.rewind(),d(t.isPaused())});let c=document.createElement("button");c.type="button";let u=document.createElement("span");u.className="label";let h=document.createElement("span");h.className="icon",c.appendChild(u),c.appendChild(h);let d=p=>{let x=p?"Continue":"Pause";c.title=x,c.setAttribute("aria-label",x),u.textContent=x,h.textContent=p?">":"||"};d(t.isPaused());let f=window.setTimeout(()=>{d(t.isPaused())},0),m=window.setInterval(()=>{if(!document.body.contains(c)){window.clearInterval(m);return}d(t.isPaused())},200);c.addEventListener("click",p=>{p.preventDefault();let x=t.pauseOrContinue();d(x)});let g=document.createElement("button");return g.type="button",g.title="Fullscreen",g.setAttribute("aria-label","Fullscreen"),g.innerHTML='<span class="label">Fullscreen</span><span class="icon">[]</span>',g.addEventListener("click",p=>{p.preventDefault(),t.fullscreen()}),o.appendChild(a),o.appendChild(c),o.appendChild(g),r.appendChild(o),s.appendChild(r),()=>{window.clearTimeout(f),window.clearInterval(m)}}static enableGuiDragging(e){let t=e.domElement,n=t.querySelector(".title")??t;n.style.cursor="move";let i=!1,s=0,r=0,o=u=>{if(!i)return;let h=u.clientX-s,d=u.clientY-r,f=l.clampGuiPosition(t,h,d);l.guiManualPosition=f,l.applyGuiPosition(t,f.x,f.y)},a=()=>{i=!1,window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",a)},c=u=>{if(u.button!==0)return;let h=t.getBoundingClientRect();i=!0,s=u.clientX-h.left,r=u.clientY-h.top,l.applyGuiPosition(t,h.left,h.top),window.addEventListener("mousemove",o),window.addEventListener("mouseup",a),u.preventDefault()};return n.addEventListener("mousedown",c),()=>{n.removeEventListener("mousedown",c),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",a)}}static applyGuiPosition(e,t,n){e.style.right="auto",e.style.left=`${t}px`,e.style.top=`${n}px`}static clampGuiPosition(e,t,n){let s=Math.max(4,window.innerWidth-e.offsetWidth-4),r=Math.max(4,window.innerHeight-e.offsetHeight-4);return{x:Math.min(Math.max(4,t),s),y:Math.min(Math.max(4,n),r)}}};var qa=class extends zi{playing=!1;timeupdate=!1;copyVideo=!1;loadTexture(e){let t=document.createElement("video");this.image=t,P.document.getElementById("textures")?.appendChild(t),t.controls=!0,t.playsInline=!0,t.muted=!0,t.loop=!0,t.addEventListener("playing",()=>{this.playing=!0,this.checkReady()},!0),t.addEventListener("timeupdate",()=>{this.timeupdate=!0,this.checkReady()},!0),t.src=e,t.play()}checkReady(){this.playing&&this.timeupdate&&(this.copyVideo=!0)}};var ja=class extends It{internalFormat;format;gltype;audio;playing=!1;timeupdate=!1;copyAudio=!1;audioContext;analyser;freqData;waveData;constructor(){super(),this.audioContext=new AudioContext,this.audioContext.resume(),this.analyser=this.audioContext.createAnalyser(),this.freqData=new Uint8Array(this.analyser.frequencyBinCount),this.waveData=new Uint8Array(this.analyser.frequencyBinCount),this.internalFormat=P.gl.raw.R8,this.format=P.gl.raw.RED,this.gltype=P.gl.raw.UNSIGNED_BYTE}loadTexture(e){let t=document.createElement("audio");this.audio=t,t.loop=!0,t.autoplay=!0,t.crossOrigin="anonymous",t.controls=!0,t.addEventListener("playing",()=>{this.playing=!0,this.checkReady()},!0),t.addEventListener("timeupdate",()=>{this.timeupdate=!0,this.checkReady()},!0),t.addEventListener("canplay",()=>{this.audioContext.createMediaElementSource(t).connect(this.analyser),this.analyser.connect(this.audioContext.destination)},!0),t.src=e,t.load()}checkReady(){this.playing&&this.timeupdate&&(this.copyAudio=!0)}update(){this.analyser.getByteFrequencyData(this.freqData),this.analyser.getByteTimeDomainData(this.waveData)}};async function Ka(l,e,t,n=null){let i=await ue(l);if(!i.ok)return console.error(`Couldn't open ${l} for reading`),!1;let s=await i.text();if(n&&(s=await n(l,s),s===null))return console.error(`Callback failed for ${l}`),!1;let r=null;try{r=new qn(JSON.parse(s))}catch(a){return console.error(`Error parsing Shadertoy shader from ${l}:`,a),!1}let o=l.split("/").slice(0,-1).join("/");return Hc(o,r,e,t,n)}async function Hc(l,e,t,n,i=null){if(e.common&&(!e.commonCode||e.commonCode==="")){let o=await Te.loadAsync(`${l}/common.glsl`);if(!o.src)return console.error("Couldn't open common.glsl for reading"),!1;i&&(o.src=await i(`${l}/common.glsl`,o.src)),e.commonCode=o.src}if(e.isGlslPathtracer){let o=/^#define OPT_SHADERTOY_LIGHT(.*)$/m;e.commonCode=e.commonCode.replace(o,"// #define OPT_SHADERTOY_LIGHT$1")}let s={},r={};for(let o of[e.bufferA,e.bufferB,e.bufferC,e.bufferD,e.cubeA,e.sound,e.image])if(o){if(o===e.bufferA?o.type="bufferA":o===e.bufferB?o.type="bufferB":o===e.bufferC?o.type="bufferC":o===e.bufferD?o.type="bufferD":o===e.cubeA?(o.type="cubeA",o.xres=1024,o.yres=1024):o===e.sound?(o.type="sound",o.xres=Ve.instance().textureDimensions,o.yres=Ve.instance().textureDimensions):o===e.image&&(o.type="image"),!o.code||o.code===""){let a=await Te.loadAsync(`${l}/${o.type}.glsl`);if(!a.src)return console.error(`Couldn't open ${o.type}.glsl for reading`),!1;if(i&&(a.src=await i(`${l}/${o.type}.glsl`,a.src),a.src===null))return console.error(`Callback failed for ${o.type}.glsl`),!1;o.code=a.src}for(let a of o.inputs){if(P.gl==null)break;if(a.type==="keyboard"){let c=Lt.instance();a.arrayBuffer=c.buffer,a.xres=c.xRes,a.yres=c.yRes,a.internalFormat=c.internalFormat,a.format=c.format,a.gltype=c.gltype,c.input=a}else if(a.filepath){if(a.type==="floats"){let c;if(r[a.filepath])c=r[a.filepath];else{let u=a.filepath;u.startsWith("http")||(u=`scenes/shadertoy/${u}`);let h=await ue(u);if(!h.ok)return console.error(`Couldn't open ${a.filepath} for reading`),!1;let d=await h.arrayBuffer(),f=new ki(d),m=f.ReadUInt32(),g=f.ReadUInt32(),p=f.ReadUInt32(),x=f.ReadUInt32(),y=f.ReadUInt8(),b=f.ReadUInt8(),T=f.ReadUInt16(),M,w,v;if(y===1&&T===10)[M,w,v]=[P.gl.raw.R32F,P.gl.raw.RGB,P.gl.raw.FLOAT];else if(y===3&&T===10)[M,w,v]=[P.gl.raw.RGB32F,P.gl.raw.RED,P.gl.raw.FLOAT];else if(y===4&&T===10)[M,w,v]=[P.gl.raw.RGBA32F,P.gl.raw.RGBA,P.gl.raw.FLOAT];else return console.error(`Unsupported texture format: ${y} channels, ${T} format`),!1;let S=new Float32Array(d,20);r[a.filepath]={buffer:S,xRes:g,yRes:p,internalFormat:M,format:w,gltype:v},c=r[a.filepath]}a.arrayBuffer=c.buffer,a.xres=c.xRes,a.yres=c.yRes,a.internalFormat=c.internalFormat,a.format=c.format,a.gltype=c.gltype}else if(a.type==="volume"){let c;if(r[a.filepath])c=r[a.filepath];else{let u=a.filepath;u.startsWith("http")||(u=`scenes/shadertoy/${u}`);let h=await ue(u);if(!h.ok)return console.error(`Couldn't open ${a.filepath} for reading`),!1;let d=await h.arrayBuffer(),f=new ki(d),m=f.ReadUInt32(),g=f.ReadUInt32(),p=f.ReadUInt32(),x=f.ReadUInt32(),y=f.ReadUInt8(),b=f.ReadUInt8(),T=f.ReadUInt16(),M,w,v;if(y===1&&T===0)[M,w,v]=[P.gl.raw.R8,P.gl.raw.RED,P.gl.raw.UNSIGNED_BYTE];else if(y===4&&T===0)[M,w,v]=[P.gl.raw.RGBA8,P.gl.raw.RGBA,P.gl.raw.UNSIGNED_BYTE];else return console.error(`Unsupported texture format: ${y} channels, ${T} format`),!1;let S=new Uint8Array(d,20);r[a.filepath]={buffer:S,xRes:g,yRes:p,internalFormat:M,format:w,gltype:v},c=r[a.filepath]}a.arrayBuffer=c.buffer,a.xres=c.xRes,a.yres=c.yRes,a.internalFormat=c.internalFormat,a.format=c.format,a.gltype=c.gltype}else if(a.filepath.endsWith("jpg")||a.filepath.endsWith("png"))if(a.type==="cubemap"&&a.filepath.endsWith("cubemap00.png"))a.type="cubeA",a.internalFormat=P.gl.raw.RGBA8,a.format=P.gl.raw.RGBA,a.gltype=P.gl.raw.UNSIGNED_BYTE;else if(a.type==="cubemap"){let c=a.filepath.substring(a.filepath.lastIndexOf("/")+1,a.filepath.lastIndexOf(".")),u=a.filepath.substring(a.filepath.lastIndexOf(".")+1),h=a.filepath.substring(0,a.filepath.lastIndexOf("/"));a.imageTextures=[];for(let d=0;d<6;d++){let f;if(d==0?f=a.filepath:f=h+`/${c}_${d}.${u}`,s[f])a.imageTextures.push(s[f]);else{let m=new mt;if(f.startsWith("http")||(f=`scenes/shadertoy/${f}`),!await m.loadTextureAsync(f))return console.error(`Couldn't load texture ${f}`),!1;s[f]=m,a.imageTextures.push(m)}}}else{let c;if(s[a.filepath])c=s[a.filepath];else{let u=new mt,h=a.filepath;if(h.startsWith("http")||(h=`scenes/shadertoy/${h}`),!await u.loadTextureAsync(h))return console.error(`Couldn't load texture ${a.filepath}`),!1;c=u,s[a.filepath]=u}a.imageTexture=c,a.xres=c.width,a.yres=c.height,a.internalFormat=P.gl.raw.RGBA8,a.format=P.gl.raw.RGBA,a.gltype=P.gl.raw.UNSIGNED_BYTE}else if(a.filepath.endsWith("mp4")||a.filepath.endsWith("webm")){let c;if(s[a.filepath])c=s[a.filepath];else{let u=new qa,h=a.filepath;h.startsWith("http")||(h=`scenes/shadertoy/${h}`),u.loadTexture(h),c=u,s[a.filepath]=u}a.imageTexture=c,a.internalFormat=P.gl.raw.RGBA8,a.format=P.gl.raw.RGBA,a.gltype=P.gl.raw.UNSIGNED_BYTE}else if(a.filepath.endsWith("mp3")||a.filepath.endsWith("ogg")){let c;if(s[a.filepath])c=s[a.filepath];else{let u=new ja,h=a.filepath;h.startsWith("http")||(h=`scenes/shadertoy/${h}`),u.loadTexture(h),c=u,s[a.filepath]=u}a.audioTexture=c,a.xres=c.analyser.frequencyBinCount,a.yres=2,a.internalFormat=c.internalFormat,a.format=c.format,a.gltype=c.gltype}}}e.buffers=e.buffers||[],e.buffers.push(o)}return t&&(t.shadertoyShader=e),!0}async function ah(l,e,t,n=null){let i=await ue(l);if(!i.ok)return console.error(`Couldn't open ${l} for reading`),!1;let s=await i.text();n&&(s=await n(l,s));let r=null;try{r=JSON.parse(s)}catch(c){return console.error(`Error parsing Shadertoy shader from ${l}:`,c),!1}let o=new qn;o.fromShadertoyJson(r);let a=l.split("/").slice(0,-1).join("/");return Hc(a,o,e,t,n)}var Li=class{static async readBlob(e){try{let t=await fetch(this.buildUrl(e),{method:"GET"});return t.ok?await t.blob():(console.error("Failed to read blob from:",e,t.statusText),null)}catch(t){return console.error("Failed to read blob from:",e,t),null}}static async writeBlob(e,t,n=null){console.log(`Uploading ${e} to Azure Blob Storage`);let i="scenes",s=process.env.AZURE_STORAGE_ACCOUNT_SAS_TOKEN,r=this.buildUrl(`${e}?${s}`),o=typeof t=="string"?new Blob([t]).size.toString():t.byteLength.toString(),a=await fetch(r,{method:"PUT",headers:{"x-ms-version":"2019-12-12","x-ms-date":new Date().toUTCString(),"x-ms-blob-type":"BlockBlob","Content-Type":n??(typeof t=="string"?"application/json":"application/octet-stream"),"Content-Length":o},body:typeof t=="string"?t:new Uint8Array(t)});return a.ok?!0:(console.error("Failed to create blob:",e,a.statusText),!1)}static buildUrl(e,t="scenes"){return`https://rvawebgl.blob.core.windows.net/$web/${t}/${e}`}};var ht=class{position;emission;u;v;radius;area;type;constructor(){this.position=new _,this.emission=new _,this.u=new _,this.v=new _,this.radius=0,this.area=0,this.type=0}};var Pi=class l extends ze{base=1;base_color=new _(.8,.8,.8);diffuse_roughness=0;metalness=0;specular=1;specular_color=new _(1,1,1);specular_roughness=.2;specular_IOR=1.5;specular_anisotropy=0;specular_rotation=0;transmission=0;transmission_color=new _(1,1,1);transmission_depth=0;transmission_scatter=new _(0,0,0);transmission_scatter_anisotropy=0;transmission_dispersion=0;transmission_extra_roughness=0;subsurface=0;subsurface_color=new _(1,1,1);subsurface_radius=new _(1,1,1);subsurface_scale=1;subsurface_anisotropy=0;sheen=0;sheen_color=new _(1,1,1);sheen_roughness=.3;thin_walled=!1;coat=0;coat_color=new _(1,1,1);coat_roughness=.1;coat_anisotropy=0;coat_rotation=0;coat_IOR=1.5;coat_affect_color=0;coat_affect_roughness=0;thin_film_thickness=0;thin_film_IOR=1.5;emission=0;emission_color=new _(1,1,1);opacity=new _(1,1,1);constructor(e){super(e)}toMaterial(e){if(e.baseWeight=l.clamp01(this.base),e.baseColor=l.clampVec(new _(this.base_color.x*this.base,this.base_color.y*this.base,this.base_color.z*this.base)),e.baseDiffuseRoughness=l.clamp01(this.diffuse_roughness),e.metallic=l.clamp01(this.metalness),e.roughness=Math.min(Math.max(this.specular_roughness,.001),1),e.ior=Math.max(this.specular_IOR,1),e.anisotropic=l.clamp01(this.specular_anisotropy),e.anisotropyRotation=l.clamp01(this.specular_rotation),e.specularColor=l.clampVec(this.specular_color),e.specularWeight=l.clamp01(this.specular),e.specularTint=0,e.specTrans=l.clamp01(this.transmission),e.transmissionColor=l.clampVec(this.transmission_color),e.transmissionExtraRoughness=Math.max(this.transmission_extra_roughness,0),this.transmission_dispersion>0?(e.dispersionScale=1,e.abbeNumber=Math.max(this.transmission_dispersion,1)):(e.dispersionScale=0,e.abbeNumber=50),e.thinWalled=this.thin_walled?1:0,e.doubleSided=this.thin_walled?1:0,e.subsurface=l.clamp01(this.subsurface),e.subsurfaceRadiusScale=_.max(this.subsurface_radius.clone(),new _(.001,.001,.001)),this.thin_walled)e.subsurface=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumDensity=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;else if(this.subsurface>0){e.mediumType=2,e.mediumColor=l.clampVec(this.subsurface_color),e.mediumAnisotropy=Math.min(Math.max(this.subsurface_anisotropy,-.99),.99);let n=Math.max(this.subsurface_scale,.001);e.mediumThickness=n,e.mediumDensity=1/n;let i=l.clamp01(this.subsurface_color.x*.2126+this.subsurface_color.y*.7152+this.subsurface_color.z*.0722);e.mediumAbsorption=e.mediumDensity*(1-i)}else if(this.transmission>0&&this.transmission_depth>0){e.mediumType=1,e.mediumColor=l.clampVec(this.transmission_color),e.mediumAnisotropy=Math.min(Math.max(this.transmission_scatter_anisotropy,-.99),.99);let n=Math.max(this.transmission_depth,.001);e.mediumThickness=0,e.mediumDensity=1/n,e.mediumAbsorption=e.mediumDensity}else e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumDensity=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;e.sheen=l.clamp01(this.sheen),e.fuzzColor=l.clampVec(this.sheen_color),e.sheenTint=0,e.fuzzRoughness=l.clamp01(this.sheen_roughness),e.clearcoat=l.clamp01(this.coat),e.coatColor=l.clampVec(this.coat_color),e.clearcoatGloss=l.clamp01(1-this.coat_roughness),e.coatRoughnessAnisotropy=l.clamp01(this.coat_anisotropy),e.coatAnisotropyRotation=l.clamp01(this.coat_rotation),e.coatIOR=Math.max(this.coat_IOR,1.01),e.coatDarkening=l.clamp01(this.coat_affect_color),e.coatAffectRoughness=l.clamp01(this.coat_affect_roughness),e.thinFilmThickness=Math.max(this.thin_film_thickness,0),e.thinFilmIor=Math.max(this.thin_film_IOR,1),e.thinFilmWeight=this.thin_film_thickness>0?1:0,e.emission=new _(this.emission_color.x*this.emission,this.emission_color.y*this.emission,this.emission_color.z*this.emission);let t=l.clamp01(this.opacity.x*.2126+this.opacity.y*.7152+this.opacity.z*.0722);e.opacity=t,e.alphaMode=t<1?1:0}static parse(e){let t=new l("default"),n=(r,o)=>{let a=be(e,o);a!==null&&(t[r]=a)},i=(r,o)=>{let a=At(e,o);a!==null&&(t[r]=a)},s=(r,o)=>{let a=Xa(e,o);a!==null&&(t[r]=a)};return n("base","base"),i("base_color","base_color"),n("diffuse_roughness","diffuse_roughness"),n("metalness","metalness"),n("specular","specular"),i("specular_color","specular_color"),n("specular_roughness","specular_roughness"),n("specular_IOR","specular_IOR"),n("specular_anisotropy","specular_anisotropy"),n("specular_rotation","specular_rotation"),n("transmission","transmission"),i("transmission_color","transmission_color"),n("transmission_depth","transmission_depth"),i("transmission_scatter","transmission_scatter"),n("transmission_scatter_anisotropy","transmission_scatter_anisotropy"),n("transmission_dispersion","transmission_dispersion"),n("transmission_extra_roughness","transmission_extra_roughness"),n("subsurface","subsurface"),i("subsurface_color","subsurface_color"),i("subsurface_radius","subsurface_radius"),n("subsurface_scale","subsurface_scale"),n("subsurface_anisotropy","subsurface_anisotropy"),n("sheen","sheen"),i("sheen_color","sheen_color"),n("sheen_roughness","sheen_roughness"),s("thin_walled","thin_walled"),n("coat","coat"),i("coat_color","coat_color"),n("coat_roughness","coat_roughness"),n("coat_anisotropy","coat_anisotropy"),n("coat_rotation","coat_rotation"),n("coat_IOR","coat_IOR"),n("coat_affect_color","coat_affect_color"),n("coat_affect_roughness","coat_affect_roughness"),n("thin_film_thickness","thin_film_thickness"),n("thin_film_IOR","thin_film_IOR"),n("emission","emission"),i("emission_color","emission_color"),i("opacity","opacity"),t}};var Za=class l extends ze{baseColor=new _(.18,.18,.18);subsurface=0;metallic=0;specular=.5;specularTint=0;roughness=.5;anisotropic=0;sheen=0;sheenTint=.5;clearcoat=0;clearcoatGloss=1;transmission=0;ior=1.5;opacity=1;constructor(e){super(e)}toMaterial(e){if(e.baseWeight=1,e.baseColor=_.clamp(this.baseColor.clone(),new _(0,0,0),new _(1,1,1)),e.metallic=l.clamp01(this.metallic),e.subsurface=l.clamp01(this.subsurface),this.ior!==1.5)e.ior=Math.max(this.ior,1);else{let t=.08*l.clamp01(this.specular),n=Math.sqrt(Math.max(t,0)),i=1-n;e.ior=i>1e-4?Math.max((1+n)/i,1):1}e.specularTint=l.clamp01(this.specularTint),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.anisotropic=l.clamp01(this.anisotropic),e.sheen=l.clamp01(this.sheen),e.sheenTint=l.clamp01(this.sheenTint),e.clearcoat=l.clamp01(this.clearcoat),e.clearcoatGloss=l.clamp01(this.clearcoatGloss),e.specTrans=l.clamp01(this.transmission),e.opacity=l.clamp01(this.opacity),e.alphaMode=e.opacity<1?1:0}static parse(e){let t=e.getAttribute("name")??"disneyPrincipled",n=new l(t),i=(r,o)=>{let a=be(e,o);a!==null&&(n[r]=a)};return((r,o)=>{let a=At(e,o);a!==null&&(n[r]=a)})("baseColor","baseColor"),i("subsurface","subsurface"),i("metallic","metallic"),i("specular","specular"),i("specularTint","specularTint"),i("roughness","roughness"),i("anisotropic","anisotropic"),i("sheen","sheen"),i("sheenTint","sheenTint"),i("clearcoat","clearcoat"),i("clearcoatGloss","clearcoatGloss"),i("transmission","transmission"),i("ior","ior"),i("opacity","opacity"),n}};var Ja=class l extends ze{base_color=new _(1,1,1);alpha=1;alpha_mode=0;alpha_cutoff=.5;metallic=1;roughness=1;ior=1.5;specular=1;specular_color=new _(1,1,1);emissive=new _(0,0,0);emissive_strength=1;sheen_color=new _(0,0,0);sheen_roughness=0;clearcoat=0;clearcoat_roughness=0;transmission=0;thickness=0;attenuation_distance=0;attenuation_color=new _(1,1,1);iridescence=0;iridescence_ior=1.3;iridescence_thickness=100;constructor(e){super(e)}toMaterial(e){e.baseWeight=1,e.baseColor=l.clampVec(this.base_color),e.metallic=l.clamp01(this.metallic),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.ior=Math.max(this.ior,1),e.specularColor=l.clampVec(this.specular_color.scale(l.clamp01(this.specular))),e.specTrans=l.clamp01(this.transmission);let t=Math.max(this.sheen_color.x,this.sheen_color.y,this.sheen_color.z);e.sheen=l.clamp01(t),e.fuzzColor=l.clampVec(this.sheen_color),e.fuzzRoughness=l.clamp01(this.sheen_roughness),e.clearcoat=l.clamp01(this.clearcoat),e.clearcoatGloss=l.clamp01(1-this.clearcoat_roughness),e.emission=new _(this.emissive.x*this.emissive_strength,this.emissive.y*this.emissive_strength,this.emissive.z*this.emissive_strength),e.opacity=l.clamp01(this.alpha),e.alphaMode=this.alpha_mode===1?2:this.alpha_mode===2?1:0,e.alphaCutoff=l.clamp01(this.alpha_cutoff),this.transmission>0&&this.attenuation_distance>0&&(e.mediumType=1,e.mediumColor=l.clampVec(this.attenuation_color),e.mediumDensity=1/Math.max(this.attenuation_distance,.001),e.mediumAbsorption=e.mediumDensity),e.thinFilmWeight=l.clamp01(this.iridescence),e.thinFilmThickness=Math.max(this.iridescence_thickness,0),e.thinFilmIor=Math.max(this.iridescence_ior,1)}static parse(e){let t=e.getAttribute("name")??"gltfPbr",n=new l(t),i=(o,a)=>{let c=be(e,a);c!==null&&(n[o]=c)},s=(o,a)=>{let c=Wa(e,a);c!==null&&(n[o]=c)},r=(o,a)=>{let c=At(e,a);c!==null&&(n[o]=c)};return r("base_color","base_color"),i("alpha","alpha"),s("alpha_mode","alpha_mode"),i("alpha_cutoff","alpha_cutoff"),i("metallic","metallic"),i("roughness","roughness"),i("ior","ior"),i("specular","specular"),r("specular_color","specular_color"),r("emissive","emissive"),i("emissive_strength","emissive_strength"),r("sheen_color","sheen_color"),i("sheen_roughness","sheen_roughness"),i("clearcoat","clearcoat"),i("clearcoat_roughness","clearcoat_roughness"),i("transmission","transmission"),i("thickness","thickness"),i("attenuation_distance","attenuation_distance"),r("attenuation_color","attenuation_color"),i("iridescence","iridescence"),i("iridescence_ior","iridescence_ior"),i("iridescence_thickness","iridescence_thickness"),n}};var Qa=class l extends ze{diffuseColor=new _(.18,.18,.18);emissiveColor=new _(0,0,0);useSpecularWorkflow=0;specularColor=new _(0,0,0);metallic=0;roughness=.5;clearcoat=0;clearcoatRoughness=.01;ior=1.5;normal=new _(0,0,1);displacement=0;occlusion=1;opacity=1;opacityThreshold=0;constructor(e){super(e)}toMaterial(e){e.baseWeight=1,e.baseColor=l.clampVec(this.diffuseColor),this.useSpecularWorkflow===1?(e.metallic=0,e.specularColor=l.clampVec(this.specularColor)):e.metallic=l.clamp01(this.metallic),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.ior=Math.max(this.ior,1),e.clearcoat=l.clamp01(this.clearcoat),e.clearcoatGloss=l.clamp01(1-this.clearcoatRoughness),e.emission=l.clampVec(this.emissiveColor),e.opacity=l.clamp01(this.opacity),this.opacityThreshold>0?(e.alphaMode=2,e.alphaCutoff=l.clamp01(this.opacityThreshold)):this.opacity<1&&(e.alphaMode=1)}static parse(e){let t=new l("default"),n=(r,o)=>{let a=be(e,o);a!==null&&(t[r]=a)},i=(r,o)=>{let a=Wa(e,o);a!==null&&(t[r]=a)},s=(r,o)=>{let a=At(e,o);a!==null&&(t[r]=a)};return s("diffuseColor","diffuseColor"),s("emissiveColor","emissiveColor"),i("useSpecularWorkflow","useSpecularWorkflow"),s("specularColor","specularColor"),n("metallic","metallic"),n("roughness","roughness"),n("clearcoat","clearcoat"),n("clearcoatRoughness","clearcoatRoughness"),n("ior","ior"),n("occlusion","occlusion"),n("opacity","opacity"),n("opacityThreshold","opacityThreshold"),t}};var Ss=class l extends ze{melaninConcentration=.5;melaninRedness=.5;melaninMix=1;baseColor=new _(1,1,1);explicitAbsorptionCoefficient=null;longitudinalRoughness=.1;azimuthalRoughness=.1;cuticleAngle=.5;tint_R=new _(1,1,1);tint_TT=new _(1,1,1);tint_TRT=new _(1,1,1);ior=1.55;constructor(e){super(e)}toMaterial(e){let t=new _(.506,1.036,1.923),n=new _(.343,.733,1.924),i=l.clamp01(this.melaninRedness),s=Math.max(this.melaninConcentration,0),r=new _(s*(t.x*(1-i)+n.x*i),s*(t.y*(1-i)+n.y*i),s*(t.z*(1-i)+n.z*i)),o=l.clamp01(this.azimuthalRoughness),a=5.969-.215*o+2.532*Math.pow(o,2)-10.73*Math.pow(o,3)+5.574*Math.pow(o,4)+.245*Math.pow(o,5),c=a*a,u=1e-5,h=new _(Math.pow(Math.log(Math.max(this.baseColor.x,u)),2)/c,Math.pow(Math.log(Math.max(this.baseColor.y,u)),2)/c,Math.pow(Math.log(Math.max(this.baseColor.z,u)),2)/c),d=l.clamp01(this.melaninMix),f=this.explicitAbsorptionCoefficient?new _(Math.max(this.explicitAbsorptionCoefficient.x,0),Math.max(this.explicitAbsorptionCoefficient.y,0),Math.max(this.explicitAbsorptionCoefficient.z,0)):new _(r.x*d+h.x*(1-d),r.y*d+h.y*(1-d),r.z*d+h.z*(1-d));e.materialType=1,e.baseColor=new _(l.clamp01(this.tint_R.x),l.clamp01(this.tint_R.y),l.clamp01(this.tint_R.z)),e.specularColor=new _(Math.max(f.x,0),Math.max(f.y,0),Math.max(f.z,0)),e.transmissionColor=new _(l.clamp01(this.tint_TT.x),l.clamp01(this.tint_TT.y),l.clamp01(this.tint_TT.z)),e.coatColor=new _(l.clamp01(this.tint_TRT.x),l.clamp01(this.tint_TRT.y),l.clamp01(this.tint_TRT.z)),e.roughness=Math.min(Math.max(this.longitudinalRoughness,.01),1),e.anisotropic=Math.min(Math.max(this.azimuthalRoughness,.01),1),e.specularTint=l.clamp01(this.cuticleAngle),e.ior=Math.max(this.ior,1),e.doubleSided=1,e.coatIOR=1.6}static parse(e){let t=new l("default"),n=(s,r)=>{let o=be(e,r);o!==null&&(t[s]=o)},i=(s,r)=>{let o=Rt(e,r);o!==null&&(t[s]=o)};return n("melaninConcentration","melaninConcentration"),n("melaninRedness","melaninRedness"),n("melaninMix","melaninMix"),i("baseColor","baseColor"),n("longitudinalRoughness","longitudinalRoughness"),n("azimuthalRoughness","azimuthalRoughness"),n("cuticleAngle","cuticleAngle"),i("tint_R","tint_R"),i("tint_TT","tint_TT"),i("tint_TRT","tint_TRT"),n("ior","ior"),t}};var L=class{name;inputs=new Map;constructor(e){this.name=e}getDependencies(){let e=[];for(let t of this.inputs.values())t.kind==="connection"&&e.push(t.sourceName);return e}parseInputs(e){for(let t of Array.from(e.children)){let n=t.tagName.toLowerCase();if(n!=="input"&&n!=="parameter")continue;let i=t.getAttribute("name")??"";if(!i)continue;let s=t.getAttribute("type")??"float",r=t.getAttribute("value")??"",o=t.getAttribute("nodename")??"",a=t.getAttribute("output")??"",c=t.getAttribute("interfacename")??"";this.inputs.set(i,o?{kind:"connection",sourceName:o,outputName:a||void 0}:c?{kind:"interface",interfaceName:c,type:s}:{kind:"literal",value:r,type:s})}}literalValue(e){let t=this.inputs.get(e);return t?.kind==="literal"?t.value:null}literalFloat(e){let t=this.literalValue(e);if(t===null)return null;let n=parseFloat(t);return isNaN(n)?null:n}resolveGLSL(e,t){let n=this.inputs.get(e);if(!n)return"0.0";if(n.kind==="literal")return n.value.length>0?n.value:"0.0";if(n.kind==="interface"){let o=t.ifaceValues?.get(n.interfaceName);return o!==void 0?o:(this.warn(t,`Missing interface binding '${n.interfaceName}' for node '${this.name}', input '${e}'.`),this.zeroOfType(n.type))}let i=t.emitted.get(n.sourceName);if(!i){this.warn(t,`Unresolved source '${n.sourceName}' for node '${this.name}', input '${e}'.`);let o=n.outputName?.toLowerCase()??"";return o==="r"||o==="g"||o==="b"||o==="a"||o==="outx"||o==="outy"||o==="outz"||o==="outw"?"0.0":this.zeroOfType(this.outputType)}if(!n.outputName)return i;let s=t.emitted.get(`${n.sourceName}:${n.outputName}`);if(s)return s;let r=Im(n.outputName);return r.length>0?`${i}.${r}`:i}zeroOfType(e){switch(e){case"float":case"integer":case"boolean":return"0.0";case"color2":case"vector2":return"vec2(0.0)";case"vector4":case"color4":return"vec4(0.0)";case"matrix33":return"mat3(0.0)";case"matrix44":return"mat4(0.0)";default:return"vec3(0.0)"}}warn(e,t){e.warnings||(e.warnings=[]),e.warnings.push(t)}resolveRawValue(e,t){let n=this.inputs.get(e);return n?n.kind==="literal"?n.value.length>0?n.value:null:n.kind==="interface"?t.get(n.interfaceName)??null:null:null}};function Im(l){let e=l.toLowerCase();return e==="r"?"x":e==="g"?"y":e==="b"?"z":e==="a"?"w":e==="rgb"?"rgb":e==="rgba"?"rgba":e==="outx"||e==="outr"?"x":e==="outy"||e==="outg"?"y":e==="outz"||e==="outb"?"z":e==="outw"||e==="outa"?"w":e==="outcolor"||e==="outrgb"?"rgb":""}function V(l,e){return l.getAttribute("type")??e}function H(l){switch(l){case"float":return"float";case"integer":return"int";case"boolean":return"bool";case"color2":case"vector2":return"vec2";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3";case"vector4":case"color4":return"vec4";case"matrix33":return"mat3";case"matrix44":return"mat4";default:return"float"}}function Di(l){return l==="BSDF"||l==="VDF"||l==="EDF"}function lh(l){return`clamp(max(max(vec3(${l}).r, vec3(${l}).g), vec3(${l}).b), 0.0, 1.0)`}function Ni(l){switch(l){case"float":return"0.0";case"integer":return"0";case"boolean":return"false";case"color2":case"vector2":return"vec2(0.0)";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3(0.0)";case"vector4":case"color4":return"vec4(0.0)";case"matrix33":return"mat3(0.0)";case"matrix44":return"mat4(0.0)";default:return"0.0"}}function _n(l){switch(l){case"float":return"1.0";case"integer":return"1";case"boolean":return"true";case"color2":case"vector2":return"vec2(1.0)";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3(1.0)";case"vector4":case"color4":return"vec4(1.0)";case"matrix33":return"mat3(1.0)";case"matrix44":return"mat4(1.0)";default:return"1.0"}}function eo(l,e){let t=H(l);return l==="integer"||l==="boolean"||t==="float"||t==="int"||t==="bool"?e:`${t}(${e})`}function ch(l,e,t){return l==="=="?`abs((${e}) - (${t})) <= 1e-6`:`(${e} ${l} ${t})`}function dt(l,e){if(l===void 0)return e;let t=Number.parseFloat(l);return Number.isFinite(t)?`${t}`:e}function Lm(l,e){if(l===void 0)return e;let t=Number.parseInt(l,10);return Number.isFinite(t)?`${t}`:e}function uh(l,e){let t=e.split(",").map(n=>n.trim()).filter(Boolean);switch(l){case"float":return dt(t[0],"0.0");case"integer":return Lm(t[0],"0");case"boolean":{let n=(t[0]??"").toLowerCase();return n==="1"||n==="true"?"true":"false"}case"color2":case"vector2":return`vec2(${dt(t[0],"0.0")}, ${dt(t[1],"0.0")})`;case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return`vec3(${dt(t[0],"0.0")}, ${dt(t[1],"0.0")}, ${dt(t[2],"0.0")})`;case"vector4":case"color4":return`vec4(${dt(t[0],"0.0")}, ${dt(t[1],"0.0")}, ${dt(t[2],"0.0")}, ${dt(t[3],"1.0")})`;case"matrix33":return`mat3(${oh(t,9).join(", ")})`;case"matrix44":return`mat4(${oh(t,16).join(", ")})`;default:return"0.0"}}function oh(l,e){let t=[];for(let n=0;n<e;n++)t.push(dt(l[n],"0.0"));return t}var ws=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`a2_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e);return e.lines.push(`${n} ${t} = atan(${i}, ${s});`),e.emitted.set(this.name,t),t}};var ft=class extends L{outputType="float";op;mode;constructor(e,t,n="operator"){super(e),this.op=t,this.mode=n}parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`b_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e),r=this.mode==="function"?`${this.op}(${i}, ${s})`:`(${i} ${this.op} ${s})`;if(e.lines.push(`${n} ${t} = ${r};`),e.emitted.set(this.name,t),Di(this.outputType)){let o=this.inputs.get("in1"),a=this.inputs.get("in2"),c=o?.kind==="connection"?o.sourceName:null,u=a?.kind==="connection"?a.sourceName:null,h=c?e.closureContracts?.get(c):void 0,d=u?e.closureContracts?.get(u):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:t,sampleExpr:t,pdfExpr:h?.pdfExpr??d?.pdfExpr??"1.0",flagsExpr:h&&d?`(${h.flagsExpr} | ${d.flagsExpr})`:h?.flagsExpr??d?.flagsExpr??"0"})}return t}};var Es=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`cl_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("low",e),r=this.resolveGLSL("high",e);return e.lines.push(`${n} ${t} = clamp(${i}, ${s}, ${r});`),e.emitted.set(this.name,t),t}};var yn=class extends L{outputType="vector3";arity;constructor(e,t){super(e),this.arity=t}parse(e){return this.parseInputs(e),this.outputType=V(e,this.defaultType()),this}emitGLSL(e){let t=`cmb_${this.name}`,n=H(this.outputType),i=[];for(let s=1;s<=this.arity;s++)i.push(this.resolveGLSL(`in${s}`,e));return e.lines.push(`${n} ${t} = ${n}(${i.join(", ")});`),e.emitted.set(this.name,t),t}defaultType(){return this.arity<=2?"vector2":this.arity===3?"vector3":"vector4"}};var As=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`k_${this.name}`,n=this.resolveGLSL("value",e),i=H(this.outputType),s=uh(this.outputType,n);return e.lines.push(`${i} ${t} = ${s};`),e.emitted.set(this.name,t),t}};var Rs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`dot_${this.name}`,n=this.resolveGLSL("in",e),i=H(this.outputType);return e.lines.push(`${i} ${t} = ${n};`),e.emitted.set(this.name,t),t}};var Cs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`ext_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("index",e),r=Number.parseInt(s,10),o=Number.isFinite(r)?["x","y","z","w"][Math.max(0,Math.min(3,r))]:"x";return e.lines.push(`${n} ${t} = ${i}.${o};`),e.emitted.set(this.name,t),t}};var Fe=class extends L{outputType;filePath="";colorspace="";constructor(e,t="color3"){super(e),this.outputType=t}parse(e){this.parseInputs(e),this.filePath=this.literalValue("file")??"";let t=Array.from(e.children).find(n=>n.tagName.toLowerCase()==="input"&&n.getAttribute("name")==="file");return this.colorspace=t?.getAttribute("colorspace")??"",this}emitGLSL(e){let t=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):e.texCoordExpr??"vTexCoords",n=`img_${this.name}`,i=this.outputType==="float"?"float":"vec3",s=this.outputType==="float"?".r":".rgb",r=e.textureArrayUniform?`texture(${e.textureArrayUniform}, vec3(${t}, float(${e.textureLayerExpr??"0"})))${s}`:`texture(${e.envTexUniform}, ${t})${s}`;return e.lines.push(`${i} ${n} = ${r};`),e.emitted.set(this.name,n),n}};var Fi=class extends L{outputType="color3";hdrFile="";rotation=0;parse(e){return this.parseInputs(e),this.hdrFile=this.literalValue("file")??"",this.rotation=this.literalFloat("rotation")??0,this}emitGLSL(e){let t=this.resolveGLSL("viewdir",e),i=this.inputs.get("rotation")?.kind==="connection"?this.resolveGLSL("rotation",e):"envMapRot",s=`theta_${this.name}`,r=`uv_${this.name}`,o=`c_${this.name}`;return e.lines.push(`float ${s} = acos(clamp(${t}.y, -1.0, 1.0));`,`vec2 ${r} = vec2((PI + atan(${t}.z, ${t}.x)) * INV_TWO_PI + ${i}, ${s} * INV_PI);`,`vec3 ${o} = texture(${e.envTexUniform}, ${r}).rgb;`),e.emitted.set(this.name,o),o}};var Ui=class extends L{outputType="lightshader";parse(e){return this.parseInputs(e),this}resolveIntensity(e){let t=this.resolveRawValue("intensity",e);if(t===null)return 1;let n=parseFloat(t);return isNaN(n)?1:n}emitGLSL(e){let t=this.resolveGLSL("edf",e),n=this.resolveGLSL("intensity",e),i=`light_${this.name}`;return e.lines.push(`vec3 ${i} = ${t} * ${n};`),e.emitted.set(this.name,i),i}};var Is=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`lum_${this.name}`,n=H(this.outputType),s=`dot((${this.resolveGLSL("in",e)}).rgb, vec3(0.2126, 0.7152, 0.0722))`,r=n==="float"?s:`${n}(${s})`;return e.lines.push(`${n} ${t} = ${r};`),e.emitted.set(this.name,t),t}};var bn=class extends L{outputType="color3";get in2Literal(){return this.literalFloat("in2")}parse(e){return this.parseInputs(e),this.outputType=V(e,"color3"),this}emitGLSL(e){let t=H(this.outputType),n=this.resolveGLSL("in1",e),s=this.inputs.get("in2")?.kind==="connection"?this.resolveGLSL("in2",e):e.preferEnvMapIntensityLiterals?"envMapIntensity":this.resolveGLSL("in2",e),r=`mul_${this.name}`;if(Di(this.outputType)){e.lines.push(`${t} ${r} = vec3(${n}) * vec3(${s});`);let o=this.inputs.get("in1"),a=this.inputs.get("in2"),c=o?.kind==="connection"?o.sourceName:null,u=a?.kind==="connection"?a.sourceName:null,h=c?e.closureContracts?.get(c):void 0,d=u?e.closureContracts?.get(u):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:r,sampleExpr:r,pdfExpr:h?.pdfExpr??d?.pdfExpr??"1.0",flagsExpr:h&&d?`(${h.flagsExpr} | ${d.flagsExpr})`:h?.flagsExpr??d?.flagsExpr??"0"})}else e.lines.push(`${t} ${r} = (${n}) * (${s});`);return e.emitted.set(this.name,r),r}};var Pm="1",Dm="2",Nm="4",ae=class extends L{outputType="BSDF";parse(e){return this.parseInputs(e),this}emitGLSL(e){return"vec3(0.0)"}scalar(e,t,n){return this.inputs.has(t)?this.resolveGLSL(t,e):n}color(e,t,n){return this.inputs.has(t)?this.resolveGLSL(t,e):n}registerClosureContract(e,t,n,i,s,r){e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:t,evalExpr:n,sampleExpr:i,pdfExpr:s,flagsExpr:r})}flagReflect(){return Pm}flagTransmit(){return Dm}flagEmissive(){return Nm}};var ve=class extends ae{kindHint;mode;constructor(e,t="generic",n="reflect"){super(e),this.kindHint=t,this.mode=n}emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color",this.mode==="emissive"?"vec3(1.0)":"vec3(0.8)"),i=this.scalar(e,"roughness","0.35"),s=`closure_${this.name}`;e.lines.push(`float fallbackRough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float fallbackScale_${this.name} = mix(1.0, 0.6, fallbackRough_${this.name});`),e.lines.push(`vec3 ${s} = max((${n}) * (${t}) * fallbackScale_${this.name}, vec3(0.0));`),e.lines.push(`float fallbackPdf_${this.name} = clamp(0.2 + 0.8 * (1.0 - fallbackRough_${this.name}), 1e-4, 1.0);`),e.lines.push(`vec3 fallbackSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`);let r=this.flagReflect();return this.mode==="transmit"?r=this.flagTransmit():this.mode==="both"?r=`(${this.flagReflect()} | ${this.flagTransmit()})`:this.mode==="emissive"&&(r=this.flagEmissive()),this.registerClosureContract(e,this.kindHint,s,`fallbackSample_${this.name}`,`fallbackPdf_${this.name}`,r),e.emitted.set(this.name,s),s}};var Ls=class extends L{outputType="vector3";scale=1;parse(e){return this.parseInputs(e),this.scale=this.literalFloat("scale")??1,this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=`nm_${this.name}`;return e.lines.push(`vec3 ${n} = normalize(${t} * 2.0 - 1.0) * ${this.scale.toFixed(4)};`),e.emitted.set(this.name,n),n}};var Ps=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`sp_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e);return e.lines.push(`${n} ${t} = pow(max(${i}, ${n}(0.0)), ${s});`),e.emitted.set(this.name,t),t}};var Zt=class extends L{outputType="multioutput";arity;constructor(e,t){super(e),this.arity=t}parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=this.arity===2?"vec2":this.arity===3?"vec3":"vec4",i=`sep_${this.name}`;e.lines.push(`${n} ${i}_in = ${t};`);let s=["x","y","z","w"];for(let o=0;o<this.arity;o++){let a=s[o],c=`${i}_out${a}`;e.lines.push(`float ${c} = ${i}_in.${a};`),e.emitted.set(`${this.name}:out${a}`,c),a==="x"&&e.emitted.set(`${this.name}:outr`,c),a==="y"&&e.emitted.set(`${this.name}:outg`,c),a==="z"&&e.emitted.set(`${this.name}:outb`,c),a==="w"&&e.emitted.set(`${this.name}:outa`,c)}let r=`${i}_outx`;return e.emitted.set(this.name,r),r}};var Ds=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=V(e,"color3"),this}emitGLSL(e){let t=`swz_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=(this.literalValue("channels")??"").trim(),r=Fm(n),o=Um(s,r);return e.lines.push(`${n} ${t} = (${i}).${o};`),e.emitted.set(this.name,t),t}};function Fm(l){return l==="vec2"?2:l==="vec3"?3:l==="vec4"?4:1}function Um(l,e){let t=l.toLowerCase().replace(/[^xyzwrgba]/g,"");return t.length>=e?t.slice(0,e).replace(/r/g,"x").replace(/g/g,"y").replace(/b/g,"z").replace(/a/g,"w"):["x","xy","xyz","xyzw"][Math.max(0,Math.min(3,e-1))]}var Ns=class extends L{outputType="vector2";index=0;parse(e){let t=e.getAttribute("index");return this.index=t!==null?parseInt(t,10):0,this}emitGLSL(e){let t=`tc_${this.name}`;return e.lines.push(`vec2 ${t} = ${e.texCoordExpr??"vTexCoords"};`),e.emitted.set(this.name,t),t}};var Bi=class extends L{outputType="vector2";uvScale=[1,1];parse(e){this.parseInputs(e);let n=(this.literalValue("mat")??"").split(",").map(i=>parseFloat(i.trim()));return n.length>=5&&(this.uvScale=[isNaN(n[0])?1:n[0],isNaN(n[4])?1:n[4]]),this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=`tm_${this.name}`;return e.lines.push(`vec2 ${n} = vec2(${this.uvScale[0].toFixed(4)}, ${this.uvScale[1].toFixed(4)}) * ${t};`),e.emitted.set(this.name,n),n}};var we=class extends L{outputType="float";fnName;constructor(e,t){super(e),this.fnName=t}parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`u_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e);return e.lines.push(`${n} ${t} = ${this.fnName}(${i});`),e.emitted.set(this.name,t),t}};var vn=class extends L{outputType="EDF";parse(e){return this.parseInputs(e),this}resolveColor(e){let t=this.resolveRawValue("color",e);if(!t)return[1,1,1];let n=t.split(",").map(i=>parseFloat(i.trim()));return n.length<3||n.some(isNaN)?[1,1,1]:[n[0],n[1],n[2]]}emitGLSL(e){let t=this.inputs.get("color"),n;if(!t)n="vec3(1.0)";else if(t.kind==="connection")n=e.emitted.get(t.sourceName)??"vec3(1.0)";else{let s=t.kind==="literal"?t.value:e.ifaceValues?.get(t.interfaceName)??null;n=s?Bm(s):"vec3(1.0)"}let i=`edf_${this.name}`;return e.lines.push(`vec3 ${i} = ${n};`),e.lines.push(`vec3 edfSample_${this.name} = normalize(max(${i}, vec3(1e-6)));`),e.lines.push(`float edfPdf_${this.name} = 1.0;`),e.emitted.set(this.name,i),e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"edf",evalExpr:i,sampleExpr:`edfSample_${this.name}`,pdfExpr:`edfPdf_${this.name}`,flagsExpr:"4"}),i}};function Bm(l){let e=l.split(",").map(t=>t.trim());return e.length>=3?`vec3(${e.slice(0,3).join(", ")})`:`vec3(${l})`}var Fs=class extends L{outputType="vector3";parse(e){return this}emitGLSL(e){let t=`vd_${this.name}`;return e.lines.push(`vec3 ${t} = r.direction;`),e.emitted.set(this.name,t),t}};var Us=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=V(e,"color3"),this}emitGLSL(e){let t=`hsv2rgb_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=`hsv_${this.name}`,r=`p_${this.name}`;return e.lines.push(`vec3 ${s} = (${i}).rgb;`),e.lines.push(`vec3 ${r} = abs(fract(${s}.xxx + vec3(0.0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0);`),e.lines.push(`vec3 ${t} = ${s}.z * mix(vec3(1.0), clamp(${r} - 1.0, 0.0, 1.0), ${s}.y);`),n!=="vec3"&&e.lines.push(`${n} ${t}_cast = ${n}(${t});`),e.emitted.set(this.name,n==="vec3"?t:`${t}_cast`),n==="vec3"?t:`${t}_cast`}};var Bs=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=V(e,"color3"),this}emitGLSL(e){let t=`rgb2hsv_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=`rgb_${this.name}`,r=`k_${this.name}`,o=`p_${this.name}`,a=`q_${this.name}`,c=`d_${this.name}`,u=`e_${this.name}`;return e.lines.push(`vec3 ${s} = (${i}).rgb;`),e.lines.push(`vec4 ${r} = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);`),e.lines.push(`vec4 ${o} = mix(vec4(${s}.bg, ${r}.wz), vec4(${s}.gb, ${r}.xy), step(${s}.b, ${s}.g));`),e.lines.push(`vec4 ${a} = mix(vec4(${o}.xyw, ${s}.r), vec4(${s}.r, ${o}.yzx), step(${o}.x, ${s}.r));`),e.lines.push(`float ${c} = ${a}.x - min(${a}.w, ${a}.y);`),e.lines.push(`float ${u} = 1.0e-10;`),e.lines.push(`vec3 ${t} = vec3(abs(${a}.z + (${a}.w - ${a}.y) / (6.0 * ${c} + ${u})), ${c} / (${a}.x + ${u}), ${a}.x);`),n!=="vec3"&&e.lines.push(`${n} ${t}_cast = ${n}(${t});`),e.emitted.set(this.name,n==="vec3"?t:`${t}_cast`),n==="vec3"?t:`${t}_cast`}};var Os=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=V(e,"vector3"),this}emitGLSL(e){let t=`norm_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e);return e.lines.push(`${n} ${t} = normalize(${i});`),e.emitted.set(this.name,t),t}};var Gs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`dotp_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`float ${t} = dot(${n}, ${i});`),e.emitted.set(this.name,t),t}};var zs=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=V(e,"vector3"),this}emitGLSL(e){let t=`cross_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`vec3 ${t} = cross(${n}, ${i});`),e.emitted.set(this.name,t),t}};var ks=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=V(e,"vector3"),this}emitGLSL(e){let t=`refl_${this.name}`,n=this.resolveGLSL("in",e),i=this.resolveGLSL("normal",e),s=H(this.outputType);return e.lines.push(`${s} ${t} = reflect(${n}, ${i});`),e.emitted.set(this.name,t),t}};var Vs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`mag_${this.name}`,n=this.resolveGLSL("in",e);return e.lines.push(`float ${t} = length(${n});`),e.emitted.set(this.name,t),t}};var Hs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`facing_${this.name}`,n=this.inputs.has("normal")?this.resolveGLSL("normal",e):"vec3(0.0, 0.0, 1.0)",i=this.inputs.has("view_position")?this.resolveGLSL("view_position",e):"vec3(0.0, 0.0, 1.0)",s=this.inputs.has("invert")?this.resolveGLSL("invert",e):"false";return e.lines.push(`float ${t}_base = clamp(dot(normalize(${n}), normalize(${i})), 0.0, 1.0);`),e.lines.push(`float ${t} = bool(${s}) ? (1.0 - ${t}_base) : ${t}_base;`),e.emitted.set(this.name,t),t}};var $s=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`cmp_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("intest",e),s=this.inputs.has("cutoff")?this.resolveGLSL("cutoff",e):"0.0",r=this.inputs.has("in1")?this.resolveGLSL("in1",e):_n(this.outputType),o=this.inputs.has("in2")?this.resolveGLSL("in2",e):Ni(this.outputType);return e.lines.push(`${n} ${t} = ((${i}) > (${s})) ? ${r} : ${o};`),e.emitted.set(this.name,t),t}};var Tn=class extends L{outputType="float";op;constructor(e,t){super(e),this.op=t}parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`ifc_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("value1",e),s=this.resolveGLSL("value2",e),r=ch(this.op,i,s);if(this.outputType==="boolean"&&!this.inputs.has("in1")&&!this.inputs.has("in2"))return e.lines.push(`bool ${t} = ${r};`),e.emitted.set(this.name,t),t;let o=this.inputs.has("in1")?this.resolveGLSL("in1",e):_n(this.outputType),a=this.inputs.has("in2")?this.resolveGLSL("in2",e):Ni(this.outputType);return e.lines.push(`${n} ${t} = (${r}) ? ${o} : ${a};`),e.emitted.set(this.name,t),t}};var Ws=class extends Tn{constructor(e){super(e,"==")}};var Xs=class extends Tn{constructor(e){super(e,">")}};var Ys=class extends Tn{constructor(e){super(e,">=")}};var qs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`sw_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("which",e),s=this.inputs.has("in1")?this.resolveGLSL("in1",e):Ni(this.outputType);e.lines.push(`int ${t}_idx = clamp(int(floor(${i} + 0.5)), 1, 10);`),e.lines.push(`${n} ${t} = ${s};`);for(let r=2;r<=10;r++){if(!this.inputs.has(`in${r}`))continue;let o=this.resolveGLSL(`in${r}`,e);e.lines.push(`if (${t}_idx == ${r}) { ${t} = ${o}; }`)}return e.emitted.set(this.name,t),t}};var Mn=class extends L{outputType="boolean";op;constructor(e,t){super(e),this.op=t}parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`lgc_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`bool ${t} = bool(${n}) ${this.op} bool(${i});`),e.emitted.set(this.name,t),t}};var js=class extends Mn{constructor(e){super(e,"&&")}};var Ks=class extends Mn{constructor(e){super(e,"||")}};var Zs=class extends Mn{constructor(e){super(e,"!=")}};var Js=class extends L{outputType="boolean";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`not_${this.name}`,n=this.resolveGLSL("in",e);return e.lines.push(`bool ${t} = !bool(${n});`),e.emitted.set(this.name,t),t}};var Qs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`remap_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("inlow",e),r=this.resolveGLSL("inhigh",e),o=this.resolveGLSL("outlow",e),a=this.resolveGLSL("outhigh",e),c=eo(this.outputType,"1e-6"),u=`((${i}) - (${s})) / max((${r}) - (${s}), ${c})`,h=`(${o}) + (${a} - ${o}) * (${u})`;return e.lines.push(`${n} ${t} = ${h};`),e.emitted.set(this.name,t),t}};var er=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`smooth_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("low",e),r=this.resolveGLSL("high",e);return e.lines.push(`${n} ${t} = smoothstep(${s}, ${r}, ${i});`),e.emitted.set(this.name,t),t}};var tr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`contrast_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=this.inputs.has("amount")?this.resolveGLSL("amount",e):_n(this.outputType),r=this.inputs.has("pivot")?this.resolveGLSL("pivot",e):eo(this.outputType,"0.5");return e.lines.push(`${n} ${t} = ((${i}) - (${r})) * (${s}) + (${r});`),e.emitted.set(this.name,t),t}};var nr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`inv_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("in",e),s=this.inputs.has("amount")?this.resolveGLSL("amount",e):_n(this.outputType);return e.lines.push(`${n} ${t} = (${s}) - (${i});`),e.emitted.set(this.name,t),t}};var ir=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`mix_${this.name}`,n=H(this.outputType),i=this.resolveGLSL("fg",e),s=this.resolveGLSL("bg",e),r=this.resolveGLSL("mix",e);if(Di(this.outputType)){let o=lh(r);e.lines.push(`float mixW_${this.name} = ${o};`),e.lines.push(`${n} ${t} = (${s}) * (1.0 - mixW_${this.name}) + (${i}) * mixW_${this.name};`);let a=this.inputs.get("fg"),c=this.inputs.get("bg"),u=a?.kind==="connection"?a.sourceName:null,h=c?.kind==="connection"?c.sourceName:null,d=u?e.closureContracts?.get(u):void 0,f=h?e.closureContracts?.get(h):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:t,sampleExpr:t,pdfExpr:d&&f?`mix((${f.pdfExpr}), (${d.pdfExpr}), mixW_${this.name})`:d?.pdfExpr??f?.pdfExpr??"1.0",flagsExpr:d&&f?`(${d.flagsExpr} | ${f.flagsExpr})`:d?.flagsExpr??f?.flagsExpr??"0"})}else e.lines.push(`${n} ${t} = mix(${s}, ${i}, ${r});`);return e.emitted.set(this.name,t),t}};var sr=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`bb_${this.name}`,i=`((${this.resolveGLSL("temperature",e)}) / 100.0)`,s=`clamp(${i} <= 66.0 ? 1.0 : (1.292936186062745 * pow(${i} - 60.0, -0.1332047592)), 0.0, 1.0)`,r=`clamp(${i} <= 66.0 ? (0.3900815787690196 * log(max(${i}, 1.0)) - 0.6318414437886275) : (1.129890860895294 * pow(${i} - 60.0, -0.0755148492)), 0.0, 1.0)`,o=`clamp(${i} >= 66.0 ? 1.0 : (${i} <= 19.0 ? 0.0 : (0.5432067891101961 * log(${i} - 10.0) - 1.19625408914)), 0.0, 1.0)`;return e.lines.push(`vec3 ${t} = vec3(${s}, ${r}, ${o});`),e.emitted.set(this.name,t),t}};var rr=class extends ae{emitGLSL(e){let t=this.color(e,"tint_R","vec3(1.0)"),n=this.color(e,"tint_TT","vec3(1.0)"),i=this.color(e,"tint_TRT","vec3(1.0)"),s=this.scalar(e,"ior","1.55"),r=this.scalar(e,"cuticle_angle","0.5"),o=this.color(e,"absorption_coefficient","vec3(0.3, 0.8, 1.5)"),a=this.inputs.has("roughness_R")?this.resolveGLSL("roughness_R",e):"vec2(0.1, 0.1)",c=this.inputs.has("roughness_TT")?this.resolveGLSL("roughness_TT",e):a,u=this.inputs.has("roughness_TRT")?this.resolveGLSL("roughness_TRT",e):a,h=`hair_${this.name}`;return e.lines.push(`vec2 hairRoughR_${this.name} = ${a};`),e.lines.push(`vec2 hairRoughTT_${this.name} = ${c};`),e.lines.push(`vec2 hairRoughTRT_${this.name} = ${u};`),e.lines.push(`float hairRoughAvg_${this.name} = clamp((hairRoughR_${this.name}.x + hairRoughTT_${this.name}.x + hairRoughTRT_${this.name}.x) / 3.0, 0.01, 1.0);`),e.lines.push(`float hairIor_${this.name} = max(${s}, 1.0);`),e.lines.push(`float hairCuticle_${this.name} = clamp(${r}, 0.0, 1.0);`),e.lines.push(`vec3 hairAbs_${this.name} = max(${o}, vec3(0.0));`),e.lines.push(`vec3 hairTintMix_${this.name} = (0.5 * ${t}) + (0.35 * ${n}) + (0.15 * ${i});`),e.lines.push(`vec3 ${h} = max(hairTintMix_${this.name}, vec3(0.0)) * (1.0 + 0.05 * (hairIor_${this.name} - 1.0)) * (1.0 + 0.1 * hairCuticle_${this.name}) * (1.0 - 0.3 * hairRoughAvg_${this.name}) * exp(-0.1 * hairAbs_${this.name});`),e.lines.push(`vec3 chiangHairSample_${this.name} = normalize(max(${h}, vec3(1e-6)));`),e.lines.push(`float chiangHairPdf_${this.name} = clamp(0.5 + 0.5 * (1.0 - hairRoughAvg_${this.name}), 1e-4, 1.0);`),e.emitted.set(this.name,h),this.registerClosureContract(e,"hair",h,`chiangHairSample_${this.name}`,`chiangHairPdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),h}};var ar=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("color")?this.resolveGLSL("color",e):this.inputs.has("base_color")?this.resolveGLSL("base_color",e):"vec3(1.0)",n=this.inputs.has("azimuthal_roughness")?this.resolveGLSL("azimuthal_roughness",e):this.inputs.has("beta_m")?this.resolveGLSL("beta_m",e):"0.1",i=`hairSigmaA_${this.name}`,s=`hairBetaM_${this.name}`,r=`hairSigmaDenom_${this.name}`,o=`hairSafeColor_${this.name}`;return e.lines.push(`float ${s} = clamp(${n}, 0.0, 1.0);`),e.lines.push(`float ${r} = 5.969 - 0.215 * ${s} + 2.532 * ${s} * ${s} - 10.73 * ${s} * ${s} * ${s} + 5.574 * pow(${s}, 4.0) + 0.245 * pow(${s}, 5.0);`),e.lines.push(`vec3 ${o} = max(${t}, vec3(1e-5));`),e.lines.push(`vec3 ${i} = pow(log(${o}), vec3(2.0)) / max(${r} * ${r}, 1e-5);`),e.emitted.set(this.name,i),i}};var or=class extends L{outputType="multioutput";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("longitudinal_roughness")?this.resolveGLSL("longitudinal_roughness",e):this.inputs.has("roughness")?this.resolveGLSL("roughness",e):"0.1",n=this.inputs.has("azimuthal_roughness")?this.resolveGLSL("azimuthal_roughness",e):this.inputs.has("roughness")?this.resolveGLSL("roughness",e):"0.1",i=`hairRough_${this.name}`,s=`${i}_outx`,r=`${i}_outy`;return e.lines.push(`float ${s} = clamp(${t}, 0.01, 1.0);`),e.lines.push(`float ${r} = clamp(${n}, 0.01, 1.0);`),e.lines.push(`vec2 ${i} = vec2(${s}, ${r});`),e.emitted.set(this.name,i),e.emitted.set(`${this.name}:outx`,s),e.emitted.set(`${this.name}:outy`,r),e.emitted.set(`${this.name}:outr`,s),e.emitted.set(`${this.name}:outg`,r),e.emitted.set(`${this.name}:longitudinal_roughness`,s),e.emitted.set(`${this.name}:azimuthal_roughness`,r),e.emitted.set(`${this.name}:betan`,s),e.emitted.set(`${this.name}:betam`,r),i}};var lr=class extends L{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rougha_${this.name}`,n=this.resolveGLSL("roughness",e),i=this.resolveGLSL("anisotropy",e);return e.lines.push(`float ${t}_r = max(${n}, 1e-4);`),e.lines.push(`float ${t}_a = clamp(${i}, -0.99, 0.99);`),e.lines.push(`vec2 ${t} = vec2(${t}_r / (1.0 + ${t}_a), ${t}_r * (1.0 + ${t}_a));`),e.emitted.set(this.name,t),t}};var cr=class extends L{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`roughd_${this.name}`,n=this.resolveGLSL("roughness",e);return e.lines.push(`vec2 ${t} = vec2(${n});`),e.emitted.set(this.name,t),t}};var ur=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("melanin")?this.resolveGLSL("melanin",e):this.inputs.has("melanin_concentration")?this.resolveGLSL("melanin_concentration",e):"0.5",n=this.inputs.has("melanin_redness")?this.resolveGLSL("melanin_redness",e):this.inputs.has("melaninRedness")?this.resolveGLSL("melaninRedness",e):"0.5",i=`hairMelaninSigmaA_${this.name}`,s=`hairMelanin_${this.name}`,r=`hairRedness_${this.name}`;return e.lines.push(`float ${s} = max(${t}, 0.0);`),e.lines.push(`float ${r} = clamp(${n}, 0.0, 1.0);`),e.lines.push(`vec3 ${i} = ${s} * mix(vec3(0.506, 1.036, 1.923), vec3(0.343, 0.733, 1.924), ${r});`),e.emitted.set(this.name,i),i}};var hr=class extends L{outputType="multioutput";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`aior_${this.name}`,n=this.inputs.has("reflectivity")?this.resolveGLSL("reflectivity",e):"vec3(1.0)",i=this.inputs.has("edge_color")?this.resolveGLSL("edge_color",e):"vec3(1.0)",s=`${t}_ior`,r=`${t}_extinction`;return e.lines.push(`vec3 ${s} = max(vec3(1.0), vec3(1.0) + vec3(${n}) * 4.0);`),e.lines.push(`vec3 ${r} = max(vec3(0.0), (vec3(1.0) - vec3(${i})) * 3.0);`),e.emitted.set(`${this.name}:ior`,s),e.emitted.set(`${this.name}:extinction`,r),e.emitted.set(this.name,s),s}};var dr=class extends L{outputType="surfaceshader";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("bsdf")?this.resolveGLSL("bsdf",e):"vec3(0.0)",n=this.inputs.has("vdf")?this.resolveGLSL("vdf",e):"vec3(0.0)",i=this.inputs.has("edf")?this.resolveGLSL("edf",e):"vec3(0.0)",s=this.inputs.has("opacity")?this.resolveGLSL("opacity",e):"1.0",r=`surface_${this.name}`;e.lines.push(`float surfaceOpacity_${this.name} = clamp(${s}, 0.0, 1.0);`),e.lines.push(`vec3 ${r} = ((${t}) + (${n})) * surfaceOpacity_${this.name} + (${i});`),e.emitted.set(this.name,r);let o=this.inputs.get("bsdf"),a=this.inputs.get("vdf"),c=this.inputs.get("edf"),u=o?.kind==="connection"?e.closureContracts?.get(o.sourceName):void 0,h=a?.kind==="connection"?e.closureContracts?.get(a.sourceName):void 0,d=c?.kind==="connection"?e.closureContracts?.get(c.sourceName):void 0;return e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:u?.kind??h?.kind??"generic",evalExpr:r,sampleExpr:u?.sampleExpr??h?.sampleExpr??r,pdfExpr:u?.pdfExpr??h?.pdfExpr??"1.0",flagsExpr:d?`((${u?.flagsExpr??"0"} | ${h?.flagsExpr??"0"}) | ${d.flagsExpr})`:`(${u?.flagsExpr??"0"} | ${h?.flagsExpr??"0"})`}),r}};var Hn=class extends L{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`p2d_${this.name}`,n=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):this.inputs.has("in")?this.resolveGLSL("in",e):"vTexCoords",i=this.inputs.has("offset")?this.resolveGLSL("offset",e):"vec2(0.0)",s=this.inputs.has("scale")?this.resolveGLSL("scale",e):"vec2(1.0)",r=this.inputs.has("pivot")?this.resolveGLSL("pivot",e):"vec2(0.0)";return e.lines.push(`vec2 ${t} = ((${n}) - (${r})) * (${s}) + (${r}) + (${i});`),e.emitted.set(this.name,t),t}};var $n=class extends L{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rot2_${this.name}`,n=this.resolveGLSL("in",e),i=this.inputs.has("amount")?this.resolveGLSL("amount",e):"0.0";return e.lines.push(`float ${t}_a = (abs(${i}) > 6.2831853) ? radians(${i}) : (${i});`),e.lines.push(`float ${t}_c = cos(${t}_a);`),e.lines.push(`float ${t}_s = sin(${t}_a);`),e.lines.push(`vec2 ${t} = vec2(${t}_c * (${n}).x - ${t}_s * (${n}).y, ${t}_s * (${n}).x + ${t}_c * (${n}).y);`),e.emitted.set(this.name,t),t}};var fr=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rot3_${this.name}`,n=this.resolveGLSL("in",e),i=this.inputs.has("axis")?this.resolveGLSL("axis",e):"vec3(0.0, 0.0, 1.0)",s=this.inputs.has("amount")?this.resolveGLSL("amount",e):"0.0";return e.lines.push(`float ${t}_a = (abs(${s}) > 6.2831853) ? radians(${s}) : (${s});`),e.lines.push(`vec3 ${t}_ax = normalize(${i});`),e.lines.push(`float ${t}_c = cos(${t}_a);`),e.lines.push(`float ${t}_s = sin(${t}_a);`),e.lines.push(`vec3 ${t} = (${n}) * ${t}_c + cross(${t}_ax, (${n})) * ${t}_s + ${t}_ax * dot(${t}_ax, (${n})) * (1.0 - ${t}_c);`),e.emitted.set(this.name,t),t}};function Om(l){if(!l)return null;let e=l.split(",").map(t=>Number.parseFloat(t.trim())).filter(t=>Number.isFinite(t));return e.length>=16?{expr:`mat4(${e.slice(0,16).map(n=>`${n}`).join(", ")})`,dim:4}:e.length>=9?{expr:`mat3(${e.slice(0,9).map(n=>`${n}`).join(", ")})`,dim:3}:null}var Sn=class extends L{outputType="vector3";mode;matExpr=null;matDim=3;constructor(e,t){super(e),this.mode=t}parse(e){this.parseInputs(e),this.outputType=V(e,"vector3");let t=this.literalValue("mat")??"",n=Om(t);return n&&(this.matExpr=n.expr,this.matDim=n.dim),this}emitGLSL(e){let t=`tf_${this.name}`,n=this.resolveGLSL("in",e),i=H(this.outputType);return this.matExpr?(this.outputType==="vector2"?this.matDim===3?(e.lines.push(`vec3 ${t}_p = ${this.matExpr} * vec3((${n}).xy, ${this.mode==="point"?"1.0":"0.0"});`),e.lines.push(`vec2 ${t} = ${t}_p.xy;`)):(e.lines.push(`vec4 ${t}_p = ${this.matExpr} * vec4((${n}).xy, 0.0, ${this.mode==="point"?"1.0":"0.0"});`),e.lines.push(`vec2 ${t} = ${t}_p.xy;`)):this.outputType==="vector4"?e.lines.push(`vec4 ${t} = ${this.matDim===4?this.matExpr:`mat4(${this.matExpr})`} * vec4(${n});`):this.mode==="normal"?this.matDim===4?(e.lines.push(`mat3 ${t}_nmat = mat3(transpose(inverse(${this.matExpr})));`),e.lines.push(`vec3 ${t} = normalize(${t}_nmat * vec3(${n}));`)):e.lines.push(`vec3 ${t} = normalize(transpose(inverse(${this.matExpr})) * vec3(${n}));`):this.mode==="point"?this.matDim===4?(e.lines.push(`vec4 ${t}_p = ${this.matExpr} * vec4(vec3(${n}), 1.0);`),e.lines.push(`vec3 ${t} = ${t}_p.xyz;`)):e.lines.push(`vec3 ${t} = ${this.matExpr} * vec3(${n});`):this.matDim===4?(e.lines.push(`vec4 ${t}_v = ${this.matExpr} * vec4(vec3(${n}), 0.0);`),e.lines.push(`vec3 ${t} = ${t}_v.xyz;`)):e.lines.push(`vec3 ${t} = ${this.matExpr} * vec3(${n});`),e.emitted.set(this.name,t),t):(e.lines.push(`${i} ${t} = ${n};`),e.emitted.set(this.name,t),t)}};var pr=class extends Sn{constructor(e){super(e,"point")}};var mr=class extends Sn{constructor(e){super(e,"vector")}};var gr=class extends Sn{constructor(e){super(e,"normal")}};function hh(l,e){switch(l){case"float":return e;case"integer":return`int(${e})`;case"boolean":return`((${e}) > 0.5)`;case"vector2":case"color2":return`vec2(${e})`;case"vector3":case"color3":case"EDF":case"lightshader":case"surfaceshader":return`vec3(${e})`;case"vector4":case"color4":return`vec4(${e})`;default:return e}}var me=class extends L{outputType="float";kind;constructor(e,t){super(e),this.kind=t}parse(e){return this.parseInputs(e),this.outputType=V(e,"float"),this}emitGLSL(e){let t=`d2_${this.name}`,n=H(this.outputType),i=this.inputs.has("in")?this.resolveGLSL("in",e):this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):this.inputs.has("position")?this.resolveGLSL("position",e):"vTexCoords",s=`vec2(${i})`,r=`vec3(${i}, 0.0)`,o=`fract(sin(dot(${r}, vec3(12.9898, 78.233, 37.719))) * 43758.5453)`,a=o;return this.kind==="checker"?a=`mod(floor(${s}.x) + floor(${s}.y), 2.0)`:this.kind==="grid"?a=`max(step(0.95, fract(${s}.x)), step(0.95, fract(${s}.y)))`:this.kind==="circle"?a=`1.0 - step(0.25, length(fract(${s}) - vec2(0.5)))`:this.kind==="line"?a=`1.0 - step(0.05, abs(fract(${s}.y) - 0.5))`:this.kind==="trianglewave"?a=`abs(fract(${s}.x) * 2.0 - 1.0)`:this.kind==="fractal2d"||this.kind==="fractal3d"?a=`(${o} + fract(sin(dot(${r} * 2.0, vec3(12.9898, 78.233, 37.719))) * 43758.5453) * 0.5)`:this.kind==="cellnoise2d"||this.kind==="cellnoise3d"?a=`fract(sin(dot(floor(${r}), vec3(127.1, 311.7, 74.7))) * 43758.5453)`:(this.kind==="worleynoise2d"||this.kind==="worleynoise3d")&&(a=`length(fract(${s}) - vec2(0.5))`,a=`1.0 - clamp(${a} * 2.0, 0.0, 1.0)`),this.kind==="heighttonormal"?(e.lines.push(`vec3 ${t}_n = normalize(vec3(0.0, 0.0, 1.0));`),e.lines.push(`${n} ${t} = ${hh(this.outputType,`${t}_n.z`)};`)):e.lines.push(`${n} ${t} = ${hh(this.outputType,a)};`),e.emitted.set(this.name,t),t}};var xr=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=`bsdf_${this.name}`;return e.lines.push(`vec3 ${i} = (${n}) * (${t}) * (1.0 / 3.14159265);`),e.emitted.set(this.name,i),this.registerClosureContract(e,"diffuse",i,i,"(1.0 / 3.14159265)",this.flagReflect()),i}};var _r=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=this.scalar(e,"roughness","0.0"),s=`bsdf_${this.name}`;return e.lines.push(`float rough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float oren_${this.name} = 1.0 - 0.5 * rough_${this.name};`),e.lines.push(`vec3 ${s} = (${n}) * (${t}) * oren_${this.name} * (1.0 / 3.14159265);`),e.emitted.set(this.name,s),this.registerClosureContract(e,"diffuse",s,s,`oren_${this.name} * (1.0 / 3.14159265)`,this.flagReflect()),s}};var yr=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=this.scalar(e,"roughness","0.5"),s=`bsdf_${this.name}`;return e.lines.push(`float burleyRough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float burleyScale_${this.name} = mix(1.0, 0.8, burleyRough_${this.name});`),e.lines.push(`vec3 ${s} = (${n}) * (${t}) * burleyScale_${this.name} * (1.0 / 3.14159265);`),e.emitted.set(this.name,s),this.registerClosureContract(e,"diffuse",s,s,`burleyScale_${this.name} * (1.0 / 3.14159265)`,this.flagReflect()),s}};var br=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(0.8, 0.2, 0.2)"),i=this.color(e,"radius","vec3(1.0)"),s=this.scalar(e,"anisotropy","0.0"),r=`subsurface_${this.name}`;return e.lines.push(`float subsurfaceWeight_${this.name} = clamp(${t}, 0.0, 1.0);`),e.lines.push(`vec3 subsurfaceColor_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`vec3 subsurfaceRadius_${this.name} = max(${i}, vec3(0.001));`),e.lines.push(`float subsurfaceAniso_${this.name} = clamp(${s}, -0.95, 0.95);`),e.lines.push(`vec3 subsurfaceTransmission_${this.name} = exp(-1.0 / subsurfaceRadius_${this.name});`),e.lines.push(`float subsurfaceDirectional_${this.name} = mix(0.65, 1.35, 0.5 * (subsurfaceAniso_${this.name} + 1.0));`),e.lines.push(`vec3 ${r} = subsurfaceWeight_${this.name} * subsurfaceColor_${this.name} * subsurfaceTransmission_${this.name} * subsurfaceDirectional_${this.name};`),e.lines.push(`float subsurfacePdf_${this.name} = clamp(0.35 + 0.65 * subsurfaceWeight_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 subsurfaceSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"subsurface",r,`subsurfaceSample_${this.name}`,`subsurfacePdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),r}};var vr=class extends ae{outputType="VDF";emitGLSL(e){let t=this.color(e,"absorption","vec3(0.1)"),n=this.color(e,"scattering","vec3(0.0)"),i=this.scalar(e,"anisotropy","0.0"),s=`vdf_${this.name}`;return e.lines.push(`vec3 vdfAbs_${this.name} = max(${t}, vec3(0.0));`),e.lines.push(`vec3 vdfSca_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`float vdfAniso_${this.name} = clamp(${i}, -0.95, 0.95);`),e.lines.push(`float vdfForward_${this.name} = mix(0.35, 1.65, 0.5 * (vdfAniso_${this.name} + 1.0));`),e.lines.push(`vec3 ${s} = (vdfSca_${this.name} + exp(-vdfAbs_${this.name})) * vdfForward_${this.name};`),e.lines.push(`float vdfPdf_${this.name} = clamp(0.2 + 0.8 * (1.0 - abs(vdfAniso_${this.name})), 1e-4, 1.0);`),e.lines.push(`vec3 vdfSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`),e.emitted.set(this.name,s),this.registerClosureContract(e,"volume",s,`vdfSample_${this.name}`,`vdfPdf_${this.name}`,this.flagTransmit()),s}};var Tr=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"reflectivity","vec3(1.0)"),i=this.color(e,"edge_color",n),s=this.scalar(e,"roughness","0.15"),r=`bsdf_${this.name}`;return e.lines.push(`vec3 condF0_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`vec3 condF90_${this.name} = max(${i}, vec3(0.0));`),e.lines.push(`vec3 ${r} = mix(condF0_${this.name}, condF90_${this.name}, 0.25) * (${t});`),e.lines.push(`float condAlpha_${this.name} = max((${s}) * (${s}), 0.001);`),e.lines.push(`float condPdf_${this.name} = 1.0 / (1.0 + 8.0 * condAlpha_${this.name});`),e.lines.push(`vec3 condSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"conductor",r,`condSample_${this.name}`,`condPdf_${this.name}`,this.flagReflect()),r}};var Mr=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"ior","vec3(1.5)"),i=this.color(e,"extinction","vec3(1.0)"),s=this.scalar(e,"roughness","0.35"),r=`bsdf_${this.name}`;return e.lines.push(`vec3 condEta_${this.name} = max(${n}, vec3(0.001));`),e.lines.push(`vec3 condK_${this.name} = max(${i}, vec3(0.0));`),e.lines.push(`vec3 condApprox_${this.name} = condK_${this.name} / (condEta_${this.name} + condK_${this.name} + vec3(1.0));`),e.lines.push(`vec3 ${r} = condApprox_${this.name} * (${t});`),e.lines.push(`float condAlpha_${this.name} = max((${s}) * (${s}), 0.001);`),e.lines.push(`float condPdf_${this.name} = 1.0 / (1.0 + 6.0 * condAlpha_${this.name});`),e.lines.push(`vec3 condSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"conductor",r,`condSample_${this.name}`,`condPdf_${this.name}`,this.flagReflect()),r}};var Sr=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=this.color(e,"base","vec3(0.0)"),r=`bsdf_${this.name}`;return e.lines.push(`float dielIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float dielF0_${this.name} = pow((dielIor_${this.name} - 1.0) / (dielIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 dielSpec_${this.name} = (${n}) * dielF0_${this.name};`),e.lines.push(`vec3 ${r} = mix(${s}, dielSpec_${this.name}, clamp(${t}, 0.0, 1.0));`),e.lines.push(`float dielPdf_${this.name} = clamp(dielF0_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 dielSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"dielectric",r,`dielSample_${this.name}`,`dielPdf_${this.name}`,this.flagReflect()),r}};var wr=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=this.color(e,"base","vec3(0.0)"),r=`bsdf_${this.name}`;return e.lines.push(`float dielIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float dielF0_${this.name} = pow((dielIor_${this.name} - 1.0) / (dielIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 dielR_${this.name} = (${n}) * dielF0_${this.name};`),e.lines.push(`vec3 dielT_${this.name} = (${n}) * (1.0 - dielF0_${this.name});`),e.lines.push(`vec3 dielMix_${this.name} = dielR_${this.name} + 0.5 * dielT_${this.name};`),e.lines.push(`vec3 ${r} = mix(${s}, dielMix_${this.name}, clamp(${t}, 0.0, 1.0));`),e.lines.push(`float dielPdf_${this.name} = clamp(0.5 * (dielF0_${this.name} + (1.0 - dielF0_${this.name})), 1e-4, 1.0);`),e.lines.push(`vec3 dielSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"dielectric",r,`dielSample_${this.name}`,`dielPdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),r}};var Er=class extends ae{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=`bsdf_${this.name}`;return e.lines.push(`float btdfIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float btdfF0_${this.name} = pow((btdfIor_${this.name} - 1.0) / (btdfIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 ${s} = (${n}) * (1.0 - btdfF0_${this.name}) * clamp(${t}, 0.0, 1.0);`),e.lines.push(`float btdfPdf_${this.name} = clamp(1.0 - btdfF0_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 btdfSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`),e.emitted.set(this.name,s),this.registerClosureContract(e,"transmission",s,`btdfSample_${this.name}`,`btdfPdf_${this.name}`,this.flagTransmit()),s}};var Ar=class extends L{outputType="EDF";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("color0")?this.resolveGLSL("color0",e):"vec3(1.0)",n=this.inputs.has("color90")?this.resolveGLSL("color90",e):"vec3(1.0)",i=this.inputs.has("exponent")?this.resolveGLSL("exponent",e):"5.0",s=this.inputs.has("base")?this.resolveGLSL("base",e):"vec3(0.0)",r=`edf_${this.name}`;return e.lines.push(`float schlickW_${this.name} = clamp(1.0 / (1.0 + max(${i}, 0.0)), 0.0, 1.0);`),e.lines.push(`vec3 schlickColor_${this.name} = mix(${t}, ${n}, schlickW_${this.name});`),e.lines.push(`vec3 ${r} = max(${s}, vec3(0.0)) * schlickColor_${this.name};`),e.lines.push(`vec3 schlickSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.lines.push(`float schlickPdf_${this.name} = clamp(0.5 + 0.5 * schlickW_${this.name}, 1e-4, 1.0);`),e.emitted.set(this.name,r),e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"edf",evalExpr:r,sampleExpr:`schlickSample_${this.name}`,pdfExpr:`schlickPdf_${this.name}`,flagsExpr:"4"}),r}};var Rr=class extends ae{emitGLSL(e){let t=this.color(e,"top","vec3(0.0)"),n=this.color(e,"base","vec3(0.0)"),i=`bsdf_${this.name}`;e.lines.push(`float topEnergy_${this.name} = clamp(max(max(${t}.r, ${t}.g), ${t}.b), 0.0, 1.0);`),e.lines.push(`vec3 ${i} = ${t} + (1.0 - topEnergy_${this.name}) * ${n};`),e.emitted.set(this.name,i);let s=this.inputs.get("top"),r=this.inputs.get("base"),o=s?.kind==="connection"?e.closureContracts?.get(s.sourceName):void 0,a=r?.kind==="connection"?e.closureContracts?.get(r.sourceName):void 0,c=o?.pdfExpr??"1.0",u=a?.pdfExpr??"1.0",h=o?.flagsExpr??this.flagReflect(),d=a?.flagsExpr??this.flagReflect();return this.registerClosureContract(e,"layered",i,i,`mix((${u}), (${c}), topEnergy_${this.name})`,`((${h}) | (${d}))`),i}};var Cr=class extends ae{emitGLSL(e){let t=this.color(e,"top","vec3(0.0)"),n=this.color(e,"base","vec3(0.0)"),i=this.scalar(e,"scale_top","1.0"),s=this.scalar(e,"scale_base","1.0"),r=this.scalar(e,"scale_layer","1.0"),o=`bsdf_${this.name}`;e.lines.push(`vec3 topScaled_${this.name} = (${t}) * (${i});`),e.lines.push(`vec3 baseScaled_${this.name} = (${n}) * (${s});`),e.lines.push(`float topEnergy_${this.name} = clamp(max(max(topScaled_${this.name}.r, topScaled_${this.name}.g), topScaled_${this.name}.b), 0.0, 1.0);`),e.lines.push(`vec3 layerCombined_${this.name} = topScaled_${this.name} + (1.0 - topEnergy_${this.name}) * baseScaled_${this.name};`),e.lines.push(`vec3 ${o} = layerCombined_${this.name} * (${r});`),e.emitted.set(this.name,o);let a=this.inputs.get("top"),c=this.inputs.get("base"),u=a?.kind==="connection"?a.sourceName:null,h=c?.kind==="connection"?c.sourceName:null,d=u?e.closureContracts?.get(u):void 0,f=h?e.closureContracts?.get(h):void 0,m=d&&f?`(${d.flagsExpr} | ${f.flagsExpr})`:d?.flagsExpr??f?.flagsExpr??this.flagReflect(),g=d&&f?`mix((${f.pdfExpr}), (${d.pdfExpr}), topEnergy_${this.name})`:d?.pdfExpr??f?.pdfExpr??"1.0";return this.registerClosureContract(e,"layered",o,o,g,m),o}};function O(l){return(e,t)=>new l(e).parse(t)}function Oi(l=[]){return new Map([["constant",O(As)],["dot",O(Rs)],["add",(e,t)=>new ft(e,"+").parse(t)],["subtract",(e,t)=>new ft(e,"-").parse(t)],["multiply",O(bn)],["divide",(e,t)=>new ft(e,"/").parse(t)],["min",(e,t)=>new ft(e,"min","function").parse(t)],["max",(e,t)=>new ft(e,"max","function").parse(t)],["modulo",(e,t)=>new ft(e,"mod","function").parse(t)],["power",(e,t)=>new ft(e,"pow","function").parse(t)],["safepower",O(Ps)],["clamp",O(Es)],["atan2",O(ws)],["absval",(e,t)=>new we(e,"abs").parse(t)],["sign",(e,t)=>new we(e,"sign").parse(t)],["sin",(e,t)=>new we(e,"sin").parse(t)],["cos",(e,t)=>new we(e,"cos").parse(t)],["tan",(e,t)=>new we(e,"tan").parse(t)],["asin",(e,t)=>new we(e,"asin").parse(t)],["acos",(e,t)=>new we(e,"acos").parse(t)],["sqrt",(e,t)=>new we(e,"sqrt").parse(t)],["exp",(e,t)=>new we(e,"exp").parse(t)],["ln",(e,t)=>new we(e,"log").parse(t)],["floor",(e,t)=>new we(e,"floor").parse(t)],["ceil",(e,t)=>new we(e,"ceil").parse(t)],["round",(e,t)=>new we(e,"round").parse(t)],["fract",(e,t)=>new we(e,"fract").parse(t)],["combine",(e,t)=>new yn(e,3).parse(t)],["combine2",(e,t)=>new yn(e,2).parse(t)],["combine3",(e,t)=>new yn(e,3).parse(t)],["combine4",(e,t)=>new yn(e,4).parse(t)],["separate",(e,t)=>new Zt(e,4).parse(t)],["separate2",(e,t)=>new Zt(e,2).parse(t)],["separate3",(e,t)=>new Zt(e,3).parse(t)],["separate4",(e,t)=>new Zt(e,4).parse(t)],["extract",O(Cs)],["swizzle",O(Ds)],["luminance",O(Is)],["rgbtohsv",O(Bs)],["hsvtorgb",O(Us)],["normalize",O(Os)],["dotproduct",O(Gs)],["crossproduct",O(zs)],["reflect",O(ks)],["magnitude",O(Vs)],["facingratio",O(Hs)],["compare",O($s)],["ifequal",O(Ws)],["ifgreater",O(Xs)],["ifgreatereq",O(Ys)],["switch",O(qs)],["and",O(js)],["or",O(Ks)],["not",O(Js)],["xor",O(Zs)],["remap",O(Qs)],["smoothstep",O(er)],["contrast",O(tr)],["invert",O(nr)],["mix",O(ir)],["diffuse_brdf",O(xr)],["oren_nayar_diffuse_bsdf",O(_r)],["burley_diffuse_bsdf",O(yr)],["subsurface_bsdf",O(br)],["conductor_brdf",O(Tr)],["conductor_bsdf",O(Mr)],["dielectric_brdf",O(Sr)],["dielectric_bsdf",O(wr)],["dielectric_btdf",O(Er)],["anisotropic_vdf",O(vr)],["generalized_schlick_edf",O(Ar)],["uniform_edf",O(vn)],["layer",O(Rr)],["scaled_layer",O(Cr)],["blackbody",O(sr)],["chiang_hair_bsdf",O(rr)],["chiang_hair_absorption_from_color",O(ar)],["chiang_hair_roughness",O(or)],["deon_hair_absorption_from_melanin",O(ur)],["surface",O(dr)],["gltf_colorimage",(e,t)=>new Fe(e,"color4").parse(t)],["color4split",(e,t)=>new Zt(e,4).parse(t)],["flake2d",(e,t)=>new me(e,"noise2d").parse(t)],["flake3d",(e,t)=>new me(e,"noise3d").parse(t)],["upstream_graph_def",(e,t)=>new me(e,"noise2d").parse(t)],["customtype",(e,t)=>new me(e,"noise2d").parse(t)],["triplanarprojection",(e,t)=>new Fe(e,"color3").parse(t)],["hextiledimage",(e,t)=>new Fe(e,"color3").parse(t)],["hextilednormalmap",(e,t)=>new Fe(e,"vector3").parse(t)],["generalized_schlick_brdf",(e,t)=>new ve(e,"generic","reflect").parse(t)],["generalized_schlick_bsdf",(e,t)=>new ve(e,"generic","both").parse(t)],["sheen_bsdf",(e,t)=>new ve(e,"generic","reflect").parse(t)],["translucent_bsdf",(e,t)=>new ve(e,"generic","both").parse(t)],["lamaconductor",(e,t)=>new ve(e,"conductor","reflect").parse(t)],["lamadielectric",(e,t)=>new ve(e,"dielectric","both").parse(t)],["lamadiffuse",(e,t)=>new ve(e,"diffuse","reflect").parse(t)],["lamageneralizedschlick",(e,t)=>new ve(e,"generic","reflect").parse(t)],["lamairidescence",(e,t)=>new ve(e,"generic","reflect").parse(t)],["lamalayer",(e,t)=>new ve(e,"composed","both").parse(t)],["lamamix",(e,t)=>new ve(e,"composed","both").parse(t)],["lamaadd",(e,t)=>new ve(e,"composed","both").parse(t)],["lamasss",(e,t)=>new ve(e,"subsurface","both").parse(t)],["lamasheen",(e,t)=>new ve(e,"generic","reflect").parse(t)],["lamatranslucent",(e,t)=>new ve(e,"generic","both").parse(t)],["lamaemission",(e,t)=>new ve(e,"edf","emissive").parse(t)],["roughness_anisotropy",O(lr)],["roughness_dual",O(cr)],["artistic_ior",O(hr)],["place2d",O(Hn)],["rotate2d",O($n)],["rotate3d",O(fr)],["transformpoint",O(pr)],["transformvector",O(mr)],["transformnormal",O(gr)],["heighttonormal",(e,t)=>new me(e,"heighttonormal").parse(t)],["noise2d",(e,t)=>new me(e,"noise2d").parse(t)],["noise3d",(e,t)=>new me(e,"noise3d").parse(t)],["fractal2d",(e,t)=>new me(e,"fractal2d").parse(t)],["fractal3d",(e,t)=>new me(e,"fractal3d").parse(t)],["cellnoise2d",(e,t)=>new me(e,"cellnoise2d").parse(t)],["cellnoise3d",(e,t)=>new me(e,"cellnoise3d").parse(t)],["worleynoise2d",(e,t)=>new me(e,"worleynoise2d").parse(t)],["worleynoise3d",(e,t)=>new me(e,"worleynoise3d").parse(t)],["checker",(e,t)=>new me(e,"checker").parse(t)],["grid",(e,t)=>new me(e,"grid").parse(t)],["circle",(e,t)=>new me(e,"circle").parse(t)],["line",(e,t)=>new me(e,"line").parse(t)],["trianglewave",(e,t)=>new me(e,"trianglewave").parse(t)],...l])}var wn=class{graphName;nodes=new Map;constructor(e){this.graphName=e}getNode(e){return this.nodes.get(e)}allNodes(){return this.nodes}static _resolvePath(e,t){if(!t)return e;let n=(t+e).split("/"),i=[];for(let s of n)s===".."?i.pop():s!=="."&&i.push(s);return i.join("/")}_topoSort(e){let t=[],n=new Set,i=s=>{if(n.has(s))return;n.add(s);let r=this.nodes.get(s);if(r){for(let o of r.getDependencies())i(o);t.push(r)}};return i(e),t}_findNodeOfType(e,t){let n=this.nodes.get(e),i=new Set;for(;n;){if(n instanceof t)return n;if(i.has(n.name))break;i.add(n.name);let s=n.getDependencies();n=s.length>0?this.nodes.get(s[0]):void 0}return null}static _parseNodes(e,t,n){for(let i of Array.from(e.children)){let s=i.tagName.toLowerCase();if(s==="output")continue;let r=t.get(s),o=i.getAttribute("name");!r||!o||n.set(o,r(o,i))}}static _readOutputMap(e){let t=new Map;for(let n of Array.from(e.children)){if(n.tagName.toLowerCase()!=="output")continue;let i=n.getAttribute("name")??"",s=n.getAttribute("nodename")??"",r=n.getAttribute("type")??"";i&&s&&t.set(i,{nodename:s,type:r})}return t}};var to=class l extends wn{outputNodeName="";static NODE_REGISTRY=Oi([["viewdirection",O(Fs)],["latlongimage",O(Fi)],["multiply",O(bn)]]);constructor(e){super(e)}static parse(e){let t=e.getAttribute("name")??"envMap",n=new l(t);l._parseNodes(e,l.NODE_REGISTRY,n.nodes);let i=e.querySelector("output");return n.outputNodeName=i?.getAttribute("nodename")??"",n}extractConfig(e=""){let t="",n=0,i=1;for(let s of this.nodes.values())s instanceof Fi?(t=l._resolvePath(s.hdrFile,e),n=s.rotation):s instanceof bn&&(i=s.in2Literal??1);return{hdrPath:t,rotation:n,intensity:i}}emitGLSL(e="envMapTex"){if(!this.outputNodeName)return"";let t=this._topoSort(this.outputNodeName),n={emitted:new Map,lines:[],envTexUniform:e,preferEnvMapIntensityLiterals:!0},i="";for(let o of t)i=o.emitGLSL(n);let s=`EvalEnvGraph_${this.graphName}`,r=n.lines.map(o=>`    ${o}`).join(`
`);return[`vec3 ${s}(Ray r, sampler2D ${e}) {`,r,`    return ${i};`,"}"].join(`
`)}};var no=class l extends wn{outputNodeName="";static NODE_REGISTRY=Oi([["uniform_edf",O(vn)],["light",O(Ui)]]);constructor(e){super(e)}static parse(e){let t=e.getAttribute("name")??"lightGraph",n=new l(t);l._parseNodes(e,l.NODE_REGISTRY,n.nodes);let i=e.querySelector("output");return n.outputNodeName=i?.getAttribute("nodename")??"",n}extractConfig(e=new Map){let t=[1,1,1],n=1;for(let i of this.nodes.values())i instanceof vn?t=i.resolveColor(e):i instanceof Ui&&(n=i.resolveIntensity(e));return{color:t,intensity:n}}emitGLSL(e=new Map){if(!this.outputNodeName)return"";let t=this._topoSort(this.outputNodeName),n={emitted:new Map,lines:[],envTexUniform:"",ifaceValues:e},i="";for(let o of t)i=o.emitGLSL(n);let s=`EvalLightGraph_${this.graphName}`,r=n.lines.map(o=>`    ${o}`).join(`
`);return[`vec3 ${s}() {`,r,`    return ${i};`,"}"].join(`
`)}};var Ir=class l extends wn{outputMap=new Map;static NODE_REGISTRY=Oi([["texcoord",O(Ns)],["transformmatrix",O(Bi)],["place2d",O(Hn)],["rotate2d",O($n)],["normalmap",O(Ls)],["image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Fe(e,n).parse(t)}],["tiledimage",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Fe(e,n).parse(t)}],["gltf_image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Fe(e,n).parse(t)}],["token_image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Fe(e,n).parse(t)}],["usduvtexture",(e,t)=>{let n=(t.getAttribute("type")??"color3").toLowerCase()==="multioutput"?"color3":t.getAttribute("type")??"color3";return new Fe(e,n).parse(t)}]]);constructor(e){super(e)}static parse(e){let t=e.getAttribute("name")??"surfaceGraph",n=new l(t);l._parseNodes(e,l.NODE_REGISTRY,n.nodes);for(let[i,s]of l._readOutputMap(e))n.outputMap.set(i,s);return n}allOutputs(){return this.outputMap}extractConfig(e=""){let t=new Map;for(let[n,i]of this.outputMap){let s=this._findNodeOfType(i.nodename,Fe);s&&t.set(n,{filePath:l._resolvePath(s.filePath,e),colorspace:s.colorspace,uvScale:this._findUvScale(s)})}return{outputs:t}}emitPathtracerGLSL(e){let t=[];for(let[n,i]of this.outputMap){if(e&&!e.has(n))continue;let s=this._topoSort(i.nodename),r={emitted:new Map,lines:[],envTexUniform:"",texCoordExpr:"uv",textureArrayUniform:"textureMapsArrayTex",textureLayerExpr:"texLayer",warnings:[]},o="";for(let h of s)o=h.emitGLSL(r);let a=this._outputTypeToGlsl(i.type||this.getNode(i.nodename)?.outputType||"color3"),c=this.outputFunctionName(n),u=r.lines.map(h=>`    ${h}`).join(`
`);if(t.push({outputName:n,functionName:c,glslType:a,closureContract:r.closureContracts?.has(i.nodename)?{outputName:n,kind:r.closureContracts.get(i.nodename).kind,evalExpr:r.closureContracts.get(i.nodename).evalExpr,sampleExpr:r.closureContracts.get(i.nodename).sampleExpr,pdfExpr:r.closureContracts.get(i.nodename).pdfExpr,flagsExpr:r.closureContracts.get(i.nodename).flagsExpr}:void 0,code:[`${a} ${c}(vec2 uv, int texLayer) {`,u,`    return ${o};`,"}"].join(`
`)}),r.warnings&&r.warnings.length>0)for(let h of r.warnings)console.warn(`[MtlxSurfaceNodeGraph:${this.graphName}:${n}] ${h}`)}return t}outputFunctionName(e){let t=this.graphName.replace(/[^A-Za-z0-9_]/g,"_"),n=e.replace(/[^A-Za-z0-9_]/g,"_");return`EvalSurfaceGraph_${t}_${n}`}getOutputClosureContract(e){let t=e?this.outputMap.get(e):this.outputMap.values().next().value;if(!t)return null;let n=this._topoSort(t.nodename),i={emitted:new Map,lines:[],envTexUniform:"",texCoordExpr:"uv",textureArrayUniform:"textureMapsArrayTex",textureLayerExpr:"texLayer",warnings:[]};for(let r of n)r.emitGLSL(i);let s=i.closureContracts?.get(t.nodename);return s?{outputName:e??[...this.outputMap.keys()][0],kind:s.kind,evalExpr:s.evalExpr,sampleExpr:s.sampleExpr,pdfExpr:s.pdfExpr,flagsExpr:s.flagsExpr}:null}_findUvScale(e){for(let t of e.getDependencies()){let n=this.nodes.get(t);if(n instanceof Bi)return n.uvScale}return[1,1]}_outputTypeToGlsl(e){switch((e||"").toLowerCase()){case"float":case"integer":case"boolean":return"float";case"vector2":case"color2":return"vec2";case"vector4":case"color4":return"vec4";case"matrix33":return"mat3";case"matrix44":return"mat4";default:return"vec3"}}};var dh={base_color:"baseColorTexID",baseColor:"baseColorTexID",coat_color:"baseColorTexID",specular_roughness:"metallicRoughnessTexID",roughness:"metallicRoughnessTexID",metalness:"metallicRoughnessTexID",metallic:"metallicRoughnessTexID",coat_roughness:"metallicRoughnessTexID",normal:"normalmapTexID",geometry_normal:"normalmapTexID",emission_color:"emissionmapTexID",emissive:"emissionmapTexID",emissiveColor:"emissionmapTexID",diffuseColor:"baseColorTexID"},zm=new Set(["image","tiledimage","hextiledimage","gltf_image","gltf_colorimage","gltf_normalmap","token_image","usduvtexture","hextilednormalmap","triplanarprojection"]);function km(l){let e=l||"",t=0;return e.includes("1")&&(t|=1),e.includes("2")&&(t|=2),e.includes("4")&&(t|=4),t}function Vm(l){switch(l){case"diffuse":return"diffuse";case"conductor":return"conductor";case"dielectric":case"transmission":return"dielectric";case"subsurface":return"subsurface";case"volume":return"volume";case"hair":return"hair";default:return"generic"}}var ke=class l{static REGISTRY=[{tag:"simple_hair",parse:e=>Ss.parse(e)},{tag:"standard_surface",parse:e=>Pi.parse(e)},{tag:"open_pbr_surface",parse:e=>Kt.parse(e)},{tag:"disney_principled",parse:e=>Za.parse(e)},{tag:"gltf_pbr",parse:e=>Ja.parse(e)},{tag:"UsdPreviewSurface",parse:e=>Qa.parse(e)}];static _dirOf(e){return e.substring(0,e.lastIndexOf("/")+1)}static async _fetchText(e){let t=await ue(e);if(!t.ok)throw new Error(`[MtlxLoader] ${t.statusText??"Read error"} fetching ${e}`);return t.text()}static _resolvePrefix(e,t){let n=l.normalizePath(e+t);return n.endsWith("/")?n:n+"/"}static _findSurfaceEl(e,t){let n=t?`[name="${t}"]`:"";for(let i of l.REGISTRY){let s=e.querySelector(i.tag+n);if(s)return s}return null}static _parseSurface(e,t){let n=t?`[name="${t}"]`:"";for(let i of l.REGISTRY){let s=e.querySelector(i.tag+n);if(s)return i.parse(s)}return null}static _parseVec3(e){if(!e)return null;let t=e.split(",").map(n=>parseFloat(n.trim()));return t.length<3||t.some(isNaN)?null:new _(t[0],t[1],t[2])}static parse(e){let t=new DOMParser().parseFromString(e,"text/xml");return l.parseFromDoc(t)}static parseFromDoc(e,t){let n=t?e.querySelector(`surfacematerial[name="${t}"]`)??e.querySelector("surfacematerial"):e.querySelector("surfacematerial"),i=n?.getAttribute("name")??"Unknown",s=null;if(n&&t&&(s=n.querySelector('input[name="surfaceshader"]')?.getAttribute("nodename")??null),s){let c=l._parseSurface(e,s);if(c)return c}let r=l._parseSurface(e);if(r)return r;let o=l.parseNodeDefs(e);if(o.byNodeName.size>0&&o.implByDefName.size>0){if(s)for(let[c,u]of o.byNodeName){let h=e.querySelector(`${c}[name="${s}"]`);if(!h)continue;let d=o.implByDefName.get(u.defName);if(!d)continue;let f=l._buildIfaceValues(h,u),m=l._resolveNodeDefImpl(d,f,i);if(m)return m}for(let[c,u]of o.byNodeName){let h=e.querySelector(c);if(!h)continue;let d=o.implByDefName.get(u.defName);if(!d)continue;let f=l._buildIfaceValues(h,u),m=l._resolveNodeDefImpl(d,f,i);if(m)return m}for(let[c,u]of o.implByDefName){let h=o.byDefName.get(c);if(!h)continue;let d=l._buildIfaceValues(null,h),f=l._resolveNodeDefImpl(u,d,i);if(f)return f}}let a=l._parseChiangHairSurfaceGraph(e,t);if(a)return a;throw new Error("No supported surface shader found in document.")}static normalizePath(e){let t=e.split("/"),n=[];for(let i of t)i===".."?n.pop():i!=="."&&n.push(i);return n.join("/")}static _directInputs(e){return Array.from(e.children).filter(t=>t.tagName.toLowerCase()==="input")}static _directOutputs(e){return Array.from(e.children).filter(t=>t.tagName.toLowerCase()==="output")}static _findDirectInput(e,t){return l._directInputs(e).find(n=>n.getAttribute("name")===t)??null}static _findDirectOutput(e,t){let n=l._directOutputs(e);return n.length===0?null:t?n.find(i=>i.getAttribute("name")===t)??n[0]:n[0]}static _findNamedChild(e,t){if(!t)return null;for(let n of Array.from(e.children))if(n.getAttribute("name")===t)return n;return null}static _parseVec3LooseValue(e){if(!e)return null;let t=e.replace(/\s+/g,",").replace(/,+/g,",").split(",").map(n=>Number.parseFloat(n.trim()));return t.length<3||t.some(n=>!Number.isFinite(n))?null:new _(t[0],t[1],t[2])}static _parseVec2LooseValue(e){if(!e)return null;let t=e.replace(/\s+/g,",").replace(/,+/g,",").split(",").map(n=>Number.parseFloat(n.trim()));return t.length<2||t.some(n=>!Number.isFinite(n))?null:[t[0],t[1]]}static _literalFloatInput(e,t){let n=l._findDirectInput(e,t);if(!n)return null;let i=Number.parseFloat(n.getAttribute("value")??"");return Number.isFinite(i)?i:null}static _literalVec3Input(e,t){return l._parseVec3LooseValue(l._findDirectInput(e,t)?.getAttribute("value"))}static _literalVec2Input(e,t){return l._parseVec2LooseValue(l._findDirectInput(e,t)?.getAttribute("value"))}static _populateSimpleHairAbsorption(e,t,n){let i=l._findDirectInput(n,"absorption_coefficient");if(!i)return;let s=l._parseVec3LooseValue(i.getAttribute("value"));if(s){e.explicitAbsorptionCoefficient=s;return}let r=l._findNamedChild(t,i.getAttribute("nodename"));if(!r)return;let o=r.tagName.toLowerCase();if(o==="mix"){let a=l._literalFloatInput(r,"mix");a!==null&&(e.melaninMix=Math.min(Math.max(a,0),1));let c=l._findNamedChild(t,l._findDirectInput(r,"fg")?.getAttribute("nodename"));if(c?.tagName.toLowerCase()==="deon_hair_absorption_from_melanin"){let h=l._literalFloatInput(c,"melanin_concentration"),d=l._literalFloatInput(c,"melanin_redness");h!==null&&(e.melaninConcentration=h),d!==null&&(e.melaninRedness=d)}let u=l._findNamedChild(t,l._findDirectInput(r,"bg")?.getAttribute("nodename"));if(u?.tagName.toLowerCase()==="chiang_hair_absorption_from_color"){let h=l._literalVec3Input(u,"color")??l._literalVec3Input(u,"base_color");h&&(e.baseColor=h)}return}if(o==="deon_hair_absorption_from_melanin"){let a=l._literalFloatInput(r,"melanin_concentration"),c=l._literalFloatInput(r,"melanin_redness");e.melaninMix=1,a!==null&&(e.melaninConcentration=a),c!==null&&(e.melaninRedness=c);return}if(o==="chiang_hair_absorption_from_color"){let a=l._literalVec3Input(r,"color")??l._literalVec3Input(r,"base_color");e.melaninMix=0,a&&(e.baseColor=a)}}static _parseChiangHairBsdfNode(e,t,n){if(t.tagName.toLowerCase()!=="chiang_hair_bsdf")return null;let i=new Ss(n||(t.getAttribute("name")??"chiang_hair")),s=l._literalVec3Input(t,"tint_R"),r=l._literalVec3Input(t,"tint_TT"),o=l._literalVec3Input(t,"tint_TRT"),a=l._literalFloatInput(t,"ior"),c=l._literalFloatInput(t,"cuticle_angle"),u=l._literalVec2Input(t,"roughness_R");s&&(i.tint_R=s),r&&(i.tint_TT=r),o&&(i.tint_TRT=o),a!==null&&(i.ior=a),c!==null&&(i.cuticleAngle=c),u&&(i.longitudinalRoughness=u[0],i.azimuthalRoughness=u[1]);let h=l._findDirectInput(t,"roughness_R"),d=l._findNamedChild(e,h?.getAttribute("nodename"));if(d?.tagName.toLowerCase()==="chiang_hair_roughness"){let f=l._literalFloatInput(d,"longitudinal")??l._literalFloatInput(d,"longitudinal_roughness"),m=l._literalFloatInput(d,"azimuthal")??l._literalFloatInput(d,"azimuthal_roughness");f!==null&&(i.longitudinalRoughness=f),m!==null&&(i.azimuthalRoughness=m)}return l._populateSimpleHairAbsorption(i,e,t),i}static _parseChiangHairSurfaceGraph(e,t){let n=t?e.querySelector(`surfacematerial[name="${t}"] input[name="surfaceshader"]`)?.getAttribute("nodename"):null;for(let i of Array.from(e.querySelectorAll("nodegraph"))){let s=l._findDirectOutput(i,"out")??l._findDirectOutput(i);if(!s)continue;let r=(s.getAttribute("type")??"").toLowerCase();if(r&&r!=="surfaceshader")continue;let o=s.getAttribute("nodename");if(n&&o!==n)continue;let a=l._findNamedChild(i,o);if(!a||a.tagName.toLowerCase()!=="surface")continue;let c=l._findDirectInput(a,"bsdf"),u=l._findNamedChild(i,c?.getAttribute("nodename"));if(!u)continue;let h=l._parseChiangHairBsdfNode(i,u,t??o??i.getAttribute("name")??"chiang_hair");if(h)return h}return null}static _parseVec2Value(e,t=[1,1]){if(!e)return t;let n=e.split(",").map(i=>Number.parseFloat(i.trim()));return n.length>=2&&Number.isFinite(n[0])&&Number.isFinite(n[1])?[n[0],n[1]]:n.length>=1&&Number.isFinite(n[0])?[n[0],n[0]]:t}static _mulVec2(e,t){return[e[0]*t[0],e[1]*t[1]]}static _selectPrimaryConnectionInput(e){let t=["in","texcoord","fg","bg","in1","in2"],n=l._directInputs(e);for(let i of t){let s=n.find(r=>r.getAttribute("name")===i);if(s&&(s.getAttribute("nodename")||s.getAttribute("nodegraph")))return s}return n.find(i=>i.getAttribute("nodename")||i.getAttribute("nodegraph"))??null}static _buildGraphContexts(e,t){let n=new Map,i=e.documentElement.getAttribute("fileprefix")??"";for(let s of Array.from(e.querySelectorAll("nodegraph"))){let r=s.getAttribute("name");if(!r)continue;let o=s.getAttribute("fileprefix")??i,a=l._resolvePrefix(t,o),c=new Map;for(let u of Array.from(s.children)){let h=u.tagName.toLowerCase();if(h==="output"||h==="input")continue;let d=u.getAttribute("name");d&&c.set(d,u)}n.set(r,{name:r,prefix:a,nodeMap:c,outputs:l._directOutputs(s)})}return n}static _resolveUvScaleFromInput(e,t,n,i){if(!e)return[1,1];let s=e.getAttribute("nodegraph");if(s)return l._resolveUvScaleFromGraph(s,e.getAttribute("output"),n,i);let r=e.getAttribute("nodename");return r?l._resolveUvScaleFromNode(t,r,n,i):[1,1]}static _resolveUvScaleFromGraph(e,t,n,i){let s=`uv-graph:${e}:${t??""}`;if(i.has(s))return[1,1];i.add(s);let r=n.get(e);if(!r)return[1,1];let o=r.outputs.find(u=>t?u.getAttribute("name")===t:!0)??r.outputs[0]??null;if(!o)return[1,1];let a=o.getAttribute("nodegraph");if(a)return l._resolveUvScaleFromGraph(a,o.getAttribute("output"),n,i);let c=o.getAttribute("nodename");return c?l._resolveUvScaleFromNode(r,c,n,i):[1,1]}static _resolveUvScaleFromNode(e,t,n,i){let s=`uv-node:${e.name}:${t}`;if(i.has(s))return[1,1];i.add(s);let r=e.nodeMap.get(t);if(!r)return[1,1];let o=r.tagName.toLowerCase();if(o==="transformmatrix"){let c=(l._findDirectInput(r,"mat")?.getAttribute("value")??"").split(",").map(d=>Number.parseFloat(d.trim())),u=[Number.isFinite(c[0])?c[0]:1,Number.isFinite(c[4])?c[4]:1],h=l._resolveUvScaleFromInput(l._findDirectInput(r,"in"),e,n,i);return l._mulVec2(h,u)}if(o==="place2d"){let a=l._parseVec2Value(l._findDirectInput(r,"scale")?.getAttribute("value")),c=l._resolveUvScaleFromInput(l._findDirectInput(r,"texcoord")??l._findDirectInput(r,"in"),e,n,i);return l._mulVec2(c,a)}return o==="rotate2d"||o==="rotate3d"||o==="texcoord"?l._resolveUvScaleFromInput(l._findDirectInput(r,"texcoord")??l._findDirectInput(r,"in"),e,n,i):l._resolveUvScaleFromInput(l._selectPrimaryConnectionInput(r),e,n,i)}static _resolvedTextureFromImage(e,t,n){let i=l._findDirectInput(e,"file")??l._findDirectInput(e,"filex")??l._findDirectInput(e,"filey")??l._findDirectInput(e,"filez"),s=i?.getAttribute("value")??"";if(!s)return null;let r=i?.getAttribute("colorspace")??e.getAttribute("colorspace")??"",o=l._findDirectInput(e,"uvtiling"),a=o?.getAttribute("value")?l._parseVec2Value(o.getAttribute("value")):l._resolveUvScaleFromInput(l._findDirectInput(e,"texcoord"),t,n,new Set);return{filename:t.prefix+s,colorspace:r,uvtiling:a}}static _resolveTextureFromGraph(e,t,n,i){let s=`graph:${e}:${t??""}`;if(i.has(s))return null;i.add(s);let r=n.get(e);if(!r)return null;let o=r.outputs.find(u=>t?u.getAttribute("name")===t:!0)??r.outputs[0]??null;if(!o)return null;let a=o.getAttribute("nodegraph");if(a)return l._resolveTextureFromGraph(a,o.getAttribute("output"),n,i);let c=o.getAttribute("nodename");return c?l._resolveTextureFromNode(r,c,n,i):null}static _resolveTextureFromNode(e,t,n,i){let s=`node:${e.name}:${t}`;if(i.has(s))return null;i.add(s);let r=e.nodeMap.get(t);if(!r)return null;if(zm.has(r.tagName.toLowerCase()))return l._resolvedTextureFromImage(r,e,n);let o=l._selectPrimaryConnectionInput(r);if(!o)return null;let a=o.getAttribute("nodegraph");if(a)return l._resolveTextureFromGraph(a,o.getAttribute("output"),n,i);let c=o.getAttribute("nodename");return c?l._resolveTextureFromNode(e,c,n,i):null}static resolveNodeGraphs(e,t){let n=new Map,i=l._buildGraphContexts(e,t);for(let[s,r]of i){let o=new Map;for(let a of r.outputs){let c=a.getAttribute("name");if(!c)continue;let u=l._resolveTextureFromGraph(s,c,i,new Set);u&&o.set(c,u)}n.set(s,o)}return n}static resolveInput(e,t){let n=e.getAttribute("nodegraph"),i=e.getAttribute("output");if(!n)return null;let s=t.get(n);return s?i?s.get(i)??null:s.values().next().value??null:null}static parseNodeDefs(e){let t=new Map,n=new Map,i=new Map;for(let s of Array.from(e.querySelectorAll("nodedef"))){let r=s.getAttribute("name"),o=s.getAttribute("node");if(!r||!o)continue;let a=s.getAttribute("nodegroup")??"",c=new Map,u=new Map;for(let d of Array.from(s.children)){let f=d.tagName.toLowerCase(),m=d.getAttribute("name"),g=d.getAttribute("type")??"";m&&(f==="input"?c.set(m,{name:m,type:g,defaultValue:d.getAttribute("value")??null}):f==="output"&&u.set(m,{name:m,type:g}))}let h={defName:r,nodeName:o,nodeGroup:a,inputs:c,outputs:u};t.set(r,h),n.set(o,h)}for(let s of Array.from(e.querySelectorAll("nodegraph"))){let r=s.getAttribute("nodedef"),o=s.getAttribute("name");!r||!o||i.set(r,{graphName:o,defName:r,element:s})}return{byDefName:t,byNodeName:n,implByDefName:i}}static resolveSurfaceTextures(e,t,n){let i=new Map,s=l.resolveNodeGraphs(e,t),r=null;if(n){let d=e.querySelector(`surfacematerial[name="${n}"]`)?.querySelector('input[name="surfaceshader"]')?.getAttribute("nodename");d&&(r=l._findSurfaceEl(e,d))}if(r||(r=l._findSurfaceEl(e)),!r)return i;let o=e.documentElement.getAttribute("fileprefix")??"",a=l._resolvePrefix(t,o),c=new Map;for(let h of Array.from(e.documentElement.children)){let d=h.getAttribute("name");d&&c.set(d,h)}let u=Array.from(r.querySelectorAll("input"));for(let h of u){let d=h.getAttribute("name")??"",f=dh[d];if(!f||i.has(f))continue;let m=l.resolveInput(h,s);if(!m){let g=h.getAttribute("nodename");if(g&&!h.getAttribute("nodegraph")){let p={name:"__document__",prefix:a,nodeMap:c,outputs:[]};m=l._resolveTextureFromNode(p,g,new Map,new Set)}}m&&i.set(f,m)}return i}static collectSurfaceGraphBindings(e,t){let n=[],i=null;if(t){let c=e.querySelector(`surfacematerial[name="${t}"]`)?.querySelector('input[name="surfaceshader"]')?.getAttribute("nodename");c&&(i=l._findSurfaceEl(e,c))}if(i||(i=l._findSurfaceEl(e)),!i)return n;let s=new Map,r=new Set,o=(a,c)=>{let u=c.replace(/[^A-Za-z0-9_]/g,"_"),h=a.replace(/[^A-Za-z0-9_]/g,"_"),d=`EvalSurfaceDirect_${u}_${h}`;return a==="roughness"||a==="specular_roughness"||a==="coat_roughness"||a==="metalness"||a==="metallic"?{functionName:d,functionCode:[`float ${d}(vec2 uv, int texLayer) {`,"    return texture(textureMapsArrayTex, vec3(uv, float(texLayer))).r;","}"].join(`
`)}:a==="normal"||a==="geometry_normal"?{functionName:d,functionCode:[`vec3 ${d}(vec2 uv, int texLayer) {`,"    return normalize(texture(textureMapsArrayTex, vec3(uv, float(texLayer))).rgb * 2.0 - 1.0);","}"].join(`
`)}:{functionName:d,functionCode:[`vec3 ${d}(vec2 uv, int texLayer) {`,"    return texture(textureMapsArrayTex, vec3(uv, float(texLayer))).rgb;","}"].join(`
`)}};for(let a of Array.from(i.querySelectorAll("input"))){let c=a.getAttribute("name")??"",u=dh[c],h=a.getAttribute("nodegraph");if(!u)continue;if(h){let f=s.get(h);if(!f){let y=e.querySelector(`nodegraph[name="${h}"]`);if(!y)continue;f=Ir.parse(y),s.set(h,f)}let m=a.getAttribute("output")??f.allOutputs().keys().next().value??"";if(!m||!f.allOutputs().has(m))continue;let g=f.outputFunctionName(m),x=f.emitPathtracerGLSL(new Set([m])).find(y=>y.functionName===g)?.code??"";if(!x)continue;r.has(g)||r.add(g),n.push({inputName:c,field:u,source:"nodegraph",graphName:h,outputName:m,graph:f,functionName:g,functionCode:x});continue}let d=a.getAttribute("nodename");if(d){let f=o(c,d);r.has(f.functionName)||r.add(f.functionName),n.push({inputName:c,field:u,source:"nodename",functionName:f.functionName,functionCode:f.functionCode})}}return n}static collectSurfaceGraphClosureBinding(e,t){let n=null;t&&(n=e.querySelector(`surfacematerial[name="${t}"]`)?.querySelector('input[name="surfaceshader"]')?.getAttribute("nodename")??null);for(let i of Array.from(e.querySelectorAll("nodegraph"))){let s=Ir.parse(i);for(let[r,o]of s.allOutputs()){let a=(o.type??"").toLowerCase();if(a&&a!=="surfaceshader"||n&&o.nodename!==n)continue;let c=s.getOutputClosureContract(r);if(!c)continue;let u=Vm(c.kind),h=km(c.flagsExpr);return u==="generic"&&(h&1)!==0&&(h&2)!==0&&(u="hair"),{kind:u,flags:h}}}return null}static _escapeXml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}static _buildIfaceValues(e,t){let n=new Map;for(let[i,s]of t.inputs)s.defaultValue!==null&&n.set(i,s.defaultValue);if(e)for(let i of Array.from(e.children)){if(i.tagName.toLowerCase()!=="input")continue;let s=i.getAttribute("name"),r=i.getAttribute("value");s&&r!==null&&n.set(s,r)}return n}static _buildSyntheticSurface(e,t){let n=e.tagName,i=l._escapeXml(e.getAttribute("name")??"_synth"),s=`<materialx version="1.39"><${n} name="${i}">`;for(let r of Array.from(e.children)){if(r.tagName.toLowerCase()!=="input")continue;let o=r.getAttribute("name")??"";if(!o)continue;let a=r.getAttribute("type")??"",c=r.getAttribute("colorspace")??"",u=r.getAttribute("interfacename"),h=r.getAttribute("value"),d=u!==null?t.get(u)??h:h;d!=null&&(s+=`<input name="${l._escapeXml(o)}"`,s+=` type="${l._escapeXml(a)}"`,s+=` value="${l._escapeXml(d)}"`,c&&(s+=` colorspace="${l._escapeXml(c)}"`),s+="/>")}return s+=`</${n}></materialx>`,new DOMParser().parseFromString(s,"text/xml")}static _resolveNodeDefImpl(e,t,n){let i=e.element,s=null,o=i.querySelector("output")?.getAttribute("nodename")??null;if(o){for(let c of Array.from(i.children))if(c.getAttribute("name")===o){s=c;break}}if(s||(s=l._findSurfaceEl(i)),!s)return null;let a=l._buildSyntheticSurface(s,t);return l._parseSurface(a)}static parseLights(e){let t=[];e.querySelectorAll("directional_light").forEach(i=>{let s=Rt(i,"direction")??new _(0,0,-1),r=Rt(i,"color")??new _(1,1,1),o=be(i,"intensity")??1,a=new ht;a.position=new _(-s.x,-s.y,-s.z),a.emission=new _(r.x*o,r.y*o,r.z*o),a.type=2,a.area=0,t.push(a)}),e.querySelectorAll("point_light").forEach(i=>{let s=Rt(i,"position")??new _(0,0,0),r=Rt(i,"color")??new _(1,1,1),o=be(i,"intensity")??1,a=be(i,"decay_rate")??2,c=new ht;c.position=s,c.emission=new _(r.x*o,r.y*o,r.z*o),c.type=3,c.radius=a,c.area=0,t.push(c)}),e.querySelectorAll("spot_light").forEach(i=>{let s=Rt(i,"position")??new _(0,0,0),r=Rt(i,"direction")??new _(0,0,-1),o=Rt(i,"color")??new _(1,1,1),a=be(i,"intensity")??1,c=be(i,"decay_rate")??2,u=be(i,"inner_angle")??.9,h=be(i,"outer_angle")??.7,d=Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)||1,f=new ht;f.position=s,f.emission=new _(o.x*a,o.y*a,o.z*a),f.u=new _(r.x/d,r.y/d,r.z/d),f.v=new _(u,h,0),f.type=4,f.radius=c,f.area=0,t.push(f)});let n=l.parseNodeDefs(e);for(let[i,s]of n.byDefName){if(!Array.from(s.outputs.values()).some(a=>a.type==="lightshader"))continue;let r=n.implByDefName.get(i);if(!r)continue;let o=no.parse(r.element);for(let a of Array.from(e.querySelectorAll(s.nodeName))){let c=l._buildIfaceValues(a,s),u=o.extractConfig(c),h=new ht,[d,f,m]=u.color;h.emission=new _(d*u.intensity,f*u.intensity,m*u.intensity),h.area=0;let g=l._parseVec3(c.get("position")??""),p=l._parseVec3(c.get("direction")??"");if(g)if(h.position=g,p){let x=Math.sqrt(p.x*p.x+p.y*p.y+p.z*p.z)||1;h.u=new _(p.x/x,p.y/x,p.z/x),h.v=new _(.9,.7,0),h.type=4}else h.type=3;else p?(h.position=new _(-p.x,-p.y,-p.z),h.type=2):(h.position=new _(0,0,0),h.type=3);t.push(h)}}return t}static parseEnvGraph(e,t=""){let i=new DOMParser().parseFromString(e,"text/xml").querySelector("nodegraph");if(!i)throw new Error("[MtlxLoader] No <nodegraph> found in document.");let s=to.parse(i),r=s.extractConfig(t);return{graph:s,config:r,toGLSL:o=>s.emitGLSL(o),applyToScene:async o=>{r.hdrPath&&await o.addEnvMapByUrlAsync(r.hdrPath),o.renderOptions.envMapIntensity=r.intensity,o.renderOptions.envMapRot=r.rotation*360,o.renderOptions.enableEnvMap=!0}}}static async expandXiIncludes(e,t,n=0){if(n>10)return e;let i=/<xi:include\s[^>]*href=["']([^"']+)["'][^>]*\/?>/g,s=[...e.matchAll(i)];if(s.length===0)return e;let r=t.includes("/")?t.substring(0,t.lastIndexOf("/")+1):"";for(let o of s){let a=o[1],c=a.startsWith("http")||a.startsWith("/")?a:l.normalizePath(r+a),u="";try{let h=await l._fetchText(c);u=(await l.expandXiIncludes(h,c,n+1)).replace(/<\?xml[^>]*\?>/g,"").replace(/^\s*<materialx[^>]*>/,"").replace(/<\/materialx>\s*$/,"").trim()}catch(h){console.warn(`[MtlxLoader] xi:include: failed to fetch ${c}:`,h)}e=e.replace(o[0],u)}return e}static async parseFromUrl(e,t){let n=await l._fetchText(e),i=await l.expandXiIncludes(n,e),s=new DOMParser().parseFromString(i,"text/xml");return l.parseFromDoc(s,t)}static async fetchAndExpand(e){let t=await l._fetchText(e),n=await l.expandXiIncludes(t,e),i=new DOMParser().parseFromString(n,"text/xml");return{xml:n,doc:i,mtlxDir:l._dirOf(e)}}static async parseEnvGraphFromUrl(e,t){let n=await l._fetchText(e);return l.parseEnvGraph(n,t??l._dirOf(e))}};var Wn=1,Gi=2,Xn=4;function k(l){return l.substring(l.indexOf(" ")+1).trim()}function fh(l){let e=Math.max(l.emission.x,l.emission.y,l.emission.z)>1e-6,t=Math.min(Math.max(l.metallic,0),1),n=Math.min(Math.max(l.specTrans,0),1),i=Math.min(Math.max(l.specularWeight,0),1),s=Math.min(Math.max(l.baseWeight,0),1);if(l.materialType>=.5)return{kind:"hair",model:0,flags:Wn|Gi|(e?Xn:0)};let r=t>.98&&n<.02&&i<.2,o=t<.02&&n>.95&&s<.2,a=t<.02&&n<.02&&i<.05,c=l.subsurface>.05||l.subsurfaceRadiusScale.x>1.001||l.subsurfaceRadiusScale.y>1.001||l.subsurfaceRadiusScale.z>1.001;if(l.mediumType===2||l.mediumDensity>1e-4||l.mediumAbsorption>1e-4)return{kind:"volume",model:0,flags:Gi|(e?Xn:0)};if(c)return{kind:"subsurface",model:0,flags:Wn|Gi|(e?Xn:0)};if(r)return{kind:"conductor",model:l.roughness<.5?0:1,flags:Wn|(e?Xn:0)};if(o){let d=n,f=d<.2?0:d<.8?1:2,m=f===0?Wn:f===2?Gi:Wn|Gi;return{kind:"dielectric",model:f,flags:m|(e?Xn:0)}}if(a){let d=Math.min(Math.max(l.baseDiffuseRoughness,0),1);return{kind:"diffuse",model:d<.2?0:d<.75?1:2,flags:Wn|(e?Xn:0)}}return{kind:"generic",model:0,flags:Wn|(n>.02?Gi:0)|(e?Xn:0)}}function Hm(l,e){let t=fh(e);return{kind:l.kind,model:t.model,flags:l.flags>0?l.flags:t.flags}}function $m(l,e){let t=[`        case ${l}:`],n="state.texCoord * mat.uvScale";for(let i of e){let s=i.functionName;switch(i.inputName){case"base_color":case"baseColor":case"diffuseColor":t.push(`            if (texIDs.x >= 0) mat.baseColor = clamp(${s}(${n}, texIDs.x), vec3(0.0), vec3(1.0));`);break;case"coat_color":t.push(`            if (texIDs.x >= 0) mat.coatColor = clamp(${s}(${n}, texIDs.x), vec3(0.0), vec3(1.0));`);break;case"emission_color":case"emissive":case"emissiveColor":t.push(`            if (texIDs.w >= 0) mat.emission = max(${s}(${n}, texIDs.w), vec3(0.0));`);break;case"normal":case"geometry_normal":t.push(`            if (texIDs.z >= 0) { vec3 origNormal = state.normal; vec3 proceduralNormal = normalize(${s}(${n}, texIDs.z)); state.normal = normalize(state.tangent * proceduralNormal.x + state.bitangent * proceduralNormal.y + state.normal * proceduralNormal.z); state.ffnormal = dot(origNormal, r.direction) <= 0.0 ? state.normal : -state.normal; }`);break;case"roughness":case"specular_roughness":t.push(`            if (texIDs.y >= 0) mat.roughness = max(clamp(${s}(${n}, texIDs.y), 0.0, 1.0), 0.001);`);break;case"coat_roughness":t.push(`            if (texIDs.y >= 0) mat.clearcoatRoughness = max(clamp(${s}(${n}, texIDs.y), 0.0, 1.0), 0.001);`);break;case"metalness":case"metallic":t.push(`            if (texIDs.y >= 0) mat.metallic = clamp(${s}(${n}, texIDs.y), 0.0, 1.0);`);break}}return t.push("            break;"),t.join(`
`)}function Wm(l,e){let t=[`        case ${l}:`];switch(t.push("            gMaterialXClosureContractValid = 1;"),e.kind){case"diffuse":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_DIFFUSE;");break;case"conductor":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_CONDUCTOR;");break;case"dielectric":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_DIELECTRIC;");break;case"subsurface":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_SUBSURFACE;");break;case"volume":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_VOLUME;");break;case"hair":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_HAIR;");break;default:t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_GENERIC;");break}return t.push(`            gMaterialXClosureModel = ${Math.max(0,e.model)};`),t.push(`            gMaterialXClosureFlags = ${Math.max(0,e.flags)};`),t.push("            break;"),t.join(`
`)}function Xm(l){let e=l.toGLSL("envMapTex"),t=e.match(/vec3\s+(EvalEnvGraph_[A-Za-z0-9_]+)/);if(!t)return"";let n=t[1];return[e,"vec4 EvalEnvMap(Ray r) {",`    vec3 color = ${n}(r, envMapTex);`,"    float theta = acos(clamp(r.direction.y, -1.0, 1.0));","    float safeSum = max(envMapTotalSum, 1e-6);","    float pdf = Luminance(color) / safeSum;","    return vec4(color, (pdf * envMapRes.x * envMapRes.y) / (TWO_PI * PI * max(sin(theta), 1e-6)));","}"].join(`

`)}async function io(l,e,t){let n=await ue(l);if(!n.ok)return console.error(`Couldn't open ${l} for reading`),!1;let i=await n.text(),s=l.substring(0,l.lastIndexOf("/")+1),r=i.split(`
`);console.log("Loading Scene..");let o=new Map,a=[],c=new Map,u=[],h=[];e.materialxEnvStrategy="cpu",e.materialxLightStrategy="cpu",e.proceduralEnvGlsl="";let d=new wt;e.addMaterial(d);let f=0;for(;f<r.length;){let g=r[f].trim();if(g.split(" ")[0]=="#"||g===""){f++;continue}if(g.split(" ")[0]=="materialx_env_strategy"){let p=k(g).toLowerCase();e.materialxEnvStrategy=p==="glsl"?"glsl":"cpu",f++;continue}if(g.split(" ")[0]=="materialx_light_strategy"){let p=k(g).toLowerCase();e.materialxLightStrategy=p==="glsl"?"glsl":"cpu",f++;continue}if(g.split(" ")[0]=="material"){let p=new wt,x=k(g);p.name=x;let y="none",b="none",T="none",M="none",w="none",v="none",S="none",R=!1,D="",I="",B=[],N=null;for(f++;f<r.length;){let A=r[f].trim();if(A.includes("}"))break;if(A.split(" ")[0]=="color"){let[,z,K,de]=A.split(/\s+/);p.baseColor=new _(parseFloat(z),parseFloat(K),parseFloat(de))}if(A.split(" ")[0]=="opacity"&&(p.opacity=parseFloat(k(A))),A.split(" ")[0]=="alphamode"&&(v=k(A)),A.split(" ")[0]=="alphacutoff"&&(p.alphaCutoff=parseFloat(k(A))),A.split(" ")[0]=="emission"){let[,z,K,de]=A.split(/\s+/);p.emission=new _(parseFloat(z),parseFloat(K),parseFloat(de))}if(A.split(" ")[0]=="metallic"&&(p.metallic=parseFloat(k(A))),A.split(" ")[0]=="roughness"&&(p.roughness=parseFloat(k(A))),A.split(" ")[0]=="subsurface"&&(p.subsurface=parseFloat(k(A))),A.split(" ")[0]=="thickness"&&(p.mediumThickness=parseFloat(k(A))),A.split(" ")[0]=="speculartint"&&(p.specularTint=parseFloat(k(A))),A.split(" ")[0]=="anisotropic"&&(p.anisotropic=parseFloat(k(A))),A.split(" ")[0]=="sheen"&&(p.sheen=parseFloat(k(A))),A.split(" ")[0]=="sheentint"&&(p.sheenTint=parseFloat(k(A))),A.split(" ")[0]=="clearcoat"&&(p.clearcoat=parseFloat(k(A))),A.split(" ")[0]=="clearcoatgloss"&&(p.clearcoatGloss=parseFloat(k(A))),A.split(" ")[0]=="spectrans"&&(p.specTrans=parseFloat(k(A))),A.split(" ")[0]=="ior"&&(p.ior=parseFloat(k(A))),A.split(" ")[0]=="transmissioncolor"){let[,z,K,de]=A.split(/\s+/);p.transmissionColor=new _(parseFloat(z),parseFloat(K),parseFloat(de)),R=!0}if(A.split(" ")[0]=="thinwalled"&&(p.thinWalled=parseFloat(k(A))),A.split(" ")[0]=="albedotexture"&&(y=k(A)),A.split(" ")[0]=="metallicroughnesstexture"&&(b=k(A)),A.split(" ")[0]=="normaltexture"&&(T=k(A)),A.split(" ")[0]=="emissiontexture"&&(M=k(A)),A.split(" ")[0]=="mediumtype"&&(S=k(A)),A.split(" ")[0]=="mediumdensity"&&(p.mediumDensity=parseFloat(k(A))),A.split(" ")[0]=="mediumabsorption"&&(p.mediumAbsorption=parseFloat(k(A))),A.split(" ")[0]=="mediumcolor"){let[,z,K,de]=A.split(/\s+/);p.mediumColor=new _(parseFloat(z),parseFloat(K),parseFloat(de))}A.split(" ")[0]=="mediumanisotropy"&&(p.mediumAnisotropy=parseFloat(k(A))),A.split(" ")[0]=="doublesided"&&(p.doubleSided=parseFloat(k(A))),A.split(" ")[0]=="materialx_document"&&(D=k(A)),A.split(" ")[0]=="materialx_surface"&&(I=k(A)),f++}if(D){let C=ke.normalizePath(s+D);try{let A=await ke.fetchAndExpand(C),z=A.doc,K=ke.parseFromDoc(z,I||void 0);Pi.resetMaterial(p),K.toMaterial(p);let de=A.mtlxDir,F=ke.resolveSurfaceTextures(z,de,I||void 0);B=ke.collectSurfaceGraphBindings(z,I||void 0),N=ke.collectSurfaceGraphClosureBinding(z,I||void 0);for(let[U,ne]of F){let Y=await e.addTextureByUrlAsync(ne.filename);Y>=0&&(p[U]=Y,(ne.uvtiling[0]!==1||ne.uvtiling[1]!==1)&&p.uvScale.x===1&&p.uvScale.y===1&&(p.uvScale=new ee(ne.uvtiling[0],ne.uvtiling[1])))}}catch(A){console.warn(`MaterialX document not found or invalid: ${C}`,A)}}if(y&&y!=="none"&&(p.baseColorTexID=await e.addTextureAsync(y)),b&&b!=="none"&&(p.metallicRoughnessTexID=await e.addTextureAsync(b)),T&&T!=="none"&&(p.normalmapTexID=await e.addTextureAsync(T)),M&&M!=="none"&&(p.emissionmapTexID=await e.addTextureAsync(M)),v==="opaque"?p.alphaMode=0:v==="blend"?p.alphaMode=1:v==="mask"&&(p.alphaMode=2),S==="absorb"?p.mediumType=1:S==="scatter"?p.mediumType=2:S==="emissive"&&(p.mediumType=3),p.specTrans>0&&!R&&(p.transmissionColor=p.baseColor.clone()),!o.has(x)){let C=e.addMaterial(p);if(o.set(x,C),D){let A=N?Hm(N,p):fh(p);h.push(Wm(C,A))}if(B.length>0){for(let A of B)c.set(A.functionName,A.functionCode);u.push($m(C,B))}}f++;continue}if(g.split(" ")[0]=="materialx_lights"){let p=k(g),x=ke.normalizePath(s+p);try{let b=(await ke.fetchAndExpand(x)).doc;e.materialxLightStrategy==="glsl"&&console.warn("materialx_light_strategy=glsl requested, but runtime lightshader GLSL is not integrated yet; falling back to CPU parseLights.");let T=ke.parseLights(b);for(let M of T)e.addLight(M);console.log(`MaterialX lights loaded: ${T.length} light(s) from ${x}`)}catch(y){console.warn(`MaterialX lights document not found or invalid: ${x}`,y)}f++;continue}if(g.split(" ")[0]=="materialx_envmap"){let p=k(g),x=ke.normalizePath(s+p);try{let y=await ke.parseEnvGraphFromUrl(x);if(y.config.hdrPath&&await e.addEnvMapByUrlAsync(y.config.hdrPath),t.envMapIntensity=y.config.intensity,t.envMapRot=y.config.rotation*360,t.enableEnvMap=!0,e.materialxEnvStrategy==="glsl"){let b=Xm(y);b.length>0?e.proceduralEnvGlsl=b:(e.proceduralEnvGlsl="",console.warn("materialx_env_strategy=glsl requested, but no runtime GLSL override could be generated; falling back to default EvalEnvMap path."))}else e.proceduralEnvGlsl="";console.log(`MaterialX env map loaded from ${x}`)}catch(y){console.warn(`Failed to load MaterialX env map: ${y}`)}f++;continue}if(g.split(" ")[0]=="light"){let p=new ht,x=new _,y=new _,b="none";for(f++;f<r.length&&!r[f].includes("}");){let T=r[f].trim();if(T.split(" ")[0]=="position"){let[,M,w,v]=T.split(/\s+/);p.position=new _(parseFloat(M),parseFloat(w),parseFloat(v))}if(T.split(" ")[0]=="emission"){let[,M,w,v]=T.split(/\s+/);p.emission=new _(parseFloat(M),parseFloat(w),parseFloat(v))}if(T.split(" ")[0]=="radius"&&(p.radius=parseFloat(k(T))),T.split(" ")[0]=="v1"){let[,M,w,v]=T.split(/\s+/);x=new _(parseFloat(M),parseFloat(w),parseFloat(v))}if(T.split(" ")[0]=="v2"){let[,M,w,v]=T.split(/\s+/);y=new _(parseFloat(M),parseFloat(w),parseFloat(v))}T.split(" ")[0]=="type"&&(b=k(T)),f++}b==="quad"?(p.type=0,p.u=x.subtract(p.position),p.v=y.subtract(p.position),p.area=_.Length(_.cross(p.u,p.v))):b==="sphere"?(p.type=1,p.area=4*Math.PI*p.radius*p.radius):b==="distant"&&(p.type=2,p.area=0),e.addLight(p),f++;continue}if(g.split(" ")[0]=="camera"){let p=new ie,x=new _,y=new _,b=45,T=0,M=1,w=!1;for(f++;f<r.length&&!r[f].includes("}");){let v=r[f].trim();if(v.split(" ")[0]=="position"){let[,S,R,D]=v.split(/\s+/);x=new _(parseFloat(S),parseFloat(R),parseFloat(D))}if(v.split(" ")[0]=="lookat"){let[,S,R,D]=v.split(/\s+/);y=new _(parseFloat(S),parseFloat(R),parseFloat(D))}if(v.split(" ")[0]=="aperture"&&(T=parseFloat(k(v))),v.split(" ")[0]=="focaldist"&&(M=parseFloat(k(v))),v.split(" ")[0]=="fov"&&(b=parseFloat(k(v))),v.split(" ")[0]=="matrix"){let S=v.split(/\s+/).slice(1).map(Number);S.length===16&&S.every(R=>!isNaN(R))&&(p=new ie(S[0],S[4],S[8],S[12],S[1],S[5],S[9],S[13],S[2],S[6],S[10],S[14],S[3],S[7],S[11],S[15]),w=!0)}f++}if(w){let v=new _(p.data[2][0],p.data[2][1],p.data[2][2]);x=new _(p.data[3][0],p.data[3][1],p.data[3][2]),y=x.add(v)}e.addCamera(x,y,b),e.camera.aperture=T,e.camera.focalDist=M,f++;continue}if(g.split(" ")[0]=="renderer"){let N=function(C){if(C==="true")return!0;if(C==="false")return!1};var m=N;let p="none",x="none",y="none",b="none",T="none",M="none",w="none",v="none",S="none",R="none",D="none",I="none",B="none";for(f++;f<r.length&&!r[f].includes("}");){let C=r[f].trim();if(C.split(" ")[0]=="envmapfile"&&(p=k(C)),C.split(" ")[0]=="resolution"){let[,A,z]=C.split(/\s+/);t.renderResolution=new ee(parseInt(A),parseInt(z)),t.originalRenderResolution=t.renderResolution.clone()}if(C.split(" ")[0]=="envmapintensity"&&(t.envMapIntensity=parseFloat(k(C))),C.split(" ")[0]=="maxdepth"&&(t.maxDepth=parseFloat(k(C))),C.split(" ")[0]=="maxspp"&&(t.maxSpp=parseFloat(k(C))),C.split(" ")[0]=="tilewidth"&&(t.tileWidth=parseFloat(k(C))),C.split(" ")[0]=="tileheight"&&(t.tileHeight=parseFloat(k(C))),C.split(" ")[0]=="enablerr"&&(x=k(C)),C.split(" ")[0]=="rrdepth"&&(t.RRDepth=parseFloat(k(C))),C.split(" ")[0]=="enabletonemap"&&(S=k(C)),C.split(" ")[0]=="enableaces"&&(y=k(C)),C.split(" ")[0]=="texarraywidth"&&(t.texArrayWidth=parseFloat(k(C))),C.split(" ")[0]=="texarrayheight"&&(t.texArrayHeight=parseFloat(k(C))),C.split(" ")[0]=="openglnormalmap"&&(b=k(C)),C.split(" ")[0]=="hideemitters"&&(T=k(C)),C.split(" ")[0]=="enablebackground"&&(w=k(C)),C.split(" ")[0]=="transparentbackground"&&(M=k(C)),C.split(" ")[0]=="backgroundcolor"){let[,A,z,K]=C.split(/\s+/);t.backgroundCol=new _(parseFloat(A),parseFloat(z),parseFloat(K))}if(C.split(" ")[0]=="independentrendersize"&&(v=k(C)),C.split(" ")[0]=="envmaprotation"&&(t.envMapRot=parseFloat(k(C))),C.split(" ")[0]=="enableroughnessmollification"&&(R=k(C)),C.split(" ")[0]=="roughnessmollificationamt"&&(t.roughnessMollificationAmt=parseFloat(k(C))),C.split(" ")[0]=="enablevolumemis"&&(D=k(C)),C.split(" ")[0]=="enableuniformlight"&&(I=k(C)),C.split(" ")[0]=="sssmode"&&(B=k(C)),C.split(" ")[0]=="uniformlightcolor"){let[,A,z,K]=C.split(/\s+/);t.uniformLightCol=new _(parseFloat(A),parseFloat(z),parseFloat(K))}f++}p!=="none"?(An.instance.envMapIdx=An.instance.envMaps.findIndex(C=>p.endsWith(C)),await e.addEnvMapAsync(p),t.enableEnvMap=!0):t.enableEnvMap=!1,N(y)!==void 0&&(t.enableAces=N(y)),N(x)!==void 0&&(t.enableRR=N(x)),N(b)!==void 0&&(t.openglNormalMap=N(b)),N(T)!==void 0&&(t.hideEmitters=N(T)),N(w)!==void 0&&(t.enableBackground=N(w)),N(M)!==void 0&&(t.transparentBackground=N(M)),N(v)!==void 0&&(t.independentRenderSize=N(v)),N(S)!==void 0&&(t.enableTonemap=N(S)),N(R)!==void 0&&(t.enableRoughnessMollification=N(R)),N(D)!==void 0&&(t.enableVolumeMIS=N(D)),N(I)!==void 0&&(t.enableUniformLight=N(I)),B==="none"?t.sssMode=0:B==="randomwalk"?t.sssMode=1:B==="dipole"&&(t.sssMode=2),f++;continue}if(g.split(" ")[0]=="mesh"){let p=null,x=new $,y=new ie,b=new ie,T=new ie,M=new ie,w=0,v="none",S=!1;for(f++;f<r.length&&!r[f].includes("}");){let R=r[f].trim(),D=null;if(R.split(" ")[0]=="name"&&(v=R.substring(5).trim()),R.split(" ")[0]=="file"&&(p=k(R)),R.split(" ")[0]=="material"&&(D=k(R),o.has(D)?w=o.get(D):console.error(`Could not find material ${D}`)),R.split(" ")[0]=="matrix"){let I=R.split(/\s+/).slice(1).map(Number);I.length===16&&I.every(B=>!isNaN(B))&&(y=new ie(I[0],I[4],I[8],I[12],I[1],I[5],I[9],I[13],I[2],I[6],I[10],I[14],I[3],I[7],I[11],I[15]),S=!0)}if(R.split(" ")[0]=="position"){let[,I,B,N]=R.split(/\s+/);b=ie.Translate(new _(parseFloat(I),parseFloat(B),parseFloat(N)))}if(R.split(" ")[0]=="scale"){let[,I,B,N]=R.split(/\s+/);M=ie.Scale(new _(parseFloat(I),parseFloat(B),parseFloat(N)))}if(R.split(" ")[0]=="rotation"){let[,I,B,N,C]=R.split(/\s+/);x=new $(parseFloat(I),parseFloat(B),parseFloat(N),parseFloat(C)),T=ie.QuatToMatrix(x.x,x.y,x.z,x.w)}f++}if(p){let R=await e.addMeshAsync(p);if(R!==-1){let D;if(v&&v!=="none")D=v;else{let N=Math.max(p.lastIndexOf("/"),p.lastIndexOf("\\"));D=p.substring(N+1)}let I;S?I=y:I=M.multiply(T).multiply(b);let B=new mn(D,R,I,w);e.addMeshInstance(B)}}f++;continue}if(g.split(" ")[0]=="gltf"){let p=null,x=new $,y=new ie,b=new _,T=new ie,M=new _(1,1,1),w=!1;for(f++;f<r.length&&!r[f].includes("}");){let v=r[f].trim();if(v.split(" ")[0]=="file"&&(p=k(v)),v.split(" ")[0]=="matrix"){let S=v.split(/\s+/).slice(1).map(Number);S.length===16&&S.every(R=>!isNaN(R))&&(y=new ie(S[0],S[4],S[8],S[12],S[1],S[5],S[9],S[13],S[2],S[6],S[10],S[14],S[3],S[7],S[11],S[15]),w=!0)}if(v.split(" ")[0]=="position"){let[,S,R,D]=v.split(/\s+/);b=new _(parseFloat(S),parseFloat(R),parseFloat(D))}if(v.split(" ")[0]=="scale"){let[,S,R,D]=v.split(/\s+/);M=new _(parseFloat(S),parseFloat(R),parseFloat(D))}if(v.split(" ")[0]=="rotation"){let[,S,R,D,I]=v.split(/\s+/);x=new $(parseFloat(S),parseFloat(R),parseFloat(D),parseFloat(I)),T=ie.QuatToMatrix(x.x,x.y,x.z,x.w)}f++}if(p){let v=p.substring(p.lastIndexOf(".")+1).toLowerCase(),S;w?S=y:S=ie.Scale(M).multiply(T).multiply(ie.Translate(b));let R=!1;if(v==="gltf"?R=await jt(s+p,e,t,S,!1):v==="glb"&&(R=await jt(s+p,e,t,S,!0)),!R)throw console.error(`Unable to load gltf ${p}`),new Error(`Unable to load gltf ${p}`)}}f++}return e.proceduralMaterialGlsl=u.length>0||h.length>0?[...c.values(),"void ApplyProceduralMaterialOverrides(int matId, inout Material mat, inout State state, ivec4 texIDs, Ray r) {","    switch (matId) {",...u,"        default:","            break;","    }","}","void ApplyProceduralMaterialClosureContract(int matId, in Material mat, in State state) {","    switch (matId) {",...h,"        default:","            break;","    }","}"].join(`

`):"",!0}function so(l,e,t,n){let i=l.indexOf(e),s=l.indexOf(t);if(i!==-1&&s!==-1&&s>i){let r=l.substring(0,i+e.length),o=l.substring(s);return r+`
`+n+`
`+o}return l}async function ph(l,e,t,n=null){let i="",s=await ue(l);s.ok&&(i=await s.text());let r=l.split("/").reverse()[0].split(".")[0],o=".scene";if(!await Br(`scenes/pathtracer/${r}${o}`)&&(o=".gltf",!await Br(`scenes/pathtracer/${r}${o}`)&&(o=".glb",!await Br(`scenes/pathtracer/${r}${o}`))))return console.error(`Failed to load scene ${r} from Shadertoy shader`),!1;let a=new ut(r);a.renderOptions=t;let c=!1;if(o===".scene"?c=await io(`/scenes/pathtracer/${r}${o}`,a,t):o===".gltf"?c=await jt(`/scenes/pathtracer/${r}${o}`,a,t,new ie,!1):o===".glb"&&(c=await jt(`/scenes/pathtracer/${r}${o}`,a,t,new ie,!0)),!c)return console.error("Failed to load scene from Shadertoy shader"),!1;t=a.renderOptions,a.lights.length===0&&(t.enableEnvMap=!0),a.renderOptions=t,await a.processSceneAsync();let u=a.computeSceneData(t.useRayMarching),h=u.data.length>1e3;return await Ka(t.useRayMarching?"/shaders/shadertoy/pathtracing-fast/shader.json":"/shaders/shadertoy/pathtracing/shader.json",e,t,async(d,f)=>{if(d.indexOf("common.glsl")!==-1){let m=f,g=u.commonCode;t.useRayMarching&&(g=`
#define OPT_RAYMARCHING
${g}
`),g=g.trim(),f=so(m,"// START_COMMON_CODE","// END_COMMON_CODE",g)}if(d.indexOf("bufferA.glsl")!==-1){let m=f;u.bufferACode=`
${u.bufferACode}

${h?"":a.generateMeshCode(u,t.useRayMarching)}
`,u.bufferACode=u.bufferACode.trim(),f=so(m,"// START_BUFFERA_CODE","// END_BUFFERA_CODE",u.bufferACode)}if(d.indexOf("bufferB.glsl")!==-1){let m=f;t.useRayMarching&&(u.bufferBCode=`
${i}

${u.bufferBCode}
`),u.bufferBCode=u.bufferBCode.trim(),f=so(m,"// START_BUFFERB_CODE","// END_BUFFERB_CODE",u.bufferBCode)}return d.indexOf("bufferD.glsl")!==-1&&(f=so(f,"// START_BUFFERD_CODE","// END_BUFFERD_CODE",u.bufferDCode)),n&&!await n(d,f,null,void 0,void 0)?(console.error(`Callback failed for ${d}`),null):f})?(e.renderOptions=t,await e.processSceneAsync(),await n("commonCode.glsl",u.commonCode,null,void 0,void 0),await n("bufferACode.glsl",u.bufferACode,null,void 0,void 0),await n("bufferBCode.glsl",u.bufferBCode,null,void 0,void 0),await n("bufferDCode.glsl",u.bufferDCode,null,void 0,void 0),t.useRayMarching||(await n("meshData.bin",null,u.buffer,void 0,void 0),u.textureBuffer&&await n("textures.bin",null,u.textureBuffer,u.textureWidth,u.textureHeight)),!0):(console.error("Failed to load Shadertoy shader"),!1)}var ro=class extends ut{sceneConfig=null;bvhDataArray=null;vertIndicesDataArray=null;verticesDataArray=null;normalsDataArray=null;_topLevelIndex=0;constructor(e){super(e)}dispose(){super.dispose(),this.bvhDataArray=null,this.vertIndicesDataArray=null,this.verticesDataArray=null,this.normalsDataArray=null,this.lightsDataArray=null}createTLAS(){}createBLAS(){}rebuildInstances(){this.instancesModified=!0,this.dirty=!0}async processSceneAsync(){}get topLevelIndex(){return this._topLevelIndex}set topLevelIndex(e){this._topLevelIndex=e}bvhData(e=null){return this.bvhDataArray}vertIndicesData(){return this.vertIndicesDataArray}verticesData(){return this.verticesDataArray}normalsData(){return this.normalsDataArray}set transformsDataArray(e){if(e){this.transforms=[];for(let t=0;t<e.length;t+=16){let n=new ie;n.data[0][0]=e[t],n.data[0][1]=e[t+1],n.data[0][2]=e[t+2],n.data[0][3]=e[t+3],n.data[1][0]=e[t+4],n.data[1][1]=e[t+5],n.data[1][2]=e[t+6],n.data[1][3]=e[t+7],n.data[2][0]=e[t+8],n.data[2][1]=e[t+9],n.data[2][2]=e[t+10],n.data[2][3]=e[t+11],n.data[3][0]=e[t+12],n.data[3][1]=e[t+13],n.data[3][2]=e[t+14],n.data[3][3]=e[t+15],this.transforms.push(n)}}}set materialsDataArray(e){if(e){this.materials=[];let t=e.length%60===0?60:32;for(let n=0;n<e.length;n+=t){let i=new wt;i.baseColor=new _(e[n],e[n+1],e[n+2]),i.anisotropic=e[n+3],i.emission=new _(e[n+4],e[n+5],e[n+6]),i.mediumThickness=e[n+7],i.metallic=e[n+8],i.roughness=e[n+9],i.subsurface=e[n+10],i.specularTint=e[n+11],i.sheen=e[n+12],i.sheenTint=e[n+13],i.clearcoat=e[n+14],i.clearcoatGloss=e[n+15],i.specTrans=e[n+16],i.ior=e[n+17],i.mediumType=e[n+18],i.mediumDensity=e[n+19],i.mediumColor=new _(e[n+20],e[n+21],e[n+22]),i.mediumAnisotropy=e[n+23],i.baseColorTexID=e[n+24],i.metallicRoughnessTexID=e[n+25],i.normalmapTexID=e[n+26],i.emissionmapTexID=e[n+27],i.opacity=e[n+28],i.alphaMode=e[n+29],i.alphaCutoff=e[n+30],i.doubleSided=e[n+31],t>=60&&(i.mediumAbsorption=e[n+32],i.baseWeight=e[n+33],i.baseDiffuseRoughness=e[n+34],i.coatDarkening=e[n+35],i.specularColor=new _(e[n+36],e[n+37],e[n+38]),i.coatIOR=e[n+39],i.coatColor=new _(e[n+40],e[n+41],e[n+42]),i.coatRoughnessAnisotropy=e[n+43],i.transmissionColor=new _(e[n+44],e[n+45],e[n+46]),i.thinWalled=e[n+47],i.subsurfaceRadiusScale=new _(e[n+48],e[n+49],e[n+50]),i.fuzzRoughness=e[n+52],i.dispersionScale=e[n+53],i.abbeNumber=e[n+54],i.thinFilmWeight=e[n+56],i.thinFilmThickness=e[n+57],i.thinFilmIor=e[n+58]),this.materials.push(i)}}}set lightsDataArray(e){if(e){this.lights=[];for(let t=0;t<e.length;t+=15){let n=new ht;n.position=new _(e[t],e[t+1],e[t+2]),n.emission=new _(e[t+3],e[t+4],e[t+5]),n.u=new _(e[t+6],e[t+7],e[t+8]),n.v=new _(e[t+9],e[t+10],e[t+11]),n.radius=e[t+12],n.area=e[t+13],n.type=e[t+14],this.lights.push(n)}}}computeSceneData(e){return null}generateMeshCode(e,t){return null}};function ao(l,e,t){return t===void 0?l.subarray(e*4):l.subarray(e*4,t*4)}function mh(l,e,t){let n=l.subarray(e*4,t*4),i=[];for(let s=0;s<n.length;s+=4)i.push(new _(n[s],n[s+1],n[s+2]));return new Float32Array(i.flatMap(s=>[s.x,s.y,s.z]))}function Ym(l,e,t){let n=l.subarray(e*4,t*4),i=[];for(let s=0;s<n.length;s+=4)i.push(new _(n[s],n[s+1],n[s+2]));return new Int32Array(i.flatMap(s=>[s.x,s.y,s.z]))}function qm(l,e,t,n=!1){let i=P.document.createElement("canvas");i.width=e,i.height=t;let s=i.getContext("2d");return s?(n?(s.scale(1,-1),s.drawImage(l,0,-t,e,t)):s.drawImage(l,0,0,e,t),s.getImageData(0,0,e,t)):null}function jm(l,e,t,n=!1){let i=qm(l,e,t,n);return i?new Uint8Array(i.data.buffer):null}async function gh(l,e,t){console.info(`Loading scene ${l}...`);let s=await(await ue(l)).json();e.sceneConfig=s;let r=new _(...s.camera.eye),o=new _(...s.camera.lookat),a=s.camera.fov;e.camera=new Qn(r,o,a),t.enableTonemap=s.display.enableTonemap,t.enableAces=s.display.enableAces,t.simpleAcesFit=s.display.simpleAcesFit,t.backgroundCol=new _(...s.display.backgroundCol),t.uniformLightCol=new _(...s.uniforms.uniformLightCol),t.maxDepth=s.uniforms.maxDepth,t.roughnessMollificationAmt=s.uniforms.roughnessMollificationAmt,t.envMapIntensity=s.uniforms.envMapIntensity,t.enableEnvMap=s.defines.includes("OPT_ENVMAP"),t.enableRoughnessMollification=s.defines.includes("OPT_ROUGHNESS_MOLLIFICATION"),t.enableRR=s.defines.includes("OPT_RR");let c=s.defines.find(d=>d.startsWith("OPT_RR_DEPTH "));if(c){let d=parseInt(c.split(" ")[1]);isNaN(d)||(t.RRDepth=d)}t.enableUniformLight=s.defines.includes("OPT_UNIFORM_LIGHT"),t.openglNormalMap=s.defines.includes("OPT_OPENGL_NORMALMAP"),t.hideEmitters=s.defines.includes("OPT_HIDE_EMITTERS"),t.enableBackground=s.defines.includes("OPT_BACKGROUND"),t.openglNormalMap=s.defines.includes("OPT_OPENGL_NORMALMAP"),t.enableBackground=s.defines.includes("OPT_BACKGROUND"),t.transparentBackground=s.defines.includes("OPT_TRANSPARENT_BACKGROUND"),t.enableVolumeMIS=s.defines.includes("OPT_VOL_MIS"),s.resolution&&(t.renderResolution=new ee(...s.resolution),t.originalRenderResolution=t.renderResolution.clone(),t.tileWidth=s.tileWidth,t.tileHeight=s.tileHeight);let u=await Li.readBlob(`shadertoy/examples/glsl-pathtracer/${s.scene}/meshData.bin`),h=new Float32Array(await u?.arrayBuffer(),20);if(e.materialsDataArray=ao(h,s.indices.materialsTex,s.indices.transformsTex),e.transformsDataArray=ao(h,s.indices.transformsTex,s.indices.lightsTex),e.lightsDataArray=mh(h,s.indices.lightsTex,s.indices.BVH),e.bvhDataArray=mh(h,s.indices.BVH,s.indices.vertexIndicesTex),e.vertIndicesDataArray=Ym(h,s.indices.vertexIndicesTex,s.indices.verticesTex),e.verticesDataArray=ao(h,s.indices.verticesTex,s.indices.normalsTex),e.normalsDataArray=ao(h,s.indices.normalsTex,2*s.indices.normalsTex-s.indices.verticesTex),s.meshes.forEach(d=>{let f=new pn;f.name=d.name,e.meshes.push(f)}),s.meshes.forEach((d,f)=>{let m=s.materials.findIndex(p=>p===d.material)+1,g=new mn(d.name,f,new ie,m);e.meshInstances.push(g)}),e.topLevelIndex=s.uniforms.topBVHIndex,s.materials.forEach((d,f,m)=>{e.materials[f+1].name=d}),s.withTexture){let d=await new Promise((f,m)=>{let g=new Image;g.crossOrigin="anonymous",g.onload=()=>{f(g)},g.onerror=()=>f(!1),g.src=Li.buildUrl(`shadertoy/examples/glsl-pathtracer/${s.scene}/textures.png`)});d&&(e.textureMapsArray=jm(d,d.width,d.height))}return e.renderOptions=t,!0}var An=class l{static _instance=null;stopped;working;static get instance(){return l._instance||(l._instance=new l),l._instance}scenes=[];shadertoyScenes=[];shadertoyGlslPathtracerScenes=[];envMaps=[];envMapIdx=0;mouseSensitivity=.01;scene=null;_renderer=null;renderOptions=new jn;lastTime;firstTime;bench=null;optionsChanged=!1;objectPropChanged=!1;reloadShaders=!1;constructor(){this.lastTime=performance.now()}emitSceneStage(e,t){typeof window>"u"||window.dispatchEvent(new CustomEvent("scene-stage",{detail:{stage:e,message:t}}))}get renderer(){return this._renderer}get currentScene(){return this.scene}static getExt(e){if(e.indexOf(".")===-1)return"";let t=e.split(".");return t[t.length-1].toLowerCase()}async getSceneFilesAsync(){try{let e=await ue("/pathtracer.json");this.scenes=await e.json(),e=await ue("/shadertoy.json"),this.shadertoyScenes=await e.json(),e=await ue("/shadertoy-glsl-pathtracer.json"),this.shadertoyGlslPathtracerScenes=await e.json()}catch(e){console.error("Error fetching scene files:",e)}}async getEnvMapsAsync(){try{let e=await ue("/envmaps.json");this.envMaps=await e.json()}catch(e){console.error("Error fetching envMaps files:",e)}}async loadSceneAsync(e,t=!1,n=!1,i=null){let s=e,r=l.getExt(e),o=!1,a=new ie;if((r==="scene"||r==="gltf"||r==="glb")&&!s.startsWith("/scenes/pathtracer/")&&(s=`/scenes/pathtracer/${s}`),r===""&&!s.startsWith("/scenes/shadertoy/examples/")){let u=`/scenes/shadertoy/examples/${s}/shadertoy.json`;(await ue(u)).ok||(u=`/scenes/shadertoy/examples/${s}/shader.json`),s=u}r==="shadertoyscene"&&!s.startsWith("/scenes/shadertoy/examples/glsl-pathtracer/")&&(s=`/scenes/shadertoy/examples/glsl-pathtracer/${s}`);let c=r==="shadertoyscene"||(r===""||r==="json")&&(s.endsWith("shadertoy.json")||s.endsWith("shader.json"));return this.scene=c?new Ci(e):s.endsWith("data.json")?new ro(e):new ut(e),this.renderOptions.flipTexturesY=t,this.renderOptions.useRayMarching=n,r==="scene"?o=await io(s,this.scene,this.renderOptions):r==="gltf"?o=await jt(s,this.scene,this.renderOptions,a,!1):r==="glb"?o=await jt(s,this.scene,this.renderOptions,a,!0):(r===""||r==="json")&&s.endsWith("shadertoy.json")?o=await ah(s,this.scene,this.renderOptions):(r===""||r==="json")&&s.endsWith("shader.json")?o=await Ka(s,this.scene,this.renderOptions):r==="shadertoyscene"?o=await ph(s,this.scene,this.renderOptions,i):s.endsWith("data.json")&&(o=await gh(s,this.scene,this.renderOptions)),o?(r!==""&&this.scene.envMap===null&&this.envMaps.length>0&&this.scene.lights.length===0&&(await this.scene.addEnvMapAsync(`HDR/${this.envMaps[this.envMapIdx]}`),this.renderOptions.enableEnvMap=!0,this.renderOptions.envMapIntensity=1.5),this.scene.renderOptions=this.renderOptions,this.renderOptions.renderResolution.x=Math.floor(this.renderOptions.originalRenderResolution.x*this.renderOptions.screenZoom),this.renderOptions.renderResolution.y=Math.floor(this.renderOptions.originalRenderResolution.y*this.renderOptions.screenZoom),this.renderOptions.tileWidth=Math.floor(this.renderOptions.renderResolution.x*this.renderOptions.pixelRatio/this.renderOptions.screenZoom),this.renderOptions.tileHeight=Math.floor(this.renderOptions.renderResolution.y*this.renderOptions.pixelRatio/this.renderOptions.screenZoom),this.resizeCanvas(this.renderOptions.renderResolution.x,this.renderOptions.renderResolution.y),!0):(console.error("Unable to load scene"),!1)}async initRendererAsync(){return this.scene?(this._renderer&&this._renderer.dispose(),this._renderer=this.scene instanceof Ci?new Zn(this.scene):new Kn(this.scene),await this.renderer.initAsync(),!0):(console.error("Scene not loaded"),!1)}render(){let e=P.gl;this.renderer.render(),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),e.viewport(0,0,this.renderOptions.renderResolution.x,this.renderOptions.renderResolution.y),this.renderer.present()}update(e,t){let n=!1;if(se.isAnyMouseDown()){if(this.scene instanceof ut){if(se.isMouseDown(0)){let i=se.getMouseDragDelta(0);this.scene.camera.offsetOrientation(i.x,i.y),se.resetMouseDragDelta(0)}else if(se.isMouseDown(1)){let i=se.getMouseDragDelta(1);this.scene.camera.setRadius(this.mouseSensitivity*i.y),se.resetMouseDragDelta(1)}else if(se.isMouseDown(2)){let i=se.getMouseDragDelta(2);this.scene.camera.strafe(this.mouseSensitivity*i.x,this.mouseSensitivity*i.y),se.resetMouseDragDelta(2)}}this.scene&&(this.scene.dirty=!0)}this.renderer.update(e,t)}resizeCanvas(e,t){let n=P.canvas;n!=null&&(n.width=e,n.style.width=e+"px",n.height=t,n.style.height=t+"px")}async resizeAsync(e,t){for(this.pauseOrContinue(!0);this.working;)await new Promise(n=>setTimeout(n,100));this.resizeCanvas(e,t),this.renderOptions.renderResolution.x=e,this.renderOptions.renderResolution.y=t,this.scene.renderOptions=this.renderOptions,await this.renderer.resizeRendererAsync(),this.emitSceneStage("launch","Lancement du rendu"),this.pauseOrContinue()}async mainLoopAsync(e){let t=P.gl;this.working=!0,this.optionsChanged&&(this.optionsChanged=!1,this.scene.dirty=!0,this.firstTime=e),this.objectPropChanged&&(this.objectPropChanged=!1,this.scene.rebuildInstances()),this.reloadShaders&&(this.reloadShaders=!1,this.scene.dirty=!0,this.firstTime=e,await this.renderer.reloadShadersAsync()),this.bench?.begin("mainLoop");let n=e;this.firstTime===void 0&&(this.firstTime=n);let i=(n-this.firstTime)/1e3,s=(n-this.lastTime)/1e3;this.lastTime=n,this.update(i,s),t.clearColor(0,0,0,0),t.clear(t.raw.COLOR_BUFFER_BIT|t.raw.DEPTH_BUFFER_BIT),t.disable(t.raw.DEPTH_TEST),this.render(),this.bench?.end("mainLoop"),this.bench?.nextFrame(e),this.working=!1,this.stopped||requestAnimationFrame(r=>{this.stopped||this.mainLoopAsync(r)})}async startSceneAsync(e){for(this.pauseOrContinue(!0);this.working;)await new Promise(n=>setTimeout(n,100));if(P.document.getElementById("textures")?.replaceChildren(),this.emitSceneStage("loading","Chargement de la scene"),!!await this.loadSceneAsync(e,this.renderOptions.flipTexturesY,this.renderOptions.useRayMarching)&&await this.initRendererAsync()){if(Ya.build(this),typeof window.loadAllShaders=="function")if(this.scene instanceof Ci&&this.scene.shadertoyShader){let n=this.scene.shadertoyShader.getAllShaders();window.loadAllShaders(n)}else window.loadAllShaders({image:""});this.emitSceneStage("launch","Lancement du rendu"),this.pauseOrContinue()}}rewind(){this.pauseOrContinue(!0),this.scene.dirty=!0,this.firstTime=performance.now(),requestAnimationFrame(e=>{this.mainLoopAsync(e),requestAnimationFrame(t=>{this.mainLoopAsync(t)})})}pauseOrContinue(e=!1){return this.stopped=!this.stopped||e,this.renderer?.pauseOrContinue(this.stopped),se.pauseOrContinue(this.stopped),this.stopped||requestAnimationFrame(async t=>{this.stopped||await this.mainLoopAsync(t)}),this.stopped}async runAsync(e){P.setInstance(e.document,e.canvas),this.bench=new Ha(P.gl.raw,{trackGPU:!0,paramLogger:(t,n,i,s,r,o,a)=>{}}),await this.getSceneFilesAsync(),await this.getEnvMapsAsync(),e.scene||(e.scene=this.shadertoyScenes.length>0?this.shadertoyScenes[0]:this.scenes.length>0?this.scenes[0]:null),e.scene&&await this.startSceneAsync(e.scene)}};export{An as Main};
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

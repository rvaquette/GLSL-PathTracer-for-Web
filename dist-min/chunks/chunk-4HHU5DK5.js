import{a as et}from"./chunk-Q4WHUCDY.js";var Mt=class{dispose(){}},vi=class extends Mt{name;image;rgba=null;width=null;height=null;flipY=!1;constructor(e=null,t=null){super(),this.name=e,this.image=t}},dt=class extends vi{constructor(e=null,t=null){super(e,t)}async loadTextureAsync(e){if(typeof window<"u"){let t=e.startsWith("/")?new URL(e.substring(1),document.baseURI).toString():e;return new Promise((n,i)=>{let r=new Image;r.crossOrigin="anonymous",r.onload=()=>{this.name=e,this.image=r,this.width=r.width,this.height=r.height,n(!0)},r.onerror=()=>n(!1),r.src=t})}else try{let n=(await import("sharp")).default(e).ensureAlpha(),i=await n.metadata(),r=await n.raw().toBuffer();return this.name=e,this.image=null,this.width=i.width??null,this.height=i.height??null,this.rgba=new Uint8Array(r),!0}catch(t){return console.error("Failed to load texture in Node:",t),!1}}};var Oe=class l extends Mt{static _instance=null;copyAudio=!1;sampleRate=44100;playTime=180;textureDimensions=512;playSamples;audioContext;audioBuffer;buffer;internalFormat;format;gltype;constructor(){super(),this.playSamples=this.playTime*this.sampleRate,this.audioContext=new AudioContext;let e=()=>{this.audioContext.state==="suspended"&&this.audioContext.resume()};document.addEventListener("click",e,{once:!0}),document.addEventListener("keydown",e,{once:!0}),document.addEventListener("touchstart",e,{once:!0}),this.audioBuffer=this.audioContext.createBuffer(2,this.playSamples,this.sampleRate),this.buffer=new Uint8Array(this.textureDimensions*this.textureDimensions*4),this.internalFormat=P.gl.raw.RGBA8,this.format=P.gl.raw.RGBA,this.gltype=P.gl.raw.UNSIGNED_BYTE}static instance(){return l._instance||(l._instance=new l),l._instance}};async function lr(l){return(await oe(l)).ok}async function oe(l){if(/^https?:\/\//i.test(l)||typeof window<"u"){let r=typeof window<"u"&&l.startsWith("/")?new URL(l.substring(1),document.baseURI).toString():l,s=await fetch(r);return{ok:s.ok,statusText:s.statusText,arrayBuffer:()=>s.arrayBuffer(),text:()=>s.text(),json:()=>s.json(),blob:()=>s.blob()}}let e=await import("fs"),t=await import("path"),n=t.join,i=t.isAbsolute;try{let r=i(l)?`.${l}`:n(process.cwd(),l);return{ok:e.existsSync(r),statusText:e.existsSync(r)?"OK":"Not Found",arrayBuffer:async()=>e.readFileSync(r).buffer,text:async()=>e.readFileSync(r,{encoding:"utf8"}),json:async()=>JSON.parse(e.readFileSync(r,{encoding:"utf8"})),blob:async()=>new Blob([e.readFileSync(r)])}}catch(r){return console.error("Failed to read local file:",l,r),{ok:!1,statusText:r.message,arrayBuffer:async()=>new ArrayBuffer(0),text:async()=>"",json:async()=>null,blob:async()=>null}}}function dl(l,e){return console.log(`Saving ${l}`),new Promise(async t=>{if(typeof window<"u"){let n=new Blob([e],{type:"application/octet-stream"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=l,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i),t(!0)}else{let n=await import("fs/promises");try{if(e instanceof ArrayBuffer||e instanceof SharedArrayBuffer){let i=Buffer.from(e);await n.writeFile(l,i)}else{let i=await import("path/win32");await n.writeFile(l,e,"utf8")}t(!0)}catch(i){console.error("Failed to save file:",l,i),t(!1)}}})}var be=class l{channel;type;filepath;sampler;id;soundTexture;audioTexture;imageTexture;imageTextures;arrayBuffer;xres;yres;internalFormat=P.gl?.raw.RGBA8;format=P.gl?.raw.RGBA;gltype=P.gl?.raw.UNSIGNED_BYTE;texture;buffer;static pauseOrContinue(e,t){let n=e.audioTexture;n&&(t?n.audio.pause():n.audio.play())}static createTexture(e){return e.imageTextures?l.createTextureFromCubemap(e):e.type==="texture"||e.type==="video"||e.type==="floats"?l.createTextureFromImage(e):e.audioTexture?l.createTextureFromAudio(e):e.type==="volume"?l.createTextureFromVolume(e):e.type==="keyboard"?l.createTextureFromKeyboard(e):null}static bindTexture(e,t){let n=P.gl;if(n.activeTexture(n.raw.TEXTURE0+e.channel),e.type==="video")l.updateTextureFromVideo(e);else if(e.type==="music")l.updateTextureFromAudio(e);else if(e.type==="keyboard")n.bindTexture(n.raw.TEXTURE_2D,e.texture);else if(e.texture)e.type==="texture"||e.type==="floats"?n.bindTexture(n.raw.TEXTURE_2D,e.texture):e.type==="cubemap"?n.bindTexture(n.raw.TEXTURE_CUBE_MAP,e.texture):e.type==="volume"&&n.bindTexture(n.raw.TEXTURE_3D,e.texture);else if(e.buffer){if(e.type==="cubeA")n.bindTexture(n.raw.TEXTURE_CUBE_MAP,e.buffer.textures[1-e.buffer.frontIndex]),e.sampler&&(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_WRAP_S,n.raw.CLAMP_TO_EDGE),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_WRAP_T,n.raw.CLAMP_TO_EDGE),e.sampler.filter==="linear"?(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR)):e.sampler.filter==="mipmap"&&(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.raw.TEXTURE_CUBE_MAP)));else if(n.bindTexture(n.raw.TEXTURE_2D,e.buffer.textures[t?1-e.buffer.frontIndex:e.buffer.frontIndex]),e.sampler){var i=n.raw.REPEAT;e.sampler.wrap==="clamp"&&(i=n.raw.CLAMP_TO_EDGE),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_S,i),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_T,i),e.sampler.filter==="linear"?(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR)):e.sampler.filter==="mipmap"&&(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.raw.TEXTURE_2D))}}}static unbindTexture(e){let t=P.gl;t.activeTexture(t.raw.TEXTURE0+e.channel),t.bindTexture(t.raw.TEXTURE_2D,null),t.bindTexture(t.raw.TEXTURE_3D,null),t.bindTexture(t.raw.TEXTURE_CUBE_MAP,null)}static createTextureFromImage(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_2D,n);let i=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.pixelStorei(t.raw.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.raw.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.raw.NONE),e.arrayBuffer?t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer):t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.format,e.gltype,e.imageTexture.image);var r=t.raw.REPEAT;return e.sampler&&e.sampler.wrap==="clamp"&&(r=t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,r),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,r),!e.sampler||e.sampler.filter==="none"?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)):e.sampler&&(e.sampler.filter==="linear"||e.type==="video")?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)):e.sampler&&e.sampler.filter==="mipmap"?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_2D)):e.sampler&&e.sampler.filter==="nearest"&&(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_2D)),t.bindTexture(t.raw.TEXTURE_2D,null),t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,!1),n}static updateTextureFromVideo(e){let t=P.gl;if(!e.imageTexture.copyVideo){t.bindTexture(t.raw.TEXTURE_2D,null);return}t.bindTexture(t.raw.TEXTURE_2D,e.texture);let n=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,n),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.format,e.gltype,e.imageTexture.image)}static createTextureFromCubemap(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_CUBE_MAP,n);let i=e.sampler&&e.sampler.vflip=="true";return t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_X,0,e.internalFormat,e.format,e.gltype,e.imageTextures[0].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_X,0,e.internalFormat,e.format,e.gltype,e.imageTextures[1].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_Y,0,e.internalFormat,e.format,e.gltype,i?e.imageTextures[3].image:e.imageTextures[2].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,e.internalFormat,e.format,e.gltype,i?e.imageTextures[2].image:e.imageTextures[3].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_Z,0,e.internalFormat,e.format,e.gltype,e.imageTextures[4].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,e.internalFormat,e.format,e.gltype,e.imageTextures[5].image),!e.sampler||e.sampler.filter==="none"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)):e.sampler&&e.sampler.filter==="linear"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)):e.sampler&&e.sampler.filter==="mipmap"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_CUBE_MAP)):e.sampler&&e.sampler.filter==="nearest"&&(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_CUBE_MAP)),t.bindTexture(t.raw.TEXTURE_CUBE_MAP,null),t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,!1),n}static createTextureFromVolume(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_3D,n),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_BASE_LEVEL,0),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAX_LEVEL,Math.log2(e.xres)),(!e.sampler||e.sampler.filter==="none")&&(t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)),e.sampler&&(e.sampler.filter==="linear"||e.sampler.filter==="mipmap")&&(t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)),t.texImage3D(t.raw.TEXTURE_3D,0,e.internalFormat,e.xres,e.yres,e.yres,0,e.format,e.gltype,e.arrayBuffer);var i=t.raw.REPEAT;return e.sampler&&e.sampler.wrap==="clamp"&&(i=t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_R,i),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_S,i),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_T,i),t.bindTexture(t.raw.TEXTURE_3D,null),n}static createTextureFromKeyboard(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,t.raw.CLAMP_TO_EDGE),t.bindTexture(t.raw.TEXTURE_2D,null),n}static updateTextureFromKeyboard(e){let t=P.gl;t.bindTexture(t.raw.TEXTURE_2D,e.texture),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer)}static createTextureFromAudio(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,null),t.bindTexture(t.raw.TEXTURE_2D,null),n}static updateTextureFromAudio(e){let t=P.gl,n=e.audioTexture;if(!n.copyAudio){t.bindTexture(t.raw.TEXTURE_2D,null);return}n.update(),t.bindTexture(t.raw.TEXTURE_2D,e.texture);let i=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.texSubImage2D(t.raw.TEXTURE_2D,0,0,0,e.xres,1,e.format,e.gltype,n.freqData),t.texSubImage2D(t.raw.TEXTURE_2D,0,0,1,e.xres,1,e.format,e.gltype,n.waveData)}},fn=class l{inputs;type;code=null;shader=null;fbos=null;textures=null;flip=!1;frontIndex=0;xres;yres;soundCompiled=!1;playNode=null;time=0;static createFBOAndTexture(e,t,n,i,r){e.fbos=[],e.textures=[],e.frontIndex=0,e.type==="cubeA"?(l.createFBOTextureCubeA(e),l.createFBOTextureCubeA(e)):e.type==="sound"?l.createFBOTextureSound(e):l.createFBOTexture(e,t,n,i,r)}static createFBOTexture(e,t,n,i,r){let s=P.gl,a=s.createFramebuffer();s.bindFramebuffer(s.raw.FRAMEBUFFER,a);let o=l.createTexture(i);if((!t||!n)&&(s.framebufferTexture2D(s.raw.FRAMEBUFFER,s.raw.COLOR_ATTACHMENT0,s.raw.TEXTURE_2D,o,0),s.bindTexture(s.raw.TEXTURE_2D,null),s.bindFramebuffer(s.raw.FRAMEBUFFER,null)),e.fbos.push(a),e.textures.push(o),t){if(!n){let u=s.createFramebuffer();s.bindFramebuffer(s.raw.FRAMEBUFFER,u),e.fbos.push(u)}let c=l.createTexture(r);s.framebufferTexture2D(s.raw.FRAMEBUFFER,s.raw.COLOR_ATTACHMENT0,s.raw.TEXTURE_2D,c,0),s.bindTexture(s.raw.TEXTURE_2D,null),s.bindFramebuffer(s.raw.FRAMEBUFFER,null),e.textures.push(c)}}static createFBOTextureCubeA(e){let t=P.gl,n=l.createTextureFromCubeA(e.xres,e.yres),i=t.createFramebuffer();t.bindFramebuffer(t.raw.FRAMEBUFFER,i),t.framebufferTexture2D(t.raw.FRAMEBUFFER,t.raw.COLOR_ATTACHMENT0,t.raw.TEXTURE_CUBE_MAP_POSITIVE_X,n,0),t.bindFramebuffer(t.raw.FRAMEBUFFER,null),e.fbos.push(i),e.textures.push(n)}static createTextureFromCubeA(e,t,n="linear",i=P.gl.raw.RGBA16F,r=P.gl.raw.RGBA,s=P.gl.raw.FLOAT){let a=P.gl,o=a.createTexture();return a.bindTexture(a.raw.TEXTURE_CUBE_MAP,o),a.texImage2D(a.raw.TEXTURE_CUBE_MAP_POSITIVE_X,0,i,e,t,0,r,s,null),a.texImage2D(a.raw.TEXTURE_CUBE_MAP_NEGATIVE_X,0,i,e,t,0,r,s,null),a.texImage2D(a.raw.TEXTURE_CUBE_MAP_POSITIVE_Y,0,i,e,t,0,r,s,null),a.texImage2D(a.raw.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,i,e,t,0,r,s,null),a.texImage2D(a.raw.TEXTURE_CUBE_MAP_POSITIVE_Z,0,i,e,t,0,r,s,null),a.texImage2D(a.raw.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,i,e,t,0,r,s,null),n==="linear"&&(a.texParameteri(a.raw.TEXTURE_CUBE_MAP,a.raw.TEXTURE_MAG_FILTER,a.raw.LINEAR),a.texParameteri(a.raw.TEXTURE_CUBE_MAP,a.raw.TEXTURE_MIN_FILTER,a.raw.LINEAR)),n==="mipmap"&&(a.texParameteri(a.raw.TEXTURE_CUBE_MAP,a.raw.TEXTURE_MAG_FILTER,a.raw.LINEAR),a.texParameteri(a.raw.TEXTURE_CUBE_MAP,a.raw.TEXTURE_MIN_FILTER,a.raw.LINEAR_MIPMAP_LINEAR),a.generateMipmap(a.raw.TEXTURE_CUBE_MAP)),n==="nearest"&&(a.texParameteri(a.raw.TEXTURE_CUBE_MAP,a.raw.TEXTURE_MAG_FILTER,a.raw.LINEAR),a.texParameteri(a.raw.TEXTURE_CUBE_MAP,a.raw.TEXTURE_MIN_FILTER,a.raw.NEAREST_MIPMAP_LINEAR)),a.bindTexture(a.raw.TEXTURE_CUBE_MAP,null),o}static createTexture(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texImage2D(t.raw.TEXTURE_2D,0,t.raw.RGBA32F,e.x,e.y,0,t.raw.RGBA,t.raw.FLOAT,null),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,t.raw.CLAMP_TO_EDGE),t.bindTexture(t.raw.TEXTURE_2D,null),n}static createFBOTextureSound(e){let t=P.gl,n=t.createFramebuffer();t.bindFramebuffer(t.raw.FRAMEBUFFER,n);let i=l.createTextureFromSound();t.framebufferTexture2D(t.raw.FRAMEBUFFER,t.raw.COLOR_ATTACHMENT0,t.raw.TEXTURE_2D,i,0),t.bindFramebuffer(t.raw.FRAMEBUFFER,null),e.fbos.push(n),e.textures.push(i)}static createTextureFromSound(){let e=P.gl,t=Oe.instance(),n=e.createTexture();return e.bindTexture(e.raw.TEXTURE_2D,n),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texImage2D(e.raw.TEXTURE_2D,0,t.internalFormat,t.textureDimensions,t.textureDimensions,0,t.format,t.gltype,null),e.bindTexture(e.raw.TEXTURE_2D,null),n}static drawBuffer(e,t){e.type=="sound"&&!e.soundCompiled&&(l.drawTextureFromSound(e,t),e.soundCompiled=!0,this.pauseOrContinue(e,!1))}static pauseOrContinue(e,t){e.playNode&&(e.time=Date.now(),e.playNode.disconnect(),e.playNode.stop(),e.playNode=null),t||(e.playNode=Oe.instance().audioContext.createBufferSource(),e.playNode.buffer=Oe.instance().audioBuffer,e.playNode.connect(Oe.instance().audioContext.destination),e.time>0?e.playNode.start(Date.now()-e.time):e.playNode.start(0))}static drawTextureFromSound(e,t){let n=P.gl,i=n.getAttribLocation(t,"pos"),r=n.getUniformLocation(t,"iTimeOffset"),s=n.getUniformLocation(t,"iSampleOffset"),a=Oe.instance(),o=a.buffer,c=a.textureDimensions*a.textureDimensions,u=a.audioBuffer.getChannelData(0),h=a.audioBuffer.getChannelData(1),d=a.playSamples/c;for(let f=0;f<d;f++){let p=f*c;n.uniform1f(r,p/a.sampleRate),n.uniform1i(s,p),n.drawUnitQuad_XY(i),n.readPixels(0,0,a.textureDimensions,a.textureDimensions,n.raw.RGBA,n.raw.UNSIGNED_BYTE,o,0);for(let x=0;x<c;x++)u[p+x]=-1+2*(o[4*x+0]+256*o[4*x+1])/65535,h[p+x]=-1+2*(o[4*x+2]+256*o[4*x+3])/65535}return!0}},Pn=class{constructor(e=null){e&&(this.id=e.id,this.common=e.common,this.bufferA=e.bufferA,this.bufferB=e.bufferB,this.bufferC=e.bufferC,this.bufferD=e.bufferD,this.cubeA=e.cubeA,this.sound=e.sound,this.image=e.image)}fromShadertoyJson(e){this.id=e.info?.id,this.isGlslPathtracer=e.flags?.mFlagGlslPathTracer||!1;for(let t of e.renderpass){if(t.type=="common"){this.common=!0,this.commonCode=t.code;continue}let n=new fn;n.type=t.type,n.code=t.code,n.inputs=[];for(let i of t.inputs){let r=new be;if(r.channel=i.channel,r.type=i.type,r.id=i.id||null,i.type!=="buffer")r.filepath=i.filepath;else switch(i.filepath){case"/media/previz/buffer00.png":r.type="bufferA";break;case"/media/previz/buffer01.png":r.type="bufferB";break;case"/media/previz/buffer02.png":r.type="bufferC";break;case"/media/previz/buffer03.png":r.type="bufferD";break}r.sampler=i.sampler,n.inputs.push(r)}switch(t.name){case"Buffer A":this.bufferA=n,n.type="bufferA";break;case"Buffer B":this.bufferB=n,n.type="bufferB";break;case"Buffer C":this.bufferC=n,n.type="bufferC";break;case"Buffer D":this.bufferD=n,n.type="bufferD";break;case"Cube A":this.cubeA=n,n.type="cubeA";break;case"Sound":this.sound=n,n.type="sound";break;case"Image":this.image=n,n.type="image";break}}}id;isGlslPathtracer=!1;common=!1;bufferA;bufferB;bufferC;bufferD;cubeA;sound;image;commonCode="";buffers;imageTexture=null;tileOutputTextures=null;accumFramebuffers=null;pathTraceTextures=null;getAllShaders(){let e={};return this.common&&(e.common=this.commonCode),this.bufferA&&(e.bufferA=this.bufferA.code),this.bufferB&&(e.bufferB=this.bufferB.code),this.bufferC&&(e.bufferC=this.bufferC.code),this.bufferD&&(e.bufferD=this.bufferD.code),this.cubeA&&(e.cubeA=this.cubeA.code),this.sound&&(e.sound=this.sound.code),this.image&&(e.image=this.image.code),e}getAllInputs(e){let t=[],n=null;switch(e){case"common":break;case"bufferA":n=this.bufferA;break;case"bufferB":n=this.bufferB;break;case"bufferC":n=this.bufferC;break;case"bufferD":n=this.bufferD;break;case"cubeA":n=this.cubeA;break;case"sound":n=this.sound;break;case"image":n=this.image;break}return n&&(t=n.inputs.map(i=>({type:i.type,filepath:i.filepath,sampler:i.sampler}))),t}},Ti=class{mDataView;mOffset;constructor(e){this.mDataView=e,this.mOffset=0}Seek(e){this.mOffset=e}ReadUInt8(){var e=new Uint8Array(this.mDataView,this.mOffset)[0];return this.mOffset+=1,e}ReadUInt16(){var e=new Uint16Array(this.mDataView,this.mOffset)[0];return this.mOffset+=2,e}ReadUInt32(){var e=new Uint32Array(this.mDataView,this.mOffset)[0];return this.mOffset+=4,e}ReadUInt64(){return this.ReadUInt32()+(this.ReadUInt32()<<32)}ReadFloat32(){var e=new Float32Array(this.mDataView,this.mOffset)[0];return this.mOffset+=4,e}ReadFloat32Array(e){for(var t=new Float32Array(this.mDataView,this.mOffset),n=[],i=0;i<e;i++)n[i]=t[i];return this.mOffset+=4*e,n}ReadFloat32ArrayNative(e){var t=new Float32Array(this.mDataView,this.mOffset);return this.mOffset+=4*e,t}WriteUInt8(e){new Uint8Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=1}WriteUInt16(e){new Uint16Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=2}WriteUInt32(e){new Uint32Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=4}WriteUInt64(e){this.WriteUInt32(e&4294967295),this.WriteUInt32(e>>32)}WriteFloat32(e){new Float32Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=4}WriteFloat32Array(e){for(var t=0;t<e.length;t++)this.WriteFloat32(e[t])}Save(e){return dl(e,this.mDataView)}};var St=class l extends Mt{static _instance=null;buffer;xRes;yRes;internalFormat;format;gltype;input=null;constructor(){super(),this.buffer=new Uint8Array(256*3);for(let e=0;e<256*3;e++)this.buffer[e]=0;this.xRes=256,this.yRes=3,this.internalFormat=P.gl.raw.R8,this.format=P.gl.raw.RED,this.gltype=P.gl.raw.UNSIGNED_BYTE}keydown(e){let t=e.keyCode;this.buffer[t+0*256]!=255&&(this.buffer[t+0*256]=255,this.buffer[t+1*256]=255,this.buffer[t+2*256]=255-this.buffer[t+2*256],this.input&&be.updateTextureFromKeyboard(this.input))}keyup(e){let t=e.keyCode;this.buffer[t+0*256]=0,this.buffer[t+1*256]=0,this.input&&be.updateTextureFromKeyboard(this.input)}eraseKeypresses(){for(let e=0;e<256;e++)this.buffer[e+1*256]=0;this.input&&be.updateTextureFromKeyboard(this.input)}static instance(){return l._instance||(l._instance=new l),l._instance}};var re=class l{x;y;constructor(e=0,t=0){this.x=e,this.y=t}clone(){return new l(this.x,this.y)}static add(e,t){return e.add(t)}add(e){return new l(this.x+e.x,this.y+e.y)}static subtract(e,t){return e.subtract(t)}subtract(e){return new l(this.x-e.x,this.y-e.y)}scale(e){return new l(this.x*e,this.y*e*e)}};var te=class l{static _isMouseDown=!1;static _isMouseOver=!1;static _isMouseWheel=!1;static _escapePressed=!1;static _paused=!1;static buttons=0;static downPosition=new re(0,0);static movePosition=new re(0,0);static deltaPosition=new re(0,0);static pauseOrContinue(e){l._paused=e}static isMouseDown(e){return l._paused?!1:e===2?l._isMouseDown&&(l.buttons&4)!==0:l._isMouseDown&&(l.buttons&e+1)!==0}static keydown(e){l._paused||(e.key==="Escape"&&ke.instance.pauseOrContinue(),St.instance().keydown(e))}static keyup(e){l._paused||St.instance().keyup(e)}static mouseEnter(){l._paused||(l._isMouseOver=!0)}static mouseLeave(){l._paused||(l._isMouseOver=!1)}static mouseDown(e){l._paused||(l._isMouseDown=!0,l.buttons=e.buttons,l.downPosition=new re(e.offsetX,P.canvas.height-e.offsetY))}static touchStart(e){l._paused||(e.preventDefault(),l._isMouseDown=!0,l.buttons=1,l.downPosition=l.getTouchCanvasPosition(e.changedTouches[0]),l.movePosition=l.downPosition)}static mouseMove(e){l._paused||l._isMouseDown&&(l.movePosition=new re(e.offsetX,P.canvas.height-e.offsetY))}static touchMove(e){l._paused||(e.preventDefault(),l._isMouseDown&&(l.movePosition=l.getTouchCanvasPosition(e.changedTouches[0])))}static mouseUp(){l._paused||(l._isMouseDown=!1,l.downPosition=new re(0,0))}static touchCancel(e){l._paused||(e.preventDefault(),l._isMouseDown=!1,l.downPosition=new re(0,0))}static mouseWheel(e){l._paused||(l._isMouseWheel=!0,l.deltaPosition=new re(e.deltaX,e.deltaY))}static isAnyMouseDown(){return l._paused?!1:l._isMouseDown}static getMouseDragDelta(e){return l.isMouseDown(e)?new re(l.movePosition.x-l.downPosition.x,l.movePosition.y-l.downPosition.y):new re(0,0)}static resetMouseDragDelta(e){l.isMouseDown(e)&&(l.downPosition=l.movePosition)}static getTouchCanvasPosition(e){let t=P.canvas;if(!t)return new re(0,0);let n=t.getBoundingClientRect(),i=(e.clientX-n.left)*(t.width/n.width),r=(e.clientY-n.top)*(t.height/n.height);return new re(i,t.height-r)}};var P=class l{static _instance=null;document;canvas;gl;constructor(e,t){this.document=e,this.canvas=t,this.canvas.tabIndex=0;var n={alpha:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"};let i=t.getContext("webgl2",n);if(!i)throw new Error("WebGL2 not supported");this.gl=new et(i),this.gl.getExtension("OES_texture_float_linear"),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("OES_texture_half_float_linear"),et.profiling&&this.gl.getExtension("WEBGL_debug_shaders"),this.gl.raw.hint(this.gl.raw.FRAGMENT_SHADER_DERIVATIVE_HINT,this.gl.raw.NICEST);let r=i.getSupportedExtensions();console.log(`Available WebGL extensions:
`,r.join(`
`)),window.addEventListener("resize",async s=>{}),this.canvas.addEventListener("keydown",async s=>{te.keydown(s),s.preventDefault()},!1),this.canvas.addEventListener("keyup",async s=>{te.keyup(s),s.preventDefault()},!1),this.canvas.onmousedown=function(s){te.mouseDown(s)},this.canvas.onmouseenter=function(s){te.mouseEnter()},this.canvas.onmouseleave=function(s){te.mouseLeave()},this.canvas.onmousemove=function(s){te.mouseMove(s)},this.canvas.onmouseup=function(s){te.mouseUp()},this.canvas.onwheel=function(s){te.mouseWheel(s)},this.canvas.ontouchstart=function(s){te.touchStart(s)},this.canvas.ontouchmove=function(s){te.touchMove(s)},this.canvas.ontouchcancel=function(s){te.touchCancel(s)},this.canvas.ontouchend=function(s){te.mouseUp()}}static get document(){return l._instance==null?null:l._instance.document}static get canvas(){return l._instance==null?null:l._instance.canvas}static get gl(){return l._instance==null?null:l._instance.gl}static setInstance(e,t){l._instance=new l(e,t)}};var E=class l{x;y;z;constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}toArray(){return[this.x,this.y,this.z]}clone(){return new l(this.x,this.y,this.z)}static fromVec4(e){return new l(e.x,e.y,e.z)}multiply(e){return new l(this.x*e.x,this.y*e.y,this.z*e.z)}static add(e,t){return e.add(t)}add(e){return new l(this.x+e.x,this.y+e.y,this.z+e.z)}static subtract(e,t){return e.subtract(t)}subtract(e){return new l(this.x-e.x,this.y-e.y,this.z-e.z)}static scale(e,t){return e.scale(t)}scale(e){return new l(this.x*e,this.y*e,this.z*e)}get(e){return e===0?this.x:e===1?this.y:this.z}set(e,t){e===0?this.x=t:e===1?this.y=t:this.z=t}static log(e){return new l(Math.log(e.x),Math.log(e.y),Math.log(e.z))}static negate(e){return new l(-e.x,-e.y,-e.z)}static min(e,t){return new l(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z))}static max(e,t){return new l(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))}static cross(e,t){return new l(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x)}static pow(e,t){return new l(Math.pow(e.x,t),Math.pow(e.y,t),Math.pow(e.z,t))}static Length(e){return Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)}static dot(e,t){return e.x*t.x+e.y*t.y+e.z*t.z}static distance(e,t){return l.Length(e.subtract(t))}static clamp(e,t,n){return new l(Math.max(t.x,Math.min(e.x,n.x)),Math.max(t.y,Math.min(e.y,n.y)),Math.max(t.z,Math.min(e.z,n.z)))}static normalize(e){let t=l.Length(e);return new l(e.x/t,e.y/t,e.z/t)}};var Ln=class{renderResolution;screenZoom;originalRenderResolution;uniformLightCol;backgroundCol;tileWidth;tileHeight;maxDepth;maxSpp;RRDepth;texArrayWidth;texArrayHeight;enableRR;enableDenoiser;denoiserFrameCnt;enableTonemap;enableAces;simpleAcesFit;openglNormalMap;enableEnvMap;enableUniformLight;hideEmitters;enableBackground;transparentBackground;independentRenderSize;enableRoughnessMollification;enableVolumeMIS;envMapIntensity;envMapRot;envMapIrradianceFile;roughnessMollificationAmt;pixelRatio;flipTexturesY=!1;useRayMarching=!1;pathtracerShaderProfile="full";forceSynchronousShaderLink=!1;useMaterialxMode=!1;materialxModuleUrl="./mtlx/JsMaterialXGenShader.js";materialxGeneratorType="auto";forcedMaterialxGeneratorType=null;materialxEsslTemplateUrl="./shaders/skeleton-essl.glsl";constructor(){this.renderResolution=new re(1280,720),this.originalRenderResolution=new re(1280,720),this.screenZoom=1,this.uniformLightCol=new E(.3,.3,.3),this.backgroundCol=new E(1,1,1),this.tileWidth=100,this.tileHeight=100,this.maxDepth=2,this.maxSpp=-1,this.RRDepth=2,this.texArrayWidth=2048,this.texArrayHeight=2048,this.enableRR=!0,this.enableDenoiser=!1,this.denoiserFrameCnt=10,this.enableTonemap=!0,this.enableAces=!1,this.simpleAcesFit=!1,this.openglNormalMap=!0,this.enableEnvMap=!1,this.enableUniformLight=!1,this.hideEmitters=!1,this.enableBackground=!1,this.transparentBackground=!1,this.independentRenderSize=!1,this.enableRoughnessMollification=!1,this.enableVolumeMIS=!1,this.envMapIntensity=1,this.envMapRot=0,this.envMapIrradianceFile="",this.roughnessMollificationAmt=0,this.pixelRatio=.25}};var Et=null,fl=0;function pl(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Mi(l){return!Number.isFinite(l)||l<0?0:l}function eu(l){let e=2166136261;for(let t=0;t<l.length;t++)e^=l.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}function tu(l){let e=[],t=new Set,n=l.split(/\r?\n/),i=/^\s*#define\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s+(.*))?\s*$/;for(let r of n){let s=r.match(i);if(!s)continue;let a=s[1],o=(s[2]||"").trim(),c=o.length>0?`${a}=${o}`:a;t.has(c)||(t.add(c),e.push(c))}return e}function ze(l){let e=new TextEncoder().encode(l).length,t=l.length>0?l.split(/\r?\n/).length:0;return{sourceHash:eu(l),sourceBytes:e,sourceLines:t,defines:tu(l)}}function ml(l,e){fl+=1;let t=fl.toString().padStart(4,"0");return{runId:`${Date.now()}-${t}`,createdAtIso:new Date().toISOString(),rendererKind:l,sceneName:e,shaders:[],programs:[]}}function gl(){return Et||(Et=ml("unknown","unknown")),Et}function Si(l,e){Et=ml(l,e)}function xl(l){gl().shaders.push({...l,compileMs:Mi(l.compileMs)})}function _l(l){gl().programs.push({...l,linkProgramMs:Mi(l.linkProgramMs),waitForLinkMs:Mi(l.waitForLinkMs),totalProgramMs:Mi(l.totalProgramMs)})}function nu(l,e){let t=0,n=0,i=0,r=0;for(let c of l)t+=c.compileMs,n=Math.max(n,c.compileMs),c.stage==="vertex"&&(i+=1),c.stage==="fragment"&&(r+=1);let s=0,a=0,o=0;for(let c of e)s+=c.linkProgramMs,a+=c.waitForLinkMs,o=Math.max(o,c.totalProgramMs);return{shaderCount:l.length,vertexShaderCount:i,fragmentShaderCount:r,programCount:e.length,totalCompileMs:t,totalLinkProgramMs:s,totalWaitForLinkMs:a,totalGpuPipelineMs:t+s+a,maxSingleShaderCompileMs:n,maxSingleProgramMs:o}}async function iu(l){if(typeof process<"u"&&process.versions?.node)try{let t=await import("node:fs/promises"),n=await import("node:path"),i=n.join(process.cwd(),"reports"),r=n.join(i,`shader-compile-report-${l.runId}.json`);await t.mkdir(i,{recursive:!0}),await t.writeFile(r,JSON.stringify(l,null,2),"utf-8"),console.log(`[ShaderCompileReport] Report saved: ${r}`)}catch(t){console.warn("[ShaderCompileReport] Unable to persist JSON report on Node runtime.",t)}}function ru(l){let e=globalThis;e.__shaderCompileReports||(e.__shaderCompileReports=[]),e.__shaderCompileReports.push(l),e.__lastShaderCompileReport=l,typeof window<"u"&&window.dispatchEvent(new CustomEvent("shader-compile-report",{detail:l}))}async function Ei(){if(!Et)return null;let l={...Et,summary:nu(Et.shaders,Et.programs)};return Et=null,ru(l),console.log("[ShaderCompileReport]",l.runId,l.summary),await iu(l),l}function yl(l,e,t,n,i){return{...ze(t),shaderPath:l,stage:e,compileMs:n,success:i}}function wi(){return pl()}function Dn(l){return Mi(pl()-l)}var cr=class{constructor(e,t=""){this.shaders=e;this.label=t;if(this.gl=P.gl,this.program=this.gl.createProgram(),!this.program)throw new Error("Unable to create WebGL program.");for(let i of e)this.gl.attachShader(this.program,i.getObject());let n=wi();this.gl.linkProgram(this.program),this.linkProgramMs=Dn(n)}shaders;label;gl;program;linked=!1;disposed=!1;linkErrorMessage=null;linkProgramMs=0;linkMetricsReported=!1;async waitForLinkAsync(e=!1){if(this.linked)return;if(this.linkErrorMessage)throw new Error(this.linkErrorMessage);if(this.disposed||!this.program)throw new Error("Program disposed before linking");let t=this.program,n=wi(),i=0,r="synchronous",s=e?null:this.gl.getExtension("KHR_parallel_shader_compile");if(s){r="parallel";let a=3e5;for(let o=0;o<16&&this.gl.raw.getError()!==this.gl.raw.NO_ERROR;o++);for(;;){if(this.disposed||!this.program)throw new Error("Program disposed while waiting for link completion");i+=1;let o=this.gl.raw.getProgramParameter(t,s.COMPLETION_STATUS_KHR),c=this.gl.raw.getError();if(c===this.gl.raw.INVALID_VALUE||c===this.gl.raw.INVALID_OPERATION){r="parallel-error-fallback";break}if(o)break;if(Dn(n)>=a){r="parallel-timeout-fallback";break}await new Promise(u=>setTimeout(u,0))}}for(let a of this.shaders)this.gl.detachShader(t,a.getObject());if(!this.gl.raw.getProgramParameter(t,this.gl.raw.LINK_STATUS)){let a=this.gl.getProgramInfoLog(t);throw this.linkErrorMessage=`Error linking program: ${a}`,this.dispose(),new Error(this.linkErrorMessage)}if(this.linked=!0,!this.linkMetricsReported){let a=Dn(n),o=this.shaders.find(u=>u.getCompileEntry().stage==="vertex")?.getCompileEntry(),c=this.shaders.find(u=>u.getCompileEntry().stage==="fragment")?.getCompileEntry();_l({programLabel:this.label||`${o?.shaderPath||"vertex"} -> ${c?.shaderPath||"fragment"}`,vertexSourceHash:o?.sourceHash||"",fragmentSourceHash:c?.sourceHash||"",linkProgramMs:this.linkProgramMs,waitForLinkMs:a,totalProgramMs:this.linkProgramMs+a,khrParallelShaderCompile:!!s,waitPollIterations:i,waitMode:r}),this.linkMetricsReported=!0}}use(){if(!this.linked)throw new Error("Program not linked yet");if(!this.program)throw new Error("Program disposed");this.gl.useProgram(this.program)}stopUsing(){this.gl.useProgram(null)}getObject(){if(!this.program)throw new Error("Program disposed");return this.program}isReusable(){return!this.disposed&&!this.linkErrorMessage}dispose(){this.disposed||(this.disposed=!0,this.program&&(this.gl.deleteProgram(this.program),this.program=null))}};var ur=class{gl;vao=null;vbo=null;constructor(){this.gl=P.gl,this.vao=this.gl.createVertexArray(),this.vbo=this.gl.createBuffer(),this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.raw.ARRAY_BUFFER,this.vbo);let e=new Float32Array([-1,1,0,1,-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,-1,1,0,1,1,1,1]);this.gl.bufferData(this.gl.raw.ARRAY_BUFFER,e,this.gl.raw.STATIC_DRAW),this.gl.enableVertexAttribArray(0),this.gl.vertexAttribPointer(0,2,this.gl.raw.FLOAT,!1,4*Float32Array.BYTES_PER_ELEMENT,0),this.gl.enableVertexAttribArray(1),this.gl.vertexAttribPointer(1,2,this.gl.raw.FLOAT,!1,4*Float32Array.BYTES_PER_ELEMENT,2*Float32Array.BYTES_PER_ELEMENT),this.gl.bindVertexArray(null)}draw(e){e.use(),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.raw.TRIANGLES,0,6),this.gl.bindVertexArray(null),e.stopUsing()}};var Ai=class{shader;compileEntry;constructor(e,t){let n=P.gl,i=t===n.raw.VERTEX_SHADER?"vertex":t===n.raw.FRAGMENT_SHADER?"fragment":"unknown";this.shader=n.createShader(t),console.log(`Compiling Shader ${e.path}`);let r=wi();n.shaderSource(this.shader,e.src),n.compileShader(this.shader);let s=Dn(r),a=n.getShaderParameter(this.shader,n.raw.COMPILE_STATUS);if(this.compileEntry=yl(e.path,i,e.src,s,a),xl(this.compileEntry),!a){let o=n.getShaderInfoLog(this.shader)||"Unknown error";n.deleteShader(this.shader),this.shader=null;let c=`Shader compilation error in ${e.path}
${e.src}
${o}`;throw alert(e.path+" : "+o),new Error(c)}if(e.dump){console.log(`Shader ${e.path} compiled successfully.`);let o=n.getExtension("WEBGL_debug_shaders").getTranslatedShaderSource(this.shader);console.log(o)}}getCompileEntry(){return this.compileEntry}getObject(){if(!this.shader)throw new Error("Shader object is null.");return this.shader}};function su(l){let e=/\/\*[\s\S]*?\*\//g,t=!1;return l.replace(e,n=>/MIT License/.test(n)?t?"":(t=!0,n):n)}function au(l){let e=/^\s*#define\s+(D4_ENABLE_CLOSURE_[A-Za-z0-9_]+)\s+([01])\s*$/gm,t=new Map,n=null;for(;(n=e.exec(l))!==null;)t.set(n[1],Number.parseInt(n[2],10));if(t.size===0)return l;let i=l;for(let[r,s]of t.entries()){if(s===0){let o=new RegExp(`#if\\s+${r}\\b[\\s\\S]*?#endif\\s*`,"g");i=i.replace(o,"");continue}let a=new RegExp(`#if\\s+${r}\\b\\s*([\\s\\S]*?)#endif`,"g");i=i.replace(a,"$1")}return i}function Qs(l){let e=su(l);return e=au(e),e=e.replace(/\n{3,}/g,`

`),e}var pe=class l{static async loadAsync(e,t=!1,n="#include"){n+=" ";let i;try{if(i=await oe(e),!i.ok)throw new Error}catch{return console.error(`ERROR: could not open the shader at: ${e}`),{src:"",path:e,dump:t}}let r=await i.text();return await l.loadShaderSourceAsync(r,e,t,n)}static async loadShaderSourceAsync(e,t,n=!1,i="#include"){let r=e.split(/\r?\n/),s="";for(let a of r){if(a.includes(i)){let o=a.replace(i,"").trim().replace(/["<>]/g,""),c=l.resolveRelativePath(t,o),u=await l.loadAsync(c,n,i.trim());s+=u.src;continue}s+=a+`
`}return{src:s,path:t,dump:n}}static resolveRelativePath(e,t){return t.startsWith("http://")||t.startsWith("https://")?new URL(t,e).toString():t.startsWith("/")?t:e.substring(0,e.lastIndexOf("/")+1)+t}};var bl=24,tt=new Map,vl=null,$t=class l{static maxBufferTextureWidth=4096;gl;_scene;shadersDirectory;programs=[];quad;pixelRatio;_sampleCounter=1;get sampleCounter(){return this._sampleCounter}set sampleCounter(e){this._sampleCounter=e}currentBuffer=0;frameCounter=1;_renderSize=new re(0,0);tileWidth=0;tileHeight=0;invNumTiles=new re(0,0);numTiles=new re(0,0);tile=new re(0,0);outputFBO=null;denoiserFBO=null;outputShader=null;denoised=!1;stopRequested=!1;constructor(e){this._scene=e}emitSceneStage(e,t){typeof window>"u"||window.dispatchEvent(new CustomEvent("scene-stage",{detail:{stage:e,message:t}}))}get scene(){return this._scene}get renderSize(){return this._renderSize}consumeStopRequested(){let e=this.stopRequested;return this.stopRequested=!1,e}async initAsync(){this.gl=P.gl,this.shadersDirectory="./shaders/",this.stopRequested=!1,this.quad=new ur,this.pixelRatio=this.resolvePixelRatio(),this.emitSceneStage("processing","Traitement de la scene"),this.scene.initialized||await this.scene.processSceneAsync(),this.initFBOs(),await this.initShadersAsync()}resolvePixelRatio(){return this.scene.renderOptions.pixelRatio}createTexture(e,t,n,i,r,s){let a=this.gl,o=a.createTexture();return a.bindTexture(a.raw.TEXTURE_2D,o),a.texImage2D(a.raw.TEXTURE_2D,0,e,t,n,0,i,r,s),a.texParameteri(a.raw.TEXTURE_2D,a.raw.TEXTURE_WRAP_S,a.raw.CLAMP_TO_EDGE),a.texParameteri(a.raw.TEXTURE_2D,a.raw.TEXTURE_WRAP_T,a.raw.CLAMP_TO_EDGE),a.texParameteri(a.raw.TEXTURE_2D,a.raw.TEXTURE_MAG_FILTER,a.raw.NEAREST),a.texParameteri(a.raw.TEXTURE_2D,a.raw.TEXTURE_MIN_FILTER,a.raw.NEAREST),a.bindTexture(a.raw.TEXTURE_2D,null),o}createBufferTexture(e,t){let n=this.gl,i=e.length/t,r=Math.min(l.maxBufferTextureWidth,i),s=Math.ceil(i/r);if(r*s*t!==e.length){let a=new Float32Array(r*s*t);a.set(e),e=a}return this.createTexture(t==4?n.raw.RGBA32F:n.raw.RGB32F,r,s,t==4?n.raw.RGBA:n.raw.RGB,n.raw.FLOAT,e)}createBufferTextureInt(e,t){let n=this.gl,i=e.length/t,r=Math.min(l.maxBufferTextureWidth,i),s=Math.ceil(i/r);if(r*s*t!==e.length){let a=new Int32Array(r*s*t);a.set(e),e=a}return this.createTexture(t==4?n.raw.RGBA32I:n.raw.RGB32I,r,s,t==4?n.raw.RGBA_INTEGER:n.raw.RGB_INTEGER,n.raw.INT,e)}createBufferTextureUint(e,t){let n=this.gl,i=e.length/t,r=this.scene.renderOptions.texArrayWidth,s=Math.ceil(i/r);return this.createTexture(t==4?n.raw.RGBA8UI:n.raw.RGB8UI,r,s,t==4?n.raw.RGBA_INTEGER:n.raw.RGB_INTEGER,n.raw.UNSIGNED_BYTE,e)}dispose(){let e=this.gl;this.outputFBO&&(e.deleteFramebuffer(this.outputFBO),this.outputFBO=null),this.denoiserFBO&&(e.deleteFramebuffer(this.denoiserFBO),this.denoiserFBO=null),this.outputShader=null;let t=new Set(tt.values());Array.from(new Set(this.programs)).forEach(i=>{t.has(i)||i.dispose()}),this.programs=[]}async resizeRendererAsync(){let e=this.gl;this.dispose(),this.initFBOs(),await this.initShadersAsync()}pauseOrContinue(e){}initFBOs(){}initFBOs_(e){let t=this.gl;this.sampleCounter=1,this.currentBuffer=0,this.frameCounter=1,this._renderSize=this.scene.renderOptions.renderResolution,e&&(this.tileWidth=this.scene.renderOptions.tileWidth,this.tileHeight=this.scene.renderOptions.tileHeight,this.invNumTiles.x=this.tileWidth/this.renderSize.x,this.invNumTiles.y=this.tileHeight/this.renderSize.y,this.numTiles.x=Math.ceil(this.renderSize.x/this.tileWidth),this.numTiles.y=Math.ceil(this.renderSize.y/this.tileHeight),this.tile.x=-1,this.tile.y=this.numTiles.y-1),console.log("Render Resolution :",this.renderSize.x,this.renderSize.y),console.log("Preview Resolution :",Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),e&&console.log("Tile Size :",this.tileWidth,this.tileHeight)}disposeShaders(){this.outputShader=null;let e=new Set(tt.values());Array.from(new Set(this.programs)).forEach(n=>{e.has(n)||n.dispose()}),this.programs=[]}buildClosureFeatureSignature(e,t){let n=`${e}
${t}`,i=/^\s*#define\s+(D4_ENABLE_CLOSURE_[A-Za-z0-9_]+)\s+(.+)\s*$/gm,r=[],s=new Set,a=null;for(;(a=i.exec(n))!==null;){let o=`${a[1]}=${a[2].trim()}`;s.has(o)||(s.add(o),r.push(o))}return r.length===0?"D4_ENABLE_CLOSURE_NONE":(r.sort(),r.join("|"))}async reloadShadersAsync(){this.disposeShaders(),await this.initShadersAsync()}loadShaders(e,t){let n=this.gl,i={...e,src:Qs(e.src)},r={...t,src:Qs(t.src)};vl!==n.raw&&(tt.clear(),vl=n.raw);let s=`${ze(i.src).sourceHash}|${ze(r.src).sourceHash}`,a=tt.get(s);if(a&&a.isReusable())return tt.delete(s),tt.set(s,a),this.programs.push(a),a;let o=[];o.push(new Ai(i,n.raw.VERTEX_SHADER)),o.push(new Ai(r,n.raw.FRAGMENT_SHADER));let c=`${i.path} -> ${r.path}`,u=new cr(o,c);if(this.programs.push(u),tt.set(s,u),tt.size>bl){let h=new Set(this.programs);for(let[d,f]of[...tt]){if(tt.size<=bl)break;h.has(f)||(tt.delete(d),f.dispose())}}return u}async initShadersAsync(){this.emitSceneStage("compile","Compilation des shaders");let[e,t]=await Promise.all([pe.loadAsync(this.shadersDirectory+"common/vertex.glsl"),pe.loadAsync(this.shadersDirectory+"output.glsl")]);this.outputShader=this.loadShaders(e,t),this.emitSceneStage("compile","Compilation des shaders terminee")}render(){}present(){}getProgress(){let e=this.scene.renderOptions.maxSpp;return e<=0?0:this.sampleCounter*100/e}getSampleCount(){return this.sampleCounter}exportTextureToImage(e,t,n,i){if(!e){console.error("Cannot export null texture");return}let r=this.gl,s=r.createFramebuffer();if(r.bindFramebuffer(r.raw.FRAMEBUFFER,s),r.framebufferTexture2D(r.raw.FRAMEBUFFER,r.raw.COLOR_ATTACHMENT0,r.raw.TEXTURE_2D,e,0),r.raw.checkFramebufferStatus(r.raw.FRAMEBUFFER)!==r.raw.FRAMEBUFFER_COMPLETE){console.error("Framebuffer is not complete"),r.bindFramebuffer(r.raw.FRAMEBUFFER,null),r.deleteFramebuffer(s);return}let a=new Float32Array(t*n*4);r.raw.readPixels(0,0,t,n,r.raw.RGBA,r.raw.FLOAT,a);let o=new Uint8Array(t*n*4);for(let f=0;f<a.length;f++)o[f]=Math.min(255,Math.max(0,Math.floor(a[f]*255)));r.bindFramebuffer(r.raw.FRAMEBUFFER,null),r.deleteFramebuffer(s);let c=document.createElement("canvas");c.width=t,c.height=n,c.style.border="2px solid black";let u=c.getContext("2d");if(!u){console.error("Cannot get 2D context from canvas");return}let h=u.createImageData(t,n);for(let f=0;f<n;f++)for(let p=0;p<t;p++){let x=(f*t+p)*4,m=((n-1-f)*t+p)*4;h.data[m]=o[x],h.data[m+1]=o[x+1],h.data[m+2]=o[x+2],h.data[m+3]=o[x+3]}u.putImageData(h,0,0),P.document.getElementById(i)?.appendChild(c)}async update(e,t){}};var ou="pathtracer:shader-source-bundle:",ea=new Map;function Tl(){return typeof window<"u"&&typeof window.localStorage<"u"}function Ml(l){return`${ou}${l}`}function Sl(l){let e=ea.get(l);if(e)return e;if(!Tl())return null;try{let t=window.localStorage.getItem(Ml(l));if(!t)return null;let n=JSON.parse(t);return!n||n.key!==l?null:(ea.set(l,n),n)}catch{return null}}function El(l,e){let t={key:l,createdAtIso:new Date().toISOString(),...e};if(ea.set(l,t),!!Tl())try{window.localStorage.setItem(Ml(l),JSON.stringify(t))}catch{}}var hr=class{entries=new Map;dirty=!1;placeholderTex=null;register(e,t){if(t.materialParams!==void 0&&t.materialParams.length!==16)throw new Error(`ProceduralMaterialRegistry: materialParams for matID ${e} must have exactly 16 floats (4 vec4), got ${t.materialParams.length}`);for(let i of t.textures??[])if(i.slot<0||i.slot>7)throw new Error(`ProceduralMaterialRegistry: texture slot ${i.slot} for matID ${e} is out of range [0, 7]`);let n=this.entries.get(e);this.entries.set(e,{matID:e,def:t,glTextures:n?.glTextures??new Map}),this.dirty=!0}unregister(e,t){let n=this.entries.get(t);if(n){for(let i of n.glTextures.values())e.deleteTexture(i);this.entries.delete(t),this.dirty=!0}}isDirty(){return this.dirty}clearDirty(){this.dirty=!1}buildGLSL(){let e=[];for(let n of this.sortedEntries()){let i=this._funcName(n.def.name);e.push(`void ${i}(inout Material mat, in ProceduralMaterialContext ctx)`,"{",this._indentBody(n.def.glslFunctionBody),"}","")}if(e.push("void ApplyProceduralMaterialOverrides(","    int matID, inout Material mat, inout State state, ivec4 texIDs, in Ray r)","{"),this.entries.size>0){e.push("    ProceduralMaterialContext ctx = MakeProceduralContext(state, r);"),e.push("    switch (matID) {");for(let n of this.sortedEntries()){let i=this._funcName(n.def.name);e.push(`        case ${n.matID}: ${i}(mat, ctx); break;`)}e.push("        default: break;"),e.push("    }")}e.push("}",""),e.push("void ApplyProceduralMaterialClosureContract(","    int matID, in Material mat, in State state)","{");let t=[...this.sortedEntries()].filter(n=>n.def.closureContract!==void 0);if(t.length>0){e.push("    switch (matID) {");for(let n of t){let i=n.def.closureContract,r=i.kind,s=i.model??0,a=i.flags;e.push(`        case ${n.matID}:`),e.push("            gMaterialXClosureContractValid = 1;"),e.push(`            gMaterialXClosureKind  = ${r};`),e.push(`            gMaterialXClosureModel = ${s};`),e.push(`            gMaterialXClosureFlags = ${a};`),e.push("            break;")}e.push("        default: break;"),e.push("    }")}return e.push("}",""),e.push("vec3 EvalProceduralDisplacementLocal(int matId, vec2 uv, int texLayer) {","    return vec3(0.0);","}"),e.join(`
`)}bindTextures(e,t){this.placeholderTex||(this.placeholderTex=this._createPlaceholderTex(e));let n=new Map;for(let i of this.entries.values())for(let[r,s]of i.glTextures)n.set(r,s);for(let i=0;i<8;i++){let r=n.get(i)??this.placeholderTex;e.activeTexture(e.TEXTURE12+i),e.bindTexture(e.TEXTURE_2D,r);let s=e.getUniformLocation(t,`procTex${i}`);s!==null&&e.uniform1i(s,12+i)}}async uploadTexturesAsync(e){let t=[];for(let n of this.entries.values())for(let i of n.def.textures??[])t.push(this._uploadTexSlot(e,n,i));await Promise.all(t)}dispose(e){for(let t of this.entries.values()){for(let n of t.glTextures.values())e.deleteTexture(n);t.glTextures.clear()}this.placeholderTex&&(e.deleteTexture(this.placeholderTex),this.placeholderTex=null),this.entries.clear(),this.dirty=!0}sortedEntries(){return[...this.entries.values()].sort((e,t)=>e.matID-t.matID)}_funcName(e){return`ProceduralMat_${e.replace(/[^A-Za-z0-9_]/g,"_")}`}_indentBody(e){return e.split(`
`).map(t=>`    ${t}`).join(`
`)}_createPlaceholderTex(e){let t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([255,255,255,255])),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindTexture(e.TEXTURE_2D,null),t}async _uploadTexSlot(e,t,n){let i=await this._resolveImage(n.src),r=t.glTextures.get(n.slot);r||(r=e.createTexture(),t.glTextures.set(n.slot,r)),e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,i),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.bindTexture(e.TEXTURE_2D,null)}_resolveImage(e){return e instanceof HTMLImageElement?e.complete?Promise.resolve(e):new Promise((t,n)=>{e.addEventListener("load",()=>t(e)),e.addEventListener("error",n)}):new Promise((t,n)=>{let i=new Image;i.crossOrigin="anonymous",i.onload=()=>t(i),i.onerror=n,i.src=e})}};var wl="/*__PROCEDURAL_MATERIAL_INJECTION__*/";function lu(l){return l.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Al(l,e,t){let n=new RegExp(`(^|\\n)([ \\t]*)${lu(e)}(?=\\n|$)`);return n.test(l)?l.replace(n,(i,r,s)=>{let a=t.split(`
`).map(u=>u.length>0?`${s}${u}`:u).join(`
`);if(t.trim().length===0)return`${r}${a}
${s}${e}`;let o=`${s}/*__PROCEDURAL_MATERIAL_GENERATED_BEGIN__*/`,c=`${s}/*__PROCEDURAL_MATERIAL_GENERATED_END__*/`;return`${r}${o}
${a}
${c}
${s}${e}`}):(console.warn(`Shader injection marker not found: ${e}`),l)}function cu(l){return[`tile=${ze(l.tileSrc).sourceHash}`,`preview=${ze(l.previewSrc).sourceHash}`,`tonemap=${ze(l.tonemapSrc).sourceHash}`,`defs=${ze(l.pathtraceDefines).sourceHash}`,`tonemapDefs=${ze(l.tonemapDefines).sourceHash}`,`procMat=${ze(l.proceduralMaterialGlsl).sourceHash}`,"pruneVersion=4"].join("|")}var Yt=class l extends $t{_denoiserRunning=!1;backendReady=!1;denoiser=null;denoiserExecutedOneTime=!1;denoiserTexture=null;denoiserInputFramePtr=null;BVHTex=null;vertexIndicesTex=null;verticesTex=null;normalsTex=null;materialsTex=null;transformsTex=null;lightsTex=null;textureMapsArrayTex=null;envMapTex=null;envMapCDFTex=null;envMapIrradianceTex=null;envMapRadianceMips=1;floatLinearSupport=null;thinFilmLutTex=null;pathTraceTextureLowRes=null;pathTraceTexture=null;accumTexture=null;tileOutputTexture=[null,null];pathTraceFBO=null;pathTraceFBOLowRes=null;accumFBO=null;pathTraceShader=null;pathTraceShaderLowRes=null;tonemapShader=null;pendingTonemapVertexSource=null;pendingTonemapFragmentSource=null;pendingTonemapLinkPromise=null;debugExpandedShaderSources=null;proceduralMaterials=new hr;_initDenoiserAsync(e){if(typeof document>"u"){this.scene.renderOptions.enableDenoiser=!1,this.backendReady=!0;return}import("./denoiser-R4B6EPN5.js").then(t=>{let n=t.Denoiser;if(!n)throw new Error("Denoiser export not found.");let i=document.getElementById("_denoiserOutput");i===null&&(i=document.createElement("canvas"),i.id="_denoiserOutput",i.style.display="none",document.body.appendChild(i)),this.denoiser=new n("webgl",i),this.denoiser.onBackendReady(()=>{this.denoiser&&(this.denoiser.useTiling=!0,this.denoiser.srgb=!0,this.denoiser.onExecute(r=>{if(!this.denoiserFBO||!this.denoiserTexture)return;let s=this.denoiser.width,a=this.denoiser.height;e.raw.activeTexture(e.raw.TEXTURE0),e.raw.pixelStorei(e.raw.UNPACK_FLIP_Y_WEBGL,!1),e.raw.pixelStorei(e.raw.UNPACK_ALIGNMENT,4),e.raw.pixelStorei(e.raw.UNPACK_ROW_LENGTH,0),e.raw.pixelStorei(e.raw.UNPACK_SKIP_ROWS,0),e.raw.pixelStorei(e.raw.UNPACK_SKIP_PIXELS,0),e.raw.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture),e.texSubImage2D(e.raw.TEXTURE_2D,0,0,0,s,a,e.raw.RGBA,e.raw.FLOAT,r),this.denoiserExecutedOneTime||(this.denoiserExecutedOneTime=!0)},"float32"),this.backendReady=!0)})}).catch(t=>{console.warn("Denoiser disabled (module load failed):",t),this.scene.renderOptions.enableDenoiser=!1,this.backendReady=!0,this.denoiser=null})}constructor(e){super(e)}dispose(){super.dispose();let e=this.gl;this.pathTraceTexture&&(e.deleteTexture(this.pathTraceTexture),this.pathTraceTexture=null),this.pathTraceTextureLowRes&&(e.deleteTexture(this.pathTraceTextureLowRes),this.pathTraceTextureLowRes=null),this.accumTexture&&(e.deleteTexture(this.accumTexture),this.accumTexture=null),this.tileOutputTexture[0]&&(e.deleteTexture(this.tileOutputTexture[0]),this.tileOutputTexture[0]=null),this.tileOutputTexture[1]&&(e.deleteTexture(this.tileOutputTexture[1]),this.tileOutputTexture[1]=null),this.denoiserTexture&&(e.deleteTexture(this.denoiserTexture),this.denoiserTexture=null),this.BVHTex&&(e.deleteTexture(this.BVHTex),this.BVHTex=null),this.vertexIndicesTex&&(e.deleteTexture(this.vertexIndicesTex),this.vertexIndicesTex=null),this.verticesTex&&(e.deleteTexture(this.verticesTex),this.verticesTex=null),this.normalsTex&&(e.deleteTexture(this.normalsTex),this.normalsTex=null),this.materialsTex&&(e.deleteTexture(this.materialsTex),this.materialsTex=null),this.transformsTex&&(e.deleteTexture(this.transformsTex),this.transformsTex=null),this.lightsTex&&(e.deleteTexture(this.lightsTex),this.lightsTex=null),this.textureMapsArrayTex&&(e.deleteTexture(this.textureMapsArrayTex),this.textureMapsArrayTex=null),this.envMapTex&&(e.deleteTexture(this.envMapTex),this.envMapTex=null),this.envMapCDFTex&&(e.deleteTexture(this.envMapCDFTex),this.envMapCDFTex=null),this.envMapIrradianceTex&&this.envMapIrradianceTex!==this.envMapTex&&e.deleteTexture(this.envMapIrradianceTex),this.envMapIrradianceTex=null,this.thinFilmLutTex&&(e.deleteTexture(this.thinFilmLutTex),this.thinFilmLutTex=null),this.proceduralMaterials.dispose(e.raw),this.denoiser&&(this.denoiser.dispose(),this.denoiser=null),this.pathTraceFBO&&(e.deleteFramebuffer(this.pathTraceFBO),this.pathTraceFBO=null),this.pathTraceFBOLowRes&&(e.deleteFramebuffer(this.pathTraceFBOLowRes),this.pathTraceFBOLowRes=null),this.accumFBO&&(e.deleteFramebuffer(this.accumFBO),this.accumFBO=null),this.pathTraceShader=null,this.pathTraceShaderLowRes=null,this.tonemapShader=null,this.pendingTonemapVertexSource=null,this.pendingTonemapFragmentSource=null,this.pendingTonemapLinkPromise=null}initFBOs(){super.initFBOs_(!0);let e=this.gl;this.pathTraceFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBO),this.pathTraceTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.tileWidth,this.tileHeight,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.pathTraceTexture,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.pathTraceFBOLowRes=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),this.pathTraceTextureLowRes=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio),0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.pathTraceTextureLowRes,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.accumFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.accumFBO),this.accumTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.accumTexture,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.outputFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),this.tileOutputTexture[0]=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[0]),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),this.tileOutputTexture[1]=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[1]),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.tileOutputTexture[this.currentBuffer],0),this.backendReady=!this.scene.renderOptions.enableDenoiser,this.denoiserInputFramePtr=new Float32Array(this.renderSize.x*this.renderSize.y*4),this.denoiserTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),this.denoiserFBO=e.createFramebuffer(),this.scene.renderOptions.enableDenoiser&&this._initDenoiserAsync(e),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}disposeShaders(){super.disposeShaders(),this.pathTraceShader=null,this.pathTraceShaderLowRes=null,this.tonemapShader=null,this.pendingTonemapVertexSource=null,this.pendingTonemapFragmentSource=null,this.pendingTonemapLinkPromise=null}async ensureTonemapShaderAsync(){if(this.tonemapShader)return;if(this.pendingTonemapLinkPromise){await this.pendingTonemapLinkPromise;return}if(!this.pendingTonemapVertexSource||!this.pendingTonemapFragmentSource)return;let e=(async()=>{Si("pathtracer-lazy-tonemap",this.scene.sceneName||"unknown");let t=this.loadShaders(this.pendingTonemapVertexSource,this.pendingTonemapFragmentSource);await t.waitForLinkAsync(this.scene.renderOptions.forceSynchronousShaderLink),await Ei(),this.tonemapShader=t,this.pendingTonemapVertexSource=null,this.pendingTonemapFragmentSource=null})();this.pendingTonemapLinkPromise=e;try{await e}finally{this.pendingTonemapLinkPromise=null}}async initShadersAsync(){Si("pathtracer",this.scene.sceneName||"unknown"),await super.initShadersAsync();let e=this.gl,t=this.scene,n=!!t.materialxEsslShaderGlsl?.trim().length||!!t.proceduralMaterialGlsl?.trim().length,i=n&&t.renderOptions.materialxGeneratorType==="essl"&&!!t.materialxEsslShaderGlsl?.trim().length,r=await pe.loadAsync(this.shadersDirectory+"common/vertex.glsl"),s,a;if(!n)s=await pe.loadAsync(this.shadersDirectory+"tile.glsl"),a=await pe.loadAsync(this.shadersDirectory+"preview.glsl");else{let b=i?await pe.loadShaderSourceAsync(t.materialxEsslShaderGlsl,this.shadersDirectory+"skeleton-essl.glsl"):await pe.loadAsync(this.shadersDirectory+"skeleton.glsl");a=b,s=b}let o=await pe.loadAsync(this.shadersDirectory+"output.glsl"),c=await pe.loadAsync(this.shadersDirectory+"tonemap.glsl"),u={src:a.src,path:a.path,dump:a.dump},h=this.scene.proceduralMaterialGlsl?.trim().length?`${this.scene.proceduralMaterialGlsl}
`:"",[d,f]=this.scene.getDefines(),p=cu({tileSrc:s.src,previewSrc:u.src,tonemapSrc:c.src,pathtraceDefines:d,tonemapDefines:f,proceduralMaterialGlsl:h});function x(b,v){let M=b.src.indexOf("#version");if(M!==-1){let T=b.src.indexOf(`
`,M);b.src=b.src.slice(0,T+1)+v+b.src.slice(T+1)}else b.src=v+b.src}let m=h.length>0&&!i,g=i?null:Sl(p);g?(s.src=g.pathTraceSrc,u.src=g.pathTraceLowResSrc,c.src=g.tonemapSrc):(m&&(s.src=Al(s.src,wl,h),u.src=Al(u.src,wl,h)),x(u,d),x(s,d),x(c,f),m&&El(p,{pathTraceSrc:s.src,pathTraceLowResSrc:u.src,tonemapSrc:c.src})),this.debugExpandedShaderSources={tile:s.src,preview:u.src,tonemap:c.src},this.outputShader=this.loadShaders(r,o),this.tonemapShader=null,this.pendingTonemapVertexSource={...r},this.pendingTonemapFragmentSource={...c},this.pathTraceShader=this.loadShaders(r,s);let _=ze(u.src).sourceHash,y=ze(s.src).sourceHash;_===y?this.pathTraceShaderLowRes=this.pathTraceShader:this.pathTraceShaderLowRes=this.loadShaders(r,u)}async finalizePathTraceShadersAsync(){let e=this.gl,t=this.scene;if(!this.pathTraceShader||!this.pathTraceShaderLowRes)return;await Promise.all(this.programs.map((i,r)=>(console.log(`Linking program ${r+1}/${this.programs.length}: ${i.label}...`),i.waitForLinkAsync(this.scene.renderOptions.forceSynchronousShaderLink)))),await Ei(),console.log(),this.emitSceneStage("launch","Lancement du rendu");let n;this.pathTraceShader.use(),n=this.pathTraceShader.getObject(),t.envMap&&(e.uniform2f(e.raw.getUniformLocation(n,"envMapRes"),t.envMap.width,t.envMap.height),e.uniform1f(e.raw.getUniformLocation(n,"envMapTotalSum"),t.envMap.totalSum)),e.uniform1i(e.raw.getUniformLocation(n,"topBVHIndex"),t.topLevelIndex),e.uniform2f(e.raw.getUniformLocation(n,"resolution"),this.renderSize.x,this.renderSize.y),e.uniform2f(e.raw.getUniformLocation(n,"invNumTiles"),this.invNumTiles.x,this.invNumTiles.y),e.uniform1i(e.raw.getUniformLocation(n,"numOfLights"),t.lights.length),e.uniform1i(e.raw.getUniformLocation(n,"accumTexture"),0),e.uniform1i(e.raw.getUniformLocation(n,"BVH"),1),e.uniform1i(e.raw.getUniformLocation(n,"vertexIndicesTex"),2),e.uniform1i(e.raw.getUniformLocation(n,"verticesTex"),3),e.uniform1i(e.raw.getUniformLocation(n,"normalsTex"),4),e.uniform1i(e.raw.getUniformLocation(n,"materialsTex"),5),e.uniform1i(e.raw.getUniformLocation(n,"transformsTex"),6),e.uniform1i(e.raw.getUniformLocation(n,"lightsTex"),7),e.uniform1i(e.raw.getUniformLocation(n,"textureMapsArrayTex"),8),e.uniform1i(e.raw.getUniformLocation(n,"envMapTex"),9),e.uniform1i(e.raw.getUniformLocation(n,"envMapCDFTex"),10),e.uniform1i(e.raw.getUniformLocation(n,"thinFilmLutTex"),11),e.uniform1i(e.raw.getUniformLocation(n,"envMapIrradianceTex"),20),this.pathTraceShader&&this.proceduralMaterials.bindTextures(e.raw,this.pathTraceShader.getObject()),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),n=this.pathTraceShaderLowRes.getObject(),t.envMap&&(e.uniform2f(e.raw.getUniformLocation(n,"envMapRes"),t.envMap.width,t.envMap.height),e.uniform1f(e.raw.getUniformLocation(n,"envMapTotalSum"),t.envMap.totalSum)),e.uniform1i(e.raw.getUniformLocation(n,"topBVHIndex"),t.topLevelIndex),e.uniform2f(e.raw.getUniformLocation(n,"resolution"),this.renderSize.x,this.renderSize.y),e.uniform1i(e.raw.getUniformLocation(n,"numOfLights"),t.lights.length),e.uniform1i(e.raw.getUniformLocation(n,"accumTexture"),0),e.uniform1i(e.raw.getUniformLocation(n,"BVH"),1),e.uniform1i(e.raw.getUniformLocation(n,"vertexIndicesTex"),2),e.uniform1i(e.raw.getUniformLocation(n,"verticesTex"),3),e.uniform1i(e.raw.getUniformLocation(n,"normalsTex"),4),e.uniform1i(e.raw.getUniformLocation(n,"materialsTex"),5),e.uniform1i(e.raw.getUniformLocation(n,"transformsTex"),6),e.uniform1i(e.raw.getUniformLocation(n,"lightsTex"),7),e.uniform1i(e.raw.getUniformLocation(n,"textureMapsArrayTex"),8),e.uniform1i(e.raw.getUniformLocation(n,"envMapTex"),9),e.uniform1i(e.raw.getUniformLocation(n,"envMapCDFTex"),10),e.uniform1i(e.raw.getUniformLocation(n,"thinFilmLutTex"),11),e.uniform1i(e.raw.getUniformLocation(n,"envMapIrradianceTex"),20),this.pathTraceShaderLowRes&&this.proceduralMaterials.bindTextures(e.raw,this.pathTraceShaderLowRes.getObject()),this.pathTraceShaderLowRes.stopUsing()}get scene(){return this._scene}async initAsync(){await super.initAsync(),this.initGPUDataBuffers(),await this.finalizePathTraceShadersAsync()}async resizeRendererAsync(){await super.resizeRendererAsync(),this.initGPUDataBuffers(),await this.finalizePathTraceShadersAsync()}async reloadShadersAsync(){await super.reloadShadersAsync(),await this.finalizePathTraceShadersAsync()}static buildThinFilmLut(e,t,n=1.5,i=1.5){let a=[700,546,436],o=2*Math.PI,c=new Float32Array(e*t*3);function u(h,d,f){let p=Math.sqrt(Math.max(0,1-h*h)),x=d/f*p;if(x>=1)return 1;let m=Math.sqrt(Math.max(0,1-x*x)),g=(d*h-f*m)/(d*h+f*m),_=(f*h-d*m)/(f*h+d*m);return .5*(g*g+_*_)}for(let h=0;h<t;h++)for(let d=0;d<e;d++){let f=(d+.5)/e,p=(h+.5)/t*1200,x=(h*e+d)*3,g=Math.sqrt(Math.max(0,1-f*f))*1/n,_=Math.sqrt(Math.max(0,1-g*g)),y=u(f,1,n),b=1-y,v=u(_,n,i);for(let M=0;M<3;M++){let T=a[M],w=o*n*p*_/T,C=1-y*v*Math.cos(2*w),A=y*y+b*b*v+2*y*b*v*Math.cos(w);c[x+M]=Math.max(0,Math.min(1,A/Math.max(C,1e-5)))}}return c}initGPUDataBuffers(){let e=this.gl;this.envMapRadianceMips=1;let t=(a,o,c)=>{let u=this.canFilterFloatTextures();if(e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.REPEAT),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.REPEAT),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,u?e.raw.LINEAR:e.raw.NEAREST),c&&u){e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.LINEAR_MIPMAP_LINEAR);let h=a,d=o,f=c,p=0;for(;e.texImage2D(e.raw.TEXTURE_2D,p,e.raw.RGB32F,h,d,0,e.raw.RGB,e.raw.FLOAT,f),!(h===1&&d===1);){let x=Math.max(1,h>>1),m=Math.max(1,d>>1);f=l.downsampleRgbFloat(f,h,d,x,m),h=x,d=m,p++}return p+1}return e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGB32F,a,o,0,e.raw.RGB,e.raw.FLOAT,c),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,u?e.raw.LINEAR:e.raw.NEAREST),1};e.pixelStorei(e.raw.PACK_ALIGNMENT,1);let n=this.scene.bvhData();this.BVHTex=this.createBufferTexture(n,3);let i=this.scene.vertIndicesData();this.vertexIndicesTex=this.createBufferTextureInt(i,3);let r=this.scene.verticesData();this.verticesTex=this.createBufferTexture(r,4);let s=this.scene.normalsData();this.normalsTex=this.createBufferTexture(s,4);{let a=this.scene.materialsData();this.materialsTex=this.createBufferTexture(a,4)}{let a=this.scene.transformsData();this.transformsTex=this.createBufferTexture(a,4)}if(this.scene.lights.length>0){let a=this.scene.lightsData();this.lightsTex=this.createBufferTexture(a,3)}if(this.scene.textures.length>0||this.scene.textureMapsArray?.length>0){let a=this.scene.textureMapsArray;this.textureMapsArrayTex=this.createBufferTextureUint(a,4)}if(this.scene.envMap){let a=this.scene.envMap;this.envMapTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapTex),this.envMapRadianceMips=t(a.width,a.height,a.img),e.bindTexture(e.raw.TEXTURE_2D,null),this.envMapCDFTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapCDFTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.R32F,a.width,a.height,0,e.raw.RED,e.raw.FLOAT,a.cdf),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.bindTexture(e.raw.TEXTURE_2D,null)}e.activeTexture(e.raw.TEXTURE1),e.bindTexture(e.raw.TEXTURE_2D,this.BVHTex),e.activeTexture(e.raw.TEXTURE2),e.bindTexture(e.raw.TEXTURE_2D,this.vertexIndicesTex),e.activeTexture(e.raw.TEXTURE3),e.bindTexture(e.raw.TEXTURE_2D,this.verticesTex),e.activeTexture(e.raw.TEXTURE4),e.bindTexture(e.raw.TEXTURE_2D,this.normalsTex),e.activeTexture(e.raw.TEXTURE5),e.bindTexture(e.raw.TEXTURE_2D,this.materialsTex),e.activeTexture(e.raw.TEXTURE6),e.bindTexture(e.raw.TEXTURE_2D,this.transformsTex),e.activeTexture(e.raw.TEXTURE7),e.bindTexture(e.raw.TEXTURE_2D,this.lightsTex),e.activeTexture(e.raw.TEXTURE8),e.bindTexture(e.raw.TEXTURE_2D,this.textureMapsArrayTex),e.activeTexture(e.raw.TEXTURE9),e.bindTexture(e.raw.TEXTURE_2D,this.envMapTex),e.activeTexture(e.raw.TEXTURE10),e.bindTexture(e.raw.TEXTURE_2D,this.envMapCDFTex);{let o=l.buildThinFilmLut(64,64);this.thinFilmLutTex&&e.deleteTexture(this.thinFilmLutTex),this.thinFilmLutTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.thinFilmLutTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGB32F,64,64,0,e.raw.RGB,e.raw.FLOAT,o),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.LINEAR),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.LINEAR),e.bindTexture(e.raw.TEXTURE_2D,null),e.activeTexture(e.raw.TEXTURE11),e.bindTexture(e.raw.TEXTURE_2D,this.thinFilmLutTex)}this.proceduralMaterials.uploadTexturesAsync(e.raw);{let a=this.scene.envMapIrradiance;a?.img?(this.envMapIrradianceTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapIrradianceTex),t(a.width,a.height,a.img),e.bindTexture(e.raw.TEXTURE_2D,null)):this.envMapIrradianceTex=this.envMapTex,e.activeTexture(e.raw.TEXTURE20),e.bindTexture(e.raw.TEXTURE_2D,this.envMapIrradianceTex)}e.activeTexture(e.raw.TEXTURE0)}canFilterFloatTextures(){if(this.floatLinearSupport!==null)return this.floatLinearSupport;let e=this.gl.raw;return this.floatLinearSupport=e.getExtension("OES_texture_float_linear")!==null,this.floatLinearSupport}static downsampleRgbFloat(e,t,n,i,r){let s=new Float32Array(i*r*3);for(let a=0;a<r;a++){let o=Math.min(a*2,n-1),c=Math.min(a*2+1,n-1);for(let u=0;u<i;u++){let h=Math.min(u*2,t-1),d=Math.min(u*2+1,t-1),f=(o*t+h)*3,p=(o*t+d)*3,x=(c*t+h)*3,m=(c*t+d)*3,g=(a*i+u)*3;for(let _=0;_<3;_++)s[g+_]=.25*(e[f+_]+e[p+_]+e[x+_]+e[m+_])}}return s}render(){let e=this.gl;if(!(!this.scene.dirty&&this.scene.renderOptions.maxSpp!==-1&&this.sampleCounter>=this.scene.renderOptions.maxSpp)){if(e.activeTexture(e.raw.TEXTURE0),this.scene.dirty)e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),this.pathTraceShaderLowRes.use(),e.uniform1i(e.raw.getUniformLocation(this.pathTraceShaderLowRes.getObject(),"uLowRes"),1),this.quad.draw(this.pathTraceShaderLowRes),this.scene.instancesModified=!1,this.scene.dirty=!1,this.scene.envMapModified=!1;else{let t=[],n=0,i=0;e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBO),e.viewport(0,0,this.tileWidth,this.tileHeight),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),n=performance.now(),this.pathTraceShader.use(),e.uniform1i(e.raw.getUniformLocation(this.pathTraceShader.getObject(),"uLowRes"),0),this.quad.draw(this.pathTraceShader),i=performance.now(),t.push(`pathTraceShader: Render time: ${(i-n).toFixed(2)} ms`),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.accumFBO),e.viewport(this.tileWidth*this.tile.x,this.tileHeight*this.tile.y,this.tileWidth,this.tileHeight),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTexture),n=performance.now(),this.quad.draw(this.outputShader),i=performance.now(),t.push(`outputShader: Render time: ${(i-n).toFixed(2)} ms`),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.tileOutputTexture[this.currentBuffer],0),e.viewport(0,0,this.renderSize.x,this.renderSize.y),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),n=performance.now(),this.quad.draw(this.tonemapShader??this.outputShader),i=performance.now(),t.push(`tonemapShader: Render time: ${(i-n).toFixed(2)} ms`),console.info(t.join(`
`))}e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),this.scene.dirty||this.sampleCounter===1?(e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),this.quad.draw(this.tonemapShader??this.outputShader)):(this.scene.renderOptions.enableDenoiser&&this.denoiserExecutedOneTime&&this.denoiserTexture?e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture):e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[1-this.currentBuffer]),this.quad.draw(this.outputShader))}async update(e,t){let n=this.gl,i=this.scene,r=i.renderOptions.materialxGeneratorType==="essl";if(!i.dirty&&i.renderOptions.maxSpp!==-1&&this.sampleCounter>=i.renderOptions.maxSpp)return;if(i.instancesModified){console.log("Updating GPU buffers for modified instances...");let a=this.scene.transformsData(),o=a.length/4,c=Math.min($t.maxBufferTextureWidth,o),u=Math.ceil(o/c);n.bindTexture(n.raw.TEXTURE_2D,this.transformsTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGBA32F,c,u,0,n.raw.RGBA,n.raw.FLOAT,a);let h=this.scene.materialsData(),d=h.length/4,f=Math.min($t.maxBufferTextureWidth,d),p=Math.ceil(d/f);n.bindTexture(n.raw.TEXTURE_2D,this.materialsTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGBA32F,f,p,0,n.raw.RGBA,n.raw.FLOAT,h)}if(i.envMapModified&&i.envMap){let a=i.envMap;if(this.envMapTex){n.bindTexture(n.raw.TEXTURE_2D,this.envMapTex);let c=this.canFilterFloatTextures();if(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_S,n.raw.REPEAT),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_T,n.raw.REPEAT),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,c?n.raw.LINEAR:n.raw.NEAREST),a.img&&c){n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR);let u=a.width,h=a.height,d=a.img,f=0;for(;n.texImage2D(n.raw.TEXTURE_2D,f,n.raw.RGB32F,u,h,0,n.raw.RGB,n.raw.FLOAT,d),!(u===1&&h===1);){let p=Math.max(1,u>>1),x=Math.max(1,h>>1);d=l.downsampleRgbFloat(d,u,h,p,x),u=p,h=x,f++}this.envMapRadianceMips=f+1}else n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGB32F,a.width,a.height,0,n.raw.RGB,n.raw.FLOAT,a.img),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,c?n.raw.LINEAR:n.raw.NEAREST),this.envMapRadianceMips=1}this.envMapCDFTex&&(n.bindTexture(n.raw.TEXTURE_2D,this.envMapCDFTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.R32F,a.width,a.height,0,n.raw.RED,n.raw.FLOAT,a.cdf));let o;this.pathTraceShader&&this.pathTraceShaderLowRes&&(this.pathTraceShader.use(),o=this.pathTraceShader.getObject(),n.uniform2f(n.raw.getUniformLocation(o,"envMapRes"),i.envMap.width,i.envMap.height),n.uniform1f(n.raw.getUniformLocation(o,"envMapTotalSum"),i.envMap.totalSum),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),o=this.pathTraceShaderLowRes.getObject(),n.uniform2f(n.raw.getUniformLocation(o,"envMapRes"),i.envMap.width,i.envMap.height),n.uniform1f(n.raw.getUniformLocation(o,"envMapTotalSum"),i.envMap.totalSum),this.pathTraceShaderLowRes.stopUsing())}if(i.renderOptions.enableDenoiser&&this.sampleCounter>1&&this.backendReady&&this.denoiser){if(!this.denoised||this.frameCounter%(i.renderOptions.denoiserFrameCnt*(this.numTiles.x*this.numTiles.y))==0){if(this._denoiserRunning)return;this._denoiserRunning=!0;try{if(!this.denoiserFBO||!this.tileOutputTexture[1-this.currentBuffer]){console.warn("Denoiser: FBO ou texture de sortie non initialis\xE9e."),this._denoiserRunning=!1;return}(this.denoiserInputFramePtr===null||this.denoiserInputFramePtr.length!==this._renderSize.x*this._renderSize.y*4)&&(this.denoiserInputFramePtr=new Float32Array(this._renderSize.x*this._renderSize.y*4)),n.bindFramebuffer(n.raw.FRAMEBUFFER,this.denoiserFBO),n.framebufferTexture2D(n.raw.FRAMEBUFFER,n.raw.COLOR_ATTACHMENT0,n.raw.TEXTURE_2D,this.tileOutputTexture[1-this.currentBuffer],0),n.raw.readPixels(0,0,this._renderSize.x,this._renderSize.y,n.raw.RGBA,n.raw.FLOAT,this.denoiserInputFramePtr);for(let a=0;a<this.denoiserInputFramePtr.length;a++){let o=this.denoiserInputFramePtr[a];(!Number.isFinite(o)||isNaN(o))&&(o=0),this.denoiserInputFramePtr[a]=Math.min(Math.max(o,0),1)}this.denoised=!0,this.denoiser.width=this._renderSize.x,this.denoiser.height=this._renderSize.y,await this.denoiser.setInputData("color",this.denoiserInputFramePtr),await this.denoiser.execute()}catch(a){this.denoised=!1,console.error("Erreur denoiser:",a)}finally{this._denoiserRunning=!1}}}else this.denoised=!1;if(i.dirty){if(et.profiling){let a=P.document.getElementById("bufferA");a?.replaceChildren(),a=P.document.getElementById("bufferB"),a?.replaceChildren(),a=P.document.getElementById("bufferC"),a?.replaceChildren(),a=P.document.getElementById("bufferD"),a?.replaceChildren(),a=P.document.getElementById("image"),a?.replaceChildren()}if(this.tile.x=-1,this.tile.y=this.numTiles.y-1,this.sampleCounter=1,this.denoised=!1,this.frameCounter=1,i.renderOptions.enableDenoiser&&this.denoiser){try{this.denoiser.abort()}catch(a){console.warn("Erreur lors de l'abandon du denoiser:",a)}this.denoiserExecutedOneTime=!1,this.denoised=!1}this.accumFBO&&(n.bindFramebuffer(n.raw.FRAMEBUFFER,this.accumFBO),n.clear(n.raw.COLOR_BUFFER_BIT),n.bindFramebuffer(n.raw.FRAMEBUFFER,null))}else et.profiling&&this.sampleCounter<=4&&this.frameCounter>1&&(this.exportTextureToImage(this.pathTraceTexture,this.tileWidth,this.tileHeight,"bufferB"),this.exportTextureToImage(this.accumTexture,this.renderSize.x,this.renderSize.y,"bufferC"),this.exportTextureToImage(this.tileOutputTexture[this.currentBuffer],this.renderSize.x,this.renderSize.y,"bufferD"),this.exportTextureToImage(this.tileOutputTexture[1-this.currentBuffer],this.renderSize.x,this.renderSize.y,"image")),r?(this.frameCounter=1,this.sampleCounter=1,this.tile.x=0,this.tile.y=this.numTiles.y-1):(this.frameCounter++,this.tile.x++,this.tile.x>=this.numTiles.x&&(this.tile.x=0,this.tile.y--,this.tile.y<0&&(this.tile.x=0,this.tile.y=this.numTiles.y-1,this.sampleCounter++,this.currentBuffer=1-this.currentBuffer)));let s;return this.pathTraceShader.use(),s=this.pathTraceShader.getObject(),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.right"),i.camera.right.x,i.camera.right.y,i.camera.right.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.up"),i.camera.up.x,i.camera.up.y,i.camera.up.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.forward"),i.camera.forward.x,i.camera.forward.y,i.camera.forward.z),n.uniform1f(n.raw.getUniformLocation(s,"camera.fov"),i.camera.fov),n.uniform1f(n.raw.getUniformLocation(s,"camera.focalDist"),i.camera.focalDist),n.uniform1f(n.raw.getUniformLocation(s,"camera.aperture"),i.camera.aperture),n.uniform1i(n.raw.getUniformLocation(s,"enableEnvMap"),i.envMap!==null&&i.renderOptions.enableEnvMap?1:0),n.uniform1f(n.raw.getUniformLocation(s,"envMapIntensity"),i.renderOptions.envMapIntensity),n.uniform1f(n.raw.getUniformLocation(s,"envMapRot"),i.renderOptions.envMapRot/360),n.uniform1i(n.raw.getUniformLocation(s,"u_envRadianceMips"),this.envMapRadianceMips),n.uniform1i(n.raw.getUniformLocation(s,"maxDepth"),i.dirty?2:i.renderOptions.maxDepth),n.uniform2f(n.raw.getUniformLocation(s,"tileOffset"),this.tile.x*this.invNumTiles.x,this.tile.y*this.invNumTiles.y),n.uniform3f(n.raw.getUniformLocation(s,"uniformLightCol"),i.renderOptions.uniformLightCol.x,i.renderOptions.uniformLightCol.y,i.renderOptions.uniformLightCol.z),n.uniform1f(n.raw.getUniformLocation(s,"roughnessMollificationAmt"),i.renderOptions.roughnessMollificationAmt),n.uniform1i(n.raw.getUniformLocation(s,"frameNum"),this.frameCounter),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),s=this.pathTraceShaderLowRes.getObject(),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.right"),i.camera.right.x,i.camera.right.y,i.camera.right.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.up"),i.camera.up.x,i.camera.up.y,i.camera.up.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.forward"),i.camera.forward.x,i.camera.forward.y,i.camera.forward.z),n.uniform1f(n.raw.getUniformLocation(s,"camera.fov"),i.camera.fov),n.uniform1f(n.raw.getUniformLocation(s,"camera.focalDist"),i.camera.focalDist),n.uniform1f(n.raw.getUniformLocation(s,"camera.aperture"),i.camera.aperture),n.uniform1i(n.raw.getUniformLocation(s,"enableEnvMap"),i.envMap!==null&&i.renderOptions.enableEnvMap?1:0),n.uniform1f(n.raw.getUniformLocation(s,"envMapIntensity"),i.renderOptions.envMapIntensity),n.uniform1f(n.raw.getUniformLocation(s,"envMapRot"),i.renderOptions.envMapRot/360),n.uniform1i(n.raw.getUniformLocation(s,"u_envRadianceMips"),this.envMapRadianceMips),n.uniform1i(n.raw.getUniformLocation(s,"maxDepth"),i.renderOptions.maxDepth),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"uniformLightCol"),i.renderOptions.uniformLightCol.x,i.renderOptions.uniformLightCol.y,i.renderOptions.uniformLightCol.z),n.uniform1f(n.raw.getUniformLocation(s,"roughnessMollificationAmt"),i.renderOptions.roughnessMollificationAmt),this.pathTraceShaderLowRes.stopUsing(),await this.ensureTonemapShaderAsync(),this.tonemapShader&&(this.tonemapShader.use(),s=this.tonemapShader.getObject(),n.uniform1f(n.raw.getUniformLocation(s,"invSampleCounter"),1/this.sampleCounter),n.uniform1i(n.raw.getUniformLocation(s,"enableTonemap"),i.renderOptions.enableTonemap?1:0),n.uniform1i(n.raw.getUniformLocation(s,"enableAces"),i.renderOptions.enableAces?1:0),n.uniform1i(n.raw.getUniformLocation(s,"simpleAcesFit"),i.renderOptions.simpleAcesFit?1:0),n.uniform3f(n.raw.getUniformLocation(s,"backgroundCol"),i.renderOptions.backgroundCol.x,i.renderOptions.backgroundCol.y,i.renderOptions.backgroundCol.z),this.tonemapShader.stopUsing()),Promise.resolve()}};var dr=class extends Yt{constructor(e){super(e)}resolvePixelRatio(){return 1}render(){let e=this.gl;!this.scene.dirty||!this.pathTraceShaderLowRes||(e.activeTexture(e.raw.TEXTURE0),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),this.quad.draw(this.pathTraceShaderLowRes),this.scene.instancesModified=!1,this.scene.dirty=!1,this.scene.envMapModified=!1,e.bindFramebuffer(e.raw.FRAMEBUFFER,null))}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),this.quad.draw(this.tonemapShader??this.outputShader)}};var Fn=class extends $t{constructor(e){super(e)}dispose(){super.dispose();let e=this.gl;for(let t of this.scene.shadertoyShader.buffers){for(let n of t.textures)e.deleteTexture(n);for(let n of t.inputs)n.texture&&e.deleteTexture(n.texture)}this.scene.shadertoyShader.imageTexture=null;for(let t of this.scene.shadertoyShader.buffers)for(let n of t.fbos)e.deleteFramebuffer(n);for(let t of this.scene.shadertoyShader.buffers)t.shader.dispose(),t.shader=null,t.playNode&&(t.playNode.stop(),t.playNode=null)}pauseOrContinue(e){for(let t of this.scene.shadertoyShader.buffers){fn.pauseOrContinue(t,e);for(let n of t.inputs)be.pauseOrContinue(n,e)}}initFBOs(){super.initFBOs_(this.scene.shadertoyShader.isGlslPathtracer);let e=this.gl;this.frameCounter=0;for(let t=0;t<this.scene.shadertoyShader.buffers.length;t++){let n=this.scene.shadertoyShader.buffers[t],i=n.inputs.some(c=>c.type===n.type);for(let c=0;c<n.inputs.length;c++){let u=n.inputs[c];u.type==="bufferA"||u.type==="bufferB"||u.type==="bufferC"||u.type==="bufferD"||u.type==="cubeA"?u.buffer=this.scene.shadertoyShader.buffers.find(h=>h.type===u.type):u.texture=be.createTexture(u)}let r=i,s=!1,a=this.renderSize,o=this.renderSize;this.scene.shadertoyShader.isGlslPathtracer&&(n.type==="bufferB"&&(r=!0,a=new re(this.tileWidth,this.tileHeight),o=new re(Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio))),n.type==="bufferD"&&(r=!0,s=!0)),fn.createFBOAndTexture(n,r,s,a,o)}this.scene.shadertoyShader.imageTexture=this.scene.shadertoyShader.buffers.find(t=>t.type==="image").textures[0],this.scene.shadertoyShader.isGlslPathtracer&&(this.scene.shadertoyShader.pathTraceTextures=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferB").textures,this.scene.shadertoyShader.accumFramebuffers=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferC").fbos,this.scene.shadertoyShader.tileOutputTextures=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferD").textures),this.denoised&&(this.denoiserFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.denoiserFBO)),this.outputFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}disposeShaders(){super.disposeShaders();for(let e of this.scene.shadertoyShader.buffers)e.shader.dispose(),e.shader=null}async initShadersAsync(){Si("shadertoy",this.scene.sceneName||"unknown"),await super.initShadersAsync();let e=this.gl,t=this.scene,[n,i,r,s]=await Promise.all([pe.loadAsync(this.shadersDirectory+"shadertoy/vertex.glsl"),pe.loadAsync(this.shadersDirectory+"shadertoy/fragment.glsl"),pe.loadAsync(this.shadersDirectory+"shadertoy/cubeA.glsl"),pe.loadAsync(this.shadersDirectory+"shadertoy/sound.glsl")]),a=this.scene.shadertoyShader.commonCode||"",o="";for(let u=0;u<this.scene.shadertoyShader.buffers.length;u++){let h=this.scene.shadertoyShader.buffers[u],d=[];for(let p=0;p<5;p++){let x=h.inputs.find(m=>m.channel===p);x?x.type==="cubemap"||x.type==="cubeA"?d.push(`uniform samplerCube iChannel${x.channel};`):x.type==="volume"?d.push(`uniform sampler3D iChannel${x.channel};`):d.push(`uniform sampler2D iChannel${x.channel};`):d.push(`uniform sampler2D iChannel${p};`)}let f;if(h.type==="cubeA"){let p={src:r.src,path:r.path,dump:r.dump};p.src=p.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",o+(a+h.code)),p.path=h.type+".glsl",f=this.loadShaders(n,p)}else if(h.type==="sound"){let p={src:s.src,path:s.path,dump:r.dump};p.src=p.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",o+(a+h.code)),p.path=h.type+".glsl",f=this.loadShaders(n,p)}else{let p={src:i.src,path:i.path,dump:i.dump};p.src=p.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",o+(a+h.code)),p.path=h.type+".glsl",f=this.loadShaders(n,p)}h.shader=f}let c=await Promise.all(this.programs.map(u=>(console.log("Linking program..."),u.waitForLinkAsync(this.scene.renderOptions.forceSynchronousShaderLink))));await Ei(),console.log(),this.emitSceneStage("launch","Lancement du rendu");for(let u of this.scene.shadertoyShader.buffers){let h=u.shader,d=new Date,f=[d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()*60*60+d.getMinutes()*60+d.getSeconds()+d.getMilliseconds()/1e3],p=[this.renderSize.x,this.renderSize.y];u.type==="cubeA"&&(p=[u.xres,u.yres]),h.use();let x=h.getObject();e.uniform1i(e.raw.getUniformLocation(x,"iChannel0"),0),e.uniform1i(e.raw.getUniformLocation(x,"iChannel1"),1),e.uniform1i(e.raw.getUniformLocation(x,"iChannel2"),2),e.uniform1i(e.raw.getUniformLocation(x,"iChannel3"),3),e.uniform1i(e.raw.getUniformLocation(x,"iChannel4"),4),e.uniform1f(e.raw.getUniformLocation(x,"iFrameRate"),60),e.uniform4fv(e.raw.getUniformLocation(x,"iDate"),f),e.uniform3f(e.raw.getUniformLocation(x,"iResolution"),p[0],p[1],1);let m=[0,0,0,0,0,0,0,0,0,0,0,0];u.inputs.sort((g,_)=>g.channel-_.channel).forEach((g,_)=>{g.type==="cubeA"||g.type==="texture"||g.type==="volume"||g.type==="cubemap"||g.type==="floats"?(m[g.channel*3+0]=g.xres,m[g.channel*3+1]=g.yres,m[g.channel*3+2]=1):(m[g.channel*3+0]=this.renderSize.x,m[g.channel*3+1]=this.renderSize.y,m[g.channel*3+2]=1)}),e.uniform3fv(e.raw.getUniformLocation(x,"iChannelResolution"),m),u.type==="cubeA"?e.uniform4fv(e.raw.getUniformLocation(x,"unViewport"),[0,0,u.xres,u.yres]):u.type=="sound"&&(e.uniform3fv(e.raw.getUniformLocation(x,"iChannelTime"),[0,0,0,0]),e.uniform1f(e.raw.getUniformLocation(x,"iSampleRate"),Oe.instance().sampleRate)),this.scene.shadertoyShader.isGlslPathtracer&&u.type==="bufferB"&&e.uniform2f(e.raw.getUniformLocation(x,"invNumTiles"),this.invNumTiles.x,this.invNumTiles.y),h.stopUsing()}}get scene(){return this._scene}render(){let e=this.gl;if(!this.scene.dirty&&this.scene.renderOptions.maxSpp!==-1&&this.sampleCounter>=this.scene.renderOptions.maxSpp)return;e.activeTexture(e.raw.TEXTURE0);for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];if(i.type!=="sound")continue;if(i.soundCompiled)break;e.activeTexture(e.raw.TEXTURE0);let r=i.fbos.length>1;i.frontIndex=r&&i.flip?1:0,e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),e.viewport(0,0,i.xres,i.yres);for(let s=0;s<i.inputs.length;s++){let a=i.inputs[s];be.bindTexture(a,a.buffer===i)}i.shader.use(),fn.drawBuffer(i,i.shader.getObject()),i.shader.stopUsing();for(let s=0;s<i.inputs.length;s++){let a=i.inputs[s];be.unbindTexture(a)}}let t=[];for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];if(i.type==="sound")continue;let r=i.fbos.length>1||i.type==="cubeA";if(i.frontIndex=r&&i.flip?1:0,i.type==="cubeA"){let s=0,a=i.shader.getObject(),o=e.getAttribLocation(a,"pos");for(let c=0;c<6;c++){e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),e.viewport(0,0,i.xres,i.yres),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_CUBE_MAP_POSITIVE_X+c,i.textures[i.frontIndex],0);for(let _=0;_<i.inputs.length;_++){let y=i.inputs[_];be.bindTexture(y,y.buffer===i)}let u=[],h=[],d=[],f=[],p=[0,0,0];c===0?(u=[1,1,1],h=[1,1,-1],d=[1,-1,-1],f=[1,-1,1]):c===1?(u=[-1,1,-1],h=[-1,1,1],d=[-1,-1,1],f=[-1,-1,-1]):c===2?(u=[-1,1,-1],h=[1,1,-1],d=[1,1,1],f=[-1,1,1]):c===3?(u=[-1,-1,1],h=[1,-1,1],d=[1,-1,-1],f=[-1,-1,-1]):c===4?(u=[-1,1,1],h=[1,1,1],d=[1,-1,1],f=[-1,-1,1]):c===5&&(u=[1,1,-1],h=[-1,1,-1],d=[-1,-1,-1],f=[1,-1,-1]);let x=[u[0],u[1],u[2],h[0],h[1],h[2],d[0],d[1],d[2],f[0],f[1],f[2],p[0],p[1],p[2]],m=performance.now();i.shader.use(),e.uniform3fv(e.raw.getUniformLocation(a,"unCorners"),x),e.drawUnitQuad_XY(o),i.shader.stopUsing();let g=performance.now();s+=g-m;for(let _=0;_<i.inputs.length;_++){let y=i.inputs[_];be.unbindTexture(y)}}t.push(`${i.type}: Render time: ${(s/6).toFixed(2)} ms`)}else{let s=!1;if(this.scene.shadertoyShader.isGlslPathtracer&&i.type==="bufferB"&&(e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[this.scene.dirty?1:0]),s=!0),s||e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),this.scene.shadertoyShader.isGlslPathtracer&&i.type==="bufferD"&&e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.scene.shadertoyShader.tileOutputTextures[this.scene.dirty?0:this.currentBuffer],0),s=!1,this.scene.shadertoyShader.isGlslPathtracer&&(i.type==="bufferB"&&(this.scene.dirty?e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)):e.viewport(0,0,this.tileWidth,this.tileHeight),s=!0),i.type==="bufferC"&&!this.scene.dirty&&(e.viewport(this.tileWidth*this.tile.x,this.tileHeight*this.tile.y,this.tileWidth,this.tileHeight),s=!0)),s||e.viewport(0,0,this.renderSize.x,this.renderSize.y),s=!1,this.scene.shadertoyShader.isGlslPathtracer&&(i.type==="bufferC"&&(s=!0,e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.pathTraceTextures[this.scene.dirty?1:0])),i.type==="image"&&(s=!0,e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.tileOutputTextures[this.scene.dirty?0:1-this.currentBuffer]))),!s)for(let c=0;c<i.inputs.length;c++){let u=i.inputs[c];be.bindTexture(u,u.buffer===i)}let a=performance.now();this.quad.draw(i.shader);let o=performance.now();t.push(`${i.type}: Render time: ${(o-a).toFixed(2)} ms`);for(let c=0;c<i.inputs.length;c++){let u=i.inputs[c];be.unbindTexture(u)}}}for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];i.flip=!i.flip}St.instance().eraseKeypresses(),console.info(t.join(`
`)),this.scene.dirty&&(this.scene.dirty=!1),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.imageTexture),this.quad.draw(this.outputShader)}update(e,t){let n=this.gl,i=this.scene;if(!(!i.dirty&&i.renderOptions.maxSpp!==-1&&this.sampleCounter>=i.renderOptions.maxSpp)){if(i.dirty){if(et.profiling){let r=P.document.getElementById("bufferA");r?.replaceChildren(),r=P.document.getElementById("bufferB"),r?.replaceChildren(),r=P.document.getElementById("bufferC"),r?.replaceChildren(),r=P.document.getElementById("bufferD"),r?.replaceChildren(),r=P.document.getElementById("image"),r?.replaceChildren()}this.tile.x=-1,this.tile.y=this.numTiles.y-1,this.sampleCounter=1,this.denoised=!1,this.frameCounter=0,i.shadertoyShader?.isGlslPathtracer&&(n.bindFramebuffer(n.raw.FRAMEBUFFER,i.shadertoyShader.accumFramebuffers[0]),n.clear(n.raw.COLOR_BUFFER_BIT),n.bindFramebuffer(n.raw.FRAMEBUFFER,null))}else et.profiling&&i.shadertoyShader?.isGlslPathtracer&&this.sampleCounter<=4&&(this.exportTextureToImage(i.shadertoyShader.buffers.find(r=>r.type==="bufferA").textures[0],this.renderSize.x,this.renderSize.y,"bufferA"),this.exportTextureToImage(i.shadertoyShader.buffers.find(r=>r.type==="bufferB").textures[0],this.tileWidth,this.tileHeight,"bufferB"),i.shadertoyShader.buffers.find(r=>r.type==="bufferB").textures.length>1&&this.exportTextureToImage(i.shadertoyShader.buffers.find(r=>r.type==="bufferB").textures[1],this.tileWidth,this.tileHeight,"bufferB"),this.exportTextureToImage(i.shadertoyShader.buffers.find(r=>r.type==="bufferC").textures[0],this.renderSize.x,this.renderSize.y,"bufferC"),this.exportTextureToImage(i.shadertoyShader.buffers.find(r=>r.type==="bufferD").textures[this.currentBuffer],this.renderSize.x,this.renderSize.y,"bufferD"),this.exportTextureToImage(i.shadertoyShader.buffers.find(r=>r.type==="bufferD").textures[1-this.currentBuffer],this.renderSize.x,this.renderSize.y,"image")),this.frameCounter++,this.tile.x++,this.tile.x>=this.numTiles.x&&(this.tile.x=0,this.tile.y--,this.tile.y<0&&(this.tile.x=0,this.tile.y=this.numTiles.y-1,this.sampleCounter++,this.currentBuffer=1-this.currentBuffer));for(let r=0;r<i.shadertoyShader.buffers.length;r++){let s=i.shadertoyShader.buffers[r];s.shader.use();let a=s.shader.getObject();n.uniform1f(n.raw.getUniformLocation(a,"iTime"),e),n.uniform1f(n.raw.getUniformLocation(a,"iTimeDelta"),t),n.uniform1i(n.raw.getUniformLocation(a,"iFrame"),this.frameCounter),n.uniform4f(n.raw.getUniformLocation(a,"iMouse"),te.movePosition.x,te.movePosition.y,te.downPosition.x,te.downPosition.y),i.shadertoyShader.isGlslPathtracer&&(s.type==="bufferB"?(n.raw.uniform1i(n.raw.getUniformLocation(a,"dirty"),i.dirty?1:0),n.uniform2f(n.raw.getUniformLocation(a,"tileOffset"),i.dirty?0:this.tile.x*this.invNumTiles.x,i.dirty?0:this.tile.y*this.invNumTiles.y)):s.type==="bufferD"&&n.uniform1f(n.raw.getUniformLocation(a,"invSampleCounter"),i.dirty?1:1/this.sampleCounter)),s.shader.stopUsing()}}}};var Y=class l{pmin;pmax;constructor(e,t){if(e===void 0&&t===void 0)this.pmin=new E(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),this.pmax=new E(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);else if(e!==void 0&&t===void 0)this.pmin=e.clone(),this.pmax=e.clone();else if(e!==void 0&&t!==void 0)this.pmin=E.min(e,t),this.pmax=E.max(e,t);else throw new Error("Invalid constructor arguments")}clone(){return new l(this.pmin.clone(),this.pmax.clone())}center(){return this.pmin.add(this.pmax).scale(.5)}extents(){return this.pmax.subtract(this.pmin)}surfaceArea(){let e=this.extents();return 2*(e.x*e.y+e.x*e.z+e.y*e.z)}grow(e){e instanceof E?(this.pmin=E.min(this.pmin,e),this.pmax=E.max(this.pmax,e)):e instanceof l&&(this.pmin=E.min(this.pmin,e.pmin),this.pmax=E.max(this.pmax,e.pmax))}contains(e){let t=this.extents().scale(.5);return Math.abs(this.center().x-e.x)<=t.x&&Math.abs(this.center().y-e.y)<=t.y&&Math.abs(this.center().z-e.z)<=t.z}maxdim(){let e=this.extents();return e.x>=e.y&&e.x>=e.z?0:e.y>=e.x&&e.y>=e.z?1:e.z>=e.x&&e.z>=e.y?2:0}get(e){if(e===0)return this.pmin;if(e===1)return this.pmax;throw new Error("Index out of bounds")}};function Rl(l,e){return new Y(E.min(l.pmin,e.pmin),E.max(l.pmax,e.pmax))}function Cl(l,e){return new Y(E.max(l.pmin,e.pmin),E.min(l.pmax,e.pmax))}var Un=class{type=0;bounds=new Y;index=0;startidx=null;numprims=null;lc=null;rc=null};function uu(l){return l!==l}var pn=class l{static kMaxPrimitivesPerLeaf=1;m_bounds=new Y;m_height=0;m_nodes=[];m_nodecnt=0;m_packed_indices=[];m_indices=[];m_usesah=!0;m_num_bins=16;m_traversal_cost=1;constructor(e,t=64,n=!1){this.m_num_bins=t,this.m_usesah=n,this.m_height=0,this.m_traversal_cost=e}build(e){for(let t=0;t<e.length;++t)this.m_bounds.grow(e[t]);this.buildImpl(e,e.length)}bounds(){return this.m_bounds}initNodeAllocator(e){this.m_nodecnt=0,this.m_nodes=new Array(e);for(let t=0;t<e;++t)this.m_nodes[t]=new Un}allocateNode(){return this.m_nodes[this.m_nodecnt++]}buildNode(e,t,n,i){this.m_height=Math.max(this.m_height,e.level);let r=this.allocateNode();if(r.bounds=e.bounds,r.index=e.index,e.numprims<2){r.type=1,r.startidx=this.m_packed_indices.length,r.numprims=e.numprims;for(let s=0;s<e.numprims;++s)this.m_packed_indices.push(i[e.startidx+s])}else{let s=e.centroid_bounds.maxdim(),a=e.centroid_bounds.center().get(s);if(this.m_usesah){let m=this.findSahSplit(e,t,n,i);if(!uu(m.split)&&(s=m.dim,a=m.split,e.numprims<m.sah&&e.numprims<l.kMaxPrimitivesPerLeaf)){r.type=1,r.startidx=this.m_packed_indices.length,r.numprims=e.numprims;for(let g=0;g<e.numprims;++g)this.m_packed_indices.push(i[e.startidx+g]);e.ptr&&(e.isLeft?e.ptr.lc=r:e.ptr.rc=r);return}}r.type=0;let o=new Y,c=new Y,u=new Y,h=new Y,d=e.startidx,f=(e.numprims+e.startidx&1)!==0;if(e.centroid_bounds.extents().get(s)>0){let m=e.startidx,g=e.startidx+e.numprims;if(f)for(;;){for(;m!==g&&n[i[m]].get(s)<a;)o.grow(t[i[m]]),u.grow(n[i[m]]),++m;if(m===g--)break;for(c.grow(t[i[m]]),h.grow(n[i[m]]);m!==g&&n[i[g]].get(s)>=a;)c.grow(t[i[g]]),h.grow(n[i[g]]),--g;if(m===g)break;o.grow(t[i[g]]),u.grow(n[i[g]]),[i[m++],i[g]]=[i[g],i[m]]}else for(;;){for(;m!==g&&n[i[m]].get(s)>=a;)o.grow(t[i[m]]),u.grow(n[i[m]]),++m;if(m===g--)break;for(c.grow(t[i[m]]),h.grow(n[i[m]]);m!==g&&n[i[g]].get(s)<a;)c.grow(t[i[g]]),h.grow(n[i[g]]),--g;if(m===g)break;o.grow(t[i[g]]),u.grow(n[i[g]]),[i[m++],i[g]]=[i[g],i[m]]}d=m}if(d===e.startidx||d===e.startidx+e.numprims){d=e.startidx+(e.numprims>>1);for(let m=e.startidx;m<d;++m)o.grow(t[i[m]]),u.grow(n[i[m]]);for(let m=d;m<e.startidx+e.numprims;++m)c.grow(t[i[m]]),h.grow(n[i[m]])}let p={startidx:e.startidx,numprims:d-e.startidx,ptr:r,isLeft:!0,bounds:o,centroid_bounds:u,level:e.level+1,index:e.index<<1},x={startidx:d,numprims:e.numprims-(d-e.startidx),ptr:r,isLeft:!1,bounds:c,centroid_bounds:h,level:e.level+1,index:(e.index<<1)+1};this.buildNode(p,t,n,i),this.buildNode(x,t,n,i)}e.ptr&&(e.isLeft?e.ptr.lc=r:e.ptr.rc=r)}findSahSplit(e,t,n,i){let r=-1,s=Number.POSITIVE_INFINITY,a={dim:0,split:NaN,sah:s,overlap:0},o=e.centroid_bounds.extents();if(E.dot(o,o)===0)return a;let c=[[],[],[]];c[0]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new Y,count:0})),c[1]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new Y,count:0})),c[2]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new Y,count:0}));let u=1/e.bounds.surfaceArea(),h=e.centroid_bounds.pmin;for(let d=0;d<3;++d){let f=h.get(d),p=o.get(d),x=1/p;if(p===0)continue;for(let v=0;v<this.m_num_bins;++v)c[d][v].count=0,c[d][v].bounds=new Y;for(let v=e.startidx;v<e.startidx+e.numprims;++v){let M=i[v],T=Math.min(Math.floor(this.m_num_bins*((n[M].get(d)-f)*x)),this.m_num_bins-1);c[d][T].count++,c[d][T].bounds.grow(t[M])}let m=new Array(this.m_num_bins-1),g=new Y;for(let v=this.m_num_bins-1;v>0;--v)g.grow(c[d][v].bounds),m[v-1]=new Y,m[v-1].pmin=g.pmin,m[v-1].pmax=g.pmax;let _=new Y,y=0,b=e.numprims;for(let v=0;v<this.m_num_bins-1;++v){_.grow(c[d][v].bounds),y+=c[d][v].count,b-=c[d][v].count;let M=this.m_traversal_cost+(y*_.surfaceArea()+b*m[v].surfaceArea())*u;M<s&&(a.dim=d,r=v,a.sah=s=M)}}return r!==-1&&(a.split=h.get(a.dim)+(r+1)*(o.get(a.dim)/this.m_num_bins)),a}buildImpl(e,t){this.initNodeAllocator(2*t-1);let n=new Array(t);this.m_indices=new Array(t);for(let s=0;s<t;++s)this.m_indices[s]=s;let i=new Y;for(let s=0;s<t;++s){let a=e[s].center();i.grow(a),n[s]=a}let r={startidx:0,numprims:t,ptr:null,isLeft:!1,bounds:this.m_bounds,centroid_bounds:i,level:0,index:1};this.buildNode(r,e,n,this.m_indices)}printStatistics(){console.log("Class name: Bvh"),console.log("SAH:",this.m_usesah?"enabled":"disabled"),console.log("SAH bins:",this.m_num_bins),console.log("Number of triangles:",this.m_indices.length),console.log("Number of nodes:",this.m_nodecnt),console.log("Tree height:",this.m_height)}getIndices(){return this.m_packed_indices}getNumIndices(){return this.m_packed_indices.length}};var fr=class{meshes=[];meshInstances=[];bvhRootStartIndices=[];topLevelBvh=null;curNode=0;curTriIndex=0;nodeTexWidth;nodes=[];topLevelIndex=0;processBLASNodes(e){let t=e.bounds;this.nodes[this.curNode]={bboxmin:t.pmin,bboxmax:t.pmax,LRLeaf:new E(0,0,0)};let n=this.curNode;return e.type===1?(this.nodes[this.curNode].LRLeaf.x=this.curTriIndex+e.startidx,this.nodes[this.curNode].LRLeaf.y=e.numprims,this.nodes[this.curNode].LRLeaf.z=1):(this.curNode++,this.nodes[n].LRLeaf.x=this.processBLASNodes(e.lc),this.curNode++,this.nodes[n].LRLeaf.y=this.processBLASNodes(e.rc)),n}processTLASNodes(e){let t=e.bounds;this.nodes[this.curNode]={bboxmin:t.pmin,bboxmax:t.pmax,LRLeaf:new E(0,0,0)};let n=this.curNode;if(e.type===1){if(!this.topLevelBvh)throw new Error("topLevelBvh is null");let i=this.topLevelBvh.m_packed_indices[e.startidx],r=this.meshInstances[i].meshID,s=this.meshInstances[i].materialID;this.nodes[this.curNode].LRLeaf.x=this.bvhRootStartIndices[r],this.nodes[this.curNode].LRLeaf.y=s,this.nodes[this.curNode].LRLeaf.z=-i-1}else this.curNode++,this.nodes[n].LRLeaf.x=this.processTLASNodes(e.lc),this.curNode++,this.nodes[n].LRLeaf.y=this.processTLASNodes(e.rc);return n}processBLAS(){let e=0;for(let n=0;n<this.meshes.length;n++)e+=this.meshes[n].bvh.m_nodecnt;this.topLevelIndex=e,e+=2*this.meshInstances.length,this.nodes=new Array(e);for(let n=0;n<e;++n)this.nodes[n]={bboxmin:new E(0,0,0),bboxmax:new E(0,0,0),LRLeaf:new E(0,0,0)};let t=0;this.curTriIndex=0;for(let n=0;n<this.meshes.length;n++){let i=this.meshes[n];this.curNode=t,this.bvhRootStartIndices.push(t),t+=i.bvh.m_nodecnt,this.processBLASNodes(i.bvh.m_nodes[0]),this.curTriIndex+=i.bvh.getNumIndices()}}processTLAS(){if(this.curNode=this.topLevelIndex,!this.topLevelBvh)throw new Error("topLevelBvh is null");this.processTLASNodes(this.topLevelBvh.m_nodes[0])}updateTLAS(e,t){this.topLevelBvh=e,this.meshInstances=t,this.curNode=this.topLevelIndex,this.processTLASNodes(e.m_nodes[0])}process(e,t,n){this.topLevelBvh=e,this.meshes=t,this.meshInstances=n,this.processBLAS(),this.processTLAS()}};function Il(l,e,t,n=!1){let i=du(l,e,t,n);return i?new Uint8Array(i.data.buffer):null}function du(l,e,t,n=!1){let i=P.document.getElementById("textures"),r=P.document.createElement("canvas");i?.appendChild(r),r.width=e,r.height=t;let s=r.getContext("2d");return s?(n?(s.scale(1,-1),s.drawImage(l,0,-t,e,t)):s.drawImage(l,0,0,e,t),s.getImageData(0,0,e,t)):null}var q=class{x;y;z;w;constructor(e=0,t=0,n=0,i=0){e instanceof E?(this.x=e.x,this.y=e.y,this.z=e.z,this.w=t):(this.x=e,this.y=t,this.z=n,this.w=i)}get(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new RangeError("Index out of range for Vec4")}}get xyz(){return new E(this.x,this.y,this.z)}get wxy(){return new E(this.w,this.x,this.y)}toString(){return`Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`}};function fu(l,e,t,n,i,r,s){let a=2*i,o=e-l,c=n-t,u=r-i;s[0]=a/o,s[1]=0,s[2]=0,s[3]=0,s[4]=0,s[5]=a/c,s[6]=0,s[7]=0,s[8]=(e+l)/o,s[9]=(n+t)/c,s[10]=(-r-i)/u,s[11]=-1,s[12]=0,s[13]=0,s[14]=-a*r/u,s[15]=0}function pu(l,e,t,n,i){let r=t*Math.tan(l*Math.PI/180),s=r*e;fu(-s,s,-r,r,t,n,i)}function Pl(l){let e=1/(E.Length(l)+1e-7);return l.scale(1/e)}function mu(l,e,t,n){let i=Pl(l.subtract(e)),r=Pl(E.cross(t,i)),s=E.cross(i,r);n[0]=r.x,n[1]=s.x,n[2]=i.x,n[3]=0,n[4]=r.y,n[5]=s.y,n[6]=i.y,n[7]=0,n[8]=r.z,n[9]=s.z,n[10]=i.z,n[11]=0,n[12]=-E.dot(r,l),n[13]=-E.dot(s,l),n[14]=-E.dot(i,l),n[15]=1}var Nn=class l{position;pivot;worldUp;pitch;yaw;radius;fov;focalDist;aperture;isMoving=!1;forward=new E(0,0,0);right=new E(0,0,0);up=new E(0,0,0);constructor(e,t,n){this.position=e.clone(),this.pivot=t.clone(),this.worldUp=new E(0,1,0);let i=E.normalize(this.pivot.subtract(this.position));this.pitch=Math.asin(i.y)*180/Math.PI,this.yaw=Math.atan2(i.z,i.x)*180/Math.PI,this.radius=E.distance(e,t),this.fov=n*Math.PI/180,this.focalDist=.1,this.aperture=0,this.updateCamera()}clone(){let e=new l(this.position,this.pivot,this.fov*180/Math.PI);return e.pitch=this.pitch,e.yaw=this.yaw,e.radius=this.radius,e.focalDist=this.focalDist,e.aperture=this.aperture,e.isMoving=this.isMoving,e.forward=this.forward.clone(),e.right=this.right.clone(),e.up=this.up.clone(),e}offsetOrientation(e,t){this.pitch-=t,this.yaw+=e,this.updateCamera()}strafe(e,t){let n=this.right.scale(-e).add(this.up.scale(t));this.pivot=this.pivot.add(n),this.updateCamera()}setRadius(e){this.radius+=e,this.updateCamera()}setFov(e){this.fov=e*Math.PI/180}updateCamera(){let e=this.yaw*Math.PI/180,t=this.pitch*Math.PI/180,n=new E(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t));this.forward=E.normalize(n),this.position=this.pivot.add(this.forward.scale(-this.radius)),this.right=E.normalize(E.cross(this.forward,this.worldUp)),this.up=E.normalize(E.cross(this.right,this.forward))}computeViewProjectionMatrix(e,t,n){let i=this.position.add(this.forward);mu(this.position,i,this.up,e);let r=1/n*Math.tan(this.fov/2);pu(r*180/Math.PI,n,.1,1e3,t)}};var pc=1;var mc=3,jn=0,gc=1,eo=2;var Aa=1;var Ra=100;var Ca=204,Ia=205;var Pa=0,La=1,Da=2,Oi=3,Fa=4,Ua=5,Na=6,Ba=7,ss=0,xc=1,_c=2;var to=1,no=2,io=3,ro=4,so=5,ao=6,oo=7,Oa="attached",yc="detached",lo=300,bc=301,co=302;var vc=306,bn=1e3,Ft=1001,ki=1002,Zn=1003,uo=1004;var ho=1005;var Ye=1006,fo=1007;var ai=1008;var po=1009;var vt=1015,oi=1016;var mo=1023;var Tc=1028;var vn=2300,Tn=2301,zr=2302,ka=2303,za=2400,Va=2401,Ga=2402,Mc=2500;var go=0,nr=1,li=2;var xo=0;var _o="",_e="srgb",Ce="srgb-linear",Ha="linear",Vr="srgb";var yn=7680;var Xa=519;var Gr=35044;var tn=2e3,zi=2001;function gu(l){for(let e=l.length-1;e>=0;--e)if(l[e]>=65535)return!0;return!1}function xu(l){return ArrayBuffer.isView(l)&&!(l instanceof DataView)}function Hr(l){return document.createElementNS("http://www.w3.org/1999/xhtml",l)}var Ll={},Jn=null;function Wa(...l){let e="THREE."+l.shift();Jn?Jn("log",e,...l):console.log(e,...l)}function Sc(l){let e=l[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=l[1];t&&t.isStackTrace?l[0]+=" "+t.getLocation():l[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return l}function ie(...l){l=Sc(l);let e="THREE."+l.shift();if(Jn)Jn("warn",e,...l);else{let t=l[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...l)}}function ue(...l){l=Sc(l);let e="THREE."+l.shift();if(Jn)Jn("error",e,...l);else{let t=l[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...l)}}function $a(...l){let e=l.join(" ");e in Ll||(Ll[e]=!0,ie(...l))}var _u={[Pa]:La,[Da]:Na,[Fa]:Ba,[Oi]:Ua,[La]:Pa,[Na]:Da,[Ba]:Fa,[Ua]:Oi},nn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e);e.target=null}}},Se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Dl=1234567,Ni=Math.PI/180,Qn=180/Math.PI;function at(){let l=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Se[l&255]+Se[l>>8&255]+Se[l>>16&255]+Se[l>>24&255]+"-"+Se[e&255]+Se[e>>8&255]+"-"+Se[e>>16&15|64]+Se[e>>24&255]+"-"+Se[t&63|128]+Se[t>>8&255]+"-"+Se[t>>16&255]+Se[t>>24&255]+Se[n&255]+Se[n>>8&255]+Se[n>>16&255]+Se[n>>24&255]).toLowerCase()}function K(l,e,t){return Math.max(e,Math.min(t,l))}function yo(l,e){return(l%e+e)%e}function yu(l,e,t,n,i){return n+(l-e)*(i-n)/(t-e)}function bu(l,e,t){return l!==e?(t-l)/(e-l):0}function Bi(l,e,t){return(1-t)*l+t*e}function vu(l,e,t,n){return Bi(l,e,1-Math.exp(-t*n))}function Tu(l,e=1){return e-Math.abs(yo(l,e*2)-e)}function Mu(l,e,t){return l<=e?0:l>=t?1:(l=(l-e)/(t-e),l*l*(3-2*l))}function Su(l,e,t){return l<=e?0:l>=t?1:(l=(l-e)/(t-e),l*l*l*(l*(l*6-15)+10))}function Eu(l,e){return l+Math.floor(Math.random()*(e-l+1))}function wu(l,e){return l+Math.random()*(e-l)}function Au(l){return l*(.5-Math.random())}function Ru(l){l!==void 0&&(Dl=l);let e=Dl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cu(l){return l*Ni}function Iu(l){return l*Qn}function Pu(l){return(l&l-1)===0&&l!==0}function Lu(l){return Math.pow(2,Math.ceil(Math.log(l)/Math.LN2))}function Du(l){return Math.pow(2,Math.floor(Math.log(l)/Math.LN2))}function Fu(l,e,t,n,i){let r=Math.cos,s=Math.sin,a=r(t/2),o=s(t/2),c=r((e+n)/2),u=s((e+n)/2),h=r((e-n)/2),d=s((e-n)/2),f=r((n-e)/2),p=s((n-e)/2);switch(i){case"XYX":l.set(a*u,o*h,o*d,a*c);break;case"YZY":l.set(o*d,a*u,o*h,a*c);break;case"ZXZ":l.set(o*h,o*d,a*u,a*c);break;case"XZX":l.set(a*u,o*p,o*f,a*c);break;case"YXY":l.set(o*f,a*u,o*p,a*c);break;case"ZYZ":l.set(o*p,o*f,a*u,a*c);break;default:ie("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function st(l,e){switch(e.constructor){case Float32Array:return l;case Uint32Array:return l/4294967295;case Uint16Array:return l/65535;case Uint8Array:return l/255;case Int32Array:return Math.max(l/2147483647,-1);case Int16Array:return Math.max(l/32767,-1);case Int8Array:return Math.max(l/127,-1);default:throw new Error("Invalid component type.")}}function se(l,e){switch(e.constructor){case Float32Array:return l;case Uint32Array:return Math.round(l*4294967295);case Uint16Array:return Math.round(l*65535);case Uint8Array:return Math.round(l*255);case Int32Array:return Math.round(l*2147483647);case Int16Array:return Math.round(l*32767);case Int8Array:return Math.round(l*127);default:throw new Error("Invalid component type.")}}var bo={DEG2RAD:Ni,RAD2DEG:Qn,generateUUID:at,clamp:K,euclideanModulo:yo,mapLinear:yu,inverseLerp:bu,lerp:Bi,damp:vu,pingpong:Tu,smoothstep:Mu,smootherstep:Su,randInt:Eu,randFloat:wu,randFloatSpread:Au,seededRandom:Ru,degToRad:Cu,radToDeg:Iu,isPowerOfTwo:Pu,ceilPowerOfTwo:Lu,floorPowerOfTwo:Du,setQuaternionFromProperEuler:Fu,normalize:se,denormalize:st},le=class l{static{l.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(K(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*n-s*i+e.x,this.y=r*i+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},He=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,s,a){let o=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=r[s+0],f=r[s+1],p=r[s+2],x=r[s+3];if(h!==x||o!==d||c!==f||u!==p){let m=o*d+c*f+u*p+h*x;m<0&&(d=-d,f=-f,p=-p,x=-x,m=-m);let g=1-a;if(m<.9995){let _=Math.acos(m),y=Math.sin(_);g=Math.sin(g*_)/y,a=Math.sin(a*_)/y,o=o*g+d*a,c=c*g+f*a,u=u*g+p*a,h=h*g+x*a}else{o=o*g+d*a,c=c*g+f*a,u=u*g+p*a,h=h*g+x*a;let _=1/Math.sqrt(o*o+c*c+u*u+h*h);o*=_,c*=_,u*=_,h*=_}}e[t]=o,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,s){let a=n[i],o=n[i+1],c=n[i+2],u=n[i+3],h=r[s],d=r[s+1],f=r[s+2],p=r[s+3];return e[t]=a*p+u*h+o*f-c*d,e[t+1]=o*p+u*d+c*h-a*f,e[t+2]=c*p+u*f+a*d-o*h,e[t+3]=u*p-a*h-o*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,s=e._order,a=Math.cos,o=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),d=o(n/2),f=o(i/2),p=o(r/2);switch(s){case"XYZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"YXZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"ZXY":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"ZYX":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"YZX":this._x=d*u*h+c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h-d*f*p;break;case"XZY":this._x=d*u*h-c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h+d*f*p;break;default:ie("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],s=t[1],a=t[5],o=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-o)*f,this._y=(r-c)*f,this._z=(s-i)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-o)/f,this._x=.25*f,this._y=(i+s)/f,this._z=(r+c)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(i+s)/f,this._y=.25*f,this._z=(o+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(s-i)/f,this._x=(r+c)/f,this._y=(o+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(K(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,s=e._w,a=t._x,o=t._y,c=t._z,u=t._w;return this._x=n*u+s*a+i*c-r*o,this._y=i*u+s*o+r*a-n*c,this._z=r*u+s*c+n*o-i*a,this._w=s*u-n*a-i*o-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,s=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,r=-r,s=-s,a=-a);let o=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);o=Math.sin(o*c)/u,t=Math.sin(t*c)/u,this._x=this._x*o+n*t,this._y=this._y*o+i*t,this._z=this._z*o+r*t,this._w=this._w*o+s*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+i*t,this._z=this._z*o+r*t,this._w=this._w*o+s*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class l{static{l.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fl.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,s=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*s,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*s,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*s,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,s=e.y,a=e.z,o=e.w,c=2*(s*i-a*n),u=2*(a*t-r*i),h=2*(r*n-s*t);return this.x=t+o*c+s*h-a*u,this.y=n+o*u+a*c-r*h,this.z=i+o*h+r*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this.z=K(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this.z=K(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,s=t.x,a=t.y,o=t.z;return this.x=i*o-r*a,this.y=r*s-n*o,this.z=n*a-i*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ta.copy(this).projectOnVector(e),this.sub(ta)}reflect(e){return this.sub(ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(K(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ta=new R,Fl=new He,W=class l{static{l.prototype.isMatrix3=!0}constructor(e,t,n,i,r,s,a,o,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,s,a,o,c)}set(e,t,n,i,r,s,a,o,c){let u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=o,u[6]=n,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,s=n[0],a=n[3],o=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],p=n[8],x=i[0],m=i[3],g=i[6],_=i[1],y=i[4],b=i[7],v=i[2],M=i[5],T=i[8];return r[0]=s*x+a*_+o*v,r[3]=s*m+a*y+o*M,r[6]=s*g+a*b+o*T,r[1]=c*x+u*_+h*v,r[4]=c*m+u*y+h*M,r[7]=c*g+u*b+h*T,r[2]=d*x+f*_+p*v,r[5]=d*m+f*y+p*M,r[8]=d*g+f*b+p*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],c=e[7],u=e[8];return t*s*u-t*a*c-n*r*u+n*a*o+i*r*c-i*s*o}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],c=e[7],u=e[8],h=u*s-a*c,d=a*o-u*r,f=c*r-s*o,p=t*h+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=h*x,e[1]=(i*c-u*n)*x,e[2]=(a*n-i*s)*x,e[3]=d*x,e[4]=(u*t-i*o)*x,e[5]=(i*r-a*t)*x,e[6]=f*x,e[7]=(n*o-c*t)*x,e[8]=(s*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,s,a){let o=Math.cos(r),c=Math.sin(r);return this.set(n*o,n*c,-n*(o*s+c*a)+s+e,-i*c,i*o,-i*(-c*s+o*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},na=new W,Ul=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nl=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Uu(){let l={enabled:!0,workingColorSpace:Ce,spaces:{},convert:function(i,r,s){return this.enabled===!1||r===s||!r||!s||(this.spaces[r].transfer===Vr&&(i.r=Ut(i.r),i.g=Ut(i.g),i.b=Ut(i.b)),this.spaces[r].primaries!==this.spaces[s].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Vr&&(i.r=Kn(i.r),i.g=Kn(i.g),i.b=Kn(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===_o?Ha:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,s){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return $a("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),l.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return $a("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),l.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return l.define({[Ce]:{primaries:e,whitePoint:n,transfer:Ha,toXYZ:Ul,fromXYZ:Nl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_e},outputColorSpaceConfig:{drawingBufferColorSpace:_e}},[_e]:{primaries:e,whitePoint:n,transfer:Vr,toXYZ:Ul,fromXYZ:Nl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_e}}}),l}var Re=Uu();function Ut(l){return l<.04045?l*.0773993808:Math.pow(l*.9478672986+.0521327014,2.4)}function Kn(l){return l<.0031308?l*12.92:1.055*Math.pow(l,.41666)-.055}var Bn,Xr=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bn===void 0&&(Bn=Hr("canvas")),Bn.width=e.width,Bn.height=e.height;let i=Bn.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Bn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Hr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=Ut(r[s]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ut(t[n]/255)*255):t[n]=Ut(t[n]);return{data:t,width:e.width,height:e.height}}else return ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Nu=0,Wr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=at(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?r.push(ia(i[s].image)):r.push(ia(i[s]))}else r=ia(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function ia(l){return typeof HTMLImageElement<"u"&&l instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&l instanceof ImageBitmap?Xr.getDataURL(l):l.data?{data:Array.from(l.data),width:l.width,height:l.height,type:l.data.constructor.name}:(ie("Texture: Unable to serialize Texture."),{})}var Bu=0,ra=new R,ot=class l extends nn{constructor(e=l.DEFAULT_IMAGE,t=l.DEFAULT_MAPPING,n=Ft,i=Ft,r=Ye,s=ai,a=mo,o=po,c=l.DEFAULT_ANISOTROPY,u=_o){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=at(),this.name="",this.source=new Wr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=o,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ra).x}get height(){return this.source.getSize(ra).y}get depth(){return this.source.getSize(ra).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ie(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ie(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bn:e.x=e.x-Math.floor(e.x);break;case Ft:e.x=e.x<0?0:1;break;case ki:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bn:e.y=e.y-Math.floor(e.y);break;case Ft:e.y=e.y<0?0:1;break;case ki:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ot.DEFAULT_IMAGE=null;ot.DEFAULT_MAPPING=lo;ot.DEFAULT_ANISOTROPY=1;var qe=class l{static{l.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i+s[12]*r,this.y=s[1]*t+s[5]*n+s[9]*i+s[13]*r,this.z=s[2]*t+s[6]*n+s[10]*i+s[14]*r,this.w=s[3]*t+s[7]*n+s[11]*i+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,o=e.elements,c=o[0],u=o[4],h=o[8],d=o[1],f=o[5],p=o[9],x=o[2],m=o[6],g=o[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,b=(f+1)/2,v=(g+1)/2,M=(u+d)/4,T=(h+x)/4,w=(p+m)/4;return y>b&&y>v?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=M/n,r=T/n):b>v?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=M/i,r=w/i):v<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(v),n=T/r,i=w/r),this.set(n,i,r,t),this}let _=Math.sqrt((m-p)*(m-p)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(h-x)/_,this.z=(d-u)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this.z=K(this.z,e.z,t.z),this.w=K(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this.z=K(this.z,e,t),this.w=K(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var J=class l{static{l.prototype.isMatrix4=!0}constructor(e,t,n,i,r,s,a,o,c,u,h,d,f,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,s,a,o,c,u,h,d,f,p,x,m)}set(e,t,n,i,r,s,a,o,c,u,h,d,f,p,x,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=s,g[9]=a,g[13]=o,g[2]=c,g[6]=u,g[10]=h,g[14]=d,g[3]=f,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new l().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,i=1/On.setFromMatrixColumn(e,0).length(),r=1/On.setFromMatrixColumn(e,1).length(),s=1/On.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,s=Math.cos(n),a=Math.sin(n),o=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=s*u,f=s*h,p=a*u,x=a*h;t[0]=o*u,t[4]=-o*h,t[8]=c,t[1]=f+p*c,t[5]=d-x*c,t[9]=-a*o,t[2]=x-d*c,t[6]=p+f*c,t[10]=s*o}else if(e.order==="YXZ"){let d=o*u,f=o*h,p=c*u,x=c*h;t[0]=d+x*a,t[4]=p*a-f,t[8]=s*c,t[1]=s*h,t[5]=s*u,t[9]=-a,t[2]=f*a-p,t[6]=x+d*a,t[10]=s*o}else if(e.order==="ZXY"){let d=o*u,f=o*h,p=c*u,x=c*h;t[0]=d-x*a,t[4]=-s*h,t[8]=p+f*a,t[1]=f+p*a,t[5]=s*u,t[9]=x-d*a,t[2]=-s*c,t[6]=a,t[10]=s*o}else if(e.order==="ZYX"){let d=s*u,f=s*h,p=a*u,x=a*h;t[0]=o*u,t[4]=p*c-f,t[8]=d*c+x,t[1]=o*h,t[5]=x*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*o,t[10]=s*o}else if(e.order==="YZX"){let d=s*o,f=s*c,p=a*o,x=a*c;t[0]=o*u,t[4]=x-d*h,t[8]=p*h+f,t[1]=h,t[5]=s*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+p,t[10]=d-x*h}else if(e.order==="XZY"){let d=s*o,f=s*c,p=a*o,x=a*c;t[0]=o*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=s*u,t[9]=f*h-p,t[2]=p*h-f,t[6]=a*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ou,e,ku)}lookAt(e,t,n){let i=this.elements;return Ve.subVectors(e,t),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),qt.crossVectors(n,Ve),qt.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),qt.crossVectors(n,Ve)),qt.normalize(),pr.crossVectors(Ve,qt),i[0]=qt.x,i[4]=pr.x,i[8]=Ve.x,i[1]=qt.y,i[5]=pr.y,i[9]=Ve.y,i[2]=qt.z,i[6]=pr.z,i[10]=Ve.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,s=n[0],a=n[4],o=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],p=n[2],x=n[6],m=n[10],g=n[14],_=n[3],y=n[7],b=n[11],v=n[15],M=i[0],T=i[4],w=i[8],C=i[12],A=i[1],S=i[5],U=i[9],L=i[13],B=i[2],z=i[6],O=i[10],F=i[14],X=i[3],D=i[7],H=i[11],I=i[15];return r[0]=s*M+a*A+o*B+c*X,r[4]=s*T+a*S+o*z+c*D,r[8]=s*w+a*U+o*O+c*H,r[12]=s*C+a*L+o*F+c*I,r[1]=u*M+h*A+d*B+f*X,r[5]=u*T+h*S+d*z+f*D,r[9]=u*w+h*U+d*O+f*H,r[13]=u*C+h*L+d*F+f*I,r[2]=p*M+x*A+m*B+g*X,r[6]=p*T+x*S+m*z+g*D,r[10]=p*w+x*U+m*O+g*H,r[14]=p*C+x*L+m*F+g*I,r[3]=_*M+y*A+b*B+v*X,r[7]=_*T+y*S+b*z+v*D,r[11]=_*w+y*U+b*O+v*H,r[15]=_*C+y*L+b*F+v*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],s=e[1],a=e[5],o=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],p=e[3],x=e[7],m=e[11],g=e[15],_=o*f-c*d,y=a*f-c*h,b=a*d-o*h,v=s*f-c*u,M=s*d-o*u,T=s*h-a*u;return t*(x*_-m*y+g*b)-n*(p*_-m*v+g*M)+i*(p*y-x*v+g*T)-r*(p*b-x*M+m*T)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],p=e[12],x=e[13],m=e[14],g=e[15],_=t*a-n*s,y=t*o-i*s,b=t*c-r*s,v=n*o-i*a,M=n*c-r*a,T=i*c-r*o,w=u*x-h*p,C=u*m-d*p,A=u*g-f*p,S=h*m-d*x,U=h*g-f*x,L=d*g-f*m,B=_*L-y*U+b*S+v*A-M*C+T*w;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/B;return e[0]=(a*L-o*U+c*S)*z,e[1]=(i*U-n*L-r*S)*z,e[2]=(x*T-m*M+g*v)*z,e[3]=(d*M-h*T-f*v)*z,e[4]=(o*A-s*L-c*C)*z,e[5]=(t*L-i*A+r*C)*z,e[6]=(m*b-p*T-g*y)*z,e[7]=(u*T-d*b+f*y)*z,e[8]=(s*U-a*A+c*w)*z,e[9]=(n*A-t*U-r*w)*z,e[10]=(p*M-x*b+g*_)*z,e[11]=(h*b-u*M-f*_)*z,e[12]=(a*C-s*S-o*w)*z,e[13]=(t*S-n*C+i*w)*z,e[14]=(x*y-p*v-m*_)*z,e[15]=(u*v-h*y+d*_)*z,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,s=e.x,a=e.y,o=e.z,c=r*s,u=r*a;return this.set(c*s+n,c*a-i*o,c*o+i*a,0,c*a+i*o,u*a+n,u*o-i*s,0,c*o-i*a,u*o+i*s,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,s){return this.set(1,n,r,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,s=t._y,a=t._z,o=t._w,c=r+r,u=s+s,h=a+a,d=r*c,f=r*u,p=r*h,x=s*u,m=s*h,g=a*h,_=o*c,y=o*u,b=o*h,v=n.x,M=n.y,T=n.z;return i[0]=(1-(x+g))*v,i[1]=(f+b)*v,i[2]=(p-y)*v,i[3]=0,i[4]=(f-b)*M,i[5]=(1-(d+g))*M,i[6]=(m+_)*M,i[7]=0,i[8]=(p+y)*T,i[9]=(m-_)*T,i[10]=(1-(d+x))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let s=On.set(i[0],i[1],i[2]).length(),a=On.set(i[4],i[5],i[6]).length(),o=On.set(i[8],i[9],i[10]).length();r<0&&(s=-s),nt.copy(this);let c=1/s,u=1/a,h=1/o;return nt.elements[0]*=c,nt.elements[1]*=c,nt.elements[2]*=c,nt.elements[4]*=u,nt.elements[5]*=u,nt.elements[6]*=u,nt.elements[8]*=h,nt.elements[9]*=h,nt.elements[10]*=h,t.setFromRotationMatrix(nt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,s,a=tn,o=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,x;if(o)p=r/(s-r),x=s*r/(s-r);else if(a===tn)p=-(s+r)/(s-r),x=-2*s*r/(s-r);else if(a===zi)p=-s/(s-r),x=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,s,a=tn,o=!1){let c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,x;if(o)p=1/(s-r),x=s/(s-r);else if(a===tn)p=-2/(s-r),x=-(s+r)/(s-r);else if(a===zi)p=-1/(s-r),x=-r/(s-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},On=new R,nt=new J,Ou=new R(0,0,0),ku=new R(1,1,1),qt=new R,pr=new R,Ve=new R,Bl=new J,Ol=new He,rn=class l{constructor(e=0,t=0,n=0,i=l.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],s=i[4],a=i[8],o=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(K(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-K(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(K(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-K(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(K(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-K(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ol.setFromEuler(this),this.setFromQuaternion(Ol,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};rn.DEFAULT_ORDER="XYZ";var $r=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},zu=0,kl=new R,kn=new He,wt=new J,mr=new R,Ri=new R,Vu=new R,Gu=new He,zl=new R(1,0,0),Vl=new R(0,1,0),Gl=new R(0,0,1),Hl={type:"added"},Hu={type:"removed"},zn={type:"childadded",child:null},sa={type:"childremoved",child:null},me=class l extends nn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=at(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=l.DEFAULT_UP.clone();let e=new R,t=new rn,n=new He,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new J},normalMatrix:{value:new W}}),this.matrix=new J,this.matrixWorld=new J,this.matrixAutoUpdate=l.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=l.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $r,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return kn.setFromAxisAngle(e,t),this.quaternion.multiply(kn),this}rotateOnWorldAxis(e,t){return kn.setFromAxisAngle(e,t),this.quaternion.premultiply(kn),this}rotateX(e){return this.rotateOnAxis(zl,e)}rotateY(e){return this.rotateOnAxis(Vl,e)}rotateZ(e){return this.rotateOnAxis(Gl,e)}translateOnAxis(e,t){return kl.copy(e).applyQuaternion(this.quaternion),this.position.add(kl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zl,e)}translateY(e){return this.translateOnAxis(Vl,e)}translateZ(e){return this.translateOnAxis(Gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?mr.copy(e):mr.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ri.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wt.lookAt(Ri,mr,this.up):wt.lookAt(mr,Ri,this.up),this.quaternion.setFromRotationMatrix(wt),i&&(wt.extractRotation(i.matrixWorld),kn.setFromRotationMatrix(wt),this.quaternion.premultiply(kn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ue("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hl),zn.child=e,this.dispatchEvent(zn),zn.child=null):ue("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hu),sa.child=e,this.dispatchEvent(sa),sa.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wt.multiply(e.parent.matrixWorld)),e.applyMatrix4(wt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hl),zn.child=e,this.dispatchEvent(zn),zn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,e,Vu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,Gu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let c=0,u=o.length;c<u;c++){let h=o[c];r(e.shapes,h)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,c=this.material.length;o<c;o++)a.push(r(e.materials,this.material[o]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];i.animations.push(r(e.animations,o))}}if(t){let a=s(e.geometries),o=s(e.materials),c=s(e.textures),u=s(e.images),h=s(e.shapes),d=s(e.skeletons),f=s(e.animations),p=s(e.nodes);a.length>0&&(n.geometries=a),o.length>0&&(n.materials=o),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function s(a){let o=[];for(let c in a){let u=a[c];delete u.metadata,o.push(u)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};me.DEFAULT_UP=new R(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Nt=class extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}};var Ec={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kt={h:0,s:0,l:0},gr={h:0,s:0,l:0};function aa(l,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?l+(e-l)*6*t:t<1/2?e:t<2/3?l+(e-l)*6*(2/3-t):l}var $=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_e){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Re.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Re.workingColorSpace){return this.r=e,this.g=t,this.b=n,Re.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Re.workingColorSpace){if(e=yo(e,1),t=K(t,0,1),n=K(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,s=2*n-r;this.r=aa(s,r,e+1/3),this.g=aa(s,r,e),this.b=aa(s,r,e-1/3)}return Re.colorSpaceToWorking(this,i),this}setStyle(e,t=_e){function n(r){r!==void 0&&parseFloat(r)<1&&ie("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ie("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_e){let n=Ec[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ut(e.r),this.g=Ut(e.g),this.b=Ut(e.b),this}copyLinearToSRGB(e){return this.r=Kn(e.r),this.g=Kn(e.g),this.b=Kn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_e){return Re.workingToColorSpace(Ee.copy(this),e),Math.round(K(Ee.r*255,0,255))*65536+Math.round(K(Ee.g*255,0,255))*256+Math.round(K(Ee.b*255,0,255))}getHexString(e=_e){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Re.workingColorSpace){Re.workingToColorSpace(Ee.copy(this),t);let n=Ee.r,i=Ee.g,r=Ee.b,s=Math.max(n,i,r),a=Math.min(n,i,r),o,c,u=(a+s)/2;if(a===s)o=0,c=0;else{let h=s-a;switch(c=u<=.5?h/(s+a):h/(2-s-a),s){case n:o=(i-r)/h+(i<r?6:0);break;case i:o=(r-n)/h+2;break;case r:o=(n-i)/h+4;break}o/=6}return e.h=o,e.s=c,e.l=u,e}getRGB(e,t=Re.workingColorSpace){return Re.workingToColorSpace(Ee.copy(this),t),e.r=Ee.r,e.g=Ee.g,e.b=Ee.b,e}getStyle(e=_e){Re.workingToColorSpace(Ee.copy(this),e);let t=Ee.r,n=Ee.g,i=Ee.b;return e!==_e?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Kt),this.setHSL(Kt.h+e,Kt.s+t,Kt.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kt),e.getHSL(gr);let n=Bi(Kt.h,gr.h,t),i=Bi(Kt.s,gr.s,t),r=Bi(Kt.l,gr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ee=new $;$.NAMES=Ec;var it=new R,At=new R,oa=new R,Rt=new R,Vn=new R,Gn=new R,Xl=new R,la=new R,ca=new R,ua=new R,ha=new qe,da=new qe,fa=new qe,en=class l{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),it.subVectors(e,t),i.cross(it);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){it.subVectors(i,t),At.subVectors(n,t),oa.subVectors(e,t);let s=it.dot(it),a=it.dot(At),o=it.dot(oa),c=At.dot(At),u=At.dot(oa),h=s*c-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(c*o-a*u)*d,p=(s*u-a*o)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Rt)===null?!1:Rt.x>=0&&Rt.y>=0&&Rt.x+Rt.y<=1}static getInterpolation(e,t,n,i,r,s,a,o){return this.getBarycoord(e,t,n,i,Rt)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,Rt.x),o.addScaledVector(s,Rt.y),o.addScaledVector(a,Rt.z),o)}static getInterpolatedAttribute(e,t,n,i,r,s){return ha.setScalar(0),da.setScalar(0),fa.setScalar(0),ha.fromBufferAttribute(e,t),da.fromBufferAttribute(e,n),fa.fromBufferAttribute(e,i),s.setScalar(0),s.addScaledVector(ha,r.x),s.addScaledVector(da,r.y),s.addScaledVector(fa,r.z),s}static isFrontFacing(e,t,n,i){return it.subVectors(n,t),At.subVectors(e,t),it.cross(At).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return it.subVectors(this.c,this.b),At.subVectors(this.a,this.b),it.cross(At).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return l.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return l.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return l.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return l.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return l.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,s,a;Vn.subVectors(i,n),Gn.subVectors(r,n),la.subVectors(e,n);let o=Vn.dot(la),c=Gn.dot(la);if(o<=0&&c<=0)return t.copy(n);ca.subVectors(e,i);let u=Vn.dot(ca),h=Gn.dot(ca);if(u>=0&&h<=u)return t.copy(i);let d=o*h-u*c;if(d<=0&&o>=0&&u<=0)return s=o/(o-u),t.copy(n).addScaledVector(Vn,s);ua.subVectors(e,r);let f=Vn.dot(ua),p=Gn.dot(ua);if(p>=0&&f<=p)return t.copy(r);let x=f*c-o*p;if(x<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(Gn,a);let m=u*p-f*h;if(m<=0&&h-u>=0&&f-p>=0)return Xl.subVectors(r,i),a=(h-u)/(h-u+(f-p)),t.copy(i).addScaledVector(Xl,a);let g=1/(m+x+d);return s=x*g,a=d*g,t.copy(n).addScaledVector(Vn,s).addScaledVector(Gn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xe=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(rt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(rt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=rt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,rt):rt.fromBufferAttribute(r,s),rt.applyMatrix4(e.matrixWorld),this.expandByPoint(rt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xr.copy(n.boundingBox)),xr.applyMatrix4(e.matrixWorld),this.union(xr)}let i=e.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,rt),rt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ci),_r.subVectors(this.max,Ci),Hn.subVectors(e.a,Ci),Xn.subVectors(e.b,Ci),Wn.subVectors(e.c,Ci),jt.subVectors(Xn,Hn),Zt.subVectors(Wn,Xn),mn.subVectors(Hn,Wn);let t=[0,-jt.z,jt.y,0,-Zt.z,Zt.y,0,-mn.z,mn.y,jt.z,0,-jt.x,Zt.z,0,-Zt.x,mn.z,0,-mn.x,-jt.y,jt.x,0,-Zt.y,Zt.x,0,-mn.y,mn.x,0];return!pa(t,Hn,Xn,Wn,_r)||(t=[1,0,0,0,1,0,0,0,1],!pa(t,Hn,Xn,Wn,_r))?!1:(yr.crossVectors(jt,Zt),t=[yr.x,yr.y,yr.z],pa(t,Hn,Xn,Wn,_r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,rt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(rt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ct[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ct[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ct[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ct[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ct[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ct[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ct[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ct[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ct),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ct=[new R,new R,new R,new R,new R,new R,new R,new R],rt=new R,xr=new Xe,Hn=new R,Xn=new R,Wn=new R,jt=new R,Zt=new R,mn=new R,Ci=new R,_r=new R,yr=new R,gn=new R;function pa(l,e,t,n,i){for(let r=0,s=l.length-3;r<=s;r+=3){gn.fromArray(l,r);let a=i.x*Math.abs(gn.x)+i.y*Math.abs(gn.y)+i.z*Math.abs(gn.z),o=e.dot(gn),c=t.dot(gn),u=n.dot(gn);if(Math.max(-Math.max(o,c,u),Math.min(o,c,u))>a)return!1}return!0}var Dt=Xu();function Xu(){let l=new ArrayBuffer(4),e=new Float32Array(l),t=new Uint32Array(l),n=new Uint32Array(512),i=new Uint32Array(512);for(let o=0;o<256;++o){let c=o-127;c<-27?(n[o]=0,n[o|256]=32768,i[o]=24,i[o|256]=24):c<-14?(n[o]=1024>>-c-14,n[o|256]=1024>>-c-14|32768,i[o]=-c-1,i[o|256]=-c-1):c<=15?(n[o]=c+15<<10,n[o|256]=c+15<<10|32768,i[o]=13,i[o|256]=13):c<128?(n[o]=31744,n[o|256]=64512,i[o]=24,i[o|256]=24):(n[o]=31744,n[o|256]=64512,i[o]=13,i[o|256]=13)}let r=new Uint32Array(2048),s=new Uint32Array(64),a=new Uint32Array(64);for(let o=1;o<1024;++o){let c=o<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[o]=c|u}for(let o=1024;o<2048;++o)r[o]=939524096+(o-1024<<13);for(let o=1;o<31;++o)s[o]=o<<23;s[31]=1199570944,s[32]=2147483648;for(let o=33;o<63;++o)s[o]=2147483648+(o-32<<23);s[63]=3347054592;for(let o=1;o<64;++o)o!==32&&(a[o]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:s,offsetTable:a}}function Wu(l){Math.abs(l)>65504&&ie("DataUtils.toHalfFloat(): Value out of range."),l=K(l,-65504,65504),Dt.floatView[0]=l;let e=Dt.uint32View[0],t=e>>23&511;return Dt.baseTable[t]+((e&8388607)>>Dt.shiftTable[t])}function $u(l){let e=l>>10;return Dt.uint32View[0]=Dt.mantissaTable[Dt.offsetTable[e]+(l&1023)]+Dt.exponentTable[e],Dt.floatView[0]}var sn=class{static toHalfFloat(e){return Wu(e)}static fromHalfFloat(e){return $u(e)}},xe=new R,br=new le,Yu=0,we=class extends nn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gr,this.updateRanges=[],this.gpuType=vt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xe.fromBufferAttribute(this,t),xe.applyMatrix3(e),this.setXYZ(t,xe.x,xe.y,xe.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xe.fromBufferAttribute(this,t),xe.applyMatrix4(e),this.setXYZ(t,xe.x,xe.y,xe.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xe.fromBufferAttribute(this,t),xe.applyNormalMatrix(e),this.setXYZ(t,xe.x,xe.y,xe.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xe.fromBufferAttribute(this,t),xe.transformDirection(e),this.setXYZ(t,xe.x,xe.y,xe.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=st(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=se(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=st(t,this.array)),t}setX(e,t){return this.normalized&&(t=se(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=st(t,this.array)),t}setY(e,t){return this.normalized&&(t=se(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=st(t,this.array)),t}setZ(e,t){return this.normalized&&(t=se(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=st(t,this.array)),t}setW(e,t){return this.normalized&&(t=se(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=se(t,this.array),n=se(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=se(t,this.array),n=se(n,this.array),i=se(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=se(t,this.array),n=se(n,this.array),i=se(i,this.array),r=se(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gr&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Yr=class extends we{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var qr=class extends we{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Fe=class extends we{constructor(e,t,n){super(new Float32Array(e),t,n)}},qu=new Xe,Ii=new R,ma=new R,Ue=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qu.setFromPoints(e).getCenter(n);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ii.subVectors(e,this.center);let t=Ii.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ii,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ii.copy(e.center).add(ma)),this.expandByPoint(Ii.copy(e.center).sub(ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ku=0,$e=new J,ga=new me,$n=new R,Ge=new Xe,Pi=new Xe,ve=new R,Ke=class l extends nn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=at(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gu(e)?qr:Yr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new W().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $e.makeRotationFromQuaternion(e),this.applyMatrix4($e),this}rotateX(e){return $e.makeRotationX(e),this.applyMatrix4($e),this}rotateY(e){return $e.makeRotationY(e),this.applyMatrix4($e),this}rotateZ(e){return $e.makeRotationZ(e),this.applyMatrix4($e),this}translate(e,t,n){return $e.makeTranslation(e,t,n),this.applyMatrix4($e),this}scale(e,t,n){return $e.makeScale(e,t,n),this.applyMatrix4($e),this}lookAt(e){return ga.lookAt(e),ga.updateMatrix(),this.applyMatrix4(ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($n).negate(),this.translate($n.x,$n.y,$n.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let s=e[i];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Fe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xe);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ue);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){let a=t[r];Pi.setFromBufferAttribute(a),this.morphTargetsRelative?(ve.addVectors(Ge.min,Pi.min),Ge.expandByPoint(ve),ve.addVectors(Ge.max,Pi.max),Ge.expandByPoint(ve)):(Ge.expandByPoint(Pi.min),Ge.expandByPoint(Pi.max))}Ge.getCenter(n);let i=0;for(let r=0,s=e.count;r<s;r++)ve.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(ve));if(t)for(let r=0,s=t.length;r<s;r++){let a=t[r],o=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ve.fromBufferAttribute(a,c),o&&($n.fromBufferAttribute(e,c),ve.add($n)),i=Math.max(i,n.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new we(new Float32Array(4*n.count),4));let s=this.getAttribute("tangent"),a=[],o=[];for(let w=0;w<n.count;w++)a[w]=new R,o[w]=new R;let c=new R,u=new R,h=new R,d=new le,f=new le,p=new le,x=new R,m=new R;function g(w,C,A){c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,C),h.fromBufferAttribute(n,A),d.fromBufferAttribute(r,w),f.fromBufferAttribute(r,C),p.fromBufferAttribute(r,A),u.sub(c),h.sub(c),f.sub(d),p.sub(d);let S=1/(f.x*p.y-p.x*f.y);isFinite(S)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(h,-f.y).multiplyScalar(S),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(S),a[w].add(x),a[C].add(x),a[A].add(x),o[w].add(m),o[C].add(m),o[A].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let w=0,C=_.length;w<C;++w){let A=_[w],S=A.start,U=A.count;for(let L=S,B=S+U;L<B;L+=3)g(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let y=new R,b=new R,v=new R,M=new R;function T(w){v.fromBufferAttribute(i,w),M.copy(v);let C=a[w];y.copy(C),y.sub(v.multiplyScalar(v.dot(C))).normalize(),b.crossVectors(M,C);let S=b.dot(o[w])<0?-1:1;s.setXYZW(w,y.x,y.y,y.z,S)}for(let w=0,C=_.length;w<C;++w){let A=_[w],S=A.start,U=A.count;for(let L=S,B=S+U;L<B;L+=3)T(e.getX(L+0)),T(e.getX(L+1)),T(e.getX(L+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new we(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new R,r=new R,s=new R,a=new R,o=new R,c=new R,u=new R,h=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),u.subVectors(s,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,p),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),o.add(u),c.add(u),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),u.subVectors(s,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ve.fromBufferAttribute(e,t),ve.normalize(),e.setXYZ(t,ve.x,ve.y,ve.z)}toNonIndexed(){function e(a,o){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(o.length*u),f=0,p=0;for(let x=0,m=o.length;x<m;x++){a.isInterleavedBufferAttribute?f=o[x]*a.data.stride+a.offset:f=o[x]*u;for(let g=0;g<u;g++)d[p++]=c[f++]}return new we(d,u,h)}if(this.index===null)return ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new l,n=this.index.array,i=this.attributes;for(let a in i){let o=i[a],c=e(o,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let o=[],c=r[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);o.push(f)}t.morphAttributes[a]=o}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,o=s.length;a<o;a++){let c=s[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let o=this.parameters;for(let c in o)o[c]!==void 0&&(e[c]=o[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let o in n){let c=n[o];e.data.attributes[o]=c.toJSON(e.data)}let i={},r=!1;for(let o in this.morphAttributes){let c=this.morphAttributes[o],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[o]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let c=0,u=s.length;c<u;c++){let h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ei=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gr,this.updateRanges=[],this.version=0,this.uuid=at()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=at()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=at()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ae=new R,ti=class l{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ae.fromBufferAttribute(this,t),Ae.applyMatrix4(e),this.setXYZ(t,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ae.fromBufferAttribute(this,t),Ae.applyNormalMatrix(e),this.setXYZ(t,Ae.x,Ae.y,Ae.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ae.fromBufferAttribute(this,t),Ae.transformDirection(e),this.setXYZ(t,Ae.x,Ae.y,Ae.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=st(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=se(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=se(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=se(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=se(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=se(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=st(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=st(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=st(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=st(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=se(t,this.array),n=se(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=se(t,this.array),n=se(n,this.array),i=se(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=se(t,this.array),n=se(n,this.array),i=se(i,this.array),r=se(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Wa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new we(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new l(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Wa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ju=0,Ie=class extends nn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=at(),this.name="",this.type="Material",this.blending=Aa,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ca,this.blendDst=Ia,this.blendEquation=Ra,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yn,this.stencilZFail=yn,this.stencilZPass=yn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ie(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ie(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Aa&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ca&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==Ra&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==yn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==yn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let s=[];for(let a in r){let o=r[a];delete o.metadata,s.push(o)}return s}if(t){let r=i(e.textures),s=i(e.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var It=new R,xa=new R,vr=new R,Jt=new R,_a=new R,Tr=new R,ya=new R,Mn=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,It)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=It.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(It.copy(this.origin).addScaledVector(this.direction,t),It.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){xa.copy(e).add(t).multiplyScalar(.5),vr.copy(t).sub(e).normalize(),Jt.copy(this.origin).sub(xa);let r=e.distanceTo(t)*.5,s=-this.direction.dot(vr),a=Jt.dot(this.direction),o=-Jt.dot(vr),c=Jt.lengthSq(),u=Math.abs(1-s*s),h,d,f,p;if(u>0)if(h=s*o-a,d=s*a-o,p=r*u,h>=0)if(d>=-p)if(d<=p){let x=1/u;h*=x,d*=x,f=h*(h+s*d+2*a)+d*(s*h+d+2*o)+c}else d=r,h=Math.max(0,-(s*d+a)),f=-h*h+d*(d+2*o)+c;else d=-r,h=Math.max(0,-(s*d+a)),f=-h*h+d*(d+2*o)+c;else d<=-p?(h=Math.max(0,-(-s*r+a)),d=h>0?-r:Math.min(Math.max(-r,-o),r),f=-h*h+d*(d+2*o)+c):d<=p?(h=0,d=Math.min(Math.max(-r,-o),r),f=d*(d+2*o)+c):(h=Math.max(0,-(s*r+a)),d=h>0?r:Math.min(Math.max(-r,-o),r),f=-h*h+d*(d+2*o)+c);else d=s>0?-r:r,h=Math.max(0,-(s*d+a)),f=-h*h+d*(d+2*o)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(xa).addScaledVector(vr,d),f}intersectSphere(e,t){It.subVectors(e.center,this.origin);let n=It.dot(this.direction),i=It.dot(It)-n*n,r=e.radius*e.radius;if(i>r)return null;let s=Math.sqrt(r-i),a=n-s,o=n+s;return o<0?null:a<0?this.at(o,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,s,a,o,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,s=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,s=(e.min.y-d.y)*u),n>s||r>i||((r>n||isNaN(n))&&(n=r),(s<i||isNaN(i))&&(i=s),h>=0?(a=(e.min.z-d.z)*h,o=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,o=(e.min.z-d.z)*h),n>o||a>i)||((a>n||n!==n)&&(n=a),(o<i||i!==i)&&(i=o),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,It)!==null}intersectTriangle(e,t,n,i,r){_a.subVectors(t,e),Tr.subVectors(n,e),ya.crossVectors(_a,Tr);let s=this.direction.dot(ya),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Jt.subVectors(this.origin,e);let o=a*this.direction.dot(Tr.crossVectors(Jt,Tr));if(o<0)return null;let c=a*this.direction.dot(_a.cross(Jt));if(c<0||o+c>s)return null;let u=-a*Jt.dot(ya);return u<0?null:this.at(u/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},mt=class extends Ie{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=ss,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wl=new J,xn=new Mn,Mr=new Ue,$l=new R,Sr=new R,Er=new R,wr=new R,ba=new R,Ar=new R,Yl=new R,Rr=new R,lt=class extends me{constructor(e=new Ke,t=new mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Ar.set(0,0,0);for(let o=0,c=r.length;o<c;o++){let u=a[o],h=r[o];u!==0&&(ba.fromBufferAttribute(h,e),s?Ar.addScaledVector(ba,u):Ar.addScaledVector(ba.sub(t),u))}t.add(Ar)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(r),xn.copy(e.ray).recast(e.near),!(Mr.containsPoint(xn.origin)===!1&&(xn.intersectSphere(Mr,$l)===null||xn.origin.distanceToSquared($l)>(e.far-e.near)**2))&&(Wl.copy(r).invert(),xn.copy(e.ray).applyMatrix4(Wl),!(n.boundingBox!==null&&xn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xn)))}_computeIntersections(e,t,n){let i,r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(s))for(let p=0,x=d.length;p<x;p++){let m=d[p],g=s[m.materialIndex],_=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let b=_,v=y;b<v;b+=3){let M=a.getX(b),T=a.getX(b+1),w=a.getX(b+2);i=Cr(this,g,e,n,c,u,h,M,T,w),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){let _=a.getX(m),y=a.getX(m+1),b=a.getX(m+2);i=Cr(this,s,e,n,c,u,h,_,y,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(o!==void 0)if(Array.isArray(s))for(let p=0,x=d.length;p<x;p++){let m=d[p],g=s[m.materialIndex],_=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=_,v=y;b<v;b+=3){let M=b,T=b+1,w=b+2;i=Cr(this,g,e,n,c,u,h,M,T,w),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){let _=m,y=m+1,b=m+2;i=Cr(this,s,e,n,c,u,h,_,y,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Zu(l,e,t,n,i,r,s,a){let o;if(e.side===gc?o=n.intersectTriangle(s,r,i,!0,a):o=n.intersectTriangle(i,r,s,e.side===jn,a),o===null)return null;Rr.copy(a),Rr.applyMatrix4(l.matrixWorld);let c=t.ray.origin.distanceTo(Rr);return c<t.near||c>t.far?null:{distance:c,point:Rr.clone(),object:l}}function Cr(l,e,t,n,i,r,s,a,o,c){l.getVertexPosition(a,Sr),l.getVertexPosition(o,Er),l.getVertexPosition(c,wr);let u=Zu(l,e,t,n,Sr,Er,wr,Yl);if(u){let h=new R;en.getBarycoord(Yl,Sr,Er,wr,h),i&&(u.uv=en.getInterpolatedAttribute(i,a,o,c,h,new le)),r&&(u.uv1=en.getInterpolatedAttribute(r,a,o,c,h,new le)),s&&(u.normal=en.getInterpolatedAttribute(s,a,o,c,h,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:o,c,normal:new R,materialIndex:0};en.getNormal(Sr,Er,wr,d.normal),u.face=d,u.barycoord=h}return u}var Li=new qe,ql=new qe,Kl=new qe,Ju=new qe,jl=new J,Ir=new R,va=new Ue,Zl=new J,Ta=new Mn,Vi=class extends lt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Oa,this.bindMatrix=new J,this.bindMatrixInverse=new J,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xe),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ir),this.boundingBox.expandByPoint(Ir)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ue),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ir),this.boundingSphere.expandByPoint(Ir)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),va.copy(this.boundingSphere),va.applyMatrix4(i),e.ray.intersectsSphere(va)!==!1&&(Zl.copy(i).invert(),Ta.copy(e.ray).applyMatrix4(Zl),!(this.boundingBox!==null&&Ta.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ta)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new qe,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Oa?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===yc?this.bindMatrixInverse.copy(this.bindMatrix).invert():ie("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;ql.fromBufferAttribute(i.attributes.skinIndex,e),Kl.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Li.copy(t),t.set(0,0,0,0)):(Li.set(...t,1),t.set(0,0,0)),Li.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let s=Kl.getComponent(r);if(s!==0){let a=ql.getComponent(r);jl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Ju.copy(Li).applyMatrix4(jl),s)}}return t.isVector4&&(t.w=Li.w),t.applyMatrix4(this.bindMatrixInverse)}},ni=class extends me{constructor(){super(),this.isBone=!0,this.type="Bone"}},ii=class extends ot{constructor(e=null,t=1,n=1,i,r,s,a,o,c=Zn,u=Zn,h,d){super(null,s,a,o,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Jl=new J,Qu=new J,Gi=class l{constructor(e=[],t=[]){this.uuid=at(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ie("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new J)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new J;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,s=e.length;r<s;r++){let a=e[r]?e[r].matrixWorld:Qu;Jl.multiplyMatrices(a,t[r]),Jl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new l(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ii(t,e,e,mo,vt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],s=t[r];s===void 0&&(ie("Skeleton: No bone found with UUID:",r),s=new ni),this.bones.push(s),this.boneInverses.push(new J().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let s=t[i];e.bones.push(s.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},an=class extends we{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Yn=new J,Ql=new J,Pr=[],ec=new Xe,eh=new J,Di=new lt,Fi=new Ue,Hi=class extends lt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new an(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,eh)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xe),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yn),ec.copy(e.boundingBox).applyMatrix4(Yn),this.boundingBox.union(ec)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ue),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yn),Fi.copy(e.boundingSphere).applyMatrix4(Yn),this.boundingSphere.union(Fi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,s=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Di.geometry=this.geometry,Di.material=this.material,Di.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fi.copy(this.boundingSphere),Fi.applyMatrix4(n),e.ray.intersectsSphere(Fi)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Yn),Ql.multiplyMatrices(n,Yn),Di.matrixWorld=Ql,Di.raycast(e,Pr);for(let s=0,a=Pr.length;s<a;s++){let o=Pr[s];o.instanceId=r,o.object=this,t.push(o)}Pr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new an(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ii(new Float32Array(i*this.count),i,this.count,Tc,vt));let r=this.morphTexture.source.data.data,s=0;for(let c=0;c<n.length;c++)s+=n[c];let a=this.geometry.morphTargetsRelative?1:1-s,o=i*e;return r[o]=a,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ma=new R,th=new R,nh=new W,Lt=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Ma.subVectors(n,t).cross(th.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Ma),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||nh.getNormalMatrix(e),i=this.coplanarPoint(Ma).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},_n=new Ue,ih=new le(.5,.5),Lr=new R,Kr=class{constructor(e=new Lt,t=new Lt,n=new Lt,i=new Lt,r=new Lt,s=new Lt){this.planes=[e,t,n,i,r,s]}set(e,t,n,i,r,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=tn,n=!1){let i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],p=r[8],x=r[9],m=r[10],g=r[11],_=r[12],y=r[13],b=r[14],v=r[15];if(i[0].setComponents(c-s,f-u,g-p,v-_).normalize(),i[1].setComponents(c+s,f+u,g+p,v+_).normalize(),i[2].setComponents(c+a,f+h,g+x,v+y).normalize(),i[3].setComponents(c-a,f-h,g-x,v-y).normalize(),n)i[4].setComponents(o,d,m,b).normalize(),i[5].setComponents(c-o,f-d,g-m,v-b).normalize();else if(i[4].setComponents(c-o,f-d,g-m,v-b).normalize(),t===tn)i[5].setComponents(c+o,f+d,g+m,v+b).normalize();else if(t===zi)i[5].setComponents(o,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_n.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_n.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_n)}intersectsSprite(e){_n.center.set(0,0,0);let t=ih.distanceTo(e.center);return _n.radius=.7071067811865476+t,_n.applyMatrix4(e.matrixWorld),this.intersectsSphere(_n)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Lr.x=i.normal.x>0?e.max.x:e.min.x,Lr.y=i.normal.y>0?e.max.y:e.min.y,Lr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var gt=class extends Ie{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},jr=new R,Zr=new R,tc=new J,Ui=new Mn,Dr=new Ue,Sa=new R,nc=new R,Sn=class extends me{constructor(e=new Ke,t=new gt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)jr.fromBufferAttribute(t,i-1),Zr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=jr.distanceTo(Zr);e.setAttribute("lineDistance",new Fe(n,1))}else ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(i),Dr.radius+=r,e.ray.intersectsSphere(Dr)===!1)return;tc.copy(i).invert(),Ui.copy(e.ray).applyMatrix4(tc);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,s.start),p=Math.min(u.count,s.start+s.count);for(let x=f,m=p-1;x<m;x+=c){let g=u.getX(x),_=u.getX(x+1),y=Fr(this,e,Ui,o,g,_,x);y&&t.push(y)}if(this.isLineLoop){let x=u.getX(p-1),m=u.getX(f),g=Fr(this,e,Ui,o,x,m,p-1);g&&t.push(g)}}else{let f=Math.max(0,s.start),p=Math.min(d.count,s.start+s.count);for(let x=f,m=p-1;x<m;x+=c){let g=Fr(this,e,Ui,o,x,x+1,x);g&&t.push(g)}if(this.isLineLoop){let x=Fr(this,e,Ui,o,p-1,f,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Fr(l,e,t,n,i,r,s){let a=l.geometry.attributes.position;if(jr.fromBufferAttribute(a,i),Zr.fromBufferAttribute(a,r),t.distanceSqToSegment(jr,Zr,Sa,nc)>n)return;Sa.applyMatrix4(l.matrixWorld);let c=e.ray.origin.distanceTo(Sa);if(!(c<e.near||c>e.far))return{distance:c,point:nc.clone().applyMatrix4(l.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:l}}var ic=new R,rc=new R,on=class extends Sn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)ic.fromBufferAttribute(t,i),rc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ic.distanceTo(rc);e.setAttribute("lineDistance",new Fe(n,1))}else ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Xi=class extends Sn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ct=class extends Ie{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},sc=new J,Ya=new Mn,Ur=new Ue,Nr=new R,Bt=class extends me{constructor(e=new Ke,t=new ct){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(i),Ur.radius+=r,e.ray.intersectsSphere(Ur)===!1)return;sc.copy(i).invert(),Ya.copy(e.ray).applyMatrix4(sc);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,s.start),f=Math.min(c.count,s.start+s.count);for(let p=d,x=f;p<x;p++){let m=c.getX(p);Nr.fromBufferAttribute(h,m),ac(Nr,m,o,i,e,t,this)}}else{let d=Math.max(0,s.start),f=Math.min(h.count,s.start+s.count);for(let p=d,x=f;p<x;p++)Nr.fromBufferAttribute(h,p),ac(Nr,p,o,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ac(l,e,t,n,i,r,s){let a=Ya.distanceSqToPoint(l);if(a<t){let o=new R;Ya.closestPointToPoint(l,o),o.applyMatrix4(n);let c=i.ray.origin.distanceTo(o);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:o,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}function wc(l){let e={};for(let t in l){e[t]={};for(let n in l[t]){let i=l[t][n];if(oc(i))i.isRenderTargetTexture?(ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(oc(i[0])){let r=[];for(let s=0,a=i.length;s<a;s++)r[s]=i[s].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Pe(l){let e={};for(let t=0;t<l.length;t++){let n=wc(l[t]);for(let i in n)e[i]=n[i]}return e}function oc(l){return l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)}var En=class extends Ie{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xo,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ne=class extends En{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return K(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new $(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new $(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new $(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Wi=class extends Ie{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new $(16777215),this.specular=new $(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xo,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=ss,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Br(l,e){return!l||l.constructor===e?l:typeof e.BYTES_PER_ELEMENT=="number"?new e(l):Array.prototype.slice.call(l)}function rh(l){function e(i,r){return l[i]-l[r]}let t=l.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function lc(l,e,t){let n=l.length,i=new l.constructor(n);for(let r=0,s=0;s!==n;++r){let a=t[r]*e;for(let o=0;o!==e;++o)i[s++]=l[a+o]}return i}function Ac(l,e,t,n){let i=1,r=l[0];for(;r!==void 0&&r[n]===void 0;)r=l[i++];if(r===void 0)return;let s=r[n];if(s!==void 0)if(Array.isArray(s))do s=r[n],s!==void 0&&(e.push(r.time),t.push(...s)),r=l[i++];while(r!==void 0);else if(s.toArray!==void 0)do s=r[n],s!==void 0&&(e.push(r.time),s.toArray(t,t.length)),r=l[i++];while(r!==void 0);else do s=r[n],s!==void 0&&(e.push(r.time),t.push(s)),r=l[i++];while(r!==void 0)}var xt=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let s;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}s=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let o=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(i=r,r=t[--n-1],e>=r)break e}s=n,n=0;break t}break n}for(;n<s;){let a=n+s>>>1;e<t[a]?s=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let s=0;s!==i;++s)t[s]=n[r+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jr=class extends xt{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:za,endingEnd:za}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,s=e+1,a=i[r],o=i[s];if(a===void 0)switch(this.getSettings_().endingStart){case Va:r=e,a=2*t-n;break;case Ga:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(o===void 0)switch(this.getSettings_().endingEnd){case Va:s=e,o=2*n-t;break;case Ga:s=1,o=n+i[1]-i[0];break;default:s=e-1,o=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(o-n),this._offsetPrev=r*u,this._offsetNext=s*u}interpolate_(e,t,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),x=p*p,m=x*p,g=-d*m+2*d*x-d*p,_=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*p+1,y=(-1-f)*m+(1.5+f)*x+.5*p,b=f*m-f*x;for(let v=0;v!==a;++v)r[v]=g*s[u+v]+_*s[c+v]+y*s[o+v]+b*s[h+v];return r}},Qr=class extends xt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==a;++d)r[d]=s[c+d]*h+s[o+d]*u;return r}},es=class extends xt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},ts=class extends xt{interpolate_(e,t,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){let x=(n-t)/(i-t),m=1-x;for(let g=0;g!==a;++g)r[g]=s[c+g]*m+s[o+g]*x;return r}let f=a*2,p=e-1;for(let x=0;x!==a;++x){let m=s[c+x],g=s[o+x],_=p*f+x*2,y=d[_],b=d[_+1],v=e*f+x*2,M=h[v],T=h[v+1],w=(n-t)/(i-t),C,A,S,U,L;for(let B=0;B<8;B++){C=w*w,A=C*w,S=1-w,U=S*S,L=U*S;let O=L*t+3*U*w*y+3*S*C*M+A*i-n;if(Math.abs(O)<1e-10)break;let F=3*U*(y-t)+6*S*w*(M-y)+3*C*(i-M);if(Math.abs(F)<1e-10)break;w=w-O/F,w=Math.max(0,Math.min(1,w))}r[x]=L*m+3*U*w*b+3*S*C*T+A*g}return r}},Be=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Br(t,this.TimeBufferType),this.values=Br(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Br(e.times,Array),values:Br(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new es(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ts(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case vn:t=this.InterpolantFactoryMethodDiscrete;break;case Tn:t=this.InterpolantFactoryMethodLinear;break;case zr:t=this.InterpolantFactoryMethodSmooth;break;case ka:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ie("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vn;case this.InterpolantFactoryMethodLinear:return Tn;case this.InterpolantFactoryMethodSmooth:return zr;case this.InterpolantFactoryMethodBezier:return ka}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,s=i-1;for(;r!==i&&n[r]<e;)++r;for(;s!==-1&&n[s]>t;)--s;if(++s,r!==0||s!==i){r>=s&&(s=Math.max(s,1),r=s-1);let a=this.getValueSize();this.times=n.slice(r,s),this.values=this.values.slice(r*a,s*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ue("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(ue("KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==r;a++){let o=n[a];if(typeof o=="number"&&isNaN(o)){ue("KeyframeTrack: Time is not a valid number.",this,a,o),e=!1;break}if(s!==null&&s>o){ue("KeyframeTrack: Out of order keys.",this,a,o,s),e=!1;break}s=o}if(i!==void 0&&xu(i))for(let a=0,o=i.length;a!==o;++a){let c=i[a];if(isNaN(c)){ue("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===zr,r=e.length-1,s=1;for(let a=1;a<r;++a){let o=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)o=!0;else{let h=a*n,d=h-n,f=h+n;for(let p=0;p!==n;++p){let x=t[h+p];if(x!==t[d+p]||x!==t[f+p]){o=!0;break}}}if(o){if(a!==s){e[s]=e[a];let h=a*n,d=s*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++s}}if(r>0){e[s]=e[r];for(let a=r*n,o=s*n,c=0;c!==n;++c)t[o+c]=t[a+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Be.prototype.ValueTypeName="";Be.prototype.TimeBufferType=Float32Array;Be.prototype.ValueBufferType=Float32Array;Be.prototype.DefaultInterpolation=Tn;var Ot=class extends Be{constructor(e,t,n){super(e,t,n)}};Ot.prototype.ValueTypeName="bool";Ot.prototype.ValueBufferType=Array;Ot.prototype.DefaultInterpolation=vn;Ot.prototype.InterpolantFactoryMethodLinear=void 0;Ot.prototype.InterpolantFactoryMethodSmooth=void 0;var $i=class extends Be{constructor(e,t,n,i){super(e,t,n,i)}};$i.prototype.ValueTypeName="color";var _t=class extends Be{constructor(e,t,n,i){super(e,t,n,i)}};_t.prototype.ValueTypeName="number";var ns=class extends xt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=(n-t)/(i-t),c=e*a;for(let u=c+a;c!==u;c+=4)He.slerpFlat(r,0,s,c-a,s,c,o);return r}},yt=class extends Be{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new ns(this.times,this.values,this.getValueSize(),e)}};yt.prototype.ValueTypeName="quaternion";yt.prototype.InterpolantFactoryMethodSmooth=void 0;var kt=class extends Be{constructor(e,t,n){super(e,t,n)}};kt.prototype.ValueTypeName="string";kt.prototype.ValueBufferType=Array;kt.prototype.DefaultInterpolation=vn;kt.prototype.InterpolantFactoryMethodLinear=void 0;kt.prototype.InterpolantFactoryMethodSmooth=void 0;var bt=class extends Be{constructor(e,t,n,i){super(e,t,n,i)}};bt.prototype.ValueTypeName="vector";var Yi=class{constructor(e="",t=-1,n=[],i=Mc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=at(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let s=0,a=n.length;s!==a;++s)t.push(ah(n[s]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,s=n.length;r!==s;++r)t.push(Be.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,s=[];for(let a=0;a<r;a++){let o=[],c=[];o.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let u=rh(o);o=lc(o,1,u),c=lc(c,1,u),!i&&o[0]===0&&(o.push(r),c.push(c[0])),s.push(new _t(".morphTargetInfluences["+t[a].name+"]",o,c).scale(1/n))}return new this(e,-1,s)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,o=e.length;a<o;a++){let c=e[a],u=c.name.match(r);if(u&&u.length>1){let h=u[1],d=i[h];d||(i[h]=d=[]),d.push(c)}}let s=[];for(let a in i)s.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return s}static parseAnimation(e,t){if(ie("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return ue("AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,p,x){if(f.length!==0){let m=[],g=[];Ac(f,m,g,p),m.length!==0&&x.push(new h(d,m,g))}},i=[],r=e.name||"default",s=e.fps||30,a=e.blendMode,o=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let x=0;x<d[p].morphTargets.length;x++)f[d[p].morphTargets[x]]=-1;for(let x in f){let m=[],g=[];for(let _=0;_!==d[p].morphTargets.length;++_){let y=d[p];m.push(y.time),g.push(y.morphTarget===x?1:0)}i.push(new _t(".morphTargetInfluence["+x+"]",m,g))}o=f.length*s}else{let f=".bones["+t[h].name+"]";n(bt,f+".position",d,"pos",i),n(yt,f+".quaternion",d,"rot",i),n(bt,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,o,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function sh(l){switch(l.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return _t;case"vector":case"vector2":case"vector3":case"vector4":return bt;case"color":return $i;case"quaternion":return yt;case"bool":case"boolean":return Ot;case"string":return kt}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+l)}function ah(l){if(l.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=sh(l.type);if(l.times===void 0){let t=[],n=[];Ac(l.keys,t,n,"value"),l.times=t,l.values=n}return e.parse!==void 0?e.parse(l):new e(l.name,l.times,l.values,l.interpolation)}var pt={enabled:!1,files:{},add:function(l,e){this.enabled!==!1&&(cc(l)||(this.files[l]=e))},get:function(l){if(this.enabled!==!1&&!cc(l))return this.files[l]},remove:function(l){delete this.files[l]},clear:function(){this.files={}}};function cc(l){try{let e=l.slice(l.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var is=class{constructor(e,t,n){let i=this,r=!1,s=0,a=0,o,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,s,a),r=!0},this.itemEnd=function(u){s++,i.onProgress!==void 0&&i.onProgress(u,s,a),s===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return o?o(u):u},this.setURLModifier=function(u){return o=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],p=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Rc=new is,We=class{constructor(e){this.manager=e!==void 0?e:Rc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};We.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pt={},qa=class extends Error{constructor(e,t){super(e),this.response=t}},zt=class extends We{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=pt.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Pt[e]!==void 0){Pt[e].push({onLoad:t,onProgress:n,onError:i});return}Pt[e]=[],Pt[e].push({onLoad:t,onProgress:n,onError:i});let s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,o=this.responseType;fetch(s).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&ie("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Pt[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,x=0,m=new ReadableStream({start(g){_();function _(){h.read().then(({done:y,value:b})=>{if(y)g.close();else{x+=b.byteLength;let v=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:f});for(let M=0,T=u.length;M<T;M++){let w=u[M];w.onProgress&&w.onProgress(v)}g.enqueue(b),_()}},y=>{g.error(y)})}}});return new Response(m)}else throw new qa(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(o){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{pt.add(`file:${e}`,c);let u=Pt[e];delete Pt[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Pt[e];if(u===void 0)throw this.manager.itemError(e),c;delete Pt[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var qn=new WeakMap,rs=class extends We{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,s=pt.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0);else{let h=qn.get(s);h===void 0&&(h=[],qn.set(s,h)),h.push({onLoad:t,onError:i})}return s}let a=Hr("img");function o(){u(),t&&t(this);let h=qn.get(this)||[];for(let d=0;d<h.length;d++){let f=h[d];f.onLoad&&f.onLoad(this)}qn.delete(this),r.manager.itemEnd(e)}function c(h){u(),i&&i(h),pt.remove(`image:${e}`);let d=qn.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(h)}qn.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",o,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",o,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),pt.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var qi=class extends We{constructor(e){super(e)}load(e,t,n,i){let r=this,s=new ii,a=new zt(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(o){let c;try{c=r.parse(o)}catch(u){i!==void 0?i(u):ue(u);return}c.image!==void 0?s.image=c.image:c.data!==void 0&&(s.image.width=c.width,s.image.height=c.height,s.image.data=c.data),s.wrapS=c.wrapS!==void 0?c.wrapS:Ft,s.wrapT=c.wrapT!==void 0?c.wrapT:Ft,s.magFilter=c.magFilter!==void 0?c.magFilter:Ye,s.minFilter=c.minFilter!==void 0?c.minFilter:Ye,s.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(s.colorSpace=c.colorSpace),c.flipY!==void 0&&(s.flipY=c.flipY),c.format!==void 0&&(s.format=c.format),c.type!==void 0&&(s.type=c.type),c.mipmaps!==void 0&&(s.mipmaps=c.mipmaps,s.minFilter=ai),c.mipmapCount===1&&(s.minFilter=Ye),c.generateMipmaps!==void 0&&(s.generateMipmaps=c.generateMipmaps),s.needsUpdate=!0,t&&t(s,c)},n,i),s}},Ki=class extends We{constructor(e){super(e)}load(e,t,n,i){let r=new ot,s=new rs(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},ri=class extends me{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Ea=new J,uc=new R,hc=new R,ji=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=po,this.map=null,this.mapPass=null,this.matrix=new J,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kr,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;uc.setFromMatrixPosition(e.matrixWorld),t.position.copy(uc),hc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hc),t.updateMatrixWorld(),Ea.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ea,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===zi||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ea)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Or=new R,kr=new He,ft=new R,Zi=class extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new J,this.projectionMatrix=new J,this.projectionMatrixInverse=new J,this.coordinateSystem=tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Or,kr,ft),ft.x===1&&ft.y===1&&ft.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Or,kr,ft.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Or,kr,ft),ft.x===1&&ft.y===1&&ft.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Or,kr,ft.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Qt=new R,dc=new le,fc=new le,wn=class extends Zi{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Qn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ni*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qn*2*Math.atan(Math.tan(Ni*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qt.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qt.x,Qt.y).multiplyScalar(-e/Qt.z),Qt.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qt.x,Qt.y).multiplyScalar(-e/Qt.z)}getViewSize(e,t){return this.getViewBounds(e,dc,fc),t.subVectors(fc,dc)}setViewOffset(e,t,n,i,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ni*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,s=this.view;if(this.view!==null&&this.view.enabled){let o=s.fullWidth,c=s.fullHeight;r+=s.offsetX*i/o,t-=s.offsetY*n/c,i*=s.width/o,n*=s.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ka=class extends ji{constructor(){super(new wn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Qn*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Ji=class extends ri{constructor(e,t,n=0,i=Math.PI/3,r=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.distance=n,this.angle=i,this.penumbra=r,this.decay=s,this.map=null,this.shadow=new Ka}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},ja=class extends ji{constructor(){super(new wn(90,1,.5,500)),this.isPointLightShadow=!0}},Qi=class extends ri{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ja}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},si=class extends Zi{constructor(e=-1,t=1,n=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,s=n+e,a=i+t,o=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,a-=u*this.view.offsetY,o=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Za=class extends ji{constructor(){super(new si(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},er=class extends ri{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new Za}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Vt=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var wa=new WeakMap,tr=class extends We{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ie("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ie("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,s=pt.get(`image-bitmap:${e}`);if(s!==void 0){if(r.manager.itemStart(e),s.then){s.then(c=>{wa.has(s)===!0?(i&&i(wa.get(s)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let o=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){pt.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){i&&i(c),wa.set(o,c),pt.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});pt.add(`image-bitmap:${e}`,o),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var vo="\\[\\]\\.:\\/",oh=new RegExp("["+vo+"]","g"),To="[^"+vo+"]",lh="[^"+vo.replace("\\.","")+"]",ch=/((?:WC+[\/:])*)/.source.replace("WC",To),uh=/(WCOD+)?/.source.replace("WCOD",lh),hh=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",To),dh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",To),fh=new RegExp("^"+ch+uh+hh+dh+"$"),ph=["material","materials","bones","map"],Ja=class{constructor(e,t,n){let i=n||ce.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ce=class l{constructor(e,t,n){this.path=t,this.parsedPath=n||l.parseTrackName(t),this.node=l.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new l.Composite(e,t,n):new l(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(oh,"")}static parseTrackName(e){let t=fh.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);ph.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let s=0;s<r.length;s++){let a=r[s];if(a.name===t||a.uuid===t)return a;let o=n(a.children);if(o)return o}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=l.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ie("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let s=e[i];if(s===void 0){let c=t.nodeName;ue("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}o=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else s.fromArray!==void 0&&s.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(o=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ce.Composite=Ja;ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var wg=new Float32Array(1);var Qa=class l{static{l.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");var mh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gh=`#ifdef USE_ALPHAHASH
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
#endif`,xh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_h=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vh=`#ifdef USE_AOMAP
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
#endif`,Th=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mh=`#ifdef USE_BATCHING
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
#endif`,Sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ah=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Rh=`#ifdef USE_IRIDESCENCE
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
#endif`,Ch=`#ifdef USE_BUMPMAP
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
#endif`,Ih=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ph=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Uh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Nh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Oh=`#define PI 3.141592653589793
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
} // validated`,kh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zh=`vec3 transformedNormal = objectNormal;
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
#endif`,Vh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wh="gl_FragColor = linearToOutputTexel( gl_FragColor );",$h=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yh=`#ifdef USE_ENVMAP
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
#endif`,qh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kh=`#ifdef USE_ENVMAP
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
#endif`,jh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zh=`#ifdef USE_ENVMAP
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
#endif`,Jh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,td=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nd=`#ifdef USE_GRADIENTMAP
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
}`,id=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ad=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,od=`#ifdef USE_ENVMAP
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
#endif`,ld=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dd=`PhysicalMaterial material;
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
#endif`,fd=`uniform sampler2D dfgLUT;
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
}`,pd=`
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
#endif`,md=`#if defined( RE_IndirectDiffuse )
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
#endif`,gd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xd=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,_d=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Td=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Md=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ed=`#if defined( USE_POINTS_UV )
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
#endif`,wd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ad=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Id=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`#ifdef USE_MORPHTARGETS
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
#endif`,Ld=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Od=`#ifdef USE_NORMALMAP
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
#endif`,kd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$d=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ef=`float getShadowMask() {
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
}`,tf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nf=`#ifdef USE_SKINNING
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
#endif`,rf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sf=`#ifdef USE_SKINNING
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
#endif`,af=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,of=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,uf=`#ifdef USE_TRANSMISSION
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
#endif`,hf=`#ifdef USE_TRANSMISSION
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
#endif`,df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xf=`uniform sampler2D t2D;
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
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tf=`#include <common>
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
}`,Mf=`#if DEPTH_PACKING == 3200
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
}`,Sf=`#define DISTANCE
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
}`,Ef=`#define DISTANCE
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
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Af=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`uniform float scale;
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
}`,Cf=`uniform vec3 diffuse;
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
}`,If=`#include <common>
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
}`,Pf=`uniform vec3 diffuse;
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
}`,Lf=`#define LAMBERT
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
}`,Df=`#define LAMBERT
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
}`,Ff=`#define MATCAP
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
}`,Uf=`#define MATCAP
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
}`,Nf=`#define NORMAL
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
}`,Bf=`#define NORMAL
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
}`,Of=`#define PHONG
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
}`,kf=`#define PHONG
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
}`,zf=`#define STANDARD
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
}`,Vf=`#define STANDARD
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
}`,Gf=`#define TOON
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
}`,Hf=`#define TOON
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
}`,Xf=`uniform float size;
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
}`,Wf=`uniform vec3 diffuse;
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
}`,$f=`#include <common>
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
}`,Yf=`uniform vec3 color;
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
}`,qf=`uniform float rotation;
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
}`,Kf=`uniform vec3 diffuse;
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
}`,Z={alphahash_fragment:mh,alphahash_pars_fragment:gh,alphamap_fragment:xh,alphamap_pars_fragment:_h,alphatest_fragment:yh,alphatest_pars_fragment:bh,aomap_fragment:vh,aomap_pars_fragment:Th,batching_pars_vertex:Mh,batching_vertex:Sh,begin_vertex:Eh,beginnormal_vertex:wh,bsdfs:Ah,iridescence_fragment:Rh,bumpmap_pars_fragment:Ch,clipping_planes_fragment:Ih,clipping_planes_pars_fragment:Ph,clipping_planes_pars_vertex:Lh,clipping_planes_vertex:Dh,color_fragment:Fh,color_pars_fragment:Uh,color_pars_vertex:Nh,color_vertex:Bh,common:Oh,cube_uv_reflection_fragment:kh,defaultnormal_vertex:zh,displacementmap_pars_vertex:Vh,displacementmap_vertex:Gh,emissivemap_fragment:Hh,emissivemap_pars_fragment:Xh,colorspace_fragment:Wh,colorspace_pars_fragment:$h,envmap_fragment:Yh,envmap_common_pars_fragment:qh,envmap_pars_fragment:Kh,envmap_pars_vertex:jh,envmap_physical_pars_fragment:od,envmap_vertex:Zh,fog_vertex:Jh,fog_pars_vertex:Qh,fog_fragment:ed,fog_pars_fragment:td,gradientmap_pars_fragment:nd,lightmap_pars_fragment:id,lights_lambert_fragment:rd,lights_lambert_pars_fragment:sd,lights_pars_begin:ad,lights_toon_fragment:ld,lights_toon_pars_fragment:cd,lights_phong_fragment:ud,lights_phong_pars_fragment:hd,lights_physical_fragment:dd,lights_physical_pars_fragment:fd,lights_fragment_begin:pd,lights_fragment_maps:md,lights_fragment_end:gd,lightprobes_pars_fragment:xd,logdepthbuf_fragment:_d,logdepthbuf_pars_fragment:yd,logdepthbuf_pars_vertex:bd,logdepthbuf_vertex:vd,map_fragment:Td,map_pars_fragment:Md,map_particle_fragment:Sd,map_particle_pars_fragment:Ed,metalnessmap_fragment:wd,metalnessmap_pars_fragment:Ad,morphinstance_vertex:Rd,morphcolor_vertex:Cd,morphnormal_vertex:Id,morphtarget_pars_vertex:Pd,morphtarget_vertex:Ld,normal_fragment_begin:Dd,normal_fragment_maps:Fd,normal_pars_fragment:Ud,normal_pars_vertex:Nd,normal_vertex:Bd,normalmap_pars_fragment:Od,clearcoat_normal_fragment_begin:kd,clearcoat_normal_fragment_maps:zd,clearcoat_pars_fragment:Vd,iridescence_pars_fragment:Gd,opaque_fragment:Hd,packing:Xd,premultiplied_alpha_fragment:Wd,project_vertex:$d,dithering_fragment:Yd,dithering_pars_fragment:qd,roughnessmap_fragment:Kd,roughnessmap_pars_fragment:jd,shadowmap_pars_fragment:Zd,shadowmap_pars_vertex:Jd,shadowmap_vertex:Qd,shadowmask_pars_fragment:ef,skinbase_vertex:tf,skinning_pars_vertex:nf,skinning_vertex:rf,skinnormal_vertex:sf,specularmap_fragment:af,specularmap_pars_fragment:of,tonemapping_fragment:lf,tonemapping_pars_fragment:cf,transmission_fragment:uf,transmission_pars_fragment:hf,uv_pars_fragment:df,uv_pars_vertex:ff,uv_vertex:pf,worldpos_vertex:mf,background_vert:gf,background_frag:xf,backgroundCube_vert:_f,backgroundCube_frag:yf,cube_vert:bf,cube_frag:vf,depth_vert:Tf,depth_frag:Mf,distance_vert:Sf,distance_frag:Ef,equirect_vert:wf,equirect_frag:Af,linedashed_vert:Rf,linedashed_frag:Cf,meshbasic_vert:If,meshbasic_frag:Pf,meshlambert_vert:Lf,meshlambert_frag:Df,meshmatcap_vert:Ff,meshmatcap_frag:Uf,meshnormal_vert:Nf,meshnormal_frag:Bf,meshphong_vert:Of,meshphong_frag:kf,meshphysical_vert:zf,meshphysical_frag:Vf,meshtoon_vert:Gf,meshtoon_frag:Hf,points_vert:Xf,points_frag:Wf,shadow_vert:$f,shadow_frag:Yf,sprite_vert:qf,sprite_frag:Kf},k={common:{diffuse:{value:new $(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new $(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new $(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},Cc={basic:{uniforms:Pe([k.common,k.specularmap,k.envmap,k.aomap,k.lightmap,k.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:Pe([k.common,k.specularmap,k.envmap,k.aomap,k.lightmap,k.emissivemap,k.bumpmap,k.normalmap,k.displacementmap,k.fog,k.lights,{emissive:{value:new $(0)},envMapIntensity:{value:1}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:Pe([k.common,k.specularmap,k.envmap,k.aomap,k.lightmap,k.emissivemap,k.bumpmap,k.normalmap,k.displacementmap,k.fog,k.lights,{emissive:{value:new $(0)},specular:{value:new $(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:Pe([k.common,k.envmap,k.aomap,k.lightmap,k.emissivemap,k.bumpmap,k.normalmap,k.displacementmap,k.roughnessmap,k.metalnessmap,k.fog,k.lights,{emissive:{value:new $(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:Pe([k.common,k.aomap,k.lightmap,k.emissivemap,k.bumpmap,k.normalmap,k.displacementmap,k.gradientmap,k.fog,k.lights,{emissive:{value:new $(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:Pe([k.common,k.bumpmap,k.normalmap,k.displacementmap,k.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:Pe([k.points,k.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:Pe([k.common,k.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:Pe([k.common,k.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:Pe([k.common,k.bumpmap,k.normalmap,k.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:Pe([k.sprite,k.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distance:{uniforms:Pe([k.common,k.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distance_vert,fragmentShader:Z.distance_frag},shadow:{uniforms:Pe([k.lights,k.fog,{color:{value:new $(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};Cc.physical={uniforms:Pe([Cc.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new $(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new $(0)},specularColor:{value:new $(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var jf=new W;jf.set(-1,0,0,0,1,0,0,0,1);var Vb={[to]:"LINEAR_TONE_MAPPING",[no]:"REINHARD_TONE_MAPPING",[io]:"CINEON_TONE_MAPPING",[ro]:"ACES_FILMIC_TONE_MAPPING",[ao]:"AGX_TONE_MAPPING",[oo]:"NEUTRAL_TONE_MAPPING",[so]:"CUSTOM_TONE_MAPPING"};var Gb=new Float32Array(16),Hb=new Float32Array(9),Xb=new Float32Array(4);var Wb={[to]:"Linear",[no]:"Reinhard",[io]:"Cineon",[ro]:"ACESFilmic",[ao]:"AgX",[oo]:"Neutral",[so]:"Custom"};var $b={[pc]:"SHADOWMAP_TYPE_PCF",[mc]:"SHADOWMAP_TYPE_VSM"};var Yb={[bc]:"ENVMAP_TYPE_CUBE",[co]:"ENVMAP_TYPE_CUBE",[vc]:"ENVMAP_TYPE_CUBE_UV"};var qb={[co]:"ENVMAP_MODE_REFRACTION"};var Kb={[ss]:"ENVMAP_BLENDING_MULTIPLY",[xc]:"ENVMAP_BLENDING_MIX",[_c]:"ENVMAP_BLENDING_ADD"};var Zf=new W;Zf.set(-1,0,0,0,1,0,0,0,1);var jb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);var as=class extends qi{constructor(e){super(e),this.type=oi}parse(e){let s=function(w,C){switch(w){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(C||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(C||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(C||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(C||""))}},h=function(w,C,A){C=C||1024;let U=w.pos,L=-1,B=0,z="",O=String.fromCharCode.apply(null,new Uint16Array(w.subarray(U,U+128)));for(;0>(L=O.indexOf(`
`))&&B<C&&U<w.byteLength;)z+=O,B+=O.length,U+=128,O=String.fromCharCode.apply(null,new Uint16Array(w.subarray(U,U+128)));return-1<L?(A!==!1&&(w.pos+=B+L+1),z+O.slice(0,L)):!1},d=function(w){let C=/^#\?(\S+)/,A=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,S=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,U=/^\s*FORMAT=(\S+)\s*$/,L=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,B={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},z,O;for((w.pos>=w.byteLength||!(z=h(w)))&&s(1,"no header found"),(O=z.match(C))||s(3,"bad initial token"),B.valid|=1,B.programtype=O[1],B.string+=z+`
`;z=h(w),z!==!1;){if(B.string+=z+`
`,z.charAt(0)==="#"){B.comments+=z+`
`;continue}if((O=z.match(A))&&(B.gamma=parseFloat(O[1])),(O=z.match(S))&&(B.exposure=parseFloat(O[1])),(O=z.match(U))&&(B.valid|=2,B.format=O[1]),(O=z.match(L))&&(B.valid|=4,B.height=parseInt(O[1],10),B.width=parseInt(O[2],10)),B.valid&2&&B.valid&4)break}return B.valid&2||s(3,"missing format specifier"),B.valid&4||s(3,"missing image size specifier"),B},f=function(w,C,A){let S=C;if(S<8||S>32767||w[0]!==2||w[1]!==2||w[2]&128)return new Uint8Array(w);S!==(w[2]<<8|w[3])&&s(3,"wrong scanline width");let U=new Uint8Array(4*C*A);U.length||s(4,"unable to allocate buffer space");let L=0,B=0,z=4*S,O=new Uint8Array(4),F=new Uint8Array(z),X=A;for(;X>0&&B<w.byteLength;){B+4>w.byteLength&&s(1),O[0]=w[B++],O[1]=w[B++],O[2]=w[B++],O[3]=w[B++],(O[0]!=2||O[1]!=2||(O[2]<<8|O[3])!=S)&&s(3,"bad rgbe scanline format");let D=0,H;for(;D<z&&B<w.byteLength;){H=w[B++];let N=H>128;if(N&&(H-=128),(H===0||D+H>z)&&s(3,"bad scanline data"),N){let G=w[B++];for(let Q=0;Q<H;Q++)F[D++]=G}else F.set(w.subarray(B,B+H),D),D+=H,B+=H}let I=S;for(let N=0;N<I;N++){let G=0;U[L]=F[N+G],G+=S,U[L+1]=F[N+G],G+=S,U[L+2]=F[N+G],G+=S,U[L+3]=F[N+G],L+=4}X--}return U},p=function(w,C,A,S){let U=w[C+3],L=Math.pow(2,U-128)/255;A[S+0]=w[C+0]*L,A[S+1]=w[C+1]*L,A[S+2]=w[C+2]*L,A[S+3]=1},x=function(w,C,A,S){let U=w[C+3],L=Math.pow(2,U-128)/255;A[S+0]=sn.toHalfFloat(Math.min(w[C+0]*L,65504)),A[S+1]=sn.toHalfFloat(Math.min(w[C+1]*L,65504)),A[S+2]=sn.toHalfFloat(Math.min(w[C+2]*L,65504)),A[S+3]=sn.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let g=d(m),_=g.width,y=g.height,b=f(m.subarray(m.pos),_,y),v,M,T;switch(this.type){case vt:T=b.length/4;let w=new Float32Array(T*4);for(let A=0;A<T;A++)p(b,A*4,w,A*4);v=w,M=vt;break;case oi:T=b.length/4;let C=new Uint16Array(T*4);for(let A=0;A<T;A++)x(b,A*4,C,A*4);v=C,M=oi;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:_,height:y,data:v,header:g.string,gamma:g.gamma,exposure:g.exposure,type:M}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(s,a){switch(s.type){case vt:case oi:s.colorSpace=Ce,s.minFilter=Ye,s.magFilter=Ye,s.generateMipmaps=!1,s.flipY=!0;break}t&&t(s,a)}return super.load(e,r,n,i)}};var os=class{static async loadHDRAsync(e){let n=await(await oe(e)).arrayBuffer(),r=new as().setDataType(vt).parse(n),s=r.data,a=new Float32Array(r.width*r.height*3);for(let o=0,c=0;o<s.length;o+=4,c+=3)a[c+0]=s[o+0],a[c+1]=s[o+1],a[c+2]=s[o+2];return[a,r.width,r.height]}};function Jf(l,e,t){return .212671*l+.71516*e+.072169*t}var An=class{width;height;img;cdf;totalSum;constructor(){this.width=0,this.height=0,this.img=null,this.cdf=null,this.totalSum=0}dispose(){this.img=null,this.cdf=null}buildCDF(){if(!this.img||!this.width||!this.height)return;let e=new Float32Array(this.width*this.height);for(let t=0;t<this.height;t++)for(let n=0;n<this.width;n++){let i=t*this.width*3+n*3;e[n+t*this.width]=Jf(this.img[i+0],this.img[i+1],this.img[i+2])}this.cdf=new Float32Array(this.width*this.height),this.cdf[0]=e[0];for(let t=1;t<this.width*this.height;t++)this.cdf[t]=this.cdf[t-1]+e[t];this.totalSum=this.cdf[this.width*this.height-1]}async loadMapAsync(e){return[this.img,this.width,this.height]=await os.loadHDRAsync(e),this.img==null?!1:(this.buildCDF(),!0)}};var je=class{name;baseColor=new E(1,1,1);anisotropic=0;emission=new E(0,0,0);padding1=0;metallic=0;roughness=.5;subsurface=0;specularTint=0;sheen=0;sheenTint=0;clearcoat=0;clearcoatGloss=0;specTrans=0;ior=1.5;mediumType=0;mediumDensity=0;mediumColor=new E(1,1,1);mediumAnisotropy=0;baseColorTexID=-1;metallicRoughnessTexID=-1;normalmapTexID=-1;emissionmapTexID=-1;opacity=1;alphaMode=0;alphaCutoff=0;materialType=0;materialxPayload=null;materialxParamDefs=[];materialxModelType="";constructor(){}toVec4Array(){return[new q(this.baseColor.x,this.baseColor.y,this.baseColor.z,this.anisotropic),new q(this.emission.x,this.emission.y,this.emission.z,this.padding1),new q(this.metallic,this.roughness,this.subsurface,this.specularTint),new q(this.sheen,this.sheenTint,this.clearcoat,this.clearcoatGloss),new q(this.specTrans,this.ior,this.mediumType,this.mediumDensity),new q(this.mediumColor.x,this.mediumColor.y,this.mediumColor.z,this.mediumAnisotropy),new q(this.baseColorTexID,this.metallicRoughnessTexID,this.normalmapTexID,this.emissionmapTexID),new q(this.opacity,this.alphaMode,this.alphaCutoff,this.materialType)]}copyTo(e){Object.assign(e,this)}};var ls=class extends pn{m_max_split_depth;m_num_nodes_for_regular;m_num_nodes_required;m_extra_refs_budget;m_min_overlap;m_num_nodes_archived;m_node_archive=[];constructor(e,t,n,i,r){super(e,t,!0),this.m_max_split_depth=n,this.m_min_overlap=i,this.m_extra_refs_budget=r,this.m_num_nodes_required=0,this.m_num_nodes_for_regular=0,this.m_num_nodes_archived=0}buildImpl(e,t){let n=new Array(t),i=new Array(t),r=new Y;for(let a=0;a<t;++a){let o=e[a].center();n[a]={bounds:e[a],center:o,idx:a},r.grow(o)}this.m_num_nodes_for_regular=2*t-1,this.m_num_nodes_required=Math.floor(this.m_num_nodes_for_regular*(1+this.m_extra_refs_budget)),this.initNodeAllocator(this.m_num_nodes_required);let s={startidx:0,numprims:t,ptr:null,isLeft:!1,bounds:this.m_bounds,centroid_bounds:r,level:0,index:0};this.buildNodeSplit(s,n)}buildNodeSplit(e,t){this.m_height=Math.max(this.m_height,e.level);let n=this.allocateNode();if(n.bounds=e.bounds,e.numprims<4){n.type=1,n.startidx=this.m_packed_indices.length,n.numprims=e.numprims;for(let i=e.startidx;i<e.startidx+e.numprims;++i)this.m_packed_indices.push(t[i].idx)}else{n.type=0;let i=e.centroid_bounds.maxdim(),r=e.centroid_bounds.center().get(i),s=this.findObjectSahSplit(e,t),a={dim:0,split:NaN,sah:Number.MAX_VALUE,overlap:0},o=0;if(e.level<this.m_max_split_depth&&this.m_nodecnt<this.m_num_nodes_required&&s.overlap>this.m_min_overlap&&(a=this.findSpatialSahSplit(e,t),!isNaN(a.split)&&a.sah<s.sah&&(o=1)),o===1){let v=e.startidx+e.numprims*2;t.length<v&&(t.length=v);let M=0;this.splitPrimRefs(a,e,t,T=>{M=T}),e.numprims+=M,r=a.split,i=a.dim}else r=isNaN(s.split)?r:s.split,i=isNaN(s.split)?i:s.dim;let c=new Y,u=new Y,h=new Y,d=new Y,f=e.startidx,p=e.numprims+e.startidx&1,x=(v,M)=>v<M,m=(v,M)=>v>=M,g=p?x:m,_=p?m:x;if(e.centroid_bounds.extents().get(i)>0){let v=e.startidx,M=e.startidx+e.numprims;for(;;){for(;v!==M&&g(t[v].center.get(i),r);)c.grow(t[v].bounds),h.grow(t[v].center),++v;if(v===M--)break;for(u.grow(t[v].bounds),d.grow(t[v].center);v!==M&&_(t[M].center.get(i),r);)u.grow(t[M].bounds),d.grow(t[M].center),--M;if(v===M)break;c.grow(t[M].bounds),h.grow(t[M].center),[t[v++],t[M]]=[t[M],t[v]]}f=v}if(f===e.startidx||f===e.startidx+e.numprims){f=e.startidx+(e.numprims>>1);for(let v=e.startidx;v<f;++v)c.grow(t[v].bounds),h.grow(t[v].center);for(let v=f;v<e.startidx+e.numprims;++v)u.grow(t[v].bounds),d.grow(t[v].center)}let y={startidx:e.startidx,numprims:f-e.startidx,ptr:n,isLeft:!0,bounds:c,centroid_bounds:h,level:e.level+1,index:0},b={startidx:f,numprims:e.numprims-(f-e.startidx),ptr:n,isLeft:!1,bounds:u,centroid_bounds:d,level:e.level+1,index:0};this.buildNodeSplit(b,t),this.buildNodeSplit(y,t)}e.ptr&&(e.isLeft?e.ptr.lc=n:e.ptr.rc=n)}findObjectSahSplit(e,t){let n=-1,i=Number.MAX_VALUE,r={dim:0,split:NaN,sah:i,overlap:0},s=e.centroid_bounds.extents();if(E.dot(s,s)===0)return r;let a=[[],[],[]];a[0]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new Y,count:0})),a[1]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new Y,count:0})),a[2]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new Y,count:0}));let o=1/e.bounds.surfaceArea(),c=e.centroid_bounds.pmin;for(let u=0;u<3;++u){let h=c.get(u),d=s.get(u),f=1/d;if(d===0)continue;for(let y=0;y<this.m_num_bins;++y)a[u][y].count=0,a[u][y].bounds=new Y;for(let y=e.startidx;y<e.startidx+e.numprims;++y){let b=y,v=Math.min(Math.floor(this.m_num_bins*((t[b].center.get(u)-h)*f)),this.m_num_bins-1);a[u][v].count++,a[u][v].bounds.grow(t[b].bounds)}let p=new Array(this.m_num_bins-1),x=new Y;for(let y=this.m_num_bins-1;y>0;--y)x.grow(a[u][y].bounds),p[y-1]=x.clone();let m=new Y,g=0,_=e.numprims;for(let y=0;y<this.m_num_bins-1;++y){m.grow(a[u][y].bounds),g+=a[u][y].count,_-=a[u][y].count;let b=this.m_traversal_cost+(g*m.surfaceArea()+_*p[y].surfaceArea())*o;b<i&&(r.dim=u,n=y,i=b,r.overlap=Cl(m,p[y]).surfaceArea()*o)}}return n!==-1&&(r.split=c.get(r.dim)+(n+1)*(s.get(r.dim)/this.m_num_bins),r.sah=i),r}findSpatialSahSplit(e,t){let r={dim:0,split:NaN,sah:Number.MAX_VALUE,overlap:0},s=e.bounds.extents(),a=1/e.bounds.surfaceArea();if(E.dot(s,s)===0)return r;let o=[[],[],[]];for(let f=0;f<3;++f)o[f]=Array(128).fill(null).map(()=>({bounds:new Y,enter:0,exit:0}));let c=e.bounds.pmin,u=e.bounds.extents().scale(1/128),h=new E(1/u.x,1/u.y,1/u.z);for(let f=e.startidx;f<e.startidx+e.numprims;++f){let p=t[f],x=E.clamp(p.bounds.pmin.subtract(c).multiply(h),new E(0,0,0),new E(127,127,127)),m=E.clamp(p.bounds.pmax.subtract(c).multiply(h),x,new E(127,127,127));for(let g=0;g<3;++g){if(s.get(g)===0)continue;let _=p;for(let y=x.get(g);y<m.get(g);++y){let b={..._},v={..._},M=c.get(g)+u.get(g)*(y+1);this.splitPrimRef(_,g,M,b,v)&&(o[g][y].bounds.grow(b.bounds),_=v)}o[g][m.get(g)].bounds.grow(_.bounds),o[g][x.get(g)].enter++,o[g][m.get(g)].exit++}}let d=new Array(127);for(let f=0;f<3;++f){if(s.get(f)===0)continue;let p=new Y;for(let _=127;_>0;--_)p=Rl(p,o[f][_].bounds),d[_-1]=p.clone();let x=new Y,m=0,g=e.numprims;for(let _=1;_<128;++_){x.grow(o[f][_-1].bounds),m+=o[f][_-1].enter,g-=o[f][_-1].exit;let y=this.m_traversal_cost+(x.surfaceArea()+d[_-1].surfaceArea()*g)*a;y<r.sah&&(r.sah=y,r.dim=f,r.split=c.get(f)+u.get(f)*_,r.overlap=0)}}return r}splitPrimRef(e,t,n,i,r){return i.idx=r.idx=e.idx,i.bounds=e.bounds.clone(),r.bounds=e.bounds.clone(),n>e.bounds.pmin.get(t)&&n<e.bounds.pmax.get(t)?(i.bounds.pmax.set(t,n),r.bounds.pmin.set(t,n),!0):!1}splitPrimRefs(e,t,n,i){let r=t.numprims;for(let s=t.startidx;s<t.startidx+t.numprims;++s){if(t.startidx+r>=n.length)throw new Error("Out of bounds");let a={...n[s]},o={...n[s]};this.splitPrimRef(n[s],e.dim,e.split,a,o)&&(n[s]=a,n[t.startidx+r++]=o)}i(r-t.numprims)}allocateNode(){if(this.m_nodecnt-this.m_num_nodes_archived>=this.m_num_nodes_for_regular){this.m_node_archive.push(this.m_nodes),this.m_num_nodes_archived+=this.m_num_nodes_for_regular,this.m_nodes=new Array(this.m_num_nodes_for_regular);for(let e=0;e<this.m_num_nodes_for_regular;++e)this.m_nodes[e]=new Un}return this.m_nodes[this.m_nodecnt++-this.m_num_nodes_archived]}initNodeAllocator(e){this.m_node_archive=[],this.m_nodecnt=0,this.m_nodes=new Array(e);for(let t=0;t<e;++t)this.m_nodes[t]=new Un}printStatistics(){let e=Math.floor((this.m_num_nodes_for_regular+1)/2),t=this.m_packed_indices.length;return["Class name: SplitBvh","SAH: enabled (forced)",`SAH bins: ${this.m_num_bins}`,`Max split depth: ${this.m_max_split_depth}`,`Min node overlap: ${this.m_min_overlap}`,`Number of triangles: ${e}`,`Number of triangle refs: ${t}`,`Ref duplication: ${(t-e)/e*100}%`,`Number of nodes: ${this.m_nodecnt}`,`Number of nodes in corresponding non-split BVH: ${this.m_num_nodes_for_regular}`,`Node overhead: ${(this.m_nodecnt-this.m_num_nodes_for_regular)/this.m_num_nodes_for_regular*100}%`,`Tree height: ${this.getHeight()}`].join(`
`)}getHeight(){return this.m_height}};var Mo=class extends Error{constructor(e){super(`found duplicate attribute: ${e.key}`)}},ae=class{constructor(e,t,n,i=!1){this.key=e;this.size=t;this.type=n;this.normalized=i;switch(n){case"BYTE":case"UNSIGNED_BYTE":this.sizeOfType=1;break;case"SHORT":case"UNSIGNED_SHORT":this.sizeOfType=2;break;case"FLOAT":this.sizeOfType=4;break;default:throw new Error(`Unknown gl type: ${n}`)}this.sizeInBytes=this.sizeOfType*t}key;size;type;normalized;sizeOfType;sizeInBytes},Te=class{static POSITION=new ae("position",3,"FLOAT");static NORMAL=new ae("normal",3,"FLOAT");static TANGENT=new ae("tangent",3,"FLOAT");static BITANGENT=new ae("bitangent",3,"FLOAT");static UV=new ae("uv",2,"FLOAT");static MATERIAL_INDEX=new ae("materialIndex",1,"SHORT");static MATERIAL_ENABLED=new ae("materialEnabled",1,"UNSIGNED_SHORT");static AMBIENT=new ae("ambient",3,"FLOAT");static DIFFUSE=new ae("diffuse",3,"FLOAT");static SPECULAR=new ae("specular",3,"FLOAT");static SPECULAR_EXPONENT=new ae("specularExponent",3,"FLOAT");static EMISSIVE=new ae("emissive",3,"FLOAT");static TRANSMISSION_FILTER=new ae("transmissionFilter",3,"FLOAT");static DISSOLVE=new ae("dissolve",1,"FLOAT");static ILLUMINATION=new ae("illumination",1,"UNSIGNED_SHORT");static REFRACTION_INDEX=new ae("refractionIndex",1,"FLOAT");static SHARPNESS=new ae("sharpness",1,"FLOAT");static MAP_DIFFUSE=new ae("mapDiffuse",1,"SHORT");static MAP_AMBIENT=new ae("mapAmbient",1,"SHORT");static MAP_SPECULAR=new ae("mapSpecular",1,"SHORT");static MAP_SPECULAR_EXPONENT=new ae("mapSpecularExponent",1,"SHORT");static MAP_DISSOLVE=new ae("mapDissolve",1,"SHORT");static ANTI_ALIASING=new ae("antiAliasing",1,"UNSIGNED_SHORT");static MAP_BUMP=new ae("mapBump",1,"SHORT");static MAP_DISPLACEMENT=new ae("mapDisplacement",1,"SHORT");static MAP_DECAL=new ae("mapDecal",1,"SHORT");static MAP_EMISSIVE=new ae("mapEmissive",1,"SHORT");stride;attributes;attributeMap;constructor(...e){this.attributes=e,this.attributeMap={};let t=0,n=0;for(let i of e){if(this.attributeMap[i.key])throw new Mo(i);t%i.sizeOfType!==0&&(t+=i.sizeOfType-t%i.sizeOfType,console.warn("Layout requires padding before "+i.key+" attribute")),this.attributeMap[i.key]={attribute:i,size:i.size,type:i.type,normalized:i.normalized,offset:t},t+=i.sizeInBytes,n=Math.max(n,i.sizeOfType)}t%n!==0&&(t+=n-t%n,console.warn("Layout requires padding at the back")),this.stride=t;for(let i of e)this.attributeMap[i.key].stride=this.stride}};var Qf=/^[og]\s*(.+)?/,ep=/^mtllib /,tp=/^usemtl /,np=/^usemap /,Ic=/\s+/,Pc=new R,So=new R,Lc=new R,Dc=new R,Ze=new R,cs=new $;function ip(){let l={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}let n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(i,r){let s=this._finalize(!1);s&&(s.inherited||s.groupCount<=0)&&this.materials.splice(s.index,1);let a={index:this.materials.length,name:i||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:s!==void 0?s.smooth:this.smooth,groupStart:s!==void 0?s.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(o){let c={index:typeof o=="number"?o:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(a),a},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(i){let r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),i&&this.materials.length>1)for(let s=this.materials.length-1;s>=0;s--)this.materials[s].groupCount<=0&&this.materials.splice(s,1);return i&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},n&&n.name&&typeof n.clone=="function"){let i=n.clone(0);i.inherited=!0,this.object.materials.push(i)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){let i=this.vertices,r=this.object.geometry.vertices;r.push(i[e+0],i[e+1],i[e+2]),r.push(i[t+0],i[t+1],i[t+2]),r.push(i[n+0],i[n+1],i[n+2])},addVertexPoint:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){let i=this.normals,r=this.object.geometry.normals;r.push(i[e+0],i[e+1],i[e+2]),r.push(i[t+0],i[t+1],i[t+2]),r.push(i[n+0],i[n+1],i[n+2])},addFaceNormal:function(e,t,n){let i=this.vertices,r=this.object.geometry.normals;Pc.fromArray(i,e),So.fromArray(i,t),Lc.fromArray(i,n),Ze.subVectors(Lc,So),Dc.subVectors(Pc,So),Ze.cross(Dc),Ze.normalize(),r.push(Ze.x,Ze.y,Ze.z),r.push(Ze.x,Ze.y,Ze.z),r.push(Ze.x,Ze.y,Ze.z)},addColor:function(e,t,n){let i=this.colors,r=this.object.geometry.colors;i[e]!==void 0&&r.push(i[e+0],i[e+1],i[e+2]),i[t]!==void 0&&r.push(i[t+0],i[t+1],i[t+2]),i[n]!==void 0&&r.push(i[n+0],i[n+1],i[n+2])},addUV:function(e,t,n){let i=this.uvs,r=this.object.geometry.uvs;r.push(i[e+0],i[e+1]),r.push(i[t+0],i[t+1]),r.push(i[n+0],i[n+1])},addDefaultUV:function(){let e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){let t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,i,r,s,a,o,c){let u=this.vertices.length,h=this.parseVertexIndex(e,u),d=this.parseVertexIndex(t,u),f=this.parseVertexIndex(n,u);if(this.addVertex(h,d,f),this.addColor(h,d,f),a!==void 0&&a!==""){let p=this.normals.length;h=this.parseNormalIndex(a,p),d=this.parseNormalIndex(o,p),f=this.parseNormalIndex(c,p),this.addNormal(h,d,f)}else this.addFaceNormal(h,d,f);if(i!==void 0&&i!==""){let p=this.uvs.length;h=this.parseUVIndex(i,p),d=this.parseUVIndex(r,p),f=this.parseUVIndex(s,p),this.addUV(h,d,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";let t=this.vertices.length;for(let n=0,i=e.length;n<i;n++){let r=this.parseVertexIndex(e[n],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";let n=this.vertices.length,i=this.uvs.length;for(let r=0,s=e.length;r<s;r++)this.addVertexLine(this.parseVertexIndex(e[r],n));for(let r=0,s=t.length;r<s;r++)this.addUVLine(this.parseUVIndex(t[r],i))}};return l.startObject("",!1),l}var ci=class extends We{constructor(e){super(e),this.materials=null}load(e,t,n,i){let r=this,s=new zt(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(a){try{t(r.parse(a))}catch(o){i?i(o):console.error(o),r.manager.itemError(e)}},n,i)}setMaterials(e){return this.materials=e,this}parse(e){let t=new ip;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));let n=e.split(`
`),i=[];for(let a=0,o=n.length;a<o;a++){let c=n[a].trimStart();if(c.length===0)continue;let u=c.charAt(0);if(u!=="#")if(u==="v"){let h=c.split(Ic);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(cs.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),_e),t.colors.push(cs.r,cs.g,cs.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(u==="f"){let d=c.slice(1).trim().split(Ic),f=[];for(let x=0,m=d.length;x<m;x++){let g=d[x];if(g.length>0){let _=g.split("/");f.push(_)}}let p=f[0];for(let x=1,m=f.length-1;x<m;x++){let g=f[x],_=f[x+1];t.addFace(p[0],g[0],_[0],p[1],g[1],_[1],p[2],g[2],_[2])}}else if(u==="l"){let h=c.substring(1).trim().split(" "),d=[],f=[];if(c.indexOf("/")===-1)d=h;else for(let p=0,x=h.length;p<x;p++){let m=h[p].split("/");m[0]!==""&&d.push(m[0]),m[1]!==""&&f.push(m[1])}t.addLineGeometry(d,f)}else if(u==="p"){let d=c.slice(1).trim().split(" ");t.addPointGeometry(d)}else if((i=Qf.exec(c))!==null){let h=(" "+i[0].slice(1).trim()).slice(1);t.startObject(h)}else if(tp.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(ep.test(c))t.materialLibraries.push(c.substring(7).trim());else if(np.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(i=c.split(" "),i.length>1){let d=i[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;let h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}t.finalize();let r=new Nt;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let a=0,o=t.objects.length;a<o;a++){let c=t.objects[a],u=c.geometry,h=c.materials,d=u.type==="Line",f=u.type==="Points",p=!1;if(u.vertices.length===0)continue;let x=new Ke;x.setAttribute("position",new Fe(u.vertices,3)),u.normals.length>0&&x.setAttribute("normal",new Fe(u.normals,3)),u.colors.length>0&&(p=!0,x.setAttribute("color",new Fe(u.colors,3))),u.hasUVIndices===!0&&x.setAttribute("uv",new Fe(u.uvs,2));let m=[];for(let _=0,y=h.length;_<y;_++){let b=h[_],v=b.name+"_"+b.smooth+"_"+p,M=t.materials[v];if(this.materials!==null){if(M=this.materials.create(b.name),d&&M&&!(M instanceof gt)){let T=new gt;Ie.prototype.copy.call(T,M),T.color.copy(M.color),M=T}else if(f&&M&&!(M instanceof ct)){let T=new ct({size:10,sizeAttenuation:!1});Ie.prototype.copy.call(T,M),T.color.copy(M.color),T.map=M.map,M=T}}M===void 0&&(d?M=new gt:f?M=new ct({size:1,sizeAttenuation:!1}):M=new Wi,M.name=b.name,M.flatShading=!b.smooth,M.vertexColors=p,t.materials[v]=M),m.push(M)}let g;if(m.length>1){for(let _=0,y=h.length;_<y;_++){let b=h[_];x.addGroup(b.groupStart,b.groupCount,_)}d?g=new on(x,m):f?g=new Bt(x,m):g=new lt(x,m)}else d?g=new on(x,m[0]):f?g=new Bt(x,m[0]):g=new lt(x,m[0]);g.name=c.name,r.add(g)}else if(t.vertices.length>0){let a=new ct({size:1,sizeAttenuation:!1}),o=new Ke;o.setAttribute("position",new Fe(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(o.setAttribute("color",new Fe(t.colors,3)),a.vertexColors=!0);let c=new Bt(o,a);r.add(c)}return r}};var ui=class l{vertices;vertexNormals;textures;indices;name="";vertexMaterialIndices;indicesPerMaterial=[];materialNames;materialIndices;materialsByIndex={};tangents=[];bitangents=[];textureStride;constructor(e={}){this.vertices=[],this.vertexNormals=[],this.textures=[],this.indices=[],this.vertexMaterialIndices=[],this.materialNames=[],this.materialIndices={},this.textureStride=e.enableWTextureCoord?3:2}static loadObjFile(e,t){t=t||{},t.materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord;let i=new ci().parse(e);return l.fromThreeObject(i,t)}static fromThreeObject(e,t){t=t||{},t.materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord;let n=s=>Array.from(s.array),i=s=>{let a=s.getIndex();if(a)return Array.from(a.array);let o=s.getAttribute("position");return o?Array.from({length:o.count},(c,u)=>u):[]},r=[];return e.traverse(s=>{let a=s;if(!a.isMesh)return;let o=a.geometry,c=o.getAttribute("position");if(!c||c.count===0)return;let u=new l(t);u.name=a.name||"",u.vertices=n(c);let h=o.getAttribute("normal");if(h)u.vertexNormals=n(h);else{let f=o.clone();f.computeVertexNormals();let p=f.getAttribute("normal");u.vertexNormals=p?n(p):new Array(c.count*3).fill(0)}let d=o.getAttribute("uv");if(d){let f=n(d);if(t.enableWTextureCoord){u.textures=[];for(let p=0;p<f.length;p+=2)u.textures.push(f[p],f[p+1],0)}else u.textures=f}else u.textures=[];u.indices=i(o),u.indicesPerMaterial=[u.indices],t.calcTangentsAndBitangents&&u.textures.length>0&&u.calculateTangentsAndBitangents(),r.push(u)}),r}finalizeMesh(e,t,n,i,r){this.vertices=t.verts,this.vertexNormals=t.norms,this.textures=t.textures,this.vertexMaterialIndices=t.materialIndices,this.indices=t.indices[n],this.indicesPerMaterial=t.indices,this.materialNames=i,this.materialIndices=r,this.materialsByIndex={},e.calcTangentsAndBitangents&&this.calculateTangentsAndBitangents()}calculateTangentsAndBitangents(){console.assert(!!(this.vertices&&this.vertices.length&&this.vertexNormals&&this.vertexNormals.length&&this.textures&&this.textures.length),"Missing attributes for calculating tangents and bitangents");let e={tangents:[...new Array(this.vertices.length)].map(s=>0),bitangents:[...new Array(this.vertices.length)].map(s=>0)},t=this.indices,n=this.vertices,i=this.vertexNormals,r=this.textures;for(let s=0;s<t.length;s+=3){let a=t[s+0],o=t[s+1],c=t[s+2],u=n[a*3+0],h=n[a*3+1],d=n[a*3+2],f=r[a*2+0],p=r[a*2+1],x=n[o*3+0],m=n[o*3+1],g=n[o*3+2],_=r[o*2+0],y=r[o*2+1],b=n[c*3+0],v=n[c*3+1],M=n[c*3+2],T=r[c*2+0],w=r[c*2+1],C=x-u,A=m-h,S=g-d,U=b-u,L=v-h,B=M-d,z=_-f,O=y-p,F=T-f,X=w-p,D=z*X-O*F,H=1/Math.abs(D<1e-4?1:D),I=(C*X-U*O)*H,N=(A*X-L*O)*H,G=(S*X-B*O)*H,Q=(U*z-C*F)*H,ee=(L*z-A*F)*H,he=(B*z-S*F)*H,de=i[a*3+0],De=i[a*3+1],ut=i[a*3+2],ye=i[o*3+0],fe=i[o*3+1],Me=i[o*3+2],Qe=i[c*3+0],ht=i[c*3+1],xi=i[c*3+2],_i=I*de+N*De+G*ut,yi=I*ye+N*fe+G*Me,In=I*Qe+N*ht+G*xi,bi=I-de*_i,As=N-De*_i,Rs=G-ut*_i,Cs=I-ye*yi,Is=N-fe*yi,Ps=G-Me*yi,Ls=I-Qe*In,Ds=N-ht*In,Fs=G-xi*In,Us=Math.sqrt(bi*bi+As*As+Rs*Rs),Ns=Math.sqrt(Cs*Cs+Is*Is+Ps*Ps),Bs=Math.sqrt(Ls*Ls+Ds*Ds+Fs*Fs),Os=Q*de+ee*De+he*ut,ks=Q*ye+ee*fe+he*Me,zs=Q*Qe+ee*ht+he*xi,Vs=Q-de*Os,Gs=ee-De*Os,Hs=he-ut*Os,Xs=Q-ye*ks,Ws=ee-fe*ks,$s=he-Me*ks,Ys=Q-Qe*zs,qs=ee-ht*zs,Ks=he-xi*zs,js=Math.sqrt(Vs*Vs+Gs*Gs+Hs*Hs),Zs=Math.sqrt(Xs*Xs+Ws*Ws+$s*$s),Js=Math.sqrt(Ys*Ys+qs*qs+Ks*Ks);e.tangents[a*3+0]+=bi/Us,e.tangents[a*3+1]+=As/Us,e.tangents[a*3+2]+=Rs/Us,e.tangents[o*3+0]+=Cs/Ns,e.tangents[o*3+1]+=Is/Ns,e.tangents[o*3+2]+=Ps/Ns,e.tangents[c*3+0]+=Ls/Bs,e.tangents[c*3+1]+=Ds/Bs,e.tangents[c*3+2]+=Fs/Bs,e.bitangents[a*3+0]+=Vs/js,e.bitangents[a*3+1]+=Gs/js,e.bitangents[a*3+2]+=Hs/js,e.bitangents[o*3+0]+=Xs/Zs,e.bitangents[o*3+1]+=Ws/Zs,e.bitangents[o*3+2]+=$s/Zs,e.bitangents[c*3+0]+=Ys/Js,e.bitangents[c*3+1]+=qs/Js,e.bitangents[c*3+2]+=Ks/Js}this.tangents=e.tangents,this.bitangents=e.bitangents}makeBufferData(e){let t=this.vertices.length/3,n=new ArrayBuffer(e.stride*t);n.numItems=t;let i=new DataView(n);for(let r=0,s=0;r<t;r++){s=r*e.stride;for(let a of e.attributes){let o=s+e.attributeMap[a.key].offset;switch(a.key){case Te.POSITION.key:i.setFloat32(o,this.vertices[r*3],!0),i.setFloat32(o+4,this.vertices[r*3+1],!0),i.setFloat32(o+8,this.vertices[r*3+2],!0);break;case Te.UV.key:i.setFloat32(o,this.textures[r*2],!0),i.setFloat32(o+4,this.textures[r*2+1],!0);break;case Te.NORMAL.key:i.setFloat32(o,this.vertexNormals[r*3],!0),i.setFloat32(o+4,this.vertexNormals[r*3+1],!0),i.setFloat32(o+8,this.vertexNormals[r*3+2],!0);break;case Te.MATERIAL_INDEX.key:i.setInt16(o,this.vertexMaterialIndices[r],!0);break;case Te.AMBIENT.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.ambient[0],!0),i.setFloat32(o+4,u.ambient[1],!0),i.setFloat32(o+8,u.ambient[2],!0);break}case Te.DIFFUSE.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.diffuse[0],!0),i.setFloat32(o+4,u.diffuse[1],!0),i.setFloat32(o+8,u.diffuse[2],!0);break}case Te.SPECULAR.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.specular[0],!0),i.setFloat32(o+4,u.specular[1],!0),i.setFloat32(o+8,u.specular[2],!0);break}case Te.SPECULAR_EXPONENT.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.specularExponent,!0);break}case Te.EMISSIVE.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.emissive[0],!0),i.setFloat32(o+4,u.emissive[1],!0),i.setFloat32(o+8,u.emissive[2],!0);break}case Te.TRANSMISSION_FILTER.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.transmissionFilter[0],!0),i.setFloat32(o+4,u.transmissionFilter[1],!0),i.setFloat32(o+8,u.transmissionFilter[2],!0);break}case Te.DISSOLVE.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.dissolve,!0);break}case Te.ILLUMINATION.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setInt16(o,u.illumination,!0);break}case Te.REFRACTION_INDEX.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.refractionIndex,!0);break}case Te.SHARPNESS.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(o,u.sharpness,!0);break}case Te.ANTI_ALIASING.key:{let c=this.vertexMaterialIndices[r],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setInt16(o,u.antiAliasing?1:0,!0);break}}}}return n}makeIndexBufferData(){let e=new Uint16Array(this.indices);return e.numItems=this.indices.length,e}makeIndexBufferDataForMaterials(...e){let t=new Array().concat(...e.map(i=>this.indicesPerMaterial[i])),n=new Uint16Array(t);return n.numItems=t.length,n}addMaterialLibrary(e){for(let t in e.materials){if(!(t in this.materialIndices))continue;let n=e.materials[t],i=this.materialIndices[n.name];this.materialsByIndex[i]=n}}};var us=class{static async loadObjFileAsync(e){let t=new ci;try{let n=await t.loadAsync(e);return ui.fromThreeObject(n)}catch{let i=await oe(e);if(!i.ok)throw new Error(`Failed to load OBJ file: ${i.statusText}`);let r=await i.text();return ui.loadObjFile(r)}}};var ir=class{static degrees(e){return e*(180/Math.PI)}static radians(e){return e*(Math.PI/180)}static clamp(e,t,n){return Math.min(n,Math.max(e,t))}};var ln=class{name="";verticesUVX=[];normalsUVY=[];bvh;constructor(){this.bvh=new ls(2,64,0,.001,0)}dispose(){this.verticesUVX=[],this.normalsUVY=[],this.bvh=null}async loadFromFileAsync(e){this.name=e;let t=[];try{t=await us.loadObjFileAsync(e)}catch(n){return console.error("Unable to load model",n),!1}for(let n of t){let i=n.vertices,r=n.vertexNormals,s=n.textures;for(let a=0;a<n.indices.length;a+=3)for(let o=0;o<3;o++){let c=n.indices[a+o],u=i[3*c+0],h=i[3*c+1],d=i[3*c+2],f=r[3*c+0],p=r[3*c+1],x=r[3*c+2],m,g;s&&s.length>0?(m=s[2*c+0],g=1-s[2*c+1]):o===0?m=g=0:o===1?(m=0,g=1):m=g=1,this.verticesUVX.push(new q(u,h,d,m)),this.normalsUVY.push(new q(f,p,x,g))}}return!0}buildBVH(){let e=Math.floor(this.verticesUVX.length/3),t=new Array(e);for(let n=0;n<e;++n){let i=new E(this.verticesUVX[n*3+0].x,this.verticesUVX[n*3+0].y,this.verticesUVX[n*3+0].z),r=new E(this.verticesUVX[n*3+1].x,this.verticesUVX[n*3+1].y,this.verticesUVX[n*3+1].z),s=new E(this.verticesUVX[n*3+2].x,this.verticesUVX[n*3+2].y,this.verticesUVX[n*3+2].z),a=new Y;a.grow(i),a.grow(r),a.grow(s),t[n]=a}this.bvh.build(t)}},cn=class{name;meshID;transform;materialID;constructor(e,t,n,i){this.name=e,this.meshID=t,this.transform=n,this.materialID=i}};var hi=class{renderOptions=new Ln;meshes=[];transforms=[];materials=[];meshInstances=[];lights=[];envMap=null;envMapIrradiance=null;camera=null;textures=[];proceduralMaterialGlsl="";materialxEsslShaderGlsl="";materialTexStride=8;initialized=!1;dirty=!0;instancesModified=!1;envMapModified=!1;sceneName;constructor(e){this.sceneName=e}dispose(){this.meshes.forEach(e=>e.dispose?.()),this.meshes=[],this.textures.forEach(e=>e.dispose?.()),this.textures=[],this.proceduralMaterialGlsl="",this.materialxEsslShaderGlsl="",this.camera=null,this.envMap=null,this.envMapIrradiance=null}createRenderer(){throw new Error("Unsupported render mode")}addCamera(e,t,n){this.camera=new Nn(e,t,n)}async addMeshAsync(e){let t=this.meshes.findIndex(i=>i.name===`scenes/pathtracer/${e}`);if(t!==-1)return t;let n=new ln;return console.log(`Loading model ${e}`),await n.loadFromFileAsync(`scenes/pathtracer/${e}`)?(this.meshes.push(n),this.meshes.length-1):(console.log(`Unable to load model ${e}`),-1)}async addTextureAsync(e){let t=this.textures.findIndex(i=>i.name===`scenes/pathtracer/${e}`);if(t!==-1)return t;let n=new dt;return console.log(`Loading texture ${e}`),e.startsWith("http")||(e=`scenes/pathtracer/${e}`),await n.loadTextureAsync(e)?(this.textures.push(n),this.textures.length-1):(console.log(`Unable to load texture ${e}`),-1)}async addTextureByUrlAsync(e){let t=this.textures.findIndex(i=>i.name===e);if(t!==-1)return t;let n=new dt;return console.log(`Loading texture ${e}`),await n.loadTextureAsync(e)?(this.textures.push(n),this.textures.length-1):(console.log(`Unable to load texture ${e}`),-1)}addMaterial(e){return this.materials.push(e),this.materials.length-1}async addEnvMapAsync(e){this.envMap&&(this.envMap.dispose(),this.envMap=null),this.envMap=new An,await this.envMap.loadMapAsync(`/scenes/pathtracer/${e}`)?console.log(`HDR ${e} loaded`):(console.log(`Unable to load HDR ${e}`),this.envMap=null),this.envMapModified=!0,this.dirty=!0}async addEnvMapByUrlAsync(e){this.envMap&&(this.envMap.dispose(),this.envMap=null),this.envMap=new An;let t=e.startsWith("/")||e.startsWith("http")?e:`/${e}`;await this.envMap.loadMapAsync(t)?console.log(`HDR ${e} loaded`):(console.log(`Unable to load HDR ${e}`),this.envMap=null),this.envMapModified=!0,this.dirty=!0}addMeshInstance(e){return this.meshInstances.push(e),this.meshInstances.length-1}addLight(e){return this.lights.push(e),this.lights.length-1}rebuildInstances(){}async processSceneAsync(){}getDefines(e=!1){let t="",n="";t+=`#define MATERIALS_TEX_STRIDE ${Math.max(8,this.materialTexStride|0)}
`,this.renderOptions.enableEnvMap&&(e||this.envMap)&&(t+=`#define OPT_ENVMAP
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
`),this.materials&&this.materials.some(s=>s.alphaMode!==0)&&(t+=`#define OPT_ALPHA_TEST
`),this.renderOptions.enableRoughnessMollification&&(t+=`#define OPT_ROUGHNESS_MOLLIFICATION
`);let i=this.renderOptions.useMaterialxMode&&this.proceduralMaterialGlsl.includes("pt_MtlxLayerStackResponse"),r=i&&this.proceduralMaterialGlsl.includes("transmission_depth");return(this.materials&&this.materials.some(s=>s.mediumType!==0)||r)&&(t+=`#define OPT_MEDIUM
`),this.renderOptions.enableVolumeMIS&&(t+=`#define OPT_VOL_MIS
`),i&&(t+=`#define OPT_MATERIALX
`),[t,n]}};var Le=class extends hi{vertIndices=[];verticesUVX=[];normalsUVY=[];sceneBvh;bvhTranslator=new fr;sceneBounds=new Y;textureMapsArray=new Uint8Array;constructor(e){super(e),this.sceneBvh=new pn(10,64,!1)}createRenderer(){return new Yt(this)}dispose(){super.dispose(),this.bvhTranslator=null,this.sceneBvh=null,this.textureMapsArray=null}largePush(e,t){let n=e.length;for(let i=0;i<n;i++)t.push(e[i])}createTLAS(){let e=this.meshInstances.map((t,n)=>{let r=this.meshes[t.meshID].bvh.bounds(),s=t.transform,a=r.pmin,o=r.pmax,c=new E(s.data[0][0],s.data[0][1],s.data[0][2]),u=new E(s.data[1][0],s.data[1][1],s.data[1][2]),h=new E(s.data[2][0],s.data[2][1],s.data[2][2]),d=new E(s.data[3][0],s.data[3][1],s.data[3][2]),f=c.scale(a.x),p=c.scale(o.x),x=u.scale(a.y),m=u.scale(o.y),g=h.scale(a.z),_=h.scale(o.z),y=E.min(f,p).add(E.min(x,m)).add(E.min(g,_)).add(d),b=E.max(f,p).add(E.max(x,m)).add(E.max(g,_)).add(d);return new Y(y,b)});this.sceneBvh.build(e),this.sceneBounds=this.sceneBvh.bounds()}createBLAS(){this.meshes.forEach(e=>{console.log(`Building BVH for ${e.name}`),e.buildBVH()})}get topLevelIndex(){return this.bvhTranslator.topLevelIndex}rebuildInstances(){this.instancesModified=!0,this.dirty=!0,this.sceneBvh=new pn(10,64,!1),this.createTLAS(),this.bvhTranslator.updateTLAS(this.sceneBvh,this.meshInstances),this.transforms=this.meshInstances.map(e=>e.transform)}async processSceneAsync(){console.log("Processing scene data"),this.createBLAS(),console.log("Building scene BVH"),this.createTLAS(),console.log("Flattening BVH"),this.bvhTranslator.process(this.sceneBvh,this.meshes,this.meshInstances);let e=0;this.vertIndices=[],this.verticesUVX=[],this.normalsUVY=[],console.log("Copying Mesh Data");for(let t of this.meshes){let n=t.bvh.getNumIndices(),i=t.bvh.getIndices();for(let r=0;r<n;r++){let s=i[r],a=s*3+0+e,o=s*3+1+e,c=s*3+2+e;this.vertIndices.push({x:a,y:o,z:c})}this.largePush(t.verticesUVX,this.verticesUVX),this.largePush(t.normalsUVY,this.normalsUVY),e+=t.verticesUVX.length}if(console.log("Copying transforms"),this.transforms=this.meshInstances.map(t=>t.transform),await this.rebuildTextureMapsArrayAsync(),!this.camera){let t=this.sceneBvh.bounds(),n=t.extents(),i=t.center();this.addCamera(new E(i.x,i.y,i.z+E.Length(n)*2),i,45)}this.initialized=!0}async rebuildTextureMapsArrayAsync(){if(this.textures.length===0){this.textureMapsArray=new Uint8Array;return}console.log("Copying and resizing textures");let e=P.gl,t=16384;if(e&&(t=e.raw.getParameter(e.raw.MAX_TEXTURE_SIZE)),this.renderOptions.texArrayHeight*this.textures.length>t){let s=this.renderOptions.texArrayWidth,a=this.renderOptions.texArrayHeight;for(;a*this.textures.length>t;)a=Math.floor(a/2),s=Math.floor(s/2);this.renderOptions.texArrayWidth=s,this.renderOptions.texArrayHeight=a}let n=this.renderOptions.texArrayWidth,i=this.renderOptions.texArrayHeight,r=n*i*4;this.textureMapsArray=new Uint8Array(r*this.textures.length);for(let s=0;s<this.textures.length;s++){let a=this.textures[s],o=null;a.image!==null?o=Il(a.image,n,i,a.flipY):o=await(await import("sharp")).default(Buffer.from(a.rgba),{raw:{width:a.width,height:a.height,channels:4}}).resize(n,i).flip(a.flipY).raw().toBuffer(),this.textureMapsArray.set(o,s*r)}}bvhData(e=null){let t=e===null?this.bvhTranslator.nodes:this.bvhTranslator.nodes.slice(e);return new Float32Array(t.flatMap(i=>[i.bboxmin.x,i.bboxmin.y,i.bboxmin.z,i.bboxmax.x,i.bboxmax.y,i.bboxmax.z,i.LRLeaf.x,i.LRLeaf.y,i.LRLeaf.z]))}vertIndicesData(){return new Int32Array(this.vertIndices.flatMap(t=>[t.x,t.y,t.z]))}verticesData(){return new Float32Array(this.verticesUVX.flatMap(t=>[t.x,t.y,t.z,t.w]))}normalsData(){return new Float32Array(this.normalsUVY.flatMap(t=>[t.x,t.y,t.z,t.w]))}materialsData(){let t=Math.max(8,this.materialTexStride|0)*4,n=new Float32Array(this.materials.length*t);return this.materials.forEach((i,r)=>{let s=r*t;for(let o of i.toVec4Array())n[s++]=o.x,n[s++]=o.y,n[s++]=o.z,n[s++]=o.w;let a=i.materialxPayload;if(a){let o=(r+1)*t;for(let c=0;c<a.length&&s+c<o;c++)n[s+c]=a[c]}}),n}transformsData(){return new Float32Array(this.transforms.flatMap(t=>[t.data[0][0],t.data[0][1],t.data[0][2],t.data[0][3],t.data[1][0],t.data[1][1],t.data[1][2],t.data[1][3],t.data[2][0],t.data[2][1],t.data[2][2],t.data[2][3],t.data[3][0],t.data[3][1],t.data[3][2],t.data[3][3]]))}lightsData(){return new Float32Array(this.lights.flatMap(t=>[t.position.x,t.position.y,t.position.z,t.emission.x,t.emission.y,t.emission.z,t.u.x,t.u.y,t.u.z,t.v.x,t.v.y,t.v.z,t.radius,t.area,t.type]))}computeSceneData(e){let t=new wo,n=[],i=this.materials.map(T=>T.toVec4Array()).flat();n=n.concat(i);let r=this.transforms.map(T=>[new q(T.data[0][0],T.data[0][1],T.data[0][2],T.data[0][3]),new q(T.data[1][0],T.data[1][1],T.data[1][2],T.data[1][3]),new q(T.data[2][0],T.data[2][1],T.data[2][2],T.data[2][3]),new q(T.data[3][0],T.data[3][1],T.data[3][2],T.data[3][3])]).flat();n=n.concat(r);let s=this.lights.map(T=>[new q(T.position.x,T.position.y,T.position.z,0),new q(T.emission.x,T.emission.y,T.emission.z,0),new q(T.u.x,T.u.y,T.u.z,0),new q(T.v.x,T.v.y,T.v.z,0),new q(T.radius,T.area,T.type,0)]).flat();n=n.concat(s);let a=this.bvhTranslator.nodes.map(T=>[new q(T.bboxmin.x,T.bboxmin.y,T.bboxmin.z,0),new q(T.bboxmax.x,T.bboxmax.y,T.bboxmax.z,0),new q(T.LRLeaf.x,T.LRLeaf.y,T.LRLeaf.z,0)]).flat();n=n.concat(a);let o=this.vertIndices.map(T=>new q(T.x,T.y,T.z,0));n=n.concat(o);let c=this.verticesUVX.map(T=>new q(T.x,T.y,T.z,T.w));n=n.concat(c);let u=this.normalsUVY.map(T=>new q(T.x,T.y,T.z,T.w));n=n.concat(u);let h=0,d=h+i.length,f=d+r.length,p=f+s.length,x=p+a.length,m=x+o.length,g=m+c.length,_="";this.textures.length>0&&!e?_=`
int textureMapsArrayIndices[${this.textures.length}] = int[](${this.textures.map((T,w)=>w).join(", ")});
`:_=`
int textureMapsArrayIndices[1] = int[](0);
`,t.materialsIndex=h,t.transformsIndex=d,t.lightsIndex=f,t.bvhIndex=p,t.vertexIndicesIndex=x,t.verticesIndex=m,t.normalsIndex=g,t.data=n;let y=new ArrayBuffer(n.length*4*4),b=new Float32Array(y);for(let T=0;T<n.length;T++)b[T*4+0]=n[T].x,b[T*4+1]=n[T].y,b[T*4+2]=n[T].z,b[T*4+3]=n[T].w;t.buffer=y,this.textureMapsArray.length>0&&(t.textureBuffer=this.textureMapsArray.buffer,t.textureWidth=this.renderOptions.texArrayWidth,t.textureHeight=this.renderOptions.texArrayHeight*this.textures.length);let v=this.getDefines(!0)[0].trim(),M=t.data.length>1e3;return t.commonCode=`${M&&!e?"#define OPT_USE_MESHDATA_BLOB":""}
        
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
    #define vertexIndicesTex (${`${x} + MESH_DATA_OFFSET`})
    #define verticesTex (${`${m} + MESH_DATA_OFFSET`})
    #define normalsTex (${`${g} + MESH_DATA_OFFSET`})

    //-------------------------- Uniforms ---------------------------

    vec3 uniformLightCol = vec3(${this.renderOptions.uniformLightCol.x.toFixed(6)}, ${this.renderOptions.uniformLightCol.y.toFixed(6)}, ${this.renderOptions.uniformLightCol.z.toFixed(6)});
    int numOfLights = ${this.lights.length};
    int numOfMaterials = ${this.materials.length};
    int maxDepth = ${this.renderOptions.maxDepth};
    int topBVHIndex = ${this.bvhTranslator.topLevelIndex};
    float roughnessMollificationAmt = ${this.renderOptions.roughnessMollificationAmt.toFixed(6)};
    float envMapIntensity = ${this.renderOptions.envMapIntensity.toFixed(6)};
    ${_}
`.trim(),t.bufferDCode=`
bool enableTonemap = ${this.renderOptions.enableTonemap?"true":"false"};
bool enableAces = ${this.renderOptions.enableAces?"true":"false"};
bool simpleAcesFit = ${this.renderOptions.simpleAcesFit?"true":"false"};
vec3 backgroundCol = vec3(${this.renderOptions.backgroundCol.x.toFixed(6)}, ${this.renderOptions.backgroundCol.y.toFixed(6)}, ${this.renderOptions.backgroundCol.z.toFixed(6)});
`.trim(),t}generateMeshCode(e,t){function n(d){return`vec4(${d.x.toFixed(6)},${d.y.toFixed(6)},${d.z.toFixed(6)},${d.w.toFixed(6)})`}let i=new Map,r=[];for(let d=e.materialsIndex;d<e.transformsIndex;d+=9)r.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3],e.data[d+4],e.data[d+5],e.data[d+6],e.data[d+7],e.data[d+8]]);i.set("Materials",r);let s=[];for(let d=e.transformsIndex;d<e.lightsIndex;d+=4)s.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3]]);i.set("Transforms",s);let a=[];for(let d=e.lightsIndex;d<e.bvhIndex;d+=5)a.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3],e.data[d+4]]);if(i.set("Lights",a),!t){let d=[];for(let m=e.bvhIndex;m<e.vertexIndicesIndex;m+=3)d.push([e.data[m+0],e.data[m+1],e.data[m+2]]);i.set("BVH",d);let f=[];for(let m=e.vertexIndicesIndex;m<e.verticesIndex;m++)f.push([e.data[m]]);i.set("Vertex Indices",f);let p=[];for(let m=e.verticesIndex;m<e.normalsIndex;m++)p.push([e.data[m]]);i.set("Vertices",p);let x=[];for(let m=e.normalsIndex;m<e.data.length;m++)x.push([e.data[m]]);i.set("Normals",x)}let o="        ",c=0,u="";return i.forEach((d,f)=>{u+=o+`// ${f}
`,d.forEach(p=>{u+=o,p.forEach(x=>{u+=n(x)+(c<e.data.length-1?",":""),c++}),u+=`
`})}),`
#define VEC4_COUNT ${t?e.bvhIndex:e.data.length}

vec4[VEC4_COUNT] getData() {
    vec4 data[VEC4_COUNT] = vec4[](
${u.trimEnd()}
    );
    return data;
}
`.trim().trim()}},wo=class{commonCode;bufferACode;bufferBCode;bufferDCode;buffer;textureBuffer;textureWidth;textureHeight;data;bvhIndex;vertexIndicesIndex;verticesIndex;normalsIndex;materialsIndex;transformsIndex;lightsIndex};var di=class extends hi{shadertoyShader=null;constructor(e){super(e)}createRenderer(){return new Fn(this)}async processSceneAsync(){this.camera||this.addCamera(new E(0,0,2),new E(0,0,0),45),this.initialized=!0}};var ne=class l{data;constructor(e=1,t=0,n=0,i=0,r=0,s=1,a=0,o=0,c=0,u=0,h=1,d=0,f=0,p=0,x=0,m=1){this.data=[[e,t,n,i],[r,s,a,o],[c,u,h,d],[f,p,x,m]]}static Translate(e){let t=new l;return t.data[3][0]=e.x,t.data[3][1]=e.y,t.data[3][2]=e.z,t}static Scale(e){let t=new l;return t.data[0][0]=e.x,t.data[1][1]=e.y,t.data[2][2]=e.z,t}static QuatToMatrix(e,t,n,i){let r=new l,s=e+e,a=t+t,o=n+n,c=e*s,u=e*a,h=e*o,d=t*a,f=t*o,p=n*o,x=i*s,m=i*a,g=i*o;return r.data[0][0]=1-(d+p),r.data[0][1]=u+g,r.data[0][2]=h-m,r.data[0][3]=0,r.data[1][0]=u-g,r.data[1][1]=1-(c+p),r.data[1][2]=f+x,r.data[1][3]=0,r.data[2][0]=h+m,r.data[2][1]=f-x,r.data[2][2]=1-(c+d),r.data[2][3]=0,r.data[3][0]=0,r.data[3][1]=0,r.data[3][2]=0,r.data[3][3]=1,r}multiply(e){let t=new l;for(let n=0;n<4;++n)for(let i=0;i<4;++i){t.data[n][i]=0;for(let r=0;r<4;++r)t.data[n][i]+=this.data[n][r]*e.data[r][i]}return t}get(e){return this.data[e]}decompose(){let e=new E(this.data[3][0],this.data[3][1],this.data[3][2]),t=new E(Math.sqrt(this.data[0][0]*this.data[0][0]+this.data[0][1]*this.data[0][1]+this.data[0][2]*this.data[0][2]),Math.sqrt(this.data[1][0]*this.data[1][0]+this.data[1][1]*this.data[1][1]+this.data[1][2]*this.data[1][2]),Math.sqrt(this.data[2][0]*this.data[2][0]+this.data[2][1]*this.data[2][1]+this.data[2][2]*this.data[2][2])),n=new E(this.data[0][0]/t.x,this.data[1][1]/t.y,this.data[2][2]/t.z);return{translation:e,scale:t,rotation:n}}static fromDecomposed(e,t,n){let i=l.QuatToMatrix(n.x,n.y,n.z,1),r=l.Scale(t);return l.Translate(e).multiply(r).multiply(i)}};function Ao(l,e){if(e===go)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),l;if(e===li||e===nr){let t=l.getIndex();if(t===null){let s=[],a=l.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)s.push(o);l.setIndex(s),t=l.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),l}let n=t.count-2,i=[];if(e===li)for(let s=1;s<=n;s++)i.push(t.getX(0)),i.push(t.getX(s)),i.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(i.push(t.getX(s)),i.push(t.getX(s+1)),i.push(t.getX(s+2))):(i.push(t.getX(s+2)),i.push(t.getX(s+1)),i.push(t.getX(s)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=l.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),l}function Uc(l){let e=new Map,t=new Map,n=l.clone();return Nc(l,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,s=e.get(i),a=s.skeleton.bones;r.skeleton=s.skeleton.clone(),r.bindMatrix.copy(s.bindMatrix),r.skeleton.bones=a.map(function(o){return t.get(o)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Nc(l,e,t){t(l,e);for(let n=0;n<l.children.length;n++)Nc(l.children[n],e.children[n],t)}var hs=class extends We{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Fo(t)}),this.register(function(t){return new Uo(t)}),this.register(function(t){return new Xo(t)}),this.register(function(t){return new Wo(t)}),this.register(function(t){return new $o(t)}),this.register(function(t){return new Bo(t)}),this.register(function(t){return new Oo(t)}),this.register(function(t){return new ko(t)}),this.register(function(t){return new zo(t)}),this.register(function(t){return new Do(t)}),this.register(function(t){return new Vo(t)}),this.register(function(t){return new No(t)}),this.register(function(t){return new Ho(t)}),this.register(function(t){return new Go(t)}),this.register(function(t){return new Po(t)}),this.register(function(t){return new ds(t,j.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new ds(t,j.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Yo(t)})}load(e,t,n,i){let r=this,s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){let c=Vt.extractUrlBase(e);s=Vt.resolveURL(c,this.path)}else s=Vt.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},o=new zt(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{r.parse(c,s,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,s={},a={},o=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(o.decode(new Uint8Array(e,0,4))===Vc){try{s[j.KHR_BINARY_GLTF]=new qo(e)}catch(h){i&&i(h);return}r=JSON.parse(s[j.KHR_BINARY_GLTF].content)}else r=JSON.parse(o.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new tl(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,s[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case j.KHR_MATERIALS_UNLIT:s[h]=new Lo;break;case j.KHR_DRACO_MESH_COMPRESSION:s[h]=new Ko(r,this.dracoLoader);break;case j.KHR_TEXTURE_TRANSFORM:s[h]=new jo;break;case j.KHR_MESH_QUANTIZATION:s[h]=new Zo;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(s),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function rp(){let l={};return{get:function(e){return l[e]},add:function(e,t){l[e]=t},remove:function(e){delete l[e]},removeAll:function(){l={}}}}function ge(l,e,t){let n=l.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var j={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Po=class{constructor(e){this.parser=e,this.name=j.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,o=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new $(16777215);o.color!==void 0&&u.setRGB(o.color[0],o.color[1],o.color[2],Ce);let h=o.range!==void 0?o.range:0;switch(o.type){case"directional":c=new er(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Qi(u),c.distance=h;break;case"spot":c=new Ji(u),c.distance=h,o.spot=o.spot||{},o.spot.innerConeAngle=o.spot.innerConeAngle!==void 0?o.spot.innerConeAngle:0,o.spot.outerConeAngle=o.spot.outerConeAngle!==void 0?o.spot.outerConeAngle:Math.PI/4,c.angle=o.spot.outerConeAngle,c.penumbra=1-o.spot.innerConeAngle/o.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+o.type)}return c.position.set(0,0,0),Tt(c,o),o.intensity!==void 0&&(c.intensity=o.intensity),c.name=t.createUniqueName(o.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(o){return n._getNodeRef(t.cache,a,o)})}},Lo=class{constructor(){this.name=j.KHR_MATERIALS_UNLIT}getMaterialType(){return mt}extendParams(e,t,n){let i=[];e.color=new $(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let s=r.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],Ce),e.opacity=s[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,_e))}return Promise.all(i)}},Do=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Fo=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new le(r,r)}return Promise.all(i)}},Uo=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_DISPERSION}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},No=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},Bo=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_SHEEN}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new $(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Ce)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,_e)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Oo=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},ko=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_VOLUME}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new $().setRGB(r[0],r[1],r[2],Ce),Promise.all(i)}},zo=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_IOR}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Vo=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_SPECULAR}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new $().setRGB(r[0],r[1],r[2],Ce),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,_e)),Promise.all(i)}},Go=class{constructor(e){this.parser=e,this.name=j.EXT_MATERIALS_BUMP}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Ho=class{constructor(e){this.parser=e,this.name=j.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return ge(this.parser,e,this.name)!==null?Ne:null}extendMaterialParams(e,t){let n=ge(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Xo=class{constructor(e){this.parser=e,this.name=j.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],s=t.options.ktx2Loader;if(!s){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,s)}},Wo=class{constructor(e){this.parser=e,this.name=j.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let s=r.extensions[t],a=i.images[s.source],o=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(o=c)}return n.loadTextureImage(e,s.source,o)}},$o=class{constructor(e){this.parser=e,this.name=j.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let s=r.extensions[t],a=i.images[s.source],o=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(o=c)}return n.loadTextureImage(e,s.source,o)}},ds=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let o=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(a,o,c);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):s.ready.then(function(){let f=new ArrayBuffer(u*h);return s.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}},Yo=class{constructor(e){this.name=j.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Je.TRIANGLES&&c.mode!==Je.TRIANGLE_STRIP&&c.mode!==Je.TRIANGLE_FAN&&c.mode!==void 0)return null;let s=n.extensions[this.name].attributes,a=[],o={};for(let c in s)a.push(this.parser.getDependency("accessor",s[c]).then(u=>(o[c]=u,o[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let p of h){let x=new J,m=new R,g=new He,_=new R(1,1,1),y=new Hi(p.geometry,p.material,d);for(let b=0;b<d;b++)o.TRANSLATION&&m.fromBufferAttribute(o.TRANSLATION,b),o.ROTATION&&g.fromBufferAttribute(o.ROTATION,b),o.SCALE&&_.fromBufferAttribute(o.SCALE,b),y.setMatrixAt(b,x.compose(m,g,_));for(let b in o)if(b==="_COLOR_0"){let v=o[b];y.instanceColor=new an(v.array,v.itemSize,v.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&p.geometry.setAttribute(b,o[b]);me.prototype.copy.call(y,p),this.parser.assignFinalMaterial(y),f.push(y)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},Vc="glTF",rr=12,Bc={JSON:1313821514,BIN:5130562},qo=class{constructor(e){this.name=j.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,rr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Vc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-rr,r=new DataView(e,rr),s=0;for(;s<i;){let a=r.getUint32(s,!0);s+=4;let o=r.getUint32(s,!0);if(s+=4,o===Bc.JSON){let c=new Uint8Array(e,rr+s,a);this.content=n.decode(c)}else if(o===Bc.BIN){let c=rr+s;this.body=e.slice(c,c+a)}s+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Ko=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=j.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,a={},o={},c={};for(let u in s){let h=Qo[u]||u.toLowerCase();a[h]=s[u]}for(let u in e.attributes){let h=Qo[u]||u.toLowerCase();if(s[u]!==void 0){let d=n.accessors[e.attributes[u]],f=fi[d.componentType];c[h]=f.name,o[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(let p in f.attributes){let x=f.attributes[p],m=o[p];m!==void 0&&(x.normalized=m)}h(f)},a,c,Ce,d)})})}},jo=class{constructor(){this.name=j.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Zo=class{constructor(){this.name=j.KHR_MESH_QUANTIZATION}},fs=class extends xt{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let s=0;s!==i;s++)t[s]=n[r+s];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=a*2,c=a*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,p=e*c,x=p-c,m=-2*f+3*d,g=f-d,_=1-m,y=g-d+h;for(let b=0;b!==a;b++){let v=s[x+b+a],M=s[x+b+o]*u,T=s[p+b+a],w=s[p+b]*u;r[b]=_*v+y*M+m*T+g*w}return r}},sp=new He,Jo=class extends fs{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return sp.fromArray(r).normalize().toArray(r),r}},Je={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},fi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Oc={9728:Zn,9729:Ye,9984:uo,9985:fo,9986:ho,9987:ai},kc={33071:Ft,33648:ki,10497:bn},Ro={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Qo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},un={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ap={CUBICSPLINE:void 0,LINEAR:Tn,STEP:vn},Co={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function op(l){return l.DefaultMaterial===void 0&&(l.DefaultMaterial=new En({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:jn})),l.DefaultMaterial}function Rn(l,e,t){for(let n in t.extensions)l[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Tt(l,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(l.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function lp(l,e,t){let n=!1,i=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(l);let s=[],a=[],o=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):l.attributes.position;s.push(d)}if(i){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):l.attributes.normal;a.push(d)}if(r){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):l.attributes.color;o.push(d)}}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(o)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(l.morphAttributes.position=u),i&&(l.morphAttributes.normal=h),r&&(l.morphAttributes.color=d),l.morphTargetsRelative=!0,l})}function cp(l,e){if(l.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)l.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(l.morphTargetInfluences.length===t.length){l.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)l.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function up(l){let e,t=l.extensions&&l.extensions[j.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Io(t.attributes):e=l.indices+":"+Io(l.attributes)+":"+l.mode,l.targets!==void 0)for(let n=0,i=l.targets.length;n<i;n++)e+=":"+Io(l.targets[n]);return e}function Io(l){let e="",t=Object.keys(l).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+l[t[n]]+";";return e}function el(l){switch(l){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hp(l){return l.search(/\.jpe?g($|\?)/i)>0||l.search(/^data\:image\/jpeg/)===0?"image/jpeg":l.search(/\.webp($|\?)/i)>0||l.search(/^data\:image\/webp/)===0?"image/webp":l.search(/\.ktx2($|\?)/i)>0||l.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var dp=new J,tl=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new rp,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,s=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let o=a.match(/Version\/(\d+)/);i=n&&o?parseInt(o[1],10):-1,r=a.indexOf("Firefox")>-1,s=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&s<98?this.textureLoader=new Ki(this.options.manager):this.textureLoader=new tr(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zt(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(s){let a={scene:s[0][i.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:i.asset,parser:n,userData:{}};return Rn(r,a,i),Tt(a,i),Promise.all(n._invokeAll(function(o){return o.afterRoot&&o.afterRoot(a)})).then(function(){for(let o of a.scenes)o.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let s=t[i].joints;for(let a=0,o=s.length;a<o;a++)e[s[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let s=e[i];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(n[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(s,a)=>{let o=this.associations.get(s);o!=null&&this.associations.set(a,o);for(let[c,u]of s.children.entries())r(u,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,s){return n.getDependency(e,s)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[j.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,s){n.load(Vt.resolveURL(t.uri,i.path),r,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let s=Ro[i.type],a=fi[i.componentType],o=i.normalized===!0,c=new a(i.count*s);return Promise.resolve(new we(c,s,o))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(s){let a=s[0],o=Ro[i.type],c=fi[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*o,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,x,m;if(f&&f!==h){let g=Math.floor(d/f),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count,y=t.cache.get(_);y||(x=new c(a,g*f,i.count*f/u),y=new ei(x,f/u),t.cache.add(_,y)),m=new ti(y,o,d%f/u,p)}else a===null?x=new c(i.count*o):x=new c(a,d,i.count*o),m=new we(x,o,p);if(i.sparse!==void 0){let g=Ro.SCALAR,_=fi[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,v=new _(s[1],y,i.sparse.count*g),M=new c(s[2],b,i.sparse.count*o);a!==null&&(m=new we(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,w=v.length;T<w;T++){let C=v[T];if(m.setX(C,M[T*o]),o>=2&&m.setY(C,M[T*o+1]),o>=3&&m.setZ(C,M[T*o+2]),o>=4&&m.setW(C,M[T*o+3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,s=t.images[r],a=this.textureLoader;if(s.uri){let o=n.manager.getHandler(s.uri);o!==null&&(a=o)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,s=r.textures[e],a=r.images[t],o=(a.uri||a.bufferView)+":"+s.sampler;if(this.textureCache[o])return this.textureCache[o];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=s.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let d=(r.samplers||{})[s.sampler]||{};return u.magFilter=Oc[d.magFilter]||Ye,u.minFilter=Oc[d.minFilter]||ai,u.wrapS=kc[d.wrapS]||bn,u.wrapT=kc[d.wrapT]||bn,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Zn&&u.minFilter!==Ye,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[o]=c,c}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let s=i.images[e],a=self.URL||self.webkitURL,o=s.uri||"",c=!1;if(s.bufferView!==void 0)o=n.getDependency("bufferView",s.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:s.mimeType});return o=a.createObjectURL(d),o});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(o).then(function(h){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(x){let m=new ot(x);m.needsUpdate=!0,d(m)}),t.load(Vt.resolveURL(h,r.path),p,void 0,f)})}).then(function(h){return c===!0&&a.revokeObjectURL(o),Tt(h,s),h.userData.mimeType=s.mimeType||hp(s.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",o),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(s){if(!s)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(s=s.clone(),s.channel=n.texCoord),r.extensions[j.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[j.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let o=r.associations.get(s);s=r.extensions[j.KHR_TEXTURE_TRANSFORM].extendTexture(s,a),r.associations.set(s,o)}}return i!==void 0&&(s.colorSpace=i),e[t]=s,s})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,s=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,o=this.cache.get(a);o||(o=new ct,Ie.prototype.copy.call(o,n),o.color.copy(n.color),o.map=n.map,o.sizeAttenuation=!1,this.cache.add(a,o)),n=o}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,o=this.cache.get(a);o||(o=new gt,Ie.prototype.copy.call(o,n),o.color.copy(n.color),o.map=n.map,this.cache.add(a,o)),n=o}if(i||r||s){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),s&&(a+="flat-shading:");let o=this.cache.get(a);o||(o=n.clone(),r&&(o.vertexColors=!0),s&&(o.flatShading=!0),i&&(o.normalScale&&(o.normalScale.y*=-1),o.clearcoatNormalScale&&(o.clearcoatNormalScale.y*=-1)),this.cache.add(a,o),this.associations.set(o,this.associations.get(n))),n=o}e.material=n}getMaterialType(){return En}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],s,a={},o=r.extensions||{},c=[];if(o[j.KHR_MATERIALS_UNLIT]){let h=i[j.KHR_MATERIALS_UNLIT];s=h.getMaterialType(),c.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new $(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Ce),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,_e)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),s=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=eo);let u=r.alphaMode||Co.OPAQUE;if(u===Co.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Co.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&s!==mt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new le(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&s!==mt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&s!==mt){let h=r.emissiveFactor;a.emissive=new $().setRGB(h[0],h[1],h[2],Ce)}return r.emissiveTexture!==void 0&&s!==mt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,_e)),Promise.all(c).then(function(){let h=new s(a);return r.name&&(h.name=r.name),Tt(h,r),t.associations.set(h,{materials:e}),r.extensions&&Rn(i,h,r),h})}createUniqueName(e){let t=ce.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[j.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(o){return zc(o,a,t)})}let s=[];for(let a=0,o=e.length;a<o;a++){let c=e[a],u=up(c),h=i[u];if(h)s.push(h.promise);else{let d;c.extensions&&c.extensions[j.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=zc(new Ke,c,t),i[u]={primitive:c,promise:d},s.push(d)}}return Promise.all(s)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],s=r.primitives,a=[];for(let o=0,c=s.length;o<c;o++){let u=s[o].material===void 0?op(this.cache):this.getDependency("material",s[o].material);a.push(u)}return a.push(t.loadGeometries(s)),Promise.all(a).then(function(o){let c=o.slice(0,o.length-1),u=o[o.length-1],h=[];for(let f=0,p=u.length;f<p;f++){let x=u[f],m=s[f],g,_=c[f];if(m.mode===Je.TRIANGLES||m.mode===Je.TRIANGLE_STRIP||m.mode===Je.TRIANGLE_FAN||m.mode===void 0)g=r.isSkinnedMesh===!0?new Vi(x,_):new lt(x,_),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===Je.TRIANGLE_STRIP?g.geometry=Ao(g.geometry,nr):m.mode===Je.TRIANGLE_FAN&&(g.geometry=Ao(g.geometry,li));else if(m.mode===Je.LINES)g=new on(x,_);else if(m.mode===Je.LINE_STRIP)g=new Sn(x,_);else if(m.mode===Je.LINE_LOOP)g=new Xi(x,_);else if(m.mode===Je.POINTS)g=new Bt(x,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&cp(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Tt(g,r),m.extensions&&Rn(i,g,m),t.assignFinalMaterial(g),h.push(g)}for(let f=0,p=h.length;f<p;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&Rn(i,h[0],r),h[0];let d=new Nt;r.extensions&&Rn(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=h.length;f<p;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new wn(bo.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new si(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Tt(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),s=i,a=[],o=[];for(let c=0,u=s.length;c<u;c++){let h=s[c];if(h){a.push(h);let d=new J;r!==null&&d.fromArray(r.array,c*16),o.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Gi(a,o)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,s=[],a=[],o=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){let f=i.channels[h],p=i.samplers[f.sampler],x=f.target,m=x.node,g=i.parameters!==void 0?i.parameters[p.input]:p.input,_=i.parameters!==void 0?i.parameters[p.output]:p.output;x.node!==void 0&&(s.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",g)),o.push(this.getDependency("accessor",_)),c.push(p),u.push(x))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],p=h[2],x=h[3],m=h[4],g=[];for(let y=0,b=d.length;y<b;y++){let v=d[y],M=f[y],T=p[y],w=x[y],C=m[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();let A=n._createAnimationTracks(v,M,T,w,C);if(A)for(let S=0;S<A.length;S++)g.push(A[S])}let _=new Yi(r,void 0,g);return Tt(_,i),_})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let s=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&s.traverse(function(a){if(a.isMesh)for(let o=0,c=i.weights.length;o<c;o++)a.morphTargetInfluences[o]=i.weights[o]}),s})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),s=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)s.push(n.getDependency("node",a[c]));let o=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(s),o]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,dp)});for(let f=0,p=h.length;f<p;f++)u.add(h[f]);if(u.userData.pivot!==void 0&&h.length>0){let f=u.userData.pivot,p=h[0];u.pivot=new R().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],s=r.name?i.createUniqueName(r.name):"",a=[],o=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return o&&a.push(o),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new ni:c.length>1?u=new Nt:c.length===1?u=c[0]:u=new me,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=s),Tt(u,r),r.extensions&&Rn(n,u,r),r.matrix!==void 0){let h=new J;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Nt;n.name&&(r.name=i.createUniqueName(n.name)),Tt(r,n),n.extensions&&Rn(t,r,n);let s=n.nodes||[],a=[];for(let o=0,c=s.length;o<c;o++)a.push(i.getDependency("node",s[o]));return Promise.all(a).then(function(o){for(let u=0,h=o.length;u<h;u++){let d=o[u];d.parent!==null?r.add(Uc(d)):r.add(d)}let c=u=>{let h=new Map;for(let[d,f]of i.associations)(d instanceof Ie||d instanceof ot)&&h.set(d,f);return u.traverse(d=>{let f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){let s=[],a=e.name?e.name:e.uuid,o=[];function c(f){f.morphTargetInfluences&&o.push(f.name?f.name:f.uuid)}un[r.path]===un.weights?(c(e),e.isGroup&&e.children.forEach(c)):o.push(a);let u;switch(un[r.path]){case un.weights:u=_t;break;case un.rotation:u=yt;break;case un.translation:case un.scale:u=bt;break;default:n.itemSize===1?u=_t:u=bt;break}let h=i.interpolation!==void 0?ap[i.interpolation]:Tn,d=this._getArrayFromAccessor(n);for(let f=0,p=o.length;f<p;f++){let x=new u(o[f]+"."+un[r.path],t.array,d,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),s.push(x)}return s}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=el(t.constructor),i=new Float32Array(t.length);for(let r=0,s=t.length;r<s;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof yt?Jo:fs;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function fp(l,e,t){let n=e.attributes,i=new Xe;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],o=a.min,c=a.max;if(o!==void 0&&c!==void 0){if(i.set(new R(o[0],o[1],o[2]),new R(c[0],c[1],c[2])),a.normalized){let u=el(fi[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new R,o=new R;for(let c=0,u=r.length;c<u;c++){let h=r[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(o.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),o.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),o.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let x=el(fi[d.componentType]);o.multiplyScalar(x)}a.max(o)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}l.boundingBox=i;let s=new Ue;i.getCenter(s.center),s.radius=i.min.distanceTo(i.max)/2,l.boundingSphere=s}function zc(l,e,t){let n=e.attributes,i=[];function r(s,a){return t.getDependency("accessor",s).then(function(o){l.setAttribute(a,o)})}for(let s in n){let a=Qo[s]||s.toLowerCase();a in l.attributes||i.push(r(n[s],a))}if(e.indices!==void 0&&!l.index){let s=t.getDependency("accessor",e.indices).then(function(a){l.setIndex(a)});i.push(s)}return Re.workingColorSpace!==Ce&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Re.workingColorSpace}" not supported.`),Tt(l,e),fp(l,e,t),Promise.all(i).then(function(){return e.targets!==void 0?lp(l,e.targets,t):l})}async function Gt(l,e,t,n,i){try{let r=await new hs().loadAsync(l);r.scene.updateMatrixWorld(!0);let s=new Map,a=new Map,o=f=>{let p=f.elements;return new ne(p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8],p[9],p[10],p[11],p[12],p[13],p[14],p[15])},c=f=>{if(!f)return-1;let p=s.get(f);if(p!==void 0)return p;let x=f.image,m=new dt(f.name||null,x??null);if(m.flipY=t.flipTexturesY,x){let _=x;m.width=_.width??null,m.height=_.height??null}e.textures.push(m);let g=e.textures.length-1;return s.set(f,g),g},u=()=>{if(e.materials.length===0){let f=new je;f.name="Default",e.addMaterial(f)}return 0},h=f=>{if(!f)return u();let p=a.get(f);if(p!==void 0)return p;let x=new je;x.name=f.name;let m=f;if(m.color&&(x.baseColor=new E(m.color.r??1,m.color.g??1,m.color.b??1)),typeof m.ior=="number"&&(x.ior=m.ior),x.opacity=m.opacity??1,x.alphaCutoff=m.alphaTest??.5,m.alphaMode==="BLEND"||m.transparent?x.alphaMode=1:m.alphaMode==="MASK"||(m.alphaTest??0)>0?x.alphaMode=2:x.alphaMode=0,typeof m.roughness=="number"&&(x.roughness=Math.sqrt(m.roughness)),typeof m.metalness=="number"&&(x.metallic=m.metalness),typeof m.specularIntensity=="number"&&(x.specularTint=m.specularIntensity),typeof m.clearcoat=="number"&&(x.clearcoat=m.clearcoat),typeof m.clearcoatRoughness=="number"){let _=Math.min(1,Math.max(0,m.clearcoatRoughness));x.clearcoatGloss=1-_}if(typeof m.sheen=="number"&&(x.sheen=m.sheen),m.sheenColor&&(x.sheenTint=((m.sheenColor.r??0)+(m.sheenColor.g??0)+(m.sheenColor.b??0))/3),typeof m.anisotropy=="number"&&(x.anisotropic=Math.abs(m.anisotropy)),m.emissive){let _=m.emissiveIntensity??1;x.emission=new E((m.emissive.r??0)*_,(m.emissive.g??0)*_,(m.emissive.b??0)*_)}typeof m.transmission=="number"&&(x.specTrans=m.transmission),m.attenuationColor&&(x.mediumColor=new E(m.attenuationColor.r??1,m.attenuationColor.g??1,m.attenuationColor.b??1)),x.baseColorTexID=c(m.map),x.metallicRoughnessTexID=c(m.metalnessMap??m.roughnessMap),x.normalmapTexID=c(m.normalMap),x.emissionmapTexID=c(m.emissiveMap);let g=e.addMaterial(x);return a.set(f,g),g},d=(f,p,x,m,g,_,y)=>{for(let b=0;b<_;b++){let v=g(y+b),M=p.getX(v),T=p.getY(v),w=p.getZ(v),C=x.getX(v),A=x.getY(v),S=x.getZ(v),U=m?m.getX(v):b%3===1?0:1,L=m?m.getY(v):b%3===0?0:1;f.verticesUVX.push(new q(M,T,w,U)),f.normalsUVY.push(new q(C,A,S,1-L))}};return r.scene.traverse(f=>{let p=f;if(!p.isMesh)return;let x=p.geometry,m=x.getAttribute("position");if(!m||m.count===0)return;let g=x.getAttribute("normal");if(!g){let C=x.clone();if(C.computeVertexNormals(),g=C.getAttribute("normal"),!g)return}let _=x.getAttribute("uv"),y=x.getIndex(),b=C=>y?y.getX(C):C,v=y?y.count:m.count,M=o(p.matrixWorld).multiply(n),T=Array.isArray(p.material)?p.material:[p.material],w=x.groups&&x.groups.length>0?x.groups:[{start:0,count:v,materialIndex:0}];for(let C=0;C<w.length;C++){let A=w[C],S=Math.floor(A.count/3)*3;if(S<=0)continue;let U=new ln;U.name=p.name||`GLTFMesh_${e.meshes.length}`,d(U,m,g,_,b,S,A.start);let L=e.meshes.length;e.meshes.push(U);let B=T[A.materialIndex]??T[0]??null,z=h(B),O=new cn(p.name||`Instance_${L}`,L,M,z);e.addMeshInstance(O)}}),e.materials.length===0&&u(),e.meshes.length>0}catch(r){return console.error("Error loading GLTF file:",r),!1}}var pp=`<div class="gl-box">
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
</div>`,mp=`#gl-bench {
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
`,ps=class{constructor(e,t={}){this.css=mp,this.svg=pp,this.paramLogger=()=>{},this.chartLogger=()=>{},this.chartLen=20,this.chartHz=20,this.names=[],this.cpuAccums=[],this.gpuAccums=[],this.activeAccums=[],this.chart=new Array(this.chartLen),this.now=()=>performance&&performance.now?performance.now():Date.now(),this.updateUI=()=>{[].forEach.call(this.nodes["gl-gpu-svg"],a=>{a.style.display=this.trackGPU?"inline":"none"})},Object.assign(this,t),this.detected=0,this.finished=[],this.isFramebuffer=0,this.frameId=0;let n,i=0,r,s=a=>{++i<20?n=requestAnimationFrame(s):(this.detected=Math.ceil(1e3*i/(a-r)/70),cancelAnimationFrame(n)),r||(r=a)};if(requestAnimationFrame(s),e){let a=async(c,u)=>Promise.resolve(setTimeout(()=>{e.getError();let h=this.now()-c;u.forEach((d,f)=>{d&&(this.gpuAccums[f]+=h)})},0)),o=(c,u,h)=>function(){let d=u.now();c.apply(h,arguments),u.trackGPU&&u.finished.push(a(d,u.activeAccums.slice(0)))};["drawArrays","drawElements","drawArraysInstanced","drawBuffers","drawElementsInstanced","drawRangeElements"].forEach(c=>{e[c]&&(e[c]=o(e[c],this,e))}),e.getExtension=((c,u)=>function(){let h=c.apply(e,arguments);return h&&["drawElementsInstancedANGLE","drawBuffersWEBGL"].forEach(d=>{h[d]&&(h[d]=o(h[d],u,h))}),h})(e.getExtension,this)}if(!this.withoutUI){this.dom||(this.dom=document.body);let a=document.createElement("div");a.id="gl-bench",this.dom.appendChild(a),this.dom.insertAdjacentHTML("afterbegin",'<style id="gl-bench-style">'+this.css+"</style>"),this.dom=a,this.dom.addEventListener("click",()=>{this.trackGPU=!this.trackGPU,this.updateUI()}),this.paramLogger=((o,c,u)=>{let h=["gl-cpu","gl-gpu","gl-mem","gl-fps","gl-gpu-svg","gl-chart"],d=Object.assign({},h);return h.forEach(f=>d[f]=c.getElementsByClassName(f)),this.nodes=d,(f,p,x,m,g,_,y)=>{d["gl-cpu"][f].style.strokeDasharray=(p*.27).toFixed(0)+" 100",d["gl-gpu"][f].style.strokeDasharray=(x*.27).toFixed(0)+" 100",d["gl-mem"][f].innerHTML=u[f]?u[f]:m?"mem: "+m.toFixed(0)+"mb":"",d["gl-fps"][f].innerHTML=g.toFixed(0)+" FPS",o(u[f],p,x,m,g,_,y)}})(this.paramLogger,this.dom,this.names),this.chartLogger=((o,c)=>{let u={"gl-chart":c.getElementsByClassName("gl-chart")};return(h,d,f)=>{let p="",x=d.length;for(let m=0;m<x;m++){let g=(f+m+1)%x;d[g]!=null&&(p=p+" "+(55*m/(x-1)).toFixed(1)+","+(45-d[g]*22/60/this.detected).toFixed(1))}u["gl-chart"][h].setAttribute("points",p),o(this.names[h],d,f)}})(this.chartLogger,this.dom)}}addUI(e){this.names.indexOf(e)==-1&&(this.names.push(e),this.dom&&(this.dom.insertAdjacentHTML("beforeend",this.svg),this.updateUI()),this.cpuAccums.push(0),this.gpuAccums.push(0),this.activeAccums.push(!1))}nextFrame(e){this.frameId++;let t=e||this.now();if(this.frameId<=1)this.paramFrame=this.frameId,this.paramTime=t;else{let n=t-this.paramTime;if(n>=1e3){let i=this.frameId-this.paramFrame,r=i/n*1e3;for(let s=0;s<this.names.length;s++){let a=this.cpuAccums[s]/n*100,o=this.gpuAccums[s]/n*100,c=performance&&performance.memory?performance.memory.usedJSHeapSize/(1<<20):0;this.paramLogger(s,a,o,c,r,n,i),this.cpuAccums[s]=0,Promise.all(this.finished).then(()=>{this.gpuAccums[s]=0,this.finished=[]})}this.paramFrame=this.frameId,this.paramTime=t}}if(!this.detected||!this.chartFrame)this.chartFrame=this.frameId,this.chartTime=t,this.circularId=0;else{let n=t-this.chartTime,i=this.chartHz*n/1e3;for(;--i>0&&this.detected;){let s=(this.frameId-this.chartFrame)/n*1e3;this.chart[this.circularId%this.chartLen]=s;for(let a=0;a<this.names.length;a++)this.chartLogger(a,this.chart,this.circularId);this.circularId++,this.chartFrame=this.frameId,this.chartTime=t}}}begin(e){this.updateAccums(e)}end(e){this.updateAccums(e)}updateAccums(e){let t=this.names.indexOf(e);t==-1&&(t=this.names.length,this.addUI(e));let n=this.now(),i=n-this.t0;for(let r=0;r<t+1;r++)this.activeAccums[r]&&(this.cpuAccums[r]+=i);this.activeAccums[t]=!this.activeAccums[t],this.t0=n}};var hn=class l{constructor(e,t,n,i,r="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),l.nextNameID=l.nextNameID||0,this.$name.id=`lil-gui-name-${++l.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},nl=class extends hn{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function il(l){let e,t;return(e=l.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=l.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=l.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}var gp={isPrimitive:!0,match:l=>typeof l=="string",fromHexString:il,toHexString:il},ar={isPrimitive:!0,match:l=>typeof l=="number",fromHexString:l=>parseInt(l.substring(1),16),toHexString:l=>"#"+l.toString(16).padStart(6,0)},xp={isPrimitive:!1,match:l=>Array.isArray(l),fromHexString(l,e,t=1){let n=ar.fromHexString(l);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([l,e,t],n=1){n=255/n;let i=l*n<<16^e*n<<8^t*n<<0;return ar.toHexString(i)}},_p={isPrimitive:!1,match:l=>Object(l)===l,fromHexString(l,e,t=1){let n=ar.fromHexString(l);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:l,g:e,b:t},n=1){n=255/n;let i=l*n<<16^e*n<<8^t*n<<0;return ar.toHexString(i)}},yp=[gp,ar,xp,_p];function bp(l){return yp.find(e=>e.match(l))}var rl=class extends hn{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=bp(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{let r=il(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},sr=class extends hn{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}},sl=class extends hn{constructor(e,t,n,i,r,s){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(r);let a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;let t=()=>{let _=parseFloat(this.$input.value);isNaN(_)||(this._stepExplicit&&(_=this._snap(_)),this.setValue(this._clamp(_)))},n=_=>{let y=parseFloat(this.$input.value);isNaN(y)||(this._snapClampSetValue(y+_),this.$input.value=this.getValue())},i=_=>{_.key==="Enter"&&this.$input.blur(),_.code==="ArrowUp"&&(_.preventDefault(),n(this._step*this._arrowKeyMultiplier(_))),_.code==="ArrowDown"&&(_.preventDefault(),n(this._step*this._arrowKeyMultiplier(_)*-1))},r=_=>{this._inputFocused&&(_.preventDefault(),n(this._step*this._normalizeMouseWheel(_)))},s=!1,a,o,c,u,h,d=5,f=_=>{a=_.clientX,o=c=_.clientY,s=!0,u=this.getValue(),h=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",x)},p=_=>{if(s){let y=_.clientX-a,b=_.clientY-o;Math.abs(b)>d?(_.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(y)>d&&x()}if(!s){let y=_.clientY-c;h-=y*this._step*this._arrowKeyMultiplier(_),u+h>this._max?h=this._max-u:u+h<this._min&&(h=this._min-u),this._snapClampSetValue(u+h)}c=_.clientY},x=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",x)},m=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");let e=(g,_,y,b,v)=>(g-_)/(y-_)*(v-b)+b,t=g=>{let _=this.$slider.getBoundingClientRect(),y=e(g,_.left,_.right,this._min,this._max);this._snapClampSetValue(y)},n=g=>{this._setDraggingStyle(!0),t(g.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",r)},i=g=>{t(g.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",r)},s=!1,a,o,c=g=>{g.preventDefault(),this._setDraggingStyle(!0),t(g.touches[0].clientX),s=!1},u=g=>{g.touches.length>1||(this._hasScrollBar?(a=g.touches[0].clientX,o=g.touches[0].clientY,s=!0):c(g),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=g=>{if(s){let _=g.touches[0].clientX-a,y=g.touches[0].clientY-o;Math.abs(_)>Math.abs(y)?c(g):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else g.preventDefault(),t(g.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},f=this._callOnFinishChange.bind(this),p=400,x,m=g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();let y=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(x),x=setTimeout(f,p)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},al=class extends hn{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{let n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},ol=class extends hn{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},vp=`.lil-gui {
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
}`;function Tp(l){let e=document.createElement("style");e.innerHTML=l;let t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}var Gc=!1,ms=class l{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:r="Controls",closeFolders:s=!1,injectStyles:a=!0,touchStyles:o=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),o&&this.domElement.classList.add("allow-touch-styles"),!Gc&&a&&(Tp(vp),Gc=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=s}add(e,t,n,i,r){if(Object(n)===n)return new al(this,e,t,n);let s=e[t];switch(typeof s){case"number":return new sl(this,e,t,n,i,r);case"boolean":return new nl(this,e,t);case"string":return new ol(this,e,t);case"function":return new sr(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,s)}addColor(e,t,n=1){return new rl(this,e,t,n)}addFolder(e){let t=new l({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof sr||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof sr)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");let n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);let i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}};var Ht=class l{static root=null;static statusEl=null;static dragDepth=0;static busy=!1;static showStaticDropPanel=!1;static referenceType=null;static targetInstanceName=null;static ensure(){if(l.root)return l.root;l.injectStyles();let e=document.createElement("div");return e.id="mtlx-drop-zone",e.className="mtlx-drop-zone hidden",e.innerHTML=`
            <div class="mtlx-drop-inner">
                <div class="mtlx-drop-icon">\u2B07</div>
                <div class="mtlx-drop-title">Glisser un mat\xE9riau MaterialX</div>
                <div class="mtlx-drop-hint">D\xE9posez un fichier <b>.mtlx</b> (ou un dossier avec ses biblioth\xE8ques <code>xi:include</code> et ses textures)</div>
                <button type="button" class="mtlx-browse-btn" data-mtlx-browse>\u{1F4C2} Parcourir la biblioth\xE8que\u2026</button>
                <div class="mtlx-drop-status" data-mtlx-status></div>
            </div>`,(document.querySelector(".canvas-stage-wrap")??document.body).appendChild(e),l.root=e,l.statusEl=e.querySelector("[data-mtlx-status]"),e.querySelector("[data-mtlx-browse]")?.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),l.referenceType=null,l.openExplorer()}),l.wireEvents(e),e}static show(){l.showStaticDropPanel&&l.ensure().classList.remove("hidden")}static hide(){l.root&&l.root.classList.add("hidden")}static openLibrary(e=null,t=null){l.referenceType=e,l.targetInstanceName=t,l.openExplorer()}static setStatus(e,t){l.statusEl&&(l.statusEl.textContent=e,l.statusEl.dataset.kind=t)}static wireEvents(e){let t=s=>{s.preventDefault(),l.dragDepth++,e.classList.add("dragover")},n=s=>{s.preventDefault(),s.dataTransfer&&(s.dataTransfer.dropEffect="copy")},i=s=>{s.preventDefault(),l.dragDepth=Math.max(0,l.dragDepth-1),l.dragDepth===0&&e.classList.remove("dragover")},r=async s=>{s.preventDefault(),l.dragDepth=0,e.classList.remove("dragover"),!(l.busy||!s.dataTransfer)&&await l.handleDrop(s.dataTransfer)};e.addEventListener("dragenter",t),e.addEventListener("dragover",n),e.addEventListener("dragleave",i),e.addEventListener("drop",r)}static async handleDrop(e){l.busy=!0,l.setStatus("Lecture des fichiers\u2026","busy");try{let t=await l.collectFiles(e);if(t.filter(r=>r.name.toLowerCase().endsWith(".mtlx")).length===0){l.setStatus("Aucun fichier .mtlx trouv\xE9.","error");return}l.setStatus("Compilation du mat\xE9riau\u2026","busy");let i=await ke.instance.applyDroppedMaterialXAsync(t);l.setStatus(i.message,i.ok?"ok":"error")}catch(t){l.setStatus(t instanceof Error?t.message:String(t),"error")}finally{l.busy=!1}}static async collectFiles(e){let t=[],n=e.items,i=[];if(n&&n.length)for(let s=0;s<n.length;s++){let a=n[s],o=a.webkitGetAsEntry,c=typeof o=="function"?o.call(a):null;c&&i.push(c)}if(i.length){for(let s of i)await l.traverseEntry(s,"",t);return t}let r=e.files;for(let s=0;s<r.length;s++){let a=r[s];t.push({path:a.name,name:a.name,file:a})}return t}static traverseEntry(e,t,n){if(e.isFile)return new Promise(i=>{e.file(r=>{n.push({path:t+e.name,name:e.name,file:r}),i()},()=>i())});if(e.isDirectory){let i=e.createReader(),r=t+e.name+"/";return new Promise(s=>{let a=[],o=()=>{i.readEntries(async c=>{if(c.length===0){for(let u of a)await l.traverseEntry(u,r,n);s();return}a.push(...c),o()},()=>s())};o()})}return Promise.resolve()}static explorerRoot=null;static materials=null;static async openExplorer(){let e=l.ensureExplorer();if(e.classList.remove("hidden"),l.materials===null){let t=e.querySelector("[data-tree]");t.textContent="Chargement de la biblioth\xE8que\u2026";try{let n=new URL("materialx-materials.json",document.baseURI).toString(),i=await fetch(n);l.materials=i.ok?await i.json():[]}catch{l.materials=[]}l.renderTree("")}}static ensureExplorer(){if(l.explorerRoot)return l.explorerRoot;let e=document.createElement("div");return e.className="mtlx-explorer hidden",e.innerHTML=`
            <div class="mtlx-explorer-panel">
                <div class="mtlx-explorer-head">
                    <span class="mtlx-explorer-title">Biblioth\xE8que MaterialX</span>
                    <button type="button" class="mtlx-explorer-close" data-close>\u2715</button>
                </div>
                <input type="search" class="mtlx-explorer-search" data-search placeholder="Filtrer les mat\xE9riaux\u2026" />
                <div class="mtlx-explorer-tree" data-tree></div>
                <div class="mtlx-explorer-status" data-ex-status></div>
            </div>`,(document.querySelector(".canvas-stage-wrap")??document.body).appendChild(e),l.explorerRoot=e,e.querySelector("[data-close]")?.addEventListener("click",()=>e.classList.add("hidden")),e.addEventListener("click",t=>{t.target===e&&e.classList.add("hidden")}),e.querySelector("[data-search]")?.addEventListener("input",t=>{l.renderTree(t.target.value.trim().toLowerCase())}),e}static renderTree(e){let t=l.explorerRoot;if(!t)return;let n=t.querySelector("[data-tree]");n.replaceChildren();let i=(l.materials??[]).filter(o=>!e||o.toLowerCase().includes(e));if(i.length===0){n.textContent="Aucun mat\xE9riau.";return}let r={folders:new Map,files:[]};for(let o of i){let c=o.split("/"),u=r;for(let h=0;h<c.length-1;h++){let d=u.folders.get(c[h]);d||(d={folders:new Map,files:[]},u.folders.set(c[h],d)),u=d}u.files.push(o)}let s=e.length>0,a=o=>{let c=document.createDocumentFragment();for(let u of[...o.folders.keys()].sort((h,d)=>h.localeCompare(d))){let h=document.createElement("details");h.className="mtlx-tree-folder",s&&(h.open=!0);let d=document.createElement("summary");d.textContent=u,h.appendChild(d),h.appendChild(a(o.folders.get(u))),c.appendChild(h)}for(let u of o.files.sort((h,d)=>h.localeCompare(d))){let h=document.createElement("button");h.type="button",h.className="mtlx-tree-file",h.textContent=(u.split("/").pop()??u).replace(/\.mtlx$/i,""),h.addEventListener("click",()=>{l.selectMaterial(u)}),c.appendChild(h)}return c};n.appendChild(a(r))}static async selectMaterial(e){if(l.busy)return;let t=l.explorerRoot,n=t?.querySelector("[data-ex-status]");l.busy=!0,n&&(n.textContent="Compilation du mat\xE9riau\u2026",n.dataset.kind="busy"),l.setStatus("Compilation du mat\xE9riau\u2026","busy");try{let i=await ke.instance.applyServerMaterialXAsync(e,l.referenceType,l.targetInstanceName);l.setStatus(i.message,i.ok?"ok":"error"),n&&(n.textContent=i.message,n.dataset.kind=i.ok?"ok":"error"),i.ok&&t?.classList.add("hidden")}catch(i){let r=i instanceof Error?i.message:String(i);l.setStatus(r,"error"),n&&(n.textContent=r,n.dataset.kind="error")}finally{l.busy=!1}}static injectStyles(){if(document.getElementById("mtlx-drop-zone-styles"))return;let e=document.createElement("style");e.id="mtlx-drop-zone-styles",e.textContent=`
            .mtlx-drop-zone {
                position: absolute;
                left: 16px;
                bottom: 16px;
                width: 300px;
                max-width: calc(100% - 32px);
                z-index: 1400;
                border: 2px dashed rgba(120, 170, 255, 0.7);
                border-radius: 12px;
                background: rgba(19, 29, 43, 0.82);
                color: #e6eefc;
                backdrop-filter: blur(4px);
                transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
                user-select: none;
            }
            .mtlx-drop-zone.hidden { display: none; }
            .mtlx-drop-zone.dragover {
                border-color: #7db0ff;
                background: rgba(35, 55, 85, 0.92);
                transform: scale(1.02);
            }
            .mtlx-drop-inner { padding: 14px 16px; text-align: center; pointer-events: none; }
            .mtlx-drop-icon { font-size: 22px; opacity: 0.85; }
            .mtlx-drop-title { font-weight: 600; margin-top: 4px; font-size: 14px; }
            .mtlx-drop-hint { font-size: 11px; line-height: 1.4; opacity: 0.8; margin-top: 6px; }
            .mtlx-drop-hint code { background: rgba(255,255,255,0.1); padding: 0 3px; border-radius: 3px; }
            .mtlx-drop-status { font-size: 11px; margin-top: 8px; min-height: 14px; font-weight: 600; }
            .mtlx-drop-status[data-kind="busy"] { color: #ffd479; }
            .mtlx-drop-status[data-kind="ok"] { color: #8ce39a; }
            .mtlx-drop-status[data-kind="error"] { color: #ff8b8b; }
            .mtlx-browse-btn {
                pointer-events: auto;
                margin-top: 10px;
                width: 100%;
                padding: 10px 12px;
                font-size: 13px;
                font-weight: 600;
                color: #e6eefc;
                background: rgba(70, 110, 180, 0.55);
                border: 1px solid rgba(120, 170, 255, 0.7);
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.15s ease;
            }
            .mtlx-browse-btn:hover, .mtlx-browse-btn:active { background: rgba(90, 140, 220, 0.8); }

            .mtlx-explorer {
                position: fixed;
                inset: 0;
                z-index: 1600;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(6, 10, 18, 0.55);
                backdrop-filter: blur(3px);
            }
            .mtlx-explorer.hidden { display: none; }
            .mtlx-explorer-panel {
                display: flex;
                flex-direction: column;
                width: min(480px, 92vw);
                height: min(70vh, 640px);
                background: rgba(19, 29, 43, 0.98);
                color: #e6eefc;
                border: 1px solid rgba(120, 170, 255, 0.5);
                border-radius: 12px;
                overflow: hidden;
            }
            .mtlx-explorer-head {
                display: flex; align-items: center; justify-content: space-between;
                padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.08);
            }
            .mtlx-explorer-title { font-weight: 700; font-size: 15px; }
            .mtlx-explorer-close {
                background: none; border: none; color: #cdd7ea; font-size: 20px;
                cursor: pointer; padding: 4px 8px; line-height: 1; border-radius: 6px;
            }
            .mtlx-explorer-close:hover { background: rgba(255,255,255,0.1); }
            .mtlx-explorer-search {
                margin: 10px 14px 4px; padding: 10px 12px; font-size: 14px;
                color: #e6eefc; background: rgba(0,0,0,0.25);
                border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; outline: none;
            }
            .mtlx-explorer-tree { flex: 1; overflow-y: auto; padding: 6px 10px 10px; -webkit-overflow-scrolling: touch; }
            .mtlx-explorer-status { font-size: 12px; padding: 6px 14px 10px; min-height: 16px; font-weight: 600; }
            .mtlx-explorer-status[data-kind="busy"] { color: #ffd479; }
            .mtlx-explorer-status[data-kind="ok"] { color: #8ce39a; }
            .mtlx-explorer-status[data-kind="error"] { color: #ff8b8b; }
            .mtlx-tree-folder > summary {
                list-style: none; cursor: pointer; padding: 8px 8px; border-radius: 6px;
                font-weight: 600; font-size: 13px; color: #bcd0f5;
            }
            .mtlx-tree-folder > summary::before { content: "\u25B8 "; opacity: 0.7; }
            .mtlx-tree-folder[open] > summary::before { content: "\u25BE "; }
            .mtlx-tree-folder > summary:hover { background: rgba(255,255,255,0.06); }
            .mtlx-tree-folder { padding-left: 10px; border-left: 1px solid rgba(255,255,255,0.06); }
            .mtlx-tree-file {
                display: block; width: 100%; text-align: left;
                padding: 9px 10px; margin: 1px 0; font-size: 13px;
                color: #e6eefc; background: none; border: none; border-radius: 6px; cursor: pointer;
            }
            .mtlx-tree-file::before { content: "\u{1F3A8} "; opacity: 0.85; }
            .mtlx-tree-file:hover, .mtlx-tree-file:active { background: rgba(90, 140, 220, 0.35); }
        `,document.head.appendChild(e)}};var ll=class{sampleCount=0},Cn=class l{static showGui=!0;static params=new ll;static gui=null;static guiResizeHandler=null;static guiDragCleanup=null;static actionButtonsCleanup=null;static guiManualPosition=null;static build(e){if(!l.showGui){l.gui&&(l.gui.destroy(),l.gui=null),l.guiResizeHandler&&(window.removeEventListener("resize",l.guiResizeHandler),l.guiResizeHandler=null),l.guiDragCleanup&&(l.guiDragCleanup(),l.guiDragCleanup=null),l.actionButtonsCleanup&&(l.actionButtonsCleanup(),l.actionButtonsCleanup=null);return}l.gui&&(l.gui.destroy(),l.gui=null),l.guiDragCleanup&&(l.guiDragCleanup(),l.guiDragCleanup=null),l.actionButtonsCleanup&&(l.actionButtonsCleanup(),l.actionButtonsCleanup=null);let t=l.getAdaptiveGuiWidth(),n=new ms({title:"Settings",width:t});l.gui=n,l.guiResizeHandler&&(window.removeEventListener("resize",l.guiResizeHandler),l.guiResizeHandler=null);let i=()=>{let g=n.domElement,_=window.matchMedia("(max-width: 900px)").matches;if(g.style.width=`${l.getAdaptiveGuiWidth()}px`,g.style.maxWidth="calc(100vw - 20px)",g.style.maxHeight=_?"calc(100vh - 90px)":"calc(100vh - 50px)",g.style.overflowY="auto",g.style.display="block",g.style.position="fixed",g.style.zIndex="1500",document.body.classList.toggle("gui-compact",_),document.body.classList.remove("gui-hidden"),l.guiManualPosition){let y=l.clampGuiPosition(g,l.guiManualPosition.x,l.guiManualPosition.y);l.guiManualPosition=y,l.applyGuiPosition(g,y.x,y.y)}else n.domElement.style.right="8px",n.domElement.style.top="8px",n.domElement.style.left="auto"};l.guiResizeHandler=i,window.addEventListener("resize",i),i(),l.guiDragCleanup=l.enableGuiDragging(n);let r=e.renderer,s=r.scene,a=s instanceof Le,o=s.renderOptions,c={rewind:()=>(e.rewind(),!0),pauseOrContinue:()=>e.pauseOrContinue(),fullscreen:async()=>{let g=document.getElementById("canvas");g&&(g.requestFullscreen?await g.requestFullscreen():g.mozRequestFullScreen?await g.mozRequestFullScreen():g.webkitRequestFullscreen?await g.webkitRequestFullscreen():g.msRequestFullscreen&&await g.msRequestFullscreen(),g.focus&&g.focus())},isPaused:()=>!!e.stopped},u={enableDebug:et.profiling,showBenchmark:!0};n.add(r,"sampleCounter").listen().name("Samples").disable(),l.actionButtonsCleanup=l.addActionButtonsRow(n,c);let h=l.attachBenchmarkToGui(n.domElement);h&&n.add(u,"showBenchmark").name("Show Benchmark").onChange(g=>{h.style.display=g?"flex":"none"});let d=n.addFolder("Scene").close();{let g=s.sceneName??"",_=e.scenes.find(T=>g===T||g===`/scenes/pathtracer/${T}`),y=e.shadertoyScenes.find(T=>g===T||g===`/scenes/shadertoy/examples/${T}/shader.json`),b=e.shadertoyGlslPathtracerScenes.find(T=>g===`/scenes/shadertoy/examples/glsl-pathtracer/${T}/shadertoy.json`),v=e.shadertoyGlslPathtracerScenes.find(T=>g===`/scenes/shadertoy/examples/glsl-pathtracer/${T}/data.json`),M={pathTracingScene:_,shadertoyScene:y,glslPathTracerScene:b,glslPathTracerScene2:v};d.add(M,"pathTracingScene",e.scenes).name("PathTracer Scene").onChange(async T=>{M.pathTracingScene=T,await e.startSceneAsync(`/scenes/pathtracer/${T}`)}),d.add(M,"shadertoyScene",e.shadertoyScenes).name("ShaderToy Scene").onChange(async T=>{M.shadertoyScene=T,await e.startSceneAsync(`/scenes/shadertoy/examples/${T}/shader.json`)}),d.add(M,"glslPathTracerScene",e.shadertoyGlslPathtracerScenes).name("GLSL-PathTracer Scene (with Shadertoy)").onChange(async T=>{M.glslPathTracerScene=T,await e.startSceneAsync(`/scenes/shadertoy/examples/glsl-pathtracer/${T}/shadertoy.json`)}),d.add(M,"glslPathTracerScene2",e.shadertoyGlslPathtracerScenes).name("GLSL-PathTracer Scene (with Pathtracer)").onChange(async T=>{M.glslPathTracerScene2=T,await e.startSceneAsync(`/scenes/shadertoy/examples/glsl-pathtracer/${T}/data.json`)}),a&&d.add({envMap:e.envMaps[e.envMapIdx]},"envMap",e.envMaps).name("EnvMaps").onChange(async T=>{await s.addEnvMapAsync(`HDR/${T}`)})}let f=n.addFolder("Render Settings").close();{let g=o.screenZoom;f.add({zoom:g},"zoom",[.25,.5,.75,1]).listen().name("Screen Zoom").onChange(y=>{o.screenZoom=y,e.resizeAsync(o.originalRenderResolution.x*y,o.originalRenderResolution.y*y)}),f.add(o,"pixelRatio",[.25,.5,.75,1]).listen().name("Pixel Ratio").onChange(y=>{o.tileWidth=Math.floor(o.renderResolution.x*y/o.screenZoom),o.tileHeight=Math.floor(o.renderResolution.y*y/o.screenZoom),e.resizeAsync(o.renderResolution.x,o.renderResolution.y)}),a&&s.materials?.some(y=>y.materialType===1)&&f.add(o,"materialxGeneratorType",["auto","pathtracer","essl"]).listen().name("MaterialX Generator").onChange(async y=>{let b=e.interactiveMaterialX?o.materialxGeneratorType==="essl"?ke.INTERACTIVE_MTLX_SCENE_ESSL:ke.INTERACTIVE_MTLX_SCENE:s.sceneName;await e.startSceneAsync(b)}),f.add(o,"maxSpp",-1,256).step(1).listen().name("Max SPP").onChange(y=>{e.optionsChanged=!0}),f.add(o,"forceSynchronousShaderLink").listen().name("Disable KHR parallel compile").onChange(y=>{e.reloadShaders=!0}),a&&(f.add(o,"maxDepth",1,10).step(1).listen().name("Max Depth").onChange(y=>{e.optionsChanged=!0}),f.add(o,"enableRR").listen().name("Enable Russian Roulette").onChange(y=>{e.reloadShaders=!0}),f.add(o,"RRDepth",1,10).step(1).listen().name("Russian Roulette Depth").onChange(y=>{e.reloadShaders=!0}),f.add(o,"enableRoughnessMollification").listen().name("Enable Roughness Mollification").onChange(y=>{e.reloadShaders=!0}),f.add(o,"roughnessMollificationAmt").listen().name("Roughness Mollification Amount").onChange(y=>{e.optionsChanged=!0}),f.add(o,"enableVolumeMIS").listen().name("Enable Volume MIS").onChange(y=>{e.reloadShaders=!0}),(a||s?.shadertoyShader?.isGlslPathtracer)&&(f.add(o,"enableDenoiser").listen().name("Enable Denoiser").onChange(y=>{e.startSceneAsync(s.sceneName)}),f.add(o,"denoiserFrameCnt",5,20).step(1).listen().name("Denoiser Frame Count").onChange(y=>{})))}let p=n.addFolder("Environment").close();{let g=E.pow(o.uniformLightCol,.45454545454545453);p.addColor({rgb:{r:g.x,g:g.y,b:g.z}},"rgb").listen().name("Uniform Light Color (Gamma Corrected)").onChange(_=>{o.uniformLightCol=E.pow(new E(_.r,_.g,_.b),2.2),e.optionsChanged=!0}),p.add(o,"enableEnvMap").listen().name("Enable Environment Map").onChange(_=>{e.reloadShaders=!0}),p.add(o,"envMapIntensity",.1,10).listen().name("Environment Map Intensity").onChange(_=>{e.optionsChanged=!0}),p.add(o,"envMapRot",0,360).listen().name("Environment Map Rotation").onChange(_=>{e.optionsChanged=!0}),p.add(o,"hideEmitters").listen().name("Hide Emitters").onChange(_=>{e.reloadShaders=!0}),p.add(o,"enableBackground").listen().name("Enable Background").onChange(_=>{e.reloadShaders=!0}),p.addColor(o,"backgroundCol").listen().name("Background Color").onChange(_=>{e.optionsChanged=!0}),p.add(o,"transparentBackground").listen().name("Transparent Background").onChange(_=>{e.reloadShaders=!0})}let x=n.addFolder("Tonemapping").close();{let g=x.add(o,"enableTonemap").listen().name("Enable Tonemap"),_=x.add(o,"enableAces").listen().name("Enable ACES"),y=x.add(o,"simpleAcesFit").listen().name("Simple ACES Fit");g.onChange(b=>{b?_.enable():(_.setValue(!1),y.setValue(!1),_.disable(),y.disable())}),_.onChange(b=>{b?y.enable():(y.disable(),y.setValue(!1))})}let m=n.addFolder("Camera").close();{let g=ir.degrees(s.camera.fov);m.add({fov:g},"fov",10,90).listen().name("Fov").onChange(y=>{s.camera.setFov(y),e.optionsChanged=!0});let _=s.camera.aperture*1e3;m.add({aperture:_},"aperture",0,10).listen().name("Aperture").onChange(y=>{s.camera.aperture=y/1e3,e.optionsChanged=!0}),m.add(s.camera,"focalDist",.01,50).listen().name("Focal Distance").onChange(y=>{e.optionsChanged=!0}),m.add({pos:`${s.camera.position.x.toFixed(2)}, ${s.camera.position.y.toFixed(2)}, ${s.camera.position.z.toFixed(2)}`},"pos").listen().name("Pos").disable()}if(s.materials&&s.materials.length>0){let g=n.addFolder("Materials").close();{let _=[];for(let b=0;b<s.materials.length;b++)_.push(s.materials[b].name);let y=null;g.add({instance:"-- None --"},"instance",_).onChange(b=>{b==="-- None --"?(y?.destroy(),y=null):y=l.onMaterialChanged(g,y,b,e)}),y=l.onMaterialChanged(g,y,s.materials[0].name,e)}}if(s.meshInstances&&s.meshInstances.length>0){let g=n.addFolder("Instances").close();{let _=[];for(let b=0;b<s.meshInstances.length;b++)_.push(s.meshInstances[b].name);let y=null;g.add({instance:""},"instance",_).onChange(b=>{y=l.onInstanceChanged(g,y,b,e)}),y=l.onInstanceChanged(g,y,s.meshInstances[0].name,e)}}}static onMaterialChanged(e,t,n,i){let r=i.renderer.scene,s=r.renderOptions;t?.destroy(),t=e.addFolder("Material").close();let a=r.materials.findIndex(y=>y?.name===n);a<0&&(a=0);let o=r.materials[a];if(!o)return t;if(o.materialType===1){let y=t.addFolder("MaterialX").open(),b={model:o.materialxModelType||"unknown"};y.add(b,"model").name("Model").disable();let v=o.materialxParamDefs||[],M=o.materialxPayload;if(!M||v.length===0){let S={note:"No editable MaterialX payload"};return y.add(S,"note").name("Info").disable(),t}let T=S=>S.startsWith("base_")?"Base":S.startsWith("specular_")?"Specular":S.startsWith("transmission_")||S.startsWith("thin_film_")?"Transmission":S.startsWith("subsurface_")?"Subsurface":S.startsWith("coat_")?"Coat":S.startsWith("sheen_")?"Sheen":S.startsWith("emission_")?"Emission":S.startsWith("geometry_")?"Geometry":S.startsWith("volume_")?"Volume":"Other",w=new Map,C=S=>{let U=w.get(S);return U||(U=y.addFolder(S).open(),w.set(S,U)),U},A=(S,U)=>{S<0||S>=M.length||(M[S]=U,i.objectPropChanged=!0)};for(let S of v){let U=C(T(S.name)),L=S.name,B=S.type.toLowerCase();if(S.comps<=1){let X=S.offset,D=X>=0&&X<M.length?M[X]:0;if(B==="bool"||B==="boolean"){let H={value:D>=.5};U.add(H,"value").name(L).onChange(I=>{A(X,I?1:0)})}else if(B==="int"||B==="integer"){let H={value:Math.round(D)};U.add(H,"value").name(L).onChange(I=>{A(X,Math.round(I))})}else{let H={value:D};U.add(H,"value").name(L).onChange(I=>{A(X,I)})}continue}let z=U.addFolder(L).close(),O=["x","y","z","w"],F={};for(let X=0;X<S.comps&&X<O.length;X++){let D=O[X],H=S.offset+X;F[D]=H>=0&&H<M.length?M[H]:0}for(let X=0;X<S.comps&&X<O.length;X++){let D=O[X],H=S.offset+X;z.add(F,D).onChange(I=>{A(H,I)})}}return t}let c=t.addFolder("Base").open();{let y=E.pow(o.baseColor,.45454545454545453);c.addColor({rgb:{r:y.x,g:y.y,b:y.z}},"rgb").listen().name("Albedo (Gamma Corrected)").onChange(b=>{o.baseColor=E.pow(new E(b.r,b.g,b.b),2.2),i.objectPropChanged=!0}),c.add(o,"metallic",0,1).listen().name("Metallic").onChange(b=>{i.objectPropChanged=!0}),c.add(o,"roughness",0,1).listen().name("Roughness").onChange(b=>{i.objectPropChanged=!0})}let u=t.addFolder("Specular").open();u.add(o,"specularTint",0,1).listen().name("SpecularTint").onChange(y=>{i.objectPropChanged=!0}),u.add(o,"ior",1.001,2.5).listen().name("Ior").onChange(y=>{i.objectPropChanged=!0}),u.add(o,"anisotropic",0,1).listen().name("Anisotropic").onChange(y=>{i.objectPropChanged=!0});let h=t.addFolder("Coat").open();h.add(o,"clearcoat",0,1).listen().name("Clearcoat").onChange(y=>{i.objectPropChanged=!0}),h.add(o,"clearcoatGloss",0,1).listen().name("ClearcoatGloss").onChange(y=>{i.objectPropChanged=!0});let d=t.addFolder("Sheen").open();d.add(o,"sheen",0,1).listen().name("Sheen").onChange(y=>{i.objectPropChanged=!0}),d.add(o,"sheenTint",0,1).listen().name("SheenTint").onChange(y=>{i.objectPropChanged=!0});let f;f=t.addFolder("Transmission").open().add(o,"specTrans",0,1).listen().name("SpecTrans").onChange(y=>{i.objectPropChanged=!0}),t.addFolder("SSS").open().add(o,"subsurface",0,1).listen().name("Subsurface").onChange(y=>{i.objectPropChanged=!0});let m=t.addFolder("Medium").open();{let y,b,v,M=()=>{let S=o.mediumType!==0;y.domElement.style.display=S?"":"none",v.domElement.style.display=S?"":"none",b.domElement.style.display=S?"":"none"},T=()=>{let S=o.mediumType===2;b.domElement.style.display=S?"":"none"},w=o.mediumType,C=w===0?"None":w===1?"Absorb":w===2?"Scatter":"Emissive";m.add({mediumType:C},"mediumType",["None","Absorb","Scatter","Emissive"]).listen().name("Medium Type").onChange(S=>{i.reloadShaders=!0,i.objectPropChanged=!0,o.mediumType=S==="None"?0:S==="Absorb"?1:S==="Scatter"?2:3,M(),T()});let A=E.pow(o.mediumColor,1/2.2);y=m.addColor({rgb:{r:A.x,g:A.y,b:A.z}},"rgb").listen().name("Medium Color (Gamma Corrected)").onChange(S=>{o.mediumColor=E.pow(new E(S.r,S.g,S.b),2.2),i.objectPropChanged=!0}),b=m.add(o,"mediumAnisotropy",-.99,.99).listen().name("Medium Anisotropy").onChange(S=>{i.objectPropChanged=!0}),v=m.add(o,"mediumDensity",0,5).listen().name("Medium Density").onChange(S=>{i.objectPropChanged=!0}),M(),T()}let g=t.addFolder("Emission").open();{let y=E.pow(o.emission,.45454545454545453);g.addColor({rgb:{r:y.x,g:y.y,b:y.z}},"rgb").listen().name("Emission (Gamma Corrected)").onChange(b=>{o.emission=E.pow(new E(b.r,b.g,b.b),2.2),i.objectPropChanged=!0})}let _=t.addFolder("Alpha").open();{let y,b=()=>{let T=o.alphaMode!==0;y.domElement.style.display=T?"":"none"},M=o.alphaMode===0?"Opaque":"Blend";_.add({alphaMode:M},"alphaMode",["Opaque","Blend"]).listen().name("Alpha Mode").onChange(T=>{o.alphaMode=T==="Opaque"?0:1,i.reloadShaders=!0,i.objectPropChanged=!0,b()}),y=_.add(o,"opacity",0,1).listen().name("Opacity").onChange(T=>{i.objectPropChanged=!0}),_.add(o,"alphaCutoff",0,1).listen().name("Alpha Cutoff").onChange(T=>{i.objectPropChanged=!0}),b()}return t}static onInstanceChanged(e,t,n,i){let r=i.renderer.scene;t?.destroy();let s=r.meshInstances.find(a=>a.name===n);if(i.interactiveMaterialX){t=e.addFolder("MaterialX").close();let a=r.materials[s.materialID]?.materialxModelType||null;t.add({browse:()=>Ht.openLibrary(a,s.name)},"browse").name("\u{1F50D} Rechercher un mat\xE9riau MaterialX\u2026")}return t}static onTransformChanged(e,t,n,i){i.transform=ne.fromDecomposed(e,t,n)}static getAdaptiveGuiWidth(){let e=window.innerWidth;return e<=480?Math.max(250,e-24):e<=900?Math.max(280,Math.floor(e*.8)):e<=1400?360:400}static attachBenchmarkToGui(e){let t=e.querySelector(".bench-host");t||(t=document.createElement("div"),t.className="bench-host",t.style.margin="8px",t.style.padding="6px",t.style.borderRadius="8px",t.style.background="rgba(14, 22, 34, 0.72)",t.style.border="1px solid rgba(90, 130, 170, 0.35)",t.style.display="flex",t.style.alignItems="flex-start",t.style.justifyContent="flex-start",e.appendChild(t));let n=document.getElementById("gl-bench-embedded-style");n||(n=document.createElement("style"),n.id="gl-bench-embedded-style",n.textContent=`
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
            `,document.head.appendChild(i));let r=e.domElement.querySelector(".children");if(!r)return()=>{};let s=document.createElement("li");s.className="controller controls-action-row";let a=document.createElement("div");a.className="controls-action-buttons";let o=document.createElement("button");o.type="button",o.title="Rewind",o.setAttribute("aria-label","Rewind"),o.innerHTML='<span class="label">Rewind</span><span class="icon">&lt;&lt;</span>',o.addEventListener("click",m=>{m.preventDefault(),t.rewind(),d(t.isPaused())});let c=document.createElement("button");c.type="button";let u=document.createElement("span");u.className="label";let h=document.createElement("span");h.className="icon",c.appendChild(u),c.appendChild(h);let d=m=>{let g=m?"Continue":"Pause";c.title=g,c.setAttribute("aria-label",g),u.textContent=g,h.textContent=m?">":"||"};d(t.isPaused());let f=window.setTimeout(()=>{d(t.isPaused())},0),p=window.setInterval(()=>{if(!document.body.contains(c)){window.clearInterval(p);return}d(t.isPaused())},200);c.addEventListener("click",m=>{m.preventDefault();let g=t.pauseOrContinue();d(g)});let x=document.createElement("button");return x.type="button",x.title="Fullscreen",x.setAttribute("aria-label","Fullscreen"),x.innerHTML='<span class="label">Fullscreen</span><span class="icon">[]</span>',x.addEventListener("click",m=>{m.preventDefault(),t.fullscreen()}),a.appendChild(o),a.appendChild(c),a.appendChild(x),s.appendChild(a),r.appendChild(s),()=>{window.clearTimeout(f),window.clearInterval(p)}}static enableGuiDragging(e){let t=e.domElement,n=t.querySelector(".title")??t;n.style.cursor="move",n.style.touchAction="none";let i=!1,r=0,s=0,a=f=>{if(!i)return;let p=f.clientX-r,x=f.clientY-s,m=l.clampGuiPosition(t,p,x);l.guiManualPosition=m,l.applyGuiPosition(t,m.x,m.y)},o=()=>{i=!1,window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",o)},c=f=>{if(f.button!==0)return;let p=t.getBoundingClientRect();i=!0,r=f.clientX-p.left,s=f.clientY-p.top,l.applyGuiPosition(t,p.left,p.top),window.addEventListener("mousemove",a),window.addEventListener("mouseup",o),f.preventDefault()},u=f=>{if(!i||f.touches.length===0)return;f.preventDefault();let p=f.touches[0],x=p.clientX-r,m=p.clientY-s,g=l.clampGuiPosition(t,x,m);l.guiManualPosition=g,l.applyGuiPosition(t,g.x,g.y)},h=()=>{i=!1,window.removeEventListener("touchmove",u),window.removeEventListener("touchend",h)},d=f=>{if(f.touches.length!==1)return;let p=t.getBoundingClientRect(),x=f.touches[0];i=!0,r=x.clientX-p.left,s=x.clientY-p.top,l.applyGuiPosition(t,p.left,p.top),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",h),f.preventDefault()};return n.addEventListener("mousedown",c),n.addEventListener("touchstart",d,{passive:!1}),()=>{n.removeEventListener("mousedown",c),n.removeEventListener("touchstart",d),window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",o),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",h)}}static applyGuiPosition(e,t,n){e.style.right="auto",e.style.left=`${t}px`,e.style.top=`${n}px`}static clampGuiPosition(e,t,n){let r=Math.max(4,window.innerWidth-e.offsetWidth-4),s=Math.max(4,window.innerHeight-e.offsetHeight-4);return{x:Math.min(Math.max(4,t),r),y:Math.min(Math.max(4,n),s)}}};var dn=class{static async readBlob(e){try{let t=await fetch(this.buildUrl(e),{method:"GET"});return t.ok?await t.blob():(console.error("Failed to read blob from:",e,t.statusText),null)}catch(t){return console.error("Failed to read blob from:",e,t),null}}static async writeBlob(e,t,n=null){console.log(`Uploading ${e} to Azure Blob Storage`);let i="scenes",r=process.env.AZURE_STORAGE_ACCOUNT_SAS_TOKEN,s=this.buildUrl(`${e}?${r}`),a=typeof t=="string"?new Blob([t]).size.toString():t.byteLength.toString(),o=await fetch(s,{method:"PUT",headers:{"x-ms-version":"2019-12-12","x-ms-date":new Date().toUTCString(),"x-ms-blob-type":"BlockBlob","Content-Type":n??(typeof t=="string"?"application/json":"application/octet-stream"),"Content-Length":a},body:typeof t=="string"?t:new Uint8Array(t)});return o.ok?!0:(console.error("Failed to create blob:",e,o.statusText),!1)}static buildUrl(e,t="scenes"){return`https://rvawebgl.blob.core.windows.net/$web/${t}/${e}`}};var gs=class extends vi{playing=!1;timeupdate=!1;copyVideo=!1;loadTexture(e){let t=document.createElement("video");this.image=t,P.document.getElementById("textures")?.appendChild(t),t.controls=!0,t.playsInline=!0,t.muted=!0,t.loop=!0,t.addEventListener("playing",()=>{this.playing=!0,this.checkReady()},!0),t.addEventListener("timeupdate",()=>{this.timeupdate=!0,this.checkReady()},!0),t.src=e,t.play()}checkReady(){this.playing&&this.timeupdate&&(this.copyVideo=!0)}};var xs=class extends Mt{internalFormat;format;gltype;audio;playing=!1;timeupdate=!1;copyAudio=!1;audioContext;analyser;freqData;waveData;constructor(){super(),this.audioContext=new AudioContext,this.audioContext.resume(),this.analyser=this.audioContext.createAnalyser(),this.freqData=new Uint8Array(this.analyser.frequencyBinCount),this.waveData=new Uint8Array(this.analyser.frequencyBinCount),this.internalFormat=P.gl.raw.R8,this.format=P.gl.raw.RED,this.gltype=P.gl.raw.UNSIGNED_BYTE}loadTexture(e){let t=document.createElement("audio");this.audio=t,t.loop=!0,t.autoplay=!0,t.crossOrigin="anonymous",t.controls=!0,t.addEventListener("playing",()=>{this.playing=!0,this.checkReady()},!0),t.addEventListener("timeupdate",()=>{this.timeupdate=!0,this.checkReady()},!0),t.addEventListener("canplay",()=>{this.audioContext.createMediaElementSource(t).connect(this.analyser),this.analyser.connect(this.audioContext.destination)},!0),t.src=e,t.load()}checkReady(){this.playing&&this.timeupdate&&(this.copyAudio=!0)}update(){this.analyser.getByteFrequencyData(this.freqData),this.analyser.getByteTimeDomainData(this.waveData)}};async function _s(l,e,t,n=null){let i=await oe(l);if(!i.ok)return console.error(`Couldn't open ${l} for reading`),!1;let r=await i.text();if(n&&(r=await n(l,r),r===null))return console.error(`Callback failed for ${l}`),!1;let s=null;try{s=new Pn(JSON.parse(r))}catch(o){return console.error(`Error parsing Shadertoy shader from ${l}:`,o),!1}let a=l.split("/").slice(0,-1).join("/");return cl(a,s,e,t,n)}async function cl(l,e,t,n,i=null){if(e.common&&(!e.commonCode||e.commonCode==="")){let a=await pe.loadAsync(`${l}/common.glsl`);if(!a.src)return console.error("Couldn't open common.glsl for reading"),!1;i&&(a.src=await i(`${l}/common.glsl`,a.src)),e.commonCode=a.src}if(e.isGlslPathtracer){let a=/^#define OPT_SHADERTOY_LIGHT(.*)$/m;if(e.commonCode=e.commonCode.replace(a,"// #define OPT_SHADERTOY_LIGHT$1"),e.bufferB&&!e.bufferB.inputs?.some(o=>o.channel===2)){let o=l.indexOf("/scenes/"),c=o>=0?l.slice(o+8):l.replace(/^\/+/,""),u=new be;u.channel=2,u.type="floats",u.filepath=dn.buildUrl(`${c}/meshData.bin`),u.id="meshData",u.sampler={filter:"none",wrap:"clamp",vflip:"false"},e.bufferB.inputs=[...e.bufferB.inputs??[],u]}}let r={},s={};for(let a of[e.bufferA,e.bufferB,e.bufferC,e.bufferD,e.cubeA,e.sound,e.image])if(a){if(a===e.bufferA?a.type="bufferA":a===e.bufferB?a.type="bufferB":a===e.bufferC?a.type="bufferC":a===e.bufferD?a.type="bufferD":a===e.cubeA?(a.type="cubeA",a.xres=1024,a.yres=1024):a===e.sound?(a.type="sound",a.xres=Oe.instance().textureDimensions,a.yres=Oe.instance().textureDimensions):a===e.image&&(a.type="image"),!a.code||a.code===""){let o=await pe.loadAsync(`${l}/${a.type}.glsl`);if(!o.src)return console.error(`Couldn't open ${a.type}.glsl for reading`),!1;if(i&&(o.src=await i(`${l}/${a.type}.glsl`,o.src),o.src===null))return console.error(`Callback failed for ${a.type}.glsl`),!1;a.code=o.src}for(let o of a.inputs){if(P.gl==null)break;if(o.type==="keyboard"){let c=St.instance();o.arrayBuffer=c.buffer,o.xres=c.xRes,o.yres=c.yRes,o.internalFormat=c.internalFormat,o.format=c.format,o.gltype=c.gltype,c.input=o}else if(o.filepath){if(o.type==="floats"){let c;if(s[o.filepath])c=s[o.filepath];else{let u=o.filepath;u.startsWith("http")||(u=`scenes/shadertoy/${u}`);let h=await oe(u);if(!h.ok)return console.error(`Couldn't open ${o.filepath} for reading`),!1;let d=await h.arrayBuffer(),f=new Ti(d),p=f.ReadUInt32(),x=f.ReadUInt32(),m=f.ReadUInt32(),g=f.ReadUInt32(),_=f.ReadUInt8(),y=f.ReadUInt8(),b=f.ReadUInt16(),v,M,T;if(_===1&&b===10)[v,M,T]=[P.gl.raw.R32F,P.gl.raw.RGB,P.gl.raw.FLOAT];else if(_===3&&b===10)[v,M,T]=[P.gl.raw.RGB32F,P.gl.raw.RED,P.gl.raw.FLOAT];else if(_===4&&b===10)[v,M,T]=[P.gl.raw.RGBA32F,P.gl.raw.RGBA,P.gl.raw.FLOAT];else return console.error(`Unsupported texture format: ${_} channels, ${b} format`),!1;let w=new Float32Array(d,20);s[o.filepath]={buffer:w,xRes:x,yRes:m,internalFormat:v,format:M,gltype:T},c=s[o.filepath]}o.arrayBuffer=c.buffer,o.xres=c.xRes,o.yres=c.yRes,o.internalFormat=c.internalFormat,o.format=c.format,o.gltype=c.gltype}else if(o.type==="volume"){let c;if(s[o.filepath])c=s[o.filepath];else{let u=o.filepath;u.startsWith("http")||(u=`scenes/shadertoy/${u}`);let h=await oe(u);if(!h.ok)return console.error(`Couldn't open ${o.filepath} for reading`),!1;let d=await h.arrayBuffer(),f=new Ti(d),p=f.ReadUInt32(),x=f.ReadUInt32(),m=f.ReadUInt32(),g=f.ReadUInt32(),_=f.ReadUInt8(),y=f.ReadUInt8(),b=f.ReadUInt16(),v,M,T;if(_===1&&b===0)[v,M,T]=[P.gl.raw.R8,P.gl.raw.RED,P.gl.raw.UNSIGNED_BYTE];else if(_===4&&b===0)[v,M,T]=[P.gl.raw.RGBA8,P.gl.raw.RGBA,P.gl.raw.UNSIGNED_BYTE];else return console.error(`Unsupported texture format: ${_} channels, ${b} format`),!1;let w=new Uint8Array(d,20);s[o.filepath]={buffer:w,xRes:x,yRes:m,internalFormat:v,format:M,gltype:T},c=s[o.filepath]}o.arrayBuffer=c.buffer,o.xres=c.xRes,o.yres=c.yRes,o.internalFormat=c.internalFormat,o.format=c.format,o.gltype=c.gltype}else if(o.filepath.endsWith("jpg")||o.filepath.endsWith("png"))if(o.type==="cubemap"&&o.filepath.endsWith("cubemap00.png"))o.type="cubeA",o.internalFormat=P.gl.raw.RGBA8,o.format=P.gl.raw.RGBA,o.gltype=P.gl.raw.UNSIGNED_BYTE;else if(o.type==="cubemap"){let c=o.filepath.substring(o.filepath.lastIndexOf("/")+1,o.filepath.lastIndexOf(".")),u=o.filepath.substring(o.filepath.lastIndexOf(".")+1),h=o.filepath.substring(0,o.filepath.lastIndexOf("/"));o.imageTextures=[];for(let d=0;d<6;d++){let f;if(d==0?f=o.filepath:f=h+`/${c}_${d}.${u}`,r[f])o.imageTextures.push(r[f]);else{let p=new dt;if(f.startsWith("http")||(f=`scenes/shadertoy/${f}`),!await p.loadTextureAsync(f))return console.error(`Couldn't load texture ${f}`),!1;r[f]=p,o.imageTextures.push(p)}}}else{let c;if(r[o.filepath])c=r[o.filepath];else{let u=new dt,h=o.filepath;if(h.startsWith("http")||(h=`scenes/shadertoy/${h}`),!await u.loadTextureAsync(h))return console.error(`Couldn't load texture ${o.filepath}`),!1;c=u,r[o.filepath]=u}o.imageTexture=c,o.xres=c.width,o.yres=c.height,o.internalFormat=P.gl.raw.RGBA8,o.format=P.gl.raw.RGBA,o.gltype=P.gl.raw.UNSIGNED_BYTE}else if(o.filepath.endsWith("mp4")||o.filepath.endsWith("webm")){let c;if(r[o.filepath])c=r[o.filepath];else{let u=new gs,h=o.filepath;h.startsWith("http")||(h=`scenes/shadertoy/${h}`),u.loadTexture(h),c=u,r[o.filepath]=u}o.imageTexture=c,o.internalFormat=P.gl.raw.RGBA8,o.format=P.gl.raw.RGBA,o.gltype=P.gl.raw.UNSIGNED_BYTE}else if(o.filepath.endsWith("mp3")||o.filepath.endsWith("ogg")){let c;if(r[o.filepath])c=r[o.filepath];else{let u=new xs,h=o.filepath;h.startsWith("http")||(h=`scenes/shadertoy/${h}`),u.loadTexture(h),c=u,r[o.filepath]=u}o.audioTexture=c,o.xres=c.analyser.frequencyBinCount,o.yres=2,o.internalFormat=c.internalFormat,o.format=c.format,o.gltype=c.gltype}}}e.buffers=e.buffers||[],e.buffers.push(a)}return t&&(t.shadertoyShader=e),!0}async function Xc(l,e,t,n=null){let i=await oe(l);if(!i.ok)return console.error(`Couldn't open ${l} for reading`),!1;let r=await i.text();n&&(r=await n(l,r));let s=null;try{s=JSON.parse(r)}catch(c){return console.error(`Error parsing Shadertoy shader from ${l}:`,c),!1}let a=new Pn;a.fromShadertoyJson(s);let o=l.split("/").slice(0,-1).join("/");return cl(o,a,e,t,n)}var pi=class{position;emission;u;v;radius;area;type;constructor(){this.position=new E,this.emission=new E,this.u=new E,this.v=new E,this.radius=0,this.area=0,this.type=0}};var Xt=class{static normalizePath(e){let t=e.split("/"),n=[];for(let i of t)i===".."?n.pop():i!=="."&&n.push(i);return n.join("/")}};var Wc=new Map,$c=new Map,Mp="/shaders/skeleton-essl.glsl";function Sp(l){let e=Wc.get(l);if(!e){let t=typeof document<"u"&&document.baseURI||window.location.href,n=new URL(l,t).toString(),i=n.slice(0,n.lastIndexOf("/")+1);e=import(n).then(r=>r.default({locateFile:(s,a)=>i?i+s:a+s})),Wc.set(l,e)}return e}function Kc(l){return l.replace(/^[ \t]*#version[^\n]*\n/gm,"").replace(/^[ \t]*precision[^\n]*\n/gm,"")}function Yc(l){return l.replace(/<xi:include\b[^>]*\/>/g,"").replace(/<xi:include\b[^>]*>[\s\S]*?<\/xi:include>/g,"")}async function Ep(l){let e=$c.get(l);if(!e){let t=typeof document<"u"&&document.baseURI||window.location.href,n=new URL(l,t).toString();e=fetch(n).then(async i=>{if(!i.ok)throw new Error(`Unable to load text asset: ${n}`);return i.text()}),$c.set(l,e)}return e}var ul=class{generator;envMapConfig;constructor(e,t={}){this.generator=e,this.envMapConfig={uEnvRadiance:"u_envRadiance",uEnvIrradiance:"u_envIrradiance",uEnvLightIntensity:"u_envLightIntensity",uEnvMatrix:"u_envMatrix",envMapRotSymbol:"envMapRot",...t}}generate(e,t,n){return this.generator.generate(e,t,n)}delete(){this.generator.delete?.()}getEnvMapConfig(){return this.envMapConfig}};function wp(l,e){let t=e.uEnvRadiance??"u_envRadiance",n=e.uEnvIrradiance??"u_envIrradiance",i=e.uEnvLightIntensity??"u_envLightIntensity",r=e.uEnvMatrix??"u_envMatrix",s=e.envMapRotSymbol??"envMapRot",a=l.replace(new RegExp(`^[ \\t]*uniform[ \\t]+\\w+[ \\t]+${t}[ \\t]*;[ \\t]*\\r?\\n`,"gm"),"").replace(new RegExp(`^[ \\t]*uniform[ \\t]+\\w+[ \\t]+${n}[ \\t]*;[ \\t]*\\r?\\n`,"gm"),"").replace(new RegExp(`^[ \\t]*uniform[ \\t]+\\w+[ \\t]+${i}[ \\t]*;[ \\t]*\\r?\\n`,"gm"),"").replace(new RegExp(`^[ \\t]*uniform[ \\t]+\\w+[ \\t]+${r}[ \\t]*;[ \\t]*\\r?\\n`,"gm"),"");return`mat4 mtlxEnvMatrix() {
    float a = 6.28318530718 * `+s+` - 1.57079632679;
    float c = cos(a), s = sin(a);
    return mat4(c, 0.0, -s, 0.0,  0.0, 1.0, 0.0, 0.0,  s, 0.0, c, 0.0,  0.0, 0.0, 0.0, 1.0);
}
#define `+r+` mtlxEnvMatrix()
#define `+t+` envMapTex
#define `+n+` envMapTex
#define `+i+` envMapIntensity
#define u_envRadianceMips 1
#define u_envRadianceSamples 1
`+a}function Ap(l,e,t){let n=typeof e=="string"?l.indexOf(e):l.match(e)?.index??-1;if(n<0)throw new Error(`Unable to locate ESSL section start: ${String(e)}`);let i=n,r=l.slice(i),s=typeof t=="string"?r.indexOf(t):r.match(t)?.index??-1;if(s<0)throw new Error(`Unable to locate ESSL section end: ${String(t)}`);return r.slice(0,s).trim()}function Rp(l){return l.replace(/\bvoid\s+main\s*\(\s*\)/,"void mtlxGeneratedMain()")}function qc(l,e){let t=l.indexOf(e);if(t<0)return l;let n=l.indexOf("{",t);if(n<0)return l;let i=0,r=n;for(;r<l.length;r++){let s=l[r];if(s==="{")i++;else if(s==="}"&&(i--,i===0)){r++;break}}return l.slice(0,t)+l.slice(r)}function Cp(l,e){let t=new RegExp(`struct\\s+${e}\\s*\\{[^}]*\\}\\s*;`,"m");return l.replace(t,"")}function Ip(l,e){let t="// __MTLX_PARAMS_BEGIN__",n=l.indexOf(t);if(n<0)throw new Error("ESSL host output missing __MTLX_PARAMS_BEGIN__ marker.");let i=Ap(l,"struct BSDF",t).trim(),r=l.slice(n);return r=r.replace(/\/\/ Pixel shader outputs\s*\r?\nout vec4 out1;\s*\r?\n/,""),r=r.replace(/^\s*#define\s+MAX_LIGHT_SOURCES\s+\d+\s*$/m,""),r=Cp(r,"LightData"),r=r.replace(/^\s*uniform\s+LightData\s+u_lightData\[[^\]]*\];\s*$/m,""),r=qc(r,"int numActiveLightSources()"),r=qc(r,"void sampleLightSource("),r=Rp(r),r=r.replace(/\bpt_MtlxBindGeom\b/g,"mtlxBindGeom"),r=r.trim(),e.replace("/*__MTLX_ESSL_GEOM_GLOBALS__*/","").replace("/*__MTLX_ESSL_HOST_SETUP__*/","mtlxBindGeom(normalize(state.ffnormal), normalize(state.tangent), normalize(state.bitangent), state.fhp, state.texCoord);").replace("/*__MTLX_ESSL_PUBLIC_UNIFORMS__*/","").replace("/*__MTLX_ESSL_TYPES_AND_LIB__*/",i).replace("/*__MTLX_ESSL_LIGHT_INTERFACE__*/","").replace("/*__MTLX_ESSL_SURFACE_IMPL__*/",r).replace("/*__MTLX_ESSL_MAIN__*/","")}async function Pp(l,e){let t=await Ep(e),n=Kc(l);if(!n.includes("void pt_MtlxBindGeom("))throw new Error("ESSL output is missing pt_MtlxBindGeom; EsslHostShaderGenerator is required.");return Ip(n,t)}function ys(l){let e=new Map,t=l.indexOf("// __MTLX_PARAMS_BEGIN__"),n=l.indexOf("// __MTLX_PARAMS_END__");if(t<0||n<0||n<t)return e;let i=l.slice(t,n),r=/^[ \t]*[A-Za-z_]\w*\s+([A-Za-z_]\w*)\s*=\s*(.+);[ \t]*$/gm,s;for(;(s=r.exec(i))!==null;)e.set(s[1],s[2].trim());return e}function Lp(l){switch(l){case"vec2":return 2;case"vec3":return 3;case"vec4":return 4;default:return 1}}function Dp(l,e){let t=l.trim();if(t==="true")return new Array(e).fill(1);if(t==="false")return new Array(e).fill(0);let n=t.match(/\(([\s\S]*)\)/),r=((n?n[1]:t).match(/-?\d*\.?\d+(?:[eE][-+]?\d+)?/g)||[]).map(Number);if(r.length===0)return new Array(e).fill(0);if(r.length===1)return new Array(e).fill(r[0]);let s=new Array(e).fill(0);for(let a=0;a<e;a++)s[a]=a<r.length?r[a]:0;return s}function bs(l,e){let t="// __MTLX_PARAMS_BEGIN__",n="// __MTLX_PARAMS_END__",i=l.indexOf(t),r=l.indexOf(n);if(i<0||r<0||r<i)return{glsl:l,floatsPerMat:0,payloadByMatId:new Map};let s=/^[ \t]*([A-Za-z_]\w*)\s+([A-Za-z_]\w*)\s*=\s*.+;[ \t]*$/,a=[],o=0;for(let x of l.slice(i+t.length,r).split(`
`)){let m=x.match(s);if(m){let g=Lp(m[1]);a.push({type:m[1],name:m[2],offset:o,comps:g}),o+=g}}if(a.length===0)return{glsl:l,floatsPerMat:0,payloadByMatId:new Map};let c=x=>{let m=Math.floor(x/4),g="xyzw"[x%4];return`texelFetch1D(materialsTex, matID * MATERIALS_TEX_STRIDE + MAT_COMMON_VEC4 + ${m}).${g}`},u=x=>{let m=g=>c(x.offset+g);switch(x.type){case"vec2":return`    ${x.name} = vec2(${m(0)}, ${m(1)});`;case"vec3":return`    ${x.name} = vec3(${m(0)}, ${m(1)}, ${m(2)});`;case"vec4":return`    ${x.name} = vec4(${m(0)}, ${m(1)}, ${m(2)}, ${m(3)});`;case"bool":return`    ${x.name} = ${m(0)} > 0.5;`;case"int":return`    ${x.name} = int(${m(0)} + 0.5);`;default:return`    ${x.name} = ${m(0)};`}},h=["void mtlxLoadEsslParams(int matID)","{",...a.map(u),"}"].join(`
`),d=r+n.length,f=l.slice(0,d)+`

`+h+l.slice(d);f=f.replace("mtlxGeneratedMain();",`mtlxLoadEsslParams(state.matID);
        mtlxGeneratedMain();`);let p=new Map;for(let[x,m]of e){let g=new Float32Array(o);for(let _ of a){let y=Dp(m.get(_.name)??"",_.comps);for(let b=0;b<_.comps;b++)g[_.offset+b]=y[b]??0}p.set(x,g)}return{glsl:f,floatsPerMat:o,payloadByMatId:p}}function Fp(l,e){if(typeof e=="number"&&typeof l.getExceptionMessage=="function")try{return l.getExceptionMessage(e)}catch{}return e instanceof Error?e.message:String(e)}function Up(l,e){if(typeof l.findRenderableElement=="function"){let t=l.findRenderableElement(e);if(t)return t}if(typeof l.findRenderableElements=="function"){let t=l.findRenderableElements(e);try{if(t.size()>0)return t.get(0)}finally{t.delete?.()}}return null}function Np(l,e="auto"){if(e==="pathtracer"){let n=l.PathTracerGlslShaderGenerator?.create();if(!n)throw new Error("MaterialX module does not expose PathTracerGlslShaderGenerator.");return{generator:n,resolvedType:"pathtracer"}}if(e==="essl"){let n=l.EsslHostShaderGenerator?.create();if(!n)throw new Error("MaterialX module does not expose EsslHostShaderGenerator (rebuild the MaterialX WASM with the EsslHostShaderGenerator binding).");return{generator:n,resolvedType:"essl"}}let t=l.PathTracerGlslShaderGenerator?.create()??l.EsslShaderGenerator?.create();if(!t)throw new Error("MaterialX module does not expose PathTracerGlslShaderGenerator or EsslShaderGenerator.");return{generator:t,resolvedType:l.PathTracerGlslShaderGenerator?"pathtracer":"essl"}}async function mi(l){let e=await Sp(l.moduleUrl),{generator:t,resolvedType:n}=Np(e,l.generatorType??"auto"),i=new ul(t,l.envMapConfig),r=[i];try{let s=e.createDocument();if(r.push(s),l.libraryTexts&&l.libraryTexts.length>0){for(let d of l.libraryTexts)await e.readFromXmlString(s,Yc(d),"");await e.readFromXmlString(s,Yc(l.documentText),"")}else await e.readFromXmlString(s,l.documentText,l.searchPath??"");let a=new e.GenContext(t);r.push(a);let o=e.loadStandardLibraries(a);r.push(o),s.importLibrary(o);let c=Up(e,s);if(!c)throw new Error("No renderable surface material found in the MaterialX document.");r.push(c);let u=i.generate(c.getNamePath(),c,a);r.push(u);let h=u.getSourceCode("pixel");{let d=globalThis;if(d.__ptDumpMtlx){let f=h.replace(/\bpt_MtlxBindGeom\b/g,"mtlxBindGeom").replace(/\bpt_MtlxGeneratedMain\b/g,"mtlxGeneratedMain").replace(/\bpt_MtlxEnvMatrix\b/g,"mtlxEnvMatrix").replace(/\bpt_LoadEsslParams\b/g,"mtlxLoadEsslParams");(d.__mtlxGeneratedCppRaw||=[]).push({generatorType:n,glsl:f})}}return l.rawGeneratorOutput?h:n==="essl"?Pp(h,l.esslTemplateUrl??Mp):(l.skipEnvMapping||(h=wp(h,l.envMapConfig??{})),l.stripDirectives===!1?h:Kc(h))}catch(s){throw new Error(`generatePathTracerClosureGlsl failed: ${Fp(e,s)}`)}finally{for(let s of r)try{s.delete?.()}catch{}}}var Bp=["standard_surface","open_pbr_surface","gltf_pbr","UsdPreviewSurface","disney_principled","disney_bsdf","simple_hair"];function Op(l){return l.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function or(l){let e=l.match(/<surfacematerial\b[\s\S]*?<\/surfacematerial>/i);if(e){let n=e[0].match(/<input\b[^>]*\bname="surfaceshader"[^>]*>/i)?.[0].match(/\bnodename="([^"]+)"/i)?.[1]??"";if(n){let i=new RegExp(`<([A-Za-z_][\\w.]*)\\b[^>]*\\bname="${Op(n)}"[^>]*>`,"i"),s=l.match(i)?.[1]?.toLowerCase()??"";if(s&&s!=="input"&&s!=="output")return s}}for(let t of Bp)if(new RegExp(`<${t}\\b`,"i").test(l))return t.toLowerCase();return""}var Wt=8;function kp(l){switch(l){case"vec2":return 2;case"vec3":return 3;case"vec4":return 4;default:return 1}}function hl(l,e){let t=l.trim();if(t==="true")return new Array(e).fill(1);if(t==="false")return new Array(e).fill(0);let n=t.match(/\(([\s\S]*)\)/),r=((n?n[1]:t).match(/-?\d*\.?\d+(?:[eE][-+]?\d+)?/g)||[]).map(Number);if(r.length===0)return new Array(e).fill(0);if(r.length===1)return new Array(e).fill(r[0]);let s=new Array(e).fill(0);for(let a=0;a<e;a++)s[a]=a<r.length?r[a]:0;return s}function vs(l){let e="// __MTLX_PARAMS_BEGIN__",t="// __MTLX_PARAMS_END__",n=/^[ \t]*([A-Za-z_]\w*)\s+([A-Za-z_]\w*)\s*=\s*(.+);[ \t]*$/,i=[...l.entries()].sort((I,N)=>I[0]-N[0]),r=I=>I.includes("EvalProceduralDisplacementLocal(")?I:`${I}
vec3 EvalProceduralDisplacementLocal(int matId, vec2 uv, int texLayer) { return vec3(0.0); }
`,s=I=>`uniform bool u_refractionTwoSided;
uniform sampler2D envMapIrradianceTex;
uniform int u_envRadianceMips;
mat4 pt_MtlxEnvMatrix() {
    // Fold the app-side env rotation into u_envMatrix so reflections and
    // refractions track the rotating background: a = PI/2 - 2*PI*envMapRot.
    float a = 1.57079632679 - 6.28318530718 * envMapRot;
    float c = cos(a), s = sin(a);
    return mat4(c, 0.0, -s, 0.0,  0.0, 1.0, 0.0, 0.0,  s, 0.0, c, 0.0,  0.0, 0.0, 0.0, 1.0);
}
#define u_envMatrix pt_MtlxEnvMatrix()
#define u_envRadiance envMapTex
#define u_envIrradiance envMapIrradianceTex
#define u_envLightIntensity envMapIntensity
#define u_envRadianceSamples 16
`+I.replace(/^[ \t]*uniform[ \t]+\w+[ \t]+(?:u_env\w+|u_refractionTwoSided)[ \t]*;[ \t]*\r?\n/gm,"").replace(/^[ \t]*#define[ \t]+u_envMatrix[^\n]*\n/gm,"").replace(/^[ \t]*#version[^\n]*\n/gm,""),a=I=>({glsl:I,floatsPerMat:0,payloadByMatId:new Map,previewByMatId:new Map,paramDefs:[],modelType:"unknown"}),o=I=>{let N=new Set(I.map(G=>G.name.toLowerCase()));return N.has("base_weight")||N.has("specular_ior")||N.has("transmission_weight")?"open_pbr_surface":N.has("base")&&N.has("specular")&&(N.has("coat")||N.has("specular_roughness"))?"standard_surface":N.has("metallic")&&N.has("roughness")?"gltf_pbr":N.has("clearcoat")&&N.has("anisotropic")&&N.has("spectrans")?"disney":"unknown"},c=I=>{let G=I.indexOf("// __MTLX_STACK_END__");return G>=0?I.slice(0,G):I},u=I=>{let G=/\bvoid\s+(IMPL_\w*surfaceshader)\s*\(([^)]*)\)\s*\{/.exec(I);if(!G)return I;let Q=G.index+G[0].length,ee=I.indexOf("surfaceshader shader_constructor_out",Q);if(ee<0)return I;let he=I.slice(Q,ee),de=[],De=/^([ \t]*)(?:const\s+)?(vec2|vec3|vec4|float|int|bool|mat3|mat4)\s+(\w+)\s*=\s*([\s\S]*?);[ \t]*$/gm,ut=he.replace(De,(xi,_i,yi,In,bi)=>(de.push(`${yi} ${In};`),`${_i}${In} = ${bi};`));if(de.length===0)return I;let ye=`
    if (!g_ptHeaderReady)
    {
`+ut.trimEnd()+`
        g_ptHeaderReady = true;
    }
    `,fe=I.slice(0,G.index),Me=I.slice(G.index,Q),Qe=I.slice(ee);return(`bool g_ptHeaderReady = false;
`+(fe+`// hoisted header globals (computed once per shading point)
`+de.join(`
`)+`
void pt_MtlxPrepare() { g_ptHeaderReady = false; }
`+Me+ye+Qe)).replace(/(void\s+pt_LoadParams\s*\(int\s+matID\)\s*\{)/,`$1
    g_ptHeaderReady = false;`)},h=I=>{let N=`#define PT_EMIT_EMISSION 0
#ifdef OPT_MTLX_GATHER
#define PT_CLOSURE_CTX g_ptClosureType
#else
#define PT_CLOSURE_CTX CLOSURE_TYPE_REFLECTION
#endif
`,G=I.replace(/makeClosureData\(\s*g_ptClosureType\s*,/g,"makeClosureData(PT_CLOSURE_CTX,").replace(/g_ptEmitEmission\s*!=\s*0/g,"PT_EMIT_EMISSION != 0");return N+G},d=I=>I.replace(/vec3 tint = max\(pt_mTransColor, vec3\(0\.0\)\);/g,"vec3 tint = max(pt_mTransColor, vec3(0.0)); tint = pt_mThinWalled ? tint : (pt_mTransDepth > 0.0 ? vec3(1.0) : sqrt(tint));"),f=I=>I.replace(/vec3 pt_Hraw = Vl \+ Ll \* etaEff;/g,"vec3 pt_Hraw = Ll + Vl * etaEff;"),p=I=>I.replace(/(vec3\s+SampleMtlxClosure\s*\([^)]*\)\s*\{\s*\n\s*pt_InitMaterialSummary\(\);)/,`$1
    if (pt_mSpecTrans > 0.95 && pt_mMetal < 0.05 && !pt_mThinWalled)
    {
        vec3 pt_Tg, pt_Bg;
        Onb(N, pt_Tg, pt_Bg);
        vec3 pt_Vlg = vec3(dot(V, pt_Tg), dot(V, pt_Bg), dot(V, N));
        if (pt_Vlg.z < 0.0) pt_Vlg = -pt_Vlg;
        vec3 pt_Llg = refract(-pt_Vlg, vec3(0.0, 0.0, 1.0), state.eta);
        if (dot(pt_Llg, pt_Llg) < 1e-8) pt_Llg = vec3(0.0, 0.0, -1.0);
        if (pt_Llg.z >= 0.0) pt_Llg.z = -max(abs(pt_Llg.z), 1e-4);
        pt_Llg = normalize(pt_Llg);
        L = normalize(pt_Tg * pt_Llg.x + pt_Bg * pt_Llg.y + N * pt_Llg.z);
        pdf = 1.0;
        flags = CLOSURE_FLAG_TRANSMIT;
        return (pt_mTransDepth > 0.0) ? vec3(1.0) : clamp(pt_mBaseColor, vec3(0.0), vec3(1.0));
    }`),x=I=>{let N=new Set,G=/\b(?:int|float)\s+(\w+)\s*[=;,)]/g;for(let Q=G.exec(I);Q!==null;Q=G.exec(I))N.add(Q[1]);return I.replace(/\b(vec[234])(\s+\w+\s*=\s*)(\w+)(\s*;)/g,(Q,ee,he,de,De)=>N.has(de)?`${ee}${he}${ee}(${de})${De}`:Q)},m=I=>{let N=/^[ \t]*float[ \t]+transmission_depth[ \t]*(=[^;]*)?;[ \t]*$/m.test(I),G=I.replace(/(void\s+pt_InitMaterialSummary\s*\(\s*\)\s*)/,`float pt_mTransDepth = 0.0;
$1`);return N&&(G=G.replace(/(void\s+pt_InitMaterialSummary\s*\(\s*\)\s*\{)/,`$1
    pt_mTransDepth = transmission_depth;`)),G},g=I=>{let N=/^[ \t]*vec3[ \t]+transmission_scatter[ \t]*(=[^;]*)?;[ \t]*$/m.test(I),G=/^[ \t]*float[ \t]+transmission_scatter_anisotropy[ \t]*(=[^;]*)?;[ \t]*$/m.test(I),Q=I.replace(/(void\s+pt_InitMaterialSummary\s*\(\s*\)\s*)/,`vec3 pt_mTransScatter = vec3(0.0);
float pt_mTransScatterAniso = 0.0;
$1`);return N&&(Q=Q.replace(/(void\s+pt_InitMaterialSummary\s*\(\s*\)\s*\{)/,`$1
    pt_mTransScatter = max(transmission_scatter, vec3(0.0));`)),G&&(Q=Q.replace(/(void\s+pt_InitMaterialSummary\s*\(\s*\)\s*\{)/,`$1
    pt_mTransScatterAniso = clamp(transmission_scatter_anisotropy, -0.99, 0.99);`)),Q};if(i.length===0)return a("");let[,_]=i[0],y=_.indexOf(e),b=_.indexOf(t);if(y<0||b<0||b<y){console.warn("[MaterialX] parameter markers missing; falling back to single-material closure.");let I=c(_),N=p(d(g(m(f(x(I))))));return a(r(s(N)))}let v=[],M=0;for(let I of _.slice(y+e.length,b).split(`
`)){let N=I.match(n);if(N){let G=kp(N[1]);v.push({type:N[1],name:N[2],offset:M,comps:G}),M+=G}}let T=o(v),w=["base_color","basecolor","diffuse_color","color"],C=["metalness","base_metalness","metallic","metallic_factor"],A=["specular_roughness","roughness","roughness_factor"];if(new Set(i.map(([,I])=>I)).size===1){let I=new Map;for(let ye of _.slice(y+e.length,b).split(`
`)){let fe=ye.match(n);fe&&I.set(fe[2],fe[3])}let N=(ye,fe)=>{for(let Me of v)if(ye.includes(Me.name.toLowerCase()))return hl(I.get(Me.name)??"",fe);return null},G=N(w,3)??[.8,.8,.8],Q=(N(C,1)??[0])[0],ee=(N(A,1)??[.5])[0],he={baseColor:[G[0]??.8,G[1]??.8,G[2]??.8],metallic:Q,roughness:ee},de=new Map;for(let[ye]of i)de.set(ye,he);let De=_.slice(0,b+t.length)+`

void pt_LoadParams(int matID) {}
`+_.slice(b+t.length),ut=u(p(d(g(m(f(x(c(De))))))));return{glsl:r(s(ut)),floatsPerMat:0,payloadByMatId:new Map,previewByMatId:de,paramDefs:v.map(ye=>({name:ye.name,type:ye.type,offset:ye.offset,comps:ye.comps})),modelType:T}}let S=I=>{let N=Math.floor(I/4),G="xyzw"[I%4];return`texelFetch1D(materialsTex, matID * MATERIALS_TEX_STRIDE + MAT_COMMON_VEC4 + ${N}).${G}`},U=I=>{let N=G=>S(I.offset+G);switch(I.type){case"vec2":return`    ${I.name} = vec2(${N(0)}, ${N(1)});`;case"vec3":return`    ${I.name} = vec3(${N(0)}, ${N(1)}, ${N(2)});`;case"vec4":return`    ${I.name} = vec4(${N(0)}, ${N(1)}, ${N(2)}, ${N(3)});`;case"bool":return`    ${I.name} = ${N(0)} > 0.5;`;case"int":return`    ${I.name} = int(${N(0)} + 0.5);`;default:return`    ${I.name} = ${N(0)};`}},L=new Map,B=new Map;for(let[I,N]of i){let G=N.indexOf(e),Q=N.indexOf(t),ee=new Map;if(G>=0&&Q>=0)for(let fe of N.slice(G+e.length,Q).split(`
`)){let Me=fe.match(n);Me&&ee.set(Me[2],Me[3])}let he=new Float32Array(M);for(let fe of v){let Me=ee.get(fe.name),Qe=hl(Me??"",fe.comps);for(let ht=0;ht<fe.comps;ht++)he[fe.offset+ht]=Qe[ht]??0}L.set(I,he);let de=(fe,Me)=>{for(let Qe of v)if(fe.includes(Qe.name.toLowerCase()))return hl(ee.get(Qe.name)??"",Me);return null},De=de(w,3)??[.8,.8,.8],ut=(de(C,1)??[0])[0],ye=(de(A,1)??[.5])[0];B.set(I,{baseColor:[De[0]??.8,De[1]??.8,De[2]??.8],metallic:ut,roughness:ye})}let z=v.map(I=>`${I.type} ${I.name};`).join(`
`),O=["void pt_LoadParams(int matID)","{",...v.map(U),"}"].join(`
`),F=_.slice(0,y),X=_.slice(b+t.length),D=`${F}${z}

${O}
${X}`;D=D.replace(/([ \t]*)pt_InitMaterialSummary\(\);/g,`$1pt_LoadParams(matID);
$1pt_InitMaterialSummary();`);let H=u(p(d(g(m(f(x(c(D))))))));return{glsl:r(s(H)),floatsPerMat:M,payloadByMatId:L,previewByMatId:B,paramDefs:v.map(I=>({name:I.name,type:I.type,offset:I.offset,comps:I.comps})),modelType:T}}function Ts(l){let e=c=>c.match(/\bfileprefix="([^"]*)"/i)?.[1],t=e(l.match(/<materialx\b([^>]*)>/i)?.[1]??"")??"",n=[],i=/<nodegraph\b([^>]*)>([\s\S]*?)<\/nodegraph>/gi,r;for(;(r=i.exec(l))!==null;)n.push({start:r.index,end:r.index+r[0].length,prefix:e(r[1])});let s=[],a=/<(image|tiledimage|hextiledimage|gltf_image|gltf_normalmap|gltf_colorimage)\b([^>]*)>([\s\S]*?)<\/\1>/gi,o;for(;(o=a.exec(l))!==null;){let c=o[2],u=c.match(/\bname="([^"]*)"/i)?.[1];if(!u)continue;let d=o[3].match(/<input\b[^>]*\bname="file"[^>]*>/i);if(!d)continue;let f=d[0].match(/\bvalue="([^"]*)"/i)?.[1];if(!f)continue;let p=n.find(m=>o.index>=m.start&&o.index<m.end),x=e(d[0])??e(c)??p?.prefix??t;s.push({samplerVar:`${u}_file`,file:f,filePrefix:x})}return s}function gi(l,e){if(!/^[ \t]*sampler2D \w+;[ \t]*$/m.test(l))return l;let t=l;return t=t.replace(/^([ \t]*)sampler2D (\w+);[ \t]*$/gm,(n,i,r)=>{let s=e.get(r);return`${i}int ${r} = ${s??-1};`}),t=t.replace(/(void\s+mx_(?:image|tiledimage|hextiledimage)_\w+\s*\(\s*)sampler2D(\s+tex_sampler\b)/g,"$1int$2"),t=t.replace(/\bsampler2D(\s+file\b)/g,"int$1"),t=t.replace(/\btexture\(tex_sampler,\s*([^,)]+)\)/g,"texture(textureMapsArrayTex, vec3($1, float(tex_sampler)))"),t=t.replace(/\btextureGrad\(tex_sampler,\s*([^,]+),\s*[^,]+,\s*[^)]+\)/g,"texture(textureMapsArrayTex, vec3($1, float(tex_sampler)))"),/vec2 uv = mx_transform_uv\(texcoord, uv_scale, uv_offset\);/.test(t)&&(t=t.replace(/(void\s+mx_image_)/,`float mtlxAddr1(float t, int mode) {
    if (mode == 2) return t;
    if (mode == 3) { float f = fract(t * 0.5) * 2.0; return f > 1.0 ? 2.0 - f : f; }
    return clamp(t, 0.0, 1.0);
}
$1`),t=t.replace(/(vec2 uv = mx_transform_uv\(texcoord, uv_scale, uv_offset\);)/g,`$1
    uv = vec2(mtlxAddr1(uv.x, uaddressmode), mtlxAddr1(uv.y, vaddressmode));`)),t}var jc=2048;function V(l){return l.substring(l.indexOf(" ")+1).trim()}async function Ms(l,e,t){let n=await oe(l);if(!n.ok)return console.error(`Couldn't open ${l} for reading`),!1;let i=await n.text(),r=l.substring(0,l.lastIndexOf("/")+1),s=i.split(`
`);console.log("Loading Scene..");let a=new Map,o=new Map,c="",u=new Map,h=null,d=Xt,f=new je;e.addMaterial(f);let p=0;for(;p<s.length;){let g=s[p].trim().replace(/^\uFEFF/,"");if(g.split(" ")[0]=="#"||g===""){p++;continue}if(g.split(" ")[0]=="materialx_pure_module_url"){t.materialxModuleUrl=V(g),p++;continue}if(g.split(" ")[0]=="materialx_generator"){let _=V(g);t.forcedMaterialxGeneratorType==null&&(_==="essl"||_==="pathtracer"||_==="auto")&&(t.materialxGeneratorType=_),p++;continue}if(g.split(" ")[0]=="materialx_essl_template"){t.materialxEsslTemplateUrl=V(g),p++;continue}if(g.split(" ")[0]=="material"){let _=new je,y=V(g);_.name=y;let b="none",v="none",M="none",T="none",w="none",C="none",A="none",S=!1,U="",L="",B="",z="";for(p++;p<s.length;){let D=s[p].trim().replace(/^\uFEFF/,"");if(D.includes("}"))break;if(D.split(" ")[0]=="color"){let[,H,I,N]=D.split(/\s+/);_.baseColor=new E(parseFloat(H),parseFloat(I),parseFloat(N))}if(D.split(" ")[0]=="opacity"&&(_.opacity=parseFloat(V(D))),D.split(" ")[0]=="alphamode"&&(C=V(D)),D.split(" ")[0]=="alphacutoff"&&(_.alphaCutoff=parseFloat(V(D))),D.split(" ")[0]=="emission"){let[,H,I,N]=D.split(/\s+/);_.emission=new E(parseFloat(H),parseFloat(I),parseFloat(N))}if(D.split(" ")[0]=="metallic"&&(_.metallic=parseFloat(V(D))),D.split(" ")[0]=="roughness"&&(_.roughness=parseFloat(V(D))),D.split(" ")[0]=="subsurface"&&(_.subsurface=parseFloat(V(D))),D.split(" ")[0]=="speculartint"&&(_.specularTint=parseFloat(V(D))),D.split(" ")[0]=="anisotropic"&&(_.anisotropic=parseFloat(V(D))),D.split(" ")[0]=="sheen"&&(_.sheen=parseFloat(V(D))),D.split(" ")[0]=="sheentint"&&(_.sheenTint=parseFloat(V(D))),D.split(" ")[0]=="clearcoat"&&(_.clearcoat=parseFloat(V(D))),D.split(" ")[0]=="clearcoatgloss"&&(_.clearcoatGloss=parseFloat(V(D))),D.split(" ")[0]=="spectrans"&&(_.specTrans=parseFloat(V(D))),D.split(" ")[0]=="ior"&&(_.ior=parseFloat(V(D))),D.split(" ")[0]=="albedotexture"&&(b=V(D)),D.split(" ")[0]=="metallicroughnesstexture"&&(v=V(D)),D.split(" ")[0]=="normaltexture"&&(M=V(D)),D.split(" ")[0]=="emissiontexture"&&(T=V(D)),D.split(" ")[0]=="mediumtype"&&(A=V(D)),D.split(" ")[0]=="mediumdensity"&&(_.mediumDensity=parseFloat(V(D))),D.split(" ")[0]=="mediumcolor"){let[,H,I,N]=D.split(/\s+/);_.mediumColor=new E(parseFloat(H),parseFloat(I),parseFloat(N))}if(D.split(" ")[0]=="mediumanisotropy"&&(_.mediumAnisotropy=parseFloat(V(D))),D.split(" ")[0]=="materialx_document"&&(U=V(D)),D.split(" ")[0]=="materialx_surface"&&(L=V(D)),D.split(" ")[0]=="materialx_inline_begin"){let H=[];for(p++;p<s.length;){let I=s[p];if(I.trim()==="materialx_inline_end")break;if(I.length>jc)throw new Error(`[Scene] material '${y}': inline MaterialX line exceeds ${jc} characters.`);H.push(I),p++}if(p>=s.length||s[p].trim()!=="materialx_inline_end")throw new Error(`[Scene] material '${y}': missing materialx_inline_end terminator.`);if(B=H.join(`
`).trim(),!B)throw new Error(`[Scene] material '${y}': empty inline MaterialX block.`);p++;continue}D.split(" ")[0]=="material_type"&&(z=V(D).toLowerCase()),p++}b&&b!=="none"&&(_.baseColorTexID=await e.addTextureAsync(b)),v&&v!=="none"&&(_.metallicRoughnessTexID=await e.addTextureAsync(v)),M&&M!=="none"&&(_.normalmapTexID=await e.addTextureAsync(M)),T&&T!=="none"&&(_.emissionmapTexID=await e.addTextureAsync(T)),C==="opaque"?_.alphaMode=0:C==="blend"?_.alphaMode=1:C==="mask"&&(_.alphaMode=2),A==="absorb"?_.mediumType=1:A==="scatter"?_.mediumType=2:A==="emissive"&&(_.mediumType=3);let O=!!U,F=!!B;if(O&&F)throw new Error(`[Scene] material '${y}': both materialx_document and inline MaterialX are provided; use exactly one source.`);if(O||F)z==="disney"&&console.warn(`[Scene] material '${y}': declared type 'disney' but a MaterialX source is present; treating as MaterialX (MaterialX wins).`),_.materialType=1;else{if(z==="materialx")throw new Error(`[Scene] material '${y}': declared type 'materialx' but no MaterialX source was provided.`);_.materialType=0}if(!a.has(y)){let X=e.addMaterial(_);if(a.set(y,X),O||F){t.useMaterialxMode=!0;try{let D="",H=r;if(O){let ee=d.normalizePath(r+U),he=await oe(ee);if(!he.ok)throw new Error(`document not found or unreadable at ${ee}`);D=await he.text(),H=ee.slice(0,ee.lastIndexOf("/")+1)}else D=B;if(_.materialxModelType=or(D),_.materialxModelType){if(h===null)h=_.materialxModelType;else if(_.materialxModelType!==h)throw new Error(`mixed MaterialX shading models are not supported (found '${_.materialxModelType}' alongside '${h}'); all materials must share one model`)}let I=globalThis.location?.href,N=H;if(I)try{N=new URL(H,I).href}catch{}let G=Ts(D),Q=new Map;if(G.length>0)for(let ee of G){let he=d.normalizePath(H+ee.filePrefix+ee.file),de=await e.addTextureByUrlAsync(he);de<0&&console.warn(`[MaterialX] texture not found for '${y}': ${he}`),Q.set(ee.samplerVar,de)}if(t.materialxGeneratorType!=="essl"){let ee=await mi({moduleUrl:t.materialxModuleUrl,documentText:D,searchPath:N,generatorType:t.materialxGeneratorType,esslTemplateUrl:t.materialxEsslTemplateUrl,skipEnvMapping:!0});{let he=globalThis;he.__ptDumpMtlx&&(he.__mtlxGeneratedRaw||=[]).push({name:y,glsl:ee})}o.set(X,gi(ee,Q))}if(t.materialxGeneratorType==="essl"){let ee=gi(await mi({moduleUrl:t.materialxModuleUrl,documentText:D,searchPath:N,generatorType:"essl",esslTemplateUrl:t.materialxEsslTemplateUrl,envMapConfig:{uEnvRadiance:"u_envRadiance",uEnvIrradiance:"u_envIrradiance",uEnvLightIntensity:"u_envLightIntensity",uEnvMatrix:"u_envMatrix",envMapRotSymbol:"envMapRot"}}),Q);u.set(X,ys(ee)),c||(c=ee)}}catch(D){let H=D instanceof Error?D.message:String(D);throw new Error(`[MaterialX] material '${y}' (matID ${X}) failed: ${H}`)}}}p++;continue}if(g.split(" ")[0]=="light"){let _=new pi,y=new E,b=new E,v="none";for(p++;p<s.length&&!s[p].includes("}");){let M=s[p].trim().replace(/^\uFEFF/,"");if(M.split(" ")[0]=="position"){let[,T,w,C]=M.split(/\s+/);_.position=new E(parseFloat(T),parseFloat(w),parseFloat(C))}if(M.split(" ")[0]=="emission"){let[,T,w,C]=M.split(/\s+/);_.emission=new E(parseFloat(T),parseFloat(w),parseFloat(C))}if(M.split(" ")[0]=="radius"&&(_.radius=parseFloat(V(M))),M.split(" ")[0]=="v1"){let[,T,w,C]=M.split(/\s+/);y=new E(parseFloat(T),parseFloat(w),parseFloat(C))}if(M.split(" ")[0]=="v2"){let[,T,w,C]=M.split(/\s+/);b=new E(parseFloat(T),parseFloat(w),parseFloat(C))}M.split(" ")[0]=="type"&&(v=V(M)),p++}v==="quad"?(_.type=0,_.u=y.subtract(_.position),_.v=b.subtract(_.position),_.area=E.Length(E.cross(_.u,_.v))):v==="sphere"?(_.type=1,_.area=4*Math.PI*_.radius*_.radius):v==="distant"&&(_.type=2,_.area=0),e.addLight(_),p++;continue}if(g.split(" ")[0]=="camera"){let _=new ne,y=new E,b=new E,v=45,M=0,T=1,w=!1;for(p++;p<s.length&&!s[p].includes("}");){let C=s[p].trim().replace(/^\uFEFF/,"");if(C.split(" ")[0]=="position"){let[,A,S,U]=C.split(/\s+/);y=new E(parseFloat(A),parseFloat(S),parseFloat(U))}if(C.split(" ")[0]=="lookat"){let[,A,S,U]=C.split(/\s+/);b=new E(parseFloat(A),parseFloat(S),parseFloat(U))}if(C.split(" ")[0]=="aperture"&&(M=parseFloat(V(C))),C.split(" ")[0]=="focaldist"&&(T=parseFloat(V(C))),C.split(" ")[0]=="fov"&&(v=parseFloat(V(C))),C.split(" ")[0]=="matrix"){let A=C.split(/\s+/).slice(1).map(Number);A.length===16&&A.every(S=>!isNaN(S))&&(_=new ne(A[0],A[4],A[8],A[12],A[1],A[5],A[9],A[13],A[2],A[6],A[10],A[14],A[3],A[7],A[11],A[15]),w=!0)}p++}if(w){let C=new E(_.data[2][0],_.data[2][1],_.data[2][2]);y=new E(_.data[3][0],_.data[3][1],_.data[3][2]),b=y.add(C)}e.addCamera(y,b,v),e.camera.aperture=M,e.camera.focalDist=T,p++;continue}if(g.split(" ")[0]=="renderer"){let O=function(F){if(F==="true")return!0;if(F==="false")return!1};var m=O;let _="none",y="",b="none",v="none",M="none",T="none",w="none",C="none",A="none",S="none",U="none",L="none",B="none",z="none";for(p++;p<s.length&&!s[p].includes("}");){let F=s[p].trim().replace(/^\uFEFF/,"");if(F.split(" ")[0]=="envmapfile"&&(_=V(F)),F.split(" ")[0]=="envmapirradiancefile"&&(y=V(F)),F.split(" ")[0]=="resolution"){let[,X,D]=F.split(/\s+/);t.renderResolution=new re(parseInt(X),parseInt(D)),t.originalRenderResolution=t.renderResolution.clone()}if(F.split(" ")[0]=="envmapintensity"&&(t.envMapIntensity=parseFloat(V(F))),F.split(" ")[0]=="maxdepth"&&(t.maxDepth=parseFloat(V(F))),F.split(" ")[0]=="maxspp"&&(t.maxSpp=parseFloat(V(F))),F.split(" ")[0]=="tilewidth"&&(t.tileWidth=parseFloat(V(F))),F.split(" ")[0]=="tileheight"&&(t.tileHeight=parseFloat(V(F))),F.split(" ")[0]=="enablerr"&&(b=V(F)),F.split(" ")[0]=="rrdepth"&&(t.RRDepth=parseFloat(V(F))),F.split(" ")[0]=="enabletonemap"&&(S=V(F)),F.split(" ")[0]=="enableaces"&&(v=V(F)),F.split(" ")[0]=="texarraywidth"&&(t.texArrayWidth=parseFloat(V(F))),F.split(" ")[0]=="texarrayheight"&&(t.texArrayHeight=parseFloat(V(F))),F.split(" ")[0]=="openglnormalmap"&&(M=V(F)),F.split(" ")[0]=="hideemitters"&&(T=V(F)),F.split(" ")[0]=="enablebackground"&&(C=V(F)),F.split(" ")[0]=="transparentbackground"&&(w=V(F)),F.split(" ")[0]=="backgroundcolor"){let[,X,D,H]=F.split(/\s+/);t.backgroundCol=new E(parseFloat(X),parseFloat(D),parseFloat(H))}if(F.split(" ")[0]=="independentrendersize"&&(A=V(F)),F.split(" ")[0]=="envmaprotation"&&(t.envMapRot=parseFloat(V(F))),F.split(" ")[0]=="enableroughnessmollification"&&(U=V(F)),F.split(" ")[0]=="roughnessmollificationamt"&&(t.roughnessMollificationAmt=parseFloat(V(F))),F.split(" ")[0]=="enablevolumemis"&&(L=V(F)),F.split(" ")[0]=="enableuniformlight"&&(B=V(F)),F.split(" ")[0]=="sssmode"&&(z=V(F)),F.split(" ")[0]=="uniformlightcolor"){let[,X,D,H]=F.split(/\s+/);t.uniformLightCol=new E(parseFloat(X),parseFloat(D),parseFloat(H))}p++}_!=="none"?(ke.instance.envMapIdx=ke.instance.envMaps.findIndex(F=>_.endsWith(F)),await e.addEnvMapAsync(_),t.enableEnvMap=!0):t.enableEnvMap=!1;{let F=y;if(!F&&_&&_!=="none"){let X=_.lastIndexOf("/");F=X>=0?`${_.slice(0,X+1)}irradiance/${_.slice(X+1)}`:`irradiance/${_}`}if(t.envMapIrradianceFile=y,F){let X=new An;await X.loadMapAsync(`/scenes/pathtracer/${F}`)?e.envMapIrradiance=X:(console.warn(`[EnvIrradiance] Could not load ${F}, falling back to main env map.`),e.envMapIrradiance=null)}else e.envMapIrradiance=null}O(v)!==void 0&&(t.enableAces=O(v)),O(b)!==void 0&&(t.enableRR=O(b)),O(M)!==void 0&&(t.openglNormalMap=O(M)),O(T)!==void 0&&(t.hideEmitters=O(T)),O(C)!==void 0&&(t.enableBackground=O(C)),O(w)!==void 0&&(t.transparentBackground=O(w)),O(A)!==void 0&&(t.independentRenderSize=O(A)),O(S)!==void 0&&(t.enableTonemap=O(S)),O(U)!==void 0&&(t.enableRoughnessMollification=O(U)),O(L)!==void 0&&(t.enableVolumeMIS=O(L)),O(B)!==void 0&&(t.enableUniformLight=O(B)),p++;continue}if(g.split(" ")[0]=="mesh"){let _=null,y=new q,b=new ne,v=new ne,M=new ne,T=new ne,w=0,C="none",A=!1;for(p++;p<s.length&&!s[p].includes("}");){let S=s[p].trim().replace(/^\uFEFF/,""),U=null;if(S.split(" ")[0]=="name"&&(C=S.substring(5).trim()),S.split(" ")[0]=="file"&&(_=V(S)),S.split(" ")[0]=="material"&&(U=V(S),a.has(U)?w=a.get(U):console.error(`Could not find material ${U}`)),S.split(" ")[0]=="matrix"){let L=S.split(/\s+/).slice(1).map(Number);L.length===16&&L.every(B=>!isNaN(B))&&(b=new ne(L[0],L[4],L[8],L[12],L[1],L[5],L[9],L[13],L[2],L[6],L[10],L[14],L[3],L[7],L[11],L[15]),A=!0)}if(S.split(" ")[0]=="position"){let[,L,B,z]=S.split(/\s+/);v=ne.Translate(new E(parseFloat(L),parseFloat(B),parseFloat(z)))}if(S.split(" ")[0]=="scale"){let[,L,B,z]=S.split(/\s+/);T=ne.Scale(new E(parseFloat(L),parseFloat(B),parseFloat(z)))}if(S.split(" ")[0]=="rotation"){let[,L,B,z,O]=S.split(/\s+/);y=new q(parseFloat(L),parseFloat(B),parseFloat(z),parseFloat(O)),M=ne.QuatToMatrix(y.x,y.y,y.z,y.w)}p++}if(_){let S=await e.addMeshAsync(_);if(S!==-1){let U;if(C&&C!=="none")U=C;else{let z=Math.max(_.lastIndexOf("/"),_.lastIndexOf("\\"));U=_.substring(z+1)}let L;A?L=b:L=T.multiply(M).multiply(v);let B=new cn(U,S,L,w);e.addMeshInstance(B)}}p++;continue}if(g.split(" ")[0]=="gltf"){let _=null,y=new q,b=new ne,v=new E,M=new ne,T=new E(1,1,1),w=!1;for(p++;p<s.length&&!s[p].includes("}");){let C=s[p].trim();if(C.split(" ")[0]=="file"&&(_=V(C)),C.split(" ")[0]=="matrix"){let A=C.split(/\s+/).slice(1).map(Number);A.length===16&&A.every(S=>!isNaN(S))&&(b=new ne(A[0],A[4],A[8],A[12],A[1],A[5],A[9],A[13],A[2],A[6],A[10],A[14],A[3],A[7],A[11],A[15]),w=!0)}if(C.split(" ")[0]=="position"){let[,A,S,U]=C.split(/\s+/);v=new E(parseFloat(A),parseFloat(S),parseFloat(U))}if(C.split(" ")[0]=="scale"){let[,A,S,U]=C.split(/\s+/);T=new E(parseFloat(A),parseFloat(S),parseFloat(U))}if(C.split(" ")[0]=="rotation"){let[,A,S,U,L]=C.split(/\s+/);y=new q(parseFloat(A),parseFloat(S),parseFloat(U),parseFloat(L)),M=ne.QuatToMatrix(y.x,y.y,y.z,y.w)}p++}if(_){let C=_.substring(_.lastIndexOf(".")+1).toLowerCase(),A;w?A=b:A=ne.Scale(T).multiply(M).multiply(ne.Translate(v));let S=!1;if(C==="gltf"?S=await Gt(r+_,e,t,A,!1):C==="glb"&&(S=await Gt(r+_,e,t,A,!0)),!S)throw console.error(`Unable to load gltf ${_}`),new Error(`Unable to load gltf ${_}`)}}p++}let x=g=>{g.includes("transmission_depth")&&(t.maxDepth=Math.max(t.maxDepth,16),t.RRDepth=Math.max(t.RRDepth,6))};if(c)if(e.proceduralMaterialGlsl="",u.size>1){let g=bs(c,u);e.materialxEsslShaderGlsl=g.glsl,x(e.materialxEsslShaderGlsl),e.materialTexStride=Wt+Math.ceil(g.floatsPerMat/4);for(let[_,y]of g.payloadByMatId){let b=e.materials[_];b&&(b.materialType=1,b.materialxPayload=y)}}else{e.materialxEsslShaderGlsl=c,x(e.materialxEsslShaderGlsl),e.materialTexStride=e.materials.reduce((g,_)=>Math.max(g,_.toVec4Array().length),Wt);for(let g of e.materials)g.materialxPayload=null,g.materialxParamDefs=[],g.materialxModelType=""}if(o.size>0){let g=vs(o);e.proceduralMaterialGlsl=g.glsl,x(e.proceduralMaterialGlsl),e.materialTexStride=Wt+Math.ceil(g.floatsPerMat/4);for(let[_,y]of g.payloadByMatId){let b=e.materials[_];b&&(b.materialxPayload=y,b.materialxParamDefs=g.paramDefs.map(v=>({...v})),b.materialxModelType=g.modelType)}for(let[_,y]of g.previewByMatId){let b=e.materials[_];b&&(b.baseColor=new E(y.baseColor[0],y.baseColor[1],y.baseColor[2]),b.metallic=y.metallic,b.roughness=Math.max(.001,y.roughness))}}else if(t.materialxGeneratorType==="essl"&&!c){e.proceduralMaterialGlsl="",e.materialTexStride=e.materials.reduce((g,_)=>Math.max(g,_.toVec4Array().length),Wt);for(let g of e.materials)g.materialxPayload=null,g.materialxParamDefs=[],g.materialxModelType=""}return!0}function Ss(l,e,t,n){let i=l.indexOf(e),r=l.indexOf(t);if(i!==-1&&r!==-1&&r>i){let s=l.substring(0,i+e.length),a=l.substring(r);return s+`
`+n+`
`+a}return l}async function Zc(l,e,t,n=null){let i="",r=await oe(l);r.ok&&(i=await r.text());let s=l.split("/").reverse()[0].split(".")[0],a=".scene";if(!await lr(`scenes/pathtracer/${s}${a}`)&&(a=".gltf",!await lr(`scenes/pathtracer/${s}${a}`)&&(a=".glb",!await lr(`scenes/pathtracer/${s}${a}`))))return console.error(`Failed to load scene ${s} from Shadertoy shader`),!1;let o=new Le(s);o.renderOptions=t;let c=!1;if(a===".scene"?c=await Ms(`/scenes/pathtracer/${s}${a}`,o,t):a===".gltf"?c=await Gt(`/scenes/pathtracer/${s}${a}`,o,t,new ne,!1):a===".glb"&&(c=await Gt(`/scenes/pathtracer/${s}${a}`,o,t,new ne,!0)),!c)return console.error("Failed to load scene from Shadertoy shader"),!1;t=o.renderOptions,o.lights.length===0&&(t.enableEnvMap=!0),o.renderOptions=t,await o.processSceneAsync();let u=o.computeSceneData(t.useRayMarching),h=u.data.length>1e3;return await _s(t.useRayMarching?"/shaders/shadertoy/pathtracing-fast/shader.json":"/shaders/shadertoy/pathtracing/shader.json",e,t,async(d,f)=>{if(d.indexOf("common.glsl")!==-1){let p=f,x=u.commonCode;t.useRayMarching&&(x=`
#define OPT_RAYMARCHING
${x}
`),x=x.trim(),f=Ss(p,"// START_COMMON_CODE","// END_COMMON_CODE",x)}if(d.indexOf("bufferA.glsl")!==-1){let p=f;u.bufferACode=`
${u.bufferACode}

${h?"":o.generateMeshCode(u,t.useRayMarching)}
`,u.bufferACode=u.bufferACode.trim(),f=Ss(p,"// START_BUFFERA_CODE","// END_BUFFERA_CODE",u.bufferACode)}if(d.indexOf("bufferB.glsl")!==-1){let p=f;t.useRayMarching&&(u.bufferBCode=`
${i}

${u.bufferBCode}
`),u.bufferBCode=u.bufferBCode.trim(),f=Ss(p,"// START_BUFFERB_CODE","// END_BUFFERB_CODE",u.bufferBCode)}return d.indexOf("bufferD.glsl")!==-1&&(f=Ss(f,"// START_BUFFERD_CODE","// END_BUFFERD_CODE",u.bufferDCode)),n&&!await n(d,f,null,void 0,void 0)?(console.error(`Callback failed for ${d}`),null):f})?(e.renderOptions=t,await e.processSceneAsync(),await n("commonCode.glsl",u.commonCode,null,void 0,void 0),await n("bufferACode.glsl",u.bufferACode,null,void 0,void 0),await n("bufferBCode.glsl",u.bufferBCode,null,void 0,void 0),await n("bufferDCode.glsl",u.bufferDCode,null,void 0,void 0),t.useRayMarching||(await n("meshData.bin",null,u.buffer,void 0,void 0),u.textureBuffer&&await n("textures.bin",null,u.textureBuffer,u.textureWidth,u.textureHeight)),!0):(console.error("Failed to load Shadertoy shader"),!1)}var Es=class l extends Le{static MATERIAL_STRIDES=[88,72,60,32];sceneConfig=null;bvhDataArray=null;vertIndicesDataArray=null;verticesDataArray=null;normalsDataArray=null;_topLevelIndex=0;constructor(e){super(e)}dispose(){super.dispose(),this.bvhDataArray=null,this.vertIndicesDataArray=null,this.verticesDataArray=null,this.normalsDataArray=null,this.lightsDataArray=null}createTLAS(){}createBLAS(){}rebuildInstances(){this.instancesModified=!0,this.dirty=!0}async processSceneAsync(){}get topLevelIndex(){return this._topLevelIndex}set topLevelIndex(e){this._topLevelIndex=e}bvhData(e=null){return this.bvhDataArray}vertIndicesData(){return this.vertIndicesDataArray}verticesData(){return this.verticesDataArray}normalsData(){return this.normalsDataArray}set transformsDataArray(e){if(e){this.transforms=[];for(let t=0;t<e.length;t+=16){let n=new ne;n.data[0][0]=e[t],n.data[0][1]=e[t+1],n.data[0][2]=e[t+2],n.data[0][3]=e[t+3],n.data[1][0]=e[t+4],n.data[1][1]=e[t+5],n.data[1][2]=e[t+6],n.data[1][3]=e[t+7],n.data[2][0]=e[t+8],n.data[2][1]=e[t+9],n.data[2][2]=e[t+10],n.data[2][3]=e[t+11],n.data[3][0]=e[t+12],n.data[3][1]=e[t+13],n.data[3][2]=e[t+14],n.data[3][3]=e[t+15],this.transforms.push(n)}}}set materialsDataArray(e){if(e){this.materials=[];let t=32,n=!1,i=this.sceneConfig?this.sceneConfig.materials.length+1:0;if(i>0){let r=e.length/i;Number.isInteger(r)&&l.MATERIAL_STRIDES.includes(r)?(t=r,n=!0):Number.isInteger(r)&&console.warn(`PathtracerSceneWithData: inferred material stride ${r} is not supported. Supported strides: ${l.MATERIAL_STRIDES.join(", ")}. Trying fallback detection.`)}if(!n){let r=l.MATERIAL_STRIDES.filter(s=>e.length%s===0);r.length>0&&(t=r[0],n=!0)}if(n||console.warn(`PathtracerSceneWithData: unable to detect a supported material stride from buffer length ${e.length}. Supported strides: ${l.MATERIAL_STRIDES.join(", ")}. Falling back to stride 32.`),e.length%t!==0){console.warn(`PathtracerSceneWithData: material buffer length ${e.length} is not divisible by stride ${t}. Aborting material unpack to avoid desynchronization.`);return}for(let r=0;r<e.length;r+=t){let s=new je;s.baseColor=new E(e[r],e[r+1],e[r+2]),s.anisotropic=e[r+3],s.emission=new E(e[r+4],e[r+5],e[r+6]),s.metallic=e[r+8],s.roughness=e[r+9],s.subsurface=e[r+10],s.specularTint=e[r+11],s.sheen=e[r+12],s.sheenTint=e[r+13],s.clearcoat=e[r+14],s.clearcoatGloss=e[r+15],s.specTrans=e[r+16],s.ior=e[r+17],s.mediumType=e[r+18],s.mediumDensity=e[r+19],s.mediumColor=new E(e[r+20],e[r+21],e[r+22]),s.mediumAnisotropy=e[r+23],s.baseColorTexID=e[r+24],s.metallicRoughnessTexID=e[r+25],s.normalmapTexID=e[r+26],s.emissionmapTexID=e[r+27],s.opacity=e[r+28],s.alphaMode=e[r+29],s.alphaCutoff=e[r+30],this.materials.push(s)}}}set lightsDataArray(e){if(e){this.lights=[];for(let t=0;t<e.length;t+=15){let n=new pi;n.position=new E(e[t],e[t+1],e[t+2]),n.emission=new E(e[t+3],e[t+4],e[t+5]),n.u=new E(e[t+6],e[t+7],e[t+8]),n.v=new E(e[t+9],e[t+10],e[t+11]),n.radius=e[t+12],n.area=e[t+13],n.type=e[t+14],this.lights.push(n)}}}computeSceneData(e){return null}generateMeshCode(e,t){return null}};function ws(l,e,t){return t===void 0?l.subarray(e*4):l.subarray(e*4,t*4)}function Jc(l,e,t){let n=l.subarray(e*4,t*4),i=[];for(let r=0;r<n.length;r+=4)i.push(new E(n[r],n[r+1],n[r+2]));return new Float32Array(i.flatMap(r=>[r.x,r.y,r.z]))}function zp(l,e,t){let n=l.subarray(e*4,t*4),i=[];for(let r=0;r<n.length;r+=4)i.push(new E(n[r],n[r+1],n[r+2]));return new Int32Array(i.flatMap(r=>[r.x,r.y,r.z]))}function Vp(l,e,t,n=!1){let i=P.document.createElement("canvas");i.width=e,i.height=t;let r=i.getContext("2d");return r?(n?(r.scale(1,-1),r.drawImage(l,0,-t,e,t)):r.drawImage(l,0,0,e,t),r.getImageData(0,0,e,t)):null}function Gp(l,e,t,n=!1){let i=Vp(l,e,t,n);return i?new Uint8Array(i.data.buffer):null}async function Qc(l,e,t){console.info(`Loading scene ${l}...`);let r=await(await oe(l)).json();e.sceneConfig=r;let s=new E(...r.camera.eye),a=new E(...r.camera.lookat),o=r.camera.fov;e.camera=new Nn(s,a,o),t.enableTonemap=r.display.enableTonemap,t.enableAces=r.display.enableAces,t.simpleAcesFit=r.display.simpleAcesFit,t.backgroundCol=new E(...r.display.backgroundCol),t.uniformLightCol=new E(...r.uniforms.uniformLightCol),t.maxDepth=r.uniforms.maxDepth,t.roughnessMollificationAmt=r.uniforms.roughnessMollificationAmt,t.envMapIntensity=r.uniforms.envMapIntensity,t.enableEnvMap=r.defines.includes("OPT_ENVMAP"),t.enableRoughnessMollification=r.defines.includes("OPT_ROUGHNESS_MOLLIFICATION"),t.enableRR=r.defines.includes("OPT_RR");let c=r.defines.find(d=>d.startsWith("OPT_RR_DEPTH "));if(c){let d=parseInt(c.split(" ")[1]);isNaN(d)||(t.RRDepth=d)}t.enableUniformLight=r.defines.includes("OPT_UNIFORM_LIGHT"),t.openglNormalMap=r.defines.includes("OPT_OPENGL_NORMALMAP"),t.hideEmitters=r.defines.includes("OPT_HIDE_EMITTERS"),t.enableBackground=r.defines.includes("OPT_BACKGROUND"),t.openglNormalMap=r.defines.includes("OPT_OPENGL_NORMALMAP"),t.enableBackground=r.defines.includes("OPT_BACKGROUND"),t.transparentBackground=r.defines.includes("OPT_TRANSPARENT_BACKGROUND"),t.enableVolumeMIS=r.defines.includes("OPT_VOL_MIS"),r.resolution&&(t.renderResolution=new re(...r.resolution),t.originalRenderResolution=t.renderResolution.clone(),t.tileWidth=r.tileWidth,t.tileHeight=r.tileHeight);let u=await dn.readBlob(`shadertoy/examples/glsl-pathtracer/${r.scene}/meshData.bin`),h=new Float32Array(await u?.arrayBuffer(),20);if(e.materialsDataArray=ws(h,r.indices.materialsTex,r.indices.transformsTex),e.transformsDataArray=ws(h,r.indices.transformsTex,r.indices.lightsTex),e.lightsDataArray=Jc(h,r.indices.lightsTex,r.indices.BVH),e.bvhDataArray=Jc(h,r.indices.BVH,r.indices.vertexIndicesTex),e.vertIndicesDataArray=zp(h,r.indices.vertexIndicesTex,r.indices.verticesTex),e.verticesDataArray=ws(h,r.indices.verticesTex,r.indices.normalsTex),e.normalsDataArray=ws(h,r.indices.normalsTex,2*r.indices.normalsTex-r.indices.verticesTex),r.meshes.forEach(d=>{let f=new ln;f.name=d.name,e.meshes.push(f)}),r.meshes.forEach((d,f)=>{let p=r.materials.findIndex(m=>m===d.material)+1,x=new cn(d.name,f,new ne,p);e.meshInstances.push(x)}),e.topLevelIndex=r.uniforms.topBVHIndex,r.materials.forEach((d,f,p)=>{e.materials[f+1].name=d}),r.withTexture){let d=await new Promise((f,p)=>{let x=new Image;x.crossOrigin="anonymous",x.onload=()=>{f(x)},x.onerror=()=>f(!1),x.src=dn.buildUrl(`shadertoy/examples/glsl-pathtracer/${r.scene}/textures.png`)});d&&(e.textureMapsArray=Gp(d,d.width,d.height))}return e.renderOptions=t,!0}function Hp(l){let e=/<input\b[^>]*\bname="(?:transmission|transmission_weight|specular_transmission|specTrans)"[^>]*>/gi;for(let t=e.exec(l);t!==null;t=e.exec(l)){let n=t[0];if(/\bnode(?:name|graph)="|\boutput="/i.test(n))return!0;let i=n.match(/\bvalue="([^"]*)"/i)?.[1];if(i!==void 0&&parseFloat(i)>0)return!0}return!1}var ke=class l{static _instance=null;stopped;working;static INTERACTIVE_MTLX_SCENE="MaterialX Viewer (ShaderBall)";static INTERACTIVE_MTLX_SCENE_ESSL="MaterialX Viewer ESSL (ShaderBall)";static INTERACTIVE_MTLX_SCENE_FILE="materialx_tests_absval.scene";static MATERIALX_PATHTRACER_PREVIEW_PIXEL_RATIO=.25;static DEFAULT_INTERACTIVE_MTLX=`<?xml version="1.0"?>
<materialx version="1.38">
  <standard_surface name="SR_default" type="surfaceshader">
    <input name="base" type="float" value="1" />
    <input name="base_color" type="color3" value="0.8, 0.8, 0.8" />
    <input name="specular_roughness" type="float" value="0.3" />
  </standard_surface>
  <surfacematerial name="Default" type="material">
    <input name="surfaceshader" type="surfaceshader" nodename="SR_default" />
  </surfacematerial>
</materialx>
`;static get instance(){return l._instance||(l._instance=new l),l._instance}scenes=[];shadertoyScenes=[];shadertoyGlslPathtracerScenes=[];envMaps=[];envMapIdx=0;mouseSensitivity=.01;scene=null;_renderer=null;renderOptions=new Ln;lastTime;firstTime;bench=null;optionsChanged=!1;objectPropChanged=!1;reloadShaders=!1;interactiveMaterialX=!1;materialxClosureByMatId=new Map;materialxEsslBaseShader="";materialxEsslParamsByMatId=new Map;constructor(){this.lastTime=performance.now()}emitSceneStage(e,t){typeof window>"u"||window.dispatchEvent(new CustomEvent("scene-stage",{detail:{stage:e,message:t}}))}get renderer(){return this._renderer}get currentScene(){return this.scene}static getExt(e){if(e.indexOf(".")===-1)return"";let t=e.split(".");return t[t.length-1].toLowerCase()}async getSceneFilesAsync(){try{let e=await oe("pathtracer.json");this.scenes=await e.json(),this.scenes.includes(l.INTERACTIVE_MTLX_SCENE)||this.scenes.unshift(l.INTERACTIVE_MTLX_SCENE),this.scenes.includes(l.INTERACTIVE_MTLX_SCENE_ESSL)||this.scenes.unshift(l.INTERACTIVE_MTLX_SCENE_ESSL),e=await oe("shadertoy.json"),this.shadertoyScenes=await e.json(),e=await oe("shadertoy-glsl-pathtracer.json"),this.shadertoyGlslPathtracerScenes=await e.json()}catch(e){console.error("Error fetching scene files:",e)}}async getEnvMapsAsync(){try{let e=await oe("envmaps.json");this.envMaps=await e.json()}catch(e){console.error("Error fetching envMaps files:",e)}}applyMaterialXPathtracerPreviewDefaultsIfNeeded(){!(this.scene instanceof Le)||this.renderOptions.materialxGeneratorType==="essl"||!this.scene.materials.some(t=>t.materialType===1)||(this.renderOptions.pixelRatio=l.MATERIALX_PATHTRACER_PREVIEW_PIXEL_RATIO)}async loadSceneAsync(e,t=!1,n=!1,i=null){let r=e,s=e.includes(l.INTERACTIVE_MTLX_SCENE_ESSL);this.interactiveMaterialX=s||e.includes(l.INTERACTIVE_MTLX_SCENE);let a=globalThis.__ptForceGenerator;this.renderOptions.forcedMaterialxGeneratorType=a==="essl"||a==="pathtracer"||a==="auto"?a:null,this.renderOptions.materialxGeneratorType=this.renderOptions.forcedMaterialxGeneratorType??(s?"essl":"auto"),this.interactiveMaterialX&&(r=l.INTERACTIVE_MTLX_SCENE_FILE,e=l.INTERACTIVE_MTLX_SCENE_FILE);let o=l.getExt(e),c=!1,u=new ne;if((o==="scene"||o==="gltf"||o==="glb")&&!r.startsWith("/scenes/pathtracer/")&&(r=`/scenes/pathtracer/${r}`),o===""&&!r.startsWith("/scenes/shadertoy/examples/")){let d=`/scenes/shadertoy/examples/${r}/shadertoy.json`;(await oe(d)).ok||(d=`/scenes/shadertoy/examples/${r}/shader.json`),r=d}o==="shadertoyscene"&&!r.startsWith("/scenes/shadertoy/examples/glsl-pathtracer/")&&(r=`/scenes/shadertoy/examples/glsl-pathtracer/${r}`);let h=o==="shadertoyscene"||(o===""||o==="json")&&(r.endsWith("shadertoy.json")||r.endsWith("shader.json"));if(this.scene=h?new di(e):r.endsWith("data.json")?new Es(e):new Le(e),this.materialxClosureByMatId.clear(),this.materialxEsslBaseShader="",this.materialxEsslParamsByMatId.clear(),this.renderOptions.flipTexturesY=t,this.renderOptions.useRayMarching=n,o==="scene"?c=await Ms(r,this.scene,this.renderOptions):o==="gltf"?c=await Gt(r,this.scene,this.renderOptions,u,!1):o==="glb"?c=await Gt(r,this.scene,this.renderOptions,u,!0):(o===""||o==="json")&&r.endsWith("shadertoy.json")?c=await Xc(r,this.scene,this.renderOptions):(o===""||o==="json")&&r.endsWith("shader.json")?c=await _s(r,this.scene,this.renderOptions):o==="shadertoyscene"?c=await Zc(r,this.scene,this.renderOptions,i):r.endsWith("data.json")&&(c=await Qc(r,this.scene,this.renderOptions)),!c)return console.error("Unable to load scene"),!1;if(this.interactiveMaterialX&&this.scene instanceof Le){let d=globalThis.__ptInteractiveMtlxUrl;if(typeof d=="string"&&d)try{await this.seedInteractiveMaterialXFromUrlAsync(this.scene,d)}catch(f){console.error("Unable to apply interactive MaterialX from url:",f)}else if(!this.scene.proceduralMaterialGlsl&&!this.scene.materialxEsslShaderGlsl)try{await this.applyMaterialXClosureAsync(this.scene,l.DEFAULT_INTERACTIVE_MTLX,[],async()=>-1)}catch(f){console.error("Unable to seed default MaterialX material:",f)}}return o!==""&&!this.interactiveMaterialX&&this.scene.envMap===null&&this.envMaps.length>0&&this.scene.lights.length===0&&(await this.scene.addEnvMapAsync(`HDR/${this.envMaps[this.envMapIdx]}`),this.renderOptions.enableEnvMap=!0,this.renderOptions.envMapIntensity=1.5),this.applyMaterialXPathtracerPreviewDefaultsIfNeeded(),this.scene.renderOptions=this.renderOptions,this.renderOptions.renderResolution.x=Math.floor(this.renderOptions.originalRenderResolution.x*this.renderOptions.screenZoom),this.renderOptions.renderResolution.y=Math.floor(this.renderOptions.originalRenderResolution.y*this.renderOptions.screenZoom),this.renderOptions.tileWidth=Math.floor(this.renderOptions.renderResolution.x*this.renderOptions.pixelRatio/this.renderOptions.screenZoom),this.renderOptions.tileHeight=Math.floor(this.renderOptions.renderResolution.y*this.renderOptions.pixelRatio/this.renderOptions.screenZoom),this.resizeCanvas(this.renderOptions.renderResolution.x,this.renderOptions.renderResolution.y),!0}async initRendererAsync(){if(!this.scene)return console.error("Scene not loaded"),!1;if(this._renderer&&this._renderer.dispose(),this.scene instanceof di)this._renderer=new Fn(this.scene);else{let e=this.scene;this._renderer=this.renderOptions.materialxGeneratorType==="essl"?new dr(e):new Yt(e)}return await this.renderer.initAsync(),!0}render(){let e=P.gl;this.renderer.render(),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),e.viewport(0,0,this.renderOptions.renderResolution.x,this.renderOptions.renderResolution.y),this.renderer.present()}update(e,t){let n=!1;if(te.isAnyMouseDown()){if(this.scene instanceof Le){if(te.isMouseDown(0)){let i=te.getMouseDragDelta(0);this.scene.camera.offsetOrientation(i.x,i.y),te.resetMouseDragDelta(0)}else if(te.isMouseDown(1)){let i=te.getMouseDragDelta(1);this.scene.camera.setRadius(this.mouseSensitivity*i.y),te.resetMouseDragDelta(1)}else if(te.isMouseDown(2)){let i=te.getMouseDragDelta(2);this.scene.camera.strafe(this.mouseSensitivity*i.x,this.mouseSensitivity*i.y),te.resetMouseDragDelta(2)}}this.scene&&(this.scene.dirty=!0)}this.renderer.update(e,t)}resizeCanvas(e,t){let n=P.canvas;n!=null&&(n.width=e,n.style.width=e+"px",n.height=t,n.style.height=t+"px")}async resizeAsync(e,t){for(this.pauseOrContinue(!0);this.working;)await new Promise(n=>setTimeout(n,100));this.resizeCanvas(e,t),this.renderOptions.renderResolution.x=e,this.renderOptions.renderResolution.y=t,this.scene.renderOptions=this.renderOptions,await this.renderer.resizeRendererAsync(),this.pauseOrContinue()}async mainLoopAsync(e){let t=P.gl;this.working=!0,this.optionsChanged&&(this.optionsChanged=!1,this.scene.dirty=!0,this.firstTime=e),this.objectPropChanged&&(this.objectPropChanged=!1,this.scene.rebuildInstances()),this.reloadShaders&&(this.reloadShaders=!1,this.scene.dirty=!0,this.firstTime=e,await this.renderer.reloadShadersAsync()),this.bench?.begin("mainLoop");let n=e;this.firstTime===void 0&&(this.firstTime=n);let i=(n-this.firstTime)/1e3,r=(n-this.lastTime)/1e3;this.lastTime=n,this.update(i,r),t.clearColor(0,0,0,0),t.clear(t.raw.COLOR_BUFFER_BIT|t.raw.DEPTH_BUFFER_BIT),t.disable(t.raw.DEPTH_TEST),this.render(),this.bench?.end("mainLoop"),this.bench?.nextFrame(e),this.working=!1,this.stopped||requestAnimationFrame(s=>{this.stopped||this.mainLoopAsync(s)})}async startSceneAsync(e){for(this.pauseOrContinue(!0);this.working;)await new Promise(n=>setTimeout(n,100));if(P.document.getElementById("textures")?.replaceChildren(),this.emitSceneStage("loading","Chargement de la scene"),!!await this.loadSceneAsync(e,this.renderOptions.flipTexturesY,this.renderOptions.useRayMarching)&&await this.initRendererAsync()){if(Cn.build(this),this.interactiveMaterialX?Ht.show():Ht.hide(),typeof window.loadAllShaders=="function")if(this.scene instanceof di&&this.scene.shadertoyShader){let n=this.scene.shadertoyShader.getAllShaders();window.loadAllShaders(n)}else window.loadAllShaders({image:""});this.pauseOrContinue()}}async applyMaterialXClosureAsync(e,t,n,i,r,s){let a=this.renderOptions.materialxGeneratorType,o={uEnvRadiance:"u_envRadiance",uEnvIrradiance:"u_envIrradiance",uEnvLightIntensity:"u_envLightIntensity",uEnvMatrix:"u_envMatrix",envMapRotSymbol:"envMapRot"},c=Ts(t),u=new Map,h=[],d=!1;for(let p of c){let x=await i(p);u.set(p.samplerVar,x),x>=0?d=!0:h.push((p.file.split(/[\\/]/).pop()??p.file).toLowerCase())}if(a!=="essl"){let p=await mi({moduleUrl:this.renderOptions.materialxModuleUrl,documentText:t,libraryTexts:n.length?n:void 0,searchPath:r,generatorType:a,esslTemplateUrl:this.renderOptions.materialxEsslTemplateUrl,skipEnvMapping:!0}),x=gi(p,u),m=new Map;s===void 0?e.materials.forEach((_,y)=>{m.set(y,x),this.materialxClosureByMatId.set(y,x)}):(this.materialxClosureByMatId.size===0&&e.materials.forEach((_,y)=>this.materialxClosureByMatId.set(y,x)),this.materialxClosureByMatId.set(s,x),e.materials.forEach((_,y)=>{let b=this.materialxClosureByMatId.get(y)??x;m.set(y,b),this.materialxClosureByMatId.set(y,b)}));let g=vs(m);e.proceduralMaterialGlsl=g.glsl,e.materialTexStride=Wt+Math.ceil(g.floatsPerMat/4),e.materials.forEach((_,y)=>{let b=g.payloadByMatId.get(y)??null;b&&(_.materialType=1,_.materialxPayload=b);let v=g.previewByMatId.get(y);v&&(_.baseColor=new E(v.baseColor[0],v.baseColor[1],v.baseColor[2]),_.metallic=v.metallic,_.roughness=Math.max(.001,v.roughness))}),e.materialxEsslShaderGlsl=""}else{let p=gi(await mi({moduleUrl:this.renderOptions.materialxModuleUrl,documentText:t,libraryTexts:n.length?n:void 0,searchPath:r,generatorType:"essl",esslTemplateUrl:this.renderOptions.materialxEsslTemplateUrl,envMapConfig:o}),u),x=ys(p);s===void 0?(this.materialxEsslBaseShader=p,this.materialxEsslParamsByMatId.clear(),e.materials.forEach((b,v)=>{this.materialxEsslParamsByMatId.set(v,new Map(x))})):(this.materialxEsslBaseShader||(this.materialxEsslBaseShader=p),this.materialxEsslParamsByMatId.size===0&&e.materials.forEach((b,v)=>{this.materialxEsslParamsByMatId.set(v,new Map(x))}),this.materialxEsslParamsByMatId.set(s,new Map(x)));let m=new Set,g=e.meshInstances??[];for(let b of g)b.materialID>=0&&this.materialxEsslParamsByMatId.has(b.materialID)&&m.add(b.materialID);let y=(m.size>0?m.size:this.materialxEsslParamsByMatId.size)>1;if(e.proceduralMaterialGlsl="",y){let b=bs(this.materialxEsslBaseShader,this.materialxEsslParamsByMatId);e.materialxEsslShaderGlsl=b.glsl,e.materialTexStride=Wt+Math.ceil(b.floatsPerMat/4),e.materials.forEach((v,M)=>{v.materialType=1,v.materialxPayload=b.payloadByMatId.get(M)??null})}else e.materialxEsslShaderGlsl=this.materialxEsslBaseShader||p,e.materialTexStride=e.materials.reduce((b,v)=>Math.max(b,v.toVec4Array().length),Wt),e.materials.forEach(b=>{b.materialType=1,b.materialxPayload=null})}let f=or(t);if(s===void 0)e.materials.forEach(p=>{p.materialxModelType=f});else{let p=e.materials[s];p&&(p.materialxModelType=f)}return this.renderOptions.useMaterialxMode=!0,Hp(t)&&(this.renderOptions.maxDepth=Math.max(this.renderOptions.maxDepth,16)),{imagesAdded:d,missingImages:h}}async seedInteractiveMaterialXFromUrlAsync(e,t){let n=Xt.normalizePath(t),i=await oe(n);if(!i.ok){console.error(`Interactive MaterialX introuvable : ${t}`);return}let r=await i.text(),s=n.slice(0,n.lastIndexOf("/")+1),a=globalThis.location?.href,o=s;if(a)try{o=new URL(s.replace(/^\//,""),a).href}catch{}let{imagesAdded:c}=await this.applyMaterialXClosureAsync(e,r,[],async u=>e.addTextureByUrlAsync(Xt.normalizePath(s+u.filePrefix+u.file)),o);c&&await e.rebuildTextureMapsArrayAsync()}async applyServerMaterialXAsync(e,t,n){if(!(this.scene instanceof Le))return{ok:!1,message:"Aucune scene compatible chargee."};let i=this.scene,r;if(n){let d=i.meshInstances.find(p=>p.name===n);if(!d)return{ok:!1,message:`Instance introuvable : ${n}`};if(i.meshInstances.some(p=>p!==d&&p.materialID===d.materialID)){let p=i.materials[d.materialID],x=new je;p.copyTo(x),x.name=`${p.name} (${d.name})`;let m=i.materials.length;i.materials.push(x),this.materialxClosureByMatId.has(d.materialID)&&this.materialxClosureByMatId.set(m,this.materialxClosureByMatId.get(d.materialID)),this.materialxEsslParamsByMatId.has(d.materialID)&&this.materialxEsslParamsByMatId.set(m,new Map(this.materialxEsslParamsByMatId.get(d.materialID))),d.materialID=m}r=d.materialID}let s=Xt.normalizePath(`/scenes/materialx/materials/${e}`),a=await oe(s);if(!a.ok)return{ok:!1,message:`Introuvable : ${e}`};let o=await a.text();if(t){let d=or(o);if(d&&d!==t){let f=e.split("/").pop()??e;return{ok:!1,message:`Type incompatible : l'instance utilise \xAB ${t} \xBB, mais \xAB ${f} \xBB est \xAB ${d} \xBB.`}}}let c=s.slice(0,s.lastIndexOf("/")+1),u=globalThis.location?.href,h=c;if(u)try{h=new URL(c.replace(/^\//,""),u).href}catch{}for(this.pauseOrContinue(!0);this.working;)await new Promise(d=>setTimeout(d,50));try{let{missingImages:d}=await this.applyMaterialXClosureAsync(i,o,[],async x=>i.addTextureByUrlAsync(Xt.normalizePath(c+x.filePrefix+x.file)),h,r);await i.rebuildTextureMapsArrayAsync(),await this.initRendererAsync(),Cn.build(this),Ht.show(),i.dirty=!0,this.firstTime=performance.now(),this.pauseOrContinue();let f=e.split("/").pop()??e,p=d.length?` (textures manquantes: ${d.join(", ")})`:"";return n?{ok:!0,message:`Materiau \xAB ${f} \xBB applique a l'instance \xAB ${n} \xBB.${p}`}:{ok:!0,message:`Materiau \xAB ${f} \xBB applique.${p}`}}catch(d){return this.pauseOrContinue(),{ok:!1,message:`Echec : ${d instanceof Error?d.message:String(d)}`}}}async applyDroppedMaterialXAsync(e){if(!(this.scene instanceof Le))return{ok:!1,message:"Aucune scene compatible chargee."};let t=this.scene,n=e.filter(o=>o.name.toLowerCase().endsWith(".mtlx"));if(n.length===0)return{ok:!1,message:"Aucun fichier .mtlx."};let i=await Promise.all(n.map(async o=>({name:o.name,text:await o.file.text()}))),r=i.findIndex(o=>/<surfacematerial\b/i.test(o.text));r<0&&(r=0);let s=i[r].text,a=i.filter((o,c)=>c!==r).map(o=>o.text);for(this.pauseOrContinue(!0);this.working;)await new Promise(o=>setTimeout(o,50));try{let o=g=>g.toLowerCase().replace(/\\/g,"/").replace(/^\.?\//,""),c=new Map,u=new Map;for(let g of e)c.set(o(g.path),g.file),u.set(g.name.toLowerCase(),g.file);let h=new Map,d=g=>{let _=h.get(g);return _===void 0&&(_=URL.createObjectURL(g),h.set(g,_)),_},f=!1,p=[];try{let g=await this.applyMaterialXClosureAsync(t,s,a,async _=>{let y=o(_.filePrefix+_.file),b=(_.file.split(/[\\/]/).pop()??_.file).toLowerCase(),v=c.get(y)??u.get(b);return v?t.addTextureByUrlAsync(d(v)):-1});f=g.imagesAdded,p=g.missingImages}finally{for(let g of h.values())URL.revokeObjectURL(g)}f&&await t.rebuildTextureMapsArrayAsync(),await this.initRendererAsync(),Cn.build(this),Ht.show(),t.dirty=!0,this.firstTime=performance.now(),this.pauseOrContinue();let x=i[r].name,m=p.length?` (textures manquantes: ${p.join(", ")})`:"";return{ok:!0,message:`Materiau \xAB ${x} \xBB applique.${m}`}}catch(o){return this.pauseOrContinue(),{ok:!1,message:`Echec : ${o instanceof Error?o.message:String(o)}`}}}rewind(){this.pauseOrContinue(!0),this.scene.dirty=!0,this.firstTime=performance.now(),requestAnimationFrame(e=>{this.mainLoopAsync(e),requestAnimationFrame(t=>{this.mainLoopAsync(t)})})}pauseOrContinue(e=!1){return this.stopped=!this.stopped||e,this.renderer?.pauseOrContinue(this.stopped),te.pauseOrContinue(this.stopped),this.stopped||requestAnimationFrame(async t=>{this.stopped||await this.mainLoopAsync(t)}),this.stopped}async runAsync(e){if(P.setInstance(e.document,e.canvas),Cn.showGui&&(this.bench=new ps(P.gl.raw,{trackGPU:!0,paramLogger:(t,n,i,r,s,a,o)=>{}})),await this.getSceneFilesAsync(),await this.getEnvMapsAsync(),!e.scene){let t=globalThis.__ptInitialScene;if(typeof t=="string"&&t)e.scene=t;else{let n=this.scenes.find(i=>i!==l.INTERACTIVE_MTLX_SCENE&&i!==l.INTERACTIVE_MTLX_SCENE_ESSL)??null;e.scene=this.shadertoyScenes.length>0?this.shadertoyScenes[0]:n}}e.scene&&await this.startSceneAsync(e.scene)}};export{Cn as a,ke as b};
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

import{a as lt}from"./chunk-Q4WHUCDY.js";var Nt=class{dispose(){}},Xi=class extends Nt{name;image;rgba=null;width=null;height=null;flipY=!1;constructor(e=null,t=null){super(),this.name=e,this.image=t}},yt=class extends Xi{constructor(e=null,t=null){super(e,t)}async loadTextureAsync(e){if(typeof window<"u")return new Promise((t,n)=>{let i=new Image;i.crossOrigin="anonymous",i.onload=()=>{this.name=e,this.image=i,this.width=i.width,this.height=i.height,t(!0)},i.onerror=()=>t(!1),i.src=e});try{let n=(await import("sharp")).default(e).ensureAlpha(),i=await n.metadata(),s=await n.raw().toBuffer();return this.name=e,this.image=null,this.width=i.width??null,this.height=i.height??null,this.rgba=new Uint8Array(s),!0}catch(t){return console.error("Failed to load texture in Node:",t),!1}}};var We=class a extends Nt{static _instance=null;copyAudio=!1;sampleRate=44100;playTime=180;textureDimensions=512;playSamples;audioContext;audioBuffer;buffer;internalFormat;format;gltype;constructor(){super(),this.playSamples=this.playTime*this.sampleRate,this.audioContext=new AudioContext;let e=()=>{this.audioContext.state==="suspended"&&this.audioContext.resume()};document.addEventListener("click",e,{once:!0}),document.addEventListener("keydown",e,{once:!0}),document.addEventListener("touchstart",e,{once:!0}),this.audioBuffer=this.audioContext.createBuffer(2,this.playSamples,this.sampleRate),this.buffer=new Uint8Array(this.textureDimensions*this.textureDimensions*4),this.internalFormat=P.gl.raw.RGBA8,this.format=P.gl.raw.RGBA,this.gltype=P.gl.raw.UNSIGNED_BYTE}static instance(){return a._instance||(a._instance=new a),a._instance}};async function ra(a){return(await se(a)).ok}async function se(a){if(/^https?:\/\//i.test(a)||typeof window<"u"){let s=await fetch(a);return{ok:s.ok,statusText:s.statusText,arrayBuffer:()=>s.arrayBuffer(),text:()=>s.text(),json:()=>s.json(),blob:()=>s.blob()}}let e=await import("fs"),t=await import("path"),n=t.join,i=t.isAbsolute;try{let s=i(a)?`.${a}`:n(process.cwd(),a);return{ok:e.existsSync(s),statusText:e.existsSync(s)?"OK":"Not Found",arrayBuffer:async()=>e.readFileSync(s).buffer,text:async()=>e.readFileSync(s,{encoding:"utf8"}),json:async()=>JSON.parse(e.readFileSync(s,{encoding:"utf8"})),blob:async()=>new Blob([e.readFileSync(s)])}}catch(s){return console.error("Failed to read local file:",a,s),{ok:!1,statusText:s.message,arrayBuffer:async()=>new ArrayBuffer(0),text:async()=>"",json:async()=>null,blob:async()=>null}}}function Su(a,e){return console.log(`Saving ${a}`),new Promise(async t=>{if(typeof window<"u"){let n=new Blob([e],{type:"application/octet-stream"}),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=a,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i),t(!0)}else{let n=await import("fs/promises");try{if(e instanceof ArrayBuffer||e instanceof SharedArrayBuffer){let i=Buffer.from(e);await n.writeFile(a,i)}else{let i=await import("path/win32");await n.writeFile(a,e,"utf8")}t(!0)}catch(i){console.error("Failed to save file:",a,i),t(!1)}}})}var Ce=class a{channel;type;filepath;sampler;id;soundTexture;audioTexture;imageTexture;imageTextures;arrayBuffer;xres;yres;internalFormat=P.gl?.raw.RGBA8;format=P.gl?.raw.RGBA;gltype=P.gl?.raw.UNSIGNED_BYTE;texture;buffer;static pauseOrContinue(e,t){let n=e.audioTexture;n&&(t?n.audio.pause():n.audio.play())}static createTexture(e){return e.imageTextures?a.createTextureFromCubemap(e):e.type==="texture"||e.type==="video"||e.type==="floats"?a.createTextureFromImage(e):e.audioTexture?a.createTextureFromAudio(e):e.type==="volume"?a.createTextureFromVolume(e):e.type==="keyboard"?a.createTextureFromKeyboard(e):null}static bindTexture(e,t){let n=P.gl;if(n.activeTexture(n.raw.TEXTURE0+e.channel),e.type==="video")a.updateTextureFromVideo(e);else if(e.type==="music")a.updateTextureFromAudio(e);else if(e.type==="keyboard")n.bindTexture(n.raw.TEXTURE_2D,e.texture);else if(e.texture)e.type==="texture"||e.type==="floats"?n.bindTexture(n.raw.TEXTURE_2D,e.texture):e.type==="cubemap"?n.bindTexture(n.raw.TEXTURE_CUBE_MAP,e.texture):e.type==="volume"&&n.bindTexture(n.raw.TEXTURE_3D,e.texture);else if(e.buffer){if(e.type==="cubeA")n.bindTexture(n.raw.TEXTURE_CUBE_MAP,e.buffer.textures[1-e.buffer.frontIndex]),e.sampler&&(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_WRAP_S,n.raw.CLAMP_TO_EDGE),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_WRAP_T,n.raw.CLAMP_TO_EDGE),e.sampler.filter==="linear"?(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR)):e.sampler.filter==="mipmap"&&(n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_CUBE_MAP,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.raw.TEXTURE_CUBE_MAP)));else if(n.bindTexture(n.raw.TEXTURE_2D,e.buffer.textures[t?1-e.buffer.frontIndex:e.buffer.frontIndex]),e.sampler){var i=n.raw.REPEAT;e.sampler.wrap==="clamp"&&(i=n.raw.CLAMP_TO_EDGE),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_S,i),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_WRAP_T,i),e.sampler.filter==="linear"?(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR)):e.sampler.filter==="mipmap"&&(n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MAG_FILTER,n.raw.LINEAR),n.texParameteri(n.raw.TEXTURE_2D,n.raw.TEXTURE_MIN_FILTER,n.raw.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.raw.TEXTURE_2D))}}}static unbindTexture(e){let t=P.gl;t.activeTexture(t.raw.TEXTURE0+e.channel),t.bindTexture(t.raw.TEXTURE_2D,null),t.bindTexture(t.raw.TEXTURE_3D,null),t.bindTexture(t.raw.TEXTURE_CUBE_MAP,null)}static createTextureFromImage(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_2D,n);let i=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.pixelStorei(t.raw.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.raw.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.raw.NONE),e.arrayBuffer?t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer):t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.format,e.gltype,e.imageTexture.image);var s=t.raw.REPEAT;return e.sampler&&e.sampler.wrap==="clamp"&&(s=t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,s),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,s),!e.sampler||e.sampler.filter==="none"?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)):e.sampler&&(e.sampler.filter==="linear"||e.type==="video")?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)):e.sampler&&e.sampler.filter==="mipmap"?(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_2D)):e.sampler&&e.sampler.filter==="nearest"&&(t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_2D)),t.bindTexture(t.raw.TEXTURE_2D,null),t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,!1),n}static updateTextureFromVideo(e){let t=P.gl;if(!e.imageTexture.copyVideo){t.bindTexture(t.raw.TEXTURE_2D,null);return}t.bindTexture(t.raw.TEXTURE_2D,e.texture);let n=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,n),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.format,e.gltype,e.imageTexture.image)}static createTextureFromCubemap(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_CUBE_MAP,n);let i=e.sampler&&e.sampler.vflip=="true";return t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_X,0,e.internalFormat,e.format,e.gltype,e.imageTextures[0].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_X,0,e.internalFormat,e.format,e.gltype,e.imageTextures[1].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_Y,0,e.internalFormat,e.format,e.gltype,i?e.imageTextures[3].image:e.imageTextures[2].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,e.internalFormat,e.format,e.gltype,i?e.imageTextures[2].image:e.imageTextures[3].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_POSITIVE_Z,0,e.internalFormat,e.format,e.gltype,e.imageTextures[4].image),t.texImage2D(t.raw.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,e.internalFormat,e.format,e.gltype,e.imageTextures[5].image),!e.sampler||e.sampler.filter==="none"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)):e.sampler&&e.sampler.filter==="linear"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)):e.sampler&&e.sampler.filter==="mipmap"?(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_CUBE_MAP)):e.sampler&&e.sampler.filter==="nearest"&&(t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_CUBE_MAP,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST_MIPMAP_LINEAR),t.generateMipmap(t.raw.TEXTURE_CUBE_MAP)),t.bindTexture(t.raw.TEXTURE_CUBE_MAP,null),t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,!1),n}static createTextureFromVolume(e){let t=P.gl,n=t.createTexture();t.bindTexture(t.raw.TEXTURE_3D,n),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_BASE_LEVEL,0),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAX_LEVEL,Math.log2(e.xres)),(!e.sampler||e.sampler.filter==="none")&&(t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST)),e.sampler&&(e.sampler.filter==="linear"||e.sampler.filter==="mipmap")&&(t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR)),t.texImage3D(t.raw.TEXTURE_3D,0,e.internalFormat,e.xres,e.yres,e.yres,0,e.format,e.gltype,e.arrayBuffer);var i=t.raw.REPEAT;return e.sampler&&e.sampler.wrap==="clamp"&&(i=t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_R,i),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_S,i),t.texParameteri(t.raw.TEXTURE_3D,t.raw.TEXTURE_WRAP_T,i),t.bindTexture(t.raw.TEXTURE_3D,null),n}static createTextureFromKeyboard(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,t.raw.CLAMP_TO_EDGE),t.bindTexture(t.raw.TEXTURE_2D,null),n}static updateTextureFromKeyboard(e){let t=P.gl;t.bindTexture(t.raw.TEXTURE_2D,e.texture),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,e.arrayBuffer)}static createTextureFromAudio(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.LINEAR),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.LINEAR),t.texImage2D(t.raw.TEXTURE_2D,0,e.internalFormat,e.xres,e.yres,0,e.format,e.gltype,null),t.bindTexture(t.raw.TEXTURE_2D,null),n}static updateTextureFromAudio(e){let t=P.gl,n=e.audioTexture;if(!n.copyAudio){t.bindTexture(t.raw.TEXTURE_2D,null);return}n.update(),t.bindTexture(t.raw.TEXTURE_2D,e.texture);let i=e.sampler&&e.sampler.vflip=="true";t.pixelStorei(t.raw.UNPACK_FLIP_Y_WEBGL,i),t.texSubImage2D(t.raw.TEXTURE_2D,0,0,0,e.xres,1,e.format,e.gltype,n.freqData),t.texSubImage2D(t.raw.TEXTURE_2D,0,0,1,e.xres,1,e.format,e.gltype,n.waveData)}},Ln=class a{inputs;type;code=null;shader=null;fbos=null;textures=null;flip=!1;frontIndex=0;xres;yres;soundCompiled=!1;playNode=null;time=0;static createFBOAndTexture(e,t,n,i,s){e.fbos=[],e.textures=[],e.frontIndex=0,e.type==="cubeA"?(a.createFBOTextureCubeA(e),a.createFBOTextureCubeA(e)):e.type==="sound"?a.createFBOTextureSound(e):a.createFBOTexture(e,t,n,i,s)}static createFBOTexture(e,t,n,i,s){let r=P.gl,o=r.createFramebuffer();r.bindFramebuffer(r.raw.FRAMEBUFFER,o);let l=a.createTexture(i);if((!t||!n)&&(r.framebufferTexture2D(r.raw.FRAMEBUFFER,r.raw.COLOR_ATTACHMENT0,r.raw.TEXTURE_2D,l,0),r.bindTexture(r.raw.TEXTURE_2D,null),r.bindFramebuffer(r.raw.FRAMEBUFFER,null)),e.fbos.push(o),e.textures.push(l),t){if(!n){let u=r.createFramebuffer();r.bindFramebuffer(r.raw.FRAMEBUFFER,u),e.fbos.push(u)}let c=a.createTexture(s);r.framebufferTexture2D(r.raw.FRAMEBUFFER,r.raw.COLOR_ATTACHMENT0,r.raw.TEXTURE_2D,c,0),r.bindTexture(r.raw.TEXTURE_2D,null),r.bindFramebuffer(r.raw.FRAMEBUFFER,null),e.textures.push(c)}}static createFBOTextureCubeA(e){let t=P.gl,n=a.createTextureFromCubeA(e.xres,e.yres),i=t.createFramebuffer();t.bindFramebuffer(t.raw.FRAMEBUFFER,i),t.framebufferTexture2D(t.raw.FRAMEBUFFER,t.raw.COLOR_ATTACHMENT0,t.raw.TEXTURE_CUBE_MAP_POSITIVE_X,n,0),t.bindFramebuffer(t.raw.FRAMEBUFFER,null),e.fbos.push(i),e.textures.push(n)}static createTextureFromCubeA(e,t,n="linear",i=P.gl.raw.RGBA16F,s=P.gl.raw.RGBA,r=P.gl.raw.FLOAT){let o=P.gl,l=o.createTexture();return o.bindTexture(o.raw.TEXTURE_CUBE_MAP,l),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_POSITIVE_X,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_NEGATIVE_X,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_POSITIVE_Y,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_POSITIVE_Z,0,i,e,t,0,s,r,null),o.texImage2D(o.raw.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,i,e,t,0,s,r,null),n==="linear"&&(o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MAG_FILTER,o.raw.LINEAR),o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MIN_FILTER,o.raw.LINEAR)),n==="mipmap"&&(o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MAG_FILTER,o.raw.LINEAR),o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MIN_FILTER,o.raw.LINEAR_MIPMAP_LINEAR),o.generateMipmap(o.raw.TEXTURE_CUBE_MAP)),n==="nearest"&&(o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MAG_FILTER,o.raw.LINEAR),o.texParameteri(o.raw.TEXTURE_CUBE_MAP,o.raw.TEXTURE_MIN_FILTER,o.raw.NEAREST_MIPMAP_LINEAR)),o.bindTexture(o.raw.TEXTURE_CUBE_MAP,null),l}static createTexture(e){let t=P.gl,n=t.createTexture();return t.bindTexture(t.raw.TEXTURE_2D,n),t.texImage2D(t.raw.TEXTURE_2D,0,t.raw.RGBA32F,e.x,e.y,0,t.raw.RGBA,t.raw.FLOAT,null),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MAG_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_MIN_FILTER,t.raw.NEAREST),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_S,t.raw.CLAMP_TO_EDGE),t.texParameteri(t.raw.TEXTURE_2D,t.raw.TEXTURE_WRAP_T,t.raw.CLAMP_TO_EDGE),t.bindTexture(t.raw.TEXTURE_2D,null),n}static createFBOTextureSound(e){let t=P.gl,n=t.createFramebuffer();t.bindFramebuffer(t.raw.FRAMEBUFFER,n);let i=a.createTextureFromSound();t.framebufferTexture2D(t.raw.FRAMEBUFFER,t.raw.COLOR_ATTACHMENT0,t.raw.TEXTURE_2D,i,0),t.bindFramebuffer(t.raw.FRAMEBUFFER,null),e.fbos.push(n),e.textures.push(i)}static createTextureFromSound(){let e=P.gl,t=We.instance(),n=e.createTexture();return e.bindTexture(e.raw.TEXTURE_2D,n),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texImage2D(e.raw.TEXTURE_2D,0,t.internalFormat,t.textureDimensions,t.textureDimensions,0,t.format,t.gltype,null),e.bindTexture(e.raw.TEXTURE_2D,null),n}static drawBuffer(e,t){e.type=="sound"&&!e.soundCompiled&&(a.drawTextureFromSound(e,t),e.soundCompiled=!0,this.pauseOrContinue(e,!1))}static pauseOrContinue(e,t){e.playNode&&(e.time=Date.now(),e.playNode.disconnect(),e.playNode.stop(),e.playNode=null),t||(e.playNode=We.instance().audioContext.createBufferSource(),e.playNode.buffer=We.instance().audioBuffer,e.playNode.connect(We.instance().audioContext.destination),e.time>0?e.playNode.start(Date.now()-e.time):e.playNode.start(0))}static drawTextureFromSound(e,t){let n=P.gl,i=n.getAttribLocation(t,"pos"),s=n.getUniformLocation(t,"iTimeOffset"),r=n.getUniformLocation(t,"iSampleOffset"),o=We.instance(),l=o.buffer,c=o.textureDimensions*o.textureDimensions,u=o.audioBuffer.getChannelData(0),h=o.audioBuffer.getChannelData(1),d=o.playSamples/c;for(let p=0;p<d;p++){let f=p*c;n.uniform1f(s,f/o.sampleRate),n.uniform1i(r,f),n.drawUnitQuad_XY(i),n.readPixels(0,0,o.textureDimensions,o.textureDimensions,n.raw.RGBA,n.raw.UNSIGNED_BYTE,l,0);for(let g=0;g<c;g++)u[f+g]=-1+2*(l[4*g+0]+256*l[4*g+1])/65535,h[f+g]=-1+2*(l[4*g+2]+256*l[4*g+3])/65535}return!0}},ei=class{constructor(e=null){e&&(this.id=e.id,this.common=e.common,this.bufferA=e.bufferA,this.bufferB=e.bufferB,this.bufferC=e.bufferC,this.bufferD=e.bufferD,this.cubeA=e.cubeA,this.sound=e.sound,this.image=e.image)}fromShadertoyJson(e){this.id=e.info?.id,this.isGlslPathtracer=e.flags?.mFlagGlslPathTracer||!1;for(let t of e.renderpass){if(t.type=="common"){this.common=!0,this.commonCode=t.code;continue}let n=new Ln;n.type=t.type,n.code=t.code,n.inputs=[];for(let i of t.inputs){let s=new Ce;if(s.channel=i.channel,s.type=i.type,s.id=i.id||null,i.type!=="buffer")s.filepath=i.filepath;else switch(i.filepath){case"/media/previz/buffer00.png":s.type="bufferA";break;case"/media/previz/buffer01.png":s.type="bufferB";break;case"/media/previz/buffer02.png":s.type="bufferC";break;case"/media/previz/buffer03.png":s.type="bufferD";break}s.sampler=i.sampler,n.inputs.push(s)}switch(t.name){case"Buffer A":this.bufferA=n,n.type="bufferA";break;case"Buffer B":this.bufferB=n,n.type="bufferB";break;case"Buffer C":this.bufferC=n,n.type="bufferC";break;case"Buffer D":this.bufferD=n,n.type="bufferD";break;case"Cube A":this.cubeA=n,n.type="cubeA";break;case"Sound":this.sound=n,n.type="sound";break;case"Image":this.image=n,n.type="image";break}}}id;isGlslPathtracer=!1;common=!1;bufferA;bufferB;bufferC;bufferD;cubeA;sound;image;commonCode="";buffers;imageTexture=null;tileOutputTextures=null;accumFramebuffers=null;pathTraceTextures=null;getAllShaders(){let e={};return this.common&&(e.common=this.commonCode),this.bufferA&&(e.bufferA=this.bufferA.code),this.bufferB&&(e.bufferB=this.bufferB.code),this.bufferC&&(e.bufferC=this.bufferC.code),this.bufferD&&(e.bufferD=this.bufferD.code),this.cubeA&&(e.cubeA=this.cubeA.code),this.sound&&(e.sound=this.sound.code),this.image&&(e.image=this.image.code),e}getAllInputs(e){let t=[],n=null;switch(e){case"common":break;case"bufferA":n=this.bufferA;break;case"bufferB":n=this.bufferB;break;case"bufferC":n=this.bufferC;break;case"bufferD":n=this.bufferD;break;case"cubeA":n=this.cubeA;break;case"sound":n=this.sound;break;case"image":n=this.image;break}return n&&(t=n.inputs.map(i=>({type:i.type,filepath:i.filepath,sampler:i.sampler}))),t}},Yi=class{mDataView;mOffset;constructor(e){this.mDataView=e,this.mOffset=0}Seek(e){this.mOffset=e}ReadUInt8(){var e=new Uint8Array(this.mDataView,this.mOffset)[0];return this.mOffset+=1,e}ReadUInt16(){var e=new Uint16Array(this.mDataView,this.mOffset)[0];return this.mOffset+=2,e}ReadUInt32(){var e=new Uint32Array(this.mDataView,this.mOffset)[0];return this.mOffset+=4,e}ReadUInt64(){return this.ReadUInt32()+(this.ReadUInt32()<<32)}ReadFloat32(){var e=new Float32Array(this.mDataView,this.mOffset)[0];return this.mOffset+=4,e}ReadFloat32Array(e){for(var t=new Float32Array(this.mDataView,this.mOffset),n=[],i=0;i<e;i++)n[i]=t[i];return this.mOffset+=4*e,n}ReadFloat32ArrayNative(e){var t=new Float32Array(this.mDataView,this.mOffset);return this.mOffset+=4*e,t}WriteUInt8(e){new Uint8Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=1}WriteUInt16(e){new Uint16Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=2}WriteUInt32(e){new Uint32Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=4}WriteUInt64(e){this.WriteUInt32(e&4294967295),this.WriteUInt32(e>>32)}WriteFloat32(e){new Float32Array(this.mDataView,this.mOffset)[0]=e,this.mOffset+=4}WriteFloat32Array(e){for(var t=0;t<e.length;t++)this.WriteFloat32(e[t])}Save(e){return Su(e,this.mDataView)}};var Dt=class a extends Nt{static _instance=null;buffer;xRes;yRes;internalFormat;format;gltype;input=null;constructor(){super(),this.buffer=new Uint8Array(256*3);for(let e=0;e<256*3;e++)this.buffer[e]=0;this.xRes=256,this.yRes=3,this.internalFormat=P.gl.raw.R8,this.format=P.gl.raw.RED,this.gltype=P.gl.raw.UNSIGNED_BYTE}keydown(e){let t=e.keyCode;this.buffer[t+0*256]!=255&&(this.buffer[t+0*256]=255,this.buffer[t+1*256]=255,this.buffer[t+2*256]=255-this.buffer[t+2*256],this.input&&Ce.updateTextureFromKeyboard(this.input))}keyup(e){let t=e.keyCode;this.buffer[t+0*256]=0,this.buffer[t+1*256]=0,this.input&&Ce.updateTextureFromKeyboard(this.input)}eraseKeypresses(){for(let e=0;e<256;e++)this.buffer[e+1*256]=0;this.input&&Ce.updateTextureFromKeyboard(this.input)}static instance(){return a._instance||(a._instance=new a),a._instance}};var Y=class a{x;y;constructor(e=0,t=0){this.x=e,this.y=t}clone(){return new a(this.x,this.y)}static add(e,t){return e.add(t)}add(e){return new a(this.x+e.x,this.y+e.y)}static subtract(e,t){return e.subtract(t)}subtract(e){return new a(this.x-e.x,this.y-e.y)}scale(e){return new a(this.x*e,this.y*e*e)}};var Q=class a{static _isMouseDown=!1;static _isMouseOver=!1;static _isMouseWheel=!1;static _escapePressed=!1;static _paused=!1;static buttons=0;static downPosition=new Y(0,0);static movePosition=new Y(0,0);static deltaPosition=new Y(0,0);static pauseOrContinue(e){a._paused=e}static isMouseDown(e){return a._paused?!1:e===2?a._isMouseDown&&(a.buttons&4)!==0:a._isMouseDown&&(a.buttons&e+1)!==0}static keydown(e){a._paused||(e.key==="Escape"&&Pn.instance.pauseOrContinue(),Dt.instance().keydown(e))}static keyup(e){a._paused||Dt.instance().keyup(e)}static mouseEnter(){a._paused||(a._isMouseOver=!0)}static mouseLeave(){a._paused||(a._isMouseOver=!1)}static mouseDown(e){a._paused||(a._isMouseDown=!0,a.buttons=e.buttons,a.downPosition=new Y(e.offsetX,P.canvas.height-e.offsetY))}static touchStart(e){a._paused||(e.preventDefault(),a._isMouseDown=!0,a.buttons=1,a.downPosition=a.getTouchCanvasPosition(e.changedTouches[0]),a.movePosition=a.downPosition)}static mouseMove(e){a._paused||a._isMouseDown&&(a.movePosition=new Y(e.offsetX,P.canvas.height-e.offsetY))}static touchMove(e){a._paused||(e.preventDefault(),a._isMouseDown&&(a.movePosition=a.getTouchCanvasPosition(e.changedTouches[0])))}static mouseUp(){a._paused||(a._isMouseDown=!1,a.downPosition=new Y(0,0))}static touchCancel(e){a._paused||(e.preventDefault(),a._isMouseDown=!1,a.downPosition=new Y(0,0))}static mouseWheel(e){a._paused||(a._isMouseWheel=!0,a.deltaPosition=new Y(e.deltaX,e.deltaY))}static isAnyMouseDown(){return a._paused?!1:a._isMouseDown}static getMouseDragDelta(e){return a.isMouseDown(e)?new Y(a.movePosition.x-a.downPosition.x,a.movePosition.y-a.downPosition.y):new Y(0,0)}static resetMouseDragDelta(e){a.isMouseDown(e)&&(a.downPosition=a.movePosition)}static getTouchCanvasPosition(e){let t=P.canvas;if(!t)return new Y(0,0);let n=t.getBoundingClientRect(),i=(e.clientX-n.left)*(t.width/n.width),s=(e.clientY-n.top)*(t.height/n.height);return new Y(i,t.height-s)}};var P=class a{static _instance=null;document;canvas;gl;constructor(e,t){this.document=e,this.canvas=t,this.canvas.tabIndex=0;var n={alpha:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"};let i=t.getContext("webgl2",n);if(!i)throw new Error("WebGL2 not supported");this.gl=new lt(i),this.gl.getExtension("OES_texture_float_linear"),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("OES_texture_half_float_linear"),lt.profiling&&this.gl.getExtension("WEBGL_debug_shaders"),this.gl.raw.hint(this.gl.raw.FRAGMENT_SHADER_DERIVATIVE_HINT,this.gl.raw.NICEST);let s=i.getSupportedExtensions();console.log(`Available WebGL extensions:
`,s.join(`
`)),window.addEventListener("resize",async r=>{}),this.canvas.addEventListener("keydown",async r=>{Q.keydown(r),r.preventDefault()},!1),this.canvas.addEventListener("keyup",async r=>{Q.keyup(r),r.preventDefault()},!1),this.canvas.onmousedown=function(r){Q.mouseDown(r)},this.canvas.onmouseenter=function(r){Q.mouseEnter()},this.canvas.onmouseleave=function(r){Q.mouseLeave()},this.canvas.onmousemove=function(r){Q.mouseMove(r)},this.canvas.onmouseup=function(r){Q.mouseUp()},this.canvas.onwheel=function(r){Q.mouseWheel(r)},this.canvas.ontouchstart=function(r){Q.touchStart(r)},this.canvas.ontouchmove=function(r){Q.touchMove(r)},this.canvas.ontouchcancel=function(r){Q.touchCancel(r)}}static get document(){return a._instance==null?null:a._instance.document}static get canvas(){return a._instance==null?null:a._instance.canvas}static get gl(){return a._instance==null?null:a._instance.gl}static setInstance(e,t){a._instance=new a(e,t)}};var _=class a{x;y;z;constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}toArray(){return[this.x,this.y,this.z]}clone(){return new a(this.x,this.y,this.z)}static fromVec4(e){return new a(e.x,e.y,e.z)}multiply(e){return new a(this.x*e.x,this.y*e.y,this.z*e.z)}static add(e,t){return e.add(t)}add(e){return new a(this.x+e.x,this.y+e.y,this.z+e.z)}static subtract(e,t){return e.subtract(t)}subtract(e){return new a(this.x-e.x,this.y-e.y,this.z-e.z)}static scale(e,t){return e.scale(t)}scale(e){return new a(this.x*e,this.y*e,this.z*e)}get(e){return e===0?this.x:e===1?this.y:this.z}set(e,t){e===0?this.x=t:e===1?this.y=t:this.z=t}static log(e){return new a(Math.log(e.x),Math.log(e.y),Math.log(e.z))}static negate(e){return new a(-e.x,-e.y,-e.z)}static min(e,t){return new a(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z))}static max(e,t){return new a(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))}static cross(e,t){return new a(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x)}static pow(e,t){return new a(Math.pow(e.x,t),Math.pow(e.y,t),Math.pow(e.z,t))}static Length(e){return Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)}static dot(e,t){return e.x*t.x+e.y*t.y+e.z*t.z}static distance(e,t){return a.Length(e.subtract(t))}static clamp(e,t,n){return new a(Math.max(t.x,Math.min(e.x,n.x)),Math.max(t.y,Math.min(e.y,n.y)),Math.max(t.z,Math.min(e.z,n.z)))}static normalize(e){let t=a.Length(e);return new a(e.x/t,e.y/t,e.z/t)}};var ti=class{renderResolution;screenZoom;originalRenderResolution;uniformLightCol;backgroundCol;tileWidth;tileHeight;maxDepth;maxSpp;RRDepth;texArrayWidth;texArrayHeight;enableRR;enableDenoiser;denoiserFrameCnt;enableTonemap;enableAces;simpleAcesFit;openglNormalMap;enableEnvMap;enableUniformLight;hideEmitters;enableBackground;transparentBackground;independentRenderSize;enableRoughnessMollification;enableVolumeMIS;envMapIntensity;envMapRot;roughnessMollificationAmt;pixelRatio;sssMode;flipTexturesY=!1;useRayMarching=!1;useThinFilmLUT=!0;pathtracerShaderProfile="full";forceSynchronousShaderLink=!1;constructor(){this.renderResolution=new Y(1280,720),this.originalRenderResolution=new Y(1280,720),this.screenZoom=1,this.uniformLightCol=new _(.3,.3,.3),this.backgroundCol=new _(1,1,1),this.tileWidth=100,this.tileHeight=100,this.maxDepth=2,this.maxSpp=-1,this.RRDepth=2,this.texArrayWidth=2048,this.texArrayHeight=2048,this.enableRR=!0,this.enableDenoiser=!1,this.denoiserFrameCnt=10,this.enableTonemap=!0,this.enableAces=!1,this.simpleAcesFit=!1,this.openglNormalMap=!0,this.enableEnvMap=!1,this.enableUniformLight=!1,this.hideEmitters=!1,this.enableBackground=!1,this.transparentBackground=!1,this.independentRenderSize=!1,this.enableRoughnessMollification=!1,this.enableVolumeMIS=!1,this.envMapIntensity=1,this.envMapRot=0,this.roughnessMollificationAmt=0,this.pixelRatio=.25,this.sssMode=0}};var Ft=null,Mu=0;function wu(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function qi(a){return!Number.isFinite(a)||a<0?0:a}function pd(a){let e=2166136261;for(let t=0;t<a.length;t++)e^=a.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}function fd(a){let e=[],t=new Set,n=a.split(/\r?\n/),i=/^\s*#define\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s+(.*))?\s*$/;for(let s of n){let r=s.match(i);if(!r)continue;let o=r[1],l=(r[2]||"").trim(),c=l.length>0?`${o}=${l}`:o;t.has(c)||(t.add(c),e.push(c))}return e}function Ge(a){let e=new TextEncoder().encode(a).length,t=a.length>0?a.split(/\r?\n/).length:0;return{sourceHash:pd(a),sourceBytes:e,sourceLines:t,defines:fd(a)}}function Eu(a,e){Mu+=1;let t=Mu.toString().padStart(4,"0");return{runId:`${Date.now()}-${t}`,createdAtIso:new Date().toISOString(),rendererKind:a,sceneName:e,shaders:[],programs:[]}}function Au(){return Ft||(Ft=Eu("unknown","unknown")),Ft}function Ki(a,e){Ft=Eu(a,e)}function Cu(a){Au().shaders.push({...a,compileMs:qi(a.compileMs)})}function Ru(a){Au().programs.push({...a,linkProgramMs:qi(a.linkProgramMs),waitForLinkMs:qi(a.waitForLinkMs),totalProgramMs:qi(a.totalProgramMs)})}function md(a,e){let t=0,n=0,i=0,s=0;for(let c of a)t+=c.compileMs,n=Math.max(n,c.compileMs),c.stage==="vertex"&&(i+=1),c.stage==="fragment"&&(s+=1);let r=0,o=0,l=0;for(let c of e)r+=c.linkProgramMs,o+=c.waitForLinkMs,l=Math.max(l,c.totalProgramMs);return{shaderCount:a.length,vertexShaderCount:i,fragmentShaderCount:s,programCount:e.length,totalCompileMs:t,totalLinkProgramMs:r,totalWaitForLinkMs:o,totalGpuPipelineMs:t+r+o,maxSingleShaderCompileMs:n,maxSingleProgramMs:l}}async function gd(a){if(typeof process<"u"&&process.versions?.node)try{let t=await import("node:fs/promises"),n=await import("node:path"),i=n.join(process.cwd(),"reports"),s=n.join(i,`shader-compile-report-${a.runId}.json`);await t.mkdir(i,{recursive:!0}),await t.writeFile(s,JSON.stringify(a,null,2),"utf-8"),console.log(`[ShaderCompileReport] Report saved: ${s}`)}catch(t){console.warn("[ShaderCompileReport] Unable to persist JSON report on Node runtime.",t)}}function xd(a){let e=globalThis;e.__shaderCompileReports||(e.__shaderCompileReports=[]),e.__shaderCompileReports.push(a),e.__lastShaderCompileReport=a,typeof window<"u"&&window.dispatchEvent(new CustomEvent("shader-compile-report",{detail:a}))}async function ji(){if(!Ft)return null;let a={...Ft,summary:md(Ft.shaders,Ft.programs)};return Ft=null,xd(a),console.log("[ShaderCompileReport]",a.runId,a.summary),await gd(a),a}function Iu(a,e,t,n,i){return{...Ge(t),shaderPath:a,stage:e,compileMs:n,success:i}}function Zi(){return wu()}function Ji(a){return qi(wu()-a)}var aa=class{constructor(e,t=""){this.shaders=e;this.label=t;if(this.gl=P.gl,this.program=this.gl.createProgram(),!this.program)throw new Error("Unable to create WebGL program.");for(let i of e)this.gl.attachShader(this.program,i.getObject());let n=Zi();this.gl.linkProgram(this.program),this.linkProgramMs=Ji(n)}shaders;label;gl;program;linked=!1;linkProgramMs=0;linkMetricsReported=!1;async waitForLinkAsync(e=!1){if(this.linked)return;let t=Zi(),n=0,i=e?null:this.gl.getExtension("KHR_parallel_shader_compile");if(i)for(;n+=1,!this.gl.getProgramParameter(this.program,i.COMPLETION_STATUS_KHR);)await new Promise(r=>setTimeout(r,0));for(let s of this.shaders)this.gl.detachShader(this.program,s.getObject());if(!this.gl.getProgramParameter(this.program,this.gl.raw.LINK_STATUS)){let s=this.gl.getProgramInfoLog(this.program);throw this.gl.deleteProgram(this.program),new Error(`Error linking program: ${s}`)}if(this.linked=!0,!this.linkMetricsReported){let s=Ji(t),r=this.shaders.find(l=>l.getCompileEntry().stage==="vertex")?.getCompileEntry(),o=this.shaders.find(l=>l.getCompileEntry().stage==="fragment")?.getCompileEntry();Ru({programLabel:this.label||`${r?.shaderPath||"vertex"} -> ${o?.shaderPath||"fragment"}`,vertexSourceHash:r?.sourceHash||"",fragmentSourceHash:o?.sourceHash||"",linkProgramMs:this.linkProgramMs,waitForLinkMs:s,totalProgramMs:this.linkProgramMs+s,khrParallelShaderCompile:!!i,waitPollIterations:n,waitMode:i?"parallel":"synchronous"}),this.linkMetricsReported=!0}}use(){if(!this.linked)throw new Error("Program not linked yet");this.gl.useProgram(this.program)}stopUsing(){this.gl.useProgram(null)}getObject(){return this.program}dispose(){this.gl.deleteProgram(this.program)}};var oa=class{gl;vao=null;vbo=null;constructor(){this.gl=P.gl,this.vao=this.gl.createVertexArray(),this.vbo=this.gl.createBuffer(),this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.raw.ARRAY_BUFFER,this.vbo);let e=new Float32Array([-1,1,0,1,-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,-1,1,0,1,1,1,1]);this.gl.bufferData(this.gl.raw.ARRAY_BUFFER,e,this.gl.raw.STATIC_DRAW),this.gl.enableVertexAttribArray(0),this.gl.vertexAttribPointer(0,2,this.gl.raw.FLOAT,!1,4*Float32Array.BYTES_PER_ELEMENT,0),this.gl.enableVertexAttribArray(1),this.gl.vertexAttribPointer(1,2,this.gl.raw.FLOAT,!1,4*Float32Array.BYTES_PER_ELEMENT,2*Float32Array.BYTES_PER_ELEMENT),this.gl.bindVertexArray(null)}draw(e){e.use(),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.raw.TRIANGLES,0,6),this.gl.bindVertexArray(null),e.stopUsing()}};var Qi=class{shader;compileEntry;constructor(e,t){let n=P.gl,i=t===n.raw.VERTEX_SHADER?"vertex":t===n.raw.FRAGMENT_SHADER?"fragment":"unknown";this.shader=n.createShader(t),console.log(`Compiling Shader ${e.path}`);let s=Zi();n.shaderSource(this.shader,e.src),n.compileShader(this.shader);let r=Ji(s),o=n.getShaderParameter(this.shader,n.raw.COMPILE_STATUS);if(this.compileEntry=Iu(e.path,i,e.src,r,o),Cu(this.compileEntry),!o){let l=n.getShaderInfoLog(this.shader)||"Unknown error";n.deleteShader(this.shader),this.shader=null;let c=`Shader compilation error in ${e.path}
${e.src}
${l}`;throw alert(e.path+" : "+l),console.error(c),new Error(c)}if(e.dump){console.log(`Shader ${e.path} compiled successfully.`);let l=n.getExtension("WEBGL_debug_shaders").getTranslatedShaderSource(this.shader);console.log(l)}}getCompileEntry(){return this.compileEntry}getObject(){if(!this.shader)throw new Error("Shader object is null.");return this.shader}};function _d(a){let e=/\/\*[\s\S]*?\*\//g,t=!1;return a.replace(e,n=>/MIT License/.test(n)?t?"":(t=!0,n):n)}function yd(a){let e=/^\s*#define\s+(D4_ENABLE_CLOSURE_[A-Za-z0-9_]+)\s+([01])\s*$/gm,t=new Map,n=null;for(;(n=e.exec(a))!==null;)t.set(n[1],Number.parseInt(n[2],10));if(t.size===0)return a;let i=a;for(let[s,r]of t.entries()){if(r===0){let l=new RegExp(`#if\\s+${s}\\b[\\s\\S]*?#endif\\s*`,"g");i=i.replace(l,"");continue}let o=new RegExp(`#if\\s+${s}\\b\\s*([\\s\\S]*?)#endif`,"g");i=i.replace(o,"$1")}return i}function ml(a){let e=_d(a);return e=yd(e),e=e.replace(/\n{3,}/g,`

`),e}var be=class a{static async loadAsync(e,t=!1,n="#include"){n+=" ";let i;try{if(i=await se(e),!i.ok)throw new Error}catch{return console.error(`ERROR: could not open the shader at: ${e}`),{src:"",path:e,dump:t}}let s=await i.text();return await a.loadShaderSourceAsync(s,e,t,n)}static async loadShaderSourceAsync(e,t,n=!1,i="#include"){let s=e.split(/\r?\n/),r="";for(let o of s){if(o.includes(i)){let l=o.replace(i,"").trim().replace(/["<>]/g,""),c=a.resolveRelativePath(t,l),u=await a.loadAsync(c,n,i.trim());r+=u.src;continue}r+=o+`
`}return{src:r,path:t,dump:n}}static resolveRelativePath(e,t){return t.startsWith("http://")||t.startsWith("https://")?new URL(t,e).toString():t.startsWith("/")?t:e.substring(0,e.lastIndexOf("/")+1)+t}};var sn=class a{static maxBufferTextureWidth=4096;gl;_scene;shadersDirectory;programs=[];programCacheByKey=new Map;quad;pixelRatio;_sampleCounter=1;get sampleCounter(){return this._sampleCounter}set sampleCounter(e){this._sampleCounter=e}currentBuffer=0;frameCounter=1;_renderSize=new Y(0,0);tileWidth=0;tileHeight=0;invNumTiles=new Y(0,0);numTiles=new Y(0,0);tile=new Y(0,0);outputFBO=null;denoiserFBO=null;outputShader=null;denoised=!1;stopRequested=!1;constructor(e){this._scene=e}emitSceneStage(e,t){typeof window>"u"||window.dispatchEvent(new CustomEvent("scene-stage",{detail:{stage:e,message:t}}))}get scene(){return this._scene}get renderSize(){return this._renderSize}consumeStopRequested(){let e=this.stopRequested;return this.stopRequested=!1,e}async initAsync(){this.gl=P.gl,this.shadersDirectory="./shaders/",this.stopRequested=!1,this.quad=new oa,this.pixelRatio=this.scene.renderOptions.pixelRatio,this.emitSceneStage("processing","Traitement de la scene"),this.scene.initialized||await this.scene.processSceneAsync(),this.initFBOs(),await this.initShadersAsync()}createTexture(e,t,n,i,s,r){let o=this.gl,l=o.createTexture();return o.bindTexture(o.raw.TEXTURE_2D,l),o.texImage2D(o.raw.TEXTURE_2D,0,e,t,n,0,i,s,r),o.texParameteri(o.raw.TEXTURE_2D,o.raw.TEXTURE_WRAP_S,o.raw.CLAMP_TO_EDGE),o.texParameteri(o.raw.TEXTURE_2D,o.raw.TEXTURE_WRAP_T,o.raw.CLAMP_TO_EDGE),o.texParameteri(o.raw.TEXTURE_2D,o.raw.TEXTURE_MAG_FILTER,o.raw.NEAREST),o.texParameteri(o.raw.TEXTURE_2D,o.raw.TEXTURE_MIN_FILTER,o.raw.NEAREST),o.bindTexture(o.raw.TEXTURE_2D,null),l}createBufferTexture(e,t){let n=this.gl,i=e.length/t,s=Math.min(a.maxBufferTextureWidth,i),r=Math.ceil(i/s);if(s*r*t!==e.length){let o=new Float32Array(s*r*t);o.set(e),e=o}return this.createTexture(t==4?n.raw.RGBA32F:n.raw.RGB32F,s,r,t==4?n.raw.RGBA:n.raw.RGB,n.raw.FLOAT,e)}createBufferTextureInt(e,t){let n=this.gl,i=e.length/t,s=Math.min(a.maxBufferTextureWidth,i),r=Math.ceil(i/s);if(s*r*t!==e.length){let o=new Int32Array(s*r*t);o.set(e),e=o}return this.createTexture(t==4?n.raw.RGBA32I:n.raw.RGB32I,s,r,t==4?n.raw.RGBA_INTEGER:n.raw.RGB_INTEGER,n.raw.INT,e)}createBufferTextureUint(e,t){let n=this.gl,i=e.length/t,s=this.scene.renderOptions.texArrayWidth,r=Math.ceil(i/s);return this.createTexture(t==4?n.raw.RGBA8UI:n.raw.RGB8UI,s,r,t==4?n.raw.RGBA_INTEGER:n.raw.RGB_INTEGER,n.raw.UNSIGNED_BYTE,e)}dispose(){let e=this.gl;this.outputFBO&&(e.deleteFramebuffer(this.outputFBO),this.outputFBO=null),this.denoiserFBO&&(e.deleteFramebuffer(this.denoiserFBO),this.denoiserFBO=null),this.outputShader=null,Array.from(new Set(this.programs)).forEach(n=>n.dispose()),this.programs=[],this.programCacheByKey.clear()}async resizeRendererAsync(){let e=this.gl;this.dispose(),this.initFBOs(),await this.initShadersAsync()}pauseOrContinue(e){}initFBOs(){}initFBOs_(e){let t=this.gl;this.sampleCounter=1,this.currentBuffer=0,this.frameCounter=1,this._renderSize=this.scene.renderOptions.renderResolution,e&&(this.tileWidth=this.scene.renderOptions.tileWidth,this.tileHeight=this.scene.renderOptions.tileHeight,this.invNumTiles.x=this.tileWidth/this.renderSize.x,this.invNumTiles.y=this.tileHeight/this.renderSize.y,this.numTiles.x=Math.ceil(this.renderSize.x/this.tileWidth),this.numTiles.y=Math.ceil(this.renderSize.y/this.tileHeight),this.tile.x=-1,this.tile.y=this.numTiles.y-1),console.log("Render Resolution :",this.renderSize.x,this.renderSize.y),console.log("Preview Resolution :",Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),e&&console.log("Tile Size :",this.tileWidth,this.tileHeight)}disposeShaders(){this.outputShader=null,Array.from(new Set(this.programs)).forEach(t=>t.dispose()),this.programs=[],this.programCacheByKey.clear()}buildProgramCacheKey(e,t){let n=Ge(e.src),i=Ge(t.src),s=this.buildClosureFeatureSignature(e.src,t.src);return`${n.sourceHash}:${i.sourceHash}:${s}`}buildClosureFeatureSignature(e,t){let n=`${e}
${t}`,i=/^\s*#define\s+(D4_ENABLE_CLOSURE_[A-Za-z0-9_]+)\s+(.+)\s*$/gm,s=[],r=new Set,o=null;for(;(o=i.exec(n))!==null;){let l=`${o[1]}=${o[2].trim()}`;r.has(l)||(r.add(l),s.push(l))}return s.length===0?"D4_ENABLE_CLOSURE_NONE":(s.sort(),s.join("|"))}async reloadShadersAsync(){this.disposeShaders(),await this.initShadersAsync()}loadShaders(e,t){let n=this.gl,i={...e,src:ml(e.src)},s={...t,src:ml(t.src)},r=this.buildProgramCacheKey(i,s),o=this.programCacheByKey.get(r);if(o)return this.programs.includes(o)||this.programs.push(o),o;let l=[];l.push(new Qi(i,n.raw.VERTEX_SHADER)),l.push(new Qi(s,n.raw.FRAGMENT_SHADER));let c=`${i.path} -> ${s.path}`,u=new aa(l,c);return this.programs.push(u),this.programCacheByKey.set(r,u),u}async initShadersAsync(){this.emitSceneStage("compile","Compilation des shaders");let[e,t]=await Promise.all([be.loadAsync(this.shadersDirectory+"common/vertex.glsl"),be.loadAsync(this.shadersDirectory+"output.glsl")]);this.outputShader=this.loadShaders(e,t),this.emitSceneStage("compile","Compilation des shaders terminee")}render(){}present(){}getProgress(){let e=this.scene.renderOptions.maxSpp;return e<=0?0:this.sampleCounter*100/e}getSampleCount(){return this.sampleCounter}exportTextureToImage(e,t,n,i){if(!e){console.error("Cannot export null texture");return}let s=this.gl,r=s.createFramebuffer();if(s.bindFramebuffer(s.raw.FRAMEBUFFER,r),s.framebufferTexture2D(s.raw.FRAMEBUFFER,s.raw.COLOR_ATTACHMENT0,s.raw.TEXTURE_2D,e,0),s.raw.checkFramebufferStatus(s.raw.FRAMEBUFFER)!==s.raw.FRAMEBUFFER_COMPLETE){console.error("Framebuffer is not complete"),s.bindFramebuffer(s.raw.FRAMEBUFFER,null),s.deleteFramebuffer(r);return}let o=new Float32Array(t*n*4);s.raw.readPixels(0,0,t,n,s.raw.RGBA,s.raw.FLOAT,o);let l=new Uint8Array(t*n*4);for(let p=0;p<o.length;p++)l[p]=Math.min(255,Math.max(0,Math.floor(o[p]*255)));s.bindFramebuffer(s.raw.FRAMEBUFFER,null),s.deleteFramebuffer(r);let c=document.createElement("canvas");c.width=t,c.height=n,c.style.border="2px solid black";let u=c.getContext("2d");if(!u){console.error("Cannot get 2D context from canvas");return}let h=u.createImageData(t,n);for(let p=0;p<n;p++)for(let f=0;f<t;f++){let g=(p*t+f)*4,m=((n-1-p)*t+f)*4;h.data[m]=l[g],h.data[m+1]=l[g+1],h.data[m+2]=l[g+2],h.data[m+3]=l[g+3]}u.putImageData(h,0,0),P.document.getElementById(i)?.appendChild(c)}async update(e,t){}};var bd="pathtracer:shader-source-bundle:",gl=new Map;function Lu(){return typeof window<"u"&&typeof window.localStorage<"u"}function Pu(a){return`${bd}${a}`}function Nu(a){let e=gl.get(a);if(e)return e;if(!Lu())return null;try{let t=window.localStorage.getItem(Pu(a));if(!t)return null;let n=JSON.parse(t);return!n||n.key!==a?null:(gl.set(a,n),n)}catch{return null}}function Du(a,e){let t={key:a,createdAtIso:new Date().toISOString(),...e};if(gl.set(a,t),!!Lu())try{window.localStorage.setItem(Pu(a),JSON.stringify(t))}catch{}}var la="/*__PROCEDURAL_MATERIAL_INJECTION__*/",ca="/*__PROCEDURAL_GEOMETRY_INJECTION__*/",ua="/*__PROCEDURAL_ENV_INJECTION__*/";function vd(a){let e=a;return e=e.replace(/#ifdef OPT_MATERIALX_RUNTIME[\s\S]*?#endif\s*\/\/ OPT_MATERIALX_RUNTIME\s*/g,""),e}function Fu(a){let e=vd(a),t=/\bcomputeSSS\s*\(/.test(e),n=/\bvec3\s+computeSSS\s*\(/.test(e),i=/\bthinFilmFresnel\s*\(/.test(e),s=/\bvec3\s+thinFilmFresnel\s*\(/.test(e);return t&&!n||i&&!s?a:e}function Td(a){return[`profile=${a.shaderProfile}`,`tile=${Ge(a.tileSrc).sourceHash}`,`preview=${Ge(a.previewSrc).sourceHash}`,`tonemap=${Ge(a.tonemapSrc).sourceHash}`,`defs=${Ge(a.pathtraceDefines).sourceHash}`,`tonemapDefs=${Ge(a.tonemapDefines).sourceHash}`,`procMat=${Ge(a.proceduralMaterialGlsl).sourceHash}`,`procEnv=${Ge(a.proceduralEnvGlsl).sourceHash}`,"pruneVersion=2"].join("|")}var ni=class a extends sn{_denoiserRunning=!1;backendReady=!1;denoiser=null;denoiserExecutedOneTime=!1;denoiserTexture=null;denoiserInputFramePtr=null;BVHTex=null;vertexIndicesTex=null;verticesTex=null;normalsTex=null;materialsTex=null;transformsTex=null;lightsTex=null;textureMapsArrayTex=null;envMapTex=null;envMapCDFTex=null;thinFilmLutTex=null;pathTraceTextureLowRes=null;pathTraceTexture=null;accumTexture=null;tileOutputTexture=[null,null];pathTraceFBO=null;pathTraceFBOLowRes=null;accumFBO=null;pathTraceShader=null;pathTraceShaderLowRes=null;tonemapShader=null;pendingTonemapVertexSource=null;pendingTonemapFragmentSource=null;pendingTonemapLinkPromise=null;debugExpandedShaderSources=null;_initDenoiserAsync(e){if(typeof document>"u"){this.scene.renderOptions.enableDenoiser=!1,this.backendReady=!0;return}import("./denoiser-R4B6EPN5.js").then(t=>{let n=t.Denoiser;if(!n)throw new Error("Denoiser export not found.");let i=document.getElementById("_denoiserOutput");i===null&&(i=document.createElement("canvas"),i.id="_denoiserOutput",i.style.display="none",document.body.appendChild(i)),this.denoiser=new n("webgl",i),this.denoiser.onBackendReady(()=>{this.denoiser&&(this.denoiser.useTiling=!0,this.denoiser.onExecute(s=>{!this.denoiserFBO||!this.denoiserTexture||(e.bindFramebuffer(e.raw.FRAMEBUFFER,this.denoiserFBO),e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture),e.texSubImage2D(e.raw.TEXTURE_2D,0,0,0,this.denoiser.width,this.denoiser.height,e.raw.RGBA,e.raw.FLOAT,s),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.denoiserExecutedOneTime||(this.denoiserExecutedOneTime=!0))},"float32"),this.backendReady=!0)})}).catch(t=>{console.warn("Denoiser disabled (module load failed):",t),this.scene.renderOptions.enableDenoiser=!1,this.backendReady=!0,this.denoiser=null})}constructor(e){super(e)}dispose(){super.dispose();let e=this.gl;this.pathTraceTexture&&(e.deleteTexture(this.pathTraceTexture),this.pathTraceTexture=null),this.pathTraceTextureLowRes&&(e.deleteTexture(this.pathTraceTextureLowRes),this.pathTraceTextureLowRes=null),this.accumTexture&&(e.deleteTexture(this.accumTexture),this.accumTexture=null),this.tileOutputTexture[0]&&(e.deleteTexture(this.tileOutputTexture[0]),this.tileOutputTexture[0]=null),this.tileOutputTexture[1]&&(e.deleteTexture(this.tileOutputTexture[1]),this.tileOutputTexture[1]=null),this.denoiserTexture&&(e.deleteTexture(this.denoiserTexture),this.denoiserTexture=null),this.BVHTex&&(e.deleteTexture(this.BVHTex),this.BVHTex=null),this.vertexIndicesTex&&(e.deleteTexture(this.vertexIndicesTex),this.vertexIndicesTex=null),this.verticesTex&&(e.deleteTexture(this.verticesTex),this.verticesTex=null),this.normalsTex&&(e.deleteTexture(this.normalsTex),this.normalsTex=null),this.materialsTex&&(e.deleteTexture(this.materialsTex),this.materialsTex=null),this.transformsTex&&(e.deleteTexture(this.transformsTex),this.transformsTex=null),this.lightsTex&&(e.deleteTexture(this.lightsTex),this.lightsTex=null),this.textureMapsArrayTex&&(e.deleteTexture(this.textureMapsArrayTex),this.textureMapsArrayTex=null),this.envMapTex&&(e.deleteTexture(this.envMapTex),this.envMapTex=null),this.envMapCDFTex&&(e.deleteTexture(this.envMapCDFTex),this.envMapCDFTex=null),this.thinFilmLutTex&&(e.deleteTexture(this.thinFilmLutTex),this.thinFilmLutTex=null),this.denoiser&&(this.denoiser.dispose(),this.denoiser=null),this.pathTraceFBO&&(e.deleteFramebuffer(this.pathTraceFBO),this.pathTraceFBO=null),this.pathTraceFBOLowRes&&(e.deleteFramebuffer(this.pathTraceFBOLowRes),this.pathTraceFBOLowRes=null),this.accumFBO&&(e.deleteFramebuffer(this.accumFBO),this.accumFBO=null),this.pathTraceShader=null,this.pathTraceShaderLowRes=null,this.tonemapShader=null,this.pendingTonemapVertexSource=null,this.pendingTonemapFragmentSource=null,this.pendingTonemapLinkPromise=null}initFBOs(){super.initFBOs_(!0);let e=this.gl;this.pathTraceFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBO),this.pathTraceTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.tileWidth,this.tileHeight,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.pathTraceTexture,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.pathTraceFBOLowRes=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),this.pathTraceTextureLowRes=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio),0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.pathTraceTextureLowRes,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.accumFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.accumFBO),this.accumTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.accumTexture,0),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),this.outputFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),this.tileOutputTexture[0]=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[0]),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),this.tileOutputTexture[1]=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[1]),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.tileOutputTexture[this.currentBuffer],0),this.backendReady=!this.scene.renderOptions.enableDenoiser,this.denoiserInputFramePtr=new Float32Array(this.renderSize.x*this.renderSize.y*4),this.denoiserTexture=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGBA32F,this.renderSize.x,this.renderSize.y,0,e.raw.RGBA,e.raw.FLOAT,null),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.bindTexture(e.raw.TEXTURE_2D,null),this.denoiserFBO=e.createFramebuffer(),this.scene.renderOptions.enableDenoiser&&this._initDenoiserAsync(e),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}disposeShaders(){super.disposeShaders(),this.pathTraceShader=null,this.pathTraceShaderLowRes=null,this.tonemapShader=null,this.pendingTonemapVertexSource=null,this.pendingTonemapFragmentSource=null,this.pendingTonemapLinkPromise=null}async ensureTonemapShaderAsync(){if(this.tonemapShader)return;if(this.pendingTonemapLinkPromise){await this.pendingTonemapLinkPromise;return}if(!this.pendingTonemapVertexSource||!this.pendingTonemapFragmentSource)return;let e=(async()=>{Ki("pathtracer-lazy-tonemap",this.scene.sceneName||"unknown");let t=this.loadShaders(this.pendingTonemapVertexSource,this.pendingTonemapFragmentSource);await t.waitForLinkAsync(this.scene.renderOptions.forceSynchronousShaderLink),await ji(),this.tonemapShader=t,this.pendingTonemapVertexSource=null,this.pendingTonemapFragmentSource=null})();this.pendingTonemapLinkPromise=e;try{await e}finally{this.pendingTonemapLinkPromise=null}}async initShadersAsync(){Ki("pathtracer",this.scene.sceneName||"unknown"),await super.initShadersAsync();let e=this.gl,t=this.scene,n=t.renderOptions.pathtracerShaderProfile,i=n==="mtlx-node-test",[s,r,o,l,c]=await Promise.all([be.loadAsync(this.shadersDirectory+"common/vertex.glsl"),be.loadAsync(this.shadersDirectory+"tile.glsl"),be.loadAsync(this.shadersDirectory+"preview.glsl"),be.loadAsync(this.shadersDirectory+"output.glsl"),be.loadAsync(this.shadersDirectory+"tonemap.glsl")]),u={src:this.scene.renderOptions.pathtracerShaderProfile==="mtlx-node-test"?r.src:o.src,path:this.scene.renderOptions.pathtracerShaderProfile==="mtlx-node-test"?`${r.path}#lowres`:o.path,dump:o.dump},h=this.scene.proceduralMaterialGlsl?.trim().length?`${this.scene.proceduralMaterialGlsl}
`:`vec3 EvalProceduralDisplacementLocal(int matId, vec2 uv, int texLayer) { return vec3(0.0); }
void ApplyProceduralMaterialOverrides(int matId, inout Material mat, inout State state, ivec4 texIDs, Ray r) {}
void ApplyProceduralMaterialClosureContract(int matId, in Material mat, in State state) {}
`,d=`vec3 EvalProceduralDisplacementLocal(int matId, vec2 uv, int texLayer);
void ApplyProceduralMaterialOverrides(int matId, inout Material mat, inout State state, ivec4 texIDs, Ray r);
void ApplyProceduralMaterialClosureContract(int matId, in Material mat, in State state);
`,p=i?"":this.scene.proceduralEnvGlsl?.trim().length?`${this.scene.proceduralEnvGlsl}
`:"",[f,g]=this.scene.getDefines(),m=Td({shaderProfile:n,tileSrc:r.src,previewSrc:u.src,tonemapSrc:c.src,pathtraceDefines:f,tonemapDefines:g,proceduralMaterialGlsl:h,proceduralEnvGlsl:p});function x(T,w){let C=T.src.indexOf("#version");if(C!==-1){let E=T.src.indexOf(`
`,C);T.src=T.src.slice(0,E+1)+w+T.src.slice(E+1)}else T.src=w+T.src}let y=Nu(m);y?(r.src=y.pathTraceSrc,u.src=y.pathTraceLowResSrc,c.src=y.tonemapSrc):(r.src=r.src.replace(ca,h+ca),u.src=u.src.replace(ca,h+ca),r.src=r.src.replace(la,d+la),u.src=u.src.replace(la,d+la),r.src=r.src.replace(ua,p+ua),u.src=u.src.replace(ua,p+ua),i&&(r.src=Fu(r.src),u.src=Fu(u.src)),x(r,f),x(u,f),x(c,g),Du(m,{pathTraceSrc:r.src,pathTraceLowResSrc:u.src,tonemapSrc:c.src})),this.debugExpandedShaderSources={tile:r.src,preview:u.src,tonemap:c.src},this.outputShader=this.loadShaders(s,l),this.tonemapShader=i?this.outputShader:null,this.pendingTonemapVertexSource=i?null:{...s},this.pendingTonemapFragmentSource=i?null:{...c},this.pathTraceShader=this.loadShaders(s,r);let b=Ge(u.src).sourceHash,S=Ge(r.src).sourceHash;b===S?this.pathTraceShaderLowRes=this.pathTraceShader:this.pathTraceShaderLowRes=this.loadShaders(s,u);let v=await Promise.all(this.programs.map((T,w)=>(console.log(`Linking program ${w+1}/${this.programs.length}: ${T.label}...`),T.waitForLinkAsync(this.scene.renderOptions.forceSynchronousShaderLink))));await ji(),console.log(),this.emitSceneStage("launch","Lancement du rendu");let M;this.pathTraceShader.use(),M=this.pathTraceShader.getObject(),t.envMap&&(e.uniform2f(e.raw.getUniformLocation(M,"envMapRes"),t.envMap.width,t.envMap.height),e.uniform1f(e.raw.getUniformLocation(M,"envMapTotalSum"),t.envMap.totalSum)),e.uniform1i(e.raw.getUniformLocation(M,"topBVHIndex"),t.topLevelIndex),e.uniform2f(e.raw.getUniformLocation(M,"resolution"),this.renderSize.x,this.renderSize.y),e.uniform2f(e.raw.getUniformLocation(M,"invNumTiles"),this.invNumTiles.x,this.invNumTiles.y),e.uniform1i(e.raw.getUniformLocation(M,"numOfLights"),t.lights.length),e.uniform1i(e.raw.getUniformLocation(M,"accumTexture"),0),e.uniform1i(e.raw.getUniformLocation(M,"BVH"),1),e.uniform1i(e.raw.getUniformLocation(M,"vertexIndicesTex"),2),e.uniform1i(e.raw.getUniformLocation(M,"verticesTex"),3),e.uniform1i(e.raw.getUniformLocation(M,"normalsTex"),4),e.uniform1i(e.raw.getUniformLocation(M,"materialsTex"),5),e.uniform1i(e.raw.getUniformLocation(M,"transformsTex"),6),e.uniform1i(e.raw.getUniformLocation(M,"lightsTex"),7),e.uniform1i(e.raw.getUniformLocation(M,"textureMapsArrayTex"),8),e.uniform1i(e.raw.getUniformLocation(M,"envMapTex"),9),e.uniform1i(e.raw.getUniformLocation(M,"envMapCDFTex"),10),e.uniform1i(e.raw.getUniformLocation(M,"thinFilmLutTex"),11),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),M=this.pathTraceShaderLowRes.getObject(),t.envMap&&(e.uniform2f(e.raw.getUniformLocation(M,"envMapRes"),t.envMap.width,t.envMap.height),e.uniform1f(e.raw.getUniformLocation(M,"envMapTotalSum"),t.envMap.totalSum)),e.uniform1i(e.raw.getUniformLocation(M,"topBVHIndex"),t.topLevelIndex),e.uniform2f(e.raw.getUniformLocation(M,"resolution"),this.renderSize.x,this.renderSize.y),e.uniform1i(e.raw.getUniformLocation(M,"numOfLights"),t.lights.length),e.uniform1i(e.raw.getUniformLocation(M,"accumTexture"),0),e.uniform1i(e.raw.getUniformLocation(M,"BVH"),1),e.uniform1i(e.raw.getUniformLocation(M,"vertexIndicesTex"),2),e.uniform1i(e.raw.getUniformLocation(M,"verticesTex"),3),e.uniform1i(e.raw.getUniformLocation(M,"normalsTex"),4),e.uniform1i(e.raw.getUniformLocation(M,"materialsTex"),5),e.uniform1i(e.raw.getUniformLocation(M,"transformsTex"),6),e.uniform1i(e.raw.getUniformLocation(M,"lightsTex"),7),e.uniform1i(e.raw.getUniformLocation(M,"textureMapsArrayTex"),8),e.uniform1i(e.raw.getUniformLocation(M,"envMapTex"),9),e.uniform1i(e.raw.getUniformLocation(M,"envMapCDFTex"),10),e.uniform1i(e.raw.getUniformLocation(M,"thinFilmLutTex"),11),this.pathTraceShaderLowRes.stopUsing()}get scene(){return this._scene}async initAsync(){await super.initAsync(),this.initGPUDataBuffers()}async resizeRendererAsync(){await super.resizeRendererAsync(),this.initGPUDataBuffers()}static buildThinFilmLut(e,t,n=1.5,i=1.5){let o=[700,546,436],l=2*Math.PI,c=new Float32Array(e*t*3);function u(h,d,p){let f=Math.sqrt(Math.max(0,1-h*h)),g=d/p*f;if(g>=1)return 1;let m=Math.sqrt(Math.max(0,1-g*g)),x=(d*h-p*m)/(d*h+p*m),y=(p*h-d*m)/(p*h+d*m);return .5*(x*x+y*y)}for(let h=0;h<t;h++)for(let d=0;d<e;d++){let p=(d+.5)/e,f=(h+.5)/t*1200,g=(h*e+d)*3,x=Math.sqrt(Math.max(0,1-p*p))*1/n,y=Math.sqrt(Math.max(0,1-x*x)),b=u(p,1,n),S=1-b,v=u(y,n,i);for(let M=0;M<3;M++){let T=o[M],w=l*n*f*y/T,C=1-b*v*Math.cos(2*w),E=b*b+S*S*v+2*b*S*v*Math.cos(w);c[g+M]=Math.max(0,Math.min(1,E/Math.max(C,1e-5)))}}return c}initGPUDataBuffers(){let e=this.gl;e.pixelStorei(e.raw.PACK_ALIGNMENT,1);let t=this.scene.bvhData();this.BVHTex=this.createBufferTexture(t,3);let n=this.scene.vertIndicesData();this.vertexIndicesTex=this.createBufferTextureInt(n,3);let i=this.scene.verticesData();this.verticesTex=this.createBufferTexture(i,4);let s=this.scene.normalsData();this.normalsTex=this.createBufferTexture(s,4);{let r=this.scene.materialsData();this.materialsTex=this.createBufferTexture(r,4)}{let r=this.scene.transformsData();this.transformsTex=this.createBufferTexture(r,4)}if(this.scene.lights.length>0){let r=this.scene.lightsData();this.lightsTex=this.createBufferTexture(r,3)}if(this.scene.textures.length>0||this.scene.textureMapsArray?.length>0){let r=this.scene.textureMapsArray;this.textureMapsArrayTex=this.createBufferTextureUint(r,4)}if(this.scene.envMap){let r=this.scene.envMap;this.envMapTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGB32F,r.width,r.height,0,e.raw.RGB,e.raw.FLOAT,r.img),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.LINEAR),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.LINEAR),e.bindTexture(e.raw.TEXTURE_2D,null),this.envMapCDFTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.envMapCDFTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.R32F,r.width,r.height,0,e.raw.RED,e.raw.FLOAT,r.cdf),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.NEAREST),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.NEAREST),e.bindTexture(e.raw.TEXTURE_2D,null)}e.activeTexture(e.raw.TEXTURE1),e.bindTexture(e.raw.TEXTURE_2D,this.BVHTex),e.activeTexture(e.raw.TEXTURE2),e.bindTexture(e.raw.TEXTURE_2D,this.vertexIndicesTex),e.activeTexture(e.raw.TEXTURE3),e.bindTexture(e.raw.TEXTURE_2D,this.verticesTex),e.activeTexture(e.raw.TEXTURE4),e.bindTexture(e.raw.TEXTURE_2D,this.normalsTex),e.activeTexture(e.raw.TEXTURE5),e.bindTexture(e.raw.TEXTURE_2D,this.materialsTex),e.activeTexture(e.raw.TEXTURE6),e.bindTexture(e.raw.TEXTURE_2D,this.transformsTex),e.activeTexture(e.raw.TEXTURE7),e.bindTexture(e.raw.TEXTURE_2D,this.lightsTex),e.activeTexture(e.raw.TEXTURE8),e.bindTexture(e.raw.TEXTURE_2D,this.textureMapsArrayTex),e.activeTexture(e.raw.TEXTURE9),e.bindTexture(e.raw.TEXTURE_2D,this.envMapTex),e.activeTexture(e.raw.TEXTURE10),e.bindTexture(e.raw.TEXTURE_2D,this.envMapCDFTex);{let o=a.buildThinFilmLut(64,64);this.thinFilmLutTex&&e.deleteTexture(this.thinFilmLutTex),this.thinFilmLutTex=e.createTexture(),e.bindTexture(e.raw.TEXTURE_2D,this.thinFilmLutTex),e.texImage2D(e.raw.TEXTURE_2D,0,e.raw.RGB32F,64,64,0,e.raw.RGB,e.raw.FLOAT,o),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_S,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_WRAP_T,e.raw.CLAMP_TO_EDGE),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MAG_FILTER,e.raw.LINEAR),e.texParameteri(e.raw.TEXTURE_2D,e.raw.TEXTURE_MIN_FILTER,e.raw.LINEAR),e.bindTexture(e.raw.TEXTURE_2D,null),e.activeTexture(e.raw.TEXTURE11),e.bindTexture(e.raw.TEXTURE_2D,this.thinFilmLutTex)}}render(){let e=this.gl;if(!(!this.scene.dirty&&this.scene.renderOptions.maxSpp!==-1&&this.sampleCounter>=this.scene.renderOptions.maxSpp)){if(e.activeTexture(e.raw.TEXTURE0),this.scene.dirty)e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBOLowRes),e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)),this.quad.draw(this.pathTraceShaderLowRes),this.scene.instancesModified=!1,this.scene.dirty=!1,this.scene.envMapModified=!1;else{let t=[],n=0,i=0;e.bindFramebuffer(e.raw.FRAMEBUFFER,this.pathTraceFBO),e.viewport(0,0,this.tileWidth,this.tileHeight),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),n=performance.now(),this.quad.draw(this.pathTraceShader),i=performance.now(),t.push(`pathTraceShader: Render time: ${(i-n).toFixed(2)} ms`),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.accumFBO),e.viewport(this.tileWidth*this.tile.x,this.tileHeight*this.tile.y,this.tileWidth,this.tileHeight),e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTexture),n=performance.now(),this.quad.draw(this.outputShader),i=performance.now(),t.push(`outputShader: Render time: ${(i-n).toFixed(2)} ms`),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.tileOutputTexture[this.currentBuffer],0),e.viewport(0,0,this.renderSize.x,this.renderSize.y),e.bindTexture(e.raw.TEXTURE_2D,this.accumTexture),n=performance.now(),this.quad.draw(this.tonemapShader??this.outputShader),i=performance.now(),t.push(`tonemapShader: Render time: ${(i-n).toFixed(2)} ms`),console.info(t.join(`
`))}e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),this.scene.dirty||this.sampleCounter===1?(e.bindTexture(e.raw.TEXTURE_2D,this.pathTraceTextureLowRes),this.quad.draw(this.tonemapShader??this.outputShader)):(this.scene.renderOptions.enableDenoiser&&this.denoiserExecutedOneTime&&this.denoiserTexture?e.bindTexture(e.raw.TEXTURE_2D,this.denoiserTexture):e.bindTexture(e.raw.TEXTURE_2D,this.tileOutputTexture[1-this.currentBuffer]),this.quad.draw(this.outputShader))}async update(e,t){let n=this.gl,i=this.scene;if(!i.dirty&&i.renderOptions.maxSpp!==-1&&this.sampleCounter>=i.renderOptions.maxSpp)return;if(i.instancesModified){console.log("Updating GPU buffers for modified instances...");let r=this.scene.transformsData(),o=r.length/4,l=Math.min(sn.maxBufferTextureWidth,o),c=Math.ceil(o/l);n.bindTexture(n.raw.TEXTURE_2D,this.transformsTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGBA32F,l,c,0,n.raw.RGBA,n.raw.FLOAT,r);let u=this.scene.materialsData(),h=u.length/4,d=Math.min(sn.maxBufferTextureWidth,h),p=Math.ceil(h/d);n.bindTexture(n.raw.TEXTURE_2D,this.materialsTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGBA32F,d,p,0,n.raw.RGBA,n.raw.FLOAT,u)}if(i.envMapModified&&i.envMap){let r=i.envMap;this.envMapTex&&(n.bindTexture(n.raw.TEXTURE_2D,this.envMapTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.RGB32F,r.width,r.height,0,n.raw.RGB,n.raw.FLOAT,r.img)),this.envMapCDFTex&&(n.bindTexture(n.raw.TEXTURE_2D,this.envMapCDFTex),n.texImage2D(n.raw.TEXTURE_2D,0,n.raw.R32F,r.width,r.height,0,n.raw.RED,n.raw.FLOAT,r.cdf));let o;this.pathTraceShader&&this.pathTraceShaderLowRes&&(this.pathTraceShader.use(),o=this.pathTraceShader.getObject(),n.uniform2f(n.raw.getUniformLocation(o,"envMapRes"),i.envMap.width,i.envMap.height),n.uniform1f(n.raw.getUniformLocation(o,"envMapTotalSum"),i.envMap.totalSum),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),o=this.pathTraceShaderLowRes.getObject(),n.uniform2f(n.raw.getUniformLocation(o,"envMapRes"),i.envMap.width,i.envMap.height),n.uniform1f(n.raw.getUniformLocation(o,"envMapTotalSum"),i.envMap.totalSum),this.pathTraceShaderLowRes.stopUsing())}if(i.renderOptions.enableDenoiser&&this.sampleCounter>1&&this.backendReady&&this.denoiser){if(!this.denoised||this.frameCounter%(i.renderOptions.denoiserFrameCnt*(this.numTiles.x*this.numTiles.y))==0){if(this._denoiserRunning)return;this._denoiserRunning=!0;try{if(!this.denoiserFBO||!this.tileOutputTexture[1-this.currentBuffer]){console.warn("Denoiser: FBO ou texture de sortie non initialis\xE9e."),this._denoiserRunning=!1;return}(this.denoiserInputFramePtr===null||this.denoiserInputFramePtr.length!==this._renderSize.x*this._renderSize.y*4)&&(this.denoiserInputFramePtr=new Float32Array(this._renderSize.x*this._renderSize.y*4)),n.bindFramebuffer(n.raw.FRAMEBUFFER,this.denoiserFBO),n.framebufferTexture2D(n.raw.FRAMEBUFFER,n.raw.COLOR_ATTACHMENT0,n.raw.TEXTURE_2D,this.tileOutputTexture[1-this.currentBuffer],0),n.raw.readPixels(0,0,this._renderSize.x,this._renderSize.y,n.raw.RGBA,n.raw.FLOAT,this.denoiserInputFramePtr);for(let r=0;r<this.denoiserInputFramePtr.length;r++){let o=this.denoiserInputFramePtr[r];(!Number.isFinite(o)||isNaN(o))&&(o=0),this.denoiserInputFramePtr[r]=Math.min(Math.max(o,0),1)}this.denoised=!0,this.denoiser.width=this._renderSize.x,this.denoiser.height=this._renderSize.y,await this.denoiser.setInputData("color",this.denoiserInputFramePtr),await this.denoiser.execute()}catch(r){this.denoised=!1,console.error("Erreur denoiser:",r)}finally{this._denoiserRunning=!1}}}else this.denoised=!1;if(i.dirty){if(lt.profiling){let r=P.document.getElementById("bufferA");r?.replaceChildren(),r=P.document.getElementById("bufferB"),r?.replaceChildren(),r=P.document.getElementById("bufferC"),r?.replaceChildren(),r=P.document.getElementById("bufferD"),r?.replaceChildren(),r=P.document.getElementById("image"),r?.replaceChildren()}if(this.tile.x=-1,this.tile.y=this.numTiles.y-1,this.sampleCounter=1,this.denoised=!1,this.frameCounter=1,i.renderOptions.enableDenoiser&&this.denoiser){try{this.denoiser.abort()}catch(r){console.warn("Erreur lors de l'abandon du denoiser:",r)}this.denoiserExecutedOneTime=!1,this.denoised=!1}this.accumFBO&&(n.bindFramebuffer(n.raw.FRAMEBUFFER,this.accumFBO),n.clear(n.raw.COLOR_BUFFER_BIT),n.bindFramebuffer(n.raw.FRAMEBUFFER,null))}else lt.profiling&&this.sampleCounter<=4&&this.frameCounter>1&&(this.exportTextureToImage(this.pathTraceTexture,this.tileWidth,this.tileHeight,"bufferB"),this.exportTextureToImage(this.accumTexture,this.renderSize.x,this.renderSize.y,"bufferC"),this.exportTextureToImage(this.tileOutputTexture[this.currentBuffer],this.renderSize.x,this.renderSize.y,"bufferD"),this.exportTextureToImage(this.tileOutputTexture[1-this.currentBuffer],this.renderSize.x,this.renderSize.y,"image")),this.frameCounter++,this.tile.x++,this.tile.x>=this.numTiles.x&&(this.tile.x=0,this.tile.y--,this.tile.y<0&&(this.tile.x=0,this.tile.y=this.numTiles.y-1,this.sampleCounter++,this.currentBuffer=1-this.currentBuffer));let s;return this.pathTraceShader.use(),s=this.pathTraceShader.getObject(),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.right"),i.camera.right.x,i.camera.right.y,i.camera.right.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.up"),i.camera.up.x,i.camera.up.y,i.camera.up.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.forward"),i.camera.forward.x,i.camera.forward.y,i.camera.forward.z),n.uniform1f(n.raw.getUniformLocation(s,"camera.fov"),i.camera.fov),n.uniform1f(n.raw.getUniformLocation(s,"camera.focalDist"),i.camera.focalDist),n.uniform1f(n.raw.getUniformLocation(s,"camera.aperture"),i.camera.aperture),n.uniform1i(n.raw.getUniformLocation(s,"enableEnvMap"),i.envMap!==null&&i.renderOptions.enableEnvMap?1:0),n.uniform1f(n.raw.getUniformLocation(s,"envMapIntensity"),i.renderOptions.envMapIntensity),n.uniform1f(n.raw.getUniformLocation(s,"envMapRot"),i.renderOptions.envMapRot/360),n.uniform1i(n.raw.getUniformLocation(s,"maxDepth"),i.dirty?2:i.renderOptions.maxDepth),n.uniform2f(n.raw.getUniformLocation(s,"tileOffset"),this.tile.x*this.invNumTiles.x,this.tile.y*this.invNumTiles.y),n.uniform3f(n.raw.getUniformLocation(s,"uniformLightCol"),i.renderOptions.uniformLightCol.x,i.renderOptions.uniformLightCol.y,i.renderOptions.uniformLightCol.z),n.uniform1f(n.raw.getUniformLocation(s,"roughnessMollificationAmt"),i.renderOptions.roughnessMollificationAmt),n.uniform1i(n.raw.getUniformLocation(s,"frameNum"),this.frameCounter),this.pathTraceShader.stopUsing(),this.pathTraceShaderLowRes.use(),s=this.pathTraceShaderLowRes.getObject(),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.right"),i.camera.right.x,i.camera.right.y,i.camera.right.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.up"),i.camera.up.x,i.camera.up.y,i.camera.up.z),n.uniform3f(n.raw.getUniformLocation(s,"camera.forward"),i.camera.forward.x,i.camera.forward.y,i.camera.forward.z),n.uniform1f(n.raw.getUniformLocation(s,"camera.fov"),i.camera.fov),n.uniform1f(n.raw.getUniformLocation(s,"camera.focalDist"),i.camera.focalDist),n.uniform1f(n.raw.getUniformLocation(s,"camera.aperture"),i.camera.aperture),n.uniform1i(n.raw.getUniformLocation(s,"enableEnvMap"),i.envMap!==null&&i.renderOptions.enableEnvMap?1:0),n.uniform1f(n.raw.getUniformLocation(s,"envMapIntensity"),i.renderOptions.envMapIntensity),n.uniform1f(n.raw.getUniformLocation(s,"envMapRot"),i.renderOptions.envMapRot/360),n.uniform1i(n.raw.getUniformLocation(s,"maxDepth"),i.renderOptions.maxDepth),n.uniform3f(n.raw.getUniformLocation(s,"camera.position"),i.camera.position.x,i.camera.position.y,i.camera.position.z),n.uniform3f(n.raw.getUniformLocation(s,"uniformLightCol"),i.renderOptions.uniformLightCol.x,i.renderOptions.uniformLightCol.y,i.renderOptions.uniformLightCol.z),n.uniform1f(n.raw.getUniformLocation(s,"roughnessMollificationAmt"),i.renderOptions.roughnessMollificationAmt),this.pathTraceShaderLowRes.stopUsing(),await this.ensureTonemapShaderAsync(),this.tonemapShader&&(this.tonemapShader.use(),s=this.tonemapShader.getObject(),n.uniform1f(n.raw.getUniformLocation(s,"invSampleCounter"),1/this.sampleCounter),n.uniform1i(n.raw.getUniformLocation(s,"enableTonemap"),i.renderOptions.enableTonemap?1:0),n.uniform1i(n.raw.getUniformLocation(s,"enableAces"),i.renderOptions.enableAces?1:0),n.uniform1i(n.raw.getUniformLocation(s,"simpleAcesFit"),i.renderOptions.simpleAcesFit?1:0),n.uniform3f(n.raw.getUniformLocation(s,"backgroundCol"),i.renderOptions.backgroundCol.x,i.renderOptions.backgroundCol.y,i.renderOptions.backgroundCol.z),this.tonemapShader.stopUsing()),Promise.resolve()}};var ii=class extends sn{constructor(e){super(e)}dispose(){super.dispose();let e=this.gl;for(let t of this.scene.shadertoyShader.buffers){for(let n of t.textures)e.deleteTexture(n);for(let n of t.inputs)n.texture&&e.deleteTexture(n.texture)}this.scene.shadertoyShader.imageTexture=null;for(let t of this.scene.shadertoyShader.buffers)for(let n of t.fbos)e.deleteFramebuffer(n);for(let t of this.scene.shadertoyShader.buffers)t.shader.dispose(),t.shader=null,t.playNode&&(t.playNode.stop(),t.playNode=null)}pauseOrContinue(e){for(let t of this.scene.shadertoyShader.buffers){Ln.pauseOrContinue(t,e);for(let n of t.inputs)Ce.pauseOrContinue(n,e)}}initFBOs(){super.initFBOs_(this.scene.shadertoyShader.isGlslPathtracer);let e=this.gl;this.frameCounter=0;for(let t=0;t<this.scene.shadertoyShader.buffers.length;t++){let n=this.scene.shadertoyShader.buffers[t],i=n.inputs.some(c=>c.type===n.type);for(let c=0;c<n.inputs.length;c++){let u=n.inputs[c];u.type==="bufferA"||u.type==="bufferB"||u.type==="bufferC"||u.type==="bufferD"||u.type==="cubeA"?u.buffer=this.scene.shadertoyShader.buffers.find(h=>h.type===u.type):u.texture=Ce.createTexture(u)}let s=i,r=!1,o=this.renderSize,l=this.renderSize;this.scene.shadertoyShader.isGlslPathtracer&&(n.type==="bufferB"&&(s=!0,o=new Y(this.tileWidth,this.tileHeight),l=new Y(Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio))),n.type==="bufferD"&&(s=!0,r=!0)),Ln.createFBOAndTexture(n,s,r,o,l)}this.scene.shadertoyShader.imageTexture=this.scene.shadertoyShader.buffers.find(t=>t.type==="image").textures[0],this.scene.shadertoyShader.isGlslPathtracer&&(this.scene.shadertoyShader.pathTraceTextures=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferB").textures,this.scene.shadertoyShader.accumFramebuffers=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferC").fbos,this.scene.shadertoyShader.tileOutputTextures=this.scene.shadertoyShader.buffers.find(t=>t.type==="bufferD").textures),this.denoised&&(this.denoiserFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.denoiserFBO)),this.outputFBO=e.createFramebuffer(),e.bindFramebuffer(e.raw.FRAMEBUFFER,this.outputFBO),e.bindTexture(e.raw.TEXTURE_2D,null),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}disposeShaders(){super.disposeShaders();for(let e of this.scene.shadertoyShader.buffers)e.shader.dispose(),e.shader=null}async initShadersAsync(){Ki("shadertoy",this.scene.sceneName||"unknown"),await super.initShadersAsync();let e=this.gl,t=this.scene,[n,i,s,r]=await Promise.all([be.loadAsync(this.shadersDirectory+"shadertoy/vertex.glsl"),be.loadAsync(this.shadersDirectory+"shadertoy/fragment.glsl"),be.loadAsync(this.shadersDirectory+"shadertoy/cubeA.glsl"),be.loadAsync(this.shadersDirectory+"shadertoy/sound.glsl")]),o=this.scene.shadertoyShader.commonCode||"",l="";for(let u=0;u<this.scene.shadertoyShader.buffers.length;u++){let h=this.scene.shadertoyShader.buffers[u],d=[];for(let f=0;f<5;f++){let g=h.inputs.find(m=>m.channel===f);g?g.type==="cubemap"||g.type==="cubeA"?d.push(`uniform samplerCube iChannel${g.channel};`):g.type==="volume"?d.push(`uniform sampler3D iChannel${g.channel};`):d.push(`uniform sampler2D iChannel${g.channel};`):d.push(`uniform sampler2D iChannel${f};`)}let p;if(h.type==="cubeA"){let f={src:s.src,path:s.path,dump:s.dump};f.src=f.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",l+(o+h.code)),f.path=h.type+".glsl",p=this.loadShaders(n,f)}else if(h.type==="sound"){let f={src:r.src,path:r.path,dump:s.dump};f.src=f.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",l+(o+h.code)),f.path=h.type+".glsl",p=this.loadShaders(n,f)}else{let f={src:i.src,path:i.path,dump:i.dump};f.src=f.src.replace("##SHADERTOY_CHANNELS##",d.join(`
`)).replace("##SHADERTOY_SCENE##",l+(o+h.code)),f.path=h.type+".glsl",p=this.loadShaders(n,f)}h.shader=p}let c=await Promise.all(this.programs.map(u=>(console.log("Linking program..."),u.waitForLinkAsync(this.scene.renderOptions.forceSynchronousShaderLink))));await ji(),console.log(),this.emitSceneStage("launch","Lancement du rendu");for(let u of this.scene.shadertoyShader.buffers){let h=u.shader,d=new Date,p=[d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()*60*60+d.getMinutes()*60+d.getSeconds()+d.getMilliseconds()/1e3],f=[this.renderSize.x,this.renderSize.y];u.type==="cubeA"&&(f=[u.xres,u.yres]),h.use();let g=h.getObject();e.uniform1i(e.raw.getUniformLocation(g,"iChannel0"),0),e.uniform1i(e.raw.getUniformLocation(g,"iChannel1"),1),e.uniform1i(e.raw.getUniformLocation(g,"iChannel2"),2),e.uniform1i(e.raw.getUniformLocation(g,"iChannel3"),3),e.uniform1i(e.raw.getUniformLocation(g,"iChannel4"),4),e.uniform1f(e.raw.getUniformLocation(g,"iFrameRate"),60),e.uniform4fv(e.raw.getUniformLocation(g,"iDate"),p),e.uniform3f(e.raw.getUniformLocation(g,"iResolution"),f[0],f[1],1);let m=[0,0,0,0,0,0,0,0,0,0,0,0];u.inputs.sort((x,y)=>x.channel-y.channel).forEach((x,y)=>{x.type==="cubeA"||x.type==="texture"||x.type==="volume"||x.type==="cubemap"||x.type==="floats"?(m[x.channel*3+0]=x.xres,m[x.channel*3+1]=x.yres,m[x.channel*3+2]=1):(m[x.channel*3+0]=this.renderSize.x,m[x.channel*3+1]=this.renderSize.y,m[x.channel*3+2]=1)}),e.uniform3fv(e.raw.getUniformLocation(g,"iChannelResolution"),m),u.type==="cubeA"?e.uniform4fv(e.raw.getUniformLocation(g,"unViewport"),[0,0,u.xres,u.yres]):u.type=="sound"&&(e.uniform3fv(e.raw.getUniformLocation(g,"iChannelTime"),[0,0,0,0]),e.uniform1f(e.raw.getUniformLocation(g,"iSampleRate"),We.instance().sampleRate)),this.scene.shadertoyShader.isGlslPathtracer&&u.type==="bufferB"&&e.uniform2f(e.raw.getUniformLocation(g,"invNumTiles"),this.invNumTiles.x,this.invNumTiles.y),h.stopUsing()}}get scene(){return this._scene}render(){let e=this.gl;if(!this.scene.dirty&&this.scene.renderOptions.maxSpp!==-1&&this.sampleCounter>=this.scene.renderOptions.maxSpp)return;e.activeTexture(e.raw.TEXTURE0);for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];if(i.type!=="sound")continue;if(i.soundCompiled)break;e.activeTexture(e.raw.TEXTURE0);let s=i.fbos.length>1;i.frontIndex=s&&i.flip?1:0,e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),e.viewport(0,0,i.xres,i.yres);for(let r=0;r<i.inputs.length;r++){let o=i.inputs[r];Ce.bindTexture(o,o.buffer===i)}i.shader.use(),Ln.drawBuffer(i,i.shader.getObject()),i.shader.stopUsing();for(let r=0;r<i.inputs.length;r++){let o=i.inputs[r];Ce.unbindTexture(o)}}let t=[];for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];if(i.type==="sound")continue;let s=i.fbos.length>1||i.type==="cubeA";if(i.frontIndex=s&&i.flip?1:0,i.type==="cubeA"){let r=0,o=i.shader.getObject(),l=e.getAttribLocation(o,"pos");for(let c=0;c<6;c++){e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),e.viewport(0,0,i.xres,i.yres),e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_CUBE_MAP_POSITIVE_X+c,i.textures[i.frontIndex],0);for(let y=0;y<i.inputs.length;y++){let b=i.inputs[y];Ce.bindTexture(b,b.buffer===i)}let u=[],h=[],d=[],p=[],f=[0,0,0];c===0?(u=[1,1,1],h=[1,1,-1],d=[1,-1,-1],p=[1,-1,1]):c===1?(u=[-1,1,-1],h=[-1,1,1],d=[-1,-1,1],p=[-1,-1,-1]):c===2?(u=[-1,1,-1],h=[1,1,-1],d=[1,1,1],p=[-1,1,1]):c===3?(u=[-1,-1,1],h=[1,-1,1],d=[1,-1,-1],p=[-1,-1,-1]):c===4?(u=[-1,1,1],h=[1,1,1],d=[1,-1,1],p=[-1,-1,1]):c===5&&(u=[1,1,-1],h=[-1,1,-1],d=[-1,-1,-1],p=[1,-1,-1]);let g=[u[0],u[1],u[2],h[0],h[1],h[2],d[0],d[1],d[2],p[0],p[1],p[2],f[0],f[1],f[2]],m=performance.now();i.shader.use(),e.uniform3fv(e.raw.getUniformLocation(o,"unCorners"),g),e.drawUnitQuad_XY(l),i.shader.stopUsing();let x=performance.now();r+=x-m;for(let y=0;y<i.inputs.length;y++){let b=i.inputs[y];Ce.unbindTexture(b)}}t.push(`${i.type}: Render time: ${(r/6).toFixed(2)} ms`)}else{let r=!1;if(this.scene.shadertoyShader.isGlslPathtracer&&i.type==="bufferB"&&(e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[this.scene.dirty?1:0]),r=!0),r||e.bindFramebuffer(e.raw.FRAMEBUFFER,i.fbos[i.frontIndex]),this.scene.shadertoyShader.isGlslPathtracer&&i.type==="bufferD"&&e.framebufferTexture2D(e.raw.FRAMEBUFFER,e.raw.COLOR_ATTACHMENT0,e.raw.TEXTURE_2D,this.scene.shadertoyShader.tileOutputTextures[this.scene.dirty?0:this.currentBuffer],0),r=!1,this.scene.shadertoyShader.isGlslPathtracer&&(i.type==="bufferB"&&(this.scene.dirty?e.viewport(0,0,Math.floor(this.renderSize.x*this.pixelRatio),Math.floor(this.renderSize.y*this.pixelRatio)):e.viewport(0,0,this.tileWidth,this.tileHeight),r=!0),i.type==="bufferC"&&!this.scene.dirty&&(e.viewport(this.tileWidth*this.tile.x,this.tileHeight*this.tile.y,this.tileWidth,this.tileHeight),r=!0)),r||e.viewport(0,0,this.renderSize.x,this.renderSize.y),r=!1,this.scene.shadertoyShader.isGlslPathtracer&&(i.type==="bufferC"&&(r=!0,e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.pathTraceTextures[this.scene.dirty?1:0])),i.type==="image"&&(r=!0,e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.tileOutputTextures[this.scene.dirty?0:1-this.currentBuffer]))),!r)for(let c=0;c<i.inputs.length;c++){let u=i.inputs[c];Ce.bindTexture(u,u.buffer===i)}let o=performance.now();this.quad.draw(i.shader);let l=performance.now();t.push(`${i.type}: Render time: ${(l-o).toFixed(2)} ms`);for(let c=0;c<i.inputs.length;c++){let u=i.inputs[c];Ce.unbindTexture(u)}}}for(let n=0;n<this.scene.shadertoyShader.buffers.length;n++){let i=this.scene.shadertoyShader.buffers[n];i.flip=!i.flip}Dt.instance().eraseKeypresses(),console.info(t.join(`
`)),this.scene.dirty&&(this.scene.dirty=!1),e.bindFramebuffer(e.raw.FRAMEBUFFER,null)}present(){let e=this.gl;e.activeTexture(e.raw.TEXTURE0),e.bindTexture(e.raw.TEXTURE_2D,this.scene.shadertoyShader.imageTexture),this.quad.draw(this.outputShader)}update(e,t){let n=this.gl,i=this.scene;if(!(!i.dirty&&i.renderOptions.maxSpp!==-1&&this.sampleCounter>=i.renderOptions.maxSpp)){if(i.dirty){if(lt.profiling){let s=P.document.getElementById("bufferA");s?.replaceChildren(),s=P.document.getElementById("bufferB"),s?.replaceChildren(),s=P.document.getElementById("bufferC"),s?.replaceChildren(),s=P.document.getElementById("bufferD"),s?.replaceChildren(),s=P.document.getElementById("image"),s?.replaceChildren()}this.tile.x=-1,this.tile.y=this.numTiles.y-1,this.sampleCounter=1,this.denoised=!1,this.frameCounter=0,i.shadertoyShader?.isGlslPathtracer&&(n.bindFramebuffer(n.raw.FRAMEBUFFER,i.shadertoyShader.accumFramebuffers[0]),n.clear(n.raw.COLOR_BUFFER_BIT),n.bindFramebuffer(n.raw.FRAMEBUFFER,null))}else lt.profiling&&i.shadertoyShader?.isGlslPathtracer&&this.sampleCounter<=4&&(this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferA").textures[0],this.renderSize.x,this.renderSize.y,"bufferA"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures[0],this.tileWidth,this.tileHeight,"bufferB"),i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures.length>1&&this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferB").textures[1],this.tileWidth,this.tileHeight,"bufferB"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferC").textures[0],this.renderSize.x,this.renderSize.y,"bufferC"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferD").textures[this.currentBuffer],this.renderSize.x,this.renderSize.y,"bufferD"),this.exportTextureToImage(i.shadertoyShader.buffers.find(s=>s.type==="bufferD").textures[1-this.currentBuffer],this.renderSize.x,this.renderSize.y,"image")),this.frameCounter++,this.tile.x++,this.tile.x>=this.numTiles.x&&(this.tile.x=0,this.tile.y--,this.tile.y<0&&(this.tile.x=0,this.tile.y=this.numTiles.y-1,this.sampleCounter++,this.currentBuffer=1-this.currentBuffer));for(let s=0;s<i.shadertoyShader.buffers.length;s++){let r=i.shadertoyShader.buffers[s];r.shader.use();let o=r.shader.getObject();n.uniform1f(n.raw.getUniformLocation(o,"iTime"),e),n.uniform1f(n.raw.getUniformLocation(o,"iTimeDelta"),t),n.uniform1i(n.raw.getUniformLocation(o,"iFrame"),this.frameCounter),n.uniform4f(n.raw.getUniformLocation(o,"iMouse"),Q.movePosition.x,Q.movePosition.y,Q.downPosition.x,Q.downPosition.y),i.shadertoyShader.isGlslPathtracer&&(r.type==="bufferB"?(n.raw.uniform1i(n.raw.getUniformLocation(o,"dirty"),i.dirty?1:0),n.uniform2f(n.raw.getUniformLocation(o,"tileOffset"),i.dirty?0:this.tile.x*this.invNumTiles.x,i.dirty?0:this.tile.y*this.invNumTiles.y)):r.type==="bufferD"&&n.uniform1f(n.raw.getUniformLocation(o,"invSampleCounter"),i.dirty?1:1/this.sampleCounter)),r.shader.stopUsing()}}}};var W=class a{pmin;pmax;constructor(e,t){if(e===void 0&&t===void 0)this.pmin=new _(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),this.pmax=new _(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);else if(e!==void 0&&t===void 0)this.pmin=e.clone(),this.pmax=e.clone();else if(e!==void 0&&t!==void 0)this.pmin=_.min(e,t),this.pmax=_.max(e,t);else throw new Error("Invalid constructor arguments")}clone(){return new a(this.pmin.clone(),this.pmax.clone())}center(){return this.pmin.add(this.pmax).scale(.5)}extents(){return this.pmax.subtract(this.pmin)}surfaceArea(){let e=this.extents();return 2*(e.x*e.y+e.x*e.z+e.y*e.z)}grow(e){e instanceof _?(this.pmin=_.min(this.pmin,e),this.pmax=_.max(this.pmax,e)):e instanceof a&&(this.pmin=_.min(this.pmin,e.pmin),this.pmax=_.max(this.pmax,e.pmax))}contains(e){let t=this.extents().scale(.5);return Math.abs(this.center().x-e.x)<=t.x&&Math.abs(this.center().y-e.y)<=t.y&&Math.abs(this.center().z-e.z)<=t.z}maxdim(){let e=this.extents();return e.x>=e.y&&e.x>=e.z?0:e.y>=e.x&&e.y>=e.z?1:e.z>=e.x&&e.z>=e.y?2:0}get(e){if(e===0)return this.pmin;if(e===1)return this.pmax;throw new Error("Index out of bounds")}};function Uu(a,e){return new W(_.min(a.pmin,e.pmin),_.max(a.pmax,e.pmax))}function Bu(a,e){return new W(_.max(a.pmin,e.pmin),_.min(a.pmax,e.pmax))}var si=class{type=0;bounds=new W;index=0;startidx=null;numprims=null;lc=null;rc=null};function Sd(a){return a!==a}var Nn=class a{static kMaxPrimitivesPerLeaf=1;m_bounds=new W;m_height=0;m_nodes=[];m_nodecnt=0;m_packed_indices=[];m_indices=[];m_usesah=!0;m_num_bins=16;m_traversal_cost=1;constructor(e,t=64,n=!1){this.m_num_bins=t,this.m_usesah=n,this.m_height=0,this.m_traversal_cost=e}build(e){for(let t=0;t<e.length;++t)this.m_bounds.grow(e[t]);this.buildImpl(e,e.length)}bounds(){return this.m_bounds}initNodeAllocator(e){this.m_nodecnt=0,this.m_nodes=new Array(e);for(let t=0;t<e;++t)this.m_nodes[t]=new si}allocateNode(){return this.m_nodes[this.m_nodecnt++]}buildNode(e,t,n,i){this.m_height=Math.max(this.m_height,e.level);let s=this.allocateNode();if(s.bounds=e.bounds,s.index=e.index,e.numprims<2){s.type=1,s.startidx=this.m_packed_indices.length,s.numprims=e.numprims;for(let r=0;r<e.numprims;++r)this.m_packed_indices.push(i[e.startidx+r])}else{let r=e.centroid_bounds.maxdim(),o=e.centroid_bounds.center().get(r);if(this.m_usesah){let m=this.findSahSplit(e,t,n,i);if(!Sd(m.split)&&(r=m.dim,o=m.split,e.numprims<m.sah&&e.numprims<a.kMaxPrimitivesPerLeaf)){s.type=1,s.startidx=this.m_packed_indices.length,s.numprims=e.numprims;for(let x=0;x<e.numprims;++x)this.m_packed_indices.push(i[e.startidx+x]);e.ptr&&(e.isLeft?e.ptr.lc=s:e.ptr.rc=s);return}}s.type=0;let l=new W,c=new W,u=new W,h=new W,d=e.startidx,p=(e.numprims+e.startidx&1)!==0;if(e.centroid_bounds.extents().get(r)>0){let m=e.startidx,x=e.startidx+e.numprims;if(p)for(;;){for(;m!==x&&n[i[m]].get(r)<o;)l.grow(t[i[m]]),u.grow(n[i[m]]),++m;if(m===x--)break;for(c.grow(t[i[m]]),h.grow(n[i[m]]);m!==x&&n[i[x]].get(r)>=o;)c.grow(t[i[x]]),h.grow(n[i[x]]),--x;if(m===x)break;l.grow(t[i[x]]),u.grow(n[i[x]]),[i[m++],i[x]]=[i[x],i[m]]}else for(;;){for(;m!==x&&n[i[m]].get(r)>=o;)l.grow(t[i[m]]),u.grow(n[i[m]]),++m;if(m===x--)break;for(c.grow(t[i[m]]),h.grow(n[i[m]]);m!==x&&n[i[x]].get(r)<o;)c.grow(t[i[x]]),h.grow(n[i[x]]),--x;if(m===x)break;l.grow(t[i[x]]),u.grow(n[i[x]]),[i[m++],i[x]]=[i[x],i[m]]}d=m}if(d===e.startidx||d===e.startidx+e.numprims){d=e.startidx+(e.numprims>>1);for(let m=e.startidx;m<d;++m)l.grow(t[i[m]]),u.grow(n[i[m]]);for(let m=d;m<e.startidx+e.numprims;++m)c.grow(t[i[m]]),h.grow(n[i[m]])}let f={startidx:e.startidx,numprims:d-e.startidx,ptr:s,isLeft:!0,bounds:l,centroid_bounds:u,level:e.level+1,index:e.index<<1},g={startidx:d,numprims:e.numprims-(d-e.startidx),ptr:s,isLeft:!1,bounds:c,centroid_bounds:h,level:e.level+1,index:(e.index<<1)+1};this.buildNode(f,t,n,i),this.buildNode(g,t,n,i)}e.ptr&&(e.isLeft?e.ptr.lc=s:e.ptr.rc=s)}findSahSplit(e,t,n,i){let s=-1,r=Number.POSITIVE_INFINITY,o={dim:0,split:NaN,sah:r,overlap:0},l=e.centroid_bounds.extents();if(_.dot(l,l)===0)return o;let c=[[],[],[]];c[0]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new W,count:0})),c[1]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new W,count:0})),c[2]=Array(this.m_num_bins).fill(0).map(()=>({bounds:new W,count:0}));let u=1/e.bounds.surfaceArea(),h=e.centroid_bounds.pmin;for(let d=0;d<3;++d){let p=h.get(d),f=l.get(d),g=1/f;if(f===0)continue;for(let v=0;v<this.m_num_bins;++v)c[d][v].count=0,c[d][v].bounds=new W;for(let v=e.startidx;v<e.startidx+e.numprims;++v){let M=i[v],T=Math.min(Math.floor(this.m_num_bins*((n[M].get(d)-p)*g)),this.m_num_bins-1);c[d][T].count++,c[d][T].bounds.grow(t[M])}let m=new Array(this.m_num_bins-1),x=new W;for(let v=this.m_num_bins-1;v>0;--v)x.grow(c[d][v].bounds),m[v-1]=new W,m[v-1].pmin=x.pmin,m[v-1].pmax=x.pmax;let y=new W,b=0,S=e.numprims;for(let v=0;v<this.m_num_bins-1;++v){y.grow(c[d][v].bounds),b+=c[d][v].count,S-=c[d][v].count;let M=this.m_traversal_cost+(b*y.surfaceArea()+S*m[v].surfaceArea())*u;M<r&&(o.dim=d,s=v,o.sah=r=M)}}return s!==-1&&(o.split=h.get(o.dim)+(s+1)*(l.get(o.dim)/this.m_num_bins)),o}buildImpl(e,t){this.initNodeAllocator(2*t-1);let n=new Array(t);this.m_indices=new Array(t);for(let r=0;r<t;++r)this.m_indices[r]=r;let i=new W;for(let r=0;r<t;++r){let o=e[r].center();i.grow(o),n[r]=o}let s={startidx:0,numprims:t,ptr:null,isLeft:!1,bounds:this.m_bounds,centroid_bounds:i,level:0,index:1};this.buildNode(s,e,n,this.m_indices)}printStatistics(){console.log("Class name: Bvh"),console.log("SAH:",this.m_usesah?"enabled":"disabled"),console.log("SAH bins:",this.m_num_bins),console.log("Number of triangles:",this.m_indices.length),console.log("Number of nodes:",this.m_nodecnt),console.log("Tree height:",this.m_height)}getIndices(){return this.m_packed_indices}getNumIndices(){return this.m_packed_indices.length}};var ha=class{meshes=[];meshInstances=[];bvhRootStartIndices=[];topLevelBvh=null;curNode=0;curTriIndex=0;nodeTexWidth;nodes=[];topLevelIndex=0;processBLASNodes(e){let t=e.bounds;this.nodes[this.curNode]={bboxmin:t.pmin,bboxmax:t.pmax,LRLeaf:new _(0,0,0)};let n=this.curNode;return e.type===1?(this.nodes[this.curNode].LRLeaf.x=this.curTriIndex+e.startidx,this.nodes[this.curNode].LRLeaf.y=e.numprims,this.nodes[this.curNode].LRLeaf.z=1):(this.curNode++,this.nodes[n].LRLeaf.x=this.processBLASNodes(e.lc),this.curNode++,this.nodes[n].LRLeaf.y=this.processBLASNodes(e.rc)),n}processTLASNodes(e){let t=e.bounds;this.nodes[this.curNode]={bboxmin:t.pmin,bboxmax:t.pmax,LRLeaf:new _(0,0,0)};let n=this.curNode;if(e.type===1){if(!this.topLevelBvh)throw new Error("topLevelBvh is null");let i=this.topLevelBvh.m_packed_indices[e.startidx],s=this.meshInstances[i].meshID,r=this.meshInstances[i].materialID;this.nodes[this.curNode].LRLeaf.x=this.bvhRootStartIndices[s],this.nodes[this.curNode].LRLeaf.y=r,this.nodes[this.curNode].LRLeaf.z=-i-1}else this.curNode++,this.nodes[n].LRLeaf.x=this.processTLASNodes(e.lc),this.curNode++,this.nodes[n].LRLeaf.y=this.processTLASNodes(e.rc);return n}processBLAS(){let e=0;for(let n=0;n<this.meshes.length;n++)e+=this.meshes[n].bvh.m_nodecnt;this.topLevelIndex=e,e+=2*this.meshInstances.length,this.nodes=new Array(e);for(let n=0;n<e;++n)this.nodes[n]={bboxmin:new _(0,0,0),bboxmax:new _(0,0,0),LRLeaf:new _(0,0,0)};let t=0;this.curTriIndex=0;for(let n=0;n<this.meshes.length;n++){let i=this.meshes[n];this.curNode=t,this.bvhRootStartIndices.push(t),t+=i.bvh.m_nodecnt,this.processBLASNodes(i.bvh.m_nodes[0]),this.curTriIndex+=i.bvh.getNumIndices()}}processTLAS(){if(this.curNode=this.topLevelIndex,!this.topLevelBvh)throw new Error("topLevelBvh is null");this.processTLASNodes(this.topLevelBvh.m_nodes[0])}updateTLAS(e,t){this.topLevelBvh=e,this.meshInstances=t,this.curNode=this.topLevelIndex,this.processTLASNodes(e.m_nodes[0])}process(e,t,n){this.topLevelBvh=e,this.meshes=t,this.meshInstances=n,this.processBLAS(),this.processTLAS()}};function Ou(a,e,t,n=!1){let i=wd(a,e,t,n);return i?new Uint8Array(i.data.buffer):null}function wd(a,e,t,n=!1){let i=P.document.getElementById("textures"),s=P.document.createElement("canvas");i?.appendChild(s),s.width=e,s.height=t;let r=s.getContext("2d");return r?(n?(r.scale(1,-1),r.drawImage(a,0,-t,e,t)):r.drawImage(a,0,0,e,t),r.getImageData(0,0,e,t)):null}var V=class{x;y;z;w;constructor(e=0,t=0,n=0,i=0){e instanceof _?(this.x=e.x,this.y=e.y,this.z=e.z,this.w=t):(this.x=e,this.y=t,this.z=n,this.w=i)}get(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new RangeError("Index out of range for Vec4")}}get xyz(){return new _(this.x,this.y,this.z)}get wxy(){return new _(this.w,this.x,this.y)}toString(){return`Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`}};function Ed(a,e,t,n,i,s,r){let o=2*i,l=e-a,c=n-t,u=s-i;r[0]=o/l,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=o/c,r[6]=0,r[7]=0,r[8]=(e+a)/l,r[9]=(n+t)/c,r[10]=(-s-i)/u,r[11]=-1,r[12]=0,r[13]=0,r[14]=-o*s/u,r[15]=0}function Ad(a,e,t,n,i){let s=t*Math.tan(a*Math.PI/180),r=s*e;Ed(-r,r,-s,s,t,n,i)}function Gu(a){let e=1/(_.Length(a)+1e-7);return a.scale(1/e)}function Cd(a,e,t,n){let i=Gu(a.subtract(e)),s=Gu(_.cross(t,i)),r=_.cross(i,s);n[0]=s.x,n[1]=r.x,n[2]=i.x,n[3]=0,n[4]=s.y,n[5]=r.y,n[6]=i.y,n[7]=0,n[8]=s.z,n[9]=r.z,n[10]=i.z,n[11]=0,n[12]=-_.dot(s,a),n[13]=-_.dot(r,a),n[14]=-_.dot(i,a),n[15]=1}var ri=class a{position;pivot;worldUp;pitch;yaw;radius;fov;focalDist;aperture;isMoving=!1;forward=new _(0,0,0);right=new _(0,0,0);up=new _(0,0,0);constructor(e,t,n){this.position=e.clone(),this.pivot=t.clone(),this.worldUp=new _(0,1,0);let i=_.normalize(this.pivot.subtract(this.position));this.pitch=Math.asin(i.y)*180/Math.PI,this.yaw=Math.atan2(i.z,i.x)*180/Math.PI,this.radius=_.distance(e,t),this.fov=n*Math.PI/180,this.focalDist=.1,this.aperture=0,this.updateCamera()}clone(){let e=new a(this.position,this.pivot,this.fov*180/Math.PI);return e.pitch=this.pitch,e.yaw=this.yaw,e.radius=this.radius,e.focalDist=this.focalDist,e.aperture=this.aperture,e.isMoving=this.isMoving,e.forward=this.forward.clone(),e.right=this.right.clone(),e.up=this.up.clone(),e}offsetOrientation(e,t){this.pitch-=t,this.yaw+=e,this.updateCamera()}strafe(e,t){let n=this.right.scale(-e).add(this.up.scale(t));this.pivot=this.pivot.add(n),this.updateCamera()}setRadius(e){this.radius+=e,this.updateCamera()}setFov(e){this.fov=e*Math.PI/180}updateCamera(){let e=this.yaw*Math.PI/180,t=this.pitch*Math.PI/180,n=new _(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t));this.forward=_.normalize(n),this.position=this.pivot.add(this.forward.scale(-this.radius)),this.right=_.normalize(_.cross(this.forward,this.worldUp)),this.up=_.normalize(_.cross(this.right,this.forward))}computeViewProjectionMatrix(e,t,n){let i=this.position.add(this.forward);Cd(this.position,i,this.up,e);let s=1/n*Math.tan(this.fov/2);Ad(s*180/Math.PI,n,.1,1e3,t)}};var Th=1;var Sh=3,yi=0,Mh=1,Cs=2;var $l=1;var Hl=100;var Wl=204,Xl=205;var Yl=0,ql=1,Kl=2,us=3,jl=4,Zl=5,Jl=6,Ql=7,io=0,wh=1,Eh=2;var gc=1,xc=2,_c=3,yc=4,bc=5,vc=6,Tc=7,ec="attached",Ah="detached",Sc=300,Ch=301,Mc=302;var Rh=306,Gn=1e3,Ht=1001,hs=1002,bi=1003,wc=1004;var Ec=1005;var Qe=1006,Ac=1007;var Ri=1008;var Cc=1009;var Ct=1015,Ii=1016;var Rc=1023;var Ih=1028;var zn=2300,kn=2301,Oa=2302,tc=2303,nc=2400,ic=2401,sc=2402,Lh=2500;var Ic=0,Rs=1,Li=2;var Lc=0;var Pc="",_e="srgb",De="srgb-linear",rc="linear",Ga="srgb";var On=7680;var ac=519;var za=35044;var dn=2e3,ds=2001;function Rd(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function Id(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}function ka(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}var zu={},vi=null;function oc(...a){let e="THREE."+a.shift();vi?vi("log",e,...a):console.log(e,...a)}function Ph(a){let e=a[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=a[1];t&&t.isStackTrace?a[0]+=" "+t.getLocation():a[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return a}function ee(...a){a=Ph(a);let e="THREE."+a.shift();if(vi)vi("warn",e,...a);else{let t=a[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...a)}}function le(...a){a=Ph(a);let e="THREE."+a.shift();if(vi)vi("error",e,...a);else{let t=a[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...a)}}function lc(...a){let e=a.join(" ");e in zu||(zu[e]=!0,ee(...a))}var Ld={[Yl]:ql,[Kl]:Jl,[jl]:Ql,[us]:Zl,[ql]:Yl,[Jl]:Kl,[Ql]:jl,[Zl]:us},pn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}},Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ku=1234567,ls=Math.PI/180,Ti=180/Math.PI;function pt(){let a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[a&255]+Re[a>>8&255]+Re[a>>16&255]+Re[a>>24&255]+"-"+Re[e&255]+Re[e>>8&255]+"-"+Re[e>>16&15|64]+Re[e>>24&255]+"-"+Re[t&63|128]+Re[t>>8&255]+"-"+Re[t>>16&255]+Re[t>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function q(a,e,t){return Math.max(e,Math.min(t,a))}function Nc(a,e){return(a%e+e)%e}function Pd(a,e,t,n,i){return n+(a-e)*(i-n)/(t-e)}function Nd(a,e,t){return a!==e?(t-a)/(e-a):0}function cs(a,e,t){return(1-t)*a+t*e}function Dd(a,e,t,n){return cs(a,e,1-Math.exp(-t*n))}function Fd(a,e=1){return e-Math.abs(Nc(a,e*2)-e)}function Ud(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*(3-2*a))}function Bd(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*a*(a*(a*6-15)+10))}function Od(a,e){return a+Math.floor(Math.random()*(e-a+1))}function Gd(a,e){return a+Math.random()*(e-a)}function zd(a){return a*(.5-Math.random())}function kd(a){a!==void 0&&(ku=a);let e=ku+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Vd(a){return a*ls}function $d(a){return a*Ti}function Hd(a){return(a&a-1)===0&&a!==0}function Wd(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function Xd(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function Yd(a,e,t,n,i){let s=Math.cos,r=Math.sin,o=s(t/2),l=r(t/2),c=s((e+n)/2),u=r((e+n)/2),h=s((e-n)/2),d=r((e-n)/2),p=s((n-e)/2),f=r((n-e)/2);switch(i){case"XYX":a.set(o*u,l*h,l*d,o*c);break;case"YZY":a.set(l*d,o*u,l*h,o*c);break;case"ZXZ":a.set(l*h,l*d,o*u,o*c);break;case"XZX":a.set(o*u,l*f,l*p,o*c);break;case"YXY":a.set(l*p,o*u,l*f,o*c);break;case"ZYZ":a.set(l*f,l*p,o*u,o*c);break;default:ee("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function dt(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function ne(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}var Dc={DEG2RAD:ls,RAD2DEG:Ti,generateUUID:pt,clamp:q,euclideanModulo:Nc,mapLinear:Pd,inverseLerp:Nd,lerp:cs,damp:Dd,pingpong:Fd,smoothstep:Ud,smootherstep:Bd,randInt:Od,randFloat:Gd,randFloatSpread:zd,seededRandom:kd,degToRad:Vd,radToDeg:$d,isPowerOfTwo:Hd,ceilPowerOfTwo:Wd,floorPowerOfTwo:Xd,setQuaternionFromProperEuler:Yd,normalize:ne,denormalize:dt},re=class a{static{a.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=q(this.x,e.x,t.x),this.y=q(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=q(this.x,e,t),this.y=q(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(q(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(q(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qe=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=s[r+0],p=s[r+1],f=s[r+2],g=s[r+3];if(h!==g||l!==d||c!==p||u!==f){let m=l*d+c*p+u*f+h*g;m<0&&(d=-d,p=-p,f=-f,g=-g,m=-m);let x=1-o;if(m<.9995){let y=Math.acos(m),b=Math.sin(y);x=Math.sin(x*y)/b,o=Math.sin(o*y)/b,l=l*x+d*o,c=c*x+p*o,u=u*x+f*o,h=h*x+g*o}else{l=l*x+d*o,c=c*x+p*o,u=u*x+f*o,h=h*x+g*o;let y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,r){let o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[r],d=s[r+1],p=s[r+2],f=s[r+3];return e[t]=o*f+u*h+l*p-c*d,e[t+1]=l*f+u*d+c*h-o*p,e[t+2]=c*f+u*p+o*d-l*h,e[t+3]=u*f-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),d=l(n/2),p=l(i/2),f=l(s/2);switch(r){case"XYZ":this._x=d*u*h+c*p*f,this._y=c*p*h-d*u*f,this._z=c*u*f+d*p*h,this._w=c*u*h-d*p*f;break;case"YXZ":this._x=d*u*h+c*p*f,this._y=c*p*h-d*u*f,this._z=c*u*f-d*p*h,this._w=c*u*h+d*p*f;break;case"ZXY":this._x=d*u*h-c*p*f,this._y=c*p*h+d*u*f,this._z=c*u*f+d*p*h,this._w=c*u*h-d*p*f;break;case"ZYX":this._x=d*u*h-c*p*f,this._y=c*p*h+d*u*f,this._z=c*u*f-d*p*h,this._w=c*u*h+d*p*f;break;case"YZX":this._x=d*u*h+c*p*f,this._y=c*p*h+d*u*f,this._z=c*u*f-d*p*h,this._w=c*u*h-d*p*f;break;case"XZY":this._x=d*u*h-c*p*f,this._y=c*p*h-d*u*f,this._z=c*u*f+d*p*h,this._w=c*u*h+d*p*f;break;default:ee("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(r-i)*p}else if(n>o&&n>h){let p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(i+r)/p,this._z=(s+c)/p}else if(o>h){let p=2*Math.sqrt(1+o-n-h);this._w=(s-c)/p,this._x=(i+r)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+h-n-o);this._w=(r-i)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(q(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+r*o+i*c-s*l,this._y=i*u+r*l+s*o-n*c,this._z=s*u+r*c+n*l-i*o,this._w=r*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,r=-r,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+r*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class a{static{a.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*i-o*n),u=2*(o*t-s*i),h=2*(s*n-r*t);return this.x=t+l*c+r*h-o*u,this.y=n+l*u+o*c-s*h,this.z=i+l*h+s*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=q(this.x,e.x,t.x),this.y=q(this.y,e.y,t.y),this.z=q(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=q(this.x,e,t),this.y=q(this.y,e,t),this.z=q(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(q(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,r=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*r-n*l,this.z=n*o-i*r,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xl.copy(this).projectOnVector(e),this.sub(xl)}reflect(e){return this.sub(xl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(q(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xl=new I,Vu=new qe,$=class a{static{a.prototype.isMatrix3=!0}constructor(e,t,n,i,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,l,c)}set(e,t,n,i,s,r,o,l,c){let u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],p=n[5],f=n[8],g=i[0],m=i[3],x=i[6],y=i[1],b=i[4],S=i[7],v=i[2],M=i[5],T=i[8];return s[0]=r*g+o*y+l*v,s[3]=r*m+o*b+l*M,s[6]=r*x+o*S+l*T,s[1]=c*g+u*y+h*v,s[4]=c*m+u*b+h*M,s[7]=c*x+u*S+h*T,s[2]=d*g+p*y+f*v,s[5]=d*m+p*b+f*M,s[8]=d*x+p*S+f*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-n*s*u+n*o*l+i*s*c-i*r*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*r-o*c,d=o*l-u*s,p=c*s-r*l,f=t*h+n*d+i*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/f;return e[0]=h*g,e[1]=(i*c-u*n)*g,e[2]=(o*n-i*r)*g,e[3]=d*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-o*t)*g,e[6]=p*g,e[7]=(n*l-c*t)*g,e[8]=(r*t-n*s)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*r+c*o)+r+e,-i*c,i*l,-i*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(_l.makeScale(e,t)),this}rotate(e){return this.premultiply(_l.makeRotation(-e)),this}translate(e,t){return this.premultiply(_l.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},_l=new $,$u=new $().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hu=new $().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qd(){let a={enabled:!0,workingColorSpace:De,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Ga&&(i.r=Wt(i.r),i.g=Wt(i.g),i.b=Wt(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Ga&&(i.r=_i(i.r),i.g=_i(i.g),i.b=_i(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Pc?rc:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return lc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return lc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return a.define({[De]:{primaries:e,whitePoint:n,transfer:rc,toXYZ:$u,fromXYZ:Hu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_e},outputColorSpaceConfig:{drawingBufferColorSpace:_e}},[_e]:{primaries:e,whitePoint:n,transfer:Ga,toXYZ:$u,fromXYZ:Hu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_e}}}),a}var Ne=qd();function Wt(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function _i(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}var ai,Va=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ai===void 0&&(ai=ka("canvas")),ai.width=e.width,ai.height=e.height;let i=ai.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ai}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ka("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Wt(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Wt(t[n]/255)*255):t[n]=Wt(t[n]);return{data:t,width:e.width,height:e.height}}else return ee("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Kd=0,$a=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=pt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?s.push(yl(i[r].image)):s.push(yl(i[r]))}else s=yl(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function yl(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Va.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(ee("Texture: Unable to serialize Texture."),{})}var jd=0,bl=new I,ft=class a extends pn{constructor(e=a.DEFAULT_IMAGE,t=a.DEFAULT_MAPPING,n=Ht,i=Ht,s=Qe,r=Ri,o=Rc,l=Cc,c=a.DEFAULT_ANISOTROPY,u=Pc){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=pt(),this.name="",this.source=new $a(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(bl).x}get height(){return this.source.getSize(bl).y}get depth(){return this.source.getSize(bl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ee(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ee(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gn:e.x=e.x-Math.floor(e.x);break;case Ht:e.x=e.x<0?0:1;break;case hs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gn:e.y=e.y-Math.floor(e.y);break;case Ht:e.y=e.y<0?0:1;break;case hs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ft.DEFAULT_IMAGE=null;ft.DEFAULT_MAPPING=Sc;ft.DEFAULT_ANISOTROPY=1;var et=class a{static{a.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],f=l[9],g=l[2],m=l[6],x=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(f-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(f+m)<.1&&Math.abs(c+p+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,S=(p+1)/2,v=(x+1)/2,M=(u+d)/4,T=(h+g)/4,w=(f+m)/4;return b>S&&b>v?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=M/n,s=T/n):S>v?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=M/i,s=w/i):v<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(v),n=T/s,i=w/s),this.set(n,i,s,t),this}let y=Math.sqrt((m-f)*(m-f)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-f)/y,this.y=(h-g)/y,this.z=(d-u)/y,this.w=Math.acos((c+p+x-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=q(this.x,e.x,t.x),this.y=q(this.y,e.y,t.y),this.z=q(this.z,e.z,t.z),this.w=q(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=q(this.x,e,t),this.y=q(this.y,e,t),this.z=q(this.z,e,t),this.w=q(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(q(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var Z=class a{static{a.prototype.isMatrix4=!0}constructor(e,t,n,i,s,r,o,l,c,u,h,d,p,f,g,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,l,c,u,h,d,p,f,g,m)}set(e,t,n,i,s,r,o,l,c,u,h,d,p,f,g,m){let x=this.elements;return x[0]=e,x[4]=t,x[8]=n,x[12]=i,x[1]=s,x[5]=r,x[9]=o,x[13]=l,x[2]=c,x[6]=u,x[10]=h,x[14]=d,x[3]=p,x[7]=f,x[11]=g,x[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new a().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,i=1/oi.setFromMatrixColumn(e,0).length(),s=1/oi.setFromMatrixColumn(e,1).length(),r=1/oi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=r*u,p=r*h,f=o*u,g=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+f*c,t[5]=d-g*c,t[9]=-o*l,t[2]=g-d*c,t[6]=f+p*c,t[10]=r*l}else if(e.order==="YXZ"){let d=l*u,p=l*h,f=c*u,g=c*h;t[0]=d+g*o,t[4]=f*o-p,t[8]=r*c,t[1]=r*h,t[5]=r*u,t[9]=-o,t[2]=p*o-f,t[6]=g+d*o,t[10]=r*l}else if(e.order==="ZXY"){let d=l*u,p=l*h,f=c*u,g=c*h;t[0]=d-g*o,t[4]=-r*h,t[8]=f+p*o,t[1]=p+f*o,t[5]=r*u,t[9]=g-d*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){let d=r*u,p=r*h,f=o*u,g=o*h;t[0]=l*u,t[4]=f*c-p,t[8]=d*c+g,t[1]=l*h,t[5]=g*c+d,t[9]=p*c-f,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){let d=r*l,p=r*c,f=o*l,g=o*c;t[0]=l*u,t[4]=g-d*h,t[8]=f*h+p,t[1]=h,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+f,t[10]=d-g*h}else if(e.order==="XZY"){let d=r*l,p=r*c,f=o*l,g=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+g,t[5]=r*u,t[9]=p*h-f,t[2]=f*h-p,t[6]=o*u,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zd,e,Jd)}lookAt(e,t,n){let i=this.elements;return Xe.subVectors(e,t),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),rn.crossVectors(n,Xe),rn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),rn.crossVectors(n,Xe)),rn.normalize(),da.crossVectors(Xe,rn),i[0]=rn.x,i[4]=da.x,i[8]=Xe.x,i[1]=rn.y,i[5]=da.y,i[9]=Xe.y,i[2]=rn.z,i[6]=da.z,i[10]=Xe.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],p=n[13],f=n[2],g=n[6],m=n[10],x=n[14],y=n[3],b=n[7],S=n[11],v=n[15],M=i[0],T=i[4],w=i[8],C=i[12],E=i[1],R=i[5],N=i[9],A=i[13],F=i[2],z=i[6],k=i[10],ue=i[14],ve=i[3],X=i[7],ae=i[11],we=i[15];return s[0]=r*M+o*E+l*F+c*ve,s[4]=r*T+o*R+l*z+c*X,s[8]=r*w+o*N+l*k+c*ae,s[12]=r*C+o*A+l*ue+c*we,s[1]=u*M+h*E+d*F+p*ve,s[5]=u*T+h*R+d*z+p*X,s[9]=u*w+h*N+d*k+p*ae,s[13]=u*C+h*A+d*ue+p*we,s[2]=f*M+g*E+m*F+x*ve,s[6]=f*T+g*R+m*z+x*X,s[10]=f*w+g*N+m*k+x*ae,s[14]=f*C+g*A+m*ue+x*we,s[3]=y*M+b*E+S*F+v*ve,s[7]=y*T+b*R+S*z+v*X,s[11]=y*w+b*N+S*k+v*ae,s[15]=y*C+b*A+S*ue+v*we,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],f=e[3],g=e[7],m=e[11],x=e[15],y=l*p-c*d,b=o*p-c*h,S=o*d-l*h,v=r*p-c*u,M=r*d-l*u,T=r*h-o*u;return t*(g*y-m*b+x*S)-n*(f*y-m*v+x*M)+i*(f*b-g*v+x*T)-s*(f*S-g*M+m*T)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],f=e[12],g=e[13],m=e[14],x=e[15],y=t*o-n*r,b=t*l-i*r,S=t*c-s*r,v=n*l-i*o,M=n*c-s*o,T=i*c-s*l,w=u*g-h*f,C=u*m-d*f,E=u*x-p*f,R=h*m-d*g,N=h*x-p*g,A=d*x-p*m,F=y*A-b*N+S*R+v*E-M*C+T*w;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/F;return e[0]=(o*A-l*N+c*R)*z,e[1]=(i*N-n*A-s*R)*z,e[2]=(g*T-m*M+x*v)*z,e[3]=(d*M-h*T-p*v)*z,e[4]=(l*E-r*A-c*C)*z,e[5]=(t*A-i*E+s*C)*z,e[6]=(m*S-f*T-x*b)*z,e[7]=(u*T-d*S+p*b)*z,e[8]=(r*N-o*E+c*w)*z,e[9]=(n*E-t*N-s*w)*z,e[10]=(f*M-g*S+x*y)*z,e[11]=(h*S-u*M-p*y)*z,e[12]=(o*C-r*R-l*w)*z,e[13]=(t*R-n*C+i*w)*z,e[14]=(g*b-f*v-m*y)*z,e[15]=(u*v-h*b+d*y)*z,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,o=e.y,l=e.z,c=s*r,u=s*o;return this.set(c*r+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*r,0,c*l-i*o,u*l+i*r,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,r=t._y,o=t._z,l=t._w,c=s+s,u=r+r,h=o+o,d=s*c,p=s*u,f=s*h,g=r*u,m=r*h,x=o*h,y=l*c,b=l*u,S=l*h,v=n.x,M=n.y,T=n.z;return i[0]=(1-(g+x))*v,i[1]=(p+S)*v,i[2]=(f-b)*v,i[3]=0,i[4]=(p-S)*M,i[5]=(1-(d+x))*M,i[6]=(m+y)*M,i[7]=0,i[8]=(f+b)*T,i[9]=(m-y)*T,i[10]=(1-(d+g))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let r=oi.set(i[0],i[1],i[2]).length(),o=oi.set(i[4],i[5],i[6]).length(),l=oi.set(i[8],i[9],i[10]).length();s<0&&(r=-r),ct.copy(this);let c=1/r,u=1/o,h=1/l;return ct.elements[0]*=c,ct.elements[1]*=c,ct.elements[2]*=c,ct.elements[4]*=u,ct.elements[5]*=u,ct.elements[6]*=u,ct.elements[8]*=h,ct.elements[9]*=h,ct.elements[10]*=h,t.setFromRotationMatrix(ct),n.x=r,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,r,o=dn,l=!1){let c=this.elements,u=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),p=(n+i)/(n-i),f,g;if(l)f=s/(r-s),g=r*s/(r-s);else if(o===dn)f=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===ds)f=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,r,o=dn,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),p=-(n+i)/(n-i),f,g;if(l)f=1/(r-s),g=r/(r-s);else if(o===dn)f=-2/(r-s),g=-(r+s)/(r-s);else if(o===ds)f=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},oi=new I,ct=new Z,Zd=new I(0,0,0),Jd=new I(1,1,1),rn=new I,da=new I,Xe=new I,Wu=new Z,Xu=new qe,fn=class a{constructor(e=0,t=0,n=0,i=a.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],r=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(q(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-q(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(q(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-q(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(q(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-q(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:ee("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xu.setFromEuler(this),this.setFromQuaternion(Xu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};fn.DEFAULT_ORDER="XYZ";var Ha=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Qd=0,Yu=new I,li=new qe,Ut=new Z,pa=new I,es=new I,ep=new I,tp=new qe,qu=new I(1,0,0),Ku=new I(0,1,0),ju=new I(0,0,1),Zu={type:"added"},np={type:"removed"},ci={type:"childadded",child:null},vl={type:"childremoved",child:null},fe=class a extends pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=pt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=a.DEFAULT_UP.clone();let e=new I,t=new fn,n=new qe,i=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Z},normalMatrix:{value:new $}}),this.matrix=new Z,this.matrixWorld=new Z,this.matrixAutoUpdate=a.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=a.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ha,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.multiply(li),this}rotateOnWorldAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.premultiply(li),this}rotateX(e){return this.rotateOnAxis(qu,e)}rotateY(e){return this.rotateOnAxis(Ku,e)}rotateZ(e){return this.rotateOnAxis(ju,e)}translateOnAxis(e,t){return Yu.copy(e).applyQuaternion(this.quaternion),this.position.add(Yu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qu,e)}translateY(e){return this.translateOnAxis(Ku,e)}translateZ(e){return this.translateOnAxis(ju,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ut.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?pa.copy(e):pa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ut.lookAt(es,pa,this.up):Ut.lookAt(pa,es,this.up),this.quaternion.setFromRotationMatrix(Ut),i&&(Ut.extractRotation(i.matrixWorld),li.setFromRotationMatrix(Ut),this.quaternion.premultiply(li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(le("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zu),ci.child=e,this.dispatchEvent(ci),ci.child=null):le("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(np),vl.child=e,this.dispatchEvent(vl),vl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ut.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ut.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ut),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zu),ci.child=e,this.dispatchEvent(ci),ci.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,e,ep),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,tp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),h=r(e.shapes),d=r(e.skeletons),p=r(e.animations),f=r(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),f.length>0&&(n.nodes=f)}return n.object=i,n;function r(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};fe.DEFAULT_UP=new I(0,1,0);fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xt=class extends fe{constructor(){super(),this.isGroup=!0,this.type="Group"}};var Nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},an={h:0,s:0,l:0},fa={h:0,s:0,l:0};function Tl(a,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?a+(e-a)*6*t:t<1/2?e:t<2/3?a+(e-a)*6*(2/3-t):a}var H=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_e){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ne.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ne.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ne.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ne.workingColorSpace){if(e=Nc(e,1),t=q(t,0,1),n=q(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=Tl(r,s,e+1/3),this.g=Tl(r,s,e),this.b=Tl(r,s,e-1/3)}return Ne.colorSpaceToWorking(this,i),this}setStyle(e,t=_e){function n(s){s!==void 0&&parseFloat(s)<1&&ee("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ee("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);ee("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_e){let n=Nh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ee("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wt(e.r),this.g=Wt(e.g),this.b=Wt(e.b),this}copyLinearToSRGB(e){return this.r=_i(e.r),this.g=_i(e.g),this.b=_i(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_e){return Ne.workingToColorSpace(Ie.copy(this),e),Math.round(q(Ie.r*255,0,255))*65536+Math.round(q(Ie.g*255,0,255))*256+Math.round(q(Ie.b*255,0,255))}getHexString(e=_e){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ne.workingColorSpace){Ne.workingToColorSpace(Ie.copy(this),t);let n=Ie.r,i=Ie.g,s=Ie.b,r=Math.max(n,i,s),o=Math.min(n,i,s),l,c,u=(o+r)/2;if(o===r)l=0,c=0;else{let h=r-o;switch(c=u<=.5?h/(r+o):h/(2-r-o),r){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ne.workingColorSpace){return Ne.workingToColorSpace(Ie.copy(this),t),e.r=Ie.r,e.g=Ie.g,e.b=Ie.b,e}getStyle(e=_e){Ne.workingToColorSpace(Ie.copy(this),e);let t=Ie.r,n=Ie.g,i=Ie.b;return e!==_e?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(an),this.setHSL(an.h+e,an.s+t,an.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(an),e.getHSL(fa);let n=cs(an.h,fa.h,t),i=cs(an.s,fa.s,t),s=cs(an.l,fa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ie=new H;H.NAMES=Nh;var ut=new I,Bt=new I,Sl=new I,Ot=new I,ui=new I,hi=new I,Ju=new I,Ml=new I,wl=new I,El=new I,Al=new et,Cl=new et,Rl=new et,hn=class a{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ut.subVectors(e,t),i.cross(ut);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ut.subVectors(i,t),Bt.subVectors(n,t),Sl.subVectors(e,t);let r=ut.dot(ut),o=ut.dot(Bt),l=ut.dot(Sl),c=Bt.dot(Bt),u=Bt.dot(Sl),h=r*c-o*o;if(h===0)return s.set(0,0,0),null;let d=1/h,p=(c*l-o*u)*d,f=(r*u-o*l)*d;return s.set(1-p-f,f,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ot)===null?!1:Ot.x>=0&&Ot.y>=0&&Ot.x+Ot.y<=1}static getInterpolation(e,t,n,i,s,r,o,l){return this.getBarycoord(e,t,n,i,Ot)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ot.x),l.addScaledVector(r,Ot.y),l.addScaledVector(o,Ot.z),l)}static getInterpolatedAttribute(e,t,n,i,s,r){return Al.setScalar(0),Cl.setScalar(0),Rl.setScalar(0),Al.fromBufferAttribute(e,t),Cl.fromBufferAttribute(e,n),Rl.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(Al,s.x),r.addScaledVector(Cl,s.y),r.addScaledVector(Rl,s.z),r}static isFrontFacing(e,t,n,i){return ut.subVectors(n,t),Bt.subVectors(e,t),ut.cross(Bt).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ut.subVectors(this.c,this.b),Bt.subVectors(this.a,this.b),ut.cross(Bt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return a.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return a.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return a.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return a.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return a.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,r,o;ui.subVectors(i,n),hi.subVectors(s,n),Ml.subVectors(e,n);let l=ui.dot(Ml),c=hi.dot(Ml);if(l<=0&&c<=0)return t.copy(n);wl.subVectors(e,i);let u=ui.dot(wl),h=hi.dot(wl);if(u>=0&&h<=u)return t.copy(i);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return r=l/(l-u),t.copy(n).addScaledVector(ui,r);El.subVectors(e,s);let p=ui.dot(El),f=hi.dot(El);if(f>=0&&p<=f)return t.copy(s);let g=p*c-l*f;if(g<=0&&c>=0&&f<=0)return o=c/(c-f),t.copy(n).addScaledVector(hi,o);let m=u*f-p*h;if(m<=0&&h-u>=0&&p-f>=0)return Ju.subVectors(s,i),o=(h-u)/(h-u+(p-f)),t.copy(i).addScaledVector(Ju,o);let x=1/(m+g+d);return r=g*x,o=d*x,t.copy(n).addScaledVector(ui,r).addScaledVector(hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ke=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,ht):ht.fromBufferAttribute(s,r),ht.applyMatrix4(e.matrixWorld),this.expandByPoint(ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ma.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ma.copy(n.boundingBox)),ma.applyMatrix4(e.matrixWorld),this.union(ma)}let i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ht),ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ts),ga.subVectors(this.max,ts),di.subVectors(e.a,ts),pi.subVectors(e.b,ts),fi.subVectors(e.c,ts),on.subVectors(pi,di),ln.subVectors(fi,pi),Dn.subVectors(di,fi);let t=[0,-on.z,on.y,0,-ln.z,ln.y,0,-Dn.z,Dn.y,on.z,0,-on.x,ln.z,0,-ln.x,Dn.z,0,-Dn.x,-on.y,on.x,0,-ln.y,ln.x,0,-Dn.y,Dn.x,0];return!Il(t,di,pi,fi,ga)||(t=[1,0,0,0,1,0,0,0,1],!Il(t,di,pi,fi,ga))?!1:(xa.crossVectors(on,ln),t=[xa.x,xa.y,xa.z],Il(t,di,pi,fi,ga))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Gt=[new I,new I,new I,new I,new I,new I,new I,new I],ht=new I,ma=new Ke,di=new I,pi=new I,fi=new I,on=new I,ln=new I,Dn=new I,ts=new I,ga=new I,xa=new I,Fn=new I;function Il(a,e,t,n,i){for(let s=0,r=a.length-3;s<=r;s+=3){Fn.fromArray(a,s);let o=i.x*Math.abs(Fn.x)+i.y*Math.abs(Fn.y)+i.z*Math.abs(Fn.z),l=e.dot(Fn),c=t.dot(Fn),u=n.dot(Fn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var $t=ip();function ip(){let a=new ArrayBuffer(4),e=new Float32Array(a),t=new Uint32Array(a),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let s=new Uint32Array(2048),r=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)r[l]=l<<23;r[31]=1199570944,r[32]=2147483648;for(let l=33;l<63;++l)r[l]=2147483648+(l-32<<23);r[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:r,offsetTable:o}}function sp(a){Math.abs(a)>65504&&ee("DataUtils.toHalfFloat(): Value out of range."),a=q(a,-65504,65504),$t.floatView[0]=a;let e=$t.uint32View[0],t=e>>23&511;return $t.baseTable[t]+((e&8388607)>>$t.shiftTable[t])}function rp(a){let e=a>>10;return $t.uint32View[0]=$t.mantissaTable[$t.offsetTable[e]+(a&1023)]+$t.exponentTable[e],$t.floatView[0]}var mn=class{static toHalfFloat(e){return sp(e)}static fromHalfFloat(e){return rp(e)}},xe=new I,_a=new re,ap=0,Le=class extends pn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ap++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=za,this.updateRanges=[],this.gpuType=Ct,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_a.fromBufferAttribute(this,t),_a.applyMatrix3(e),this.setXY(t,_a.x,_a.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xe.fromBufferAttribute(this,t),xe.applyMatrix3(e),this.setXYZ(t,xe.x,xe.y,xe.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xe.fromBufferAttribute(this,t),xe.applyMatrix4(e),this.setXYZ(t,xe.x,xe.y,xe.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xe.fromBufferAttribute(this,t),xe.applyNormalMatrix(e),this.setXYZ(t,xe.x,xe.y,xe.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xe.fromBufferAttribute(this,t),xe.transformDirection(e),this.setXYZ(t,xe.x,xe.y,xe.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=dt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ne(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dt(t,this.array)),t}setX(e,t){return this.normalized&&(t=ne(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dt(t,this.array)),t}setY(e,t){return this.normalized&&(t=ne(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ne(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dt(t,this.array)),t}setW(e,t){return this.normalized&&(t=ne(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ne(t,this.array),n=ne(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ne(t,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ne(t,this.array),n=ne(n,this.array),i=ne(i,this.array),s=ne(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==za&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Wa=class extends Le{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Xa=class extends Le{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ze=class extends Le{constructor(e,t,n){super(new Float32Array(e),t,n)}},op=new Ke,ns=new I,Ll=new I,ke=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):op.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ns.subVectors(e,this.center);let t=ns.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ns,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ll.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ns.copy(e.center).add(Ll)),this.expandByPoint(ns.copy(e.center).sub(Ll))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},lp=0,Je=new Z,Pl=new fe,mi=new I,Ye=new Ke,is=new Ke,Te=new I,tt=class a extends pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=pt(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rd(e)?Xa:Wa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new $().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Je.makeRotationFromQuaternion(e),this.applyMatrix4(Je),this}rotateX(e){return Je.makeRotationX(e),this.applyMatrix4(Je),this}rotateY(e){return Je.makeRotationY(e),this.applyMatrix4(Je),this}rotateZ(e){return Je.makeRotationZ(e),this.applyMatrix4(Je),this}translate(e,t,n){return Je.makeTranslation(e,t,n),this.applyMatrix4(Je),this}scale(e,t,n){return Je.makeScale(e,t,n),this.applyMatrix4(Je),this}lookAt(e){return Pl.lookAt(e),Pl.updateMatrix(),this.applyMatrix4(Pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mi).negate(),this.translate(mi.x,mi.y,mi.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ze(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&ee("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ke);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Ye.setFromBufferAttribute(s),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ke);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let o=t[s];is.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Ye.min,is.min),Ye.expandByPoint(Te),Te.addVectors(Ye.max,is.max),Ye.expandByPoint(Te)):(Ye.expandByPoint(is.min),Ye.expandByPoint(is.max))}Ye.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Te.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Te));if(t)for(let s=0,r=t.length;s<r;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Te.fromBufferAttribute(o,c),l&&(mi.fromBufferAttribute(e,c),Te.add(mi)),i=Math.max(i,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Le(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let w=0;w<n.count;w++)o[w]=new I,l[w]=new I;let c=new I,u=new I,h=new I,d=new re,p=new re,f=new re,g=new I,m=new I;function x(w,C,E){c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,C),h.fromBufferAttribute(n,E),d.fromBufferAttribute(s,w),p.fromBufferAttribute(s,C),f.fromBufferAttribute(s,E),u.sub(c),h.sub(c),p.sub(d),f.sub(d);let R=1/(p.x*f.y-f.x*p.y);isFinite(R)&&(g.copy(u).multiplyScalar(f.y).addScaledVector(h,-p.y).multiplyScalar(R),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-f.x).multiplyScalar(R),o[w].add(g),o[C].add(g),o[E].add(g),l[w].add(m),l[C].add(m),l[E].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let w=0,C=y.length;w<C;++w){let E=y[w],R=E.start,N=E.count;for(let A=R,F=R+N;A<F;A+=3)x(e.getX(A+0),e.getX(A+1),e.getX(A+2))}let b=new I,S=new I,v=new I,M=new I;function T(w){v.fromBufferAttribute(i,w),M.copy(v);let C=o[w];b.copy(C),b.sub(v.multiplyScalar(v.dot(C))).normalize(),S.crossVectors(M,C);let R=S.dot(l[w])<0?-1:1;r.setXYZW(w,b.x,b.y,b.z,R)}for(let w=0,C=y.length;w<C;++w){let E=y[w],R=E.start,N=E.count;for(let A=R,F=R+N;A<F;A+=3)T(e.getX(A+0)),T(e.getX(A+1)),T(e.getX(A+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Le(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new I,s=new I,r=new I,o=new I,l=new I,c=new I,u=new I,h=new I;if(e)for(let d=0,p=e.count;d<p;d+=3){let f=e.getX(d+0),g=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,f),s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,m),u.subVectors(r,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,f),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),u.subVectors(r,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Te.fromBufferAttribute(e,t),Te.normalize(),e.setXYZ(t,Te.x,Te.y,Te.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u),p=0,f=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let x=0;x<u;x++)d[f++]=c[p++]}return new Le(d,u,h)}if(this.index===null)return ee("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new a,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){let d=c[u],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let r=e.groups;for(let c=0,u=r.length;c<u;c++){let h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Si=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=za,this.updateRanges=[],this.version=0,this.uuid=pt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Pe=new I,Mi=class a{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pe.fromBufferAttribute(this,t),Pe.applyMatrix4(e),this.setXYZ(t,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pe.fromBufferAttribute(this,t),Pe.applyNormalMatrix(e),this.setXYZ(t,Pe.x,Pe.y,Pe.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pe.fromBufferAttribute(this,t),Pe.transformDirection(e),this.setXYZ(t,Pe.x,Pe.y,Pe.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=dt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ne(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ne(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ne(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ne(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=dt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=dt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=dt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=dt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ne(t,this.array),n=ne(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ne(t,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ne(t,this.array),n=ne(n,this.array),i=ne(i,this.array),s=ne(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){oc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Le(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new a(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){oc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},cp=0,Fe=class extends pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=pt(),this.name="",this.type="Material",this.blending=$l,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wl,this.blendDst=Xl,this.blendEquation=Hl,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new H(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ac,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=On,this.stencilZFail=On,this.stencilZPass=On,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ee(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ee(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$l&&(n.blending=this.blending),this.side!==yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wl&&(n.blendSrc=this.blendSrc),this.blendDst!==Xl&&(n.blendDst=this.blendDst),this.blendEquation!==Hl&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==us&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ac&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==On&&(n.stencilFail=this.stencilFail),this.stencilZFail!==On&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==On&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let r=[];for(let o in s){let l=s[o];delete l.metadata,r.push(l)}return r}if(t){let s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var zt=new I,Nl=new I,ya=new I,cn=new I,Dl=new I,ba=new I,Fl=new I,Vn=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zt.copy(this.origin).addScaledVector(this.direction,t),zt.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Nl.copy(e).add(t).multiplyScalar(.5),ya.copy(t).sub(e).normalize(),cn.copy(this.origin).sub(Nl);let s=e.distanceTo(t)*.5,r=-this.direction.dot(ya),o=cn.dot(this.direction),l=-cn.dot(ya),c=cn.lengthSq(),u=Math.abs(1-r*r),h,d,p,f;if(u>0)if(h=r*l-o,d=r*o-l,f=s*u,h>=0)if(d>=-f)if(d<=f){let g=1/u;h*=g,d*=g,p=h*(h+r*d+2*o)+d*(r*h+d+2*l)+c}else d=s,h=Math.max(0,-(r*d+o)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(r*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-f?(h=Math.max(0,-(-r*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=f?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(r*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=r>0?-s:s,h=Math.max(0,-(r*d+o)),p=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Nl).addScaledVector(ya,d),p}intersectSphere(e,t){zt.subVectors(e.center,this.origin);let n=zt.dot(this.direction),i=zt.dot(zt)-n*n,s=e.radius*e.radius;if(i>s)return null;let r=Math.sqrt(s-i),o=n-r,l=n+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,r=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,r=(e.min.y-d.y)*u),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,zt)!==null}intersectTriangle(e,t,n,i,s){Dl.subVectors(t,e),ba.subVectors(n,e),Fl.crossVectors(Dl,ba);let r=this.direction.dot(Fl),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;cn.subVectors(this.origin,e);let l=o*this.direction.dot(ba.crossVectors(cn,ba));if(l<0)return null;let c=o*this.direction.dot(Dl.cross(cn));if(c<0||l+c>r)return null;let u=-o*cn.dot(Fl);return u<0?null:this.at(u/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Tt=class extends Fe{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new H(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=io,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Qu=new Z,Un=new Vn,va=new ke,eh=new I,Ta=new I,Sa=new I,Ma=new I,Ul=new I,wa=new I,th=new I,Ea=new I,mt=class extends fe{constructor(e=new tt,t=new Tt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){wa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],h=s[l];u!==0&&(Ul.fromBufferAttribute(h,e),r?wa.addScaledVector(Ul,u):wa.addScaledVector(Ul.sub(t),u))}t.add(wa)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),va.copy(n.boundingSphere),va.applyMatrix4(s),Un.copy(e.ray).recast(e.near),!(va.containsPoint(Un.origin)===!1&&(Un.intersectSphere(va,eh)===null||Un.origin.distanceToSquared(eh)>(e.far-e.near)**2))&&(Qu.copy(s).invert(),Un.copy(e.ray).applyMatrix4(Qu),!(n.boundingBox!==null&&Un.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Un)))}_computeIntersections(e,t,n){let i,s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let f=0,g=d.length;f<g;f++){let m=d[f],x=r[m.materialIndex],y=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,v=b;S<v;S+=3){let M=o.getX(S),T=o.getX(S+1),w=o.getX(S+2);i=Aa(this,x,e,n,c,u,h,M,T,w),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let f=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=f,x=g;m<x;m+=3){let y=o.getX(m),b=o.getX(m+1),S=o.getX(m+2);i=Aa(this,r,e,n,c,u,h,y,b,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let f=0,g=d.length;f<g;f++){let m=d[f],x=r[m.materialIndex],y=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,v=b;S<v;S+=3){let M=S,T=S+1,w=S+2;i=Aa(this,x,e,n,c,u,h,M,T,w),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let f=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=f,x=g;m<x;m+=3){let y=m,b=m+1,S=m+2;i=Aa(this,r,e,n,c,u,h,y,b,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function up(a,e,t,n,i,s,r,o){let l;if(e.side===Mh?l=n.intersectTriangle(r,s,i,!0,o):l=n.intersectTriangle(i,s,r,e.side===yi,o),l===null)return null;Ea.copy(o),Ea.applyMatrix4(a.matrixWorld);let c=t.ray.origin.distanceTo(Ea);return c<t.near||c>t.far?null:{distance:c,point:Ea.clone(),object:a}}function Aa(a,e,t,n,i,s,r,o,l,c){a.getVertexPosition(o,Ta),a.getVertexPosition(l,Sa),a.getVertexPosition(c,Ma);let u=up(a,e,t,n,Ta,Sa,Ma,th);if(u){let h=new I;hn.getBarycoord(th,Ta,Sa,Ma,h),i&&(u.uv=hn.getInterpolatedAttribute(i,o,l,c,h,new re)),s&&(u.uv1=hn.getInterpolatedAttribute(s,o,l,c,h,new re)),r&&(u.normal=hn.getInterpolatedAttribute(r,o,l,c,h,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new I,materialIndex:0};hn.getNormal(Ta,Sa,Ma,d.normal),u.face=d,u.barycoord=h}return u}var ss=new et,nh=new et,ih=new et,hp=new et,sh=new Z,Ca=new I,Bl=new ke,rh=new Z,Ol=new Vn,ps=class extends mt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ec,this.bindMatrix=new Z,this.bindMatrixInverse=new Z,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ke),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ca),this.boundingBox.expandByPoint(Ca)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ke),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ca),this.boundingSphere.expandByPoint(Ca)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bl.copy(this.boundingSphere),Bl.applyMatrix4(i),e.ray.intersectsSphere(Bl)!==!1&&(rh.copy(i).invert(),Ol.copy(e.ray).applyMatrix4(rh),!(this.boundingBox!==null&&Ol.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ol)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ec?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ah?this.bindMatrixInverse.copy(this.bindMatrix).invert():ee("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;nh.fromBufferAttribute(i.attributes.skinIndex,e),ih.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(ss.copy(t),t.set(0,0,0,0)):(ss.set(...t,1),t.set(0,0,0)),ss.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let r=ih.getComponent(s);if(r!==0){let o=nh.getComponent(s);sh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(hp.copy(ss).applyMatrix4(sh),r)}}return t.isVector4&&(t.w=ss.w),t.applyMatrix4(this.bindMatrixInverse)}},wi=class extends fe{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ei=class extends ft{constructor(e=null,t=1,n=1,i,s,r,o,l,c=bi,u=bi,h,d){super(null,r,o,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ah=new Z,dp=new Z,fs=class a{constructor(e=[],t=[]){this.uuid=pt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ee("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Z)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Z;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){let o=e[s]?e[s].matrixWorld:dp;ah.multiplyMatrices(o,t[s]),ah.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new a(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ei(t,e,e,Rc,Ct);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],r=t[s];r===void 0&&(ee("Skeleton: No bone found with UUID:",s),r=new wi),this.bones.push(r),this.boneInverses.push(new Z().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let r=t[i];e.bones.push(r.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},gn=class extends Le{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},gi=new Z,oh=new Z,Ra=[],lh=new Ke,pp=new Z,rs=new mt,as=new ke,ms=class extends mt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gn(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,pp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ke),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gi),lh.copy(e.boundingBox).applyMatrix4(gi),this.boundingBox.union(lh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ke),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gi),as.copy(e.boundingSphere).applyMatrix4(gi),this.boundingSphere.union(as)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),as.copy(this.boundingSphere),as.applyMatrix4(n),e.ray.intersectsSphere(as)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,gi),oh.multiplyMatrices(n,gi),rs.matrixWorld=oh,rs.raycast(e,Ra);for(let r=0,o=Ra.length;r<o;r++){let l=Ra[r];l.instanceId=s,l.object=this,t.push(l)}Ra.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ei(new Float32Array(i*this.count),i,this.count,Ih,Ct));let s=this.morphTexture.source.data.data,r=0;for(let c=0;c<n.length;c++)r+=n[c];let o=this.geometry.morphTargetsRelative?1:1-r,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Gl=new I,fp=new I,mp=new $,Vt=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Gl.subVectors(n,t).cross(fp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Gl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||mp.getNormalMatrix(e),i=this.coplanarPoint(Gl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bn=new ke,gp=new re(.5,.5),Ia=new I,Ya=class{constructor(e=new Vt,t=new Vt,n=new Vt,i=new Vt,s=new Vt,r=new Vt){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn,n=!1){let i=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],p=s[7],f=s[8],g=s[9],m=s[10],x=s[11],y=s[12],b=s[13],S=s[14],v=s[15];if(i[0].setComponents(c-r,p-u,x-f,v-y).normalize(),i[1].setComponents(c+r,p+u,x+f,v+y).normalize(),i[2].setComponents(c+o,p+h,x+g,v+b).normalize(),i[3].setComponents(c-o,p-h,x-g,v-b).normalize(),n)i[4].setComponents(l,d,m,S).normalize(),i[5].setComponents(c-l,p-d,x-m,v-S).normalize();else if(i[4].setComponents(c-l,p-d,x-m,v-S).normalize(),t===dn)i[5].setComponents(c+l,p+d,x+m,v+S).normalize();else if(t===ds)i[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bn)}intersectsSprite(e){Bn.center.set(0,0,0);let t=gp.distanceTo(e.center);return Bn.radius=.7071067811865476+t,Bn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bn)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ia.x=i.normal.x>0?e.max.x:e.min.x,Ia.y=i.normal.y>0?e.max.y:e.min.y,Ia.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ia)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var St=class extends Fe{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new H(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},qa=new I,Ka=new I,ch=new Z,os=new Vn,La=new ke,zl=new I,uh=new I,$n=class extends fe{constructor(e=new tt,t=new St){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)qa.fromBufferAttribute(t,i-1),Ka.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=qa.distanceTo(Ka);e.setAttribute("lineDistance",new ze(n,1))}else ee("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(i),La.radius+=s,e.ray.intersectsSphere(La)===!1)return;ch.copy(i).invert(),os.copy(e.ray).applyMatrix4(ch);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let p=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let g=p,m=f-1;g<m;g+=c){let x=u.getX(g),y=u.getX(g+1),b=Pa(this,e,os,l,x,y,g);b&&t.push(b)}if(this.isLineLoop){let g=u.getX(f-1),m=u.getX(p),x=Pa(this,e,os,l,g,m,f-1);x&&t.push(x)}}else{let p=Math.max(0,r.start),f=Math.min(d.count,r.start+r.count);for(let g=p,m=f-1;g<m;g+=c){let x=Pa(this,e,os,l,g,g+1,g);x&&t.push(x)}if(this.isLineLoop){let g=Pa(this,e,os,l,f-1,p,f-1);g&&t.push(g)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Pa(a,e,t,n,i,s,r){let o=a.geometry.attributes.position;if(qa.fromBufferAttribute(o,i),Ka.fromBufferAttribute(o,s),t.distanceSqToSegment(qa,Ka,zl,uh)>n)return;zl.applyMatrix4(a.matrixWorld);let c=e.ray.origin.distanceTo(zl);if(!(c<e.near||c>e.far))return{distance:c,point:uh.clone().applyMatrix4(a.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:a}}var hh=new I,dh=new I,xn=class extends $n{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)hh.fromBufferAttribute(t,i),dh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+hh.distanceTo(dh);e.setAttribute("lineDistance",new ze(n,1))}else ee("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},gs=class extends $n{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},gt=class extends Fe{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new H(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ph=new Z,cc=new Vn,Na=new ke,Da=new I,Yt=class extends fe{constructor(e=new tt,t=new gt){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere),Na.applyMatrix4(i),Na.radius+=s,e.ray.intersectsSphere(Na)===!1)return;ph.copy(i).invert(),cc.copy(e.ray).applyMatrix4(ph);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let f=d,g=p;f<g;f++){let m=c.getX(f);Da.fromBufferAttribute(h,m),fh(Da,m,l,i,e,t,this)}}else{let d=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let f=d,g=p;f<g;f++)Da.fromBufferAttribute(h,f),fh(Da,f,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function fh(a,e,t,n,i,s,r){let o=cc.distanceSqToPoint(a);if(o<t){let l=new I;cc.closestPointToPoint(a,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}function Dh(a){let e={};for(let t in a){e[t]={};for(let n in a[t]){let i=a[t][n];if(mh(i))i.isRenderTargetTexture?(ee("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(mh(i[0])){let s=[];for(let r=0,o=i.length;r<o;r++)s[r]=i[r].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Ue(a){let e={};for(let t=0;t<a.length;t++){let n=Dh(a[t]);for(let i in n)e[i]=n[i]}return e}function mh(a){return a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)}var Hn=class extends Fe{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new H(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new H(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ve=class extends Hn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return q(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new H(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new H(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new H(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},xs=class extends Fe{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new H(16777215),this.specular=new H(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new H(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=io,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Fa(a,e){return!a||a.constructor===e?a:typeof e.BYTES_PER_ELEMENT=="number"?new e(a):Array.prototype.slice.call(a)}function xp(a){function e(i,s){return a[i]-a[s]}let t=a.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function gh(a,e,t){let n=a.length,i=new a.constructor(n);for(let s=0,r=0;r!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)i[r++]=a[o+l]}return i}function Fh(a,e,t,n){let i=1,s=a[0];for(;s!==void 0&&s[n]===void 0;)s=a[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push(...r)),s=a[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=a[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=a[i++];while(s!==void 0)}var Mt=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let r;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}r=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}r=n,n=0;break t}break n}for(;n<r;){let o=n+r>>>1;e<t[o]?r=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ja=class extends Mt{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nc,endingEnd:nc}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,r=e+1,o=i[s],l=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case ic:s=e,o=2*t-n;break;case sc:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ic:r=e,l=2*n-t;break;case sc:r=1,l=n+i[1]-i[0];break;default:r=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=r*u}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,f=(n-t)/(i-t),g=f*f,m=g*f,x=-d*m+2*d*g-d*f,y=(1+d)*m+(-1.5-2*d)*g+(-.5+d)*f+1,b=(-1-p)*m+(1.5+p)*g+.5*f,S=p*m-p*g;for(let v=0;v!==o;++v)s[v]=x*r[u+v]+y*r[c+v]+b*r[l+v]+S*r[h+v];return s}},Za=class extends Mt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)s[d]=r[c+d]*h+r[l+d]*u;return s}},Ja=class extends Mt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Qa=class extends Mt{interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){let g=(n-t)/(i-t),m=1-g;for(let x=0;x!==o;++x)s[x]=r[c+x]*m+r[l+x]*g;return s}let p=o*2,f=e-1;for(let g=0;g!==o;++g){let m=r[c+g],x=r[l+g],y=f*p+g*2,b=d[y],S=d[y+1],v=e*p+g*2,M=h[v],T=h[v+1],w=(n-t)/(i-t),C,E,R,N,A;for(let F=0;F<8;F++){C=w*w,E=C*w,R=1-w,N=R*R,A=N*R;let k=A*t+3*N*w*b+3*R*C*M+E*i-n;if(Math.abs(k)<1e-10)break;let ue=3*N*(b-t)+6*R*w*(M-b)+3*C*(i-M);if(Math.abs(ue)<1e-10)break;w=w-k/ue,w=Math.max(0,Math.min(1,w))}s[g]=A*m+3*N*w*S+3*R*C*T+E*x}return s}},$e=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fa(t,this.TimeBufferType),this.values=Fa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Fa(e.times,Array),values:Fa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Qa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case zn:t=this.InterpolantFactoryMethodDiscrete;break;case kn:t=this.InterpolantFactoryMethodLinear;break;case Oa:t=this.InterpolantFactoryMethodSmooth;break;case tc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ee("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zn;case this.InterpolantFactoryMethodLinear:return kn;case this.InterpolantFactoryMethodSmooth:return Oa;case this.InterpolantFactoryMethodBezier:return tc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(le("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(le("KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){le("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(r!==null&&r>l){le("KeyframeTrack: Out of order keys.",this,o,l,r),e=!1;break}r=l}if(i!==void 0&&Id(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){le("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Oa,s=e.length-1,r=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{let h=o*n,d=h-n,p=h+n;for(let f=0;f!==n;++f){let g=t[h+f];if(g!==t[d+f]||g!==t[p+f]){l=!0;break}}}if(l){if(o!==r){e[r]=e[o];let h=o*n,d=r*n;for(let p=0;p!==n;++p)t[d+p]=t[h+p]}++r}}if(s>0){e[r]=e[s];for(let o=s*n,l=r*n,c=0;c!==n;++c)t[l+c]=t[o+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};$e.prototype.ValueTypeName="";$e.prototype.TimeBufferType=Float32Array;$e.prototype.ValueBufferType=Float32Array;$e.prototype.DefaultInterpolation=kn;var qt=class extends $e{constructor(e,t,n){super(e,t,n)}};qt.prototype.ValueTypeName="bool";qt.prototype.ValueBufferType=Array;qt.prototype.DefaultInterpolation=zn;qt.prototype.InterpolantFactoryMethodLinear=void 0;qt.prototype.InterpolantFactoryMethodSmooth=void 0;var _s=class extends $e{constructor(e,t,n,i){super(e,t,n,i)}};_s.prototype.ValueTypeName="color";var wt=class extends $e{constructor(e,t,n,i){super(e,t,n,i)}};wt.prototype.ValueTypeName="number";var eo=class extends Mt{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let u=c+o;c!==u;c+=4)qe.slerpFlat(s,0,r,c-o,r,c,l);return s}},Et=class extends $e{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new eo(this.times,this.values,this.getValueSize(),e)}};Et.prototype.ValueTypeName="quaternion";Et.prototype.InterpolantFactoryMethodSmooth=void 0;var Kt=class extends $e{constructor(e,t,n){super(e,t,n)}};Kt.prototype.ValueTypeName="string";Kt.prototype.ValueBufferType=Array;Kt.prototype.DefaultInterpolation=zn;Kt.prototype.InterpolantFactoryMethodLinear=void 0;Kt.prototype.InterpolantFactoryMethodSmooth=void 0;var At=class extends $e{constructor(e,t,n,i){super(e,t,n,i)}};At.prototype.ValueTypeName="vector";var ys=class{constructor(e="",t=-1,n=[],i=Lh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=pt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,o=n.length;r!==o;++r)t.push(yp(n[r]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,r=n.length;s!==r;++s)t.push($e.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,r=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let u=xp(l);l=gh(l,1,u),c=gh(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),r.push(new wt(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(s);if(u&&u.length>1){let h=u[1],d=i[h];d||(i[h]=d=[]),d.push(c)}}let r=[];for(let o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return r}static parseAnimation(e,t){if(ee("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return le("AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,p,f,g){if(p.length!==0){let m=[],x=[];Fh(p,m,x,f),m.length!==0&&g.push(new h(d,m,x))}},i=[],s=e.name||"default",r=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},f;for(f=0;f<d.length;f++)if(d[f].morphTargets)for(let g=0;g<d[f].morphTargets.length;g++)p[d[f].morphTargets[g]]=-1;for(let g in p){let m=[],x=[];for(let y=0;y!==d[f].morphTargets.length;++y){let b=d[f];m.push(b.time),x.push(b.morphTarget===g?1:0)}i.push(new wt(".morphTargetInfluence["+g+"]",m,x))}l=p.length*r}else{let p=".bones["+t[h].name+"]";n(At,p+".position",d,"pos",i),n(Et,p+".quaternion",d,"rot",i),n(At,p+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function _p(a){switch(a.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return wt;case"vector":case"vector2":case"vector3":case"vector4":return At;case"color":return _s;case"quaternion":return Et;case"bool":case"boolean":return qt;case"string":return Kt}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+a)}function yp(a){if(a.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=_p(a.type);if(a.times===void 0){let t=[],n=[];Fh(a.keys,t,n,"value"),a.times=t,a.values=n}return e.parse!==void 0?e.parse(a):new e(a.name,a.times,a.values,a.interpolation)}var vt={enabled:!1,files:{},add:function(a,e){this.enabled!==!1&&(xh(a)||(this.files[a]=e))},get:function(a){if(this.enabled!==!1&&!xh(a))return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}};function xh(a){try{let e=a.slice(a.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var to=class{constructor(e,t,n){let i=this,s=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,r,o),s=!0},this.itemEnd=function(u){r++,i.onProgress!==void 0&&i.onProgress(u,r,o),r===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let p=c[h],f=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return f}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Uh=new to,je=class{constructor(e){this.manager=e!==void 0?e:Uh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};je.DEFAULT_MATERIAL_NAME="__DEFAULT";var kt={},uc=class extends Error{constructor(e,t){super(e),this.response=t}},jt=class extends je{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=vt.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(kt[e]!==void 0){kt[e].push({onLoad:t,onProgress:n,onError:i});return}kt[e]=[],kt[e].push({onLoad:t,onProgress:n,onError:i});let r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&ee("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=kt[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=d?parseInt(d):0,f=p!==0,g=0,m=new ReadableStream({start(x){y();function y(){h.read().then(({done:b,value:S})=>{if(b)x.close();else{g+=S.byteLength;let v=new ProgressEvent("progress",{lengthComputable:f,loaded:g,total:p});for(let M=0,T=u.length;M<T;M++){let w=u[M];w.onProgress&&w.onProgress(v)}x.enqueue(S),y()}},b=>{x.error(b)})}}});return new Response(m)}else throw new uc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(f=>p.decode(f))}}}).then(c=>{vt.add(`file:${e}`,c);let u=kt[e];delete kt[e];for(let h=0,d=u.length;h<d;h++){let p=u[h];p.onLoad&&p.onLoad(c)}}).catch(c=>{let u=kt[e];if(u===void 0)throw this.manager.itemError(e),c;delete kt[e];for(let h=0,d=u.length;h<d;h++){let p=u[h];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var xi=new WeakMap,no=class extends je{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=vt.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);else{let h=xi.get(r);h===void 0&&(h=[],xi.set(r,h)),h.push({onLoad:t,onError:i})}return r}let o=ka("img");function l(){u(),t&&t(this);let h=xi.get(this)||[];for(let d=0;d<h.length;d++){let p=h[d];p.onLoad&&p.onLoad(this)}xi.delete(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),vt.remove(`image:${e}`);let d=xi.get(this)||[];for(let p=0;p<d.length;p++){let f=d[p];f.onError&&f.onError(h)}xi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),vt.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var bs=class extends je{constructor(e){super(e)}load(e,t,n,i){let s=this,r=new Ei,o=new jt(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(u){i!==void 0?i(u):le(u);return}c.image!==void 0?r.image=c.image:c.data!==void 0&&(r.image.width=c.width,r.image.height=c.height,r.image.data=c.data),r.wrapS=c.wrapS!==void 0?c.wrapS:Ht,r.wrapT=c.wrapT!==void 0?c.wrapT:Ht,r.magFilter=c.magFilter!==void 0?c.magFilter:Qe,r.minFilter=c.minFilter!==void 0?c.minFilter:Qe,r.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(r.colorSpace=c.colorSpace),c.flipY!==void 0&&(r.flipY=c.flipY),c.format!==void 0&&(r.format=c.format),c.type!==void 0&&(r.type=c.type),c.mipmaps!==void 0&&(r.mipmaps=c.mipmaps,r.minFilter=Ri),c.mipmapCount===1&&(r.minFilter=Qe),c.generateMipmaps!==void 0&&(r.generateMipmaps=c.generateMipmaps),r.needsUpdate=!0,t&&t(r,c)},n,i),r}},vs=class extends je{constructor(e){super(e)}load(e,t,n,i){let s=new ft,r=new no(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Ai=class extends fe{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new H(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var kl=new Z,_h=new I,yh=new I,Ts=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=Cc,this.map=null,this.mapPass=null,this.matrix=new Z,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ya,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;_h.setFromMatrixPosition(e.matrixWorld),t.position.copy(_h),yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yh),t.updateMatrixWorld(),kl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ds||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ua=new I,Ba=new qe,bt=new I,Ss=class extends fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Z,this.projectionMatrix=new Z,this.projectionMatrixInverse=new Z,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ua,Ba,bt),bt.x===1&&bt.y===1&&bt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,Ba,bt.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ua,Ba,bt),bt.x===1&&bt.y===1&&bt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,Ba,bt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},un=new I,bh=new re,vh=new re,Wn=class extends Ss{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ti*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ls*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ti*2*Math.atan(Math.tan(ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(un.x,un.y).multiplyScalar(-e/un.z),un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(un.x,un.y).multiplyScalar(-e/un.z)}getViewSize(e,t){return this.getViewBounds(e,bh,vh),t.subVectors(vh,bh)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ls*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/l,t-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},hc=class extends Ts{constructor(){super(new Wn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ti*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Ms=class extends Ai{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.target=new fe,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new hc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},dc=class extends Ts{constructor(){super(new Wn(90,1,.5,500)),this.isPointLightShadow=!0}},ws=class extends Ai{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new dc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ci=class extends Ss{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,r=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},pc=class extends Ts{constructor(){super(new Ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Es=class extends Ai{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.target=new fe,this.shadow=new pc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Zt=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Vl=new WeakMap,As=class extends je{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ee("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ee("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=vt.get(`image-bitmap:${e}`);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{Vl.has(r)===!0?(i&&i(Vl.get(r)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){vt.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),Vl.set(l,c),vt.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});vt.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Fc="\\[\\]\\.:\\/",bp=new RegExp("["+Fc+"]","g"),Uc="[^"+Fc+"]",vp="[^"+Fc.replace("\\.","")+"]",Tp=/((?:WC+[\/:])*)/.source.replace("WC",Uc),Sp=/(WCOD+)?/.source.replace("WCOD",vp),Mp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uc),wp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uc),Ep=new RegExp("^"+Tp+Sp+Mp+wp+"$"),Ap=["material","materials","bones","map"],fc=class{constructor(e,t,n){let i=n||oe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},oe=class a{constructor(e,t,n){this.path=t,this.parsedPath=n||a.parseTrackName(t),this.node=a.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new a.Composite(e,t,n):new a(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(bp,"")}static parseTrackName(e){let t=Ep.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Ap.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=a.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ee("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){le("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){le("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){le("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let r=e[i];if(r===void 0){let c=t.nodeName;le("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=fc;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Bx=new Float32Array(1);var mc=class a{static{a.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?ee("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");var Cp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rp=`#ifdef USE_ALPHAHASH
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
#endif`,Ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Np=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dp=`#ifdef USE_AOMAP
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
#endif`,Fp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Up=`#ifdef USE_BATCHING
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
#endif`,Bp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Op=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kp=`#ifdef USE_IRIDESCENCE
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
#endif`,Vp=`#ifdef USE_BUMPMAP
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
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Zp=`#define PI 3.141592653589793
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
} // validated`,Jp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qp=`vec3 transformedNormal = objectNormal;
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
#endif`,ef=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rf="gl_FragColor = linearToOutputTexel( gl_FragColor );",af=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,of=`#ifdef USE_ENVMAP
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
#endif`,lf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cf=`#ifdef USE_ENVMAP
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
#endif`,uf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
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
#endif`,df=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ff=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gf=`#ifdef USE_GRADIENTMAP
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
}`,xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_f=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,vf=`#ifdef USE_ENVMAP
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
#endif`,Tf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ef=`PhysicalMaterial material;
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
#endif`,Af=`uniform sampler2D dfgLUT;
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
}`,Cf=`
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
#endif`,Rf=`#if defined( RE_IndirectDiffuse )
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
#endif`,If=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Df=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ff=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Of=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gf=`#if defined( USE_POINTS_UV )
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
#endif`,zf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$f=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wf=`#ifdef USE_MORPHTARGETS
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
#endif`,Xf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jf=`#ifdef USE_NORMALMAP
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
#endif`,Qf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,im=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,am=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,om=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,fm=`float getShadowMask() {
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
}`,mm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gm=`#ifdef USE_SKINNING
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
#endif`,xm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_m=`#ifdef USE_SKINNING
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
#endif`,ym=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sm=`#ifdef USE_TRANSMISSION
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
#endif`,Mm=`#ifdef USE_TRANSMISSION
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
#endif`,wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Rm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Im=`uniform sampler2D t2D;
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fm=`#include <common>
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
}`,Um=`#if DEPTH_PACKING == 3200
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
}`,Bm=`#define DISTANCE
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
}`,Om=`#define DISTANCE
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
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,km=`uniform float scale;
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
}`,Vm=`uniform vec3 diffuse;
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
}`,$m=`#include <common>
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
}`,Hm=`uniform vec3 diffuse;
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
}`,Wm=`#define LAMBERT
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
}`,Xm=`#define LAMBERT
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
}`,Ym=`#define MATCAP
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
}`,qm=`#define MATCAP
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
}`,Km=`#define NORMAL
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
}`,jm=`#define NORMAL
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
}`,Zm=`#define PHONG
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
}`,Jm=`#define PHONG
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
}`,Qm=`#define STANDARD
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
}`,eg=`#define STANDARD
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
}`,tg=`#define TOON
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
}`,ng=`#define TOON
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
}`,ig=`uniform float size;
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
}`,sg=`uniform vec3 diffuse;
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
}`,rg=`#include <common>
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
}`,ag=`uniform vec3 color;
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
}`,og=`uniform float rotation;
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
}`,lg=`uniform vec3 diffuse;
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
}`,j={alphahash_fragment:Cp,alphahash_pars_fragment:Rp,alphamap_fragment:Ip,alphamap_pars_fragment:Lp,alphatest_fragment:Pp,alphatest_pars_fragment:Np,aomap_fragment:Dp,aomap_pars_fragment:Fp,batching_pars_vertex:Up,batching_vertex:Bp,begin_vertex:Op,beginnormal_vertex:Gp,bsdfs:zp,iridescence_fragment:kp,bumpmap_pars_fragment:Vp,clipping_planes_fragment:$p,clipping_planes_pars_fragment:Hp,clipping_planes_pars_vertex:Wp,clipping_planes_vertex:Xp,color_fragment:Yp,color_pars_fragment:qp,color_pars_vertex:Kp,color_vertex:jp,common:Zp,cube_uv_reflection_fragment:Jp,defaultnormal_vertex:Qp,displacementmap_pars_vertex:ef,displacementmap_vertex:tf,emissivemap_fragment:nf,emissivemap_pars_fragment:sf,colorspace_fragment:rf,colorspace_pars_fragment:af,envmap_fragment:of,envmap_common_pars_fragment:lf,envmap_pars_fragment:cf,envmap_pars_vertex:uf,envmap_physical_pars_fragment:vf,envmap_vertex:hf,fog_vertex:df,fog_pars_vertex:pf,fog_fragment:ff,fog_pars_fragment:mf,gradientmap_pars_fragment:gf,lightmap_pars_fragment:xf,lights_lambert_fragment:_f,lights_lambert_pars_fragment:yf,lights_pars_begin:bf,lights_toon_fragment:Tf,lights_toon_pars_fragment:Sf,lights_phong_fragment:Mf,lights_phong_pars_fragment:wf,lights_physical_fragment:Ef,lights_physical_pars_fragment:Af,lights_fragment_begin:Cf,lights_fragment_maps:Rf,lights_fragment_end:If,lightprobes_pars_fragment:Lf,logdepthbuf_fragment:Pf,logdepthbuf_pars_fragment:Nf,logdepthbuf_pars_vertex:Df,logdepthbuf_vertex:Ff,map_fragment:Uf,map_pars_fragment:Bf,map_particle_fragment:Of,map_particle_pars_fragment:Gf,metalnessmap_fragment:zf,metalnessmap_pars_fragment:kf,morphinstance_vertex:Vf,morphcolor_vertex:$f,morphnormal_vertex:Hf,morphtarget_pars_vertex:Wf,morphtarget_vertex:Xf,normal_fragment_begin:Yf,normal_fragment_maps:qf,normal_pars_fragment:Kf,normal_pars_vertex:jf,normal_vertex:Zf,normalmap_pars_fragment:Jf,clearcoat_normal_fragment_begin:Qf,clearcoat_normal_fragment_maps:em,clearcoat_pars_fragment:tm,iridescence_pars_fragment:nm,opaque_fragment:im,packing:sm,premultiplied_alpha_fragment:rm,project_vertex:am,dithering_fragment:om,dithering_pars_fragment:lm,roughnessmap_fragment:cm,roughnessmap_pars_fragment:um,shadowmap_pars_fragment:hm,shadowmap_pars_vertex:dm,shadowmap_vertex:pm,shadowmask_pars_fragment:fm,skinbase_vertex:mm,skinning_pars_vertex:gm,skinning_vertex:xm,skinnormal_vertex:_m,specularmap_fragment:ym,specularmap_pars_fragment:bm,tonemapping_fragment:vm,tonemapping_pars_fragment:Tm,transmission_fragment:Sm,transmission_pars_fragment:Mm,uv_pars_fragment:wm,uv_pars_vertex:Em,uv_vertex:Am,worldpos_vertex:Cm,background_vert:Rm,background_frag:Im,backgroundCube_vert:Lm,backgroundCube_frag:Pm,cube_vert:Nm,cube_frag:Dm,depth_vert:Fm,depth_frag:Um,distance_vert:Bm,distance_frag:Om,equirect_vert:Gm,equirect_frag:zm,linedashed_vert:km,linedashed_frag:Vm,meshbasic_vert:$m,meshbasic_frag:Hm,meshlambert_vert:Wm,meshlambert_frag:Xm,meshmatcap_vert:Ym,meshmatcap_frag:qm,meshnormal_vert:Km,meshnormal_frag:jm,meshphong_vert:Zm,meshphong_frag:Jm,meshphysical_vert:Qm,meshphysical_frag:eg,meshtoon_vert:tg,meshtoon_frag:ng,points_vert:ig,points_frag:sg,shadow_vert:rg,shadow_frag:ag,sprite_vert:og,sprite_frag:lg},U={common:{diffuse:{value:new H(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $},alphaMap:{value:null},alphaMapTransform:{value:new $},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $}},envmap:{envMap:{value:null},envMapRotation:{value:new $},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new H(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new H(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $},alphaTest:{value:0},uvTransform:{value:new $}},sprite:{diffuse:{value:new H(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $},alphaMap:{value:null},alphaMapTransform:{value:new $},alphaTest:{value:0}}},Bh={basic:{uniforms:Ue([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.fog]),vertexShader:j.meshbasic_vert,fragmentShader:j.meshbasic_frag},lambert:{uniforms:Ue([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new H(0)},envMapIntensity:{value:1}}]),vertexShader:j.meshlambert_vert,fragmentShader:j.meshlambert_frag},phong:{uniforms:Ue([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new H(0)},specular:{value:new H(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:j.meshphong_vert,fragmentShader:j.meshphong_frag},standard:{uniforms:Ue([U.common,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.roughnessmap,U.metalnessmap,U.fog,U.lights,{emissive:{value:new H(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:j.meshphysical_vert,fragmentShader:j.meshphysical_frag},toon:{uniforms:Ue([U.common,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.gradientmap,U.fog,U.lights,{emissive:{value:new H(0)}}]),vertexShader:j.meshtoon_vert,fragmentShader:j.meshtoon_frag},matcap:{uniforms:Ue([U.common,U.bumpmap,U.normalmap,U.displacementmap,U.fog,{matcap:{value:null}}]),vertexShader:j.meshmatcap_vert,fragmentShader:j.meshmatcap_frag},points:{uniforms:Ue([U.points,U.fog]),vertexShader:j.points_vert,fragmentShader:j.points_frag},dashed:{uniforms:Ue([U.common,U.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:j.linedashed_vert,fragmentShader:j.linedashed_frag},depth:{uniforms:Ue([U.common,U.displacementmap]),vertexShader:j.depth_vert,fragmentShader:j.depth_frag},normal:{uniforms:Ue([U.common,U.bumpmap,U.normalmap,U.displacementmap,{opacity:{value:1}}]),vertexShader:j.meshnormal_vert,fragmentShader:j.meshnormal_frag},sprite:{uniforms:Ue([U.sprite,U.fog]),vertexShader:j.sprite_vert,fragmentShader:j.sprite_frag},background:{uniforms:{uvTransform:{value:new $},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:j.background_vert,fragmentShader:j.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $}},vertexShader:j.backgroundCube_vert,fragmentShader:j.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:j.cube_vert,fragmentShader:j.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:j.equirect_vert,fragmentShader:j.equirect_frag},distance:{uniforms:Ue([U.common,U.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:j.distance_vert,fragmentShader:j.distance_frag},shadow:{uniforms:Ue([U.lights,U.fog,{color:{value:new H(0)},opacity:{value:1}}]),vertexShader:j.shadow_vert,fragmentShader:j.shadow_frag}};Bh.physical={uniforms:Ue([Bh.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $},sheen:{value:0},sheenColor:{value:new H(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $},attenuationDistance:{value:0},attenuationColor:{value:new H(0)},specularColor:{value:new H(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $}}]),vertexShader:j.meshphysical_vert,fragmentShader:j.meshphysical_frag};var cg=new $;cg.set(-1,0,0,0,1,0,0,0,1);var JT={[gc]:"LINEAR_TONE_MAPPING",[xc]:"REINHARD_TONE_MAPPING",[_c]:"CINEON_TONE_MAPPING",[yc]:"ACES_FILMIC_TONE_MAPPING",[vc]:"AGX_TONE_MAPPING",[Tc]:"NEUTRAL_TONE_MAPPING",[bc]:"CUSTOM_TONE_MAPPING"};var QT=new Float32Array(16),eS=new Float32Array(9),tS=new Float32Array(4);var nS={[gc]:"Linear",[xc]:"Reinhard",[_c]:"Cineon",[yc]:"ACESFilmic",[vc]:"AgX",[Tc]:"Neutral",[bc]:"Custom"};var iS={[Th]:"SHADOWMAP_TYPE_PCF",[Sh]:"SHADOWMAP_TYPE_VSM"};var sS={[Ch]:"ENVMAP_TYPE_CUBE",[Mc]:"ENVMAP_TYPE_CUBE",[Rh]:"ENVMAP_TYPE_CUBE_UV"};var rS={[Mc]:"ENVMAP_MODE_REFRACTION"};var aS={[io]:"ENVMAP_BLENDING_MULTIPLY",[wh]:"ENVMAP_BLENDING_MIX",[Eh]:"ENVMAP_BLENDING_ADD"};var ug=new $;ug.set(-1,0,0,0,1,0,0,0,1);var oS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);var so=class extends bs{constructor(e){super(e),this.type=Ii}parse(e){let r=function(w,C){switch(w){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(C||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(C||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(C||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(C||""))}},h=function(w,C,E){C=C||1024;let N=w.pos,A=-1,F=0,z="",k=String.fromCharCode.apply(null,new Uint16Array(w.subarray(N,N+128)));for(;0>(A=k.indexOf(`
`))&&F<C&&N<w.byteLength;)z+=k,F+=k.length,N+=128,k=String.fromCharCode.apply(null,new Uint16Array(w.subarray(N,N+128)));return-1<A?(E!==!1&&(w.pos+=F+A+1),z+k.slice(0,A)):!1},d=function(w){let C=/^#\?(\S+)/,E=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,R=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,N=/^\s*FORMAT=(\S+)\s*$/,A=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,F={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},z,k;for((w.pos>=w.byteLength||!(z=h(w)))&&r(1,"no header found"),(k=z.match(C))||r(3,"bad initial token"),F.valid|=1,F.programtype=k[1],F.string+=z+`
`;z=h(w),z!==!1;){if(F.string+=z+`
`,z.charAt(0)==="#"){F.comments+=z+`
`;continue}if((k=z.match(E))&&(F.gamma=parseFloat(k[1])),(k=z.match(R))&&(F.exposure=parseFloat(k[1])),(k=z.match(N))&&(F.valid|=2,F.format=k[1]),(k=z.match(A))&&(F.valid|=4,F.height=parseInt(k[1],10),F.width=parseInt(k[2],10)),F.valid&2&&F.valid&4)break}return F.valid&2||r(3,"missing format specifier"),F.valid&4||r(3,"missing image size specifier"),F},p=function(w,C,E){let R=C;if(R<8||R>32767||w[0]!==2||w[1]!==2||w[2]&128)return new Uint8Array(w);R!==(w[2]<<8|w[3])&&r(3,"wrong scanline width");let N=new Uint8Array(4*C*E);N.length||r(4,"unable to allocate buffer space");let A=0,F=0,z=4*R,k=new Uint8Array(4),ue=new Uint8Array(z),ve=E;for(;ve>0&&F<w.byteLength;){F+4>w.byteLength&&r(1),k[0]=w[F++],k[1]=w[F++],k[2]=w[F++],k[3]=w[F++],(k[0]!=2||k[1]!=2||(k[2]<<8|k[3])!=R)&&r(3,"bad rgbe scanline format");let X=0,ae;for(;X<z&&F<w.byteLength;){ae=w[F++];let Ee=ae>128;if(Ee&&(ae-=128),(ae===0||X+ae>z)&&r(3,"bad scanline data"),Ee){let Ae=w[F++];for(let Pt=0;Pt<ae;Pt++)ue[X++]=Ae}else ue.set(w.subarray(F,F+ae),X),X+=ae,F+=ae}let we=R;for(let Ee=0;Ee<we;Ee++){let Ae=0;N[A]=ue[Ee+Ae],Ae+=R,N[A+1]=ue[Ee+Ae],Ae+=R,N[A+2]=ue[Ee+Ae],Ae+=R,N[A+3]=ue[Ee+Ae],A+=4}ve--}return N},f=function(w,C,E,R){let N=w[C+3],A=Math.pow(2,N-128)/255;E[R+0]=w[C+0]*A,E[R+1]=w[C+1]*A,E[R+2]=w[C+2]*A,E[R+3]=1},g=function(w,C,E,R){let N=w[C+3],A=Math.pow(2,N-128)/255;E[R+0]=mn.toHalfFloat(Math.min(w[C+0]*A,65504)),E[R+1]=mn.toHalfFloat(Math.min(w[C+1]*A,65504)),E[R+2]=mn.toHalfFloat(Math.min(w[C+2]*A,65504)),E[R+3]=mn.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let x=d(m),y=x.width,b=x.height,S=p(m.subarray(m.pos),y,b),v,M,T;switch(this.type){case Ct:T=S.length/4;let w=new Float32Array(T*4);for(let E=0;E<T;E++)f(S,E*4,w,E*4);v=w,M=Ct;break;case Ii:T=S.length/4;let C=new Uint16Array(T*4);for(let E=0;E<T;E++)g(S,E*4,C,E*4);v=C,M=Ii;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:y,height:b,data:v,header:x.string,gamma:x.gamma,exposure:x.exposure,type:M}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(r,o){switch(r.type){case Ct:case Ii:r.colorSpace=De,r.minFilter=Qe,r.magFilter=Qe,r.generateMipmaps=!1,r.flipY=!0;break}t&&t(r,o)}return super.load(e,s,n,i)}};var ro=class{static async loadHDRAsync(e){let n=await(await se(e)).arrayBuffer(),s=new so().setDataType(Ct).parse(n),r=s.data,o=new Float32Array(s.width*s.height*3);for(let l=0,c=0;l<r.length;l+=4,c+=3)o[c+0]=r[l+0],o[c+1]=r[l+1],o[c+2]=r[l+2];return[o,s.width,s.height]}};function hg(a,e,t){return .212671*a+.71516*e+.072169*t}var Is=class{width;height;img;cdf;totalSum;constructor(){this.width=0,this.height=0,this.img=null,this.cdf=null,this.totalSum=0}dispose(){this.img=null,this.cdf=null}buildCDF(){if(!this.img||!this.width||!this.height)return;let e=new Float32Array(this.width*this.height);for(let t=0;t<this.height;t++)for(let n=0;n<this.width;n++){let i=t*this.width*3+n*3;e[n+t*this.width]=hg(this.img[i+0],this.img[i+1],this.img[i+2])}this.cdf=new Float32Array(this.width*this.height),this.cdf[0]=e[0];for(let t=1;t<this.width*this.height;t++)this.cdf[t]=this.cdf[t-1]+e[t];this.totalSum=this.cdf[this.width*this.height-1]}async loadMapAsync(e){return[this.img,this.width,this.height]=await ro.loadHDRAsync(e),this.img==null?!1:(this.buildCDF(),!0)}};var nt=class{name;baseWeight=1;baseDiffuseRoughness=0;baseColor=new _(1,1,1);specularColor=new _(1,1,1);coatColor=new _(1,1,1);anisotropic=0;emission=new _(0,0,0);padding1=0;metallic=0;roughness=.5;subsurface=0;specularTint=0;sheen=0;sheenTint=0;clearcoat=0;clearcoatGloss=0;coatIOR=1.6;coatRoughnessAnisotropy=0;coatDarkening=1;specTrans=0;ior=1.5;baseColorTexID=-1;metallicRoughnessTexID=-1;normalmapTexID=-1;emissionmapTexID=-1;displacementTexID=-1;opacity=1;alphaMode=0;alphaCutoff=0;doubleSided=0;mediumType=0;mediumScattering=0;mediumColor=new _(1,1,1);mediumAnisotropy=0;mediumAbsorption=0;mediumThickness=1;subsurfaceRadiusScale=new _(1,1,1);fuzzColor=new _(-1,-1,-1);fuzzRoughness=.5;dispersionScale=0;abbeNumber=50;thinWalled=0;transmissionColor=new _(1,1,1);thinFilmWeight=0;thinFilmThickness=0;thinFilmIor=1.5;uvScale=new Y(1,1);specularWeight=1;anisotropyRotation=0;coatAnisotropyRotation=0;coatAffectRoughness=0;transmissionExtraRoughness=0;materialType=0;constructor(){}toVec4Array(){return[new V(this.baseColor.x,this.baseColor.y,this.baseColor.z,this.anisotropic),new V(this.emission.x,this.emission.y,this.emission.z,this.mediumThickness),new V(this.metallic,this.roughness,this.subsurface,this.specularTint),new V(this.sheen,this.sheenTint,this.clearcoat,this.clearcoatGloss),new V(this.specTrans,this.ior,this.mediumType,this.mediumScattering),new V(this.mediumColor.x,this.mediumColor.y,this.mediumColor.z,this.mediumAnisotropy),new V(this.baseColorTexID,this.metallicRoughnessTexID,this.normalmapTexID,this.emissionmapTexID),new V(this.opacity,this.alphaMode,this.alphaCutoff,this.doubleSided),new V(this.mediumAbsorption,this.baseWeight,this.baseDiffuseRoughness,this.coatDarkening),new V(this.specularColor.x,this.specularColor.y,this.specularColor.z,this.coatIOR),new V(this.coatColor.x,this.coatColor.y,this.coatColor.z,this.coatRoughnessAnisotropy),new V(this.transmissionColor.x,this.transmissionColor.y,this.transmissionColor.z,this.thinWalled),new V(this.subsurfaceRadiusScale.x,this.subsurfaceRadiusScale.y,this.subsurfaceRadiusScale.z,this.fuzzColor.x),new V(this.fuzzRoughness,this.dispersionScale,this.abbeNumber,this.fuzzColor.y),new V(this.thinFilmWeight,this.thinFilmThickness,this.thinFilmIor,this.fuzzColor.z),new V(this.uvScale.x,this.uvScale.y,this.specularWeight,this.anisotropyRotation),new V(this.coatAnisotropyRotation,this.coatAffectRoughness,this.transmissionExtraRoughness,this.materialType),new V(this.displacementTexID,0,0,0)]}copyTo(e){Object.assign(e,this)}};var ao=class extends Nn{m_max_split_depth;m_num_nodes_for_regular;m_num_nodes_required;m_extra_refs_budget;m_min_overlap;m_num_nodes_archived;m_node_archive=[];constructor(e,t,n,i,s){super(e,t,!0),this.m_max_split_depth=n,this.m_min_overlap=i,this.m_extra_refs_budget=s,this.m_num_nodes_required=0,this.m_num_nodes_for_regular=0,this.m_num_nodes_archived=0}buildImpl(e,t){let n=new Array(t),i=new Array(t),s=new W;for(let o=0;o<t;++o){let l=e[o].center();n[o]={bounds:e[o],center:l,idx:o},s.grow(l)}this.m_num_nodes_for_regular=2*t-1,this.m_num_nodes_required=Math.floor(this.m_num_nodes_for_regular*(1+this.m_extra_refs_budget)),this.initNodeAllocator(this.m_num_nodes_required);let r={startidx:0,numprims:t,ptr:null,isLeft:!1,bounds:this.m_bounds,centroid_bounds:s,level:0,index:0};this.buildNodeSplit(r,n)}buildNodeSplit(e,t){this.m_height=Math.max(this.m_height,e.level);let n=this.allocateNode();if(n.bounds=e.bounds,e.numprims<4){n.type=1,n.startidx=this.m_packed_indices.length,n.numprims=e.numprims;for(let i=e.startidx;i<e.startidx+e.numprims;++i)this.m_packed_indices.push(t[i].idx)}else{n.type=0;let i=e.centroid_bounds.maxdim(),s=e.centroid_bounds.center().get(i),r=this.findObjectSahSplit(e,t),o={dim:0,split:NaN,sah:Number.MAX_VALUE,overlap:0},l=0;if(e.level<this.m_max_split_depth&&this.m_nodecnt<this.m_num_nodes_required&&r.overlap>this.m_min_overlap&&(o=this.findSpatialSahSplit(e,t),!isNaN(o.split)&&o.sah<r.sah&&(l=1)),l===1){let v=e.startidx+e.numprims*2;t.length<v&&(t.length=v);let M=0;this.splitPrimRefs(o,e,t,T=>{M=T}),e.numprims+=M,s=o.split,i=o.dim}else s=isNaN(r.split)?s:r.split,i=isNaN(r.split)?i:r.dim;let c=new W,u=new W,h=new W,d=new W,p=e.startidx,f=e.numprims+e.startidx&1,g=(v,M)=>v<M,m=(v,M)=>v>=M,x=f?g:m,y=f?m:g;if(e.centroid_bounds.extents().get(i)>0){let v=e.startidx,M=e.startidx+e.numprims;for(;;){for(;v!==M&&x(t[v].center.get(i),s);)c.grow(t[v].bounds),h.grow(t[v].center),++v;if(v===M--)break;for(u.grow(t[v].bounds),d.grow(t[v].center);v!==M&&y(t[M].center.get(i),s);)u.grow(t[M].bounds),d.grow(t[M].center),--M;if(v===M)break;c.grow(t[M].bounds),h.grow(t[M].center),[t[v++],t[M]]=[t[M],t[v]]}p=v}if(p===e.startidx||p===e.startidx+e.numprims){p=e.startidx+(e.numprims>>1);for(let v=e.startidx;v<p;++v)c.grow(t[v].bounds),h.grow(t[v].center);for(let v=p;v<e.startidx+e.numprims;++v)u.grow(t[v].bounds),d.grow(t[v].center)}let b={startidx:e.startidx,numprims:p-e.startidx,ptr:n,isLeft:!0,bounds:c,centroid_bounds:h,level:e.level+1,index:0},S={startidx:p,numprims:e.numprims-(p-e.startidx),ptr:n,isLeft:!1,bounds:u,centroid_bounds:d,level:e.level+1,index:0};this.buildNodeSplit(S,t),this.buildNodeSplit(b,t)}e.ptr&&(e.isLeft?e.ptr.lc=n:e.ptr.rc=n)}findObjectSahSplit(e,t){let n=-1,i=Number.MAX_VALUE,s={dim:0,split:NaN,sah:i,overlap:0},r=e.centroid_bounds.extents();if(_.dot(r,r)===0)return s;let o=[[],[],[]];o[0]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new W,count:0})),o[1]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new W,count:0})),o[2]=Array(this.m_num_bins).fill(null).map(()=>({bounds:new W,count:0}));let l=1/e.bounds.surfaceArea(),c=e.centroid_bounds.pmin;for(let u=0;u<3;++u){let h=c.get(u),d=r.get(u),p=1/d;if(d===0)continue;for(let b=0;b<this.m_num_bins;++b)o[u][b].count=0,o[u][b].bounds=new W;for(let b=e.startidx;b<e.startidx+e.numprims;++b){let S=b,v=Math.min(Math.floor(this.m_num_bins*((t[S].center.get(u)-h)*p)),this.m_num_bins-1);o[u][v].count++,o[u][v].bounds.grow(t[S].bounds)}let f=new Array(this.m_num_bins-1),g=new W;for(let b=this.m_num_bins-1;b>0;--b)g.grow(o[u][b].bounds),f[b-1]=g.clone();let m=new W,x=0,y=e.numprims;for(let b=0;b<this.m_num_bins-1;++b){m.grow(o[u][b].bounds),x+=o[u][b].count,y-=o[u][b].count;let S=this.m_traversal_cost+(x*m.surfaceArea()+y*f[b].surfaceArea())*l;S<i&&(s.dim=u,n=b,i=S,s.overlap=Bu(m,f[b]).surfaceArea()*l)}}return n!==-1&&(s.split=c.get(s.dim)+(n+1)*(r.get(s.dim)/this.m_num_bins),s.sah=i),s}findSpatialSahSplit(e,t){let s={dim:0,split:NaN,sah:Number.MAX_VALUE,overlap:0},r=e.bounds.extents(),o=1/e.bounds.surfaceArea();if(_.dot(r,r)===0)return s;let l=[[],[],[]];for(let p=0;p<3;++p)l[p]=Array(128).fill(null).map(()=>({bounds:new W,enter:0,exit:0}));let c=e.bounds.pmin,u=e.bounds.extents().scale(1/128),h=new _(1/u.x,1/u.y,1/u.z);for(let p=e.startidx;p<e.startidx+e.numprims;++p){let f=t[p],g=_.clamp(f.bounds.pmin.subtract(c).multiply(h),new _(0,0,0),new _(127,127,127)),m=_.clamp(f.bounds.pmax.subtract(c).multiply(h),g,new _(127,127,127));for(let x=0;x<3;++x){if(r.get(x)===0)continue;let y=f;for(let b=g.get(x);b<m.get(x);++b){let S={...y},v={...y},M=c.get(x)+u.get(x)*(b+1);this.splitPrimRef(y,x,M,S,v)&&(l[x][b].bounds.grow(S.bounds),y=v)}l[x][m.get(x)].bounds.grow(y.bounds),l[x][g.get(x)].enter++,l[x][m.get(x)].exit++}}let d=new Array(127);for(let p=0;p<3;++p){if(r.get(p)===0)continue;let f=new W;for(let y=127;y>0;--y)f=Uu(f,l[p][y].bounds),d[y-1]=f.clone();let g=new W,m=0,x=e.numprims;for(let y=1;y<128;++y){g.grow(l[p][y-1].bounds),m+=l[p][y-1].enter,x-=l[p][y-1].exit;let b=this.m_traversal_cost+(g.surfaceArea()+d[y-1].surfaceArea()*x)*o;b<s.sah&&(s.sah=b,s.dim=p,s.split=c.get(p)+u.get(p)*y,s.overlap=0)}}return s}splitPrimRef(e,t,n,i,s){return i.idx=s.idx=e.idx,i.bounds=e.bounds.clone(),s.bounds=e.bounds.clone(),n>e.bounds.pmin.get(t)&&n<e.bounds.pmax.get(t)?(i.bounds.pmax.set(t,n),s.bounds.pmin.set(t,n),!0):!1}splitPrimRefs(e,t,n,i){let s=t.numprims;for(let r=t.startidx;r<t.startidx+t.numprims;++r){if(t.startidx+s>=n.length)throw new Error("Out of bounds");let o={...n[r]},l={...n[r]};this.splitPrimRef(n[r],e.dim,e.split,o,l)&&(n[r]=o,n[t.startidx+s++]=l)}i(s-t.numprims)}allocateNode(){if(this.m_nodecnt-this.m_num_nodes_archived>=this.m_num_nodes_for_regular){this.m_node_archive.push(this.m_nodes),this.m_num_nodes_archived+=this.m_num_nodes_for_regular,this.m_nodes=new Array(this.m_num_nodes_for_regular);for(let e=0;e<this.m_num_nodes_for_regular;++e)this.m_nodes[e]=new si}return this.m_nodes[this.m_nodecnt++-this.m_num_nodes_archived]}initNodeAllocator(e){this.m_node_archive=[],this.m_nodecnt=0,this.m_nodes=new Array(e);for(let t=0;t<e;++t)this.m_nodes[t]=new si}printStatistics(){let e=Math.floor((this.m_num_nodes_for_regular+1)/2),t=this.m_packed_indices.length;return["Class name: SplitBvh","SAH: enabled (forced)",`SAH bins: ${this.m_num_bins}`,`Max split depth: ${this.m_max_split_depth}`,`Min node overlap: ${this.m_min_overlap}`,`Number of triangles: ${e}`,`Number of triangle refs: ${t}`,`Ref duplication: ${(t-e)/e*100}%`,`Number of nodes: ${this.m_nodecnt}`,`Number of nodes in corresponding non-split BVH: ${this.m_num_nodes_for_regular}`,`Node overhead: ${(this.m_nodecnt-this.m_num_nodes_for_regular)/this.m_num_nodes_for_regular*100}%`,`Tree height: ${this.getHeight()}`].join(`
`)}getHeight(){return this.m_height}};var Bc=class extends Error{constructor(e){super(`found duplicate attribute: ${e.key}`)}},ie=class{constructor(e,t,n,i=!1){this.key=e;this.size=t;this.type=n;this.normalized=i;switch(n){case"BYTE":case"UNSIGNED_BYTE":this.sizeOfType=1;break;case"SHORT":case"UNSIGNED_SHORT":this.sizeOfType=2;break;case"FLOAT":this.sizeOfType=4;break;default:throw new Error(`Unknown gl type: ${n}`)}this.sizeInBytes=this.sizeOfType*t}key;size;type;normalized;sizeOfType;sizeInBytes},Se=class{static POSITION=new ie("position",3,"FLOAT");static NORMAL=new ie("normal",3,"FLOAT");static TANGENT=new ie("tangent",3,"FLOAT");static BITANGENT=new ie("bitangent",3,"FLOAT");static UV=new ie("uv",2,"FLOAT");static MATERIAL_INDEX=new ie("materialIndex",1,"SHORT");static MATERIAL_ENABLED=new ie("materialEnabled",1,"UNSIGNED_SHORT");static AMBIENT=new ie("ambient",3,"FLOAT");static DIFFUSE=new ie("diffuse",3,"FLOAT");static SPECULAR=new ie("specular",3,"FLOAT");static SPECULAR_EXPONENT=new ie("specularExponent",3,"FLOAT");static EMISSIVE=new ie("emissive",3,"FLOAT");static TRANSMISSION_FILTER=new ie("transmissionFilter",3,"FLOAT");static DISSOLVE=new ie("dissolve",1,"FLOAT");static ILLUMINATION=new ie("illumination",1,"UNSIGNED_SHORT");static REFRACTION_INDEX=new ie("refractionIndex",1,"FLOAT");static SHARPNESS=new ie("sharpness",1,"FLOAT");static MAP_DIFFUSE=new ie("mapDiffuse",1,"SHORT");static MAP_AMBIENT=new ie("mapAmbient",1,"SHORT");static MAP_SPECULAR=new ie("mapSpecular",1,"SHORT");static MAP_SPECULAR_EXPONENT=new ie("mapSpecularExponent",1,"SHORT");static MAP_DISSOLVE=new ie("mapDissolve",1,"SHORT");static ANTI_ALIASING=new ie("antiAliasing",1,"UNSIGNED_SHORT");static MAP_BUMP=new ie("mapBump",1,"SHORT");static MAP_DISPLACEMENT=new ie("mapDisplacement",1,"SHORT");static MAP_DECAL=new ie("mapDecal",1,"SHORT");static MAP_EMISSIVE=new ie("mapEmissive",1,"SHORT");stride;attributes;attributeMap;constructor(...e){this.attributes=e,this.attributeMap={};let t=0,n=0;for(let i of e){if(this.attributeMap[i.key])throw new Bc(i);t%i.sizeOfType!==0&&(t+=i.sizeOfType-t%i.sizeOfType,console.warn("Layout requires padding before "+i.key+" attribute")),this.attributeMap[i.key]={attribute:i,size:i.size,type:i.type,normalized:i.normalized,offset:t},t+=i.sizeInBytes,n=Math.max(n,i.sizeOfType)}t%n!==0&&(t+=n-t%n,console.warn("Layout requires padding at the back")),this.stride=t;for(let i of e)this.attributeMap[i.key].stride=this.stride}};var dg=/^[og]\s*(.+)?/,pg=/^mtllib /,fg=/^usemtl /,mg=/^usemap /,Oh=/\s+/,Gh=new I,Oc=new I,zh=new I,kh=new I,it=new I,oo=new H;function gg(){let a={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}let n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(i,s){let r=this._finalize(!1);r&&(r.inherited||r.groupCount<=0)&&this.materials.splice(r.index,1);let o={index:this.materials.length,name:i||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:r!==void 0?r.smooth:this.smooth,groupStart:r!==void 0?r.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(l){let c={index:typeof l=="number"?l:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(i){let s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),i&&this.materials.length>1)for(let r=this.materials.length-1;r>=0;r--)this.materials[r].groupCount<=0&&this.materials.splice(r,1);return i&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},n&&n.name&&typeof n.clone=="function"){let i=n.clone(0);i.inherited=!0,this.object.materials.push(i)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){let i=this.vertices,s=this.object.geometry.vertices;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addVertexPoint:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){let i=this.normals,s=this.object.geometry.normals;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addFaceNormal:function(e,t,n){let i=this.vertices,s=this.object.geometry.normals;Gh.fromArray(i,e),Oc.fromArray(i,t),zh.fromArray(i,n),it.subVectors(zh,Oc),kh.subVectors(Gh,Oc),it.cross(kh),it.normalize(),s.push(it.x,it.y,it.z),s.push(it.x,it.y,it.z),s.push(it.x,it.y,it.z)},addColor:function(e,t,n){let i=this.colors,s=this.object.geometry.colors;i[e]!==void 0&&s.push(i[e+0],i[e+1],i[e+2]),i[t]!==void 0&&s.push(i[t+0],i[t+1],i[t+2]),i[n]!==void 0&&s.push(i[n+0],i[n+1],i[n+2])},addUV:function(e,t,n){let i=this.uvs,s=this.object.geometry.uvs;s.push(i[e+0],i[e+1]),s.push(i[t+0],i[t+1]),s.push(i[n+0],i[n+1])},addDefaultUV:function(){let e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){let t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,i,s,r,o,l,c){let u=this.vertices.length,h=this.parseVertexIndex(e,u),d=this.parseVertexIndex(t,u),p=this.parseVertexIndex(n,u);if(this.addVertex(h,d,p),this.addColor(h,d,p),o!==void 0&&o!==""){let f=this.normals.length;h=this.parseNormalIndex(o,f),d=this.parseNormalIndex(l,f),p=this.parseNormalIndex(c,f),this.addNormal(h,d,p)}else this.addFaceNormal(h,d,p);if(i!==void 0&&i!==""){let f=this.uvs.length;h=this.parseUVIndex(i,f),d=this.parseUVIndex(s,f),p=this.parseUVIndex(r,f),this.addUV(h,d,p),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";let t=this.vertices.length;for(let n=0,i=e.length;n<i;n++){let s=this.parseVertexIndex(e[n],t);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";let n=this.vertices.length,i=this.uvs.length;for(let s=0,r=e.length;s<r;s++)this.addVertexLine(this.parseVertexIndex(e[s],n));for(let s=0,r=t.length;s<r;s++)this.addUVLine(this.parseUVIndex(t[s],i))}};return a.startObject("",!1),a}var Pi=class extends je{constructor(e){super(e),this.materials=null}load(e,t,n,i){let s=this,r=new jt(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(o){try{t(s.parse(o))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}setMaterials(e){return this.materials=e,this}parse(e){let t=new gg;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));let n=e.split(`
`),i=[];for(let o=0,l=n.length;o<l;o++){let c=n[o].trimStart();if(c.length===0)continue;let u=c.charAt(0);if(u!=="#")if(u==="v"){let h=c.split(Oh);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(oo.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),_e),t.colors.push(oo.r,oo.g,oo.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(u==="f"){let d=c.slice(1).trim().split(Oh),p=[];for(let g=0,m=d.length;g<m;g++){let x=d[g];if(x.length>0){let y=x.split("/");p.push(y)}}let f=p[0];for(let g=1,m=p.length-1;g<m;g++){let x=p[g],y=p[g+1];t.addFace(f[0],x[0],y[0],f[1],x[1],y[1],f[2],x[2],y[2])}}else if(u==="l"){let h=c.substring(1).trim().split(" "),d=[],p=[];if(c.indexOf("/")===-1)d=h;else for(let f=0,g=h.length;f<g;f++){let m=h[f].split("/");m[0]!==""&&d.push(m[0]),m[1]!==""&&p.push(m[1])}t.addLineGeometry(d,p)}else if(u==="p"){let d=c.slice(1).trim().split(" ");t.addPointGeometry(d)}else if((i=dg.exec(c))!==null){let h=(" "+i[0].slice(1).trim()).slice(1);t.startObject(h)}else if(fg.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(pg.test(c))t.materialLibraries.push(c.substring(7).trim());else if(mg.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(i=c.split(" "),i.length>1){let d=i[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;let h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}t.finalize();let s=new Xt;if(s.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let o=0,l=t.objects.length;o<l;o++){let c=t.objects[o],u=c.geometry,h=c.materials,d=u.type==="Line",p=u.type==="Points",f=!1;if(u.vertices.length===0)continue;let g=new tt;g.setAttribute("position",new ze(u.vertices,3)),u.normals.length>0&&g.setAttribute("normal",new ze(u.normals,3)),u.colors.length>0&&(f=!0,g.setAttribute("color",new ze(u.colors,3))),u.hasUVIndices===!0&&g.setAttribute("uv",new ze(u.uvs,2));let m=[];for(let y=0,b=h.length;y<b;y++){let S=h[y],v=S.name+"_"+S.smooth+"_"+f,M=t.materials[v];if(this.materials!==null){if(M=this.materials.create(S.name),d&&M&&!(M instanceof St)){let T=new St;Fe.prototype.copy.call(T,M),T.color.copy(M.color),M=T}else if(p&&M&&!(M instanceof gt)){let T=new gt({size:10,sizeAttenuation:!1});Fe.prototype.copy.call(T,M),T.color.copy(M.color),T.map=M.map,M=T}}M===void 0&&(d?M=new St:p?M=new gt({size:1,sizeAttenuation:!1}):M=new xs,M.name=S.name,M.flatShading=!S.smooth,M.vertexColors=f,t.materials[v]=M),m.push(M)}let x;if(m.length>1){for(let y=0,b=h.length;y<b;y++){let S=h[y];g.addGroup(S.groupStart,S.groupCount,y)}d?x=new xn(g,m):p?x=new Yt(g,m):x=new mt(g,m)}else d?x=new xn(g,m[0]):p?x=new Yt(g,m[0]):x=new mt(g,m[0]);x.name=c.name,s.add(x)}else if(t.vertices.length>0){let o=new gt({size:1,sizeAttenuation:!1}),l=new tt;l.setAttribute("position",new ze(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(l.setAttribute("color",new ze(t.colors,3)),o.vertexColors=!0);let c=new Yt(l,o);s.add(c)}return s}};var Ni=class a{vertices;vertexNormals;textures;indices;name="";vertexMaterialIndices;indicesPerMaterial=[];materialNames;materialIndices;materialsByIndex={};tangents=[];bitangents=[];textureStride;constructor(e={}){this.vertices=[],this.vertexNormals=[],this.textures=[],this.indices=[],this.vertexMaterialIndices=[],this.materialNames=[],this.materialIndices={},this.textureStride=e.enableWTextureCoord?3:2}static loadObjFile(e,t){t=t||{},t.materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord;let i=new Pi().parse(e);return a.fromThreeObject(i,t)}static fromThreeObject(e,t){t=t||{},t.materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord;let n=r=>Array.from(r.array),i=r=>{let o=r.getIndex();if(o)return Array.from(o.array);let l=r.getAttribute("position");return l?Array.from({length:l.count},(c,u)=>u):[]},s=[];return e.traverse(r=>{let o=r;if(!o.isMesh)return;let l=o.geometry,c=l.getAttribute("position");if(!c||c.count===0)return;let u=new a(t);u.name=o.name||"",u.vertices=n(c);let h=l.getAttribute("normal");if(h)u.vertexNormals=n(h);else{let p=l.clone();p.computeVertexNormals();let f=p.getAttribute("normal");u.vertexNormals=f?n(f):new Array(c.count*3).fill(0)}let d=l.getAttribute("uv");if(d){let p=n(d);if(t.enableWTextureCoord){u.textures=[];for(let f=0;f<p.length;f+=2)u.textures.push(p[f],p[f+1],0)}else u.textures=p}else u.textures=[];u.indices=i(l),u.indicesPerMaterial=[u.indices],t.calcTangentsAndBitangents&&u.textures.length>0&&u.calculateTangentsAndBitangents(),s.push(u)}),s}finalizeMesh(e,t,n,i,s){this.vertices=t.verts,this.vertexNormals=t.norms,this.textures=t.textures,this.vertexMaterialIndices=t.materialIndices,this.indices=t.indices[n],this.indicesPerMaterial=t.indices,this.materialNames=i,this.materialIndices=s,this.materialsByIndex={},e.calcTangentsAndBitangents&&this.calculateTangentsAndBitangents()}calculateTangentsAndBitangents(){console.assert(!!(this.vertices&&this.vertices.length&&this.vertexNormals&&this.vertexNormals.length&&this.textures&&this.textures.length),"Missing attributes for calculating tangents and bitangents");let e={tangents:[...new Array(this.vertices.length)].map(r=>0),bitangents:[...new Array(this.vertices.length)].map(r=>0)},t=this.indices,n=this.vertices,i=this.vertexNormals,s=this.textures;for(let r=0;r<t.length;r+=3){let o=t[r+0],l=t[r+1],c=t[r+2],u=n[o*3+0],h=n[o*3+1],d=n[o*3+2],p=s[o*2+0],f=s[o*2+1],g=n[l*3+0],m=n[l*3+1],x=n[l*3+2],y=s[l*2+0],b=s[l*2+1],S=n[c*3+0],v=n[c*3+1],M=n[c*3+2],T=s[c*2+0],w=s[c*2+1],C=g-u,E=m-h,R=x-d,N=S-u,A=v-h,F=M-d,z=y-p,k=b-f,ue=T-p,ve=w-f,X=z*ve-k*ue,ae=1/Math.abs(X<1e-4?1:X),we=(C*ve-N*k)*ae,Ee=(E*ve-A*k)*ae,Ae=(R*ve-F*k)*ae,Pt=(N*z-C*ue)*ae,Jn=(A*z-E*ue)*ae,Qn=(F*z-R*ue)*ae,jr=i[o*3+0],Zr=i[o*3+1],Jr=i[o*3+2],Qr=i[l*3+0],ea=i[l*3+1],ta=i[l*3+2],na=i[c*3+0],ia=i[c*3+1],sa=i[c*3+2],Go=we*jr+Ee*Zr+Ae*Jr,zo=we*Qr+Ee*ea+Ae*ta,ko=we*na+Ee*ia+Ae*sa,Vo=we-jr*Go,$o=Ee-Zr*Go,Ho=Ae-Jr*Go,Wo=we-Qr*zo,Xo=Ee-ea*zo,Yo=Ae-ta*zo,qo=we-na*ko,Ko=Ee-ia*ko,jo=Ae-sa*ko,Zo=Math.sqrt(Vo*Vo+$o*$o+Ho*Ho),Jo=Math.sqrt(Wo*Wo+Xo*Xo+Yo*Yo),Qo=Math.sqrt(qo*qo+Ko*Ko+jo*jo),el=Pt*jr+Jn*Zr+Qn*Jr,tl=Pt*Qr+Jn*ea+Qn*ta,nl=Pt*na+Jn*ia+Qn*sa,il=Pt-jr*el,sl=Jn-Zr*el,rl=Qn-Jr*el,al=Pt-Qr*tl,ol=Jn-ea*tl,ll=Qn-ta*tl,cl=Pt-na*nl,ul=Jn-ia*nl,hl=Qn-sa*nl,dl=Math.sqrt(il*il+sl*sl+rl*rl),pl=Math.sqrt(al*al+ol*ol+ll*ll),fl=Math.sqrt(cl*cl+ul*ul+hl*hl);e.tangents[o*3+0]+=Vo/Zo,e.tangents[o*3+1]+=$o/Zo,e.tangents[o*3+2]+=Ho/Zo,e.tangents[l*3+0]+=Wo/Jo,e.tangents[l*3+1]+=Xo/Jo,e.tangents[l*3+2]+=Yo/Jo,e.tangents[c*3+0]+=qo/Qo,e.tangents[c*3+1]+=Ko/Qo,e.tangents[c*3+2]+=jo/Qo,e.bitangents[o*3+0]+=il/dl,e.bitangents[o*3+1]+=sl/dl,e.bitangents[o*3+2]+=rl/dl,e.bitangents[l*3+0]+=al/pl,e.bitangents[l*3+1]+=ol/pl,e.bitangents[l*3+2]+=ll/pl,e.bitangents[c*3+0]+=cl/fl,e.bitangents[c*3+1]+=ul/fl,e.bitangents[c*3+2]+=hl/fl}this.tangents=e.tangents,this.bitangents=e.bitangents}makeBufferData(e){let t=this.vertices.length/3,n=new ArrayBuffer(e.stride*t);n.numItems=t;let i=new DataView(n);for(let s=0,r=0;s<t;s++){r=s*e.stride;for(let o of e.attributes){let l=r+e.attributeMap[o.key].offset;switch(o.key){case Se.POSITION.key:i.setFloat32(l,this.vertices[s*3],!0),i.setFloat32(l+4,this.vertices[s*3+1],!0),i.setFloat32(l+8,this.vertices[s*3+2],!0);break;case Se.UV.key:i.setFloat32(l,this.textures[s*2],!0),i.setFloat32(l+4,this.textures[s*2+1],!0);break;case Se.NORMAL.key:i.setFloat32(l,this.vertexNormals[s*3],!0),i.setFloat32(l+4,this.vertexNormals[s*3+1],!0),i.setFloat32(l+8,this.vertexNormals[s*3+2],!0);break;case Se.MATERIAL_INDEX.key:i.setInt16(l,this.vertexMaterialIndices[s],!0);break;case Se.AMBIENT.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.ambient[0],!0),i.setFloat32(l+4,u.ambient[1],!0),i.setFloat32(l+8,u.ambient[2],!0);break}case Se.DIFFUSE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.diffuse[0],!0),i.setFloat32(l+4,u.diffuse[1],!0),i.setFloat32(l+8,u.diffuse[2],!0);break}case Se.SPECULAR.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.specular[0],!0),i.setFloat32(l+4,u.specular[1],!0),i.setFloat32(l+8,u.specular[2],!0);break}case Se.SPECULAR_EXPONENT.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.specularExponent,!0);break}case Se.EMISSIVE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.emissive[0],!0),i.setFloat32(l+4,u.emissive[1],!0),i.setFloat32(l+8,u.emissive[2],!0);break}case Se.TRANSMISSION_FILTER.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.transmissionFilter[0],!0),i.setFloat32(l+4,u.transmissionFilter[1],!0),i.setFloat32(l+8,u.transmissionFilter[2],!0);break}case Se.DISSOLVE.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.dissolve,!0);break}case Se.ILLUMINATION.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setInt16(l,u.illumination,!0);break}case Se.REFRACTION_INDEX.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.refractionIndex,!0);break}case Se.SHARPNESS.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setFloat32(l,u.sharpness,!0);break}case Se.ANTI_ALIASING.key:{let c=this.vertexMaterialIndices[s],u=this.materialsByIndex[c];if(!u){console.warn('Material "'+this.materialNames[c]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}i.setInt16(l,u.antiAliasing?1:0,!0);break}}}}return n}makeIndexBufferData(){let e=new Uint16Array(this.indices);return e.numItems=this.indices.length,e}makeIndexBufferDataForMaterials(...e){let t=new Array().concat(...e.map(i=>this.indicesPerMaterial[i])),n=new Uint16Array(t);return n.numItems=t.length,n}addMaterialLibrary(e){for(let t in e.materials){if(!(t in this.materialIndices))continue;let n=e.materials[t],i=this.materialIndices[n.name];this.materialsByIndex[i]=n}}};var lo=class{static async loadObjFileAsync(e){let t=new Pi;try{let n=await t.loadAsync(e);return Ni.fromThreeObject(n)}catch{let i=await se(e);if(!i.ok)throw new Error(`Failed to load OBJ file: ${i.statusText}`);let s=await i.text();return Ni.loadObjFile(s)}}};var Ls=class{static degrees(e){return e*(180/Math.PI)}static radians(e){return e*(Math.PI/180)}static clamp(e,t,n){return Math.min(n,Math.max(e,t))}};var _n=class{name="";verticesUVX=[];normalsUVY=[];bvh;constructor(){this.bvh=new ao(2,64,0,.001,0)}dispose(){this.verticesUVX=[],this.normalsUVY=[],this.bvh=null}async loadFromFileAsync(e){this.name=e;let t=[];try{t=await lo.loadObjFileAsync(e)}catch(n){return console.error("Unable to load model",n),!1}for(let n of t){let i=n.vertices,s=n.vertexNormals,r=n.textures;for(let o=0;o<n.indices.length;o+=3)for(let l=0;l<3;l++){let c=n.indices[o+l],u=i[3*c+0],h=i[3*c+1],d=i[3*c+2],p=s[3*c+0],f=s[3*c+1],g=s[3*c+2],m,x;r&&r.length>0?(m=r[2*c+0],x=1-r[2*c+1]):l===0?m=x=0:l===1?(m=0,x=1):m=x=1,this.verticesUVX.push(new V(u,h,d,m)),this.normalsUVY.push(new V(p,f,g,x))}}return!0}buildBVH(){let e=Math.floor(this.verticesUVX.length/3),t=new Array(e);for(let n=0;n<e;++n){let i=new _(this.verticesUVX[n*3+0].x,this.verticesUVX[n*3+0].y,this.verticesUVX[n*3+0].z),s=new _(this.verticesUVX[n*3+1].x,this.verticesUVX[n*3+1].y,this.verticesUVX[n*3+1].z),r=new _(this.verticesUVX[n*3+2].x,this.verticesUVX[n*3+2].y,this.verticesUVX[n*3+2].z),o=new W;o.grow(i),o.grow(s),o.grow(r),t[n]=o}this.bvh.build(t)}},yn=class{name;meshID;transform;materialID;constructor(e,t,n,i){this.name=e,this.meshID=t,this.transform=n,this.materialID=i}};var Xn=1,Di=2,Yn=4,Ps=1,co=2,uo=4,ho=8,po=16,fo=32,mo=64;function Vh(a){let e=0;return/D4_CLOSURE_KIND_GENERIC\b/.test(a)&&(e|=Ps),/D4_CLOSURE_KIND_DIFFUSE\b/.test(a)&&(e|=co),/D4_CLOSURE_KIND_CONDUCTOR\b/.test(a)&&(e|=uo),/D4_CLOSURE_KIND_DIELECTRIC\b/.test(a)&&(e|=ho),/D4_CLOSURE_KIND_HAIR\b/.test(a)&&(e|=po),/D4_CLOSURE_KIND_SUBSURFACE\b/.test(a)&&(e|=fo),/D4_CLOSURE_KIND_VOLUME\b/.test(a)&&(e|=mo),e===0&&(e=Ps|co|uo|ho|po|fo|mo),e|=Ps,e}function go(a,e){let t=a.findIndex(n=>n.materialId===e.materialId);if(t>=0){a[t]=e;return}a.push(e)}function xo(a){if(a.length===0)return"";let e=[...a].sort((r,o)=>r.materialId-o.materialId),t=new Map,n=[],i=[],s=[];for(let r of e){for(let o of r.functions)t.set(o.functionName,o.functionCode);r.materialCase&&n.push(r.materialCase),r.displacementCase&&i.push(r.displacementCase),r.closureCase&&s.push(r.closureCase)}return n.length===0&&i.length===0&&s.length===0?"":[...t.values(),"vec3 EvalProceduralDisplacementLocal(int matId, vec2 uv, int texLayer) {","    switch (matId) {",...i,"        default:","            return vec3(0.0);","    }","}","void ApplyProceduralMaterialOverrides(int matId, inout Material mat, inout State state, ivec4 texIDs, Ray r) {","    switch (matId) {",...n,"        default:","            break;","    }","}","void ApplyProceduralMaterialClosureContract(int matId, in Material mat, in State state) {","    switch (matId) {",...s,"        default:","            break;","    }","}"].join(`

`)}function _o(a,e,t,n,i){let s=new Map;for(let f of t)s.set(f.functionName,f.functionCode);i&&s.set(i.functionName,i.functionCode);let c=t.length>0||i!==null||n!==null,u=t.length>0?_g(a,t):void 0,h=n?xg(n,e):$h(e),d=c?yg(a,h):void 0,p=i?bg(a,i):void 0;return s.size===0&&!u&&!d&&!p?null:{materialId:a,functions:[...s.entries()].map(([f,g])=>({functionName:f,functionCode:g})),materialCase:u,closureCase:d,displacementCase:p}}function $h(a){let e=Math.max(a.emission.x,a.emission.y,a.emission.z)>1e-6,t=Math.min(Math.max(a.metallic,0),1),n=Math.min(Math.max(a.specTrans,0),1),i=Math.min(Math.max(a.specularWeight,0),1),s=Math.min(Math.max(a.baseWeight,0),1);if(a.materialType>=.5)return{kind:"hair",model:0,flags:Xn|Di|(e?Yn:0)};let r=t>.98&&n<.02&&i<.2,o=t<.02&&n>.95&&s<.2,l=t<.02&&n<.02&&i<.05,c=a.subsurface>.05||a.subsurfaceRadiusScale.x>1.001||a.subsurfaceRadiusScale.y>1.001||a.subsurfaceRadiusScale.z>1.001;if(a.mediumType===2||a.mediumScattering>1e-4||a.mediumAbsorption>1e-4)return{kind:"volume",model:0,flags:Di|(e?Yn:0)};if(c)return{kind:"subsurface",model:0,flags:Xn|Di|(e?Yn:0)};if(r)return{kind:"conductor",model:a.roughness<.5?0:1,flags:Xn|(e?Yn:0)};if(o){let d=n,p=d<.2?0:d<.8?1:2,f=p===0?Xn:p===2?Di:Xn|Di;return{kind:"dielectric",model:p,flags:f|(e?Yn:0)}}if(l){let d=Math.min(Math.max(a.baseDiffuseRoughness,0),1);return{kind:"diffuse",model:d<.2?0:d<.75?1:2,flags:Xn|(e?Yn:0)}}return{kind:"generic",model:0,flags:Xn|(n>.02?Di:0)|(e?Yn:0)}}function xg(a,e){let t=$h(e);return{kind:a.kind,model:t.model,flags:a.flags>0?a.flags:t.flags}}function _g(a,e){let t=[`        case ${a}:`],n="state.texCoord * mat.uvScale",i=r=>/texture\s*\(\s*textureMapsArrayTex/.test(r),s=(r,o,l,c)=>{let u=`texIDs.${r}`,h=`${l}(${n}, ${c?u:`(${u} >= 0 ? ${u} : 0)`})`;c?t.push(`            if (${u} >= 0) ${o.replace("__CALL__",h)}`):t.push(`            ${o.replace("__CALL__",h)}`)};for(let r of e){let o=r.functionName,l=i(r.functionCode);switch(r.inputName){case"base_color":case"baseColor":case"diffuseColor":s("x","mat.baseColor = clamp(__CALL__, vec3(0.0), vec3(1.0));",o,l);break;case"coat_color":s("x","mat.coatColor = clamp(__CALL__, vec3(0.0), vec3(1.0));",o,l);break;case"emission_color":case"emissive":case"emissiveColor":s("w","mat.emission = max(__CALL__, vec3(0.0));",o,l);break;case"normal":case"geometry_normal":l?t.push(`            if (texIDs.z >= 0) { vec3 origNormal = state.normal; vec3 proceduralNormal = normalize(${o}(${n}, texIDs.z)); state.normal = normalize(state.tangent * proceduralNormal.x + state.bitangent * proceduralNormal.y + state.normal * proceduralNormal.z); state.ffnormal = dot(origNormal, r.direction) <= 0.0 ? state.normal : -state.normal; }`):t.push(`            { vec3 origNormal = state.normal; vec3 proceduralNormal = normalize(${o}(${n}, (texIDs.z >= 0 ? texIDs.z : 0))); state.normal = normalize(state.tangent * proceduralNormal.x + state.bitangent * proceduralNormal.y + state.normal * proceduralNormal.z); state.ffnormal = dot(origNormal, r.direction) <= 0.0 ? state.normal : -state.normal; }`);break;case"roughness":case"specular_roughness":l?t.push(`            if (texIDs.y >= 0) mat.roughness = max(clamp(${o}(${n}, texIDs.y), 0.0, 1.0), 0.001);`):t.push(`            mat.roughness = max(clamp(${o}(${n}, (texIDs.y >= 0 ? texIDs.y : 0)), 0.0, 1.0), 0.001);`);break;case"coat_roughness":l?t.push(`            if (texIDs.y >= 0) mat.clearcoatRoughness = max(clamp(${o}(${n}, texIDs.y), 0.0, 1.0), 0.001);`):t.push(`            mat.clearcoatRoughness = max(clamp(${o}(${n}, (texIDs.y >= 0 ? texIDs.y : 0)), 0.0, 1.0), 0.001);`);break;case"metalness":case"metallic":l?t.push(`            if (texIDs.y >= 0) mat.metallic = clamp(${o}(${n}, texIDs.y), 0.0, 1.0);`):t.push(`            mat.metallic = clamp(${o}(${n}, (texIDs.y >= 0 ? texIDs.y : 0)), 0.0, 1.0);`);break}}return t.push("            break;"),t.join(`
`)}function yg(a,e){let t=[`        case ${a}:`];switch(t.push("            gMaterialXClosureContractValid = 1;"),e.kind){case"diffuse":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_DIFFUSE;");break;case"conductor":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_CONDUCTOR;");break;case"dielectric":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_DIELECTRIC;");break;case"subsurface":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_SUBSURFACE;");break;case"volume":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_VOLUME;");break;case"hair":t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_HAIR;");break;default:t.push("            gMaterialXClosureKind = D4_CLOSURE_KIND_GENERIC;");break}return t.push(`            gMaterialXClosureModel = ${Math.max(0,e.model)};`),t.push(`            gMaterialXClosureFlags = ${Math.max(0,e.flags)};`),t.push("            break;"),t.join(`
`)}function bg(a,e){let t=[`        case ${a}:`],n=`${e.functionName}(uv, texLayer)`,i=Number.isFinite(e.scale)?e.scale:1;return e.glslType==="float"?t.push(`            return vec3(0.0, 0.0, ${n} * ${i.toFixed(6)});`):e.glslType==="vec2"?t.push(`            return vec3(${n}, 0.0) * ${i.toFixed(6)};`):e.glslType==="vec4"?t.push(`            return (${n}).xyz * ${i.toFixed(6)};`):t.push(`            return ${n} * ${i.toFixed(6)};`),t.join(`
`)}var Fi=class{renderOptions=new ti;meshes=[];transforms=[];materials=[];meshInstances=[];lights=[];envMap=null;camera=null;textures=[];proceduralMaterialGlsl="";proceduralEnvGlsl="";materialxEnvStrategy="cpu";materialxLightStrategy="cpu";initialized=!1;dirty=!0;instancesModified=!1;envMapModified=!1;sceneName;constructor(e){this.sceneName=e}dispose(){this.meshes.forEach(e=>e.dispose?.()),this.meshes=[],this.textures.forEach(e=>e.dispose?.()),this.textures=[],this.proceduralMaterialGlsl="",this.proceduralEnvGlsl="",this.materialxEnvStrategy="cpu",this.materialxLightStrategy="cpu",this.camera=null,this.envMap=null}createRenderer(){throw new Error("Unsupported render mode")}addCamera(e,t,n){this.camera=new ri(e,t,n)}async addMeshAsync(e){let t=this.meshes.findIndex(i=>i.name===`scenes/pathtracer/${e}`);if(t!==-1)return t;let n=new _n;return console.log(`Loading model ${e}`),await n.loadFromFileAsync(`scenes/pathtracer/${e}`)?(this.meshes.push(n),this.meshes.length-1):(console.log(`Unable to load model ${e}`),-1)}async addTextureAsync(e){let t=this.textures.findIndex(i=>i.name===`scenes/pathtracer/${e}`);if(t!==-1)return t;let n=new yt;return console.log(`Loading texture ${e}`),e.startsWith("http")||(e=`scenes/pathtracer/${e}`),await n.loadTextureAsync(e)?(this.textures.push(n),this.textures.length-1):(console.log(`Unable to load texture ${e}`),-1)}async addTextureByUrlAsync(e){let t=this.textures.findIndex(i=>i.name===e);if(t!==-1)return t;let n=new yt;return console.log(`Loading texture ${e}`),await n.loadTextureAsync(e)?(this.textures.push(n),this.textures.length-1):(console.log(`Unable to load texture ${e}`),-1)}addMaterial(e){return this.materials.push(e),this.materials.length-1}async addEnvMapAsync(e){this.envMap&&(this.envMap.dispose(),this.envMap=null),this.envMap=new Is,await this.envMap.loadMapAsync(`/scenes/pathtracer/${e}`)?console.log(`HDR ${e} loaded`):(console.log(`Unable to load HDR ${e}`),this.envMap=null),this.envMapModified=!0,this.dirty=!0}async addEnvMapByUrlAsync(e){this.envMap&&(this.envMap.dispose(),this.envMap=null),this.envMap=new Is;let t=e.startsWith("/")||e.startsWith("http")?e:`/${e}`;await this.envMap.loadMapAsync(t)?console.log(`HDR ${e} loaded`):(console.log(`Unable to load HDR ${e}`),this.envMap=null),this.envMapModified=!0,this.dirty=!0}addMeshInstance(e){return this.meshInstances.push(e),this.meshInstances.length-1}addLight(e){return this.lights.push(e),this.lights.length-1}rebuildInstances(){}async processSceneAsync(){}getDefines(e=!1){let t="",n="",i=this.renderOptions.pathtracerShaderProfile==="mtlx-node-test";this.renderOptions.enableEnvMap&&(e||this.envMap)&&(t+=`#define OPT_ENVMAP
`),this.lights&&this.lights.length>0&&(t+=`#define OPT_LIGHTS
`),!i&&this.renderOptions.enableRR&&(t+=`#define OPT_RR
`,t+=`#define OPT_RR_DEPTH ${this.renderOptions.RRDepth}
`),this.renderOptions.enableUniformLight&&(t+=`#define OPT_UNIFORM_LIGHT
`),!i&&this.renderOptions.openglNormalMap&&(t+=`#define OPT_OPENGL_NORMALMAP
`),this.renderOptions.hideEmitters&&(t+=`#define OPT_HIDE_EMITTERS
`),this.renderOptions.enableBackground&&(t+=`#define OPT_BACKGROUND
`,n+=`#define OPT_BACKGROUND
`),this.renderOptions.transparentBackground&&(t+=`#define OPT_TRANSPARENT_BACKGROUND
`,n+=`#define OPT_TRANSPARENT_BACKGROUND
`),this.materials&&this.materials.some(o=>o.alphaMode!==0)&&(t+=`#define OPT_ALPHA_TEST
`),this.renderOptions.enableRoughnessMollification&&(t+=`#define OPT_ROUGHNESS_MOLLIFICATION
`),!i&&(this.materials&&this.materials.some(o=>o.mediumType!==0)||this.renderOptions.sssMode!==0)&&(t+=`#define OPT_MEDIUM
`),!i&&this.renderOptions.enableVolumeMIS&&(t+=`#define OPT_VOL_MIS
`),!i&&this.materials&&this.materials.some(o=>o.dispersionScale&&o.dispersionScale>0)&&(t+=`#define OPENPBR_DISPERSION
`),t+=`#define SSS_MODE ${i?0:this.renderOptions.sssMode===1?1:this.renderOptions.sssMode===2?2:0}
`,!i&&this.renderOptions.useThinFilmLUT&&(t+=`#define OPT_THINFILM_LUT
`);let s=this.proceduralMaterialGlsl.includes("gMaterialXClosureContractValid");if(!i&&s){t+=`#define OPT_MATERIALX_RUNTIME
`;let o=Vh(this.proceduralMaterialGlsl);t+=`#define D4_ENABLE_CLOSURE_GENERIC    ${o&Ps?1:0}
`,t+=`#define D4_ENABLE_CLOSURE_DIFFUSE    ${o&co?1:0}
`,t+=`#define D4_ENABLE_CLOSURE_CONDUCTOR  ${o&uo?1:0}
`,t+=`#define D4_ENABLE_CLOSURE_DIELECTRIC ${o&ho?1:0}
`,t+=`#define D4_ENABLE_CLOSURE_HAIR       ${o&po?1:0}
`,t+=`#define D4_ENABLE_CLOSURE_SUBSURFACE ${o&fo?1:0}
`,t+=`#define D4_ENABLE_CLOSURE_VOLUME     ${o&mo?1:0}
`}let r=(this.proceduralEnvGlsl?.trim().length??0)>0;return!i&&r&&(t+=`#define OPT_MATERIALX_ENV_RUNTIME
`),[t,n]}};var st=class extends Fi{vertIndices=[];verticesUVX=[];normalsUVY=[];sceneBvh;bvhTranslator=new ha;sceneBounds=new W;textureMapsArray=new Uint8Array;materialXProceduralEntries=[];constructor(e){super(e),this.sceneBvh=new Nn(10,64,!1)}createRenderer(){return new ni(this)}dispose(){super.dispose(),this.bvhTranslator=null,this.sceneBvh=null,this.textureMapsArray=null,this.materialXProceduralEntries=[]}largePush(e,t){let n=e.length;for(let i=0;i<n;i++)t.push(e[i])}createTLAS(){let e=this.meshInstances.map((t,n)=>{let s=this.meshes[t.meshID].bvh.bounds(),r=t.transform,o=s.pmin,l=s.pmax,c=new _(r.data[0][0],r.data[0][1],r.data[0][2]),u=new _(r.data[1][0],r.data[1][1],r.data[1][2]),h=new _(r.data[2][0],r.data[2][1],r.data[2][2]),d=new _(r.data[3][0],r.data[3][1],r.data[3][2]),p=c.scale(o.x),f=c.scale(l.x),g=u.scale(o.y),m=u.scale(l.y),x=h.scale(o.z),y=h.scale(l.z),b=_.min(p,f).add(_.min(g,m)).add(_.min(x,y)).add(d),S=_.max(p,f).add(_.max(g,m)).add(_.max(x,y)).add(d);return new W(b,S)});this.sceneBvh.build(e),this.sceneBounds=this.sceneBvh.bounds()}createBLAS(){this.meshes.forEach(e=>{console.log(`Building BVH for ${e.name}`),e.buildBVH()})}get topLevelIndex(){return this.bvhTranslator.topLevelIndex}rebuildInstances(){this.instancesModified=!0,this.dirty=!0,this.sceneBvh=new Nn(10,64,!1),this.createTLAS(),this.bvhTranslator.updateTLAS(this.sceneBvh,this.meshInstances),this.transforms=this.meshInstances.map(e=>e.transform)}async processSceneAsync(){console.log("Processing scene data"),this.createBLAS(),console.log("Building scene BVH"),this.createTLAS(),console.log("Flattening BVH"),this.bvhTranslator.process(this.sceneBvh,this.meshes,this.meshInstances);let e=0;this.vertIndices=[],this.verticesUVX=[],this.normalsUVY=[],console.log("Copying Mesh Data");for(let t of this.meshes){let n=t.bvh.getNumIndices(),i=t.bvh.getIndices();for(let s=0;s<n;s++){let r=i[s],o=r*3+0+e,l=r*3+1+e,c=r*3+2+e;this.vertIndices.push({x:o,y:l,z:c})}this.largePush(t.verticesUVX,this.verticesUVX),this.largePush(t.normalsUVY,this.normalsUVY),e+=t.verticesUVX.length}if(console.log("Copying transforms"),this.transforms=this.meshInstances.map(t=>t.transform),this.textures.length>0){console.log("Copying and resizing textures");let t=P.gl,n=16384;if(t&&(n=t.raw.getParameter(t.raw.MAX_TEXTURE_SIZE)),this.renderOptions.texArrayHeight*this.textures.length>n){let o=this.renderOptions.texArrayWidth,l=this.renderOptions.texArrayHeight;for(;l*this.textures.length>n;)l=Math.floor(l/2),o=Math.floor(o/2);this.renderOptions.texArrayWidth=o,this.renderOptions.texArrayHeight=l}let i=this.renderOptions.texArrayWidth,s=this.renderOptions.texArrayHeight,r=i*s*4;this.textureMapsArray=new Uint8Array(r*this.textures.length);for(let o=0;o<this.textures.length;o++){let l=this.textures[o],c=null;l.image!==null?c=Ou(l.image,i,s,l.flipY):c=await(await import("sharp")).default(Buffer.from(l.rgba),{raw:{width:l.width,height:l.height,channels:4}}).resize(i,s).flip(l.flipY).raw().toBuffer(),this.textureMapsArray.set(c,o*r)}}if(!this.camera){let t=this.sceneBvh.bounds(),n=t.extents(),i=t.center();this.addCamera(new _(i.x,i.y,i.z+_.Length(n)*2),i,45)}this.initialized=!0}bvhData(e=null){let t=e===null?this.bvhTranslator.nodes:this.bvhTranslator.nodes.slice(e);return new Float32Array(t.flatMap(i=>[i.bboxmin.x,i.bboxmin.y,i.bboxmin.z,i.bboxmax.x,i.bboxmax.y,i.bboxmax.z,i.LRLeaf.x,i.LRLeaf.y,i.LRLeaf.z]))}vertIndicesData(){return new Int32Array(this.vertIndices.flatMap(t=>[t.x,t.y,t.z]))}verticesData(){return new Float32Array(this.verticesUVX.flatMap(t=>[t.x,t.y,t.z,t.w]))}normalsData(){return new Float32Array(this.normalsUVY.flatMap(t=>[t.x,t.y,t.z,t.w]))}materialsData(){return new Float32Array(this.materials.flatMap(t=>t.toVec4Array().flatMap(n=>[n.x,n.y,n.z,n.w])))}transformsData(){return new Float32Array(this.transforms.flatMap(t=>[t.data[0][0],t.data[0][1],t.data[0][2],t.data[0][3],t.data[1][0],t.data[1][1],t.data[1][2],t.data[1][3],t.data[2][0],t.data[2][1],t.data[2][2],t.data[2][3],t.data[3][0],t.data[3][1],t.data[3][2],t.data[3][3]]))}lightsData(){return new Float32Array(this.lights.flatMap(t=>[t.position.x,t.position.y,t.position.z,t.emission.x,t.emission.y,t.emission.z,t.u.x,t.u.y,t.u.z,t.v.x,t.v.y,t.v.z,t.radius,t.area,t.type]))}computeSceneData(e){let t=new Gc,n=[],i=this.materials.map(T=>T.toVec4Array()).flat();n=n.concat(i);let s=this.transforms.map(T=>[new V(T.data[0][0],T.data[0][1],T.data[0][2],T.data[0][3]),new V(T.data[1][0],T.data[1][1],T.data[1][2],T.data[1][3]),new V(T.data[2][0],T.data[2][1],T.data[2][2],T.data[2][3]),new V(T.data[3][0],T.data[3][1],T.data[3][2],T.data[3][3])]).flat();n=n.concat(s);let r=this.lights.map(T=>[new V(T.position.x,T.position.y,T.position.z,0),new V(T.emission.x,T.emission.y,T.emission.z,0),new V(T.u.x,T.u.y,T.u.z,0),new V(T.v.x,T.v.y,T.v.z,0),new V(T.radius,T.area,T.type,0)]).flat();n=n.concat(r);let o=this.bvhTranslator.nodes.map(T=>[new V(T.bboxmin.x,T.bboxmin.y,T.bboxmin.z,0),new V(T.bboxmax.x,T.bboxmax.y,T.bboxmax.z,0),new V(T.LRLeaf.x,T.LRLeaf.y,T.LRLeaf.z,0)]).flat();n=n.concat(o);let l=this.vertIndices.map(T=>new V(T.x,T.y,T.z,0));n=n.concat(l);let c=this.verticesUVX.map(T=>new V(T.x,T.y,T.z,T.w));n=n.concat(c);let u=this.normalsUVY.map(T=>new V(T.x,T.y,T.z,T.w));n=n.concat(u);let h=0,d=h+i.length,p=d+s.length,f=p+r.length,g=f+o.length,m=g+l.length,x=m+c.length,y="";this.textures.length>0&&!e?y=`
int textureMapsArrayIndices[${this.textures.length}] = int[](${this.textures.map((T,w)=>w).join(", ")});
`:y=`
int textureMapsArrayIndices[1] = int[](0);
`,t.materialsIndex=h,t.transformsIndex=d,t.lightsIndex=p,t.bvhIndex=f,t.vertexIndicesIndex=g,t.verticesIndex=m,t.normalsIndex=x,t.data=n;let b=new ArrayBuffer(n.length*4*4),S=new Float32Array(b);for(let T=0;T<n.length;T++)S[T*4+0]=n[T].x,S[T*4+1]=n[T].y,S[T*4+2]=n[T].z,S[T*4+3]=n[T].w;t.buffer=b,this.textureMapsArray.length>0&&(t.textureBuffer=this.textureMapsArray.buffer,t.textureWidth=this.renderOptions.texArrayWidth,t.textureHeight=this.renderOptions.texArrayHeight*this.textures.length);let v=this.getDefines(!0)[0].trim(),M=t.data.length>1e3;return t.commonCode=`${M&&!e?"#define OPT_USE_MESHDATA_BLOB":""}
        
${v.trim()}
`.trim(),t.bufferACode=`
vec3 eye = vec3(${this.camera.position.x.toFixed(6)}, ${this.camera.position.y.toFixed(6)}, ${this.camera.position.z.toFixed(6)});
vec3 lookat = vec3(${this.camera.pivot.x.toFixed(6)}, ${this.camera.pivot.y.toFixed(6)}, ${this.camera.pivot.z.toFixed(6)});
float fov = ${(this.camera.fov/Math.PI*180).toFixed(6)};
`.trim(),t.bufferBCode=`
    #define materialsTex (${`${h} + MESH_DATA_OFFSET`})
    #define transformsTex (${`${d} + MESH_DATA_OFFSET`})
    #define lightsTex (${`${p} + MESH_DATA_OFFSET`})
    #define BVH (${`${f} + MESH_DATA_OFFSET`})
    #define vertexIndicesTex (${`${g} + MESH_DATA_OFFSET`})
    #define verticesTex (${`${m} + MESH_DATA_OFFSET`})
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
`.trim(),t}generateMeshCode(e,t){function n(d){return`vec4(${d.x.toFixed(6)},${d.y.toFixed(6)},${d.z.toFixed(6)},${d.w.toFixed(6)})`}let i=new Map,s=[];for(let d=e.materialsIndex;d<e.transformsIndex;d+=9)s.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3],e.data[d+4],e.data[d+5],e.data[d+6],e.data[d+7],e.data[d+8]]);i.set("Materials",s);let r=[];for(let d=e.transformsIndex;d<e.lightsIndex;d+=4)r.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3]]);i.set("Transforms",r);let o=[];for(let d=e.lightsIndex;d<e.bvhIndex;d+=5)o.push([e.data[d+0],e.data[d+1],e.data[d+2],e.data[d+3],e.data[d+4]]);if(i.set("Lights",o),!t){let d=[];for(let m=e.bvhIndex;m<e.vertexIndicesIndex;m+=3)d.push([e.data[m+0],e.data[m+1],e.data[m+2]]);i.set("BVH",d);let p=[];for(let m=e.vertexIndicesIndex;m<e.verticesIndex;m++)p.push([e.data[m]]);i.set("Vertex Indices",p);let f=[];for(let m=e.verticesIndex;m<e.normalsIndex;m++)f.push([e.data[m]]);i.set("Vertices",f);let g=[];for(let m=e.normalsIndex;m<e.data.length;m++)g.push([e.data[m]]);i.set("Normals",g)}let l="        ",c=0,u="";return i.forEach((d,p)=>{u+=l+`// ${p}
`,d.forEach(f=>{u+=l,f.forEach(g=>{u+=n(g)+(c<e.data.length-1?",":""),c++}),u+=`
`})}),`
#define VEC4_COUNT ${t?e.bvhIndex:e.data.length}

vec4[VEC4_COUNT] getData() {
    vec4 data[VEC4_COUNT] = vec4[](
${u.trimEnd()}
    );
    return data;
}
`.trim().trim()}},Gc=class{commonCode;bufferACode;bufferBCode;bufferDCode;buffer;textureBuffer;textureWidth;textureHeight;data;bvhIndex;vertexIndicesIndex;verticesIndex;normalsIndex;materialsIndex;transformsIndex;lightsIndex};var Ui=class extends Fi{shadertoyShader=null;constructor(e){super(e)}createRenderer(){return new ii(this)}async processSceneAsync(){this.camera||this.addCamera(new _(0,0,2),new _(0,0,0),45),this.initialized=!0}};var J=class a{data;constructor(e=1,t=0,n=0,i=0,s=0,r=1,o=0,l=0,c=0,u=0,h=1,d=0,p=0,f=0,g=0,m=1){this.data=[[e,t,n,i],[s,r,o,l],[c,u,h,d],[p,f,g,m]]}static Translate(e){let t=new a;return t.data[3][0]=e.x,t.data[3][1]=e.y,t.data[3][2]=e.z,t}static Scale(e){let t=new a;return t.data[0][0]=e.x,t.data[1][1]=e.y,t.data[2][2]=e.z,t}static QuatToMatrix(e,t,n,i){let s=new a,r=e+e,o=t+t,l=n+n,c=e*r,u=e*o,h=e*l,d=t*o,p=t*l,f=n*l,g=i*r,m=i*o,x=i*l;return s.data[0][0]=1-(d+f),s.data[0][1]=u+x,s.data[0][2]=h-m,s.data[0][3]=0,s.data[1][0]=u-x,s.data[1][1]=1-(c+f),s.data[1][2]=p+g,s.data[1][3]=0,s.data[2][0]=h+m,s.data[2][1]=p-g,s.data[2][2]=1-(c+d),s.data[2][3]=0,s.data[3][0]=0,s.data[3][1]=0,s.data[3][2]=0,s.data[3][3]=1,s}multiply(e){let t=new a;for(let n=0;n<4;++n)for(let i=0;i<4;++i){t.data[n][i]=0;for(let s=0;s<4;++s)t.data[n][i]+=this.data[n][s]*e.data[s][i]}return t}get(e){return this.data[e]}decompose(){let e=new _(this.data[3][0],this.data[3][1],this.data[3][2]),t=new _(Math.sqrt(this.data[0][0]*this.data[0][0]+this.data[0][1]*this.data[0][1]+this.data[0][2]*this.data[0][2]),Math.sqrt(this.data[1][0]*this.data[1][0]+this.data[1][1]*this.data[1][1]+this.data[1][2]*this.data[1][2]),Math.sqrt(this.data[2][0]*this.data[2][0]+this.data[2][1]*this.data[2][1]+this.data[2][2]*this.data[2][2])),n=new _(this.data[0][0]/t.x,this.data[1][1]/t.y,this.data[2][2]/t.z);return{translation:e,scale:t,rotation:n}}static fromDecomposed(e,t,n){let i=a.QuatToMatrix(n.x,n.y,n.z,1),s=a.Scale(t);return a.Translate(e).multiply(s).multiply(i)}};function zc(a,e){if(e===Ic)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),a;if(e===Li||e===Rs){let t=a.getIndex();if(t===null){let r=[],o=a.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)r.push(l);a.setIndex(r),t=a.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}let n=t.count-2,i=[];if(e===Li)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=a.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),a}function Wh(a){let e=new Map,t=new Map,n=a.clone();return Xh(a,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let s=i,r=e.get(i),o=r.skeleton.bones;s.skeleton=r.skeleton.clone(),s.bindMatrix.copy(r.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Xh(a,e,t){t(a,e);for(let n=0;n<a.children.length;n++)Xh(a.children[n],e.children[n],t)}var yo=class extends je{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Yc(t)}),this.register(function(t){return new qc(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new jc(t)}),this.register(function(t){return new Zc(t)}),this.register(function(t){return new Jc(t)}),this.register(function(t){return new Qc(t)}),this.register(function(t){return new Xc(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new Kc(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new Hc(t)}),this.register(function(t){return new bo(t,K.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new bo(t,K.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new au(t)})}load(e,t,n,i){let s=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let c=Zt.extractUrlBase(e);r=Zt.resolveURL(c,this.path)}else r=Zt.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new jt(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,r,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,r={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Zh){try{r[K.KHR_BINARY_GLTF]=new ou(e)}catch(h){i&&i(h);return}s=JSON.parse(r[K.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new fu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case K.KHR_MATERIALS_UNLIT:r[h]=new Wc;break;case K.KHR_DRACO_MESH_COMPRESSION:r[h]=new lu(s,this.dracoLoader);break;case K.KHR_TEXTURE_TRANSFORM:r[h]=new cu;break;case K.KHR_MESH_QUANTIZATION:r[h]=new uu;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(r),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function vg(){let a={};return{get:function(e){return a[e]},add:function(e,t){a[e]=t},remove:function(e){delete a[e]},removeAll:function(){a={}}}}function me(a,e,t){let n=a.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var K={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Hc=class{constructor(e){this.parser=e,this.name=K.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,u=new H(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],De);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Es(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ws(u),c.distance=h;break;case"spot":c=new Ms(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Rt(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Wc=class{constructor(){this.name=K.KHR_MATERIALS_UNLIT}getMaterialType(){return Tt}extendParams(e,t,n){let i=[];e.color=new H(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],De),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,_e))}return Promise.all(i)}},Xc=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Yc=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(s,s)}return Promise.all(i)}},qc=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_DISPERSION}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Kc=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},jc=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_SHEEN}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new H(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],De)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,_e)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Zc=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Jc=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_VOLUME}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let s=n.attenuationColor||[1,1,1];return t.attenuationColor=new H().setRGB(s[0],s[1],s[2],De),Promise.all(i)}},Qc=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_IOR}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},eu=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_SPECULAR}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let s=n.specularColorFactor||[1,1,1];return t.specularColor=new H().setRGB(s[0],s[1],s[2],De),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,_e)),Promise.all(i)}},tu=class{constructor(e){this.parser=e,this.name=K.EXT_MATERIALS_BUMP}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},nu=class{constructor(e){this.parser=e,this.name=K.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return me(this.parser,e,this.name)!==null?Ve:null}extendMaterialParams(e,t){let n=me(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},iu=class{constructor(e){this.parser=e,this.name=K.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}},su=class{constructor(e){this.parser=e,this.name=K.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,r.source,l)}},ru=class{constructor(e){this.parser=e,this.name=K.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,r.source,l)}},bo=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(o,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(p){return p.buffer}):r.ready.then(function(){let p=new ArrayBuffer(u*h);return r.decodeGltfBuffer(new Uint8Array(p),u,h,d,i.mode,i.filter),p})})}else return null}},au=class{constructor(e){this.name=K.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==rt.TRIANGLES&&c.mode!==rt.TRIANGLE_STRIP&&c.mode!==rt.TRIANGLE_FAN&&c.mode!==void 0)return null;let r=n.extensions[this.name].attributes,o=[],l={};for(let c in r)o.push(this.parser.getDependency("accessor",r[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,p=[];for(let f of h){let g=new Z,m=new I,x=new qe,y=new I(1,1,1),b=new ms(f.geometry,f.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&x.fromBufferAttribute(l.ROTATION,S),l.SCALE&&y.fromBufferAttribute(l.SCALE,S),b.setMatrixAt(S,g.compose(m,x,y));for(let S in l)if(S==="_COLOR_0"){let v=l[S];b.instanceColor=new gn(v.array,v.itemSize,v.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&f.geometry.setAttribute(S,l[S]);fe.prototype.copy.call(b,f),this.parser.assignFinalMaterial(b),p.push(b)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}},Zh="glTF",Ns=12,Yh={JSON:1313821514,BIN:5130562},ou=class{constructor(e){this.name=K.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ns),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Zh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Ns,s=new DataView(e,Ns),r=0;for(;r<i;){let o=s.getUint32(r,!0);r+=4;let l=s.getUint32(r,!0);if(r+=4,l===Yh.JSON){let c=new Uint8Array(e,Ns+r,o);this.content=n.decode(c)}else if(l===Yh.BIN){let c=Ns+r;this.body=e.slice(c,c+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},lu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=K.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},l={},c={};for(let u in r){let h=du[u]||u.toLowerCase();o[h]=r[u]}for(let u in e.attributes){let h=du[u]||u.toLowerCase();if(r[u]!==void 0){let d=n.accessors[e.attributes[u]],p=Bi[d.componentType];c[h]=p.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(p){for(let f in p.attributes){let g=p.attributes[f],m=l[f];m!==void 0&&(g.normalized=m)}h(p)},o,c,De,d)})})}},cu=class{constructor(){this.name=K.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},uu=class{constructor(){this.name=K.KHR_MESH_QUANTIZATION}},vo=class extends Mt{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=i-t,h=(n-t)/u,d=h*h,p=d*h,f=e*c,g=f-c,m=-2*p+3*d,x=p-d,y=1-m,b=x-d+h;for(let S=0;S!==o;S++){let v=r[g+S+o],M=r[g+S+l]*u,T=r[f+S+o],w=r[f+S]*u;s[S]=y*v+b*M+m*T+x*w}return s}},Tg=new qe,hu=class extends vo{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return Tg.fromArray(s).normalize().toArray(s),s}},rt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Bi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},qh={9728:bi,9729:Qe,9984:wc,9985:Ac,9986:Ec,9987:Ri},Kh={33071:Ht,33648:hs,10497:Gn},kc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},du={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},vn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Sg={CUBICSPLINE:void 0,LINEAR:kn,STEP:zn},Vc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Mg(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new Hn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:yi})),a.DefaultMaterial}function qn(a,e,t){for(let n in t.extensions)a[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Rt(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function wg(a,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(a);let r=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):a.attributes.position;r.push(d)}if(i){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):a.attributes.normal;o.push(d)}if(s){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):a.attributes.color;l.push(d)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(a.morphAttributes.position=u),i&&(a.morphAttributes.normal=h),s&&(a.morphAttributes.color=d),a.morphTargetsRelative=!0,a})}function Eg(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)a.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(a.morphTargetInfluences.length===t.length){a.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)a.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ag(a){let e,t=a.extensions&&a.extensions[K.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+$c(t.attributes):e=a.indices+":"+$c(a.attributes)+":"+a.mode,a.targets!==void 0)for(let n=0,i=a.targets.length;n<i;n++)e+=":"+$c(a.targets[n]);return e}function $c(a){let e="",t=Object.keys(a).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+a[t[n]]+";";return e}function pu(a){switch(a){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Cg(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":a.search(/\.ktx2($|\?)/i)>0||a.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Rg=new Z,fu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new vg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,r=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new vs(this.options.manager):this.textureLoader=new As(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new jt(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let o={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return qn(s,o,i),Rt(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i].joints;for(let o=0,l=r.length;o<l;o++)e[r[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(r,o)=>{let l=this.associations.get(r);l!=null&&this.associations.set(o,l);for(let[c,u]of r.children.entries())s(u,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[K.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,r){n.load(Zt.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let r=kc[i.type],o=Bi[i.componentType],l=i.normalized===!0,c=new o(i.count*r);return Promise.resolve(new Le(c,r,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){let o=r[0],l=kc[i.type],c=Bi[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,f=i.normalized===!0,g,m;if(p&&p!==h){let x=Math.floor(d/p),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+x+":"+i.count,b=t.cache.get(y);b||(g=new c(o,x*p,i.count*p/u),b=new Si(g,p/u),t.cache.add(y,b)),m=new Mi(b,l,d%p/u,f)}else o===null?g=new c(i.count*l):g=new c(o,d,i.count*l),m=new Le(g,l,f);if(i.sparse!==void 0){let x=kc.SCALAR,y=Bi[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,v=new y(r[1],b,i.sparse.count*x),M=new c(r[2],S,i.sparse.count*l);o!==null&&(m=new Le(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,w=v.length;T<w;T++){let C=v[T];if(m.setX(C,M[T*l]),l>=2&&m.setY(C,M[T*l+1]),l>=3&&m.setZ(C,M[T*l+2]),l>=4&&m.setW(C,M[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=f}return m})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s],o=this.textureLoader;if(r.uri){let l=n.manager.getHandler(r.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,r=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=r.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(s.samplers||{})[r.sampler]||{};return u.magFilter=qh[d.magFilter]||Qe,u.minFilter=qh[d.minFilter]||Ri,u.wrapS=Kh[d.wrapS]||Gn,u.wrapT=Kh[d.wrapT]||Gn,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==bi&&u.minFilter!==Qe,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let r=i.images[e],o=self.URL||self.webkitURL,l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=n.getDependency("bufferView",r.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:r.mimeType});return l=o.createObjectURL(d),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(h){return new Promise(function(d,p){let f=d;t.isImageBitmapLoader===!0&&(f=function(g){let m=new ft(g);m.needsUpdate=!0,d(m)}),t.load(Zt.resolveURL(h,s.path),f,void 0,p)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),Rt(h,r),h.userData.mimeType=r.mimeType||Cg(r.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[K.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[K.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(r);r=s.extensions[K.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,l)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new gt,Fe.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new St,Fe.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||r){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),r&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Hn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],r,o={},l=s.extensions||{},c=[];if(l[K.KHR_MATERIALS_UNLIT]){let h=i[K.KHR_MATERIALS_UNLIT];r=h.getMaterialType(),c.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new H(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],De),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,_e)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Cs);let u=s.alphaMode||Vc.OPAQUE;if(u===Vc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Vc.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==Tt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new re(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&r!==Tt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==Tt){let h=s.emissiveFactor;o.emissive=new H().setRGB(h[0],h[1],h[2],De)}return s.emissiveTexture!==void 0&&r!==Tt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,_e)),Promise.all(c).then(function(){let h=new r(o);return s.name&&(h.name=s.name),Rt(h,s),t.associations.set(h,{materials:e}),s.extensions&&qn(i,h,s),h})}createUniqueName(e){let t=oe.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[K.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return jh(l,o,t)})}let r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=Ag(c),h=i[u];if(h)r.push(h.promise);else{let d;c.extensions&&c.extensions[K.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=jh(new tt,c,t),i[u]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,o=[];for(let l=0,c=r.length;l<c;l++){let u=r[l].material===void 0?Mg(this.cache):this.getDependency("material",r[l].material);o.push(u)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let p=0,f=u.length;p<f;p++){let g=u[p],m=r[p],x,y=c[p];if(m.mode===rt.TRIANGLES||m.mode===rt.TRIANGLE_STRIP||m.mode===rt.TRIANGLE_FAN||m.mode===void 0)x=s.isSkinnedMesh===!0?new ps(g,y):new mt(g,y),x.isSkinnedMesh===!0&&x.normalizeSkinWeights(),m.mode===rt.TRIANGLE_STRIP?x.geometry=zc(x.geometry,Rs):m.mode===rt.TRIANGLE_FAN&&(x.geometry=zc(x.geometry,Li));else if(m.mode===rt.LINES)x=new xn(g,y);else if(m.mode===rt.LINE_STRIP)x=new $n(g,y);else if(m.mode===rt.LINE_LOOP)x=new gs(g,y);else if(m.mode===rt.POINTS)x=new Yt(g,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(x.geometry.morphAttributes).length>0&&Eg(x,s),x.name=t.createUniqueName(s.name||"mesh_"+e),Rt(x,s),m.extensions&&qn(i,x,m),t.assignFinalMaterial(x),h.push(x)}for(let p=0,f=h.length;p<f;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return s.extensions&&qn(i,h[0],s),h[0];let d=new Xt;s.extensions&&qn(i,d,s),t.associations.set(d,{meshes:e});for(let p=0,f=h.length;p<f;p++)d.add(h[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Wn(Dc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ci(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Rt(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),r=i,o=[],l=[];for(let c=0,u=r.length;c<u;c++){let h=r[c];if(h){o.push(h);let d=new Z;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new fs(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],o=[],l=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){let p=i.channels[h],f=i.samplers[p.sampler],g=p.target,m=g.node,x=i.parameters!==void 0?i.parameters[f.input]:f.input,y=i.parameters!==void 0?i.parameters[f.output]:f.output;g.node!==void 0&&(r.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",x)),l.push(this.getDependency("accessor",y)),c.push(f),u.push(g))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],p=h[1],f=h[2],g=h[3],m=h[4],x=[];for(let b=0,S=d.length;b<S;b++){let v=d[b],M=p[b],T=f[b],w=g[b],C=m[b];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();let E=n._createAnimationTracks(v,M,T,w,C);if(E)for(let R=0;R<E.length;R++)x.push(E[R])}let y=new ys(s,void 0,x);return Rt(y,i),y})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),r})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],o=i.children||[];for(let c=0,u=o.length;c<u;c++)r.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),l]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(d,Rg)});for(let p=0,f=h.length;p<f;p++)u.add(h[p]);if(u.userData.pivot!==void 0&&h.length>0){let p=u.userData.pivot,f=h[0];u.pivot=new I().fromArray(p),u.position.x-=p[0],u.position.y-=p[1],u.position.z-=p[2],f.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(s.isBone===!0?u=new wi:c.length>1?u=new Xt:c.length===1?u=c[0]:u=new fe,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=r),Rt(u,s),s.extensions&&qn(n,u,s),s.matrix!==void 0){let h=new Z;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Xt;n.name&&(s.name=i.createUniqueName(n.name)),Rt(s,n),n.extensions&&qn(t,s,n);let r=n.nodes||[],o=[];for(let l=0,c=r.length;l<c;l++)o.push(i.getDependency("node",r[l]));return Promise.all(o).then(function(l){for(let u=0,h=l.length;u<h;u++){let d=l[u];d.parent!==null?s.add(Wh(d)):s.add(d)}let c=u=>{let h=new Map;for(let[d,p]of i.associations)(d instanceof Fe||d instanceof ft)&&h.set(d,p);return u.traverse(d=>{let p=i.associations.get(d);p!=null&&h.set(d,p)}),h};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let r=[],o=e.name?e.name:e.uuid,l=[];function c(p){p.morphTargetInfluences&&l.push(p.name?p.name:p.uuid)}vn[s.path]===vn.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let u;switch(vn[s.path]){case vn.weights:u=wt;break;case vn.rotation:u=Et;break;case vn.translation:case vn.scale:u=At;break;default:n.itemSize===1?u=wt:u=At;break}let h=i.interpolation!==void 0?Sg[i.interpolation]:kn,d=this._getArrayFromAccessor(n);for(let p=0,f=l.length;p<f;p++){let g=new u(l[p]+"."+vn[s.path],t.array,d,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),r.push(g)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=pu(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Et?hu:vo;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ig(a,e,t){let n=e.attributes,i=new Ke;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),o.normalized){let u=pu(Bi[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new I,l=new I;for(let c=0,u=s.length;c<u;c++){let h=s[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],p=d.min,f=d.max;if(p!==void 0&&f!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(f[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(f[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(f[2]))),d.normalized){let g=pu(Bi[d.componentType]);l.multiplyScalar(g)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}a.boundingBox=i;let r=new ke;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,a.boundingSphere=r}function jh(a,e,t){let n=e.attributes,i=[];function s(r,o){return t.getDependency("accessor",r).then(function(l){a.setAttribute(o,l)})}for(let r in n){let o=du[r]||r.toLowerCase();o in a.attributes||i.push(s(n[r],o))}if(e.indices!==void 0&&!a.index){let r=t.getDependency("accessor",e.indices).then(function(o){a.setIndex(o)});i.push(r)}return Ne.workingColorSpace!==De&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ne.workingColorSpace}" not supported.`),Rt(a,e),Ig(a,e,t),Promise.all(i).then(function(){return e.targets!==void 0?wg(a,e.targets,t):a})}async function Qt(a,e,t,n,i){try{let s=await new yo().loadAsync(a);s.scene.updateMatrixWorld(!0);let r=new Map,o=new Map,l=p=>{let f=p.elements;return new J(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8],f[9],f[10],f[11],f[12],f[13],f[14],f[15])},c=p=>{if(!p)return-1;let f=r.get(p);if(f!==void 0)return f;let g=p.image,m=new yt(p.name||null,g??null);if(m.flipY=t.flipTexturesY,g){let y=g;m.width=y.width??null,m.height=y.height??null}e.textures.push(m);let x=e.textures.length-1;return r.set(p,x),x},u=()=>{if(e.materials.length===0){let p=new nt;p.name="Default",e.addMaterial(p)}return 0},h=p=>{if(!p)return u();let f=o.get(p);if(f!==void 0)return f;let g=new nt;g.name=p.name;let m=p;if(m.color&&(g.baseColor=new _(m.color.r??1,m.color.g??1,m.color.b??1)),typeof m.ior=="number"&&(g.ior=m.ior),g.opacity=m.opacity??1,g.alphaCutoff=m.alphaTest??.5,m.alphaMode==="BLEND"||m.transparent?g.alphaMode=1:m.alphaMode==="MASK"||(m.alphaTest??0)>0?g.alphaMode=2:g.alphaMode=0,typeof m.roughness=="number"&&(g.roughness=Math.sqrt(m.roughness)),typeof m.metalness=="number"&&(g.metallic=m.metalness),typeof m.specularIntensity=="number"&&(g.specularTint=m.specularIntensity,g.specularColor=new _(m.specularIntensity,m.specularIntensity,m.specularIntensity)),m.specularColor){let y=m.specularColor.r??1,b=m.specularColor.g??1,S=m.specularColor.b??1,v=typeof m.specularIntensity=="number"?m.specularIntensity:1;g.specularColor=new _(y*v,b*v,S*v);let M=((m.specularColor.r??1)+(m.specularColor.g??1)+(m.specularColor.b??1))/3;g.specularTint*=M}if(typeof m.clearcoat=="number"&&(g.clearcoat=m.clearcoat),typeof m.clearcoatRoughness=="number"){let y=Math.min(1,Math.max(0,m.clearcoatRoughness));g.clearcoatGloss=1-y}if(typeof m.sheen=="number"&&(g.sheen=m.sheen),m.sheenColor&&(g.sheenTint=((m.sheenColor.r??0)+(m.sheenColor.g??0)+(m.sheenColor.b??0))/3),typeof m.anisotropy=="number"&&(g.anisotropic=Math.abs(m.anisotropy)),m.emissive){let y=m.emissiveIntensity??1;g.emission=new _((m.emissive.r??0)*y,(m.emissive.g??0)*y,(m.emissive.b??0)*y)}typeof m.transmission=="number"&&(g.specTrans=m.transmission),typeof m.attenuationDistance=="number"&&Number.isFinite(m.attenuationDistance)&&m.attenuationDistance>0&&(g.mediumScattering=0,g.mediumAbsorption=1/m.attenuationDistance),m.attenuationColor&&(g.mediumColor=new _(m.attenuationColor.r??1,m.attenuationColor.g??1,m.attenuationColor.b??1)),g.specTrans>0&&g.mediumAbsorption>0&&(g.mediumType=1,typeof m.thickness=="number"&&(g.mediumThickness=Math.max(m.thickness,0))),g.doubleSided=m.side===Cs?1:0,g.baseColorTexID=c(m.map),g.metallicRoughnessTexID=c(m.metalnessMap??m.roughnessMap),g.normalmapTexID=c(m.normalMap),g.emissionmapTexID=c(m.emissiveMap);let x=e.addMaterial(g);return o.set(p,x),x},d=(p,f,g,m,x,y,b)=>{for(let S=0;S<y;S++){let v=x(b+S),M=f.getX(v),T=f.getY(v),w=f.getZ(v),C=g.getX(v),E=g.getY(v),R=g.getZ(v),N=m?m.getX(v):S%3===1?0:1,A=m?m.getY(v):S%3===0?0:1;p.verticesUVX.push(new V(M,T,w,N)),p.normalsUVY.push(new V(C,E,R,1-A))}};return s.scene.traverse(p=>{let f=p;if(!f.isMesh)return;let g=f.geometry,m=g.getAttribute("position");if(!m||m.count===0)return;let x=g.getAttribute("normal");if(!x){let C=g.clone();if(C.computeVertexNormals(),x=C.getAttribute("normal"),!x)return}let y=g.getAttribute("uv"),b=g.getIndex(),S=C=>b?b.getX(C):C,v=b?b.count:m.count,M=l(f.matrixWorld).multiply(n),T=Array.isArray(f.material)?f.material:[f.material],w=g.groups&&g.groups.length>0?g.groups:[{start:0,count:v,materialIndex:0}];for(let C=0;C<w.length;C++){let E=w[C],R=Math.floor(E.count/3)*3;if(R<=0)continue;let N=new _n;N.name=f.name||`GLTFMesh_${e.meshes.length}`,d(N,m,x,y,S,R,E.start);let A=e.meshes.length;e.meshes.push(N);let F=T[E.materialIndex]??T[0]??null,z=h(F),k=new yn(f.name||`Instance_${A}`,A,M,z);e.addMeshInstance(k)}}),e.materials.length===0&&u(),e.meshes.length>0}catch(s){return console.error("Error loading GLTF file:",s),!1}}var Lg=`<div class="gl-box">
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
</div>`,Pg=`#gl-bench {
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
`,To=class{constructor(e,t={}){this.css=Pg,this.svg=Lg,this.paramLogger=()=>{},this.chartLogger=()=>{},this.chartLen=20,this.chartHz=20,this.names=[],this.cpuAccums=[],this.gpuAccums=[],this.activeAccums=[],this.chart=new Array(this.chartLen),this.now=()=>performance&&performance.now?performance.now():Date.now(),this.updateUI=()=>{[].forEach.call(this.nodes["gl-gpu-svg"],o=>{o.style.display=this.trackGPU?"inline":"none"})},Object.assign(this,t),this.detected=0,this.finished=[],this.isFramebuffer=0,this.frameId=0;let n,i=0,s,r=o=>{++i<20?n=requestAnimationFrame(r):(this.detected=Math.ceil(1e3*i/(o-s)/70),cancelAnimationFrame(n)),s||(s=o)};if(requestAnimationFrame(r),e){let o=async(c,u)=>Promise.resolve(setTimeout(()=>{e.getError();let h=this.now()-c;u.forEach((d,p)=>{d&&(this.gpuAccums[p]+=h)})},0)),l=(c,u,h)=>function(){let d=u.now();c.apply(h,arguments),u.trackGPU&&u.finished.push(o(d,u.activeAccums.slice(0)))};["drawArrays","drawElements","drawArraysInstanced","drawBuffers","drawElementsInstanced","drawRangeElements"].forEach(c=>{e[c]&&(e[c]=l(e[c],this,e))}),e.getExtension=((c,u)=>function(){let h=c.apply(e,arguments);return h&&["drawElementsInstancedANGLE","drawBuffersWEBGL"].forEach(d=>{h[d]&&(h[d]=l(h[d],u,h))}),h})(e.getExtension,this)}if(!this.withoutUI){this.dom||(this.dom=document.body);let o=document.createElement("div");o.id="gl-bench",this.dom.appendChild(o),this.dom.insertAdjacentHTML("afterbegin",'<style id="gl-bench-style">'+this.css+"</style>"),this.dom=o,this.dom.addEventListener("click",()=>{this.trackGPU=!this.trackGPU,this.updateUI()}),this.paramLogger=((l,c,u)=>{let h=["gl-cpu","gl-gpu","gl-mem","gl-fps","gl-gpu-svg","gl-chart"],d=Object.assign({},h);return h.forEach(p=>d[p]=c.getElementsByClassName(p)),this.nodes=d,(p,f,g,m,x,y,b)=>{d["gl-cpu"][p].style.strokeDasharray=(f*.27).toFixed(0)+" 100",d["gl-gpu"][p].style.strokeDasharray=(g*.27).toFixed(0)+" 100",d["gl-mem"][p].innerHTML=u[p]?u[p]:m?"mem: "+m.toFixed(0)+"mb":"",d["gl-fps"][p].innerHTML=x.toFixed(0)+" FPS",l(u[p],f,g,m,x,y,b)}})(this.paramLogger,this.dom,this.names),this.chartLogger=((l,c)=>{let u={"gl-chart":c.getElementsByClassName("gl-chart")};return(h,d,p)=>{let f="",g=d.length;for(let m=0;m<g;m++){let x=(p+m+1)%g;d[x]!=null&&(f=f+" "+(55*m/(g-1)).toFixed(1)+","+(45-d[x]*22/60/this.detected).toFixed(1))}u["gl-chart"][h].setAttribute("points",f),l(this.names[h],d,p)}})(this.chartLogger,this.dom)}}addUI(e){this.names.indexOf(e)==-1&&(this.names.push(e),this.dom&&(this.dom.insertAdjacentHTML("beforeend",this.svg),this.updateUI()),this.cpuAccums.push(0),this.gpuAccums.push(0),this.activeAccums.push(!1))}nextFrame(e){this.frameId++;let t=e||this.now();if(this.frameId<=1)this.paramFrame=this.frameId,this.paramTime=t;else{let n=t-this.paramTime;if(n>=1e3){let i=this.frameId-this.paramFrame,s=i/n*1e3;for(let r=0;r<this.names.length;r++){let o=this.cpuAccums[r]/n*100,l=this.gpuAccums[r]/n*100,c=performance&&performance.memory?performance.memory.usedJSHeapSize/(1<<20):0;this.paramLogger(r,o,l,c,s,n,i),this.cpuAccums[r]=0,Promise.all(this.finished).then(()=>{this.gpuAccums[r]=0,this.finished=[]})}this.paramFrame=this.frameId,this.paramTime=t}}if(!this.detected||!this.chartFrame)this.chartFrame=this.frameId,this.chartTime=t,this.circularId=0;else{let n=t-this.chartTime,i=this.chartHz*n/1e3;for(;--i>0&&this.detected;){let r=(this.frameId-this.chartFrame)/n*1e3;this.chart[this.circularId%this.chartLen]=r;for(let o=0;o<this.names.length;o++)this.chartLogger(o,this.chart,this.circularId);this.circularId++,this.chartFrame=this.frameId,this.chartTime=t}}}begin(e){this.updateAccums(e)}end(e){this.updateAccums(e)}updateAccums(e){let t=this.names.indexOf(e);t==-1&&(t=this.names.length,this.addUI(e));let n=this.now(),i=n-this.t0;for(let s=0;s<t+1;s++)this.activeAccums[s]&&(this.cpuAccums[s]+=i);this.activeAccums[t]=!this.activeAccums[t],this.t0=n}};var Tn=class a{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),a.nextNameID=a.nextNameID||0,this.$name.id=`lil-gui-name-${++a.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",r=>r.stopPropagation()),this.domElement.addEventListener("keyup",r=>r.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},mu=class extends Tn{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function gu(a){let e,t;return(e=a.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=a.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=a.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}var Ng={isPrimitive:!0,match:a=>typeof a=="string",fromHexString:gu,toHexString:gu},Fs={isPrimitive:!0,match:a=>typeof a=="number",fromHexString:a=>parseInt(a.substring(1),16),toHexString:a=>"#"+a.toString(16).padStart(6,0)},Dg={isPrimitive:!1,match:a=>Array.isArray(a),fromHexString(a,e,t=1){let n=Fs.fromHexString(a);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([a,e,t],n=1){n=255/n;let i=a*n<<16^e*n<<8^t*n<<0;return Fs.toHexString(i)}},Fg={isPrimitive:!1,match:a=>Object(a)===a,fromHexString(a,e,t=1){let n=Fs.fromHexString(a);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:a,g:e,b:t},n=1){n=255/n;let i=a*n<<16^e*n<<8^t*n<<0;return Fs.toHexString(i)}},Ug=[Ng,Fs,Dg,Fg];function Bg(a){return Ug.find(e=>e.match(a))}var xu=class extends Tn{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Bg(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{let s=gu(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},Ds=class extends Tn{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}},_u=class extends Tn{constructor(e,t,n,i,s,r){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);let o=r!==void 0;this.step(o?r:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;let t=()=>{let y=parseFloat(this.$input.value);isNaN(y)||(this._stepExplicit&&(y=this._snap(y)),this.setValue(this._clamp(y)))},n=y=>{let b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+y),this.$input.value=this.getValue())},i=y=>{y.key==="Enter"&&this.$input.blur(),y.code==="ArrowUp"&&(y.preventDefault(),n(this._step*this._arrowKeyMultiplier(y))),y.code==="ArrowDown"&&(y.preventDefault(),n(this._step*this._arrowKeyMultiplier(y)*-1))},s=y=>{this._inputFocused&&(y.preventDefault(),n(this._step*this._normalizeMouseWheel(y)))},r=!1,o,l,c,u,h,d=5,p=y=>{o=y.clientX,l=c=y.clientY,r=!0,u=this.getValue(),h=0,window.addEventListener("mousemove",f),window.addEventListener("mouseup",g)},f=y=>{if(r){let b=y.clientX-o,S=y.clientY-l;Math.abs(S)>d?(y.preventDefault(),this.$input.blur(),r=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>d&&g()}if(!r){let b=y.clientY-c;h-=b*this._step*this._arrowKeyMultiplier(y),u+h>this._max?h=this._max-u:u+h<this._min&&(h=this._min-u),this._snapClampSetValue(u+h)}c=y.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",g)},m=()=>{this._inputFocused=!0},x=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",x)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");let e=(x,y,b,S,v)=>(x-y)/(b-y)*(v-S)+S,t=x=>{let y=this.$slider.getBoundingClientRect(),b=e(x,y.left,y.right,this._min,this._max);this._snapClampSetValue(b)},n=x=>{this._setDraggingStyle(!0),t(x.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=x=>{t(x.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)},r=!1,o,l,c=x=>{x.preventDefault(),this._setDraggingStyle(!0),t(x.touches[0].clientX),r=!1},u=x=>{x.touches.length>1||(this._hasScrollBar?(o=x.touches[0].clientX,l=x.touches[0].clientY,r=!0):c(x),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=x=>{if(r){let y=x.touches[0].clientX-o,b=x.touches[0].clientY-l;Math.abs(y)>Math.abs(b)?c(x):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else x.preventDefault(),t(x.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this),f=400,g,m=x=>{if(Math.abs(x.deltaX)<Math.abs(x.deltaY)&&this._hasScrollBar)return;x.preventDefault();let b=this._normalizeMouseWheel(x)*this._step;this._snapClampSetValue(this.getValue()+b),this.$input.value=this.getValue(),clearTimeout(g),g=setTimeout(p,f)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},yu=class extends Tn{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{let n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},bu=class extends Tn{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},Og=`.lil-gui {
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
}`;function Gg(a){let e=document.createElement("style");e.innerHTML=a;let t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}var Jh=!1,So=class a{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:r=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Jh&&o&&(Gg(Og),Jh=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=r}add(e,t,n,i,s){if(Object(n)===n)return new yu(this,e,t,n);let r=e[t];switch(typeof r){case"number":return new _u(this,e,t,n,i,s);case"boolean":return new mu(this,e,t);case"string":return new bu(this,e,t);case"function":return new Ds(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,r)}addColor(e,t,n=1){return new xu(this,e,t,n)}addFolder(e){let t=new a({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Ds||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Ds)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");let n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);let i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}};var xt=class{position;emission;u;v;radius;area;type;constructor(){this.position=new _,this.emission=new _,this.u=new _,this.v=new _,this.radius=0,this.area=0,this.type=0}};function ge(a,e){let t=a.querySelector(`input[name="${e}"]`);if(!t)return null;let n=parseFloat(t.getAttribute("value")??"");return isNaN(n)?null:n}function Mo(a,e){let t=a.querySelector(`input[name="${e}"]`);if(!t)return null;let n=parseInt(t.getAttribute("value")??"",10);return isNaN(n)?null:n}function It(a,e){let t=a.querySelector(`input[name="${e}"]`);if(!t)return null;let n=(t.getAttribute("value")??"").split(",").map(i=>parseFloat(i.trim()));return n.length<3||n.some(isNaN)?null:new _(n[0],n[1],n[2])}function Lt(a,e){let t=a.querySelector(`input[name="${e}"]`);if(!t)return null;let i=(t.getAttribute("value")??"").replace(/\s+/g,",").replace(/,+/g,",").split(",").map(s=>parseFloat(s.trim()));return i.length<3||i.some(isNaN)?null:new _(i[0],i[1],i[2])}function wo(a,e){let t=a.querySelector(`input[name="${e}"]`);return t?t.getAttribute("value")?.toLowerCase()==="true":null}var He=class{name;constructor(e){this.name=e}static clamp01(e){return Math.min(Math.max(e,0),1)}static clampVec(e){return _.clamp(e.clone(),new _(0,0,0),new _(1,1,1))}static resetMaterial(e){e.materialType=0,e.baseWeight=1,e.baseDiffuseRoughness=0,e.metallic=0,e.specularTint=0,e.specularWeight=1,e.specularColor=new _(1,1,1),e.anisotropic=0,e.anisotropyRotation=0,e.specTrans=0,e.transmissionColor=new _(1,1,1),e.transmissionExtraRoughness=0,e.subsurface=0,e.subsurfaceRadiusScale=new _(1,1,1),e.sheen=0,e.sheenTint=0,e.fuzzColor=new _(-1,-1,-1),e.fuzzRoughness=.5,e.clearcoat=0,e.clearcoatGloss=1,e.coatColor=new _(1,1,1),e.coatIOR=1.6,e.coatDarkening=1,e.coatRoughnessAnisotropy=0,e.coatAnisotropyRotation=0,e.coatAffectRoughness=0,e.thinFilmWeight=0,e.thinFilmThickness=0,e.thinFilmIor=1.5,e.emission=new _(0,0,0),e.opacity=1,e.alphaMode=0,e.alphaCutoff=0,e.doubleSided=0,e.thinWalled=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0,e.dispersionScale=0,e.abbeNumber=50,e.uvScale=new Y(1,1)}};var Eo=class a extends He{base_weight=1;base_color=new _(.8,.8,.8);base_diffuse_roughness=0;base_metalness=0;specular_weight=1;specular_color=new _(1,1,1);specular_roughness=.3;specular_ior=1.5;specular_roughness_anisotropy=0;transmission_weight=0;transmission_color=new _(1,1,1);transmission_depth=0;transmission_scatter=new _(0,0,0);transmission_scatter_anisotropy=0;transmission_dispersion_scale=0;transmission_dispersion_abbe_number=20;subsurface_weight=0;subsurface_color=new _(.8,.8,.8);subsurface_radius=1;subsurface_radius_scale=new _(1,.5,.25);subsurface_scatter_anisotropy=0;fuzz_weight=0;fuzz_color=new _(1,1,1);fuzz_roughness=.5;coat_weight=0;coat_color=new _(1,1,1);coat_roughness=0;coat_roughness_anisotropy=0;coat_ior=1.6;coat_darkening=1;thin_film_weight=0;thin_film_thickness=.5;thin_film_ior=1.4;emission_luminance=0;emission_color=new _(1,1,1);geometry_opacity=1;geometry_thin_walled=!1;constructor(e){super(e)}toMaterial(e){if(e.baseWeight=this.base_weight,e.baseColor=this.base_color.clone(),e.baseDiffuseRoughness=this.base_diffuse_roughness,e.metallic=Math.min(Math.max(this.base_metalness,0),1),e.roughness=Math.min(Math.max(this.specular_roughness,.001),1),e.ior=Math.max(this.specular_ior,1),e.anisotropic=this.specular_roughness_anisotropy,e.specularColor=_.clamp(this.specular_color.clone(),new _(0,0,0),new _(1,1,1)),e.specularWeight=Math.min(Math.max(this.specular_weight,0),1),e.specTrans=Math.min(Math.max(this.transmission_weight,0),1),e.transmissionColor=_.clamp(this.transmission_color.clone(),new _(0,0,0),new _(1,1,1)),e.dispersionScale=Math.min(Math.max(this.transmission_dispersion_scale,0),1),e.abbeNumber=Math.max(this.transmission_dispersion_abbe_number,1),e.thinWalled=this.geometry_thin_walled?1:0,e.doubleSided=this.geometry_thin_walled?1:0,e.subsurface=Math.min(Math.max(this.subsurface_weight,0),1),e.subsurfaceRadiusScale=_.max(this.subsurface_radius_scale.clone(),new _(.001,.001,.001)),this.geometry_thin_walled)e.subsurface=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;else if(this.subsurface_weight>0){e.mediumType=2,e.mediumColor=_.clamp(this.subsurface_color.clone(),new _(0,0,0),new _(1,1,1)),e.mediumAnisotropy=Math.min(Math.max(this.subsurface_scatter_anisotropy,-.99),.99),e.mediumThickness=Math.max(this.subsurface_radius,0);let t=Math.min(Math.max(this.subsurface_color.x*.2126+this.subsurface_color.y*.7152+this.subsurface_color.z*.0722,0),1),n=1/Math.max(this.subsurface_radius,.001);e.mediumAbsorption=n*(1-t),e.mediumScattering=n-e.mediumAbsorption}else if(!this.geometry_thin_walled&&this.transmission_weight>0&&this.transmission_depth>0){e.mediumType=1,e.mediumColor=_.clamp(this.transmission_color.clone(),new _(0,0,0),new _(1,1,1));let t=Math.max(this.transmission_depth,0);e.mediumThickness=0,e.mediumAnisotropy=Math.min(Math.max(this.transmission_scatter_anisotropy,-.99),.99),e.mediumScattering=0,e.mediumAbsorption=1/Math.max(t,.001)}else e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;e.sheen=Math.min(Math.max(this.fuzz_weight,0),1),e.fuzzColor=_.clamp(this.fuzz_color.clone(),new _(0,0,0),new _(1,1,1)),e.sheenTint=0,e.fuzzRoughness=Math.min(Math.max(this.fuzz_roughness,0),1),e.clearcoat=Math.min(Math.max(this.coat_weight,0),1),e.clearcoatGloss=Math.min(Math.max(1-this.coat_roughness,0),1),e.coatColor=_.clamp(this.coat_color.clone(),new _(0,0,0),new _(1,1,1)),e.coatIOR=Math.max(this.coat_ior,1.01),e.coatRoughnessAnisotropy=Math.min(Math.max(this.coat_roughness_anisotropy,0),1),e.coatDarkening=Math.min(Math.max(this.coat_darkening,0),1),e.emission=new _(this.emission_color.x*this.emission_luminance,this.emission_color.y*this.emission_luminance,this.emission_color.z*this.emission_luminance),e.opacity=Math.min(Math.max(this.geometry_opacity,0),1),e.alphaMode=e.opacity<1?1:0,e.thinFilmWeight=Math.min(Math.max(this.thin_film_weight,0),1),e.thinFilmThickness=Math.max(this.thin_film_thickness*1e3,0),e.thinFilmIor=Math.max(this.thin_film_ior,1)}static parse(e){let t=e.getAttribute("name")??"openPbr",n=new a(t),i=(o,l)=>{let c=ge(e,l);c!==null&&(n[o]=c)},s=(o,l)=>{let c=It(e,l);c!==null&&(n[o]=c)},r=(o,l)=>{let c=wo(e,l);c!==null&&(n[o]=c)};return i("base_weight","base_weight"),s("base_color","base_color"),i("base_diffuse_roughness","base_diffuse_roughness"),i("base_metalness","base_metalness"),i("specular_weight","specular_weight"),s("specular_color","specular_color"),i("specular_roughness","specular_roughness"),i("specular_ior","specular_ior"),i("specular_roughness_anisotropy","specular_roughness_anisotropy"),i("transmission_weight","transmission_weight"),s("transmission_color","transmission_color"),i("transmission_depth","transmission_depth"),s("transmission_scatter","transmission_scatter"),i("transmission_scatter_anisotropy","transmission_scatter_anisotropy"),i("transmission_dispersion_scale","transmission_dispersion_scale"),i("transmission_dispersion_abbe_number","transmission_dispersion_abbe_number"),i("subsurface_weight","subsurface_weight"),s("subsurface_color","subsurface_color"),i("subsurface_radius","subsurface_radius"),s("subsurface_radius_scale","subsurface_radius_scale"),i("subsurface_scatter_anisotropy","subsurface_scatter_anisotropy"),i("fuzz_weight","fuzz_weight"),s("fuzz_color","fuzz_color"),i("fuzz_roughness","fuzz_roughness"),i("coat_weight","coat_weight"),s("coat_color","coat_color"),i("coat_roughness","coat_roughness"),i("coat_roughness_anisotropy","coat_roughness_anisotropy"),i("coat_ior","coat_ior"),i("coat_darkening","coat_darkening"),i("thin_film_weight","thin_film_weight"),i("thin_film_thickness","thin_film_thickness"),i("thin_film_ior","thin_film_ior"),i("emission_luminance","emission_luminance"),s("emission_color","emission_color"),i("geometry_opacity","geometry_opacity"),r("geometry_thin_walled","geometry_thin_walled"),n}static aluminumBrushed(){let e=new a("Aluminum_Brushed");return e.base_color=new _(.912,.914,.92),e.base_metalness=1,e.specular_color=new _(.97,.979,.988),e.specular_roughness=.2,e.specular_roughness_anisotropy=.9,e}static plastic(){let e=new a("Plastic");return e.base_color=new _(.78,.12,.12),e.base_metalness=0,e.specular_roughness=.28,e.specular_ior=1.5,e}static metal(){let e=new a("Metal");return e.base_color=new _(.72,.74,.76),e.base_metalness=1,e.specular_roughness=.22,e.specular_roughness_anisotropy=.15,e}static gold(){let e=new a("Gold");return e.base_color=new _(.98,.78,.18),e.base_metalness=1,e.specular_roughness=.12,e}static silver(){let e=new a("Silver");return e.base_color=new _(.93,.94,.95),e.base_metalness=1,e.specular_roughness=.08,e}static carPaint(){let e=new a("Car_Paint");return e.base_color=new _(.1,.6,.9),e.specular_ior=1.6,e.specular_roughness=.3,e.coat_weight=1,e.coat_roughness=.02,e.coat_ior=1.6,e}static glass(){let e=new a("Glass");return e.specular_roughness=0,e.specular_ior=1.52,e.transmission_weight=1,e.transmission_dispersion_abbe_number=64,e.transmission_dispersion_scale=1,e}static honey(){let e=new a("Honey");return e.specular_roughness=0,e.specular_ior=1.504,e.transmission_weight=1,e.transmission_color=new _(.83,.4,.04),e.transmission_depth=2,e.transmission_scatter=new _(.9,.9,.9),e}static ketchup(){let e=new a("Ketchup");return e.base_color=new _(.164,.006,.002),e.specular_roughness=0,e.specular_ior=1.3,e.subsurface_weight=1,e.subsurface_color=new _(.164,.006,.002),e.subsurface_radius_scale=new _(.476,.058,.039),e}static lightBulb(){let e=new a("Light_Bulb");return e.emission_color=new _(1,.415,.099),e.emission_luminance=1e4,e}static emissive(){let e=new a("Emissive");return e.base_color=new _(.05,.05,.05),e.emission_color=new _(1,.9,.7),e.emission_luminance=1500,e}static clearcoatPlastic(){let e=new a("Clearcoat_Plastic");return e.base_color=new _(.2,.35,.9),e.base_metalness=0,e.specular_roughness=.25,e.coat_weight=1,e.coat_color=new _(1,1,1),e.coat_roughness=.03,e}static paintedMetal(){let e=new a("Painted_Metal");return e.base_color=new _(.82,.1,.1),e.base_metalness=1,e.specular_roughness=.3,e.coat_weight=1,e.coat_color=new _(1,1,1),e.coat_roughness=.05,e}static subsurfaceSkin(){let e=new a("Subsurface_Skin");return e.base_color=new _(.72,.52,.44),e.specular_roughness=.35,e.specular_ior=1.45,e.subsurface_weight=1,e.subsurface_color=new _(.74,.46,.38),e.subsurface_radius=1.2,e.subsurface_radius_scale=new _(1,.45,.2),e}static thinGlass(){let e=new a("Thin_Glass");return e.specular_roughness=0,e.specular_ior=1.5,e.transmission_weight=1,e.geometry_thin_walled=!0,e}static frostedGlass(){let e=new a("Frosted_Glass");return e.specular_roughness=.35,e.specular_ior=1.5,e.transmission_weight=1,e.transmission_depth=1,e.transmission_color=new _(.95,.97,1),e}static pearl(){let e=new a("Pearl");return e.base_color=new _(.8,.75,.7),e.specular_roughness=.35,e.specular_ior=1.5,e.subsurface_weight=1,e.subsurface_color=new _(.8,.75,.7),e.subsurface_radius_scale=new _(.3,.5,.3),e.coat_weight=1,e.coat_roughness=.15,e.coat_ior=1.68,e.thin_film_weight=1,e.thin_film_thickness=.42,e.thin_film_ior=2,e}static soapBubble(){let e=new a("Soap_Bubble");return e.specular_roughness=0,e.specular_ior=1,e.transmission_weight=1,e.thin_film_weight=1,e.thin_film_thickness=.5,e.thin_film_ior=1.4,e.geometry_thin_walled=!0,e}static velvet(){let e=new a("Velvet");return e.base_color=new _(.02,.02,.02),e.specular_roughness=.8,e.fuzz_weight=1,e.fuzz_color=new _(.4,.4,.4),e.fuzz_roughness=.5,e}static PRESET_NAMES=["-- None --","Default","Plastic","Metal","Gold","Silver","Aluminum Brushed","Car Paint","Clearcoat Plastic","Painted Metal","Glass","Thin Glass","Frosted Glass","Honey","Ketchup","Light Bulb","Emissive","Subsurface Skin","Pearl","Soap Bubble","Velvet"];static presetByName(e){switch(e){case"Default":return new a("Default");case"Plastic":return a.plastic();case"Metal":return a.metal();case"Gold":return a.gold();case"Silver":return a.silver();case"Aluminum Brushed":return a.aluminumBrushed();case"Car Paint":return a.carPaint();case"Clearcoat Plastic":return a.clearcoatPlastic();case"Painted Metal":return a.paintedMetal();case"Glass":return a.glass();case"Thin Glass":return a.thinGlass();case"Frosted Glass":return a.frostedGlass();case"Honey":return a.honey();case"Ketchup":return a.ketchup();case"Light Bulb":return a.lightBulb();case"Emissive":return a.emissive();case"Subsurface Skin":return a.subsurfaceSkin();case"Pearl":return a.pearl();case"Soap Bubble":return a.soapBubble();case"Velvet":return a.velvet();default:return null}}};var Oi=class a extends He{base=1;base_color=new _(.8,.8,.8);diffuse_roughness=0;metalness=0;specular=1;specular_color=new _(1,1,1);specular_roughness=.2;specular_IOR=1.5;specular_anisotropy=0;specular_rotation=0;transmission=0;transmission_color=new _(1,1,1);transmission_depth=0;transmission_scatter=new _(0,0,0);transmission_scatter_anisotropy=0;transmission_dispersion=0;transmission_extra_roughness=0;subsurface=0;subsurface_color=new _(1,1,1);subsurface_radius=new _(1,1,1);subsurface_scale=1;subsurface_anisotropy=0;sheen=0;sheen_color=new _(1,1,1);sheen_roughness=.3;thin_walled=!1;coat=0;coat_color=new _(1,1,1);coat_roughness=.1;coat_anisotropy=0;coat_rotation=0;coat_IOR=1.5;coat_affect_color=0;coat_affect_roughness=0;thin_film_thickness=0;thin_film_IOR=1.5;emission=0;emission_color=new _(1,1,1);opacity=new _(1,1,1);constructor(e){super(e)}toMaterial(e){if(e.baseWeight=a.clamp01(this.base),e.baseColor=a.clampVec(new _(this.base_color.x*this.base,this.base_color.y*this.base,this.base_color.z*this.base)),e.baseDiffuseRoughness=a.clamp01(this.diffuse_roughness),e.metallic=a.clamp01(this.metalness),e.roughness=Math.min(Math.max(this.specular_roughness,.001),1),e.ior=Math.max(this.specular_IOR,1),e.anisotropic=a.clamp01(this.specular_anisotropy),e.anisotropyRotation=a.clamp01(this.specular_rotation),e.specularColor=a.clampVec(this.specular_color),e.specularWeight=a.clamp01(this.specular),e.specularTint=0,e.specTrans=a.clamp01(this.transmission),e.transmissionColor=a.clampVec(this.transmission_color),e.transmissionExtraRoughness=Math.max(this.transmission_extra_roughness,0),this.transmission_dispersion>0?(e.dispersionScale=1,e.abbeNumber=Math.max(this.transmission_dispersion,1)):(e.dispersionScale=0,e.abbeNumber=50),e.thinWalled=this.thin_walled?1:0,e.doubleSided=this.thin_walled?1:0,e.subsurface=a.clamp01(this.subsurface),e.subsurfaceRadiusScale=_.max(this.subsurface_radius.clone(),new _(.001,.001,.001)),this.thin_walled)e.subsurface=0,e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;else if(this.subsurface>0){e.mediumType=2,e.mediumColor=a.clampVec(this.subsurface_color),e.mediumAnisotropy=Math.min(Math.max(this.subsurface_anisotropy,-.99),.99);let n=Math.max(this.subsurface_scale,.001);e.mediumThickness=n;let i=a.clamp01(this.subsurface_color.x*.2126+this.subsurface_color.y*.7152+this.subsurface_color.z*.0722),s=1/n;e.mediumAbsorption=s*(1-i),e.mediumScattering=s-e.mediumAbsorption}else if(this.transmission>0&&this.transmission_depth>0){e.mediumType=1,e.mediumColor=a.clampVec(this.transmission_color),e.mediumAnisotropy=Math.min(Math.max(this.transmission_scatter_anisotropy,-.99),.99);let n=Math.max(this.transmission_depth,.001);e.mediumThickness=0,e.mediumScattering=0,e.mediumAbsorption=1/n}else e.mediumType=0,e.mediumColor=new _(1,1,1),e.mediumScattering=0,e.mediumAbsorption=0,e.mediumThickness=0,e.mediumAnisotropy=0;e.sheen=a.clamp01(this.sheen),e.fuzzColor=a.clampVec(this.sheen_color),e.sheenTint=0,e.fuzzRoughness=a.clamp01(this.sheen_roughness),e.clearcoat=a.clamp01(this.coat),e.coatColor=a.clampVec(this.coat_color),e.clearcoatGloss=a.clamp01(1-this.coat_roughness),e.coatRoughnessAnisotropy=a.clamp01(this.coat_anisotropy),e.coatAnisotropyRotation=a.clamp01(this.coat_rotation),e.coatIOR=Math.max(this.coat_IOR,1.01),e.coatDarkening=a.clamp01(this.coat_affect_color),e.coatAffectRoughness=a.clamp01(this.coat_affect_roughness),e.thinFilmThickness=Math.max(this.thin_film_thickness,0),e.thinFilmIor=Math.max(this.thin_film_IOR,1),e.thinFilmWeight=this.thin_film_thickness>0?1:0,e.emission=new _(this.emission_color.x*this.emission,this.emission_color.y*this.emission,this.emission_color.z*this.emission);let t=a.clamp01(this.opacity.x*.2126+this.opacity.y*.7152+this.opacity.z*.0722);e.opacity=t,e.alphaMode=t<1?1:0}static parse(e){let t=new a("default"),n=(r,o)=>{let l=ge(e,o);l!==null&&(t[r]=l)},i=(r,o)=>{let l=It(e,o);l!==null&&(t[r]=l)},s=(r,o)=>{let l=wo(e,o);l!==null&&(t[r]=l)};return n("base","base"),i("base_color","base_color"),n("diffuse_roughness","diffuse_roughness"),n("metalness","metalness"),n("specular","specular"),i("specular_color","specular_color"),n("specular_roughness","specular_roughness"),n("specular_IOR","specular_IOR"),n("specular_anisotropy","specular_anisotropy"),n("specular_rotation","specular_rotation"),n("transmission","transmission"),i("transmission_color","transmission_color"),n("transmission_depth","transmission_depth"),i("transmission_scatter","transmission_scatter"),n("transmission_scatter_anisotropy","transmission_scatter_anisotropy"),n("transmission_dispersion","transmission_dispersion"),n("transmission_extra_roughness","transmission_extra_roughness"),n("subsurface","subsurface"),i("subsurface_color","subsurface_color"),i("subsurface_radius","subsurface_radius"),n("subsurface_scale","subsurface_scale"),n("subsurface_anisotropy","subsurface_anisotropy"),n("sheen","sheen"),i("sheen_color","sheen_color"),n("sheen_roughness","sheen_roughness"),s("thin_walled","thin_walled"),n("coat","coat"),i("coat_color","coat_color"),n("coat_roughness","coat_roughness"),n("coat_anisotropy","coat_anisotropy"),n("coat_rotation","coat_rotation"),n("coat_IOR","coat_IOR"),n("coat_affect_color","coat_affect_color"),n("coat_affect_roughness","coat_affect_roughness"),n("thin_film_thickness","thin_film_thickness"),n("thin_film_IOR","thin_film_IOR"),n("emission","emission"),i("emission_color","emission_color"),i("opacity","opacity"),t}};var Ao=class a extends He{baseColor=new _(.18,.18,.18);subsurface=0;metallic=0;specular=.5;specularTint=0;roughness=.5;anisotropic=0;sheen=0;sheenTint=.5;clearcoat=0;clearcoatGloss=1;transmission=0;ior=1.5;opacity=1;constructor(e){super(e)}toMaterial(e){if(e.baseWeight=1,e.baseColor=_.clamp(this.baseColor.clone(),new _(0,0,0),new _(1,1,1)),e.metallic=a.clamp01(this.metallic),e.subsurface=a.clamp01(this.subsurface),this.ior!==1.5)e.ior=Math.max(this.ior,1);else{let t=.08*a.clamp01(this.specular),n=Math.sqrt(Math.max(t,0)),i=1-n;e.ior=i>1e-4?Math.max((1+n)/i,1):1}e.specularTint=a.clamp01(this.specularTint),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.anisotropic=a.clamp01(this.anisotropic),e.sheen=a.clamp01(this.sheen),e.sheenTint=a.clamp01(this.sheenTint),e.clearcoat=a.clamp01(this.clearcoat),e.clearcoatGloss=a.clamp01(this.clearcoatGloss),e.specTrans=a.clamp01(this.transmission),e.opacity=a.clamp01(this.opacity),e.alphaMode=e.opacity<1?1:0}static parse(e){let t=e.getAttribute("name")??"disneyPrincipled",n=new a(t),i=(r,o)=>{let l=ge(e,o);l!==null&&(n[r]=l)};return((r,o)=>{let l=It(e,o);l!==null&&(n[r]=l)})("baseColor","baseColor"),i("subsurface","subsurface"),i("metallic","metallic"),i("specular","specular"),i("specularTint","specularTint"),i("roughness","roughness"),i("anisotropic","anisotropic"),i("sheen","sheen"),i("sheenTint","sheenTint"),i("clearcoat","clearcoat"),i("clearcoatGloss","clearcoatGloss"),i("transmission","transmission"),i("ior","ior"),i("opacity","opacity"),n}};var Co=class a extends He{base_color=new _(1,1,1);alpha=1;alpha_mode=0;alpha_cutoff=.5;metallic=1;roughness=1;ior=1.5;specular=1;specular_color=new _(1,1,1);emissive=new _(0,0,0);emissive_strength=1;sheen_color=new _(0,0,0);sheen_roughness=0;clearcoat=0;clearcoat_roughness=0;transmission=0;thickness=0;attenuation_distance=0;attenuation_color=new _(1,1,1);iridescence=0;iridescence_ior=1.3;iridescence_thickness=100;constructor(e){super(e)}toMaterial(e){e.baseWeight=1,e.baseColor=a.clampVec(this.base_color),e.metallic=a.clamp01(this.metallic),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.ior=Math.max(this.ior,1),e.specularColor=a.clampVec(this.specular_color.scale(a.clamp01(this.specular))),e.specTrans=a.clamp01(this.transmission);let t=Math.max(this.sheen_color.x,this.sheen_color.y,this.sheen_color.z);e.sheen=a.clamp01(t),e.fuzzColor=a.clampVec(this.sheen_color),e.fuzzRoughness=a.clamp01(this.sheen_roughness),e.clearcoat=a.clamp01(this.clearcoat),e.clearcoatGloss=a.clamp01(1-this.clearcoat_roughness),e.emission=new _(this.emissive.x*this.emissive_strength,this.emissive.y*this.emissive_strength,this.emissive.z*this.emissive_strength),e.opacity=a.clamp01(this.alpha),e.alphaMode=this.alpha_mode===1?2:this.alpha_mode===2?1:0,e.alphaCutoff=a.clamp01(this.alpha_cutoff),this.transmission>0&&this.attenuation_distance>0&&(e.mediumType=1,e.mediumColor=a.clampVec(this.attenuation_color),e.mediumScattering=0,e.mediumAbsorption=1/Math.max(this.attenuation_distance,.001),e.mediumThickness=Math.max(this.thickness,0)),e.thinFilmWeight=a.clamp01(this.iridescence),e.thinFilmThickness=Math.max(this.iridescence_thickness,0),e.thinFilmIor=Math.max(this.iridescence_ior,1)}static parse(e){let t=e.getAttribute("name")??"gltfPbr",n=new a(t),i=(o,l)=>{let c=ge(e,l);c!==null&&(n[o]=c)},s=(o,l)=>{let c=Mo(e,l);c!==null&&(n[o]=c)},r=(o,l)=>{let c=It(e,l);c!==null&&(n[o]=c)};return r("base_color","base_color"),i("alpha","alpha"),s("alpha_mode","alpha_mode"),i("alpha_cutoff","alpha_cutoff"),i("metallic","metallic"),i("roughness","roughness"),i("ior","ior"),i("specular","specular"),r("specular_color","specular_color"),r("emissive","emissive"),i("emissive_strength","emissive_strength"),r("sheen_color","sheen_color"),i("sheen_roughness","sheen_roughness"),i("clearcoat","clearcoat"),i("clearcoat_roughness","clearcoat_roughness"),i("transmission","transmission"),i("thickness","thickness"),i("attenuation_distance","attenuation_distance"),r("attenuation_color","attenuation_color"),i("iridescence","iridescence"),i("iridescence_ior","iridescence_ior"),i("iridescence_thickness","iridescence_thickness"),n}};var Ro=class a extends He{diffuseColor=new _(.18,.18,.18);emissiveColor=new _(0,0,0);useSpecularWorkflow=0;specularColor=new _(0,0,0);metallic=0;roughness=.5;clearcoat=0;clearcoatRoughness=.01;ior=1.5;normal=new _(0,0,1);displacement=0;occlusion=1;opacity=1;opacityThreshold=0;constructor(e){super(e)}toMaterial(e){e.baseWeight=1,e.baseColor=a.clampVec(this.diffuseColor),this.useSpecularWorkflow===1?(e.metallic=0,e.specularColor=a.clampVec(this.specularColor)):e.metallic=a.clamp01(this.metallic),e.roughness=Math.min(Math.max(this.roughness,.001),1),e.ior=Math.max(this.ior,1),e.clearcoat=a.clamp01(this.clearcoat),e.clearcoatGloss=a.clamp01(1-this.clearcoatRoughness),e.emission=a.clampVec(this.emissiveColor),e.opacity=a.clamp01(this.opacity),this.opacityThreshold>0?(e.alphaMode=2,e.alphaCutoff=a.clamp01(this.opacityThreshold)):this.opacity<1&&(e.alphaMode=1)}static parse(e){let t=new a("default"),n=(r,o)=>{let l=ge(e,o);l!==null&&(t[r]=l)},i=(r,o)=>{let l=Mo(e,o);l!==null&&(t[r]=l)},s=(r,o)=>{let l=It(e,o);l!==null&&(t[r]=l)};return s("diffuseColor","diffuseColor"),s("emissiveColor","emissiveColor"),i("useSpecularWorkflow","useSpecularWorkflow"),s("specularColor","specularColor"),n("metallic","metallic"),n("roughness","roughness"),n("clearcoat","clearcoat"),n("clearcoatRoughness","clearcoatRoughness"),n("ior","ior"),n("occlusion","occlusion"),n("opacity","opacity"),n("opacityThreshold","opacityThreshold"),t}};var Us=class a extends He{melaninConcentration=.5;melaninRedness=.5;melaninMix=1;baseColor=new _(1,1,1);explicitAbsorptionCoefficient=null;longitudinalRoughness=.1;azimuthalRoughness=.1;cuticleAngle=.5;tint_R=new _(1,1,1);tint_TT=new _(1,1,1);tint_TRT=new _(1,1,1);ior=1.55;constructor(e){super(e)}toMaterial(e){let t=new _(.506,1.036,1.923),n=new _(.343,.733,1.924),i=a.clamp01(this.melaninRedness),s=Math.max(this.melaninConcentration,0),r=new _(s*(t.x*(1-i)+n.x*i),s*(t.y*(1-i)+n.y*i),s*(t.z*(1-i)+n.z*i)),o=a.clamp01(this.azimuthalRoughness),l=5.969-.215*o+2.532*Math.pow(o,2)-10.73*Math.pow(o,3)+5.574*Math.pow(o,4)+.245*Math.pow(o,5),c=l*l,u=1e-5,h=new _(Math.pow(Math.log(Math.max(this.baseColor.x,u)),2)/c,Math.pow(Math.log(Math.max(this.baseColor.y,u)),2)/c,Math.pow(Math.log(Math.max(this.baseColor.z,u)),2)/c),d=a.clamp01(this.melaninMix),p=this.explicitAbsorptionCoefficient?new _(Math.max(this.explicitAbsorptionCoefficient.x,0),Math.max(this.explicitAbsorptionCoefficient.y,0),Math.max(this.explicitAbsorptionCoefficient.z,0)):new _(r.x*d+h.x*(1-d),r.y*d+h.y*(1-d),r.z*d+h.z*(1-d));e.materialType=1,e.baseColor=new _(a.clamp01(this.tint_R.x),a.clamp01(this.tint_R.y),a.clamp01(this.tint_R.z)),e.specularColor=new _(Math.max(p.x,0),Math.max(p.y,0),Math.max(p.z,0)),e.transmissionColor=new _(a.clamp01(this.tint_TT.x),a.clamp01(this.tint_TT.y),a.clamp01(this.tint_TT.z)),e.coatColor=new _(a.clamp01(this.tint_TRT.x),a.clamp01(this.tint_TRT.y),a.clamp01(this.tint_TRT.z)),e.roughness=Math.min(Math.max(this.longitudinalRoughness,.01),1),e.anisotropic=Math.min(Math.max(this.azimuthalRoughness,.01),1),e.specularTint=a.clamp01(this.cuticleAngle),e.ior=Math.max(this.ior,1),e.doubleSided=1,e.coatIOR=1.6}static parse(e){let t=new a("default"),n=(s,r)=>{let o=ge(e,r);o!==null&&(t[s]=o)},i=(s,r)=>{let o=Lt(e,r);o!==null&&(t[s]=o)};return n("melaninConcentration","melaninConcentration"),n("melaninRedness","melaninRedness"),n("melaninMix","melaninMix"),i("baseColor","baseColor"),n("longitudinalRoughness","longitudinalRoughness"),n("azimuthalRoughness","azimuthalRoughness"),n("cuticleAngle","cuticleAngle"),i("tint_R","tint_R"),i("tint_TT","tint_TT"),i("tint_TRT","tint_TRT"),n("ior","ior"),t}};function at(a,e){if(a===void 0)return e;let t=Number.parseFloat(a);return Number.isFinite(t)?`${t}`:e}function zg(a,e){if(a===void 0)return e;let t=Number.parseInt(a,10);return Number.isFinite(t)?`${t}`:e}function Qh(a,e){let t=e.split(",").map(n=>n.trim()).filter(Boolean);switch(a){case"float":return at(t[0],"0.0");case"integer":return zg(t[0],"0");case"boolean":{let n=(t[0]??"").toLowerCase();return n==="1"||n==="true"?"true":"false"}case"color2":case"vector2":return`vec2(${at(t[0],"0.0")}, ${at(t[1],"0.0")})`;case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return`vec3(${at(t[0],"0.0")}, ${at(t[1],"0.0")}, ${at(t[2],"0.0")})`;case"vector4":case"color4":return`vec4(${at(t[0],"0.0")}, ${at(t[1],"0.0")}, ${at(t[2],"0.0")}, ${at(t[3],"1.0")})`;case"matrix33":return`mat3(${ed(t,9).join(", ")})`;case"matrix44":return`mat4(${ed(t,16).join(", ")})`;default:return at(t[0],"0.0")}}function ed(a,e){let t=[];for(let n=0;n<e;n++)t.push(at(a[n],"0.0"));return t}var L=class{name;inputs=new Map;constructor(e){this.name=e}getDependencies(){let e=[];for(let t of this.inputs.values())t.kind==="connection"&&e.push(t.sourceName);return e}parseInputs(e){for(let t of Array.from(e.children)){let n=t.tagName.toLowerCase();if(n!=="input"&&n!=="parameter")continue;let i=t.getAttribute("name")??"";if(!i)continue;let s=t.getAttribute("type")??"float",r=t.getAttribute("value")??"",o=t.getAttribute("nodename")??"",l=t.getAttribute("output")??"",c=t.getAttribute("interfacename")??"";this.inputs.set(i,o?{kind:"connection",sourceName:o,outputName:l||void 0}:c?{kind:"interface",interfaceName:c,type:s}:{kind:"literal",value:r,type:s})}}literalValue(e){let t=this.inputs.get(e);return t?.kind==="literal"?t.value:null}literalFloat(e){let t=this.literalValue(e);if(t===null)return null;let n=parseFloat(t);return isNaN(n)?null:n}resolveGLSL(e,t){let n=this.inputs.get(e);if(!n)return"0.0";if(n.kind==="literal")return n.value.length>0?Qh(n.type,n.value):this.zeroOfType(n.type);if(n.kind==="interface"){let o=t.ifaceValues?.get(n.interfaceName);return o!==void 0?Qh(n.type,o):(this.warn(t,`Missing interface binding '${n.interfaceName}' for node '${this.name}', input '${e}'.`),this.zeroOfType(n.type))}let i=t.emitted.get(n.sourceName);if(!i){this.warn(t,`Unresolved source '${n.sourceName}' for node '${this.name}', input '${e}'.`);let o=n.outputName?.toLowerCase()??"";return o==="r"||o==="g"||o==="b"||o==="a"||o==="outx"||o==="outy"||o==="outz"||o==="outw"?"0.0":this.zeroOfType(this.outputType)}if(!n.outputName)return i;let s=t.emitted.get(`${n.sourceName}:${n.outputName}`);if(s)return s;let r=kg(n.outputName);return r.length>0?`${i}.${r}`:i}zeroOfType(e){switch(e){case"float":case"integer":case"boolean":return"0.0";case"color2":case"vector2":return"vec2(0.0)";case"vector4":case"color4":return"vec4(0.0)";case"matrix33":return"mat3(0.0)";case"matrix44":return"mat4(0.0)";default:return"vec3(0.0)"}}warn(e,t){e.warnings||(e.warnings=[]),e.warnings.push(t)}resolveRawValue(e,t){let n=this.inputs.get(e);return n?n.kind==="literal"?n.value.length>0?n.value:null:n.kind==="interface"?t.get(n.interfaceName)??null:null:null}};function kg(a){let e=a.toLowerCase();return e==="r"?"x":e==="g"?"y":e==="b"?"z":e==="a"?"w":e==="rgb"?"rgb":e==="rgba"?"rgba":e==="outx"||e==="outr"?"x":e==="outy"||e==="outg"?"y":e==="outz"||e==="outb"?"z":e==="outw"||e==="outa"?"w":e==="outcolor"||e==="outrgb"?"rgb":""}function B(a,e){return a.getAttribute("type")??e}function O(a){switch(a){case"float":return"float";case"integer":return"int";case"boolean":return"bool";case"color2":case"vector2":return"vec2";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3";case"vector4":case"color4":return"vec4";case"matrix33":return"mat3";case"matrix44":return"mat4";default:return"float"}}function Gi(a){return a==="BSDF"||a==="VDF"||a==="EDF"}function nd(a){return`clamp(max(max(vec3(${a}).r, vec3(${a}).g), vec3(${a}).b), 0.0, 1.0)`}function Be(a){switch(a){case"float":return"0.0";case"integer":return"0";case"boolean":return"false";case"color2":case"vector2":return"vec2(0.0)";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3(0.0)";case"vector4":case"color4":return"vec4(0.0)";case"matrix33":return"mat3(0.0)";case"matrix44":return"mat4(0.0)";default:return"0.0"}}function he(a){switch(a){case"float":return"1.0";case"integer":return"1";case"boolean":return"true";case"color2":case"vector2":return"vec2(1.0)";case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return"vec3(1.0)";case"vector4":case"color4":return"vec4(1.0)";case"matrix33":return"mat3(1.0)";case"matrix44":return"mat4(1.0)";default:return"1.0"}}function de(a,e){let t=O(a);return a==="integer"||a==="boolean"||t==="float"||t==="int"||t==="bool"?e:`${t}(${e})`}function id(a,e,t){return a==="=="?`abs((${e}) - (${t})) <= 1e-6`:`(${e} ${a} ${t})`}function _t(a,e){if(a===void 0)return e;let t=Number.parseFloat(a);return Number.isFinite(t)?`${t}`:e}function Vg(a,e){if(a===void 0)return e;let t=Number.parseInt(a,10);return Number.isFinite(t)?`${t}`:e}function sd(a,e){let t=e.split(",").map(n=>n.trim()).filter(Boolean);switch(a){case"float":return _t(t[0],"0.0");case"integer":return Vg(t[0],"0");case"boolean":{let n=(t[0]??"").toLowerCase();return n==="1"||n==="true"?"true":"false"}case"color2":case"vector2":return`vec2(${_t(t[0],"0.0")}, ${_t(t[1],"0.0")})`;case"vector3":case"color3":case"BSDF":case"VDF":case"EDF":case"lightshader":case"surfaceshader":return`vec3(${_t(t[0],"0.0")}, ${_t(t[1],"0.0")}, ${_t(t[2],"0.0")})`;case"vector4":case"color4":return`vec4(${_t(t[0],"0.0")}, ${_t(t[1],"0.0")}, ${_t(t[2],"0.0")}, ${_t(t[3],"1.0")})`;case"matrix33":return`mat3(${td(t,9).join(", ")})`;case"matrix44":return`mat4(${td(t,16).join(", ")})`;default:return"0.0"}}function td(a,e){let t=[];for(let n=0;n<e;n++)t.push(_t(a[n],"0.0"));return t}var Bs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`a2_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e);return e.lines.push(`${n} ${t} = atan(${i}, ${s});`),e.emitted.set(this.name,t),t}};var Ze=class extends L{outputType="float";op;mode;constructor(e,t,n="operator"){super(e),this.op=t,this.mode=n}parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`b_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e),r=this.mode==="function"?`${this.op}(${i}, ${s})`:`(${i} ${this.op} ${s})`;if(e.lines.push(`${n} ${t} = ${r};`),e.emitted.set(this.name,t),Gi(this.outputType)){let o=this.inputs.get("in1"),l=this.inputs.get("in2"),c=o?.kind==="connection"?o.sourceName:null,u=l?.kind==="connection"?l.sourceName:null,h=c?e.closureContracts?.get(c):void 0,d=u?e.closureContracts?.get(u):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:t,sampleExpr:t,pdfExpr:h?.pdfExpr??d?.pdfExpr??"1.0",flagsExpr:h&&d?`(${h.flagsExpr} | ${d.flagsExpr})`:h?.flagsExpr??d?.flagsExpr??"0"})}return t}};var Os=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`cl_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("low",e),r=this.resolveGLSL("high",e);return e.lines.push(`${n} ${t} = clamp(${i}, ${s}, ${r});`),e.emitted.set(this.name,t),t}};var Sn=class extends L{outputType="vector3";arity;constructor(e,t){super(e),this.arity=t}parse(e){return this.parseInputs(e),this.outputType=B(e,this.defaultType()),this}emitGLSL(e){let t=`cmb_${this.name}`,n=O(this.outputType),i=[];for(let s=1;s<=this.arity;s++)i.push(this.resolveGLSL(`in${s}`,e));return e.lines.push(`${n} ${t} = ${n}(${i.join(", ")});`),e.emitted.set(this.name,t),t}defaultType(){return this.arity<=2?"vector2":this.arity===3?"vector3":"vector4"}};var Gs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`k_${this.name}`,n=this.resolveGLSL("value",e),i=O(this.outputType),s=sd(this.outputType,n);return e.lines.push(`${i} ${t} = ${s};`),e.emitted.set(this.name,t),t}};var zs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`dot_${this.name}`,n=this.resolveGLSL("in",e),i=O(this.outputType);return e.lines.push(`${i} ${t} = ${n};`),e.emitted.set(this.name,t),t}};var ks=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`ext_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("index",e),r=Number.parseInt(s,10),o=Number.isFinite(r)?["x","y","z","w"][Math.max(0,Math.min(3,r))]:"x";return e.lines.push(`${n} ${t} = ${i}.${o};`),e.emitted.set(this.name,t),t}};var Oe=class extends L{outputType;filePath="";colorspace="";constructor(e,t="color3"){super(e),this.outputType=t}parse(e){this.parseInputs(e),this.filePath=this.literalValue("file")??"";let t=Array.from(e.children).find(n=>n.tagName.toLowerCase()==="input"&&n.getAttribute("name")==="file");return this.colorspace=t?.getAttribute("colorspace")??"",this}emitGLSL(e){let t=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):e.texCoordExpr??"vTexCoords",n=`img_${this.name}`,i=this.outputType==="float"?"float":"vec3",s=this.outputType==="float"?".r":".rgb",r=e.textureArrayUniform?`texture(${e.textureArrayUniform}, vec3(${t}, float(${e.textureLayerExpr??"0"})))${s}`:`texture(${e.envTexUniform}, ${t})${s}`;return e.lines.push(`${i} ${n} = ${r};`),e.emitted.set(this.name,n),n}};var zi=class extends L{outputType="color3";hdrFile="";rotation=0;parse(e){return this.parseInputs(e),this.hdrFile=this.literalValue("file")??"",this.rotation=this.literalFloat("rotation")??0,this}emitGLSL(e){let t=this.resolveGLSL("viewdir",e),i=this.inputs.get("rotation")?.kind==="connection"?this.resolveGLSL("rotation",e):"envMapRot",s=`theta_${this.name}`,r=`uv_${this.name}`,o=`c_${this.name}`;return e.lines.push(`float ${s} = acos(clamp(${t}.y, -1.0, 1.0));`,`vec2 ${r} = vec2((PI + atan(${t}.z, ${t}.x)) * INV_TWO_PI + ${i}, ${s} * INV_PI);`,`vec3 ${o} = texture(${e.envTexUniform}, ${r}).rgb;`),e.emitted.set(this.name,o),o}};var ki=class extends L{outputType="lightshader";parse(e){return this.parseInputs(e),this}resolveIntensity(e){let t=this.resolveRawValue("intensity",e);if(t===null)return 1;let n=parseFloat(t);return isNaN(n)?1:n}emitGLSL(e){let t=this.resolveGLSL("edf",e),n=this.resolveGLSL("intensity",e),i=`light_${this.name}`;return e.lines.push(`vec3 ${i} = ${t} * ${n};`),e.emitted.set(this.name,i),i}};var Vs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`lum_${this.name}`,n=O(this.outputType),s=`dot((${this.resolveGLSL("in",e)}).rgb, vec3(0.2126, 0.7152, 0.0722))`,r=n==="float"?s:`${n}(${s})`;return e.lines.push(`${n} ${t} = ${r};`),e.emitted.set(this.name,t),t}};var Mn=class extends L{outputType="color3";get in2Literal(){return this.literalFloat("in2")}parse(e){return this.parseInputs(e),this.outputType=B(e,"color3"),this}emitGLSL(e){let t=O(this.outputType),n=this.resolveGLSL("in1",e),s=this.inputs.get("in2")?.kind==="connection"?this.resolveGLSL("in2",e):e.preferEnvMapIntensityLiterals?"envMapIntensity":this.resolveGLSL("in2",e),r=`mul_${this.name}`;if(Gi(this.outputType)){e.lines.push(`${t} ${r} = vec3(${n}) * vec3(${s});`);let o=this.inputs.get("in1"),l=this.inputs.get("in2"),c=o?.kind==="connection"?o.sourceName:null,u=l?.kind==="connection"?l.sourceName:null,h=c?e.closureContracts?.get(c):void 0,d=u?e.closureContracts?.get(u):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:r,sampleExpr:r,pdfExpr:h?.pdfExpr??d?.pdfExpr??"1.0",flagsExpr:h&&d?`(${h.flagsExpr} | ${d.flagsExpr})`:h?.flagsExpr??d?.flagsExpr??"0"})}else e.lines.push(`${t} ${r} = (${n}) * (${s});`);return e.emitted.set(this.name,r),r}};var $g="1",Hg="2",Wg="4",te=class extends L{outputType="BSDF";parse(e){return this.parseInputs(e),this}emitGLSL(e){return"vec3(0.0)"}scalar(e,t,n){return this.inputs.has(t)?this.resolveGLSL(t,e):n}color(e,t,n){return this.inputs.has(t)?this.resolveGLSL(t,e):n}registerClosureContract(e,t,n,i,s,r){e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:t,evalExpr:n,sampleExpr:i,pdfExpr:s,flagsExpr:r})}flagReflect(){return $g}flagTransmit(){return Hg}flagEmissive(){return Wg}};var ye=class extends te{kindHint;mode;constructor(e,t="generic",n="reflect"){super(e),this.kindHint=t,this.mode=n}emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color",this.mode==="emissive"?"vec3(1.0)":"vec3(0.8)"),i=this.scalar(e,"roughness","0.35"),s=`closure_${this.name}`;e.lines.push(`float fallbackRough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float fallbackScale_${this.name} = mix(1.0, 0.6, fallbackRough_${this.name});`),e.lines.push(`vec3 ${s} = max((${n}) * (${t}) * fallbackScale_${this.name}, vec3(0.0));`),e.lines.push(`float fallbackPdf_${this.name} = clamp(0.2 + 0.8 * (1.0 - fallbackRough_${this.name}), 1e-4, 1.0);`),e.lines.push(`vec3 fallbackSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`);let r=this.flagReflect();return this.mode==="transmit"?r=this.flagTransmit():this.mode==="both"?r=`(${this.flagReflect()} | ${this.flagTransmit()})`:this.mode==="emissive"&&(r=this.flagEmissive()),this.registerClosureContract(e,this.kindHint,s,`fallbackSample_${this.name}`,`fallbackPdf_${this.name}`,r),e.emitted.set(this.name,s),s}};var $s=class extends L{outputType="vector3";scale=1;parse(e){return this.parseInputs(e),this.scale=this.literalFloat("scale")??1,this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=`nm_${this.name}`;return e.lines.push(`vec3 ${n} = normalize(${t} * 2.0 - 1.0) * ${this.scale.toFixed(4)};`),e.emitted.set(this.name,n),n}};var Hs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`sp_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in1",e),s=this.resolveGLSL("in2",e);return e.lines.push(`${n} ${t} = pow(max(${i}, ${n}(0.0)), ${s});`),e.emitted.set(this.name,t),t}};var en=class extends L{outputType="multioutput";arity;constructor(e,t){super(e),this.arity=t}parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=this.arity===2?"vec2":this.arity===3?"vec3":"vec4",i=`sep_${this.name}`;e.lines.push(`${n} ${i}_in = ${t};`);let s=["x","y","z","w"];for(let o=0;o<this.arity;o++){let l=s[o],c=`${i}_out${l}`;e.lines.push(`float ${c} = ${i}_in.${l};`),e.emitted.set(`${this.name}:out${l}`,c),l==="x"&&e.emitted.set(`${this.name}:outr`,c),l==="y"&&e.emitted.set(`${this.name}:outg`,c),l==="z"&&e.emitted.set(`${this.name}:outb`,c),l==="w"&&e.emitted.set(`${this.name}:outa`,c)}let r=`${i}_outx`;return e.emitted.set(this.name,r),r}};var Ws=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=B(e,"color3"),this}emitGLSL(e){let t=`swz_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=(this.literalValue("channels")??"").trim(),r=Xg(n),o=Yg(s,r);return e.lines.push(`${n} ${t} = (${i}).${o};`),e.emitted.set(this.name,t),t}};function Xg(a){return a==="vec2"?2:a==="vec3"?3:a==="vec4"?4:1}function Yg(a,e){let t=a.toLowerCase().replace(/[^xyzwrgba]/g,"");return t.length>=e?t.slice(0,e).replace(/r/g,"x").replace(/g/g,"y").replace(/b/g,"z").replace(/a/g,"w"):["x","xy","xyz","xyzw"][Math.max(0,Math.min(3,e-1))]}var Xs=class extends L{outputType="vector2";index=0;parse(e){let t=e.getAttribute("index");return this.index=t!==null?parseInt(t,10):0,this}emitGLSL(e){let t=`tc_${this.name}`;return e.lines.push(`vec2 ${t} = ${e.texCoordExpr??"vTexCoords"};`),e.emitted.set(this.name,t),t}};var Vi=class extends L{outputType="vector2";uvScale=[1,1];parse(e){this.parseInputs(e);let n=(this.literalValue("mat")??"").split(",").map(i=>parseFloat(i.trim()));return n.length>=5&&(this.uvScale=[isNaN(n[0])?1:n[0],isNaN(n[4])?1:n[4]]),this}emitGLSL(e){let t=this.resolveGLSL("in",e),n=`tm_${this.name}`;return e.lines.push(`vec2 ${n} = vec2(${this.uvScale[0].toFixed(4)}, ${this.uvScale[1].toFixed(4)}) * ${t};`),e.emitted.set(this.name,n),n}};var Me=class extends L{outputType="float";fnName;constructor(e,t){super(e),this.fnName=t}parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`u_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e);return e.lines.push(`${n} ${t} = ${this.fnName}(${i});`),e.emitted.set(this.name,t),t}};var wn=class extends L{outputType="EDF";parse(e){return this.parseInputs(e),this}resolveColor(e){let t=this.resolveRawValue("color",e);if(!t)return[1,1,1];let n=t.split(",").map(i=>parseFloat(i.trim()));return n.length<3||n.some(isNaN)?[1,1,1]:[n[0],n[1],n[2]]}emitGLSL(e){let t=this.inputs.get("color"),n;if(!t)n="vec3(1.0)";else if(t.kind==="connection")n=e.emitted.get(t.sourceName)??"vec3(1.0)";else{let s=t.kind==="literal"?t.value:e.ifaceValues?.get(t.interfaceName)??null;n=s?qg(s):"vec3(1.0)"}let i=`edf_${this.name}`;return e.lines.push(`vec3 ${i} = ${n};`),e.lines.push(`vec3 edfSample_${this.name} = normalize(max(${i}, vec3(1e-6)));`),e.lines.push(`float edfPdf_${this.name} = 1.0;`),e.emitted.set(this.name,i),e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"edf",evalExpr:i,sampleExpr:`edfSample_${this.name}`,pdfExpr:`edfPdf_${this.name}`,flagsExpr:"4"}),i}};function qg(a){let e=a.split(",").map(t=>t.trim());return e.length>=3?`vec3(${e.slice(0,3).join(", ")})`:`vec3(${a})`}var Ys=class extends L{outputType="vector3";parse(e){return this}emitGLSL(e){let t=`vd_${this.name}`;return e.lines.push(`vec3 ${t} = r.direction;`),e.emitted.set(this.name,t),t}};var qs=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=B(e,"color3"),this}emitGLSL(e){let t=`hsv2rgb_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=`hsv_${this.name}`,r=`p_${this.name}`;return e.lines.push(`vec3 ${s} = (${i}).rgb;`),e.lines.push(`vec3 ${r} = abs(fract(${s}.xxx + vec3(0.0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0);`),e.lines.push(`vec3 ${t} = ${s}.z * mix(vec3(1.0), clamp(${r} - 1.0, 0.0, 1.0), ${s}.y);`),n!=="vec3"&&e.lines.push(`${n} ${t}_cast = ${n}(${t});`),e.emitted.set(this.name,n==="vec3"?t:`${t}_cast`),n==="vec3"?t:`${t}_cast`}};var Ks=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=B(e,"color3"),this}emitGLSL(e){let t=`rgb2hsv_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=`rgb_${this.name}`,r=`k_${this.name}`,o=`p_${this.name}`,l=`q_${this.name}`,c=`d_${this.name}`,u=`e_${this.name}`;return e.lines.push(`vec3 ${s} = (${i}).rgb;`),e.lines.push(`vec4 ${r} = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);`),e.lines.push(`vec4 ${o} = mix(vec4(${s}.bg, ${r}.wz), vec4(${s}.gb, ${r}.xy), step(${s}.b, ${s}.g));`),e.lines.push(`vec4 ${l} = mix(vec4(${o}.xyw, ${s}.r), vec4(${s}.r, ${o}.yzx), step(${o}.x, ${s}.r));`),e.lines.push(`float ${c} = ${l}.x - min(${l}.w, ${l}.y);`),e.lines.push(`float ${u} = 1.0e-10;`),e.lines.push(`vec3 ${t} = vec3(abs(${l}.z + (${l}.w - ${l}.y) / (6.0 * ${c} + ${u})), ${c} / (${l}.x + ${u}), ${l}.x);`),n!=="vec3"&&e.lines.push(`${n} ${t}_cast = ${n}(${t});`),e.emitted.set(this.name,n==="vec3"?t:`${t}_cast`),n==="vec3"?t:`${t}_cast`}};var js=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=B(e,"vector3"),this}emitGLSL(e){let t=`norm_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e);return e.lines.push(`${n} ${t} = normalize(${i});`),e.emitted.set(this.name,t),t}};var Zs=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`dotp_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`float ${t} = dot(${n}, ${i});`),e.emitted.set(this.name,t),t}};var Js=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=B(e,"vector3"),this}emitGLSL(e){let t=`cross_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`vec3 ${t} = cross(${n}, ${i});`),e.emitted.set(this.name,t),t}};var Qs=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=B(e,"vector3"),this}emitGLSL(e){let t=`refl_${this.name}`,n=this.resolveGLSL("in",e),i=this.resolveGLSL("normal",e),s=O(this.outputType);return e.lines.push(`${s} ${t} = reflect(${n}, ${i});`),e.emitted.set(this.name,t),t}};var er=class extends L{outputType="float";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`mag_${this.name}`,n=this.resolveGLSL("in",e);return e.lines.push(`float ${t} = length(${n});`),e.emitted.set(this.name,t),t}};var tr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`facing_${this.name}`,n=this.inputs.has("normal")?this.resolveGLSL("normal",e):"vec3(0.0, 0.0, 1.0)",i=this.inputs.has("view_position")?this.resolveGLSL("view_position",e):"vec3(0.0, 0.0, 1.0)",s=this.inputs.has("invert")?this.resolveGLSL("invert",e):"false";return e.lines.push(`float ${t}_base = clamp(dot(normalize(${n}), normalize(${i})), 0.0, 1.0);`),e.lines.push(`float ${t} = bool(${s}) ? (1.0 - ${t}_base) : ${t}_base;`),e.emitted.set(this.name,t),t}};var nr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`cmp_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("intest",e),s=this.inputs.has("cutoff")?this.resolveGLSL("cutoff",e):"0.0",r=this.inputs.has("in1")?this.resolveGLSL("in1",e):he(this.outputType),o=this.inputs.has("in2")?this.resolveGLSL("in2",e):Be(this.outputType);return e.lines.push(`${n} ${t} = ((${i}) > (${s})) ? ${r} : ${o};`),e.emitted.set(this.name,t),t}};var En=class extends L{outputType="float";op;constructor(e,t){super(e),this.op=t}parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`ifc_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("value1",e),s=this.resolveGLSL("value2",e),r=id(this.op,i,s);if(this.outputType==="boolean"&&!this.inputs.has("in1")&&!this.inputs.has("in2"))return e.lines.push(`bool ${t} = ${r};`),e.emitted.set(this.name,t),t;let o=this.inputs.has("in1")?this.resolveGLSL("in1",e):he(this.outputType),l=this.inputs.has("in2")?this.resolveGLSL("in2",e):Be(this.outputType);return e.lines.push(`${n} ${t} = (${r}) ? ${o} : ${l};`),e.emitted.set(this.name,t),t}};var ir=class extends En{constructor(e){super(e,"==")}};var sr=class extends En{constructor(e){super(e,">")}};var rr=class extends En{constructor(e){super(e,">=")}};var ar=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`sw_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("which",e),s=this.inputs.has("in1")?this.resolveGLSL("in1",e):Be(this.outputType);e.lines.push(`int ${t}_idx = clamp(int(floor(${i} + 0.5)), 1, 10);`),e.lines.push(`${n} ${t} = ${s};`);for(let r=2;r<=10;r++){if(!this.inputs.has(`in${r}`))continue;let o=this.resolveGLSL(`in${r}`,e);e.lines.push(`if (${t}_idx == ${r}) { ${t} = ${o}; }`)}return e.emitted.set(this.name,t),t}};var An=class extends L{outputType="boolean";op;constructor(e,t){super(e),this.op=t}parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`lgc_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`bool ${t} = bool(${n}) ${this.op} bool(${i});`),e.emitted.set(this.name,t),t}};var or=class extends An{constructor(e){super(e,"&&")}};var lr=class extends An{constructor(e){super(e,"||")}};var cr=class extends An{constructor(e){super(e,"!=")}};var ur=class extends L{outputType="boolean";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`not_${this.name}`,n=this.resolveGLSL("in",e);return e.lines.push(`bool ${t} = !bool(${n});`),e.emitted.set(this.name,t),t}};var hr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`remap_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("inlow",e),r=this.resolveGLSL("inhigh",e),o=this.resolveGLSL("outlow",e),l=this.resolveGLSL("outhigh",e),c=de(this.outputType,"1e-6"),u=`((${i}) - (${s})) / max((${r}) - (${s}), ${c})`,h=`(${o}) + (${l} - ${o}) * (${u})`;return e.lines.push(`${n} ${t} = ${h};`),e.emitted.set(this.name,t),t}};var dr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`smooth_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=this.resolveGLSL("low",e),r=this.resolveGLSL("high",e);return e.lines.push(`${n} ${t} = smoothstep(${s}, ${r}, ${i});`),e.emitted.set(this.name,t),t}};var pr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`contrast_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=this.inputs.has("amount")?this.resolveGLSL("amount",e):he(this.outputType),r=this.inputs.has("pivot")?this.resolveGLSL("pivot",e):de(this.outputType,"0.5");return e.lines.push(`${n} ${t} = ((${i}) - (${r})) * (${s}) + (${r});`),e.emitted.set(this.name,t),t}};var fr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`inv_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=this.inputs.has("amount")?this.resolveGLSL("amount",e):he(this.outputType);return e.lines.push(`${n} ${t} = (${s}) - (${i});`),e.emitted.set(this.name,t),t}};var mr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`mix_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("fg",e),s=this.resolveGLSL("bg",e),r=this.resolveGLSL("mix",e);if(Gi(this.outputType)){let o=nd(r);e.lines.push(`float mixW_${this.name} = ${o};`),e.lines.push(`${n} ${t} = (${s}) * (1.0 - mixW_${this.name}) + (${i}) * mixW_${this.name};`);let l=this.inputs.get("fg"),c=this.inputs.get("bg"),u=l?.kind==="connection"?l.sourceName:null,h=c?.kind==="connection"?c.sourceName:null,d=u?e.closureContracts?.get(u):void 0,p=h?e.closureContracts?.get(h):void 0;e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"composed",evalExpr:t,sampleExpr:t,pdfExpr:d&&p?`mix((${p.pdfExpr}), (${d.pdfExpr}), mixW_${this.name})`:d?.pdfExpr??p?.pdfExpr??"1.0",flagsExpr:d&&p?`(${d.flagsExpr} | ${p.flagsExpr})`:d?.flagsExpr??p?.flagsExpr??"0"})}else e.lines.push(`${n} ${t} = mix(${s}, ${i}, ${r});`);return e.emitted.set(this.name,t),t}};var gr=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`bb_${this.name}`,i=`((${this.resolveGLSL("temperature",e)}) / 100.0)`,s=`clamp(${i} <= 66.0 ? 1.0 : (1.292936186062745 * pow(${i} - 60.0, -0.1332047592)), 0.0, 1.0)`,r=`clamp(${i} <= 66.0 ? (0.3900815787690196 * log(max(${i}, 1.0)) - 0.6318414437886275) : (1.129890860895294 * pow(${i} - 60.0, -0.0755148492)), 0.0, 1.0)`,o=`clamp(${i} >= 66.0 ? 1.0 : (${i} <= 19.0 ? 0.0 : (0.5432067891101961 * log(${i} - 10.0) - 1.19625408914)), 0.0, 1.0)`;return e.lines.push(`vec3 ${t} = vec3(${s}, ${r}, ${o});`),e.emitted.set(this.name,t),t}};var xr=class extends te{emitGLSL(e){let t=this.color(e,"tint_R","vec3(1.0)"),n=this.color(e,"tint_TT","vec3(1.0)"),i=this.color(e,"tint_TRT","vec3(1.0)"),s=this.scalar(e,"ior","1.55"),r=this.scalar(e,"cuticle_angle","0.5"),o=this.color(e,"absorption_coefficient","vec3(0.3, 0.8, 1.5)"),l=this.inputs.has("roughness_R")?this.resolveGLSL("roughness_R",e):"vec2(0.1, 0.1)",c=this.inputs.has("roughness_TT")?this.resolveGLSL("roughness_TT",e):l,u=this.inputs.has("roughness_TRT")?this.resolveGLSL("roughness_TRT",e):l,h=`hair_${this.name}`;return e.lines.push(`vec2 hairRoughR_${this.name} = ${l};`),e.lines.push(`vec2 hairRoughTT_${this.name} = ${c};`),e.lines.push(`vec2 hairRoughTRT_${this.name} = ${u};`),e.lines.push(`float hairRoughAvg_${this.name} = clamp((hairRoughR_${this.name}.x + hairRoughTT_${this.name}.x + hairRoughTRT_${this.name}.x) / 3.0, 0.01, 1.0);`),e.lines.push(`float hairIor_${this.name} = max(${s}, 1.0);`),e.lines.push(`float hairCuticle_${this.name} = clamp(${r}, 0.0, 1.0);`),e.lines.push(`vec3 hairAbs_${this.name} = max(${o}, vec3(0.0));`),e.lines.push(`vec3 hairTintMix_${this.name} = (0.5 * ${t}) + (0.35 * ${n}) + (0.15 * ${i});`),e.lines.push(`vec3 ${h} = max(hairTintMix_${this.name}, vec3(0.0)) * (1.0 + 0.05 * (hairIor_${this.name} - 1.0)) * (1.0 + 0.1 * hairCuticle_${this.name}) * (1.0 - 0.3 * hairRoughAvg_${this.name}) * exp(-0.1 * hairAbs_${this.name});`),e.lines.push(`vec3 chiangHairSample_${this.name} = normalize(max(${h}, vec3(1e-6)));`),e.lines.push(`float chiangHairPdf_${this.name} = clamp(0.5 + 0.5 * (1.0 - hairRoughAvg_${this.name}), 1e-4, 1.0);`),e.emitted.set(this.name,h),this.registerClosureContract(e,"hair",h,`chiangHairSample_${this.name}`,`chiangHairPdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),h}};var _r=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("color")?this.resolveGLSL("color",e):this.inputs.has("base_color")?this.resolveGLSL("base_color",e):"vec3(1.0)",n=this.inputs.has("azimuthal_roughness")?this.resolveGLSL("azimuthal_roughness",e):this.inputs.has("beta_m")?this.resolveGLSL("beta_m",e):"0.1",i=`hairSigmaA_${this.name}`,s=`hairBetaM_${this.name}`,r=`hairSigmaDenom_${this.name}`,o=`hairSafeColor_${this.name}`;return e.lines.push(`float ${s} = clamp(${n}, 0.0, 1.0);`),e.lines.push(`float ${r} = 5.969 - 0.215 * ${s} + 2.532 * ${s} * ${s} - 10.73 * ${s} * ${s} * ${s} + 5.574 * pow(${s}, 4.0) + 0.245 * pow(${s}, 5.0);`),e.lines.push(`vec3 ${o} = max(${t}, vec3(1e-5));`),e.lines.push(`vec3 ${i} = pow(log(${o}), vec3(2.0)) / max(${r} * ${r}, 1e-5);`),e.emitted.set(this.name,i),i}};var yr=class extends L{outputType="multioutput";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("longitudinal_roughness")?this.resolveGLSL("longitudinal_roughness",e):this.inputs.has("roughness")?this.resolveGLSL("roughness",e):"0.1",n=this.inputs.has("azimuthal_roughness")?this.resolveGLSL("azimuthal_roughness",e):this.inputs.has("roughness")?this.resolveGLSL("roughness",e):"0.1",i=`hairRough_${this.name}`,s=`${i}_outx`,r=`${i}_outy`;return e.lines.push(`float ${s} = clamp(${t}, 0.01, 1.0);`),e.lines.push(`float ${r} = clamp(${n}, 0.01, 1.0);`),e.lines.push(`vec2 ${i} = vec2(${s}, ${r});`),e.emitted.set(this.name,i),e.emitted.set(`${this.name}:outx`,s),e.emitted.set(`${this.name}:outy`,r),e.emitted.set(`${this.name}:outr`,s),e.emitted.set(`${this.name}:outg`,r),e.emitted.set(`${this.name}:longitudinal_roughness`,s),e.emitted.set(`${this.name}:azimuthal_roughness`,r),e.emitted.set(`${this.name}:betan`,s),e.emitted.set(`${this.name}:betam`,r),i}};var br=class extends L{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rougha_${this.name}`,n=this.resolveGLSL("roughness",e),i=this.resolveGLSL("anisotropy",e);return e.lines.push(`float ${t}_r = max(${n}, 1e-4);`),e.lines.push(`float ${t}_a = clamp(${i}, -0.99, 0.99);`),e.lines.push(`vec2 ${t} = vec2(${t}_r / (1.0 + ${t}_a), ${t}_r * (1.0 + ${t}_a));`),e.emitted.set(this.name,t),t}};var vr=class extends L{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`roughd_${this.name}`,n=this.resolveGLSL("roughness",e);return e.lines.push(`vec2 ${t} = vec2(${n});`),e.emitted.set(this.name,t),t}};var Tr=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("melanin")?this.resolveGLSL("melanin",e):this.inputs.has("melanin_concentration")?this.resolveGLSL("melanin_concentration",e):"0.5",n=this.inputs.has("melanin_redness")?this.resolveGLSL("melanin_redness",e):this.inputs.has("melaninRedness")?this.resolveGLSL("melaninRedness",e):"0.5",i=`hairMelaninSigmaA_${this.name}`,s=`hairMelanin_${this.name}`,r=`hairRedness_${this.name}`;return e.lines.push(`float ${s} = max(${t}, 0.0);`),e.lines.push(`float ${r} = clamp(${n}, 0.0, 1.0);`),e.lines.push(`vec3 ${i} = ${s} * mix(vec3(0.506, 1.036, 1.923), vec3(0.343, 0.733, 1.924), ${r});`),e.emitted.set(this.name,i),i}};var Sr=class extends L{outputType="multioutput";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`aior_${this.name}`,n=this.inputs.has("reflectivity")?this.resolveGLSL("reflectivity",e):"vec3(1.0)",i=this.inputs.has("edge_color")?this.resolveGLSL("edge_color",e):"vec3(1.0)",s=`${t}_ior`,r=`${t}_extinction`;return e.lines.push(`vec3 ${s} = max(vec3(1.0), vec3(1.0) + vec3(${n}) * 4.0);`),e.lines.push(`vec3 ${r} = max(vec3(0.0), (vec3(1.0) - vec3(${i})) * 3.0);`),e.emitted.set(`${this.name}:ior`,s),e.emitted.set(`${this.name}:extinction`,r),e.emitted.set(this.name,s),s}};var Mr=class extends L{outputType="surfaceshader";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("bsdf")?this.resolveGLSL("bsdf",e):"vec3(0.0)",n=this.inputs.has("vdf")?this.resolveGLSL("vdf",e):"vec3(0.0)",i=this.inputs.has("edf")?this.resolveGLSL("edf",e):"vec3(0.0)",s=this.inputs.has("opacity")?this.resolveGLSL("opacity",e):"1.0",r=`surface_${this.name}`;e.lines.push(`float surfaceOpacity_${this.name} = clamp(${s}, 0.0, 1.0);`),e.lines.push(`vec3 ${r} = ((${t}) + (${n})) * surfaceOpacity_${this.name} + (${i});`),e.emitted.set(this.name,r);let o=this.inputs.get("bsdf"),l=this.inputs.get("vdf"),c=this.inputs.get("edf"),u=o?.kind==="connection"?e.closureContracts?.get(o.sourceName):void 0,h=l?.kind==="connection"?e.closureContracts?.get(l.sourceName):void 0,d=c?.kind==="connection"?e.closureContracts?.get(c.sourceName):void 0;return e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:u?.kind??h?.kind??"generic",evalExpr:r,sampleExpr:u?.sampleExpr??h?.sampleExpr??r,pdfExpr:u?.pdfExpr??h?.pdfExpr??"1.0",flagsExpr:d?`((${u?.flagsExpr??"0"} | ${h?.flagsExpr??"0"}) | ${d.flagsExpr})`:`(${u?.flagsExpr??"0"} | ${h?.flagsExpr??"0"})`}),r}};var Kn=class extends L{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`p2d_${this.name}`,n=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):this.inputs.has("in")?this.resolveGLSL("in",e):"vTexCoords",i=this.inputs.has("offset")?this.resolveGLSL("offset",e):"vec2(0.0)",s=this.inputs.has("scale")?this.resolveGLSL("scale",e):"vec2(1.0)",r=this.inputs.has("pivot")?this.resolveGLSL("pivot",e):"vec2(0.0)";return e.lines.push(`vec2 ${t} = ((${n}) - (${r})) * (${s}) + (${r}) + (${i});`),e.emitted.set(this.name,t),t}};var jn=class extends L{outputType="vector2";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rot2_${this.name}`,n=this.resolveGLSL("in",e),i=this.inputs.has("amount")?this.resolveGLSL("amount",e):"0.0";return e.lines.push(`float ${t}_a = (abs(${i}) > 6.2831853) ? radians(${i}) : (${i});`),e.lines.push(`float ${t}_c = cos(${t}_a);`),e.lines.push(`float ${t}_s = sin(${t}_a);`),e.lines.push(`vec2 ${t} = vec2(${t}_c * (${n}).x - ${t}_s * (${n}).y, ${t}_s * (${n}).x + ${t}_c * (${n}).y);`),e.emitted.set(this.name,t),t}};var wr=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=`rot3_${this.name}`,n=this.resolveGLSL("in",e),i=this.inputs.has("axis")?this.resolveGLSL("axis",e):"vec3(0.0, 0.0, 1.0)",s=this.inputs.has("amount")?this.resolveGLSL("amount",e):"0.0";return e.lines.push(`float ${t}_a = (abs(${s}) > 6.2831853) ? radians(${s}) : (${s});`),e.lines.push(`vec3 ${t}_ax = normalize(${i});`),e.lines.push(`float ${t}_c = cos(${t}_a);`),e.lines.push(`float ${t}_s = sin(${t}_a);`),e.lines.push(`vec3 ${t} = (${n}) * ${t}_c + cross(${t}_ax, (${n})) * ${t}_s + ${t}_ax * dot(${t}_ax, (${n})) * (1.0 - ${t}_c);`),e.emitted.set(this.name,t),t}};function Kg(a){if(!a)return null;let e=a.split(",").map(t=>Number.parseFloat(t.trim())).filter(t=>Number.isFinite(t));return e.length>=16?{expr:`mat4(${e.slice(0,16).map(n=>`${n}`).join(", ")})`,dim:4}:e.length>=9?{expr:`mat3(${e.slice(0,9).map(n=>`${n}`).join(", ")})`,dim:3}:null}var Cn=class extends L{outputType="vector3";mode;matExpr=null;matDim=3;constructor(e,t){super(e),this.mode=t}parse(e){this.parseInputs(e),this.outputType=B(e,"vector3");let t=this.literalValue("mat")??"",n=Kg(t);return n&&(this.matExpr=n.expr,this.matDim=n.dim),this}emitGLSL(e){let t=`tf_${this.name}`,n=this.resolveGLSL("in",e),i=O(this.outputType);return this.matExpr?(this.outputType==="vector2"?this.matDim===3?(e.lines.push(`vec3 ${t}_p = ${this.matExpr} * vec3((${n}).xy, ${this.mode==="point"?"1.0":"0.0"});`),e.lines.push(`vec2 ${t} = ${t}_p.xy;`)):(e.lines.push(`vec4 ${t}_p = ${this.matExpr} * vec4((${n}).xy, 0.0, ${this.mode==="point"?"1.0":"0.0"});`),e.lines.push(`vec2 ${t} = ${t}_p.xy;`)):this.outputType==="vector4"?e.lines.push(`vec4 ${t} = ${this.matDim===4?this.matExpr:`mat4(${this.matExpr})`} * vec4(${n});`):this.mode==="normal"?this.matDim===4?(e.lines.push(`mat3 ${t}_nmat = mat3(transpose(inverse(${this.matExpr})));`),e.lines.push(`vec3 ${t} = normalize(${t}_nmat * vec3(${n}));`)):e.lines.push(`vec3 ${t} = normalize(transpose(inverse(${this.matExpr})) * vec3(${n}));`):this.mode==="point"?this.matDim===4?(e.lines.push(`vec4 ${t}_p = ${this.matExpr} * vec4(vec3(${n}), 1.0);`),e.lines.push(`vec3 ${t} = ${t}_p.xyz;`)):e.lines.push(`vec3 ${t} = ${this.matExpr} * vec3(${n});`):this.matDim===4?(e.lines.push(`vec4 ${t}_v = ${this.matExpr} * vec4(vec3(${n}), 0.0);`),e.lines.push(`vec3 ${t} = ${t}_v.xyz;`)):e.lines.push(`vec3 ${t} = ${this.matExpr} * vec3(${n});`),e.emitted.set(this.name,t),t):(e.lines.push(`${i} ${t} = ${n};`),e.emitted.set(this.name,t),t)}};var Er=class extends Cn{constructor(e){super(e,"point")}};var Ar=class extends Cn{constructor(e){super(e,"vector")}};var Cr=class extends Cn{constructor(e){super(e,"normal")}};function rd(a,e){switch(a){case"float":return e;case"integer":return`int(${e})`;case"boolean":return`((${e}) > 0.5)`;case"vector2":case"color2":return`vec2(${e})`;case"vector3":case"color3":case"EDF":case"lightshader":case"surfaceshader":return`vec3(${e})`;case"vector4":case"color4":return`vec4(${e})`;default:return e}}var ce=class extends L{outputType="float";kind;constructor(e,t){super(e),this.kind=t}parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`d2_${this.name}`,n=O(this.outputType),i=this.inputs.has("in")?this.resolveGLSL("in",e):this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):this.inputs.has("position")?this.resolveGLSL("position",e):"vTexCoords",s=`vec2(${i})`,r=`vec3(${i}, 0.0)`,o=`fract(sin(dot(${r}, vec3(12.9898, 78.233, 37.719))) * 43758.5453)`,l=o;return this.kind==="checker"?l=`mod(floor(${s}.x) + floor(${s}.y), 2.0)`:this.kind==="grid"?l=`max(step(0.95, fract(${s}.x)), step(0.95, fract(${s}.y)))`:this.kind==="circle"?l=`1.0 - step(0.25, length(fract(${s}) - vec2(0.5)))`:this.kind==="line"?l=`1.0 - step(0.05, abs(fract(${s}.y) - 0.5))`:this.kind==="trianglewave"?l=`abs(fract(${s}.x) * 2.0 - 1.0)`:this.kind==="fractal2d"||this.kind==="fractal3d"?l=`(${o} + fract(sin(dot(${r} * 2.0, vec3(12.9898, 78.233, 37.719))) * 43758.5453) * 0.5)`:this.kind==="cellnoise2d"||this.kind==="cellnoise3d"?l=`fract(sin(dot(floor(${r}), vec3(127.1, 311.7, 74.7))) * 43758.5453)`:(this.kind==="worleynoise2d"||this.kind==="worleynoise3d")&&(l=`length(fract(${s}) - vec2(0.5))`,l=`1.0 - clamp(${l} * 2.0, 0.0, 1.0)`),this.kind==="heighttonormal"?(e.lines.push(`vec3 ${t}_n = normalize(vec3(0.0, 0.0, 1.0));`),e.lines.push(`${n} ${t} = ${rd(this.outputType,`${t}_n.z`)};`)):e.lines.push(`${n} ${t} = ${rd(this.outputType,l)};`),e.emitted.set(this.name,t),t}};var Rr=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=`bsdf_${this.name}`;return e.lines.push(`vec3 ${i} = (${n}) * (${t}) * (1.0 / 3.14159265);`),e.emitted.set(this.name,i),this.registerClosureContract(e,"diffuse",i,i,"(1.0 / 3.14159265)",this.flagReflect()),i}};var Ir=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=this.scalar(e,"roughness","0.0"),s=`bsdf_${this.name}`;return e.lines.push(`float rough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float oren_${this.name} = 1.0 - 0.5 * rough_${this.name};`),e.lines.push(`vec3 ${s} = (${n}) * (${t}) * oren_${this.name} * (1.0 / 3.14159265);`),e.emitted.set(this.name,s),this.registerClosureContract(e,"diffuse",s,s,`oren_${this.name} * (1.0 / 3.14159265)`,this.flagReflect()),s}};var Lr=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(1.0)"),i=this.scalar(e,"roughness","0.5"),s=`bsdf_${this.name}`;return e.lines.push(`float burleyRough_${this.name} = clamp(${i}, 0.0, 1.0);`),e.lines.push(`float burleyScale_${this.name} = mix(1.0, 0.8, burleyRough_${this.name});`),e.lines.push(`vec3 ${s} = (${n}) * (${t}) * burleyScale_${this.name} * (1.0 / 3.14159265);`),e.emitted.set(this.name,s),this.registerClosureContract(e,"diffuse",s,s,`burleyScale_${this.name} * (1.0 / 3.14159265)`,this.flagReflect()),s}};var Pr=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"color","vec3(0.8, 0.2, 0.2)"),i=this.color(e,"radius","vec3(1.0)"),s=this.scalar(e,"anisotropy","0.0"),r=`subsurface_${this.name}`;return e.lines.push(`float subsurfaceWeight_${this.name} = clamp(${t}, 0.0, 1.0);`),e.lines.push(`vec3 subsurfaceColor_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`vec3 subsurfaceRadius_${this.name} = max(${i}, vec3(0.001));`),e.lines.push(`float subsurfaceAniso_${this.name} = clamp(${s}, -0.95, 0.95);`),e.lines.push(`vec3 subsurfaceTransmission_${this.name} = exp(-1.0 / subsurfaceRadius_${this.name});`),e.lines.push(`float subsurfaceDirectional_${this.name} = mix(0.65, 1.35, 0.5 * (subsurfaceAniso_${this.name} + 1.0));`),e.lines.push(`vec3 ${r} = subsurfaceWeight_${this.name} * subsurfaceColor_${this.name} * subsurfaceTransmission_${this.name} * subsurfaceDirectional_${this.name};`),e.lines.push(`float subsurfacePdf_${this.name} = clamp(0.35 + 0.65 * subsurfaceWeight_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 subsurfaceSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"subsurface",r,`subsurfaceSample_${this.name}`,`subsurfacePdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),r}};var Nr=class extends te{outputType="VDF";emitGLSL(e){let t=this.color(e,"absorption","vec3(0.1)"),n=this.color(e,"scattering","vec3(0.0)"),i=this.scalar(e,"anisotropy","0.0"),s=`vdf_${this.name}`;return e.lines.push(`vec3 vdfAbs_${this.name} = max(${t}, vec3(0.0));`),e.lines.push(`vec3 vdfSca_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`float vdfAniso_${this.name} = clamp(${i}, -0.95, 0.95);`),e.lines.push(`float vdfForward_${this.name} = mix(0.35, 1.65, 0.5 * (vdfAniso_${this.name} + 1.0));`),e.lines.push(`vec3 ${s} = (vdfSca_${this.name} + exp(-vdfAbs_${this.name})) * vdfForward_${this.name};`),e.lines.push(`float vdfPdf_${this.name} = clamp(0.2 + 0.8 * (1.0 - abs(vdfAniso_${this.name})), 1e-4, 1.0);`),e.lines.push(`vec3 vdfSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`),e.emitted.set(this.name,s),this.registerClosureContract(e,"volume",s,`vdfSample_${this.name}`,`vdfPdf_${this.name}`,this.flagTransmit()),s}};var Dr=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"reflectivity","vec3(1.0)"),i=this.color(e,"edge_color",n),s=this.scalar(e,"roughness","0.15"),r=`bsdf_${this.name}`;return e.lines.push(`vec3 condF0_${this.name} = max(${n}, vec3(0.0));`),e.lines.push(`vec3 condF90_${this.name} = max(${i}, vec3(0.0));`),e.lines.push(`vec3 ${r} = mix(condF0_${this.name}, condF90_${this.name}, 0.25) * (${t});`),e.lines.push(`float condAlpha_${this.name} = max((${s}) * (${s}), 0.001);`),e.lines.push(`float condPdf_${this.name} = 1.0 / (1.0 + 8.0 * condAlpha_${this.name});`),e.lines.push(`vec3 condSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"conductor",r,`condSample_${this.name}`,`condPdf_${this.name}`,this.flagReflect()),r}};var Fr=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"ior","vec3(1.5)"),i=this.color(e,"extinction","vec3(1.0)"),s=this.scalar(e,"roughness","0.35"),r=`bsdf_${this.name}`;return e.lines.push(`vec3 condEta_${this.name} = max(${n}, vec3(0.001));`),e.lines.push(`vec3 condK_${this.name} = max(${i}, vec3(0.0));`),e.lines.push(`vec3 condApprox_${this.name} = condK_${this.name} / (condEta_${this.name} + condK_${this.name} + vec3(1.0));`),e.lines.push(`vec3 ${r} = condApprox_${this.name} * (${t});`),e.lines.push(`float condAlpha_${this.name} = max((${s}) * (${s}), 0.001);`),e.lines.push(`float condPdf_${this.name} = 1.0 / (1.0 + 6.0 * condAlpha_${this.name});`),e.lines.push(`vec3 condSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"conductor",r,`condSample_${this.name}`,`condPdf_${this.name}`,this.flagReflect()),r}};var Ur=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=this.color(e,"base","vec3(0.0)"),r=`bsdf_${this.name}`;return e.lines.push(`float dielIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float dielF0_${this.name} = pow((dielIor_${this.name} - 1.0) / (dielIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 dielSpec_${this.name} = (${n}) * dielF0_${this.name};`),e.lines.push(`vec3 ${r} = mix(${s}, dielSpec_${this.name}, clamp(${t}, 0.0, 1.0));`),e.lines.push(`float dielPdf_${this.name} = clamp(dielF0_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 dielSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"dielectric",r,`dielSample_${this.name}`,`dielPdf_${this.name}`,this.flagReflect()),r}};var Br=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=this.color(e,"base","vec3(0.0)"),r=`bsdf_${this.name}`;return e.lines.push(`float dielIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float dielF0_${this.name} = pow((dielIor_${this.name} - 1.0) / (dielIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 dielR_${this.name} = (${n}) * dielF0_${this.name};`),e.lines.push(`vec3 dielT_${this.name} = (${n}) * (1.0 - dielF0_${this.name});`),e.lines.push(`vec3 dielMix_${this.name} = dielR_${this.name} + 0.5 * dielT_${this.name};`),e.lines.push(`vec3 ${r} = mix(${s}, dielMix_${this.name}, clamp(${t}, 0.0, 1.0));`),e.lines.push(`float dielPdf_${this.name} = clamp(0.5 * (dielF0_${this.name} + (1.0 - dielF0_${this.name})), 1e-4, 1.0);`),e.lines.push(`vec3 dielSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.emitted.set(this.name,r),this.registerClosureContract(e,"dielectric",r,`dielSample_${this.name}`,`dielPdf_${this.name}`,`(${this.flagReflect()} | ${this.flagTransmit()})`),r}};var Or=class extends te{emitGLSL(e){let t=this.scalar(e,"weight","1.0"),n=this.color(e,"tint","vec3(1.0)"),i=this.scalar(e,"ior","1.5"),s=`bsdf_${this.name}`;return e.lines.push(`float btdfIor_${this.name} = max(${i}, 1.0001);`),e.lines.push(`float btdfF0_${this.name} = pow((btdfIor_${this.name} - 1.0) / (btdfIor_${this.name} + 1.0), 2.0);`),e.lines.push(`vec3 ${s} = (${n}) * (1.0 - btdfF0_${this.name}) * clamp(${t}, 0.0, 1.0);`),e.lines.push(`float btdfPdf_${this.name} = clamp(1.0 - btdfF0_${this.name}, 1e-4, 1.0);`),e.lines.push(`vec3 btdfSample_${this.name} = normalize(max(${s}, vec3(1e-6)));`),e.emitted.set(this.name,s),this.registerClosureContract(e,"transmission",s,`btdfSample_${this.name}`,`btdfPdf_${this.name}`,this.flagTransmit()),s}};var Gr=class extends L{outputType="EDF";parse(e){return this.parseInputs(e),this}emitGLSL(e){let t=this.inputs.has("color0")?this.resolveGLSL("color0",e):"vec3(1.0)",n=this.inputs.has("color90")?this.resolveGLSL("color90",e):"vec3(1.0)",i=this.inputs.has("exponent")?this.resolveGLSL("exponent",e):"5.0",s=this.inputs.has("base")?this.resolveGLSL("base",e):"vec3(0.0)",r=`edf_${this.name}`;return e.lines.push(`float schlickW_${this.name} = clamp(1.0 / (1.0 + max(${i}, 0.0)), 0.0, 1.0);`),e.lines.push(`vec3 schlickColor_${this.name} = mix(${t}, ${n}, schlickW_${this.name});`),e.lines.push(`vec3 ${r} = max(${s}, vec3(0.0)) * schlickColor_${this.name};`),e.lines.push(`vec3 schlickSample_${this.name} = normalize(max(${r}, vec3(1e-6)));`),e.lines.push(`float schlickPdf_${this.name} = clamp(0.5 + 0.5 * schlickW_${this.name}, 1e-4, 1.0);`),e.emitted.set(this.name,r),e.closureContracts||(e.closureContracts=new Map),e.closureContracts.set(this.name,{kind:"edf",evalExpr:r,sampleExpr:`schlickSample_${this.name}`,pdfExpr:`schlickPdf_${this.name}`,flagsExpr:"4"}),r}};var zr=class extends te{emitGLSL(e){let t=this.color(e,"top","vec3(0.0)"),n=this.color(e,"base","vec3(0.0)"),i=`bsdf_${this.name}`;e.lines.push(`float topEnergy_${this.name} = clamp(max(max(${t}.r, ${t}.g), ${t}.b), 0.0, 1.0);`),e.lines.push(`vec3 ${i} = ${t} + (1.0 - topEnergy_${this.name}) * ${n};`),e.emitted.set(this.name,i);let s=this.inputs.get("top"),r=this.inputs.get("base"),o=s?.kind==="connection"?e.closureContracts?.get(s.sourceName):void 0,l=r?.kind==="connection"?e.closureContracts?.get(r.sourceName):void 0,c=o?.pdfExpr??"1.0",u=l?.pdfExpr??"1.0",h=o?.flagsExpr??this.flagReflect(),d=l?.flagsExpr??this.flagReflect();return this.registerClosureContract(e,"layered",i,i,`mix((${u}), (${c}), topEnergy_${this.name})`,`((${h}) | (${d}))`),i}};var kr=class extends te{emitGLSL(e){let t=this.color(e,"top","vec3(0.0)"),n=this.color(e,"base","vec3(0.0)"),i=this.scalar(e,"scale_top","1.0"),s=this.scalar(e,"scale_base","1.0"),r=this.scalar(e,"scale_layer","1.0"),o=`bsdf_${this.name}`;e.lines.push(`vec3 topScaled_${this.name} = (${t}) * (${i});`),e.lines.push(`vec3 baseScaled_${this.name} = (${n}) * (${s});`),e.lines.push(`float topEnergy_${this.name} = clamp(max(max(topScaled_${this.name}.r, topScaled_${this.name}.g), topScaled_${this.name}.b), 0.0, 1.0);`),e.lines.push(`vec3 layerCombined_${this.name} = topScaled_${this.name} + (1.0 - topEnergy_${this.name}) * baseScaled_${this.name};`),e.lines.push(`vec3 ${o} = layerCombined_${this.name} * (${r});`),e.emitted.set(this.name,o);let l=this.inputs.get("top"),c=this.inputs.get("base"),u=l?.kind==="connection"?l.sourceName:null,h=c?.kind==="connection"?c.sourceName:null,d=u?e.closureContracts?.get(u):void 0,p=h?e.closureContracts?.get(h):void 0,f=d&&p?`(${d.flagsExpr} | ${p.flagsExpr})`:d?.flagsExpr??p?.flagsExpr??this.flagReflect(),g=d&&p?`mix((${p.pdfExpr}), (${d.pdfExpr}), topEnergy_${this.name})`:d?.pdfExpr??p?.pdfExpr??"1.0";return this.registerClosureContract(e,"layered",o,o,g,f),o}};function jg(a,e,t,n){for(let i of t){let s=a.resolveGLSL(i,e);if(s!=="0.0")return s}return Be(n)}var tn=class extends L{outputType="vector3";expr;constructor(e,t){super(e),this.expr=t}parse(e){return this.parseInputs(e),this.outputType=B(e,"vector3"),this}emitGLSL(e){let t=`geom_${this.name}`,n=O(this.outputType),i=de(this.outputType,this.expr);return e.lines.push(`${n} ${t} = ${i};`),e.emitted.set(this.name,t),t}},Vr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`conv_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=de(this.outputType,i);return e.lines.push(`${n} ${t} = ${s};`),e.emitted.set(this.name,t),t}},$r=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`range_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e),s=this.inputs.has("inlow")?this.resolveGLSL("inlow",e):"0.0",r=this.inputs.has("inhigh")?this.resolveGLSL("inhigh",e):"1.0",o=this.inputs.has("outlow")?this.resolveGLSL("outlow",e):Be(this.outputType),l=this.inputs.has("outhigh")?this.resolveGLSL("outhigh",e):he(this.outputType),c=this.inputs.has("gamma")?this.resolveGLSL("gamma",e):"1.0",u=de(this.outputType,"1e-6"),h=Be(this.outputType),d=he(this.outputType);return e.lines.push(`${n} ${t}_t = ((${i}) - (${s})) / max((${r}) - (${s}), ${u});`),e.lines.push(`${t}_t = clamp(${t}_t, ${h}, ${d});`),e.lines.push(`${t}_t = pow(max(${t}_t, ${h}), ${d} / max(${c}, ${u}));`),e.lines.push(`${n} ${t} = mix(${de(this.outputType,o)}, ${de(this.outputType,l)}, ${t}_t);`),e.emitted.set(this.name,t),t}},nn=class extends L{outputType="color3";axis;constructor(e,t){super(e),this.axis=t}parse(e){return this.parseInputs(e),this.outputType=B(e,"color3"),this}emitGLSL(e){let t=`ramp_${this.name}`,n=O(this.outputType),i=this.inputs.has("bg")?this.resolveGLSL("bg",e):Be(this.outputType),s=this.inputs.has("fg")?this.resolveGLSL("fg",e):he(this.outputType),r=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):"vec2(0.0)",o=this.axis==="x"?`${r}.x`:`${r}.y`;return e.lines.push(`${n} ${t} = mix(${de(this.outputType,i)}, ${de(this.outputType,s)}, clamp(${o}, 0.0, 1.0));`),e.emitted.set(this.name,t),t}},$i=class extends L{outputType="color3";axis;constructor(e,t){super(e),this.axis=t}parse(e){return this.parseInputs(e),this.outputType=B(e,"color3"),this}emitGLSL(e){let t=`split_${this.name}`,n=O(this.outputType),i=this.inputs.has("bg")?this.resolveGLSL("bg",e):Be(this.outputType),s=this.inputs.has("fg")?this.resolveGLSL("fg",e):he(this.outputType),r=this.inputs.has("center")?this.resolveGLSL("center",e):"0.5",o=this.inputs.has("texcoord")?this.resolveGLSL("texcoord",e):"vec2(0.0)",l=this.axis==="x"?`${o}.x`:`${o}.y`;return e.lines.push(`float ${t}_m = step(${r}, ${l});`),e.lines.push(`${n} ${t} = mix(${de(this.outputType,i)}, ${de(this.outputType,s)}, ${t}_m);`),e.emitted.set(this.name,t),t}},Hr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType="float",this}emitGLSL(e){let t=`dist_${this.name}`,n=this.resolveGLSL("in1",e),i=this.resolveGLSL("in2",e);return e.lines.push(`float ${t} = length((${n}) - (${i}));`),e.emitted.set(this.name,t),t}},Rn=class extends L{outputType="color3";mode;constructor(e,t){super(e),this.mode=t}parse(e){return this.parseInputs(e),this.outputType=B(e,"color3"),this}emitGLSL(e){let t=`blend_${this.name}`,n=O(this.outputType),i=de(this.outputType,this.inputs.has("fg")?this.resolveGLSL("fg",e):he(this.outputType)),s=de(this.outputType,this.inputs.has("bg")?this.resolveGLSL("bg",e):Be(this.outputType));return this.mode==="screen"?e.lines.push(`${n} ${t} = ${he(this.outputType)} - (${he(this.outputType)} - ${i}) * (${he(this.outputType)} - ${s});`):this.mode==="overlay"?e.lines.push(`${n} ${t} = mix(2.0 * ${i} * ${s}, ${he(this.outputType)} - 2.0 * (${he(this.outputType)} - ${i}) * (${he(this.outputType)} - ${s}), step(0.5, ${s}));`):this.mode==="dodge"?e.lines.push(`${n} ${t} = ${s} / max(${he(this.outputType)} - ${i}, ${de(this.outputType,"vec3(1e-6)")});`):e.lines.push(`${n} ${t} = ${he(this.outputType)} - ((${he(this.outputType)} - ${s}) / max(${i}, ${de(this.outputType,"vec3(1e-6)")});`),e.emitted.set(this.name,t),t}},Wr=class extends L{outputType="vector3";parse(e){return this.parseInputs(e),this.outputType=B(e,"vector3"),this}emitGLSL(e){let t=`refract_${this.name}`,n=this.inputs.has("in")?this.resolveGLSL("in",e):"vec3(0.0, 0.0, -1.0)",i=this.inputs.has("normal")?this.resolveGLSL("normal",e):"vec3(0.0, 0.0, 1.0)",s=this.inputs.has("ior")?this.resolveGLSL("ior",e):"1.5";return e.lines.push(`vec3 ${t} = refract(normalize(vec3(${n})), normalize(vec3(${i})), 1.0 / max(${s}, 1e-6));`),e.emitted.set(this.name,t),t}},Xr=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`sat_${this.name}`,n=O(this.outputType),i=this.resolveGLSL("in",e);return e.lines.push(`${n} ${t} = clamp(${de(this.outputType,i)}, ${Be(this.outputType)}, ${he(this.outputType)});`),e.emitted.set(this.name,t),t}},Yr=class extends L{outputType="float";parse(e){return this}emitGLSL(e){let t=`time_${this.name}`;return e.lines.push(`float ${t} = 0.0;`),e.emitted.set(this.name,t),t}},qr=class extends L{outputType="color3";parse(e){return this.parseInputs(e),this.outputType=B(e,"color3"),this}emitGLSL(e){let t=`unpremult_${this.name}`,n=O(this.outputType),i=this.inputs.has("in")?this.resolveGLSL("in",e):Be(this.outputType),s=this.inputs.has("alpha")?this.resolveGLSL("alpha",e):"1.0";return e.lines.push(`${n} ${t} = ${de(this.outputType,i)} / max(${de(this.outputType,s)}, ${de(this.outputType,"vec3(1e-6)")});`),e.emitted.set(this.name,t),t}},ot=class extends L{outputType="float";parse(e){return this.parseInputs(e),this.outputType=B(e,"float"),this}emitGLSL(e){let t=`compat_${this.name}`,n=O(this.outputType),i=jg(this,e,["in","value","fg","bg","normal","position"],this.outputType);return e.lines.push(`${n} ${t} = ${de(this.outputType,i)};`),e.emitted.set(this.name,t),t}};function D(a){return(e,t)=>new a(e).parse(t)}function Hi(a=[]){return new Map([["constant",D(Gs)],["dot",D(zs)],["add",(e,t)=>new Ze(e,"+").parse(t)],["subtract",(e,t)=>new Ze(e,"-").parse(t)],["multiply",D(Mn)],["divide",(e,t)=>new Ze(e,"/").parse(t)],["min",(e,t)=>new Ze(e,"min","function").parse(t)],["max",(e,t)=>new Ze(e,"max","function").parse(t)],["modulo",(e,t)=>new Ze(e,"mod","function").parse(t)],["power",(e,t)=>new Ze(e,"pow","function").parse(t)],["safepower",D(Hs)],["clamp",D(Os)],["atan2",D(Bs)],["absval",(e,t)=>new Me(e,"abs").parse(t)],["sign",(e,t)=>new Me(e,"sign").parse(t)],["sin",(e,t)=>new Me(e,"sin").parse(t)],["cos",(e,t)=>new Me(e,"cos").parse(t)],["tan",(e,t)=>new Me(e,"tan").parse(t)],["asin",(e,t)=>new Me(e,"asin").parse(t)],["acos",(e,t)=>new Me(e,"acos").parse(t)],["sqrt",(e,t)=>new Me(e,"sqrt").parse(t)],["exp",(e,t)=>new Me(e,"exp").parse(t)],["ln",(e,t)=>new Me(e,"log").parse(t)],["floor",(e,t)=>new Me(e,"floor").parse(t)],["ceil",(e,t)=>new Me(e,"ceil").parse(t)],["round",(e,t)=>new Me(e,"round").parse(t)],["fract",(e,t)=>new Me(e,"fract").parse(t)],["combine",(e,t)=>new Sn(e,3).parse(t)],["combine2",(e,t)=>new Sn(e,2).parse(t)],["combine3",(e,t)=>new Sn(e,3).parse(t)],["combine4",(e,t)=>new Sn(e,4).parse(t)],["separate",(e,t)=>new en(e,4).parse(t)],["separate2",(e,t)=>new en(e,2).parse(t)],["separate3",(e,t)=>new en(e,3).parse(t)],["separate4",(e,t)=>new en(e,4).parse(t)],["extract",D(ks)],["swizzle",D(Ws)],["luminance",D(Vs)],["rgbtohsv",D(Ks)],["hsvtorgb",D(qs)],["normalize",D(js)],["dotproduct",D(Zs)],["crossproduct",D(Js)],["reflect",D(Qs)],["magnitude",D(er)],["facingratio",D(tr)],["compare",D(nr)],["ifequal",D(ir)],["ifgreater",D(sr)],["ifgreatereq",D(rr)],["switch",D(ar)],["and",D(or)],["or",D(lr)],["not",D(ur)],["xor",D(cr)],["remap",D(hr)],["smoothstep",D(dr)],["contrast",D(pr)],["invert",D(fr)],["mix",D(mr)],["diffuse_brdf",D(Rr)],["oren_nayar_diffuse_bsdf",D(Ir)],["burley_diffuse_bsdf",D(Lr)],["subsurface_bsdf",D(Pr)],["conductor_brdf",D(Dr)],["conductor_bsdf",D(Fr)],["dielectric_brdf",D(Ur)],["dielectric_bsdf",D(Br)],["dielectric_btdf",D(Or)],["anisotropic_vdf",D(Nr)],["generalized_schlick_edf",D(Gr)],["uniform_edf",D(wn)],["layer",D(zr)],["scaled_layer",D(kr)],["blackbody",D(gr)],["chiang_hair_bsdf",D(xr)],["chiang_hair_absorption_from_color",D(_r)],["chiang_hair_roughness",D(yr)],["deon_hair_absorption_from_melanin",D(Tr)],["surface",D(Mr)],["gltf_colorimage",(e,t)=>new Oe(e,"color4").parse(t)],["color4split",(e,t)=>new en(e,4).parse(t)],["flake2d",(e,t)=>new ce(e,"noise2d").parse(t)],["flake3d",(e,t)=>new ce(e,"noise3d").parse(t)],["upstream_graph_def",(e,t)=>new ce(e,"noise2d").parse(t)],["customtype",(e,t)=>new ce(e,"noise2d").parse(t)],["triplanarprojection",(e,t)=>new Oe(e,"color3").parse(t)],["hextiledimage",(e,t)=>new Oe(e,"color3").parse(t)],["hextilednormalmap",(e,t)=>new Oe(e,"vector3").parse(t)],["generalized_schlick_brdf",(e,t)=>new ye(e,"generic","reflect").parse(t)],["generalized_schlick_bsdf",(e,t)=>new ye(e,"generic","both").parse(t)],["sheen_bsdf",(e,t)=>new ye(e,"generic","reflect").parse(t)],["translucent_bsdf",(e,t)=>new ye(e,"generic","both").parse(t)],["lamaconductor",(e,t)=>new ye(e,"conductor","reflect").parse(t)],["lamadielectric",(e,t)=>new ye(e,"dielectric","both").parse(t)],["lamadiffuse",(e,t)=>new ye(e,"diffuse","reflect").parse(t)],["lamageneralizedschlick",(e,t)=>new ye(e,"generic","reflect").parse(t)],["lamairidescence",(e,t)=>new ye(e,"generic","reflect").parse(t)],["lamalayer",(e,t)=>new ye(e,"composed","both").parse(t)],["lamamix",(e,t)=>new ye(e,"composed","both").parse(t)],["lamaadd",(e,t)=>new ye(e,"composed","both").parse(t)],["lamasss",(e,t)=>new ye(e,"subsurface","both").parse(t)],["lamasheen",(e,t)=>new ye(e,"generic","reflect").parse(t)],["lamatranslucent",(e,t)=>new ye(e,"generic","both").parse(t)],["lamaemission",(e,t)=>new ye(e,"edf","emissive").parse(t)],["roughness_anisotropy",D(br)],["roughness_dual",D(vr)],["artistic_ior",D(Sr)],["place2d",D(Kn)],["rotate2d",D(jn)],["rotate3d",D(wr)],["transformpoint",D(Er)],["transformvector",D(Ar)],["transformnormal",D(Cr)],["heighttonormal",(e,t)=>new ce(e,"heighttonormal").parse(t)],["noise2d",(e,t)=>new ce(e,"noise2d").parse(t)],["noise3d",(e,t)=>new ce(e,"noise3d").parse(t)],["fractal2d",(e,t)=>new ce(e,"fractal2d").parse(t)],["fractal3d",(e,t)=>new ce(e,"fractal3d").parse(t)],["cellnoise2d",(e,t)=>new ce(e,"cellnoise2d").parse(t)],["cellnoise3d",(e,t)=>new ce(e,"cellnoise3d").parse(t)],["worleynoise2d",(e,t)=>new ce(e,"worleynoise2d").parse(t)],["worleynoise3d",(e,t)=>new ce(e,"worleynoise3d").parse(t)],["checker",(e,t)=>new ce(e,"checker").parse(t)],["checkerboard",(e,t)=>new ce(e,"checker").parse(t)],["grid",(e,t)=>new ce(e,"grid").parse(t)],["circle",(e,t)=>new ce(e,"circle").parse(t)],["line",(e,t)=>new ce(e,"line").parse(t)],["trianglewave",(e,t)=>new ce(e,"trianglewave").parse(t)],["position",(e,t)=>new tn(e,"vec3(uv, 0.0)").parse(t)],["normal",(e,t)=>new tn(e,"vec3(0.0, 0.0, 1.0)").parse(t)],["tangent",(e,t)=>new tn(e,"vec3(1.0, 0.0, 0.0)").parse(t)],["bitangent",(e,t)=>new tn(e,"vec3(0.0, 1.0, 0.0)").parse(t)],["frame",(e,t)=>new tn(e,"vec3(0.0, 0.0, 1.0)").parse(t)],["range",D($r)],["convert",D(Vr)],["unifiednoise2d",(e,t)=>new ce(e,"noise2d").parse(t)],["unifiednoise3d",(e,t)=>new ce(e,"noise3d").parse(t)],["creatematrix",D(ot)],["determinant",D(ot)],["transpose",D(ot)],["invertmatrix",D(ot)],["difference",(e,t)=>new Ze(e,"-").parse(t)],["minus",(e,t)=>new Ze(e,"-").parse(t)],["distance",D(Hr)],["dodge",(e,t)=>new Rn(e,"dodge").parse(t)],["burn",(e,t)=>new Rn(e,"burn").parse(t)],["overlay",(e,t)=>new Rn(e,"overlay").parse(t)],["screen",(e,t)=>new Rn(e,"screen").parse(t)],["refract",D(Wr)],["saturate",D(Xr)],["time",D(Yr)],["unpremult",D(qr)],["ramp",(e,t)=>new nn(e,"x").parse(t)],["ramp_gradient",(e,t)=>new nn(e,"x").parse(t)],["ramp4",(e,t)=>new nn(e,"x").parse(t)],["ramplr",(e,t)=>new nn(e,"x").parse(t)],["ramptb",(e,t)=>new nn(e,"y").parse(t)],["splitlr",(e,t)=>new $i(e,"x").parse(t)],["splittb",(e,t)=>new $i(e,"y").parse(t)],["gltf_normalmap",(e,t)=>new ot(e).parse(t)],["bump",(e,t)=>new ot(e).parse(t)],["colorcorrect",(e,t)=>new ot(e).parse(t)],["texcoord",(e,t)=>new ot(e).parse(t)],...a])}var In=class{graphName;nodes=new Map;constructor(e){this.graphName=e}getNode(e){return this.nodes.get(e)}allNodes(){return this.nodes}static _resolvePath(e,t){if(!t)return e;let n=(t+e).split("/"),i=[];for(let s of n)s===".."?i.pop():s!=="."&&i.push(s);return i.join("/")}_topoSort(e){let t=[],n=new Set,i=s=>{if(n.has(s))return;n.add(s);let r=this.nodes.get(s);if(r){for(let o of r.getDependencies())i(o);t.push(r)}};return i(e),t}_findNodeOfType(e,t){let n=this.nodes.get(e),i=new Set;for(;n;){if(n instanceof t)return n;if(i.has(n.name))break;i.add(n.name);let s=n.getDependencies();n=s.length>0?this.nodes.get(s[0]):void 0}return null}static _parseNodes(e,t,n,i={}){let s=i.strictUnknownTags===!0,r=i.unknownTags,o=i.contextLabel??e.getAttribute("name")??"nodegraph";for(let l of Array.from(e.children)){let c=l.tagName.toLowerCase();if(c==="output")continue;let u=t.get(c),h=l.getAttribute("name");if(!u){if(r?.add(c),s)throw new Error(`[MtlxNodeGraph] Unknown node tag "${c}" in ${o}`);continue}h&&n.set(h,u(h,l))}}static _readOutputMap(e){let t=new Map;for(let n of Array.from(e.children)){if(n.tagName.toLowerCase()!=="output")continue;let i=n.getAttribute("name")??"",s=n.getAttribute("nodename")??"",r=n.getAttribute("type")??"";i&&s&&t.set(i,{nodename:s,type:r})}return t}};var Io=class a extends In{outputNodeName="";static NODE_REGISTRY=Hi([["viewdirection",D(Ys)],["latlongimage",D(zi)],["multiply",D(Mn)]]);constructor(e){super(e)}static parse(e,t={}){let n=e.getAttribute("name")??"envMap",i=new a(n);a._parseNodes(e,a.NODE_REGISTRY,i.nodes,t);let s=e.querySelector("output");return i.outputNodeName=s?.getAttribute("nodename")??"",i}extractConfig(e=""){let t="",n=0,i=1;for(let s of this.nodes.values())s instanceof zi?(t=a._resolvePath(s.hdrFile,e),n=s.rotation):s instanceof Mn&&(i=s.in2Literal??1);return{hdrPath:t,rotation:n,intensity:i}}emitGLSL(e="envMapTex"){if(!this.outputNodeName)return"";let t=this._topoSort(this.outputNodeName),n={emitted:new Map,lines:[],envTexUniform:e,preferEnvMapIntensityLiterals:!0},i="";for(let o of t)i=o.emitGLSL(n);let s=`EvalEnvGraph_${this.graphName}`,r=n.lines.map(o=>`    ${o}`).join(`
`);return[`vec3 ${s}(Ray r, sampler2D ${e}) {`,r,`    return ${i};`,"}"].join(`
`)}};var Lo=class a extends In{outputNodeName="";static NODE_REGISTRY=Hi([["uniform_edf",D(wn)],["light",D(ki)]]);constructor(e){super(e)}static parse(e,t={}){let n=e.getAttribute("name")??"lightGraph",i=new a(n);a._parseNodes(e,a.NODE_REGISTRY,i.nodes,t);let s=e.querySelector("output");return i.outputNodeName=s?.getAttribute("nodename")??"",i}extractConfig(e=new Map){let t=[1,1,1],n=1;for(let i of this.nodes.values())i instanceof wn?t=i.resolveColor(e):i instanceof ki&&(n=i.resolveIntensity(e));return{color:t,intensity:n}}emitGLSL(e=new Map){if(!this.outputNodeName)return"";let t=this._topoSort(this.outputNodeName),n={emitted:new Map,lines:[],envTexUniform:"",ifaceValues:e},i="";for(let o of t)i=o.emitGLSL(n);let s=`EvalLightGraph_${this.graphName}`,r=n.lines.map(o=>`    ${o}`).join(`
`);return[`vec3 ${s}() {`,r,`    return ${i};`,"}"].join(`
`)}};var Zn=class a extends In{outputMap=new Map;static NODE_REGISTRY=Hi([["texcoord",D(Xs)],["transformmatrix",D(Vi)],["place2d",D(Kn)],["rotate2d",D(jn)],["normalmap",D($s)],["image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Oe(e,n).parse(t)}],["tiledimage",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Oe(e,n).parse(t)}],["gltf_image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Oe(e,n).parse(t)}],["token_image",(e,t)=>{let n=t.getAttribute("type")??"color3";return new Oe(e,n).parse(t)}],["usduvtexture",(e,t)=>{let n=(t.getAttribute("type")??"color3").toLowerCase()==="multioutput"?"color3":t.getAttribute("type")??"color3";return new Oe(e,n).parse(t)}]]);constructor(e){super(e)}static parse(e,t={}){let n=e.getAttribute("name")??"surfaceGraph",i=new a(n);a._parseNodes(e,a.NODE_REGISTRY,i.nodes,t);for(let[s,r]of a._readOutputMap(e))i.outputMap.set(s,r);return i}allOutputs(){return this.outputMap}extractConfig(e=""){let t=new Map;for(let[n,i]of this.outputMap){let s=this._findNodeOfType(i.nodename,Oe);s&&t.set(n,{filePath:a._resolvePath(s.filePath,e),colorspace:s.colorspace,uvScale:this._findUvScale(s)})}return{outputs:t}}emitPathtracerGLSL(e){let t=[];for(let[n,i]of this.outputMap){if(e&&!e.has(n))continue;let s=this._topoSort(i.nodename),r={emitted:new Map,lines:[],envTexUniform:"",texCoordExpr:"uv",textureArrayUniform:"textureMapsArrayTex",textureLayerExpr:"texLayer",warnings:[]},o="";for(let h of s)o=h.emitGLSL(r);let l=this._outputTypeToGlsl(i.type||this.getNode(i.nodename)?.outputType||"color3"),c=this.outputFunctionName(n),u=r.lines.map(h=>`    ${h}`).join(`
`);if(t.push({outputName:n,functionName:c,glslType:l,closureContract:r.closureContracts?.has(i.nodename)?{outputName:n,kind:r.closureContracts.get(i.nodename).kind,evalExpr:r.closureContracts.get(i.nodename).evalExpr,sampleExpr:r.closureContracts.get(i.nodename).sampleExpr,pdfExpr:r.closureContracts.get(i.nodename).pdfExpr,flagsExpr:r.closureContracts.get(i.nodename).flagsExpr}:void 0,code:[`${l} ${c}(vec2 uv, int texLayer) {`,u,`    return ${o};`,"}"].join(`
`)}),r.warnings&&r.warnings.length>0)for(let h of r.warnings)console.warn(`[MtlxSurfaceNodeGraph:${this.graphName}:${n}] ${h}`)}return t}outputFunctionName(e){let t=this.graphName.replace(/[^A-Za-z0-9_]/g,"_"),n=e.replace(/[^A-Za-z0-9_]/g,"_");return`EvalSurfaceGraph_${t}_${n}`}getOutputClosureContract(e){let t=e?this.outputMap.get(e):this.outputMap.values().next().value;if(!t)return null;let n=this._topoSort(t.nodename),i={emitted:new Map,lines:[],envTexUniform:"",texCoordExpr:"uv",textureArrayUniform:"textureMapsArrayTex",textureLayerExpr:"texLayer",warnings:[]};for(let r of n)r.emitGLSL(i);let s=i.closureContracts?.get(t.nodename);return s?{outputName:e??[...this.outputMap.keys()][0],kind:s.kind,evalExpr:s.evalExpr,sampleExpr:s.sampleExpr,pdfExpr:s.pdfExpr,flagsExpr:s.flagsExpr}:null}_findUvScale(e){for(let t of e.getDependencies()){let n=this.nodes.get(t);if(n instanceof Vi)return n.uvScale}return[1,1]}_outputTypeToGlsl(e){switch((e||"").toLowerCase()){case"float":case"integer":case"boolean":return"float";case"vector2":case"color2":return"vec2";case"vector4":case"color4":return"vec4";case"matrix33":return"mat3";case"matrix44":return"mat4";default:return"vec3"}}};var ad={base_color:"baseColorTexID",baseColor:"baseColorTexID",coat_color:"baseColorTexID",specular_roughness:"metallicRoughnessTexID",roughness:"metallicRoughnessTexID",metalness:"metallicRoughnessTexID",metallic:"metallicRoughnessTexID",coat_roughness:"metallicRoughnessTexID",normal:"normalmapTexID",geometry_normal:"normalmapTexID",emission_color:"emissionmapTexID",emissive:"emissionmapTexID",emissiveColor:"emissionmapTexID",diffuseColor:"baseColorTexID"},Jg=new Set(["image","tiledimage","hextiledimage","gltf_image","gltf_colorimage","gltf_normalmap","token_image","usduvtexture","hextilednormalmap","triplanarprojection"]);function Qg(a){let e=a||"",t=0;return e.includes("1")&&(t|=1),e.includes("2")&&(t|=2),e.includes("4")&&(t|=4),t}function e0(a){switch(a){case"diffuse":return"diffuse";case"conductor":return"conductor";case"dielectric":case"transmission":return"dielectric";case"subsurface":return"subsurface";case"volume":return"volume";case"hair":return"hair";default:return"generic"}}var pe=class a{static REGISTRY=[{tag:"simple_hair",parse:e=>Us.parse(e)},{tag:"standard_surface",parse:e=>Oi.parse(e)},{tag:"open_pbr_surface",parse:e=>Eo.parse(e)},{tag:"disney_principled",parse:e=>Ao.parse(e)},{tag:"gltf_pbr",parse:e=>Co.parse(e)},{tag:"UsdPreviewSurface",parse:e=>Ro.parse(e)}];static _dirOf(e){return e.substring(0,e.lastIndexOf("/")+1)}static async _fetchText(e){let t=await se(e);if(!t.ok)throw new Error(`[MtlxLoader] ${t.statusText??"Read error"} fetching ${e}`);return t.text()}static _resolvePrefix(e,t){let n=a.normalizePath(e+t);return n.endsWith("/")?n:n+"/"}static _findSurfaceEl(e,t){let n=t?`[name="${t}"]`:"";for(let i of a.REGISTRY){let s=e.querySelector(i.tag+n);if(s)return s}return null}static _selectSurfaceMaterialEl(e,t){return t?e.querySelector(`surfacematerial[name="${t}"]`)??e.querySelector("surfacematerial"):e.querySelector("surfacematerial")}static _selectVolumeMaterialEl(e,t){return t?e.querySelector(`volumematerial[name="${t}"]`)??e.querySelector("volumematerial"):e.querySelector("volumematerial")}static _readMaterialInputBinding(e,t){let n=e?.querySelector(`input[name="${t}"]`)??null;return{nodename:n?.getAttribute("nodename")??null,nodegraph:n?.getAttribute("nodegraph")??null,output:n?.getAttribute("output")??null,value:n?.getAttribute("value")??null}}static _resolveSurfaceElFromBinding(e,t){if(t.nodename)return a._findSurfaceEl(e,t.nodename);if(t.nodegraph){let n=e.querySelector(`nodegraph[name="${t.nodegraph}"]`);if(!n)return null;let s=(a._findDirectOutput(n,t.output)??a._findDirectOutput(n))?.getAttribute("nodename")??null;return s?a._findSurfaceEl(n,s):null}return null}static _resolveSurfaceNodeNameFromBinding(e,t){if(t.nodename)return t.nodename;if(!t.nodegraph)return null;let n=e.querySelector(`nodegraph[name="${t.nodegraph}"]`);return n?(a._findDirectOutput(n,t.output)??a._findDirectOutput(n))?.getAttribute("nodename")??null:null}static resolveSurfaceMaterialBindings(e,t){let n=a._selectSurfaceMaterialEl(e,t),i=a._readMaterialInputBinding(n,"surfaceshader"),s=a._readMaterialInputBinding(n,"volumeshader"),r=a._readMaterialInputBinding(n,"displacementshader");return{surfaceMaterialName:n?.getAttribute("name")??null,surfaceShader:i,volumeShader:s,displacementShader:r,surfaceShaderNodeName:i.nodename,volumeShaderNodeName:s.nodename,displacementShaderNodeName:r.nodename}}static resolveVolumeMaterialBindings(e,t){let n=a._selectVolumeMaterialEl(e,t),i=a._readMaterialInputBinding(n,"volumeshader");return{volumeMaterialName:n?.getAttribute("name")??null,volumeShader:i,volumeShaderNodeName:i.nodename}}static _parseSurface(e,t){let n=t?`[name="${t}"]`:"";for(let i of a.REGISTRY){let s=e.querySelector(i.tag+n);if(s)return i.parse(s)}return null}static _parseSurfaceEl(e){if(!e)return null;let t=e.tagName.toLowerCase();for(let n of a.REGISTRY)if(n.tag.toLowerCase()===t)return n.parse(e);return null}static _parseVec3(e){if(!e)return null;let t=e.split(",").map(n=>parseFloat(n.trim()));return t.length<3||t.some(isNaN)?null:new _(t[0],t[1],t[2])}static parse(e){let t=new DOMParser().parseFromString(e,"text/xml");return a.parseFromDoc(t)}static parseFromDoc(e,t){let n=a.resolveSurfaceMaterialBindings(e,t),i=n.surfaceMaterialName??"Unknown",s=a._resolveSurfaceElFromBinding(e,n.surfaceShader);if(s){let c=a._parseSurfaceEl(s);if(c)return c}let r=a._parseSurface(e);if(r)return r;let o=a.parseNodeDefs(e);if(o.byNodeName.size>0&&o.implByDefName.size>0){let c=a._resolveSurfaceNodeNameFromBinding(e,n.surfaceShader);if(c)for(let[u,h]of o.byNodeName){let d=e.querySelector(`${u}[name="${c}"]`);if(!d)continue;let p=o.implByDefName.get(h.defName);if(!p)continue;let f=a._buildIfaceValues(d,h),g=a._resolveNodeDefImpl(p,f,i);if(g)return g}for(let[u,h]of o.byNodeName){let d=e.querySelector(u);if(!d)continue;let p=o.implByDefName.get(h.defName);if(!p)continue;let f=a._buildIfaceValues(d,h),g=a._resolveNodeDefImpl(p,f,i);if(g)return g}for(let[u,h]of o.implByDefName){let d=o.byDefName.get(u);if(!d)continue;let p=a._buildIfaceValues(null,d),f=a._resolveNodeDefImpl(h,p,i);if(f)return f}}let l=a._parseChiangHairSurfaceGraph(e,t);if(l)return l;throw new Error("No supported surface shader found in document.")}static normalizePath(e){let t=e.split("/"),n=[];for(let i of t)i===".."?n.pop():i!=="."&&n.push(i);return n.join("/")}static _directInputs(e){return Array.from(e.children).filter(t=>t.tagName.toLowerCase()==="input")}static _directOutputs(e){return Array.from(e.children).filter(t=>t.tagName.toLowerCase()==="output")}static _findDirectInput(e,t){return a._directInputs(e).find(n=>n.getAttribute("name")===t)??null}static _findDirectOutput(e,t){let n=a._directOutputs(e);return n.length===0?null:t?n.find(i=>i.getAttribute("name")===t)??n[0]:n[0]}static _findNamedChild(e,t){if(!t)return null;for(let n of Array.from(e.children))if(n.getAttribute("name")===t)return n;return null}static _parseVec3LooseValue(e){if(!e)return null;let t=e.replace(/\s+/g,",").replace(/,+/g,",").split(",").map(n=>Number.parseFloat(n.trim()));return t.length<3||t.some(n=>!Number.isFinite(n))?null:new _(t[0],t[1],t[2])}static _parseVec2LooseValue(e){if(!e)return null;let t=e.replace(/\s+/g,",").replace(/,+/g,",").split(",").map(n=>Number.parseFloat(n.trim()));return t.length<2||t.some(n=>!Number.isFinite(n))?null:[t[0],t[1]]}static _literalFloatInput(e,t){let n=a._findDirectInput(e,t);if(!n)return null;let i=Number.parseFloat(n.getAttribute("value")??"");return Number.isFinite(i)?i:null}static _literalVec3Input(e,t){return a._parseVec3LooseValue(a._findDirectInput(e,t)?.getAttribute("value"))}static _literalVec2Input(e,t){return a._parseVec2LooseValue(a._findDirectInput(e,t)?.getAttribute("value"))}static _populateSimpleHairAbsorption(e,t,n){let i=a._findDirectInput(n,"absorption_coefficient");if(!i)return;let s=a._parseVec3LooseValue(i.getAttribute("value"));if(s){e.explicitAbsorptionCoefficient=s;return}let r=a._findNamedChild(t,i.getAttribute("nodename"));if(!r)return;let o=r.tagName.toLowerCase();if(o==="mix"){let l=a._literalFloatInput(r,"mix");l!==null&&(e.melaninMix=Math.min(Math.max(l,0),1));let c=a._findNamedChild(t,a._findDirectInput(r,"fg")?.getAttribute("nodename"));if(c?.tagName.toLowerCase()==="deon_hair_absorption_from_melanin"){let h=a._literalFloatInput(c,"melanin_concentration"),d=a._literalFloatInput(c,"melanin_redness");h!==null&&(e.melaninConcentration=h),d!==null&&(e.melaninRedness=d)}let u=a._findNamedChild(t,a._findDirectInput(r,"bg")?.getAttribute("nodename"));if(u?.tagName.toLowerCase()==="chiang_hair_absorption_from_color"){let h=a._literalVec3Input(u,"color")??a._literalVec3Input(u,"base_color");h&&(e.baseColor=h)}return}if(o==="deon_hair_absorption_from_melanin"){let l=a._literalFloatInput(r,"melanin_concentration"),c=a._literalFloatInput(r,"melanin_redness");e.melaninMix=1,l!==null&&(e.melaninConcentration=l),c!==null&&(e.melaninRedness=c);return}if(o==="chiang_hair_absorption_from_color"){let l=a._literalVec3Input(r,"color")??a._literalVec3Input(r,"base_color");e.melaninMix=0,l&&(e.baseColor=l)}}static _parseChiangHairBsdfNode(e,t,n){if(t.tagName.toLowerCase()!=="chiang_hair_bsdf")return null;let i=new Us(n||(t.getAttribute("name")??"chiang_hair")),s=a._literalVec3Input(t,"tint_R"),r=a._literalVec3Input(t,"tint_TT"),o=a._literalVec3Input(t,"tint_TRT"),l=a._literalFloatInput(t,"ior"),c=a._literalFloatInput(t,"cuticle_angle"),u=a._literalVec2Input(t,"roughness_R");s&&(i.tint_R=s),r&&(i.tint_TT=r),o&&(i.tint_TRT=o),l!==null&&(i.ior=l),c!==null&&(i.cuticleAngle=c),u&&(i.longitudinalRoughness=u[0],i.azimuthalRoughness=u[1]);let h=a._findDirectInput(t,"roughness_R"),d=a._findNamedChild(e,h?.getAttribute("nodename"));if(d?.tagName.toLowerCase()==="chiang_hair_roughness"){let p=a._literalFloatInput(d,"longitudinal")??a._literalFloatInput(d,"longitudinal_roughness"),f=a._literalFloatInput(d,"azimuthal")??a._literalFloatInput(d,"azimuthal_roughness");p!==null&&(i.longitudinalRoughness=p),f!==null&&(i.azimuthalRoughness=f)}return a._populateSimpleHairAbsorption(i,e,t),i}static _parseChiangHairSurfaceGraph(e,t){let n=a._resolveSurfaceNodeNameFromBinding(e,a.resolveSurfaceMaterialBindings(e,t).surfaceShader);for(let i of Array.from(e.querySelectorAll("nodegraph"))){let s=a._findDirectOutput(i,"out")??a._findDirectOutput(i);if(!s)continue;let r=(s.getAttribute("type")??"").toLowerCase();if(r&&r!=="surfaceshader")continue;let o=s.getAttribute("nodename");if(n&&o!==n)continue;let l=a._findNamedChild(i,o);if(!l||l.tagName.toLowerCase()!=="surface")continue;let c=a._findDirectInput(l,"bsdf"),u=a._findNamedChild(i,c?.getAttribute("nodename"));if(!u)continue;let h=a._parseChiangHairBsdfNode(i,u,t??o??i.getAttribute("name")??"chiang_hair");if(h)return h}return null}static _parseVec2Value(e,t=[1,1]){if(!e)return t;let n=e.split(",").map(i=>Number.parseFloat(i.trim()));return n.length>=2&&Number.isFinite(n[0])&&Number.isFinite(n[1])?[n[0],n[1]]:n.length>=1&&Number.isFinite(n[0])?[n[0],n[0]]:t}static _mulVec2(e,t){return[e[0]*t[0],e[1]*t[1]]}static _selectPrimaryConnectionInput(e){let t=["in","texcoord","fg","bg","in1","in2"],n=a._directInputs(e);for(let i of t){let s=n.find(r=>r.getAttribute("name")===i);if(s&&(s.getAttribute("nodename")||s.getAttribute("nodegraph")))return s}return n.find(i=>i.getAttribute("nodename")||i.getAttribute("nodegraph"))??null}static _buildGraphContexts(e,t){let n=new Map,i=e.documentElement.getAttribute("fileprefix")??"";for(let s of Array.from(e.querySelectorAll("nodegraph"))){let r=s.getAttribute("name");if(!r)continue;let o=s.getAttribute("fileprefix")??i,l=a._resolvePrefix(t,o),c=new Map;for(let u of Array.from(s.children)){let h=u.tagName.toLowerCase();if(h==="output"||h==="input")continue;let d=u.getAttribute("name");d&&c.set(d,u)}n.set(r,{name:r,prefix:l,nodeMap:c,outputs:a._directOutputs(s)})}return n}static _resolveUvScaleFromInput(e,t,n,i){if(!e)return[1,1];let s=e.getAttribute("nodegraph");if(s)return a._resolveUvScaleFromGraph(s,e.getAttribute("output"),n,i);let r=e.getAttribute("nodename");return r?a._resolveUvScaleFromNode(t,r,n,i):[1,1]}static _resolveUvScaleFromGraph(e,t,n,i){let s=`uv-graph:${e}:${t??""}`;if(i.has(s))return[1,1];i.add(s);let r=n.get(e);if(!r)return[1,1];let o=r.outputs.find(u=>t?u.getAttribute("name")===t:!0)??r.outputs[0]??null;if(!o)return[1,1];let l=o.getAttribute("nodegraph");if(l)return a._resolveUvScaleFromGraph(l,o.getAttribute("output"),n,i);let c=o.getAttribute("nodename");return c?a._resolveUvScaleFromNode(r,c,n,i):[1,1]}static _resolveUvScaleFromNode(e,t,n,i){let s=`uv-node:${e.name}:${t}`;if(i.has(s))return[1,1];i.add(s);let r=e.nodeMap.get(t);if(!r)return[1,1];let o=r.tagName.toLowerCase();if(o==="transformmatrix"){let c=(a._findDirectInput(r,"mat")?.getAttribute("value")??"").split(",").map(d=>Number.parseFloat(d.trim())),u=[Number.isFinite(c[0])?c[0]:1,Number.isFinite(c[4])?c[4]:1],h=a._resolveUvScaleFromInput(a._findDirectInput(r,"in"),e,n,i);return a._mulVec2(h,u)}if(o==="place2d"){let l=a._parseVec2Value(a._findDirectInput(r,"scale")?.getAttribute("value")),c=a._resolveUvScaleFromInput(a._findDirectInput(r,"texcoord")??a._findDirectInput(r,"in"),e,n,i);return a._mulVec2(c,l)}return o==="rotate2d"||o==="rotate3d"||o==="texcoord"?a._resolveUvScaleFromInput(a._findDirectInput(r,"texcoord")??a._findDirectInput(r,"in"),e,n,i):a._resolveUvScaleFromInput(a._selectPrimaryConnectionInput(r),e,n,i)}static _resolvedTextureFromImage(e,t,n){let i=a._findDirectInput(e,"file")??a._findDirectInput(e,"filex")??a._findDirectInput(e,"filey")??a._findDirectInput(e,"filez"),s=i?.getAttribute("value")??"";if(!s)return null;let r=i?.getAttribute("colorspace")??e.getAttribute("colorspace")??"",o=a._findDirectInput(e,"uvtiling"),l=o?.getAttribute("value")?a._parseVec2Value(o.getAttribute("value")):a._resolveUvScaleFromInput(a._findDirectInput(e,"texcoord"),t,n,new Set);return{filename:t.prefix+s,colorspace:r,uvtiling:l}}static _resolveTextureFromGraph(e,t,n,i){let s=`graph:${e}:${t??""}`;if(i.has(s))return null;i.add(s);let r=n.get(e);if(!r)return null;let o=r.outputs.find(u=>t?u.getAttribute("name")===t:!0)??r.outputs[0]??null;if(!o)return null;let l=o.getAttribute("nodegraph");if(l)return a._resolveTextureFromGraph(l,o.getAttribute("output"),n,i);let c=o.getAttribute("nodename");return c?a._resolveTextureFromNode(r,c,n,i):null}static _resolveTextureFromNode(e,t,n,i){let s=`node:${e.name}:${t}`;if(i.has(s))return null;i.add(s);let r=e.nodeMap.get(t);if(!r)return null;if(Jg.has(r.tagName.toLowerCase()))return a._resolvedTextureFromImage(r,e,n);let o=a._selectPrimaryConnectionInput(r);if(!o)return null;let l=o.getAttribute("nodegraph");if(l)return a._resolveTextureFromGraph(l,o.getAttribute("output"),n,i);let c=o.getAttribute("nodename");return c?a._resolveTextureFromNode(e,c,n,i):null}static resolveNodeGraphs(e,t){let n=new Map,i=a._buildGraphContexts(e,t);for(let[s,r]of i){let o=new Map;for(let l of r.outputs){let c=l.getAttribute("name");if(!c)continue;let u=a._resolveTextureFromGraph(s,c,i,new Set);u&&o.set(c,u)}n.set(s,o)}return n}static resolveInput(e,t){let n=e.getAttribute("nodegraph"),i=e.getAttribute("output");if(!n)return null;let s=t.get(n);return s?i?s.get(i)??null:s.values().next().value??null:null}static parseNodeDefs(e){let t=new Map,n=new Map,i=new Map;for(let s of Array.from(e.querySelectorAll("nodedef"))){let r=s.getAttribute("name"),o=s.getAttribute("node");if(!r||!o)continue;let l=s.getAttribute("nodegroup")??"",c=new Map,u=new Map;for(let d of Array.from(s.children)){let p=d.tagName.toLowerCase(),f=d.getAttribute("name"),g=d.getAttribute("type")??"";f&&(p==="input"?c.set(f,{name:f,type:g,defaultValue:d.getAttribute("value")??null}):p==="output"&&u.set(f,{name:f,type:g}))}let h={defName:r,nodeName:o,nodeGroup:l,inputs:c,outputs:u};t.set(r,h),n.set(o,h)}for(let s of Array.from(e.querySelectorAll("nodegraph"))){let r=s.getAttribute("nodedef"),o=s.getAttribute("name");!r||!o||i.set(r,{graphName:o,defName:r,element:s})}return{byDefName:t,byNodeName:n,implByDefName:i}}static resolveSurfaceTextures(e,t,n){let i=new Map,s=a.resolveNodeGraphs(e,t),r=null,o=a.resolveSurfaceMaterialBindings(e,n);if(r=a._resolveSurfaceElFromBinding(e,o.surfaceShader),r||(r=a._findSurfaceEl(e)),!r)return i;let l=e.documentElement.getAttribute("fileprefix")??"",c=a._resolvePrefix(t,l),u=new Map;for(let d of Array.from(e.documentElement.children)){let p=d.getAttribute("name");p&&u.set(p,d)}let h=Array.from(r.querySelectorAll("input"));for(let d of h){let p=d.getAttribute("name")??"",f=ad[p];if(!f||i.has(f))continue;let g=a.resolveInput(d,s);if(!g){let m=d.getAttribute("nodename");if(m&&!d.getAttribute("nodegraph")){let x={name:"__document__",prefix:c,nodeMap:u,outputs:[]};g=a._resolveTextureFromNode(x,m,new Map,new Set)}}g&&i.set(f,g)}return i}static collectSurfaceGraphBindings(e,t){let n=[],i=null,s=a.resolveSurfaceMaterialBindings(e,t);if(i=a._resolveSurfaceElFromBinding(e,s.surfaceShader),i||(i=a._findSurfaceEl(e)),!i)return n;let r=new Map,o=new Set,l=(c,u)=>{let h=u.replace(/[^A-Za-z0-9_]/g,"_"),d=c.replace(/[^A-Za-z0-9_]/g,"_"),p=`EvalSurfaceDirect_${h}_${d}`;return c==="roughness"||c==="specular_roughness"||c==="coat_roughness"||c==="metalness"||c==="metallic"?{functionName:p,functionCode:[`float ${p}(vec2 uv, int texLayer) {`,"    return texture(textureMapsArrayTex, vec3(uv, float(texLayer))).r;","}"].join(`
`)}:c==="normal"||c==="geometry_normal"?{functionName:p,functionCode:[`vec3 ${p}(vec2 uv, int texLayer) {`,"    return normalize(texture(textureMapsArrayTex, vec3(uv, float(texLayer))).rgb * 2.0 - 1.0);","}"].join(`
`)}:{functionName:p,functionCode:[`vec3 ${p}(vec2 uv, int texLayer) {`,"    return texture(textureMapsArrayTex, vec3(uv, float(texLayer))).rgb;","}"].join(`
`)}};for(let c of Array.from(i.querySelectorAll("input"))){let u=c.getAttribute("name")??"",h=ad[u],d=c.getAttribute("nodegraph");if(!h)continue;if(d){let f=r.get(d);if(!f){let b=e.querySelector(`nodegraph[name="${d}"]`);if(!b)continue;f=Zn.parse(b),r.set(d,f)}let g=c.getAttribute("output")??f.allOutputs().keys().next().value??"";if(!g||!f.allOutputs().has(g))continue;let m=f.outputFunctionName(g),x=f.emitPathtracerGLSL(new Set([g])),y=x.find(b=>b.functionName===m)?.code??"";if(!y)continue;o.has(m)||o.add(m),n.push({inputName:u,field:h,source:"nodegraph",graphName:d,outputName:g,graph:f,functionName:m,functionCode:y,glslType:x.find(b=>b.functionName===m)?.glslType??"vec3"});continue}let p=c.getAttribute("nodename");if(p){let f=l(u,p);o.has(f.functionName)||o.add(f.functionName),n.push({inputName:u,field:h,source:"nodename",functionName:f.functionName,functionCode:f.functionCode,glslType:u==="roughness"||u==="specular_roughness"||u==="coat_roughness"||u==="metalness"||u==="metallic"?"float":"vec3"})}}return n}static collectSurfaceGraphClosureBinding(e,t){let n=a._resolveSurfaceNodeNameFromBinding(e,a.resolveSurfaceMaterialBindings(e,t).surfaceShader);for(let i of Array.from(e.querySelectorAll("nodegraph"))){let s=Zn.parse(i);for(let[r,o]of s.allOutputs()){let l=(o.type??"").toLowerCase();if(l&&l!=="surfaceshader"||n&&o.nodename!==n)continue;let c=s.getOutputClosureContract(r);if(!c)continue;let u=e0(c.kind),h=Qg(c.flagsExpr);return u==="generic"&&(h&1)!==0&&(h&2)!==0&&(u="hair"),{kind:u,flags:h}}}return null}static _createSyntheticNodeGraphFromContainer(e,t,n,i,s,r){if(!t)return null;let o=e.createElement("nodegraph");o.setAttribute("name",n);let l=t.tagName.toLowerCase()==="nodegraph"?Array.from(t.children):Array.from(e.documentElement.children);for(let u of l)o.appendChild(u.cloneNode(!0));let c=e.createElement("output");return c.setAttribute("name",i),c.setAttribute("type",s||"float"),c.setAttribute("nodename",r),o.appendChild(c),o}static _emitSurfaceNodeFunction(e,t,n,i,s){let r="__copilot_displacement_output",o=a._createSyntheticNodeGraphFromContainer(e,t,s,r,i,n);if(!o)return null;let l=Zn.parse(o),c=l.outputFunctionName(r),u=l.emitPathtracerGLSL(new Set([r])).find(h=>h.functionName===c)??null;return u?{functionName:c,functionCode:u.code,glslType:u.glslType}:null}static collectSurfaceDisplacementBinding(e,t,n){let s=a.resolveSurfaceMaterialBindings(e,n).displacementShader;if(!s.nodename&&!s.nodegraph)return null;let r=a._buildGraphContexts(e,t),o=a.resolveNodeGraphs(e,t),l=e.documentElement.getAttribute("fileprefix")??"",c=a._resolvePrefix(t,l),u=new Map;for(let M of Array.from(e.documentElement.children)){let T=M.getAttribute("name");T&&u.set(T,M)}let h={name:"__document__",prefix:c,nodeMap:u,outputs:[]},d=null,p=null,f=s.nodegraph?"nodegraph":"nodename",g=null;if(s.nodegraph?(d=r.get(s.nodegraph)??null,p=e.querySelector(`nodegraph[name="${s.nodegraph}"]`)??null,g=(d?.outputs.find(T=>s.output?T.getAttribute("name")===s.output:!0)??d?.outputs[0]??null)?.getAttribute("nodename")??null):s.nodename&&(d=h,p=e.documentElement,g=s.nodename),!d||!g)return null;let m=d.nodeMap.get(g)??null;if(!m)return null;let x=a._findDirectInput(m,"displacement");if(!x)return null;let y=ge(m,"scale")??1,b=null;if(x.getAttribute("nodegraph")){let M=x.getAttribute("nodegraph"),T=e.querySelector(`nodegraph[name="${M}"]`);if(!T)return null;let w=Zn.parse(T),C=x.getAttribute("output")??w.allOutputs().keys().next().value??"";if(!C||!w.allOutputs().has(C))return null;let E=w.outputFunctionName(C),R=w.emitPathtracerGLSL(new Set([C])).find(N=>N.functionName===E)??null;return R?(b=o.get(M)?.get(C)??null,{source:"nodegraph",functionName:E,functionCode:R.code,glslType:R.glslType,scale:y,texture:b}):null}let S=x.getAttribute("nodename");if(!S)return null;b=a._resolveTextureFromNode(d,S,r,new Set);let v=a._emitSurfaceNodeFunction(e,p,S,x.getAttribute("type")??"float",`${d.name}_displacement_runtime`);return v?{source:f,functionName:v.functionName,functionCode:v.functionCode,glslType:v.glslType,scale:y,texture:b}:null}static _escapeXml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}static _buildIfaceValues(e,t){let n=new Map;for(let[i,s]of t.inputs)s.defaultValue!==null&&n.set(i,s.defaultValue);if(e)for(let i of Array.from(e.children)){if(i.tagName.toLowerCase()!=="input")continue;let s=i.getAttribute("name"),r=i.getAttribute("value");s&&r!==null&&n.set(s,r)}return n}static _buildSyntheticSurface(e,t){let n=e.tagName,i=a._escapeXml(e.getAttribute("name")??"_synth"),s=`<materialx version="1.39"><${n} name="${i}">`;for(let r of Array.from(e.children)){if(r.tagName.toLowerCase()!=="input")continue;let o=r.getAttribute("name")??"";if(!o)continue;let l=r.getAttribute("type")??"",c=r.getAttribute("colorspace")??"",u=r.getAttribute("interfacename"),h=r.getAttribute("value"),d=u!==null?t.get(u)??h:h;d!=null&&(s+=`<input name="${a._escapeXml(o)}"`,s+=` type="${a._escapeXml(l)}"`,s+=` value="${a._escapeXml(d)}"`,c&&(s+=` colorspace="${a._escapeXml(c)}"`),s+="/>")}return s+=`</${n}></materialx>`,new DOMParser().parseFromString(s,"text/xml")}static _resolveNodeDefImpl(e,t,n){let i=e.element,s=null,o=i.querySelector("output")?.getAttribute("nodename")??null;if(o){for(let c of Array.from(i.children))if(c.getAttribute("name")===o){s=c;break}}if(s||(s=a._findSurfaceEl(i)),!s)return null;let l=a._buildSyntheticSurface(s,t);return a._parseSurface(l)}static parseLights(e){let t=[];e.querySelectorAll("directional_light").forEach(i=>{let s=Lt(i,"direction")??new _(0,0,-1),r=Lt(i,"color")??new _(1,1,1),o=ge(i,"intensity")??1,l=new xt;l.position=new _(-s.x,-s.y,-s.z),l.emission=new _(r.x*o,r.y*o,r.z*o),l.type=2,l.area=0,t.push(l)}),e.querySelectorAll("point_light").forEach(i=>{let s=Lt(i,"position")??new _(0,0,0),r=Lt(i,"color")??new _(1,1,1),o=ge(i,"intensity")??1,l=ge(i,"decay_rate")??2,c=new xt;c.position=s,c.emission=new _(r.x*o,r.y*o,r.z*o),c.type=3,c.radius=l,c.area=0,t.push(c)}),e.querySelectorAll("spot_light").forEach(i=>{let s=Lt(i,"position")??new _(0,0,0),r=Lt(i,"direction")??new _(0,0,-1),o=Lt(i,"color")??new _(1,1,1),l=ge(i,"intensity")??1,c=ge(i,"decay_rate")??2,u=ge(i,"inner_angle")??.9,h=ge(i,"outer_angle")??.7,d=Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)||1,p=new xt;p.position=s,p.emission=new _(o.x*l,o.y*l,o.z*l),p.u=new _(r.x/d,r.y/d,r.z/d),p.v=new _(u,h,0),p.type=4,p.radius=c,p.area=0,t.push(p)});let n=a.parseNodeDefs(e);for(let[i,s]of n.byDefName){if(!Array.from(s.outputs.values()).some(l=>l.type==="lightshader"))continue;let r=n.implByDefName.get(i);if(!r)continue;let o=Lo.parse(r.element);for(let l of Array.from(e.querySelectorAll(s.nodeName))){let c=a._buildIfaceValues(l,s),u=o.extractConfig(c),h=new xt,[d,p,f]=u.color;h.emission=new _(d*u.intensity,p*u.intensity,f*u.intensity),h.area=0;let g=a._parseVec3(c.get("position")??""),m=a._parseVec3(c.get("direction")??"");if(g)if(h.position=g,m){let x=Math.sqrt(m.x*m.x+m.y*m.y+m.z*m.z)||1;h.u=new _(m.x/x,m.y/x,m.z/x),h.v=new _(.9,.7,0),h.type=4}else h.type=3;else m?(h.position=new _(-m.x,-m.y,-m.z),h.type=2):(h.position=new _(0,0,0),h.type=3);t.push(h)}}return t}static parseEnvGraph(e,t=""){let i=new DOMParser().parseFromString(e,"text/xml").querySelector("nodegraph");if(!i)throw new Error("[MtlxLoader] No <nodegraph> found in document.");let s=Io.parse(i),r=s.extractConfig(t);return{graph:s,config:r,toGLSL:o=>s.emitGLSL(o),applyToScene:async o=>{r.hdrPath&&await o.addEnvMapByUrlAsync(r.hdrPath),o.renderOptions.envMapIntensity=r.intensity,o.renderOptions.envMapRot=r.rotation*360,o.renderOptions.enableEnvMap=!0}}}static async expandXiIncludes(e,t,n=0){if(n>10)return e;let i=/<xi:include\s[^>]*href=["']([^"']+)["'][^>]*\/?>/g,s=[...e.matchAll(i)];if(s.length===0)return e;let r=t.includes("/")?t.substring(0,t.lastIndexOf("/")+1):"";for(let o of s){let l=o[1],c=l.startsWith("http")||l.startsWith("/")?l:a.normalizePath(r+l),u="";try{let h=await a._fetchText(c);u=(await a.expandXiIncludes(h,c,n+1)).replace(/<\?xml[^>]*\?>/g,"").replace(/^\s*<materialx[^>]*>/,"").replace(/<\/materialx>\s*$/,"").trim()}catch(h){console.warn(`[MtlxLoader] xi:include: failed to fetch ${c}:`,h)}e=e.replace(o[0],u)}return e}static async parseFromUrl(e,t){let n=await a._fetchText(e),i=await a.expandXiIncludes(n,e),s=new DOMParser().parseFromString(i,"text/xml");return a.parseFromDoc(s,t)}static async fetchAndExpand(e){let t=await a._fetchText(e),n=await a.expandXiIncludes(t,e),i=new DOMParser().parseFromString(n,"text/xml");return{xml:n,doc:i,mtlxDir:a._dirOf(e)}}static async parseEnvGraphFromUrl(e,t){let n=await a._fetchText(e);return a.parseEnvGraph(n,t??a._dirOf(e))}};async function od(a,e,t){let n=await pe.fetchAndExpand(e),i=pe.parseFromDoc(n.doc),s=new nt;s.name=t,i.toMaterial(s);let r=pe.collectSurfaceGraphBindings(n.doc),o=pe.collectSurfaceGraphClosureBinding(n.doc),l=pe.collectSurfaceDisplacementBinding(n.doc,n.mtlxDir),c=pe.resolveSurfaceTextures(n.doc,n.mtlxDir),u=!1;for(let[h,d]of c.entries()){let p=await a.addTextureByUrlAsync(d.filename);s[h]=p,!u&&Array.isArray(d.uvtiling)&&d.uvtiling.length>=2&&(s.uvScale.x=d.uvtiling[0],s.uvScale.y=d.uvtiling[1],u=!0)}return{runtimeMaterial:s,proceduralBindings:r,proceduralClosureBinding:o,proceduralDisplacementBinding:l,textureBindingsCount:c.size}}function ld(a,e,t,n,i,s){Array.isArray(a.materialXProceduralEntries)||(a.materialXProceduralEntries=[]);let r=_o(e,t,n,i,s);return r?(go(a.materialXProceduralEntries,r),a.proceduralMaterialGlsl=xo(a.materialXProceduralEntries),!0):!1}var vu=class{sampleCount=0},Kr=class a{static showGui=!0;static params=new vu;static gui=null;static guiResizeHandler=null;static guiDragCleanup=null;static actionButtonsCleanup=null;static guiManualPosition=null;static openPbrPresetByMaterialID=new Map;static materialXNodeOptionsCache=null;static materialXSelectionByInstance=new Map;static build(e){if(!a.showGui){a.gui&&(a.gui.destroy(),a.gui=null),a.guiResizeHandler&&(window.removeEventListener("resize",a.guiResizeHandler),a.guiResizeHandler=null),a.guiDragCleanup&&(a.guiDragCleanup(),a.guiDragCleanup=null),a.actionButtonsCleanup&&(a.actionButtonsCleanup(),a.actionButtonsCleanup=null);return}a.gui&&(a.gui.destroy(),a.gui=null),a.guiDragCleanup&&(a.guiDragCleanup(),a.guiDragCleanup=null),a.actionButtonsCleanup&&(a.actionButtonsCleanup(),a.actionButtonsCleanup=null);let t=a.getAdaptiveGuiWidth(),n=new So({title:"Settings",width:t});a.gui=n,a.guiResizeHandler&&(window.removeEventListener("resize",a.guiResizeHandler),a.guiResizeHandler=null);let i=()=>{let x=n.domElement,y=window.matchMedia("(max-width: 900px)").matches;if(x.style.width=`${a.getAdaptiveGuiWidth()}px`,x.style.maxWidth="calc(100vw - 20px)",x.style.maxHeight=y?"calc(100vh - 90px)":"calc(100vh - 50px)",x.style.overflowY="auto",x.style.display="block",x.style.position="fixed",x.style.zIndex="1500",document.body.classList.toggle("gui-compact",y),document.body.classList.remove("gui-hidden"),a.guiManualPosition){let b=a.clampGuiPosition(x,a.guiManualPosition.x,a.guiManualPosition.y);a.guiManualPosition=b,a.applyGuiPosition(x,b.x,b.y)}else n.domElement.style.right="8px",n.domElement.style.top="8px",n.domElement.style.left="auto"};a.guiResizeHandler=i,window.addEventListener("resize",i),i(),a.guiDragCleanup=a.enableGuiDragging(n);let s=e.renderer,r=s.scene,o=r instanceof st,l=r.renderOptions,c={rewind:()=>(e.rewind(),!0),pauseOrContinue:()=>e.pauseOrContinue(),fullscreen:async()=>{let x=document.getElementById("canvas");x&&(x.requestFullscreen?await x.requestFullscreen():x.mozRequestFullScreen?await x.mozRequestFullScreen():x.webkitRequestFullscreen?await x.webkitRequestFullscreen():x.msRequestFullscreen&&await x.msRequestFullscreen(),x.focus&&x.focus())},isPaused:()=>!!e.stopped},u={enableDebug:lt.profiling,showBenchmark:!0};n.add(s,"sampleCounter").listen().name("Samples").disable(),a.actionButtonsCleanup=a.addActionButtonsRow(n,c);let h=a.attachBenchmarkToGui(n.domElement);h&&n.add(u,"showBenchmark").name("Show Benchmark").onChange(x=>{h.style.display=x?"flex":"none"});let d=n.addFolder("Scene").close();{let x=r.sceneName??"",y=e.scenes.find(T=>x===T||x===`/scenes/pathtracer/${T}`),b=e.shadertoyScenes.find(T=>x===T||x===`/scenes/shadertoy/examples/${T}/shader.json`),S=e.shadertoyGlslPathtracerScenes.find(T=>x===`/scenes/shadertoy/examples/glsl-pathtracer/${T}/shadertoy.json`),v=e.shadertoyGlslPathtracerScenes.find(T=>x===`/scenes/shadertoy/examples/glsl-pathtracer/${T}/data.json`),M={pathTracingScene:y,shadertoyScene:b,glslPathTracerScene:S,glslPathTracerScene2:v};d.add(M,"pathTracingScene",e.scenes).name("PathTracer Scene").onChange(async T=>{M.pathTracingScene=T,await e.startSceneAsync(`/scenes/pathtracer/${T}`)}),d.add(M,"shadertoyScene",e.shadertoyScenes).name("ShaderToy Scene").onChange(async T=>{M.shadertoyScene=T,await e.startSceneAsync(`/scenes/shadertoy/examples/${T}/shader.json`)}),d.add(M,"glslPathTracerScene",e.shadertoyGlslPathtracerScenes).name("GLSL-PathTracer Scene (with Shadertoy)").onChange(async T=>{M.glslPathTracerScene=T,await e.startSceneAsync(`/scenes/shadertoy/examples/glsl-pathtracer/${T}/shadertoy.json`)}),d.add(M,"glslPathTracerScene2",e.shadertoyGlslPathtracerScenes).name("GLSL-PathTracer Scene (with Pathtracer)").onChange(async T=>{M.glslPathTracerScene2=T,await e.startSceneAsync(`/scenes/shadertoy/examples/glsl-pathtracer/${T}/data.json`)}),o&&d.add({envMap:e.envMaps[e.envMapIdx]},"envMap",e.envMaps).name("EnvMaps").onChange(async T=>{await r.addEnvMapAsync(`HDR/${T}`)})}let p=n.addFolder("Render Settings").close();{let x=l.screenZoom;if(p.add({zoom:x},"zoom",[.25,.5,.75,1]).listen().name("Screen Zoom").onChange(y=>{l.screenZoom=y,e.resizeAsync(l.originalRenderResolution.x*y,l.originalRenderResolution.y*y)}),p.add(l,"pixelRatio",[.25,.5,.75,1]).listen().name("Pixel Ratio").onChange(y=>{l.tileWidth=Math.floor(l.renderResolution.x*y),l.tileHeight=Math.floor(l.renderResolution.y*y),e.startSceneAsync(r.sceneName)}),p.add(l,"maxSpp",-1,256).step(1).listen().name("Max SPP").onChange(y=>{e.optionsChanged=!0}),p.add(l,"forceSynchronousShaderLink").listen().name("Disable KHR parallel compile").onChange(y=>{e.reloadShaders=!0}),o){p.add(l,"maxDepth",1,10).listen().name("Max Depth").onChange(b=>{e.optionsChanged=!0}),p.add(l,"enableRR").listen().name("Enable Russian Roulette").onChange(b=>{e.reloadShaders=!0}),p.add(l,"RRDepth",1,10).listen().name("Russian Roulette Depth").onChange(b=>{e.reloadShaders=!0}),p.add(l,"enableRoughnessMollification").listen().name("Enable Roughness Mollification").onChange(b=>{e.reloadShaders=!0}),p.add(l,"roughnessMollificationAmt").listen().name("Roughness Mollification Amount").onChange(b=>{e.optionsChanged=!0}),p.add(l,"enableVolumeMIS").listen().name("Enable Volume MIS").onChange(b=>{e.reloadShaders=!0}),p.add(l,"useThinFilmLUT").listen().name("Thin Film: use LUT").onChange(b=>{e.reloadShaders=!0});let y=l.sssMode===1?"randomWalk":l.sssMode===2?"dipole":"none";p.add({sssMode:y},"sssMode",["none","randomWalk","dipole"]).name("SSS Mode").onChange(b=>{l.sssMode=b==="randomWalk"?1:b==="dipole"?2:0,e.reloadShaders=!0,e.optionsChanged=!0}),(o||r?.shadertoyShader?.isGlslPathtracer)&&(p.add(l,"enableDenoiser").listen().name("Enable Denoiser"),p.add(l,"denoiserFrameCnt",5,20).step(1).listen().name("Denoiser Frame Count"))}}let f=n.addFolder("Environment").close();{let x=_.pow(l.uniformLightCol,.45454545454545453);f.addColor({rgb:{r:x.x,g:x.y,b:x.z}},"rgb").listen().name("Uniform Light Color (Gamma Corrected)").onChange(y=>{l.uniformLightCol=_.pow(new _(y.r,y.g,y.b),2.2),e.optionsChanged=!0}),f.add(l,"enableEnvMap").listen().name("Enable Environment Map").onChange(y=>{e.reloadShaders=!0}),f.add(l,"envMapIntensity",.1,10).listen().name("Environment Map Intensity").onChange(y=>{e.optionsChanged=!0}),f.add(l,"envMapRot",0,360).listen().name("Environment Map Rotation").onChange(y=>{e.optionsChanged=!0}),f.add(l,"hideEmitters").listen().name("Hide Emitters").onChange(y=>{e.reloadShaders=!0}),f.add(l,"enableBackground").listen().name("Enable Background").onChange(y=>{e.reloadShaders=!0}),f.addColor(l,"backgroundCol").listen().name("Background Color").onChange(y=>{e.optionsChanged=!0}),f.add(l,"transparentBackground").listen().name("Transparent Background").onChange(y=>{e.reloadShaders=!0})}let g=n.addFolder("Tonemapping").close();{let x=g.add(l,"enableTonemap").listen().name("Enable Tonemap"),y=g.add(l,"enableAces").listen().name("Enable ACES"),b=g.add(l,"simpleAcesFit").listen().name("Simple ACES Fit");x.onChange(S=>{S?y.enable():(y.setValue(!1),b.setValue(!1),y.disable(),b.disable())}),y.onChange(S=>{S?b.enable():(b.disable(),b.setValue(!1))})}let m=n.addFolder("Camera").close();{let x=Ls.degrees(r.camera.fov);m.add({fov:x},"fov",10,90).listen().name("Fov").onChange(b=>{r.camera.setFov(b),e.optionsChanged=!0});let y=r.camera.aperture*1e3;m.add({aperture:y},"aperture",0,10).listen().name("Aperture").onChange(b=>{r.camera.aperture=b/1e3,e.optionsChanged=!0}),m.add(r.camera,"focalDist",.01,50).listen().name("Focal Distance").onChange(b=>{e.optionsChanged=!0}),m.add({pos:`${r.camera.position.x.toFixed(2)}, ${r.camera.position.y.toFixed(2)}, ${r.camera.position.z.toFixed(2)}`},"pos").listen().name("Pos").disable()}if(r.materials&&r.materials.length>0){let x=n.addFolder("Materials").close();{let y=[];for(let S=0;S<r.materials.length;S++)y.push(r.materials[S].name);let b=null;x.add({instance:"-- None --"},"instance",y).onChange(S=>{S==="-- None --"?(b?.destroy(),b=null):b=a.onMaterialChanged(x,b,S,e)}),b=a.onMaterialChanged(x,b,r.materials[0].name,e)}}if(r.meshInstances&&r.meshInstances.length>0){let x=n.addFolder("Instances").close();{let y=[];for(let S=0;S<r.meshInstances.length;S++)y.push(r.meshInstances[S].name);let b=null;x.add({instance:""},"instance",y).onChange(S=>{b=a.onInstanceChanged(x,b,S,e)}),b=a.onInstanceChanged(x,b,r.meshInstances[0].name,e)}}}static onMaterialChanged(e,t,n,i){let s=i.renderer.scene,r=s.renderOptions;t?.destroy(),t=e.addFolder("Material").close();let o=s.materials.findIndex(C=>C?.name===n);o<0&&(o=0);let l=s.materials[o];if(!l)return t;let c=t.addFolder("Base").open();{let C=_.pow(l.baseColor,.45454545454545453);c.addColor({rgb:{r:C.x,g:C.y,b:C.z}},"rgb").listen().name("Albedo (Gamma Corrected)").onChange(E=>{l.baseColor=_.pow(new _(E.r,E.g,E.b),2.2),i.objectPropChanged=!0}),c.add(l,"baseWeight",0,1).listen().name("Base Weight").onChange(E=>{i.objectPropChanged=!0}),c.add(l,"baseDiffuseRoughness",0,1).listen().name("Base Diffuse Roughness").onChange(E=>{i.objectPropChanged=!0}),c.add(l,"metallic",0,1).listen().name("Metallic").onChange(E=>{i.objectPropChanged=!0}),c.add(l,"roughness",0,1).listen().name("Roughness").onChange(E=>{i.objectPropChanged=!0})}let u=t.addFolder("Specular").open();{u.add(l,"specularTint",0,1).listen().name("SpecularTint").onChange(E=>{i.objectPropChanged=!0});let C=_.pow(l.specularColor,1/2.2);u.addColor({rgb:{r:C.x,g:C.y,b:C.z}},"rgb").listen().name("Specular Color").onChange(E=>{l.specularColor=_.pow(new _(E.r,E.g,E.b),2.2),i.objectPropChanged=!0}),u.add(l,"ior",1.001,2.5).listen().name("Ior").onChange(E=>{i.objectPropChanged=!0}),u.add(l,"specularWeight",0,1).listen().name("Specular Weight").onChange(E=>{i.objectPropChanged=!0}),u.add(l,"anisotropic",0,1).listen().name("Anisotropic").onChange(E=>{i.objectPropChanged=!0}),u.add(l,"anisotropyRotation",0,1).listen().name("Anisotropy Rotation").onChange(E=>{i.objectPropChanged=!0})}let h=t.addFolder("Coat").open();{h.add(l,"clearcoat",0,1).listen().name("Clearcoat").onChange(E=>{i.objectPropChanged=!0}),h.add(l,"clearcoatGloss",0,1).listen().name("ClearcoatGloss").onChange(E=>{i.objectPropChanged=!0});let C=_.pow(l.coatColor,1/2.2);h.addColor({rgb:{r:C.x,g:C.y,b:C.z}},"rgb").listen().name("Coat Color").onChange(E=>{l.coatColor=_.pow(new _(E.r,E.g,E.b),2.2),i.objectPropChanged=!0}),h.add(l,"coatIOR",1.01,10).listen().name("Coat IOR").onChange(E=>{i.objectPropChanged=!0}),h.add(l,"coatRoughnessAnisotropy",0,1).listen().name("Coat Roughness Anisotropy").onChange(E=>{i.objectPropChanged=!0}),h.add(l,"coatAnisotropyRotation",0,1).listen().name("Coat Anisotropy Rotation").onChange(E=>{i.objectPropChanged=!0}),h.add(l,"coatDarkening",0,1).listen().name("Coat Darkening").onChange(E=>{i.objectPropChanged=!0}),h.add(l,"coatAffectRoughness",0,1).listen().name("Coat Affect Roughness").onChange(E=>{i.objectPropChanged=!0})}let d=t.addFolder("Sheen").open();{d.add(l,"sheen",0,1).listen().name("Sheen").onChange(N=>{i.objectPropChanged=!0}),d.add(l,"sheenTint",0,1).listen().name("SheenTint").onChange(N=>{i.objectPropChanged=!0}),d.add(l,"fuzzRoughness",0,1).listen().name("Fuzz Roughness").onChange(N=>{i.objectPropChanged=!0});let C={useCustom:l.fuzzColor.x>=0,get rgb(){let N=l.fuzzColor.x>=0?l.fuzzColor:new _(1,1,1),A=_.pow(N,1/2.2);return{r:A.x,g:A.y,b:A.z}}},E=null,R=()=>{E=d.addColor(C,"rgb").listen().name("Fuzz Color").onChange(N=>{l.fuzzColor=_.pow(new _(N.r,N.g,N.b),2.2),i.objectPropChanged=!0})};d.add(C,"useCustom").listen().name("Custom Fuzz Color").onChange(N=>{N?(l.fuzzColor=new _(1,1,1),E||R(),E.domElement.style.display=""):(l.fuzzColor=new _(-1,-1,-1),E&&(E.domElement.style.display="none")),i.objectPropChanged=!0}),R(),C.useCustom||(E.domElement.style.display="none")}let p,f,g,m=()=>{let C=l.specTrans>0&&l.dispersionScale>0;f&&(f.domElement.style.display=C?"":"none"),g&&(g.domElement.style.display=C?"":"none")},x=t.addFolder("Transmission").open();{p=x.add(l,"specTrans",0,1).listen().name("SpecTrans").onChange(E=>{i.objectPropChanged=!0,m()});let C=_.pow(l.transmissionColor,1/2.2);x.addColor({rgb:{r:C.x,g:C.y,b:C.z}},"rgb").listen().name("Transmission").onChange(E=>{l.transmissionColor=_.pow(new _(E.r,E.g,E.b),2.2),i.objectPropChanged=!0}),x.add(l,"thinWalled",0,1).step(1).listen().name("Thin Walled").onChange(E=>{i.objectPropChanged=!0}),x.add(l,"transmissionExtraRoughness",0,1).listen().name("Transmission Extra Roughness").onChange(E=>{i.objectPropChanged=!0})}let y=t.addFolder("SSS").open();{let C,E,R,N=()=>{let A=l.subsurface>0;C.domElement.style.display=A?"":"none",E.domElement.style.display=A?"":"none",R.domElement.style.display=A?"":"none"};y.add(l,"subsurface",0,1).listen().name("Subsurface").onChange(A=>{i.objectPropChanged=!0,N()}),C=y.add({subsurfaceRadiusScaleX:l.subsurfaceRadiusScale.x},"subsurfaceRadiusScaleX",0,1).listen().name("Subsurface Radius Scale X").onChange(A=>{l.subsurfaceRadiusScale.x=A,i.objectPropChanged=!0}),E=y.add({subsurfaceRadiusScaleY:l.subsurfaceRadiusScale.y},"subsurfaceRadiusScaleY",0,1).listen().name("Subsurface Radius Scale Y").onChange(A=>{l.subsurfaceRadiusScale.y=A,i.objectPropChanged=!0}),R=y.add({subsurfaceRadiusScaleZ:l.subsurfaceRadiusScale.z},"subsurfaceRadiusScaleZ",0,1).listen().name("Subsurface Radius Scale Z").onChange(A=>{l.subsurfaceRadiusScale.z=A,i.objectPropChanged=!0}),N()}let b=t.addFolder("Medium").open();{let C,E,R,N,A,F=()=>{let X=l.mediumType!==0;C.domElement.style.display=X?"":"none",E.domElement.style.display=X?"":"none",R.domElement.style.display=X?"":"none",A.domElement.style.display=X?"":"none",N.domElement.style.display=X?"":"none"},z=()=>{let X=l.mediumType===2;N.domElement.style.display=X?"":"none"},k=l.mediumType,ue=k===0?"None":k===1?"Absorb":k===2?"Scatter":"Emissive";b.add({mediumType:ue},"mediumType",["None","Absorb","Scatter","Emissive"]).listen().name("Medium Type").onChange(X=>{i.reloadShaders=!0,i.objectPropChanged=!0,l.mediumType=X==="None"?0:X==="Absorb"?1:X==="Scatter"?2:3,F(),z()});let ve=_.pow(l.mediumColor,1/2.2);C=b.addColor({rgb:{r:ve.x,g:ve.y,b:ve.z}},"rgb").listen().name("Medium Color (Gamma Corrected)").onChange(X=>{l.mediumColor=_.pow(new _(X.r,X.g,X.b),2.2),i.objectPropChanged=!0}),E=b.add(l,"mediumScattering",0,5).listen().name("Medium Scattering (sigma_s)").onChange(X=>{i.objectPropChanged=!0}),R=b.add(l,"mediumAbsorption",0,5).listen().name("Medium Absorption").onChange(X=>{i.objectPropChanged=!0}),N=b.add(l,"mediumAnisotropy",-.99,.99).listen().name("Medium Anisotropy").onChange(X=>{i.objectPropChanged=!0}),A=b.add(l,"mediumThickness",0,5).listen().name("Medium Thickness").onChange(X=>{i.objectPropChanged=!0}),F(),z()}let S=t.addFolder("Emission").open();{let C=_.pow(l.emission,.45454545454545453);S.addColor({rgb:{r:C.x,g:C.y,b:C.z}},"rgb").listen().name("Emission (Gamma Corrected)").onChange(E=>{l.emission=_.pow(new _(E.r,E.g,E.b),2.2),i.objectPropChanged=!0})}let v=t.addFolder("Thin Film").open();v.add(l,"thinFilmWeight",0,1).listen().name("Thin Film Weight").onChange(C=>{i.objectPropChanged=!0}),v.add(l,"thinFilmThickness",0,2e3).listen().name("Thin Film Thickness (nm)").onChange(C=>{i.objectPropChanged=!0}),v.add(l,"thinFilmIor",1,3).listen().name("Thin Film IOR").onChange(C=>{i.objectPropChanged=!0});let M=t.addFolder("Dispersion").open();f=M.add(l,"dispersionScale",0,1).listen().name("Dispersion Scale").onChange(C=>{i.objectPropChanged=!0,m()}),g=M.add(l,"abbeNumber",1,100).listen().name("Abbe Number").onChange(C=>{i.objectPropChanged=!0}),m();let T=t.addFolder("Alpha").open();{let C,E=()=>{let A=l.alphaMode!==0;C.domElement.style.display=A?"":"none"},N=l.alphaMode===0?"Opaque":"Blend";T.add({alphaMode:N},"alphaMode",["Opaque","Blend"]).listen().name("Alpha Mode").onChange(A=>{l.alphaMode=A==="Opaque"?0:1,i.reloadShaders=!0,i.objectPropChanged=!0,E()}),C=T.add(l,"opacity",0,1).listen().name("Opacity").onChange(A=>{i.objectPropChanged=!0}),T.add(l,"alphaCutoff",0,1).listen().name("Alpha Cutoff").onChange(A=>{i.objectPropChanged=!0}),T.add(l,"doubleSided",0,1,1).listen().name("Double Sided").onChange(A=>{i.objectPropChanged=!0}),E()}let w=t.addFolder("UV").open();return w.add({uvScaleX:l.uvScale.x},"uvScaleX",.01,10).listen().name("UV Scale X").onChange(C=>{l.uvScale.x=C,i.objectPropChanged=!0}),w.add({uvScaleY:l.uvScale.y},"uvScaleY",.01,10).listen().name("UV Scale Y").onChange(C=>{l.uvScale.y=C,i.objectPropChanged=!0}),t}static onInstanceChanged(e,t,n,i){let s=i.renderer.scene;t?.destroy(),t=e.addFolder("Transforms").close();let r=s.meshInstances.find(h=>h.name===n),o=r.transform,l,c,u;if({translation:l,rotation:c,scale:u}=o.decompose(),t.add({x:l.x,y:l.y,z:l.z},"x").listen().name("Translation").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),t.add({x:l.x,y:l.y,z:l.z},"x").listen().name("Translation").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),t.add({x:l.x,y:l.y,z:l.z},"x").listen().name("Translation").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),t.add({x:c.x,y:c.y,z:c.z},"x").listen().name("Rotation").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),t.add({x:u.x,y:u.y,z:u.z},"x").listen().name("Scale").onChange(h=>{a.onTransformChanged(l,u,c,r),i.objectPropChanged=!0}),s instanceof st){let h=e.addFolder("MaterialX").close(),d={message:"Loading list..."};h.add(d,"message").name("Nodes").listen().disable(),a.populateMaterialXSelector(i,s,r,h,d)}return t}static async populateMaterialXSelector(e,t,n,i,s){try{let r=a.getMaterialXNodeOptions(e);if(r.length===0){s.message="No .mtlx found";return}r.unshift({label:"-- None --",url:""}),s.message=`${r.length} materials`;let o=r.map(h=>h.label),l=a.materialXSelectionByInstance.get(n.name),c=l&&o.includes(l)?l:o[0],u={materialX:c};i.add(u,"materialX",o).name("Select").onChange(async h=>{a.materialXSelectionByInstance.set(n.name,h),s.message=`Applying ${h}...`,await a.applyMaterialXToInstance(e,t,n,h),s.message=`Applied: ${h}`}),a.materialXSelectionByInstance.has(n.name)||(a.materialXSelectionByInstance.set(n.name,c),s.message=`Applying ${c}...`,await a.applyMaterialXToInstance(e,t,n,c),s.message=`Applied: ${c}`)}catch(r){s.message=`Error: ${r instanceof Error?r.message:String(r)}`,console.error("[Controls] MaterialX selector failed",r)}}static async applyMaterialXToInstance(e,t,n,i){let r=a.getMaterialXNodeOptions(e).find(c=>c.label===i);if(!r)return;let o=await od(t,r.url,`MaterialX:${r.label}`),l=t.materials[n.materialID];o.runtimeMaterial.copyTo(l),ld(t,n.materialID,l,o.proceduralBindings,o.proceduralClosureBinding,o.proceduralDisplacementBinding)&&(e.reloadShaders=!0),t.instancesModified=!0,t.dirty=!0,e.objectPropChanged=!0}static getMaterialXNodeOptions(e){let t=[...new Set(e.materialXFiles)].sort((s,r)=>s.localeCompare(r)),n=new Map;return t.map(s=>{let r=a.shortMaterialXName(s),o=n.get(r)??0;return n.set(r,o+1),{label:o===0?r:`${r} (${o+1})`,url:s}})}static shortMaterialXName(e){let t=e.split("/").pop()??e;return t.toLowerCase().endsWith(".mtlx")?t.slice(0,-5):t}static onTransformChanged(e,t,n,i){i.transform=J.fromDecomposed(e,t,n)}static getAdaptiveGuiWidth(){let e=window.innerWidth;return e<=480?Math.max(250,e-24):e<=900?Math.max(280,Math.floor(e*.8)):e<=1400?360:400}static attachBenchmarkToGui(e){let t=e.querySelector(".bench-host");t||(t=document.createElement("div"),t.className="bench-host",t.style.margin="8px",t.style.padding="6px",t.style.borderRadius="8px",t.style.background="rgba(14, 22, 34, 0.72)",t.style.border="1px solid rgba(90, 130, 170, 0.35)",t.style.display="flex",t.style.alignItems="flex-start",t.style.justifyContent="flex-start",e.appendChild(t));let n=document.getElementById("gl-bench-embedded-style");n||(n=document.createElement("style"),n.id="gl-bench-embedded-style",n.textContent=`
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
            `,document.head.appendChild(i));let s=e.domElement.querySelector(".children");if(!s)return()=>{};let r=document.createElement("li");r.className="controller controls-action-row";let o=document.createElement("div");o.className="controls-action-buttons";let l=document.createElement("button");l.type="button",l.title="Rewind",l.setAttribute("aria-label","Rewind"),l.innerHTML='<span class="label">Rewind</span><span class="icon">&lt;&lt;</span>',l.addEventListener("click",m=>{m.preventDefault(),t.rewind(),d(t.isPaused())});let c=document.createElement("button");c.type="button";let u=document.createElement("span");u.className="label";let h=document.createElement("span");h.className="icon",c.appendChild(u),c.appendChild(h);let d=m=>{let x=m?"Continue":"Pause";c.title=x,c.setAttribute("aria-label",x),u.textContent=x,h.textContent=m?">":"||"};d(t.isPaused());let p=window.setTimeout(()=>{d(t.isPaused())},0),f=window.setInterval(()=>{if(!document.body.contains(c)){window.clearInterval(f);return}d(t.isPaused())},200);c.addEventListener("click",m=>{m.preventDefault();let x=t.pauseOrContinue();d(x)});let g=document.createElement("button");return g.type="button",g.title="Fullscreen",g.setAttribute("aria-label","Fullscreen"),g.innerHTML='<span class="label">Fullscreen</span><span class="icon">[]</span>',g.addEventListener("click",m=>{m.preventDefault(),t.fullscreen()}),o.appendChild(l),o.appendChild(c),o.appendChild(g),r.appendChild(o),s.appendChild(r),()=>{window.clearTimeout(p),window.clearInterval(f)}}static enableGuiDragging(e){let t=e.domElement,n=t.querySelector(".title")??t;n.style.cursor="move";let i=!1,s=0,r=0,o=u=>{if(!i)return;let h=u.clientX-s,d=u.clientY-r,p=a.clampGuiPosition(t,h,d);a.guiManualPosition=p,a.applyGuiPosition(t,p.x,p.y)},l=()=>{i=!1,window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",l)},c=u=>{if(u.button!==0)return;let h=t.getBoundingClientRect();i=!0,s=u.clientX-h.left,r=u.clientY-h.top,a.applyGuiPosition(t,h.left,h.top),window.addEventListener("mousemove",o),window.addEventListener("mouseup",l),u.preventDefault()};return n.addEventListener("mousedown",c),()=>{n.removeEventListener("mousedown",c),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",l)}}static applyGuiPosition(e,t,n){e.style.right="auto",e.style.left=`${t}px`,e.style.top=`${n}px`}static clampGuiPosition(e,t,n){let s=Math.max(4,window.innerWidth-e.offsetWidth-4),r=Math.max(4,window.innerHeight-e.offsetHeight-4);return{x:Math.min(Math.max(4,t),s),y:Math.min(Math.max(4,n),r)}}};var Po=class extends Xi{playing=!1;timeupdate=!1;copyVideo=!1;loadTexture(e){let t=document.createElement("video");this.image=t,P.document.getElementById("textures")?.appendChild(t),t.controls=!0,t.playsInline=!0,t.muted=!0,t.loop=!0,t.addEventListener("playing",()=>{this.playing=!0,this.checkReady()},!0),t.addEventListener("timeupdate",()=>{this.timeupdate=!0,this.checkReady()},!0),t.src=e,t.play()}checkReady(){this.playing&&this.timeupdate&&(this.copyVideo=!0)}};var No=class extends Nt{internalFormat;format;gltype;audio;playing=!1;timeupdate=!1;copyAudio=!1;audioContext;analyser;freqData;waveData;constructor(){super(),this.audioContext=new AudioContext,this.audioContext.resume(),this.analyser=this.audioContext.createAnalyser(),this.freqData=new Uint8Array(this.analyser.frequencyBinCount),this.waveData=new Uint8Array(this.analyser.frequencyBinCount),this.internalFormat=P.gl.raw.R8,this.format=P.gl.raw.RED,this.gltype=P.gl.raw.UNSIGNED_BYTE}loadTexture(e){let t=document.createElement("audio");this.audio=t,t.loop=!0,t.autoplay=!0,t.crossOrigin="anonymous",t.controls=!0,t.addEventListener("playing",()=>{this.playing=!0,this.checkReady()},!0),t.addEventListener("timeupdate",()=>{this.timeupdate=!0,this.checkReady()},!0),t.addEventListener("canplay",()=>{this.audioContext.createMediaElementSource(t).connect(this.analyser),this.analyser.connect(this.audioContext.destination)},!0),t.src=e,t.load()}checkReady(){this.playing&&this.timeupdate&&(this.copyAudio=!0)}update(){this.analyser.getByteFrequencyData(this.freqData),this.analyser.getByteTimeDomainData(this.waveData)}};async function Do(a,e,t,n=null){let i=await se(a);if(!i.ok)return console.error(`Couldn't open ${a} for reading`),!1;let s=await i.text();if(n&&(s=await n(a,s),s===null))return console.error(`Callback failed for ${a}`),!1;let r=null;try{r=new ei(JSON.parse(s))}catch(l){return console.error(`Error parsing Shadertoy shader from ${a}:`,l),!1}let o=a.split("/").slice(0,-1).join("/");return Tu(o,r,e,t,n)}async function Tu(a,e,t,n,i=null){if(e.common&&(!e.commonCode||e.commonCode==="")){let o=await be.loadAsync(`${a}/common.glsl`);if(!o.src)return console.error("Couldn't open common.glsl for reading"),!1;i&&(o.src=await i(`${a}/common.glsl`,o.src)),e.commonCode=o.src}if(e.isGlslPathtracer){let o=/^#define OPT_SHADERTOY_LIGHT(.*)$/m;e.commonCode=e.commonCode.replace(o,"// #define OPT_SHADERTOY_LIGHT$1")}let s={},r={};for(let o of[e.bufferA,e.bufferB,e.bufferC,e.bufferD,e.cubeA,e.sound,e.image])if(o){if(o===e.bufferA?o.type="bufferA":o===e.bufferB?o.type="bufferB":o===e.bufferC?o.type="bufferC":o===e.bufferD?o.type="bufferD":o===e.cubeA?(o.type="cubeA",o.xres=1024,o.yres=1024):o===e.sound?(o.type="sound",o.xres=We.instance().textureDimensions,o.yres=We.instance().textureDimensions):o===e.image&&(o.type="image"),!o.code||o.code===""){let l=await be.loadAsync(`${a}/${o.type}.glsl`);if(!l.src)return console.error(`Couldn't open ${o.type}.glsl for reading`),!1;if(i&&(l.src=await i(`${a}/${o.type}.glsl`,l.src),l.src===null))return console.error(`Callback failed for ${o.type}.glsl`),!1;o.code=l.src}for(let l of o.inputs){if(P.gl==null)break;if(l.type==="keyboard"){let c=Dt.instance();l.arrayBuffer=c.buffer,l.xres=c.xRes,l.yres=c.yRes,l.internalFormat=c.internalFormat,l.format=c.format,l.gltype=c.gltype,c.input=l}else if(l.filepath){if(l.type==="floats"){let c;if(r[l.filepath])c=r[l.filepath];else{let u=l.filepath;u.startsWith("http")||(u=`scenes/shadertoy/${u}`);let h=await se(u);if(!h.ok)return console.error(`Couldn't open ${l.filepath} for reading`),!1;let d=await h.arrayBuffer(),p=new Yi(d),f=p.ReadUInt32(),g=p.ReadUInt32(),m=p.ReadUInt32(),x=p.ReadUInt32(),y=p.ReadUInt8(),b=p.ReadUInt8(),S=p.ReadUInt16(),v,M,T;if(y===1&&S===10)[v,M,T]=[P.gl.raw.R32F,P.gl.raw.RGB,P.gl.raw.FLOAT];else if(y===3&&S===10)[v,M,T]=[P.gl.raw.RGB32F,P.gl.raw.RED,P.gl.raw.FLOAT];else if(y===4&&S===10)[v,M,T]=[P.gl.raw.RGBA32F,P.gl.raw.RGBA,P.gl.raw.FLOAT];else return console.error(`Unsupported texture format: ${y} channels, ${S} format`),!1;let w=new Float32Array(d,20);r[l.filepath]={buffer:w,xRes:g,yRes:m,internalFormat:v,format:M,gltype:T},c=r[l.filepath]}l.arrayBuffer=c.buffer,l.xres=c.xRes,l.yres=c.yRes,l.internalFormat=c.internalFormat,l.format=c.format,l.gltype=c.gltype}else if(l.type==="volume"){let c;if(r[l.filepath])c=r[l.filepath];else{let u=l.filepath;u.startsWith("http")||(u=`scenes/shadertoy/${u}`);let h=await se(u);if(!h.ok)return console.error(`Couldn't open ${l.filepath} for reading`),!1;let d=await h.arrayBuffer(),p=new Yi(d),f=p.ReadUInt32(),g=p.ReadUInt32(),m=p.ReadUInt32(),x=p.ReadUInt32(),y=p.ReadUInt8(),b=p.ReadUInt8(),S=p.ReadUInt16(),v,M,T;if(y===1&&S===0)[v,M,T]=[P.gl.raw.R8,P.gl.raw.RED,P.gl.raw.UNSIGNED_BYTE];else if(y===4&&S===0)[v,M,T]=[P.gl.raw.RGBA8,P.gl.raw.RGBA,P.gl.raw.UNSIGNED_BYTE];else return console.error(`Unsupported texture format: ${y} channels, ${S} format`),!1;let w=new Uint8Array(d,20);r[l.filepath]={buffer:w,xRes:g,yRes:m,internalFormat:v,format:M,gltype:T},c=r[l.filepath]}l.arrayBuffer=c.buffer,l.xres=c.xRes,l.yres=c.yRes,l.internalFormat=c.internalFormat,l.format=c.format,l.gltype=c.gltype}else if(l.filepath.endsWith("jpg")||l.filepath.endsWith("png"))if(l.type==="cubemap"&&l.filepath.endsWith("cubemap00.png"))l.type="cubeA",l.internalFormat=P.gl.raw.RGBA8,l.format=P.gl.raw.RGBA,l.gltype=P.gl.raw.UNSIGNED_BYTE;else if(l.type==="cubemap"){let c=l.filepath.substring(l.filepath.lastIndexOf("/")+1,l.filepath.lastIndexOf(".")),u=l.filepath.substring(l.filepath.lastIndexOf(".")+1),h=l.filepath.substring(0,l.filepath.lastIndexOf("/"));l.imageTextures=[];for(let d=0;d<6;d++){let p;if(d==0?p=l.filepath:p=h+`/${c}_${d}.${u}`,s[p])l.imageTextures.push(s[p]);else{let f=new yt;if(p.startsWith("http")||(p=`scenes/shadertoy/${p}`),!await f.loadTextureAsync(p))return console.error(`Couldn't load texture ${p}`),!1;s[p]=f,l.imageTextures.push(f)}}}else{let c;if(s[l.filepath])c=s[l.filepath];else{let u=new yt,h=l.filepath;if(h.startsWith("http")||(h=`scenes/shadertoy/${h}`),!await u.loadTextureAsync(h))return console.error(`Couldn't load texture ${l.filepath}`),!1;c=u,s[l.filepath]=u}l.imageTexture=c,l.xres=c.width,l.yres=c.height,l.internalFormat=P.gl.raw.RGBA8,l.format=P.gl.raw.RGBA,l.gltype=P.gl.raw.UNSIGNED_BYTE}else if(l.filepath.endsWith("mp4")||l.filepath.endsWith("webm")){let c;if(s[l.filepath])c=s[l.filepath];else{let u=new Po,h=l.filepath;h.startsWith("http")||(h=`scenes/shadertoy/${h}`),u.loadTexture(h),c=u,s[l.filepath]=u}l.imageTexture=c,l.internalFormat=P.gl.raw.RGBA8,l.format=P.gl.raw.RGBA,l.gltype=P.gl.raw.UNSIGNED_BYTE}else if(l.filepath.endsWith("mp3")||l.filepath.endsWith("ogg")){let c;if(s[l.filepath])c=s[l.filepath];else{let u=new No,h=l.filepath;h.startsWith("http")||(h=`scenes/shadertoy/${h}`),u.loadTexture(h),c=u,s[l.filepath]=u}l.audioTexture=c,l.xres=c.analyser.frequencyBinCount,l.yres=2,l.internalFormat=c.internalFormat,l.format=c.format,l.gltype=c.gltype}}}e.buffers=e.buffers||[],e.buffers.push(o)}return t&&(t.shadertoyShader=e),!0}async function cd(a,e,t,n=null){let i=await se(a);if(!i.ok)return console.error(`Couldn't open ${a} for reading`),!1;let s=await i.text();n&&(s=await n(a,s));let r=null;try{r=JSON.parse(s)}catch(c){return console.error(`Error parsing Shadertoy shader from ${a}:`,c),!1}let o=new ei;o.fromShadertoyJson(r);let l=a.split("/").slice(0,-1).join("/");return Tu(l,o,e,t,n)}var Wi=class{static async readBlob(e){try{let t=await fetch(this.buildUrl(e),{method:"GET"});return t.ok?await t.blob():(console.error("Failed to read blob from:",e,t.statusText),null)}catch(t){return console.error("Failed to read blob from:",e,t),null}}static async writeBlob(e,t,n=null){console.log(`Uploading ${e} to Azure Blob Storage`);let i="scenes",s=process.env.AZURE_STORAGE_ACCOUNT_SAS_TOKEN,r=this.buildUrl(`${e}?${s}`),o=typeof t=="string"?new Blob([t]).size.toString():t.byteLength.toString(),l=await fetch(r,{method:"PUT",headers:{"x-ms-version":"2019-12-12","x-ms-date":new Date().toUTCString(),"x-ms-blob-type":"BlockBlob","Content-Type":n??(typeof t=="string"?"application/json":"application/octet-stream"),"Content-Length":o},body:typeof t=="string"?t:new Uint8Array(t)});return l.ok?!0:(console.error("Failed to create blob:",e,l.statusText),!1)}static buildUrl(e,t="scenes"){return`https://rvawebgl.blob.core.windows.net/$web/${t}/${e}`}};function G(a){return a.substring(a.indexOf(" ")+1).trim()}function t0(a){let e=a.toGLSL("envMapTex"),t=e.match(/vec3\s+(EvalEnvGraph_[A-Za-z0-9_]+)/);if(!t)return"";let n=t[1];return[e,"vec4 EvalEnvMap(Ray r) {",`    vec3 color = ${n}(r, envMapTex);`,"    float theta = acos(clamp(r.direction.y, -1.0, 1.0));","    float safeSum = max(envMapTotalSum, 1e-6);","    float pdf = Luminance(color) / safeSum;","    return vec4(color, (pdf * envMapRes.x * envMapRes.y) / (TWO_PI * PI * max(sin(theta), 1e-6)));","}"].join(`

`)}async function Fo(a,e,t){let n=await se(a);if(!n.ok)return console.error(`Couldn't open ${a} for reading`),!1;let i=await n.text(),s=a.substring(0,a.lastIndexOf("/")+1),r=i.split(`
`);console.log("Loading Scene..");let o=new Map,l=[];e.materialXProceduralEntries=[],e.materialxEnvStrategy="cpu",e.materialxLightStrategy="cpu",e.proceduralEnvGlsl="";let c=new nt;e.addMaterial(c);let u=0;for(;u<r.length;){let d=r[u].trim();if(d.split(" ")[0]=="#"||d===""){u++;continue}if(d.split(" ")[0]=="materialx_env_strategy"){let p=G(d).toLowerCase();e.materialxEnvStrategy=p==="glsl"?"glsl":"cpu",u++;continue}if(d.split(" ")[0]=="materialx_light_strategy"){let p=G(d).toLowerCase();e.materialxLightStrategy=p==="glsl"?"glsl":"cpu",u++;continue}if(d.split(" ")[0]=="material"){let p=new nt,f=G(d);p.name=f;let g="none",m="none",x="none",y="none",b="none",S="none",v="none",M=!1,T="",w="",C=[],E=null,R=null;for(u++;u<r.length;){let A=r[u].trim();if(A.includes("}"))break;if(A.split(" ")[0]=="color"){let[,F,z,k]=A.split(/\s+/);p.baseColor=new _(parseFloat(F),parseFloat(z),parseFloat(k))}if(A.split(" ")[0]=="opacity"&&(p.opacity=parseFloat(G(A))),A.split(" ")[0]=="alphamode"&&(S=G(A)),A.split(" ")[0]=="alphacutoff"&&(p.alphaCutoff=parseFloat(G(A))),A.split(" ")[0]=="emission"){let[,F,z,k]=A.split(/\s+/);p.emission=new _(parseFloat(F),parseFloat(z),parseFloat(k))}if(A.split(" ")[0]=="metallic"&&(p.metallic=parseFloat(G(A))),A.split(" ")[0]=="roughness"&&(p.roughness=parseFloat(G(A))),A.split(" ")[0]=="subsurface"&&(p.subsurface=parseFloat(G(A))),A.split(" ")[0]=="thickness"&&(p.mediumThickness=parseFloat(G(A))),A.split(" ")[0]=="speculartint"&&(p.specularTint=parseFloat(G(A))),A.split(" ")[0]=="anisotropic"&&(p.anisotropic=parseFloat(G(A))),A.split(" ")[0]=="sheen"&&(p.sheen=parseFloat(G(A))),A.split(" ")[0]=="sheentint"&&(p.sheenTint=parseFloat(G(A))),A.split(" ")[0]=="clearcoat"&&(p.clearcoat=parseFloat(G(A))),A.split(" ")[0]=="clearcoatgloss"&&(p.clearcoatGloss=parseFloat(G(A))),A.split(" ")[0]=="spectrans"&&(p.specTrans=parseFloat(G(A))),A.split(" ")[0]=="ior"&&(p.ior=parseFloat(G(A))),A.split(" ")[0]=="transmissioncolor"){let[,F,z,k]=A.split(/\s+/);p.transmissionColor=new _(parseFloat(F),parseFloat(z),parseFloat(k)),M=!0}if(A.split(" ")[0]=="thinwalled"&&(p.thinWalled=parseFloat(G(A))),A.split(" ")[0]=="albedotexture"&&(g=G(A)),A.split(" ")[0]=="metallicroughnesstexture"&&(m=G(A)),A.split(" ")[0]=="normaltexture"&&(x=G(A)),A.split(" ")[0]=="emissiontexture"&&(y=G(A)),A.split(" ")[0]=="mediumtype"&&(v=G(A)),A.split(" ")[0]=="mediumdensity"&&(p.mediumScattering=parseFloat(G(A))),A.split(" ")[0]=="mediumabsorption"&&(p.mediumAbsorption=parseFloat(G(A))),A.split(" ")[0]=="mediumcolor"){let[,F,z,k]=A.split(/\s+/);p.mediumColor=new _(parseFloat(F),parseFloat(z),parseFloat(k))}A.split(" ")[0]=="mediumanisotropy"&&(p.mediumAnisotropy=parseFloat(G(A))),A.split(" ")[0]=="doublesided"&&(p.doubleSided=parseFloat(G(A))),A.split(" ")[0]=="materialx_document"&&(T=G(A)),A.split(" ")[0]=="materialx_surface"&&(w=G(A)),u++}if(T){let N=pe.normalizePath(s+T);try{let A=await pe.fetchAndExpand(N),F=A.doc,z=pe.resolveSurfaceMaterialBindings(F,w||void 0),k=pe.parseFromDoc(F,w||void 0);Oi.resetMaterial(p),k.toMaterial(p);let ue=A.mtlxDir,ve=pe.resolveSurfaceTextures(F,ue,w||void 0);C=pe.collectSurfaceGraphBindings(F,w||void 0),E=pe.collectSurfaceGraphClosureBinding(F,w||void 0),R=pe.collectSurfaceDisplacementBinding(F,ue,w||void 0);for(let[X,ae]of ve){let we=await e.addTextureByUrlAsync(ae.filename);we>=0&&(p[X]=we,(ae.uvtiling[0]!==1||ae.uvtiling[1]!==1)&&p.uvScale.x===1&&p.uvScale.y===1&&(p.uvScale=new Y(ae.uvtiling[0],ae.uvtiling[1])))}if(R?.texture){let X=await e.addTextureByUrlAsync(R.texture.filename);X>=0&&(p.displacementTexID=X,(R.texture.uvtiling[0]!==1||R.texture.uvtiling[1]!==1)&&p.uvScale.x===1&&p.uvScale.y===1&&(p.uvScale=new Y(R.texture.uvtiling[0],R.texture.uvtiling[1])))}}catch(A){console.warn(`MaterialX document not found or invalid: ${N}`,A)}}if(g&&g!=="none"&&(p.baseColorTexID=await e.addTextureAsync(g)),m&&m!=="none"&&(p.metallicRoughnessTexID=await e.addTextureAsync(m)),x&&x!=="none"&&(p.normalmapTexID=await e.addTextureAsync(x)),y&&y!=="none"&&(p.emissionmapTexID=await e.addTextureAsync(y)),S==="opaque"?p.alphaMode=0:S==="blend"?p.alphaMode=1:S==="mask"&&(p.alphaMode=2),v==="absorb"?p.mediumType=1:v==="scatter"?p.mediumType=2:v==="emissive"&&(p.mediumType=3),p.specTrans>0&&!M&&(p.transmissionColor=p.baseColor.clone()),!o.has(f)){let N=e.addMaterial(p);if(o.set(f,N),T){let A=_o(N,p,C,E,R);A&&go(e.materialXProceduralEntries,A)}}u++;continue}if(d.split(" ")[0]=="materialx_lights"){let p=G(d),f=pe.normalizePath(s+p);try{let m=(await pe.fetchAndExpand(f)).doc;e.materialxLightStrategy==="glsl"&&console.warn("materialx_light_strategy=glsl requested, but runtime lightshader GLSL is not integrated yet; falling back to CPU parseLights.");let x=pe.parseLights(m);for(let y of x)e.addLight(y);console.log(`MaterialX lights loaded: ${x.length} light(s) from ${f}`)}catch(g){console.warn(`MaterialX lights document not found or invalid: ${f}`,g)}u++;continue}if(d.split(" ")[0]=="materialx_envmap"){let p=G(d),f=pe.normalizePath(s+p);try{let g=await pe.parseEnvGraphFromUrl(f);if(g.config.hdrPath&&await e.addEnvMapByUrlAsync(g.config.hdrPath),t.envMapIntensity=g.config.intensity,t.envMapRot=g.config.rotation*360,t.enableEnvMap=!0,e.materialxEnvStrategy==="glsl"){let m=t0(g);m.length>0?e.proceduralEnvGlsl=m:(e.proceduralEnvGlsl="",console.warn("materialx_env_strategy=glsl requested, but no runtime GLSL override could be generated; falling back to default EvalEnvMap path."))}else e.proceduralEnvGlsl="";console.log(`MaterialX env map loaded from ${f}`)}catch(g){console.warn(`Failed to load MaterialX env map: ${g}`)}u++;continue}if(d.split(" ")[0]=="light"){let p=new xt,f=new _,g=new _,m="none";for(u++;u<r.length&&!r[u].includes("}");){let x=r[u].trim();if(x.split(" ")[0]=="position"){let[,y,b,S]=x.split(/\s+/);p.position=new _(parseFloat(y),parseFloat(b),parseFloat(S))}if(x.split(" ")[0]=="emission"){let[,y,b,S]=x.split(/\s+/);p.emission=new _(parseFloat(y),parseFloat(b),parseFloat(S))}if(x.split(" ")[0]=="radius"&&(p.radius=parseFloat(G(x))),x.split(" ")[0]=="v1"){let[,y,b,S]=x.split(/\s+/);f=new _(parseFloat(y),parseFloat(b),parseFloat(S))}if(x.split(" ")[0]=="v2"){let[,y,b,S]=x.split(/\s+/);g=new _(parseFloat(y),parseFloat(b),parseFloat(S))}x.split(" ")[0]=="type"&&(m=G(x)),u++}m==="quad"?(p.type=0,p.u=f.subtract(p.position),p.v=g.subtract(p.position),p.area=_.Length(_.cross(p.u,p.v))):m==="sphere"?(p.type=1,p.area=4*Math.PI*p.radius*p.radius):m==="distant"&&(p.type=2,p.area=0),e.addLight(p),u++;continue}if(d.split(" ")[0]=="camera"){let p=new J,f=new _,g=new _,m=45,x=0,y=1,b=!1;for(u++;u<r.length&&!r[u].includes("}");){let S=r[u].trim();if(S.split(" ")[0]=="position"){let[,v,M,T]=S.split(/\s+/);f=new _(parseFloat(v),parseFloat(M),parseFloat(T))}if(S.split(" ")[0]=="lookat"){let[,v,M,T]=S.split(/\s+/);g=new _(parseFloat(v),parseFloat(M),parseFloat(T))}if(S.split(" ")[0]=="aperture"&&(x=parseFloat(G(S))),S.split(" ")[0]=="focaldist"&&(y=parseFloat(G(S))),S.split(" ")[0]=="fov"&&(m=parseFloat(G(S))),S.split(" ")[0]=="matrix"){let v=S.split(/\s+/).slice(1).map(Number);v.length===16&&v.every(M=>!isNaN(M))&&(p=new J(v[0],v[4],v[8],v[12],v[1],v[5],v[9],v[13],v[2],v[6],v[10],v[14],v[3],v[7],v[11],v[15]),b=!0)}u++}if(b){let S=new _(p.data[2][0],p.data[2][1],p.data[2][2]);f=new _(p.data[3][0],p.data[3][1],p.data[3][2]),g=f.add(S)}e.addCamera(f,g,m),e.camera.aperture=x,e.camera.focalDist=y,u++;continue}if(d.split(" ")[0]=="renderer"){let E=function(R){if(R==="true")return!0;if(R==="false")return!1};var h=E;let p="none",f="none",g="none",m="none",x="none",y="none",b="none",S="none",v="none",M="none",T="none",w="none",C="none";for(u++;u<r.length&&!r[u].includes("}");){let R=r[u].trim();if(R.split(" ")[0]=="envmapfile"&&(p=G(R)),R.split(" ")[0]=="resolution"){let[,N,A]=R.split(/\s+/);t.renderResolution=new Y(parseInt(N),parseInt(A)),t.originalRenderResolution=t.renderResolution.clone()}if(R.split(" ")[0]=="envmapintensity"&&(t.envMapIntensity=parseFloat(G(R))),R.split(" ")[0]=="maxdepth"&&(t.maxDepth=parseFloat(G(R))),R.split(" ")[0]=="maxspp"&&(t.maxSpp=parseFloat(G(R))),R.split(" ")[0]=="tilewidth"&&(t.tileWidth=parseFloat(G(R))),R.split(" ")[0]=="tileheight"&&(t.tileHeight=parseFloat(G(R))),R.split(" ")[0]=="enablerr"&&(f=G(R)),R.split(" ")[0]=="rrdepth"&&(t.RRDepth=parseFloat(G(R))),R.split(" ")[0]=="enabletonemap"&&(v=G(R)),R.split(" ")[0]=="enableaces"&&(g=G(R)),R.split(" ")[0]=="texarraywidth"&&(t.texArrayWidth=parseFloat(G(R))),R.split(" ")[0]=="texarrayheight"&&(t.texArrayHeight=parseFloat(G(R))),R.split(" ")[0]=="openglnormalmap"&&(m=G(R)),R.split(" ")[0]=="hideemitters"&&(x=G(R)),R.split(" ")[0]=="enablebackground"&&(b=G(R)),R.split(" ")[0]=="transparentbackground"&&(y=G(R)),R.split(" ")[0]=="backgroundcolor"){let[,N,A,F]=R.split(/\s+/);t.backgroundCol=new _(parseFloat(N),parseFloat(A),parseFloat(F))}if(R.split(" ")[0]=="independentrendersize"&&(S=G(R)),R.split(" ")[0]=="envmaprotation"&&(t.envMapRot=parseFloat(G(R))),R.split(" ")[0]=="enableroughnessmollification"&&(M=G(R)),R.split(" ")[0]=="roughnessmollificationamt"&&(t.roughnessMollificationAmt=parseFloat(G(R))),R.split(" ")[0]=="enablevolumemis"&&(T=G(R)),R.split(" ")[0]=="enableuniformlight"&&(w=G(R)),R.split(" ")[0]=="sssmode"&&(C=G(R)),R.split(" ")[0]=="uniformlightcolor"){let[,N,A,F]=R.split(/\s+/);t.uniformLightCol=new _(parseFloat(N),parseFloat(A),parseFloat(F))}u++}p!=="none"?(Pn.instance.envMapIdx=Pn.instance.envMaps.findIndex(R=>p.endsWith(R)),await e.addEnvMapAsync(p),t.enableEnvMap=!0):t.enableEnvMap=!1,E(g)!==void 0&&(t.enableAces=E(g)),E(f)!==void 0&&(t.enableRR=E(f)),E(m)!==void 0&&(t.openglNormalMap=E(m)),E(x)!==void 0&&(t.hideEmitters=E(x)),E(b)!==void 0&&(t.enableBackground=E(b)),E(y)!==void 0&&(t.transparentBackground=E(y)),E(S)!==void 0&&(t.independentRenderSize=E(S)),E(v)!==void 0&&(t.enableTonemap=E(v)),E(M)!==void 0&&(t.enableRoughnessMollification=E(M)),E(T)!==void 0&&(t.enableVolumeMIS=E(T)),E(w)!==void 0&&(t.enableUniformLight=E(w)),C==="none"?t.sssMode=0:C==="randomwalk"?t.sssMode=1:C==="dipole"&&(t.sssMode=2),u++;continue}if(d.split(" ")[0]=="mesh"){let p=null,f=new V,g=new J,m=new J,x=new J,y=new J,b=0,S="none",v=!1;for(u++;u<r.length&&!r[u].includes("}");){let M=r[u].trim(),T=null;if(M.split(" ")[0]=="name"&&(S=M.substring(5).trim()),M.split(" ")[0]=="file"&&(p=G(M)),M.split(" ")[0]=="material"&&(T=G(M),o.has(T)?b=o.get(T):console.error(`Could not find material ${T}`)),M.split(" ")[0]=="matrix"){let w=M.split(/\s+/).slice(1).map(Number);w.length===16&&w.every(C=>!isNaN(C))&&(g=new J(w[0],w[4],w[8],w[12],w[1],w[5],w[9],w[13],w[2],w[6],w[10],w[14],w[3],w[7],w[11],w[15]),v=!0)}if(M.split(" ")[0]=="position"){let[,w,C,E]=M.split(/\s+/);m=J.Translate(new _(parseFloat(w),parseFloat(C),parseFloat(E)))}if(M.split(" ")[0]=="scale"){let[,w,C,E]=M.split(/\s+/);y=J.Scale(new _(parseFloat(w),parseFloat(C),parseFloat(E)))}if(M.split(" ")[0]=="rotation"){let[,w,C,E,R]=M.split(/\s+/);f=new V(parseFloat(w),parseFloat(C),parseFloat(E),parseFloat(R)),x=J.QuatToMatrix(f.x,f.y,f.z,f.w)}u++}if(p){let M=await e.addMeshAsync(p);if(M!==-1){let T;if(S&&S!=="none")T=S;else{let E=Math.max(p.lastIndexOf("/"),p.lastIndexOf("\\"));T=p.substring(E+1)}let w;v?w=g:w=y.multiply(x).multiply(m);let C=new yn(T,M,w,b);e.addMeshInstance(C)}}u++;continue}if(d.split(" ")[0]=="gltf"){let p=null,f=new V,g=new J,m=new _,x=new J,y=new _(1,1,1),b=!1;for(u++;u<r.length&&!r[u].includes("}");){let S=r[u].trim();if(S.split(" ")[0]=="file"&&(p=G(S)),S.split(" ")[0]=="matrix"){let v=S.split(/\s+/).slice(1).map(Number);v.length===16&&v.every(M=>!isNaN(M))&&(g=new J(v[0],v[4],v[8],v[12],v[1],v[5],v[9],v[13],v[2],v[6],v[10],v[14],v[3],v[7],v[11],v[15]),b=!0)}if(S.split(" ")[0]=="position"){let[,v,M,T]=S.split(/\s+/);m=new _(parseFloat(v),parseFloat(M),parseFloat(T))}if(S.split(" ")[0]=="scale"){let[,v,M,T]=S.split(/\s+/);y=new _(parseFloat(v),parseFloat(M),parseFloat(T))}if(S.split(" ")[0]=="rotation"){let[,v,M,T,w]=S.split(/\s+/);f=new V(parseFloat(v),parseFloat(M),parseFloat(T),parseFloat(w)),x=J.QuatToMatrix(f.x,f.y,f.z,f.w)}u++}if(p){let S=p.substring(p.lastIndexOf(".")+1).toLowerCase(),v;b?v=g:v=J.Scale(y).multiply(x).multiply(J.Translate(m));let M=!1;if(S==="gltf"?M=await Qt(s+p,e,t,v,!1):S==="glb"&&(M=await Qt(s+p,e,t,v,!0)),!M)throw console.error(`Unable to load gltf ${p}`),new Error(`Unable to load gltf ${p}`)}}u++}return e.proceduralMaterialGlsl=xo(e.materialXProceduralEntries),!0}function Uo(a,e,t,n){let i=a.indexOf(e),s=a.indexOf(t);if(i!==-1&&s!==-1&&s>i){let r=a.substring(0,i+e.length),o=a.substring(s);return r+`
`+n+`
`+o}return a}async function ud(a,e,t,n=null){let i="",s=await se(a);s.ok&&(i=await s.text());let r=a.split("/").reverse()[0].split(".")[0],o=".scene";if(!await ra(`scenes/pathtracer/${r}${o}`)&&(o=".gltf",!await ra(`scenes/pathtracer/${r}${o}`)&&(o=".glb",!await ra(`scenes/pathtracer/${r}${o}`))))return console.error(`Failed to load scene ${r} from Shadertoy shader`),!1;let l=new st(r);l.renderOptions=t;let c=!1;if(o===".scene"?c=await Fo(`/scenes/pathtracer/${r}${o}`,l,t):o===".gltf"?c=await Qt(`/scenes/pathtracer/${r}${o}`,l,t,new J,!1):o===".glb"&&(c=await Qt(`/scenes/pathtracer/${r}${o}`,l,t,new J,!0)),!c)return console.error("Failed to load scene from Shadertoy shader"),!1;t=l.renderOptions,l.lights.length===0&&(t.enableEnvMap=!0),l.renderOptions=t,await l.processSceneAsync();let u=l.computeSceneData(t.useRayMarching),h=u.data.length>1e3;return await Do(t.useRayMarching?"/shaders/shadertoy/pathtracing-fast/shader.json":"/shaders/shadertoy/pathtracing/shader.json",e,t,async(d,p)=>{if(d.indexOf("common.glsl")!==-1){let f=p,g=u.commonCode;t.useRayMarching&&(g=`
#define OPT_RAYMARCHING
${g}
`),g=g.trim(),p=Uo(f,"// START_COMMON_CODE","// END_COMMON_CODE",g)}if(d.indexOf("bufferA.glsl")!==-1){let f=p;u.bufferACode=`
${u.bufferACode}

${h?"":l.generateMeshCode(u,t.useRayMarching)}
`,u.bufferACode=u.bufferACode.trim(),p=Uo(f,"// START_BUFFERA_CODE","// END_BUFFERA_CODE",u.bufferACode)}if(d.indexOf("bufferB.glsl")!==-1){let f=p;t.useRayMarching&&(u.bufferBCode=`
${i}

${u.bufferBCode}
`),u.bufferBCode=u.bufferBCode.trim(),p=Uo(f,"// START_BUFFERB_CODE","// END_BUFFERB_CODE",u.bufferBCode)}return d.indexOf("bufferD.glsl")!==-1&&(p=Uo(p,"// START_BUFFERD_CODE","// END_BUFFERD_CODE",u.bufferDCode)),n&&!await n(d,p,null,void 0,void 0)?(console.error(`Callback failed for ${d}`),null):p})?(e.renderOptions=t,await e.processSceneAsync(),await n("commonCode.glsl",u.commonCode,null,void 0,void 0),await n("bufferACode.glsl",u.bufferACode,null,void 0,void 0),await n("bufferBCode.glsl",u.bufferBCode,null,void 0,void 0),await n("bufferDCode.glsl",u.bufferDCode,null,void 0,void 0),t.useRayMarching||(await n("meshData.bin",null,u.buffer,void 0,void 0),u.textureBuffer&&await n("textures.bin",null,u.textureBuffer,u.textureWidth,u.textureHeight)),!0):(console.error("Failed to load Shadertoy shader"),!1)}var Bo=class a extends st{static MATERIAL_STRIDES=[72,60,32];sceneConfig=null;bvhDataArray=null;vertIndicesDataArray=null;verticesDataArray=null;normalsDataArray=null;_topLevelIndex=0;constructor(e){super(e)}dispose(){super.dispose(),this.bvhDataArray=null,this.vertIndicesDataArray=null,this.verticesDataArray=null,this.normalsDataArray=null,this.lightsDataArray=null}createTLAS(){}createBLAS(){}rebuildInstances(){this.instancesModified=!0,this.dirty=!0}async processSceneAsync(){}get topLevelIndex(){return this._topLevelIndex}set topLevelIndex(e){this._topLevelIndex=e}bvhData(e=null){return this.bvhDataArray}vertIndicesData(){return this.vertIndicesDataArray}verticesData(){return this.verticesDataArray}normalsData(){return this.normalsDataArray}set transformsDataArray(e){if(e){this.transforms=[];for(let t=0;t<e.length;t+=16){let n=new J;n.data[0][0]=e[t],n.data[0][1]=e[t+1],n.data[0][2]=e[t+2],n.data[0][3]=e[t+3],n.data[1][0]=e[t+4],n.data[1][1]=e[t+5],n.data[1][2]=e[t+6],n.data[1][3]=e[t+7],n.data[2][0]=e[t+8],n.data[2][1]=e[t+9],n.data[2][2]=e[t+10],n.data[2][3]=e[t+11],n.data[3][0]=e[t+12],n.data[3][1]=e[t+13],n.data[3][2]=e[t+14],n.data[3][3]=e[t+15],this.transforms.push(n)}}}set materialsDataArray(e){if(e){this.materials=[];let t=32,n=this.sceneConfig?this.sceneConfig.materials.length+1:0;if(n>0){let i=e.length/n;Number.isInteger(i)&&a.MATERIAL_STRIDES.includes(i)&&(t=i)}if(t===32){let i=a.MATERIAL_STRIDES.filter(s=>e.length%s===0);i.length>0&&(t=i[0])}for(let i=0;i<e.length;i+=t){let s=new nt;s.baseColor=new _(e[i],e[i+1],e[i+2]),s.anisotropic=e[i+3],s.emission=new _(e[i+4],e[i+5],e[i+6]),s.mediumThickness=e[i+7],s.metallic=e[i+8],s.roughness=e[i+9],s.subsurface=e[i+10],s.specularTint=e[i+11],s.sheen=e[i+12],s.sheenTint=e[i+13],s.clearcoat=e[i+14],s.clearcoatGloss=e[i+15],s.specTrans=e[i+16],s.ior=e[i+17],s.mediumType=e[i+18],s.mediumScattering=e[i+19],s.mediumColor=new _(e[i+20],e[i+21],e[i+22]),s.mediumAnisotropy=e[i+23],s.baseColorTexID=e[i+24],s.metallicRoughnessTexID=e[i+25],s.normalmapTexID=e[i+26],s.emissionmapTexID=e[i+27],s.opacity=e[i+28],s.alphaMode=e[i+29],s.alphaCutoff=e[i+30],s.doubleSided=e[i+31],t>=60&&(s.mediumAbsorption=e[i+32],s.baseWeight=e[i+33],s.baseDiffuseRoughness=e[i+34],s.coatDarkening=e[i+35],s.specularColor=new _(e[i+36],e[i+37],e[i+38]),s.coatIOR=e[i+39],s.coatColor=new _(e[i+40],e[i+41],e[i+42]),s.coatRoughnessAnisotropy=e[i+43],s.transmissionColor=new _(e[i+44],e[i+45],e[i+46]),s.thinWalled=e[i+47],s.subsurfaceRadiusScale=new _(e[i+48],e[i+49],e[i+50]),s.fuzzColor=new _(e[i+51],e[i+55],e[i+59]),s.fuzzRoughness=e[i+52],s.dispersionScale=e[i+53],s.abbeNumber=e[i+54],s.thinFilmWeight=e[i+56],s.thinFilmThickness=e[i+57],s.thinFilmIor=e[i+58],s.uvScale=new Y(e[i+60],e[i+61]),s.specularWeight=e[i+62],s.anisotropyRotation=e[i+63],s.coatAnisotropyRotation=e[i+64],s.coatAffectRoughness=e[i+65],s.transmissionExtraRoughness=e[i+66],s.materialType=e[i+67]),t>=72&&(s.displacementTexID=e[i+68]),this.materials.push(s)}}}set lightsDataArray(e){if(e){this.lights=[];for(let t=0;t<e.length;t+=15){let n=new xt;n.position=new _(e[t],e[t+1],e[t+2]),n.emission=new _(e[t+3],e[t+4],e[t+5]),n.u=new _(e[t+6],e[t+7],e[t+8]),n.v=new _(e[t+9],e[t+10],e[t+11]),n.radius=e[t+12],n.area=e[t+13],n.type=e[t+14],this.lights.push(n)}}}computeSceneData(e){return null}generateMeshCode(e,t){return null}};function Oo(a,e,t){return t===void 0?a.subarray(e*4):a.subarray(e*4,t*4)}function hd(a,e,t){let n=a.subarray(e*4,t*4),i=[];for(let s=0;s<n.length;s+=4)i.push(new _(n[s],n[s+1],n[s+2]));return new Float32Array(i.flatMap(s=>[s.x,s.y,s.z]))}function n0(a,e,t){let n=a.subarray(e*4,t*4),i=[];for(let s=0;s<n.length;s+=4)i.push(new _(n[s],n[s+1],n[s+2]));return new Int32Array(i.flatMap(s=>[s.x,s.y,s.z]))}function i0(a,e,t,n=!1){let i=P.document.createElement("canvas");i.width=e,i.height=t;let s=i.getContext("2d");return s?(n?(s.scale(1,-1),s.drawImage(a,0,-t,e,t)):s.drawImage(a,0,0,e,t),s.getImageData(0,0,e,t)):null}function s0(a,e,t,n=!1){let i=i0(a,e,t,n);return i?new Uint8Array(i.data.buffer):null}async function dd(a,e,t){console.info(`Loading scene ${a}...`);let s=await(await se(a)).json();e.sceneConfig=s;let r=new _(...s.camera.eye),o=new _(...s.camera.lookat),l=s.camera.fov;e.camera=new ri(r,o,l),t.enableTonemap=s.display.enableTonemap,t.enableAces=s.display.enableAces,t.simpleAcesFit=s.display.simpleAcesFit,t.backgroundCol=new _(...s.display.backgroundCol),t.uniformLightCol=new _(...s.uniforms.uniformLightCol),t.maxDepth=s.uniforms.maxDepth,t.roughnessMollificationAmt=s.uniforms.roughnessMollificationAmt,t.envMapIntensity=s.uniforms.envMapIntensity,t.enableEnvMap=s.defines.includes("OPT_ENVMAP"),t.enableRoughnessMollification=s.defines.includes("OPT_ROUGHNESS_MOLLIFICATION"),t.enableRR=s.defines.includes("OPT_RR");let c=s.defines.find(d=>d.startsWith("OPT_RR_DEPTH "));if(c){let d=parseInt(c.split(" ")[1]);isNaN(d)||(t.RRDepth=d)}t.enableUniformLight=s.defines.includes("OPT_UNIFORM_LIGHT"),t.openglNormalMap=s.defines.includes("OPT_OPENGL_NORMALMAP"),t.hideEmitters=s.defines.includes("OPT_HIDE_EMITTERS"),t.enableBackground=s.defines.includes("OPT_BACKGROUND"),t.openglNormalMap=s.defines.includes("OPT_OPENGL_NORMALMAP"),t.enableBackground=s.defines.includes("OPT_BACKGROUND"),t.transparentBackground=s.defines.includes("OPT_TRANSPARENT_BACKGROUND"),t.enableVolumeMIS=s.defines.includes("OPT_VOL_MIS"),s.resolution&&(t.renderResolution=new Y(...s.resolution),t.originalRenderResolution=t.renderResolution.clone(),t.tileWidth=s.tileWidth,t.tileHeight=s.tileHeight);let u=await Wi.readBlob(`shadertoy/examples/glsl-pathtracer/${s.scene}/meshData.bin`),h=new Float32Array(await u?.arrayBuffer(),20);if(e.materialsDataArray=Oo(h,s.indices.materialsTex,s.indices.transformsTex),e.transformsDataArray=Oo(h,s.indices.transformsTex,s.indices.lightsTex),e.lightsDataArray=hd(h,s.indices.lightsTex,s.indices.BVH),e.bvhDataArray=hd(h,s.indices.BVH,s.indices.vertexIndicesTex),e.vertIndicesDataArray=n0(h,s.indices.vertexIndicesTex,s.indices.verticesTex),e.verticesDataArray=Oo(h,s.indices.verticesTex,s.indices.normalsTex),e.normalsDataArray=Oo(h,s.indices.normalsTex,2*s.indices.normalsTex-s.indices.verticesTex),s.meshes.forEach(d=>{let p=new _n;p.name=d.name,e.meshes.push(p)}),s.meshes.forEach((d,p)=>{let f=s.materials.findIndex(m=>m===d.material)+1,g=new yn(d.name,p,new J,f);e.meshInstances.push(g)}),e.topLevelIndex=s.uniforms.topBVHIndex,s.materials.forEach((d,p,f)=>{e.materials[p+1].name=d}),s.withTexture){let d=await new Promise((p,f)=>{let g=new Image;g.crossOrigin="anonymous",g.onload=()=>{p(g)},g.onerror=()=>p(!1),g.src=Wi.buildUrl(`shadertoy/examples/glsl-pathtracer/${s.scene}/textures.png`)});d&&(e.textureMapsArray=s0(d,d.width,d.height))}return e.renderOptions=t,!0}var Pn=class a{static _instance=null;stopped;working;static get instance(){return a._instance||(a._instance=new a),a._instance}scenes=[];shadertoyScenes=[];shadertoyGlslPathtracerScenes=[];envMaps=[];materialXFiles=[];envMapIdx=0;mouseSensitivity=.01;scene=null;_renderer=null;renderOptions=new ti;lastTime;firstTime;bench=null;optionsChanged=!1;objectPropChanged=!1;reloadShaders=!1;constructor(){this.lastTime=performance.now()}emitSceneStage(e,t){typeof window>"u"||window.dispatchEvent(new CustomEvent("scene-stage",{detail:{stage:e,message:t}}))}get renderer(){return this._renderer}get currentScene(){return this.scene}static getExt(e){if(e.indexOf(".")===-1)return"";let t=e.split(".");return t[t.length-1].toLowerCase()}async getSceneFilesAsync(){try{let e=await se("/pathtracer.json");this.scenes=await e.json(),e=await se("/shadertoy.json"),this.shadertoyScenes=await e.json(),e=await se("/shadertoy-glsl-pathtracer.json"),this.shadertoyGlslPathtracerScenes=await e.json()}catch(e){console.error("Error fetching scene files:",e)}}async getEnvMapsAsync(){try{let e=await se("/envmaps.json");this.envMaps=await e.json()}catch(e){console.error("Error fetching envMaps files:",e)}}async getMaterialXFilesAsync(){try{let e=await se("/materialx.json");if(!e.ok){this.materialXFiles=[];return}let t=await e.json();this.materialXFiles=Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch(e){this.materialXFiles=[],console.error("Error fetching materialx files:",e)}}async loadSceneAsync(e,t=!1,n=!1,i=null){let s=e,r=a.getExt(e),o=!1,l=new J;if((r==="scene"||r==="gltf"||r==="glb")&&!s.startsWith("/scenes/pathtracer/")&&(s=`/scenes/pathtracer/${s}`),r===""&&!s.startsWith("/scenes/shadertoy/examples/")){let u=`/scenes/shadertoy/examples/${s}/shadertoy.json`;(await se(u)).ok||(u=`/scenes/shadertoy/examples/${s}/shader.json`),s=u}r==="shadertoyscene"&&!s.startsWith("/scenes/shadertoy/examples/glsl-pathtracer/")&&(s=`/scenes/shadertoy/examples/glsl-pathtracer/${s}`);let c=r==="shadertoyscene"||(r===""||r==="json")&&(s.endsWith("shadertoy.json")||s.endsWith("shader.json"));return this.scene=c?new Ui(e):s.endsWith("data.json")?new Bo(e):new st(e),this.renderOptions.flipTexturesY=t,this.renderOptions.useRayMarching=n,r==="scene"?o=await Fo(s,this.scene,this.renderOptions):r==="gltf"?o=await Qt(s,this.scene,this.renderOptions,l,!1):r==="glb"?o=await Qt(s,this.scene,this.renderOptions,l,!0):(r===""||r==="json")&&s.endsWith("shadertoy.json")?o=await cd(s,this.scene,this.renderOptions):(r===""||r==="json")&&s.endsWith("shader.json")?o=await Do(s,this.scene,this.renderOptions):r==="shadertoyscene"?o=await ud(s,this.scene,this.renderOptions,i):s.endsWith("data.json")&&(o=await dd(s,this.scene,this.renderOptions)),o?(r!==""&&this.scene.envMap===null&&this.envMaps.length>0&&this.scene.lights.length===0&&(await this.scene.addEnvMapAsync(`HDR/${this.envMaps[this.envMapIdx]}`),this.renderOptions.enableEnvMap=!0,this.renderOptions.envMapIntensity=1.5),this.scene.renderOptions=this.renderOptions,this.renderOptions.renderResolution.x=Math.floor(this.renderOptions.originalRenderResolution.x*this.renderOptions.screenZoom),this.renderOptions.renderResolution.y=Math.floor(this.renderOptions.originalRenderResolution.y*this.renderOptions.screenZoom),this.renderOptions.tileWidth=Math.floor(this.renderOptions.renderResolution.x*this.renderOptions.pixelRatio/this.renderOptions.screenZoom),this.renderOptions.tileHeight=Math.floor(this.renderOptions.renderResolution.y*this.renderOptions.pixelRatio/this.renderOptions.screenZoom),this.resizeCanvas(this.renderOptions.renderResolution.x,this.renderOptions.renderResolution.y),!0):(console.error("Unable to load scene"),!1)}async initRendererAsync(){return this.scene?(this._renderer&&this._renderer.dispose(),this._renderer=this.scene instanceof Ui?new ii(this.scene):new ni(this.scene),await this.renderer.initAsync(),!0):(console.error("Scene not loaded"),!1)}render(){let e=P.gl;this.renderer.render(),e.bindFramebuffer(e.raw.FRAMEBUFFER,null),e.viewport(0,0,this.renderOptions.renderResolution.x,this.renderOptions.renderResolution.y),this.renderer.present()}update(e,t){let n=!1;if(Q.isAnyMouseDown()){if(this.scene instanceof st){if(Q.isMouseDown(0)){let i=Q.getMouseDragDelta(0);this.scene.camera.offsetOrientation(i.x,i.y),Q.resetMouseDragDelta(0)}else if(Q.isMouseDown(1)){let i=Q.getMouseDragDelta(1);this.scene.camera.setRadius(this.mouseSensitivity*i.y),Q.resetMouseDragDelta(1)}else if(Q.isMouseDown(2)){let i=Q.getMouseDragDelta(2);this.scene.camera.strafe(this.mouseSensitivity*i.x,this.mouseSensitivity*i.y),Q.resetMouseDragDelta(2)}}this.scene&&(this.scene.dirty=!0)}this.renderer.update(e,t)}resizeCanvas(e,t){let n=P.canvas;n!=null&&(n.width=e,n.style.width=e+"px",n.height=t,n.style.height=t+"px")}async resizeAsync(e,t){for(this.pauseOrContinue(!0);this.working;)await new Promise(n=>setTimeout(n,100));this.resizeCanvas(e,t),this.renderOptions.renderResolution.x=e,this.renderOptions.renderResolution.y=t,this.scene.renderOptions=this.renderOptions,await this.renderer.resizeRendererAsync(),this.pauseOrContinue()}async mainLoopAsync(e){let t=P.gl;this.working=!0,this.optionsChanged&&(this.optionsChanged=!1,this.scene.dirty=!0,this.firstTime=e),this.objectPropChanged&&(this.objectPropChanged=!1,this.scene.rebuildInstances()),this.reloadShaders&&(this.reloadShaders=!1,this.scene.dirty=!0,this.firstTime=e,await this.renderer.reloadShadersAsync()),this.bench?.begin("mainLoop");let n=e;this.firstTime===void 0&&(this.firstTime=n);let i=(n-this.firstTime)/1e3,s=(n-this.lastTime)/1e3;this.lastTime=n,this.update(i,s),t.clearColor(0,0,0,0),t.clear(t.raw.COLOR_BUFFER_BIT|t.raw.DEPTH_BUFFER_BIT),t.disable(t.raw.DEPTH_TEST),this.render(),this.bench?.end("mainLoop"),this.bench?.nextFrame(e),this.working=!1,this.stopped||requestAnimationFrame(r=>{this.stopped||this.mainLoopAsync(r)})}async startSceneAsync(e){for(this.pauseOrContinue(!0);this.working;)await new Promise(n=>setTimeout(n,100));if(P.document.getElementById("textures")?.replaceChildren(),this.emitSceneStage("loading","Chargement de la scene"),!!await this.loadSceneAsync(e,this.renderOptions.flipTexturesY,this.renderOptions.useRayMarching)&&await this.initRendererAsync()){if(Kr.build(this),typeof window.loadAllShaders=="function")if(this.scene instanceof Ui&&this.scene.shadertoyShader){let n=this.scene.shadertoyShader.getAllShaders();window.loadAllShaders(n)}else window.loadAllShaders({image:""});this.pauseOrContinue()}}rewind(){this.pauseOrContinue(!0),this.scene.dirty=!0,this.firstTime=performance.now(),requestAnimationFrame(e=>{this.mainLoopAsync(e),requestAnimationFrame(t=>{this.mainLoopAsync(t)})})}pauseOrContinue(e=!1){return this.stopped=!this.stopped||e,this.renderer?.pauseOrContinue(this.stopped),Q.pauseOrContinue(this.stopped),this.stopped||requestAnimationFrame(async t=>{this.stopped||await this.mainLoopAsync(t)}),this.stopped}async runAsync(e){P.setInstance(e.document,e.canvas),Kr.showGui&&(this.bench=new To(P.gl.raw,{trackGPU:!0,paramLogger:(t,n,i,s,r,o,l)=>{}})),await this.getSceneFilesAsync(),await this.getEnvMapsAsync(),await this.getMaterialXFilesAsync(),e.scene||(e.scene=this.shadertoyScenes.length>0?this.shadertoyScenes[0]:this.scenes.length>0?this.scenes[0]:null),e.scene&&await this.startSceneAsync(e.scene)}};export{od as a,ld as b,Kr as c,Pn as d};
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

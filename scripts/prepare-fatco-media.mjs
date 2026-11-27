// Solo crea copias web; los originales se mantienen intactos y fuera de Git.
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
await mkdir('public/assets', {recursive:true});
await mkdir('docs', {recursive:true});
const entries=[];
const run=args=>execFileSync('ffmpeg',['-hide_banner','-loglevel','error',...args,'-y'],{stdio:'inherit'});
async function record(source,output,extra={}) {
 const bytes=await readFile(source), web=await readFile(output);
 entries.push({source,sourceBytes:bytes.length,sourceSha256:createHash('sha256').update(bytes).digest('hex'),output,outputBytes:web.length,...extra});
}
for(const [name,out] of [
 ['WhatsApp Image 2026-11-20 at 17.51.44.jpeg','asientos-taller'],
 ['WhatsApp Image 2026-11-20 at 17.52.52.jpeg','conjunto-terraza'],
 ['WhatsApp Image 2026-11-25 at 16.18.20.jpeg','mueble-quincho'],
 ['WhatsApp Image 2026-11-25 at 16.23.17 (1).jpeg','closet-cerrado'],
 ['WhatsApp Image 2026-11-25 at 16.23.17.jpeg','closet-interior'],
]) {
 const source='imagenes-fatco/'+name,output='public/assets/'+out+'.webp';
 run(['-i',source,'-vf','scale=min(1600\\,iw):-1','-c:v','libwebp','-quality',out==='conjunto-terraza'?'76':'84','-map_metadata','-1',output]);
 await record(source,output,{kind:'photo'});
}
const logo='imagenes-fatco/logo-fatco.jpeg';
run(['-i',logo,'-vf','crop=800:640:140:225,scale=400:320','-c:v','libwebp','-quality','94','public/assets/logo-fatco.webp']);
await record(logo,'public/assets/logo-fatco.webp',{kind:'logo',note:'Solo retiro de márgenes vacíos exteriores; símbolo, letras, lema y colores conservados.'});
run(['-i',logo,'-vf','crop=390:390:340:210,scale=64:64','-frames:v','1','public/assets/favicon.png']);
await record(logo,'public/assets/favicon.png',{kind:'favicon',note:'Símbolo oficial extraído del original para legibilidad a tamaño pequeño.'});
for(const [name,out,crf,posterAt] of [
 ['WhatsApp Video 2026-11-25 at 16.15.58.mp4','presentacion-fatco','28','21'],
 ['WhatsApp Video 2026-11-25 at 16.23.23.mp4','recorrido-closet','27','3'],
]) {
 const source='videos-fatco/'+name,output='public/assets/'+out+'.mp4';
 run(['-i',source,'-map','0:v:0','-map','0:a:0?','-c:v','libx264','-preset','fast','-crf',crf,'-pix_fmt','yuv420p','-c:a','aac','-b:a',out==='presentacion-fatco'?'64k':'96k','-movflags','+faststart','-map_metadata','-1',output]);
 run(['-ss',posterAt,'-i',source,'-frames:v','1','-c:v','libwebp','-quality','82','public/assets/'+out+'-portada.webp']);
 const probe=JSON.parse(execFileSync('ffprobe',['-v','quiet','-show_entries','format=duration:stream=codec_type,width,height','-of','json',output],{encoding:'utf8'}));
 await record(source,output,{kind:'video',duration:Number(probe.format.duration),...probe.streams.find(s=>s.codec_type==='video')});
 await record(source,'public/assets/'+out+'-portada.webp',{kind:'poster',frameSecond:Number(posterAt)});
}
await writeFile('docs/MATERIAL-FATCO.json',JSON.stringify({preparedOn:'2026-11-27',entries},null,2)+'\n');
console.log(JSON.stringify(entries.map(({output,sourceBytes,outputBytes})=>({output,sourceBytes,outputBytes}))));

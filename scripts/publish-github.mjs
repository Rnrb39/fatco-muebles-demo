// Usa Git Credential Manager. Nunca escribe ni imprime la credencial.
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
const repo='fatco-muebles-demo';
const credential=execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',env:{...process.env,GIT_TERMINAL_PROMPT:'0'}});
const token=credential.split(/\r?\n/).find(l=>l.startsWith('password='))?.slice(9);
if(!token)throw Error('No hay una credencial GitHub disponible.');
async function api(path,method='GET',body){const response=await fetch(`https://api.github.com${path}`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await response.json().catch(()=>({}));if(!response.ok)throw Error(`GitHub ${method} ${path}: ${response.status} ${data.message||''}`);return data;}
const user=await api('/user');
if(process.argv.includes('--diagnose')){const build=await api(`/repos/${user.login}/${repo}/pages/builds/latest`);console.log(JSON.stringify({status:build.status,error:build.error,commit:build.commit}));const runs=await api(`/repos/${user.login}/${repo}/actions/runs?per_page=3`);for(const r of runs.workflow_runs||[]){console.log(JSON.stringify({id:r.id,status:r.status,conclusion:r.conclusion,url:r.html_url}));const jobs=await api(`/repos/${user.login}/${repo}/actions/runs/${r.id}/jobs`);console.log(JSON.stringify(jobs.jobs?.map(j=>({id:j.id,name:j.name,conclusion:j.conclusion,steps:j.steps}))));}process.exit(0);}
if(process.argv.includes('--status')){const pages=await api(`/repos/${user.login}/${repo}/pages`);console.log(JSON.stringify({url:pages.html_url,status:pages.status,source:pages.source}));process.exit(0);}
const run=(args,cwd=process.cwd())=>execFileSync('git',args,{cwd,stdio:'pipe',env:{...process.env,GIT_TERMINAL_PROMPT:'0'}}).toString().trim();
let repository;
try {const state=JSON.parse(await readFile('.publication.json','utf8'));if(state.repository!==`${user.login}/${repo}`)throw Error('El repositorio no coincide.');repository=await api(`/repos/${state.repository}`);}
catch(error){if(error.code!=='ENOENT')throw error;repository=await api('/user/repos','POST',{name:repo,description:'Prototipo de demostración de FATCO Muebles. Catálogo ilustrativo; sin pagos ni rastreadores.',private:false,auto_init:false});await writeFile('.publication.json',JSON.stringify({repository:repository.full_name,url:`https://${user.login.toLowerCase()}.github.io/${repo}/`},null,2)+'\n');}
try{run(['rev-parse','--git-dir']);}catch{run(['init','-b','main']);run(['config','user.name',user.login]);run(['config','user.email',`${user.id}+${user.login}@users.noreply.github.com`]);run(['remote','add','origin',repository.clone_url]);}
if(run(['remote','get-url','origin'])!==repository.clone_url)throw Error('Remote distinto: publicación detenida.');
run(['add','.']);if(run(['status','--porcelain']))run(['commit','-m','Build FATCO furniture demonstration']);
run(['push','-u','origin','main']);
try{run(['rev-parse','--git-dir'],`${process.cwd()}/dist`);const top=run(['rev-parse','--show-toplevel'],`${process.cwd()}/dist`).replaceAll('\\','/');if(top!==`${process.cwd().replaceAll('\\','/')}/dist`)throw Error('not-dist');}catch{run(['init','-b','gh-pages'],`${process.cwd()}/dist`);run(['config','user.name',user.login],`${process.cwd()}/dist`);run(['config','user.email',`${user.id}+${user.login}@users.noreply.github.com`],`${process.cwd()}/dist`);run(['remote','add','origin',repository.clone_url],`${process.cwd()}/dist`);}
run(['add','.'],`${process.cwd()}/dist`);if(run(['status','--porcelain'],`${process.cwd()}/dist`))run(['commit','-m','Publish static demonstration'],`${process.cwd()}/dist`);
run(['push','-u','origin','gh-pages'],`${process.cwd()}/dist`);
let pages;try{pages=await api(`/repos/${repository.full_name}/pages`);}catch(error){if(!error.message.includes(': 404'))throw error;pages=await api(`/repos/${repository.full_name}/pages`,'POST',{build_type:'legacy',source:{branch:'gh-pages',path:'/'}});}
console.log(JSON.stringify({repository:repository.html_url,url:pages.html_url,status:pages.status,source:pages.source}));

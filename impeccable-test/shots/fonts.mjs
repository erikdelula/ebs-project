import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy:{server:process.env.HTTPS_PROXY} , args:['--ignore-certificate-errors']});
for (const arm of ['A','B']) { const p = await b.newPage();
 p.on('requestfailed',r=>console.log(arm,'FAIL',r.url().slice(0,80),r.failure()?.errorText));
 await p.goto(`file:///home/user/ebs-project/impeccable-test/${arm}/index.html`,{waitUntil:'networkidle'});
 console.log(arm, await p.evaluate(()=>[...document.fonts].map(f=>f.family+':'+f.status).slice(0,8).join(', '))); }
await b.close();

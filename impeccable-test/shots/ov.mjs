import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy:{server:process.env.HTTPS_PROXY}, args:['--ignore-certificate-errors'] });
const p = await b.newPage({ viewport:{width:390,height:844} });
await p.goto('file:///home/user/ebs-project/impeccable-test/C/index.html',{waitUntil:'networkidle'});
console.log(await p.evaluate(()=>{const W=innerWidth;return [...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>W+1).slice(0,8).map(e=>e.tagName+'.'+e.className+' r='+Math.round(e.getBoundingClientRect().right)+' pos='+getComputedStyle(e).position).join('\n')+'\nsw='+document.documentElement.scrollWidth}));
await b.close();

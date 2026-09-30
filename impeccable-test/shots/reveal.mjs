import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy:{server:process.env.HTTPS_PROXY}, args:['--ignore-certificate-errors'] });
const p = await b.newPage({viewport:{width:1440,height:900}});
await p.goto('file:///home/user/ebs-project/impeccable-test/B/index.html',{waitUntil:'networkidle'});
for (const id of ['#proof','#cta-sec','.cta-sec','#contacto']) { const n = await p.locator(id).count(); console.log(id,n); }
await p.mouse.wheel(0,4700); await p.waitForTimeout(1500);
await p.screenshot({path:'B-proof.png'});
await p.mouse.wheel(0,900); await p.waitForTimeout(1500);
await p.screenshot({path:'B-cta.png'});
console.log(await p.evaluate(()=>[...document.querySelectorAll('[class*=reveal],[data-reveal]')].map(e=>e.className+':'+getComputedStyle(e).opacity).join('\n')));
await b.close();

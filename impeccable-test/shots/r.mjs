import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy:{server:process.env.HTTPS_PROXY}, args:['--ignore-certificate-errors'] });
for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  let fail=0; p.on('requestfailed',()=>fail++);
  await p.goto('file:///home/user/ebs-project/impeccable-test/R/index.html',{waitUntil:'networkidle',timeout:45000}).catch(e=>console.log('goto',e.message));
  await p.waitForTimeout(2500);
  const H = await p.evaluate(()=>document.body.scrollHeight);
  const imgs = await p.evaluate(()=>[...document.images].filter(i=>i.complete&&i.naturalWidth>0).length+'/'+document.images.length);
  console.log(n,'H',H,'imgs loaded',imgs,'failed reqs',fail);
  for (const [i,f] of [0,0.12,0.3,0.55,0.8].entries()) { await p.evaluate(y=>scrollTo(0,y),(H-h)*f); await p.waitForTimeout(1200); await p.screenshot({path:`R-${n}-${i}.png`}); }
  await p.close();
}
await b.close();

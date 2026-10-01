import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy:{server:process.env.HTTPS_PROXY}, args:['--ignore-certificate-errors'] });
for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
  await p.goto('file:///home/user/ebs-project/impeccable-test/C/index.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(2500);
  const H = await p.evaluate(()=>document.body.scrollHeight);
  const shots=[0,0.25,0.5,0.75,1];
  for (const [i,f] of shots.entries()) { await p.evaluate(y=>scrollTo(0,y),(H-h)*f); await p.waitForTimeout(1200); await p.screenshot({path:`C-${n}-${i}.png`}); }
  console.log(n,'height',H,'hscroll',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'errs',errs.slice(0,3));
  await p.close();
}
await b.close();

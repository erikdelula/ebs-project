import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy:{server:process.env.HTTPS_PROXY}, args:['--ignore-certificate-errors'] });
for (const arm of ['A','B']) for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  await p.goto(`file:///home/user/ebs-project/impeccable-test/${arm}/index.html`);
  await p.waitForLoadState('networkidle'); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1500);
  // trigger scroll-reveal animations
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}scrollTo(0,0);});
  await p.waitForTimeout(800);
  const ov = await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  console.log(arm,n,'hscroll:',ov,'height:',await p.evaluate(()=>document.body.scrollHeight));
  await p.screenshot({path:`${arm}-${n}-full.png`,fullPage:true});
  await p.screenshot({path:`${arm}-${n}-fold.png`});
  await p.close();
}
await b.close();

// Homepage quick calculators. The chapter calculators remain the detailed source.
(function(){
'use strict';
const $=id=>document.getElementById(id);
const out=(id,s)=>{$(id).textContent=s;};
const digits=n=>String(n).padStart(2,'0');
const number=id=>$(id).value.trim()===''?NaN:Number($(id).value);
const valid=(v,min,max)=>Number.isFinite(v)&&v>=min&&v<=max;
const base=$('lsDistrict'),dest=$('htDistrict');
if(base&&dest){for(const child of base.children){if(child.tagName==='OPTGROUP')dest.appendChild(child.cloneNode(true));}}
$('htSunriseGo').addEventListener('click',()=>{
 const v=$('htSunrise').value,offset=$('htDistrict').value;
 if(!/^\d{2}:\d{2}$/.test(v)||!/^[-+]\d{2}:\d{2}$/.test(offset)){out('htSunriseOut','काठमाडौँको समय र जिल्ला छान्नुहोस्।');return;}
 const [h,m]=v.split(':').map(Number),sign=offset[0]==='-'?-1:1,[om,os]=offset.slice(1).split(':').map(Number);
 const seconds=(h*60+m)*60-sign*(om*60+os);
 if(seconds<0||seconds>=86400){out('htSunriseOut','समय मान्य दायराबाहिर छ।');return;}
 const clock=digits(Math.floor(seconds/3600))+':'+digits(Math.floor(seconds%3600/60))+':'+digits(seconds%60);out('htSunriseOut','स्थानीय सूर्योदय: '+clock+' (काठमाडौँसँगको समयान्तर '+offset+')');$('htLocalSunrise').value=clock;
});
$('htGhadiGo').addEventListener('click',()=>{
 const h=number('htHours'),m=number('htMinutes'),sec=number('htSeconds');
 if(!Number.isInteger(h)||!Number.isInteger(m)||!valid(h,0,23)||!valid(m,0,59)||!Number.isInteger(sec)||!valid(sec,0,59)){out('htGhadiOut','घण्टा, मिनेट र सेकेन्ड जाँच्नुहोस्।');return;}
 const vipala=((h*60+m)*60+sec)*2.5,gh=Math.floor(vipala/3600),pa=Math.floor(vipala%3600/60),vi=vipala%60;
 out('htGhadiOut',gh+' घडी '+pa+' पला '+vi+' विपला');
});
const angle=v=>{v=v.trim().replace(/[०-९]/g,c=>String('०१२३४५६७८९'.indexOf(c)));if(/^\d+(?:\.\d+)?$/.test(v)){const n=Number(v);return n<360?Math.min(1295999999,Math.round(n*3600000)):null;}const p=v.split('/');if(p.length!==4||p.some(x=>!/^\d+$/.test(x)))return null;const [r,d,m,sec]=p.map(Number);return r<12&&d<30&&m<60&&sec<60?((r*30+d)*3600+m*60+sec)*1000:null;};
$('htTithiGo').addEventListener('click',()=>{
 const s=angle($('htSun').value),m=angle($('htMoon').value);
 if(s===null||m===null){out('htTithiOut','दशमलव अंश वा राशि/अंश/कला/विकला (राशि ०–११) राख्नुहोस्।');return;}
 const delta=(m-s+1296000000)%1296000000,idx=Math.floor(delta/43200000),names=['प्रतिपदा','द्वितीया','तृतीया','चतुर्थी','पञ्चमी','षष्ठी','सप्तमी','अष्टमी','नवमी','दशमी','एकादशी','द्वादशी','त्रयोदशी','चतुर्दशी','पूर्णिमा'];
 out('htTithiOut',(idx<15?'शुक्ल':'कृष्ण')+' '+(idx===29?'औँसी':names[idx%15])+' · कोणीय अन्तर '+(delta/3600000).toFixed(6)+'°'+(delta%43200000===0?' · ठीक तिथि परिवर्तनको सीमा; नयाँ तिथि मानिएको छ।':''));
});
$('htNakGo').addEventListener('click',()=>{
 const d=angle($('htNakDegree').value);
 if(d===null){out('htNakOut','चन्द्रमाको निरयण देशान्तर दशमलव अंश वा राशि/अंश/कला/विकला (राशि ०–११) मा राख्नुहोस्।');return;}
 const part=Math.floor(d/12000000),idx=Math.floor(part/4),p=part%4,r=Math.floor(part/9);
 out('htNakOut',namingData[idx].name+' · चरण '+(p+1)+' · नामाक्षर: '+namingData[idx].syll[p]+' · राशि: '+namingSigns[r]+' · राशिस्वामी: '+namingLords[r]+' · दशास्वामी: '+namingData[idx].lord+(d%12000000===0?' · ठीक चरण-सीमा; नयाँ चरण मानिएको छ।':''));
});

const timeSeconds=v=>{const m=/^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(v||'');if(!m)return null;const h=+m[1],mn=+m[2],sc=+(m[3]||0);return h<24&&mn<60&&sc<60?h*3600+mn*60+sc:null;};
$('htIstGo').addEventListener('click',()=>{
 const birth=timeSeconds($('htBirth').value),sun=timeSeconds($('htLocalSunrise').value),prev=$('htPrevious').value==='previous';
 if(birth===null||sun===null){out('htIstOut','जन्म समय र स्थानीय सूर्योदय जाँच्नुहोस्।');return;}
 if(!prev&&birth<sun){out('htIstOut','सूर्योदयअघिको जन्म हो भने अघिल्लो दिनको सूर्योदय विकल्प छान्नुहोस्।');return;}
 
 const elapsed=birth-sun+(prev?86400:0);
 if(elapsed<0||elapsed>=86400){out('htIstOut','इष्टकालको अवधि २४ घण्टाभन्दा कम हुनुपर्छ।');return;}
 const halfVipala=elapsed*5,gh=Math.floor(halfVipala/7200),pa=Math.floor((halfVipala%7200)/120),vi=(halfVipala%120)/2;
 out('htIstOut',gh+' घडी '+pa+' पला '+vi+' विपला'+(vi?' · कापीको पूर्ण पला पद्धति: '+gh+'/'+digits(pa):''));
});
const parseGP=v=>{v=v.replace(/[०-९]/g,c=>String('०१२३४५६७८९'.indexOf(c)));const m=/^\s*(\d+)\s*\/\s*(\d+)(?:\s*\/\s*(\d+(?:\.5)?))?\s*$/.exec(v);if(!m)return null;const g=+m[1],p=+m[2],vi=+(m[3]||0);return g<=120&&p<60&&vi<60&&(g<120||p+vi===0)?g*60+p+vi/60:null;};
const dashaYears={sun:6,moon:10,mars:7,rahu:18,jupiter:16,saturn:19,mercury:17,ketu:7,venus:20};
$('htDashaGo').addEventListener('click',()=>{
 const a=parseGP($('htBhayat').value),b=parseGP($('htBhavog').value),years=dashaYears[$('htLord').value];
 if(a===null||b===null||b<=0||!years){out('htDashaOut','घडी/पला र दशास्वामी जाँच्नुहोस्।');return;}
 if(a===b){out('htDashaOut','नक्षत्र अन्त्य-सीमा: अर्को नक्षत्र र दशास्वामी पुष्टि गर्नुहोस्।');return;}
 if(a<0||a>b){out('htDashaOut','भयात शून्यभन्दा कम वा भभोगभन्दा ठूलो हुन सक्दैन।');return;}
 const remaining=years*(b-a)/b,days=Math.round(remaining*360),y=Math.floor(days/360),mo=Math.floor(days%360/30),d=days%30;
 out('htDashaOut',y+' वर्ष '+mo+' महिना '+d+' दिन · गणना: ('+fmtGP(b)+' − '+fmtGP(a)+') ÷ '+fmtGP(b)+' × '+years+' = '+remaining.toFixed(6)+' वर्ष। अध्ययन नोटअनुसार १२ महिना/वर्ष, ३० दिन/महिना; नजिकको पूर्ण दिन।');
});


const fmtGP=n=>{const v=Math.round(n*120)/2;return Math.floor(v/3600)+' घडी '+digits(Math.floor(v%3600/60))+' पला'+(v%60?' '+digits(v%60)+' विपला':'');};
const inputGP=id=>{const v=$(id)?parseGP($(id).value):null;return v!==null&&v<=3600?v:null;};
function initNakCalculator(prefix,which){
 const mode=$(prefix+'Case'),result=prefix+'Out',use=$(prefix+'Use');
 let last=null;
 function change(){
  for(const [v,id] of [['one','One'],['two','Two'],['three','Three'],['four','Four']])$(prefix+id).hidden=mode.value!==v;
  last=null;use.hidden=true;out(result,'पञ्चाङ्गमा दिइएको नक्षत्रको अन्त्य-मान घडी/पलामा राख्नुहोस्।');
 }
 mode.addEventListener('change',change);
 mode.closest('.home-tool-card').addEventListener('input',()=>{last=null;use.hidden=true;});
 $(prefix+'Go').addEventListener('click',()=>{
  last=null;use.hidden=true;
  const kind=mode.value,ist=which==='a'?inputGP(prefix+'Ishta'):null;
  if(which==='a'&&(ist===null||ist>=3600)){out(result,'इष्टकाल ० देखि ६० घडीभन्दा कम हुनुपर्छ।');return;}
  let a,b,formula;
  if(kind==='one'){
   const prev=inputGP(prefix+'Prev'),today=inputGP(prefix+'Today');
   if(prev===null||today===null){out(result,'अघिल्लो र सोही दिनको नक्षत्र अन्त्य-मान जाँच्नुहोस्।');return;}
   if(which==='a'&&ist>today){out(result,'अवस्था १ मा इष्टकाल सोही दिनको नक्षत्र अन्त्य-मानभन्दा बढी हुन सक्दैन।');return;}
   a=which==='a'?3600-prev+ist:0;b=3600-prev+today;
   formula=which==='a'?'(६० − गत नक्षत्र अन्त्य-मान) + इष्टकाल':'(६० − गत नक्षत्र अन्त्य-मान) + जन्म नक्षत्र अन्त्य-मान';
  }else if(kind==='two'){
   const today=inputGP(prefix+'Current'),next=inputGP(prefix+'Next');
   if(today===null||(which==='b'&&next===null)){out(result,'सम्बन्धित दिनको नक्षत्र अन्त्य-मान जाँच्नुहोस्।');return;}
   if(which==='a'&&ist<today){out(result,'अवस्था २ मा इष्टकाल सोही दिनको नक्षत्र अन्त्य-मानभन्दा कम हुनु हुँदैन।');return;}
   a=which==='a'?ist-today:0;b=which==='a'?3600:3600-today+next;
   formula=which==='a'?'इष्टकाल − सोही दिनको नक्षत्र अन्त्य-मान':'(६० − सोही दिनको नक्षत्र अन्त्य-मान) + आगामी दिनको अन्त्य-मान';
  }else if(kind==='three'){
   const ak=inputGP(prefix+'Akshaya'),ksh=inputGP(prefix+'Kshaya');
   if(ak===null||ksh===null){out(result,'अक्षय र क्षय नक्षत्रको अन्त्य-मान जाँच्नुहोस्।');return;}
   if(which==='a'&&!(ak<=ist&&ist<ksh)){out(result,'क्षय नक्षत्रमा जन्मका लागि इष्टकाल अक्षय नक्षत्रको अन्त्यपछि र क्षय नक्षत्रको अन्त्यअघि हुनुपर्छ।');return;}
   a=which==='a'?ist-ak:0;b=ksh-ak;
   formula=which==='a'?'इष्टकाल − अक्षय नक्षत्रको अन्त्य-मान':'क्षय नक्षत्रको अन्त्य-मान − अक्षय नक्षत्रको अन्त्य-मान';
  }else{
   const prev=inputGP(prefix+'GrowthPrev'),ending=inputGP(prefix+'GrowthEnd'),day=which==='a'?$(prefix+'GrowthDay').value:'first';
   if(prev===null||ending===null){out(result,'वृद्धि नक्षत्रको अघिल्लो र अन्तिम अन्त्य-मान जाँच्नुहोस्।');return;}
   a=which==='a'?3600-prev+ist+(day==='second'?3600:0):0;
   b=7200-prev+ending;
   formula=which==='a'?'(६० − गत नक्षत्र अन्त्य-मान) + इष्टकाल'+(day==='second'?' + ६०':''):'(६० − गत नक्षत्र अन्त्य-मान) + ६० + दोस्रो सूर्योदयपछिको अन्त्य-मान';
  }
  if(!Number.isFinite(a)||!Number.isFinite(b)||a<0||b<=0||(which==='b'&&a>b)||(which==='a'&&kind!=='two'&&a>b)){
   out(result,'नतिजा मान्य छैन: ० ≤ भयात < भभोग हुनुपर्छ। नक्षत्र अन्त्य-मान, जन्मको अवस्था र इष्टकाल जाँच्नुहोस्।');return;
  }
  if(which==='a'&&(a===0||a===b)){out(result,'नक्षत्र परिवर्तनको ठीक सीमा हो। पञ्चाङ्गको शुद्धता र जन्म नक्षत्र पुष्टि नगरी दशा शेषमा नसार्नुहोस्।');return;}
  last=which==='a'?a:b;
  const working=which==='a'?(kind==='one'?'(६०/०० − '+$(prefix+'Prev').value+') + '+$(prefix+'Ishta').value:kind==='two'?$(prefix+'Ishta').value+' − '+$(prefix+'Current').value:kind==='three'?$(prefix+'Ishta').value+' − '+$(prefix+'Akshaya').value:'(६०/०० − '+$(prefix+'GrowthPrev').value+') + '+$(prefix+'Ishta').value+($(prefix+'GrowthDay').value==='second'?' + ६०/००':'')):(kind==='one'?'(६०/०० − '+$(prefix+'Prev').value+') + '+$(prefix+'Today').value:kind==='two'?'(६०/०० − '+$(prefix+'Current').value+') + '+$(prefix+'Next').value:kind==='three'?$(prefix+'Kshaya').value+' − '+$(prefix+'Akshaya').value:'(६०/०० − '+$(prefix+'GrowthPrev').value+') + ६०/०० + '+$(prefix+'GrowthEnd').value);
  out(result,(which==='a'?'भयात: ':'भभोग: ')+fmtGP(last)+'। सूत्र: '+formula+'।'+(working?' गणना: '+working+' = '+fmtGP(last)+'।':''));
  use.hidden=false;
 });
 use.addEventListener('click',()=>{
  if(last===null)return;
  const target=which==='a'?'htBhayat':'htBhavog';
  const v=Math.round(last*120)/2;$(target).value=Math.floor(v/3600)+'/'+digits(Math.floor(v%3600/60))+(v%60?'/'+digits(v%60):'');
  out(result,(which==='a'?'भयात':'भभोग')+' दशा शेष गणनायन्त्रमा सारिएको छ।');
 });
}
initNakCalculator('htBY','a');
initNakCalculator('htBG','b');


const namingData=[{"name":"अश्विनी","syll":["चु","चे","चो","ला"],"lord":"केतु"},{"name":"भरणी","syll":["ली","लू","ले","लो"],"lord":"शुक्र"},{"name":"कृत्तिका","syll":["अ","ई","उ","ए"],"lord":"सूर्य"},{"name":"रोहिणी","syll":["ओ","वा","वी","वु"],"lord":"चन्द्र"},{"name":"मृगशिरा","syll":["वे","वो","का","की"],"lord":"मङ्गल"},{"name":"आर्द्रा","syll":["कु","घ","ङ","छ"],"lord":"राहु"},{"name":"पुनर्वसु","syll":["के","को","हा","ही"],"lord":"बृहस्पति"},{"name":"पुष्य","syll":["हु","हे","हो","डा"],"lord":"शनि"},{"name":"आश्लेषा","syll":["डी","डू","डे","डो"],"lord":"बुध"},{"name":"मघा","syll":["मा","मी","मू","मे"],"lord":"केतु"},{"name":"पूर्वाफाल्गुनी","syll":["मो","टा","टी","टू"],"lord":"शुक्र"},{"name":"उत्तराफाल्गुनी","syll":["टे","टो","पा","पी"],"lord":"सूर्य"},{"name":"हस्त","syll":["पू","ष","ण","ठ"],"lord":"चन्द्र"},{"name":"चित्रा","syll":["पे","पो","रा","री"],"lord":"मङ्गल"},{"name":"स्वाती","syll":["रू","रे","रो","ता"],"lord":"राहु"},{"name":"विशाखा","syll":["ती","तू","ते","तो"],"lord":"बृहस्पति"},{"name":"अनुराधा","syll":["ना","नी","नू","ने"],"lord":"शनि"},{"name":"ज्येष्ठा","syll":["नो","या","यी","यू"],"lord":"बुध"},{"name":"मूल","syll":["ये","यो","भा","भी"],"lord":"केतु"},{"name":"पूर्वाषाढा","syll":["भू","धा","फा","ढा"],"lord":"शुक्र"},{"name":"उत्तराषाढा","syll":["भे","भो","जा","जी"],"lord":"सूर्य"},{"name":"श्रवण","syll":["खी","खू","खे","खो"],"lord":"चन्द्र"},{"name":"धनिष्ठा","syll":["गा","गी","गु","गे"],"lord":"मङ्गल"},{"name":"शतभिषा","syll":["गो","सा","सी","सू"],"lord":"राहु"},{"name":"पूर्वाभाद्रपदा","syll":["से","सो","दा","दी"],"lord":"बृहस्पति"},{"name":"उत्तराभाद्रपदा","syll":["दु","थ","झ","ञ"],"lord":"शनि"},{"name":"रेवती","syll":["दे","दो","चा","ची"],"lord":"बुध"}];
const namingSigns=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
const namingLords=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'];
function namingResult(i,a,b){
 if(!Number.isInteger(i)||i<0||i>=27||a===null||b===null||a<0||b<=0||a>=b)return null;
 const A=Math.round(a*120),B=Math.round(b*120),p=Math.max(0,Math.ceil(4*A/B)-1),r=Math.floor((4*i+p)/9);
 return {p,r,sy:namingData[i].syll[p],boundary:A>0&&4*A%B===0};
}
$('htNameLoad').addEventListener('click',()=>{$('htNameA').value=$('htBhayat').value;$('htNameB').value=$('htBhavog').value;out('htNameOut','मान सारिएका छन्। जन्म नक्षत्र पुष्टि गरी गणना गर्नुहोस्।');});
$('htNameGo').addEventListener('click',()=>{
 const i=Number($('htNameNak').value),a=parseGP($('htNameA').value),b=parseGP($('htNameB').value),r=namingResult(i,a,b);
 if(!r){out('htNameOut','मान जाँच्नुहोस्: भयात शून्य वा सोभन्दा बढी र भभोगभन्दा कम हुनुपर्छ।');return;}
 out('htNameOut','एक चरणको अवधि: '+fmtGP(b/4)+' (प्रदर्शित मान नजिकको आधा विपलासम्म) । भयात: '+fmtGP(a)+'। '+namingData[i].name+' · चरण '+(r.p+1)+' · नामाक्षर: '+r.sy+' · जन्मराशि: '+namingSigns[r.r]+' · राशिस्वामी: '+namingLords[r.r]+' · जन्म दशास्वामी: '+namingData[i].lord+'।'+(r.boundary?' ठीक चरण-सीमा: अध्ययन नोटको विधिअनुसार यही चरणको अन्तिम सीमा मानिएको छ। कोणीय विधिमा अर्को चरण सुरु हुन्छ।':''));
});

})();

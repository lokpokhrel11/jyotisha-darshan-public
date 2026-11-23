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
 const rounded=Math.min(1439,Math.floor((seconds+30)/60));out('htSunriseOut','स्थानीय सूर्योदय: '+digits(Math.floor(rounded/60))+':'+digits(rounded%60));
});
$('htGhadiGo').addEventListener('click',()=>{
 const h=number('htHours'),m=number('htMinutes');
 if(!Number.isInteger(h)||!Number.isInteger(m)||!valid(h,0,23)||!valid(m,0,59)){out('htGhadiOut','घण्टा र मिनेट जाँच्नुहोस्।');return;}
 const vipala=(h*60+m)*150,gh=Math.floor(vipala/3600),pa=Math.floor(vipala%3600/60),vi=vipala%60;
 out('htGhadiOut',gh+' घडी '+pa+' पला '+vi+' विपला');
});
$('htTithiGo').addEventListener('click',()=>{
 const s=number('htSun'),m=number('htMoon');
 if(!valid(s,0,360)||!valid(m,0,360)||s===360||m===360){out('htTithiOut','० देखि ३६०° भन्दा कम अंश राख्नुहोस्।');return;}
 const delta=(m-s+360)%360,idx=Math.min(29,Math.floor(delta/12)),names=['प्रतिपदा','द्वितीया','तृतीया','चतुर्थी','पञ्चमी','षष्ठी','सप्तमी','अष्टमी','नवमी','दशमी','एकादशी','द्वादशी','त्रयोदशी','चतुर्दशी','पूर्णिमा'];
 const phase=idx<15?'शुक्ल':'कृष्ण',n=idx%15;
 out('htTithiOut',phase+' '+(idx===29?'औँसी':names[n])+' · कोणीय अन्तर '+delta.toFixed(2)+'°');
});
$('htNakGo').addEventListener('click',()=>{
 const d=number('htNakDegree');
 if(!valid(d,0,360)||d===360){out('htNakOut','० देखि ३६०° भन्दा कम अंश राख्नुहोस्।');return;}
 const part=Math.min(107,Math.floor(d/(360/108)));
 const idx=Math.floor(part/4),pada=part%4+1;
 const names=['अश्विनी','भरणी','कृत्तिका','रोहिणी','मृगशिरा','आर्द्रा','पुनर्वसु','पुष्य','आश्लेषा','मघा','पूर्वाफाल्गुनी','उत्तराफाल्गुनी','हस्त','चित्रा','स्वाती','विशाखा','अनुराधा','ज्येष्ठा','मूल','पूर्वाषाढा','उत्तराषाढा','श्रवण','धनिष्ठा','शतभिषा','पूर्वाभाद्रपदा','उत्तराभाद्रपदा','रेवती'];
 out('htNakOut',names[Math.min(idx,26)]+' · '+Math.min(pada,4)+' पाउ');
});

const timeSeconds=v=>{const m=/^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(v||'');if(!m)return null;const h=+m[1],mn=+m[2],sc=+(m[3]||0);return h<24&&mn<60&&sc<60?h*3600+mn*60+sc:null;};
$('htIstGo').addEventListener('click',()=>{
 const birth=timeSeconds($('htBirth').value),sun=timeSeconds($('htLocalSunrise').value),prev=$('htPrevious').value==='previous';
 if(birth===null||sun===null){out('htIstOut','जन्म समय र स्थानीय सूर्योदय जाँच्नुहोस्।');return;}
 if(!prev&&birth<sun){out('htIstOut','सूर्योदयअघिको जन्म हो भने अघिल्लो दिनको सूर्योदय विकल्प छान्नुहोस्।');return;}
 if(prev&&birth>=sun){out('htIstOut','सूर्योदयअघिको विकल्पमा जन्मको घडी सूर्योदयभन्दा अघि हुनुपर्छ।');return;}
 const elapsed=birth-sun+(prev?86400:0);
 if(elapsed<0||elapsed>=86400){out('htIstOut','इष्टकालको अवधि २४ घण्टाभन्दा कम हुनुपर्छ।');return;}
 const halfVipala=elapsed*5,gh=Math.floor(halfVipala/7200),pa=Math.floor((halfVipala%7200)/120),vi=(halfVipala%120)/2;
 out('htIstOut',gh+' घडी '+pa+' पला '+vi+' विपला');
});
const parseGP=v=>{const m=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(v);if(!m)return null;const g=+m[1],p=+m[2];return g<=120&&p<60&&(g<120||p===0)?g*60+p:null;};
const dashaYears={sun:6,moon:10,mars:7,rahu:18,jupiter:16,saturn:19,mercury:17,ketu:7,venus:20};
$('htDashaGo').addEventListener('click',()=>{
 const a=parseGP($('htBhayat').value),b=parseGP($('htBhavog').value),years=dashaYears[$('htLord').value];
 if(a===null||b===null||b<=0||!years){out('htDashaOut','घडी/पला र दशास्वामी जाँच्नुहोस्।');return;}
 if(a===b){out('htDashaOut','नक्षत्र अन्त्य-सीमा: अर्को नक्षत्र र दशास्वामी पुष्टि गर्नुहोस्।');return;}
 if(a<0||a>b){out('htDashaOut','भयात शून्यभन्दा कम वा भभोगभन्दा ठूलो हुन सक्दैन।');return;}
 const remaining=years*(b-a)/b,days=Math.round(remaining*360),y=Math.floor(days/360),mo=Math.floor(days%360/30),d=days%30;
 out('htDashaOut',y+' वर्ष '+mo+' महिना '+d+' दिन · '+remaining.toFixed(4)+' वर्ष (३६०-दिने वर्ष)');
});


const fmtGP=n=>Math.floor(n/60)+' घडी '+String(n%60).padStart(2,'0')+' पला';
const inputGP=id=>{const v=parseGP($(id).value);return v!==null&&v<=3600?v:null;};
function initNakCalculator(prefix,which){
 const mode=$(prefix+'Case'),result=prefix+'Out',use=$(prefix+'Use');
 let last=null;
 function change(){
  for(const [v,id] of [['one','One'],['two','Two'],['three','Three'],['four','Four']])$(prefix+id).hidden=mode.value!==v;
  last=null;use.hidden=true;out(result,'पञ्चाङ्गमा दिइएको नक्षत्रको अन्त्य-मान घडी/पलामा राख्नुहोस्।');
 }
 mode.addEventListener('change',change);
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
   if(today===null||next===null){out(result,'सोही र आगामी दिनको नक्षत्र अन्त्य-मान जाँच्नुहोस्।');return;}
   if(which==='a'&&ist<=today){out(result,'अवस्था २ मा इष्टकाल सोही दिनको नक्षत्र अन्त्य-मानभन्दा बढी हुनुपर्छ।');return;}
   a=which==='a'?ist-today:0;b=3600-today+next;
   formula=which==='a'?'इष्टकाल − सोही दिनको नक्षत्र अन्त्य-मान':'(६० − सोही दिनको नक्षत्र अन्त्य-मान) + आगामी दिनको अन्त्य-मान';
  }else if(kind==='three'){
   const ak=inputGP(prefix+'Akshaya'),ksh=inputGP(prefix+'Kshaya');
   if(ak===null||ksh===null){out(result,'अक्षय र क्षय नक्षत्रको अन्त्य-मान जाँच्नुहोस्।');return;}
   if(which==='a'&&!(ak<ist&&ist<ksh)){out(result,'क्षय नक्षत्रमा जन्मका लागि इष्टकाल अक्षय नक्षत्रको अन्त्यपछि र क्षय नक्षत्रको अन्त्यअघि हुनुपर्छ।');return;}
   a=which==='a'?ist-ak:0;b=ksh-ak;
   formula=which==='a'?'इष्टकाल − अक्षय नक्षत्रको अन्त्य-मान':'क्षय नक्षत्रको अन्त्य-मान − अक्षय नक्षत्रको अन्त्य-मान';
  }else{
   const prev=inputGP(prefix+'GrowthPrev'),ending=inputGP(prefix+'GrowthEnd'),day=which==='a'?$(prefix+'GrowthDay').value:'first';
   if(prev===null||ending===null){out(result,'वृद्धि नक्षत्रको अघिल्लो र अन्तिम अन्त्य-मान जाँच्नुहोस्।');return;}
   a=which==='a'?3600-prev+ist+(day==='second'?3600:0):0;
   b=7200-prev+ending;
   formula=which==='a'?'(६० − गत नक्षत्र अन्त्य-मान) + इष्टकाल'+(day==='second'?' + ६०':''):'(६० − गत नक्षत्र अन्त्य-मान) + ६० + दोस्रो सूर्योदयपछिको अन्त्य-मान';
  }
  if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<=0||a>b){
   out(result,'नतिजा मान्य छैन: ० ≤ भयात < भभोग हुनुपर्छ। नक्षत्र अन्त्य-मान, जन्मको अवस्था र इष्टकाल जाँच्नुहोस्।');return;
  }
  if(which==='a'&&a===b){out(result,'नक्षत्र समाप्तिको ठीक सीमा हो। अध्ययन नोटको वर्गीकरणअनुसार अवस्था १ मानिए पनि जन्म नक्षत्र र दशास्वामी पुष्टि नगरी दशा शेषमा नसार्नुहोस्।');return;}
  last=which==='a'?a:b;
  out(result,(which==='a'?'भयात: ':'भभोग: ')+fmtGP(last)+'। सूत्र: '+formula+'।');
  use.hidden=false;
 });
 use.addEventListener('click',()=>{
  if(last===null)return;
  const target=which==='a'?'htBhayat':'htBhavog';
  $(target).value=Math.floor(last/60)+'/'+String(last%60).padStart(2,'0');
  out(result,(which==='a'?'भयात':'भभोग')+' दशा शेष गणनायन्त्रमा सारिएको छ।');
 });
}
initNakCalculator('htBY','a');
initNakCalculator('htBG','b');

})();

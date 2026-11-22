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
 if(a>=3600||a>b){out('htDashaOut','भयात ६० घडीभन्दा कम र भभोगभन्दा सानो हुनुपर्छ।');return;}
 const remaining=years*(b-a)/b,days=Math.round(remaining*360),y=Math.floor(days/360),mo=Math.floor(days%360/30),d=days%30;
 out('htDashaOut',y+' वर्ष '+mo+' महिना '+d+' दिन · '+remaining.toFixed(4)+' वर्ष (३६०-दिने वर्ष)');
});
})();

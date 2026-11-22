'use strict';
const signs=['मेष','वृष','मिथुन','कर्कट','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
const lords=['मङ्गल','शुक्र','बुध','चन्द्र','सूर्य','बुध','शुक्र','मङ्गल','बृहस्पति','शनि','शनि','बृहस्पति'];
const anga=[
 {name:'तिथि',count:'३०',desc:'सूर्य र चन्द्रमाबीचको कोणीय अन्तरका आधारमा निर्धारण हुने चान्द्र दिन।'},
 {name:'वार',count:'७',desc:'सात दिनको क्रम। परम्परागत पञ्चाङ्गमा सूर्योदयलाई दिनको सीमासँग जोडिन्छ।'},
 {name:'नक्षत्र',count:'२७',desc:'चन्द्रमाको राशिचक्रमा रहेको स्थितिसँग सम्बन्धित २७ खण्ड।'},
 {name:'योग',count:'२७',desc:'सूर्य र चन्द्रमाको भोगांशको योगका आधारमा गणना गरिने अङ्ग।'},
 {name:'करण',count:'११ प्रकार',desc:'तिथिको आधा भाग; पञ्चाङ्गमा ११ प्रकारका करण मानिन्छन्।'}
];
const $=id=>document.getElementById(id);
$('year').textContent=new Date().getFullYear();
const menuButton=$('menu'),mainNav=$('nav');
function setMenuOpen(open){
 mainNav.classList.toggle('open',open);
 menuButton.setAttribute('aria-expanded',String(open));
 menuButton.setAttribute('aria-label',open?'विषय सूची बन्द गर्नुहोस्':'विषय सूची खोल्नुहोस्');
}
menuButton.addEventListener('click',()=>setMenuOpen(menuButton.getAttribute('aria-expanded')!=='true'));
// An expanded phone menu must not remain marked open after rotating or widening the viewport.
const mobileMenuQuery=window.matchMedia('(max-width: 650px)');
const syncMenuViewport=()=>{if(!mobileMenuQuery.matches&&menuButton.getAttribute('aria-expanded')==='true')setMenuOpen(false);};
if(mobileMenuQuery.addEventListener)mobileMenuQuery.addEventListener('change',syncMenuViewport);
else if(mobileMenuQuery.addListener)mobileMenuQuery.addListener(syncMenuViewport);
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenuOpen(false)));
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){
  setMenuOpen(false);
  menuButton.focus();
 }
});
document.addEventListener('pointerdown',event=>{
 if(menuButton.getAttribute('aria-expanded')==='true'&&!mainNav.contains(event.target)&&!menuButton.contains(event.target))setMenuOpen(false);
});
function showAnga(i){$('angaTabs').querySelectorAll('button').forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',String(i===j));});const a=anga[i];$('angaDetail').innerHTML=`<strong>${a.name}</strong> · ${a.count}<p>${a.desc}</p>`;}
anga.forEach((a,i)=>{const b=document.createElement('button');b.textContent=a.name;b.addEventListener('click',()=>showAnga(i));$('angaTabs').append(b);});showAnga(0);
$('openLesson').addEventListener('click',()=>{
 $('lesson').hidden=false;
 $('openLesson').setAttribute('aria-expanded','true');
 $('lesson').focus();
});
$('closeLesson').addEventListener('click',()=>{$('lesson').hidden=true;$('openLesson').setAttribute('aria-expanded','false');$('openLesson').focus();});
// Chapter 1 formative assessment. Each item includes its study-note section.
const questions=[
 {unit:'१.१',q:'पञ्चाङ्गका पाँच अङ्गमध्ये कुन पर्दछ?',options:['लग्न','करण','भावेश'],correct:1,why:'तिथि, वार, नक्षत्र, योग र करण पाँच अङ्ग हुन्।'},
 {unit:'१.१',q:'पञ्चाङ्गका पाँच अङ्गमध्ये कुन पर्दैन?',options:['योग','नक्षत्र','दशा'],correct:2,why:'दशा ज्योतिष अध्ययनको विषय हो तर पञ्चाङ्गका पाँच अङ्गमध्ये होइन।'},
 {unit:'१.२',q:'चन्द्रमासमा कुल कति तिथि मानिन्छन्?',options:['१५','३०','२७'],correct:1,why:'शुक्ल र कृष्ण पक्षमा १५–१५ गरी ३० तिथि हुन्छन्।'},
 {unit:'१.२',q:'३० तिथि भए पनि छुट्टाछुट्टै नाम कति छन्?',options:['१५','१६','३०'],correct:1,why:'प्रतिपदादेखि चतुर्दशीसम्मका १४ नाम शुक्ल र कृष्ण दुवै पक्षमा दोहोरिन्छन्। शुक्ल पक्षको पन्ध्रौँ तिथि पूर्णिमा र कृष्ण पक्षको पन्ध्रौँ तिथि औँसी भएकाले अलग नाम जम्मा १६ हुन्छन्।'},
 {unit:'१.२',q:'पाँचौँ तिथि कुन नन्दादि समूहमा पर्छ?',options:['पूर्णा','जया','रिक्ता'],correct:0,why:'तिथिहरूलाई नन्दा, भद्रा, जया, रिक्ता र पूर्णा गरी पाँच समूहमा राखिन्छ। यही पाँच समूहको क्रम तीनपटक दोहोरिन्छ। त्यसैले पाँचौँ, दशौँ र पन्ध्रौँ तिथि पूर्णा समूहमा पर्छन्।'},
 {unit:'१.२क',q:'३६०° लाई ३० तिथिमा बाँड्दा एक तिथिको कोण कति?',options:['१०°','१२°','१३°२०′'],correct:1,why:'३६०° ÷ ३० = १२°।'},
 {unit:'१.२क',q:'एक अंशमा कति कला हुन्छन्?',options:['३०','६०','१००'],correct:1,why:'१ अंश = ६० कला; १ कला = ६० विकला।'},
 {unit:'१.३',q:'परम्परागत वारहरूको संख्या कति?',options:['५','७','९'],correct:1,why:'आइतबारदेखि शनिबारसम्म सात वार हुन्छन्।'},
 {unit:'१.४',q:'मानक गणनामा नक्षत्र कति?',options:['१२','२७','२८'],correct:1,why:'राशिचक्रलाई समान २७ भागमा बाँडेर नक्षत्रको सामान्य गणना गरिन्छ। अभिजितलाई समावेश गर्ने २८ नक्षत्रको सूची पनि परम्परामा पाइन्छ, तर यस पाठको गणना २७ नक्षत्रमा आधारित छ।'},
 {unit:'१.४',q:'प्रत्येक नक्षत्रमा कति पाउ हुन्छन्?',options:['२','४','६'],correct:1,why:'२७ × ४ = १०८ पाउ।'},
 {unit:'१.४',q:'तिष्य अर्को कुन नक्षत्रको नाम हो?',options:['पुष्य','रोहिणी','रेवती'],correct:0,why:'नोटमा तिष्य/पुष्य एउटै आठौँ नक्षत्रका नाम हुन्।'},
 {unit:'१.५',q:'विष्कुम्भादि योग सूचीमा शुभ कुन क्रममा छ?',options:['२३','२४','२५'],correct:0,why:'२३ शुभ र २४ शुक्ल हुन्।'},
 {unit:'१.६',q:'आनन्दादि योग कति छन्?',options:['२७','२८','३०'],correct:1,why:'आनन्दादि २८ र विष्कुम्भादि २७ योगका अलग सूची हुन्।'},
 {unit:'१.७',q:'करणका प्रकार जम्मा कति छन्?',options:['७','११','१५'],correct:1,why:'बव, बालव, कौलव, तैतिल, गर, वणिज र विष्टि सात चर करण हुन्। शकुनि, चतुष्पद, नाग र किंस्तुघ्न चार स्थिर करण हुन्। त्यसैले जम्मा ११ प्रकार हुन्छन्।'},
 {unit:'१.८',q:'अयन र ऋतुका संख्या क्रमशः कति?',options:['२ र ६','६ र २','२ र १२'],correct:0,why:'दुई अयन र छ ऋतु मानिन्छन्।'}
];
let questionIndex=0,correctCount=0,answered=false,unitScores={};
function renderQuestion(){
 const q=questions[questionIndex];answered=false;
 $('questionTitle').textContent=q.q;$('quizFeedback').textContent='';
 $('quizProgress').textContent=`प्रश्न ${questionIndex+1} / ${questions.length} · सही ${correctCount} · स्रोत खण्ड ${q.unit}`;
 $('quizOptions').replaceChildren();
 q.options.forEach((option,i)=>{const b=document.createElement('button');b.type='button';b.textContent=option;b.addEventListener('click',()=>{
  if(answered)return;answered=true;const ok=i===q.correct;if(ok)correctCount++;
  if(!unitScores[q.unit])unitScores[q.unit]={right:0,total:0};unitScores[q.unit].total++;if(ok)unitScores[q.unit].right++;
  $('quizFeedback').textContent=(ok?'सही उत्तर। ':'सही उत्तर «'+q.options[q.correct]+'» हो। ')+q.why;
  $('quizProgress').textContent=`प्रश्न ${questionIndex+1} / ${questions.length} · सही ${correctCount} · स्रोत खण्ड ${q.unit}`;
  $('quizOptions').querySelectorAll('button').forEach((x,j)=>{x.disabled=true;if(j===q.correct){x.classList.add('correct-answer');x.setAttribute('aria-label',x.textContent+' — सही उत्तर')}else if(j===i){x.classList.add('incorrect-answer')}});
  $('nextQuestion').hidden=questionIndex===questions.length-1;
  if(questionIndex===questions.length-1){
   const passed=correctCount>=12;
   $('quizFeedback').textContent+=` अन्तिम नतिजा: ${correctCount}/${questions.length}। `+(passed?'प्रारम्भिक मूल्याङ्कन पूरा भयो।':'पुनः अध्ययन गरेर प्रयास गर्नुहोस्।');
   $('unitBreakdown').textContent='खण्डअनुसार: '+Object.entries(unitScores).map(([unit,v])=>`${unit}: ${v.right}/${v.total}`).join(' · ');
   $('restartQuiz').hidden=false;
   try{localStorage.setItem('jd-chapter1-v05',JSON.stringify({score:correctCount,total:questions.length,completed:passed,units:unitScores}));}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));
  }
  $(questionIndex===questions.length-1?'restartQuiz':'nextQuestion').focus();
 });$('quizOptions').append(b);});$('nextQuestion').hidden=true;
}
$('nextQuestion').addEventListener('click',()=>{questionIndex++;renderQuestion();$('questionTitle').focus()});
$('restartQuiz').addEventListener('click',()=>{questionIndex=0;correctCount=0;unitScores={};$('restartQuiz').hidden=true;$('unitBreakdown').textContent='';renderQuestion();$('questionTitle').focus()});
function renderSavedChapter1Progress(){
 try{
  const prev=JSON.parse(localStorage.getItem('jd-chapter1-v05')||'null');
  $('savedProgress').textContent=prev&&prev.total===questions.length&&Number.isInteger(prev.score)
   ? `पछिल्लो अभ्यास: ${prev.score}/${prev.total} · ${prev.completed?'मापदण्ड पूरा':'पुनः अभ्यास आवश्यक'}`
   : '';
 }catch(e){}
}
window.addEventListener('jyotisha-assessment-updated',renderSavedChapter1Progress);
renderSavedChapter1Progress();
renderQuestion();
// Chapter 1 expanded learning tools. Angles are hypothetical teaching inputs.
const tithiGroups=['नन्दा','भद्रा','जया','रिक्ता','पूर्णा'];
for(let i=1;i<=15;i++)$('tithiNumber').add(new Option(`${i} औँ तिथि`,String(i)));
function showTithiGroup(){const n=Number($('tithiNumber').value);$('tithiGroupResult').textContent=`${n} औँ तिथि: ${tithiGroups[(n-1)%5]} समूह।`;}
$('tithiNumber').addEventListener('change',showTithiGroup);showTithiGroup();
function validAngle(id){const v=Number($(id).value);return $(id).value.trim()!==''&&Number.isFinite(v)&&v>=0&&v<360?v:null;}
$('nakCalculate').addEventListener('click',()=>{
 const d=validAngle('nakDegree');if(d===null){$('nakResult').textContent='० देखि ३६० भन्दा कम अंश लेख्नुहोस्।';return;}
 const globalPada=Math.floor((d+1e-10)/(360/108));const n=Math.floor(globalPada/4)+1;const pad=globalPada%4+1;
 $('nakResult').textContent=`कुल भोगांश ${d.toFixed(2)}° ÷ ३°२०′ (एक पाउ) गर्दा ${globalPada} पूरा पाउ बितेका छन्। त्यसैले नक्षत्र क्रम ${n} र त्यसको ${pad} औँ पाउ चलिरहेको छ। यो २७ नक्षत्रको समान कोणीय विभाजनमा आधारित अभ्यास हो।`;
});
$('tithiCalculate').addEventListener('click',()=>{
 const sun=validAngle('sunLongitude'),moon=validAngle('moonLongitude');
 if(sun===null||moon===null){$('tithiCalcResult').textContent='दुवै भोगांश ० देखि ३६० भन्दा कम हुनुपर्छ।';return;}
 const diff=(moon-sun+360)%360;const idx=Math.floor(diff/12);const paksha=idx<15?'शुक्ल':'कृष्ण';
 const n=idx%15+1;const names=['प्रतिपदा','द्वितीया','तृतीया','चतुर्थी','पञ्चमी','षष्ठी','सप्तमी','अष्टमी','नवमी','दशमी','एकादशी','द्वादशी','त्रयोदशी','चतुर्दशी'];
 const name=n===15?(paksha==='शुक्ल'?'पूर्णिमा':'औँसी'):names[n-1];
 const completed=Math.floor(diff/12);const remainder=diff-completed*12;
 const boundary=Math.abs(remainder)<1e-9||Math.abs(remainder-12)<1e-9;
 const degreesIntoTithi=boundary?0:remainder;
 const elapsed=boundary?'ठीक सीमामा नयाँ तिथि सुरु हुन्छ।':completed+' वटा १२° का खण्ड पूरा भएका छन्; चालू तिथिभित्र '+degreesIntoTithi.toFixed(2)+'° बितेको छ।';
 $('tithiCalcResult').textContent='चन्द्र '+moon.toFixed(2)+'° − सूर्य '+sun.toFixed(2)+'° = '+(moon-sun).toFixed(2)+'°; ३६०° चक्रमा मिलाउँदा '+diff.toFixed(2)+'°। '+elapsed+' त्यसैले '+paksha+' '+name+' (क्रम '+n+')। '+(boundary?'यो गणितीय सीमा हो; वास्तविक तिथि परिवर्तनको घडी निकाल्न समयसहितको खगोलीय गणना चाहिन्छ।':'यो दिइएका काल्पनिक भोगांशको अभ्यास हो, आजको पञ्चाङ्ग होइन।');
});
// Source-verified Chapter 1 lists (PDF pp. 8–10).
const nakNames=['अश्विनी','भरणी','कृत्तिका','रोहिणी','मृगशिरा','आर्द्रा','पुनर्वसु','पुष्य (तिष्य)','आश्लेषा','मघा','पूर्वाफाल्गुनी','उत्तराफाल्गुनी','हस्त','चित्रा','स्वाती','विशाखा','अनुराधा','ज्येष्ठा','मूल','पूर्वाषाढा','उत्तराषाढा','श्रवण','धनिष्ठा','शतभिषा','पूर्वाभाद्रपदा','उत्तराभाद्रपदा','रेवती'];
const nakLords=['केतु (७)','शुक्र (२०)','सूर्य (६)','चन्द्र (१०)','मङ्गल (७)','राहु (१८)','बृहस्पति (१६)','शनि (१९)','बुध (१७)'];
const ntable=document.createElement('div');ntable.className='nak-grid';nakNames.forEach((n,i)=>{const e=document.createElement('div');e.textContent=`${i+1}. ${n} · ${nakLords[i%9]}`;ntable.append(e);});$('nakshatraTable').append(ntable);
const yogas27=['विष्कुम्भ','प्रीति','आयुष्मान्','सौभाग्य','शोभन','अतिगण्ड','सुकर्मा','धृति','शूल','गण्ड','वृद्धि','ध्रुव','व्याघात','हर्षण','वज्र','सिद्धि','व्यतीपात','वरीयान्','परिघ','शिव','सिद्ध','साध्य','शुभ','शुक्ल','ब्रह्म','ऐन्द्र','वैधृति'];
const yogas28=['आनन्द','कालदण्ड','धूम्र','धाता','सौम्य','ध्वाङ्क्ष','ध्वज','श्रीवत्स','वज्र','मुद्गर','छत्र','मित्र','मानस','पद्म','लुम्ब','उत्पात','मृत्यु','काण','सिद्धि','शुभ','अमृत','मुसल','गद','मातङ्ग','राक्षस','चर','स्थिर','वर्धमान'];
$('yoga27').textContent=yogas27.map((x,i)=>`${i+1}. ${x}`).join(' · ');
$('yoga28').textContent=yogas28.map((x,i)=>`${i+1}. ${x}`).join(' · ');
const lagna=$('lagna'),bhava=$('bhava');signs.forEach((s,i)=>lagna.add(new Option(`${i+1} · ${s}`,String(i+1))));for(let i=1;i<=12;i++)bhava.add(new Option(`${i} औँ भाव`,String(i)));lagna.value='5';bhava.value='9';
// Fixed North Indian chart houses: 1 top diamond, 4 left diamond, 7 bottom diamond, 10 right diamond.
// Other houses occupy the corner triangles. Labels are at approximate visual centers.
const houseCenters=[[200,91],[105,51],[51,106],[92,200],[51,293],[106,348],[200,309],[294,348],[349,294],[309,200],[349,106],[294,51]];
const roman=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
let selectedHouse=1;
function updateChart(){
 const l=Number(lagna.value),g=$('chartLabels');g.replaceChildren();
 houseCenters.forEach(([x,y],i)=>{
  const n=i+1,r=(l+i-1)%12+1;
  const group=document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('role','button');group.setAttribute('tabindex','0');
  group.setAttribute('aria-label',`${n} औँ भाव, ${signs[r-1]} राशि`);
  group.setAttribute('aria-pressed',String(n===selectedHouse));
  group.setAttribute('class','chart-house'+(n===selectedHouse?' selected':''));
  const hit=document.createElementNS('http://www.w3.org/2000/svg','circle');
  hit.setAttribute('cx',x);hit.setAttribute('cy',y-5);hit.setAttribute('r',28);hit.setAttribute('fill','transparent');
  const t=document.createElementNS('http://www.w3.org/2000/svg','text');
  t.setAttribute('x',x);t.setAttribute('y',y);t.setAttribute('font-size',n===selectedHouse?'28':'25');t.setAttribute('fill','currentColor');t.style.setProperty('font-weight','800','important');t.textContent=String(r);
  const sub=document.createElementNS('http://www.w3.org/2000/svg','text');
  sub.setAttribute('x',x);sub.setAttribute('y',y+14);sub.setAttribute('font-size','11');sub.setAttribute('fill','currentColor');sub.style.setProperty('font-weight','700','important');sub.textContent=roman[i];
  group.append(hit,t,sub);
  const select=()=>{selectedHouse=n;updateChart();g.children[i].focus();};
  group.addEventListener('click',select);
  group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});
  g.append(group);
 });
 const r=(l+selectedHouse-2)%12+1;
 $('chartSelection').textContent=`भाव ${selectedHouse} (${roman[selectedHouse-1]}) · राशि ${r} (${signs[r-1]}) · स्वामी ${lords[r-1]} · ${[1,4,7,10].includes(selectedHouse)?'केन्द्र':([5,9].includes(selectedHouse)?'त्रिकोण':([6,8,12].includes(selectedHouse)?'दुःस्थान':'अन्य भाव'))}`;
}
function calculate(){const l=Number(lagna.value),h=Number(bhava.value),idx=(l+h-2)%12;$('result').textContent=`${h} औँ भावमा ${idx+1} नम्बरको ${signs[idx]} राशि पर्छ। यसको स्वामी ${lords[idx]} हो।`;updateChart();}
$('calculate').addEventListener('click',calculate);lagna.addEventListener('change',()=>{$('result').textContent='लग्न परिवर्तन भयो। नयाँ नतिजा हेर्न गणना गर्नुहोस्।';updateChart();});bhava.addEventListener('change',()=>{$('result').textContent='राशि पत्ता लगाउनुहोस् बटन थिच्नुहोस्।';});$('newExample').addEventListener('click',()=>{lagna.value=String(Math.floor(Math.random()*12)+1);bhava.value=String(Math.floor(Math.random()*12)+1);$('result').textContent='नयाँ उदाहरण छानियो। पहिले आफैँ गणना गर्नुहोस्।';updateChart();});
updateChart();
// No service worker in staging.


// Chapter 2: source-aligned introductory exercises (master notes, sections 2.1–2.6).
const meanings=['शरीर, स्वभाव','धन, आफन्त','साहस, भाइबहिनी','आमा, घर','सन्तान, विद्या','रोग, शत्रु','विवाह, विदेश','मृत्यु, अवरोध','धर्म, भाग्य','बुबा, कर्म','आय, लाभ','खर्च, विदेश'];
for(const id of ['reverseLagna','reverseRashi']){const sel=$(id);signs.forEach((s,i)=>sel.add(new Option(`${i+1} · ${s}`,String(i+1))));}
for(let i=1;i<=12;i++)$('houseMeaning').add(new Option(`${i} औँ भाव`,String(i)));
function updateHouseMeaning(){const n=Number($('houseMeaning').value);$('houseMeaningResult').textContent=`${n} औँ भाव: ${meanings[n-1]}।`;}
$('houseMeaning').addEventListener('change',updateHouseMeaning);updateHouseMeaning();
$('reverseLagna').value='1';$('reverseRashi').value='4';
function reverseCalculate(){const l=Number($('reverseLagna').value),r=Number($('reverseRashi').value);const n=(r-l+12)%12+1;$('reverseResult').textContent=`लग्न ${signs[l-1]} (${l}) र खोजिएको राशि ${signs[r-1]} (${r}) हो। गणना: (${r} − ${l} + १२) mod १२ + १ = ${n}। त्यसैले ${signs[r-1]} राशि ${n} औँ भावमा पर्छ।`;}
$('reverseCalculate').addEventListener('click',reverseCalculate);
for(const id of ['reverseLagna','reverseRashi'])$(id).addEventListener('change',()=>{$('reverseResult').textContent='चयन परिवर्तन भयो। नयाँ नतिजाका लागि गणना गर्नुहोस्।';});
reverseCalculate();


// The master notes' nine-planet exaltation teaching chart, section 2.1 (p. 12).
// This is a synthetic exercise, NOT a natal or astronomical chart.
const exaltedPlanets=[
 {name:'सूर्य',house:1},{name:'चन्द्र',house:2},{name:'राहु',house:3},
 {name:'बृहस्पति',house:4},{name:'बुध',house:6},{name:'शनि',house:7},
 {name:'केतु',house:9},{name:'मङ्गल',house:10},{name:'शुक्र',house:12}
];
const exaltedByHouse=Object.fromEntries(exaltedPlanets.map(p=>[p.house,p.name]));
const ep=$('exaltedPlanet');exaltedPlanets.forEach((p,i)=>ep.add(new Option(p.name,String(i))));
let showExalted=false;
function drawExalted(){const g=$('exaltedChartLabels');g.replaceChildren();houseCenters.forEach(([x,y],i)=>{
 const n=i+1;const a=document.createElementNS('http://www.w3.org/2000/svg','text');a.setAttribute('x',x);a.setAttribute('y',y-5);a.setAttribute('font-size','18');a.textContent=String(n);g.append(a);
 const b=document.createElementNS('http://www.w3.org/2000/svg','text');b.setAttribute('x',x);b.setAttribute('y',y+10);b.setAttribute('font-size','10');b.textContent=roman[i];g.append(b);
 if(showExalted&&exaltedByHouse[n]){const c=document.createElementNS('http://www.w3.org/2000/svg','text');c.setAttribute('x',x);c.setAttribute('y',y+23);c.setAttribute('font-size','11');c.textContent=exaltedByHouse[n];g.append(c);}
});}
function revealExalted(){const p=exaltedPlanets[Number(ep.value)];$('exaltedResult').textContent=`मेष लग्नमा ${p.name} ${signs[p.house-1]} राशिमा राखिएको छ। राशि सङ्ख्या ${p.house} भएकाले यो ${p.house} औँ भाव हो। यो उच्च राशिको परम्परागत शिक्षण उदाहरण हो, वास्तविक जन्मकुण्डली होइन।`;}
$('exaltedReveal').addEventListener('click',revealExalted);
ep.addEventListener('change',()=>{$('exaltedResult').textContent='अर्को ग्रह छानिएको छ। त्यसको उत्तर हेर्नुहोस्।';});
$('exaltedToggle').addEventListener('click',()=>{showExalted=!showExalted;$('exaltedToggle').setAttribute('aria-pressed',String(showExalted));$('exaltedToggle').textContent=showExalted?'चार्टका ग्रह लुकाउनुहोस्':'चार्टमा सबै ग्रह देखाउनुहोस्';drawExalted();});
drawExalted();


// Chapter 2 formative assessment, sourced from master notes sections 2.1–2.6.
const chapter2Questions=[
 ['२.१','यहाँ प्रयोग गरिएको हीराकार कुण्डलीमा पहिलो भाव कहाँ हुन्छ?',['माथि बीचको हीरा','बायाँ बीचको हीरा','तल बीचको हीरा'],0,'पहिलो भाव माथि बीचको ठूलो हीरामा हुन्छ।'],
 ['२.१','चौथो भाव कहाँ हुन्छ?',['दायाँ बीच','बायाँ बीच','तल बीच'],1,'चौथो भाव बायाँ बीचको हीरा हो।'],
 ['२.१','सातौँ भाव कहाँ हुन्छ?',['माथि बीच','तल बीच','दायाँ बीच'],1,'सातौँ भाव तल बीचको हीरा हो।'],
 ['२.१','दशौँ भाव कहाँ हुन्छ?',['दायाँ बीच','बायाँ बीच','माथि बीच'],0,'दशौँ भाव दायाँ बीचको हीरा हो।'],
 ['२.१','दोस्रो भावको स्थान कुन हो?',['माथि दायाँ त्रिकोण','माथि बायाँ त्रिकोण','तल बायाँ त्रिकोण'],1,'दोस्रो भाव माथि बायाँ त्रिकोण हो।'],
 ['२.२','कुण्डलीभित्रको ५ अङ्कले सामान्यतः के जनाउँछ?',['पाँचौँ भाव','सिंह राशि','सूर्य ग्रह त्यहीँ बसेको'],1,'अङ्क ५ सिंह राशि हो; सूर्यको स्वामित्व र सूर्यको उपस्थिति एउटै होइनन्।'],
 ['२.२','भावको स्थान कुन अवस्थामा बदलिन्छ?',['लग्न बदलिँदा','ग्रह बदलिँदा','यहाँको हीराकार ढाँचामा बदलिँदैन'],2,'यहाँको हीराकार ढाँचामा भावको स्थान स्थिर रहन्छ।'],
 ['२.३','वृश्चिक राशिको स्वामी को हो?',['मङ्गल','बुध','शुक्र'],0,'राशि १ र ८ मङ्गलका घर हुन्।'],
 ['२.३','धनु राशिको स्वामी को हो?',['शनि','बृहस्पति','चन्द्र'],1,'राशि ९ र १२ बृहस्पतिका घर हुन्।'],
 ['२.३','राहु र केतुका राशिस्वामी सम्बन्धमा यस पाठको नियम कुन हो?',['दुवैका दुई-दुई घर छन्','यस तहमा आफ्ना घर मानिँदैनन्','दुवै सिंहका स्वामी हुन्'],1,'यस पाठको प्रारम्भिक राशिस्वामी तालिकामा राहु र केतुलाई आफ्नै राशिको स्वामी मानिएको छैन; यस विषयमा परम्परागत मतभेद पनि पाइन्छ।'],
 ['२.४','सिंह लग्नमा पहिलो भावमा कुन राशि हुन्छ?',['मेष','सिंह','कन्या'],1,'लग्न राशि नै पहिलो भावमा रहन्छ।'],
 ['२.४','सिंह लग्नमा नवौँ भावमा कुन राशि पर्छ?',['मेष','मीन','धनु'],0,'सिंहलाई पहिलो मानेर क्रमशः कन्या दोस्रो, तुला तेस्रो हुँदै गन्दा नवौँमा मेष पर्छ।'],
 ['२.४','सिंह लग्नमा धनु राशिमा बसेको ग्रह कुन भावमा हुन्छ?',['पाँचौँ','नवौँ','दोस्रो'],0,'सिंहबाट गन्दा सिंह पहिलो, कन्या दोस्रो, तुला तेस्रो, वृश्चिक चौथो र धनु पाँचौँ भावमा पर्छ।'],
 ['२.४','वृश्चिक लग्नमा छैटौँ भावमा कुन राशि हुन्छ?',['मेष','मीन','मिथुन'],0,'वृश्चिक पहिलो, धनु दोस्रो, मकर तेस्रो, कुम्भ चौथो, मीन पाँचौँ र मेष छैटौँ भावमा पर्छ।'],
 ['२.५','सन्तान र विद्या कुन भावका मुख्य शब्द हुन्?',['तेस्रो','पाँचौँ','आठौँ'],1,'यस पाठको प्रारम्भिक तालिकामा पाँचौँ भाव सन्तान र विद्यासँग जोडिएको छ।'],
 ['२.६','केन्द्र भावहरूको सही समूह कुन हो?',['१, ४, ७, १०','१, ५, ९','६, ८, १२'],0,'यस पाठका चार केन्द्र १, ४, ७, १० हुन्।'],
 ['२.६','यस अध्यायको अभ्यास-सूचीमा त्रिकोण भावको जोडी कुन दिइएको छ?',['१, ५, ९','५, ९','४, ७, १०'],1,'यस अध्यायमा प्रयोग गरिएको अभ्यास-सूचीले पाँचौँ र नवौँ भावलाई त्रिकोणको जोडीका रूपमा राखेको छ। कतिपय परम्परागत वर्गीकरणमा पहिलो भाव (लग्न) समेत समावेश गरी १, ५ र ९ लाई त्रिकोण भनिन्छ। त्यसैले प्रश्नले सामान्य परिभाषा होइन, यही अभ्यास-सूचीको जोडी सोधेको हो।'],
 ['उच्च कुण्डली','मेष लग्नको शिक्षण उच्च कुण्डलीमा बृहस्पति कहाँ छ?',['चौथो भाव कर्कट','नवौँ भाव धनु','दशौँ भाव मकर'],0,'स्रोतको चित्रमा बृहस्पति कर्कट अर्थात् चौथो भावमा छ।'],
 ['उच्च कुण्डली','यस शिक्षण उच्च कुण्डलीमा कुन भाव खाली छ?',['पाँचौँ','सातौँ','दशौँ'],0,'पाँचौँ, आठौँ र एघारौँ भाव खाली छन्।'],
 ['उच्च कुण्डली','यस शिक्षण उच्च कुण्डलीमा मङ्गल कहाँ छ?',['पहिलो भाव मेष','दशौँ भाव मकर','छैटौँ भाव कन्या'],1,'मङ्गल मकर राशिमा दशौँ भावमा छ।']
];
const examForm=$('chapter2ExamForm'),examQuestions=$('chapter2ExamQuestions'),examResults=$('examResults');
function renderChapter2Exam(){examQuestions.replaceChildren();chapter2Questions.forEach((q,i)=>{const fs=document.createElement('fieldset');fs.className='exam-question';const lg=document.createElement('legend');lg.textContent=`${i+1}. [${q[0]}] ${q[1]}`;fs.append(lg);q[2].forEach((answer,j)=>{const label=document.createElement('label');label.className='exam-option';const radio=document.createElement('input');radio.type='radio';radio.name=`chapter2q${i}`;radio.value=String(j);label.append(radio,document.createTextNode(' '+answer));fs.append(label);});examQuestions.append(fs);});examResults.hidden=true;examResults.replaceChildren();updateChapter2Progress();}
function updateChapter2Progress(){let done=0;chapter2Questions.forEach((q,i)=>{if(examForm.querySelector(`input[name="chapter2q${i}"]:checked`))done++;});$('examProgress').textContent=`उत्तर दिइएका: ${done}/${chapter2Questions.length}`;}
examForm.addEventListener('change',event=>{updateChapter2Progress();if(event.target.matches('input[type="radio"]')){examResults.hidden=true;examResults.replaceChildren();}});
examForm.addEventListener('submit',event=>{event.preventDefault();const answers=chapter2Questions.map((q,i)=>examForm.querySelector(`input[name="chapter2q${i}"]:checked`));if(answers.some(a=>!a)){examResults.hidden=false;examResults.textContent=`नतिजा हेर्नुअघि बाँकी ${answers.filter(a=>!a).length} प्रश्नको उत्तर दिनुहोस्।`;const first=answers.findIndex(a=>!a);const target=examQuestions.querySelectorAll('fieldset.exam-question')[first];if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});}return;}let score=0;const summary=document.createElement('div');const title=document.createElement('h3');chapter2Questions.forEach((q,i)=>{const chosen=Number(answers[i].value);const ok=chosen===q[3];if(ok)score++;const p=document.createElement('p');p.textContent=`${i+1}. ${ok?'✓ सही':'✗ सुधार'} · ${q[4]}${ok?'':` सही उत्तर: ${q[2][q[3]]}।`}`;summary.append(p);});title.textContent=`नतिजा: ${score}/20 · ${score>=16?'अभ्यास लक्ष्य पूरा':'पुनः अभ्यास सिफारिस'}`;examResults.replaceChildren(title,summary);examResults.hidden=false;title.tabIndex=-1;title.focus({preventScroll:true});try{localStorage.setItem('jyotisha-chapter2-score',JSON.stringify({score,total:20}));}catch(e){}window.dispatchEvent(new Event('jyotisha-assessment-updated'));examResults.scrollIntoView({behavior:'smooth',block:'start'});});
// Shuffle the question objects together with their answer keys and explanations.
// Reject an unchanged order so every reset visibly changes the sequence.
function reshuffleChapter2Questions(){
  const previous=chapter2Questions.slice();
  for(let i=chapter2Questions.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [chapter2Questions[i],chapter2Questions[j]]=[chapter2Questions[j],chapter2Questions[i]];
  }
  if(chapter2Questions.every((q,i)=>q===previous[i])){
    [chapter2Questions[0],chapter2Questions[1]]=[chapter2Questions[1],chapter2Questions[0]];
  }
}
$('examReset').addEventListener('click',()=>{
  examForm.reset();

  reshuffleChapter2Questions();
  renderChapter2Exam();
  // Return to the beginning so the cleared selections are immediately visible.
  const firstQuestion=examQuestions.querySelector('fieldset');
  if(firstQuestion){firstQuestion.setAttribute('tabindex','-1');firstQuestion.focus({preventScroll:true});firstQuestion.scrollIntoView({behavior:'smooth',block:'start'});}
});
renderChapter2Exam();


// Chapter links focus on their lesson and record the visit on this browser.
(function(){
 const key='jyotisha-public-opened-v1';
 const chapter=new URLSearchParams(location.search).get('chapter');
 const groups={
  1:['pathshala','practice'],
  2:['chapter2','planetExample','chapter2exam']
 };
 function readOpened(){
  try{
   const saved=JSON.parse(localStorage.getItem(key)||'[]');
   return new Set(saved.filter(n=>n===1||n===2));
  }catch(e){return new Set();}
 }
 if(chapter==='1'||chapter==='2'){
  const opened=readOpened();
  opened.add(Number(chapter));
  try{localStorage.setItem(key,JSON.stringify([...opened]));}catch(e){}
  if(chapter==='1')$('lesson').hidden=false;
  document.body.classList.add('chapter-focus');
  document.querySelectorAll('main > section').forEach(section=>{
   section.classList.toggle('chapter-focus-hidden',!groups[chapter].includes(section.id));
  });
 }
 const note=document.createElement('p');
 note.className='note';
 function render(){
  note.textContent=`खोलिएका अध्याय: ${readOpened().size}/२। अभ्यासको नतिजा यही ब्राउजरमा सुरक्षित हुन्छ।`;
 }
 $('dashboard').append(note);
 render();
 window.addEventListener('pageshow',render);
 window.addEventListener('storage',render);
})();

/* Public dashboard: show saved assessment results without accessing paid chapters. */
(function(){
 const dashboard=document.getElementById('dashboard');
 if(!dashboard)return;
 const panel=document.createElement('div');
 panel.className='cards two';
 panel.setAttribute('aria-label','निःशुल्क अध्यायको अभ्यास प्रगति');
 const entries=[
  {name:'अध्याय १ · पञ्चाङ्ग',key:'jd-chapter1-v05',total:15,pass:12},
  {name:'अध्याय २ · राशि र भाव',key:'jyotisha-chapter2-score',total:20,pass:16}
 ];
 function render(){
  panel.replaceChildren();
  for(const entry of entries){
   const tile=document.createElement('article');tile.className='tile';
   const heading=document.createElement('h3');heading.textContent=entry.name;
   const result=document.createElement('p');
   let saved=null;try{saved=JSON.parse(localStorage.getItem(entry.key)||'null')}catch(e){}
   if(saved&&saved.total===entry.total&&Number.isInteger(saved.score)&&saved.score>=0&&saved.score<=entry.total){
    result.textContent='पछिल्लो अभ्यास: '+saved.score+'/'+saved.total+'। '+(saved.score>=entry.pass?'अभ्यास लक्ष्य पूरा भयो।':'पुनः अभ्यास गर्न सकिन्छ।');
   }else result.textContent='अभ्यासको नतिजा अझै सुरक्षित गरिएको छैन।';
   tile.append(heading,result);panel.append(tile);
  }
 }
 dashboard.append(panel);render();
 window.addEventListener('jyotisha-assessment-updated',render);
 window.addEventListener('storage',render);
 window.addEventListener('pageshow',render);
})();

// Run: node tests/calculators.cjs
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const nodes={};
for(const m of read('index.html').matchAll(/id="([^"]+)"/g))nodes[m[1]]={value:'',textContent:'',hidden:false,handlers:{},addEventListener(k,f){(this.handlers[k]??=[]).push(f)},dispatchEvent(e){for(const f of this.handlers[e.type]||[])f(e)},closest(){return this}};
const w={};
new Function('window',read('nakshatra-data.js'))(w);
new Function('document','window','Event',read('home-tools.js'))({getElementById:id=>nodes[id]||null},w,class{constructor(type){this.type=type}});
let count=0;
function test(vals,btn,out,expected){for(const [k,v] of Object.entries(vals))nodes[k].value=String(v);nodes[btn].dispatchEvent({type:'click'});for(const x of expected)assert.ok(nodes[out].textContent.includes(x),JSON.stringify({vals,expected:x,actual:nodes[out].textContent}));count++}
const rows='चु चे चो ला|ली लु ले लो|अ इ उ ए|ओ वा वी वु|वे वो का की|कु घ ङ छ|के को हा ही|हु हे हो डा|डी डु डे डो|मा मी मु मे|मो टा टी टु|टे टो पा पी|पु ष ण ठ|पे पो रा री|रु रे रो ता|ती तु ते तो|ना नी नु ने|नो या यी यु|ये यो भा भी|भु धा फा ढा|भे भो जा जी|खी खु खे खो|गा गी गु गे|गो सा सी सु|से सो दा दी|दु थ झ ञ|दे दो चा ची'.split('|').map(x=>x.split(' '));
const signs='मेष वृष मिथुन कर्कट सिंह कन्या तुला वृश्चिक धनु मकर कुम्भ मीन'.split(' ');
const angle=s=>[Math.floor(s/108000),Math.floor(s%108000/3600),Math.floor(s%3600/60),s%60].join('/');
for(let j=0;j<108;j++){const i=Math.floor(j/4),p=j%4;for(const k of [0,6000,11999])test({htNakDegree:angle(j*12000+k)},'htNakGo','htNakOut',['चरण '+(p+1),'नामाक्षर: '+rows[i][p],'राशि: '+signs[Math.floor(j/9)]]);test({htNameNak:i,htNameA:(p*15+7)+'/30',htNameB:'60/00'},'htNameGo','htNameOut',['चरण '+(p+1),'नामाक्षर: '+rows[i][p]])}
const names='प्रतिपदा द्वितीया तृतीया चतुर्थी पञ्चमी षष्ठी सप्तमी अष्टमी नवमी दशमी एकादशी द्वादशी त्रयोदशी चतुर्दशी पूर्णिमा'.split(' ');
for(let j=0;j<30;j++)for(const k of [0,43199])test({htSun:'0',htMoon:angle(j*43200+k)},'htTithiGo','htTithiOut',[(j<15?'शुक्ल':'कृष्ण')+' '+(j===29?'औँसी':names[j%15])]);
for(const [k,y] of Object.entries({ketu:7,venus:20,sun:6,moon:10,mars:7,rahu:18,jupiter:16,saturn:19,mercury:17}))test({htLord:k,htBhayat:'30/00',htBhavog:'60/00'},'htDashaGo','htDashaOut',[Math.floor(y/2)+' वर्ष '+(y%2?6:0)+' महिना 0 दिन']);
for(const v of [{htSunriseMode:'district',htDistrict:'+01:00'},{htSunriseMode:'longitude',htLonDeg:85,htLonMin:34,htLonSec:0},{htSunriseMode:'manual',htManualOffset:'-02:44',htOffsetReference:'standard'}])test({htSunrise:'05:24',...v},'htSunriseGo','htSunriseOut',['05:23:00']);
test({htBirth:'11:00',htPrevious:'current'},'htIstGo','htIstOut',['14 घडी 2 पला 30 विपला']);
test({htBYCase:'two',htBYCurrent:'8/33'},'htBYGo','htBYOut',['5 घडी 29 पला 30 विपला']);nodes.htBYUse.dispatchEvent({type:'click'});
test({htBGCase:'two',htBGCurrent:'8/33',htBGNext:'15/05'},'htBGGo','htBGOut',['66 घडी 32 पला']);nodes.htBGUse.dispatchEvent({type:'click'});
test({htNameNak:18},'htNameGo','htNameOut',['नामाक्षर: ये','जन्मराशि: धनु','16 घडी 38 पला','33 घडी 16 पला','49 घडी 54 पला']);
test({},'htDashaGo','htDashaOut',['6 वर्ष 5 महिना 2 दिन']);
test({htHours:0,htMinutes:0,htSeconds:1},'htGhadiGo','htGhadiOut',['2.5 विपला']);
for(const id of ['htBirth','htDistrict','htNameNak','htBYCase','htBGCase']){nodes.htDashaOut.textContent='old';nodes[id].dispatchEvent({type:'change'});assert.ok(nodes.htDashaOut.textContent.includes('पुनः गणना'));count++}
test({htBGCase:'three',htBGAkshaya:'3/43',htBGKshaya:'59/38'},'htBGGo','htBGOut',['55 घडी 55 पला']);
test({htBGCase:'four',htBGGrowthPrev:'54/47',htBGGrowthEnd:'0/48'},'htBGGo','htBGOut',['66 घडी 01 पला']);
test({htNakDegree:'360'},'htNakGo','htNakOut',['राख्नुहोस्']);
for(let p=1;p<=3;p++){test({htNameNak:18,htNameA:p*15+'/00',htNameB:'60/00'},'htNameGo','htNameOut',['चरण '+p,'ठीक चरण-सीमा']);test({htNameNak:18,htNameA:p*15+'/00/0.5',htNameB:'60/00'},'htNameGo','htNameOut',['चरण '+(p+1)])}
console.log(count+' calculator regression cases passed (simulated DOM; not browser QA).');

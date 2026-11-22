// District-headquarters longitudes transcribed from the user-supplied Jyotish table.
// Time difference is measured against Kathmandu's listed longitude 85°19′ E.
// Values describe the listed headquarters, not every locality within a district.
(function(){
 'use strict';
 const rows=[
 ['कोशी प्रदेश',[
 ['झापा','चन्द्रगढी','88:04'],['ताप्लेजुङ','ताप्लेजुङ','87:41'],['पाँचथर','फिदिम','87:46'],['इलाम','इलाम','87:55'],['मोरङ','विराटनगर','87:17'],['सुनसरी','इनरुवा','87:09'],['धनकुटा','धनकुटा','87:20'],['तेह्रथुम','म्याङ्लुङ','87:32'],['सङ्खुवासभा','खाँदबारी','87:13'],['भोजपुर','भोजपुर','87:04'],['सोलुखुम्बु','सल्लेरी','86:36'],['खोटाङ','दिक्तेल','86:48'],['ओखलढुङ्गा','ओखलढुङ्गा','86:32'],['उदयपुर','गाईघाट','86:32']]],
 ['मधेश प्रदेश',[
 ['रौतहट','गौर','85:16'],['बारा','कलैया','85:02'],['पर्सा','वीरगञ्ज','84:52'],['सप्तरी','राजविराज','86:45'],['सिराहा','सिराहा','86:13'],['धनुषा','जनकपुरधाम','85:56'],['महोत्तरी','जलेश्वर','85:48'],['सर्लाही','मलङ्गवा','85:33']]],
 ['बागमती प्रदेश',[
 ['सिन्धुली','माढी','85:55'],['रामेछाप','मन्थली','86:06'],['दोलखा','चरिकोट','86:03'],['सिन्धुपाल्चोक','चौतारा','85:43'],['काभ्रेपलाञ्चोक','धुलिखेल','85:34'],['ललितपुर','पाटन','85:20'],['भक्तपुर','भक्तपुर','85:26'],['काठमाडौँ','काठमाडौँ','85:19'],['नुवाकोट','विदुर','85:08'],['रसुवा','धुन्चे','85:18'],['धादिङ','धादिङबेँसी','84:54'],['मकवानपुर','हेटौँडा','85:02'],['चितवन','भरतपुर','84:26']]],
 ['गण्डकी प्रदेश',[
 ['गोरखा','गोरखकाली','84:36'],['लमजुङ','बेँसीसहर','84:23'],['मनाङ','चामे','84:15'],['नवलपुर','कावासोती','83:34'],['कास्की','पोखरा','83:51'],['तनहुँ','दमौली','84:17'],['स्याङ्जा','स्याङ्जा','83:53'],['पर्वत','कुश्मा','83:42'],['बागलुङ','बागलुङ','83:36'],['म्याग्दी','बेनी','83:34'],['मुस्ताङ','जोमसोम','83:44']]],
 ['लुम्बिनी प्रदेश',[
 ['परासी','रामग्राम','83:34'],['पाल्पा','तानसेन','83:53'],['रूपन्देही','भैरहवा','83:27'],['कपिलवस्तु','तौलिहवा','83:03'],['अर्घाखाँची','सन्धिखर्क','83:08'],['गुल्मी','तम्घास','83:15'],['रुकुम पूर्व','रुकुमकोट','82:22'],['रोल्पा','लिबाङ','82:38'],['प्यूठान','खलङ्गा','82:54'],['दाङ','घोराही','82:29'],['बाँके','नेपालगञ्ज','81:38'],['बर्दिया','गुलरिया','81:20']]],
 ['कर्णाली प्रदेश',[
 ['डोल्पा','दुनै','82:54'],['रुकुम पश्चिम','मुसिकोट','82:29'],['जुम्ला','खलङ्गा','82:11'],['कालिकोट','मान्म','81:36'],['मुगु','गमगढी','82:10'],['हुम्ला','सिमिकोट','81:41'],['सल्यान','खलङ्गा','82:10'],['सुर्खेत','वीरेन्द्रनगर','81:39'],['जाजरकोट','जाजरकोट','82:12'],['दैलेख','दैलेख','81:43']]],
 ['सुदूरपश्चिम प्रदेश',[
 ['बझाङ','चैनपुर','81:12'],['बाजुरा','मार्तडी','81:29'],['अछाम','मङ्गलसेन','81:15'],['डोटी','सिलगढी','80:59'],['कैलाली','धनगढी','80:36'],['कञ्चनपुर','महेन्द्रनगर','80:11'],['डडेलधुरा','डडेलधुरा','80:35'],['बैतडी','बैतडी','80:16'],['दार्चुला','दार्चुला','80:33']]]
 ];
 const detailedDistrict=document.getElementById('lsDistrict');
 const district=detailedDistrict||document.getElementById('htDistrict');
 if(!district)return;
 const format=secs=>(secs<0?'-':'+')+String(Math.floor(Math.abs(secs)/60)).padStart(2,'0')+':'+String(Math.abs(secs)%60).padStart(2,'0');
 let count=0;
 for(const [province,list] of rows){
  const group=document.createElement('optgroup');group.label=province;
  for(const [name,hq,lon] of list){
   const [degrees,minutes]=lon.split(':').map(Number);
   const seconds=((degrees*60+minutes)-(85*60+19))*4;
   const option=document.createElement('option');
   option.value=format(seconds);
   option.textContent=name+' ('+hq+')';
   option.dataset.longitude=lon;
   option.dataset.district=name;
   group.append(option);count++;
  }
  district.append(group);
 }
 if(count!==77)throw new Error('District reference must contain 77 districts; found '+count);
 if(!detailedDistrict)return;
 const offset=document.getElementById('lsOffset');
 const details=document.getElementById('lsDistrictDetails');
 district.addEventListener('change',()=>{
  if(!district.value)return;
  const opt=district.selectedOptions[0];
  offset.value=district.value;
  details.textContent=opt.dataset.district+'को सदरमुकाम '+opt.textContent.split('(')[1].replace(')','')+'को तालिकागत देशान्तर '+opt.dataset.longitude.replace(':','°')+'′ पूर्व। काठमाडौँको तालिकागत देशान्तर ८५°१९′ पूर्वलाई आधार मानेर समयान्तर '+district.value+' (मिनेट:सेकेन्ड) हुन्छ।';
  document.getElementById('lsCalculate').click();
 });
 offset.addEventListener('input',()=>{district.value='';details.textContent='हातले वेलान्तर परिवर्तन गरिएको छ। यो अब चयन गरिएको जिल्लाको तालिकागत मान होइन।';});
})();
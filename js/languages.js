'use strict';
(function(){
 const language=new URLSearchParams(location.search).get('lang');
 const pages={fr:'francais.html',en:'english.html',nl:'nederlands-belgie.html'};
 if(!language)return;
 const code=language.toLowerCase().split('-')[0];
 if(pages[code]){
  const root=new URL('../',document.currentScript.src);
  location.replace(new URL(pages[code],root).href+location.hash);
 }
})();

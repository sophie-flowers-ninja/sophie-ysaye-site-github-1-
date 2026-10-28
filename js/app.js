'use strict';
const language=document.documentElement.lang.split('-')[0];
const locale={
 fr:{image:'IMAGE',images:'IMAGES',project:'Projet',greeting:'Bonjour Sophie,',intro:name=>`Je m'appelle ${name} et je vous contacte pour un projet.`,type:"Type d'événement",date:'Date',venue:'Lieu',tbd:'À définir',bye:'À bientôt,'},
 en:{image:'IMAGE',images:'IMAGES',project:'Project',greeting:'Hello Sophie,',intro:name=>`My name is ${name} and I would like to discuss a project with you.`,type:'Event type',date:'Date',venue:'Venue',tbd:'To be confirmed',bye:'Best wishes,'},
 nl:{image:'FOTO',images:"FOTO’S",project:'Project',greeting:'Dag Sophie,',intro:name=>`Ik ben ${name} en ik neem contact op voor een project.`,type:'Type evenement',date:'Datum',venue:'Locatie',tbd:'Nog te bepalen',bye:'Vriendelijke groeten,'}
}[language]||null;
const words=locale||{image:'IMAGE',images:'IMAGES'};
const imageCount=n=>`${n} ${n===1?words.image:words.images}`;
document.querySelector('.work-count').textContent=imageCount(document.querySelectorAll('.work').length);
// Language links open the translated page at the top, never preserve an anchor from the previous page.
const header=document.querySelector('.header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20),{passive:true});
document.getElementById('year').textContent=new Date().getFullYear();
const figures=[...document.querySelectorAll('.work')];
const gallery=document.querySelector('.gallery');
const filterButtons=[...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;
 filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 figures.forEach(figure=>figure.hidden=filter!=='all'&&figure.dataset.category!==filter);
 gallery.classList.toggle('filtered',filter!=='all');
 const count=figures.filter(f=>!f.hidden).length;
 document.querySelector('.work-count').textContent=imageCount(count);
}));
const lightbox=document.getElementById('lightbox');
let photoIndex=0,activePhotos=[];
function updatePhoto(){
 const button=activePhotos[photoIndex];const img=button.querySelector('img');
 const enlarged=document.getElementById('lightbox-image');enlarged.src=img.src;enlarged.alt=img.alt;
 const sourceFrame=button.querySelector('.photo-frame');
 document.getElementById('lightbox-crop').style.cssText=sourceFrame.style.cssText;
 enlarged.style.cssText=img.style.cssText;
 document.getElementById('lightbox-media').style.setProperty('--frame-ratio',button.dataset.ratio);
}
function openDialog(dialog){dialog.showModal();document.body.classList.add('dialog-open');}
function stepPhoto(step){photoIndex=(photoIndex+step+activePhotos.length)%activePhotos.length;updatePhoto();}
document.querySelectorAll('.image-button').forEach(button=>button.addEventListener('click',()=>{
 activePhotos=figures.filter(f=>!f.hidden).map(f=>f.querySelector('.image-button'));
 photoIndex=activePhotos.indexOf(button);updatePhoto();openDialog(lightbox);
}));
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>stepPhoto(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>stepPhoto(1));
lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();stepPhoto(1)}if(event.key==='ArrowLeft'){event.preventDefault();stepPhoto(-1)}});
// Swipe navigation on touchscreens; vertical swipes keep their normal behaviour.
let swipeStart=null;
lightbox.addEventListener('touchstart',event=>{if(event.touches.length!==1)return;swipeStart={x:event.touches[0].clientX,y:event.touches[0].clientY};},{passive:true});
lightbox.addEventListener('touchend',event=>{if(!swipeStart||event.changedTouches.length!==1)return;const dx=event.changedTouches[0].clientX-swipeStart.x;const dy=event.changedTouches[0].clientY-swipeStart.y;swipeStart=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.25)stepPhoto(dx<0?1:-1);},{passive:true});
lightbox.addEventListener('touchcancel',()=>{swipeStart=null;},{passive:true});
for(const dialog of document.querySelectorAll('dialog')){
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open')});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
}
document.getElementById('open-contact').addEventListener('click',()=>openDialog(document.getElementById('contact-dialog')));
document.getElementById('open-privacy').addEventListener('click',()=>openDialog(document.getElementById('privacy-dialog')));
document.getElementById('open-legal').addEventListener('click',()=>openDialog(document.getElementById('legal-dialog')));
document.getElementById('project-form').addEventListener('submit',event=>{
 event.preventDefault();const form=new FormData(event.currentTarget);
 const subject=`${words.project} ${form.get('type')} - ${form.get('prenom')}`;
 let date=form.get('date');if(date){const[y,m,d]=date.split('-');date=`${d}/${m}/${y}`;}
 const body=`${words.greeting}\n\n${words.intro(form.get('prenom'))}\n\n${words.type} : ${form.get('type')}\n${words.date} : ${date||words.tbd}\n${words.venue} : ${form.get('lieu')||words.tbd}\n\n${form.get('message')}\n\n${words.bye}\n${form.get('prenom')}`;
 document.getElementById('mail-fallback').hidden=false;
 window.location.href=`mailto:request@sophieysaye.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

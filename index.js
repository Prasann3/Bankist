const btn_scroll_to=document.querySelector('.btn--scroll-to');
const section_1=document.querySelector('#section--1');
const opertaion_btn=document.querySelector('.operations');
const nav_bar=document.querySelector('.nav');
const features_section=document.querySelector('.features');
const header=document.querySelector('.header');
const slides=document.querySelectorAll('.slide');
btn_scroll_to.addEventListener('click',function(e){
    const scroll=section_1.getBoundingClientRect();
    
    section_1.scrollIntoView({behavior : 'smooth'});
});
document.querySelector('.nav__links').addEventListener('click',
    function(e){
        const target=e.target;
        
        e.preventDefault();
        if(target.classList.contains('nav__link'))
        document.querySelector(target.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    }
);

opertaion_btn.addEventListener('click',function(e){
    e.preventDefault();
    const target=e.target;
    if(target.classList.contains('operations__tab')){
      let current_active=document.querySelector('.operations__tab--active');
      let current_btn_num=Number(current_active.getAttribute('data-tab'));
      let current_tab=document.querySelector(`.operations__content--${current_btn_num}`);
      
     let target_num= target.getAttribute('data-tab');
     let target_tab=document.querySelector(`.operations__content--${target_num}`);
     current_active.classList.remove('operations__tab--active');
     target.classList.add('operations__tab--active');
     current_tab.classList.remove('operations__content--active');
     target_tab.classList.add('operations__content--active');
     
   
    }
});

nav_bar.addEventListener('mouseover',function(e){
    let target=e.target;
   
    if(target.classList.contains('nav__link')){
    const siblings=target.closest('.nav').querySelectorAll('.nav__link');
    if(target.classList.contains('nav__link'));
   siblings.forEach((ele)=>{
    if(ele!=target){
        ele.style.opacity=0.5;
    }
   })
   if(target!=nav_bar.querySelector('img'))
   nav_bar.querySelector('img').style.opacity=0.5;
} 
})
nav_bar.addEventListener('mouseout',function(e){
    let target=e.target;
   
    if(target.classList.contains('nav__link')){
    const siblings=target.closest('.nav').querySelectorAll('.nav__link');
    if(target.classList.contains('nav__link'));
   siblings.forEach((ele)=>{
    if(ele!=target){
        ele.style.opacity=1;
    }
   })
   if(target!=nav_bar.querySelector('img'))
   nav_bar.querySelector('img').style.opacity=1;
} 
});
// window.addEventListener('scroll',function(e){
//    let section_1__info=section_1.getBoundingClientRect();
//    if(this.window.scrollY>=section_1__info.top){
    
//     nav_bar.classList.add('sticky');
//    }
//    else{
//     nav_bar.classList.remove('sticky');
//    }
// }); 
let call_back=function(entry,observer){
    let en=entry[0];
    features_section.classList.remove('section--hidden');
    if(!en.isIntersecting)
    nav_bar.classList.add('sticky');
else  nav_bar.classList.remove('sticky');
   
}
let obj={
    root:null,
    threshold:0,
    rootMargin:`-${nav_bar.getBoundingClientRect().height}px`
}
let observer=new IntersectionObserver(call_back,obj);
observer.observe(header);

let reveal=function(entries,observer){
    entries.forEach((entry)=>{
       
        if(entry.isIntersecting){
           entry.target.classList.remove('section--hidden');
           observer.unobserve(entry.target);
          
        }
       
    })

}

let section_observer=new IntersectionObserver(reveal,{
    root:null,
    threshold:0.1

});
document.querySelectorAll('.section').forEach((sec)=>{
    section_observer.observe(sec);
    sec.classList.add('section--hidden');
})
let lazy=function(entries,observer){
    let entry=entries[0];
   if(!entry.isIntersecting)return;
    if(entry.isIntersecting){

        entry.target.src=entry.target.getAttribute('data-src');
        entry.target.addEventListener('load',function(){
            
            entry.target.classList.remove('lazy-img');
        })
       
        observer.unobserve(entry.target);
    }
}

let lazy_imgs=document.querySelectorAll('img[data-src]');
let img_observer=new IntersectionObserver(lazy,{
    root:null,
    threshold:0.2
});
lazy_imgs.forEach((im)=>{
    img_observer.observe(im);
});

let display_slides=function(){
    slides.forEach((s,i)=>{
        s.style.transform=`translateX(${100*i}%)`;
    
    });
}
let display_slides_reverse=function(){
    let n=slides.length;
     slides.forEach((s,i)=>{
        s.style.transform=`translateX(${-100*(n-1-i)}%)`
     })
}
display_slides();
let dots_change=function(slide_idx){
       
    let active_dot=document.querySelector('.dots__dot--active');
  
    let dots=new Array();
    document.querySelectorAll('.dots__dot').forEach((e)=>{
        dots.push(e);
    })
    let target_dot=dots.find((e)=>{
        if(e.dataset.slide==slide_idx)return true;
        else return false;
    });
    
    active_dot.classList.remove('dots__dot--active');
    target_dot.classList.add('dots__dot--active');
}

const silder_btn_left=document.querySelector('.slider__btn--left');
const slider_btn_right=document.querySelector('.slider__btn--right');
let slide_idx=0;
 silder_btn_left.addEventListener('click',function(){
   
 
    if(slide_idx==0){
        display_slides_reverse();
        slide_idx=slides.length-1;
        dots_change(slide_idx);
        return;
     }
     slide_idx--;
     dots_change(slide_idx);
     slides.forEach((s)=>{
         let style=s.style.transform;
         let num=Number(style.slice(11,-2));
         s.style.transform=`translateX(${num+100}%)`;
      })

 });
 slider_btn_right.addEventListener('click',function(){
    if(slide_idx==slides.length-1){
        display_slides();
        slide_idx=0;
        dots_change(slide_idx);
        return;
     }
      slide_idx++;
      dots_change(slide_idx);
      slides.forEach((s)=>{
         let style=s.style.transform;
         let num=Number(style.slice(11,-2));
         s.style.transform=`translateX(${num-100}%)`;
      });
    
    
 });
 document.addEventListener('keydown',function(e){
      
       if(e.key==='ArrowLeft'){
        if(slide_idx==0){
            display_slides_reverse();
            slide_idx=slides.length-1;
            dots_change(slide_idx);
            return;
         }
         slide_idx--;
         dots_change(slide_idx);
         slides.forEach((s)=>{
             let style=s.style.transform;
             let num=Number(style.slice(11,-2));
             s.style.transform=`translateX(${num+100}%)`;
          })
       }
       else if(e.key==='ArrowRight'){
        if(slide_idx==slides.length-1){
            display_slides();
            slide_idx=0;
            dots_change(slide_idx);
            return;
         }
          slide_idx++;
          dots_change(slide_idx);
          slides.forEach((s)=>{
             let style=s.style.transform;
             let num=Number(style.slice(11,-2));
             s.style.transform=`translateX(${num-100}%)`;
          });
       }
 })

 const btn=document.querySelector('.dots__dot--active');
 const dots=document.querySelector('.dots');
dots.addEventListener('click',function(e){
   
    if(e.target.classList.contains('dots__dot')){
        let current_active=document.querySelector('.dots__dot--active')
        let target_idx=Number(e.target.dataset.slide);
        let active_idx=Number(current_active.dataset.slide);
        
        if(target_idx===active_idx)return;
        else if(target_idx<active_idx){
            let diff=active_idx-target_idx;
            slides.forEach((s)=>{
                let style=s.style.transform;
                let num=Number(style.slice(11,-2));
                s.style.transform=`translateX(${num+(diff*100)}%)`;
            })
            current_active.classList.remove('dots__dot--active');
            e.target.classList.add('dots__dot--active');
        }
        else{
            let diff=target_idx-active_idx;
            slides.forEach((s)=>{
                let style=s.style.transform;
                let num=Number(style.slice(11,-2));
                s.style.transform=`translateX(${num-(diff*100)}%)`;
            })
            current_active.classList.remove('dots__dot--active');
            e.target.classList.add('dots__dot--active');
        }
    }
});
navigator.geolocation.getCurrentPosition((pos)=>{
    console.log(pos);
},function(){
    alert("Not found")
})
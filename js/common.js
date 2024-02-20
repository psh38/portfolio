const body = document.querySelector('body');

// 헤더 검색버튼 접기 펼침 기능
const serchBtn = document.querySelector('header .gnb-wrap .btn-search');
const searchCloseBtn = document.querySelector('header .gnb-wrap .btn-search-close');

serchBtn.addEventListener('click', ()=>{
  if(body.classList.contains('src-open') === false){
    body.classList.add('src-open');
  }else{
    body.classList.remove('src-open');
  }
})

searchCloseBtn.addEventListener('click', ()=>{
  if(body.classList.contains('src-open') === false){
    body.classList.add('src-open');
  }else{
    body.classList.remove('src-open');
  }
})



// 헤더 전체메뉴 접기 펼침 기능
const allMenuBtn = document.querySelector('header .gnb-wrap .btn-all-menu');
const allColseBtn = document.querySelector('.sitemap-body .btn-all-close');

allMenuBtn.addEventListener("click", () => {
  if(body.classList.contains('all-menu') === false){
   body.classList.add('all-menu');   
  }else{
      body.classList.remove('all-menu');
  }
});

allColseBtn.addEventListener("click", () => {
  if(body.classList.contains('all-menu') === false){
   body.classList.add('all-menu')   
  }else{
      body.classList.remove('all-menu')
  }
});

// ========= 스크롤 네비 =========
const scrollNaviList = document.querySelector('.scroll-navi .menu-list')
const scrollNavis = scrollNaviList.querySelectorAll('li')
const section = document.querySelectorAll('main > .section')


for(let scrollNavi of scrollNavis){
  scrollNavi.addEventListener('click', (e) => {
    e.preventDefault();
     // 클릭이벤트 앵커이동
     let targetId = scrollNavi.querySelector('a').getAttribute('href');
     // console.log(targetId);
     let targetSection = document.querySelector(targetId);
     let targetOST = targetSection.offsetTop;
     // console.log(targetOST);
     window.scrollTo({left:0, top:targetOST, behavior:'smooth'});

    //  on클래스 / blind클래스 추가 제거
    // console.log(scrollNavi.classList.contains('on'));
    if(!scrollNavi.classList.contains('on')){
      // console.log(scrollNavi.closest('.menu-list').querySelectorAll('li.on').length > 0);
      if(scrollNaviList.querySelectorAll('li.on').length > 0){
        scrollNaviList.querySelectorAll('li.on')[0].classList.remove('on');
        scrollNavi.querySelector('span').classList.add('blind');
      }
      scrollNavi.classList.add('on');
      scrollNavis.forEach((item) =>{
         item.querySelector('a > span').classList.add('blind')
      }) // 선택한 영역 외 blind 추가
      if(scrollNavi.querySelector('.blind') != null){
        scrollNavi.querySelector('.blind').classList.remove('blind');
      }
    }
  });
}



// footer family site
const siteGroup = document.querySelector('.site-group');
siteGroup.addEventListener('click',() => {
  if(!siteGroup.classList.contains('on')){
    siteGroup.classList.add('on');
  }else{
    siteGroup.classList.remove('on');
  }
})